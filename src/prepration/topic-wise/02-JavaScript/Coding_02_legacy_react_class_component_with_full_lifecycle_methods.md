## Program 1: Legacy React Class Component with Full Lifecycle Methods
*⏱️ 2 min read*

### Question
Create a production-grade legacy React **Class Component** that models a **Live Portfolio Monitor**. The component must implement Mounting, Updating, and Unmounting phases, establish an active background interval timer to update rates, optimize rendering checks using `shouldComponentUpdate` to prevent redundant draw iterations, and clean up all resources (timers, listeners) to prevent memory leaks.

### Sample Input & Output
#### Input:
```javascript
// Props passed from parent:
isActive={true}
symbol="BTC"
```
#### Output:
- **Mounting**: Renders the initialization view, starts a native 1-second interval timer.
- **Updating**: Triggers shouldComponentUpdate to verify if `symbol` or `rates` actually changed. Prints console warnings if updates are blocked.
- **Unmounting**: Clears the active rate-fetch interval to release references.

### Code
```javascript
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

export class LegacyPortfolioMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      lastUpdated: null,
    };
    this.timerId = null; // Stored as instance property to prevent state re-renders
  }

  // 1. Mounting Phase: Component is inserted into the rendering layout tree
  componentDidMount() {
    console.log("Class Component: Mounted");
    if (this.props.isActive) {
      this.startPolling();
    }
  }

  // 2. Updating Phase: Invoked whenever props or state change
  componentDidUpdate(prevProps, prevState) {
    // Check if the polling activation state has toggled
    if (prevProps.isActive !== this.props.isActive) {
      if (this.props.isActive) {
        this.startPolling();
      } else {
        this.stopPolling();
      }
    }

    // Check if the target ticker symbol changed
    if (prevProps.symbol !== this.props.symbol) {
      console.log(`Class Component: Symbol updated from ${prevProps.symbol} to ${this.props.symbol}`);
      this.fetchPrice();
    }
  }

  // 3. Optimization Phase: Intercept update requests to check if redraw is necessary
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if the price, active state, or ticker symbol has changed
    const hasPriceChanged = nextState.price !== this.state.price;
    const hasSymbolChanged = nextProps.symbol !== this.props.symbol;
    const hasStatusChanged = nextProps.isActive !== this.props.isActive;

    const shouldRedraw = hasPriceChanged || hasSymbolChanged || hasStatusChanged;
    console.log(`Class Component: shouldComponentUpdate evaluated to: ${shouldRedraw}`);
    return shouldRedraw;
  }

  // 4. Unmounting Phase: Component is removed from view and destroyed
  componentWillUnmount() {
    console.log("Class Component: Will Unmount, cleaning up resources");
    this.stopPolling();
  }

  startPolling() {
    this.stopPolling(); // Ensure no duplicate intervals run
    this.fetchPrice();
    this.timerId = setInterval(() => {
      this.fetchPrice();
    }, 1000);
    console.log("Class Component: Polling interval started");
  }

  stopPolling() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
      console.log("Class Component: Polling interval cleared");
    }
  }

  fetchPrice() {
    // Simulate API price resolution
    const mockPrice = (Math.random() * 10000 + 40000).toFixed(2);
    this.setState({
      price: mockPrice,
      lastUpdated: new Date().toLocaleTimeString(),
    });
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>Asset: {this.props.symbol}</Text>
        <Text style={styles.price}>Price: ${this.state.price}</Text>
        <Text style={styles.footer}>Last updated: {this.state.lastUpdated}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  price: {
    fontSize: 24,
    color: '#38a169',
    marginVertical: 10,
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    color: '#718096',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ for state updates and timer creation.
- **Space Complexity**: $O(1)$ constant state references.
- **Explanation**: A legacy React Class Component. Mounts and triggers polling intervals in `componentDidMount`. Reevaluates state/props differences inside `shouldComponentUpdate` to return a boolean, optimizing render calls. Clears interval timers inside `componentWillUnmount` to release callback references.

---
