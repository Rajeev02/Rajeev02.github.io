# 📱 React Native Coding Programs

<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [Program 1: Performance-Optimized List Component](#program-1-performance-optimized-list-component)
- [Program 2: Custom NetInfo Connectivity Hook (`useNetwork`)](#program-2-custom-netinfo-connectivity-hook-usenetwork)
- [Program 4: Native Android Module Bridge (Kotlin)](#program-4-native-android-module-bridge-kotlin)
- [Program 5: Fetch and Render List from API (Todos)](#program-5-fetch-and-render-list-from-api-todos)
- [Program 6: Reusable API Calling Wrappers (Fetch vs. Axios)](#program-6-reusable-api-calling-wrappers-fetch-vs-axios)
- [Program 7: MMKV State Persist & React Query Offline Caching with Optimistic Updates](#program-7-mmkv-state-persist-react-query-offline-caching-with-optimistic-updates)
- [Program 8: Reanimated Swipe & Pan Gesture Card Component (UI Cloning & Animation)](#program-8-reanimated-swipe-pan-gesture-card-component-ui-cloning-animation)
- [Program 9: Native Module Bridge (Kotlin Android & Swift iOS)](#program-9-native-module-bridge-kotlin-android-swift-ios)
- [Program 10: Complete GitHub Actions & Fastlane CI/CD Configuration](#program-10-complete-github-actions-fastlane-cicd-configuration)
- [Program 11: State Management with MobX State Tree (MST)](#program-11-state-management-with-mobx-state-tree-mst)
- [Program 12: SQLite Transactional Ledger Database Hook](#program-12-sqlite-transactional-ledger-database-hook)
- [Program 13: Multi-Layered Testing Suite (Jest + RNTL + Detox)](#program-13-multi-layered-testing-suite-jest-rntl-detox)
- [Program 14: Webpack Module Federation Configuration (Re.Pack Host & Remote Bundle Setup)](#program-14-webpack-module-federation-configuration-repack-host-remote-bundle-setup)
- [Program 15: Hardened C++ JNI Bridge Module (Android JNI/Kotlin & iOS Obj-C++/Swift)](#program-15-hardened-c-jni-bridge-module-android-jnikotlin-ios-obj-cswift)
- [Program 16: Secure Purchase Validation & Transaction Sync Hook](#program-16-secure-purchase-validation-transaction-sync-hook)
- [Program 17: GraphQL API Client Integration with Apollo Client](#program-17-graphql-api-client-integration-with-apollo-client)
- [Program 18: Recoil State Management (Atoms & Selectors)](#program-18-recoil-state-management-atoms-selectors)
- [Program 19: Unified Production Telemetry Hook (Firebase + Sentry + Azure Insights)](#program-19-unified-production-telemetry-hook-firebase-sentry-azure-insights)
- [Program 20: Test-Driven Development (TDD) Workflow with Jest & RNTL](#program-20-test-driven-development-tdd-workflow-with-jest-rntl)
</details>
<!-- INDEX_END -->

---

## Program 1: Performance-Optimized List Component
*⏱️ 2 min read*

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
import React, { useState, useCallback, useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  ListRenderItem
} from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// 1. Wrap individual list item in React.memo
// Ensure the component only re-renders if its item details or selection state changes.
const ProductRow = React.memo(({ 
  item, 
  isSelected, 
  onPress 
}: { 
  item: Product; 
  isSelected: boolean; 
  onPress: (id: string) => void; 
}) => {
  console.log(`Rendering Row: ${item.name}`); // Debug render cycles
  return (
    <TouchableOpacity 
      style={[styles.row, isSelected && styles.rowSelected]} 
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.selectionIndicator}>{isSelected ? '🔵' : '⚪'}</Text>
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  // Custom equality checker to prevent unneeded redraws:
  // Skip render if the item reference and the selected flag remain identical.
  return prevProps.item === nextProps.item && prevProps.isSelected === nextProps.isSelected;
});

export function OptimizedProductList({ initialData }: { initialData: Product[] }) {
  const [data, setData] = useState<Product[]>(initialData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // 2. Client-Side Search and Filter optimized via useMemo
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return data;
    return data.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  // 3. Selection handler using a stable reference callback
  const handleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // 4. Infinite Scroll Pagination Trigger
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || searchQuery.length > 0) return; // Skip pagination during active search
    setIsLoadingMore(true);
    
    // Simulate API fetch delay for next page
    setTimeout(() => {
      const nextPage = page + 1;
      const newItems: Product[] = Array.from({ length: 20 }).map((_, i) => ({
        id: `prod_${nextPage}_${i}`,
        name: `Product ${nextPage}-${i + 1}`,
        price: Math.floor(Math.random() * 100) + 10,
        category: i % 2 === 0 ? 'Electronics' : 'Apparel'
      }));
      
      setData(prev => [...prev, ...newItems]);
      setPage(nextPage);
      setIsLoadingMore(false);
    }, 1500);
  }, [page, isLoadingMore, searchQuery]);

  // 5. Pull-to-Refresh handling
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(initialData);
      setPage(1);
      setSelectedIds(new Set());
      setIsRefreshing(false);
    }, 1000);
  }, [initialData]);

  // 6. Memoize row renderer to maintain function pointer address
  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => {
    return (
      <ProductRow 
        item={item} 
        isSelected={selectedIds.has(item.id)} 
        onPress={handleSelect} 
      />
    );
  }, [selectedIds, handleSelect]);

  // 7. Stable layout parameters calculation
  // Eliminates dynamic measuring calculations on scroll.
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 70, // Height of each row (row style + bottom border height)
    offset: 70 * index,
    index,
  }), []);

  // 8. Extract unique keys
  const keyExtractor = useCallback((item: Product) => item.id, []);

  // 9. List Header Component containing the search inputs
  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products or category..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        <Text style={styles.selectionText}>Selected Items: {selectedIds.size}</Text>
      </View>
    );
  }, [searchQuery, selectedIds]);

  // 10. Footer Component rendering the loading spinner for pagination
  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#667eea" />
        <Text style={styles.footerText}>Loading more items...</Text>
      </View>
    );
  }, [isLoadingMore]);

  return (
    <FlatList 
      data={filteredProducts}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      renderItem={renderItem}
      
      // Core Virtualization & Rendering Tuning
      initialNumToRender={10}       // Speed up screen mount
      windowSize={10}               // Limit memory rendering range (10 screen bounds)
      removeClippedSubviews={true}  // Free off-screen cells from native memory buffer
      getItemLayout={getItemLayout}
      
      // Scroll-to-End Triggers
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}   // Fired when scroll is halfway through remaining content
      
      // Pull to refresh triggers
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
    backgroundColor: '#f7fafc',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInput: {
    height: 44,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#f7fafc',
  },
  selectionText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5568',
  },
  row: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  rowSelected: {
    backgroundColor: '#ebf8ff',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a202c',
  },
  category: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginRight: 10,
  },
  selectionIndicator: {
    fontSize: 18,
  },
  footerContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#718096',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the count of items in the list. Virtualization keeps active renders to $O(W)$ where $W$ is the visible window height.
- **Space Complexity**: $O(N)$ to keep the items array in memory.
- **Explanation**: This list implements several react performance optimizations. Individual rows are wrapped in `React.memo` using custom equality properties checks. Callbacks for scrolling and row updates are memoized using `useCallback` to avoid re-allocating reference addresses. FlatList's `getItemLayout` is configured to bypass dynamic cell dimension calculations, and virtual parameters (`windowSize`, `initialNumToRender`, `removeClippedSubviews`) are tuned to reduce runtime heap footprints.

---

## Program 2: Custom NetInfo Connectivity Hook (`useNetwork`)
*⏱️ 2 min read*

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

### Complexity & Explanation
- **Time Complexity**: $O(1)$ event listener registry on mount.
- **Space Complexity**: $O(1)$ constant local state storage.
- **Explanation**: Implements a custom hook that monitors network connectivity changes via NetInfo. It listens to network events on mount, and uses the `useEffect` cleanup callback closure to unsubscribe when unmounted, preventing background reference memory leaks.

```

---

## Program 3: Expo Config Plugin configuration
*⏱️ 2 min read*

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

### Complexity & Explanation
- **Time Complexity**: $O(1)$ during bundle configuration generation.
- **Space Complexity**: $O(1)$ configurations storage.
- **Explanation**: Modifies `AndroidManifest.xml` using Expo's modular Config Plugin interface. It parses the current XML representation, searches for `REQUEST_INSTALL_PACKAGES` to prevent duplicates, and pushes the permissions node dynamically.

```

---

## Program 4: Native Android Module Bridge (Kotlin)
*⏱️ 2 min read*

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

### Complexity & Explanation
- **Time Complexity**: $O(B)$ where $B$ is the byte length of the input string being hashed. Running the operation inside a Kotlin background thread keeps the Java/Kotlin Main UI Thread free from blocking delays.
- **Space Complexity**: $O(B)$ to buffer the byte array data during message digestion.
- **Explanation**: A React Native Native Module implemented in Kotlin. It registers the class as `CryptoBridge` and runs cryptographic calculations asynchronously. By executing the hash computation in a separate `Thread`, it prevents blocking Android's Main UI thread, returning the hexadecimal hash string back to JS using React Native's `Promise` bridge interface.

---

## Program 5: Fetch and Render List from API (Todos)
*⏱️ 2 min read*

### Question
Write a complete, optimized React Native component structure that fetches a list of todos from `https://dummyjson.com/todos` on component mount, handles loading and error states, and renders the list using a `FlatList` container displaying each todo's status and title.

### Sample Input & Output
#### API Input:
```json
{
  "todos": [
    { "id": 1, "todo": "Do something nice for someone you care about", "completed": false, "userId": 152 },
    { "id": 2, "todo": "Memorize a poem", "completed": true, "userId": 13 }
  ],
  "total": 254,
  "skip": 0,
  "limit": 30
}
```
#### Output:
Renders a loading indicator during fetch operations. Once fetched, displays a scrollable list of todos showing their completion status (e.g. checkmark or dot) and titles in a clean cards layout, with pull-to-refresh capabilities.

### Code
```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

const API_URL = 'https://dummyjson.com/todos';

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface ApiResponse {
  todos: TodoItem[];
  total: number;
  skip: number;
  limit: number;
}

// 1. Memoized todo cell to prevent redundant draws
const TodoRow = React.memo(({ item }: { item: TodoItem }) => {
  return (
    <View style={[styles.todoCard, item.completed && styles.todoCardCompleted]}>
      <View style={styles.statusIndicator}>
        <Text style={[styles.statusText, item.completed && styles.statusTextCompleted]}>
          {item.completed ? '✅' : '⏳'}
        </Text>
      </View>
      <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
        {item.todo}
      </Text>
    </View>
  );
});

export default function TodoListApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch data from remote endpoint using AbortController for memory safety
  const fetchTodos = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      setError(null);
      const response = await fetch(API_URL, { signal: abortSignal });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setTodos(data.todos || []);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    
    fetchTodos(controller.signal);

    // Clean up to abort pending request if component unmounts mid-flight
    return () => {
      controller.abort();
    };
  }, [fetchTodos]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchTodos();
  };

  const renderItem = useCallback(({ item }: { item: TodoItem }) => {
    return <TodoRow item={item} />;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.infoText}>Loading todos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Task Board ({todos.length})</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.infoText}>No tasks found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
  },
  listContent: {
    padding: 12,
  },
  todoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  todoCardCompleted: {
    backgroundColor: '#edf2f7',
    borderColor: '#cbd5e0',
  },
  statusIndicator: {
    marginRight: 12,
  },
  statusText: {
    fontSize: 18,
  },
  statusTextCompleted: {
    opacity: 0.8,
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    color: '#2d3748',
    lineHeight: 20,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#718096',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 15,
    color: '#718096',
  },
  errorText: {
    fontSize: 16,
    color: '#c53030',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#667eea',
    borderRadius: 6,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of fetched todo items rendered by the FlatList. The API request takes $O(1)$ networking time.
- **Space Complexity**: $O(N)$ space in memory to store the todo array list in state.
- **Explanation**: This component fetches todo data from dummyjson and handles loading and error states. It uses an `AbortController` passed to the fetch signal inside a `useEffect` loop. If the component unmounts before the network call completes, the controller aborts the request, preventing memory leaks and attempts to run `setTodos` on an unmounted context.

---

## Program 6: Reusable API Calling Wrappers (Fetch vs. Axios)
*⏱️ 2 min read*

### Question
Write generic, production-ready asynchronous API call wrappers in React Native using both **Fetch API** and **Axios**. The wrappers must support authorization headers, custom timeouts, request cancellation via `AbortController`, global interceptors (for handling token refreshes or logouts on `401 Unauthorized`), and fetch the mock posts from `https://dummy-json.mock.beeceptor.com/posts`.

### Sample Input & Output
#### Usage:
```typescript
// Fetch wrapper
const fetchResult = await fetchClient.get('/posts');

// Axios wrapper
const axiosResult = await axiosClient.get('/posts');
```
#### Output:
Returns parsed array of post objects from the beeceptor API or propagates structured error classes with network status codes.

### Code

#### 1. Modern Fetch API Wrapper with Timeout and Request Cancellation
```typescript
export interface RequestOptions extends RequestInit {
  timeout?: number;
}

class FetchClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Helper to attach authorization header
  private async getHeaders(): Promise<HeadersInit> {
    // In production, fetch this from react-native-mmkv or react-native-keychain
    const token = "mock_aws_cognito_access_token"; 
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async get<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { timeout = 10000, ...customConfig } = options;
    const url = `${this.baseURL}${endpoint}`;

    // Create abort controller for timeout and cancellation support
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const defaultHeaders = await this.getHeaders();
    const config: RequestInit = {
      method: 'GET',
      headers: { ...defaultHeaders, ...customConfig.headers },
      signal: controller.signal,
      ...customConfig,
    };

    try {
      const response = await fetch(url, config);
      clearTimeout(id);

      // Handle 401 Unauthorized globally
      if (response.status === 401) {
        // Trigger global logouts or token refresh flows
        console.error("Session expired. Redirecting...");
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error: any) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw new Error(`Request timed out or aborted after ${timeout}ms`);
      }
      throw error;
    }
  }
}

export const fetchClient = new FetchClient('https://dummy-json.mock.beeceptor.com');
```

#### 2. Advanced Axios Wrapper with Request/Response Interceptors
```typescript
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

class AxiosClient {
  public api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // 1. Request Interceptor: Attach Auth Token dynamically on outgoing threads
    this.api.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = "mock_aws_cognito_access_token"; // fetch from secure MMKV storage
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 2. Response Interceptor: Catch errors and orchestrate silent Refresh Tokens
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 and request has not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            console.log("Token expired. Fetching fresh access token...");
            const newAccessToken = await this.refreshAuthSession();
            
            // Re-assign new headers and retry the original request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            // If refresh fails, log the user out cleanly
            console.error("Token refresh failed. Directing to Auth screen.");
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshAuthSession(): Promise<string> {
    // Simulate background API refresh request using a refresh token
    const refreshResponse = await axios.post('https://dummy-json.mock.beeceptor.com/refresh', {
      refreshToken: "mock_aws_cognito_refresh_token",
    });
    return refreshResponse.data.accessToken;
  }
}

export const axiosClient = new AxiosClient('https://dummy-json.mock.beeceptor.com').api;
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ setups. Network transactions run in $O(1)$ time, with timeout limits set to 10 seconds.
- **Space Complexity**: $O(1)$ auxiliary space allocations.
- **Explanation**: Showcases two production-ready API client wrappers. The `FetchClient` leverages native Fetch with `AbortController` timeouts. The `AxiosClient` builds on Axios interceptors: a request interceptor dynamically injects the token from storage, while the response interceptor catches `401` errors, launches a silent refresh token request, and transparently retries the original operation.

---

## Program 7: MMKV State Persist & React Query Offline Caching with Optimistic Updates
*⏱️ 3 min read*

### Question
Implement a complete React Native state and query cache synchronization setup:
1. Configure a **Zustand store** persisted in local memory using **MMKV**.
2. Configure **TanStack React Query** with a Sync Storage Persister wrapper around **MMKV** to support offline client starts.
3. Write clean CRUD query hook definitions (GET, POST, PUT, DELETE) using the `posts` endpoint structure from `https://dummy-json.mock.beeceptor.com/posts`.
4. Implement **Optimistic Updates** on the POST/PUT mutations to immediately reflect updates in the UI during offline states, and rollback mutations if the API request rejects.

### Sample Input & Output
#### Input:
- Client goes offline. User modifies a post's title.
#### Output:
- The UI reflects the new title instantly (Optimistic update).
- If the network request fails, the local query cache rolls back to the previous title, and a console warning triggers.
- The entire cache state remains stored inside MMKV, allowing instant loading on subsequent app launches.

### Code

#### 1. MMKV Zustand Persistence Engine Setup
```typescript
import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

// Custom StateStorage adapter to bind MMKV storage with Zustand persist hooks
const mmkvZustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.delete(name);
  },
};

interface UserSessionState {
  userId: string | null;
  username: string | null;
  setSession: (userId: string, username: string) => void;
  clearSession: () => void;
}

export const useUserSessionStore = create<UserSessionState>()(
  persist(
    (set) => ({
      userId: null,
      username: null,
      setSession: (userId, username) => set({ userId, username }),
      clearSession: () => set({ userId: null, username: null }),
    }),
    {
      name: 'user-session-storage', // Key name in MMKV
      storage: mmkvZustandStorage,
    }
  )
);
```

#### 2. TanStack Query Cache Persister Setup (MMKV-Backed)
```typescript
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // Keep garbage collection cache active for 24 hours
      staleTime: 1000 * 60 * 5,     // Treat data as fresh for 5 minutes
      networkMode: 'offlineFirst', // Allow cached data resolution before network checks
    },
    mutations: {
      networkMode: 'offlineFirst',
    }
  },
});

// Configure synchronous persister using MMKV
const queryCacheStorage = new MMKV({ id: 'react-query-cache' });

const mmkvQueryPersister = createSyncStoragePersister({
  storage: {
    setItem: (key, value) => queryCacheStorage.set(key, value),
    getItem: (key) => {
      const value = queryCacheStorage.getString(key);
      return value ?? null;
    },
    removeItem: (key) => queryCacheStorage.delete(key),
  },
});

// Initialize persister binding
persistQueryClient({
  queryClient,
  persister: mmkvQueryPersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 Hours validity
});
```

#### 3. CRUD Hooks & Optimistic Updates
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://dummy-json.mock.beeceptor.com';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 1. GET Query (Read)
export function useFetchPosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/posts`);
      return res.data;
    },
  });
}

// 2. POST Mutation (Create) with Optimistic Updates
export function useCreatePost() {
  return useMutation<Post, Error, Omit<Post, 'id'>>({
    mutationFn: async (newPost) => {
      const res = await axios.post(`${API_BASE}/posts`, newPost);
      return res.data;
    },
    // Triggers instantly before the api promise resolves
    onMutate: async (newPost) => {
      // Cancel outgoing refetches to prevent cache overrides
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous query cache state
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically append the new item with a temp ID
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(['posts'], [
          ...previousPosts,
          { ...newPost, id: Date.now() }, // Temp client-side ID
        ]);
      }

      // Return context containing previous state for rollback
      return { previousPosts };
    },
    // If the network call fails, restore the snapshot
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      console.warn("Create Post mutation failed, cache rolled back:", err.message);
    },
    // Always invalidates and refetches on completion or error to sync database
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 3. PUT Mutation (Update) with Optimistic Updates
export function useUpdatePost() {
  return useMutation<Post, Error, Post>({
    mutationFn: async (updatedPost) => {
      const res = await axios.put(`${API_BASE}/posts/${updatedPost.id}`, updatedPost);
      return res.data;
    },
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically update the target post inside the array
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ['posts'],
          previousPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
      }

      return { previousPosts };
    },
    onError: (err, updatedPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 4. DELETE Mutation (Delete) with Optimistic Updates
export function useDeletePost() {
  return useMutation<void, Error, number>({
    mutationFn: async (postId) => {
      await axios.delete(`${API_BASE}/posts/${postId}`);
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically remove the item from the list
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ['posts'],
          previousPosts.filter((post) => post.id !== postId)
        );
      }

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ local read/write caches.
- **Space Complexity**: $O(N)$ state memory to cache the transactions.
- **Explanation**: Binds Zustand state storage and TanStack React Query with synchronous MMKV storage. Configures query client offline caching persisters. Implements optimistic query updates (POST, PUT, DELETE) that immediately update client-side caches, with `onError` rollbacks restoring previous values if remote API calls reject.

---

## Program 8: Reanimated Swipe & Pan Gesture Card Component (UI Cloning & Animation)
*⏱️ 2 min read*

### Question
Implement an interactive swipe-to-dismiss dashboard payment card using `react-native-gesture-handler` and `react-native-reanimated`. The card layout must represent a high-fidelity credit card clone, animate rotation and transition dynamically based on drag coordinates, trigger callback events when swiped off-screen limits, and snap back smoothly using spring physics if released early.

### Sample Input & Output
#### Props Input:
```tsx
<SwipableCard 
  onSwipeLeft={() => console.log('Discarded Card')}
  onSwipeRight={() => console.log('Selected Card')}
/>
```
#### Output:
Renders a credit card component that can be dragged in 2D space. The card tilts dynamically as it is dragged. Swiping beyond 40% of the screen width animates the card off-screen and fires JS callbacks; releasing it early triggers a spring snap animation restoring card origin coordinate values.

### Code
```tsx
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS 
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.4;

export function SwipableCard({ onSwipeLeft, onSwipeRight }: { 
  onSwipeLeft: () => void; 
  onSwipeRight: () => void; 
}) {
  // Shared values run in C++ thread, keeping the JS thread free
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (translateX.value > SWIPE_THRESHOLD) {
        // Swipe Right animation
        translateX.value = withSpring(SCREEN_WIDTH, { velocity: event.velocityX });
        runOnJS(onSwipeRight)();
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        // Swipe Left animation
        translateX.value = withSpring(-SCREEN_WIDTH, { velocity: event.velocityX });
        runOnJS(onSwipeLeft)();
      } else {
        // Snap back to starting position using spring physics
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = `${(translateX.value / SCREEN_WIDTH) * 15}deg`;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: rotate },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.cardTitle}>PREMIUM LEDGER</Text>
          <Text style={styles.cardNumber}>**** **** **** 9876</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardHolderLabel}>CARD HOLDER</Text>
              <Text style={styles.cardHolder}>RAJEEV JOSHI</Text>
            </View>
            <View>
              <Text style={styles.cardHolderLabel}>EXPIRES</Text>
              <Text style={styles.cardHolder}>12/30</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
  },
  card: {
    width: 320,
    height: 200,
    backgroundColor: '#1a202c',
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  cardTitle: { 
    color: '#ed8936', 
    fontSize: 16, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  cardNumber: { 
    color: '#ffffff', 
    fontSize: 22, 
    letterSpacing: 2, 
    marginVertical: 16,
    fontFamily: 'Courier'
  },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  cardHolderLabel: { 
    color: '#a0aec0', 
    fontSize: 9, 
    fontWeight: '600' 
  },
  cardHolder: { 
    color: '#ffffff', 
    fontSize: 13, 
    fontWeight: 'bold',
    marginTop: 2
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ calculations. Gesture tracking compiles natively on the OS thread, bypassing event serialize delays.
- **Space Complexity**: $O(1)$ space allocation for shared values.
- **Explanation**: This program clones a premium card UI utilizing gesture pan configurations. By using Reanimated's `useSharedValue` and `useAnimatedStyle`, translation values are tracked and computed entirely on the UI thread via C++ modules (Worklets). This ensures the JS main thread never drops frames, executing swipe snapping at 60/120 FPS.

---

## Program 9: Native Module Bridge (Kotlin Android & Swift iOS)
*⏱️ 4 min read*

### Question
Create a custom Native Module package battery status bridge named `BatteryMonitor`.
1. Implement the Android portion in **Kotlin** exposing a ReactMethod `getBatteryStatus()` to query battery level percentage and charging state.
2. Implement the iOS portion in **Swift** with Objective-C macros to export variables and methods.
3. Show how to interface the native module in TypeScript, including type configurations.

### Sample Input & Output
#### JS/TS Invocation:
```typescript
import NativeModules from 'react-native';
const status = await NativeModules.BatteryMonitor.getBatteryStatus();
```
#### Output:
```json
{ "level": 84, "isCharging": true }
```

### Code

#### 1. Android Native Kotlin Module (`BatteryMonitorModule.kt`)
```kotlin
package com.myportal.batterymonitor

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.*

class BatteryMonitorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    override fun getName(): String = "BatteryMonitor"

    @ReactMethod
    fun getBatteryStatus(promise: Promise) {
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        val intent = reactApplicationContext.registerReceiver(null, filter)
        
        if (intent != null) {
            val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
            val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
            val percentage = (level.toFloat() / scale.toFloat() * 100).toInt()
            
            val status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1)
            val isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING || 
                             status == BatteryManager.BATTERY_STATUS_FULL

            val response = Arguments.createMap().apply {
                putInt("level", percentage)
                putBoolean("isCharging", isCharging)
            }
            promise.resolve(response)
        } else {
            promise.reject("BATTERY_ERROR", "Could not fetch battery details from system intent")
        }
    }
}
```

#### 2. iOS Native Swift Module (`BatteryMonitor.swift`)
```swift
import Foundation
import UIKit

@objc(BatteryMonitor)
class BatteryMonitor: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false // Operations are not UI-bound, runs off main queue safely
  }

  @objc
  func getBatteryStatus(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    UIDevice.current.isBatteryMonitoringEnabled = true
    let level = Int(UIDevice.current.batteryLevel * 100)
    let isCharging = UIDevice.current.batteryState == .charging || UIDevice.current.batteryState == .full
    
    // Check if device battery state is accessible (returns -100 if simulator)
    if level >= 0 {
      let response: [String: Any] = [
        "level": level,
        "isCharging": isCharging
      ]
      resolve(response)
    } else {
      reject("BATTERY_ERROR", "Battery monitoring unavailable or running on iOS Simulator", nil)
    }
  }
}
```

#### 3. iOS Objective-C Bridge Export (`BatteryMonitorBridge.m`)
```objc
#import <React/RCTBridgeModule.h>

@interface RCT_EXPORT_MODULE(BatteryMonitor)

RCT_EXPORT_METHOD(getBatteryStatus:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
```

#### 4. TypeScript Typing Interface (`BatteryMonitor.ts`)
```typescript
import { NativeModules } from 'react-native';

interface BatteryStatus {
  level: number;
  isCharging: boolean;
}

interface BatteryMonitorInterface {
  getBatteryStatus(): Promise<BatteryStatus>;
}

export const BatteryMonitor = NativeModules.BatteryMonitor as BatteryMonitorInterface;
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ constant time queries.
- **Space Complexity**: $O(1)$ mapping structures.
- **Explanation**: Accesses platform-specific OS APIs synchronously and passes them back asynchronously through the bridge. Android retrieves details using System Broadcast Intents (`ACTION_BATTERY_CHANGED`), and iOS queries the `UIDevice` battery state properties, resolving values into JS Promises.

---

## Program 10: Complete GitHub Actions & Fastlane CI/CD Configuration
*⏱️ 2 min read*

### Question
Write a complete, end-to-end production-grade automation setup for React Native deployment:
1. Provide a **GitHub Actions workflow yaml** that installs environments, caches node/ruby nodes, builds and signs Android packages.
2. Provide a **Fastlane Fastfile** defining automated lanes for Android bundle builds (signing via gradle environments) and iOS TestFlight uploads (managing certificates via Fastlane Match).

### Sample Input & Output
#### Input:
- Developer pushes code modification to `master` branch.
#### Output:
- CI pipeline triggers: runs tests, compiles app binaries, code-signs iOS via Match profiles and Android via secrets keystores, and uploads files to stores consoles automatically.

### Code

#### 1. GitHub Actions Setup (`.github/workflows/deploy.yml`)
```yaml
name: Mobile App Production Build
on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: macos-13 # macOS required for iOS compiling
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v3

      - name: Setup Node Environment
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install JS Dependencies
        run: npm ci

      - name: Setup Ruby for Fastlane
        uses: actions/setup-ruby@v1
        with:
          ruby-version: '3.0'

      - name: Install Bundler & Gems
        run: |
          gem install bundler
          bundle install

      - name: Cache CocoaPods
        uses: actions/cache@v3
        with:
          path: ios/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('ios/Podfile.lock') }}

      - name: Install iOS Pods
        run: cd ios && pod install

      - name: Setup Android JDK
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Decode Keystore File
        run: echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > android/app/my-release-key.keystore

      - name: Run CI Tests
        run: npm test -- --watchAll=false

      - name: Execute Fastlane Releases
        env:
          MATCH_PASSWORD: ${{ secrets.MATCH_DECRYPT_PASSWORD }}
          FASTLANE_PASSWORD: ${{ secrets.APPLE_ID_PASSWORD }}
          ANDROID_KEYSTORE_PASSWORD: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
        run: |
          bundle exec fastlane android release
          bundle exec fastlane ios beta
```

#### 2. Fastlane Automation Script (`fastlane/Fastfile`)
```ruby
default_platform(:ios)

platform :ios do
  desc "Build iOS IPA and deploy to TestFlight"
  lane :beta do
    # 1. Sync development/distribution profiles from Git match repo
    match(
      type: "appstore",
      git_url: "git@github.com:myorg/certificates.git",
      readonly: true
    )
    
    # 2. Increment iOS bundle version
    increment_build_number(xcodeproj: "ios/MyApp.xcodeproj")
    
    # 3. Build signed production IPA
    build_app(
      workspace: "ios/MyApp.xcworkspace",
      scheme: "MyApp",
      export_method: "app-store"
    )
    
    # 4. Push package to Apple Connect TestFlight
    upload_to_testflight(
      skip_waiting_to_submit: true
    )
  end
end

platform :android do
  desc "Compile Android AAB and push to Google Play Store"
  lane :release do
    # 1. Build and sign release AAB bundle via gradle task
    gradle(
      task: "bundle",
      build_type: "Release",
      project_dir: "android"
    )
    
    # 2. Upload to play store internal testing track
    upload_to_play_store(
      track: "internal",
      package_name: "com.mycompany.app",
      json_key_data: ENV["GOOGLE_PLAY_JSON_API_KEY"]
    )
  end
end
```

### Complexity & Explanation
- **Time Complexity**: Build compile steps take $O(B)$ where $B$ is build complexity. Run loops take 5-15 mins depending on caching strategies.
- **Space Complexity**: Runner disk allocation space scaled to standard compiler size (typically 4GB-8GB).
- **Explanation**: Implements a complete CI/CD release workflow. Fastlane Match handles iOS code signing by pulling certificates from an encrypted git repository. The GitHub workflow manages environments, decodes the Android keystore from secret variables, runs Jest tests, and triggers Fastlane to compile Android bundles and iOS IPAs, distributing them directly to app store consoles.

---

## Program 11: State Management with MobX State Tree (MST)
*⏱️ 1 min read*

### Question
Write a complete React Native state manager setup using **MobX State Tree (MST)**:
1. Declare a transactional model `CartItem` representing product selections.
2. Declare the root model store `CartStore` tracking items list, and compute reactive total price calculations.
3. Write actions to safely modify observables (addItem, increment, decrement).
4. Implement a shopping cart component wrapped in an `observer` HOC to listen and react to store property updates.

### Sample Input & Output
#### Input Action:
- Client adds product item details to cart.
#### Output:
- Component detects changes and re-renders cart totals instantly. Clicking increment/decrement triggers MST model actions directly, updating prices without triggering rendering checks on unaffected properties.

### Code
```typescript
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { types, Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

// 1. Define atomic model node for cart item
export const CartItem = types
  .model('CartItem', {
    id: types.identifier,
    name: types.string,
    price: types.number,
    quantity: types.number,
  })
  .actions((self) => ({
    // Actions are strict: mutations are not allowed outside action closures
    increment() {
      self.quantity += 1;
    },
    decrement() {
      if (self.quantity > 1) {
        self.quantity -= 1;
      }
    },
  }));

// 2. Define root Cart Store
export const CartStore = types
  .model('CartStore', {
    items: types.array(CartItem),
  })
  .views((self) => ({
    // Derived values are computed: cached and only updated if dependencies change
    get totalCount(): number {
      return self.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    get totalPrice(): number {
      return self.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  }))
  .actions((self) => ({
    addItem(id: string, name: string, price: number) {
      const existing = self.items.find((item) => item.id === id);
      if (existing) {
        existing.increment();
      } else {
        self.items.push(CartItem.create({ id, name, price, quantity: 1 }));
      }
    },
    removeItem(id: string) {
      const idx = self.items.findIndex((item) => item.id === id);
      if (idx !== -1) {
        self.items.splice(idx, 1);
      }
    },
  }));

// Generate TypeScript instance contracts
export type ICartStore = Instance<typeof CartStore>;
export type ICartItem = Instance<typeof CartItem>;

// Initialize model instance (mock database lookup)
export const cartStoreInstance = CartStore.create({
  items: [
    { id: "p101", name: "Fintech Token", price: 1.99, quantity: 2 },
    { id: "p102", name: "Ledger Card", price: 15.50, quantity: 1 }
  ]
});

// 3. React Component wrapped in observer to trigger reactive UI updates
export const CartView = observer(({ store }: { store: ICartStore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Portfolio Store Cart ({store.totalCount})</Text>
      
      <FlatList
        data={store.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ICartItem }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>${item.price.toFixed(2)} x {item.quantity}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="-" onPress={item.decrement} />
              <Text style={styles.qty}>{item.quantity}</Text>
              <Button title="+" onPress={item.increment} />
              <Button title="✕" color="red" onPress={() => store.removeItem(item.id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Grand Total:</Text>
        <Text style={styles.totalValue}>${store.totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  sub: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qty: {
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#a0aec0',
    marginTop: 40,
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#cbd5e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38a169',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ average mutations and property resolution.
- **Space Complexity**: $O(N)$ memory bounds where $N$ is product items size.
- **Explanation**: MobX State Tree uses static type definitions to validate model nodes. The `observer` HOC tracks property getters called during render, ensuring updates only trigger re-renders for components accessing changed fields. Derived calculations (`totalCount`, `totalPrice`) are cached using `@computed` view properties, preventing redundant evaluations.

---

## Program 12: SQLite Transactional Ledger Database Hook
*⏱️ 2 min read*

### Question
Write a custom React Native hook `useLedgerDatabase` that integrates a local **SQLite database** using `react-native-sqlite-storage`. The hook must:
1. Initialize the SQLite database connection off-thread.
2. Execute a database transaction to create tables if they do not exist.
3. Provide a transactional action `addTransaction()` that inserts record fields within an ACID SQL transaction.
4. Calculate net balance aggregates using SQL `SUM()` queries and clean up connection files on hook unmount.

### Sample Input & Output
#### Hook usage:
```typescript
const { balance, addTransaction } = useLedgerDatabase();
await addTransaction("tx_999", 250.00, "credit");
```
#### Output:
Saves transactions locally. Calculates balance via SQL aggregates, triggering updates to balance state. SQLite transactions run in a separate native SQL thread, leaving the main JS thread unblocked.

### Code
```typescript
import { useEffect, useState, useCallback } from 'react';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true); // Enable promise-based SQLite calls

const DB_PARAMS = { name: 'FintechLedger.db', location: 'default' };

export function useLedgerDatabase() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [balance, setBalance] = useState<number>(0);

  // Helper to re-evaluate total balance via SQL sum query
  const calculateBalance = async (database: SQLite.SQLiteDatabase) => {
    try {
      const results = await database.executeSql(
        "SELECT SUM(CASE WHEN type = 'credit' THEN amount ELSE -amount END) as netBalance FROM ledger;"
      );
      const row = results[0].rows.item(0);
      setBalance(row.netBalance || 0);
    } catch (err: any) {
      console.error("SQL aggregation failure:", err.message);
    }
  };

  useEffect(() => {
    let activeDb: SQLite.SQLiteDatabase | null = null;

    const openDatabase = async () => {
      try {
        const openedDb = await SQLite.openDatabase(DB_PARAMS);
        activeDb = openedDb;
        setDb(openedDb);

        // Execute table initialization inside a Transaction
        await openedDb.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ledger (
              id TEXT PRIMARY KEY,
              amount REAL NOT NULL,
              type TEXT CHECK(type IN ('credit', 'debit')) NOT NULL,
              timestamp INTEGER NOT NULL
            );`
          );
        });

        await calculateBalance(openedDb);
      } catch (err: any) {
        console.error("Database connection failure:", err.message);
      }
    };

    openDatabase();

    // Close connections on unmount to prevent resource locks
    return () => {
      if (activeDb) {
        activeDb.close().catch(err => console.error("Database close failure:", err));
      }
    };
  }, []);

  // Expose transactional insert API
  const addTransaction = useCallback(async (id: string, amount: number, type: 'credit' | 'debit') => {
    if (!db) {
      throw new Error("Database not initialized yet");
    }

    try {
      await db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO ledger (id, amount, type, timestamp) VALUES (?, ?, ?, ?);",
          [id, amount, type, Date.now()]
        );
      });
      
      // Update balance calculations
      await calculateBalance(db);
    } catch (err: any) {
      console.error("SQL execution transaction rejected:", err.message);
      throw err;
    }
  }, [db]);

  return { balance, addTransaction };
}
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Transaction execution**: $O(1)$ average query insertions.
  - **Balance summation query**: $O(K)$ where $K$ is transaction records size.
- **Space Complexity**: $O(1)$ memory usage. Records are stored on disk.
- **Explanation**: This hook establishes a local SQLite relational storage engine. It creates tables and runs write commands inside a SQL `transaction` to guarantee ACID properties (atomicity and data integrity). The computations are offloaded to a background native C++ thread by `react-native-sqlite-storage`, keeping the JS thread unblocked.

---

## Program 13: Multi-Layered Testing Suite (Jest + RNTL + Detox)
*⏱️ 3 min read*

### Question
Write a complete, structured test automation suite for a React Native component.
1. Provide a standard React Native **Authentication Screen** component (`LoginScreen`).
2. Provide a **Jest unit test** suite using `@testing-library/react-native` to verify mock component actions, credentials verification, and button touch trigger calls.
3. Provide a **Detox E2E test** specification script asserting visual view shifts and element matching.

### Sample Input & Output
#### Input:
- User launches test runner.
#### Output:
- Jest outputs successful unit verification reports.
- Detox spins up iOS/Android emulator, types keys into fields, clicks the login button, and verifies successful navigation transitions.

### Code

#### 1. React Native Target Component (`LoginScreen.tsx`)
```tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'secret') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Gateway</Text>
      
      <TextInput
        testID="username_input"
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        testID="password_input"
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      {error ? <Text testID="error_text" style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        testID="login_button" 
        style={styles.button} 
        onPress={handleLogin}
      >
        <Text style={styles.btnLabel}>AUTHORIZE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#cbd5e0', padding: 12, borderRadius: 8, marginVertical: 8 },
  errorText: { color: '#e53e3e', fontSize: 13, textAlign: 'center', marginVertical: 8, fontWeight: '600' },
  button: { backgroundColor: '#3182ce', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  btnLabel: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 }
});
```

#### 2. Jest & React Native Testing Library Integration Suite (`LoginScreen.test.tsx`)
```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from './LoginScreen';

describe('LoginScreen Component', () => {
  it('displays error message on invalid credentials', () => {
    const mockSuccess = jest.fn();
    const { getByTestId, queryByTestId } = render(<LoginScreen onLoginSuccess={mockSuccess} />);
    
    // Simulate typing text inputs
    fireEvent.changeText(getByTestId('username_input'), 'wrong_user');
    fireEvent.changeText(getByTestId('password_input'), 'wrong_pass');
    
    // Simulate press interaction
    fireEvent.press(getByTestId('login_button'));
    
    expect(getByTestId('error_text').props.children).toBe('Invalid credentials');
    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('triggers login callback on correct credentials', () => {
    const mockSuccess = jest.fn();
    const { getByTestId, queryByTestId } = render(<LoginScreen onLoginSuccess={mockSuccess} />);
    
    fireEvent.changeText(getByTestId('username_input'), 'admin');
    fireEvent.changeText(getByTestId('password_input'), 'secret');
    fireEvent.press(getByTestId('login_button'));
    
    expect(queryByTestId('error_text')).toBeNull();
    expect(mockSuccess).toHaveBeenCalledTimes(1);
  });
});
```

#### 3. Detox End-to-End Test Spec (`login.spec.js`)
```javascript
describe('E2E Authentication Flow', () => {
  beforeEach(async () => {
    // Reload react native instance before each test
    await device.reloadReactNative();
  });

  it('validates navigation stack swap upon correct login', async () => {
    // Match elements using testID queries and enter test values
    await element(by.id('username_input')).typeText('admin');
    await element(by.id('password_input')).typeText('secret');
    
    // Dismiss keyboard and press login button
    await element(by.id('login_button')).tap();
    
    // Verify error does not exist and target view transitions successfully
    await expect(element(by.id('error_text'))).toNotExist();
    await expect(element(by.text('Dashboard'))).toBeVisible();
  });
});
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Unit testing**: $O(1)$ assertions running in ms.
  - **E2E testing**: $O(S)$ where $S$ is scenario complexity. Takes seconds due to emulator launches.
- **Space Complexity**: $O(N)$ virtualization heap memory.
- **Explanation**: Shows a multi-layered testing workflow. Unit tests execute virtual rendering using JS/React Native Testing Library in node memory, asserting callbacks instantly. Detox runs grey-box E2E testing on compiled Android/iOS apps on real device simulators, waiting for background animations to finish before running checks.

---

## Program 14: Webpack Module Federation Configuration (Re.Pack Host & Remote Bundle Setup)
*⏱️ 2 min read*

### Question
Design and implement a Webpack configuration (`webpack.config.js`) for a React Native Container (Host) application using **Re.Pack** to enable Webpack Module Federation. Include the dynamic script component loader interface in TypeScript (`FederatedLoader.tsx`) that dynamically resolves and renders remote bundles on-demand.

### Sample Input & Output
#### Input:
- React Native renders `<FederatedLoader remote="rewards" module="./RewardsHub" />`.
#### Output:
- Webpack ScriptManager fetches the remote JS/Hermes chunk from `https://cdn.mybank.com/rewards/1.0.0/rewards.container.bundle.js` at runtime, resolves dependencies, and mounts the RewardsHub screen dynamically.

### Code

#### 1. Webpack Federation Config (`webpack.config.js`)
```javascript
const path = require('path');
const Repack = require('@callstack/repack');

module.exports = (env) => {
  const { mode, platform, devServer } = env;

  return {
    mode,
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'build', platform),
      filename: 'index.bundle',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['module:metro-react-native-babel-preset'],
            },
          },
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        platform,
        devServer,
      }),
      // Module Federation configuration
      new Repack.plugins.ModuleFederationPlugin({
        name: 'container',
        shared: {
          react: { singleton: true, eager: true },
          'react-native': { singleton: true, eager: true },
          'react-native-reanimated': { singleton: true, eager: true },
          '@react-navigation/native': { singleton: true, eager: true },
        },
        remotes: {
          // Remotes are loaded dynamically via URL script resolution
          rewards: 'rewards@https://cdn.mybank.com/rewards/1.0.0/[platform]/rewards.container.bundle.js',
          loans: 'loans@https://cdn.mybank.com/loans/1.0.0/[platform]/loans.container.bundle.js',
        },
      }),
    ],
  };
};
```

#### 2. Dynamic Component Script Loader (`FederatedLoader.tsx`)
```typescript
import React, { Suspense, lazy } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Federated } from '@callstack/repack/client';

interface FederatedLoaderProps {
  remote: string;   // Remote container name (e.g. 'rewards')
  module: string;   // Exposed module path (e.g. './RewardsHub')
  fallback?: React.ComponentType;
}

export function FederatedLoader({ remote, module, fallback }: FederatedLoaderProps) {
  // Load remote component dynamically using Federated resolver
  const DynamicComponent = lazy(() => 
    Federated.importModule(remote, module)
      .then((m) => m)
      .catch((err) => {
        console.error('Failed to load federated module:', err);
        return {
          default: () => (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Feature temporarily unavailable offline</Text>
            </View>
          ),
        };
      })
  );

  return (
    <Suspense fallback={fallback || <ActivityIndicator size="large" color="#3182ce" style={styles.spinner} />}>
      <DynamicComponent />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  spinner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#718096', fontSize: 15, fontWeight: '500' },
});
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Resolution**: $O(1)$ lookup inside Webpack container registry.
  - **Loading**: $O(N)$ network latency based on network capacity to download the chunk.
- **Space Complexity**: $O(B)$ memory allocation inside the Hermes JS Virtual Machine corresponding to the dynamic chunk bundle size $B$.
- **Explanation**: Metro cannot split or load remote code chunks at runtime. Re.Pack replaces Metro with Webpack, allowing the Host container to boot dynamically. When `<FederatedLoader>` is mounted, the ScriptManager downloads the remote Javascript/Hermes bytecode container, resolves shared singleton dependencies (`react`, `react-native`) from the host's active RAM space, and compiles the feature on-the-fly, creating a Super-App interface.

---

## Program 15: Hardened C++ JNI Bridge Module (Android JNI/Kotlin & iOS Obj-C++/Swift)
*⏱️ 3 min read*

### Question
To prevent reverse engineering of sensitive client secrets (e.g., API keys) from plain-text Javascript bundles, implement a native secure storage module.
1. Write the Android C++ source code (`secure-keys.cpp`) declaring a JNI wrapper returning XOR-obfuscated keys.
2. Write the Android Kotlin Module (`SecureKeysModule.kt`) to bind JNI and register the bridge.
3. Write the iOS Objective-C++ header/implementation files (`SecureKeysBridge.mm`) exporting the Swift methods to React Native.
4. Write the iOS Swift code (`SecureKeys.swift`) to perform XOR decryption of keys stored in C-style byte arrays.

### Sample Input & Output
#### Input:
- JS invokes `NativeModules.SecureKeysModule.getPaymentApiKey()`.
#### Output:
- Returns the decrypted string `sk_live_51M3f...` in JavaScript memory at runtime, while binary strings checks on static build files (e.g. `strings index.bundle` or decompiled Java classes) return only obfuscated byte hashes.

### Code

#### 1. Android JNI C++ Implementation (`secure-keys.cpp`)
```cpp
#include <jni.h>
#include <string>

// XOR Mask key used for obfuscation
const uint8_t XOR_MASK = 0xAA;

// Obfuscated representation of "sk_live_51M3f" using XOR operation
// Hex values: 's' ^ 0xAA = 0xC9, 'k' ^ 0xAA = 0xC1, etc.
const uint8_t OBFUSCATED_KEY[] = { 0xC9, 0xC1, 0xFD, 0xC2, 0xC3, 0xD0, 0xCE, 0xFD, 0x9F, 0x9B, 0x99, 0xC2 };
const size_t KEY_LENGTH = sizeof(OBFUSCATED_KEY);

extern "C"
JNIEXPORT jstring JNICALL
Java_com_myportal_SecureKeysModule_getDecryptedApiKey(JNIEnv *env, jobject thiz) {
    std::string decrypted = "";
    for (size_t i = 0; i < KEY_LENGTH; i++) {
        // Reverse XOR logic in memory
        decrypted += (char)(OBFUSCATED_KEY[i] ^ XOR_MASK);
    }
    return env->NewStringUTF(decrypted.c_str());
}
```

#### 2. Android Kotlin Module Wrapper (`SecureKeysModule.kt`)
```kotlin
package com.myportal

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class SecureKeysModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Load the compiled C++ library binary
        System.loadLibrary("secure-keys")
    }

    override fun getName(): String = "SecureKeysModule"

    // Declare external JNI C++ function signature
    private external fun getDecryptedApiKey(): String

    @ReactMethod
    fun getPaymentApiKey(promise: Promise) {
        try {
            // Retrieve key computed dynamically in C++ binary space
            val key = getDecryptedApiKey()
            promise.resolve(key)
        } catch (e: Exception) {
            promise.reject("DECRYPTION_ERROR", "Failed to resolve native secure key", e)
        }
    }
}
```

#### 3. iOS Objective-C++ Bridge Interface (`SecureKeysBridge.mm`)
```objc
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SecureKeysModule, NSObject)

RCT_EXTERN_METHOD(getPaymentApiKey:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

@end
```

#### 4. iOS Swift Wrapper Implementation (`SecureKeys.swift`)
```swift
import Foundation
import React

@objc(SecureKeysModule)
class SecureKeysModule: NSObject {

  // XOR Mask used for key resolution
  private let xorMask: UInt8 = 0xAA
  
  // Obfuscated representation of "sk_live_51M3f" using XOR operation
  private let obfuscatedKey: [UInt8] = [0xC9, 0xC1, 0xFD, 0xC2, 0xC3, 0xD0, 0xCE, 0xFD, 0x9F, 0x9B, 0x99, 0xC2]

  @objc(getPaymentApiKey:rejecter:)
  func getPaymentApiKey(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    var decryptedBytes = [UInt8]()
    
    for byte in obfuscatedKey {
      // Reverse the XOR mask dynamically in RAM
      decryptedBytes.append(byte ^ xorMask)
    }
    
    if let decryptedString = String(bytes: decryptedBytes, encoding: .utf8) {
      resolve(decryptedString)
    } else {
      reject("DECRYPTION_ERROR", "Failed to decrypt native iOS key", nil)
    }
  }
}
```

### Complexity & Explanation
- **Time Complexity**: $O(K)$ linear conversion where $K$ is key length. Runs in sub-millisecond execution times.
- **Space Complexity**: $O(K)$ temporary memory heap allocation.
- **Explanation**: Metro compiles `.env` variables into plaintext strings directly within `index.bundle`, making them easily discoverable via basic static analysis. This native bridge relocates keys into compiled C++ binary storage (`.so` / `.a` libraries). The strings are obfuscated using XOR masks, which ensures they do not reside as raw strings in binary data pools. They are assembled back into plaintext directly inside CPU register operations only at runtime.

---

## Program 16: Secure Purchase Validation & Transaction Sync Hook
*⏱️ 2 min read*

### Question
Design a React Native custom hook (`usePurchaseManager.ts`) using `react-native-iap` to coordinate secure subscription transactions:
1. Initialize the purchase event listeners, register purchase updates, and serialize purchase payloads into a local transactional SQLite database (outbox).
2. Invoke a secure backend validation server endpoint (`/api/verify-receipt`) for verification.
3. Automatically monitor connection recovery using `NetInfo` to reconcile and upload pending transactions offline.

### Sample Input & Output
#### Input:
- User triggers `buyProduct("gold_monthly")`.
- Device goes offline during transaction completion.
#### Output:
- Saves the transaction to SQLite.
- On connection recovery, `NetInfo` fires, executing receipt uploads to the server, updates local logs, and confirms the purchase.

### Code

```typescript
import { useEffect, useState, useCallback } from 'react';
import * as RNIap from 'react-native-iap';
import NetInfo from '@react-native-community/netinfo';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'transactions.db', location: 'default' });

export function usePurchaseManager() {
  const [purchases, setPurchases] = useState<RNIap.ProductPurchase[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize SQLite Transaction Table
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS receipt_outbox (
          id TEXT PRIMARY KEY,
          productId TEXT,
          transactionReceipt TEXT,
          status TEXT
        );`
      );
    });
  }, []);

  // Post receipt payload to backend database for secure validation
  const validateReceiptWithServer = useCallback(async (purchase: RNIap.ProductPurchase) => {
    const response = await fetch('https://api.mybank.com/api/verify-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: purchase.productId,
        receipt: purchase.transactionReceipt,
      }),
    });

    if (!response.ok) {
      throw new Error('Server receipt validation failed');
    }

    // Acknowledge validation directly with StoreKit / Play Console billing
    await RNIap.finishTransaction({ purchase, isConsumable: false });
  }, []);

  // Sync outbox queue upon network restoration
  const processOfflineOutbox = useCallback(async () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM receipt_outbox WHERE status = 'PENDING';`,
        [],
        async (_, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            try {
              await validateReceiptWithServer({
                productId: item.productId,
                transactionReceipt: item.transactionReceipt,
              } as RNIap.ProductPurchase);

              // Update Outbox Status on Success
              db.transaction((innerTx) => {
                innerTx.executeSql(
                  `UPDATE receipt_outbox SET status = 'COMPLETED' WHERE id = ?;`,
                  [item.id]
                );
              });
            } catch (err) {
              console.error('Failed to sync offline receipt:', err);
            }
          }
        }
      );
    });
  }, [validateReceiptWithServer]);

  // Monitor network status to trigger offline synchronization
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        processOfflineOutbox();
      }
    });
    return () => unsubscribe();
  }, [processOfflineOutbox]);

  // Set up IAP Transaction Update Listeners
  useEffect(() => {
    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        setIsProcessing(true);
        try {
          // 1. Immediately log to local SQLite outbox
          db.transaction((tx) => {
            tx.executeSql(
              `INSERT OR REPLACE INTO receipt_outbox (id, productId, transactionReceipt, status) 
               VALUES (?, ?, ?, 'PENDING');`,
              [purchase.transactionId, purchase.productId, receipt]
            );
          });

          // 2. Attempt validation
          await validateReceiptWithServer(purchase);

          // 3. Mark completed on success
          db.transaction((tx) => {
            tx.executeSql(
              `UPDATE receipt_outbox SET status = 'COMPLETED' WHERE id = ?;`,
              [purchase.transactionId]
            );
          });
        } catch (err) {
          console.warn('IAP error cached in outbox for offline retry:', err);
        } finally {
          setIsProcessing(false);
        }
      }
    });

    const purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
      console.warn('Purchase Error listener:', error);
    });

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, [validateReceiptWithServer]);

  const buyProduct = async (sku: string) => {
    try {
      await RNIap.requestPurchase({ sku });
    } catch (err) {
      console.error('Purchase request failed:', err);
    }
  };

  return { buyProduct, isProcessing, syncOutbox: processOfflineOutbox };
}
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Database Logging**: $O(1)$ instant write.
  - **Server validation**: $O(N)$ HTTP round-trip latency.
- **Space Complexity**: $O(D)$ local storage growth proportional to queue size $D$.
- **Explanation**: This system secures transactions using the Outbox pattern. If network connection fails or the app is closed mid-session, the purchase token remains saved inside local SQLite databases with a `'PENDING'` tag. The hook listens to `NetInfo` alerts, and when internet reaches stability, it flushes the queue sequentially, verifying transactions with the remote backend, ensuring no product purchases are lost.

---

## Program 17: GraphQL API Client Integration with Apollo Client
*⏱️ 2 min read*

### Question
Write a complete React Native component structure that integrates with a GraphQL API endpoint using Apollo Client. 
1. Bootstrap the Apollo Client instance with custom headers, error-link interception (logging out on `401 Unauthorized`), and in-memory cache normalization.
2. Build a component `SecurityPortfolioList` that queries user transactions, uses parameters, handles loading/error layouts, and implements a mutation (e.g. `addTransaction`) with optimistic UI response updates to maintain 60 FPS visual state transitions.

### Sample Input & Output
#### GraphQL Schema (Queries & Mutations):
```graphql
query GetPortfolio($userId: ID!) {
  portfolio(userId: $userId) {
    id
    balance
    holdings {
      symbol
      shares
      value
    }
  }
}

mutation AddHolding($userId: ID!, $symbol: String!, $shares: Int!) {
  addHolding(userId: $userId, symbol: $symbol, shares: $shares) {
    id
    symbol
    shares
    value
  }
}
```
#### Output:
- Displays loading indicators while fetching.
- Renders transaction list normalized from cache.
- Tapping "Add Holding" instantly updates list in memory (Optimistic UI) before network resolver returns.

### Code
```tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
  Button 
} from 'react-native';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  useQuery, 
  useMutation, 
  gql, 
  createHttpLink 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// 1. Setup Apollo Client Http Link
const httpLink = createHttpLink({
  uri: 'https://api.myportal.com/graphql',
});

// 2. Inject Authorization Credentials Dynamically
const authLink = setContext(async (_, { headers }) => {
  const token = 'mock_jwt_session_token'; // Load from Secure MMKV in production
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// 3. Error Interception Link (Token Expired Handling)
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        console.warn('Session expired, triggering logout redirect...');
        // Perform redirection or dispatch logout action here
      }
    }
  }
  if (networkError) console.error(`[Network Error]: ${networkError}`);
});

// 4. Instantiate Normalized Cache Apollo Client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Portfolio: {
        fields: {
          holdings: {
            merge(existing = [], incoming) {
              return [...incoming]; // Cache policy replacement rules
            }
          }
        }
      }
    }
  })
});

// GraphQL Query & Mutation Documents
const GET_PORTFOLIO = gql`
  query GetPortfolio($userId: ID!) {
    portfolio(userId: $userId) {
      id
      balance
      holdings {
        id
        symbol
        shares
        value
      }
    }
  }
`;

const ADD_HOLDING = gql`
  mutation AddHolding($userId: ID!, $symbol: String!, $shares: Int!) {
    addHolding(userId: $userId, symbol: $symbol, shares: $shares) {
      id
      symbol
      shares
      value
    }
  }
`;

interface Holding {
  id: string;
  symbol: string;
  shares: number;
  value: number;
}

interface PortfolioData {
  portfolio: {
    id: string;
    balance: number;
    holdings: Holding[];
  };
}

export function SecurityPortfolioList({ userId }: { userId: string }) {
  // Query hook with configuration policies
  const { data, loading, error, refetch } = useQuery<PortfolioData>(GET_PORTFOLIO, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });

  // Mutation hook with Optimistic UI updates
  const [addHoldingMutation] = useMutation(ADD_HOLDING);

  const handleAddAsset = async () => {
    try {
      await addHoldingMutation({
        variables: { userId, symbol: 'GOOGL', shares: 10 },
        // Optimistic Response triggers instant local cache writes
        optimisticResponse: {
          __typename: 'Mutation',
          addHolding: {
            __typename: 'Holding',
            id: 'temp_id_' + Date.now(),
            symbol: 'GOOGL',
            shares: 10,
            value: 1500.00
          }
        },
        // Update local apollo cache manually based on result
        update: (cache, { data: { addHolding } }) => {
          const existingData = cache.readQuery<PortfolioData>({
            query: GET_PORTFOLIO,
            variables: { userId }
          });

          if (existingData) {
            cache.writeQuery({
              query: GET_PORTFOLIO,
              variables: { userId },
              data: {
                portfolio: {
                  ...existingData.portfolio,
                  holdings: [...existingData.portfolio.holdings, addHolding]
                }
              }
            });
          }
        }
      });
    } catch (err) {
      console.error('Mutation failure:', err);
    }
  };

  if (loading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4a5568" />
        <Text>Fetching Portfolio...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>GraphQL Error: {error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  const holdings = data?.portfolio?.holdings || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Portfolio (Balance: ${data?.portfolio?.balance?.toFixed(2) || '0.00'})</Text>
      <FlatList
        data={holdings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.details}>{item.shares} shares - ${item.value.toFixed(2)}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAsset}>
        <Text style={styles.btnText}>+ ADD GOOGL POSITION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7fafc' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#2d3748' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#e53e3e', marginBottom: 10 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 14, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    marginVertical: 4 
  },
  symbol: { fontWeight: 'bold', color: '#4a5568' },
  details: { color: '#718096' },
  addButton: { 
    backgroundColor: '#3182ce', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

export function ApolloAppWrapper({ userId }: { userId: string }) {
  return (
    <ApolloProvider client={apolloClient}>
      <SecurityPortfolioList userId={userId} />
    </ApolloProvider>
  );
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ query retrieval from normalized cache. Network round trips are $O(G)$ where $G$ is GraphQL server resolver query response time.
- **Space Complexity**: $O(M)$ memory storage in Apollo Cache proportional to number of active nodes.
- **Explanation**: Setting up Apollo Provider with normalized caches avoids prop drilling or manual REST caches. We configured setContext to handle access headers, onError to monitor session expirations globally, and update/optimisticResponse hooks to bypass server round-trips for instant client updates.

---

## Program 18: Recoil State Management (Atoms & Selectors)
*⏱️ 2 min read*

### Question
Implement a complete state management structure in React Native using **Recoil**.
1. Create a Recoil State module defining an Atom to track an array of active trade listings (`tradeListingsState`).
2. Create a Selector to compute the total value of filtered trades (`totalPortfolioValueState`) based on a selected trade category type filter.
3. Build a component screen displaying the trade counts, active filter picker, and items list, using `useRecoilState`, `useRecoilValue`, and `useSetRecoilState` hooks.

### Sample Input & Output
#### Input:
- User changes filter input state from `'ALL'` to `'TECH'`.
#### Output:
- Selector re-calculates, components observing the selector update their values, while unrelated sub-components are skipped, achieving optimal frame rendering speed.

### Code
```tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { 
  RecoilRoot, 
  atom, 
  selector, 
  useRecoilState, 
  useRecoilValue, 
  useSetRecoilState 
} from 'recoil';

export interface Trade {
  id: string;
  symbol: string;
  shares: number;
  price: number;
  category: 'TECH' | 'ENERGY' | 'HEALTH';
}

// 1. Define Atom - Source of Truth
export const tradeListingsState = atom<Trade[]>({
  key: 'tradeListingsState',
  default: [
    { id: '1', symbol: 'AAPL', shares: 50, price: 175.00, category: 'TECH' },
    { id: '2', symbol: 'TSLA', shares: 20, price: 200.00, category: 'TECH' },
    { id: '3', symbol: 'XOM', shares: 100, price: 110.00, category: 'ENERGY' },
    { id: '4', symbol: 'JNJ', shares: 40, price: 155.00, category: 'HEALTH' }
  ],
});

// Define filter atom
type CategoryFilter = 'ALL' | 'TECH' | 'ENERGY' | 'HEALTH';
export const categoryFilterState = atom<CategoryFilter>({
  key: 'categoryFilterState',
  default: 'ALL',
});

// 2. Define Selectors for Derived State (Auto-Cached)
export const filteredTradesState = selector<Trade[]>({
  key: 'filteredTradesState',
  get: ({ get }) => {
    const filter = get(categoryFilterState);
    const list = get(tradeListingsState);

    if (filter === 'ALL') return list;
    return list.filter((item) => item.category === filter);
  }
});

export const totalPortfolioValueState = selector<number>({
  key: 'totalPortfolioValueState',
  get: ({ get }) => {
    const list = get(filteredTradesState);
    return list.reduce((sum, item) => sum + (item.shares * item.price), 0);
  }
});

// 3. Implement Recoil Component
export function PortfolioConsole() {
  const [filter, setFilter] = useRecoilState(categoryFilterState);
  const trades = useRecoilValue(filteredTradesState);
  const totalValue = useRecoilValue(totalPortfolioValueState);
  const setTrades = useSetRecoilState(tradeListingsState);

  const addNewTrade = () => {
    const newTrade: Trade = {
      id: String(Date.now()),
      symbol: 'MSFT',
      shares: 15,
      price: 420.00,
      category: 'TECH',
    };
    setTrades((prev) => [...prev, newTrade]);
  };

  const categories: CategoryFilter[] = ['ALL', 'TECH', 'ENERGY', 'HEALTH'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asset Dashboard</Text>
      
      <View style={styles.valueCard}>
        <Text style={styles.label}>TOTAL VALUE (FILTERED)</Text>
        <Text style={styles.value}>${totalValue.toLocaleString()}</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, filter === cat && styles.activeTab]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.tabText, filter === cat && styles.activeTabText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={trades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.symbol}>{item.symbol}</Text>
              <Text style={styles.subtext}>{item.category}</Text>
            </View>
            <Text style={styles.amount}>
              {item.shares} x ${item.price.toFixed(2)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.actionBtn} onPress={addNewTrade}>
        <Text style={styles.btnText}>ADD TECH TRADE (MSFT)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f5f7' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1a202c', marginBottom: 16 },
  valueCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
  label: { fontSize: 11, fontWeight: 'bold', color: '#a0aec0', letterSpacing: 1 },
  value: { fontSize: 26, fontWeight: 'bold', color: '#2d3748', marginTop: 4 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: '#e2e8f0', marginHorizontal: 2, borderRadius: 6 },
  activeTab: { backgroundColor: '#4c51bf' },
  tabText: { fontSize: 12, color: '#4a5568', fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', marginVertical: 4, borderRadius: 8 },
  symbol: { fontWeight: 'bold', color: '#2d3748' },
  subtext: { fontSize: 11, color: '#718096', marginTop: 2 },
  amount: { fontWeight: '600', color: '#2d3748' },
  actionBtn: { backgroundColor: '#4c51bf', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

export function RecoilAppWrapper() {
  return (
    <RecoilRoot>
      <PortfolioConsole />
    </RecoilRoot>
  );
}
```

### Complexity & Explanation
- **Time Complexity**: $O(T)$ where $T$ represents filtered items. Read/write operations inside the atom execute in $O(1)$. Selectors cache results, reducing computation cost to $O(1)$ on duplicate queries.
- **Space Complexity**: $O(T)$ proportional to total trades in state cache.
- **Explanation**: This program builds a modular Recoil tree. It leverages `atom` for state sources and `selector` for derived state calculations. Subscribed React nodes re-render selectively only when targeted atoms or computed branches update.

---

## Program 19: Unified Production Telemetry Hook (Firebase + Sentry + Azure Insights)
*⏱️ 2 min read*

### Question
Write a custom React Native telemetry hook `useTelemetry` that coordinates diagnostic logging across three major platforms: **Sentry**, **Firebase Analytics**, and **Azure App Insights**.
The hook must export methods to:
1. Initialize the services asynchronously without blocking main thread startup.
2. Log custom events and user traits safely across all services.
3. Track screen views and handle exception logging with contextual metadata (breadcrumbs).

### Sample Input & Output
#### Input:
```typescript
const telemetry = useTelemetry();
telemetry.trackEvent('purchase_complete', { amount: 99.99, method: 'ApplePay' });
```
#### Output:
- Firebase logs behavioral event `'purchase_complete'`.
- Sentry leaves breadcrumb `'purchase_complete'` with arguments.
- Azure App Insights logs custom metric metrics array.

### Code
```typescript
import { useCallback } from 'react';
import * as Sentry from '@sentry/react-native';
import analytics from '@react-native-firebase/analytics';
import { InteractionManager } from 'react-native';

// Standardized telemetry interface
interface TelemetryClient {
  trackEvent: (eventName: string, params?: Record<string, any>) => void;
  trackScreen: (screenName: string) => void;
  logException: (error: Error, additionalContext?: Record<string, string>) => void;
  setUserProperties: (userId: string, properties?: Record<string, any>) => void;
}

// Global initialization helper for release builds
// Executed after visual painting frames to preserve high TTI speeds
export const initTelemetry = () => {
  InteractionManager.runAfterInteractions(() => {
    // 1. Initialize Sentry
    Sentry.init({
      dsn: 'https://mock_sentry_token@sentry.io/project',
      tracesSampleRate: 0.1, // Sample 10% transactions in production
      debug: __DEV__,
    });

    // 2. Initialize Azure Application Insights client mapping config
    // Azure App Insights endpoint setup in production is done using native modules
    console.log('Telemetry: Azure App Insights endpoints initialized.');
  });
};

export function useTelemetry(): TelemetryClient {
  // 1. Track custom events with payload maps
  const trackEvent = useCallback((eventName: string, params: Record<string, any> = {}) => {
    try {
      // Firebase Analytics
      analytics().logEvent(eventName, params);

      // Sentry Breadcrumbs
      Sentry.addBreadcrumb({
        category: 'user_action',
        message: `Event: ${eventName}`,
        data: params,
        level: 'info',
      });

      // Azure App Insights native bridge emulation
      console.log(`[Azure AI Log]: Event - ${eventName}`, params);
    } catch (err) {
      console.error('Telemetry event log failure:', err);
    }
  }, []);

  // 2. Track screen navigation routes
  const trackScreen = useCallback((screenName: string) => {
    try {
      analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenName,
      });

      Sentry.addBreadcrumb({
        category: 'navigation',
        message: `Screen Navigated to: ${screenName}`,
        level: 'info',
      });

      console.log(`[Azure AI Log]: PageView - ${screenName}`);
    } catch (err) {
      console.error('Telemetry screen tracking failure:', err);
    }
  }, []);

  // 3. Log errors and exceptions with Sentry and Azure diagnostics
  const logException = useCallback((error: Error, additionalContext: Record<string, string> = {}) => {
    try {
      // Capture detailed Sentry Exception with Scope mappings
      Sentry.withScope((scope) => {
        Object.entries(additionalContext).forEach(([key, val]) => {
          scope.setTag(key, val);
        });
        Sentry.captureException(error);
      });

      // Forward to Azure App Insights native instrumentation bridge
      console.log(`[Azure AI Error]: Exception - ${error.message}`, {
        stack: error.stack,
        ...additionalContext
      });
    } catch (err) {
      console.error('Telemetry exception log failure:', err);
    }
  }, []);

  // 4. Set user configurations and custom tags
  const setUserProperties = useCallback((userId: string, properties: Record<string, any> = {}) => {
    try {
      analytics().setUserId(userId);
      if (properties && Object.keys(properties).length > 0) {
        analytics().setUserProperties(properties);
      }

      Sentry.setUser({ id: userId, ...properties });
      console.log(`[Azure AI Log]: SetUser - ${userId}`, properties);
    } catch (err) {
      console.error('Telemetry user config failure:', err);
    }
  }, []);

  return {
    trackEvent,
    trackScreen,
    logException,
    setUserProperties
  };
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ logger dispatch executions. SDK initializations are executed using `InteractionManager.runAfterInteractions` which delays heavy setups until active animations finish.
- **Space Complexity**: $O(1)$ allocation structures.
- **Explanation**: This hook abstracts client telemetry into a single API. Sentry logs JS/Native exceptions and generates diagnostics, Firebase registers marketing conversion variables and analytics events, and Azure App Insights monitors API latencies and trace structures.

---

## Program 20: Test-Driven Development (TDD) Workflow with Jest & RNTL
*⏱️ 2 min read*

### Question
Demonstrate a Test-Driven Development (TDD) cycle inside a React Native setting. 
1. **Red**: Write a failing Jest test suite using `@testing-library/react-native` for a component `ValidationLabel`. The test must check that:
   - It displays a red warning text `"Weak Password"` if input password length is `< 6`.
   - It displays a green label `"Strong Password"` and calls an `onValidated` trigger callback if password contains at least `8` characters, including a number.
2. **Green**: Write the minimal component execution logic required to pass the test cases.
3. **Refactor**: Clean up the component styling or internal conditional checks while ensuring tests remain green.

### Sample Input & Output
#### TDD Stage 1 (Tests execution output):
- Running `npm test` fails because `ValidationLabel.tsx` does not exist or has empty stubs (Red stage).
#### TDD Stage 2 (Execution code integration):
- Implementing minimal check rules causes all assertions to pass (Green stage).

### Code

#### 1. The Test Suite File (`ValidationLabel.test.tsx` - Written First)
```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { ValidationLabel } from './ValidationLabel';

describe('TDD ValidationLabel Suite', () => {
  it('displays warning label for weak inputs', () => {
    const mockOnValidated = jest.fn();
    const { getByTestId } = render(
      <ValidationLabel password="abc" onValidated={mockOnValidated} />
    );

    const labelElement = getByTestId('validation_text');
    expect(labelElement.props.children).toBe('Weak Password');
    expect(labelElement.props.style).toContainEqual(expect.objectContaining({ color: '#e53e3e' }));
    expect(mockOnValidated).not.toHaveBeenCalled();
  });

  it('displays strong label and calls validation handler on correct password', () => {
    const mockOnValidated = jest.fn();
    const { getByTestId } = render(
      <ValidationLabel password="securePass99" onValidated={mockOnValidated} />
    );

    const labelElement = getByTestId('validation_text');
    expect(labelElement.props.children).toBe('Strong Password');
    expect(labelElement.props.style).toContainEqual(expect.objectContaining({ color: '#38a169' }));
    expect(mockOnValidated).toHaveBeenCalledTimes(1);
  });
});
```

#### 2. The Minimal Component Code (`ValidationLabel.tsx` - Written Second to pass the assertions)
```tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ValidationProps {
  password?: string;
  onValidated: () => void;
}

export function ValidationLabel({ password = '', onValidated }: ValidationProps) {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const isStrong = hasMinLength && hasNumber;

  useEffect(() => {
    if (isStrong) {
      onValidated();
    }
  }, [isStrong, onValidated]);

  if (!password) return null;

  return (
    <View style={styles.container}>
      <Text 
        testID="validation_text"
        style={isStrong ? styles.strongLabel : styles.weakLabel}
      >
        {isStrong ? 'Strong Password' : 'Weak Password'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 6 },
  weakLabel: { color: '#e53e3e', fontSize: 13, fontWeight: '600' },
  strongLabel: { color: '#38a169', fontSize: 13, fontWeight: '600' }
});
```

### Complexity & Explanation
- **Time Complexity**: $O(W)$ regular expression character analysis where $W$ is password string length.
- **Space Complexity**: $O(1)$ constant stack memory allocations.
- **Explanation**: This demonstrates a full TDD pipeline loop. In Stage 1 (Red), we write test specifications verifying styles and event dispatches. In Stage 2 (Green), we construct the component containing state validation flags and conditional layouts to resolve the test blocks. In Stage 3 (Refactor), we optimize the RegExp expressions or stylesheets safely without fear of regressions because the Jest test suite immediately catches any broken logic.
```

