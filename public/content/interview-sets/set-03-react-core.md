# Volume 3 – Set 3 – React Core

## Question 1 — The Rules of Hooks & Internal Implementation

### Difficulty
Easy

### Concepts Being Tested
- Rules of Hooks
- React Render Cycle
- Linked Lists (Internal Hook Storage)

---

### 1. Interview Question
"React strictly enforces that Hooks cannot be called conditionally (e.g., inside an `if` statement) or inside a loop. Why does this rule exist? What happens under the hood in React if you violate this rule?"

---

### 2. What the Interviewer is Evaluating
The interviewer wants to see if the candidate understands React as a framework, rather than just memorizing syntax. They are looking for an explanation of how React internally maps state to components.

---

### 3. Ideal Answer
React relies on the **call order** of Hooks to associate internal state with the correct Hook. Under the hood, React stores the hooks for a component as a Linked List (an array-like structure). 

When a component renders, React iterates through this list. If you place a Hook inside an `if` statement that evaluates to false on the second render, React will skip that Hook. This throws off the index for every subsequent Hook, causing the wrong state to be mapped to the wrong variable, leading to catastrophic UI bugs and crashes.

---

### 4. Code Example
```typescript
// BAD: Violates Rules of Hooks
const UserProfile = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  if (isLoggedIn) {
    // If isLoggedIn becomes false, this hook is skipped!
    const [user, setUser] = useState(null); 
  }
  
  // React will now assign the `user` state to this `theme` variable!
  const [theme, setTheme] = useState('light'); 

  return <View />;
};
```

---

### 5. Production Scenario
- **Root Cause:** A developer tried to optimize an app by conditionally calling `useFetchData()` only if a specific feature flag was enabled.
- **Investigation:** When the feature flag toggled dynamically via Remote Config, the app crashed with the error: "Rendered fewer hooks than expected."
- **Solution:** Moved the condition *inside* the custom hook (e.g., `if (!flag) return`), keeping the Hook call itself unconditionally at the top level.
- **Lessons Learned:** Never try to conditionally mount state. Conditionally render components instead.

---

### 6. Alternative Solutions & Trade-offs
- **Conditional logic inside the Hook (Current)**
  - *Advantages:* Obeys rules, safe.
  - *Disadvantages:* The Hook still allocates memory and executes slightly, even if it returns early.
- **Extracting to a Child Component**
  - *Advantages:* Best practice. Only render `<ConditionalChild />` if the condition is true. The child can then unconditionally call its hooks.
  - *Disadvantages:* Requires slight component restructuring.

---

### 7. Common Mistakes
- **Putting Hooks inside `useEffect`:** Attempting to `useState` inside an effect callback.
- **Assuming ESLint will catch everything:** The `eslint-plugin-react-hooks` catches syntax mistakes, but ignoring its warnings often leads to these crashes in production.

---

### 8. Follow-up Questions
1. How does React know *which* component is currently rendering when a Hook is called? (Hint: global `currentDispatcher`).
2. Why is it safe to use early returns *after* all hooks have been called?
3. What is a Custom Hook structurally?

---

### 9. How a Senior/Lead Engineer Answers
A senior engineer will explain the internal data structure. They will state: "React hooks are implemented as a singly linked list attached to the Fiber node of the component." They will also mention that while the ESLint plugin prevents this structurally, the ultimate fix for conditional hook logic is to **split the component** so the hook belongs to a child that is conditionally rendered, naturally destroying the hook's state when unmounted.

---

### 10. Interview Tips
Mention the "Linked List" or "Array Index" analogy explicitly. It is the exact answer interviewers look for on this question.

***

## Question 2 — The `useCallback` / `useMemo` Optimization Trap

### Difficulty
Medium

### Concepts Being Tested
- Memoization
- Referential Equality
- Performance Bottlenecks

---

### 1. Interview Question
"A junior developer read that re-renders are bad, so they wrapped every single function in the component with `useCallback` and every variable with `useMemo`. Strangely, the app's performance actually got worse, and memory usage increased. Explain why this happened."

---

### 2. What the Interviewer is Evaluating
The interviewer is testing if you know that React optimizations have a cost. They want to ensure you don't blindly apply patterns without understanding memory allocation and JS engine mechanics.

---

### 3. Ideal Answer
Wrapping everything in `useCallback` and `useMemo` hurts performance for two reasons:
1. **Memory Overhead:** React has to store the previous values/functions in memory and retain the closures.
2. **CPU Overhead:** On every render, React must loop through the dependency array and perform an `Object.is()` comparison on every single item.

If a function is cheap to recreate (like a simple button `onPress`), the cost of comparing dependencies and allocating memory for `useCallback` is actually higher than simply letting the JavaScript Garbage Collector throw away the old function and create a new one.

`useCallback` is only useful to maintain referential equality when passing functions down to heavily memoized child components (`React.memo`) or as dependencies in a `useEffect`.

---

### 4. Code Example
```typescript
// BAD: Wasted optimization
const SimpleForm = () => {
  const [text, setText] = useState('');
  
  // The cost of dependency checking is higher than recreating this function!
  const handleChange = useCallback((val: string) => {
    setText(val);
  }, []);

  return <TextInput onChangeText={handleChange} />;
};

// GOOD: Valuable optimization
const ComplexList = () => {
  const [data, setData] = useState([]);
  
  // Passing to a React.memo'd massive FlatList item prevents hundreds of re-renders
  const handleDelete = useCallback((id: string) => {
    setData(prev => prev.filter(item => item.id !== id));
  }, []); // Note: use of functional update removes dependency on `data`

  return <FlatList data={data} renderItem={...} />;
};
```

---

### 5. Production Scenario
- **Root Cause:** A team memoized hundreds of `onPress` handlers in a large Settings screen, thinking it would speed up navigation.
- **Investigation:** Profiling showed high JS thread CPU usage during renders because React was performing deep dependency checks on arrays that were constantly changing anyway, breaking the memoization.
- **Solution:** Removed 90% of the `useCallback` wrappers. The render time dropped significantly.
- **Lessons Learned:** Premature optimization is the root of all evil. Only memoize when profiling proves a child component is needlessly re-rendering.

---

### 6. Alternative Solutions & Trade-offs
- **No Memoization (Default React Behavior)**
  - *Advantages:* Fast execution, low memory overhead.
  - *Disadvantages:* Causes child components to re-render if they rely on referential equality.
- **React Compiler (React 19 / Forget)**
  - *Advantages:* Automates memoization at build time, completely removing the need for `useMemo` / `useCallback` manually.

---

### 7. Common Mistakes
- **Putting complex objects in the dependency array:** This breaks memoization instantly because `[ { id: 1 } ] === [ { id: 1 } ]` is false in JS.
- **Forgetting dependencies:** Leaving a variable out of the array causes stale closures (bugs that are much worse than performance issues).

---

### 8. Follow-up Questions
1. How does `React.memo` differ from `useMemo`?
2. When should you actually use `useMemo`?
3. How can you avoid passing a changing dependency into `useCallback`? (Hint: Refs or functional state updates).

---

### 9. How a Senior/Lead Engineer Answers
A Lead Engineer will explain that in React Native, the cost of re-rendering a lightweight JS component is usually negligible. The real performance hit happens when re-renders cross the bridge to the Native UI thread. They will explicitly state: "`useCallback` does not prevent the current component from re-rendering; it only prevents *child* components wrapped in `React.memo` from re-rendering."

---

### 10. Interview Tips
Quote this rule of thumb: "Only use `useCallback` if passing the function as a prop to a `React.memo` component, or if it is a dependency in a `useEffect`."

***

## Question 3 — React Context vs Global State (Redux/Zustand)

### Difficulty
Medium

### Concepts Being Tested
- React Context API
- Re-rendering Engine
- State Management Architecture

---

### 1. Interview Question
"Your team decides to drop Redux and use React Context to manage the global user profile, app theme, and real-time chat messages in a single Context Provider. Soon, typing a message in the chat input makes the entire app feel sluggish. What is the architectural flaw here, and how would you fix it?"

---

### 2. What the Interviewer is Evaluating
Testing if the candidate understands the fundamental limitation of React Context: it is not a state management tool, it is a Dependency Injection tool.

---

### 3. Ideal Answer
The flaw is placing high-frequency updates (real-time chat messages) in the same Context as low-frequency updates (theme, profile). 

React Context does not have a "selector" mechanism (like Redux's `useSelector`). Whenever *any* value inside a Context Provider changes, **every single component** that consumes that Context is forced to re-render, even if they only care about the `theme` and not the `chat`.

To fix this:
1. **Split the Contexts:** Create separate providers for `ThemeProvider`, `ProfileProvider`, and `ChatProvider`.
2. **Move to a real state manager:** Use Zustand, Redux Toolkit, or Jotai for the chat feature so components can subscribe *only* to the specific slice of state they need without triggering massive re-renders.

---

### 4. Code Example
```typescript
// BAD: Monolithic Context
const AppContext = createContext();
// Any chat update re-renders the Header which only needs the profile!

// GOOD: Granular Contexts
const ThemeContext = createContext();
const UserContext = createContext();

// BETTER: Zustand for high-frequency state
import { create } from 'zustand';

const useChatStore = create((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] }))
}));

// Now components only re-render if `messages` change
const messages = useChatStore(state => state.messages); 
```

---

### 5. Production Scenario
- **Root Cause:** A video streaming app stored the current video playback timestamp (updating every 100ms) in a global `PlaybackContext`.
- **Investigation:** The entire app UI, including the sidebar and search bar, was re-rendering 10 times a second. The app drained batteries rapidly and dropped frames.
- **Solution:** Removed the timestamp from Context. Managed it locally within the video player component, and exposed it to the scrubber UI via an Animated Value (which updates natively without triggering JS React renders).
- **Lessons Learned:** High-frequency state never belongs in React Context.

---

### 6. Alternative Solutions & Trade-offs
- **Context Splitting**
  - *Advantages:* No third-party libraries needed.
  - *Disadvantages:* "Provider Hell" (deeply nested providers in `App.tsx`).
- **Zustand / Redux**
  - *Advantages:* Fine-grained subscriptions prevent unnecessary renders.
  - *Disadvantages:* Slight learning curve, external dependency.

---

### 7. Common Mistakes
- **Passing an inline object to the Provider value:** `<Context.Provider value={{ user, theme }}>`. This creates a brand new object reference on every parent render, forcing all consumers to re-render even if `user` and `theme` didn't change! (Always wrap the value in `useMemo`).
- **Using Context for form state.**

---

### 8. Follow-up Questions
1. Why wrap the Context Provider's `value` prop in `useMemo`?
2. How does Redux's `useSelector` avoid the Context re-render problem?
3. What is the difference between Context and Zustand?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will clarify the definition: "Context is for Dependency Injection, Redux is for State Management." They will explain that Context itself doesn't manage state (you still have to use `useState` in the Provider). They will advocate for Zustand or MMKV (for persistence) when dealing with complex, frequently changing global state, leaving Context strictly for static or rarely changing dependencies like Localization and Theme.

---

### 10. Interview Tips
If asked about Context vs Redux, never say "Context replaces Redux." Say "Context is for prop-drilling avoidance; Redux is for predictable state mutation and granular subscriptions."

***

## Question 4 — Composition and Custom Hook Architecture

### Difficulty
Hard

### Concepts Being Tested
- Separation of Concerns
- Custom Hooks
- Code Reusability

---

### 1. Interview Question
"You have a `<CheckoutScreen />` that handles fetching cart data, validating a promo code, managing the Stripe payment sheet, and displaying UI errors. The file is currently 800 lines long and full of `useState` and `useEffect`. How do you architect this using Custom Hooks to make the code testable and reusable?"

---

### 2. What the Interviewer is Evaluating
The interviewer is looking for your ability to refactor "Spaghetti Code" into domain-driven Custom Hooks (the Headless Component pattern).

---

### 3. Ideal Answer
An 800-line screen violates the Single Responsibility Principle. I would extract the business logic into domain-specific Custom Hooks, leaving the `<CheckoutScreen />` solely responsible for rendering the UI.

I would create:
1. `useCart()`: Handles fetching and mutating cart items.
2. `usePromoCode()`: Manages the promo code input state, validation, and API application.
3. `usePayment()`: Handles the Stripe SDK initialization and payment processing.

The Screen component then acts as a controller, composing these hooks together. This makes the UI completely decoupled from the logic, meaning we can easily unit test the hooks in isolation, or reuse `usePromoCode` on a completely different screen.

---

### 4. Code Example
```typescript
// Controller/UI Layer
export const CheckoutScreen = () => {
  const { cartItems, total, isLoading: isCartLoading } = useCart();
  const { applyPromo, promoError, discount } = usePromoCode();
  const { processPayment, isPaying } = usePayment(total - discount);

  if (isCartLoading) return <Spinner />;

  return (
    <View>
      <CartList items={cartItems} />
      <PromoInput onApply={applyPromo} error={promoError} />
      <PayButton onPress={processPayment} loading={isPaying} />
    </View>
  );
};
```

---

### 5. Production Scenario
- **Root Cause:** An authentication screen handled Facebook, Google, Apple, and Email login within a single 1200-line file.
- **Investigation:** When the marketing team asked to put an "Apple Login" button on a completely different screen, developers had to copy-paste 300 lines of complex Apple SDK logic.
- **Solution:** Refactored the logic into atomic hooks: `useAppleAuth()`, `useGoogleAuth()`.
- **Lessons Learned:** UI components should be "dumb". Business logic should live in "headless" hooks.

---

### 6. Alternative Solutions & Trade-offs
- **Custom Hooks (Headless Pattern)**
  - *Advantages:* Highly testable, reusable, keeps UI clean.
  - *Disadvantages:* Hooks can sometimes become tightly coupled if they share too much state.
- **Redux Thunks / Sagas**
  - *Advantages:* Moves logic completely outside of React's lifecycle.
  - *Disadvantages:* Overly verbose for logic that is strictly tied to a single screen.

---

### 7. Common Mistakes
- **Creating "God Hooks":** Refactoring everything into one massive `useCheckoutScreen()` hook. This just moves the 800 lines to a different file without actually improving separation of concerns.
- **Returning arrays instead of objects:** While `[state, setState]` is fine for simple primitives, custom hooks returning complex data should return objects `{ cart, isLoading }` so consumers don't have to rely on array order.

---

### 8. Follow-up Questions
1. How do you unit test a Custom Hook that relies on `useEffect`?
2. If `usePromoCode` needs data from `useCart`, how do you pass it?
3. What is the "Presenter-Container" pattern, and how do hooks replace it?

---

### 9. How a Senior/Lead Engineer Answers
A Lead engineer will mention "Headless UI architecture." They will explain that separating UI from logic ensures that if the company decides to migrate from React Native CLI to Expo, or change the UI library, the core business logic (the hooks) remains completely untouched. They will also mention using tools like `@testing-library/react-hooks` to achieve 100% test coverage on the business logic without needing brittle UI component tests.

---

### 10. Interview Tips
Emphasize "Separation of Concerns." Make it clear that UI files should only contain JSX and layout styling, not API calls.

***

## Question 5 — React 18 Concurrent Features at Scale (Top-Tier Scale)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- React 18 Concurrent Mode
- `useTransition` / `useDeferredValue`
- Rendering Interruptions

---

### 1. Interview Question
"In your React Native app, you have a global search bar. As the user types, it filters a local array of 10,000 complex product items. Currently, typing is extremely laggy because the filter logic and the massive UI re-render block the main thread. Debouncing feels too slow for UX. How do you use React 18 Concurrent features to fix this so the keyboard never drops frames?"

---

### 2. What the Interviewer is Evaluating
Testing knowledge of the latest React 18 rendering engine (Concurrent Mode). At top-tier scale, standard debouncing isn't enough; they want to see if you know how to yield control back to the JS event loop during heavy renders.

---

### 3. Ideal Answer
Standard React rendering is **blocking**—once it starts rendering 10,000 items, the user can't type until it finishes. 

To fix this, I would use **`useTransition`**. I will keep the search input state synchronous (so typing remains buttery smooth instantly), but I will wrap the state update that triggers the heavy filtering list inside a `startTransition`.

This tells React: "The list update is low priority. If the user types another letter, interrupt the current rendering of the list, throw away the old work, and immediately process the keystroke." This keeps the UI completely responsive without needing artificial debounce timers.

---

### 4. Code Example
```typescript
import React, { useState, useTransition } from 'react';
import { TextInput, View, FlatList } from 'react-native';

export const GlobalSearch = ({ massiveData }) => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState(massiveData);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (text: string) => {
    // 1. High priority: Update input instantly
    setQuery(text);

    // 2. Low priority: Filter the massive list (Interruptible)
    startTransition(() => {
      const results = massiveData.filter(item => item.name.includes(text));
      setFilteredData(results);
    });
  };

  return (
    <View>
      <TextInput value={query} onChangeText={handleSearch} />
      {isPending && <Spinner />}
      <FlatList data={filteredData} renderItem={...} />
    </View>
  );
};
```

---

### 5. Production Scenario
- **Root Cause:** A complex charting dashboard on a tablet app allowed users to drag a slider to filter financial data. The drag was jittery because rendering the new chart points blocked the JS thread.
- **Investigation:** We tried debouncing, but it made the chart feel disconnected from the slider.
- **Solution:** Used `useDeferredValue` on the data passed to the chart. The slider updated synchronously (60fps), while the chart re-rendered in the background concurrently, dropping frames gracefully if the user dragged too fast.
- **Lessons Learned:** Concurrent rendering allows you to decouple input feedback from heavy UI updates.

---

### 6. Alternative Solutions & Trade-offs
- **Debouncing (Lodash `debounce`)**
  - *Advantages:* Easy to implement, reduces function calls.
  - *Disadvantages:* Creates an artificial, noticeable delay for the user. Doesn't interrupt renders if they are already running.
- **`useTransition` (Current)**
  - *Advantages:* Native to React, prioritizes user input naturally.
  - *Disadvantages:* The heavy work is still happening on the JS thread; extreme computations might still require moving to native code (JSI/Worklets).

---

### 7. Common Mistakes
- **Putting the `setText` (input state) inside `startTransition`:** This completely defeats the purpose. The input state must remain high-priority (outside the transition) to stay responsive.
- **Using `useTransition` for API calls:** It is designed for *rendering* performance, not for network debouncing. You should still debounce API requests to save server costs.

---

### 8. Follow-up Questions
1. What is the difference between `useTransition` and `useDeferredValue`?
2. Does Concurrent rendering exist in the old React Native Architecture?
3. How does React know how to "pause" and "resume" a render?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will clarify that Concurrent Features are only fully effective in React Native if you are running the **New Architecture (Fabric)**. In the old bridge architecture, asynchronous rendering could cause UI tearing because the bridge wasn't synchronous. They will explain that `useTransition` is essentially "cooperative multitasking" for JavaScript—React checks the event loop periodically to see if higher-priority events (like a touch) have arrived, and yields execution if necessary.

---

### 10. Interview Tips
Be precise: "It makes heavy renders *interruptible*." This is the core magic of Concurrent React.
