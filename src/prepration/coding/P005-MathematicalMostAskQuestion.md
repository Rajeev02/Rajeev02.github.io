If you're preparing for **React Native / JavaScript / DSA interviews (HackerRank, IBM, EPAM, TCS, Accenture, Infosys, Wipro, Product Companies)**, these are the most common Mathematical DSA questions from your list.

---

# 1. Even & Odd Number

### Interview Question

Check whether a number is even or odd.

```javascript
function isEven(num) {
  return num % 2 === 0;
}
```

### HackerRank Variation

Count even numbers in an array.

```javascript
function countEven(arr) {
  return arr.filter((num) => num % 2 === 0).length;
}
```

---

# 2. Prime Number

### Interview Question

Check if a number is prime.

```javascript
function isPrime(n) {
  if (n <= 1) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }

  return true;
}
```

### Follow-up

Print primes between 1 and N.

```javascript
function printPrimes(n) {
  for (let i = 2; i <= n; i++) {
    if (isPrime(i)) console.log(i);
  }
}
```

---

# 3. Composite Number

### Question

Check whether a number is composite.

```javascript
function isComposite(n) {
  if (n <= 1) return false;

  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return true;
  }

  return false;
}
```

---

# 4. Factorial

### Interview Question

```javascript
function factorial(n) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}
```

### Recursive

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
```

---

# 5. Divisors / Factors

### Question

Find all divisors of a number.

```javascript
function divisors(n) {
  let result = [];

  for (let i = 1; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      result.push(i);

      if (i !== n / i) {
        result.push(n / i);
      }
    }
  }

  return result.sort((a, b) => a - b);
}
```

---

# 6. Multiples

### Question

Print multiples of N.

```javascript
function multiples(num, limit) {
  for (let i = 1; i <= limit; i++) {
    console.log(num * i);
  }
}
```

---

# 7. Armstrong Number

### Interview Question

153 = 1³+5³+3³

```javascript
function isArmstrong(num) {
  let digits = String(num).split("");
  let power = digits.length;

  let sum = digits.reduce(
    (acc, digit) => acc + Math.pow(Number(digit), power),
    0,
  );

  return sum === num;
}
```

---

# 8. Palindrome Number

### Question

```javascript
function isPalindrome(num) {
  let str = String(num);

  return str === str.split("").reverse().join("");
}
```

---

# 9. Anagram

### Interview Question

```javascript
function isAnagram(str1, str2) {
  const normalize = (str) => str.toLowerCase().split("").sort().join("");

  return normalize(str1) === normalize(str2);
}
```

Example:

```javascript
isAnagram("listen", "silent");
```

---

# 10. Repeated Digit Sum

### Question

9875

9+8+7+5=29

2+9=11

1+1=2

```javascript
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
```

---

# 11. Base Conversion

### Decimal to Binary

```javascript
function decimalToBinary(n) {
  return n.toString(2);
}
```

### Binary to Decimal

```javascript
function binaryToDecimal(binary) {
  return parseInt(binary, 2);
}
```

---

# 12. Fibonacci

### Iterative

```javascript
function fibonacci(n) {
  let a = 0,
    b = 1;

  for (let i = 0; i < n; i++) {
    console.log(a);

    let temp = a + b;

    a = b;
    b = temp;
  }
}
```

### Nth Fibonacci

```javascript
function nthFib(n) {
  let a = 0,
    b = 1;

  for (let i = 2; i <= n; i++) {
    let temp = a + b;

    a = b;
    b = temp;
  }

  return n === 0 ? 0 : b;
}
```

---

# 13. AP (Arithmetic Progression)

### nth Term

```javascript
function apNthTerm(a, d, n) {
  return a + (n - 1) * d;
}
```

---

# 14. GP (Geometric Progression)

```javascript
function gpNthTerm(a, r, n) {
  return a * Math.pow(r, n - 1);
}
```

---

# 15. Mean

```javascript
function mean(arr) {
  let sum = arr.reduce((a, b) => a + b, 0);

  return sum / arr.length;
}
```

---

# 16. Median

```javascript
function median(arr) {
  arr.sort((a, b) => a - b);

  let mid = Math.floor(arr.length / 2);

  return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
}
```

---

# 17. Mode

```javascript
function mode(arr) {
  let freq = {};
  let max = 0;
  let result;

  for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;

    if (freq[num] > max) {
      max = freq[num];
      result = num;
    }
  }

  return result;
}
```

---

# 18. nCr (Combination)

Formula:

```text
nCr = n! / r!(n-r)!
```

```javascript
function factorial(n) {
  let result = 1;

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

function nCr(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}
```

---

# 19. Celsius to Fahrenheit

```javascript
function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}
```

---

# 20. GCD (Euclidean Algorithm)

### Most Asked

```javascript
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;

    b = a % b;

    a = temp;
  }

  return a;
}
```

---

# 21. LCM

```javascript
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;

    b = a % b;

    a = temp;
  }

  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}
```

---

# 22. Sieve of Eratosthenes

### Print all primes till N

```javascript
function sieve(n) {
  let prime = new Array(n + 1).fill(true);

  prime[0] = prime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (prime[i]) {
      for (let j = i * i; j <= n; j += i) {
        prime[j] = false;
      }
    }
  }

  return prime.map((v, i) => (v ? i : null)).filter(Boolean);
}
```

---

# 23. Trailing Zeroes in Factorial

### Very Popular

```javascript
function trailingZeroes(n) {
  let count = 0;

  while (n > 0) {
    n = Math.floor(n / 5);

    count += n;
  }

  return count;
}
```

---

# 24. Find All Divisors

```javascript
function allDivisors(n) {
  let result = [];

  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      result.push(i);

      if (i !== n / i) {
        result.push(n / i);
      }
    }
  }

  return result.sort((a, b) => a - b);
}
```

---

# 25. Number Has Exactly Three Divisors

### Trick

Number must be square of a prime.

```javascript
function exactlyThreeDivisors(n) {
  let root = Math.sqrt(n);

  if (root !== Math.floor(root)) return false;

  return isPrime(root);
}
```

---

# 26. Number With Most Divisors

### HackerRank Style

```javascript
function maxDivisorCount(limit) {
  let maxNum = 1;
  let maxDiv = 1;

  for (let i = 1; i <= limit; i++) {
    let count = 0;

    for (let j = 1; j * j <= i; j++) {
      if (i % j === 0) {
        count += j * j === i ? 1 : 2;
      }
    }

    if (count > maxDiv) {
      maxDiv = count;
      maxNum = i;
    }
  }

  return maxNum;
}
```

---

# Top 10 Most Asked in Interviews

1. Prime Number
2. Palindrome Number
3. Armstrong Number
4. Factorial
5. Fibonacci
6. Anagram
7. GCD
8. LCM
9. Trailing Zeroes in Factorial
10. Sieve of Eratosthenes

These 10 alone cover roughly **80% of mathematical coding questions** asked in JavaScript, React Native, and HackerRank screening rounds.
