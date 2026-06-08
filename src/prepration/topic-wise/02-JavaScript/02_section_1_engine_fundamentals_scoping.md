
## Page Summary
### Reading Time
`4 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | ☕ Section 1: Engine Fundamentals & Scoping |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

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
