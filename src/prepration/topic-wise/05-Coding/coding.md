# ⚙️ Utility Coding Programs

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
