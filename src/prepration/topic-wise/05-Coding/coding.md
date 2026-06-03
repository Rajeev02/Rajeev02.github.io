# ⚙️ Utility Coding Programs

<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [Program 1: Custom Debounce Implementation](#program-1-custom-debounce-implementation)
- [Program 2: Custom Throttle Implementation](#program-2-custom-throttle-implementation)
- [Program 3: Polyfills for Map, Filter, and Reduce](#program-3-polyfills-for-map-filter-and-reduce)
- [Program 4: Data Transformations (Array-to-Object & Object-to-Array)](#program-4-data-transformations-array-to-object-object-to-array)
- [Program 5: Custom Event Emitter (Publish-Subscribe Broker)](#program-5-custom-event-emitter-publish-subscribe-broker)
- [Program 6: Custom Memoize Function Wrapper](#program-6-custom-memoize-function-wrapper)
- [Program 7: Mobile Device Token Deduplicator (CleanTokens)](#program-7-mobile-device-token-deduplicator-cleantokens)
- [Program 8: Object Property Diff Tracker](#program-8-object-property-diff-tracker)
- [Program 9: Paginated Transaction Amount Aggregator](#program-9-paginated-transaction-amount-aggregator)
- [Program 10: Batch Concurrent Promise Coordinator (Network Throttler)](#program-10-batch-concurrent-promise-coordinator-network-throttler)
</details>
<!-- INDEX_END -->

---

## Program 1: Custom Debounce Implementation

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

## Program 2: Custom Throttle Implementation

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

## Program 3: Polyfills for Map, Filter, and Reduce

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

## Program 4: Data Transformations (Array-to-Object & Object-to-Array)

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

## Program 5: Custom Event Emitter (Publish-Subscribe Broker)

### Question
Implement a custom `EventEmitter` class that allows components to publish and subscribe to named channels. The class must implement `on(event, listener)`, `emit(event, data)`, and `off(event, listener)` for cleanup.

### Sample Input & Output
#### Input:
```javascript
const emitter = new EventEmitter();
const sub = (data) => console.log(data);
emitter.on("refresh", sub);
emitter.emit("refresh", "success");
emitter.off("refresh", sub);
emitter.emit("refresh", "ignored");
```
#### Output:
Logs `"success"` once. The second emit is ignored since the subscription was cleared.

### Code
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Time: O(1) | Space: O(1)
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    
    // Return unsubscribe helper for easy cleanup in useEffect hooks
    return () => this.off(event, listener);
  }

  // Time: O(1) deletion | Space: O(1)
  off(event, listenerToRemove) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(
      (listener) => listener !== listenerToRemove
    );
  }

  // Time: O(k) where k is the number of active listeners | Space: O(1)
  emit(event, data) {
    if (!this.events[event]) return;

    // Iterate and execute all callbacks in the event queue
    this.events[event].forEach((listener) => {
      try {
        listener(data);
      } catch (err) {
        console.error(`Emitter error in callback for event ${event}:`, err);
      }
    });
  }
}
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Subscribe/Unsubscribe**: $O(1)$ constant time operations.
  - **Emit Event**: $O(K)$ where $K$ is the number of active listeners for that specific event namespace.
- **Space Complexity**: $O(E \times K)$ where $E$ is the number of distinct events and $K$ is the number of listeners per event.
- **Explanation**: A clean Publish-Subscribe broker implementation. It maintains a hash map of event listeners. The `on` method registers listener functions and returns a callable unsubscribe closure. The `off` method filters out a listener, and the `emit` method iterates and fires all registered callbacks safely.

---

## Program 6: Custom Memoize Function Wrapper

### Question
Write a memoization function wrapper `memoize(fn)` that caches the results of function calls based on their input arguments. If identical arguments are passed, it should return the cached value instead of running the function again.

### Sample Input & Output
#### Input:
```javascript
let computationsCount = 0;
const double = memoize((x) => {
  computationsCount++;
  return x * 2;
});
double(10); // Compute
double(10); // From Cache
console.log(computationsCount);
```
#### Output:
Logs `1` because the second call resolved directly from the cache.

### Code
```javascript
// Time: O(1) setup, O(1) average lookup | Space: O(c) cache size
function memoize(fn) {
  const cache = {};

  return function (...args) {
    // Generate a unique hash key by stringifying arguments
    const cacheKey = JSON.stringify(args);

    if (cacheKey in cache) {
      console.log("Memoize: Returning cached value for keys:", cacheKey);
      return cache[cacheKey];
    }

    const result = fn.apply(this, args);
    cache[cacheKey] = result;
    return result;
  };
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ lookup average on subsequent calls. Setup takes $O(1)$ time.
- **Space Complexity**: $O(C)$ where $C$ is the size of unique cached arguments combinations.
- **Explanation**: Implements function cache memoization. It generates a hash key by serializing parameters via `JSON.stringify`. When identical arguments are intercepted, the client skips execution and returns the cached result.

---

## Program 7: Mobile Device Token Deduplicator (CleanTokens)

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

## Program 8: Object Property Diff Tracker

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

## Program 9: Paginated Transaction Amount Aggregator

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

## Program 10: Batch Concurrent Promise Coordinator (Network Throttler)

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

