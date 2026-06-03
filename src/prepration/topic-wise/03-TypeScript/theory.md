## 📘 Section 1: Types vs. Interfaces

TypeScript provides two core ways to declare object structures and contracts: **Interfaces** and **Type Aliases**. Understanding when to use which is essential for senior engineering roles.

### 1. Structural Similarities
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

### 2. Key Differences

#### Declaration Merging (Unique to Interfaces)
- If you define two interfaces with the exact same name in the same scope, TypeScript automatically merges their declarations into a single interface definition.
- Type aliases cannot be declared multiple times with the same name; doing so throws a duplicate identifier error.

```typescript
interface Car { brand: string; }
interface Car { model: string; }
// Result: Car now has both properties: brand and model.
```

#### Composition & Extensions
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

#### Capability Limits
- **Type Aliases** can declare primitives, union types, intersection types, tuples, and mapped types.
- **Interfaces** are strictly limited to describing object shapes, classes, and function structures. They cannot declare union types or alias primitive types directly.

```typescript
type ID = string | number; // Supported in Types, not Interfaces
type Position = [number, number]; // Tuple
```

---

## 🛠️ Section 2: Generics & Utility Types

### 1. Generics (Type Parametrization)
Generics allow you to write reusable, type-safe components or functions that work over a variety of types rather than a single concrete type. They act as type variables that are captured when the code executes.

```typescript
// A generic API response container
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```

### 2. TypeScript Utility Types
TypeScript provides built-in utilities to facilitate common type transformations.

- **`Partial<T>`**: Constructs a type with all properties of `T` set to optional.
  ```typescript
  type UpdateUser = Partial<UserType>; // { id?: string; name?: string; }
  ```
- **`Omit<T, K>`**: Constructs a type by picking all properties from `T` and then removing keys `K`.
  ```typescript
  type NewUser = Omit<UserType, 'id'>; // { name: string; }
  ```
- **`Pick<T, K>`**: Constructs a type by picking a specific set of properties `K` from `T`.
  ```typescript
  type UserSummary = Pick<UserType, 'name'>; // { name: string; }
  ```
- **`Record<K, T>`**: Constructs an object type whose keys are `K` and values are `T`.
  ```typescript
  type UserLookup = Record<string, UserType>; // { [key: string]: UserType }
  ```
- **`Readonly<T>`**: Sets all properties of `T` to read-only, preventing re-assignment.
  ```typescript
  type ImmutableUser = Readonly<UserType>;
  ```

---

## 📱 Section 3: Type Safety in React Native (Codegen Specs)

In the New Architecture, **Codegen** bridges the type-safety gap between JavaScript and native C++/Java/Obj-C code. To configure this, you write strict TypeScript Specification files.

### 1. Codegen Specification Rules
- The spec file name must follow a strict naming convention: `Native<ModuleName>.ts` (for TurboModules) or `<ModuleName>NativeComponent.ts` (for Fabric components).
- You must use specific, compile-safe type definitions provided by React Native (`Double`, `Float`, `Int32`, `UnsafeObject`, `DirectEventHandler`). Standard JavaScript dynamic types like `any` or generic object type definitions are rejected by the Codegen compiler.

### 2. TurboModule Spec Example
```typescript
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Define strict return and input types
  encryptPayload(alias: string, rawData: string): Promise<string>;
  decryptPayload(alias: string, encryptedData: string): Promise<string>;
  isBiometricsAvailable(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SecureEncryptionModule');
```

---

## ⚙️ Section 4: Strict Compiler Options (`tsconfig.json`)

To prevent runtime crashes and enforce code quality, enterprise configurations enable strict compiler options in `tsconfig.json`.

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noEmit": true
  }
}
```

- **`"strict": true`**: Enables a broad suite of type-checking behaviors, including implicit `any` blocks, strict null checks, and strict binding call assessments.
- **`"noImplicitAny": true`**: Raises an error on expressions and declarations with an implied `any` type. Developers are forced to declare explicit types, reducing type-safety gaps.
- **`"strictNullChecks": true`**: Treats `null` and `undefined` as distinct types. This prevents the classic "cannot read property of undefined" runtime crashes by forcing developers to handle null checking explicitly.
- **`"noEmit": true`**: Instructs TypeScript to perform type checking only and not output JavaScript build files. This is used in Vite and React Native layouts where transpilation is handled by Babel or Metro, while TypeScript acts strictly as a static gatekeeper.
