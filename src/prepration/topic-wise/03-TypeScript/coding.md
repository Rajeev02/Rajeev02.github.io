# 🟦 TypeScript Coding Programs

<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [Program 1: Axios Silent Token Refresh Interceptor](#program-1-axios-silent-token-refresh-interceptor)
- [Program 2: Generic Type-Safe Item Selection List Component](#program-2-generic-type-safe-item-selection-list-component)
- [Program 3: Advanced Conditional Types & Mapped Type Parser](#program-3-advanced-conditional-types-mapped-type-parser)
- [Program 4: Nominal Type Branding (Type Branded Currency Operations)](#program-4-nominal-type-branding-type-branded-currency-operations)
</details>
<!-- INDEX_END -->

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

### Complexity & Explanation
- **Time Complexity**: 
  - **Intercepting & Queueing**: $O(1)$ constant time execution to check request authorization and queue elements.
  - **Queue Flashing**: $O(Q)$ where $Q$ is the size of the queued requests list. Each request gets resolved or rejected sequentially.
- **Space Complexity**: $O(Q)$ to store request resolution promises in the dynamic memory array queue.
- **Explanation**: This interceptor handles session recovery by intercepting all HTTP responses. If a `401 Unauthorized` occurs, it sets `isRefreshing = true` and buffers subsequent requests into `refreshQueue`. Once the refresh API resolves with a new JWT, it updates the original config header, flushes the queue, and resets the lock state. If the refresh fails, it rejects all waiting promises to trigger clean logout redirects.

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

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of items rendered by the FlatList. The selection handler runs in $O(1)$ constant time.
- **Space Complexity**: $O(1)$ auxiliary space as it wraps inputs using memoized React callbacks.
- **Explanation**: This component leverages TypeScript Generics (`<T extends SelectableItem>`) to build an abstract, reusable list. The compiler statically checks that any object array passed contains at least the properties defined in `SelectableItem` (here, `id` and `label`). By binding the generic parameter `T` to both the `items` array and `onSelect` callback signature, the parent receives full type inference and autocompletion for custom object attributes (e.g. `item.email` or `item.userId`) without type-casting.

---

## Program 3: Advanced Conditional Types & Mapped Type Parser

### Question
Write two advanced TypeScript type-level programs:
1. A recursive mapped conditional type **`DeepNullable<T>`** that maps all properties of an object (and any nested child objects, arrays, or values) to accept `null` or `undefined`.
2. A template literal mapped type **`DynamicEventPayloadMap<T>`** that parses object keys. For any property matching prefix `'on[Name]'` representing a callback event (like `'onSelect'`), strip the prefix and map the output to a parameter object payload representation (e.g., transforming key `'onSelect'` with callback `(id: string) => void` into property `'select'` containing `{ payload: string }`).

### Code
```typescript
// 1. Recursive DeepNullable Mapped Type
export type DeepNullable<T> = {
  [K in keyof T]: T[K] extends Function
    ? T[K] // Retain functions untouched
    : T[K] extends Array<infer U>
    ? Array<DeepNullable<U>> | null | undefined // Handle arrays recursively
    : T[K] extends object
    ? DeepNullable<T[K]> | null | undefined // Handle nested objects recursively
    : T[K] | null | undefined; // Handle primitives
};

// 2. Template Literal Event Parser Mapped Type
type ExtractPayload<T> = T extends (arg: infer P) => void ? { payload: P } : { payload: never };

export type DynamicEventPayloadMap<T> = {
  [K in keyof T as K extends `on${infer EventName}` 
    ? Uncapitalize<EventName> 
    : never]: ExtractPayload<T[K]>;
};

// --- Static Verification Blocks ---
interface UserProfile {
  id: string;
  details: {
    name: string;
    roles: string[];
  };
  updateStatus: () => void;
}

// Resulting shape contains nullable nested elements
type TestNullable = DeepNullable<UserProfile>;
/* 
TestNullable resolves to:
{
  id: string | null | undefined;
  details: {
    name: string | null | undefined;
    roles: Array<string | null | undefined> | null | undefined;
  } | null | undefined;
  updateStatus: () => void;
}
*/

interface FormController {
  onSelect: (id: string) => void;
  onRefresh: (timestamp: number) => void;
  onSubmit: (payload: { name: string }) => void;
  ignoredRawField: string;
}

type EventPayloads = DynamicEventPayloadMap<FormController>;
/*
EventPayloads resolves to:
{
  select: { payload: string };
  refresh: { payload: number };
  submit: { payload: { name: string } };
}
*/
```

### Complexity & Explanation
- **Time Complexity**: Evaluated entirely during compile time. Zero runtime overhead.
- **Space Complexity**: Zero runtime allocations.
- **Explanation**: This program leverages TypeScript's compiler algebra. `DeepNullable` uses recursion combined with conditional evaluations (`infer U` in arrays) to transform nested values. `DynamicEventPayloadMap` uses template literal type mapping (`on${infer EventName}`) to transform strings and extract parameters from function signatures using type inference.

---

## Program 4: Nominal Type Branding (Type Branded Currency Operations)

### Question
Design a nominal type-safety system in TypeScript that enforces strict compile-time checks on currency values:
1. Define nominal branded types **`USD`** and **`INR`** utilizing unique symbol brands.
2. Implement a validation function that acts as a type gatekeeper to cast plain numbers into their branded equivalents.
3. Write type-safe arithmetic operations (addition, subtraction) that prevent compiling actions that add USD values directly to INR values without executing exchange rate conversions first.

### Code
```typescript
// 1. Declare opaque unique symbols for nominal branding
declare const USD_BRAND: unique symbol;
declare const INR_BRAND: unique symbol;

export type USD = number & { readonly [USD_BRAND]: true };
export type INR = number & { readonly [INR_BRAND]: true };

// 2. Type gatekeeper validation functions
export function makeUSD(amount: number): USD {
  if (amount < 0) throw new Error("Currency cannot be negative");
  return amount as USD;
}

export function makeINR(amount: number): INR {
  if (amount < 0) throw new Error("Currency cannot be negative");
  return amount as INR;
}

// 3. Strict Arithmetic Operator wrappers
export class CurrencyWallet {
  static addUSD(a: USD, b: USD): USD {
    return (a + b) as USD;
  }

  static addINR(a: INR, b: INR): INR {
    return (a + b) as INR;
  }

  // Cross currency operations require a mapping conversion step
  static convertUSDToINR(usd: USD, exchangeRate: number): INR {
    return makeINR(usd * exchangeRate);
  }
}

// --- Static Verification Blocks ---
const walletUSD = makeUSD(150);
const walletINR = makeINR(12000);

// Safe operations compile cleanly
const resultUSD = CurrencyWallet.addUSD(walletUSD, makeUSD(50)); // Approved!

// Cross-currency operations trigger compile errors!
// @ts-expect-error - Compile blocks adding USD to INR directly
const errorSum = CurrencyWallet.addINR(walletINR, walletUSD); // Type error: Argument of type 'USD' is not assignable to 'INR'

// Correct conversion path compiles cleanly
const exchangeRate = 83.5;
const convertedUSD = CurrencyWallet.convertUSDToINR(walletUSD, exchangeRate);
const finalSumINR = CurrencyWallet.addINR(walletINR, convertedUSD); // Approved!
```

### Complexity & Explanation
- **Time Complexity**: Evaluated entirely during compile time. Casting functions execute in $O(1)$ constant time at runtime.
- **Space Complexity**: Zero runtime footprint.
- **Explanation**: TypeScript's default structural typing treats all numbers as compatible. Nominal type branding attaches a read-only private branded unique symbol to the primitive `number` type. This informs the compiler to reject assignments between USD, INR, and raw numbers, guaranteeing safety for sensitive transaction logic.

