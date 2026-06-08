# Daily Revision

## Table of Contents

- [Section 1: 💻 1-Hour Daily Coding Routine (HackerRank Prep)](#section-1-1-hour-daily-coding-routine-hackerrank-prep)
- [Section 2: 🧠 1-Hour Daily Theory Routine (React Native, JS/TS, Architecture)](#section-2-1-hour-daily-theory-routine-react-native-js-ts-architecture)


---

> 🎯 **Topic:** 💻 1-Hour Daily Coding Routine (HackerRank Prep)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---

## Section 1: 💻 1-Hour Daily Coding Routine (HackerRank Prep)

*⏱️ 60 min coding practice*

# Preparation Guide

### Senior React Native Developer (9 Years Experience)

---

### Interview Strategy

For a 60-minute HackerRank round with 2 coding questions:

1. Read both questions completely.
2. Identify the pattern:
   - HashMap
   - Set
   - Sliding Window
   - Stack
   - Two Pointers
   - Prefix/Suffix
3. Solve Question 1 in 10–15 minutes.
4. If stuck, write brute force first.
5. Optimize later.

---

### Must Know JavaScript Methods

```javascript
map(); filter(); reduce(); find(); findIndex(); sort(); split(); join(); slice(); substring(); includes(); Object.keys(); Object.values(); Object.entries();
```

### Must Know Data Structures

```javascript
Object {}
Map
Set
Array
Stack
Queue
```

---

### DSA SECTION

---

#### 1. Two Sum ⭐⭐⭐⭐⭐

**Pattern:** HashMap

**Input:**
```javascript
nums = [2, 7, 11, 15];
target = 9;
```

**Output:**
```javascript
[0, 1];
```

**Solution:**
```javascript
function twoSum(nums, target) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];

    if (map[diff] !== undefined) {
      return [map[diff], i];
    }

    map[nums[i]] = i;
  }

  return [];
}
```

**Complexity:**
```text
Time: O(n)
Space: O(n)
```

---

#### 2. Contains Duplicate ⭐⭐⭐⭐⭐

**Pattern:** Set

**Input:**
```javascript
nums = [1, 2, 3, 1];
```

**Output:**
```javascript
true;
```

**Solution:**
```javascript
function containsDuplicate(nums) {
  const set = new Set();

  for (const num of nums) {
    if (set.has(num)) {
      return true;
    }

    set.add(num);
  }

  return false;
}
```

---

#### 3. Valid Anagram ⭐⭐⭐⭐⭐

**Pattern:** HashMap

**Input:**
```javascript
s = "anagram";
t = "nagaram";
```

**Output:**
```javascript
true;
```

**Solution:**
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const map = {};

  for (const ch of s) {
    map[ch] = (map[ch] || 0) + 1;
  }

  for (const ch of t) {
    if (!map[ch]) return false;
    map[ch]--;
  }

  return true;
}
```

---

#### 4. First Non-Repeating Character ⭐⭐⭐⭐⭐

**Pattern:** Frequency Count

**Input:**
```javascript
str = "leetcode";
```

**Output:**
```javascript
"l";
```

**Solution:**
```javascript
function firstUnique(str) {
  const freq = {};

  for (const ch of str) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  for (const ch of str) {
    if (freq[ch] === 1) {
      return ch;
    }
  }

  return null;
}
```

---

#### 5. Move Zeroes ⭐⭐⭐⭐

**Pattern:** Two Pointers

**Input:**
```javascript
nums = [0, 1, 0, 3, 12];
```

**Output:**
```javascript
[1, 3, 12, 0, 0];
```

**Solution:**
```javascript
function moveZeroes(nums) {
  let index = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[index++] = nums[i];
    }
  }

  while (index < nums.length) {
    nums[index++] = 0;
  }

  return nums;
}
```

---

#### 6. Longest Substring Without Repeating Characters ⭐⭐⭐⭐⭐

**Pattern:** Sliding Window

**Input:**
```javascript
str = "abcabcbb";
```

**Output:**
```javascript
3; // "abc"
```

**Solution:**
```javascript
function lengthOfLongestSubstring(str) {
  let left = 0;
  let max = 0;

  const set = new Set();

  for (let right = 0; right < str.length; right++) {
    while (set.has(str[right])) {
      set.delete(str[left]);
      left++;
    }

    set.add(str[right]);

    max = Math.max(max, right - left + 1);
  }

  return max;
}
```

**Key Formula:**
```javascript
windowLength = right - left + 1;
```

---

#### 7. Maximum Subarray Sum (Kadane) ⭐⭐⭐⭐

**Pattern:** Dynamic Running Sum

**Input:**
```javascript
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
```

**Output:**
```javascript
6; // [4,-1,2,1]
```

**Solution:**
```javascript
function maxSubArray(nums) {
  let current = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    max = Math.max(max, current);
  }

  return max;
}
```

---

#### 8. Valid Parentheses ⭐⭐⭐⭐

**Pattern:** Stack

**Input:**
```javascript
str = "()[]{}";
```

**Output:**
```javascript
true;
```

**Solution:**
```javascript
function isValid(str) {
  const stack = [];

  const map = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const ch of str) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else if (ch === ")" || ch === "]" || ch === "}") {
      if (stack.pop() !== map[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

---

#### 9. Product Of Array Except Self ⭐⭐⭐⭐

**Pattern:** Prefix + Suffix

**Important Concept:**
```text
Store First → Then Multiply
```

**Input:**
```javascript
nums = [1, 2, 3, 4];
```

**Output:**
```javascript
[24, 12, 8, 6];
```

**Solution:**
```javascript
function productExceptSelf(nums) {
  const result = new Array(nums.length).fill(1);

  let prefix = 1;

  for (let i = 0; i < nums.length; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  let suffix = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}
```

---

#### 10. Merge Two Sorted Arrays ⭐⭐⭐⭐

**Pattern:** Two Pointers

**Input:**
```javascript
arr1 = [1, 3, 5];
arr2 = [2, 4, 6];
```

**Output:**
```javascript
[1, 2, 3, 4, 5, 6];
```

**Solution:**
```javascript
function mergeSortedArrays(arr1, arr2) {
  let i = 0;
  let j = 0;

  const result = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      result.push(arr1[i++]);
    } else {
      result.push(arr2[j++]);
    }
  }

  while (i < arr1.length) result.push(arr1[i++]);
  while (j < arr2.length) result.push(arr2[j++]);

  return result;
}
```

---

#### 11. Flatten Nested Array ⭐⭐⭐⭐⭐

**Pattern:** Recursion

**Input:**
```javascript
arr = [1, [2, [3, 4], 5], 6];
```

**Output:**
```javascript
[1, 2, 3, 4, 5, 6];
```

**Solution:**
```javascript
function flatten(arr) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item));
    } else {
      result.push(item);
    }
  }

  return result;
}
```

**ES6 Alternative:**
```javascript
arr.flat(Infinity);
```

---

#### 12. Group Anagrams ⭐⭐⭐⭐

**Pattern:** HashMap

**Input:**
```javascript
words = ["eat", "tea", "tan", "ate", "nat", "bat"];
```

**Output:**
```javascript
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]];
```

**Solution:**
```javascript
function groupAnagrams(words) {
  const map = {};

  for (const word of words) {
    const key = word.split("").sort().join("");

    if (!map[key]) {
      map[key] = [];
    }

    map[key].push(word);
  }

  return Object.values(map);
}
```

---

### JavaScript Core Section

---

#### 13. Closure ⭐⭐⭐⭐⭐

**Solution:**
```javascript
function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}

const counter = outer();

console.log(counter());
console.log(counter());
```

**Interview Answer:**
```text
Inner function remembers variables from outer scope even after outer function finishes execution.
```

---

#### 14. Debounce ⭐⭐⭐⭐⭐

**Solution:**
```javascript
function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

**Use Cases:**
```text
Search API, Button Click, Input Field
```

---

#### 15. Throttle ⭐⭐⭐⭐⭐

**Solution:**
```javascript
function throttle(fn, delay) {
  let canRun = true;

  return function (...args) {
    if (!canRun) return;

    fn.apply(this, args);

    canRun = false;

    setTimeout(() => {
      canRun = true;
    }, delay);
  };
}
```

**Use Cases:**
```text
Scroll Event, GPS Updates, Resize Event
```

---

#### 16. Promise APIs ⭐⭐⭐⭐⭐

**Promise.all()**
```text
All success required. One failure = fail
```

**Promise.allSettled()**
```text
Waits for all. Returns success and failure
```

**Promise.race()**
```text
Returns first settled promise
```

**Promise.any()**
```text
Returns first successful promise. Ignores failures.
```

---

#### 17. Event Loop ⭐⭐⭐⭐⭐

**Input:**
```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

**Output:**
```text
1
4
3
2
```

**Remember:**
```text
Sync Code
↓
Microtask Queue (Promise)
↓
Macrotask Queue (setTimeout)
```

---

#### 18. Object / Array Transformation ⭐⭐⭐⭐⭐

**Array → Object**
```javascript
function convert(users) {
  return users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
}
```

**Object → Array**
```javascript
Object.values(usersObj);
```

**Remember:**
```text
Array → Object = reduce()
Object → Array = Object.values()
Array → Array = map()
Filter Array = filter()
Array → Single Value = reduce()
```

---

#### 19. Group By using reduce()

**Solution:**
```javascript
const grouped = users.reduce((acc, user) => {
  if (!acc[user.role]) {
    acc[user.role] = [];
  }

  acc[user.role].push(user);

  return acc;
}, {});
```

#### 20. Retry API Call

**Solution:**
```javascript
async function fetchWithRetry(url, retries = 3) {
  while (retries > 0) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch {
      retries--;
    }
  }

  throw new Error("Failed");
}
```

---

### React Native Specific Programs

#### 21. FlatList with API Fetch & Refresh
**Scenario:** Fetch a list of products on mount, handle loading/error states, and implement Pull-to-Refresh.
**Solution:**
```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';

export default function ProductList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const json = await response.json();
      setData(json.products);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  if (loading) return <ActivityIndicator size="large" style={styles.center} />;
  if (error) return <Text style={styles.center}>{error}</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text>${item.price}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 16, fontWeight: 'bold' }
});
```

#### 22. 50,000 Item FlatList (Heavy Optimization)
**Scenario:** Render a massive list without dropping frames using `React.memo`, `useCallback`, and `getItemLayout`.
**Solution:**
```javascript
import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// 1. Memoized Child Component
const ListItem = React.memo(({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.row} onPress={() => onPress(item.id)}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => prevProps.item.id === nextProps.item.id);

export default function OptimizedList() {
  const [data] = useState(Array.from({ length: 50000 }, (_, i) => ({
    id: i.toString(),
    title: `Item #${i}`
  })));

  // 2. Memoized Callback
  const handlePress = useCallback((id) => {
    console.log("Pressed item:", id);
  }, []);

  // 3. Render Item Function
  const renderItem = useCallback(({ item }) => (
    <ListItem item={item} onPress={handlePress} />
  ), [handlePress]);

  // 4. GetItemLayout skips dynamic height calculations
  const getItemLayout = useCallback((data, index) => ({
    length: 50,
    offset: 50 * index,
    index,
  }), []);

  // 5. keyExtractor
  const keyExtractor = useCallback((item) => item.id, []);

  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
}

const styles = StyleSheet.create({
  row: { height: 50, justifyContent: 'center', paddingHorizontal: 15, borderBottomWidth: 1 }
});
```

---

### Time Complexity Cheat Sheet ⭐⭐⭐⭐⭐

| Complexity | Meaning     | Example             |
| ---------- | ----------- | ------------------- |
| O(1)       | Constant    | Array Access        |
| O(log n)   | Logarithmic | Binary Search       |
| O(n)       | Linear      | Single Loop         |
| O(n log n) | Log Linear  | Merge Sort          |
| O(n²)      | Quadratic   | Nested Loops        |
| O(2ⁿ)      | Exponential | Recursive Fibonacci |
| O(n!)      | Factorial   | Permutations        |

#### 23. Binary Search ⭐⭐⭐
**Pattern:** Binary Search

**Input:**
```javascript
nums = [1, 2, 3, 4, 5, 6];
target = 4;
```

**Output:**
```javascript
3
```

**Solution:**
```javascript
function binarySearch(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
}
```

#### 24. Bit Manipulation (Single Number) ⭐⭐
**Pattern:** XOR

**Input:**
```javascript
[2, 2, 1]
```

**Output:**
```javascript
1
```

**Solution:**
```javascript
function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}
```

#### 25. Matrix Traversal ⭐⭐
**Pattern:** Nested Loops

**Input:**
```javascript
[
  [1, 2],
  [3, 4]
]
```

**Output:**
```javascript
1
2
3
4
```

**Solution:**
```javascript
function traverse(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      console.log(matrix[row][col]);
    }
  }
}
```

#### 26. Third Largest Number ⭐⭐
**Pattern:** Set & Sort

**Input:**
```javascript
[10, 5, 20, 8, 15]
```

**Output:**
```javascript
15
```

**Solution:**
```javascript
const arr = [10, 5, 20, 8, 15];
const result = [...new Set(arr)].sort((a, b) => b - a)[2];
console.log(result);
```

#### 27. Prefix Sum ⭐⭐
**Pattern:** Accumulator Array

**Input:**
```javascript
[3, 5, 4, 2, 7, 9]
```

**Output:**
```javascript
[3, 8, 12, 14, 21, 30]
```

**Solution:**
```javascript
function prefixSum(arr) {
  let sum = 0;
  const result = [];

  for (const num of arr) {
    sum += num;
    result.push(sum);
  }

  return result;
}
```

#### 28. Range Sum Query ⭐⭐⭐
**Pattern:** Prefix Sum Array

**Input:**
```javascript
nums = [-2, 0, 3, -5, 2, -1];
left = 1;
right = 5;
```

**Output:**
```javascript
-1
```

**Solution:**
```javascript
class NumArray {
  constructor(nums) {
    this.prefix = [...nums];

    for (let i = 1; i < this.prefix.length; i++) {
      this.prefix[i] += this.prefix[i - 1];
    }
  }

  sumRange(left, right) {
    if (left === 0) return this.prefix[right];
    return this.prefix[right] - this.prefix[left - 1];
  }
}
```

#### 29. Subarray Sum Equals K ⭐⭐⭐⭐
**Pattern:** Prefix Sum + HashMap

**Input:**
```javascript
nums = [1, -1, 0];
k = 0;
```

**Output:**
```javascript
3
```

**Solution:**
```javascript
function subarraySum(nums, k) {
  let count = 0;
  let prefix = 0;

  const map = new Map();
  map.set(0, 1);

  for (const num of nums) {
    prefix += num;

    count += map.get(prefix - k) || 0;

    map.set(prefix, (map.get(prefix) || 0) + 1);
  }

  return count;
}
```


---

### Array, String & Object Methods Quick Review

**Array Methods:**
- `map()`: Transforms every element (`[1, 2].map(x => x*2)` ➡️ `[2, 4]`)
- `filter()`: Keeps elements matching condition (`[1, 2].filter(x => x>1)` ➡️ `[2]`)
- `reduce()`: Converts array to single value (`[1, 2].reduce((a,b) => a+b, 0)` ➡️ `3`)
- `find()` / `findIndex()`: Returns first match / index.
- `sort()`: Sorts array (`arr.sort((a,b) => a-b)`)

**String Methods:**
- `split(",")`: Converts string to array (`"a,b".split(",")` ➡️ `["a", "b"]`)
- `join(",")`: Converts array to string (`["a", "b"].join(",")` ➡️ `"a,b"`)
- `slice(0,4)`: Extracts part of string/array.
- `includes("a")`: Checks if value exists.

**Object Methods:**
- `Object.keys(obj)`: Returns `["name", "age"]`
- `Object.values(obj)`: Returns `["Rajeev", 30]`
- `Object.entries(obj)`: Returns `[["name", "Rajeev"], ["age", 30]]`

**Most Asked One-Liners:**
```javascript
[...new Set(arr)] // Remove Duplicates
str.split("").reverse().join("") // String Reverse
Array.isArray(arr) // Check Array
[...arr1, ...arr2] // Merge Arrays
```

---

### JavaScript Promise Examples (Top 12)

**1. Basic Promise**
```javascript
const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) resolve("Success");
  else reject("Failed");
});
promise.then(res => console.log(res)).catch(err => console.log(err)); // Output: Success
```

**2. Promise with setTimeout**
```javascript
const promise = new Promise((resolve) => {
  setTimeout(() => resolve("Data Loaded"), 2000);
});
promise.then(console.log); // Output after 2s: Data Loaded
```

**3. Promise Chaining**
```javascript
Promise.resolve(2)
  .then(num => num * 2)
  .then(num => num * 3)
  .then(console.log); // Output: 12
```

**4. Promise.all()** (All success required)
```javascript
Promise.all([Promise.resolve("A"), Promise.resolve("B")])
  .then(console.log); // Output: ["A", "B"]
```

**5. Promise.all() Failure** (One fails, all fail)
```javascript
Promise.all([Promise.resolve("A"), Promise.reject("Error")])
  .catch(console.log); // Output: Error
```

**6. Promise.allSettled()** (Returns success and failure)
```javascript
Promise.allSettled([Promise.resolve("A"), Promise.reject("Error")])
  .then(console.log); 
// Output: [{status: "fulfilled", value: "A"}, {status: "rejected", reason: "Error"}]
```

**7. Promise.race()** (First settled promise wins)
```javascript
const p1 = new Promise(res => setTimeout(() => res("First"), 1000));
const p2 = new Promise(res => setTimeout(() => res("Second"), 2000));
Promise.race([p1, p2]).then(console.log); // Output: First
```

**8. Promise.any()** (First successful promise wins, ignores errors)
```javascript
const p1 = Promise.reject("Error");
const p2 = Promise.resolve("Success");
Promise.any([p1, p2]).then(console.log); // Output: Success
```

**9. Real API Example (fetch)**
```javascript
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => res.json())
  .then(user => console.log(user.name))
  .catch(err => console.log(err));
```

**10. Same API using async/await**
```javascript
async function fetchUser() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await res.json();
    console.log(user.name);
  } catch (error) {
    console.log(error);
  }
}
fetchUser();
```

---

> 🎯 **Topic:** 🧠 1-Hour Daily Theory Routine (React Native & JS)
> 📊 **Difficulty:** Hard | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---

## Section 2: 🧠 1-Hour Daily Theory Routine (React Native, JS/TS, Architecture)

*⏱️ 60 min theory revision*

Revise these high-impact Q&As. These questions dictate whether an interviewer grades you as a Mid-level or a Lead/Senior developer.

### 1. JavaScript & TypeScript Core

**Q: Explain the Event Loop and the difference between Microtasks and Macrotasks.**
* **Answer:** JavaScript is single-threaded. The Event Loop monitors the Call Stack and the Callback Queues.
  * **Microtask Queue** has higher priority. It processes `Promises` (`.then`/`.catch`/`.finally`) and `MutationObserver`.
  * **Macrotask Queue** has lower priority. It processes `setTimeout`, `setInterval`, and DOM events.
  * *Rule:* The Event Loop will execute *all* microtasks before moving on to the next macrotask.

**Q: What is a Closure? Where do you use it?**
* **Answer:** A closure is a function that remembers the variables from its lexical scope, even after the outer function has finished executing. We use closures to implement data privacy (encapsulating state) and to build utility functions like `debounce` or `throttle`.

**Q: In TypeScript, what is the difference between an `interface` and a `type`?**
* **Answer:** Both can define the shape of objects. However, an `interface` can be re-declared to merge properties (Declaration Merging), making it ideal for libraries. A `type` alias cannot be re-opened, but it can represent union types (`type Status = 'success' | 'fail'`), tuples, and complex mapped utility types (`Pick`, `Omit`, `Partial`).

---

### 2. React Native Core Architecture

**Q: Explain the Legacy Architecture vs the New Architecture (Fabric & TurboModules).**
* **Answer:** 
  * **Legacy:** The JS thread and Native threads communicate asynchronously by serializing data into JSON strings and sending them over a "Bridge". This serialization causes major bottlenecks (dropped frames) during heavy events like animations or scrolling.
  * **New Architecture:** Uses **JSI (JavaScript Interface)**. JSI allows the JS engine to hold references directly to C++ objects. This means JavaScript can invoke native methods synchronously—*no JSON serialization, no asynchronous Bridge overhead*.
    * *Fabric:* The new synchronous UI rendering system.
    * *TurboModules:* Native modules that are lazily loaded into memory only when needed, vastly improving app startup time.

**Q: What is the Hermes Engine?**
* **Answer:** Hermes is a JavaScript engine explicitly optimized for React Native. Unlike older engines (JSC) that parse and Just-In-Time (JIT) compile JS on the device, Hermes uses **AOT (Ahead of Time) compilation**. It compiles the JS bundle into bytecode during the build process. This leads to drastically faster TTI (Time to Interactive), a smaller memory footprint, and a smaller APK/IPA size.

---

### 3. Optimization & Memory Leaks

**Q: How do you track down and fix Memory Leaks in React Native?**
* **Answer:** A memory leak occurs when an object is no longer needed but cannot be garbage-collected because it's still being referenced.
  1. **Unmounted Components:** Running `setState()` after a component unmounts. *Fix:* Cleanup API calls and use an `isMounted` flag in `useEffect` cleanup.
  2. **Event Listeners:** Forgetting to remove `AppState`, `BackHandler`, or `Keyboard` listeners. *Fix:* Always return a `.remove()` call in the `useEffect` cleanup function.
  3. **Timers:** Leaving `setInterval` running in the background. *Fix:* `clearInterval` on unmount.
  4. **Closures:** Keeping references to huge data sets inside a closure.

**Q: What is the difference between `useMemo` and `useCallback`?**
* **Answer:** Both are optimization hooks. 
  * `useMemo` caches the **result** of an expensive calculation. It only recalculates if dependencies change.
  * `useCallback` caches the **reference to a function**. In React, functions are recreated on every render. If you pass a function as a prop to a child wrapped in `React.memo`, the child will unnecessarily re-render unless you wrap the function in `useCallback`.

---

### 4. State Management (Redux RTK & Zustand)

**Q: Why migrate from legacy Redux to Redux Toolkit (RTK) or Zustand?**
* **Answer:**
  * **Legacy Redux:** Too much boilerplate (actions, types, reducers in separate files) and requires complex third-party tools for async logic (`redux-saga` / `redux-thunk`). State mutation bugs are common.
  * **Redux Toolkit (RTK):** Combines everything into `createSlice`. Uses `Immer.js` under the hood to allow safe "mutation" syntax. Built-in `createAsyncThunk` handles API loading states automatically.
  * **Zustand:** Ultra-minimalist. Zero boilerplate. No Context providers wrapping the app. Uses hooks directly. Resolves the "zombie child" re-render issue found in Redux.

---

### 5. Security & App Size

**Q: How do you secure sensitive data like Auth Tokens in React Native?**
* **Answer:** **Never** use `AsyncStorage` for sensitive data, as it is stored in plain text and can be extracted from rooted/jailbroken devices. Always use native secure storage APIs (iOS Keychain and Android Keystore) via libraries like `react-native-keychain` or `react-native-encrypted-storage`.

**Q: What is SSL Certificate Pinning and why is it important?**
* **Answer:** SSL Pinning prevents Man-In-The-Middle (MITM) attacks. By default, an OS trusts a wide range of root certificates. An attacker can install a proxy certificate (like Charles Proxy) to read API payloads. SSL Pinning hardcodes the server's exact SSL certificate (or public key) inside the app, forcing the app to reject connections if the certificate is spoofed.

**Q: Your Android app size is too large (100MB+). How do you reduce it?**
* **Answer:**
  1. **Use Android App Bundles (.aab):** Instead of a fat `.apk` containing assets for all device architectures, building an `.aab` lets the Google Play Store generate an optimized APK just for the user's specific device model.
  2. **Enable ProGuard / R8:** Strips out unused Java/Kotlin code and minifies native dependencies.
  3. **Enable Hermes:** Shrinks the JavaScript payload.
  4. **Optimize Assets:** Use `.webp` or SVG icons instead of high-res `.png` files.

---

### 6. CodePush & CI/CD

**Q: How does CodePush (Over The Air Updates) work? What are its limitations?**
* **Answer:** CodePush allows developers to deploy mobile app updates instantly, bypassing the App Store / Play Store review process. It works by sending the updated JavaScript bundle (`index.android.bundle`) and assets to a remote server. The app silently downloads this payload in the background and swaps it out on the next launch.
  * *Limitation:* CodePush **only** updates JavaScript and image assets. If you install a new NPM library that requires Native linking (changes to Android `build.gradle` or iOS `Podfile`), you **must** submit a new binary to the App Stores.
