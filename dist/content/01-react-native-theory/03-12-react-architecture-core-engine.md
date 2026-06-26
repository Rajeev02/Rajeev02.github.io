> 🎯 **Topic:** 1.2 ⚛️ React Architecture & Core Engine
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## 1.2 ⚛️ React Architecture & Core Engine

*⏱️ 3 min read*

#### 1. Virtual DOM, React Fiber, Reconciliation & Diffing
- **Virtual DOM**: A lightweight, in-memory representation of the real DOM/Native UI layout tree. It acts as a blue-print stage where updates are calculated first to avoid expensive layouts reflows.
- **Reconciliation**: The reconciliation process compares the new Virtual DOM tree with the previous one. In React 16+, this is powered by **React Fiber**.
- **React Fiber**: A complete rewrite of React’s core reconciliation algorithm. 
  - *Why Fiber*: The legacy reconciler used a synchronous call-stack recursion that could not be interrupted. If a rendering cycle took too long, it blocked the main thread, causing frame drops (jank).
  - *How it works*: Fiber breaks rendering work down into small units called "fibers" and processes them incrementally in two phases:
    1. **Render Phase**: Asynchronous and interruptible. React builds a new work-in-progress tree, calculates changes, and prioritizes updates (e.g., user inputs are prioritized over background list fetches).
    2. **Commit Phase**: Synchronous and uninterruptible. Writes the final layout updates directly to the host platform (DOM or Native views).
- **The Diffing Heuristic ($O(N)$)**:
  - If elements have different types (e.g., changing a `<View>` to a `<ScrollView>`), React tears down the old tree and builds the new one from scratch.
  - If elements are the same type, React compares and updates changed props or attributes only.
  - **Keys in Lists**: React uses keys to match Virtual DOM elements across render frames. Without unique keys, list updates (reordering, inserting, deleting) force React to recreate all native view cells from scratch, destroying state and causing UI flickering.

#### 2. Component Lifecycles: Class vs. Functional Components
- Components transition through three core phases: **Mounting**, **Updating**, and **Unmounting**.
- **Method Execution Order**:

```text
[Mounting] 
  Class: constructor() ➡️ static getDerivedStateFromProps() ➡️ render() ➡️ componentDidMount()
  Functional: Function Executes (Initial Paint) ➡️ useEffect() execution

[Updating]
  Class: getDerivedStateFromProps() ➡️ shouldComponentUpdate() ➡️ render() ➡️ getSnapshotBeforeUpdate() ➡️ componentDidUpdate()
  Functional: Function Executes (Re-render) ➡️ useEffect() cleanup ➡️ useEffect() execution

[Unmounting]
  Class: componentWillUnmount()
  Functional: useEffect() cleanup function executes
```

#### 3. Higher-Order Components (HOC)
- **Definition**: An HOC is a pure function that takes a component as an argument and returns an enhanced component. It represents a structural pattern for sharing cross-cutting concerns (authentication, layouts, analytics tracking).
- **When to Use**: Decoupling layout styles, injecting global contexts, or shielding screens with authorization wrappers.
- **Example HOC**:
  ```tsx
  import React from 'react';
  import { View, Text } from 'react-native';

  export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return (props: P) => {
      const isAuthenticated = true; // fetch from auth context

      if (!isAuthenticated) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Access Denied. Please log in.</Text>
          </View>
        );
      }

      return <WrappedComponent {...props} />;
    };
  }
  ```

#### 4. React Hooks: Definitions & Code Examples
- **`useState`**: Hook to declare local component state.
  ```typescript
  const [count, setCount] = useState<number>(0);
  ```
- **`useEffect`**: Hook to perform side effects (subscriptions, data fetches, listeners).
  ```typescript
  import { AppState } from 'react-native';

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      console.log('app state changed', state);
    });

    return () => subscription.remove(); // cleanup
  }, []);
  ```
- **`useContext`**: Reads and subscribes to a React context without nesting consumer components.
  ```typescript
  const theme = useContext(ThemeContext);
  ```
- **`useReducer`**: Alternative to `useState` for managing complex state objects with action dispatch rules.
  ```typescript
  const [state, dispatch] = useReducer(reducerFn, initialState);
  ```
- **`useMemo`**: Caches computed values to avoid recalculations on every render.
  ```typescript
  const sortedData = useMemo(() => data.sort(), [data]);
  ```
- **`useCallback`**: Memoizes function instances to preserve reference pointers.
  ```typescript
  const handleClick = useCallback(() => console.log(id), [id]);
  ```
- **`useRef`**: Returns a mutable ref object whose `.current` persists across renders and does not trigger re-renders upon mutation.
  ```typescript
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  ```

#### 5. Custom Hooks: Rationale & Implementation
- **Why**: Encourages code reusability, modularity, and readability. It separates UI presentation from business logic.
- **Example (Encrypted Secure Storage Custom Hook)**:
  ```typescript
  import { useState, useEffect, useCallback } from 'react';
  import { MMKV } from 'react-native-mmkv';

  const storage = new MMKV();

  export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = storage.getString(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    });

    const setValue = useCallback((value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.set(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    }, [key, storedValue]);

    return [storedValue, setValue] as const;
  }
  ```

---


---

---
