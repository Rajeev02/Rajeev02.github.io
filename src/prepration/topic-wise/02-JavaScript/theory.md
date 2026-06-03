## ☕ Section 1: Engine Fundamentals & Scoping

### 1. Lexical Scoping & Closures
- **Lexical Scoping**: JavaScript resolves variables based on the physical position of the variables' declarations within the nested source code structures. Inner functions have access to variables declared in their outer parent scopes.
- **Closure**: A closure is the combination of a function bundled together with references to its surrounding state (its **lexical environment**). 
  - In JavaScript, closures are created every time a function is defined, at function creation time.
  - A closure allows an inner function to access variables from its outer scope even after the outer function has finished executing and its execution context has been popped off the Call Stack.

### 2. Variable Scoping: `var` vs. `let` vs. `const`
- **`var` (Function Scope)**: Variables declared with `var` are scoped to the nearest function block. They do not respect block boundaries (like `if` statements or `for` loops). They are hoisted to the top of their scope and initialized with `undefined`.
- **`let` and `const` (Block Scope)**: Variables declared with `let` or `const` are scoped to the nearest enclosing curly braces `{}`. They are hoisted but are not initialized, remaining inside the **Temporal Dead Zone (TDZ)** until their actual declaration line is executed.
  - `let` allows re-assignment of values.
  - `const` prevents re-assignment of the variable reference (though object properties inside a `const` object can still be mutated).

### 3. The Event Loop & Concurrency Model
JavaScript is a single-threaded language, meaning it has one Call Stack and executes one operation at a time. Concurrency is handled by the browser or Node.js runtime environment using the **Event Loop**.

```text
[Call Stack] (Main Thread, Synchronous execution)
     ⬇️ (Asynchronous callback offloaded to WebAPI/Host thread)
[WebAPIs / OS Host] (Timers, Network requests, I/O)
     ⬇️ (Callbacks queued upon completion)
[Queues]
  1. Microtask Queue (High Priority: Promise resolutions, queueMicrotask)
  2. Macrotask Queue (Low Priority: setTimeout, setInterval, I/O)
```

- **Call Stack**: Executes synchronous code sequentially.
- **WebAPIs**: Handles async Web/Node tasks (timers, fetch requests, filesystem I/O) off-thread.
- **Microtask Queue**: Stores high-priority callbacks (e.g., `Promise.then` resolutions, `MutationObserver`, `queueMicrotask`).
- **Macrotask Queue (Callback Queue)**: Stores standard deferred callbacks (e.g., `setTimeout`, `setInterval`, user interaction events).
- **The Event Loop Rule**: 
  1. The event loop waits until the Call Stack is completely empty.
  2. It then flushes the **entire** Microtask Queue (including any microtasks queued during the flush).
  3. Once the Microtask Queue is completely empty, it takes the **first** task from the Macrotask Queue, pushes it to the Call Stack to execute, and repeats the cycle.

---

## 🗑️ Section 2: Memory Management & Garbage Collection

### 1. Hermes Mark-and-Sweep Garbage Collection
React Native's Hermes engine manages memory using a **Mark-and-Sweep Garbage Collector (GC)**:
1. **Mark Phase**: The GC starts from global root objects (window context, active closures, execution stack references) and traverses all reference pointers recursively. Every object reached is "marked" as active (reachable).
2. **Sweep Phase**: The GC scans the heap memory space. Any object that does not contain an active mark is considered unreachable (dead) and its allocated memory space is reclaimed (swept).

### 2. Identifying & Diagnosing Memory Leaks
A memory leak occurs when variables or objects that are no longer needed by the app logic are still referenced by a root container, preventing the Garbage Collector from sweeping them.

#### Typical JS Memory Leak Scenarios:
- **LINGERING TIMERS/INTERVALS**: Creating a `setInterval` inside a React component without calling `clearInterval` during unmounting. The interval callback closure continues running, retaining references to all component state variables.
- **UNREMOVED EVENT LISTENERS**: Registering global listeners (e.g., `DeviceEventEmitter`, `AppState.addEventListener`, or custom event dispatchers) and failing to call `.remove()` in the cleanup block.
- **CLOSURE LEAKS**: Outer scopes holding large arrays or references that are trapped by long-lived inner functions.
- **GLOBAL VARIABLES**: Accidentally attaching large objects or lists to the global `global` or `window` scope.

---

## ⚛️ Section 3: React Lifecycle: Class Components vs. Functional Hooks

React manages component lifecycles in three distinct phases: **Mounting** (initial paint), **Updating** (re-renders due to prop/state mutations), and **Unmounting** (removal from DOM/Native layout tree).

### 1. Structural Comparison: Classes vs. Hooks
- **Class Components**: Group logic by lifecycle stages using explicit class instance methods (`componentDidMount`, `componentDidUpdate`, etc.). State is maintained in a single instance object (`this.state`).
- **Functional Components + Hooks**: Group logic by concern (side effects, cache, state) using isolated functions. State is split into atomic hook declarations (`useState`).

### 2. Lifecycle Mapping Reference

| Class Component Lifecycle Method | Functional Hook equivalent (`useEffect`) | Description / Rules |
| :--- | :--- | :--- |
| **`componentDidMount`** | `useEffect(() => {}, [])` | Runs once after the component mounts. The empty dependency array `[]` ensures it does not execute on subsequent updates. |
| **`componentDidUpdate(prevProps, prevState)`** | `useEffect(() => {}, [dep1, dep2])` | Runs after props or state changes. The dependency array compares variables using shallow equality (`Object.is`). |
| **`componentWillUnmount`** | `useEffect(() => { return () => { /* clean up */ } }, [])` | Runs immediately before unmounting. The returned cleanup function acts as the unmount event. |

---

## ⚡ Section 4: React Optimization Hooks (`useMemo`, `useCallback`, `useRef`)

### 1. `useMemo` (Value Caching)
- **Purpose**: Caches the result of an expensive computation across render cycles.
- **Mechanism**: Evaluates the computation only when variables inside its dependency array change. If dependencies remain identical, it intercepts the execution and serves the cached result, skipping the CPU-heavy logic.
- **Fintech Example**: Filtering and sorting an array of 5,000 market securities based on a user's search text.

### 2. `useCallback` (Reference Caching)
- **Purpose**: Memoizes a function instance reference across render cycles.
- **Mechanism**: In JavaScript, functions are objects. Creating an inline function (`onPress={() => {}}`) allocates a brand-new object reference in memory on every render. If this callback is passed to a child component optimized with `React.memo`, the child will detect a "changed" prop reference and trigger a complete, unnecessary re-render. Wrapping the callback in `useCallback` maintains the exact same memory address reference pointer unless dependency array values mutate.

### 3. `useRef` (Mutable Container)
- **Purpose**: Persists a mutable container whose `.current` property holds a value throughout the entire lifecycle of the component.
- **Key Feature**: Mutating `.current` **does not trigger a component re-render**. It is used to store mutable state values that should not affect the visual UI paint cycles, such as WebSocket references, animation objects, or timer IDs.

### 4. When NOT to Memoize
Overusing `useMemo` and `useCallback` is a common mistake that degrades performance:
- **Trivial Logic**: Wrapping simple computations (e.g., adding two numbers or concatenating string props) in `useMemo` adds unnecessary overhead. The cost of allocating memory slots for dependencies and running shallow comparisons on every render exceeds the cost of re-calculating the primitive value.
- **Unnecessary Dependencies**: Wrapping functions in `useCallback` when they are passed to standard HTML/Native elements (like `<View>` or `<Button>`) is redundant, as standard elements do not implement reference checking optimizations like `React.memo`.

---

## 🗃️ Section 5: State Orchestration: Redux Toolkit vs. React Query

Large-scale React applications split state management into two clear domains: **Client UI State** and **Remote Server State**.

```text
[State Management]
  ├── Client UI State  ➡️ (Redux Toolkit)  ➡️ predictable, local UI themes, wizard state
  └── Server Data State ➡️ (React Query)   ➡️ cached backend responses, background synchronization
```

### 1. Redux Toolkit (RTK) - Client UI State
- **Best For**: Localized application configuration, UI themes, active session authentication flags, user preferences, and multi-step inputs (e.g., a signup wizard).
- **Core Principle**: Unidirectional data flow governed by synchronous actions and reducers. Changes are predictable, trackable via devtools, and run entirely within client memory.
- **Asynchronous Data**: Uses Thunks or Sagas. Orchestrating sequential API calls requires manual loading flags, error tracking, and caching logics.

### 2. React Query (TanStack Query) - Server State
- **Best For**: Data that lives on a remote database (e.g., bank accounts, trade history, transactions).
- **Core Principle**: Declarative cache container. React Query acts as an asynchronous state machine that handles fetching, caching, automatic background re-validation, request deduplication, loading states, and error retries out-of-the-box.
- **Key Strategies**:
  - **Dependent Queries**: Block queries using the `enabled` configuration flag (e.g., `enabled: !!userId`) until parent credentials resolve.
  - **Exponential Backoff**: Configure automatic retries with increasing delay times to gracefully handle temporary network dropouts.
  - **Cache Invalidation**: Query keys (e.g., `['portfolio', userId]`) map variables to cache buckets. Calling `queryClient.invalidateQueries({ queryKey })` triggers background refetches to sync stale components.
