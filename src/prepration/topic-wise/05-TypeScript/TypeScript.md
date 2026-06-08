# TypeScript

## Table of Contents

- [Section 1: 📘 Types vs. Interfaces](#section-1-types-vs-interfaces)
- [Section 2: 🛠️ Generics & Utility Types](#section-2-generics-utility-types)
- [Section 3: 📱 Type Safety in React Native (Codegen Specs)](#section-3-type-safety-in-react-native-codegen-specs)
- [Section 4: ⚙️ Strict Compiler Options (`tsconfig.json`)](#section-4-strict-compiler-options-tsconfig-json)
- [Section 5: 🔬 Advanced TypeScript Q&A](#section-5-advanced-typescript-q-a)
- [Section 6: Program 1: Axios Silent Token Refresh Interceptor](#section-6-program-1-axios-silent-token-refresh-interceptor)
- [Section 7: Program 2: Generic Type-Safe Item Selection List Component](#section-7-program-2-generic-type-safe-item-selection-list-component)
- [Section 8: Program 3: Advanced Conditional Types & Mapped Type Parser](#section-8-program-3-advanced-conditional-types-mapped-type-parser)
- [Section 9: Program 4: Nominal Type Branding (Type Branded Currency Operations)](#section-9-program-4-nominal-type-branding-type-branded-currency-operations)


---

### TypeScript Complete Guide

> 🎯 **Topic:** TypeScript Complete Guide
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---



---

> 🎯 **Topic:** 📘 Section 1: Types vs. Interfaces
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 1: 📘 Types vs. Interfaces

*⏱️ 1 min read*

TypeScript provides two core ways to declare object structures and contracts: **Interfaces** and **Type Aliases**. Understanding when to use which is essential for senior engineering roles.

#### 1. Structural Similarities
Both can be used to describe the shape of an object or a function contract:
```typescript
// Interface
interface UserInterface {
  id: string;
  name: string;
}

// Type Alias
type UserType = {
  id: string;
  name: string;
};
```

---

#### 2. Key Differences

##### Declaration Merging (Unique to Interfaces)
- If you define two interfaces with the exact same name in the same scope, TypeScript automatically merges their declarations into a single interface definition.
- Type aliases cannot be declared multiple times with the same name; doing so throws a duplicate identifier error.

```typescript
interface Car { brand: string; }
interface Car { model: string; }
// Result: Car now has both properties: brand and model.
```

##### Composition & Extensions
- **Interfaces** extend other interfaces using the `extends` keyword. This enables compile-time optimizations as TypeScript caches the relationship tree.
- **Type Aliases** compose structures using intersection operators (`&`).

```typescript
// Interface extension
interface Senior extends UserInterface {
  role: string;
}

// Type Alias intersection
type SeniorType = UserType & {
  role: string;
};
```

##### Capability Limits
- **Type Aliases** can declare primitives, union types, intersection types, tuples, and mapped types.
- **Interfaces** are strictly limited to describing object shapes, classes, and function structures. They cannot declare union types or alias primitive types directly.

```typescript
type ID = string | number; // Supported in Types, not Interfaces
type Position = [number, number]; // Tuple
```

---


---

---

> 🎯 **Topic:** 🛠️ Section 2: Generics & Utility Types
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 2: 🛠️ Generics & Utility Types

*⏱️ 1 min read*

#### 1. Generics (Type Parametrization)
Generics allow you to write reusable, type-safe components, classes, or functions that work over a variety of types rather than a single concrete type. They act as type variables captured during compilation.

- *Generic Interface*:
  ```typescript
  // A generic API response container
  interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
  }

  const userResponse: ApiResponse<{ id: string; name: string }> = {
    data: { id: "101", name: "Rajeev" },
    status: 200,
    message: "Success"
  };
  ```
- *Generic Function*:
  ```typescript
  // Resolves to the type of the elements inside the passed array
  function getFirstElement<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[0] : undefined;
  }

  const num = getFirstElement([1, 2, 3]); // num is inferred as: number | undefined
  const str = getFirstElement(["a", "b"]); // str is inferred as: string | undefined
  ```

#### 2. TypeScript Utility Types
TypeScript provides built-in utilities to facilitate common type transformations.

- **`Partial<T>`**: Constructs a type with all properties of `T` set to optional.
- **`Omit<T, K>`**: Constructs a type by picking all properties from `T` and then removing keys `K`.
- **`Pick<T, K>`**: Constructs a type by picking a specific set of properties `K` from `T`.
- **`Record<K, T>`**: Constructs an object type whose keys are `K` and values are `T`.
- **`Readonly<T>`**: Sets all properties of `T` to read-only, preventing re-assignment.

- *Practical Usage Example*:
  ```typescript
  interface User {
    id: string;
    name: string;
    email: string;
    age: number;
  }

  // 1. Partial: Useful for updates where only some fields are sent
  type UserUpdatePayload = Partial<User>; // { id?: string; name?: string; email?: string; age?: number; }

  // 2. Omit: Useful for creation where 'id' is generated by database
  type UserCreationDraft = Omit<User, "id">; // { name: string; email: string; age: number; }

  // 3. Pick: Extract a subset of fields for presentation summaries
  type UserDisplaySummary = Pick<User, "name" | "email">; // { name: string; email: string; }

  // 4. Record: Dictionary/HashMap lookups mapping IDs to user profiles
  type UserRegistry = Record<string, User>; // { [userId: string]: User }

  // 5. Readonly: Immutable configuration objects
  type ImmutableConfig = Readonly<{ apiUrl: string; timeout: number }>;
  const config: ImmutableConfig = { apiUrl: "https://api.com", timeout: 5000 };
  // config.apiUrl = "new"; // Error: Cannot assign to 'apiUrl' because it is a read-only property.
  ```

---


---

---

> 🎯 **Topic:** 📱 Section 3: Type Safety in React Native (Codegen Specs)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 3: 📱 Type Safety in React Native (Codegen Specs)

*⏱️ 1 min read*

In the New Architecture, **Codegen** bridges the type-safety gap between JavaScript and native C++/Java/Obj-C code. To configure this, you write strict TypeScript Specification files.

#### 1. Codegen Specification Rules
- The spec file name must follow a strict naming convention: `Native<ModuleName>.ts` (for TurboModules) or `<ModuleName>NativeComponent.ts` (for Fabric components).
- You must use specific, compile-safe type definitions provided by React Native (`Double`, `Float`, `Int32`, `UnsafeObject`, `DirectEventHandler`). Standard JavaScript dynamic types like `any` or generic object type definitions are rejected by the Codegen compiler.

#### 2. TurboModule Spec Example
```typescript
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Define strict return and input types
  encryptPayload(alias: string, rawData: string): Promise<string>;
  decryptPayload(alias: string, encryptedData: string): Promise<string>;
  isBiometricsAvailable(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SecureEncryptionModule');
```

---


---

---

> 🎯 **Topic:** ⚙️ Section 4: Strict Compiler Options (`tsconfig.json`)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 4: ⚙️ Strict Compiler Options (`tsconfig.json`)

*⏱️ 1 min read*

To prevent runtime crashes and enforce code quality, enterprise configurations enable strict compiler options in `tsconfig.json`.

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noEmit": true
  }
}
```

- **`"strict": true`**: Enables a broad suite of type-checking behaviors, including implicit `any` blocks, strict null checks, and strict binding call assessments.
- **`"noImplicitAny": true`**: Raises an error on expressions and declarations with an implied `any` type. Developers are forced to declare explicit types, reducing type-safety gaps.
- **`"strictNullChecks": true`**: Treats `null` and `undefined` as distinct types. This prevents the classic "cannot read property of undefined" runtime crashes by forcing developers to handle null checking explicitly.
- **`"noEmit": true`**: Instructs TypeScript to perform type checking only and not output JavaScript build files. This is used in Vite and React Native layouts where transpilation is handled by Babel or Metro, while TypeScript acts strictly as a static gatekeeper.

---


---

---

> 🎯 **Topic:** 🔬 Section 5: Advanced TypeScript Q&A
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 5: 🔬 Advanced TypeScript Q&A

*⏱️ 3 min read*

#### Q1: Explain Conditional Types and how they are used to write dynamic, responsive typings. Provide an example showing how to build custom Utility Types using `infer`.
- **Answer**:
  - **Conditional Types**: Express typings using a ternary-like conditional syntax: `T extends U ? X : Y`. It evaluates if type `T` is assignable to type `U`. If so, the type resolves to `X`; otherwise, `Y`.
  - **The `infer` Keyword**: Declared inside the `extends` clause of a conditional type to dynamically introduce a type variable that TypeScript must automatically infer at compile time.
  - **Example (Writing a custom `ReturnType<T>` utility)**:
    ```typescript
    type CustomReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

    const getPortfolioValue = () => 500000;
    type ValueType = CustomReturnType<typeof getPortfolioValue>; // Resolves to 'number'!
    ```
  - **Explanation**: The conditional check evaluates if type `T` is assignable to a function signature. It uses `infer R` to capture the function's return type value, storing it in `R` to return it if the condition resolves.

---

#### Q2: Describe structural typing vs. nominal typing in TypeScript. How can we achieve nominal typing (type branding) to prevent logic errors?
- **Answer**:
  - **Structural Typing (TypeScript)**: TypeScript's type system is based on shapes. If two objects have identical properties and types, they are treated as the same type, regardless of their names:
    ```typescript
    interface Point2D { x: number; y: number; }
    interface Vector2D { x: number; y: number; }
    let pt: Point2D = { x: 1, y: 2 };
    let vec: Vector2D = pt; // Statically allowed!
    ```
  - **Nominal Typing (e.g. Java/Swift)**: Types are checked by name rather than structure. Even if Point2D and Vector2D have identical shapes, assignability is rejected.
  - **Type Branding (Nominal Simulation)**: To enforce nominal typing (e.g. preventing developers from passing raw, unchecked strings into functions that require secure cryptographic USD inputs), we attach a phantom unique property:
    ```typescript
    type USD = string & { readonly __brand: unique symbol };
    
    function validateUSD(amount: string): USD {
      return amount as USD; // Cast after validation
    }
    
    function processTransaction(value: USD) { ... }
    
    processTransaction("100"); // Compile error! Prevent plain strings.
    processTransaction(validateUSD("100")); // Statically approved!
    ```

---

#### Q3: Explain Covariance and Contravariance in TypeScript. How does TypeScript evaluate parameters vs. return types during function assignments?
- **Answer**:
  These properties describe type compatibility rules when dealing with hierarchies (e.g., assigning a subclass to a superclass container).
  - **Covariance (Preserves Direction)**:
    - Return types of functions are **covariant**.
    - If `Dog extends Animal`, then a function returning a `Dog` can be assigned to a variable expecting a function returning an `Animal` (`() => Dog` ➡️ `() => Animal`).
  - **Contravariance (Reverses Direction)**:
    - Parameter types of functions are **contravariant** under strict compile schemes (`strictFunctionTypes: true`).
    - If `Dog extends Animal`, a function that processes an `Animal` can be assigned to a variable expecting a function that processes a `Dog` (`(a: Animal) => void` ➡️ (d: Dog) => void). Why? Because a function expecting a Dog only accesses Dog properties, and since an Animal handler handles any Animal, it is safe. Conversely, passing a Dog-only handler where an Animal is expected fails because it might get a Cat, triggering runtime failures.

---

#### Q4: Compare `unknown` vs. `any` vs. `never`. When and how should each be used to maintain strict type safety?
- **Answer**:
  - **`any` (Escape Hatch)**: Turns off all type checking. The compiler allows any property reads or calls on `any`. It is highly insecure and leads to runtime crashes.
  - **`unknown` (Type-Safe `any`)**: Represents any value, but TypeScript blocks all property reads or method invocations on `unknown` until you perform explicit type narrowing (using `typeof`, `instanceof`, or custom type guards).
    - *Best Use*: Deserializing API JSON responses or reading dynamic inputs before validating their structure.
  - **`never` (Impossible State)**: Represents values that should never occur.
    - *Best Use*: Exhaustiveness checks inside switch blocks. If a developer appends a new state to a union type but fails to add a corresponding case block, the compiler throws a type-error during compilation:
      ```typescript
      type Action = 'INIT' | 'SUCCESS' | 'FAIL';
      function handle(action: Action) {
        switch(action) {
          case 'INIT': return;
          case 'SUCCESS': return;
          case 'FAIL': return;
          default:
            const _exhaustiveCheck: never = action; // Fails compile if Action receives new options!
            return _exhaustiveCheck;
        }
      }
      ```

---

#### Q5: How do TypeScript compiler flags like `incremental`, `composite`, and project references work to optimize compile-time performance in massive enterprise monorepos?
- **Answer**:
  For large projects (100,000+ lines), compiling the entire workspace on every commit creates bottlenecks.
  - **`incremental: true`**: Tells TypeScript to save build info metadata (as `.tsbuildinfo` files) from the last compilation. During subsequent compiles, TS reads this metadata and compiles only the files modified since the last check, reducing build times by 70%.
  - **`composite: true` / Project References**:
    - Divides a massive project into smaller, independent sub-projects (e.g. `packages/core`, `packages/ui-kit`).
    - Each sub-project has its own `tsconfig.json` specifying `"composite": true`.
    - Parent apps link these projects using the `"references"` property.
    - When building, TypeScript compiles only modified packages and outputs compiled definitions (`.d.ts`), preventing rebuilding of unaffected modules in the monorepos.

---

---

### 🟦 TypeScript Coding Programs

> 🎯 **Topic:** 🟦 TypeScript Coding Programs
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---



<!-- INDEX_START -->

<!-- INDEX_END -->

---

---

> 🎯 **Topic:** Program 1: Axios Silent Token Refresh Interceptor
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 6: Program 1: Axios Silent Token Refresh Interceptor
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

---

> 🎯 **Topic:** Program 2: Generic Type-Safe Item Selection List Component
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 7: Program 2: Generic Type-Safe Item Selection List Component
*⏱️ 1 min read*

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

---

> 🎯 **Topic:** Program 3: Advanced Conditional Types & Mapped Type Parser
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 8: Program 3: Advanced Conditional Types & Mapped Type Parser
*⏱️ 1 min read*

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

---

> 🎯 **Topic:** Program 4: Nominal Type Branding (Type Branded Currency Operations)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 9: Program 4: Nominal Type Branding (Type Branded Currency Operations)
*⏱️ 1 min read*

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

---

