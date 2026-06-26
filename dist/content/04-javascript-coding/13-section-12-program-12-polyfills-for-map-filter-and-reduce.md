> 🎯 **Topic:** Section 12: Program 12: Polyfills for Map, Filter, and Reduce
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 12: Program 12: Polyfills for Map, Filter, and Reduce
*⏱️ 1 min read*

### Question
Write prototype polyfills for JavaScript Array methods: `myMap`, `myFilter`, and `myReduce`. Do not use native array methods in your implementations.

### Sample Input & Output
#### Input:
```javascript
[1, 2, 3].myMap(x => x * 2);
[1, 2, 3].myFilter(x => x > 1);
[1, 2, 3].myReduce((acc, x) => acc + x, 0);
```
#### Output:
- Map: `[2, 4, 6]`
- Filter: `[2, 3]`
- Reduce: `6`

### Code
```javascript
// Map Polyfill (Time: O(n) | Space: O(n))
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    // Check to handle sparse arrays safely
    if (i in this) {
      result.push(callback(this[i], i, this));
    }
  }
  return result;
};

// Filter Polyfill (Time: O(n) | Space: O(n))
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      if (callback(this[i], i, this)) {
        result.push(this[i]);
      }
    }
  }
  return result;
};

// Reduce Polyfill (Time: O(n) | Space: O(1))
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // If no initial value is provided, use the first array element as accumulator
  if (initialValue === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of items in the array.
- **Space Complexity**: $O(N)$ for `myMap` and `myFilter` to buffer output arrays, and $O(1)$ auxiliary space for `myReduce`.
- **Explanation**: Custom array prototypes polyfills:
  - `myMap` builds a new array, applying the callback to each defined key.
  - `myFilter` collects items matching the callback's boolean check.
  - `myReduce` accumulates array values starting from an optional seed value.

---

---
