> 🎯 **Topic:** Section 6: Program 6: Reusable API Calling Wrappers (Fetch vs. Axios)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 6: Program 6: Reusable API Calling Wrappers (Fetch vs. Axios)
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

---
