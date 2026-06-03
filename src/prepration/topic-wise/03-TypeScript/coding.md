# 🟦 TypeScript Coding Programs

---

## Program 1: Axios Silent Token Refresh Interceptor

### Question
Write a strongly-typed Axios network interceptor middleware in TypeScript that automatically handles silent JWT access token refreshment. When an API call returns a `401 Unauthorized` response:
1. It must intercept and queue subsequent pending outgoing requests.
2. Retrieve the Refresh Token securely (mocking keychain access).
3. Request a new Access Token.
4. Retry all queued requests with the updated token, or reject them all if refresh fails.

### Sample Input & Output
#### Input:
An outgoing HTTP request triggers, but the current access token has expired:
```typescript
apiClient.get('/portfolio/summary');
```
#### Output:
1. Intercepts the failed request (`401`).
2. Dispatches a call to `/auth/refresh` behind the scenes.
3. Retrieves the new token: `"new_jwt_access_token_123"`.
4. Automatically retries the original request with header `Authorization: Bearer new_jwt_access_token_123` and resolves the data back to the original caller.

### Code
```typescript
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 1. Define explicit types for token responses and queued requests
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: any) -> void;
}

export class AuthInterceptorService {
  private isRefreshing = false;
  private refreshQueue: QueuedRequest[] = [];
  
  constructor(private axiosInstance: AxiosInstance) {
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Response interceptor to catch 401 errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // If the error is 401 and the request hasn't been retried yet
        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
          originalRequest._retry = true;

          // If a refresh transaction is already running, queue this request
          if (this.isRefreshing) {
            return new Promise<string>((resolve, reject) => {
              this.refreshQueue.push({ resolve, reject });
            })
              .then((token: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                }
                return this.axiosInstance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          this.isRefreshing = true;

          return new Promise<AxiosResponse>((resolve, reject) => {
            this.executeTokenRefresh()
              .then((newAccessToken: string) => {
                if (originalRequest.headers) {
                  originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                }
                // Process the refresh queue with the new token
                this.processQueue(null, newAccessToken);
                resolve(this.axiosInstance(originalRequest));
              })
              .catch((refreshError: any) => {
                // Reject all queued requests if refresh failed
                this.processQueue(refreshError, null);
                reject(refreshError);
              })
              .finally(() => {
                this.isRefreshing = false;
              });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  private async executeTokenRefresh(): Promise<string> {
    // Simulating secure storage lookup and API call
    console.log("Interceptor: Token expired. Initiating silent refresh call...");
    const refreshToken = "mock_secure_refresh_token_from_keychain";
    
    const response = await axios.post<TokenResponse>('https://api.letsventure.com/auth/refresh', {
      token: refreshToken
    });
    
    const newAccessToken = response.data.accessToken;
    console.log("Interceptor: Silent refresh successful!");
    return newAccessToken;
  }

  private processQueue(error: any, token: string | null): void {
    this.refreshQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else if (token) {
        prom.resolve(token);
      }
    });
    this.refreshQueue = [];
  }
}
```

---

## Program 2: Generic Type-Safe Item Selection List Component

### Question
Write a generic, type-safe React Native Component in TypeScript that displays a list of objects and supports single item selection callbacks. The component must enforce that the list items extend a base structure containing an `id` and `label`, and it must statically type the selection handler.

### Sample Input & Output
#### Input:
```tsx
const users = [
  { id: "u_1", label: "Rajeev Joshi", email: "rajeev@test.com" },
  { id: "u_2", label: "John Doe", email: "john@test.com" }
];

<GenericSelectionList 
  items={users} 
  onSelect={(item) => console.log(item.email)} // Type-safe autocompletion of properties!
/>
```
#### Output:
Renders lists dynamically with full static typing, enforcing that only items with `id` and `label` properties are passed, and typed callbacks resolve with the specific element type.

### Code
```tsx
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';

// 1. Declare a base interface constraint requiring essential properties
export interface SelectableItem {
  id: string;
  label: string;
}

// 2. Declare Generic parameters extending the base interface
interface GenericListProps<T extends SelectableItem> {
  items: T[];
  onSelect: (item: T) => void;
}

export function GenericSelectionList<T extends SelectableItem>({
  items,
  onSelect,
}: GenericListProps<T>) {
  
  const handlePress = useCallback((item: T) => {
    onSelect(item);
  }, [onSelect]);

  const renderItem: ListRenderItem<T> = useCallback(({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.itemRow} 
        onPress={() => handlePress(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.itemText}>{item.label}</Text>
      </TouchableOpacity>
    );
  }, [handlePress]);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemRow: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#f7fafc',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemText: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
});
```
