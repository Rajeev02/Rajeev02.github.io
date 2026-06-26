---
title: "Closures & Lexical Scope"
---

# Overview
A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.

## Theory
In JavaScript, closures are created every time a function is created, at function creation time.
To use a closure, define a function inside another function and expose it. To expose a function, return it or pass it to another function.

## Code Example

```javascript
function makeFunc() {
  const name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

const myFunc = makeFunc();
myFunc(); // logs "Mozilla"
```

## Interview Questions
**Q: What is a practical use case for closures?**
Data privacy/encapsulation. You can create private variables that can only be accessed by the functions returned from the closure.
