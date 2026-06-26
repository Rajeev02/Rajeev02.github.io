> 🎯 **Topic:** 4.3 Program 3: Advanced Conditional Types & Mapped Type Parser
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## 4.3 Program 3: Advanced Conditional Types & Mapped Type Parser
*⏱️ 1 min read*

### Question
Write two advanced TypeScript type-level programs:
1. A recursive mapped conditional type **`DeepNullable<T>`** that maps all properties of an object (and any nested child objects, arrays, or values) to accept `null` or `undefined`.
2. A template literal mapped type **`DynamicEventPayloadMap<T>`** that parses object keys. For any property matching prefix `'on[Name]'` representing a callback event (like `'onSelect'`), strip the prefix and map the output to a parameter object payload representation (e.g., transforming key `'onSelect'` with callback `(id: string) => void` into property `'select'` containing `{ payload: string }`).

### Code
```typescript
// 1. Recursive DeepNullable Mapped Type
export type DeepNullable<T> = {
  [K in keyof T]: T[K] extends Function
    ? T[K] // Retain functions untouched
    : T[K] extends Array<infer U>
    ? Array<DeepNullable<U>> | null | undefined // Handle arrays recursively
    : T[K] extends object
    ? DeepNullable<T[K]> | null | undefined // Handle nested objects recursively
    : T[K] | null | undefined; // Handle primitives
};

// 2. Template Literal Event Parser Mapped Type
type ExtractPayload<T> = T extends (arg: infer P) => void ? { payload: P } : { payload: never };

export type DynamicEventPayloadMap<T> = {
  [K in keyof T as K extends `on${infer EventName}` 
    ? Uncapitalize<EventName> 
    : never]: ExtractPayload<T[K]>;
};

// --- Static Verification Blocks ---
interface UserProfile {
  id: string;
  details: {
    name: string;
    roles: string[];
  };
  updateStatus: () => void;
}

// Resulting shape contains nullable nested elements
type TestNullable = DeepNullable<UserProfile>;
/* 
TestNullable resolves to:
{
  id: string | null | undefined;
  details: {
    name: string | null | undefined;
    roles: Array<string | null | undefined> | null | undefined;
  } | null | undefined;
  updateStatus: () => void;
}
*/

interface FormController {
  onSelect: (id: string) => void;
  onRefresh: (timestamp: number) => void;
  onSubmit: (payload: { name: string }) => void;
  ignoredRawField: string;
}

type EventPayloads = DynamicEventPayloadMap<FormController>;
/*
EventPayloads resolves to:
{
  select: { payload: string };
  refresh: { payload: number };
  submit: { payload: { name: string } };
}
*/
```

### Complexity & Explanation
- **Time Complexity**: Evaluated entirely during compile time. Zero runtime overhead.
- **Space Complexity**: Zero runtime allocations.
- **Explanation**: This program leverages TypeScript's compiler algebra. `DeepNullable` uses recursion combined with conditional evaluations (`infer U` in arrays) to transform nested values. `DynamicEventPayloadMap` uses template literal type mapping (`on${infer EventName}`) to transform strings and extract parameters from function signatures using type inference.

---

---
