# 02-TypeScript.md

# TypeScript Fundamentals for Senior React Native Developers

---

# 1. What is TypeScript?

## Definition

TypeScript is an open-source programming language developed by Microsoft that extends JavaScript by adding static typing.

TypeScript is a superset of JavaScript, meaning every valid JavaScript program is also valid TypeScript.

---

## Why Do We Need TypeScript?

JavaScript is dynamically typed.

Example:

```typescript
function add(a, b) {
  return a + b;
}

add("10", 20);
```

Output:

```typescript
1020
```

No compile-time error.

---

TypeScript:

```typescript
function add(
  a: number,
  b: number
) {
  return a + b;
}

add("10", 20);
```

Compile-time Error:

```typescript
Argument of type string
is not assignable
to parameter of type number
```

---

## Benefits

* Type Safety
* Better Autocomplete
* Easier Refactoring
* Fewer Runtime Errors
* Better Developer Experience

---

## How TypeScript Works?

```text
TypeScript
      ↓
TypeScript Compiler (tsc)
      ↓
JavaScript
      ↓
Browser / Node / React Native
```

---

## Interview Answer

"TypeScript is a statically typed superset of JavaScript that helps catch errors during development and improves code maintainability and scalability."

---

## Follow-up Questions

* Is TypeScript interpreted?
* Does TypeScript run directly in browser?
* Difference between TypeScript and JavaScript?

---

# 2. TypeScript vs JavaScript

| Feature         | JavaScript | TypeScript   |
| --------------- | ---------- | ------------ |
| Typing          | Dynamic    | Static       |
| Compile Step    | No         | Yes          |
| Error Detection | Runtime    | Compile Time |
| IDE Support     | Limited    | Excellent    |
| Refactoring     | Harder     | Easier       |
| Large Projects  | Difficult  | Easier       |

---

## Interview Answer

"TypeScript adds static typing and compile-time checking on top of JavaScript, making it better suited for large-scale applications."

---

# 3. Basic Types

## String

```typescript
let name: string = "Raj";
```

---

## Number

```typescript
let age: number = 30;
```

---

## Boolean

```typescript
let active: boolean = true;
```

---

## Array

```typescript
let users: string[] = [];
```

---

## Object

```typescript
let user: object = {};
```

---

# 4. Type Inference

## Definition

TypeScript automatically determines types when possible.

---

## Example

```typescript
let name = "Raj";
```

TypeScript infers:

```typescript
string
```

---

## Interview Answer

"Type inference allows TypeScript to automatically determine variable types without explicit annotations."

---

# 5. Any

## Definition

Disables type checking.

---

## Example

```typescript
let value: any = "Raj";

value = 10;
value = true;
```

---

## Why Avoid It?

Removes TypeScript benefits.

---

## Interview Answer

"any disables type safety and should be avoided whenever possible."

---

# 6. Unknown

## Definition

Safer alternative to any.

---

## Example

```typescript
let value: unknown;

value = "Raj";
```

Before use:

```typescript
if(typeof value === "string") {
  console.log(value);
}
```

---

## Interview Answer

"unknown provides flexibility like any but requires type checking before usage."

---

# 7. Type Alias

## Definition

Creates custom reusable types.

---

## Example

```typescript
type User = {
  name: string;
  age: number;
};
```

---

## Interview Answer

"Type aliases allow us to define reusable custom types."

---

# 8. Interface

## Definition

Defines the structure of an object.

---

## Example

```typescript
interface User {
  name: string;
  age: number;
}
```

---

## Interview Answer

"Interfaces define contracts for object structures and are commonly used for API models."

---

# 9. Type vs Interface

## Type

```typescript
type User = {
  name: string;
};
```

---

## Interface

```typescript
interface User {
  name: string;
}
```

---

## Comparison

| Feature             | Type | Interface |
| ------------------- | ---- | --------- |
| Object Types        | Yes  | Yes       |
| Primitive Types     | Yes  | No        |
| Union Types         | Yes  | No        |
| Declaration Merging | No   | Yes       |
| Extend              | Yes  | Yes       |

---

## Recommendation

React Native Projects:

```text
Interface → API Models

Type → Unions & Utility Types
```

---

## Interview Answer

"Interfaces are preferred for object contracts, while type aliases are more flexible and support unions and advanced type compositions."

---

# 10. Union Types

## Definition

Allows multiple types.

---

## Example

```typescript
let id:
 string | number;
```

---

## Interview Answer

"Union types allow a variable to hold multiple possible types."

---

# 11. Intersection Types

## Definition

Combines multiple types.

---

## Example

```typescript
type User =
  Person & Address;
```

---

## Interview Answer

"Intersection types combine multiple types into a single type."

---

# 12. Enum

## Definition

Represents a fixed set of constants.

---

## Example

```typescript
enum Status {
  Success,
  Failed,
  Loading
}
```

---

## Interview Answer

"Enums provide readable names for a set of related constant values."

---

# 13. Generics

## Definition

Allows reusable code that works with different data types.

---

## Example

```typescript
function identity<T>(
  value: T
): T {
  return value;
}
```

---

## Why Do We Need It?

Without Generics:

```typescript
function getString(
 value: string
){}
```

Need multiple functions.

With Generics:

```typescript
function getData<T>(
 value: T
){}
```

One reusable function.

---

## Interview Answer

"Generics provide type-safe reusability without sacrificing flexibility."

---

# 14. keyof

## Definition

Returns all property names of a type.

---

## Example

```typescript
interface User {
  name: string;
  age: number;
}

type Keys =
  keyof User;
```

Result:

```typescript
"name" | "age"
```

---

## Interview Answer

"keyof extracts all keys from a type as a union."

---

# 15. typeof

## Definition

Gets the type of a variable.

---

## Example

```typescript
const user = {
  name: "Raj"
};

type User =
  typeof user;
```

---

## Interview Answer

"typeof derives a TypeScript type from an existing JavaScript value."

---

# 16. Utility Types

## Partial

Makes properties optional.

```typescript
Partial<User>
```

---

## Required

Makes properties mandatory.

```typescript
Required<User>
```

---

## Pick

Select specific fields.

```typescript
Pick<User, "name">
```

---

## Omit

Remove fields.

```typescript
Omit<User, "age">
```

---

## Record

Create object types.

```typescript
Record<string, number>
```

---

## Interview Answer

"Utility types allow us to transform existing types without rewriting them."

---

# 17. Type Guards

## Definition

Narrow types at runtime.

---

## Example

```typescript
function print(
 value: string | number
){

  if(typeof value === "string"){
    console.log(value);
  }

}
```

---

## Interview Answer

"Type guards help TypeScript determine the exact type within conditional blocks."

---

# 18. Optional Properties

## Example

```typescript
interface User {
  name: string;
  age?: number;
}
```

---

## Interview Answer

"Optional properties allow values to be omitted while maintaining type safety."

---

# 19. Readonly

## Example

```typescript
interface User {
  readonly id: number;
}
```

---

## Interview Answer

"Readonly properties cannot be modified after initialization."

---

# 20. Most Asked TypeScript Interview Questions

1. What is TypeScript?
2. Why use TypeScript in React Native?
3. TypeScript vs JavaScript?
4. Type vs Interface?
5. Any vs Unknown?
6. Union vs Intersection?
7. What are Generics?
8. What is keyof?
9. What is typeof?
10. Utility Types?
11. Partial vs Required?
12. Pick vs Omit?
13. What are Type Guards?
14. Optional Properties?
15. Readonly Properties?
16. How does TypeScript improve React Native applications?
17. What are compile-time errors?
18. Why avoid any?
19. What is declaration merging?
20. What are mapped types?

---

# Daily Revision Plan

```text
TypeScript Basics       5 min
Type vs Interface       5 min
Generics                5 min
keyof + typeof          3 min
Utility Types           5 min
Type Guards             3 min
Interview Questions     5 min

Total: ~30 Minutes
```
# 02-TypeScript.md (Part 2)

# Advanced TypeScript for Senior React Native Developers

---

# 21. Literal Types

## Definition

Literal Types allow variables to have exact values instead of general types.

---

## Example

```typescript
let status: "success";

status = "success";
```

Valid

```typescript
status = "failed";
```

Invalid

---

## Why Do We Need It?

To restrict values and improve type safety.

---

## Real React Native Example

```typescript
type Theme =
  "light" |
  "dark";
```

---

## Interview Answer

"Literal types allow variables to accept only specific predefined values."

---

# 22. Mapped Types

## Definition

Mapped Types create new types by transforming existing types.

---

## Example

```typescript
type User = {
  name: string;
  age: number;
};

type OptionalUser = {
  [K in keyof User]?:
    User[K];
};
```

Equivalent:

```typescript
type OptionalUser =
  Partial<User>;
```

---

## Why Do We Need It?

Avoid repeating type definitions.

---

## Interview Answer

"Mapped types transform existing types dynamically using keyof and indexed access types."

---

# 23. Conditional Types

## Definition

Conditional Types provide if-else logic at the type level.

---

## Syntax

```typescript
T extends U
  ? X
  : Y
```

---

## Example

```typescript
type IsString<T> =
  T extends string
    ? true
    : false;
```

---

## Result

```typescript
IsString<string>
```

Output:

```typescript
true
```

---

## Interview Answer

"Conditional types allow type selection based on compile-time conditions."

---

# 24. Infer Keyword

## Definition

infer extracts types from existing types.

---

## Example

```typescript
type Return<T> =
  T extends (
    ...args:any[]
  ) => infer R
    ? R
    : never;
```

---

## Usage

```typescript
function getUser() {
  return {
    id: 1
  };
}

type User =
  ReturnType<
    typeof getUser
  >;
```

---

## Interview Answer

"infer allows TypeScript to automatically extract and infer types from complex type definitions."

---

# 25. Generic Constraints

## Definition

Restricts what types can be passed into generics.

---

## Example

```typescript
function getLength<
  T extends {
    length:number
  }
>(value:T){

  return value.length;

}
```

Valid:

```typescript
getLength("Raj");
```

Invalid:

```typescript
getLength(123);
```

---

## Interview Answer

"Generic constraints limit generic types to specific structures or behaviors."

---

# 26. Discriminated Unions

## Definition

A union where every type contains a common field.

---

## Example

```typescript
type Success = {
  status:"success";
  data:string;
};

type Error = {
  status:"error";
  message:string;
};

type Response =
  Success | Error;
```

---

## Usage

```typescript
if(
 response.status ===
 "success"
){
  console.log(
    response.data
  );
}
```

---

## Interview Answer

"Discriminated unions provide safe type narrowing using a common discriminating property."

---

# 27. Function Overloading

## Definition

Multiple function signatures with a single implementation.

---

## Example

```typescript
function add(
  a:number,
  b:number
):number;

function add(
  a:string,
  b:string
):string;

function add(
  a:any,
  b:any
){
  return a + b;
}
```

---

## Interview Answer

"Function overloading allows a function to support multiple type-safe call signatures."

---

# 28. Declaration Merging

## Definition

TypeScript can merge multiple interfaces.

---

## Example

```typescript
interface User {
  name:string;
}

interface User {
  age:number;
}
```

Result:

```typescript
interface User {
  name:string;
  age:number;
}
```

---

## Interview Answer

"Declaration merging allows multiple interface declarations to combine into a single interface."

---

# 29. Non-Null Assertion Operator

## Definition

Tells TypeScript that a value will never be null or undefined.

---

## Example

```typescript
const input =
  document.getElementById(
    "name"
  )!;

input.focus();
```

---

## Warning

Use carefully.

Can cause runtime errors.

---

## Interview Answer

"The non-null assertion operator removes null and undefined from a type without runtime checks."

---

# 30. Optional Chaining

## Example

```typescript
user?.address?.city
```

---

## Benefits

* Cleaner code
* Safer access
* Fewer null checks

---

## Interview Answer

"Optional chaining safely accesses nested properties without throwing runtime errors."

---

# 31. Nullish Coalescing

## Example

```typescript
const name =
 userName ??
 "Guest";
```

---

## Difference from ||

```typescript
0 || 100
```

Returns:

```typescript
100
```

---

```typescript
0 ?? 100
```

Returns:

```typescript
0
```

---

## Interview Answer

"Nullish coalescing only falls back for null and undefined values."

---

# 32. React Component Props Typing

## Example

```typescript
interface Props {
  title:string;
}

const Header = ({
  title
}:Props) => {

  return (
    <Text>
      {title}
    </Text>
  );
};
```

---

## Interview Answer

"Interfaces are commonly used to define React component props and improve type safety."

---

# 33. useState with TypeScript

## Example

```typescript
const [
  user,
  setUser
] = useState<
  User | null
>(null);
```

---

## Interview Answer

"Generics help React Hooks maintain strict type safety."

---

# 34. useRef with TypeScript

## Example

```typescript
const inputRef =
 useRef<TextInput>(
   null
 );
```

---

## Interview Answer

"useRef generics allow accurate typing of native component references."

---

# 35. Custom Hooks Typing

## Example

```typescript
function useUser() {

  const user =
    useState<User>();

  return user;
}
```

---

## Interview Answer

"Custom hooks should expose strongly typed APIs to improve reusability and maintainability."

---

# 36. API Response Typing

## Example

```typescript
interface UserResponse {
  id:number;
  name:string;
}
```

---

## Axios

```typescript
const response =
 await axios.get<
   UserResponse
 >("/user");
```

---

## Interview Answer

"API response typing catches contract mismatches at compile time."

---

# 37. Redux Toolkit with TypeScript

## Slice Example

```typescript
interface UserState {
  loading:boolean;
}

const initialState:
 UserState = {
  loading:false
};
```

---

## Interview Answer

"Redux Toolkit integrates seamlessly with TypeScript through typed state, actions, and selectors."

---

# 38. React Navigation Type Safety

## Example

```typescript
type RootStack =
{
 Home:undefined;

 Profile:{
   userId:string;
 };
};
```

---

## Usage

```typescript
navigation.navigate(
 "Profile",
 {
   userId:"1"
 }
);
```

---

## Benefits

* Route validation
* Parameter safety
* Better autocomplete

---

## Interview Answer

"Type-safe navigation prevents invalid routes and incorrect navigation parameters."

---

# 39. Utility Types Deep Dive

## Partial

```typescript
Partial<User>
```

All optional.

---

## Required

```typescript
Required<User>
```

All mandatory.

---

## Pick

```typescript
Pick<
 User,
 "name"
>
```

---

## Omit

```typescript
Omit<
 User,
 "age"
>
```

---

## Record

```typescript
Record<
 string,
 number
>
```

---

## Readonly

```typescript
Readonly<User>
```

---

## Interview Answer

"Utility types help transform existing types without duplicating code."

---

# 40. Most Asked Senior TypeScript Questions

## Fundamentals

1. What is TypeScript?
2. TypeScript vs JavaScript?
3. Why use TypeScript in React Native?
4. Type vs Interface?
5. Any vs Unknown?
6. Union vs Intersection?
7. Optional vs Readonly?

---

## Advanced

8. What are Generics?
9. Generic Constraints?
10. keyof?
11. typeof?
12. infer?
13. Conditional Types?
14. Mapped Types?
15. Declaration Merging?

---

## React Native

16. Typing Props?
17. Typing Hooks?
18. Typing API Responses?
19. React Navigation Types?
20. Redux Toolkit with TypeScript?

---

# Senior React Native TypeScript Revision Sheet

```text
TypeScript Basics           5 min
Type vs Interface           5 min
Generics                    5 min
Utility Types               5 min
Conditional Types           3 min
Mapped Types                3 min
infer                       2 min
React Native Typing         5 min
Redux + Navigation          5 min

Total: ~38 Minutes
```

---

# Final Interview Summary

For Senior React Native interviews, focus heavily on:

1. Type vs Interface
2. Generics
3. Utility Types
4. Union & Intersection
5. keyof
6. typeof
7. Type Guards
8. Conditional Types
9. infer
10. React Component Props Typing
11. Redux Toolkit Typing
12. React Navigation Typing
13. API Response Typing

These account for roughly 90% of TypeScript questions asked in React Native interviews.


---


## Never Type

### Definition

Represents values that never occur.

```typescript
function throwError():
 never {
 throw new Error();
}
```

---

## Void Type

Used when a function returns nothing.

```typescript
function log():
 void {
 console.log("Hi");
}
```

---

## Tuple

Fixed-length typed array.

```typescript
let user:
 [string, number];

user = ["Raj", 30];
```

---

## Indexed Access Types

```typescript
interface User {
 name: string;
 age: number;
}

type NameType =
 User["name"];
```

