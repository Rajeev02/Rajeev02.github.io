# Daily Revision

## Table of Contents

- [Section 1: 💻 1-Hour Daily Coding Routine (HackerRank Prep)](#section-1-1-hour-daily-coding-routine-hackerrank-prep)
- [Section 2: 🧠 1-Hour Daily Theory Routine (React Native & JS)](#section-2-1-hour-daily-theory-routine-react-native-js)


---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | 💻 1-Hour Daily Coding Routine (HackerRank Prep) |
| **Difficulty** | Medium |
| **Interview Frequency** | High |
| **Tags** | 🔥 Must Revise |

---

## Section 1: 💻 1-Hour Daily Coding Routine (HackerRank Prep)

*⏱️ 45 min read*

# HackerRank Preparation Guide

### Senior React Native Developer (9 Years Experience)

---

# Interview Strategy

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

# Must Know JavaScript Methods

```javascript
map();
filter();
reduce();
find();
findIndex();
sort();
split();
join();
slice();
substring();
includes();
Object.keys();
Object.values();
Object.entries();
```

---

# Must Know Data Structures

```javascript
Object {}
Map
Set
Array
Stack
Queue
```

---

# DSA SECTION

---

### 1. Two Sum ⭐⭐⭐⭐⭐

Pattern: HashMap

Input:

```javascript
nums = [2, 7, 11, 15];
target = 9;
```

Output:

```javascript
[0, 1];
```

Solution:

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

Complexity:

```text
Time: O(n)
Space: O(n)
```

---

### 2. Contains Duplicate ⭐⭐⭐⭐⭐

Pattern: Set

Input:

```javascript
nums = [1, 2, 3, 1];
```

Output:

```javascript
true;
```

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

### 3. Valid Anagram ⭐⭐⭐⭐⭐

Pattern: HashMap

Input:

```javascript
s = "anagram";
t = "nagaram";
```

Output:

```javascript
true;
```

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

### 4. First Non-Repeating Character ⭐⭐⭐⭐⭐

Pattern: Frequency Count

Input:

```javascript
str = "leetcode";
```

Output:

```javascript
"l";
```

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

### 5. Move Zeroes ⭐⭐⭐⭐

Pattern: Two Pointers

Input:

```javascript
nums = [0, 1, 0, 3, 12];
```

Output:

```javascript
[1, 3, 12, 0, 0];
```

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

### 6. Longest Substring Without Repeating Characters ⭐⭐⭐⭐⭐

Pattern: Sliding Window

Input:

```javascript
str = "abcabcbb";
```

Output:

```javascript
3; // "abc"
```

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

Key Formula:

```javascript
windowLength = right - left + 1;
```

---

### 7. Maximum Subarray Sum (Kadane) ⭐⭐⭐⭐

Pattern: Dynamic Running Sum

Input:

```javascript
nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
```

Output:

```javascript
6; // [4,-1,2,1]
```

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

### 8. Valid Parentheses ⭐⭐⭐⭐

Pattern: Stack

Input:

```javascript
str = "()[]{}";
```

Output:

```javascript
true;
```

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

### 9. Product Of Array Except Self ⭐⭐⭐⭐

Pattern: Prefix + Suffix

Important Concept:

```text
Store First → Then Multiply
```

Input:

```javascript
nums = [1, 2, 3, 4];
```

Output:

```javascript
[24, 12, 8, 6];
```

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

### 10. Merge Two Sorted Arrays ⭐⭐⭐⭐

Pattern: Two Pointers

Input:

```javascript
arr1 = [1, 3, 5];
arr2 = [2, 4, 6];
```

Output:

```javascript
[1, 2, 3, 4, 5, 6];
```

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

### 11. Flatten Nested Array ⭐⭐⭐⭐⭐

Pattern: Recursion

Input:

```javascript
arr = [1, [2, [3, 4], 5], 6];
```

Output:

```javascript
[1, 2, 3, 4, 5, 6];
```

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

ES6:

```javascript
arr.flat(Infinity);
```

---

### 12. Group Anagrams ⭐⭐⭐⭐

Pattern: HashMap

Input:

```javascript
words = ["eat", "tea", "tan", "ate", "nat", "bat"];
```

Output:

```javascript
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]];
```

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

# JavaScript Core Section

---

### 13. Closure ⭐⭐⭐⭐⭐

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

Interview Answer:

```text
Inner function remembers variables from outer scope even after outer function finishes execution.
```

---

### 14. Debounce ⭐⭐⭐⭐⭐

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

Use Cases:

```text
Search API
Button Click
Input Field
```

---

### 15. Throttle ⭐⭐⭐⭐⭐

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

Use Cases:

```text
Scroll Event
GPS Updates
Resize Event
```

---

### 16. Promise APIs ⭐⭐⭐⭐⭐

Promise.all()

```text
All success required
One failure = fail
```

Promise.allSettled()

```text
Waits for all
Returns success and failure
```

Promise.race()

```text
Returns first settled promise
```

Promise.any()

```text
Returns first successful promise
Ignores failures
```

---

### 17. Event Loop ⭐⭐⭐⭐⭐

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

Output:

```text
1
4
3
2
```

Remember:

```text
Sync Code
↓
Microtask Queue (Promise)
↓
Macrotask Queue (setTimeout)
```

---

### 18. Object / Array Transformation ⭐⭐⭐⭐⭐

Array → Object

```javascript
function convert(users) {
  return users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
}
```

Object → Array

```javascript
Object.values(usersObj);
```

Remember:

```text
Array → Object = reduce()
Object → Array = Object.values()
Array → Array = map()
Filter Array = filter()
Array → Single Value = reduce()
```

---

### 19. Group By using reduce()

```javascript
const grouped = users.reduce((acc, user) => {
  if (!acc[user.role]) {
    acc[user.role] = [];
  }

  acc[user.role].push(user);

  return acc;
}, {});
```

### 20. Retry API Call

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

# FINAL 15 QUESTIONS TO MEMORIZE

1. Two Sum
2. Contains Duplicate
3. Valid Anagram
4. First Non-Repeating Character
5. Longest Substring Without Repeating Characters
6. Move Zeroes
7. Maximum Subarray Sum
8. Valid Parentheses
9. Product Except Self
10. Merge Two Sorted Arrays
11. Flatten Nested Array
12. Group Anagrams
13. Closure
14. Debounce
15. Throttle

---

# FINAL 5 JAVASCRIPT TOPICS

1. Promise.all()
2. Promise.allSettled()
3. Promise.race()
4. Event Loop
5. map/filter/reduce

---

# Expected Patterns

High Probability:

```text
HashMap
Set
Sliding Window
Stack
Two Pointers
Array Transformations
JavaScript Fundamentals
```

Low Probability:

```text
Graph
Tree
Trie
Advanced Dynamic Programming
Dijkstra
Topological Sort
```

If you can code and explain all topics in this document from memory, you're prepared for the vast majority of React Native / Frontend-oriented HackerRank coding assessments.

# Time Complexity Cheat Sheet ⭐⭐⭐⭐⭐

Interviewers often ask:

```text
What is the time complexity?
What is the space complexity?
Can you optimize it?
```

| Complexity | Meaning     | Example             |
| ---------- | ----------- | ------------------- |
| O(1)       | Constant    | Array Access        |
| O(log n)   | Logarithmic | Binary Search       |
| O(n)       | Linear      | Single Loop         |
| O(n log n) | Log Linear  | Merge Sort          |
| O(n²)      | Quadratic   | Nested Loops        |
| O(2ⁿ)      | Exponential | Recursive Fibonacci |
| O(n!)      | Factorial   | Permutations        |

---

### Binary Search ⭐⭐⭐

Question:

Given a sorted array and a target value, return its index.

Input:

```javascript
nums = [1, 2, 3, 4, 5, 6];
target = 4;
```

Output:

```javascript
3;
```

Pattern:

```text
Binary Search
```

Solution:

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

Complexity:

```text
Time: O(log n)
Space: O(1)
```

---

### Bit Manipulation (Single Number) ⭐⭐

Question:

Find the number that appears only once.

Input:

```javascript
[2, 2, 1];
```

Output:

```javascript
1;
```

Pattern:

```text
XOR
```

Remember:

```javascript
a ^ a = 0
a ^ 0 = a
```

Solution:

```javascript
function singleNumber(nums) {
  let result = 0;

  for (const num of nums) {
    result ^= num;
  }

  return result;
}
```

Complexity:

```text
Time: O(n)
Space: O(1)
```

---

### Matrix Traversal ⭐⭐

Question:

Traverse matrix row by row.

Input:

```javascript
[
  [1, 2],
  [3, 4],
];
```

Output:

```javascript
1;
2;
3;
4;
```

Pattern:

```text
Nested Loops
```

Solution:

```javascript
function traverse(matrix) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      console.log(matrix[row][col]);
    }
  }
}
```

Complexity:

```text
Time: O(rows × cols)
Space: O(1)
```

1. Two Sum
2. Contains Duplicate
3. Valid Anagram
4. First Non-Repeating Character
5. Move Zeroes
6. Longest Substring
7. Maximum Subarray
8. Valid Parentheses
9. Product Except Self
10. Merge Two Sorted Arrays
11. Binary Search
12. Flatten Nested Array
13. Group Anagrams
14. Single Number (XOR)
15. Matrix Traversal

For a JavaScript/React Native interview, you don't need full programs for these. Just remember **what they do + one small example**.

# Array Methods

### 1. map()

Used to transform every element.

```javascript
const nums = [1, 2, 3];

const result = nums.map((num) => num * 2);

console.log(result);
// [2, 4, 6]
```

---

### 2. filter()

Used to keep elements that match a condition.

```javascript
const nums = [1, 2, 3, 4, 5];

const result = nums.filter((num) => num > 3);

console.log(result);
// [4, 5]
```

---

### 3. reduce()

Used to convert an array into a single value.

```javascript
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
// 10
```

---

### 4. find()

Returns first matching element.

```javascript
const users = [{ id: 1 }, { id: 2 }];

const user = users.find((u) => u.id === 2);

console.log(user);
// { id: 2 }
```

---

### 5. findIndex()

Returns index of first matching element.

```javascript
const nums = [10, 20, 30];

const index = nums.findIndex((num) => num === 20);

console.log(index);
// 1
```

---

### 6. sort()

Sorts array.

```javascript
const nums = [5, 1, 3, 2];

nums.sort((a, b) => a - b);

console.log(nums);
// [1, 2, 3, 5]
```

---

# String Methods

### 7. split()

Converts string into array.

```javascript
const str = "apple,banana,mango";

const result = str.split(",");

console.log(result);
// ["apple", "banana", "mango"]
```

---

### 8. join()

Converts array into string.

```javascript
const arr = ["apple", "banana", "mango"];

const result = arr.join(",");

console.log(result);
// apple,banana,mango
```

---

### 9. slice()

Extracts part of string/array.

```javascript
const str = "JavaScript";

console.log(str.slice(0, 4));
// Java
```

```javascript
const arr = [1, 2, 3, 4, 5];

console.log(arr.slice(1, 4));
// [2,3,4]
```

---

### 10. substring()

```javascript
const str = "JavaScript";

console.log(str.substring(0, 4));
// Java
```

---

### 11. includes()

Checks if value exists.

```javascript
const arr = [1, 2, 3];

console.log(arr.includes(2));
// true
```

```javascript
const str = "Hello World";

console.log(str.includes("World"));
// true
```

---

# Object Methods

### 12. Object.keys()

```javascript
const user = {
  name: "Rajeev",
  age: 30,
};

console.log(Object.keys(user));

// ["name", "age"]
```

---

### 13. Object.values()

```javascript
const user = {
  name: "Rajeev",
  age: 30,
};

console.log(Object.values(user));

// ["Rajeev", 30]
```

---

### 14. Object.entries()

```javascript
const user = {
  name: "Rajeev",
  age: 30,
};

console.log(Object.entries(user));

// [["name","Rajeev"],["age",30]]
```

---

# Must Know Data Structures

### 1. Object {}

Key-Value storage.

```javascript
const user = {
  name: "Rajeev",
  age: 30,
};

console.log(user.name);
// Rajeev
```

Use when:

- JSON response
- User data
- Configurations

---

### 2. Map

Any type can be key.

```javascript
const map = new Map();

map.set("name", "Rajeev");
map.set(1, "One");

console.log(map.get("name"));
// Rajeev
```

Interview Question:

```javascript
const map = new Map();

map.set("a", 1);
map.set("a", 2);

console.log(map.get("a"));
// 2
```

---

### 3. Set

Stores unique values.

```javascript
const set = new Set([1, 2, 2, 3]);

console.log(set);

// {1,2,3}
```

Remove duplicates:

```javascript
const nums = [1, 2, 2, 3, 4, 4];

const unique = [...new Set(nums)];

console.log(unique);

// [1,2,3,4]
```

---

### 4. Array

Most commonly used.

```javascript
const fruits = ["Apple", "Banana"];

fruits.push("Mango");

console.log(fruits);

// ["Apple","Banana","Mango"]
```

---

### 5. Stack (LIFO)

Last In First Out.

```javascript
const stack = [];

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.pop());
// 30
```

Think:

- Undo operation
- Browser back button

---

### 6. Queue (FIFO)

First In First Out.

```javascript
const queue = [];

queue.push(10);
queue.push(20);
queue.push(30);

console.log(queue.shift());
// 10
```

Think:

- Ticket counter
- Task processing

---

# Most Asked Interview One-Liners

```javascript
// Remove Duplicates
[...new Set(arr)]

// String Reverse
str.split("").reverse().join("")

// Array Sum
arr.reduce((a,b) => a+b, 0)

// Check Array
Array.isArray(arr)

// Object to Array
Object.entries(obj)

// Array to String
arr.join(",")

// String to Array
str.split(",")

// Merge Arrays
[...arr1, ...arr2]

// Copy Array
[...arr]

// Copy Object
{...obj}
```

If your HackerRank round is for a React Native developer, these methods plus:

- Closures
- Hoisting
- Promises
- async/await
- Debounce
- Throttle
- Event Loop
- Set vs Map
- Contains Duplicate
- Two Sum
- Valid Parentheses
- Reverse String
- Palindrome

cover about **80–90% of typical JavaScript coding questions**.

====

Here are the most common **JavaScript Promise examples** asked in interviews.

---

# 1. Basic Promise

```js
const promise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve("Success");
  } else {
    reject("Failed");
  }
});

promise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

Output:

```js
Success;
```

---

# 2. Promise with setTimeout

```js
const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Data Loaded");
  }, 2000);
});

promise.then((data) => {
  console.log(data);
});
```

Output after 2 seconds:

```js
Data Loaded
```

---

# 3. Promise Reject Example

```js
const promise = new Promise((resolve, reject) => {
  reject("Something went wrong");
});

promise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

Output:

```js
Something went wrong
```

---

# 4. Promise Chaining

```js
Promise.resolve(2)
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((num) => console.log(num));
```

Output:

```js
12;
```

Flow:

```text
2
↓
4
↓
12
```

---

# 5. Async/Await with Promise

```js
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("User Data");
    }, 1000);
  });
}

async function fetchData() {
  const result = await getData();
  console.log(result);
}

fetchData();
```

Output:

```js
User Data
```

---

# 6. Promise.all()

Runs all promises in parallel.

```js
const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

Promise.all([p1, p2, p3]).then((result) => console.log(result));
```

Output:

```js
["A", "B", "C"];
```

---

# 7. Promise.all() Failure

```js
const p1 = Promise.resolve("A");
const p2 = Promise.reject("Error");
const p3 = Promise.resolve("C");

Promise.all([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

Output:

```js
Error;
```

If one fails, entire `Promise.all()` fails.

---

# 8. Promise.allSettled()

Returns all results whether success or failure.

```js
const p1 = Promise.resolve("A");
const p2 = Promise.reject("Error");

Promise.allSettled([p1, p2]).then((result) => console.log(result));
```

Output:

```js
[
  { status: "fulfilled", value: "A" },
  { status: "rejected", reason: "Error" },
];
```

---

# 9. Promise.race()

Returns the first settled promise.

```js
const p1 = new Promise((resolve) => setTimeout(() => resolve("First"), 1000));

const p2 = new Promise((resolve) => setTimeout(() => resolve("Second"), 2000));

Promise.race([p1, p2]).then((result) => console.log(result));
```

Output:

```js
First;
```

---

# 10. Promise.any()

Returns the first successful promise.

```js
const p1 = Promise.reject("Error");
const p2 = Promise.resolve("Success");
const p3 = Promise.resolve("Hello");

Promise.any([p1, p2, p3]).then((result) => console.log(result));
```

Output:

```js
Success;
```

---

# 11. Real API Example

```js
function fetchUser() {
  return fetch("https://jsonplaceholder.typicode.com/users/1").then(
    (response) => response.json(),
  );
}

fetchUser()
  .then((user) => console.log(user.name))
  .catch((error) => console.log(error));
```

---

# 12. Same API using async/await

```js
async function fetchUser() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );

    const user = await response.json();

    console.log(user.name);
  } catch (error) {
    console.log(error);
  }
}

fetchUser();
```

---

# Interview Questions

### What are the states of a Promise?

```text
Pending
Fulfilled (Resolved)
Rejected
```

---

### Can a Promise change state after resolve/reject?

```js
const p = new Promise((resolve, reject) => {
  resolve("Success");
  reject("Error");
});
```

Output:

```js
Success;
```

Only the first state counts.

---

### Difference between Promise.all and Promise.allSettled?

```text
Promise.all
❌ Fails if any promise fails

Promise.allSettled
✅ Returns all results
```

---

### Difference between Promise.race and Promise.any?

```text
Promise.race
Returns first settled promise
(success OR failure)

Promise.any
Returns first successful promise
```

---

### Promise Interview Cheat Sheet

```text
then()         -> Success
catch()        -> Error
finally()      -> Always runs

Promise.all()        -> All success required
Promise.allSettled() -> Get all results
Promise.race()       -> First settled wins
Promise.any()        -> First success wins

async/await -> Cleaner syntax for promises
```

---

| Attribute | Details |
| :--- | :--- |
| **Topic Name** | 🧠 1-Hour Daily Theory Routine (React Native & JS) |
| **Difficulty** | Hard |
| **Interview Frequency** | High |
| **Tags** | 🔥 Must Revise |

---

## Section 2: 🧠 1-Hour Daily Theory Routine (React Native & JS)

*⏱️ 45 min read*

If you have exactly **1 hour** before a system design or core theory interview, focus purely on these high-yield topics. These are the areas where Senior/Lead candidates are most rigorously tested.

### Top 5 JavaScript/TypeScript Concepts

1. **The Event Loop & Call Stack**
   - *Microtasks* (Promises) vs *Macrotasks* (setTimeout). Know the execution order backwards and forwards.
2. **Closures, Hoisting & Execution Context**
   - Understand how functions trap their lexical environment and how `var` vs `let/const` behave.
3. **Advanced Promises**
   - Know exactly when to use `Promise.all` (fast fail) vs `Promise.allSettled` (resilient fetching).
4. **Debouncing vs Throttling**
   - Be able to code a `debounce` function from scratch (closures + `setTimeout`).
5. **TypeScript Utility Types**
   - Understand `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, and `Record<K, V>`. Know the difference between `interface` and `type`.

### Top 7 React Native Architecture & Performance Concepts

1. **Legacy vs New Architecture (Fabric & TurboModules)**
   - **Legacy:** The async JSON bridge. Serialization bottleneck.
   - **New:** JSI (JavaScript Interface) allowing direct synchronous C++ method invocation, skipping JSON serialization.
2. **FlatList Optimization**
   - `initialNumToRender`, `maxToRenderPerBatch`, `windowSize`, `removeClippedSubviews`, and `getItemLayout` (critical for skipping dynamic measurement).
3. **Memory Leaks**
   - State updates on unmounted components (zombie components).
   - Unregistered Event Listeners (e.g., `AppState`, back handler).
   - Retained heavy closures.
4. **Hermes Engine**
   - AOT (Ahead of Time) compilation vs JIT.
   - Faster TTI (Time to Interactive), lower memory footprint, pre-compiled bytecode.
5. **App Bundle Reduction**
   - ProGuard / R8 for Android code shrinking.
   - Using `.aab` (Android App Bundle) instead of fat `.apk`.
   - SVG / WebP images instead of heavy `.png` assets.
6. **State Management Migration**
   - Redux (Boilerplate) → RTK (Immer.js, Thunks) → Zustand (Hooks-based, zero boilerplate, no zombie children).
7. **Security Defaults**
   - **Do NOT** use AsyncStorage for secrets. Use iOS Keychain / Android Keystore.
   - Implement SSL Certificate Pinning to block MITM proxy tools (like Charles).
   - Detect Jailbreak/Rooted devices to restrict access.

### Top 3 CI/CD & Delivery Pipelines

1. **Fastlane Automation**
   - Code signing (`fastlane match`).
   - Automated beta deployments to Firebase App Distribution / TestFlight.
2. **CodePush (OTA Updates)**
   - Pushing JS bundle updates dynamically, bypassing App Store review. 
   - *Limitation:* Cannot push native iOS/Android code modifications.
3. **End-to-End Testing (Detox vs Appium)**
   - Detox is Gray-Box (runs in the app process) and synchronizes with network/animations, reducing flakiness compared to Appium (Black-Box).
