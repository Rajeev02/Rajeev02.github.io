
## Page Summary
### Reading Time
`2 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 8: Deep Memoization Wrapper with Cache Expiration |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 8: Deep Memoization Wrapper with Cache Expiration
*⏱️ 1 min read*

### Question
Write a high-performance, generic JavaScript **Memoization Wrapper** function `memoize(fn, options)`. The wrapper must:
1. Cache execution outcomes based on variable parameters.
2. Support a custom cache key resolver function.
3. Implement a **Time-To-Live (TTL)** cache expiration handler to clear stale keys automatically after a specified time.
4. Support clean cache invalidation hooks.

### Sample Input & Output
#### Input:
```javascript
const heavyCalculation = (a, b) => {
  console.log("Executing expensive math...");
  return a + b;
};

const memoizedMath = memoize(heavyCalculation, { ttl: 2000 });

memoizedMath(2, 3); // Prints "Executing..." and returns 5
memoizedMath(2, 3); // Serves instantly from cache (no print)

// Wait 2.5 seconds
setTimeout(() => {
  memoizedMath(2, 3); // TTL expired. Prints "Executing..." and recalculates!
}, 2500);
```

### Code
```javascript
function memoize(fn, options = {}) {
  const { ttl = null, resolver = null } = options;
  const cache = new Map();

  const memoized = function (...args) {
    // 1. Generate cache key based on inputs
    const key = resolver ? resolver(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      const record = cache.get(key);

      // 2. Check if TTL validation checks apply
      if (ttl !== null && Date.now() - record.timestamp > ttl) {
        cache.delete(key); // Evict expired key
      } else {
        return record.value; // Return fresh cached result
      }
    }

    // 3. Execute original function and store with timestamp
    const result = fn.apply(this, args);
    cache.set(key, {
      value: result,
      timestamp: Date.now(),
    });

    return result;
  };

  // 4. Expose cache management APIs
  memoized.cache = cache;
  memoized.clear = () => cache.clear();
  memoized.invalidate = (key) => cache.delete(key);

  return memoized;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ lookup for cache resolutions.
- **Space Complexity**: $O(K)$ where $K$ is the number of cached keys.
- **Explanation**: This program builds a custom caching wrapper. By wrapping the original function in a closure, it persists a private `Map` store. It maps dynamic input arguments to serialization keys, checks timestamps against configured TTL limits to clean up stale references, and exposes invalidate hooks.

---
