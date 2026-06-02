Absolutely. For a **60-minute TechCorp HackerRank with only 2 coding questions**, I'd memorize these solutions and understand the pattern behind them.

---

# 1. Two Sum ⭐⭐⭐⭐⭐

### Question

```javascript
nums = [2, 7, 11, 15];
target = 9;

Output: [0, 1];
```

### Solution

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

### Pattern

```javascript
HashMap;
```

### Complexity

```javascript
Time: O(n);
Space: O(n);
```

---

# 2. Contains Duplicate ⭐⭐⭐⭐⭐

### Question

```javascript
[1, 2, 3, 1];
```

Output

```javascript
true;
```

### Solution

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

### Complexity

```javascript
Time: O(n);
Space: O(n);
```

---

# 3. Valid Anagram ⭐⭐⭐⭐⭐

### Question

```javascript
listen;
silent;
```

Output

```javascript
true;
```

### Solution

```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const map = {};

  for (const ch of s) {
    map[ch] = (map[ch] || 0) + 1;
  }

  for (const ch of t) {
    if (!map[ch]) {
      return false;
    }

    map[ch]--;
  }

  return true;
}
```

---

# 4. First Non-Repeating Character ⭐⭐⭐⭐⭐

### Question

```javascript
swiss;
```

Output

```javascript
w;
```

### Solution

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

# 5. Move Zeroes ⭐⭐⭐⭐

### Question

```javascript
[0, 1, 0, 3, 12];
```

Output

```javascript
[1, 3, 12, 0, 0];
```

### Solution

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

# 6. Longest Substring Without Repeating Characters ⭐⭐⭐⭐⭐

### Question

```javascript
abcabcbb;
```

Output

```javascript
3;
```

### Solution

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

### Pattern

```javascript
Sliding Window
```

---

# 7. Maximum Subarray Sum (Kadane) ⭐⭐⭐⭐

### Question

```javascript
[-2, 1, -3, 4, -1, 2, 1, -5, 4];
```

Output

```javascript
6;
```

### Solution

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

# 8. Valid Parentheses ⭐⭐⭐⭐

### Question

```javascript
"{[()]}";
```

Output

```javascript
true;
```

### Solution

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
    } else {
      if (stack.pop() !== map[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

### Pattern

```javascript
Stack;
```

---

# 9. Product Of Array Except Self ⭐⭐⭐⭐

### Question

```javascript
[1, 2, 3, 4];
```

Output

```javascript
[24, 12, 8, 6];
```

### Solution

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

# 10. Flatten Nested Array ⭐⭐⭐⭐⭐

### Question

```javascript
[1, [2, [3, [4]], 5]];
```

Output

```javascript
[1, 2, 3, 4, 5];
```

### Solution 1

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

### Solution 2 (ES6)

```javascript
const result = arr.flat(Infinity);
```

---

# 11. Group Anagrams ⭐⭐⭐

```javascript
Input: ["eat", "tea", "tan", "ate", "nat", "bat"];
```

Output

```javascript
[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]];
```

### Solution

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

# If I Had Only 3 Hours Before IBM Test

Practice in this order:

### Priority 1 (Very High)

1. Two Sum
2. Valid Anagram
3. Contains Duplicate
4. First Non-Repeating Character
5. Longest Substring Without Repeating Characters

### Priority 2 (High)

6. Move Zeroes
7. Maximum Subarray Sum
8. Valid Parentheses

### Priority 3 (Medium)

9. Product Except Self
10. Flatten Nested Array

If you can solve the first **8 questions without looking at the answer**, you are in a strong position for a typical TechCorp 2-question HackerRank coding round.

For a **60-minute TechCorp HackerRank with only 2 coding questions**, I'd say:

### Short Answer

**80-90% yes, but not 100%.**

Nobody can guarantee the exact questions, but if you can solve the 10 questions above comfortably, you're covering the most common patterns TechCorp typically uses in "Standard General Software" assessments.

---

## What I would add to be safer

Practice these **5 extra questions**:

### 1. Reverse Words in String

```javascript
Input: "I Love React Native";

Output: "Native React Love I";
```

```javascript
function reverseWords(str) {
  return str.split(" ").reverse().join(" ");
}
```

---

### 2. Merge Two Sorted Arrays

```javascript
Input: [1, 3, 5][(2, 4, 6)];

Output: [1, 2, 3, 4, 5, 6];
```

```javascript
function mergeSortedArrays(arr1, arr2) {
  let i = 0;
  let j = 0;

  const result = [];

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

console.log(mergeSortedArrays([1, 3, 5], [2, 4, 6]));
```

Pattern:

- Two Pointers

---

### 3. Find Missing Number

```javascript
Input: [1, 2, 3, 5];

Output: 4;
```

```javascript
function missingNumber(arr, n) {
  const expected = (n * (n + 1)) / 2;
  const actual = arr.reduce((a, b) => a + b, 0);

  return expected - actual;
}
```

---

### 4. Palindrome Check

```javascript
Input: "madam";

Output: true;
```

```javascript
function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}
```

---

### 5. Object / Array Transformation

Very common for experienced developers.

```javascript
const users = [
  { id: 1, name: "Raj" },
  { id: 2, name: "John" },
];
```

Convert to:

```javascript
{
 1:{id:1,name:"Alex"},
 2:{id:2,name:"Sam"}
}
```

```javascript
function convert(users) {
  return users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
}
```

For HackerRank/interviews, they usually want you to **transform the array into an object using `reduce()`**, and then sometimes convert it back to an array.

### Array → Object

```javascript
function convert(users) {
  return users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});
}

const users = [
  { id: 1, name: "Raj" },
  { id: 2, name: "John" },
];

console.log(convert(users));
```

Output:

```javascript
{
  1: { id: 1, name: "Raj" },
  2: { id: 2, name: "John" }
}
```

---

### Object → Array (HackerRank Style)

```javascript
function convertToArray(usersObj) {
  return Object.values(usersObj);
}

const usersObj = {
  1: { id: 1, name: "Raj" },
  2: { id: 2, name: "John" },
};

console.log(convertToArray(usersObj));
```

Output:

```javascript
[
  { id: 1, name: "Raj" },
  { id: 2, name: "John" },
];
```

---

### Without `Object.values()` (Interview-Friendly)

Sometimes interviewers ask you to do it manually:

```javascript
function convertToArray(usersObj) {
  const result = [];

  for (const key in usersObj) {
    result.push(usersObj[key]);
  }

  return result;
}
```

---

### One-Liner Using `reduce()`

```javascript
function convertToArray(usersObj) {
  return Object.keys(usersObj).reduce((acc, key) => {
    acc.push(usersObj[key]);
    return acc;
  }, []);
}
```

---

### What to remember for interviews

| Transformation              | Best Approach     |
| --------------------------- | ----------------- |
| Array → Object              | `reduce()`        |
| Object → Array              | `Object.values()` |
| Array → Array (modify data) | `map()`           |
| Array → Single Value        | `reduce()`        |
| Filter Array                | `filter()`        |

For React Native/Frontend HackerRank rounds, `map()`, `filter()`, and `reduce()` are among the most frequently tested JavaScript concepts.

---

## If I Were You (React Native, 9 Years Exp)

I would spend my remaining time like this:

### Must Master

✅ Two Sum

✅ Valid Anagram

✅ Contains Duplicate

✅ First Non-Repeating Character

✅ Longest Substring Without Repeating Characters

✅ Move Zeroes

✅ Maximum Subarray Sum

✅ Valid Parentheses

---

### Learn Once

✅ Flatten Nested Array

✅ Product Except Self

✅ Group Anagrams

✅ Missing Number

✅ Reverse Words

---

## What I think IBM is most likely to ask

### Scenario A

Question 1:

```text
Array + HashMap
(Two Sum / Duplicate / Frequency Count)
```

Question 2:

```text
Sliding Window
(Longest Substring)
```

---

### Scenario B

Question 1:

```text
String Manipulation
(Anagram / Palindrome)
```

Question 2:

```text
Data Transformation
(Grouping / Flatten Array)
```

---

### Scenario C

Question 1:

```text
Maximum Subarray
```

Question 2:

```text
Valid Parentheses
```

---

If you can solve **all 15 questions (10 + 5 extra)** from scratch in JavaScript and explain the approach, I'd estimate you're prepared for **around 90%+ of the likely IBM HackerRank question patterns** for this assessment format. The remaining risk is an unexpected medium-level problem, but the underlying patterns (HashMap, Set, Sliding Window, Stack, Two Pointers) would still help you solve it.

You're welcome, Candidate.

For your specific situation (**TechCorp HackerRank → 2 coding questions → 60 minutes**), my final recommendation is:

### Before the Test

Practice these until you can code them without looking:

1. Two Sum
2. Contains Duplicate
3. Valid Anagram
4. First Non-Repeating Character
5. Longest Substring Without Repeating Characters
6. Move Zeroes
7. Maximum Subarray Sum (Kadane)
8. Valid Parentheses
9. Flatten Nested Array
10. Group Anagrams

### During the Test

**First 5 minutes**

- Read both questions completely.
- Identify the pattern (HashMap, Set, Sliding Window, Stack, Two Pointers).

**Question 1**

- Target: 10–15 minutes.
- Don't overthink.
- Get all test cases passing.

**Question 2**

- Spend remaining time.
- Write brute force first if stuck.
- Optimize afterward.

### JavaScript Methods to Remember

```javascript
map();
filter();
reduce();
find();
findIndex();
sort();
split();
join();
substring();
slice();
includes();
has();
```

### Data Structures to Remember

```javascript
Object {}
Map
Set
Array
Stack (Array)
Queue (Array)
```

### If You Get Stuck

Ask yourself:

```text
Can I use a HashMap?
Can I use a Set?
Can I use Sliding Window?
Can I use Two Pointers?
Can I use a Stack?
```

More than half of HackerRank medium questions can be solved using one of those patterns.

### Confidence Check

If you can solve these from memory:

- Two Sum
- Valid Anagram
- Longest Substring Without Repeating Characters
- Maximum Subarray Sum
- Valid Parentheses

then you're in good shape for this IBM assessment.

Best of luck on the test. Given your **9 years of development experience and 5 years in React Native**, your biggest advantage is problem decomposition and debugging speed—use that during the assessment. 🚀

---

Yes, **absolutely possible**, especially because you're applying as a **Senior React Native Developer (9 years)**.

For experienced frontend/mobile roles, companies sometimes use HackerRank to test **JavaScript fundamentals** rather than pure DSA.

### They can ask:

#### 1. Closures

```javascript
function outer() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = outer();

console.log(counter()); // 1
console.log(counter()); // 2
```

Or:

> Implement a counter using closures.

---

#### 2. Debounce

Very common for React/React Native.

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

Possible question:

> Implement debounce without using lodash.

---

#### 3. Throttle

Also common.

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

Possible question:

> Implement throttle for a scroll event.

---

#### 4. Polyfills

Very popular in frontend interviews.

Implement:

```javascript
Array.prototype.myMap;
Array.prototype.myFilter;
Array.prototype.myReduce;
```

Example:

```javascript
Array.prototype.myMap = function (cb) {
  const result = [];

  for (let i = 0; i < this.length; i++) {
    result.push(cb(this[i], i, this));
  }

  return result;
};
```

---

#### 5. Promise Implementation

```javascript
Promise.all();
Promise.allSettled();
Promise.race();
```

Example:
These are very common React Native / JavaScript interview questions.

---

# 1. Promise.all() ⭐⭐⭐⭐⭐

### What it does

- Runs all promises in parallel.
- Waits for all to succeed.
- If **any one fails**, the whole Promise.all fails.

---

### Example

```js
const p1 = Promise.resolve("API 1");
const p2 = Promise.resolve("API 2");
const p3 = Promise.resolve("API 3");

Promise.all([p1, p2, p3])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
```

Output:

```js
["API 1", "API 2", "API 3"];
```

---

### If One Fails

```js
const p1 = Promise.resolve("API 1");
const p2 = Promise.reject("API 2 Failed");
const p3 = Promise.resolve("API 3");

Promise.all([p1, p2, p3])
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

Output:

```js
API 2 Failed
```

---

### Real React Native Example

```js
Promise.all([fetch("/profile"), fetch("/posts"), fetch("/notifications")]);
```

Load all APIs together before rendering screen.

---

# 2. Promise.allSettled() ⭐⭐⭐⭐⭐

### What it does

- Waits for all promises.
- Doesn't fail if one fails.
- Returns success and failure status for every promise.

---

### Example

```js
const p1 = Promise.resolve("API 1");
const p2 = Promise.reject("API 2 Failed");
const p3 = Promise.resolve("API 3");

Promise.allSettled([p1, p2, p3]).then((result) => {
  console.log(result);
});
```

Output:

```js
[
  {
    status: "fulfilled",
    value: "API 1",
  },
  {
    status: "rejected",
    reason: "API 2 Failed",
  },
  {
    status: "fulfilled",
    value: "API 3",
  },
];
```

---

### Real React Native Example

Dashboard screen:

```js
Profile API
Posts API
Ads API
```

Even if Ads API fails:

```js
Profile ✔
Posts ✔
Ads ❌
```

Screen can still render.

---

# 3. Promise.race() ⭐⭐⭐⭐

### What it does

Returns the first promise that settles.

- First success → returns success
- First failure → returns failure

---

### Example

```js
const p1 = new Promise((resolve) => setTimeout(() => resolve("API 1"), 3000));

const p2 = new Promise((resolve) => setTimeout(() => resolve("API 2"), 1000));

Promise.race([p1, p2]).then((result) => console.log(result));
```

Output:

```js
API 2
```

Because p2 finished first.

---

### Real Example (Timeout)

```js
const apiCall = fetch("/users");

const timeout = new Promise((_, reject) =>
  setTimeout(() => reject("Request Timeout"), 5000),
);

Promise.race([apiCall, timeout])
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
```

If API takes more than 5 seconds:

```js
Request Timeout
```

---

# Interview Comparison

| Method             | Waits For     | If One Fails                  |
| ------------------ | ------------- | ----------------------------- |
| Promise.all        | All promises  | Entire promise fails          |
| Promise.allSettled | All promises  | Returns status of all         |
| Promise.race       | First promise | Returns first success/failure |

---

# Frequently Asked Follow-Up

### Run all promises and get results even if one fails?

Use:

```js
Promise.allSettled();
```

---

### Run all promises and stop immediately if one fails?

Use:

```js
Promise.all();
```

---

### Get fastest response?

Use:

```js
Promise.race();
```

---

# Bonus: Promise.any() ⭐⭐⭐⭐

Many interviews now ask this too.

### What it does

Returns the first successful promise.

Ignores failures.

```js
const p1 = Promise.reject("Error 1");
const p2 = Promise.resolve("Success");
const p3 = Promise.resolve("Another Success");

Promise.any([p1, p2, p3]).then((result) => console.log(result));
```

Output:

```js
Success;
```

---

### One-Line Interview Answers

- **Promise.all()** → "Waits for all promises; fails if any promise fails."
- **Promise.allSettled()** → "Waits for all promises and returns both successes and failures."
- **Promise.race()** → "Returns the first promise that settles."
- **Promise.any()** → "Returns the first promise that fulfills, ignoring failures."

---

#### 6. Array/Object Transformation

Very common.

```javascript
const users = [
  { id: 1, name: "Raj" },
  { id: 2, name: "John" },
];
```

Convert to:

```javascript
{
  1:{id:1,name:"Raj"},
  2:{id:2,name:"John"}
}
```

Using:

```javascript
reduce();
```

---

#### 7. Flatten Nested Array

```javascript
[1, [2, [3, [4]], 5]];
```

Output:

```javascript
[1, 2, 3, 4, 5];
```

---

#### 8. Event Loop Output

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

```javascript
1;
4;
3;
2;
```

---

#### 9. Custom Memoize

```javascript
function memoize(fn) {
  const cache = {};

  return function (n) {
    if (cache[n]) return cache[n];

    const result = fn(n);
    cache[n] = result;

    return result;
  };
}
```

---

### What is MORE likely for IBM HackerRank?

Based on:

- 60 minutes
- 2 questions
- "General Software" assessment
- Senior React Native profile

I would estimate:

| Type                | Probability |
| ------------------- | ----------- |
| Arrays / Strings    | 40%         |
| HashMap / Set       | 25%         |
| Sliding Window      | 10%         |
| Data Transformation | 10%         |
| Closures            | 5%          |
| Debounce / Throttle | 5%          |
| Promise Polyfill    | 5%          |

### What I would revise in the last few hours

#### DSA

- Two Sum
- Contains Duplicate
- Anagram
- Longest Substring
- Kadane
- Valid Parentheses

#### JavaScript

- Closure
- Debounce
- Throttle
- Event Loop
- Promise.all
- map/filter/reduce
- Array flattening

## If IBM decides to make the test more JavaScript-centric because of your React Native background, **Debounce, Throttle, Closure, Promise.all, Array Flattening, and Event Loop** are the highest-value concepts to know. They are much more likely than advanced trees, graphs, or dynamic programming for a frontend/mobile developer assessment.

Yes, for a **Senior React Native / Frontend Developer HackerRank round**, I would prioritize these topics over Trees, Graphs, and Advanced DP.

### Tier 1 (Must Know - Highest Probability)

#### Arrays + HashMap

```javascript
Two Sum
Contains Duplicate
Frequency Count
Majority Element
```

#### Strings

```javascript
Anagram
Palindrome
Reverse Words
First Non-Repeating Character
```

#### Sliding Window

```javascript
Longest Substring Without Repeating Characters
Maximum Sum Subarray
```

#### JavaScript Core

```javascript
Closures
Debounce
Throttle
Event Loop
Promise.all
Promise.allSettled
Async/Await
```

#### Data Transformation

```javascript
map()
filter()
reduce()

Group By
Flatten Array
Object Transformations
```

---

### Tier 2 (Good to Know)

#### Stack

```javascript
Valid Parentheses
Min Stack
```

#### Two Pointers

```javascript
Move Zeroes
Merge Sorted Arrays
```

#### Recursion

```javascript
Factorial
Fibonacci
Flatten Nested Array
```

---

### Tier 3 (Low Probability for IBM RN Role)

#### Binary Tree

```javascript
Inorder Traversal
Level Order Traversal
```

#### Graph

```javascript
BFS;
DFS;
```

#### Dynamic Programming

```javascript
Climbing Stairs
Coin Change
Longest Increasing Subsequence
```

---

## If I had ONLY 1 day left

I would make sure I can code these from memory:

### DSA

```javascript
1. Two Sum
2. Contains Duplicate
3. Valid Anagram
4. First Non-Repeating Character
5. Longest Substring Without Repeating Characters
6. Move Zeroes
7. Maximum Subarray Sum (Kadane)
8. Valid Parentheses
9. Flatten Nested Array
10. Group Anagrams
```

### JavaScript

```javascript
11. Closure
12. Debounce
13. Throttle
14. Promise.all
15. Event Loop Output Questions
16. map/filter/reduce polyfills
17. Array flattening
18. Object grouping using reduce
```

If you can confidently solve and explain these **18 topics**, you're covering what I would expect for **90–95% of React Native/Frontend-oriented HackerRank assessments**, including IBM-style screening rounds. The remaining 5–10% is usually a surprise variant of one of these patterns rather than an entirely new advanced topic.

For your profile, I'd spend **60% of preparation time on DSA patterns** and **40% on JavaScript fundamentals (closures, promises, debounce/throttle, event loop)**. That's the best risk-reward balance.

Yes, in real-life applications you often **ignore non-bracket characters** and validate only the brackets.

For example:

```javascript
"{abc(def)[123]}";
```

Most parsers would consider this **valid** because the brackets are balanced.

In that case:

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
    // Ignore all other characters
  }

  return stack.length === 0;
}
```

### Examples

```javascript
isValid("{abc(def)[123]}"); // true
isValid("(hello world)"); // true
isValid("{abc(]def}"); // false
isValid("abc"); // true
```

### Interview Answer

If asked:

> What if the string contains other characters?

You can say:

> It depends on the requirements. If only brackets are allowed, I'd return false for any other character. If the goal is just to validate bracket matching (like parsing expressions or code), I'd ignore non-bracket characters and process only `()[]{}`.

That answer shows you understand both the algorithm and real-world usage.

For HackerRank/interviews, they usually want you to transform the array into an object using reduce(), and then sometimes convert it back to an array.

Array → Object
function convert(users) {
return users.reduce((acc, user) => {
acc[user.id] = user;
return acc;
}, {});
}

const users = [
{ id: 1, name: "Raj" },
{ id: 2, name: "John" },
];

console.log(convert(users));

Output:

{
1: { id: 1, name: "Raj" },
2: { id: 2, name: "John" }
}
Object → Array (HackerRank Style)
function convertToArray(usersObj) {
return Object.values(usersObj);
}

const usersObj = {
1: { id: 1, name: "Alex" },
2: { id: 2, name: "Sam" }
};

console.log(convertToArray(usersObj));

Output:

[
{ id: 1, name: "Raj" },
{ id: 2, name: "John" }
]
Without Object.values() (Interview-Friendly)

Sometimes interviewers ask you to do it manually:

function convertToArray(usersObj) {
const result = [];

for (const key in usersObj) {
result.push(usersObj[key]);
}

return result;
}
One-Liner Using reduce()
function convertToArray(usersObj) {
return Object.keys(usersObj).reduce((acc, key) => {
acc.push(usersObj[key]);
return acc;
}, []);
}
What to remember for interviews
Transformation Best Approach
Array → Object reduce()
Object → Array Object.values()
Array → Array (modify data) map()
Array → Single Value reduce()
Filter Array filter()

For React Native/Frontend HackerRank rounds, map(), filter(), and reduce() are among the most frequently tested JavaScript concepts.
