## Program 7: Loop Scoping & Variable Closures inside SetTimeout
*⏱️ 1 min read*

### Question
Given the following loop structure, resolve the syntax bugs and explain the output difference between declaring the loop iterator `i` with `var` versus `let` inside asynchronous timers.

### Code & Execution Outputs
```javascript
// Corrected Loop Syntax:
// 1. Using block-scoped 'let'
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
     console.log('let index:', i);
  }, 0);
}
// Outputs: 0, 1, 2, 3, 4 (each iteration receives its own lexical block binding)

// 2. Using function-scoped 'var'
for (var j = 0; j < 5; j++) {
  setTimeout(() => {
     console.log('var index:', j);
  }, 0);
}
// Outputs: 5, 5, 5, 5, 5 (all callbacks reference the same shared variable bound to 5 after loop terminates)
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the loop boundary (5).
- **Space Complexity**: $O(N)$ for closures contexts when using `let`, and $O(1)$ when using `var`.
- **Explanation**: 
  - **`let` (Block Scope)**: JavaScript allocates a new variable binding slot in memory on every single loop iteration. The callback closure binds to that iteration's instance, printing `0, 1, 2, 3, 4`.
  - **IIFE Fix**: Wrapping `var` statements in an Immediately Invoked Function Expression (IIFE) captures the current value of the iterator, creating a new lexical scope for each callback.

---
