## 📘 Section 1: Types vs. Interfaces

*⏱️ 1 min read*

TypeScript provides two core ways to declare object structures and contracts: **Interfaces** and **Type Aliases**. Understanding when to use which is essential for senior engineering roles.

#### 1. Structural Similarities
Both can be used to describe the shape of an object or a function contract:
```typescript
// Interface
interface UserInterface {
  id: string;
  name: string;
}

// Type Alias
type UserType = {
  id: string;
  name: string;
};
```

---

#### 2. Key Differences

##### Declaration Merging (Unique to Interfaces)
- If you define two interfaces with the exact same name in the same scope, TypeScript automatically merges their declarations into a single interface definition.
- Type aliases cannot be declared multiple times with the same name; doing so throws a duplicate identifier error.

```typescript
interface Car { brand: string; }
interface Car { model: string; }
// Result: Car now has both properties: brand and model.
```

##### Composition & Extensions
- **Interfaces** extend other interfaces using the `extends` keyword. This enables compile-time optimizations as TypeScript caches the relationship tree.
- **Type Aliases** compose structures using intersection operators (`&`).

```typescript
// Interface extension
interface Senior extends UserInterface {
  role: string;
}

// Type Alias intersection
type SeniorType = UserType & {
  role: string;
};
```

##### Capability Limits
- **Type Aliases** can declare primitives, union types, intersection types, tuples, and mapped types.
- **Interfaces** are strictly limited to describing object shapes, classes, and function structures. They cannot declare union types or alias primitive types directly.

```typescript
type ID = string | number; // Supported in Types, not Interfaces
type Position = [number, number]; // Tuple
```

---


---
