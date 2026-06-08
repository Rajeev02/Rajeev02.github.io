# JavaScript Coding

## Table of Contents

- [Section 1: Program 1: Legacy React Class Component with Full Lifecycle Methods](#section-1-program-1-legacy-react-class-component-with-full-lifecycle-methods)
- [Section 2: Program 2: Functional Component Refactor Using Hooks](#section-2-program-2-functional-component-refactor-using-hooks)
- [Section 3: Program 3: Object Reference Copying & Mutability Evaluation](#section-3-program-3-object-reference-copying-mutability-evaluation)
- [Section 4: Program 4: Nested Array Flattening](#section-4-program-4-nested-array-flattening)
- [Section 5: Program 5: Substring Extraction](#section-5-program-5-substring-extraction)
- [Section 6: Program 6: Asynchronous Execution Order (Event Loop Timing)](#section-6-program-6-asynchronous-execution-order-event-loop-timing)
- [Section 7: Program 7: Loop Scoping & Variable Closures inside SetTimeout](#section-7-program-7-loop-scoping-variable-closures-inside-settimeout)
- [Section 8: Program 8: Deep Memoization Wrapper with Cache Expiration](#section-8-program-8-deep-memoization-wrapper-with-cache-expiration)
- [Section 9: Program 9: Custom Event Broker (Publish-Subscribe Pattern) with Wildcards](#section-9-program-9-custom-event-broker-publish-subscribe-pattern-with-wildcards)
- [Section 10: Program 10: Custom Debounce Implementation](#section-10-program-10-custom-debounce-implementation)
- [Section 11: Program 11: Custom Throttle Implementation](#section-11-program-11-custom-throttle-implementation)
- [Section 12: Program 12: Polyfills for Map, Filter, and Reduce](#section-12-program-12-polyfills-for-map-filter-and-reduce)
- [Section 13: Program 13: Data Transformations (Array-to-Object & Object-to-Array)](#section-13-program-13-data-transformations-array-to-object-object-to-array)
- [Section 14: Program 14: Mobile Device Token Deduplicator (CleanTokens)](#section-14-program-14-mobile-device-token-deduplicator-cleantokens)
- [Section 15: Program 15: Object Property Diff Tracker](#section-15-program-15-object-property-diff-tracker)
- [Section 16: Program 16: Paginated Transaction Amount Aggregator](#section-16-program-16-paginated-transaction-amount-aggregator)
- [Section 17: Program 17: Batch Concurrent Promise Coordinator (Network Throttler)](#section-17-program-17-batch-concurrent-promise-coordinator-network-throttler)


---

### ⚛️ JavaScript & React Coding Programs

> 🎯 **Topic:** ⚛️ JavaScript & React Coding Programs
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---



<!-- INDEX_START -->

<!-- INDEX_END -->

---

---

> 🎯 **Topic:** Program 1: Legacy React Class Component with Full Lifecycle Methods
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 1: Program 1: Legacy React Class Component with Full Lifecycle Methods
*⏱️ 2 min read*

### Question
Create a production-grade legacy React **Class Component** that models a **Live Portfolio Monitor**. The component must implement Mounting, Updating, and Unmounting phases, establish an active background interval timer to update rates, optimize rendering checks using `shouldComponentUpdate` to prevent redundant draw iterations, and clean up all resources (timers, listeners) to prevent memory leaks.

### Sample Input & Output
#### Input:
```javascript
// Props passed from parent:
isActive={true}
symbol="BTC"
```
#### Output:
- **Mounting**: Renders the initialization view, starts a native 1-second interval timer.
- **Updating**: Triggers shouldComponentUpdate to verify if `symbol` or `rates` actually changed. Prints console warnings if updates are blocked.
- **Unmounting**: Clears the active rate-fetch interval to release references.

### Code
```javascript
import React from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

export class LegacyPortfolioMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      lastUpdated: null,
    };
    this.timerId = null; // Stored as instance property to prevent state re-renders
  }

  // 1. Mounting Phase: Component is inserted into the rendering layout tree
  componentDidMount() {
    console.log("Class Component: Mounted");
    if (this.props.isActive) {
      this.startPolling();
    }
  }

  // 2. Updating Phase: Invoked whenever props or state change
  componentDidUpdate(prevProps, prevState) {
    // Check if the polling activation state has toggled
    if (prevProps.isActive !== this.props.isActive) {
      if (this.props.isActive) {
        this.startPolling();
      } else {
        this.stopPolling();
      }
    }

    // Check if the target ticker symbol changed
    if (prevProps.symbol !== this.props.symbol) {
      console.log(`Class Component: Symbol updated from ${prevProps.symbol} to ${this.props.symbol}`);
      this.fetchPrice();
    }
  }

  // 3. Optimization Phase: Intercept update requests to check if redraw is necessary
  shouldComponentUpdate(nextProps, nextState) {
    // Only re-render if the price, active state, or ticker symbol has changed
    const hasPriceChanged = nextState.price !== this.state.price;
    const hasSymbolChanged = nextProps.symbol !== this.props.symbol;
    const hasStatusChanged = nextProps.isActive !== this.props.isActive;

    const shouldRedraw = hasPriceChanged || hasSymbolChanged || hasStatusChanged;
    console.log(`Class Component: shouldComponentUpdate evaluated to: ${shouldRedraw}`);
    return shouldRedraw;
  }

  // 4. Unmounting Phase: Component is removed from view and destroyed
  componentWillUnmount() {
    console.log("Class Component: Will Unmount, cleaning up resources");
    this.stopPolling();
  }

  startPolling() {
    this.stopPolling(); // Ensure no duplicate intervals run
    this.fetchPrice();
    this.timerId = setInterval(() => {
      this.fetchPrice();
    }, 1000);
    console.log("Class Component: Polling interval started");
  }

  stopPolling() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
      console.log("Class Component: Polling interval cleared");
    }
  }

  fetchPrice() {
    // Simulate API price resolution
    const mockPrice = (Math.random() * 10000 + 40000).toFixed(2);
    this.setState({
      price: mockPrice,
      lastUpdated: new Date().toLocaleTimeString(),
    });
  }

  render() {
    return (
      <View style={styles.card}>
        <Text style={styles.header}>Asset: {this.props.symbol}</Text>
        <Text style={styles.price}>Price: ${this.state.price}</Text>
        <Text style={styles.footer}>Last updated: {this.state.lastUpdated}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  price: {
    fontSize: 24,
    color: '#38a169',
    marginVertical: 10,
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    color: '#718096',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ for state updates and timer creation.
- **Space Complexity**: $O(1)$ constant state references.
- **Explanation**: A legacy React Class Component. Mounts and triggers polling intervals in `componentDidMount`. Reevaluates state/props differences inside `shouldComponentUpdate` to return a boolean, optimizing render calls. Clears interval timers inside `componentWillUnmount` to release callback references.

---

---

> 🎯 **Topic:** Program 2: Functional Component Refactor Using Hooks
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 2: Program 2: Functional Component Refactor Using Hooks
*⏱️ 2 min read*

### Question
Refactor the legacy `LegacyPortfolioMonitor` class component into a modern, functional React component `ModernPortfolioMonitor` using **Hooks** (`useState`, `useEffect`, `useRef`). The refactored component must maintain the exact same polling behaviors, clean up timers during dependencies mutations, and optimize rendering commits using `React.memo`.

### Sample Input & Output
#### Input:
```javascript
// Props passed from parent:
isActive={true}
symbol="BTC"
```
#### Output:
- **Mounting**: Runs `useEffect` hook, initializes the `useRef` timer container, and triggers polling.
- **Updating**: Dependency array tracks modifications. Automatically halts previous intervals and re-allocates active updates if `symbol` or `isActive` changes.
- **Unmounting**: The return closure of the active `useEffect` triggers automatically, clearing the timer references from memory.

### Code
```tsx
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MonitorProps {
  symbol: string;
  isActive: boolean;
}

// 1. Wrap functional component in React.memo to replicate 'shouldComponentUpdate' optimizations
export const ModernPortfolioMonitor = React.memo(
  ({ symbol, isActive }: MonitorProps) => {
    const [price, setPrice] = useState<string>('0');
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);

    // 2. Use useRef to hold the mutable timer identifier
    // useRef persists values across renders without triggering a component re-render when mutated.
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const fetchPrice = () => {
        const mockPrice = (Math.random() * 10000 + 40000).toFixed(2);
        setPrice(mockPrice);
        setLastUpdated(new Date().toLocaleTimeString());
      };

      const stopPolling = () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          console.log("Hooks: Polling cleared");
        }
      };

      const startPolling = () => {
        stopPolling(); // Defensive check to clear existing loops
        fetchPrice();
        timerRef.current = setInterval(fetchPrice, 1000);
        console.log("Hooks: Polling started");
      };

      // 3. Replicate mounting and updating lifecycles via dependency evaluation
      if (isActive) {
        startPolling();
      } else {
        stopPolling();
      }

      // 4. Return the cleanup function closure (replaces componentWillUnmount)
      return () => {
        stopPolling();
      };
    }, [symbol, isActive]); // Re-evaluates only when these dependencies mutate

    return (
      <View style={styles.card}>
        <Text style={styles.header}>Asset: {symbol}</Text>
        <Text style={styles.price}>Price: ${price}</Text>
        <Text style={styles.footer}>Last updated: {lastUpdated}</Text>
      </View>
    );
  },
  // Replicate shouldComponentUpdate behavior.
  // Returns true if props are equal (skips render), or false if unequal (re-renders)
  (prevProps, nextProps) => {
    return (
      prevProps.symbol === nextProps.symbol &&
      prevProps.isActive === nextProps.isActive
    );
  }
);

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e0',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  price: {
    fontSize: 24,
    color: '#38a169',
    marginVertical: 10,
    fontWeight: '600',
  },
  footer: {
    fontSize: 12,
    color: '#718096',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ updates.
- **Space Complexity**: $O(1)$ memory mapping.
- **Explanation**: Refactored hooks representation. React's `useState` manages values. `useRef` holds the polling timer ID because mutations to `.current` do not trigger updates. The `useEffect` hook captures updates to `symbol` or `isActive`, clean-up returns halt previous intervals, and `React.memo` implements shallow props comparison.

---

---

> 🎯 **Topic:** Program 3: Object Reference Copying & Mutability Evaluation
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 3: Program 3: Object Reference Copying & Mutability Evaluation
*⏱️ 2 min read*

### Question
Given the `person` object structure below, write a JavaScript script that demonstrates the differences between shallow and deep copying:
1. Access `first_Name` and `last Name` properties safely.
2. Clone `person` into a new variable `person2` using deep-copying (`structuredClone`).
3. Mutate `person2.first_Name = "Foo"` and compare both `person.first_Name` and `person2.first_Name`.
4. Mutate `person2.directory["1"].city = "Chennai"` and evaluate how this nested change impacts the original `person.directory["1"].city` in both shallow copy and deep copy scenarios.

### Sample Input & Output
#### Input Object:
```javascript
const person = {
  "first_Name": "John",
  "last Name": "Doe",
  "age": 20,
  "hobbies": ["watching movies", "playing games"],
  "directory": {
    "1": {
      "type": "home",
      "address": "123 Main Street",
      "city": "Bengaluru"
    }
  }
};
```
#### Output:
- Deep copy allows mutating primitive properties and nested directories inside `person2` (e.g. changing first name to "Foo" and city to "Chennai") while keeping the original `person` properties intact ("John" and "Bengaluru").
- A shallow copy (e.g. using the spread operator) would fail to isolate nested changes, meaning updating `person2.directory["1"].city` would also overwrite `person.directory["1"].city` to `"Chennai"`.

### Code
```javascript
const person = {
  "first_Name": "John",
  "last Name": "Doe",
  "age": 20,
  "hobbies": ["watching movies", "playing games"],
  "directory": {
    "1": {
      "type": "home",
      "address": "123 Main Street",
      "city": "Bengaluru"
    }
  }
};

// 1. Access properties safely (including brackets for keys with spaces)
console.log("First Name:", person.first_Name); // John
console.log("Last Name:", person["last Name"]); // Doe

// 2. Perform a Deep Copy using native structuredClone (preserves nested levels)
const person2 = structuredClone(person);

// 3. Mutate 1st level property (both shallow & deep copy isolate 1st level changes)
person2.first_Name = "Foo";

console.log("person2 first_Name:", person2.first_Name); // "Foo"
console.log("person first_Name:", person.first_Name);   // "John" (pristine)

// 4. Access nested properties
console.log("person original city:", person.directory["1"].city); // "Bengaluru"

// 5. Mutate nested property inside the Deep Copy object
person2.directory["1"].city = "Chennai";

console.log("person2 city (after deep copy mutate):", person2.directory["1"].city); // "Chennai"
console.log("person city (after deep copy mutate):", person.directory["1"].city);   // "Bengaluru" (remains safe!)

// 6. Contrast with a Shallow Copy (Spread Operator)
const shallowCopyPerson = { ...person };
shallowCopyPerson.directory["1"].city = "Chennai";

// Under a Shallow Copy, nested references are shared, so the original changes!
console.log("shallowCopyPerson city:", shallowCopyPerson.directory["1"].city); // "Chennai"
console.log("person city (corrupted by shallow copy):", person.directory["1"].city);   // "Chennai"
```

### Complexity & Explanation
- **Time Complexity**: $O(D)$ where $D$ is the depth/size of the nested object to copy via `structuredClone`. Shallow copy is $O(K)$ where $K$ is the number of keys.
- **Space Complexity**: $O(D)$ to allocate the cloned object graph.
- **Explanation**: Accesses spaced keys using bracket indexes. Shallow cloning (e.g. spread operator `{ ...obj }`) only copies 1st level values. For nested properties, it copies memory address pointers, causing child mutations to overwrite the source object. Modern `structuredClone` performs a deep copy, completely isolating both graphs.

---

---

> 🎯 **Topic:** Program 4: Nested Array Flattening
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 4: Program 4: Nested Array Flattening
*⏱️ 1 min read*

### Question
Write a function `flattenArray(arr)` that flattens a deeply nested array of numbers into a single flat array without using the native `Array.prototype.flat()` method.

### Sample Input & Output
#### Input:
```javascript
const input = [1, [2, [3, [4]], 5]];
```
#### Output:
```javascript
[1, 2, 3, 4, 5]
```

### Code
```javascript
function flattenArray(arr) {
  let result = [];
  
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      // Recursively flatten nested arrays and merge results
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  
  return result;
}

// Alternative modern iterative stack-based solution:
function flattenArrayIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      // Push back elements to stack
      stack.push(...next);
    } else {
      result.push(next);
    }
  }
  return result.reverse(); // Reverse since we popped from end
}

const input = [1, [2, [3, [4]], 5]];
console.log(flattenArray(input)); // [1, 2, 3, 4, 5]
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the total count of numbers in all nested levels.
- **Space Complexity**: $O(D)$ auxiliary call stack space where $D$ is maximum recursion depth, or $O(N)$ memory buffer for stack arrays.
- **Explanation**: The recursive solution checks if an array item is itself an array using `Array.isArray`, recursively flattening and merging elements via `.concat()`. The iterative alternative mimics recursive frame execution using a local stack, avoiding call stack limits.

---

---

> 🎯 **Topic:** Program 5: Substring Extraction
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 5: Program 5: Substring Extraction
*⏱️ 1 min read*

### Question
Given a string `"Apple, Banana, Kiwi"`, extract the substring `"Banana"` using appropriate JavaScript string slicing methods.

### Sample Input & Output
#### Input:
```javascript
let text = "Apple, Banana, Kiwi";
```
#### Output:
```javascript
"Banana"
```

### Code
```javascript
let text = "Apple, Banana, Kiwi";

// Method 1: Using split() and trim()
let bananaMethod1 = text.split(",")[1].trim();
console.log("Method 1:", bananaMethod1); // "Banana"

// Method 2: Using slice() with indexOf()
let start = text.indexOf("Banana");
let end = start + "Banana".length;
let bananaMethod2 = text.slice(start, end);
console.log("Method 2:", bananaMethod2); // "Banana"

// Method 3: Using substring() with hardcoded indices
let bananaMethod3 = text.substring(7, 13);
console.log("Method 3:", bananaMethod3); // "Banana"
```

### Complexity & Explanation
- **Time Complexity**: $O(S)$ where $S$ is the string size.
- **Space Complexity**: $O(W)$ where $W$ is the extracted substring size.
- **Explanation**: Compares string parsing functions. Method 1 splits the input string by `,`, accesses index 1, and trims whitespace. Method 2 finds indices using `indexOf` and extracts via `slice(start, end)`. Method 3 slices characters using static index coordinates via `substring(start, end)`.

---

---

> 🎯 **Topic:** Program 6: Asynchronous Execution Order (Event Loop Timing)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 6: Program 6: Asynchronous Execution Order (Event Loop Timing)
*⏱️ 1 min read*

### Question
Predict and explain the console execution output order of the following synchronous and asynchronous operations, identifying the roles of the Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout).

### Code Snippet
```javascript
console.log("1: Start");
 
setTimeout(() => {
  console.log("2: Macrotask (setTimeout)");
}, 0);
 
Promise.resolve().then(() => {
  console.log("3: Microtask (Promise)");
});
 
console.log("4: End");
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ scheduling.
- **Space Complexity**: $O(1)$ queues.
- **Console Output Order**:
  1. `1: Start`
  2. `4: End`
  3. `3: Microtask (Promise)`
  4. `2: Macrotask (setTimeout)`
- **Explanation**: 
  1. Synchronous statements (1 and 4) run on the Call Stack immediately.
  2. The event loop offloads `setTimeout` to WebAPIs, which places its callback in the low-priority Macrotask Queue.
  3. The `Promise.resolve` resolves immediately and queues its callback on the high-priority Microtask Queue.
  4. Once the Call Stack is empty, the Event Loop flushes all items in the Microtask Queue first before processing the first callback in the Macrotask Queue.

---

---

> 🎯 **Topic:** Program 7: Loop Scoping & Variable Closures inside SetTimeout
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 7: Program 7: Loop Scoping & Variable Closures inside SetTimeout
*⏱️ 1 min read*

### Question
Given the following loop structure, resolve the syntax bugs and explain the output difference between declaring the loop iterator `i` with `var` versus `let` inside asynchronous timers.

### Code & Execution Outputs
```javascript
// Corrected Loop Syntax:
// 1. Using block-scoped 'let'
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
     console.log('let index:', i);
  }, 0);
}
// Outputs: 0, 1, 2, 3, 4 (each iteration receives its own lexical block binding)

// 2. Using function-scoped 'var'
for (var j = 0; j < 5; j++) {
  setTimeout(() => {
     console.log('var index:', j);
  }, 0);
}
// Outputs: 5, 5, 5, 5, 5 (all callbacks reference the same shared variable bound to 5 after loop terminates)
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the loop boundary (5).
- **Space Complexity**: $O(N)$ for closures contexts when using `let`, and $O(1)$ when using `var`.
- **Explanation**: 
  - **`let` (Block Scope)**: JavaScript allocates a new variable binding slot in memory on every single loop iteration. The callback closure binds to that iteration's instance, printing `0, 1, 2, 3, 4`.
  - **IIFE Fix**: Wrapping `var` statements in an Immediately Invoked Function Expression (IIFE) captures the current value of the iterator, creating a new lexical scope for each callback.

---

---

> 🎯 **Topic:** Program 8: Deep Memoization Wrapper with Cache Expiration
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 8: Program 8: Deep Memoization Wrapper with Cache Expiration
*⏱️ 1 min read*

### Question
Write a high-performance, generic JavaScript **Memoization Wrapper** function `memoize(fn, options)`. The wrapper must:
1. Cache execution outcomes based on variable parameters.
2. Support a custom cache key resolver function.
3. Implement a **Time-To-Live (TTL)** cache expiration handler to clear stale keys automatically after a specified time.
4. Support clean cache invalidation hooks.

### Sample Input & Output
#### Input:
```javascript
const heavyCalculation = (a, b) => {
  console.log("Executing expensive math...");
  return a + b;
};

const memoizedMath = memoize(heavyCalculation, { ttl: 2000 });

memoizedMath(2, 3); // Prints "Executing..." and returns 5
memoizedMath(2, 3); // Serves instantly from cache (no print)

// Wait 2.5 seconds
setTimeout(() => {
  memoizedMath(2, 3); // TTL expired. Prints "Executing..." and recalculates!
}, 2500);
```

### Code
```javascript
function memoize(fn, options = {}) {
  const { ttl = null, resolver = null } = options;
  const cache = new Map();

  const memoized = function (...args) {
    // 1. Generate cache key based on inputs
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      const record = cache.get(key);

      // 2. Check if TTL validation checks apply
      if (ttl !== null && Date.now() - record.timestamp > ttl) {
        cache.delete(key); // Evict expired key
      } else {
        return record.value; // Return fresh cached result
      }
    }

    // 3. Execute original function and store with timestamp
    const result = fn.apply(this, args);
    cache.set(key, {
      value: result,
      timestamp: Date.now(),
    });

    return result;
  };

  // 4. Expose cache management APIs
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  memoized.invalidate = (key) => cache.delete(key);

  return memoized;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ lookup for cache resolutions.
- **Space Complexity**: $O(K)$ where $K$ is the number of cached keys.
- **Explanation**: This program builds a custom caching wrapper. By wrapping the original function in a closure, it persists a private `Map` store. It maps dynamic input arguments to serialization keys, checks timestamps against configured TTL limits to clean up stale references, and exposes invalidate hooks.

---

---

> 🎯 **Topic:** Program 9: Custom Event Broker (Publish-Subscribe Pattern) with Wildcards
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 9: Program 9: Custom Event Broker (Publish-Subscribe Pattern) with Wildcards
*⏱️ 1 min read*

### Question
Implement a complete JavaScript **Event Emitter / Broker** class supporting a Publish-Subscribe pattern.
The class must export methods:
1. `.on(event, callback)`: Register event listeners.
2. `.off(event, callback)`: Remove registered listeners.
3. `.emit(event, payload)`: Dispatch events.
4. `.once(event, callback)`: Run a callback exactly once, then unsubscribe.
5. Support **wildcard** selectors (e.g. emitting `'user.*'` triggers callbacks listening to both `'user.login'` and `'user.logout'`).

### Code
```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  // 1. Subscribe to events
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    
    // Return unsubscribe utility hook
    return () => this.off(event, callback);
  }

  // 2. Unsubscribe from events
  off(event, callback) {
    if (!this.events.has(event)) return;
    const list = this.events.get(event).filter((cb) => cb !== callback);
    if (list.length === 0) {
      this.events.delete(event);
    } else {
      this.events.set(event, list);
    }
  }

  // 3. Subscribe once
  once(event, callback) {
    const wrapped = (...args) => {
      this.off(event, wrapped);
      callback.apply(this, args);
    };
    return this.on(event, wrapped);
  }

  // 4. Emit events with Wildcard resolution (e.g. 'order.*')
  emit(event, ...args) {
    this.events.forEach((callbacks, registeredEvent) => {
      if (this.matchEvent(registeredEvent, event)) {
        callbacks.forEach((cb) => {
          try {
            cb(...args);
          } catch (err) {
            console.error(`Error in event listener for ${registeredEvent}:`, err);
          }
        });
      }
    });
  }

  private matchEvent(registered, emitted) {
    if (registered === emitted) return true;
    
    // Convert wildcard pattern 'user.*' to regex 'user\.[^.]+'
    if (registered.includes('*')) {
      const pattern = '^' + registered.replace(/\*/g, '[^.]+') + '$';
      const regex = new RegExp(pattern);
      return regex.test(emitted);
    }
    
    if (emitted.includes('*')) {
      const pattern = '^' + emitted.replace(/\*/g, '[^.]+') + '$';
      const regex = new RegExp(pattern);
      return regex.test(registered);
    }

    return false;
  }
}
```

- **Explanation**: This implementation models a custom event bus. It holds subscription lists inside private Maps. It implements wildcard matching by converting string structures (e.g., `'user.*'`) to regex expressions at runtime, evaluates listeners, and uses try/catch blocks to isolate listener errors.

---

---

> 🎯 **Topic:** Program 10: Custom Debounce Implementation
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 10: Program 10: Custom Debounce Implementation
*⏱️ 1 min read*

### Question
Write a custom debounce wrapper function `debounce(func, delay)` from scratch that postpones the execution of `func` until `delay` milliseconds have passed since the last invocation. Ensure it maintains execution contexts and arguments.

### Sample Input & Output
#### Input:
```javascript
const logSearch = debounce((text) => console.log(text), 500);
logSearch("R");
logSearch("Re");
logSearch("React"); // Triggered 100ms apart
```
#### Output:
Only prints `"React"` once, 500ms after the last keypress.

### Code
```javascript
// Time: O(1) creation | Space: O(1)
function debounce(func, delay = 500) {
  let timeoutId = null;

  return function (...args) {
    const context = this;

    // 1. Clear any active pending timers to restart the quiet period
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 2. Set new execution target
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null;
    }, delay);
  };
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ to create the debounced function, and $O(1)$ auxiliary work per call.
- **Space Complexity**: $O(1)$ storage to persist the `timeoutId` reference in closure memory.
- **Explanation**: Returns a debounced function wrapper. Each time the returned function is called, it clears the current active timer via `clearTimeout` to restart the quiet period. Once the delay timer completes, the original target function is executed with the stored execution context and arguments using `apply`.

---

---

> 🎯 **Topic:** Program 11: Custom Throttle Implementation
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 11: Program 11: Custom Throttle Implementation
*⏱️ 1 min read*

### Question
Implement a custom throttle wrapper function `throttle(func, limit)` that ensures the target function is executed at most once every `limit` milliseconds, regardless of how frequently it is triggered.

### Sample Input & Output
#### Input:
```javascript
const logScroll = throttle((pos) => console.log(pos), 200);
logScroll(10);  // Fires at t=0
logScroll(50);  // Fires at t=50ms
logScroll(100); // Fires at t=100ms
```
#### Output:
Logs `10` immediately. Ignores the updates at 50ms and 100ms since they occur inside the 200ms lock window.

### Code
```javascript
// Time: O(1) creation | Space: O(1)
function throttle(func, limit = 200) {
  let inThrottle = false;

  return function (...args) {
    const context = this;

    // Execute only if not currently locked inside the throttle interval
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;

      // Unlock execution after the limit passes
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ to create the throttled function, and $O(1)$ per call.
- **Space Complexity**: $O(1)$ storage to persist the `inThrottle` lock in closure memory.
- **Explanation**: Returns a throttled function wrapper. If `inThrottle` is false, it executes the target function immediately and sets the lock to true. Submitting other requests while the lock is true are ignored. A `setTimeout` unlocks execution after the specified lock limit passes.

---

---

> 🎯 **Topic:** Program 12: Polyfills for Map, Filter, and Reduce
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 12: Program 12: Polyfills for Map, Filter, and Reduce
*⏱️ 1 min read*

### Question
Write prototype polyfills for JavaScript Array methods: `myMap`, `myFilter`, and `myReduce`. Do not use native array methods in your implementations.

### Sample Input & Output
#### Input:
```javascript
[1, 2, 3].myMap(x => x * 2);
[1, 2, 3].myFilter(x => x > 1);
[1, 2, 3].myReduce((acc, x) => acc + x, 0);
```
#### Output:
- Map: `[2, 4, 6]`
- Filter: `[2, 3]`
- Reduce: `6`

### Code
```javascript
// Map Polyfill (Time: O(n) | Space: O(n))
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Check to handle sparse arrays safely
    if (i in this) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

// Filter Polyfill (Time: O(n) | Space: O(n))
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};

// Reduce Polyfill (Time: O(n) | Space: O(1))
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // If no initial value is provided, use the first array element as accumulator
  if (initialValue === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of items in the array.
- **Space Complexity**: $O(N)$ for `myMap` and `myFilter` to buffer output arrays, and $O(1)$ auxiliary space for `myReduce`.
- **Explanation**: Custom array prototypes polyfills:
  - `myMap` builds a new array, applying the callback to each defined key.
  - `myFilter` collects items matching the callback's boolean check.
  - `myReduce` accumulates array values starting from an optional seed value.

---

---

> 🎯 **Topic:** Program 13: Data Transformations (Array-to-Object & Object-to-Array)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 13: Program 13: Data Transformations (Array-to-Object & Object-to-Array)
*⏱️ 1 min read*

### Question
Provide functions to transform flat structures:
1. `arrayToObject(arr, key)`: Converts an array of objects into a hashed object mapping keys to values using `reduce()`.
2. `objectToArray(obj)`: Converts an object's values back into an array, showing both manual looping and `reduce()` approaches.

### Sample Input & Output
#### Input (Array):
```javascript
const users = [
  { id: "101", name: "Alex" },
  { id: "102", name: "Sam" }
];
```
#### Output (Object):
```javascript
{
  "101": { id: "101", name: "Alex" },
  "102": { id: "102", name: "Sam" }
}
```

### Code
```javascript
// Array to Object (Time: O(n) | Space: O(n))
function arrayToObject(arr, keyField) {
  return arr.reduce((accumulator, currentItem) => {
    if (currentItem && currentItem[keyField]) {
      accumulator[currentItem[keyField]] = currentItem;
    }
    return accumulator;
  }, {});
}

// Object to Array - Using standard Object.values() (Time: O(n) | Space: O(n))
function objectToArray(obj) {
  if (!obj) return [];
  return Object.values(obj);
}

// Object to Array - Manual traversal for older environments (Time: O(n) | Space: O(n))
function objectToArrayManual(obj) {
  if (!obj) return [];
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key]);
    }
  }
  return result;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of array elements or object properties.
- **Space Complexity**: $O(N)$ to allocate the output converted structures.
- **Explanation**:
  - `arrayToObject` translates flat item listings into an indexed key-value map using `.reduce()`.
  - `objectToArray` returns array representations using `Object.values()`, or maps properties using a manual `for...in` loop with `hasOwnProperty` checks for legacy environments.

---

---

> 🎯 **Topic:** Program 14: Mobile Device Token Deduplicator (CleanTokens)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 14: Program 14: Mobile Device Token Deduplicator (CleanTokens)
*⏱️ 1 min read*

### Question
Write a function `cleanTokens(sessions)` in JavaScript that takes an array of mobile session objects containing push notification tokens. The function must filter out invalid tokens (such as `null`, `undefined`, or empty string tokens), ignore inactive sessions, remove duplicate tokens, and return a sorted array of clean tokens.

### Sample Input & Output
#### Input:
```javascript
const sessions = [
  { sessionId: "s1", token: "tok_abc", isActive: true },
  { sessionId: "s2", token: null, isActive: true },
  { sessionId: "s3", token: "tok_xyz", isActive: false },
  { sessionId: "s4", token: "tok_abc", isActive: true }, // Duplicate
  { sessionId: "s5", token: "  tok_def  ", isActive: true } // Needs trimming
];
```
#### Output:
```javascript
["tok_abc", "tok_def"]
```

### Code
```javascript
// Time: O(n log(n)) due to sort | Space: O(n) sets and outputs
function cleanTokens(sessions) {
  if (!sessions || !Array.isArray(sessions)) return [];

  const uniqueTokens = new Set();

  for (const session of sessions) {
    // 1. Verify session object exists and is active
    if (session && session.isActive !== false) {
      const token = session.token;
      
      // 2. Validate token is a non-empty string
      if (typeof token === 'string') {
        const trimmedToken = token.trim();
        if (trimmedToken.length > 0) {
          uniqueTokens.add(trimmedToken);
        }
      }
    }
  }

  // 3. Convert Set back to Array and sort alphabetically
  return Array.from(uniqueTokens).sort();
}
```

### Complexity & Explanation
- **Time Complexity**: $O(N \log N)$ where $N$ is the number of clean tokens (due to the final sorting operation).
- **Space Complexity**: $O(N)$ to allocate clean arrays and deduplication sets.
- **Explanation**: Cleans, deduplicates, and sorts session notification tokens. It ignores inactive accounts, validates that tokens are non-empty strings, trims whitespaces, filters duplicates using a `Set`, and outputs sorted alphabetical arrays.

---

---

> 🎯 **Topic:** Program 15: Object Property Diff Tracker
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 15: Program 15: Object Property Diff Tracker
*⏱️ 1 min read*

### Question
Write a function `getChangedKeys(previousState, currentState)` that performs a flat key comparison between two states and returns an array of keys that have changed (either updated, added, or deleted).

### Sample Input & Output
#### Input:
```javascript
const previousState = { theme: "dark", fontSize: 14, isMuted: false };
const currentState  = { theme: "light", fontSize: 14, isMuted: true, volume: 80 };
```
#### Output:
```javascript
["theme", "isMuted", "volume"] // theme updated, isMuted updated, volume added
```

### Code
```javascript
// Time: O(P + C) where P and C are keys count | Space: O(P + C) unique keys set
function getChangedKeys(previousState, currentState) {
  const prevObj = previousState || {};
  const currObj = currentState || {};

  // Gather all unique keys from both states
  const allKeys = new Set([
    ...Object.keys(prevObj),
    ...Object.keys(currObj)
  ]);

  const changedKeys = [];

  for (const key of allKeys) {
    // Identify diffs by comparing current and previous references
    if (prevObj[key] !== currObj[key]) {
      changedKeys.push(key);
    }
  }

  return changedKeys;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(P + C)$ where $P$ and $C$ are the number of keys in the previous and current states.
- **Space Complexity**: $O(P + C)$ to store unique keys in a set container.
- **Explanation**: Detects state changes by performing a flat difference comparison. It aggregates all keys from both states inside a `Set`, loops through them, and checks for strict inequality `!==` to identify added, updated, or removed properties.

---

---

> 🎯 **Topic:** Program 16: Paginated Transaction Amount Aggregator
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 16: Program 16: Paginated Transaction Amount Aggregator
*⏱️ 1 min read*

### Question
Write an asynchronous function `aggregateTransactions(apiEndpoint, pagesCount)` that fetches transaction list data across multiple pages sequentially or concurrently using `fetch()`. The function must sum the `amount` fields of all transaction nodes and return the total sum.

### Sample Input & Output
#### Input:
```javascript
// Each page response schema:
{
  data: [
    { id: 1, amount: 120.50 },
    { id: 2, amount: 80.00 }
  ]
}
```
#### Output (for 2 pages):
```javascript
200.50 // Sum of all transactions amounts
```

### Code
```javascript
// Time: O(pages * itemsPerPage) | Space: O(pages) promise queues
async function aggregateTransactions(apiEndpoint, pagesCount) {
  let totalSum = 0;
  const fetchPromises = [];

  for (let page = 1; page <= pagesCount; page++) {
    // 1. Queue all request promises for concurrent execution
    const pageUrl = `${apiEndpoint}?page=${page}`;
    
    const pagePromise = fetch(pageUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        // 2. Sum elements locally inside promise resolve callback
        let pageSum = 0;
        if (payload && Array.isArray(payload.data)) {
          payload.data.forEach((tx) => {
            if (tx && typeof tx.amount === 'number') {
              pageSum += tx.amount;
            }
          });
        }
        return pageSum;
      })
      .catch((err) => {
        console.error(`Failed to fetch transactions on page ${page}:`, err);
        return 0; // Fallback to 0 if a single page fails
      });

    fetchPromises.push(pagePromise);
  }

  // 3. Resolve all promises concurrently
  const pageSums = await Promise.all(fetchPromises);
  totalSum = pageSums.reduce((acc, sum) => acc + sum, 0);

  return totalSum;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(P \times M)$ where $P$ is the page count and $M$ is the average number of transaction items per page.
- **Space Complexity**: $O(P)$ promises collection buffer.
- **Explanation**: Fetches data from paginated API endpoints concurrently by building a promise queue. It uses `Promise.all` to execute request threads simultaneously and aggregates values using array accumulation.

---

---

> 🎯 **Topic:** Program 17: Batch Concurrent Promise Coordinator (Network Throttler)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 17: Program 17: Batch Concurrent Promise Coordinator (Network Throttler)
*⏱️ 1 min read*

### Question
Write a utility wrapper function `batchPromises(tasks, batchSize)` that coordinates a large queue of asynchronous promise-returning tasks. The utility must run at most `batchSize` tasks concurrently, starting new tasks immediately as running ones resolve, preventing server rate-limiting.

### Sample Input & Output
#### Input:
- 10 task functions: `[task1, task2, ..., task10]` (each taking 100ms to resolve)
- `batchPromises(tasks, 3)`
#### Output:
Executes tasks concurrently in active batches of 3. Resolves all tasks and returns the outputs array sequentially once complete, completing in roughly 400ms rather than 1000ms (sequential) or overloading with 10 concurrent hits.

### Code
```javascript
// Time: O(tasksCount) | Space: O(tasksCount + batchSize) outputs & tracking queues
async function batchPromises(tasks, batchSize) {
  const results = new Array(tasks.length);
  let nextTaskIndex = 0;

  // Worker generator thread that pulls tasks from queue continuously
  async function worker() {
    while (nextTaskIndex < tasks.length) {
      const currentIndex = nextTaskIndex;
      nextTaskIndex++; // Advance index atomically

      try {
        // Execute the promise-returning task function
        results[currentIndex] = await tasks[currentIndex]();
      } catch (err) {
        results[currentIndex] = { error: err }; // Store rejection outputs
      }
    }
  }

  // Spawn concurrent workers up to batch limit
  const workers = [];
  const activeWorkersCount = Math.min(batchSize, tasks.length);
  for (let i = 0; i < activeWorkersCount; i++) {
    workers.push(worker());
  }

  // Wait for all worker streams to finish queue processing
  await Promise.all(workers);
  return results;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(T)$ where $T$ is the number of asynchronous tasks.
- **Space Complexity**: $O(T + B)$ where $T$ is the results array and $B$ is the number of concurrent worker processes.
- **Explanation**: Coordinates and throttles async task processing. It spawns up to `batchSize` worker promises. Each worker continuously pulls the next unexecuted task index, awaits the promise response, maps the outcome to the results array, and proceeds until all tasks are completed.

---

