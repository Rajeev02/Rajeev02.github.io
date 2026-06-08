## Program 15: Object Property Diff Tracker
*⏱️ 1 min read*

### Question
Write a function `getChangedKeys(previousState, currentState)` that performs a flat key comparison between two states and returns an array of keys that have changed (either updated, added, or deleted).

### Sample Input & Output
#### Input:
```javascript
const previousState = { theme: "dark", fontSize: 14, isMuted: false };
const currentState  = { theme: "light", fontSize: 14, isMuted: true, volume: 80 };
```
#### Output:
```javascript
["theme", "isMuted", "volume"] // theme updated, isMuted updated, volume added
```

### Code
```javascript
// Time: O(P + C) where P and C are keys count | Space: O(P + C) unique keys set
function getChangedKeys(previousState, currentState) {
  const prevObj = previousState || {};
  const currObj = currentState || {};

  // Gather all unique keys from both states
  const allKeys = new Set([
    ...Object.keys(prevObj),
    ...Object.keys(currObj)
  ]);

  const changedKeys = [];

  for (const key of allKeys) {
    // Identify diffs by comparing current and previous references
    if (prevObj[key] !== currObj[key]) {
      changedKeys.push(key);
    }
  }

  return changedKeys;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(P + C)$ where $P$ and $C$ are the number of keys in the previous and current states.
- **Space Complexity**: $O(P + C)$ to store unique keys in a set container.
- **Explanation**: Detects state changes by performing a flat difference comparison. It aggregates all keys from both states inside a `Set`, loops through them, and checks for strict inequality `!==` to identify added, updated, or removed properties.

---
