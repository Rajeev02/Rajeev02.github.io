# Volume 3 – Set 7 – Advanced React Concepts

## Question 1 — Complex State with `useReducer`

### Difficulty
Medium

### Concepts Being Tested
- `useReducer` vs `useState`
- State Transitions
- Complex Object Mutations

---

### 1. Interview Question
"You have a `<CheckoutForm />` component. Over time, it has grown to have 12 different `useState` hooks (`setName`, `setEmail`, `setLoading`, `setError`, `setSuccess`, etc.). Updating one field often requires updating three others. How do you refactor this to prevent impossible states and reduce the number of re-renders?"

---

### 2. What the Interviewer is Evaluating
Testing if you know when `useState` becomes an anti-pattern and how to transition to `useReducer` to manage complex, interconnected state logic.

---

### 3. Ideal Answer
Having 12 independent `useState` hooks creates a high risk of **stale state** and **impossible UI states** (like being in a "Success" state but still showing an "Error" message). Furthermore, calling 3 different `setState` functions sequentially used to trigger multiple re-renders (though React 18 batches them).

I would refactor this by using the **`useReducer`** hook. 
`useReducer` allows us to consolidate all 12 variables into a single state object. We define strict "Actions" (e.g., `START_SUBMIT`, `SUBMIT_SUCCESS`, `SUBMIT_FAIL`). The reducer function guarantees that if we transition to `SUBMIT_SUCCESS`, the `loading` boolean is set to `false`, and the `error` string is cleared *simultaneously* in a single atomic update.

---

### 4. Code Example
```typescript
type State = { name: string; loading: boolean; error: string | null; success: boolean };
type Action = 
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAIL'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SUBMIT_START':
      return { ...state, loading: true, error: null, success: false };
    case 'SUBMIT_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'SUBMIT_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const Checkout = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '', loading: false, error: null, success: false
  });

  const handleSubmit = async () => {
    dispatch({ type: 'SUBMIT_START' });
    try {
      await api.submit(state.name);
      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      dispatch({ type: 'SUBMIT_FAIL', payload: err.message });
    }
  };
  
  return <UI state={state} />;
};
```

---

### 5. Production Scenario
- **Root Cause:** A complex search filter component in an e-commerce app used 8 different `useState` calls (category, price range, rating, etc.). When a user clicked "Clear Filters", the developer fired all 8 `setStates`.
- **Investigation:** On older versions of React Native, firing 8 state updates sequentially caused noticeable UI stuttering. Also, race conditions occasionally caused the price range to clear but the category to remain selected.
- **Solution:** Consolidated into a single `useReducer` with a `CLEAR_ALL` action, updating everything in one pass.
- **Lessons Learned:** When state variables depend on each other, they belong in a reducer.

---

### 6. Alternative Solutions & Trade-offs
- **Zustand / Redux**
  - *Advantages:* Great for global state.
  - *Disadvantages:* Overkill for state that only belongs to one specific form/screen.
- **`useReducer` (Current)**
  - *Advantages:* Local, highly predictable, perfectly typed.
  - *Disadvantages:* Requires boilerplate (Action types, switch statements).

---

### 7. Common Mistakes
- **Mutating state in the reducer:** `state.loading = true; return state;`. This breaks React's immutability rule, preventing re-renders.
- **Putting side effects (API calls) in the reducer:** Reducers MUST be pure functions. API calls happen in the component, and the *result* is dispatched to the reducer.

---

### 8. Follow-up Questions
1. Why must a reducer be a "pure function"?
2. What is the third argument of `useReducer` used for?
3. How does React 18's Automatic Batching change the argument against multiple `useState` calls?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will mention **State Machines**. They will explain that `useReducer` is effectively a lightweight state machine. They will also address React 18: "While React 18 now automatically batches all state updates (even in async timeouts), `useReducer` is still architecturally superior for forms because it moves the business logic (how state transitions) out of the component rendering logic, making it 100% unit-testable without needing React Testing Library."

---

### 10. Interview Tips
Say "Atomic Updates" and "Predictable State Transitions." 

***

## Question 2 — `useImperativeHandle` and `forwardRef`

### Difficulty
Medium

### Concepts Being Tested
- React Refs
- Component Encapsulation
- Parent-Child Communication

---

### 1. Interview Question
"You have a custom `<BottomSheet />` component used across your app. From the parent screen, you need to trigger the bottom sheet to open or close, but you don't want to pass a boolean `isOpen` prop because animating the sheet down requires a complex native gesture calculation. How do you expose a `.open()` and `.close()` method directly to the parent component?"

---

### 2. What the Interviewer is Evaluating
Evaluating if you understand how to break React's standard top-down data flow when necessary (imperative programming in a declarative framework).

---

### 3. Ideal Answer
Normally, React components communicate via props (Declarative). But for UI elements like Bottom Sheets, Modals, or Video Players, we often need imperative commands.

I would use **`React.forwardRef`** combined with **`useImperativeHandle`**. 
1. The child component (`BottomSheet`) is wrapped in `forwardRef`.
2. Inside the child, we use `useImperativeHandle(ref, () => ({ open, close }))`.
3. The parent creates a `useRef`, passes it to the child, and can now call `bottomSheetRef.current.open()` imperatively.

---

### 4. Code Example
```typescript
import React, { useImperativeHandle, forwardRef, useRef } from 'react';
import { View } from 'react-native';

// 1. Define the imperative methods
export interface BottomSheetRef {
  open: () => void;
  close: () => void;
}

// 2. Wrap child in forwardRef
export const BottomSheet = forwardRef<BottomSheetRef, {}>((props, ref) => {
  
  // 3. Expose methods to the parent
  useImperativeHandle(ref, () => ({
    open: () => {
      // Complex animation logic here
      console.log('Animating open...');
    },
    close: () => console.log('Animating close...')
  }));

  return <View style={{ height: 200 }} />;
});

// Parent Usage
export const Screen = () => {
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <View>
      <Button title="Open Sheet" onPress={() => sheetRef.current?.open()} />
      <BottomSheet ref={sheetRef} />
    </View>
  );
};
```

---

### 5. Production Scenario
- **Root Cause:** A developer controlled a video player's Play/Pause state via a boolean prop. 
- **Investigation:** When the user pressed "Play", the parent updated state, which re-rendered the parent, which re-rendered the Video player. This slight React render delay caused audio sync issues.
- **Solution:** Refactored the Video Player to expose `.play()` and `.pause()` via `useImperativeHandle`. The parent called these directly, bypassing the React render cycle entirely for instant playback.
- **Lessons Learned:** Heavy media/animation components benefit from imperative APIs.

---

### 6. Alternative Solutions & Trade-offs
- **Boolean Props (`isOpen`)**
  - *Advantages:* Strictly declarative, easy to understand.
  - *Disadvantages:* Hard to synchronize complex exit animations (e.g., waiting for the sheet to slide down before unmounting).
- **Imperative Handle (Current)**
  - *Advantages:* Perfect for animations, focus management (inputs), and media.
  - *Disadvantages:* Breaks the React paradigm. Harder to track state globally.

---

### 7. Common Mistakes
- **Overusing it:** Using `forwardRef` to get data out of a child (like form values) instead of just passing an `onChange` callback prop. Imperative handles should be rare.
- **Not typing the Ref properly:** In TypeScript, if you don't define the `BottomSheetRef` interface, `.current` will be typed as `any`.

---

### 8. Follow-up Questions
1. Why does React require `forwardRef` instead of just passing a prop named `ref`?
2. How do you focus a `TextInput` on mount?
3. What is the difference between `useRef` and `createRef`?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will warn against abuse. "While `useImperativeHandle` is powerful, I strictly limit its use in our codebase to three things: Focus management, Animations (like Bottom Sheets), and wrapping 3rd-party Native SDKs (like Maps or Video). If a junior developer tries to use it for data flow, I flag it in code review, because that breaks React's core philosophy."

---

### 10. Interview Tips
State clearly that this is an "escape hatch" from React's declarative model.

***

## Question 3 — React 18 Suspense and Error Boundaries

### Difficulty
Hard

### Concepts Being Tested
- Declarative Error Handling
- Suspense Architecture
- React Component Lifecycle

---

### 1. Interview Question
"Currently, your app handles API loading and errors by littering `if (loading) return <Spinner />` and `if (error) return <Error />` in every single component. How can you leverage React 18's architectural features to completely remove this boilerplate from your components?"

---

### 2. What the Interviewer is Evaluating
The interviewer wants to see if you understand modern React paradigms. Fetching data in `useEffect` is considered outdated. Modern apps use Suspense and Error Boundaries.

---

### 3. Ideal Answer
I would remove the local state (`isLoading`, `error`) from the components entirely. 
Instead, I would use a library like **React Query** (or SWR) that integrates with React Suspense. 

1. **Suspense:** I would wrap the parent component in `<Suspense fallback={<Spinner />}>`. When the child component initiates the API fetch, it "suspends" rendering. React automatically catches this and displays the nearest Suspense fallback.
2. **Error Boundaries:** I would wrap the Suspense boundary in a `<ErrorBoundary fallback={<ErrorScreen />}>`. If the API fails, it throws an error that bubbles up to the boundary, which catches it and displays the fallback UI.

This results in perfectly clean child components that just assume the data is always available.

---

### 4. Code Example
```tsx
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useQuery } from '@tanstack/react-query';

// 1. Clean Component (No loading/error logic!)
const UserProfile = () => {
  // suspense: true tells React Query to throw promises
  const { data } = useQuery({ queryKey: ['user'], queryFn: fetchUser, suspense: true });
  
  // We can safely assume `data` is here
  return <Text>Welcome, {data.name}!</Text>; 
};

// 2. Declarative Parent Wrapper
export const ProfileScreen = () => {
  return (
    <ErrorBoundary fallback={<Text>Something went wrong!</Text>}>
      <Suspense fallback={<Spinner />}>
        <UserProfile />
      </Suspense>
    </ErrorBoundary>
  );
};
```

---

### 5. Production Scenario
- **Root Cause:** A complex dashboard had 5 different widgets fetching data. Because each handled its own loading state, the screen looked terrible as 5 different spinners popped in and out at different times.
- **Investigation:** We wanted a single global spinner until *all* widgets loaded.
- **Solution:** We removed local loading states and wrapped all 5 widgets in a single `<Suspense>` boundary. React automatically waited for all 5 suspended components to resolve before dropping the single global spinner.
- **Lessons Learned:** Suspense coordinates loading states across multiple components effortlessly.

---

### 6. Alternative Solutions & Trade-offs
- **Local `if (loading)` (Old Way)**
  - *Advantages:* Familiar to old React developers.
  - *Disadvantages:* Creates waterfall rendering. Hard to coordinate multiple loaders.
- **Suspense (Current Way)**
  - *Advantages:* Incredibly clean component logic, orchestrates complex UI states.
  - *Disadvantages:* Requires a data-fetching library that supports it (React Query/Relay). You cannot just use a standard `fetch` easily with Suspense.

---

### 7. Common Mistakes
- **Trying to use `useEffect` with Suspense:** Suspense requires the fetching mechanism to literally `throw` a Promise to React during the render phase. A standard `useEffect` + `fetch` will not trigger Suspense.
- **Not using an Error Boundary:** If a suspended component throws a rejection and there is no Error Boundary, the entire app crashes to a white screen.

---

### 8. Follow-up Questions
1. How do you implement an Error Boundary? (Hint: `componentDidCatch`).
2. Why can't you write an Error Boundary as a Functional Component?
3. How does Suspense prevent "Waterfall Fetching"?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will mention that Error Boundaries are the only remaining React component that **must be written as a Class Component** (specifically using `static getDerivedStateFromError`), which is why we rely on libraries like `react-error-boundary`. They will also mention that Suspense is the foundation for React Server Components (RSC) and streaming HTML in the web ecosystem (Next.js), making it a mandatory concept to master for the future of React.

---

### 10. Interview Tips
State clearly: "Suspense allows components to suspend rendering while waiting for asynchronous operations."

***

## Question 4 — Headless Component Patterns

### Difficulty
Hard

### Concepts Being Tested
- Advanced Composition
- Render Props / Custom Hooks
- UI vs Logic Separation

---

### 1. Interview Question
"You are tasked with building an `Accordion` (expand/collapse) system that will be used by 5 different teams. Team A wants it to look like a standard list. Team B wants it to look like a grid of cards. How do you architect this component so they share the exact same expand/collapse logic but have 100% control over the UI?"

---

### 2. What the Interviewer is Evaluating
Testing Design System knowledge. They want to see if you can separate business logic from UI using advanced React patterns (Render Props or Headless Hooks).

---

### 3. Ideal Answer
I would use the **Headless Component Pattern** (specifically via Custom Hooks).

Instead of returning UI (JSX), I will write a custom hook `useAccordion` that manages the state (which item is open, animations, accessibility traits). The hook returns the state variables and getter functions to attach to the UI elements.

Team A and Team B can then call this hook in their own components. They build whatever UI they want (List or Grid) and simply spread the props returned by the hook onto their native components. The logic is centralized, but the UI is completely decentralized.

---

### 4. Code Example
```typescript
// 1. The Headless Hook (No JSX!)
const useAccordion = (initialId?: string) => {
  const [openId, setOpenId] = useState<string | null>(initialId || null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  // Return state and prop-getters
  return {
    openId,
    getButtonProps: (id: string) => ({
      onPress: () => toggle(id),
      accessibilityState: { expanded: openId === id },
    }),
    getContentProps: (id: string) => ({
      style: { display: openId === id ? 'flex' : 'none' }
    })
  };
};

// 2. Team A's Custom UI
export const TeamACardAccordion = () => {
  const { getButtonProps, getContentProps } = useAccordion();

  return (
    <View>
      <TouchableOpacity {...getButtonProps('card1')}>
        <Text>Card Title</Text>
      </TouchableOpacity>
      <View {...getContentProps('card1')}>
        <Text>Card Hidden Content</Text>
      </View>
    </View>
  );
};
```

---

### 5. Production Scenario
- **Root Cause:** A Design System provided a `<Dropdown>` component. Over two years, teams requested so many UI tweaks that the component ended up with 45 different props (`showIcon`, `gridMode`, `titleColor`, etc.), making it a massive, unmaintainable mess.
- **Investigation:** The component violated the Open/Closed Principle.
- **Solution:** Deprecated the UI component and released a `useDropdown` headless hook. Teams were thrilled because they could finally build the exact UI they wanted without waiting for the Design System team to add a new prop.
- **Lessons Learned:** Library components should provide logic, not dictate UI.

---

### 6. Alternative Solutions & Trade-offs
- **Render Props (`<Accordion renderItem={(props) => ...} />`)**
  - *Advantages:* Similar capability.
  - *Disadvantages:* Leads to "Wrapper Hell" (deeply nested JSX).
- **Headless Hooks (Current)**
  - *Advantages:* Flattens the JSX, incredibly clean to read.
  - *Disadvantages:* Developers have to remember to spread the props correctly.

---

### 7. Common Mistakes
- **Prop Overload:** Trying to solve flexibility by adding a new boolean prop for every UI request.
- **Forgetting Accessibility:** If you extract logic, you MUST include accessibility props (like `aria-expanded` / `accessibilityState`) in the returned prop getters, otherwise teams will forget them.

---

### 8. Follow-up Questions
1. What is the "Inversion of Control" principle in React?
2. What are the downsides of the Render Prop pattern?
3. Name a popular React library that uses the Headless pattern. (Hint: React Hook Form, TanStack Table).

---

### 9. How a Senior/Lead Engineer Answers
A Principal engineer will mention libraries like **TanStack Table** or **Downshift**, which pioneered this pattern. They will explain that this is the ultimate implementation of "Inversion of Control" in React. By providing logic and yielding the rendering back to the consumer, we create zero-dependency logic packages that can even be shared between React DOM (Web) and React Native!

---

### 10. Interview Tips
Use the term **"Inversion of Control"**. It is a major computer science concept that proves you understand software architecture, not just React syntax.

***

## Question 5 — The Reconciler and Fiber Tree (Expert Level)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- React Internal Architecture
- Reconciliation Algorithm
- Fiber Nodes

---

### 1. Interview Question
"When a state updates in React Native, explain the step-by-step internal process of how React decides what to update on the screen. Include the concepts of the Virtual DOM, Reconciliation, and the Fiber Tree."

---

### 2. What the Interviewer is Evaluating
This is the ultimate test of React mastery. If you can explain how React works internally, you can debug almost any performance issue at scale.

---

### 3. Ideal Answer
When a state updates, the following happens:
1. **Render Phase (Pure):** React calls your component functions to generate a new Virtual DOM tree.
2. **Reconciliation:** React compares this new tree against the current tree using its Diffing Algorithm. It uses the `key` prop to quickly identify moved or deleted lists.
3. **The Fiber Tree:** React doesn't just do this in one go. It uses the Fiber Architecture, which represents components as a Linked List of work units. This allows React to pause the diffing process, check if there's high-priority user input, and resume diffing later (Concurrent Mode).
4. **Commit Phase (Mutative):** Once the diffing is complete, React generates a list of "Effects" (what actually changed). It hands this list to the **Renderer**.
5. **Renderer:** In React Native, the Reconciler (React Core) hands these instructions to the Native UI Renderer (Fabric/Bridge), which actually draws the Android/iOS views on the screen.

---

### 4. Code Example
"No code required. This is an internal architectural concept."

---

### 5. Production Scenario
- **Root Cause:** A developer was building a custom animation library and noticed that rapid state updates were causing massive battery drain, even though the UI looked fine.
- **Investigation:** Because they didn't understand the Commit Phase, they were triggering React state updates for 60fps animations. This forced the Reconciler to diff the entire Fiber tree 60 times a second.
- **Solution:** Switched to Reanimated, which bypasses the Reconciler entirely and mutates the Native Views directly on the UI thread.
- **Lessons Learned:** React's Reconciler is fast, but it is not built for 60fps continuous mutations.

---

### 6. Alternative Solutions & Trade-offs
N/A - This is a conceptual explanation of React itself.

---

### 7. Common Mistakes
- **Confusing React with React Native:** `React` is just the Reconciler (it does the math). `React Native` (or `ReactDOM` on the web) is the Renderer (it draws the pixels).
- **Thinking Virtual DOM is faster than real DOM:** The Virtual DOM is technically slower because it adds an extra layer of math. Its benefit is *developer experience* and batching updates, not raw speed.

---

### 8. Follow-up Questions
1. Why is the `key` prop so critical for the Reconciler?
2. What is a "Work in Progress" (WIP) tree?
3. How does Fabric change the Commit phase in React Native?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will dive deep into **Fabric (The New Architecture)**. They will explain that in the old architecture, the Commit Phase generated JSON messages that were serialized over the bridge. With Fabric, the React Reconciler is written in C++. It can synchronously invoke C++ methods on Native Views (Shadow Tree), ensuring that the JS and Native UI are perfectly in sync in the exact same frame, completely eliminating visual tearing.

---

### 10. Interview Tips
Clearly separate the **Render Phase** (which can be interrupted) from the **Commit Phase** (which cannot be interrupted).
