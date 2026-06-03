# 📊 DSA Coding Programs

---

## 🧮 Part 1: Mathematical Coding

### 1. Prime Number Verification & Sieve of Eratosthenes
#### Question
Write a function `isPrime(n)` to verify if a number is prime ($O(\sqrt{n})$ time). Also, write `sieveOfEratosthenes(n)` to print all primes up to $n$ ($O(n \log(\log n))$ time).

#### Sample Input & Output
- `isPrime(11)` ➡️ `true`
- `isPrime(15)` ➡️ `false`
- `sieveOfEratosthenes(15)` ➡️ `[2, 3, 5, 7, 11, 13]`

#### Code
```javascript
// Time: O(sqrt(n)) | Space: O(1)
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// Time: O(n log(log n)) | Space: O(n)
function sieveOfEratosthenes(n) {
  const prime = new Array(n + 1).fill(true);
  prime[0] = prime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (prime[i]) {
      for (let j = i * i; j <= n; j += i) {
        prime[j] = false;
      }
    }
  }

  const result = [];
  for (let i = 2; i <= n; i++) {
    if (prime[i]) result.push(i);
  }
  return result;
}
```

---

### 2. Greatest Common Divisor (GCD) & Least Common Multiple (LCM)
#### Question
Implement the Euclidean algorithm to find the GCD of two numbers. Use the relation $\text{LCM}(a, b) = \frac{a \times b}{\text{GCD}(a, b)}$ to return the LCM.

#### Sample Input & Output
- `gcd(12, 18)` ➡️ `6`
- `lcm(12, 18)` ➡️ `36`

#### Code
```javascript
// Time: O(log(min(a, b))) | Space: O(1)
function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// Time: O(log(min(a, b))) | Space: O(1)
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}
```

---

### 3. Palindrome Number Check
#### Question
Check if a given integer is a palindrome (reads the same backward as forward) without using string conversions.

#### Sample Input & Output
- `isPalindrome(121)` ➡️ `true`
- `isPalindrome(-121)` ➡️ `false`

#### Code
```javascript
// Time: O(log10(n)) | Space: O(1)
function isPalindrome(n) {
  if (n < 0 || (n % 10 === 0 && n !== 0)) return false;

  let reversed = 0;
  let original = n;

  while (n > 0) {
    const digit = n % 10;
    reversed = (reversed * 10) + digit;
    n = Math.floor(n / 10);
  }

  return original === reversed;
}
```

---

### 4. Factorial (Iterative & Recursive)
#### Question
Write functions to compute the factorial of a number $n$ ($n!$). Implement both iterative and recursive structures.

#### Sample Input & Output
- `factorialIterative(5)` ➡️ `120`
- `factorialRecursive(5)` ➡️ `120`

#### Code
```javascript
// Time: O(n) | Space: O(1)
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Time: O(n) | Space: O(n) call stack
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}
```

---

### 5. Fibonacci Sequence (Iterative & N-th Term)
#### Question
Write a function `fibonacci(n)` that returns an array of the first $n$ Fibonacci numbers. Also write `nthFibonacci(n)` returning the $N$-th term.

#### Sample Input & Output
- `fibonacci(5)` ➡️ `[0, 1, 1, 2, 3]`
- `nthFibonacci(5)` ➡️ `5` // (0, 1, 1, 2, 3, 5)

#### Code
```javascript
// Time: O(n) | Space: O(n)
function fibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];

  const sequence = [0, 1];
  for (let i = 2; i < n; i++) {
    sequence.push(sequence[i - 1] + sequence[i - 2]);
  }
  return sequence;
}

// Time: O(n) | Space: O(1)
function nthFibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  let prev2 = 0;
  let prev1 = 1;
  let current = 0;

  for (let i = 2; i <= n; i++) {
    current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return current;
}
```

---

### 6. Armstrong Number Verification
#### Question
Verify if a given number is an Armstrong number (where the sum of its digits raised to the power of the count of digits equals the number).

#### Sample Input & Output
- `isArmstrong(153)` ➡️ `true` // 1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153
- `isArmstrong(123)` ➡️ `false`

#### Code
```javascript
// Time: O(log10(n)) | Space: O(log10(n))
function isArmstrong(num) {
  const digits = String(num).split('');
  const power = digits.length;

  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), power),
    0
  );

  return sum === num;
}
```

---

### 7. AP & GP Progression Terms
#### Question
Calculate the $N$-th term of an Arithmetic Progression (AP) and Geometric Progression (GP) given the first term $a$ and common difference/ratio $r$.

#### Sample Input & Output
- `nthTermAP(2, 3, 5)` ➡️ `14` // 2, 5, 8, 11, 14
- `nthTermGP(2, 3, 5)` ➡️ `162` // 2, 6, 18, 54, 162

#### Code
```javascript
// Time: O(1) | Space: O(1)
function nthTermAP(a, d, n) {
  return a + (n - 1) * d;
}

// Time: O(log(n)) | Space: O(1)
function nthTermGP(a, r, n) {
  return a * Math.pow(r, n - 1);
}
```

---

## 💻 Part 2: Core DSA Algorithms

### 8. Two Sum (HashMap Approach)
#### Question
Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to the target.

#### Sample Input & Output
- Input: `nums = [2, 7, 11, 15], target = 9`
- Output: `[0, 1]`

#### Code
```javascript
// Time: O(n) | Space: O(n)
function twoSum(nums, target) {
  const map = {}; // Map value to its index

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

---

### 9. Contains Duplicate
#### Question
Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.

#### Sample Input & Output
- Input: `[1, 2, 3, 1]` ➡️ `true`
- Input: `[1, 2, 3, 4]` ➡️ `false`

#### Code
```javascript
// Time: O(n) | Space: O(n)
function containsDuplicate(nums) {
  const set = new Set();
  for (const num of nums) {
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
}
```

---

### 10. Valid Anagram
#### Question
Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.

#### Sample Input & Output
- Input: `s = "listen", t = "silent"` ➡️ `true`
- Input: `s = "rat", t = "car"` ➡️ `false`

#### Code
```javascript
// Time: O(n) | Space: O(1) (Since character set is bound to constant alphabet size)
function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  const charCounts = {};

  for (const char of s) {
    charCounts[char] = (charCounts[char] || 0) + 1;
  }

  for (const char of t) {
    if (!charCounts[char]) return false;
    charCounts[char]--;
  }

  return true;
}
```

---

### 11. First Unique Character in a String
#### Question
Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.

#### Sample Input & Output
- Input: `"swiss"` ➡️ `"w"` (or index `1`)
- Input: `"aabb"` ➡️ `null` (or `-1`)

#### Code
```javascript
// Time: O(n) | Space: O(1)
function firstUniqChar(s) {
  const frequency = {};

  for (const char of s) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  for (let i = 0; i < s.length; i++) {
    if (frequency[s[i]] === 1) {
      return i;
    }
  }

  return -1;
}
```

---

### 12. Move Zeroes
#### Question
Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements in-place.

#### Sample Input & Output
- Input: `[0, 1, 0, 3, 12]`
- Output: `[1, 3, 12, 0, 0]`

#### Code
```javascript
// Time: O(n) | Space: O(1)
function moveZeroes(nums) {
  let writePointer = 0;

  // Shift all non-zero elements forward
  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== 0) {
      nums[writePointer] = nums[readPointer];
      writePointer++;
    }
  }

  // Fill remaining index positions with zeroes
  while (writePointer < nums.length) {
    nums[writePointer] = 0;
    writePointer++;
  }

  return nums;
}
```

---

### 13. Longest Substring Without Repeating Characters
#### Question
Given a string `s`, find the length of the longest substring without repeating characters.

#### Sample Input & Output
- Input: `"abcabcbb"`
- Output: `3` // "abc"

#### Code
```javascript
// Time: O(n) | Space: O(min(m, n)) sliding window Set
function lengthOfLongestSubstring(s) {
  let left = 0;
  let maxLength = 0;
  const charSet = new Set();

  for (let right = 0; right < s.length; right++) {
    while (charSet.has(s[right])) {
      charSet.delete(s[left]);
      left++;
    }
    charSet.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
```

---

### 14. Maximum Subarray Sum (Kadane's Algorithm)
#### Question
Given an integer array `nums`, find the subarray with the largest sum and return its sum.

#### Sample Input & Output
- Input: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`
- Output: `6` // [4, -1, 2, 1]

#### Code
```javascript
// Time: O(n) | Space: O(1)
function maxSubArray(nums) {
  if (nums.length === 0) return 0;

  let currentSum = nums[0];
  let maxGlobal = nums[0];

  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxGlobal = Math.max(maxGlobal, currentSum);
  }

  return maxGlobal;
}
```

---

### 15. Valid Parentheses
#### Question
Given a string `s` containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

#### Sample Input & Output
- Input: `"{[()]}"` ➡️ `true`
- Input: `"{abc(]def}"` ➡️ `false` (brackets nested out of order)

#### Code
```javascript
// Time: O(n) | Space: O(n)
function isValid(s) {
  const stack = [];
  const bracketMap = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (const char of s) {
    // Re-route and process bracket characters, ignore literals
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else if (char === ')' || char === ']' || char === '}') {
      if (stack.pop() !== bracketMap[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
```

---

### 16. Product of Array Except Self
#### Question
Given an integer array `nums`, return an array `result` such that `result[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Do this in $O(n)$ time and without using the division operator.

#### Sample Input & Output
- Input: `[1, 2, 3, 4]`
- Output: `[24, 12, 8, 6]`

#### Code
```javascript
// Time: O(n) | Space: O(1) (Output array space is ignored in standard constraints)
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Compute prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= nums[i];
  }

  // Compute suffix products and combine
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= nums[i];
  }

  return result;
}
```

---

### 17. Group Anagrams
#### Question
Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.

#### Sample Input & Output
- Input: `["eat", "tea", "tan", "ate", "nat", "bat"]`
- Output: `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]`

#### Code
```javascript
// Time: O(n * k log k) where k is the maximum word length | Space: O(n * k)
function groupAnagrams(strs) {
  const groups = {};

  for (const word of strs) {
    const key = word.split('').sort().join('');
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(word);
  }

  return Object.values(groups);
}
```

---

### 18. Number of Islands (DFS Graph Algorithm)
#### Question
Given an $m \times n$ 2D binary grid `grid` representing a map of `'1'`s (land) and `'0'`s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

#### Sample Input & Output
- Input:
```javascript
const grid = [
  ["1", "1", "0"],
  ["1", "0", "0"],
  ["0", "1", "1"]
];
```
- Output: `2`

#### Code
```javascript
// Time: O(m * n) | Space: O(m * n) recursion stack
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;

  let islandCount = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r, c) {
    // Bounds check and water validation
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') {
      return;
    }

    // Mark current cell as visited by converting it to water
    grid[r][c] = '0';

    // Recursively sink neighboring land bridges
    dfs(r + 1, c); // Down
    dfs(r - 1, c); // Up
    dfs(r, c + 1); // Right
    dfs(r, c - 1); // Left
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islandCount++;
        dfs(r, c);
      }
    }
  }

  return islandCount;
}
```

---

### 19. Climbing Stairs (Dynamic Programming)
#### Question
You are climbing a staircase. It takes $n$ steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

#### Sample Input & Output
- Input: `n = 5`
- Output: `8` // [1+1+1+1+1, 1+1+1+2, 1+1+2+1, 1+2+1+1, 2+1+1+1, 1+2+2, 2+1+2, 2+2+1]

#### Code
```javascript
// Time: O(n) | Space: O(1)
function climbStairs(n) {
  if (n <= 2) return n;

  let step1 = 1; // Base case for n=1
  let step2 = 2; // Base case for n=2
  let currentWays = 0;

  for (let i = 3; i <= n; i++) {
    currentWays = step1 + step2;
    step1 = step2;
    step2 = currentWays;
  }

  return currentWays;
}
```
