# 📊 DSA Coding Programs

## Page Summary
### Reading Time
`48 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 📊 DSA Coding Programs |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | 🔥 Must Revise |

---



<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [🧮 Part 1: Mathematical Coding](#part-1-mathematical-coding)
- [💻 Part 2: Core DSA Algorithms](#part-2-core-dsa-algorithms)
</details>
<!-- INDEX_END -->

---

## 🧮 Part 1: Mathematical Coding
*⏱️ 8 min read*

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

#### Complexity & Explanation
- **Time Complexity**: isPrime: $O(\sqrt{n})$, sieveOfEratosthenes: $O(n \log(\log n))$
- **Space Complexity**: isPrime: $O(1)$, sieveOfEratosthenes: $O(n)$
- **Explanation**: isPrime checks for integer divisors up to the square root of n. Sieve of Eratosthenes initializes a boolean table of size n and iteratively marks multiples of primes as false, extracting all remaining primes in the range.

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

#### Complexity & Explanation
- **Time Complexity**: $O(\log(\min(a, b)))$
- **Space Complexity**: $O(1)$
- **Explanation**: Greatest Common Divisor (GCD) is calculated using the Euclidean algorithm by modulo division iteratively. The Least Common Multiple (LCM) is derived using the formula: $(a \times b) / \text{GCD}(a, b)$.

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

#### Complexity & Explanation
- **Time Complexity**: $O(\log_{10} n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Extracts digits from the number from right-to-left using remainder modulo 10 operations, constructs the reversed integer mathematically, and checks if it equals the original number.

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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: Iterative: $O(1)$, Recursive: $O(n)$ call stack depth
- **Explanation**: Calculates the product of integers from 2 to n. The recursive version allocates stack frames proportional to n, whereas the iterative loop uses a single accumulator variable.

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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: Sequence: $O(n)$, N-th term: $O(1)$
- **Explanation**: Calculates Fibonacci values. The sequence generator stores computed numbers in an array. The N-th term function only tracks the last two values in memory to optimize space.

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

#### Complexity & Explanation
- **Time Complexity**: $O(\log_{10} n)$
- **Space Complexity**: $O(\log_{10} n)$ to store digits
- **Explanation**: Determines if a number equals the sum of its digits raised to the power of the digit count. Converts the number to a string to parse digits, maps each digit, and aggregates the sum.

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

#### Complexity & Explanation
- **Time Complexity**: AP: $O(1)$, GP: $O(\log n)$ due to exponentiation
- **Space Complexity**: $O(1)$
- **Explanation**: Calculates the N-th term of progressions. The Arithmetic Progression uses $a + (n-1)d$ directly. The Geometric Progression raises the ratio to the power of $n-1$ using exponentiation.

---

### 8. Composite Number Verification
#### Question
Check whether a given integer $n$ is a composite number (a positive integer that has at least one divisor other than $1$ and itself).

#### Sample Input & Output
- `isComposite(4)` ➡️ `true`
- `isComposite(11)` ➡️ `false`

#### Code
```javascript
// Time: O(sqrt(n)) | Space: O(1)
function isComposite(n) {
  if (n <= 3) return false; // 1, 2, 3 are not composite
  
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return true;
  }
  return false;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(\sqrt{n})$
- **Space Complexity**: $O(1)$
- **Explanation**: Checks if a number is composite (has factors other than 1 and itself) by seeking any divisor between 2 and the square root of n.

---

### 9. Celsius to Fahrenheit Conversion
#### Question
Convert a given temperature value from Celsius to Fahrenheit.

#### Sample Input & Output
- `celsiusToFahrenheit(0)` ➡️ `32`
- `celsiusToFahrenheit(100)` ➡️ `212`

#### Code
```javascript
// Time: O(1) | Space: O(1)
function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(1)$
- **Space Complexity**: $O(1)$
- **Explanation**: Converts temperatures from Celsius to Fahrenheit using the linear formula: $F = C \times \frac{9}{5} + 32$.

---

### 10. Find Divisors / Factors of a Number
#### Question
Find and return all unique positive divisors (factors) of a given number $n$ in sorted ascending order.

#### Sample Input & Output
- `findDivisors(12)` ➡️ `[1, 2, 3, 4, 6, 12]`
- `findDivisors(7)` ➡️ `[1, 7]`

#### Code
```javascript
// Time: O(sqrt(n) log(k)) where k is number of divisors | Space: O(k)
function findDivisors(n) {
  const result = [];
  
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      result.push(i);
      
      // If divisors are different, push the paired divisor
      if (i !== n / i) {
        result.push(n / i);
      }
    }
  }
  
  // Sort in ascending order
  return result.sort((a, b) => a - b);
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(\sqrt{n})$
- **Space Complexity**: $O(\sqrt{n})$ to store factors
- **Explanation**: Iterates from 1 up to the square root of n. When a factor d is found, both d and its division pair $n/d$ are recorded, bypassing linear scanning.

---

### 11. Number Has Exactly Three Divisors
#### Question
Verify if a positive integer has exactly three unique divisors. *Tip*: A number has exactly three divisors if and only if it is the square of a prime number.

#### Sample Input & Output
- `hasThreeDivisors(9)` ➡️ `true` // Divisors: 1, 3, 9 (3 is prime)
- `hasThreeDivisors(12)` ➡️ `false` // Divisors: 1, 2, 3, 4, 6, 12

#### Code
```javascript
// Time: O(sqrt(sqrt(n))) to check primality of root | Space: O(1)
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function hasThreeDivisors(n) {
  const root = Math.sqrt(n);
  
  // Check if root is an integer
  if (root !== Math.floor(root)) return false;
  
  // The square root of n must be a prime number
  return isPrime(root);
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(\sqrt{\sqrt{n}})$ check threshold
- **Space Complexity**: $O(1)$
- **Explanation**: A number has exactly three divisors if and only if it is the square of a prime number. The code verifies that the square root of n is a prime number.

---

### 12. Number With Most Divisors
#### Question
Given an upper limit integer, find the number in the range $[1, \text{limit}]$ that has the maximum number of unique positive divisors. If multiple numbers have the same count, return the smallest one.

#### Sample Input & Output
- `findNumberWithMostDivisors(10)` ➡️ `6` // 6 and 8 have 4 divisors (1,2,3,6 and 1,2,4,8), returns smaller
- `findNumberWithMostDivisors(20)` ➡️ `12` // 12 and 20 have 6 divisors, returns 12

#### Code
```javascript
// Time: O(limit * sqrt(limit)) | Space: O(1)
function getDivisorCount(n) {
  let count = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      count += (i * i === n) ? 1 : 2;
    }
  }
  return count;
}

function findNumberWithMostDivisors(limit) {
  let bestNumber = 1;
  let maxDivisors = 1;
  
  for (let i = 1; i <= limit; i++) {
    const currentDivisors = getDivisorCount(i);
    if (currentDivisors > maxDivisors) {
      maxDivisors = currentDivisors;
      bestNumber = i;
    }
  }
  return bestNumber;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(N \sqrt{N})$ where N is the upper limit
- **Space Complexity**: $O(1)$
- **Explanation**: Iterates through all numbers in the range, calculates their divisor count using the square-root method, and tracks the candidate containing the maximum factors.

---

### 13. Repeated Digit Sum (Single Digit Reduction)
#### Question
Given a positive integer, calculate the sum of its digits repeatedly until a single-digit number is obtained.

#### Sample Input & Output
- `repeatedDigitSum(9875)` ➡️ `2` // 9+8+7+5 = 29 ➡️ 2+9 = 11 ➡️ 1+1 = 2
- `repeatedDigitSum(38)` ➡️ `2` // 3+8 = 11 ➡️ 1+1 = 2

#### Code
```javascript
// Time: O(log10(n)) | Space: O(1)
function repeatedDigitSum(n) {
  while (n >= 10) {
    let sum = 0;
    while (n > 0) {
      sum += n % 10;
      n = Math.floor(n / 10);
    }
    n = sum;
  }
  return n;
}

// Alternative Mathematical approach O(1)
function repeatedDigitSumO1(n) {
  if (n === 0) return 0;
  return n % 9 === 0 ? 9 : n % 9;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(1)$
- **Space Complexity**: $O(1)$
- **Explanation**: Reduces a number to a single digit by calculating its digital root. Implemented efficiently using the math formula: $1 + (n - 1) \pmod 9$.

---

### 14. Count Trailing Zeroes in Factorial
#### Question
Compute the number of trailing zeroes in the factorial of a given integer $n$. *Tip*: Trailing zeroes are created by factors of 5 and 2. Count powers of 5.

#### Sample Input & Output
- `trailingZeroes(5)` ➡️ `1` // 5! = 120 (1 trailing zero)
- `trailingZeroes(25)` ➡️ `6` // 25! has 6 trailing zeroes

#### Code
```javascript
// Time: O(log5(n)) | Space: O(1)
function trailingZeroes(n) {
  let count = 0;
  
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  
  return count;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(\log_5 n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Applies Legendre's formula by dividing n by powers of 5 and summing the quotients. This calculates the count of prime factor 5s, which determines trailing zeroes.

---

## 💻 Part 2: Core DSA Algorithms
*⏱️ 25 min read*

### 15. Two Sum (HashMap Approach)
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ to store elements map
- **Explanation**: Iterates the array, tracking indices in a Map. For each element, checks if its difference complement ($target - current$) is already stored.

---

### 16. Contains Duplicate
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ for the Set
- **Explanation**: Scans the array and inserts items into a Set. If a duplicate is encountered, it returns true immediately, stopping further execution.

---

### 17. Valid Anagram
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$ since character set is bounded
- **Explanation**: Counts letter frequencies. Increments counts for characters in the first string, decrements for the second string, and checks if all final counts are zero.

---

### 18. First Unique Character in a String
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$ bounded hash map
- **Explanation**: Performs a first pass to build a character frequency map, then a second pass to identify the first character with a frequency count of 1.

---

### 19. Move Zeroes
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$ in-place swaps
- **Explanation**: Uses a write pointer index. Iterates the array, shifting all non-zero numbers to the front, and fills all remaining indices with zeroes.

---

### 20. Longest Substring Without Repeating Characters
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(\min(n, m))$ where m is character set size
- **Explanation**: Maintains a sliding window represented by left and right pointers. It expands the right pointer, and contracts the left pointer whenever a repeating character is seen.

---

### 21. Maximum Subarray Sum (Kadane's Algorithm)
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Implements Kadane's algorithm. Iterates through the array, accumulating the current subarray sum and resetting it to 0 if it drops below zero while logging the max.

---

### 22. Valid Parentheses
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ stack allocation
- **Explanation**: Uses a stack to match brackets. Pushes opening brackets onto the stack, and pops them when matching closing brackets are encountered, asserting correct nesting.

---

### 23. Product of Array Except Self
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$ auxiliary space
- **Explanation**: Iterates forward to accumulate prefix products, then loops backward to multiply suffix values directly into the result array to avoid divisions.

---

### 24. Group Anagrams
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

#### Complexity & Explanation
- **Time Complexity**: $O(n \cdot k \log k)$ where k is max string length
- **Space Complexity**: $O(n \cdot k)$
- **Explanation**: Normalizes strings by sorting their characters, and clusters them as values inside a Map indexed by the sorted key representations.

---

### 25. Number of Islands (DFS Graph Algorithm)
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

#### Complexity & Explanation
- **Time Complexity**: $O(R \times C)$
- **Space Complexity**: $O(R \times C)$ stack frames in worst case
- **Explanation**: Traverses the 2D grid. When land '1' is encountered, it increments the island count and triggers DFS to mark all adjacent connected land cells to '0'.

---

### 26. Climbing Stairs (Dynamic Programming)
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

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Solves paths using a dynamic programming state machine, keeping track of only the last two step values to calculate the next step value.

---

### 27. Third Largest Number in Array
#### Question
Find and return the third largest unique number in a given unsorted integer array. If there are fewer than three unique numbers, return the maximum number.

#### Sample Input & Output
- `thirdLargest([3, 2, 1])` ➡️ `1`
- `thirdLargest([1, 2])` ➡️ `2` // Less than 3 unique values, returns max
- `thirdLargest([2, 2, 3, 1])` ➡️ `1` // Unique values are 3, 2, 1; third largest is 1

#### Code
```javascript
// Time: O(n) | Space: O(1)
function thirdLargest(nums) {
  let first = -Infinity;
  let second = -Infinity;
  let third = -Infinity;

  for (const num of nums) {
    // Skip duplicate elements to check only unique values
    if (num === first || num === second || num === third) continue;

    if (num > first) {
      third = second;
      second = first;
      first = num;
    } else if (num > second) {
      third = second;
      second = num;
    } else if (num > third) {
      third = num;
    }
  }

  return third === -Infinity ? first : third;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Scans the array and tracks three variables (`first`, `second`, `third`) initialized to `-Infinity`, shifting values dynamically when larger elements are found.

---

### 28. Range Sum Query (1D Static Array)
#### Question
Given an integer array `nums`, handle multiple queries of the sum of elements between indices `left` and `right` inclusive. Use a prefix sum array to answer each query in $O(1)$ constant time.

#### Sample Input & Output
- Input: `nums = [-2, 0, 3, -5, 2, -1]`
- `sumRange(0, 2)` ➡️ `1` // -2 + 0 + 3 = 1
- `sumRange(2, 5)` ➡️ `-1` // 3 + -5 + 2 + -1 = -1

#### Code
```javascript
class NumArray {
  // Pre-calculate prefix sums at initialization (Time: O(n) | Space: O(n))
  constructor(nums) {
    this.prefixSums = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefixSums[i + 1] = this.prefixSums[i] + nums[i];
    }
  }

  // Answer query in constant time (Time: O(1) | Space: O(1))
  sumRange(left, right) {
    return this.prefixSums[right + 1] - this.prefixSums[left];
  }
}
```

#### Complexity & Explanation
- **Time Complexity**: Pre-computation: $O(n)$, Query: $O(1)$
- **Space Complexity**: $O(n)$ prefix sum storage
- **Explanation**: Constructs a prefix sum array. Computes range sums in constant time by subtracting the prefix sum before the left index from the prefix sum at the right index.

---

### 29. Find Single Number (Bit Manipulation / XOR)
#### Question
Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one. Implement this with linear $O(n)$ time complexity and constant $O(1)$ extra space. *Tip*: Using XOR (`^`), `A ^ A = 0` and `A ^ 0 = A`.

#### Sample Input & Output
- Input: `[4, 1, 2, 1, 2]`
- Output: `4`

#### Code
```javascript
// Time: O(n) | Space: O(1)
function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num; // XOR cancels out pairs, leaving only the single number
  }
  return result;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Applies the XOR bitwise operator across all elements. Since duplicate numbers cancel out ($x \oplus x = 0$), the unique single number remains.

---

### 30. Matrix Traversal (2D Array Grid Search)
#### Question
Traverse and search for a target value in an $m \times n$ 2D matrix where each row is sorted in ascending order from left to right, and the first integer of each row is greater than the last integer of the previous row.

#### Sample Input & Output
- Input:
```javascript
const matrix = [
  [1,   3,  5,  7],
  [10, 11, 16, 20],
  [23, 30, 34, 60]
];
const target = 3;
```
- Output: `true`

#### Code
```javascript
// Time: O(log(m * n)) binary search | Space: O(1)
function searchMatrix(matrix, target) {
  if (!matrix || matrix.length === 0) return false;

  const rows = matrix.length;
  const cols = matrix[0].length;
  let left = 0;
  let right = (rows * cols) - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    // Translate virtual index into 2D row/col coordinates
    const midValue = matrix[Math.floor(mid / cols)][mid % cols];

    if (midValue === target) {
      return true;
    } else if (midValue < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return false;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(R \times C)$
- **Space Complexity**: $O(R \times C)$ queue or call stack
- **Explanation**: Systematically traverses a 2D matrix starting from an origin coordinate, using directional offsets to scan neighbor cells.

---

### 31. String Subsequence Checker
#### Question
Given two strings `s` and `t`, return `true` if `s` is a subsequence of `t`, or `false` otherwise. A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters.

#### Sample Input & Output
- `isSubsequence("abc", "ahbgdc")` ➡️ `true`
- `isSubsequence("axc", "ahbgdc")` ➡️ `false`

#### Code
```javascript
// Time: O(t.length) | Space: O(1)
function isSubsequence(s, t) {
  let sPointer = 0;
  let tPointer = 0;

  while (sPointer < s.length && tPointer < t.length) {
    if (s[sPointer] === t[tPointer]) {
      sPointer++;
    }
    tPointer++;
  }

  return sPointer === s.length;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$ where n is length of parent string
- **Space Complexity**: $O(1)$
- **Explanation**: Utilizes two pointers to scan both strings. Increments the subsequence pointer whenever characters match, checking if it reaches the end.

---

### 32. Semantic Version Comparator
#### Question
Compare two version control strings `version1` and `version2` (e.g., `"1.2.0"` and `"1.10.2"`). Return `-1` if `version1 < version2`, `1` if `version1 > version2`, and `0` if they are equal. Assume semantic numeric groups separated by dots.

#### Sample Input & Output
- `compareVersions("1.2", "1.10")` ➡️ `-1` (Since 2 < 10)
- `compareVersions("1.01", "1.001")` ➡️ `0` (1.01 equals 1.001, both evaluate to 1)
- `compareVersions("1.0", "1.0.0")` ➡️ `0` (Missing revision groups default to 0)

#### Code
```javascript
// Time: O(N + M) where N and M are length of strings | Space: O(N + M) splits
function compareVersions(version1, version2) {
  const v1Parts = version1.split('.');
  const v2Parts = version2.split('.');
  const maxLength = Math.max(v1Parts.length, v2Parts.length);

  for (let i = 0; i < maxLength; i++) {
    // Parse individual integer segments, default to 0 if group is missing
    const num1 = i < v1Parts.length ? parseInt(v1Parts[i], 10) : 0;
    const num2 = i < v2Parts.length ? parseInt(v2Parts[i], 10) : 0;

    if (num1 < num2) return -1;
    if (num1 > num2) return 1;
  }

  return 0;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(1)$ bounds
- **Space Complexity**: $O(1)$
- **Explanation**: Splits both version strings by '.' and compares the integers at major, minor, and patch index positions from left to right.

---

### 33. Subarray Sum Equals K
#### Question
Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`.

#### Sample Input & Output
- Input: `nums = [1, -1, 0], k = 0`
- Output: `3` // [1, -1], [0], [1, -1, 0]

#### Code
```javascript
// Time: O(n) | Space: O(n) hash map
function subarraySum(nums, k) {
  let count = 0;
  let prefixSum = 0;
  const map = new Map();
  map.set(0, 1); // Base case: prefix sum of 0 has occurred once

  for (const num of nums) {
    prefixSum += num;
    if (map.has(prefixSum - k)) {
      count += map.get(prefixSum - k);
    }
    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }

  return count;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ prefix sums map
- **Explanation**: Maintains a running prefix sum and records its frequencies in a Map. At each element, it checks if $currentPrefix - k$ exists in the map.

---

### 34. Maximum Size Subarray Sum Equals K
#### Question
Given an integer array `nums` and an integer `k`, find the maximum length of a continuous subarray that sums to `k`. If there isn't one, return 0 instead.

#### Sample Input & Output
- Input: `nums = [1, -1, 5, -2, 3], k = 3`
- Output: `4` // [1, -1, 5, -2] sums to 3, length 4

#### Code
```javascript
// Time: O(n) | Space: O(n)
function maxSubArrayLen(nums, k) {
  let prefixSum = 0;
  let maxLen = 0;
  const map = new Map();
  map.set(0, -1); // Prefix sum of 0 at index -1

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    if (map.has(prefixSum - k)) {
      maxLen = Math.max(maxLen, i - map.get(prefixSum - k));
    }
    if (!map.has(prefixSum)) {
      map.set(prefixSum, i);
    }
  }

  return maxLen;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ prefix index map
- **Explanation**: Tracks the first occurrence index of prefix sums in a Map. When $currentPrefix - k$ is found, evaluates and records the max subarray distance.

---

### 35. Continuous Subarray Sum
#### Question
Given an integer array `nums` and an integer `k`, return `true` if `nums` has a continuous subarray of size at least two whose elements sum up to a multiple of `k` (i.e., sum = $n \times k$ where $n$ is an integer), otherwise `false`.

#### Sample Input & Output
- Input: `nums = [23, 2, 6, 4, 7], k = 6`
- Output: `true` // [23, 2, 6, 4, 7] has [2, 6, 4] which sums to 12 (multiple of 6)

#### Code
```javascript
// Time: O(n) | Space: O(n) hash map remainders
function checkSubarraySum(nums, k) {
  let prefixSum = 0;
  const map = new Map();
  map.set(0, -1); // Remainder of 0 at index -1

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    const rem = prefixSum % k;
    
    if (map.has(rem)) {
      if (i - map.get(rem) >= 2) {
        return true;
      }
    } else {
      map.set(rem, i);
    }
  }

  return false;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(\min(n, k))$ mod values map
- **Explanation**: Tracks running prefix sums modulo k in a Map. If a modulo remainder is seen twice at indexes separated by more than one step, it indicates a multiple of k.

---

### 36. Two Sum II (Sorted Array)
#### Question
Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return their 1-indexed positions.

#### Sample Input & Output
- Input: `numbers = [2, 7, 11, 15], target = 9`
- Output: `[1, 2]`

#### Code
```javascript
// Time: O(n) two-pointer | Space: O(1)
function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Uses two pointers at the boundaries of the sorted array, adjusting them inward depending on how the sum compares to the target.

---

### 37. 3 Sum (Zero Sum Triplets)
#### Question
Given an integer array `nums`, return all unique triplets `[nums[i], nums[j], nums[k]]` such that $i \neq j, i \neq k, j \neq k$, and `nums[i] + nums[j] + nums[k] === 0`.

#### Sample Input & Output
- Input: `[-1, 0, 1, 2, -1, -4]`
- Output: `[[-1, -1, 2], [-1, 0, 1]]`

#### Code
```javascript
// Time: O(n^2) | Space: O(log n) sort space
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Avoid duplicate triplets on first pivot
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // Shift pointers avoiding duplicates
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
```

#### Complexity & Explanation
- **Time Complexity**: $O(n^2)$
- **Space Complexity**: $O(1)$
- **Explanation**: Sorts the array and loops through. For each element, uses two pointers to search for complement pairs, skipping duplicate elements.

---

### 38. Container With Most Water
#### Question
You are given an integer array `height` of length $n$. There are $n$ vertical lines drawn such that the two endpoints of the $i$-th line are $(i, 0)$ and $(i, \text{height}[i])$. Find two lines that together with the x-axis form a container, such that the container contains the most water.

#### Sample Input & Output
- Input: `[1, 8, 6, 2, 5, 4, 8, 3, 7]`
- Output: `49` // Lines at index 1 and 8 (height 8 and 7), width = 7, min height = 7, area = 49

#### Code
```javascript
// Time: O(n) | Space: O(1)
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const minHeight = Math.min(height[left], height[right]);
    const area = width * minHeight;
    maxWater = Math.max(maxWater, area);

    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxWater;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Uses two boundary pointers. Measures capacity as $(right - left) \times \min(height[left], height[right])$, and shifts the pointer with the shorter bar.

---

### 39. Maximum Sum of Distinct Subarrays of Length K
#### Question
Given an integer array `nums` and an integer `k`, find the maximum sum of a continuous subarray of length `k` where all elements in the subarray are distinct. Return 0 if no such subarray exists.

#### Sample Input & Output
- Input: `nums = [1, 5, 4, 2, 9, 9, 9], k = 3`
- Output: `15` // Subarray [5, 4, 2] has length 3, distinct items, sum = 15

#### Code
```javascript
// Time: O(n) sliding window | Space: O(k) set
function maximumSubarraySum(nums, k) {
  let left = 0;
  let currentSum = 0;
  let maxSum = 0;
  const set = new Set();

  for (let right = 0; right < nums.length; right++) {
    // Shrink window if duplicate item is added
    while (set.has(nums[right])) {
      set.delete(nums[left]);
      currentSum -= nums[left];
      left++;
    }

    set.add(nums[right]);
    currentSum += nums[right];

    // Maintain window length of k
    if (right - left + 1 > k) {
      set.delete(nums[left]);
      currentSum -= nums[left];
      left++;
    }

    if (right - left + 1 === k) {
      maxSum = Math.max(maxSum, currentSum);
    }
  }
  return maxSum;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(k)$ Set
- **Explanation**: Slides a window of size k. Tracks unique elements in a Set and maintains a running sum. When the Set size equals k, updates the maximum sum.

---

### 40. Maximum Average Subarray
#### Question
Given an integer array `nums` and an integer `k`, find a contiguous subarray of length `k` that has the maximum average value and return this value.

#### Sample Input & Output
- Input: `nums = [1, 12, -5, -6, 50, 3], k = 4`
- Output: `12.75` // Subarray [12, -5, -6, 50] has sum 51, average = 12.75

#### Code
```javascript
// Time: O(n) sliding window | Space: O(1)
function findMaxAverage(nums, k) {
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += nums[i];
  }
  let maxSum = currentSum;

  for (let i = k; i < nums.length; i++) {
    currentSum = currentSum + nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum / k;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Slides a window of size k across the array, tracking the sum of the elements and dividing by k to maintain the maximum average value.

---

### 41. Second Highest Frequency Number
#### Question
Given an array of integers, return the number having the second highest frequency. If multiple numbers have the same frequency, return the largest number among them. If fewer than 2 unique frequencies exist, return null.

#### Sample Input & Output
- Input: `[1, 2, 2, 3, 3, 3, 4, 4]` ➡️ `4` // Freqs: 3->3, 2->2, 4->2, 1->1. Second highest freq is 2. Candidates with freq 2: [2, 4]. Largest is 4.
- Input: `[5, 5, 5, 7, 7, 8, 8]` ➡️ `8` // Freqs: 5->3, 7->2, 8->2. Second highest freq is 2. Candidates: [7, 8]. Largest is 8.

#### Code
```javascript
// Time: O(n) | Space: O(n) hash map
function secondHighestFrequency(arr) {
  const freqMap = {};
  for (const num of arr) {
    freqMap[num] = (freqMap[num] || 0) + 1;
  }

  // Find unique frequencies, sorted in descending order
  const uniqueFreqs = [...new Set(Object.values(freqMap))].sort((a, b) => b - a);
  if (uniqueFreqs.length < 2) return null;

  const targetFreq = uniqueFreqs[1]; // Second highest frequency
  let result = -Infinity;

  for (const numStr in freqMap) {
    if (freqMap[numStr] === targetFreq) {
      result = Math.max(result, Number(numStr));
    }
  }

  return result === -Infinity ? null : result;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ frequencies map
- **Explanation**: Counts element frequencies in a Map, and scans the map to identify the element containing the second highest frequency value.

---

### 42. Most Frequent Character
#### Question
Given a string, find the character that appears the maximum number of times. If there is a tie, return the alphabetically smallest character.

#### Sample Input & Output
- Input: `"javascript"` ➡️ `"a"`
- Input: `"aabbcc"` ➡️ `"a"`

#### Code
```javascript
// Time: O(n) | Space: O(1) frequency count map
function mostFrequentChar(str) {
  const counts = {};
  let maxCount = 0;
  let bestChar = '';

  for (const char of str) {
    counts[char] = (counts[char] || 0) + 1;
  }

  for (const char in counts) {
    const count = counts[char];
    if (count > maxCount) {
      maxCount = count;
      bestChar = char;
    } else if (count === maxCount) {
      if (char < bestChar) {
        bestChar = char;
      }
    }
  }

  return bestChar;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$ bounded character map
- **Explanation**: Counts character frequencies in a Map and tracks the character with the maximum count value.

---

### 43. First Repeating Element
#### Question
Given an array of integers, find the first repeating element in the array. That is, find the element that occurs more than once and whose index of first occurrence is the smallest.

#### Sample Input & Output
- Input: `[10, 5, 3, 4, 3, 5, 6]` ➡️ `5` // Both 5 and 3 repeat, but 5 appears first at index 1

#### Code
```javascript
// Time: O(n) | Space: O(n) set
function firstRepeatingElement(arr) {
  let minIndex = -1;
  const set = new Set();

  // Traverse array backward to capture smallest index
  for (let i = arr.length - 1; i >= 0; i--) {
    if (set.has(arr[i])) {
      minIndex = i;
    } else {
      set.add(arr[i]);
    }
  }

  return minIndex !== -1 ? arr[minIndex] : null;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ Set
- **Explanation**: Scans the array backward, recording visited items in a Set. Whenever a visited element is re-encountered, it updates the repeating candidate.

---

### 44. Longest Consecutive Sequence
#### Question
Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. Write an algorithm that runs in $O(n)$ time.

#### Sample Input & Output
- Input: `[100, 4, 200, 1, 3, 2]`
- Output: `4` // Sequence: 1, 2, 3, 4

#### Code
```javascript
// Time: O(n) | Space: O(n) set checks
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longestStreak = 0;

  for (const num of numSet) {
    // Only start counting sequence if it's the baseline start
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (numSet.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }

      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }

  return longestStreak;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ Set
- **Explanation**: Inserts all numbers into a Set. Iterates through the set, and if $num - 1$ is not present, computes the length of the sequence starting at $num$.

---

### 45. Rotate Array by K Positions
#### Question
Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative. Implement it in-place with $O(1)$ extra space.

#### Sample Input & Output
- Input: `nums = [1, 2, 3, 4, 5], k = 2`
- Output: `[4, 5, 1, 2, 3]`

#### Code
```javascript
// Time: O(n) three reversals | Space: O(1) in-place
function reverse(arr, start, end) {
  while (start < end) {
    const temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
}

function rotateArray(nums, k) {
  k = k % nums.length;
  if (k === 0) return nums;

  // 1. Reverse entire array
  reverse(nums, 0, nums.length - 1);
  // 2. Reverse first k elements
  reverse(nums, 0, k - 1);
  // 3. Reverse remaining elements
  reverse(nums, k, nums.length - 1);

  return nums;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Reverses the entire array, then reverses the first k elements, and finally reverses the remaining $n - k$ elements to perform rotation in-place.

---

### 46. Maximum Sum Subarray of Size K
#### Question
Given an array of integers and a window size `k`, find the maximum sum of a contiguous subarray of size `k`.

#### Sample Input & Output
- Input: `[2, 1, 5, 1, 3, 2], k = 3`
- Output: `9` // [5, 1, 3]

#### Code
```javascript
// Time: O(n) sliding window | Space: O(1)
function maxSubarraySumK(arr, k) {
  if (arr.length < k) return 0;
  
  let currentSum = 0;
  for (let i = 0; i < k; i++) {
    currentSum += arr[i];
  }
  let maxSum = currentSum;

  for (let i = k; i < arr.length; i++) {
    currentSum = currentSum + arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, currentSum);
  }

  return maxSum;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Evaluates the sum of the first k elements, then slides the window by adding the next item and subtracting the leftmost item to maintain the sum.

---

### 47. Longest Common Prefix
#### Question
Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string `""`.

#### Sample Input & Output
- Input: `["flower", "flow", "flight"]` ➡️ `"fl"`
- Input: `["dog", "racecar", "car"]` ➡️ `""`

#### Code
```javascript
// Time: O(N * S) where N is number of strings and S is length of smallest string | Space: O(1)
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") return "";
    }
  }

  return prefix;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(N \cdot S)$ where S is length of smallest string
- **Space Complexity**: $O(1)$
- **Explanation**: Assumes the first string is the common prefix. Iterates through the list, shrinking the prefix string until it matches the beginning of each string.

---

### 48. String Compression
#### Question
Implement a method to perform basic string compression using the counts of repeated characters. If the compressed string is not smaller than the original string, return the original string.

#### Sample Input & Output
- Input: `"aabcccccaaa"` ➡️ `"a2b1c5a3"`
- Input: `"abc"` ➡️ `"abc"` (compressed `"a1b1c1"` is longer)

#### Code
```javascript
// Time: O(n) | Space: O(n)
function compressString(str) {
  let compressed = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      compressed += str[i] + count;
      count = 1;
    }
  }

  return compressed.length < str.length ? compressed : str;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$
- **Explanation**: Traverses the string, counting consecutive repeating characters. Compiles characters and counts, and returns the original if the output is not shorter.

---

### 49. Next Greater Element
#### Question
Given an array, find the Next Greater Element (NGE) for every element. The Next Greater Element for an element $x$ is the first greater element on the right side of $x$ in array. If no greater element exists, output -1.

#### Sample Input & Output
- Input: `[2, 1, 2, 4, 3]`
- Output: `[4, 2, 4, -1, -1]`

#### Code
```javascript
// Time: O(n) stack traversal | Space: O(n) stack
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Stores index references

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = nums[i];
    }
    stack.push(i);
  }

  return result;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$ stack allocation
- **Explanation**: Maintains a monotonic stack of indices. When an element is larger than the element at the index on top of the stack, it resolves the next greater element.

---

### 50. Trapping Rain Water
#### Question
Given $n$ non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

#### Sample Input & Output
- Input: `[4, 2, 0, 3, 2, 5]`
- Output: `9`

#### Code
```javascript
// Time: O(n) two-pointer | Space: O(1)
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let trappedWater = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        trappedWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        trappedWater += rightMax - height[right];
      }
      right--;
    }
  }
  return trappedWater;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Uses left and right pointers. Tracks the maximum heights seen on both sides, and adds the trapped water difference at the lower pointer.

---

### 51. Missing Number
#### Question
Given an array `nums` containing $n$ distinct numbers in the range $[0, n]$, return the only number in the range that is missing from the array.

#### Sample Input & Output
- Input: `[3, 0, 1]` ➡️ `2`
- Input: `[9, 6, 4, 2, 3, 5, 7, 0, 1]` ➡️ `8`

#### Code
```javascript
// Time: O(n) | Space: O(1) mathematical summation
function missingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, sum) => acc + sum, 0);
  return expectedSum - actualSum;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Calculates the expected mathematical sum of numbers from 0 to n using $\frac{n(n+1)}{2}$ and subtracts the actual sum of the array.

---

### 52. Top K Frequent Elements
#### Question
Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.

#### Sample Input & Output
- Input: `nums = [1, 1, 1, 2, 2, 3], k = 2`
- Output: `[1, 2]`

#### Code
```javascript
// Time: O(n) bucket sort | Space: O(n)
function topKFrequent(nums, k) {
  const counts = {};
  for (const num of nums) {
    counts[num] = (counts[num] || 0) + 1;
  }

  // Bucket array where index represents frequency
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const num in counts) {
    const freq = counts[num];
    buckets[freq].push(Number(num));
  }

  const result = [];
  // Read buckets from highest frequency backward
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      result.push(...buckets[i]);
    }
  }

  return result.slice(0, k);
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n)$
- **Space Complexity**: $O(n)$
- **Explanation**: Counts frequencies in a Map, distributes numbers into buckets using frequency as index, and scans buckets backward to collect the top k elements.

---

### 53. Kth Largest Element in an Array
#### Question
Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array. Note that it is the `k`-th largest element in the sorted order, not the `k`-th distinct element.

#### Sample Input & Output
- Input: `[3, 2, 1, 5, 6, 4], k = 2`
- Output: `5`

#### Code
```javascript
// Time: O(n log n) sorting | Space: O(1)
function findKthLargest(nums, k) {
  nums.sort((a, b) => b - a);
  return nums[k - 1];
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n \log n)$
- **Space Complexity**: $O(1)$
- **Explanation**: Sorts the array in descending order, and resolves the value located at position $k-1$.

---

### 54. Merge Intervals
#### Question
Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

#### Sample Input & Output
- Input: `[[1, 3], [2, 6], [8, 10], [15, 18]]`
- Output: `[[1, 6], [8, 10], [15, 18]]`

#### Code
```javascript
// Time: O(n log n) sorting | Space: O(n) merge results
function mergeIntervals(intervals) {
  if (intervals.length <= 1) return intervals;

  // Sort intervals by their start values
  intervals.sort((a, b) => a[0] - b[0]);
  
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const lastMerged = merged[merged.length - 1];

    if (current[0] <= lastMerged[1]) {
      // Overlap detected, merge boundaries
      lastMerged[1] = Math.max(lastMerged[1], current[1]);
    } else {
      merged.push(current);
    }
  }

  return merged;
}
```

#### Complexity & Explanation
- **Time Complexity**: $O(n \log n)$
- **Space Complexity**: $O(n)$ merged list
- **Explanation**: Sorts intervals by their start times, then traverses them, merging overlapping boundaries dynamically into a results array.

```
