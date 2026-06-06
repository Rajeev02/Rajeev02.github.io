# 📈 Section 1: Complexity & Big O Notation

<!-- INDEX_START -->
<details>
  <summary>📖 <b>विषय सूची (Table of Contents - विस्तार करने के लिए क्लिक करें)</b></summary>

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

---

## 📈 Section 1: Complexity & Big O Notation
*⏱️ 1 min read*

Interviewers algorithms को उनकी efficiency के आधार पर **Big O Notation** का उपयोग करके evaluate करते हैं, जो एक function के limiting behavior का वर्णन करता है जब argument infinity की ओर बढ़ता है।

### 1. Common Time Complexities (Efficiency के आधार पर क्रमित)

| Big O | Complexity Name | Description / Example |
| :--- | :--- | :--- |
| **$O(1)$** | **Constant Time** | Runtime, input size पर निर्भर (depend) नहीं करता है। Example: index द्वारा किसी array element को access करना, HashMap key से value को resolve करना। |
| **$O(\log N)$** | **Logarithmic Time** | हर step पर problem size एक constant factor से विभाजित (divide) होती है। Example: Binary Search। |
| **$O(N)$** | **Linear Time** | Runtime, input size $N$ के साथ आनुपातिक रूप से (proportionally) बढ़ता है। Example: array को scan करना, minimum value खोजना। |
| **$O(N \log N)$** | **Linearithmic Time** | यह तब होता है जब problems को divide और join किया जाता है। Example: Merge Sort, Quick Sort, या JS में `Array.prototype.sort()` को call करना। |
| **$O(N^2)$** | **Quadratic Time** | Runtime, quadratically बढ़ता है। Example: Nested loops, Bubble Sort। |
| **$O(2^N)$** | **Exponential Time** | हर अतिरिक्त input के साथ runtime दोगुना हो जाता है। Example: Recursive Fibonacci। |

---

### 2. Space Complexity
- Space complexity यह मापती है कि algorithm द्वारा input size $N$ के सापेक्ष कुल कितनी memory space allocate की गई है।
- **In-place algorithms ($O(1)$ Space)**: ये अतिरिक्त arrays या objects allocate किए बिना सीधे input arguments को mutate करते हैं (जैसे, values की अदला-बदली - swapping करना)।
- **Out-of-place algorithms ($O(N)$ Space)**: ये input size के आनुपातिक memory buffers allocate करते हैं (जैसे, visited nodes को `Set` या HashMap में store करना)।

---

## 🧩 Section 2: Key Algorithmic Patterns
*⏱️ 3 min read*

अधिकांश screening interview समस्याओं (problems) को पांच बुनियादी (foundational) patterns में विभाजित किया जा सकता है।

### 1. HashMap & Set (Constant Time Lookup)
- **Problem Indicator**: बार-बार lookup करना, duplicates को track करना, intersections की जांच करना, item frequencies की गिनती करना।
- **Mechanism**: Standard arrays में `.includes()` के माध्यम से $O(N)$ की linear search complexity होती है। एक Hash Set या HashMap, key strings को सीधे memory blocks से map करने के लिए hashing function का उपयोग करता है, जिससे lookups constant $O(1)$ average time में हल हो जाते हैं।
- **Example (Target sum pair खोजना)**:
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
- **Problem Indicator**: Sorted arrays, strings को reverse करना, element pairs की खोज करना।
- **Mechanism**: Nested loops ($O(N^2)$) के साथ arrays को scan करने के बजाय, दो pointer indexes initialize करें (आमतौर पर `left = 0` और `right = array.length - 1`)। Conditional rules के आधार पर pointers को केंद्र (center) की ओर बढ़ाएँ या घटाएँ, और गणना को एकल $O(N)$ linear pass में पूरा करें।
- **Example (Sorted array में target sum खोजना)**:
  ```javascript
  // Time Complexity: O(N) | Space Complexity: O(1)
  function hasTwoSumSorted(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left < right) {
      const sum = arr[left] + arr[right];
      if (sum === target) return true;
      if (sum < target) {
        left++; // Sum बढ़ाने के लिए right की तरफ shift करें
      } else {
        right--; // Sum घटाने के लिए left की तरफ shift करें
      }
    }
    return false;
  }
  ```

### 3. Sliding Window (Subarrays)
- **Problem Indicator**: continuous subarrays, criteria से मेल खाने वाले सबसे लंबे/सबसे छोटे substrings।
- **Mechanism**: `left` और `right` bounds द्वारा दर्शाया गया एक dynamic window frame बनाए रखें। जैसे ही `right` pointer नए data को जोड़ने के लिए window का विस्तार करता है, criteria constraints को बनाए रखने के लिए `left` pointer को संकुचित (contract) करें। यह overlapping segments के लिए values की दोबारा गणना करने से बचता है, जिससे यह $O(N)$ समय में execute होता है।
- **Example (Size k का maximum sum subarray)**:
  ```javascript
  // Time Complexity: O(N) | Space Complexity: O(1)
  function maxSumSubarray(arr, k) {
    let maxSum = 0;
    let windowSum = 0;
    for (let i = 0; i < arr.length; i++) {
      windowSum += arr[i]; // Current element जोड़ें
      if (i >= k - 1) {
        maxSum = Math.max(maxSum, windowSum);
        windowSum -= arr[i - (k - 1)]; // Window से बाहर जाने वाले element को हटाएं
      }
    }
    return maxSum;
  }
  ```

### 4. Stack (Last-In-First-Out)
- **Problem Indicator**: Balanced brackets matching, undo operations, compiler layouts को parse करना।
- **Mechanism**: Stack एक LIFO execution rule लागू करता है। Items को top पर push किया जाता है और top से ही pop किया जाता है। यह nested relationships को validate करने के लिए आदर्श है (जैसे, यह जांचना कि opening brackets निकटतम closing bracket से मेल खाते हैं या नहीं)।
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
        stack.push(char); // Opening bracket store करें
      }
    }
    return stack.length === 0;
  }
  ```

### 5. Graph Traversals: BFS vs. DFS
Graphs को **Adjacency List** का उपयोग करके दर्शाया जाता है (एक HashMap जो node keys को neighbors के arrays से map करता है)।
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
- **Mechanism**: Root से शुरू करके nodes को level-by-level explore करता है। यह एक **Queue (FIFO)** structure का उपयोग करता है।
- **Best For**: Unweighted graphs में shortest path खोजना।
- **Example**:
  ```javascript
  // Time Complexity: O(V + E) | Space Complexity: O(V)
  function bfs(startNode) {
    const queue = [startNode];
    const visited = new Set([startNode]);
    while (queue.length > 0) {
      const node = queue.shift();
      console.log(node); // Current node को process करें
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
- **Mechanism**: Backtracking से पहले प्रत्येक branch में जहाँ तक संभव हो गहराई तक explore करता है। यह **Recursion** (under-the-hood Call Stack) का उपयोग करता है।
- **Best For**: Paths खोजना, cycle detection, और topological sorting।
- **Example**:
  ```javascript
  // Time Complexity: O(V + E) | Space Complexity: O(V)
  function dfs(node, visited = new Set()) {
    visited.add(node);
    console.log(node); // Current node को process करें
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, visited);
      }
    }
  }
  ```