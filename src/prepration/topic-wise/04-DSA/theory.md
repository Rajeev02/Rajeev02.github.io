## 📈 Section 1: Complexity & Big O Notation

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

Most screening interview problems can be decomposed into five foundational patterns.

### 1. HashMap & Set (Constant Time Lookup)
- **Problem Indicator**: Frequent lookups, tracking duplicates, checking intersections, counting item frequencies.
- **Mechanism**: Standard arrays have a linear search complexity of $O(N)$ via `.includes()`. A Hash Set or HashMap uses a hashing function to map key strings to direct memory blocks, resolving lookups in constant $O(1)$ average time.

### 2. Two Pointers (Optimal Scans)
- **Problem Indicator**: Sorted arrays, reversing strings, searching for element pairs.
- **Mechanism**: Instead of scanning arrays with nested loops ($O(N^2)$), initialize two pointer indexes (typically `left = 0` and `right = array.length - 1`). Increment or decrement the pointers toward the center depending on conditional rules, completing calculations in a single $O(N)$ linear pass.
- **Fast and Slow Pointers**: Reconcile node loops (Floyd's Tortoise and Hare) by moving one pointer twice as fast as the other.

### 3. Sliding Window (Subarrays)
- **Problem Indicator**: Continuous subarrays, longest/shortest substrings matching criteria.
- **Mechanism**: Maintain a dynamic window frame represented by `left` and `right` bounds. As the `right` pointer expands the window to ingest new data, contract the `left` pointer to maintain criteria constraints. This avoids recalculating values for overlapping segments, executing in $O(N)$ time.

### 4. Stack (Last-In-First-Out)
- **Problem Indicator**: Balanced brackets matching, undo operations, parsing compiler layouts.
- **Mechanism**: The stack enforces a LIFO execution rule. Items are pushed onto the top and popped off the top. This is ideal for validating nested relationships (e.g., checking if opening brackets match the nearest closing bracket).

### 5. Graph Traversals: BFS vs. DFS
Graphs are represented using an **Adjacency List** (a HashMap mapping node keys to arrays of neighbors).

#### Breadth-First Search (BFS)
- **Mechanism**: Explores nodes level-by-level starting from the root. It uses a **Queue (FIFO)** structure.
- **Best For**: Finding the shortest path in unweighted graphs.

#### Depth-First Search (DFS)
- **Mechanism**: Explores as deep as possible down each branch before backtracking. It uses **Recursion** (under-the-hood Call Stack).
- **Best For**: Exposing paths, cycle detection, and topological sorting.
