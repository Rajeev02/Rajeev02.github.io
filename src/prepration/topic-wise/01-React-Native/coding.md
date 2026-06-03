# 📱 React Native Coding Programs

---

## Program 1: Performance-Optimized List Component

### Question
Write a performance-optimized list component that displays a massive dataset of items (such as product listings or transactions). The list must prevent unnecessary cell re-renders, handle scroll operations efficiently, and utilize layout caching rules to maintain 60 FPS scrolling on low-end devices.

### Sample Input & Output
#### Input:
```javascript
const transactions = [
  { id: "tx_101", title: "Apple Subscription", amount: 9.99, date: "2026-06-01" },
  { id: "tx_102", title: "Amazon Purchase", amount: 49.99, date: "2026-06-02" },
  // ... Up to 50,000 transaction items
];
```
#### Output:
Renders a smooth scrollable list where container cells are recycled, off-screen cells are dynamically unloaded, scroll-to-index transitions execute instantly, and cells do not re-render unless their specific transactions change.

### Code
```tsx
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList, ListRenderItem } from 'react-native';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
}

// 1. Wrap cell components in React.memo to prevent re-renders when other cells change
const TransactionRow = React.memo(({ item }: { item: Transaction }) => {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>${item.amount.toFixed(2)}</Text>
    </View>
  );
});

export function OptimizedTransactionList({ data }: { data: Transaction[] }) {
  // 2. Memoize list render callback to maintain a stable reference
  const renderItem: ListRenderItem<Transaction> = useCallback(({ item }) => {
    return <TransactionRow item={item} />;
  }, []);

  // 3. Pre-calculate cell layout bounds so native layouts don't measure heights dynamically
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 70, // Fixed height of each row container
    offset: 70 * index,
    index,
  }), []);

  // 4. Extract unique key identifiers
  const keyExtractor = useCallback((item: Transaction) => item.id, []);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      initialNumToRender={15}      // Render small initial subset to speed up mount
      maxToRenderPerBatch={10}     // Limit number of items rendered per batch
      windowSize={5}               // Keep rendering window small (5 screen heights)
      removeClippedSubviews={true} // Unload off-screen views from native buffer
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 10,
  },
  row: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a202c',
  },
  date: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b6cb0',
  },
});
```

---

## Program 2: Custom NetInfo Connectivity Hook (`useNetwork`)

### Question
Create a custom React Native hook `useNetwork` that monitors network connectivity status. The hook should track whether the user is online, their connection type (WiFi, cellular, etc.), and clean up active listeners properly when components unmount to prevent memory leaks.

### Sample Input & Output
#### Usage Input:
```javascript
const { isConnected, isWifi } = useNetwork();
```
#### Output (Online via Wifi):
```javascript
{ isConnected: true, isWifi: true, connectionType: "wifi" }
```

### Code
```typescript
import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

interface NetworkState {
  isConnected: boolean | null;
  connectionType: string | null;
  isWifi: boolean;
}

export function useNetwork(): NetworkState {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: true,
    connectionType: null,
    isWifi: false,
  });

  useEffect(() => {
    // 1. Initialize and listen to connectivity state changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setNetworkState({
        isConnected: state.isConnected,
        connectionType: state.type,
        isWifi: state.type === 'wifi',
      });
    });

    // 2. Return cleanup subscription to release references from event dispatcher memory
    return () => {
      unsubscribe();
    };
  }, []);

  return networkState;
}
```

---

## Program 3: Expo Config Plugin configuration

### Question
Write a JavaScript Expo Config Plugin function that programmatically modifies the native `AndroidManifest.xml` during `npx expo prebuild` to inject custom security permissions (e.g. `REQUEST_INSTALL_PACKAGES`) without editing the native Android directory files manually.

### Sample Input & Output
#### Input:
```json
// Inside app.json plugins definition
"plugins": [
  "./plugins/withCustomPermissions"
]
```
#### Output:
Compiles Android build configs and injects `<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />` directly into the generated XML outputs.

### Code
```javascript
const { withAndroidManifest } = require('@expo/config-plugins');

/**
 * Custom Expo Config Plugin to inject Android security permissions programmatically
 */
function withCustomPermissions(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const manifest = androidManifest.manifest;

    // 1. Ensure uses-permission array structure exists in the XML model
    if (!manifest['uses-permission']) {
      manifest['uses-permission'] = [];
    }

    const targetPermission = 'android.permission.REQUEST_INSTALL_PACKAGES';

    // 2. Prevent duplicate permission injections
    const hasPermission = manifest['uses-permission'].some(
      (item) => item.$['android:name'] === targetPermission
    );

    if (!hasPermission) {
      manifest['uses-permission'].push({
        $: {
          'android:name': targetPermission,
        },
      });
      console.log(`Expo Plugin: Successfully injected ${targetPermission}`);
    }

    return config;
  });
}

module.exports = withCustomPermissions;
```

---

## Program 4: Native Android Module Bridge (Kotlin)

### Question
Implement a custom Android Native Module structure written in Kotlin that provides a bridge to compute SHA-256 hashes of string buffers natively. The module must register its namespace, declare the hash calculations asynchronously, and return the outputs through a React Native Promise back to the JS thread.

### Sample Input & Output
#### JS Input:
```javascript
import { NativeModules } from 'react-native';
const hash = await NativeModules.CryptoBridge.hashString("secure_payment_payload");
```
#### Output:
```javascript
"2f5f14e7a8cf..." // 64-character SHA-256 hexadecimal string
```

### Code
```kotlin
package com.myportal.cryptobridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.security.MessageDigest

class CryptoBridgeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // 1. Define the module namespace exposed to JavaScript
    override fun getName(): String {
        return "CryptoBridge"
    }

    // 2. Implement target method annotated with @ReactMethod for JS invocation
    @ReactMethod
    fun hashString(input: String, promise: Promise) {
        try {
            // Run hash operations inside worker threads rather than blocking native UI thread
            Thread {
                try {
                    val digest = MessageDigest.getInstance("SHA-256")
                    val hashBytes = digest.digest(input.toByteArray(Charsets.UTF_8))
                    
                    // Convert bytes to hex string
                    val hexString = StringBuilder()
                    for (byte in hashBytes) {
                        val hex = Integer.toHexString(0xff and byte.toInt())
                        if (hex.length == 1) hexString.append('0')
                        hexString.append(hex)
                    }
                    
                    // Resolve output through bridge
                    promise.resolve(hexString.toString())
                } catch (e: Exception) {
                    promise.reject("HASH_ERROR", "Failed to calculate SHA-256 hash", e)
                }
            }.start()
        } catch (e: Exception) {
            promise.reject("THREAD_ERROR", "Failed to spawn hashing worker thread", e)
        }
    }
}
```
