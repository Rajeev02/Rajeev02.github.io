## Program 4: Nested Array Flattening
*⏱️ 1 min read*

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
