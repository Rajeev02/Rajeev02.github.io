
## Page Summary
### Reading Time
`3 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 1: Axios Silent Token Refresh Interceptor |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | 🔥 Must Revise |

---


## Program 1: Axios Silent Token Refresh Interceptor
*⏱️ 2 min read*

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

### Complexity & Explanation
- **Time Complexity**: 
  - **Intercepting & Queueing**: $O(1)$ constant time execution to check request authorization and queue elements.
  - **Queue Flashing**: $O(Q)$ where $Q$ is the size of the queued requests list. Each request gets resolved or rejected sequentially.
- **Space Complexity**: $O(Q)$ to store request resolution promises in the dynamic memory array queue.
- **Explanation**: This interceptor handles session recovery by intercepting all HTTP responses. If a `401 Unauthorized` occurs, it sets `isRefreshing = true` and buffers subsequent requests into `refreshQueue`. Once the refresh API resolves with a new JWT, it updates the original config header, flushes the queue, and resets the lock state. If the refresh fails, it rejects all waiting promises to trigger clean logout redirects.

---
