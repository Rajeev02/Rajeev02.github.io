# JavaScript Theory

## Table of Contents

- [JavaScript Complete Guide](#javascript-complete-guide)
- [☕ Section 1: Engine Fundamentals & Scoping](#☕-section-1-engine-fundamentals-&-scoping)
- [🗑️ Section 2: Memory Management & Garbage Collection](#🗑️-section-2-memory-management-&-garbage-collection)
- [⚛️ Section 3: React Lifecycle: Class Components vs. Functional Hooks](#⚛️-section-3-react-lifecycle-class-components-vs-functional-hooks)
- [⚡ Section 4: React Optimization Hooks (`useMemo`, `useCallback`, `useRef`)](#⚡-section-4-react-optimization-hooks-`usememo`-`usecallback`-`useref`)
- [🗃️ Section 5: State Orchestration: Redux Toolkit vs. React Query](#🗃️-section-5-state-orchestration-redux-toolkit-vs-react-query)
- [⚙️ Section 6: Advanced Core JS & React Engine Concepts](#⚙️-section-6-advanced-core-js-&-react-engine-concepts)

---

## JavaScript Complete Guide

 | Attribute | Details |
| :--- | :--- |
| **Topic Name** | JavaScript Complete Guide |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | ⭐ Frequently Asked |

---



---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | ☕ Section 1: Engine Fundamentals & Scoping |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | ⭐ Frequently Asked |

---


## ☕ Section 1: Engine Fundamentals & Scoping

*⏱️ 2 min read*

#### 1. Lexical Scoping & Closures
- **Lexical Scoping**: JavaScript resolves variables based on the physical position of the variables' declarations within the nested source code structures. Inner functions have access to variables declared in their outer parent scopes.
  - *Example*:
    ```javascript
    function outer() {
      const outerVar = "I am from the outer scope";
      function inner() {
        console.log(outerVar); // Accesses outerVar because of lexical placement
      }
      inner();
    }
    outer(); // Logs: "I am from the outer scope"
    ```
- **Closure**: A closure is the combination of a function bundled together with references to its surrounding state (its **lexical environment**). 
  - In JavaScript, closures are created every time a function is defined, at function creation time.
  - A closure allows an inner function to access variables from its outer scope even after the outer function has finished executing and its execution context has been popped off the Call Stack.
  - *Example*:
    ```javascript
    function createCounter() {
      let count = 0; // State variable in outer scope
      return function() {
        count++; // Accesses and modifies the outer variable
        return count;
      };
    }
    const counter = createCounter();
    console.log(counter()); // 1
    console.log(counter()); // 2 (count variable persists in memory due to closure)
    ```

#### 2. Variable Scoping: `var` vs. `let` vs. `const`
- **`var` (Function Scope)**: Variables declared with `var` are scoped to the nearest function block. They do not respect block boundaries (like `if` statements or `for` loops). They are hoisted to the top of their scope and initialized with `undefined`.
- **`let` and `const` (Block Scope)**: Variables declared with `let` or `const` are scoped to the nearest enclosing curly braces `{}`. They are hoisted but are not initialized, remaining inside the **Temporal Dead Zone (TDZ)** until their actual declaration line is executed.
  - `let` allows re-assignment of values.
  - `const` prevents re-assignment of the variable reference (though object properties inside a `const` object can still be mutated).
  - *Example*:
    ```javascript
    // Block Scope vs. Function Scope
    if (true) {
      var functionScoped = "var is NOT block-scoped";
      let blockScoped = "let IS block-scoped";
    }
    console.log(functionScoped); // Logs: "var is NOT block-scoped"
    // console.log(blockScoped); // ReferenceError: blockScoped is not defined

    // Hoisting & TDZ
    console.log(hoistedVar); // Logs: undefined (var is hoisted and initialized to undefined)
    var hoistedVar = 10;

    // console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
    let tdzVar = 20;
    ```

#### 3. The Event Loop & Concurrency Model
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
  - *Example (Prioritization Order)*:
    ```javascript
    console.log("1. Synchronous");

    setTimeout(() => {
      console.log("4. Macrotask (setTimeout)");
    }, 0);

    Promise.resolve().then(() => {
      console.log("3. Microtask (Promise)");
    });

    console.log("2. Synchronous End");

    // Execution Output:
    // 1. Synchronous
    // 2. Synchronous End
    // 3. Microtask (Promise)
    // 4. Macrotask (setTimeout)
    ```

---


---

---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | 🗑️ Section 2: Memory Management & Garbage Collection |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | ⭐ Frequently Asked |

---


## 🗑️ Section 2: Memory Management & Garbage Collection

*⏱️ 1 min read*

#### 1. Hermes Mark-and-Sweep Garbage Collection
React Native's Hermes engine manages memory using a **Mark-and-Sweep Garbage Collector (GC)**:
1. **Mark Phase**: The GC starts from global root objects (window context, active closures, execution stack references) and traverses all reference pointers recursively. Every object reached is "marked" as active (reachable).
2. **Sweep Phase**: The GC scans the heap memory space. Any object that does not contain an active mark is considered unreachable (dead) and its allocated memory space is reclaimed (swept).

#### 2. Identifying & Diagnosing Memory Leaks
A memory leak occurs when variables or objects that are no longer needed by the app logic are still referenced by a root container, preventing the Garbage Collector from sweeping them.

##### Typical JS Memory Leak Scenarios:
- **LINGERING TIMERS/INTERVALS**: Creating a `setInterval` inside a React component without calling `clearInterval` during unmounting. The interval callback closure continues running, retaining references to all component state variables.
  - *Example*:
    ```javascript
    // ❌ LEAK: Missing clearInterval on unmount
    useEffect(() => {
      setInterval(() => { console.log("Timer ticking..."); }, 1000);
    }, []);

    // ✅ FIX: Clean up the interval using return cleanup function
    useEffect(() => {
      const id = setInterval(() => { console.log("Timer ticking..."); }, 1000);
      return () => clearInterval(id);
    }, []);
    ```
- **UNREMOVED EVENT LISTENERS**: Registering global listeners (e.g., `DeviceEventEmitter`, `AppState.addEventListener`, or custom event dispatchers) and failing to call `.remove()` in the cleanup block.
  - *Example*:
    ```javascript
    // ❌ LEAK: window listener remains attached after component unmounts
    useEffect(() => {
      window.addEventListener("resize", handleResize);
    }, []);

    // ✅ FIX: Clean up the event listener
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    ```
- **CLOSURE LEAKS**: Outer scopes holding large arrays or references that are trapped by long-lived inner functions.
- **GLOBAL VARIABLES**: Accidentally attaching large objects or lists to the global `global` or `window` scope.
  - *Example*:
    ```javascript
    // ❌ LEAK: Attaching big data to global object
    function processData() {
      global.leakData = new Array(1000000).fill("Data");
    }
    ```

---


---

---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | ⚛️ Section 3: React Lifecycle: Class Components vs. Functional Hooks |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | ⭐ Frequently Asked |

---


## ⚛️ Section 3: React Lifecycle: Class Components vs. Functional Hooks

*⏱️ 1 min read*

React manages component lifecycles in three distinct phases: **Mounting** (initial paint), **Updating** (re-renders due to prop/state mutations), and **Unmounting** (removal from DOM/Native layout tree).

#### 1. Structural Comparison: Classes vs. Hooks
- **Class Components**: Group logic by lifecycle stages using explicit class instance methods (`componentDidMount`, `componentDidUpdate`, etc.). State is maintained in a single instance object (`this.state`).
- **Functional Components + Hooks**: Group logic by concern (side effects, cache, state) using isolated functions. State is split into atomic hook declarations (`useState`).

#### 2. Lifecycle Mapping Reference

| Class Component Lifecycle Method | Functional Hook equivalent (`useEffect`) | Description / Rules |
| :--- | :--- | :--- |
| **`componentDidMount`** | `useEffect(() => {}, [])` | Runs once after the component mounts. The empty dependency array `[]` ensures it does not execute on subsequent updates. |
| **`componentDidUpdate(prevProps, prevState)`** | `useEffect(() => {}, [dep1, dep2])` | Runs after props or state changes. The dependency array compares variables using shallow equality (`Object.is`). |
| **`componentWillUnmount`** | `useEffect(() => { return () => { /* clean up */ } }, [])` | Runs immediately before unmounting. The returned cleanup function acts as the unmount event. |

- *Side-by-Side Example*:
  ```javascript
  // --- CLASS COMPONENT APPROACH ---
  class ProfileClass extends React.Component {
    componentDidMount() {
      console.log("Component mounted");
    }
    componentDidUpdate(prevProps) {
      if (this.props.userId !== prevProps.userId) {
        console.log("userId updated");
      }
    }
    componentWillUnmount() {
      console.log("Cleanup before unmounting");
    }
    render() { return <div>User ID: {this.props.userId}</div>; }
  }

  // --- FUNCTIONAL COMPONENT + HOOKS APPROACH ---
  function ProfileHook({ userId }) {
    useEffect(() => {
      console.log("Component mounted equivalent");
      return () => {
        console.log("Cleanup before unmounting equivalent");
      };
    }, []); // Empty dependencies = runs on mount, cleanup runs on unmount

    useEffect(() => {
      console.log("userId updated equivalent");
    }, [userId]); // Runs only when userId changes

    return <div>User ID: {userId}</div>;
  }
  ```

---


---

---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | ⚡ Section 4: React Optimization Hooks (`useMemo`, `useCallback`, `useRef`) |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | ⭐ Frequently Asked |

---


## ⚡ Section 4: React Optimization Hooks (`useMemo`, `useCallback`, `useRef`)

*⏱️ 2 min read*

#### 1. `useMemo` (Value Caching)
- **Purpose**: Caches the result of an expensive computation across render cycles.
- **Mechanism**: Evaluates the computation only when variables inside its dependency array change. If dependencies remain identical, it intercepts the execution and serves the cached result, skipping the CPU-heavy logic.
- **Fintech Example**:
  ```javascript
  const FinancialPortfolio = ({ assets, filterText }) => {
    // Expensive filtering/sorting calculation only runs when assets or filterText change
    const filteredAssets = useMemo(() => {
      console.log("Filtering financial securities...");
      return assets
        .filter(asset => asset.name.toLowerCase().includes(filterText.toLowerCase()))
        .sort((a, b) => b.value - a.value);
    }, [assets, filterText]);

    return (
      <ul>
        {filteredAssets.map(asset => <li key={asset.id}>{asset.name}: ${asset.value}</li>)}
      </ul>
    );
  };
  ```

#### 2. `useCallback` (Reference Caching)
- **Purpose**: Memoizes a function instance reference across render cycles.
- **Mechanism**: In JavaScript, functions are objects. Creating an inline function (`onPress={() => {}}`) allocates a brand-new object reference in memory on every render. If this callback is passed to a child component optimized with `React.memo`, the child will detect a "changed" prop reference and trigger a complete, unnecessary re-render. Wrapping the callback in `useCallback` maintains the exact same memory address reference pointer unless dependency array values mutate.
- **Example**:
  ```javascript
  const Parent = () => {
    const [count, setCount] = useState(0);
    
    // Caches the handleClick function reference so it does not change on Parent re-renders
    const handleClick = useCallback(() => {
      console.log("Child button clicked!");
    }, []); // Empty dependencies = function reference never changes

    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Increment Parent ({count})</button>
        {/* MemoizedButton will skip re-rendering because handleClick keeps the same reference */}
        <MemoizedButton onClick={handleClick} />
      </div>
    );
  };

  const MemoizedButton = React.memo(({ onClick }) => {
    console.log("MemoizedButton Rendered!");
    return <button onClick={onClick}>Click Me</button>;
  });
  ```

#### 3. `useRef` (Mutable Container)
- **Purpose**: Persists a mutable container whose `.current` property holds a value throughout the entire lifecycle of the component.
- **Key Feature**: Mutating `.current` **does not trigger a component re-render**. It is used to store mutable state values that should not affect the visual UI paint cycles, such as WebSocket references, animation objects, or timer IDs.
- **Example**:
  ```javascript
  const TimerComponent = () => {
    const timerRef = useRef(null); // Holds the interval ID persistently
    const [seconds, setSeconds] = useState(0);

    const startTimer = () => {
      if (timerRef.current !== null) return;
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    };

    const stopTimer = () => {
      clearInterval(timerRef.current);
      timerRef.current = null; // Clearing this ref value does NOT trigger a re-render
    };

    useEffect(() => {
      return () => clearInterval(timerRef.current); // Cleanup on unmount
    }, []);

    return (
      <div>
        <h3>Timer: {seconds}s</h3>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    );
  };
  ```

#### 4. When NOT to Memoize
Overusing `useMemo` and `useCallback` is a common mistake that degrades performance:
- **Trivial Logic**: Wrapping simple computations (e.g., adding two numbers or concatenating string props) in `useMemo` adds unnecessary overhead. The cost of allocating memory slots for dependencies and running shallow comparisons on every render exceeds the cost of re-calculating the primitive value.
  - *Example*:
    ```javascript
    // ❌ BAD: Trivial math is cheaper than hook validation setup
    const total = useMemo(() => price + tax, [price, tax]);
    ```
- **Unnecessary Dependencies**: Wrapping functions in `useCallback` when they are passed to standard HTML/Native elements (like `<View>` or `<Button>`) is redundant, as standard elements do not implement reference checking optimizations like `React.memo`.
  - *Example*:
    ```javascript
    // ❌ BAD: Native <button> does not check reference equality
    const onNativeClick = useCallback(() => { console.log("clicked"); }, []);
    return <button onClick={onNativeClick}>Click</button>;
    ```

---


---

---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | 🗃️ Section 5: State Orchestration: Redux Toolkit vs. React Query |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | ⭐ Frequently Asked |

---


## 🗃️ Section 5: State Orchestration: Redux Toolkit vs. React Query

*⏱️ 2 min read*

Large-scale React applications split state management into two clear domains: **Client UI State** and **Remote Server State**.

```text
[State Management]
  ├── Client UI State  ➡️ (Redux Toolkit)  ➡️ predictable, local UI themes, wizard state
  └── Server Data State ➡️ (React Query)   ➡️ cached backend responses, background synchronization
```

#### 1. Redux Toolkit (RTK) - Client UI State
- **Best For**: Localized application configuration, UI themes, active session authentication flags, user preferences, and multi-step inputs (e.g., a signup wizard).
- **Core Principle**: Unidirectional data flow governed by synchronous actions and reducers. Changes are predictable, trackable via devtools, and run entirely within client memory.
- **Asynchronous Data**: Uses Thunks or Sagas. Orchestrating sequential API calls requires manual loading flags, error tracking, and caching logics.
- **Example**:
  ```javascript
  import { createSlice, configureStore } from '@reduxjs/toolkit';

  // 1. Create slice
  const uiSlice = createSlice({
    name: 'ui',
    initialState: { darkMode: false },
    reducers: {
      toggleTheme: (state) => {
        state.darkMode = !state.darkMode; // Immer library handles safe state copying under the hood
      }
    }
  });

  export const { toggleTheme } = uiSlice.actions;

  // 2. Configure store
  const store = configureStore({
    reducer: { ui: uiSlice.reducer }
  });
  ```

#### 2. React Query (TanStack Query) - Server State
- **Best For**: Data that lives on a remote database (e.g., bank accounts, trade history, transactions).
- **Core Principle**: Declarative cache container. React Query acts as an asynchronous state machine that handles fetching, caching, automatic background re-validation, request deduplication, loading states, and error retries out-of-the-box.
- **Key Strategies**:
  - **Dependent Queries**: Block queries using the `enabled` configuration flag (e.g., `enabled: !!userId`) until parent credentials resolve.
  - **Exponential Backoff**: Configure automatic retries with increasing delay times to gracefully handle temporary network dropouts.
  - **Cache Invalidation**: Query keys (e.g., `['portfolio', userId]`) map variables to cache buckets. Calling `queryClient.invalidateQueries({ queryKey })` triggers background refetches to sync stale components.
- **Example**:
  ```javascript
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

  function UserDashboard({ userId }) {
    const queryClient = useQueryClient();

    // 1. Querying data (Server State)
    const { data: user, isLoading, error } = useQuery({
      queryKey: ['user', userId],
      queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json())
    });

    // 2. Dependent Query: Only runs after 'user' is fetched and username is available
    const { data: orders } = useQuery({
      queryKey: ['orders', user?.username],
      queryFn: () => fetch(`/api/orders?user=${user.username}`).then(res => res.json()),
      enabled: !!user?.username // Blocks execution until condition evaluates to true
    });

    // 3. Mutating data + Cache Invalidation
    const mutation = useMutation({
      mutationFn: (newProfile) => fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(newProfile)
      }),
      onSuccess: () => {
        // Automatically triggers background fetch to update outdated components
        queryClient.invalidateQueries({ queryKey: ['user', userId] });
      }
    });

    if (isLoading) return <span>Loading...</span>;
    return <div>User: {user.name} (Orders: {orders?.length ?? 0})</div>;
  }
  ```

---


---

---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | ⚙️ Section 6: Advanced Core JS & React Engine Concepts |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | ⭐ Frequently Asked |

---


## ⚙️ Section 6: Advanced Core JS & React Engine Concepts

*⏱️ 13 min read*

#### 1. Currying & Hoisting
- **Hoisting**: During the compilation phase, JavaScript moves declarations (variables and functions) to the top of their enclosing scopes.
  - *Function Declarations* are fully hoisted (both declaration and implementation), allowing them to be invoked before their physical line position.
  - *`var` variables* are hoisted and initialized to `undefined`.
  - *`let` and `const` variables* are hoisted but remain uninitialized in the **Temporal Dead Zone (TDZ)**, throwing a `ReferenceError` if accessed early.
  - *Function Expressions* (e.g., `const fn = () => {}`) behave like variables and are not fully hoisted.
  - *Example*:
    ```javascript
    console.log(greet()); // Logs: "Hello!" (Function declaration hoisted)
    function greet() { return "Hello!"; }

    console.log(hoistedVar); // Logs: undefined (var declaration hoisted, not initialized)
    var hoistedVar = "Var is here";

    // console.log(letVar); // ReferenceError: Cannot access 'letVar' before initialization (in TDZ)
    let letVar = "Let is here";

    // console.log(sum(1, 2)); // TypeError: sum is not a function (function expression hoisted as var)
    var sum = function(a, b) { return a + b; };
    ```
- **Currying**: A functional programming pattern where a function taking multiple arguments is transformed into a chain of nested functions, each taking a single argument. It leverages closures to retain arguments across evaluations.
  - *Example*:
    ```javascript
    const multiply = a => b => a * b; 
    multiply(2)(3); // 6

    // Practical application: Configuring partial arguments
    const discountCalculator = (discount) => (price) => price * (1 - discount);
    const tenPercentOff = discountCalculator(0.10);
    console.log(tenPercentOff(100)); // 90
    console.log(tenPercentOff(250)); // 225
    ```

#### 2. Prototypal Inheritance & The Chain
- Every JavaScript object has a private link referencing another object called its **Prototype** (`__proto__`). 
- **The Prototype Chain**: When accessing a property on an object, JavaScript first looks at the object's local properties. If not found, it traverses up the prototype chain (`object.__proto__`, `object.__proto__.__proto__`) recursively until the property is located or the chain terminates at `null`.
- **Property Shadowing**: If an object defines a local property with the same name as a property on its prototype, the local property "shadows" (overrides) the prototype's property.
- *Example*:
  ```javascript
  const animal = {
    eats: true,
    walk() { console.log("Animal walks"); }
  };

  const rabbit = Object.create(animal); // Links rabbit.__proto__ to animal
  rabbit.jumps = true;

  console.log(rabbit.jumps); // Logs: true (Local property)
  console.log(rabbit.eats);  // Logs: true (Inherited property from prototype)
  rabbit.walk();             // Logs: "Animal walks" (Inherited method)

  // Property Shadowing
  rabbit.walk = function() { console.log("Rabbit hops"); };
  rabbit.walk();             // Logs: "Rabbit hops" (Local walk shadows prototype's walk)
  ```

#### 3. Shallow vs. Deep Copying
- **Shallow Copy**: Copies only the first level of keys. For nested objects, it copies the memory reference pointers, meaning mutating a nested object inside the copy will modify the original object.
  - *Methods*: Spread operator (`{ ...obj }`), `Object.assign({}, obj)`.
- **Deep Copy**: Copies all property levels recursively, allocating entirely new memory slots for all nested objects. Changes made to the copy do not affect the original.
  - *Methods*: `structuredClone(obj)` (native modern standard), `JSON.parse(JSON.stringify(obj))` (basic, drops functions/undefined/dates), or custom recursive deep-cloning utilities.
- *Example*:
  ```javascript
  const original = { name: "Rajeev", details: { age: 30 } };

  // --- SHALLOW COPY ---
  const shallowCopy = { ...original };
  shallowCopy.details.age = 35; // Mutating nested object
  console.log(original.details.age); // Logs: 35 (Shared reference mutated!)

  // --- DEEP COPY ---
  const originalObj = { name: "Rajeev", details: { age: 30 } };
  const deepCopy = structuredClone(originalObj);
  deepCopy.details.age = 40; // Mutating nested object in deep copy
  console.log(originalObj.details.age); // Logs: 30 (Completely isolated)
  ```

#### 4. Spread vs. Rest Operators (`...`)
Although they use the same syntax (`...`), they perform opposite operations depending on where they are used:
- **Spread Operator (Unpacks/Expands)**: Expands elements of an array or properties of an object. Used in expression contexts (like array/object literals or function calls) to unpack values.
  - *Array/Object Cloning & Merging*:
    ```javascript
    const original = [1, 2];
    const cloneAndAdd = [...original, 3, 4]; // [1, 2, 3, 4]
    
    const user = { name: "Rajeev", role: "Dev" };
    const updatedUser = { ...user, active: true }; // { name: "Rajeev", role: "Dev", active: true }
    ```
  - *Function Arguments (Unpacking)*:
    ```javascript
    const coordinates = [10, 20];
    function drawPoint(x, y) { console.log(x, y); }
    drawPoint(...coordinates); // equivalent to drawPoint(10, 20)
    ```
- **Rest Parameter / Rest Pattern (Gathers/Packs)**: Aggregates separate values/arguments into a single structured container (array or object). Used in parameter lists or destructuring.
  - *Function Parameters*:
    ```javascript
    function sum(...nums) { // Gathers all arguments into a 'nums' array
      return nums.reduce((a, b) => a + b, 0);
    }
    sum(1, 2, 3, 4); // Returns 10 (nums is [1, 2, 3, 4])
    ```
  - *Destructuring*:
    ```javascript
    const [first, second, ...remaining] = [10, 20, 30, 40, 50];
    console.log(remaining); // [30, 40, 50]
    
    const { name, ...otherInfo } = { name: "Rajeev", age: 30, country: "India" };
    console.log(otherInfo); // { age: 30, country: "India" }
    ```

##### Key Mnemonic
- **Rest** = *Gathers* separate elements into one container (used on the left side of assignments / parameters).
- **Spread** = *Spreads* one container out into separate elements (used on the right side of assignments / inside arguments/literals).

#### 5. Generators & Iterators
- **Iterators**: An object implementing the Iterator protocol with a `next()` method returning `{ value, done: boolean }`. Objects can declare custom iteration via `[Symbol.iterator]`.
  - *Example*:
    ```javascript
    // Custom Iterator representing a count sequence
    const countIterator = {
      data: [10, 20, 30],
      [Symbol.iterator]() {
        let index = 0;
        return {
          next: () => {
            if (index < this.data.length) {
              return { value: this.data[index++], done: false };
            } else {
              return { value: undefined, done: true };
            }
          }
        };
      }
    };

    for (const item of countIterator) {
      console.log(item); // Logs: 10, 20, 30
    }
    ```
- **Generators**: Declared using **`function*`**, generators are functions that can pause and resume execution. They use the **`yield`** keyword to return states, maintaining their execution context (variable scopes) across calls.
  - *Example*:
    ```javascript
    function* numberGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }
    const gen = numberGenerator();

    console.log(gen.next()); // { value: 1, done: false }
    console.log(gen.next()); // { value: 2, done: false }
    console.log(gen.next()); // { value: 3, done: false }
    console.log(gen.next()); // { value: undefined, done: true }
    ```

#### 6. Callbacks & Callback Hell
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

#### 7. Promises, Async/Await & Try/Catch
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

#### 7b. Redux Async Workflow: Synchronous Actions & Middlewares (Thunks/Sagas)
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

#### 8. React Reconciliation & Diffing (React Fiber)
- **Virtual DOM**: React maintains a lightweight in-memory representation of the true UI layout tree.
- **Reconciliation (React Fiber)**: The algorithm React uses to update the UI. It splits rendering into a non-blocking compilation phase (creating the Fiber work tree) and a commit phase (writing changes to the screen).
- **The Diffing Algorithm**: React compares virtual DOM nodes using an $O(N)$ heuristic diffing approach:
  1. If two elements are of different types, React tears down the old tree and builds a new one.
  2. If elements are of the same type, React compares attributes and updates only changed properties.
  3. **Keys in Lists**: Keys act as unique identifiers for list items. When a list changes, React uses keys to match nodes between the old and new trees. Failing to provide unique keys (or using array indexes as keys) causes React to destroy and recreate components needlessly or misalign local states during deletions/insertions.

#### 9. Lazy Loading & Code Splitting
- **Code Splitting**: Splitting the JavaScript bundle into smaller chunks that can be downloaded dynamically.
- **Lazy Loading**: Delaying load times of features until they are accessed. In React, this is achieved using **`React.lazy()`** (for dynamic component imports) wrapped in a **`<Suspense>`** boundary to display a loading fallback UI. This decreases app launch bundle size and improves startup time.
- *Example*:
  ```javascript
  import React, { Suspense } from 'react';

  // Lazy load the Profile component dynamically (separate chunk is only loaded when needed)
  const LazyProfile = React.lazy(() => import('./components/Profile'));

  function App() {
    return (
      <div>
        <h1>My App</h1>
        <Suspense fallback={<div>Loading component...</div>}>
          <LazyProfile />
        </Suspense>
      </div>
    );
  }
  ```

#### 10. Debounce vs. Throttle (Execution Control Wrappers)
In client-side applications (especially mobile apps), user interactions can trigger highly frequent events (e.g., typing in a search bar, scrolling a list, or swiping). If these events execute network requests or heavy layout computations directly, they can saturate threads and degrade performance.

- **Debouncing**: Delays function execution until a specified quiet period has elapsed since the last time the event was triggered. Every time a new trigger occurs, the pending timer is cancelled and restarted.
  - *Trigger Rule*: Executes the function **only once** after the user has completely stopped interacting.
  - *Example*:
    ```javascript
    function debounce(func, delay = 500) {
      let timeoutId = null;
      return function (...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    }
    ```
- **Throttling**: Limits function execution to a maximum of once every specified time interval. Even if events fire hundreds of times per second, the function is executed at a controlled, regular pace.
  - *Trigger Rule*: Guarantees periodic execution at a defined frequency (e.g., maximum once every 200ms).
  - *Example*:
    ```javascript
    function throttle(func, limit = 200) {
      let inThrottle = false;
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    }
    ```

#### 11. Event Emitters & The Publish-Subscribe Pattern
- **Publish-Subscribe (PubSub)**: A design pattern where senders (publishers) do not programmatically target messages to specific receivers (subscribers). Instead, events are categorized into channels or namespaces.
- **Event Emitter**: The central broker maintaining a map of active channels to callback subscriber lists.
  - When a subscriber registers (`on("event", callback)`), the broker adds their listener function reference to the event array.
  - When an event publishes (`emit("event", payload)`), the broker iterates over the subscriber array, invoking callbacks.
  - **Memory Safety**: Subscribers must unsubscribe or clear references (e.g., in a React component's unmount cleanup); otherwise, the event emitter retains a strong reference to the callbacks and the enclosing component state, leading to a memory leak.
  - *Example*:
    ```javascript
    class EventEmitter {
      constructor() { this.events = {}; }
      on(event, listener) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(listener);
        return () => this.off(event, listener); // Unsubscribe helper
      }
      off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listenerToRemove);
      }
      emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(data));
      }
    }
    ```

#### 12. Function Memoization Caching
- **Memoization**: An optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
- **Implementation**: The wrapper wraps the target function inside a closure containing a private `cache` map object. It stringifies the input arguments to construct a key hash. If the key exists inside the cache mapping, it returns the value immediately, bypassing function execution.
  - *Example*:
    ```javascript
    function memoize(fn) {
      const cache = {};
      return function (...args) {
        const key = JSON.stringify(args);
        if (key in cache) {
          return cache[key];
        }
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
      };
    }
    ```

#### 13. JavaScript Polyfills & Prototype Delegation
- **Polyfill**: A piece of code used to provide modern functionality on older browsers or JavaScript engines that do not natively support it (e.g., using old syntax to recreate `Array.prototype.map`).
- **Prototype Delegation**: JavaScript resolves methods on arrays or objects by traversing their prototype chain (`Array.prototype`). To build a polyfill, we define custom methods directly on the base prototype array interface if the native compiler checks resolve to `undefined`.
  - *Example*:
    ```javascript
    if (!Array.prototype.myMap) {
      Array.prototype.myMap = function (callback) {
        const result = [];
        for (let i = 0; i < this.length; i++) {
          if (i in this) { // Handle sparse arrays safely
            result.push(callback(this[i], i, this));
          }
        }
        return result;
      };
    }
    ```

#### 14. Advanced JS Engine & Concurrency Q&A

##### Q1: Explain the V8/Hermes memory layout (Stack vs. Heap) and how JavaScript variables are allocated and referenced.
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

##### Q2: What is Event Loop starvation? Contrast the execution prioritization of `process.nextTick()`, `Promise.then()`, `setImmediate()`, and `setTimeout()`.
- **Answer**:
  - **Event Loop Starvation**: Occurs when high-priority queues (like the Microtask Queue) are continuously populated, completely preventing the event loop from executing low-priority macrotasks (like rendering inputs, scroll listeners, or timers).
  - **Prioritization & Loop Phases**:
    1. **Synchronous Execution**: Call Stack executes immediate functions.
    2. **`process.nextTick()` (Node.js specific)**: Fires immediately after the current synchronous operation finishes, *before* microtasks are evaluated. If a script calls `process.nextTick` recursively, it blocks the event loop entirely.
    3. **Microtask Queue (Promises, queueMicrotask)**: Executed after the call stack clears and before the loop moves to the next phase. The event loop will not proceed until the microtask queue is *completely* empty. If microtasks continuously queue new microtasks, macrotasks starve.
    4. **Macrotask Queue (setTimeout/setInterval, I/O)**: Triggered in subsequent loop cycles once the microtask queue is empty.
    5. **`setImmediate()`**: Executes immediately in the check phase of the loop, running after I/O callbacks but before standard timers in many Node.js lifecycle situations.

---

##### Q3: What are JavaScript Proxies and the Reflect API? How can they be used to build a reactive state tracking system?
- **Answer**:
  - **Proxy**: An ES6 object wrapping a target object, allowing you to intercept and customize fundamental operations (like property access `get`, assignment `set`, deletion `deleteProperty`).
  - **Reflect**: A global object providing static helper methods corresponding to Proxy traps (e.g., `Reflect.get(target, prop)`). It returns boolean success markers and makes default object operations predictable.
  - **Building Reactivity (Concept & Example)**:
    - State systems (like Vue 3 reactivity or custom state libraries) wrap plain objects in a Proxy.
    - **`get` Trap**: Tracks active component dependencies (Dependency Tracking). When a component renders and reads `proxy.price`, the system registers the component as a subscriber to that property.
    - **`set` Trap**: Triggers reactivity triggers. When a mutation occurs (`proxy.price = 100`), the proxy intercepts, calls `Reflect.set()`, and automatically loops through all subscribed components to force UI re-renders.
    - *Example*:
      ```javascript
      const item = { price: 100 };
      const reactiveItem = new Proxy(item, {
        get(target, prop, receiver) {
          console.log(`Getting value for prop: "${prop}" (Dependency Tracking)`);
          return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
          console.log(`Setting value for "${prop}" to ${value}. Triggering render update!`);
          return Reflect.set(target, prop, value, receiver);
        }
      });

      reactiveItem.price;      // Logs: Getting value for prop: "price"
      reactiveItem.price = 120; // Logs: Setting value for "price" to 120. Triggering render update!
      ```

---

##### Q4: How do WeakMap and WeakSet differ from Map and Set? What are their use cases in memory leak prevention?
- **Answer**:
  - **Weak references**: In standard `Map` and `Set`, objects added as keys or values are held with strong references. The garbage collector (GC) cannot sweep them, even if all other variables reference pointers are destroyed.
  - **WeakMap & WeakSet**: Holds references to objects *weakly*.
    - Keys inside a `WeakMap` must be objects (not primitives).
    - If there are no other strong references to a key object in the application memory, the GC can sweep it, and its entry inside the `WeakMap` is cleared automatically.
  - **Use Cases**:
    - **Caching/Memoization**: Mapping temporary metadata (like user fetch status maps) to object references. Once the user object is dereferenced during unmounts, the cache is freed from memory automatically.
    - **Encapsulation**: Storing private object variables.
  - *Example*:
    ```javascript
    let userObject = { id: 101, name: "Rajeev" };
    const cacheMap = new WeakMap();

    // Cache metadata about userObject
    cacheMap.set(userObject, { loginTime: Date.now() });

    console.log(cacheMap.has(userObject)); // true

    // Break the strong reference to userObject
    userObject = null; 

    // Once garbage collection occurs, cacheMap will automatically clear the entry
    // for this user object, preventing a memory leak.
    ```

---

##### Q5: Explain prototypal inheritance mechanics under the hood and how they relate to ES6 Class compilation.
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

---

---

