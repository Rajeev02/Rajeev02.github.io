> 🎯 **Topic:** 1.1 What is Strict Mode in JavaScript, React, and TypeScript?
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---

## 1.1 What is Strict Mode in JavaScript, React, and TypeScript?

The best way to understand **Strict** is:

> **Strict = More Rules = More Errors During Development = Fewer Bugs in Production**

Without strict mode, JavaScript is very forgiving and silently ignores many mistakes.

With strict mode, JavaScript/React/TypeScript becomes more strict and throws warnings or errors immediately.

---

### 1. JavaScript Strict Mode

#### Without Strict Mode

```javascript
function createUser() {
  username = "Rajeev";
}

createUser();

console.log(username);
```

Output:

```text
Rajeev
```

Problem:

```javascript
username = "Rajeev";
```

You forgot `let`, `const`, or `var`.

JavaScript automatically creates a global variable.

This is dangerous.

---

#### With Strict Mode

```javascript
"use strict";

function createUser() {
  username = "Rajeev";
}

createUser();
```

Output:

```text
ReferenceError: username is not defined
```

Now JavaScript catches your mistake.

---

#### Another Example

Without Strict:

```javascript
function add(a, a) {
  return a;
}

console.log(add(10, 20));
```

Output:

```text
20
```

No error.

---

With Strict:

```javascript
"use strict";

function add(a, a) {
  return a;
}
```

Output:

```text
Duplicate parameter name not allowed
```

---

### 2. React.StrictMode

This is NOT JavaScript Strict Mode.

React Strict Mode is a development tool.

Purpose:

* Find side effects
* Detect memory leaks
* Detect deprecated APIs
* Detect bad React patterns

---

#### Without React StrictMode

```jsx
function Home() {
  useEffect(() => {
    console.log("API Called");
  }, []);

  return null;
}
```

Output:

```text
API Called
```

Runs once.

---

#### With React StrictMode

```jsx
<React.StrictMode>
  <Home />
</React.StrictMode>
```

```jsx
function Home() {
  useEffect(() => {
    console.log("API Called");
  }, []);

  return null;
}
```

Output (Development Only):

```text
API Called
API Called
```

Many developers think:

```text
My API is being called twice!
```

Actually React is testing whether your component has side effects.

Production build:

```text
API Called
```

Only once.

---

#### React Native Example

```jsx
function UserScreen() {
  useEffect(() => {
    fetchUsers();
  }, []);

  return <Text>Users</Text>;
}
```

With StrictMode:

```jsx
<React.StrictMode>
  <UserScreen />
</React.StrictMode>
```

React may mount/unmount twice during development.

This helps find:

* Memory leaks
* Missing cleanup
* Unsafe side effects

---

#### Memory Leak Example

Wrong:

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running");
  }, 1000);
}, []);
```

Interval never cleared.

---

Correct:

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Running");
  }, 1000);

  return () => clearInterval(interval);
}, []);
```

React StrictMode helps expose such issues.

---

### 3. TypeScript Strict Mode

TypeScript strict mode focuses on TYPES.

Enable:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

---

#### Without TypeScript Strict

```typescript
function add(a, b) {
  return a + b;
}
```

TypeScript allows:

```typescript
add("10", 20);
add(true, false);
add([], {});
```

Potential bugs.

---

#### With TypeScript Strict

```typescript
function add(a: number, b: number): number {
  return a + b;
}
```

Now:

```typescript
add("10", 20);
```

Error:

```text
Argument of type 'string'
is not assignable to parameter of type 'number'
```

---

#### Null Safety Example

Without Strict

```typescript
let username: string = null;
```

May crash later.

---

With Strict

```typescript
let username: string = null;
```

Error:

```text
Type 'null' is not assignable to type 'string'
```

Correct:

```typescript
let username: string | null = null;
```

---

#### React Native TypeScript Example

##### API Response

```typescript
interface User {
  id: number;
  name: string;
}
```

---

Wrong:

```typescript
const user: User = {
  id: 1,
};

console.log(user.name);
```

With Strict Mode:

```text
Property 'name' is missing
```

TypeScript catches the bug before the app runs.

---

### Real Interview Answer

#### What is Strict Mode?

Strict Mode means applying additional rules and validations during development to catch errors early and improve code quality.

#### JavaScript Strict Mode

```javascript
"use strict";
```

* Prevents accidental global variables
* Prevents duplicate parameters
* Throws errors for unsafe operations

#### React StrictMode

```jsx
<React.StrictMode>
  <App />
</React.StrictMode>
```

* Development-only feature
* Detects side effects
* Detects memory leaks
* Highlights deprecated APIs
* May render components twice in development

#### TypeScript Strict Mode

```json
{
  "strict": true
}
```

* Enables strong type checking
* Prevents implicit `any`
* Prevents null-related bugs
* Catches type errors during compilation

#### Simple Difference

| Feature                | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| JavaScript Strict Mode | Makes JavaScript syntax safer                |
| React StrictMode       | Finds React lifecycle and side-effect issues |
| TypeScript Strict Mode | Enforces type safety                         |

A common React Native setup is:

```javascript
<React.StrictMode>
  <App />
</React.StrictMode>
```

and

```json
{
  "strict": true
}
```

in `tsconfig.json`.

This combination catches most bugs before they reach production.
