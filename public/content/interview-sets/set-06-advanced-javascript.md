# Volume 2 – Set 6 – Advanced JavaScript

## Question 1 — Implementing a Custom Memoize Function

### Difficulty
Medium

### Concepts Being Tested
- Closures
- High-Order Functions
- Caching/Performance

---

### 1. Interview Question
"In React, we use `useMemo`, but in pure JavaScript, we often need to memoize expensive pure functions. Can you write a generic `memoize` function from scratch that takes any function as an argument and caches its results based on the inputs?"

---

### 2. What the Interviewer is Evaluating
The interviewer wants to see if you understand how closures work to retain state across function calls, and how you handle arguments in higher-order functions using the rest/spread syntax.

---

### 3. Ideal Answer
A `memoize` function is a higher-order function that returns a new function. It uses a closure to hold a `cache` object. When the returned function is called, it creates a unique string key from the arguments. If that key exists in the cache, it returns the cached result. If not, it executes the original function, stores the result in the cache, and then returns it.

---

### 4. Code Example
```javascript
function memoize(fn) {
  // The cache is preserved in the closure
  const cache = {};

  return function (...args) {
    // Stringify args to create a unique cache key
    const key = JSON.stringify(args);

    if (cache[key] !== undefined) {
      console.log('Fetching from cache...');
      return cache[key];
    }

    console.log('Calculating result...');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Usage
const expensiveAddition = (a, b) => a + b;
const memoizedAdd = memoize(expensiveAddition);

memoizedAdd(2, 3); // Output: Calculating result... 5
memoizedAdd(2, 3); // Output: Fetching from cache... 5
```

---

### 5. Production Scenario
- **Root Cause:** A heavy mathematical calculation for determining route distances was being called inside a `.map()` function for 100 delivery locations, causing UI stutter.
- **Investigation:** Because there were many overlapping locations, the same distances were being calculated repeatedly.
- **Solution:** We wrapped the distance calculator in a custom `memoize` utility. The execution time dropped from 800ms to 15ms.
- **Lessons Learned:** Pure functions with repetitive inputs are perfect candidates for memoization.

---

### 6. Alternative Solutions & Trade-offs
- **Custom Memoize (Current)**
  - *Advantages:* Lightweight, no dependencies.
  - *Disadvantages:* `JSON.stringify` on massive objects is slow and fails on circular references.
- **Lodash `_.memoize`**
  - *Advantages:* Handles complex keys better, battle-tested.
  - *Disadvantages:* By default, Lodash only uses the *first* argument as the cache key, which often catches junior developers off guard.

---

### 7. Common Mistakes
- **Not using the rest operator (`...args`):** Hardcoding `function(arg1, arg2)` prevents the memoize function from being generic.
- **Using object reference as key:** Doing `cache[args] = result`. Arrays and objects convert to the string `"[object Object]"`, meaning different objects will overwrite each other in the cache.

---

### 8. Follow-up Questions
1. What are the limitations of `JSON.stringify` as a cache key?
2. How would you handle functions that accept DOM elements or circular objects as arguments?
3. How does this differ from React's `useMemo`?

---

### 9. How a Senior/Lead Engineer Answers
A senior engineer will immediately point out the flaw in using `JSON.stringify`. They will mention that serializing objects takes O(N) time, which might be slower than the function you are trying to memoize! For complex objects, they would suggest using a `Map` or a `WeakMap` to store object references directly as keys, which operates in O(1) time and prevents memory leaks.

---

### 10. Interview Tips
If asked to code this, write it out quickly, but then immediately critique your own `JSON.stringify` usage before the interviewer does.

***

## Question 2 — Event Loop and the Event Emitter Pattern

### Difficulty
Medium

### Concepts Being Tested
- Publish-Subscribe (PubSub) Pattern
- Classes
- Asynchronous vs Synchronous Execution

---

### 1. Interview Question
"In React Native, we often use `DeviceEventEmitter`. Can you build a simple `EventEmitter` class from scratch with `on`, `emit`, and `off` methods? Are the event callbacks executed synchronously or asynchronously?"

---

### 2. What the Interviewer is Evaluating
The interviewer is testing your understanding of design patterns (Observer/PubSub) and class syntax, which is fundamental to how bridging and Native Modules work in React Native.

---

### 3. Ideal Answer
An `EventEmitter` relies on a central dictionary (object or Map) where the keys are event names, and the values are arrays of callback functions.

- `on`: Pushes a callback into the array for that event.
- `emit`: Loops through the array and executes all callbacks.
- `off`: Filters the callback out of the array.

By default, in pure JavaScript, emitting an event executes the callbacks **synchronously**. It simply loops over an array and calls functions. It does not go to the Microtask or Macrotask queue unless you explicitly wrap the execution in a `setTimeout` or `Promise.resolve()`.

---

### 4. Code Example
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      // Executes synchronously!
      this.events[eventName].forEach(cb => cb(...args));
    }
  }

  off(eventName, callbackToRemove) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        cb => cb !== callbackToRemove
      );
    }
  }
}
```

---

### 5. Production Scenario
- **Root Cause:** A developer used a custom PubSub system to trigger a "Logout" event across 15 different unmounted background services.
- **Investigation:** Because the `emit` was synchronous, logging out caused the JS thread to completely freeze for 2 seconds while 15 heavy tear-down functions ran back-to-back on the call stack.
- **Solution:** Modified the `emit` function to queue the callbacks using `Promise.resolve().then(() => cb())`, allowing the UI to render the Login screen while the services cleaned up in the background (microtasks).
- **Lessons Learned:** Synchronous event emitters can easily block the main thread at scale.

---

### 6. Alternative Solutions & Trade-offs
- **Synchronous EventEmitter (Current)**
  - *Advantages:* Predictable order of execution.
  - *Disadvantages:* Call stack blocking.
- **RxJS / Observables**
  - *Advantages:* Extremely powerful stream manipulation (debounce, map, filter).
  - *Disadvantages:* Massive learning curve and bundle size.

---

### 7. Common Mistakes
- **Forgetting to initialize the array:** Attempting to `push` to `this.events[eventName]` when it is `undefined`.
- **Arrow Function `this` binding:** If a subscriber passes a standard `function()` instead of an arrow function, the context of `this` will be lost when the emitter calls it.

---

### 8. Follow-up Questions
1. How do you implement a `once` method (listens only for the first emit and then removes itself)?
2. If two callbacks are registered, and the first one throws an error, what happens to the second one?
3. How is Node.js's `EventEmitter` different?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will explain the danger of **Memory Leaks** in Event Emitters. If a React component calls `.on()` inside `useEffect` but forgets to call `.off()` in the cleanup function, the `EventEmitter` will hold a reference to that component's callback forever. This prevents the garbage collector from destroying the unmounted component, leading to severe memory leaks in SPAs and Mobile apps. 

---

### 10. Interview Tips
Code this cleanly. It is one of the most common whiteboard questions in the world.

***

## Question 3 — Generators and Data Streams

### Difficulty
Hard

### Concepts Being Tested
- Generator Functions (`function*`)
- `yield` keyword
- Lazy Evaluation

---

### 1. Interview Question
"You need to fetch and process 10,000 pages of paginated data from an API. If you use a standard `while` loop with `async/await`, you might run out of memory storing all the results before processing them. How can you use JavaScript Generators to process this data stream efficiently?"

---

### 2. What the Interviewer is Evaluating
The interviewer wants to see if you know about JavaScript's more advanced features (Generators) and the concept of "Lazy Evaluation" for massive datasets.

---

### 3. Ideal Answer
I would use an **Async Generator Function** (`async function*`). Generators allow you to pause execution using the `yield` keyword. 

Instead of fetching all 10,000 pages and returning a giant array, the generator fetches *one* page, yields it to the consumer, and pauses. The consumer processes that page (e.g., saves it to a local SQLite DB), then asks the generator for the next page. This keeps memory usage completely flat (O(1)), regardless of how many pages exist.

---

### 4. Code Example
```typescript
// 1. The Async Generator
async function* fetchPaginatedData(endpoint: string) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${endpoint}?page=${page}`);
    const data = await response.json();
    
    // Pause execution and hand data back to the caller
    yield data.items; 
    
    hasMore = data.hasMorePages;
    page++;
  }
}

// 2. The Consumer (Lazy Evaluation)
const processAllData = async () => {
  const dataStream = fetchPaginatedData('/api/users');

  // The loop automatically pulls the next yielded value
  for await (const chunk of dataStream) {
    // Process one chunk at a time. Memory stays flat!
    await saveToSQLite(chunk);
  }
  console.log('Finished processing all 10,000 pages without memory leaks!');
};
```

---

### 5. Production Scenario
- **Root Cause:** An offline-first React Native app needed to sync a catalog of 50,000 products on initial launch. 
- **Investigation:** A `Promise.all` approach fetched 500 pages concurrently, immediately crashing the app due to JS Heap OOM (Out of Memory). A sequential `while` loop approach stored all 50,000 items in a massive JS array before passing it to WatermelonDB, which also caused a crash.
- **Solution:** Implemented Async Generators. The app fetched 100 items, wrote them to the DB, cleared them from JS memory, and then fetched the next 100.
- **Lessons Learned:** Never hold unbounded arrays in JavaScript memory. 

---

### 6. Alternative Solutions & Trade-offs
- **Recursive Functions**
  - *Advantages:* Easy to understand for developers unfamiliar with generators.
  - *Disadvantages:* Call stack can get too deep, prone to maximum call stack exceeded errors.
- **Async Generators (Current)**
  - *Advantages:* Perfect memory management, clean `for await...of` syntax.
  - *Disadvantages:* Syntax can confuse junior developers.

---

### 7. Common Mistakes
- **Forgetting the asterisk:** Writing `async function` instead of `async function*`.
- **Yielding Promises:** You should `await` the fetch *inside* the generator, then `yield` the resolved data.

---

### 8. Follow-up Questions
1. What is the difference between `yield` and `return` in a generator?
2. What does `yield*` do?
3. Can you pass arguments into `.next()`?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will connect Generators to Redux Saga. They will explain that Redux Saga is built entirely on Generator functions. Sagas use `yield` to hand "Effects" (descriptions of async tasks) to the Redux middleware, allowing the middleware to handle the actual API calls and testing to be done simply by iterating the generator and checking the yielded objects without mocking the network.

---

### 10. Interview Tips
If asked about Redux Saga, knowing that it relies on Generators is a massive plus.

***

## Question 4 — Memory Management with `WeakMap` / `WeakSet`

### Difficulty
Hard

### Concepts Being Tested
- Garbage Collection
- Memory Leaks
- Object References

---

### 1. Interview Question
"You are building a custom analytics tracking system in pure JavaScript. Every time a user taps a DOM element or React Native View, you want to store metadata about that element in a dictionary. However, when the element is removed from the screen, it isn't being garbage collected because your dictionary still holds a reference to it. How do you solve this using ES6 data structures?"

---

### 2. What the Interviewer is Evaluating
Testing your understanding of JavaScript's Garbage Collector (GC) and strong vs. weak object references.

---

### 3. Ideal Answer
A standard Javascript `Map` or `Object` holds **strong references** to its keys. If you use a DOM element or an object as a key, the Garbage Collector will refuse to clean it up, even if it is completely removed from the UI, causing a memory leak.

To solve this, I would use a **`WeakMap`**. 
A `WeakMap` only accepts objects as keys and holds a **weak reference** to them. If there are no other strong references to the element in the application (i.e., it was removed from the screen), the GC will automatically delete the element *and* its associated metadata entry from the `WeakMap`.

---

### 4. Code Example
```javascript
// The Analytics Tracker
const elementMetadata = new WeakMap();

function trackElement(element, data) {
  // Using the object/element itself as the key
  elementMetadata.set(element, data);
}

// Scenario
let myButton = document.getElementById('checkout-btn');
trackElement(myButton, { clickCount: 0 });

// User navigates away, button is removed from UI
myButton.parentNode.removeChild(myButton);

// We drop our reference
myButton = null;

// MAGIC: The Garbage Collector kicks in. 
// Because 'elementMetadata' is a WeakMap, it does NOT prevent 'myButton' from being destroyed.
// The entry inside the WeakMap is automatically cleared!
```

---

### 5. Production Scenario
- **Root Cause:** A developer built a custom caching layer for React components. They used a global `{}` object to store API responses, using the component instances as the object keys.
- **Investigation:** After 10 minutes of navigating around the app, memory usage spiked to 1GB. Profiling showed that hundreds of unmounted components were still in memory.
- **Solution:** Switched the global cache from `{}` to a `WeakMap`. When the components unmounted, the cache entries safely evaporated.
- **Lessons Learned:** Never use components or DOM nodes as keys in standard objects/Maps.

---

### 6. Alternative Solutions & Trade-offs
- **Manual Cleanup (e.g., `componentWillUnmount`)**
  - *Advantages:* Works with standard Maps.
  - *Disadvantages:* Highly error-prone. If a developer forgets to call `delete map[key]`, you have a permanent leak.
- **`WeakMap` (Current)**
  - *Advantages:* Automated, fail-safe memory management.
  - *Disadvantages:* You cannot iterate over a WeakMap (no `.keys()` or `.values()`) because the GC could delete an item mid-iteration.

---

### 7. Common Mistakes
- **Trying to use strings or numbers as keys in a WeakMap:** A WeakMap *only* accepts objects as keys. Primitives cannot be garbage collected in the same way.
- **Trying to iterate a WeakMap:** You can't. If you need a list of all tracked elements, a WeakMap is the wrong tool.

---

### 8. Follow-up Questions
1. What is the difference between `Set` and `WeakSet`?
2. How does JavaScript's "Mark and Sweep" garbage collection algorithm work?
3. If WeakMaps are so safe, why not use them for everything?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will discuss how React Native handles weak references internally. They might mention that bridging JS objects to Native C++ often requires careful management of weak vs strong references to prevent cyclic dependencies across the bridge (where a JS object holds a C++ pointer, and the C++ object holds a JS callback, meaning neither can ever be garbage collected).

---

### 10. Interview Tips
Emphasize the phrase "prevents the Garbage Collector from doing its job." This shows you understand the root cause of the leak.

***

## Question 5 — Promises Under the Hood (Expert Level)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- Promises internal mechanics
- Thenables
- Microtasks

---

### 1. Interview Question
"Can you explain the internal mechanics of how a Promise works in JavaScript? Specifically, if you were to write a custom `MyPromise` class, how would you handle the `.then()` chaining and ensure it executes asynchronously?"

---

### 2. What the Interviewer is Evaluating
This separates senior devs from experts. Everyone uses Promises, but very few understand how they are constructed using state machines and deferred execution queues.

---

### 3. Ideal Answer
A Promise is essentially a **State Machine** with three states: `pending`, `fulfilled`, or `rejected`.

Internally, it holds an array of `onFulfilled` callbacks (registered by `.then()`).
When `resolve(value)` is called inside the Promise constructor:
1. The state changes to `fulfilled`.
2. It saves the `value`.
3. It iterates through the `onFulfilled` callbacks and executes them.

Crucially, to ensure `.then()` callbacks always run *asynchronously* (even if the promise resolves immediately), a custom implementation must wrap the callback execution in a microtask. In environments without `queueMicrotask`, we simulate this using `setTimeout(..., 0)`.

To support chaining (`.then().then()`), every `.then()` method must **return a new instance of `MyPromise`**, which resolves with the value returned by the previous callback.

---

### 4. Code Example
```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.handlers = []; // Callbacks from .then()

    const resolve = (val) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = val;
        // Execute handlers asynchronously
        this.handlers.forEach(h => queueMicrotask(() => h.onSuccess(this.value)));
      }
    };

    executor(resolve, /* reject */);
  }

  then(onSuccess) {
    return new MyPromise((resolve) => {
      if (this.state === 'pending') {
        this.handlers.push({
          onSuccess: (val) => {
            // Resolve the NEW promise with the return value of the callback
            const result = onSuccess(val);
            resolve(result); 
          }
        });
      } else if (this.state === 'fulfilled') {
        queueMicrotask(() => {
          const result = onSuccess(this.value);
          resolve(result);
        });
      }
    });
  }
}
```

---

### 5. Production Scenario
- **Root Cause:** A company used a legacy 3rd-party networking library that returned "Thenables" (objects with a `.then` method) instead of real native Promises.
- **Investigation:** Developers were confused why `async/await` was working with them, but `Promise.all` occasionally failed or fired in the wrong order.
- **Solution:** We learned that JS engine treats *any* object with a `.then` method as a Promise (duck-typing). We wrapped the legacy calls in `Promise.resolve(legacyThenable)` to convert them safely into native Microtasks.
- **Lessons Learned:** Understand the Promise/A+ specification; JS relies on duck-typing for concurrency.

---

### 6. Alternative Solutions & Trade-offs
- N/A - This is a conceptual architecture question about JS internals.

---

### 7. Common Mistakes
- **Executing `.then` callbacks synchronously:** If a promise is already fulfilled, executing `.then` synchronously breaks the Zalgo rule (an API must be 100% synchronous or 100% asynchronous, never both).
- **Not returning a new Promise in `.then()`:** This breaks chaining entirely.

---

### 8. Follow-up Questions
1. What is the Zalgo rule?
2. How does `Promise.all` work internally?
3. What is a Polyfill, and how did libraries like `Bluebird` pioneer Promises?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will immediately reference the **Promise/A+ Specification**. They will explain that `async/await` is merely syntactic sugar over this exact state-machine architecture, and that under the hood, the JS compiler translates `await` into a `.then()` attachment to the underlying Promise, pausing the execution context of the generator-like function.

---

### 10. Interview Tips
Mentioning `queueMicrotask` shows extreme depth of JavaScript environment knowledge.
