
## Page Summary
### Reading Time
`5 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🔬 Section 5: Advanced TypeScript Q&A |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | 🔥 Must Revise |

---


## 🔬 Section 5: Advanced TypeScript Q&A

*⏱️ 3 min read*

#### Q1: Explain Conditional Types and how they are used to write dynamic, responsive typings. Provide an example showing how to build custom Utility Types using `infer`.
- **Answer**:
  - **Conditional Types**: Express typings using a ternary-like conditional syntax: `T extends U ? X : Y`. It evaluates if type `T` is assignable to type `U`. If so, the type resolves to `X`; otherwise, `Y`.
  - **The `infer` Keyword**: Declared inside the `extends` clause of a conditional type to dynamically introduce a type variable that TypeScript must automatically infer at compile time.
  - **Example (Writing a custom `ReturnType<T>` utility)**:
    ```typescript
    type CustomReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

    const getPortfolioValue = () => 500000;
    type ValueType = CustomReturnType<typeof getPortfolioValue>; // Resolves to 'number'!
    ```
  - **Explanation**: The conditional check evaluates if type `T` is assignable to a function signature. It uses `infer R` to capture the function's return type value, storing it in `R` to return it if the condition resolves.

---

#### Q2: Describe structural typing vs. nominal typing in TypeScript. How can we achieve nominal typing (type branding) to prevent logic errors?
- **Answer**:
  - **Structural Typing (TypeScript)**: TypeScript's type system is based on shapes. If two objects have identical properties and types, they are treated as the same type, regardless of their names:
    ```typescript
    interface Point2D { x: number; y: number; }
    interface Vector2D { x: number; y: number; }
    let pt: Point2D = { x: 1, y: 2 };
    let vec: Vector2D = pt; // Statically allowed!
    ```
  - **Nominal Typing (e.g. Java/Swift)**: Types are checked by name rather than structure. Even if Point2D and Vector2D have identical shapes, assignability is rejected.
  - **Type Branding (Nominal Simulation)**: To enforce nominal typing (e.g. preventing developers from passing raw, unchecked strings into functions that require secure cryptographic USD inputs), we attach a phantom unique property:
    ```typescript
    type USD = string & { readonly __brand: unique symbol };
    
    function validateUSD(amount: string): USD {
      return amount as USD; // Cast after validation
    }
    
    function processTransaction(value: USD) { ... }
    
    processTransaction("100"); // Compile error! Prevent plain strings.
    processTransaction(validateUSD("100")); // Statically approved!
    ```

---

#### Q3: Explain Covariance and Contravariance in TypeScript. How does TypeScript evaluate parameters vs. return types during function assignments?
- **Answer**:
  These properties describe type compatibility rules when dealing with hierarchies (e.g., assigning a subclass to a superclass container).
  - **Covariance (Preserves Direction)**:
    - Return types of functions are **covariant**.
    - If `Dog extends Animal`, then a function returning a `Dog` can be assigned to a variable expecting a function returning an `Animal` (`() => Dog` ➡️ `() => Animal`).
  - **Contravariance (Reverses Direction)**:
    - Parameter types of functions are **contravariant** under strict compile schemes (`strictFunctionTypes: true`).
    - If `Dog extends Animal`, a function that processes an `Animal` can be assigned to a variable expecting a function that processes a `Dog` (`(a: Animal) => void` ➡️ (d: Dog) => void). Why? Because a function expecting a Dog only accesses Dog properties, and since an Animal handler handles any Animal, it is safe. Conversely, passing a Dog-only handler where an Animal is expected fails because it might get a Cat, triggering runtime failures.

---

#### Q4: Compare `unknown` vs. `any` vs. `never`. When and how should each be used to maintain strict type safety?
- **Answer**:
  - **`any` (Escape Hatch)**: Turns off all type checking. The compiler allows any property reads or calls on `any`. It is highly insecure and leads to runtime crashes.
  - **`unknown` (Type-Safe `any`)**: Represents any value, but TypeScript blocks all property reads or method invocations on `unknown` until you perform explicit type narrowing (using `typeof`, `instanceof`, or custom type guards).
    - *Best Use*: Deserializing API JSON responses or reading dynamic inputs before validating their structure.
  - **`never` (Impossible State)**: Represents values that should never occur.
    - *Best Use*: Exhaustiveness checks inside switch blocks. If a developer appends a new state to a union type but fails to add a corresponding case block, the compiler throws a type-error during compilation:
      ```typescript
      type Action = 'INIT' | 'SUCCESS' | 'FAIL';
      function handle(action: Action) {
        switch(action) {
          case 'INIT': return;
          case 'SUCCESS': return;
          case 'FAIL': return;
          default:
            const _exhaustiveCheck: never = action; // Fails compile if Action receives new options!
            return _exhaustiveCheck;
        }
      }
      ```

---

#### Q5: How do TypeScript compiler flags like `incremental`, `composite`, and project references work to optimize compile-time performance in massive enterprise monorepos?
- **Answer**:
  For large projects (100,000+ lines), compiling the entire workspace on every commit creates bottlenecks.
  - **`incremental: true`**: Tells TypeScript to save build info metadata (as `.tsbuildinfo` files) from the last compilation. During subsequent compiles, TS reads this metadata and compiles only the files modified since the last check, reducing build times by 70%.
  - **`composite: true` / Project References**:
    - Divides a massive project into smaller, independent sub-projects (e.g. `packages/core`, `packages/ui-kit`).
    - Each sub-project has its own `tsconfig.json` specifying `"composite": true`.
    - Parent apps link these projects using the `"references"` property.
    - When building, TypeScript compiles only modified packages and outputs compiled definitions (`.d.ts`), preventing rebuilding of unaffected modules in the monorepos.

---
