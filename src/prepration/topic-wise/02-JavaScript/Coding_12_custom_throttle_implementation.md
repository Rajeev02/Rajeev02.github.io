## Program 11: Custom Throttle Implementation
*⏱️ 1 min read*

### Question
Implement a custom throttle wrapper function `throttle(func, limit)` that ensures the target function is executed at most once every `limit` milliseconds, regardless of how frequently it is triggered.

### Sample Input & Output
#### Input:
```javascript
const logScroll = throttle((pos) => console.log(pos), 200);
logScroll(10);  // Fires at t=0
logScroll(50);  // Fires at t=50ms
logScroll(100); // Fires at t=100ms
```
#### Output:
Logs `10` immediately. Ignores the updates at 50ms and 100ms since they occur inside the 200ms lock window.

### Code
```javascript
// Time: O(1) creation | Space: O(1)
function throttle(func, limit = 200) {
  let inThrottle = false;

  return function (...args) {
    const context = this;

    // Execute only if not currently locked inside the throttle interval
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;

      // Unlock execution after the limit passes
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ to create the throttled function, and $O(1)$ per call.
- **Space Complexity**: $O(1)$ storage to persist the `inThrottle` lock in closure memory.
- **Explanation**: Returns a throttled function wrapper. If `inThrottle` is false, it executes the target function immediately and sets the lock to true. Submitting other requests while the lock is true are ignored. A `setTimeout` unlocks execution after the specified lock limit passes.

---
