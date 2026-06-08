import sys

file_path = "/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise/09-Daily-Coding/daily-coding.md"

with open(file_path, 'r') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "## 1. Output of given code" in line:
        start_idx = i
    if "## 9. Add the digit until you not get the single digit number" in line:
        # We need to find the end of the swift code block after this
        for j in range(i+1, len(lines)):
            if "```" in lines[j] and j > i + 3:
                end_idx = j
                break

if start_idx != -1 and end_idx != -1:
    new_content = """## 1. Output of given code

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

## 2. 3rd largest number in given of an array

## 3. How will you improve the performance during the initial of app launch

## 4. Given a string containing just the characters ‘(‘, ‘)’, ‘{‘, ‘}’, ‘[‘, and ‘]’, determine if the input string is valid
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

## 5. PrefixSum patterns

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

## 6. Two Pointer patterns

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

## 7. Sliding window patterns

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

## 8. Two Sum Problem when array not sorted

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

## 9. Add the digit until you not get the single digit number

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
"""
    
    lines[start_idx:end_idx+1] = [new_content + "\n"]
    
    with open(file_path, 'w') as f:
        f.writelines(lines)
    print("Successfully replaced.")
else:
    print(f"Indices not found. start_idx={start_idx}, end_idx={end_idx}")

