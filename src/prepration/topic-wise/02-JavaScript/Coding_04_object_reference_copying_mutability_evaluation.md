## Program 3: Object Reference Copying & Mutability Evaluation
*⏱️ 2 min read*

### Question
Given the `person` object structure below, write a JavaScript script that demonstrates the differences between shallow and deep copying:
1. Access `first_Name` and `last Name` properties safely.
2. Clone `person` into a new variable `person2` using deep-copying (`structuredClone`).
3. Mutate `person2.first_Name = "Foo"` and compare both `person.first_Name` and `person2.first_Name`.
4. Mutate `person2.directory["1"].city = "Chennai"` and evaluate how this nested change impacts the original `person.directory["1"].city` in both shallow copy and deep copy scenarios.

### Sample Input & Output
#### Input Object:
```javascript
const person = {
  "first_Name": "John",
  "last Name": "Doe",
  "age": 20,
  "hobbies": ["watching movies", "playing games"],
  "directory": {
    "1": {
      "type": "home",
      "address": "123 Main Street",
      "city": "Bengaluru"
    }
  }
};
```
#### Output:
- Deep copy allows mutating primitive properties and nested directories inside `person2` (e.g. changing first name to "Foo" and city to "Chennai") while keeping the original `person` properties intact ("John" and "Bengaluru").
- A shallow copy (e.g. using the spread operator) would fail to isolate nested changes, meaning updating `person2.directory["1"].city` would also overwrite `person.directory["1"].city` to `"Chennai"`.

### Code
```javascript
const person = {
  "first_Name": "John",
  "last Name": "Doe",
  "age": 20,
  "hobbies": ["watching movies", "playing games"],
  "directory": {
    "1": {
      "type": "home",
      "address": "123 Main Street",
      "city": "Bengaluru"
    }
  }
};

// 1. Access properties safely (including brackets for keys with spaces)
console.log("First Name:", person.first_Name); // John
console.log("Last Name:", person["last Name"]); // Doe

// 2. Perform a Deep Copy using native structuredClone (preserves nested levels)
const person2 = structuredClone(person);

// 3. Mutate 1st level property (both shallow & deep copy isolate 1st level changes)
person2.first_Name = "Foo";

console.log("person2 first_Name:", person2.first_Name); // "Foo"
console.log("person first_Name:", person.first_Name);   // "John" (pristine)

// 4. Access nested properties
console.log("person original city:", person.directory["1"].city); // "Bengaluru"

// 5. Mutate nested property inside the Deep Copy object
person2.directory["1"].city = "Chennai";

console.log("person2 city (after deep copy mutate):", person2.directory["1"].city); // "Chennai"
console.log("person city (after deep copy mutate):", person.directory["1"].city);   // "Bengaluru" (remains safe!)

// 6. Contrast with a Shallow Copy (Spread Operator)
const shallowCopyPerson = { ...person };
shallowCopyPerson.directory["1"].city = "Chennai";

// Under a Shallow Copy, nested references are shared, so the original changes!
console.log("shallowCopyPerson city:", shallowCopyPerson.directory["1"].city); // "Chennai"
console.log("person city (corrupted by shallow copy):", person.directory["1"].city);   // "Chennai"
```

### Complexity & Explanation
- **Time Complexity**: $O(D)$ where $D$ is the depth/size of the nested object to copy via `structuredClone`. Shallow copy is $O(K)$ where $K$ is the number of keys.
- **Space Complexity**: $O(D)$ to allocate the cloned object graph.
- **Explanation**: Accesses spaced keys using bracket indexes. Shallow cloning (e.g. spread operator `{ ...obj }`) only copies 1st level values. For nested properties, it copies memory address pointers, causing child mutations to overwrite the source object. Modern `structuredClone` performs a deep copy, completely isolating both graphs.

---
