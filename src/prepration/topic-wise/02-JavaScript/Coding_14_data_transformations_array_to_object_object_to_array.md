
## Page Summary
### Reading Time
`2 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 13: Data Transformations (Array-to-Object & Object-to-Array) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 13: Data Transformations (Array-to-Object & Object-to-Array)
*⏱️ 1 min read*

### Question
Provide functions to transform flat structures:
1. `arrayToObject(arr, key)`: Converts an array of objects into a hashed object mapping keys to values using `reduce()`.
2. `objectToArray(obj)`: Converts an object's values back into an array, showing both manual looping and `reduce()` approaches.

### Sample Input & Output
#### Input (Array):
```javascript
const users = [
  { id: "101", name: "Alex" },
  { id: "102", name: "Sam" }
];
```
#### Output (Object):
```javascript
{
  "101": { id: "101", name: "Alex" },
  "102": { id: "102", name: "Sam" }
}
```

### Code
```javascript
// Array to Object (Time: O(n) | Space: O(n))
function arrayToObject(arr, keyField) {
  return arr.reduce((accumulator, currentItem) => {
    if (currentItem && currentItem[keyField]) {
      accumulator[currentItem[keyField]] = currentItem;
    }
    return accumulator;
  }, {});
}

// Object to Array - Using standard Object.values() (Time: O(n) | Space: O(n))
function objectToArray(obj) {
  if (!obj) return [];
  return Object.values(obj);
}

// Object to Array - Manual traversal for older environments (Time: O(n) | Space: O(n))
function objectToArrayManual(obj) {
  if (!obj) return [];
  const result = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key]);
    }
  }
  return result;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of array elements or object properties.
- **Space Complexity**: $O(N)$ to allocate the output converted structures.
- **Explanation**:
  - `arrayToObject` translates flat item listings into an indexed key-value map using `.reduce()`.
  - `objectToArray` returns array representations using `Object.values()`, or maps properties using a manual `for...in` loop with `hasOwnProperty` checks for legacy environments.

---
