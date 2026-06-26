> 🎯 **Topic:** Section 1: 📈 Complexity & Big O Notation
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 1: 📈 Complexity & Big O Notation

*⏱️ 1 min read*

Interviewers evaluate algorithms based on their efficiency using **Big O Notation**, which describes the limiting behavior of a function when the argument tends towards infinity.

#### 1. Common Time Complexities (Ordered by Efficiency)

| Big O | Complexity Name | Description / Example |
| :--- | :--- | :--- |
| **$O(1)$** | **Constant Time** | The runtime does not depend on the input size. Example: Accessing an array element by index, resolving a value from a HashMap key. |
| **$O(\log N)$** | **Logarithmic Time** | The problem size is divided by a constant factor on each step. Example: Binary Search. |
| **$O(N)$** | **Linear Time** | The runtime scales proportionally with input size $N$. Example: Scanning an array, finding a minimum value. |
| **$O(N \log N)$** | **Linearithmic Time** | Occurs when dividing problems and joining them. Example: Merge Sort, Quick Sort, or calling `Array.prototype.sort()` in JS. |
| **$O(N^2)$** | **Quadratic Time** | The runtime scales quadratically. Example: Nested loops, Bubble Sort. |
| **$O(2^N)$** | **Exponential Time** | Runtime doubles with each addition. Example: Recursive Fibonacci. |

---

#### 2. Space Complexity
- Space complexity measures the total memory space allocated by the algorithm relative to the input size $N$.
- **In-place algorithms ($O(1)$ Space)** mutate the input arguments directly without allocating additional arrays or objects (e.g., swapping values).
- **Out-of-place algorithms ($O(N)$ Space)** allocate memory buffers proportional to the input size (e.g., storing visited nodes in a `Set` or hash map).

---


---

---
