## Program 5: Substring Extraction
*⏱️ 1 min read*

### Question
Given a string `"Apple, Banana, Kiwi"`, extract the substring `"Banana"` using appropriate JavaScript string slicing methods.

### Sample Input & Output
#### Input:
```javascript
let text = "Apple, Banana, Kiwi";
```
#### Output:
```javascript
"Banana"
```

### Code
```javascript
let text = "Apple, Banana, Kiwi";

// Method 1: Using split() and trim()
let bananaMethod1 = text.split(",")[1].trim();
console.log("Method 1:", bananaMethod1); // "Banana"

// Method 2: Using slice() with indexOf()
let start = text.indexOf("Banana");
let end = start + "Banana".length;
let bananaMethod2 = text.slice(start, end);
console.log("Method 2:", bananaMethod2); // "Banana"

// Method 3: Using substring() with hardcoded indices
let bananaMethod3 = text.substring(7, 13);
console.log("Method 3:", bananaMethod3); // "Banana"
```

### Complexity & Explanation
- **Time Complexity**: $O(S)$ where $S$ is the string size.
- **Space Complexity**: $O(W)$ where $W$ is the extracted substring size.
- **Explanation**: Compares string parsing functions. Method 1 splits the input string by `,`, accesses index 1, and trims whitespace. Method 2 finds indices using `indexOf` and extracts via `slice(start, end)`. Method 3 slices characters using static index coordinates via `substring(start, end)`.

---
