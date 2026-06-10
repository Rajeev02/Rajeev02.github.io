# 16-DSA.md

# DSA for Senior React Native Developers

---

# 1. Why DSA for React Native Developers?

## Reality of Interviews

Most Senior React Native interviews include:

```text
1-2 DSA Questions

+
React Native Questions

+
JavaScript Questions

+
Architecture Questions
```

---

## Most Common Topics

```text
Arrays
Strings
HashMap
Set
Two Pointers
Sliding Window
Stack
Queue
Linked List
Binary Search
Tree
Recursion
Sorting
```

---

## Interview Answer

"React Native interviews usually focus on problem-solving using Arrays, Strings, HashMaps, Sliding Window, Two Pointers, and basic Trees."

---

# 2. Time Complexity Cheat Sheet

| Operation      | Complexity |
| -------------- | ---------- |
| Array Access   | O(1)       |
| Array Search   | O(n)       |
| HashMap Insert | O(1)       |
| HashMap Search | O(1)       |
| Sorting        | O(n log n) |
| Binary Search  | O(log n)   |

---

## Interview Answer

"HashMap provides O(1) lookup while Binary Search provides O(log n) search on sorted data."

---

# 3. Array

## Definition

Collection of elements stored in contiguous memory.

---

## Common Questions

### Two Sum

```javascript
Input:
[2,7,11,15]

Target:
9

Output:
[0,1]
```

---

### Best Solution

HashMap

Complexity:

```text
Time: O(n)
Space: O(n)
```

---

## Interview Answer

"Arrays are the most commonly used data structure and frequently appear in search, sorting, and traversal problems."

---

# 4. String

## Definition

Sequence of characters.

---

## Common Questions

### Reverse String

```javascript
"hello"

Output:

"olleh"
```

---

### Palindrome

```javascript
"madam"

Output:

true
```

---

### Anagram

```javascript
listen

silent
```

---

## Interview Answer

"String problems usually involve frequency counting, reversing, pattern matching, or character manipulation."

---

# 5. HashMap

## Definition

Stores data as key-value pairs.

---

## Example

```javascript
const map = new Map();

map.set("name","Raj");
```

---

## Use Cases

### Frequency Counter

```javascript
{
 a:3,
 b:2
}
```

---

### Lookup Tables

---

### Caching

---

## Interview Answer

"HashMaps are commonly used to optimize nested loops and reduce time complexity from O(n²) to O(n)."

---

# 6. Set

## Definition

Stores unique values.

---

## Example

```javascript
const set =
 new Set([1,2,2,3]);
```

Result:

```javascript
[1,2,3]
```

---

## Use Cases

### Remove Duplicates

### Membership Check

---

## Interview Answer

"Sets provide O(1) lookup and are useful for uniqueness checks."

---

# 7. Two Pointers Pattern

## Definition

Uses two indexes moving through data.

---

## Example

Palindrome

```javascript
madam
```

---

## Flow

```text
Left → ← Right
```

---

## Common Problems

### Palindrome

### Sorted Two Sum

### Remove Duplicates

---

## Complexity

```text
O(n)
```

---

## Interview Answer

"Two Pointers reduce nested loop solutions into linear-time solutions."

---

# 8. Sliding Window Pattern

## Definition

Maintain a moving window.

---

## Example

Maximum Sum Subarray.

---

## Flow

```text
[1,2,3]
 ↓

[2,3,4]
 ↓

[3,4,5]
```

---

## Common Questions

### Longest Substring

### Maximum Sum Subarray

### Longest Unique Character Window

---

## Complexity

```text
O(n)
```

---

## Interview Answer

"Sliding Window optimizes subarray and substring problems."

---

# 9. Stack

## Definition

LIFO

Last In First Out.

---

## Operations

```text
Push

Pop

Peek
```

---

## Example

```text
3
2
1
```

---

## Common Questions

### Valid Parentheses

```javascript
()
{}
[]
```

---

### Next Greater Element

---

## Interview Answer

"Stacks are commonly used for parsing, recursion, and expression evaluation."

---

# 10. Queue

## Definition

FIFO

First In First Out.

---

## Operations

```text
Enqueue

Dequeue
```

---

## Example

```text
1
2
3
```

---

## Use Cases

### Task Scheduling

### BFS

---

## Interview Answer

"Queues are used in scheduling, buffering, and breadth-first traversal."

---

# 11. Linked List

## Definition

Collection of connected nodes.

---

## Node Structure

```javascript
{
 value:10,
 next:null
}
```

---

## Common Questions

### Reverse Linked List

### Detect Cycle

### Middle Node

---

## Interview Answer

"Linked Lists provide efficient insertion and deletion operations."

---

# 12. Recursion

## Definition

Function calling itself.

---

## Example

```javascript
function factorial(n){

 if(n===1)
  return 1;

 return n *
 factorial(n-1);
}
```

---

## Common Questions

### Factorial

### Fibonacci

### Tree Traversal

---

## Interview Answer

"Recursion solves problems by breaking them into smaller subproblems."

---

# 13. Binary Search

## Definition

Search in sorted arrays.

---

## Flow

```text
Low
 ↓
Mid
 ↓
High
```

---

## Complexity

```text
O(log n)
```

---

## Example

```javascript
[1,2,3,4,5]
```

Search:

```javascript
4
```

---

## Interview Answer

"Binary Search repeatedly divides the search space in half."

---

# 14. Sorting Algorithms

## Bubble Sort

```text
O(n²)
```

---

## Selection Sort

```text
O(n²)
```

---

## Insertion Sort

```text
O(n²)
```

---

## Merge Sort

```text
O(n log n)
```

---

## Quick Sort

```text
O(n log n)
```

Average

---

## Interview Answer

"Merge Sort and Quick Sort are the most important sorting algorithms for interviews."

---

# 15. Tree

## Definition

Hierarchical data structure.

---

## Example

```text
       10
      /  \
     5    15
```

---

## Terminology

### Root

Top Node

---

### Leaf

No Children

---

### Height

Longest Path

---

## Interview Answer

"Trees model hierarchical relationships and support efficient searching and traversal."

---

# 16. Binary Tree Traversal

## Inorder

```text
Left
Root
Right
```

---

## Preorder

```text
Root
Left
Right
```

---

## Postorder

```text
Left
Right
Root
```

---

## Interview Answer

"Tree traversal determines the order in which nodes are visited."

---

# 17. BFS vs DFS

## BFS

Breadth First Search

Uses:

```text
Queue
```

---

## DFS

Depth First Search

Uses:

```text
Stack
```

---

## Comparison

| BFS           | DFS         |
| ------------- | ----------- |
| Queue         | Stack       |
| Level Wise    | Depth Wise  |
| Shortest Path | Exploration |

---

## Interview Answer

"BFS explores level-by-level while DFS explores depth-first."

---

# 18. Graph Basics

## Definition

Collection of nodes and edges.

---

## Example

```text
A ----- B
 \     /
   C
```

---

## Traversal

### BFS

### DFS

---

## Interview Answer

"Graphs model relationships between entities and are traversed using BFS and DFS."

---

# 19. Most Common Interview Patterns

## Pattern 1

HashMap

Examples:

```text
Two Sum

Frequency Counter

Anagram
```

---

## Pattern 2

Two Pointers

Examples:

```text
Palindrome

Sorted Two Sum
```

---

## Pattern 3

Sliding Window

Examples:

```text
Longest Substring

Maximum Sum Subarray
```

---

## Pattern 4

Stack

Examples:

```text
Valid Parentheses
```

---

## Pattern 5

Binary Search

Examples:

```text
Search Sorted Array
```

---

# 20. Top Coding Questions for Senior React Native Interviews

### Easy

1. Two Sum
2. Reverse String
3. Palindrome
4. Remove Duplicates
5. Valid Parentheses

---

### Medium

6. Longest Substring Without Repeating Characters
7. Group Anagrams
8. Product of Array Except Self
9. Maximum Subarray
10. Merge Intervals

---

### Medium

11. Binary Search
12. Search Rotated Array
13. Reverse Linked List
14. Detect Cycle
15. Level Order Traversal

---

### Advanced

16. LRU Cache
17. Kth Largest Element
18. Top K Frequent Elements
19. Word Search
20. Number of Islands

---

# DSA Pattern Selection Guide

```text
Array + Target
    ↓
HashMap

String + Window
    ↓
Sliding Window

Sorted Array
    ↓
Binary Search

Palindrome
    ↓
Two Pointers

Parentheses
    ↓
Stack

Hierarchy
    ↓
Tree

Relationship
    ↓
Graph
```

---

# Ultimate Senior Interview Answer

"For React Native interviews, I focus primarily on Arrays, Strings, HashMaps, Sliding Window, Two Pointers, Stacks, Queues, Binary Search, Trees, and Graph fundamentals. Most interview questions are pattern-based, and identifying the correct pattern is often more important than memorizing solutions."

---

# Daily Revision Plan

```text
Arrays                  5 min
Strings                 5 min
HashMap + Set           5 min
Two Pointers            5 min
Sliding Window          5 min
Stack + Queue           5 min
Binary Search           5 min
Tree + Graph            5 min

Total: ~40 Minutes
```

After this, the final file should be:

**17-Most-Asked-Interview-Questions.md**

This will be a rapid revision file containing:

* Top 50 JavaScript Questions
* Top 30 TypeScript Questions
* Top 50 React Questions
* Top 50 React Native Questions
* Top 30 Architecture Questions
* Top 20 HR Questions

A single file you can revise the night before an interview.
