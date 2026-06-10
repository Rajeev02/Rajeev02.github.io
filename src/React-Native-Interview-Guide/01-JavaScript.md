# 01. JavaScript Fundamentals & Interview Guide

# JavaScript Fundamentals for Senior React Native Developers

## What is JavaScript?

### Definition

JavaScript is a high-level, interpreted, dynamically typed, prototype-based programming language used to build interactive web and mobile applications.

It was created by Brendan Eich in 1995 and is one of the core technologies of the web alongside HTML and CSS.

Today, JavaScript is used in:

* Web Applications
* Mobile Applications (React Native)
* Backend Development (Node.js)
* Desktop Applications (Electron)
* Serverless Functions

---

### Why Do We Need JavaScript?

HTML provides structure.

CSS provides styling.

JavaScript provides behavior.

Example:

Without JavaScript:

```html
<button>Click Me</button>
```

With JavaScript:

```javascript
button.addEventListener("click", () => {
  alert("Hello");
});
```

---

### JavaScript Characteristics

* Single Threaded
* Event Driven
* Prototype Based
* Dynamically Typed
* Interpreted
* Asynchronous

---

### JavaScript Engine

JavaScript code is executed by engines:

* Chrome → V8
* Node.js → V8
* React Native → Hermes (Recommended)
* Safari → JavaScriptCore

---

### Interview Answer

"JavaScript is a high-level, dynamically typed, prototype-based language used to build interactive applications. It is single-threaded and uses an event loop to handle asynchronous operations."

Then continue through all sections.

For quality, I recommend proceeding with **Part A (Introduction → Closure)**, then **Part B**, then **Part C**, and finally I'll provide a clean merged index/version. A true complete single-file handbook won't fit safely into one response.


01-JavaScript.md

SECTION 1: JavaScript Fundamentals
1. Introduction to JavaScript
2. JavaScript Engine (V8, Hermes, JavaScriptCore)
3. Execution Context
4. Call Stack
5. Event Loop
6. Why JavaScript is Single Threaded
7. Hoisting
8. Temporal Dead Zone (TDZ)
9. Scope
10. Lexical Scope
11. Closure

SECTION 2: Variables & Functions
12. var vs let vs const
13. this Keyword
14. call / apply / bind
15. Arrow Functions
16. Function Declaration vs Function Expression
17. Higher Order Functions

SECTION 3: Objects & Inheritance
18. Prototype
19. Prototype Chain
20. Constructor Functions
21. Classes in JavaScript
22. Object.freeze()
23. Object.seal()

SECTION 4: Asynchronous JavaScript
24. Callback Functions
25. Callback Hell
26. Promise
27. Promise Methods
    - Promise.all()
    - Promise.allSettled()
    - Promise.race()
    - Promise.any()
28. Async Await
29. Promise vs Async Await

SECTION 5: Modern JavaScript
30. Deep Copy vs Shallow Copy
31. Map vs Object
32. Set
33. WeakMap vs Map
34. WeakSet vs Set
35. Spread vs Rest
36. Destructuring
37. Optional Chaining
38. Nullish Coalescing
39. typeof vs instanceof
40. for...in vs for...of
41. Default Parameters
42. Template Literals

SECTION 6: Array Methods
43. map()
44. filter()
45. reduce()
46. find()
47. some()
48. every()
49. forEach()

SECTION 7: Performance & Memory
50. Debounce
51. Throttle
52. Garbage Collection
53. Memory Leaks

SECTION 8: JavaScript Best Practices
54. Strict Mode
55. Equality Operators (== vs ===)
56. Truthy & Falsy Values

SECTION 9: Output-Based Questions
57. Hoisting Outputs
58. Closure Outputs
59. Event Loop Outputs
60. Promise Outputs
61. this Outputs
62. Type Coercion Outputs

SECTION 10: Senior React Native Interview Questions
63. Top 50 JavaScript Interview Questions
64. React Native Specific JavaScript Questions

SECTION 11: Revision Sheet
65. 15-Minute Quick Revision
66. 30-Minute Revision Plan
67. One-Day Before Interview Checklist

Why I added these

These topics are asked very frequently in 5–10 year React Native interviews:

JavaScript Engine (especially Hermes)
Function Declaration vs Expression
Higher Order Functions
Constructor Functions
Classes
Callback Functions
Default Parameters
Template Literals
== vs ===
Truthy vs Falsy
Type Coercion
React Native specific JS questions
Topics I would NOT add

Avoid adding unless specifically preparing for JavaScript-heavy frontend roles:

Generators
Iterators
Proxy
Reflect
Symbols
EventEmitter internals
Currying (optional advanced topic)
Functional programming theory

---


## Arrow Functions

### Definition

Arrow functions provide a shorter syntax for writing functions.

```javascript
const add = (a, b) => a + b;
```

### Difference from Normal Functions

| Normal Function      | Arrow Function        |
| -------------------- | --------------------- |
| Has own this         | Uses lexical this     |
| Can be constructor   | Cannot be constructor |
| Has arguments object | No arguments object   |

### Interview Answer

"Arrow functions use lexical this and provide a concise syntax for writing functions."

---

## Destructuring

### Object Destructuring

```javascript
const user = {
  name: "Raj",
  age: 30
};

const { name, age } = user;
```

---

### Array Destructuring

```javascript
const colors = ["red", "blue"];

const [first, second] = colors;
```

### Interview Answer

"Destructuring extracts values from objects and arrays into variables."

---

## Array Methods

### map()

Transforms data.

```javascript
const nums = [1,2,3];

const doubled =
 nums.map(n => n * 2);
```

---

### filter()

Filters data.

```javascript
const nums =
 [1,2,3,4];

const even =
 nums.filter(
  n => n % 2 === 0
 );
```

---

### reduce()

Aggregates values.

```javascript
const total =
 [1,2,3]
 .reduce(
  (sum,n)=>sum+n,
  0
 );
```

---

### find()

Returns first matching element.

```javascript
users.find(
 user => user.id === 1
);
```

---

### some()

Checks if any item matches.

```javascript
nums.some(
 n => n > 10
);
```

---

### every()

Checks if all items match.

```javascript
nums.every(
 n => n > 0
);
```

---

## Object.freeze()

Prevents modifications.

```javascript
Object.freeze(user);
```

---

## Object.seal()

Allows value changes but prevents adding/removing properties.

```javascript
Object.seal(user);
```

---

## Strict Mode

```javascript
"use strict";
```

Benefits:

* Safer JavaScript
* Prevents accidental globals
* Better debugging



---

# Senior React Native JavaScript Interview Questions

# 1. Execution Context

## Definition

Execution Context is the environment in which JavaScript code executes.

Whenever JavaScript runs code, it creates an execution context that contains:

* Variables
* Functions
* Scope Chain
* `this` Reference

Types:

1. Global Execution Context
2. Function Execution Context
3. Eval Execution Context (Rarely Used)

---

## Why Do We Need It?

JavaScript needs a mechanism to:

* Store variables
* Execute functions
* Track scope
* Manage memory

Without execution context, JavaScript wouldn't know where variables and functions exist.

---

## How It Works?

JavaScript executes code in two phases:

### 1. Memory Creation Phase

```javascript
var a = 10;

function greet() {
  console.log("Hello");
}
```

Memory Allocation:

```javascript
a = undefined

greet = function reference
```

---

### 2. Execution Phase

```javascript
a = 10
```

Values are assigned and code executes line by line.

---

## Example

```javascript
console.log(a);

var a = 10;
```

Internally:

```javascript
var a;

console.log(a);

a = 10;
```

Output:

```javascript
undefined
```

---

## Interview Answer

"Execution Context is the environment where JavaScript code executes. It consists of a memory creation phase where variables and functions are allocated memory, followed by an execution phase where values are assigned and code runs."

---

## Follow-up Questions

* Global Execution Context vs Function Execution Context?
* What happens during memory creation?
* How does hoisting relate to execution context?

---

# 2. Call Stack

## Definition

Call Stack is a LIFO (Last In First Out) data structure used by JavaScript to manage function execution.

---

## Why Do We Need It?

The Call Stack helps JavaScript:

* Track currently executing functions
* Know where to return after execution
* Manage nested function calls

---

## Example

```javascript
function a() {
  b();
}

function b() {
  c();
}

function c() {
  console.log("Hello");
}

a();
```

---

## Stack Flow

```text
a()
 ↓
b()
 ↓
c()
 ↓
console.log()
```

Execution completes in reverse order.

---

## Maximum Call Stack Exceeded

Occurs when recursion never stops.

```javascript
function test() {
  test();
}

test();
```

Output:

```javascript
RangeError: Maximum call stack size exceeded
```

---

## Interview Answer

"Call Stack is a LIFO data structure that tracks function execution in JavaScript. Every function call is pushed onto the stack and removed after execution."

---

## Follow-up Questions

* What is stack overflow?
* Why does recursion cause stack overflow?
* Difference between Call Stack and Event Loop?

---

# 3. Event Loop

## Definition

JavaScript is single-threaded, but it can perform asynchronous operations using the Event Loop.

The Event Loop continuously checks whether the Call Stack is empty and moves tasks from queues to the stack.

---

## Components

```text
Call Stack
     ↓
Web APIs
     ↓
Microtask Queue
     ↓
Task Queue
     ↓
Event Loop
```

---

## Example

```javascript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

Promise.resolve().then(() => {
  console.log("3");
});

console.log("4");
```

Output:

```javascript
1
4
3
2
```

---

## Why?

Execution Order:

```text
Call Stack
      ↓
Microtask Queue
      ↓
Task Queue
```

Promises execute before setTimeout callbacks.

---

## Interview Answer

"Event Loop is a mechanism that allows JavaScript to handle asynchronous operations by moving tasks from queues into the Call Stack whenever it becomes empty."

---

## Follow-up Questions

* What is Microtask Queue?
* What is Callback Queue?
* Why do Promises execute before setTimeout?

---

# 4. Why is JavaScript Single Threaded?

## Definition

JavaScript executes one operation at a time using a single Call Stack.

---

## Why Was It Designed This Way?

JavaScript was originally created to manipulate the Browser DOM.

Imagine:

Thread A:

```javascript
document.body.innerHTML = "Hello";
```

Thread B:

```javascript
document.body.innerHTML = "World";
```

If both execute simultaneously, the DOM could become inconsistent.

A single thread avoids race conditions.

---

## How Does JavaScript Handle Async Tasks?

Using:

```text
Call Stack
↓
Web APIs
↓
Microtask Queue
↓
Task Queue
↓
Event Loop
```

---

## Interview Answer

"JavaScript is single-threaded because it was designed to interact safely with the DOM. Asynchronous behavior is achieved using Web APIs and the Event Loop."

---

## Follow-up Questions

* If JS is single-threaded, how does async work?
* What are Web APIs?
* Is Node.js also single-threaded?

---

# 5. Hoisting

## Definition

Hoisting is JavaScript's behavior of moving declarations to the top of their scope during the memory creation phase.

---

## Example

```javascript
console.log(a);

var a = 10;
```

Output:

```javascript
undefined
```

Internally:

```javascript
var a;

console.log(a);

a = 10;
```

---

## Function Hoisting

```javascript
sayHello();

function sayHello() {
  console.log("Hello");
}
```

Output:

```javascript
Hello
```

---

## Interview Answer

"Hoisting is the process where variable and function declarations are moved to the top of their scope before execution."

---

## Follow-up Questions

* Is let hoisted?
* Is const hoisted?
* Why does var return undefined?

---

# 6. Temporal Dead Zone (TDZ)

## Definition

Temporal Dead Zone is the period between entering a scope and initializing a let or const variable.

---

## Example

```javascript
console.log(name);

let name = "Raj";
```

Output:

```javascript
ReferenceError
```

---

## Why Does This Happen?

Because:

```javascript
let
const
```

are hoisted but remain inaccessible until initialized.

---

## Interview Answer

"Temporal Dead Zone is the time between variable hoisting and initialization where accessing a let or const variable throws a ReferenceError."

---

## Follow-up Questions

* Is let hoisted?
* Why does var not have TDZ?
* Difference between undefined and ReferenceError?

---

# 7. Scope

## Definition

Scope determines where variables can be accessed.

---

## Types

### Global Scope

```javascript
let name = "Raj";
```

Accessible everywhere.

---

### Function Scope

```javascript
function test() {
  let age = 25;
}
```

Accessible only inside the function.

---

### Block Scope

```javascript
if(true){
  let age = 25;
}
```

Accessible only inside the block.

---

## Interview Answer

"Scope defines the visibility and accessibility of variables in JavaScript."

---

## Follow-up Questions

* Function Scope vs Block Scope?
* Does var support block scope?
* Why are let and const preferred?

---

# 8. Lexical Scope

## Definition

Lexical Scope means a function can access variables from its parent scope.

---

## Example

```javascript
function outer() {

  let name = "Raj";

  function inner() {
    console.log(name);
  }

  inner();
}

outer();
```

Output:

```javascript
Raj
```

---

## Why Is It Important?

Lexical Scope is the foundation of:

* Closures
* Module Pattern
* Encapsulation

---

## Interview Answer

"Lexical Scope means functions can access variables from the scope where they were defined."

---

## Follow-up Questions

* What is Closure?
* How does Scope Chain work?
* Difference between Scope and Lexical Scope?

---

# 9. Closure

## Definition

A Closure is a function that remembers variables from its outer scope even after the outer function has finished execution.

---

## Example

```javascript
function counter() {

  let count = 0;

  return function() {
    count++;
    return count;
  };
}

const increment = counter();

console.log(increment());
console.log(increment());
```

Output:

```javascript
1
2
```

---

## Why Do We Need Closures?

Used for:

* Data Privacy
* Encapsulation
* Memoization
* Event Handlers
* React Hooks Internals

---

## React Native Example

```javascript
function createLogger(name) {

  return function() {
    console.log(name);
  };
}
```

The inner function remembers `name`.

---

## Interview Answer

"Closure is a combination of a function and its lexical environment. It allows a function to access variables from its outer scope even after that scope has finished executing."

---

## Follow-up Questions

* How are Closures implemented?
* Closures and Memory Leaks?
* Real-world React Native examples?

---

# 10. var vs let vs const

## Definition

`var`, `let`, and `const` are used to declare variables in JavaScript.

---

## Why Do We Need Different Variable Types?

Different applications require different levels of mutability and scope control.

Example:

* Some values change → `let`
* Some values never change → `const`
* Legacy code → `var`

---

## Comparison

| Feature                | var      | let   | const |
| ---------------------- | -------- | ----- | ----- |
| Scope                  | Function | Block | Block |
| Reassign               | Yes      | Yes   | No    |
| Redeclare              | Yes      | No    | No    |
| Hoisted                | Yes      | Yes   | Yes   |
| TDZ                    | No       | Yes   | Yes   |
| Global Object Property | Yes      | No    | No    |

---

## Example

### var

```javascript
if(true){
  var name = "Raj";
}

console.log(name);
```

Output:

```javascript
Raj
```

---

### let

```javascript
if(true){
  let name = "Raj";
}

console.log(name);
```

Output:

```javascript
ReferenceError
```

---

### const

```javascript
const name = "Raj";

name = "Kumar";
```

Output:

```javascript
TypeError
```

---

## Interview Answer

"var is function-scoped and allows redeclaration. let and const are block-scoped and avoid many issues related to hoisting and scope leakage. const is preferred by default unless reassignment is required."

---

## Follow-up Questions

* Is const immutable?
* Difference between reassignment and mutation?
* Why avoid var?

---

# 11. this Keyword

## Definition

`this` refers to the object that invokes the function.

Its value depends on how the function is called.

---

## Why Do We Need It?

Allows functions to access properties of the object that called them.

---

## Example

```javascript
const user = {
  name: "Raj",

  getName() {
    console.log(this.name);
  }
};

user.getName();
```

Output:

```javascript
Raj
```

---

## Global Context

```javascript
console.log(this);
```

Browser:

```javascript
window
```

---

## Arrow Function

```javascript
const user = {
  name: "Raj",

  getName: () => {
    console.log(this.name);
  }
};
```

Output:

```javascript
undefined
```

Arrow functions don't create their own `this`.

They inherit from parent scope.

---

## Interview Answer

"`this` refers to the execution context of a function. In normal functions it depends on how the function is called, while arrow functions inherit `this` from their surrounding scope."

---

## Follow-up Questions

* Arrow vs Normal Functions?
* How does bind work?
* call vs apply vs bind?

---

# 12. call(), apply(), bind()

## Definition

These methods allow us to manually control the value of `this`.

---

## call()

```javascript
function greet() {
  console.log(this.name);
}

greet.call({
  name: "Raj"
});
```

Output:

```javascript
Raj
```

---

## apply()

```javascript
greet.apply({
  name: "Raj"
});
```

Same as call but accepts arguments as array.

---

## bind()

```javascript
const greetUser = greet.bind({
  name: "Raj"
});

greetUser();
```

Returns a new function.

---

## Interview Answer

"call and apply invoke a function immediately with a custom this value, while bind returns a new function with this permanently bound."

---

# 13. Prototype

## Definition

Every JavaScript object has a prototype from which it inherits properties and methods.

JavaScript uses prototypes for inheritance.

---

## Example

```javascript
const arr = [];

arr.push(1);
```

Where does push come from?

```javascript
Array.prototype.push
```

---

## Prototype Chain

```text
arr
 ↓
Array.prototype
 ↓
Object.prototype
 ↓
null
```

---

## Why Do We Need It?

Without prototypes every object would have its own copy of methods.

This would waste memory.

---

## Interview Answer

"Prototype is JavaScript's inheritance mechanism. Objects inherit methods and properties from their prototype chain."

---

## Follow-up Questions

* Prototype vs Class?
* Prototype Chain?
* instanceof internally?

---

# 14. Prototype Chain

## Definition

When JavaScript cannot find a property on an object, it looks up the prototype chain.

---

## Example

```javascript
const user = {};

user.toString();
```

JavaScript searches:

```text
user
 ↓
Object.prototype
 ↓
null
```

and finds:

```javascript
toString()
```

---

## Interview Answer

"Prototype chain is the process JavaScript uses to search for properties and methods through linked prototypes."

---

## Follow-up Questions

* How does inheritance work?
* What happens when property isn't found?

---

# 15. Promise

## Definition

A Promise represents a future value that may be available now, later, or never.

---

## Promise States

```text
Pending
 ↓
Fulfilled
```

or

```text
Pending
 ↓
Rejected
```

---

## Example

```javascript
const promise = new Promise(
  (resolve, reject) => {

    const success = true;

    if(success){
      resolve("Success");
    } else {
      reject("Failed");
    }
  }
);
```

---

## Why Do We Need It?

To handle asynchronous operations:

* API Calls
* Database Queries
* File Operations

---

## Interview Answer

"A Promise is an object representing the eventual completion or failure of an asynchronous operation."

---

## Follow-up Questions

* Promise States?
* Promise Chaining?
* Promise Methods?

---

# 16. Promise Methods

## Promise.all()

Runs all promises in parallel.

Fails if one fails.

```javascript
Promise.all([
  api1(),
  api2(),
  api3()
]);
```

---

## Promise.allSettled()

Waits for all promises.

Never fails.

```javascript
Promise.allSettled([
  api1(),
  api2(),
  api3()
]);
```

---

## Promise.race()

Returns first settled promise.

```javascript
Promise.race([
  api1(),
  api2()
]);
```

---

## Promise.any()

Returns first successful promise.

```javascript
Promise.any([
  api1(),
  api2()
]);
```

---

## Comparison

| Method     | Failure Handling  |
| ---------- | ----------------- |
| all        | Fails immediately |
| allSettled | Waits for all     |
| race       | First completed   |
| any        | First success     |

---

## Interview Answer

"Promise.all is used when all requests are required, while Promise.allSettled is useful when we want results from every request regardless of failures."

---

# 17. Callback Hell

## Definition

Nested callbacks that make code difficult to read and maintain.

---

## Example

```javascript
login(() => {

  getUser(() => {

    getOrders(() => {

      getPayments(() => {

      });

    });

  });

});
```

---

## Problems

* Difficult to read
* Hard to debug
* Hard to maintain

---

## Solution

* Promises
* Async Await

---

## Interview Answer

"Callback Hell occurs when multiple nested callbacks create deeply indented and difficult-to-maintain code."

---

## Follow-up Questions

* How do Promises solve callback hell?
* How does Async Await improve readability?

---

# 18. Async Await

## Definition

Async Await is syntactic sugar built on top of Promises.

---

## Example

```javascript
async function getUserData() {

  const user =
    await fetchUser();

  return user;
}
```

---

## Error Handling

```javascript
async function loadData() {

  try {

    const data =
      await fetchData();

  } catch(error) {

    console.log(error);

  }
}
```

---

## Advantages

* Cleaner code
* Better readability
* Easier debugging
* Easier error handling

---

## Interview Answer

"Async Await provides a cleaner way to write asynchronous code while internally still using Promises."

---

## Follow-up Questions

* Does async return Promise?
* Can await be used without async?
* Parallel execution with async await?

---

# 19. Promise vs Async Await

## Comparison

| Promise                     | Async Await                   |
| --------------------------- | ----------------------------- |
| ES6                         | ES8                           |
| Uses then/catch             | Uses async/await              |
| More chaining               | Cleaner syntax                |
| Harder to read              | Easier to read                |
| Good for parallel execution | Good for sequential execution |
| Verbose                     | Cleaner                       |

---

## Promise Example

```javascript
fetchUser()
 .then(user =>
   getOrders(user.id)
 )
 .then(orders =>
   console.log(orders)
 )
 .catch(error =>
   console.log(error)
 );
```

---

## Async Await Example

```javascript
async function getData() {

  try {

    const user =
      await fetchUser();

    const orders =
      await getOrders(user.id);

    console.log(orders);

  } catch(error) {

    console.log(error);

  }
}
```

---

## Important Interview Point

```javascript
async function test() {
  return 10;
}
```

Actually returns:

```javascript
Promise.resolve(10)
```

Every async function returns a Promise.

---

## Interview Answer

"Async Await is built on top of Promises and provides cleaner syntax for asynchronous code. Internally, async functions still return Promises."

---

## Follow-up Questions

* Does async return Promise?
* Promise.all with async await?
* Which is better for parallel API calls?

---

# 20. Strict Mode ("use strict")

```javascript
"use strict";
```

## Benefits

* Prevents accidental globals
* Makes debugging easier
* Safer JavaScript

## Example

```javascript
"use strict";

name = "Raj";
```

Output:

```javascript
ReferenceError
```

## Interview Answer

"Strict mode enables a restricted variant of JavaScript that catches common mistakes and unsafe behavior."

````

---

### Coverage Check

After Part 1 + Part 2 you have covered:

✅ Execution Context  
✅ Call Stack  
✅ Event Loop  
✅ JavaScript Single Threaded  
✅ Hoisting  
✅ TDZ  
✅ Scope  
✅ Lexical Scope  
✅ Closure  
✅ var vs let vs const  
✅ this  
✅ call/apply/bind  
✅ Prototype  
✅ Prototype Chain  
✅ Promise  
✅ Promise Methods  
✅ Callback Hell  
✅ Async Await  
✅ Promise vs Async Await  

Still remaining for **Part 3**:

```text
Deep Copy vs Shallow Copy
Map vs Object
Set
WeakMap vs Map
WeakSet vs Set
Spread vs Rest
Optional Chaining
Nullish Coalescing
typeof vs instanceof
for...in vs for...of
Debounce
Throttle
Garbage Collection
Memory Leaks
Output Based Questions
Senior Revision Sheet
````

Once Part 3 is done, your `01-JavaScript.md` will be complete and strong enough for most Senior React Native interviews.
# 21. Deep Copy vs Shallow Copy

## Definition

Copying objects in JavaScript can be:

* Shallow Copy
* Deep Copy

---

## Shallow Copy

Copies only first-level properties.

Nested objects still share references.

```javascript
const user = {
  name: "Raj",
  address: {
    city: "Bangalore"
  }
};

const copy = {...user};

copy.address.city = "Delhi";

console.log(user.address.city);
```

Output:

```javascript
Delhi
```

---

## Deep Copy

Creates completely independent copies.

```javascript
const copy =
  structuredClone(user);
```

---

## Interview Answer

"Shallow copy copies only top-level properties while deep copy recursively copies nested objects as well."

---

## Follow-up Questions

* Spread operator shallow or deep?
* JSON.parse(JSON.stringify()) limitations?

---

# 22. Map vs Object

## Definition

Both store key-value pairs.

---

## Object

```javascript
const user = {
  name: "Raj"
};
```

---

## Map

```javascript
const map = new Map();

map.set("name", "Raj");
```

---

## Comparison

| Feature       | Object        | Map                         |
| ------------- | ------------- | --------------------------- |
| Key Types     | String/Symbol | Any Type                    |
| Size Property | No            | Yes                         |
| Iterable      | No            | Yes                         |
| Performance   | Good          | Better for frequent updates |

---

## Interview Answer

"Map is designed specifically for key-value storage and provides better performance and flexibility than Objects."

---

# 23. Set

## Definition

Set stores only unique values.

---

## Example

```javascript
const nums = [1,1,2,2,3];

const unique =
  [...new Set(nums)];
```

Output:

```javascript
[1,2,3]
```

---

## Use Cases

* Remove duplicates
* Fast lookups
* Unique collections

---

## Interview Answer

"A Set is a collection of unique values commonly used to remove duplicates and perform fast membership checks."

---

# 24. WeakMap vs Map

## Map

```javascript
const map = new Map();
```

Can use any key.

---

## WeakMap

```javascript
const weakMap =
  new WeakMap();
```

Only accepts objects as keys.

---

## Benefits

Garbage Collection can remove unused keys automatically.

---

## Interview Answer

"WeakMap allows garbage collection of keys and helps prevent memory leaks."

---

# 25. WeakSet vs Set

## Set

Stores unique values.

---

## WeakSet

Stores only object references.

```javascript
const ws =
  new WeakSet();
```

---

## Benefits

Automatically cleaned by Garbage Collector.

---

## Interview Answer

"WeakSet stores object references and allows automatic garbage collection."

---

# 26. Spread vs Rest Operator

## Spread Operator (...)

Expands values.

---

## Example

```javascript
const arr1 = [1,2];

const arr2 = [
  ...arr1,
  3
];
```

Output:

```javascript
[1,2,3]
```

---

## Rest Operator (...)

Collects values.

---

## Example

```javascript
function sum(...numbers){
  console.log(numbers);
}
```

Output:

```javascript
[1,2,3]
```

---

## Interview Answer

"Spread expands values while Rest collects values."

---

# 27. Optional Chaining

## Definition

Safely accesses nested properties.

---

## Example

```javascript
const city =
 user?.address?.city;
```

---

## Without Optional Chaining

```javascript
user.address.city
```

May throw:

```javascript
Cannot read property
```

---

## Interview Answer

"Optional chaining prevents runtime errors when accessing nested properties that may be undefined."

---

# 28. Nullish Coalescing Operator (??)

## Definition

Returns default value only when left side is:

* null
* undefined

---

## Example

```javascript
const name =
 userName ?? "Guest";
```

---

## Difference from ||

```javascript
0 || 100
```

Output:

```javascript
100
```

---

```javascript
0 ?? 100
```

Output:

```javascript
0
```

---

## Interview Answer

"Nullish coalescing provides defaults only for null or undefined values."

---

# 29. typeof vs instanceof

## typeof

Used for primitive type checking.

---

## Example

```javascript
typeof "Raj"
```

Output:

```javascript
"string"
```

---

## instanceof

Checks prototype chain.

---

## Example

```javascript
[] instanceof Array
```

Output:

```javascript
true
```

---

## Interview Answer

"typeof is primarily for primitive type checking while instanceof checks object inheritance."

---

# 30. for...in vs for...of

## for...in

Iterates keys.

```javascript
for(let key in user){
}
```

---

## for...of

Iterates values.

```javascript
for(let value of arr){
}
```

---

## Interview Answer

"for...in iterates keys while for...of iterates values of iterable objects."

---

# 31. Debouncing

## Definition

Delays execution until user stops triggering an event.

---

## Example

Search Bar

```text
R
Ra
Raj
```

Only final API call executes.

---

## React Native Use Cases

* Search
* Auto-complete
* API calls

---

## Interview Answer

"Debouncing delays execution until a specified idle period has passed."

---

# 32. Throttling

## Definition

Executes function at fixed intervals.

---

## Example

Scroll Event

```text
1000 scroll events
↓
10 function calls
```

---

## React Native Use Cases

* Scroll tracking
* Analytics
* Gesture events

---

## Interview Answer

"Throttling limits execution frequency by allowing a function to run only once within a specified interval."

---

# Debounce vs Throttle

| Debounce             | Throttle               |
| -------------------- | ---------------------- |
| Waits for inactivity | Fixed interval         |
| Search               | Scroll                 |
| Reduces API calls    | Limits event frequency |

---

# 33. Garbage Collection

## Definition

Automatic memory management process.

---

## How It Works?

JavaScript uses:

### Mark and Sweep

1. Mark reachable objects
2. Remove unreachable objects

---

## Example

```javascript
let user = {
  name:"Raj"
};

user = null;
```

Object becomes eligible for cleanup.

---

## Interview Answer

"Garbage Collection automatically frees memory occupied by unreachable objects."

---

# 34. Memory Leaks

## Definition

Memory that cannot be freed because references still exist.

---

## Common Causes

### Event Listeners

```javascript
window.addEventListener(...)
```

Not removed.

---

### Timers

```javascript
setInterval(...)
```

Never cleared.

---

### Closures

Large objects kept in memory.

---

### Global Variables

Accidental references.

---

## React Native Examples

### useEffect Cleanup Missing

```javascript
useEffect(() => {

  const timer =
    setInterval(() => {},1000);

}, []);
```

---

Correct:

```javascript
useEffect(() => {

  const timer =
    setInterval(() => {},1000);

  return () => {
    clearInterval(timer);
  };

}, []);
```

---

### WebSocket Not Closed

```javascript
socket.close();
```

---

### Event Listener Not Removed

```javascript
subscription.remove();
```

---

## Interview Answer

"Memory leaks occur when objects remain referenced after they are no longer needed, preventing garbage collection."

---

# 35. Most Asked Output Questions

## Question 1

```javascript
console.log([] + []);
```

Output:

```javascript
""
```

---

## Question 2

```javascript
console.log([] + {});
```

Output:

```javascript
"[object Object]"
```

---

## Question 3

```javascript
console.log({} + []);
```

Output:

```javascript
0
```

---

## Question 4

```javascript
console.log(typeof null);
```

Output:

```javascript
"object"
```

Historic JavaScript bug.

---

## Question 5

```javascript
console.log(1 + "1");
```

Output:

```javascript
"11"
```

---

## Question 6

```javascript
console.log(1 - "1");
```

Output:

```javascript
0
```

---

## Question 7

```javascript
console.log(false == 0);
```

Output:

```javascript
true
```

---

## Question 8

```javascript
console.log(false === 0);
```

Output:

```javascript
false
```

---

