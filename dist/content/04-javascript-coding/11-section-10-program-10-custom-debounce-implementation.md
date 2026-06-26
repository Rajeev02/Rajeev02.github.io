> 🎯 **Topic:** Section 10: Program 10: Custom Debounce Implementation
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 10: Program 10: Custom Debounce Implementation
*⏱️ 1 min read*

### Question
Write a custom debounce wrapper function `debounce(func, delay)` from scratch that postpones the execution of `func` until `delay` milliseconds have passed since the last invocation. Ensure it maintains execution contexts and arguments.

### Sample Input & Output
#### Input:
```javascript
const logSearch = debounce((text) => console.log(text), 500);
logSearch("R");
logSearch("Re");
logSearch("React"); // Triggered 100ms apart
```
#### Output:
Only prints `"React"` once, 500ms after the last keypress.

### Code
```javascript
// Time: O(1) creation | Space: O(1)
function debounce(func, delay = 500) {
  let timeoutId = null;

  return function (...args) {
    const context = this;

    // 1. Clear any active pending timers to restart the quiet period
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // 2. Set new execution target
    timeoutId = setTimeout(() => {
      func.apply(context, args);
      timeoutId = null;
    }, delay);
  };
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ to create the debounced function, and $O(1)$ auxiliary work per call.
- **Space Complexity**: $O(1)$ storage to persist the `timeoutId` reference in closure memory.
- **Explanation**: Returns a debounced function wrapper. Each time the returned function is called, it clears the current active timer via `clearTimeout` to restart the quiet period. Once the delay timer completes, the original target function is executed with the stored execution context and arguments using `apply`.

---

---
