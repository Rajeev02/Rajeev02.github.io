# 07-State-Management.md

# State Management for Senior React Native Developers

---

# 1. What is State Management?

## Definition

State Management is the process of storing, updating, and sharing application data across components.

---

## Why Do We Need It?

Without state management:

```text
Component A
     ↓
Component B
     ↓
Component C
     ↓
Component D
```

Data must be passed through multiple levels.

This is called:

```text
Prop Drilling
```

---

## Examples of State

* Logged In User
* Theme
* Shopping Cart
* Notifications
* API Data

---

## Interview Answer

"State management is the process of handling application data and ensuring components receive the correct state efficiently."

---

# 2. Local State vs Global State

## Local State

Managed inside a component.

```jsx
const [count, setCount] =
 useState(0);
```

---

## Global State

Shared across multiple screens/components.

Examples:

* Authentication
* User Profile
* Theme

---

## Comparison

| Local State        | Global State  |
| ------------------ | ------------- |
| Component Specific | Shared        |
| useState           | Redux/Zustand |
| Small Scope        | App Wide      |

---

## Interview Answer

"Local state is owned by a single component, while global state is shared across multiple parts of an application."

---

# 3. What is Redux?

## Definition

Redux is a predictable state container that stores application state in a centralized store.

---

## Flow

```text
Component
    ↓
Dispatch Action
    ↓
Reducer
    ↓
Store Updated
    ↓
Component Re-render
```

---

## Core Concepts

### Store

Centralized state.

---

### Action

Describes what happened.

```javascript
{
  type: "LOGIN"
}
```

---

### Reducer

Updates state.

---

## Interview Answer

"Redux stores application state in a centralized store and updates it through dispatched actions and reducers."

---

# 4. Redux Toolkit (RTK)

## Definition

Redux Toolkit is the official recommended way to write Redux code.

---

## Why Was It Introduced?

Traditional Redux required:

* Actions
* Action Types
* Reducers
* Boilerplate

Too much code.

---

## Example

```javascript
const counterSlice =
 createSlice({
   name: "counter",

   initialState: {
     value: 0
   },

   reducers: {
     increment(state){
       state.value++;
     }
   }
 });
```

---

## Benefits

* Less Boilerplate
* Better Developer Experience
* Immer Integration
* Built-in Best Practices

---

## Interview Answer

"Redux Toolkit simplifies Redux development by reducing boilerplate and providing built-in utilities."

---

# 5. What is Immer?

## Definition

Immer enables writing immutable updates using mutable syntax.

---

## Example

Without Immer:

```javascript
return {
  ...state,
  count:
   state.count + 1
};
```

---

With Immer:

```javascript
state.count++;
```

---

## Interview Answer

"Immer allows immutable state updates through a simpler mutable-style syntax."

---

# 6. Redux Toolkit Flow

```text
Component
     ↓
Dispatch
     ↓
Slice Reducer
     ↓
Store Update
     ↓
Selector
     ↓
UI Update
```

---

## Interview Answer

"Redux Toolkit uses slices, reducers, and selectors to manage state in a scalable manner."

---

# 7. RTK Query

## Definition

RTK Query is Redux Toolkit's data fetching and caching solution.

---

## Why Do We Need It?

Without RTK Query:

```javascript
useEffect()
fetch()
loading
error
cache
retry
```

Manual management.

---

## Example

```javascript
const {
 data,
 isLoading
} = useGetUsersQuery();
```

---

## Benefits

* Automatic Caching
* Auto Refetching
* Loading States
* Error Handling

---

## Interview Answer

"RTK Query simplifies API integration by handling caching, loading states, and synchronization automatically."

---

# 8. Context API

## Definition

React's built-in solution for sharing state.

---

## Flow

```text
Provider
    ↓
Consumer
```

---

## Example

```jsx
<AuthProvider>
   <App />
</AuthProvider>
```

---

## Advantages

* Built into React
* No External Library

---

## Limitations

* Frequent re-renders
* Not ideal for large apps

---

## Interview Answer

"Context API is useful for lightweight global state such as themes or authentication data."

---

# 9. Zustand

## Definition

Zustand is a lightweight state management library.

---

## Example

```javascript
const useStore =
 create(set => ({

  count: 0,

  increment: () =>
   set(state => ({
    count:
      state.count + 1
   }))
 }));
```

---

## Benefits

* Minimal Boilerplate
* Easy Learning Curve
* High Performance

---

## Interview Answer

"Zustand provides simple and performant global state management with minimal setup."

---

# 10. MobX

## Definition

MobX is a reactive state management library.

---

## Example

```javascript
class UserStore {

 @observable
 name = "";

}
```

---

## Benefits

* Reactive Updates
* Less Boilerplate

---

## Limitations

* Learning Curve
* Hidden Magic

---

## Interview Answer

"MobX uses observables and reactive programming to automatically update the UI when state changes."

---

# 11. Recoil

## Definition

Recoil is a state management library developed by Facebook.

---

## Core Concepts

### Atom

State container.

---

### Selector

Derived state.

---

## Example

```javascript
const userState =
 atom({
   key:"user",
   default:null
 });
```

---

## Interview Answer

"Recoil introduces atom-based state management with fine-grained updates."

---

# 12. Redux Persist

## Definition

Persists Redux state across app restarts.

---

## Flow

```text
Redux Store
      ↓
Persist
      ↓
AsyncStorage
      ↓
App Restart
      ↓
Restore State
```

---

## Use Cases

* Login State
* User Preferences
* Theme

---

## Interview Answer

"Redux Persist saves Redux state to storage and restores it when the application restarts."

---

# 13. AsyncStorage Integration

## Example

```javascript
await AsyncStorage.setItem(
 "token",
 token
);
```

---

## Use Cases

* User Preferences
* Theme
* Cache

---

## Limitation

Not secure for sensitive data.

---

## Interview Answer

"AsyncStorage provides persistent key-value storage but should not be used for sensitive information."

---

# 14. Secure Storage

## Android

```text
Keystore
```

---

## iOS

```text
Keychain
```

---

## Use Cases

* JWT Tokens
* Refresh Tokens
* Credentials

---

## Interview Answer

"Sensitive data should be stored in Keychain or Keystore rather than AsyncStorage."

---

# 15. Redux vs Context API

| Feature     | Redux  | Context API |
| ----------- | ------ | ----------- |
| Large Apps  | ✅      | ❌           |
| DevTools    | ✅      | ❌           |
| Middleware  | ✅      | ❌           |
| Performance | Better | Limited     |
| Boilerplate | More   | Less        |

---

## Interview Answer

"Context API is suitable for small shared state, while Redux is preferred for large-scale applications."

---

# 16. Redux Toolkit vs Zustand

| Feature          | Redux Toolkit | Zustand    |
| ---------------- | ------------- | ---------- |
| Boilerplate      | Medium        | Very Low   |
| DevTools         | Excellent     | Good       |
| Learning Curve   | Higher        | Lower      |
| Ecosystem        | Mature        | Growing    |
| Enterprise Usage | Very High     | Increasing |

---

## Interview Answer

"Redux Toolkit is ideal for enterprise applications, while Zustand is excellent for lightweight state management."

---

# 17. RTK Query vs React Query

## RTK Query

Integrated with Redux.

---

## React Query

Independent library.

---

## Comparison

| RTK Query           | React Query    |
| ------------------- | -------------- |
| Redux Based         | Standalone     |
| Integrated Store    | Separate Cache |
| Enterprise Friendly | Very Popular   |

---

## Interview Answer

"RTK Query is ideal when Redux already exists, while React Query excels as a standalone server-state solution."

---

# 18. Which State Management Should You Choose?

## Small Application

```text
Context API
```

---

## Medium Application

```text
Zustand
```

---

## Enterprise Application

```text
Redux Toolkit
+ RTK Query
```

---

## Interview Answer

"My default choice for enterprise React Native applications is Redux Toolkit with RTK Query because it provides predictable state management, excellent tooling, and scalable architecture."

---

# 19. Common Architecture in Enterprise Apps

```text
React Native
      ↓
Redux Toolkit
      ↓
RTK Query
      ↓
AsyncStorage / Secure Storage
      ↓
Backend APIs
```

---

## Why?

* Scalable
* Testable
* Predictable
* Easy Debugging

---

# 20. Most Asked Interview Questions

1. What is State Management?
2. Local State vs Global State?
3. What is Redux?
4. What is Redux Toolkit?
5. Why Redux Toolkit over Redux?
6. What is RTK Query?
7. Context API vs Redux?
8. What is Zustand?
9. Zustand vs Redux Toolkit?
10. What is MobX?
11. What is Recoil?
12. What is Redux Persist?
13. AsyncStorage vs Secure Storage?
14. What is Immer?
15. RTK Query vs React Query?
16. How do you persist login state?
17. How do you cache API responses?
18. What would you choose for a new project?
19. What state management do you use in production?
20. How do you structure Redux in a large app?

---

# Ultimate Senior Interview Answer

"For enterprise React Native applications, I typically use Redux Toolkit combined with RTK Query. Redux Toolkit provides predictable global state management with minimal boilerplate, while RTK Query handles API fetching, caching, and synchronization efficiently. For lightweight applications, Zustand is an excellent alternative due to its simplicity and performance."

---

# Daily Revision Plan

```text
Redux Basics              5 min
Redux Toolkit             5 min
RTK Query                 5 min
Context API               3 min
Zustand                   5 min
MobX/Recoil               3 min
Redux Persist             3 min
Comparisons               8 min

Total: ~37 Minutes
```

---

## Redux Middleware

Middle layer between dispatch and reducer.

```text
Action
 ↓
Middleware
 ↓
Reducer
```

---

## Redux Thunk

Handles async logic.

```javascript
dispatch(asyncAction());
```

---

## Redux Saga

Uses generator functions.

```javascript
function* loginSaga() {}
```

---

## Normalized State

Bad:

```javascript
users: [
 {
  posts:[]
 }
]
```

Good:

```javascript
usersById
postsById
```
