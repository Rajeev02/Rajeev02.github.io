## 🧩 Section 2: Key Algorithmic Patterns

*⏱️ 3 min read*

Most screening interview problems can be decomposed into five foundational patterns.

#### 1. HashMap & Set (Constant Time Lookup)
- **Problem Indicator**: Frequent lookups, tracking duplicates, checking intersections, counting item frequencies.
- **Mechanism**: Standard arrays have a linear search complexity of $O(N)$ via `.includes()`. A Hash Set or HashMap uses a hashing function to map key strings to direct memory blocks, resolving lookups in constant $O(1)$ average time.
- **Example (Checking for target sum pair)**:
  ```javascript
  // Time Complexity: O(N) | Space Complexity: O(N)
  function hasPairWithSum(arr, targetSum) {
    const seen = new Set();
    for (const num of arr) {
      if (seen.has(targetSum - num)) {
        return true; // Match found in O(1) time
      }
      seen.add(num);
    }
    return false;
  }
  ```

#### 2. Two Pointers (Optimal Scans)
- **Problem Indicator**: Sorted arrays, reversing strings, searching for element pairs.
- **Mechanism**: Instead of scanning arrays with nested loops ($O(N^2)$), initialize two pointer indexes (typically `left = 0` and `right = array.length - 1`). Increment or decrement the pointers toward the center depending on conditional rules, completing calculations in a single $O(N)$ linear pass.
- **Example (Finding target sum in sorted array)**:
  ```javascript
  // Time Complexity: O(N) | Space Complexity: O(1)
  function hasTwoSumSorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      const sum = arr[left] + arr[right];
      if (sum === target) return true;
      if (sum < target) {
        left++; // Shift right to increase sum
      } else {
        right--; // Shift left to decrease sum
      }
    }
    return false;
  }
  ```

#### 3. Sliding Window (Subarrays)
- **Problem Indicator**: Continuous subarrays, longest/shortest substrings matching criteria.
- **Mechanism**: Maintain a dynamic window frame represented by `left` and `right` bounds. As the `right` pointer expands the window to ingest new data, contract the `left` pointer to maintain criteria constraints. This avoids recalculating values for overlapping segments, executing in $O(N)$ time.
- **Example (Maximum sum subarray of size k)**:
  ```javascript
  // Time Complexity: O(N) | Space Complexity: O(1)
  function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    for (let i = 0; i < arr.length; i++) {
      windowSum += arr[i]; // Add current element
      if (i >= k - 1) {
        maxSum = Math.max(maxSum, windowSum);
        windowSum -= arr[i - (k - 1)]; // Evict element going out of window
      }
    }
    return maxSum;
  }
  ```

#### 4. Stack (Last-In-First-Out)
- **Problem Indicator**: Balanced brackets matching, undo operations, parsing compiler layouts.
- **Mechanism**: The stack enforces a LIFO execution rule. Items are pushed onto the top and popped off the top. This is ideal for validating nested relationships (e.g., checking if opening brackets match the nearest closing bracket).
- **Example (Valid Parentheses)**:
  ```javascript
  // Time Complexity: O(N) | Space Complexity: O(N)
  function isValidParentheses(str) {
    const stack = [];
    const mapping = { ")": "(", "}": "{", "]": "[" };
    for (const char of str) {
      if (char in mapping) {
        const topElement = stack.pop();
        if (topElement !== mapping[char]) return false;
      } else {
        stack.push(char); // Store opening bracket
      }
    }
    return stack.length === 0;
  }
  ```

#### 5. Graph Traversals: BFS vs. DFS
Graphs are represented using an **Adjacency List** (a HashMap mapping node keys to arrays of neighbors).
```javascript
const graph = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: [],
  E: []
};
```

##### Breadth-First Search (BFS)
- **Mechanism**: Explores nodes level-by-level starting from the root. It uses a **Queue (FIFO)** structure.
- **Best For**: Finding the shortest path in unweighted graphs.
- **Example**:
  ```javascript
  // Time Complexity: O(V + E) | Space Complexity: O(V)
  function bfs(startNode) {
    const queue = [startNode];
    const visited = new Set([startNode]);
    while (queue.length > 0) {
      const node = queue.shift();
      console.log(node); // Process current node
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
  ```

##### Depth-First Search (DFS)
- **Mechanism**: Explores as deep as possible down each branch before backtracking. It uses **Recursion** (under-the-hood Call Stack).
- **Best For**: Exposing paths, cycle detection, and topological sorting.
- **Example**:
  ```javascript
  // Time Complexity: O(V + E) | Space Complexity: O(V)
  function dfs(node, visited = new Set()) {
    visited.add(node);
    console.log(node); // Process current node
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, visited);
      }
    }
  }
  ```


---
