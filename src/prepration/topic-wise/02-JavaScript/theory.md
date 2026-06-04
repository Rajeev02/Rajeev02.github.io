
<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [☕ Section 1: Engine Fundamentals & Scoping](#section-1-engine-fundamentals-scoping)
  - [1. Lexical Scoping & Closures](#1-lexical-scoping-closures)
  - [2. Variable Scoping: `var` vs. `let` vs. `const`](#2-variable-scoping-var-vs-let-vs-const)
  - [3. The Event Loop & Concurrency Model](#3-the-event-loop-concurrency-model)
- [🗑️ Section 2: Memory Management & Garbage Collection](#section-2-memory-management-garbage-collection)
  - [1. Hermes Mark-and-Sweep Garbage Collection](#1-hermes-mark-and-sweep-garbage-collection)
  - [2. Identifying & Diagnosing Memory Leaks](#2-identifying-diagnosing-memory-leaks)
    - [Typical JS Memory Leak Scenarios:](#typical-js-memory-leak-scenarios)
- [⚛️ Section 3: React Lifecycle: Class Components vs. Functional Hooks](#section-3-react-lifecycle-class-components-vs-functional-hooks)
  - [1. Structural Comparison: Classes vs. Hooks](#1-structural-comparison-classes-vs-hooks)
  - [2. Lifecycle Mapping Reference](#2-lifecycle-mapping-reference)
- [⚡ Section 4: React Optimization Hooks (`useMemo`, `useCallback`, `useRef`)](#section-4-react-optimization-hooks-usememo-usecallback-useref)
  - [1. `useMemo` (Value Caching)](#1-usememo-value-caching)
  - [2. `useCallback` (Reference Caching)](#2-usecallback-reference-caching)
  - [3. `useRef` (Mutable Container)](#3-useref-mutable-container)
  - [4. When NOT to Memoize](#4-when-not-to-memoize)
- [🗃️ Section 5: State Orchestration: Redux Toolkit vs. React Query](#section-5-state-orchestration-redux-toolkit-vs-react-query)
  - [1. Redux Toolkit (RTK) - Client UI State](#1-redux-toolkit-rtk-client-ui-state)
  - [2. React Query (TanStack Query) - Server State](#2-react-query-tanstack-query-server-state)
- [⚙️ Section 6: Advanced Core JS & React Engine Concepts](#section-6-advanced-core-js-react-engine-concepts)
  - [1. Currying & Hoisting](#1-currying-hoisting)
  - [2. Prototypal Inheritance & The Chain](#2-prototypal-inheritance-the-chain)
  - [3. Shallow vs. Deep Copying](#3-shallow-vs-deep-copying)
  - [4. Spread vs. Rest Operators (`...`)](#4-spread-vs-rest-operators)
  - [5. Generators & Iterators](#5-generators-iterators)
  - [6. Callbacks & Callback Hell](#6-callbacks-callback-hell)
  - [7. Promises, Async/Await & Try/Catch](#7-promises-asyncawait-trycatch)
  - [7b. Redux Async Workflow: Synchronous Actions & Middlewares (Thunks/Sagas)](#7b-redux-async-workflow-synchronous-actions-middlewares-thunkssagas)
  - [8. React Reconciliation & Diffing (React Fiber)](#8-react-reconciliation-diffing-react-fiber)
  - [9. Lazy Loading & Code Splitting](#9-lazy-loading-code-splitting)
  - [10. Advanced JS Engine & Concurrency Q&A](#10-advanced-js-engine-concurrency-qa)
</details>
<!-- INDEX_END -->

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

---

## ⚙️ Section 6: Advanced Core JS & React Engine Concepts

### 1. Currying & Hoisting
- **Hoisting**: During the compilation phase, JavaScript moves declarations (variables and functions) to the top of their enclosing scopes.
  - *Function Declarations* are fully hoisted (both declaration and implementation), allowing them to be invoked before their physical line position.
  - *`var` variables* are hoisted and initialized to `undefined`.
  - *`let` and `const` variables* are hoisted but remain uninitialized in the **Temporal Dead Zone (TDZ)**, throwing a `ReferenceError` if accessed early.
  - *Function Expressions* (e.g., `const fn = () => {}`) behave like variables and are not fully hoisted.
- **Currying**: A functional programming pattern where a function taking multiple arguments is transformed into a chain of nested functions, each taking a single argument. It leverages closures to retain arguments across evaluations.
  - *Example*: `const multiply = a => b => a * b; multiply(2)(3); // 6`

### 2. Prototypal Inheritance & The Chain
- Every JavaScript object has a private link referencing another object called its **Prototype** (`__proto__`). 
- **The Prototype Chain**: When accessing a property on an object, JavaScript first looks at the object's local properties. If not found, it traverses up the prototype chain (`object.__proto__`, `object.__proto__.__proto__`) recursively until the property is located or the chain terminates at `null`.
- **Property Shadowing**: If an object defines a local property with the same name as a property on its prototype, the local property "shadows" (overrides) the prototype's property.

### 3. Shallow vs. Deep Copying
- **Shallow Copy**: Copies only the first level of keys. For nested objects, it copies the memory reference pointers, meaning mutating a nested object inside the copy will modify the original object.
  - *Methods*: Spread operator (`{ ...obj }`), `Object.assign({}, obj)`.
- **Deep Copy**: Copies all property levels recursively, allocating entirely new memory slots for all nested objects. Changes made to the copy do not affect the original.
  - *Methods*: `structuredClone(obj)` (native modern standard), `JSON.parse(JSON.stringify(obj))` (basic, drops functions/undefined/dates), or custom recursive deep-cloning utilities.

### 4. Spread vs. Rest Operators (`...`)
- **Spread Operator**: Expands elements of an array or properties of an object. Used for cloning, merging arrays/objects, or passing arguments.
- **Rest Parameter**: Aggregates separate arguments into a single structured array array. Used in function declarations to receive variable arguments.
  - *Example*: `function sum(...nums) { return nums.reduce((a, b) => a + b); }`

### 5. Generators & Iterators
- **Iterators**: An object implementing the Iterator protocol with a `next()` method returning `{ value, done: boolean }`. Objects can declare custom iteration via `[Symbol.iterator]`.
- **Generators**: Declared using **`function*`**, generators are functions that can pause and resume execution. They use the **`yield`** keyword to return states, maintaining their execution context (variable scopes) across calls.

### 6. Callbacks & Callback Hell
- **Callback**: A function passed as an argument to another function, which is then executed inside the outer function to handle completion of asynchronous events.
- **Callback Hell**: Pyramid-shaped nesting of asynchronous callbacks, making code unreadable, hard to trace, and fragile to debug.
  - *Example*:
    ```javascript
    fetchUser(userId, (user) => {
      fetchOrders(user.id, (orders) => {
        fetchOrderDetails(orders[0].id, (details) => {
          console.log(details);
        }, errorCallback);
      }, errorCallback);
    }, errorCallback);
    ```
  - *Resolution*: Resolved by replacing callbacks with Promises or Async/Await.

### 7. Promises, Async/Await & Try/Catch
- **Promise**: An object representing the eventual completion or failure of an asynchronous operation.
  - *States*: `Pending` (in-flight), `Fulfilled` (success), `Rejected` (error).
- **Promise Chaining**: The pattern of chaining multiple asynchronous operations sequentially by returning a new Promise from within `.then()` handlers.
  - *Example*:
    ```javascript
    fetchUser(userId)
      .then(user => fetchOrders(user.id))
      .then(orders => fetchOrderDetails(orders[0].id))
      .then(details => console.log(details))
      .catch(err => console.error("Error in chain:", err));
    ```
- **Promises API**:
  - **`Promise.all(iterable)`**: Resolves when **all** promises resolve; rejects immediately if **any** promise rejects (All-or-Nothing).
  - **`Promise.allSettled(iterable)`**: Waits for **all** promises to settle (either resolve or reject) and returns an array of outcome descriptors: `{ status: 'fulfilled' | 'rejected', value?: any, reason?: any }`. Never rejects early.
  - **`Promise.any(iterable)`**: Resolves as soon as the **first** promise resolves. Rejects with an `AggregateError` only if **all** promises reject.
  - **`Promise.race(iterable)`**: Settles as soon as the **first** promise settles (either resolves or rejects).
- **Async/Await**: Syntactic sugar built on top of Promises to write asynchronous code that reads like synchronous code, making it easier to follow.
- **Try/Catch Boundaries**: Synchronous and asynchronous error boundaries. When using `async/await`, errors are caught cleanly inside `try-catch` blocks, preventing unhandled promise rejections.

### 7b. Redux Async Workflow: Synchronous Actions & Middlewares (Thunks/Sagas)
- **Redux is Synchronous**: By design, Redux's core flow is purely synchronous: `dispatch(action) -> store calls reducer(state, action) -> state updates`. Reducers must be pure functions with no side effects (no API requests, no timers).
- **How Redux handles Async Tasks**: To perform async tasks (e.g. calling multiple APIs), Redux uses **Middleware** that intercepts actions before they reach the reducer.
- **Redux Thunk**:
  - *How it works*: Allows dispatching a function (Thunk) instead of a plain action object. The middleware executes the function and passes the `dispatch` and `getState` methods.
  - *Behavior*: It does **not** block the main JS execution loop. Multiple API calls can be executed sequentially or concurrently inside a Thunk using `await` or `Promise.all`.
  - *Example*:
    ```javascript
    const fetchUserAndOrders = (userId) => async (dispatch) => {
      dispatch({ type: 'FETCH_START' });
      try {
        const user = await api.fetchUser(userId);
        dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
        const orders = await api.fetchOrders(user.id);
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: orders });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', error: err.message });
      }
    };
    ```
- **Redux Saga**:
  - *How it works*: Uses ES6 **Generators** (`function*`) to orchestrate complex async flows. It listens for dispatched actions and runs background generator tasks (sagas).
  - *Behavior*: Provides advanced concurrency control using helper functions (e.g., `takeLatest` to automatically cancel previous ongoing API requests if a new action is dispatched, `takeEvery` for parallel processing, `fork` for non-blocking calls).
  - *Example*:
    ```javascript
    function* fetchUserSaga(action) {
      try {
        const user = yield call(api.fetchUser, action.payload);
        yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
      } catch (err) {
        yield put({ type: 'FETCH_FAIL', message: err.message });
      }
    }
    function* watchFetchUser() {
      yield takeLatest('FETCH_USER_REQUEST', fetchUserSaga);
    }
    ```

### 8. React Reconciliation & Diffing (React Fiber)
- **Virtual DOM**: React maintains a lightweight in-memory representation of the true UI layout tree.
- **Reconciliation (React Fiber)**: The algorithm React uses to update the UI. It splits rendering into a non-blocking compilation phase (creating the Fiber work tree) and a commit phase (writing changes to the screen).
- **The Diffing Algorithm**: React compares virtual DOM nodes using an $O(N)$ heuristic diffing approach:
  1. If two elements are of different types, React tears down the old tree and builds a new one.
  2. If elements are of the same type, React compares attributes and updates only changed properties.
  3. **Keys in Lists**: Keys act as unique identifiers for list items. When a list changes, React uses keys to match nodes between the old and new trees. Failing to provide unique keys (or using array indexes as keys) causes React to destroy and recreate components needlessly or misalign local states during deletions/insertions.

### 9. Lazy Loading & Code Splitting
- **Code Splitting**: Splitting the JavaScript bundle into smaller chunks that can be downloaded dynamically.
- **Lazy Loading**: Delaying load times of features until they are accessed. In React, this is achieved using **`React.lazy()`** (for dynamic component imports) wrapped in a **`<Suspense>`** boundary to display a loading fallback UI. This decreases app launch bundle size and improves startup time.

### 10. Advanced JS Engine & Concurrency Q&A

#### Q1: Explain the V8/Hermes memory layout (Stack vs. Heap) and how JavaScript variables are allocated and referenced.
- **Answer**:
  The JS runtime environment divides memory into two principal regions: **The Stack** and **The Heap**.
  - **The Stack (Static Allocation)**:
    - Stores primitives (number, string, boolean, undefined, null, symbol, bigint) and references (memory address pointers) targeting objects.
    - Operates on a LIFO (Last-In-First-Out) execution order managed directly by the OS.
    - Extremely fast, with allocation/deallocation executing automatically as execution frames enter and leave the Call Stack.
  - **The Heap (Dynamic Allocation)**:
    - Stores reference types (objects, arrays, functions, closures, component states).
    - Unstructured, dynamic memory heap. Runtimes allocate variable chunks as objects grow.
    - Reclaiming memory requires Garbage Collection (GC) operations (e.g., Mark-and-Sweep in Hermes), which are computationally expensive.
  - **Variable Reference Mechanics**:
    - When you assign `const a = { x: 10 }`, a reference pointer (the hexadecimal memory address of the heap object) is stored on the Stack, while the actual `{ x: 10 }` object resides on the Heap.
    - If you pass `a` to a function, the pointer value is copied to the function's stack frame. Both pointers reference the same heap block. Modifying properties inside the function mutates the source heap object.

---

#### Q2: What is Event Loop starvation? Contrast the execution prioritization of `process.nextTick()`, `Promise.then()`, `setImmediate()`, and `setTimeout()`.
- **Answer**:
  - **Event Loop Starvation**: Occurs when high-priority queues (like the Microtask Queue) are continuously populated, completely preventing the event loop from executing low-priority macrotasks (like rendering inputs, scroll listeners, or timers).
  - **Prioritization & Loop Phases**:
    1. **Synchronous Execution**: Call Stack executes immediate functions.
    2. **`process.nextTick()` (Node.js specific)**: Fires immediately after the current synchronous operation finishes, *before* microtasks are evaluated. If a script calls `process.nextTick` recursively, it blocks the event loop entirely.
    3. **Microtask Queue (Promises, queueMicrotask)**: Executed after the call stack clears and before the loop moves to the next phase. The event loop will not proceed until the microtask queue is *completely* empty. If microtasks continuously queue new microtasks, macrotasks starve.
    4. **Macrotask Queue (setTimeout/setInterval, I/O)**: Triggered in subsequent loop cycles once the microtask queue is empty.
    5. **`setImmediate()`**: Executes immediately in the check phase of the loop, running after I/O callbacks but before standard timers in many Node.js lifecycle situations.

---

#### Q3: What are JavaScript Proxies and the Reflect API? How can they be used to build a reactive state tracking system?
- **Answer**:
  - **Proxy**: An ES6 object wrapping a target object, allowing you to intercept and customize fundamental operations (like property access `get`, assignment `set`, deletion `deleteProperty`).
  - **Reflect**: A global object providing static helper methods corresponding to Proxy traps (e.g., `Reflect.get(target, prop)`). It returns boolean success markers and makes default object operations predictable.
  - **Building Reactivity (Concept)**:
    - State systems (like Vue 3 reactivity or custom state libraries) wrap plain objects in a Proxy.
    - **`get` Trap**: Tracks active component dependencies (Dependency Tracking). When a component renders and reads `proxy.price`, the system registers the component as a subscriber to that property.
    - **`set` Trap**: Triggers reactivity triggers. When a mutation occurs (`proxy.price = 100`), the proxy intercepts, calls `Reflect.set()`, and automatically loops through all subscribed components to force UI re-renders.

---

#### Q4: How do WeakMap and WeakSet differ from Map and Set? What are their use cases in memory leak prevention?
- **Answer**:
  - **Weak references**: In standard `Map` and `Set`, objects added as keys or values are held with strong references. The garbage collector (GC) cannot sweep them, even if all other variables reference pointers are destroyed.
  - **WeakMap & WeakSet**: Holds references to objects *weakly*.
    - Keys inside a `WeakMap` must be objects (not primitives).
    - If there are no other strong references to a key object in the application memory, the GC can sweep it, and its entry inside the `WeakMap` is cleared automatically.
  - **Use Cases**:
    - **Caching/Memoization**: Mapping temporary metadata (like user fetch status maps) to object references. Once the user object is dereferenced during unmounts, the cache is freed from memory automatically.
    - **Encapsulation**: Storing private object variables.

---

#### Q5: Explain prototypal inheritance mechanics under the hood and how they relate to ES6 Class compilation.
- **Answer**:
  - **Prototypal Inheritance**: JavaScript does not have traditional object-oriented classes. Instead, inheritance relies on objects linking to other objects via a hidden `[[Prototype]]` property (accessible as `__proto__`).
  - **The Lookup Chain**: Accessing `obj.prop` triggers a recursive search: `obj` ➡️ `obj.__proto__` ➡️ `obj.__proto__.__proto__` up to `Object.prototype`, ending at `null`.
  - **ES6 Class Compilation**:
    - ES6 `class` syntax is purely syntactic sugar wrapping prototypal construction.
    - When you write `class Developer extends Person {}`, Babel compiles it to standard constructor functions:
      ```javascript
      function Developer() {
        Person.call(this); // Inherit instance properties
      }
      Developer.prototype = Object.create(Person.prototype); // Link prototype chain
      Developer.prototype.constructor = Developer; // Reset constructor pointer
      ```
    - Methods declared on class objects are attached to `Developer.prototype` to save memory, ensuring all instances share a single function reference on the prototype object instead of duplicating instances.
