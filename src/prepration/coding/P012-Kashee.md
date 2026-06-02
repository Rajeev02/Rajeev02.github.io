Yes. The PDF contains Swift interview coding questions and patterns. I'll convert them into **JavaScript** with examples and expected outputs.

---

# 1. Output of Given Code (GCD Queue Concept → JavaScript Async)

### JavaScript Version

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
```

### Possible Output

```text
A
F
B
D
C
E
```

### Interview Point

- Synchronous code executes first.
- Microtasks (`Promise.then`) execute before macrotasks (`setTimeout`).

---

# 2. Third Largest Number in Array

### Example

```javascript
const nums = [10, 5, 20, 8, 15];
```

### Solution

```javascript
function thirdLargest(nums) {
  const unique = [...new Set(nums)].sort((a, b) => b - a);

  return unique.length >= 3 ? unique[2] : null;
}

console.log(thirdLargest([10, 5, 20, 8, 15]));
```

### Output

```text
10
```

### Complexity

```text
Time: O(n log n)
Space: O(n)
```

---

# 3. Valid Parentheses

### Example

```javascript
Input: "()[]{}";
Output: true;
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
    if (map[ch]) {
      if (stack.pop() !== map[ch]) {
        return false;
      }
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
}

console.log(isValid("()[]{}"));
```

### Output

```text
true
```

### Complexity

```text
Time: O(n)
Space: O(n)
```

---

# 4. Prefix Sum Array

### Example

```javascript
Input: [3, 5, 4, 2, 7, 9];
Output: [3, 8, 12, 14, 21, 30];
```

### Solution

```javascript
function prefixSum(nums) {
  const prefix = [nums[0]];

  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] + nums[i];
  }

  return prefix;
}

console.log(prefixSum([3, 5, 4, 2, 7, 9]));
```

---

# 5. Range Sum Query

### Example

```javascript
nums = [-2, 0, 3, -5, 2, -1];

sumRange(1, 5);
```

### Output

```text
-1
```

### Solution

```javascript
class NumArray {
  constructor(nums) {
    this.prefix = [...nums];

    for (let i = 1; i < nums.length; i++) {
      this.prefix[i] += this.prefix[i - 1];
    }
  }

  sumRange(left, right) {
    if (left === 0) {
      return this.prefix[right];
    }

    return this.prefix[right] - this.prefix[left - 1];
  }
}

const obj = new NumArray([-2, 0, 3, -5, 2, -1]);

console.log(obj.sumRange(1, 5));
```

---

# 6. Subarray Sum Equals K

### Example

```javascript
nums = [1, -1, 0];
k = 0;
```

### Output

```text
3
```

### Solution

```javascript
function subarraySum(nums, k) {
  let count = 0;
  let prefixSum = 0;

  const map = new Map();
  map.set(0, 1);

  for (const num of nums) {
    prefixSum += num;

    count += map.get(prefixSum - k) || 0;

    map.set(prefixSum, (map.get(prefixSum) || 0) + 1);
  }

  return count;
}

console.log(subarraySum([1, -1, 0], 0));
```

---

# 7. Maximum Size Subarray Sum Equals K

### Example

```javascript
nums = [1, -1, 5, -2, 3];
k = 3;
```

### Output

```text
4
```

### Solution

```javascript
function maxSubArrayLen(nums, k) {
  let prefix = 0;
  let maxLen = 0;

  const map = new Map();
  map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];

    if (map.has(prefix - k)) {
      maxLen = Math.max(maxLen, i - map.get(prefix - k));
    }

    if (!map.has(prefix)) {
      map.set(prefix, i);
    }
  }

  return maxLen;
}

console.log(maxSubArrayLen([1, -1, 5, -2, 3], 3));
```

---

# 8. Continuous Subarray Sum

### Example

```javascript
nums = [23, 2, 6, 4, 7];
k = 6;
```

### Output

```text
true
```

### Solution

```javascript
function checkSubarraySum(nums, k) {
  let prefix = 0;

  const map = new Map();
  map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i];

    const rem = prefix % k;

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

---

# 9. Two Sum II (Sorted Array)

### Example

```javascript
numbers = [2, 7, 11, 15];
target = 9;
```

### Output

```text
[1,2]
```

### Solution

```javascript
function twoSum(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1];
    }

    if (sum > target) {
      right--;
    } else {
      left++;
    }
  }

  return [];
}
```

---

# 10. 3 Sum

### Example

```javascript
Input: [-1, 0, 1, 2, -1, -4];

Output: [
  [-1, -1, 2],
  [-1, 0, 1],
];
```

### Solution

```javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);

  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }

    let left = i + 1;
    let right = nums.length - 1;

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
```

---

# 11. Container With Most Water

```javascript
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const area = (right - left) * Math.min(height[left], height[right]);

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

---

# 12. Longest Substring Without Repeating Characters

### Example

```javascript
Input: "abcabcbb";
Output: 3;
```

### Solution

```javascript
function lengthOfLongestSubstring(s) {
  const map = new Map();

  let left = 0;
  let maxLen = 0;

  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1);
    }

    map.set(s[right], right);

    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
}
```

---

# 13. Maximum Sum of Distinct Subarrays of Length K

```javascript
function maximumSubarraySum(nums, k) {
  let left = 0;
  let currentSum = 0;
  let maxSum = 0;

  const set = new Set();

  for (let right = 0; right < nums.length; right++) {
    while (set.has(nums[right])) {
      set.delete(nums[left]);
      currentSum -= nums[left];
      left++;
    }

    set.add(nums[right]);
    currentSum += nums[right];

    while (right - left + 1 > k) {
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

---

# 14. Maximum Average Subarray

```javascript
function findMaxAverage(nums, k) {
  let left = 0;
  let currentSum = 0;
  let maxAvg = -Infinity;

  for (let right = 0; right < nums.length; right++) {
    currentSum += nums[right];

    if (right - left + 1 > k) {
      currentSum -= nums[left];
      left++;
    }

    if (right - left + 1 === k) {
      maxAvg = Math.max(maxAvg, currentSum / k);
    }
  }

  return maxAvg;
}
```

---

# 15. Two Sum (Unsorted Array)

### Example

```javascript
nums = [3, 2, 4];
target = 6;
```

### Output

```text
[1,2]
```

### Solution

```javascript
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}
```

---

# 16. Add Digits Until Single Digit

### Example

```javascript
Input: "123456";
```

### Calculation

```text
1+2+3+4+5+6 = 21
2+1 = 3
```

### Output

```text
3
```

### Solution

```javascript
function singleDigitSum(str) {
  let sum = str.split("").reduce((acc, digit) => acc + Number(digit), 0);

  while (sum >= 10) {
    sum = String(sum)
      .split("")
      .reduce((acc, digit) => acc + Number(digit), 0);
  }

  return sum;
}

console.log(singleDigitSum("123456"));
```

---

These are the main Swift interview questions from the PDF converted into JavaScript with examples, outputs, complexity, and interview-ready solutions.
