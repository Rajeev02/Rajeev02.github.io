A **Custom Hook** is simply a JavaScript function whose name starts with **`use`** and that can call other React hooks (like `useState`, `useEffect`, `useCallback`, etc.).

In enterprise architecture, custom hooks are used to **extract business logic out of the UI presentation components** so that the logic can be tested independently and reused across multiple screens.

Here is a complete, real-world example of a custom hook that tracks **network connectivity status** in React Native. This is essential for fintech dashboards to prevent users from making transactions when their internet drops.

---

### Step 1: Writing the Custom Hook (`useNetworkStatus.ts`)

This hook handles the event listener registration, maintains the local state, and cleans up memory when the component unmounts.

```typescript
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useNetworkStatus() {
  // 1. Maintain internal reactive states
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [connectionType, setConnectionType] = useState<string | null>(
    "unknown",
  );

  useEffect(() => {
    // 2. Subscribe to the native operating system's network event listener
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
      setConnectionType(state.type);
    });

    // 3. Mandatory Memory Cleanup
    // This return closure acts exactly like 'componentWillUnmount'.
    // If the screen unmounts, we drop the native listener to prevent native heap memory leaks!
    return () => {
      unsubscribe();
    };
  }, []); // Empty array ensures this listener binds exactly ONCE on mount

  // 4. Return the calculated values as a clean object API for our UI components
  return {
    isConnected,
    connectionType,
    isCellular: connectionType === "cellular",
    isWifi: connectionType === "wifi",
  };
}
```

---

### Step 2: How We Consume/Call It in a Component

Now, our UI components can consume this network state machine with a single line of code. The UI remains completely "dumb" and presentation-focused—it doesn't care _how_ NetInfo tracks the hardware; it just reads the variables.

```typescript
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// Import our custom logic module
import { useNetworkStatus } from './useNetworkStatus';

export default function CheckoutScreen() {
  // CALLING THE CUSTOM HOOK: Deconstruct the real-time values instantly
  const { isConnected, isCellular } = useNetworkStatus();

  const handlePaymentSubmit = () => {
    // Enforce business logic boundary condition using hook state metrics
    if (!isConnected) {
      Alert.alert('Sync Halted', 'No network detected. Please restore connectivity to process escrow.');
      return;
    }
    Alert.alert('Success', 'Transaction payload broadcasted safely.');
  };

  return (
    <View style={styles.container}>
      {/* 1. Real-time dynamic banner bar based on Custom Hook values */}
      {!isConnected && (
        <View style={styles.offlineBanner}>
          <Text style={styles.bannerText}>Operating Offline Mode</Text>
        </View>
      )}

      <Text style={styles.title}>Payment Checkout Gateway</Text>
      <Text style={styles.subText}>
        Network Protocol: {isConnected ? (isCellular ? 'Mobile Data (LTE/5G)' : 'Wi-Fi') : 'Disconnected'}
      </Text>

      <TouchableOpacity
        style={[styles.button, !isConnected && styles.buttonDisabled]}
        onPress={handlePaymentSubmit}
      >
        <Text style={styles.buttonText}>Authorize Transaction</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#F8FAFC' },
  offlineBanner: { position: 'absolute', top: 50, left: 0, right: 0, backgroundColor: '#EF4444', padding: 10, alignItems: 'center' },
  bannerText: { color: '#FFF', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: '700', color: '#1E293B', marginBottom: 8 },
  subText: { fontSize: 14, color: '#64748B', marginBottom: 24 },
  button: { height: 52, backgroundColor: '#1677FF', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#CBD5E1' },
  buttonText: { color: '#FFF', fontWeight: '600', fontSize: 16 }
});

```

---

### Why Custom Hooks are crucial under the hood:

1. **Shared State Logic, Separate State Instances:** If you import and call `useNetworkStatus()` on the `CheckoutScreen` and also inside a `ProfileScreen` at the same time, **they do not share the same data state**. Each custom hook execution allocates its own completely isolated memory sandbox allocation inside the React rendering tree.
2. **Seamless Triggering of Re-renders:** When the device connectivity shifts (e.g., you walk out of Wi-Fi range), the internal `setIsConnected` function inside the custom hook triggers. Because it updates React state, **it automatically forces any parent UI component currently calling that custom hook to instantly re-render** with the fresh data coordinates, guaranteeing UI sync across the whole app.
