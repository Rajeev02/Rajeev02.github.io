# Volume 2 – Set 2 – TypeScript Fundamentals

## Question 1 — Interfaces vs. Type Aliases in React Native

### Difficulty
Easy

### Concepts Being Tested
- `interface` vs `type`
- Object Typing
- Extensibility

---

### 1. Interview Question
"In our React Native app, we define component props. Should we use an `interface` or a `type` alias for defining these props? What is the practical difference between the two?"

---

### 2. What the Interviewer is Evaluating
The interviewer is checking if you know the subtle differences between TypeScript's two main ways of defining shapes, and if you understand how TypeScript's compiler handles them under the hood.

---

### 3. Ideal Answer
For React component props, you can use either, but `type` is generally preferred for its flexibility (unions, intersections), while `interface` is preferred for public APIs because of **declaration merging**.

- **`interface`**: Can only describe shapes of objects (and functions). It supports declaration merging (if you declare the same interface twice, TS merges them).
- **`type`**: Can describe objects, primitives, unions (e.g., `type Status = 'loading' | 'success'`), and tuples. It cannot be re-opened for merging.

In a large app, sticking to `type` for internal components prevents accidental merging bugs.

---

### 4. Code Example
```typescript
// Better for Component Props (Unions)
type ButtonVariant = 'primary' | 'secondary' | 'danger';

type ButtonProps = {
  title: string;
  variant: ButtonVariant; // Interfaces cannot do this directly
  onPress: () => void;
};

export const CustomButton = ({ title, variant, onPress }: ButtonProps) => { ... }
```

---

### 5. Production Scenario
- **Root Cause:** A library we imported exported an `interface User`. A junior developer accidentally declared `interface User` in their local file. 
- **Investigation:** TypeScript merged the two interfaces, causing bizarre type errors where local objects were expected to have properties from the third-party library.
- **Solution:** Switched internal component typings to `type` aliases to strictly prevent declaration merging.
- **Lessons Learned:** Interfaces are open for extension; types are closed. Use them accordingly.

---

### 6. Alternative Solutions & Trade-offs
- **Always using `interface`**
  - *Advantages:* Slightly better error messages in TS, historically slightly faster compiler performance.
  - *Disadvantages:* Cannot easily express union types or complex conditional types.
- **Always using `type` (Current recommendation for React apps)**
  - *Advantages:* Highly flexible, strict, prevents accidental merging.
  - *Disadvantages:* Can lead to overly complex, unreadable intersection types if abused.

---

### 7. Common Mistakes
- **Using `interface` to try and define a union.** (It results in a syntax error).
- **Inconsistently mixing them:** Defining `type` in one file and `interface` in another for the same conceptual layers, confusing the team.

---

### 8. Follow-up Questions
1. How do you extend an interface? How do you extend a type?
2. What happens if you try to `extend` a type that is a union?
3. What is an index signature?

---

### 9. How a Senior/Lead Engineer Answers
A Lead Engineer will mention that historically, `interface` had a performance advantage in the TS compiler due to how it cached relationships, but since TS 4.x, the performance difference is negligible for most codebases. They will recommend setting a strict ESLint rule (`@typescript-eslint/consistent-type-definitions`) to enforce one or the other across the entire mono-repo to ensure consistency.

---

### 10. Interview Tips
Be definitive. Say: "I prefer `type` for React components because of unions, and `interface` for public SDKs." It shows you have an opinion based on experience.

***

## Question 2 — Handling API Responses with `unknown` vs `any`

### Difficulty
Medium

### Concepts Being Tested
- Type Narrowing
- `any` vs `unknown`
- API Data Validation

---

### 1. Interview Question
"We are fetching user settings from an unreliable legacy API. The developer before you typed the response as `any`. Over time, this caused crashes because expected fields were missing. How do you fix this typing so the app doesn't crash, without manually rewriting the entire API backend?"

---

### 2. What the Interviewer is Evaluating
Checking if the candidate understands the danger of `any`, how to properly use `unknown`, and how to implement runtime type guards (Type Narrowing) in TypeScript.

---

### 3. Ideal Answer
The problem with `any` is that it turns off TypeScript entirely. You can access properties that don't exist, leading to runtime crashes (e.g., `undefined is not a function`).

I would change the API response type to `unknown`. `unknown` forces you to perform **Type Narrowing** before you can access any properties on it. I would then write a custom Type Guard function or use a schema validation library like Zod to parse and validate the data at runtime before passing it to the UI.

---

### 4. Code Example
```typescript
// The Type Guard
interface UserSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
}

// Runtime validation
function isUserSettings(data: unknown): data is UserSettings {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  
  return (
    (obj.theme === 'light' || obj.theme === 'dark') &&
    typeof obj.notifications === 'boolean'
  );
}

const fetchSettings = async () => {
  const response = await fetch('/api/settings');
  const data: unknown = await response.json(); // Safely type as unknown

  if (isUserSettings(data)) {
    // TS now knows `data` is exactly `UserSettings`
    applyTheme(data.theme); 
  } else {
    // Handle the corrupted data gracefully
    applyTheme('light'); 
  }
};
```

---

### 5. Production Scenario
- **Root Cause:** A backend team silently removed the `avatarUrl` field from an API payload.
- **Investigation:** Because the React Native app typed the `fetch` response as `any`, TS didn't complain. The app crashed when `Image source={{ uri: data.avatarUrl }}` received `undefined`.
- **Solution:** Replaced all API `any` types with `unknown` and introduced Zod schemas to parse and validate responses at the network boundary.
- **Lessons Learned:** TypeScript is useless at runtime. You must validate API boundaries.

---

### 6. Alternative Solutions & Trade-offs
- **Custom Type Guards (Current)**
  - *Advantages:* Zero dependencies, lightweight.
  - *Disadvantages:* Hard to maintain for massive API objects.
- **Zod / Yup Schema Validation**
  - *Advantages:* Highly declarative, automatically infers TS types, handles complex nested validation.
  - *Disadvantages:* Adds bundle size, slight runtime overhead.

---

### 7. Common Mistakes
- **Using `as Type` (Type Assertions):** Doing `const data = response as UserSettings`. This is a lie to the compiler; if the runtime data is wrong, the app will still crash.
- **Ignoring `catch (error)` typing:** In a `catch (error)`, `error` is inherently `unknown` in modern TS, not `Error`.

---

### 8. Follow-up Questions
1. What is the difference between `unknown` and `never`?
2. How do you narrow an `unknown` error in a try/catch block?
3. How does Zod infer TypeScript types?

---

### 9. How a Senior/Lead Engineer Answers
A Lead Engineer will stress that TypeScript is a build-time tool. At runtime, the types are erased. They will architect an **Anti-Corruption Layer (ACL)**. All API requests must pass through this layer (usually Zod schemas) before entering the Redux store or React Query cache. If the backend breaks the contract, the ACL catches it, logs it to Sentry immediately, and returns safe fallback data to the app, preventing a hard crash.

---

### 10. Interview Tips
Whenever `any` is mentioned in an interview, explicitly state: "`any` disables TypeScript." It proves you care about type safety.

***

## Question 3 — Discriminated Unions for State Management

### Difficulty
Medium

### Concepts Being Tested
- Discriminated (Tagged) Unions
- Exhaustive Type Checking
- State Machines

---

### 1. Interview Question
"You are building a complex payment screen. Your state looks like this: `{ isLoading: boolean, data: PaymentInfo | null, error: string | null }`. This leads to impossible states (like `isLoading: true` but also having an `error`). How would you restructure this using TypeScript to guarantee impossible states cannot exist?"

---

### 2. What the Interviewer is Evaluating
Testing if the candidate understands State Machines and Discriminated Unions. This is crucial for avoiding UI bugs where a spinner and an error message show at the same time.

---

### 3. Ideal Answer
The current state shape allows for 8 different combinations (`2 * 2 * 2`), many of which are invalid. To fix this, I would use a **Discriminated Union** (also called a Tagged Union). 

We create a single `type` property (the discriminator) and map it to the strictly allowed state shapes. When we check the `type` in a `switch` statement, TypeScript automatically narrows the rest of the object.

---

### 4. Code Example
```typescript
// 1. Define the exact valid states
type PaymentState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: PaymentInfo }
  | { status: 'error'; errorMsg: string };

const renderPaymentUI = (state: PaymentState) => {
  // 2. TypeScript forces you to handle the states correctly
  switch (state.status) {
    case 'idle':
      return <Text>Please enter card details.</Text>;
    case 'loading':
      return <Spinner />;
    case 'success':
      // TS knows `data` exists here, but nowhere else
      return <Text>Success! Paid: {state.data.amount}</Text>;
    case 'error':
      // TS knows `errorMsg` exists here
      return <Text>Error: {state.errorMsg}</Text>;
    default:
      // Exhaustiveness check
      const _exhaustiveCheck: never = state;
      return _exhaustiveCheck;
  }
};
```

---

### 5. Production Scenario
- **Root Cause:** A delivery app had a state object with `isSearching`, `driverFound`, and `noDriversAvailable` all as booleans. 
- **Investigation:** Due to a race condition, both `driverFound` and `noDriversAvailable` were set to `true`. The UI rendered a confusing screen telling the user a driver was on the way, while simultaneously showing a "No drivers" error modal.
- **Solution:** Refactored the boolean flags into a single Discriminated Union (`type Status = 'searching' | 'found' | 'unavailable'`).
- **Lessons Learned:** Avoid multiple boolean flags for mutually exclusive states.

---

### 6. Alternative Solutions & Trade-offs
- **XState (State Machine Library)**
  - *Advantages:* Incredibly powerful for complex, multi-step flows (like onboarding).
  - *Disadvantages:* Very steep learning curve, large bundle size.
- **Discriminated Unions (Current)**
  - *Advantages:* Built into TS, zero runtime cost, very readable.
  - *Disadvantages:* Requires manual switch statements.

---

### 7. Common Mistakes
- **Optional Properties everywhere:** Defining `{ data?: Data, error?: string }` forces the UI to constantly check `if (data)` everywhere, leading to defensive, messy code.
- **Forgetting the exhaustive check:** Not using the `never` type in the `default` case means if someone adds a new state (e.g., `'refunded'`), TS won't warn you that you forgot to render it.

---

### 8. Follow-up Questions
1. Explain how the `never` type is used for exhaustive checking.
2. How does React Query use this exact pattern internally?
3. Can you use Discriminated Unions with Redux reducers?

---

### 9. How a Senior/Lead Engineer Answers
A senior developer will mention that this pattern is the mathematical concept of "Algebraic Data Types." They will point out that libraries like React Query already use this under the hood (e.g., `status: 'pending' | 'error' | 'success'`). They will advocate for stripping out scattered `useState` booleans across the app and unifying them into strict discriminated state machines to drastically reduce QA bugs.

---

### 10. Interview Tips
Use the phrase "making impossible states impossible." Interviewers love this phrase; it shows architectural maturity.

***

## Question 4 — Generics in Reusable UI Components

### Difficulty
Hard

### Concepts Being Tested
- TypeScript Generics
- Reusable Component Architecture
- Inference

---

### 1. Interview Question
"You need to build a highly reusable `<Dropdown />` component. The dropdown could take an array of Users, an array of Products, or an array of simple strings. When a user selects an item, the `onSelect` callback must return the exact type of the object selected, with full autocomplete. How do you type this component?"

---

### 2. What the Interviewer is Evaluating
The interviewer is evaluating whether you can write flexible library-level TypeScript code using **Generics**, rather than hardcoding types or defaulting to `any`.

---

### 3. Ideal Answer
I would use a **Generic Component**. By defining a generic type parameter `<T>` on the component's props, TypeScript can infer the type based on the array passed to the `data` prop. The `onSelect` function will then automatically be typed to return an item of type `T`.

---

### 4. Code Example
```typescript
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// 1. Define Generic Props
interface DropdownProps<T> {
  data: T[];
  // Extract a string to show in the UI from the generic object
  keyExtractor: (item: T) => string;
  labelExtractor: (item: T) => string;
  onSelect: (item: T) => void;
}

// 2. Define the Generic Component
export const Dropdown = <T extends unknown>({
  data,
  keyExtractor,
  labelExtractor,
  onSelect,
}: DropdownProps<T>) => {
  return (
    <View>
      {data.map((item) => (
        <TouchableOpacity key={keyExtractor(item)} onPress={() => onSelect(item)}>
          <Text>{labelExtractor(item)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// 3. Usage (TS automatically infers T as `User`)
type User = { id: string; name: string };
const users: User[] = [{ id: '1', name: 'Rajeev' }];

<Dropdown 
  data={users} 
  keyExtractor={(u) => u.id} 
  labelExtractor={(u) => u.name}
  onSelect={(u) => console.log(u.name)} // TS knows `u` is `User`!
/>
```

---

### 5. Production Scenario
- **Root Cause:** A design system team built a generic `List` component using `any` for the data array to make it "flexible".
- **Investigation:** Product teams using the component lost all type safety. Refactoring data models across the app caused silent bugs because the `onSelect` callbacks weren't catching the changes.
- **Solution:** Rewrote the design system components using Generic constraints (`<T extends Record<string, unknown>>`).
- **Lessons Learned:** "Flexible" should never mean "Type-unsafe".

---

### 6. Alternative Solutions & Trade-offs
- **Generic Components (Current)**
  - *Advantages:* Perfect type safety, great Developer Experience (DX).
  - *Disadvantages:* Syntax can look intimidating to juniors (`<T,>`).
- **Hardcoding union types** (e.g., `data: User[] | Product[]`)
  - *Advantages:* Easier to write initially.
  - *Disadvantages:* Not scalable. Every new data type requires modifying the core component.

---

### 7. Common Mistakes
- **Forgetting the trailing comma in `.tsx` files:** In TSX, writing `<T>` is interpreted as a JSX tag. You must write `<T,>` or `<T extends unknown>` to tell the compiler it's a generic.
- **Over-constraining the generic:** Requiring `T extends { id: string }` prevents the dropdown from being used with arrays of simple strings. Using extractor functions is better.

---

### 8. Follow-up Questions
1. Why do we need the comma in `<T,>` when writing generic arrow functions in `.tsx` files?
2. How do you forward a Ref in a generic React component?
3. What is the `Infer` keyword in TypeScript?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will go beyond the generic itself and talk about component API design. They will explain the "Inversion of Control" pattern—instead of hardcoding how to display the item, providing `keyExtractor` and `renderItem` (similar to FlatList) allows the parent to control the UI while the `<Dropdown />` solely manages the generic state and interactions.

---

### 10. Interview Tips
If asked to write this on a whiteboard or coderpad, explicitly mention the `.tsx` syntax quirk (`<T,>`). It shows deep, practical experience with React + TS.

***

## Question 5 — Utility Types and Mapped Types (Top-Tier Scale)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- Mapped Types
- `Omit` / `Pick` / `Partial`
- Advanced Type Transformation

---

### 1. Interview Question
"We have a massive heavily typed Redux store. We need to create an API update function that accepts *any* slice of the user profile state, but the `id` and `createdAt` fields must *never* be allowed in the update payload. Furthermore, all passed fields must be strictly optional. How do you create this highly constrained type dynamically without writing a new interface?"

---

### 2. What the Interviewer is Evaluating
Testing advanced TypeScript mastery. Top-tier companies use massive mono-repos where manually duplicating types leads to chaos. They want to see if you can dynamically transform types using Mapped and Utility types.

---

### 3. Ideal Answer
I would use a combination of TypeScript's built-in utility types: `Omit` and `Partial`.

1. First, we use `Omit<UserProfile, 'id' | 'createdAt'>` to strip the immutable fields from the base type.
2. Next, we wrap that in `Partial<...>` to make all remaining fields optional.

This guarantees that if the `UserProfile` type changes in the future, our update payload type automatically stays in sync, while strictly forbidding updates to `id` or `createdAt`.

---

### 4. Code Example
```typescript
interface UserProfile {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  preferences: {
    theme: string;
  };
}

// Advanced Dynamic Type
type UpdateUserPayload = Partial<Omit<UserProfile, 'id' | 'createdAt'>>;

// Usage
const updateAPI = (payload: UpdateUserPayload) => { ... }

// VALID
updateAPI({ name: 'Rajeev' }); 

// ERROR: Object literal may only specify known properties, and 'id' does not exist in type 'UpdateUserPayload'
updateAPI({ id: '123' }); 
```

---

### 5. Production Scenario
- **Root Cause:** In an internal dashboard at a mega-corp, a developer created an update form for User Settings. They duplicated the `UserSettings` interface into an `UpdateUserSettings` interface.
- **Investigation:** Months later, a new mandatory field was added to the database. The base interface was updated, but the duplicated update interface was forgotten. The API started rejecting all form submissions.
- **Solution:** Enforced strict rules against type duplication. All mutation payloads were refactored to use `Partial<Omit<T, K>>` mapped types, ensuring absolute synchronization with the source of truth.
- **Lessons Learned:** Single Source of Truth applies to Types just as much as it applies to State.

---

### 6. Alternative Solutions & Trade-offs
- **Utility Types (Current)**
  - *Advantages:* Dynamic, robust, prevents drifting types.
  - *Disadvantages:* Nested utility types (`Partial<Pick<Omit<...>>>`) can become unreadable.
- **Duplicating the Interface**
  - *Advantages:* Very readable.
  - *Disadvantages:* Highly prone to drifting and maintenance bugs.

---

### 7. Common Mistakes
- **Using `Exclude` instead of `Omit`:** `Exclude` is for Unions (e.g., `Exclude<'a' | 'b', 'a'>`), while `Omit` is for Object Keys. Confusing them is a classic mistake.
- **Not understanding deep partials:** `Partial` only makes the top-level keys optional. If you need nested keys (like `preferences.theme`) to be optional, you have to write a recursive `DeepPartial` mapped type.

---

### 8. Follow-up Questions
1. How would you write a custom `DeepPartial` type?
2. What is the difference between `Record<string, any>` and `{[key: string]: any}`?
3. How do `Required<T>` and `Readonly<T>` work under the hood?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will explain the internal mechanics of how these work. They will explain that `Omit` is actually constructed using `Pick` and `Exclude` under the hood (`type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>`). They will also address the limitation of `Partial` not being recursive, and might quickly sketch out a recursive mapped type (`type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;`) to prove extreme proficiency.

---

### 10. Interview Tips
If you can write a mapped type from memory during an interview, it practically guarantees a "Strong Hire" rating for TypeScript skills. Practice writing `Pick` and `Omit` from scratch.
