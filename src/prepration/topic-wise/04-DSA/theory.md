
<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [📈 Section 1: Complexity & Big O Notation](#section-1-complexity-big-o-notation)
  - [1. Common Time Complexities (Ordered by Efficiency)](#1-common-time-complexities-ordered-by-efficiency)
  - [2. Space Complexity](#2-space-complexity)
- [🧩 Section 2: Key Algorithmic Patterns](#section-2-key-algorithmic-patterns)
  - [1. HashMap & Set (Constant Time Lookup)](#1-hashmap-set-constant-time-lookup)
  - [2. Two Pointers (Optimal Scans)](#2-two-pointers-optimal-scans)
  - [3. Sliding Window (Subarrays)](#3-sliding-window-subarrays)
  - [4. Stack (Last-In-First-Out)](#4-stack-last-in-first-out)
  - [5. Graph Traversals: BFS vs. DFS](#5-graph-traversals-bfs-vs-dfs)
    - [Breadth-First Search (BFS)](#breadth-first-search-bfs)
    - [Depth-First Search (DFS)](#depth-first-search-dfs)
</details>
<!-- INDEX_END -->

## 📈 Section 1: Complexity & Big O Notation
*⏱️ 1 min read*

Interviewers evaluate algorithms based on their efficiency using **Big O Notation**, which describes the limiting behavior of a function when the argument tends towards infinity.

### 1. Common Time Complexities (Ordered by Efficiency)

| Big O | Complexity Name | Description / Example |
| :--- | :--- | :--- |
| **$O(1)$** | **Constant Time** | The runtime does not depend on the input size. Example: Accessing an array element by index, resolving a value from a HashMap key. |
| **$O(\log N)$** | **Logarithmic Time** | The problem size is divided by a constant factor on each step. Example: Binary Search. |
| **$O(N)$** | **Linear Time** | The runtime scales proportionally with input size $N$. Example: Scanning an array, finding a minimum value. |
| **$O(N \log N)$** | **Linearithmic Time** | Occurs when dividing problems and joining them. Example: Merge Sort, Quick Sort, or calling `Array.prototype.sort()` in JS. |
| **$O(N^2)$** | **Quadratic Time** | The runtime scales quadratically. Example: Nested loops, Bubble Sort. |
| **$O(2^N)$** | **Exponential Time** | Runtime doubles with each addition. Example: Recursive Fibonacci. |

---

### 2. Space Complexity
- Space complexity measures the total memory space allocated by the algorithm relative to the input size $N$.
- **In-place algorithms ($O(1)$ Space)** mutate the input arguments directly without allocating additional arrays or objects (e.g., swapping values).
- **Out-of-place algorithms ($O(N)$ Space)** allocate memory buffers proportional to the input size (e.g., storing visited nodes in a `Set` or hash map).

---

## 🧩 Section 2: Key Algorithmic Patterns
*⏱️ 3 min read*

Most screening interview problems can be decomposed into five foundational patterns.

### 1. HashMap & Set (Constant Time Lookup)
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

### 2. Two Pointers (Optimal Scans)
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

### 3. Sliding Window (Subarrays)
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

### 4. Stack (Last-In-First-Out)
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

### 5. Graph Traversals: BFS vs. DFS
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

#### Breadth-First Search (BFS)
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

#### Depth-First Search (DFS)
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

