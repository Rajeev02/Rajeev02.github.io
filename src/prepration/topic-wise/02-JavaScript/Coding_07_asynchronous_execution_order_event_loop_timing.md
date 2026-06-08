
## Page Summary
### Reading Time
`1 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 6: Asynchronous Execution Order (Event Loop Timing) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 6: Asynchronous Execution Order (Event Loop Timing)
*⏱️ 1 min read*

### Question
Predict and explain the console execution output order of the following synchronous and asynchronous operations, identifying the roles of the Call Stack, Microtask Queue (Promises), and Macrotask Queue (setTimeout).

### Code Snippet
```javascript
console.log("1: Start");
 
setTimeout(() => {
  console.log("2: Macrotask (setTimeout)");
}, 0);
 
Promise.resolve().then(() => {
  console.log("3: Microtask (Promise)");
});
 
console.log("4: End");
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ scheduling.
- **Space Complexity**: $O(1)$ queues.
- **Console Output Order**:
  1. `1: Start`
  2. `4: End`
  3. `3: Microtask (Promise)`
  4. `2: Macrotask (setTimeout)`
- **Explanation**: 
  1. Synchronous statements (1 and 4) run on the Call Stack immediately.
  2. The event loop offloads `setTimeout` to WebAPIs, which places its callback in the low-priority Macrotask Queue.
  3. The `Promise.resolve` resolves immediately and queues its callback on the high-priority Microtask Queue.
  4. Once the Call Stack is empty, the Event Loop flushes all items in the Microtask Queue first before processing the first callback in the Macrotask Queue.

---
