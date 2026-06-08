## Program 2: Functional Component Refactor Using Hooks
*⏱️ 2 min read*

### Question
Refactor the legacy `LegacyPortfolioMonitor` class component into a modern, functional React component `ModernPortfolioMonitor` using **Hooks** (`useState`, `useEffect`, `useRef`). The refactored component must maintain the exact same polling behaviors, clean up timers during dependencies mutations, and optimize rendering commits using `React.memo`.

### Sample Input & Output
#### Input:
```javascript
// Props passed from parent:
isActive={true}
symbol="BTC"
```
#### Output:
- **Mounting**: Runs `useEffect` hook, initializes the `useRef` timer container, and triggers polling.
- **Updating**: Dependency array tracks modifications. Automatically halts previous intervals and re-allocates active updates if `symbol` or `isActive` changes.
- **Unmounting**: The return closure of the active `useEffect` triggers automatically, clearing the timer references from memory.

### Code
```tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MonitorProps {
  symbol: string;
  isActive: boolean;
}

// 1. Wrap functional component in React.memo to replicate 'shouldComponentUpdate' optimizations
export const ModernPortfolioMonitor = React.memo(
  ({ symbol, isActive }: MonitorProps) => {
    const [price, setPrice] = useState<string>('0');
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    // 2. Use useRef to hold the mutable timer identifier
    // useRef persists values across renders without triggering a component re-render when mutated.
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const fetchPrice = () => {
        const mockPrice = (Math.random() * 10000 + 40000).toFixed(2);
        setPrice(mockPrice);
        setLastUpdated(new Date().toLocaleTimeString());
      };

      const stopPolling = () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          console.log("Hooks: Polling cleared");
        }
      };

      const startPolling = () => {
        stopPolling(); // Defensive check to clear existing loops
        fetchPrice();
        timerRef.current = setInterval(fetchPrice, 1000);
        console.log("Hooks: Polling started");
      };

      // 3. Replicate mounting and updating lifecycles via dependency evaluation
      if (isActive) {
        startPolling();
      } else {
        stopPolling();
      }

      // 4. Return the cleanup function closure (replaces componentWillUnmount)
      return () => {
        stopPolling();
      };
    }, [symbol, isActive]); // Re-evaluates only when these dependencies mutate

    return (
      <View style={styles.card}>
        <Text style={styles.header}>Asset: {symbol}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text style={styles.footer}>Last updated: {lastUpdated}</Text>
      </View>
    );
  },
  // Replicate shouldComponentUpdate behavior.
  // Returns true if props are equal (skips render), or false if unequal (re-renders)
  (prevProps, nextProps) => {
    return (
      prevProps.symbol === nextProps.symbol &&
      prevProps.isActive === nextProps.isActive
    );
  }
);

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
- **Time Complexity**: $O(1)$ updates.
- **Space Complexity**: $O(1)$ memory mapping.
- **Explanation**: Refactored hooks representation. React's `useState` manages values. `useRef` holds the polling timer ID because mutations to `.current` do not trigger updates. The `useEffect` hook captures updates to `symbol` or `isActive`, clean-up returns halt previous intervals, and `React.memo` implements shallow props comparison.

---
