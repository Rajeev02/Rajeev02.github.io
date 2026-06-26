# 22-DSA-Revision.md

# DSA Quick Revision for Senior React Native Interviews

---

# DSA Interview Strategy

## Step 1

Understand Problem

---

## Step 2

Identify Pattern

---

## Step 3

Choose Data Structure

---

## Step 4

Optimize Complexity

---

## Step 5

Explain Trade-offs

---

## Interview Tip

Most React Native interviews focus more on:

```text
Problem Solving

Approach

Optimization

Communication
```

than perfect code.

---

# Complexity Cheat Sheet

| Operation      | Complexity |
| -------------- | ---------- |
| Array Access   | O(1)       |
| Array Search   | O(n)       |
| HashMap Insert | O(1)       |
| HashMap Search | O(1)       |
| Binary Search  | O(log n)   |
| Sorting        | O(n log n) |

---

# Pattern 1: HashMap

## When To Use?

```text
Lookup

Frequency Count

Target Search
```

---

## Common Problems

### Two Sum

### Group Anagrams

### Frequency Counter

### Duplicate Detection

---

## Example

```javascript
const map = new Map();

for(const num of nums){
 if(map.has(target-num)){
  return true;
 }
 map.set(num,true);
}
```

---

## Complexity

```text
Time: O(n)

Space: O(n)
```

---

# Pattern 2: Two Pointers

## When To Use?

```text
Sorted Arrays

Palindrome

Pair Problems
```

---

## Common Problems

### Valid Palindrome

### Sorted Two Sum

### Remove Duplicates

---

## Flow

```text
Left → ← Right
```

---

## Complexity

```text
O(n)
```

---

# Pattern 3: Sliding Window

## When To Use?

```text
Substring

Subarray

Continuous Range
```

---

## Common Problems

### Maximum Sum Subarray

### Longest Substring

### Longest Unique Characters

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

## Complexity

```text
O(n)
```

---

# Pattern 4: Stack

## When To Use?

```text
Parentheses

Undo

Expression Evaluation
```

---

## Common Problems

### Valid Parentheses

### Next Greater Element

### Min Stack

---

## Operations

```text
Push

Pop

Peek
```

---

## Complexity

```text
O(1)
```

---

# Pattern 5: Queue

## When To Use?

```text
Scheduling

BFS

Task Processing
```

---

## Operations

```text
Enqueue

Dequeue
```

---

## Complexity

```text
O(1)
```

---

# Pattern 6: Binary Search

## When To Use?

```text
Sorted Arrays

Sorted Data
```

---

## Common Problems

### Search Element

### First Occurrence

### Last Occurrence

---

## Complexity

```text
O(log n)
```

---

## Template

```javascript
let left = 0;
let right = arr.length-1;

while(left <= right){

 const mid =
  Math.floor(
   (left+right)/2
  );

 if(arr[mid] === target){
  return mid;
 }

 if(arr[mid] < target){
  left = mid + 1;
 } else {
  right = mid - 1;
 }
}
```

---

# Pattern 7: Recursion

## When To Use?

```text
Tree Problems

Divide & Conquer

Backtracking
```

---

## Common Problems

### Factorial

### Fibonacci

### Tree Traversal

---

## Template

```javascript
function solve(n){

 if(baseCase){
  return;
 }

 solve(n-1);
}
```

---

# Pattern 8: Linked List

## Common Problems

### Reverse Linked List

### Detect Cycle

### Middle Node

---

## Complexity

| Operation | Complexity |
| --------- | ---------- |
| Insert    | O(1)       |
| Delete    | O(1)       |
| Search    | O(n)       |

---

# Pattern 9: Tree

## Common Problems

### DFS

### BFS

### Level Order

### Height

### Lowest Common Ancestor

---

## Traversals

### Inorder

```text
Left
Root
Right
```

---

### Preorder

```text
Root
Left
Right
```

---

### Postorder

```text
Left
Right
Root
```

---

# Pattern 10: Graph

## Common Problems

### BFS

### DFS

### Number Of Islands

### Connected Components

---

## Example

```text
A ----- B
 \     /
   C
```

---

# Sorting Revision

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

# Top 20 Most Asked DSA Questions

## Easy

1. Two Sum
2. Reverse String
3. Palindrome
4. Remove Duplicates
5. Valid Parentheses

---

## Medium

6. Longest Substring Without Repeating Characters
7. Group Anagrams
8. Product Of Array Except Self
9. Maximum Subarray
10. Merge Intervals

---

## Medium

11. Binary Search
12. Search Rotated Array
13. Reverse Linked List
14. Detect Cycle
15. Level Order Traversal

---

## Advanced

16. LRU Cache
17. Kth Largest Element
18. Top K Frequent Elements
19. Number Of Islands
20. Word Search

---

# Pattern Selection Guide

## Problem Type

```text
Target Search
      ↓
HashMap
```

---

```text
Palindrome
      ↓
Two Pointers
```

---

```text
Substring
      ↓
Sliding Window
```

---

```text
Parentheses
      ↓
Stack
```

---

```text
Sorted Array
      ↓
Binary Search
```

---

```text
Hierarchy
      ↓
Tree
```

---

```text
Relationships
      ↓
Graph
```

---

# React Native Interview Focus

Most Frequently Asked:

```text
HashMap

Two Pointers

Sliding Window

Stack

Binary Search

Tree Basics
```

---

Usually NOT Asked:

```text
Advanced Dynamic Programming

Segment Trees

Trie

Competitive Programming
```

unless interviewing with FAANG-level companies.

---

# 30-Minute Revision Plan

```text
Complexities           3 min

HashMap                5 min

Two Pointers           3 min

Sliding Window         5 min

Stack                  3 min

Binary Search          3 min

Linked List            3 min

Tree                   3 min

Graph                  2 min

Total: ~30 Minutes
```

---

# Ultimate Senior Interview Answer

"When solving DSA problems, I first identify the underlying pattern rather than jumping into implementation. For most React Native interviews, HashMaps, Sliding Window, Two Pointers, Stacks, Binary Search, and basic Tree traversals cover the majority of questions. I focus on optimizing time complexity, explaining trade-offs, and communicating my thought process clearly."
