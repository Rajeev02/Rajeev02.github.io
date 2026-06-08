# 💻 Daily Coding Programs

## Page Summary
### Reading Time
`26 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Daily Coding Programs |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | 🔥 Must Revise |

---



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
<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- **DSA SECTION**
  - 1. [Two Sum ⭐⭐⭐⭐⭐](#1-two-sum-⭐⭐⭐⭐⭐)
  - 2. [Contains Duplicate ⭐⭐⭐⭐⭐](#2-contains-duplicate-⭐⭐⭐⭐⭐)
  - 3. [Valid Anagram ⭐⭐⭐⭐⭐](#3-valid-anagram-⭐⭐⭐⭐⭐)
  - 4. [First Non-Repeating Character ⭐⭐⭐⭐⭐](#4-first-non-repeating-character-⭐⭐⭐⭐⭐)
  - 5. [Move Zeroes ⭐⭐⭐⭐](#5-move-zeroes-⭐⭐⭐⭐)
  - 6. [Longest Substring Without Repeating Characters ⭐⭐⭐⭐⭐](#6-longest-substring-without-repeating-characters-⭐⭐⭐⭐⭐)
  - 7. [Maximum Subarray Sum (Kadane) ⭐⭐⭐⭐](#7-maximum-subarray-sum-kadane-⭐⭐⭐⭐)
  - 8. [Valid Parentheses ⭐⭐⭐⭐](#8-valid-parentheses-⭐⭐⭐⭐)
  - 9. [Product Of Array Except Self ⭐⭐⭐⭐](#9-product-of-array-except-self-⭐⭐⭐⭐)
  - 10. [Merge Two Sorted Arrays ⭐⭐⭐⭐](#10-merge-two-sorted-arrays-⭐⭐⭐⭐)
  - 11. [Flatten Nested Array ⭐⭐⭐⭐⭐](#11-flatten-nested-array-⭐⭐⭐⭐⭐)
  - 12. [Group Anagrams ⭐⭐⭐⭐](#12-group-anagrams-⭐⭐⭐⭐)
- **JavaScript Core Section**
  - 13. [Closure ⭐⭐⭐⭐⭐](#13-closure-⭐⭐⭐⭐⭐)
  - 14. [Debounce ⭐⭐⭐⭐⭐](#14-debounce-⭐⭐⭐⭐⭐)
  - 15. [Throttle ⭐⭐⭐⭐⭐](#15-throttle-⭐⭐⭐⭐⭐)
  - 16. [Promise APIs ⭐⭐⭐⭐⭐](#16-promise-apis-⭐⭐⭐⭐⭐)
  - 17. [Event Loop ⭐⭐⭐⭐⭐](#17-event-loop-⭐⭐⭐⭐⭐)
  - 18. [Object / Array Transformation ⭐⭐⭐⭐⭐](#18-object-/-array-transformation-⭐⭐⭐⭐⭐)
  - 19. [Group By using reduce()](#19-group-by-using-reduce)
  - 20. [Retry API Call](#20-retry-api-call)
  - 21. [Binary Search ⭐⭐⭐](#21-binary-search-⭐⭐⭐)
  - 22. [Bit Manipulation (Single Number) ⭐⭐](#22-bit-manipulation-single-number-⭐⭐)
  - 23. [Matrix Traversal ⭐⭐](#23-matrix-traversal-⭐⭐)
  - 24. [map()](#24-map)
  - 25. [filter()](#25-filter)
  - 26. [reduce()](#26-reduce)
  - 27. [find()](#27-find)
  - 28. [findIndex()](#28-findindex)
  - 29. [sort()](#29-sort)
  - 30. [split()](#30-split)
  - 31. [join()](#31-join)
  - 32. [slice()](#32-slice)
  - 33. [substring()](#33-substring)
  - 34. [includes()](#34-includes)
  - 35. [Object.keys()](#35-objectkeys)
  - 36. [Object.values()](#36-objectvalues)
  - 37. [Object.entries()](#37-objectentries)
  - 38. [Object {}](#38-object-{})
  - 39. [Map](#39-map)
  - 40. [Set](#40-set)
  - 41. [Array](#41-array)
  - 42. [Stack (LIFO)](#42-stack-lifo)
  - 43. [Queue (FIFO)](#43-queue-fifo)
- **Logical and Output Problems**
  - 44. [Output of given code](#44-output-of-given-code)
  - 45. [3rd largest number in given of an array](#45-3rd-largest-number-in-given-of-an-array)
  - 46. [How will you improve the performance during the initial of app launch](#46-how-will-you-improve-the-performance-during-the-initial-of-app-launch)
  - 47. [Given a string containing just the characters ‘(‘, ‘)’, ‘{‘, ‘}’, ‘[‘, and ‘]’, determine if the input string is valid](#47-given-a-string-containing-just-the-characters-‘‘,-‘’,-‘{‘,-‘}’,-‘[‘,-and-‘]’,-determine-if-the-input-string-is-valid)
  - 48. [PrefixSum patterns](#48-prefixsum-patterns)
  - 49. [Two Pointer patterns](#49-two-pointer-patterns)
  - 50. [Sliding window patterns](#50-sliding-window-patterns)
  - 51. [Two Sum Problem when array not sorted](#51-two-sum-problem-when-array-not-sorted)
  - 52. [Add the digit until you not get the single digit number](#52-add-the-digit-until-you-not-get-the-single-digit-number)
- **React Native Daily Life Interview Questions**
  - 53. [`FlatList` vs `ScrollView`](#53-flatlist-vs-scrollview)
  - 54. [`useMemo` vs `useCallback`](#54-usememo-vs-usecallback)
  - 55. [How do you handle Memory Leaks in React Native?](#55-how-do-you-handle-memory-leaks-in-react-native?)
  - 56. [Custom Hook Example: `useDebounce`](#56-custom-hook-example:-usedebounce)
  - 57. [React Native New Architecture](#57-react-native-new-architecture)
  - 58. [Context API vs Redux](#58-context-api-vs-redux)
</details>
<!-- INDEX_END -->

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

## 1. Two Sum ⭐⭐⭐⭐⭐

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

## 2. Contains Duplicate ⭐⭐⭐⭐⭐

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

## 3. Valid Anagram ⭐⭐⭐⭐⭐

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

## 4. First Non-Repeating Character ⭐⭐⭐⭐⭐

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

## 5. Move Zeroes ⭐⭐⭐⭐

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

## 6. Longest Substring Without Repeating Characters ⭐⭐⭐⭐⭐

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

## 7. Maximum Subarray Sum (Kadane) ⭐⭐⭐⭐

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

## 8. Valid Parentheses ⭐⭐⭐⭐

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

## 9. Product Of Array Except Self ⭐⭐⭐⭐

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

## 10. Merge Two Sorted Arrays ⭐⭐⭐⭐

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

## 11. Flatten Nested Array ⭐⭐⭐⭐⭐

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

## 12. Group Anagrams ⭐⭐⭐⭐

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

## 13. Closure ⭐⭐⭐⭐⭐

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

## 14. Debounce ⭐⭐⭐⭐⭐

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

## 15. Throttle ⭐⭐⭐⭐⭐

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

## 16. Promise APIs ⭐⭐⭐⭐⭐

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

## 17. Event Loop ⭐⭐⭐⭐⭐

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

## 18. Object / Array Transformation ⭐⭐⭐⭐⭐

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

## 19. Group By using reduce()

```javascript
const grouped = users.reduce((acc, user) => {
  if (!acc[user.role]) {
    acc[user.role] = [];
  }

  acc[user.role].push(user);

  return acc;
}, {});
```

## 20. Retry API Call

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

# Expected Interview Patterns

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

## 21. Binary Search ⭐⭐⭐

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

## 22. Bit Manipulation (Single Number) ⭐⭐

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

## 23. Matrix Traversal ⭐⭐

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

## 24. map()

Used to transform every element.

```javascript
const nums = [1, 2, 3];

const result = nums.map((num) => num * 2);

console.log(result);
// [2, 4, 6]
```

---

## 25. filter()

Used to keep elements that match a condition.

```javascript
const nums = [1, 2, 3, 4, 5];

const result = nums.filter((num) => num > 3);

console.log(result);
// [4, 5]
```

---

## 26. reduce()

Used to convert an array into a single value.

```javascript
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum);
// 10
```

---

## 27. find()

Returns first matching element.

```javascript
const users = [{ id: 1 }, { id: 2 }];

const user = users.find((u) => u.id === 2);

console.log(user);
// { id: 2 }
```

---

## 28. findIndex()

Returns index of first matching element.

```javascript
const nums = [10, 20, 30];

const index = nums.findIndex((num) => num === 20);

console.log(index);
// 1
```

---

## 29. sort()

Sorts array.

```javascript
const nums = [5, 1, 3, 2];

nums.sort((a, b) => a - b);

console.log(nums);
// [1, 2, 3, 5]
```

---

# String Methods

## 30. split()

Converts string into array.

```javascript
const str = "apple,banana,mango";

const result = str.split(",");

console.log(result);
// ["apple", "banana", "mango"]
```

---

## 31. join()

Converts array into string.

```javascript
const arr = ["apple", "banana", "mango"];

const result = arr.join(",");

console.log(result);
// apple,banana,mango
```

---

## 32. slice()

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

## 33. substring()

```javascript
const str = "JavaScript";

console.log(str.substring(0, 4));
// Java
```

---

## 34. includes()

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

## 35. Object.keys()

```javascript
const user = {
  name: "Rajeev",
  age: 30,
};

console.log(Object.keys(user));

// ["name", "age"]
```

---

## 36. Object.values()

```javascript
const user = {
  name: "Rajeev",
  age: 30,
};

console.log(Object.values(user));

// ["Rajeev", 30]
```

---

## 37. Object.entries()

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

## 38. Object {}

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

## 39. Map

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

## 40. Set

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

## 41. Array

Most commonly used.

```javascript
const fruits = ["Apple", "Banana"];

fruits.push("Mango");

console.log(fruits);

// ["Apple","Banana","Mango"]
```

---

## 42. Stack (LIFO)

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

## 43. Queue (FIFO)

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

These are the Promise concepts and examples most commonly asked in React Native, JavaScript, and frontend/mobile developer interviews.

---

# Logical and Output Problems

## 44. Output of given code

```javascript
console.log("A");

setTimeout(() => {
  console.log("B");
  
  Promise.resolve().then(() => {
    console.log("C");
  });
  
  console.log("D");
}, 0);

setTimeout(() => {
  console.log("E");
}, 0);

console.log("F");
console.log("G");

// Output: A F G B D C E
```

## 45. 3rd largest number in given of an array

## 46. How will you improve the performance during the initial of app launch

## 47. Given a string containing just the characters ‘(‘, ‘)’, ‘{‘, ‘}’, ‘[‘, and ‘]’, determine if the input string is valid
Example: “()[]{}”

```javascript
function isValid(s) {
    const stack = [];
    const pairs = {
        ")": "(",
        "}": "{",
        "]": "["
    };
    
    for (const ch of s) {
        if (pairs[ch]) {
            if (stack.length === 0 || stack.pop() !== pairs[ch]) {
                return false;
            }
        } else {
            stack.push(ch);
        }
    }
    
    return stack.length === 0;
}
```

## 48. PrefixSum patterns

```javascript
// Prefix sum array
class PrefixSum {
    calculatePrefixSum(arr) {
        const prefixSum = new Array(arr.length).fill(0);
        prefixSum[0] = arr[0];
        
        for (let i = 1; i < arr.length; i++) {
            prefixSum[i] = prefixSum[i-1] + arr[i];
        }
        return prefixSum;
    }
}

const prefixSum = new PrefixSum();
const sum = prefixSum.calculatePrefixSum([3, 5, 4, 2, 7, 9]);
console.log(sum);


// LeetCode 303 Range Sum Query - Immutable
// if it is between the indices like sum(1,5), [-2, 0, 3, -5, 2, -1]
class NumArray {
    constructor(nums) {
        this.prefixSum = [...nums];
        for (let i = 1; i < this.prefixSum.length; i++) {
            this.prefixSum[i] = this.prefixSum[i] + this.prefixSum[i-1];
        }
    }
    
    sumRange(left, right) {
        if (left === 0) {
            return this.prefixSum[right];
        }
        return this.prefixSum[right] - this.prefixSum[left-1];
    }
}


// Number of sub array having sum of k (Subarray sum equal k)
class Solution1 {
    subarraySum(nums, k) {
        let res = 0;
        let prefixSum = 0;
        const freq = { 0: 1 };
        
        for (const num of nums) {
            prefixSum += num;
            res += freq[prefixSum - k] || 0;
            freq[prefixSum] = (freq[prefixSum] || 0) + 1;
        }
        return res;
    }
}

const solution1 = new Solution1();
console.log(solution1.subarraySum([1,-1,0], 0));


// 325 Maximum Size Subarray Sum Equals k
class Solution2 {
    maximumSizeSubArray(nums, k) {
        let prefixSum = 0;
        let maxLength = 0;
        const maintainIndex = { 0: -1 };
        
        for (let i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            
            if (maintainIndex[prefixSum - k] !== undefined) {
                maxLength = Math.max(maxLength, i - maintainIndex[prefixSum - k]);
            }
            
            if (maintainIndex[prefixSum] === undefined) {
                maintainIndex[prefixSum] = i;
            }
        }
        return maxLength;
    }
}

const solution2 = new Solution2();
console.log(solution2.maximumSizeSubArray([1, -1, 5, -2, 3], 3));


// 523. Continuous Subarray Sum
class Solution3 {
    checkSubarraySum(nums, k) {
        let prefixSum = 0;
        const freq = { 0: -1 };
        
        for (let i = 0; i < nums.length; i++) {
            prefixSum += nums[i];
            const rem = prefixSum % k;
            
            if (freq[rem] !== undefined) {
                if (i - freq[rem] >= 2) {
                    return true;
                }
            } else {
                freq[rem] = i;
            }
        }
        return false;
    }
}
```

## 49. Two Pointer patterns

```javascript
// 167. Two Sum II - Input Array Is Sorted
class Solution4 {
    twoSum(numbers, target) {
        let left = 0;
        let right = numbers.length - 1;

        while (left <= right) {
            const sum = numbers[left] + numbers[right];
            if (sum === target) {
                return [left + 1, right + 1];
            } else if (sum > target) {
                right--;
            } else {
                left++;
            }
        }
        return [];
    }
}

// 15. 3Sum
function threeSum(nums) {
    nums.sort((a, b) => a - b);
    const result = [];
    const n = nums.length;
    
    if (n < 3) return result;
    
    for (let i = 0; i < n - 2; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        
        let left = i + 1;
        let right = n - 1;
        
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            
            if (sum === 0) {
                result.push([nums[i], nums[left], nums[right]]);
                
                while (left < right && nums[left] === nums[left + 1]) left++;
                while (left < right && nums[right] === nums[right - 1]) right--;
                
                left++;
                right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    return result;
}

// 11. Container With Most Water
function maximumWaterContainer(nums) {
    let left = 0;
    let right = nums.length - 1;
    let maxWater = 0;
    
    while (left < right) {
        const width = right - left;
        const height = Math.min(nums[left], nums[right]);
        maxWater = Math.max(maxWater, width * height);
        
        if (nums[left] < nums[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
}
```

## 50. Sliding window patterns

```javascript
// 3. Longest substring without repeating characters
class Solution5 {
    lengthOfLongestSubstring(s) {
        const lastSeen = {};
        let left = 0;
        let maxLength = 0;
        
        for (let right = 0; right < s.length; right++) {
            const char = s[right];
            if (lastSeen[char] !== undefined && lastSeen[char] >= left) {
                left = lastSeen[char] + 1;
            }
            lastSeen[char] = right;
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}

// 2461. Maximum Sum of Distinct Subarrays With Length K
class Solution6 {
    maximumSubarraySum(nums, k) {
        const lastSeen = new Set();
        let left = 0;
        let currentSum = 0;
        let maxSum = 0;
        
        for (let right = 0; right < nums.length; right++) {
            const value = nums[right];

            while (lastSeen.has(value)) {
                lastSeen.delete(nums[left]);
                currentSum -= nums[left];
                left++;
            }

            lastSeen.add(value);
            currentSum += value;

            while (right - left + 1 > k) {
                lastSeen.delete(nums[left]);
                currentSum -= nums[left];
                left++;
            }

            if (right - left + 1 === k) {
                maxSum = Math.max(maxSum, currentSum);
            }
        }
        return maxSum;
    }
}

// 643. Maximum Average Subarray I
class Solution7 {
    findMaxAverage(nums, k) {
        let currentSum = 0;
        let maxAverage = -Infinity;
        let left = 0;
        
        for (let right = 0; right < nums.length; right++) {
            currentSum += nums[right];
            
            if (right - left + 1 > k) {
                currentSum -= nums[left];
                left++;
            }
            
            if (right - left + 1 === k) {
                maxAverage = Math.max(maxAverage, currentSum / k);
            }
        }
        return maxAverage;
    }
}

const solution7 = new Solution7();
console.log(solution7.findMaxAverage([1,12,-5,-6,50,3], 4));
```

## 51. Two Sum Problem when array not sorted

```javascript
function twoSum(nums, target) {
    const map = {}; // value : index
    
    for (let index = 0; index < nums.length; index++) {
        const value = nums[index];
        const complement = target - value;
        
        if (map[complement] !== undefined) {
            return [map[complement], index];
        }
        
        map[value] = index;
    }
    
    return [];
}

console.log(twoSum([3, 2, 4], 6));
```

## 52. Add the digit until you not get the single digit number

```javascript
function singleDigitSum(str) {
    let sum = str.split('').reduce((acc, char) => acc + parseInt(char, 10), 0);
    
    while (sum >= 10) {
        sum = sum.toString().split('').reduce((acc, char) => acc + parseInt(char, 10), 0);
    }
    
    return sum;
}

const str = "123456";
console.log(singleDigitSum(str)); // 3

// Complexity O(n)
```


---

# React Native Daily Life Interview Questions

## 53. `FlatList` vs `ScrollView`

**Question:** When would you use a `FlatList` instead of a `ScrollView`?

**Answer:**
`ScrollView` renders all its react child components at once. This causes high memory usage and performance drops if the list is long.
`FlatList` uses virtualization. It only renders items that are currently visible on the screen (plus a few off-screen). 

```jsx
// ScrollView - Good for few items
<ScrollView>
  {items.map(item => <Item key={item.id} />)}
</ScrollView>

// FlatList - Good for large data sets
<FlatList
  data={items}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Item />}
/>
```

## 54. `useMemo` vs `useCallback`

**Question:** What is the difference between `useMemo` and `useCallback`?

**Answer:**
- `useMemo` is used to memoize a **value** (result of a function). It prevents expensive calculations on every render.
- `useCallback` is used to memoize a **function instance**. It prevents creating a new function reference on every render, which is useful when passing callbacks to optimized child components (like those wrapped in `React.memo`).

```javascript
// useMemo caches the returned value
const expensiveValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

// useCallback caches the function itself
const handleClick = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

## 55. How do you handle Memory Leaks in React Native?

**Question:** How do you prevent memory leaks, especially when unmounting components?

**Answer:**
Memory leaks often happen when async operations (like API calls or timeouts) try to update state on an unmounted component.

**Solution:**
Cancel subscriptions, clear timeouts, and ignore async results in the `useEffect` cleanup function.

```javascript
useEffect(() => {
  let isMounted = true;

  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });

  return () => {
    isMounted = false; // Cleanup
  };
}, []);
```

## 56. Custom Hook Example: `useDebounce`

**Question:** Write a custom hook for debouncing a search input.

```javascript
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## 57. React Native New Architecture

**Question:** What are the key elements of the New React Native Architecture?

**Answer:**
1. **JSI (JavaScript Interface):** Replaces the old Bridge. Allows JavaScript to directly hold references to C++ objects, enabling synchronous and faster communication between JS and Native.
2. **Fabric:** The new concurrent rendering system.
3. **TurboModules:** Native modules are loaded lazily (only when needed) rather than all at app startup.
4. **Codegen:** Automates the creation of C++ boilerplate to ensure type safety between JS and Native.

## 58. Context API vs Redux

**Question:** When should you use Context API instead of Redux/Zustand?

**Answer:**
- **Context API:** Best for low-frequency updates like Theme (dark/light mode), User Authentication state, or Localization. It can cause unnecessary re-renders if used for rapidly changing data.
- **Redux / Zustand:** Best for high-frequency updates, complex state logic, and global app state. They have built-in mechanisms to prevent unnecessary re-renders.
