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
