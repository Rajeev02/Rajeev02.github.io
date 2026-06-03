# ⚛️ JavaScript & React Coding Programs

---

## Program 1: Legacy React Class Component with Full Lifecycle Methods

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

## Program 2: Functional Component Refactor Using Hooks

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

## Program 3: Object Reference Copying & Mutability Evaluation

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

## Program 4: Nested Array Flattening

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

## Program 5: Substring Extraction

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

## Program 6: Asynchronous Execution Order (Event Loop Timing)

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

## Program 7: Loop Scoping & Variable Closures inside SetTimeout

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
  - **`var` (Function Scope)**: The iterator variable is hoisted and shared across all iterations. By the time the call stack clears and asynchronous timers execute, the loop has completed, leaving the variable at `5`. Thus, all timers print `5`.
  - **IIFE Fix**: Wrapping `var` statements in an Immediately Invoked Function Expression (IIFE) captures the current value of the iterator, creating a new lexical scope for each callback.


