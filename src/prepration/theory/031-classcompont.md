Here is a comprehensive, production-grade example of a legacy React Native **Class Component** that implements **every single core lifecycle method** across the Mounting, Updating, Unmounting, and Error Handling phases.

This example models a real-world **Live Portfolio Monitor** widget. It establishes a background interval timer to update rates, optimize rendering checks, clean up memory to prevent leaks, and catch component exceptions using the error-handling parameters we discussed.

---

### The Complete Class Component (`LivePortfolioMonitor.tsx`)

```typescript
import React, { Component, ErrorInfo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// --- Types for Props and State ---
interface MonitorProps {
  portfolioId: string;
  currencyToken: string;
  isActive: boolean;
}

interface MonitorState {
  marketRate: number;
  lastUpdated: string;
  hasError: boolean;
}

export default class LivePortfolioMonitor extends Component<MonitorProps, MonitorState> {
  // A mutable instance property to store the native timer ID across lifecycles
  private rateIntervalId: number | null = null;

  // ==========================================
  // 1. THE MOUNTING PHASE (Component Creation)
  // ==========================================

  constructor(props: MonitorProps) {
    super(props);
    console.log('1. Constructor: Initializing baseline state configurations.');

    // Setting up the initial synchronous state object
    this.state = {
      marketRate: 100.0,
      lastUpdated: new Date().toLocaleTimeString(),
      hasError: false,
    };

    // Binding custom class handlers to preserve the correct 'this' context runtime footprint
    this.handleManualRefresh = this.handleManualRefresh.bind(this);
  }

  static getDerivedStateFromProps(nextProps: MonitorProps, prevState: MonitorState): Partial<MonitorState> | null {
    console.log('2. getDerivedStateFromProps: Synchronizing state mapping against incoming properties.');
    // Returns null if no state adjustments are required based on changing props
    return null;
  }

  componentDidMount() {
    console.log('4. componentDidMount: UI is painted. Safe to trigger network loops, timers, or native listeners.');

    // Start background pooling intervals if the widget is configured as active
    if (this.props.isActive) {
      this.startLiveStreamingPool();
    }
  }

  // ==========================================
  // 2. THE UPDATING PHASE (Component Upkeep)
  // ==========================================

  shouldComponentUpdate(nextProps: MonitorProps, nextState: MonitorState): boolean {
    console.log('5. shouldComponentUpdate: Determining if view tree requires a re-calculate pass.');

    // Performance Optimization: Only allow a re-render if the rate actually changes or tokens flip
    if (
      nextState.marketRate === this.state.marketRate &&
      nextProps.currencyToken === this.props.currencyToken &&
      nextProps.isActive === this.props.isActive
    ) {
      console.log('-> Render Blocked: Props/State unchanged. Skipping render pass.');
      return false; // Skips the render pass entirely
    }

    return true; // Continues the render pipeline
  }

  getSnapshotBeforeUpdate(prevProps: MonitorProps, prevState: MonitorState): any {
    console.log('6. getSnapshotBeforeUpdate: Capturing scrolling coordinates or layout dimensions before state mutations settle.');
    return { cachedScrollY: 120 }; // Retains context that is passed straight to componentDidUpdate
  }

  componentDidUpdate(prevProps: MonitorProps, prevState: MonitorState, snapshot: any) {
    console.log('7. componentDidUpdate: Layout flushed to device screen.', snapshot);

    // Conditional evaluation: If the controller state changes, rebuild the polling engines
    if (prevProps.isActive !== this.props.isActive) {
      if (this.props.isActive) {
        this.startLiveStreamingPool();
      } else {
        this.clearLiveStreamingPool();
      }
    }
  }

  // ==========================================
  // 3. THE UNMOUNTING PHASE (Component Destruction)
  // ==========================================

  componentWillUnmount() {
    console.log('8. componentWillUnmount: Component is dying. Clearing hardware anchors to safeguard memory queues.');
    // CRITICAL: Wiping active timers ensures the Garbage Collector can safely scrub this class instance out of RAM
    this.clearLiveStreamingPool();
  }

  // ==========================================
  // 4. THE ERROR HANDLING PHASE (The Safety Net)
  // ==========================================

  static getDerivedStateFromError(error: Error): Partial<MonitorState> {
    console.log('9. static getDerivedStateFromError: Caught exception in render phase. Modifying state for fallback render.');
    // Invoked synchronously mid-render; returns state changes to trigger fallback UI[cite: 1]
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('10. componentDidCatch: Commit phase finalized. Invoking external reporting APIs safely.');
    // Thread-safe location to dispatch crash telemetry
    console.warn(`Logged to Crashlytics/Sentry: ${error.message}`, errorInfo.componentStack);
  }

  // ==========================================
  // Custom Class Processing Operations
  // ==========================================

  private startLiveStreamingPool() {
    this.clearLiveStreamingPool(); // Guard clause against duplicate timers
    this.rateIntervalId = setInterval(() => {
      console.log('-> Executing poll ticker rate update.');
      this.setState({
        marketRate: +(this.state.marketRate + (Math.random() * 4 - 2)).toFixed(2),
        lastUpdated: new Date().toLocaleTimeString()
      });
    }, 3000) as unknown as number;
  }

  private clearLiveStreamingPool() {
    if (this.rateIntervalId) {
      clearInterval(this.rateIntervalId);
      this.rateIntervalId = null;
    }
  }

  public handleManualRefresh() {
    Alert.alert('Sync Initiated', 'Refetching latest market parameters.');
    this.setState({ marketRate: 100.0 });
  }

  // The central structural pipeline block
  render() {
    console.log('3 / Rendering Step: Processing JSX View tree layout mapping.');

    // 1. Intercept flow if the local Error Boundary is flagged
    if (this.state.hasError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Internal Monitor Crash Intercepted.</Text>
        </View>
      );
    }

    // 2. Fall back to rendering the standard layout
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Asset Context: {this.props.portfolioId}</Text>

        <View style={styles.rateBlock}>
          <Text style={styles.rateText}>
            {this.props.currencyToken} {this.state.marketRate}
          </Text>
          <Text style={styles.subText}>Last Updated: {this.state.lastUpdated}</Text>
        </View>

        <TouchableOpacity style={styles.refreshButton} onPress={this.handleManualRefresh}>
          <Text style={styles.buttonText}>Force Baseline Sync</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// --- Layout Atom Sheets ---
const styles = StyleSheet.create({
  container: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, margin: 16, elevation: 3 },
  title: { fontSize: 14, color: '#64748B', fontWeight: '600', marginBottom: 12 },
  rateBlock: { marginBottom: 20 },
  rateText: { fontSize: 32, fontWeight: '800', color: '#1E293B', letterSpacing: -0.5 },
  subText: { fontSize: 12, color: '#94A3B8', marginTop: 4 },
  refreshButton: { backgroundColor: '#1677FF', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 14 },
  errorContainer: { backgroundColor: '#FEF2F2', padding: 20, borderRadius: 16, margin: 16, alignItems: 'center', borderWidth: 1, borderColor: '#FCA5A5' },
  errorText: { color: '#991B1B', fontWeight: '700', fontSize: 14 }
});

```

---

### How to consume this Class Component in another file

You use a Class Component exactly like a Functional Component. You simply import it and pass down the required type properties.

```typescript
import React, { useState } from 'react';
import { SafeAreaView, Switch, View, Text, StyleSheet } from 'react-native';
import LivePortfolioMonitor from './LivePortfolioMonitor'; // Import our class

export default function App() {
  const [isLiveMode, setIsLiveMode] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.controlRow}>
        <Text style={styles.label}>Enable Real-Time Thread Streaming:</Text>
        <Switch value={isLiveMode} onValueChange={setIsLiveMode} />
      </View>

      {/* RENDER CLASS MATRIX CORE ELEMENT */}
      <LivePortfolioMonitor
        portfolioId="IBM_ESCROW_A"
        currencyToken="USD"
        isActive={isLiveMode}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  controlRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  label: { fontSize: 15, fontWeight: '600', color: '#334155' }
});

```

---

### 🎯 Pro-Tips for showing off this example to the IBM Panel

If the interviewer asks you to step through this file live or explain its choices, make sure to hit these points to show your senior level of expertise:

- **`this.rateIntervalId` Is NOT state:** Explain that storing the interval ID as an instance property instead of inside state prevents the component from triggering a completely redundant re-render every time a timer resets or triggers.
- **`shouldComponentUpdate` Optimization:** Point out that this prevents unnecessary layout passes. If parent layouts re-render, this class evaluates if its parameters have shifted first, saving precious main-thread frames.
- **`componentWillUnmount` Memory Shield:** Emphasize that calling `clearLiveStreamingPool` here ensures that when a user leaves this screen, the ticking background timer is destroyed, preventing native memory heap leaks.
