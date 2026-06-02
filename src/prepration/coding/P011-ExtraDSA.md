Yes. If you get extra time, these are the **most common interview-style versions** of those topics. But remember: for your TechCorp React Native round, these are **backup topics**, not primary topics.

---

# 1. BFS (Breadth First Search) ⭐⭐

### Question

Given a graph, print all nodes using BFS.

```js
graph = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: [],
  E: [],
};
```

Output:

```js
A B C D E
```

### Pattern

```text
Queue
```

### Solution

```js
function bfs(graph, start) {
  const queue = [start];
  const visited = new Set();

  visited.add(start);

  while (queue.length) {
    const node = queue.shift();

    console.log(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

---

# 2. DFS (Depth First Search) ⭐⭐

### Question

Traverse graph using DFS.

### Pattern

```text
Recursion
```

### Solution

```js
function dfs(graph, node, visited = new Set()) {
  visited.add(node);

  console.log(node);

  for (const neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}
```

---

# 3. Number Of Islands (Most Common Graph Question) ⭐⭐⭐

### Question

```js
[
  ["1", "1", "0"],
  ["1", "0", "0"],
  ["0", "1", "1"],
];
```

Output:

```js
2;
```

### Pattern

```text
DFS
```

### Solution

```js
function numIslands(grid) {
  let count = 0;

  function dfs(r, c) {
    if (
      r < 0 ||
      c < 0 ||
      r >= grid.length ||
      c >= grid[0].length ||
      grid[r][c] === "0"
    ) {
      return;
    }

    grid[r][c] = "0";

    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}
```

---

# 4. Dijkstra ⭐

### Question

Find shortest path from source.

```js
A -> B = 1
A -> C = 4
B -> C = 2
```

Output:

```js
A to C = 3
```

### Interview Note

For frontend/mobile interviews, usually only:

```text
Dijkstra = Shortest Path Algorithm
Uses Priority Queue
Time O(E log V)
```

is enough.

I would not spend time memorizing the full implementation.

---

# 5. Trie ⭐

### Question

Implement search suggestions.

```js
insert("apple");
search("apple");
```

Output:

```js
true;
```

### Basic Structure

```js
class TrieNode {
  constructor() {
    this.children = {};
    this.end = false;
  }
}
```

### Interview Note

Usually appears in:

```text
Autocomplete
Dictionary Search
Prefix Search
```

Low probability for RN.

---

# 6. Segment Tree ⭐

### Question

Range Sum Query

```js
nums = [1, 2, 3, 4];
sum(1, 3);
```

Output:

```js
9;
```

### Interview Note

Remember only:

```text
Segment Tree
Range Queries
Update + Query in O(log n)
```

Don't spend time implementing.

---

# 7. Dynamic Programming - Climbing Stairs ⭐⭐

### Question

```js
n = 5;
```

Output:

```js
8;
```

### Solution

```js
function climbStairs(n) {
  if (n <= 2) return n;

  let a = 1;
  let b = 2;

  for (let i = 3; i <= n; i++) {
    const temp = a + b;

    a = b;
    b = temp;
  }

  return b;
}
```

Pattern:

```text
DP
Fibonacci
```

---

# 8. Floyd Cycle Detection ⭐

### Question

Find duplicate number.

```js
[1, 3, 4, 2, 2];
```

Output:

```js
2;
```

### Solution

```js
function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}
```

Pattern:

```text
Tortoise and Hare
```

Low probability.

---

# 9. Custom Promise Implementation ⭐

### Question

Implement a simplified Promise.

### Basic Version

```js
function createPromise() {
  let callbacks = [];

  return {
    then(cb) {
      callbacks.push(cb);
    },

    resolve(value) {
      callbacks.forEach((cb) => cb(value));
    },
  };
}
```

Usage:

```js
const p = createPromise();

p.then((data) => console.log(data));

p.resolve("Success");
```

Output:

```js
Success;
```

---

# If I Were Prioritizing

### Study First (Already In Your Document)

```text
Two Sum
Contains Duplicate
Valid Anagram
Longest Substring
Move Zeroes
Maximum Subarray
Valid Parentheses
Product Except Self
Merge Sorted Arrays
Flatten Array
Group Anagrams
Closure
Debounce
Throttle
Promises
Event Loop
```

### Only If Extra Time

```text
Number Of Islands
BFS
DFS
Climbing Stairs
```

### Last Priority

```text
Dijkstra
Trie
Segment Tree
Floyd Cycle
Custom Promise
```

For your TechCorp Senior React Native assessment, I'd estimate the probability of seeing one of the "last priority" topics is under 10%, while the topics already in your document account for the vast majority of likely coding questions.
