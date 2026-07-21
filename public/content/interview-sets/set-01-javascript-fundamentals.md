# Volume 1 – Set 1 – JavaScript Fundamentals

## Question 1 — The Stale Closure in a `useEffect`

### Difficulty
Medium

### Concepts Being Tested
- Closures
- Variable Scope
- React Hooks Lifecycle

---

### 1. Interview Question
"We have a React Native functional component with a timer. Every time the timer ticks, it logs the current `count` state. However, it always logs `0`, even though the UI shows the count increasing when the user presses a button. Why is this happening, and how do you fix it?"

---

### 2. What the Interviewer is Evaluating
The interviewer is checking if the candidate understands JavaScript closures in the context of React's functional updates. This is a very common bug in mid-level companies moving fast to build features.

---

### 3. Ideal Answer
This happens because the `setInterval` callback forms a **closure** over the `count` variable at the time the effect first ran. Since the effect has an empty dependency array (or isn't re-running), the closure remembers `count` as `0`. 

To fix this, we have two options:
1. Use the functional state update form: `setCount(prevCount => prevCount + 1)`.
2. Use a `useRef` to store the latest value of `count`, allowing the interval to read `countRef.current` without triggering a re-render or needing to recreate the interval.

---

### 4. Code Example
```typescript
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button } from 'react-native';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const countRef = useRef(count);

  // Keep ref in sync with state
  useEffect(() => {
    countRef.current = count;
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Using ref solves the stale closure issue
      console.log('Current count is:', countRef.current);
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array is safe now

  return (
    <View>
      <Text>{count}</Text>
      <Button title="Increment" onPress={() => setCount(c => c + 1)} />
    </View>
  );
};
```

---

### 5. Production Scenario
- **Root Cause:** A developer implemented a chat screen auto-reconnect feature using a `setInterval` that referenced an outdated authentication token state.
- **Investigation:** Users reported random disconnects. Logs showed the app was attempting to reconnect using an expired token, even though the token had been refreshed in the UI.
- **Solution:** We moved the token to a `useRef` so the interval always had access to the most current token without re-binding the closure.
- **Lessons Learned:** Always be cautious of what variables are captured in async callbacks or intervals within React components.

---

### 6. Alternative Solutions & Trade-offs
- **Approach 1: Add state to dependency array**
  - *Advantages:* Simple to understand.
  - *Disadvantages:* Causes the `setInterval` to be destroyed and recreated on every single render, which is inefficient and can cause irregular timing.
- **Approach 2: `useRef` (Current)**
  - *Advantages:* Stable interval, always reads fresh data.
  - *Disadvantages:* Requires boilerplate (syncing state to ref).

---

### 7. Common Mistakes
- **Adding `count` to the dependency array of `useEffect`:** This technically works but destroys and recreates the interval timer every time the user clicks the button, leading to performance issues and erratic timer behavior.
- **Using `let` outside the component:** This breaks when multiple instances of the component are rendered on the screen.

---

### 8. Follow-up Questions
1. How does JavaScript's garbage collector handle the variables trapped in a closure?
2. How would you extract this logic into a custom `useInterval` hook?
3. What is the difference between execution context and lexical scope?

---

### 9. How a Senior/Lead Engineer Answers
A senior engineer immediately recognizes this as the classic "stale closure" problem. They don't just fix the code; they explain *why* React behaves this way (functional purity and re-evaluating the function on each render). A Lead would also mention extracting this pattern into a reusable `useInterval` hook (popularized by Dan Abramov) to abstract the `useRef` boilerplate away from junior developers, ensuring the team doesn't make this mistake again.

---

### 10. Interview Tips
Don't just jump to the code fix. Start by saying the word "Closure" explicitly. Interviewers look for the correct terminology.

***

## Question 2 — The Event Loop and Bridge Bottlenecks

### Difficulty
Medium

### Concepts Being Tested
- Microtasks vs Macrotasks
- React Native Bridge / JSI
- Event Loop

---

### 1. Interview Question
"In a React Native app, you execute a `Promise.resolve()`, a `setTimeout(..., 0)`, and an `Animated.timing` call at the exact same time. In what order do they execute, and how does this affect the React Native bridge?"

---

### 2. What the Interviewer is Evaluating
The interviewer wants to know if you deeply understand the JavaScript Event Loop (Call Stack, Microtask Queue, Macrotask/Task Queue) and how it interacts with React Native's specific architecture (Bridge/JSI).

---

### 3. Ideal Answer
The order of execution is:
1. **`Promise.resolve()`**: Promises go to the **Microtask Queue**, which is emptied immediately after the current synchronous code finishes, before any rendering or macrotasks.
2. **`Animated.timing`**: If `useNativeDriver: true` is set, the animation instruction is sent across the bridge (or via JSI in the New Architecture) to the UI thread almost immediately, bypassing the JS thread's heavy lifting.
3. **`setTimeout(..., 0)`**: This goes to the **Macrotask Queue**, which only executes after the Microtask queue is completely empty.

If the JS thread is blocked by a massive `while` loop, the Promise and `setTimeout` will be delayed. However, if the animation is on the native driver, it will run smoothly on the UI thread regardless of the JS thread's state.

---

### 4. Code Example
"No code required, conceptual understanding."

---

### 5. Production Scenario
- **Root Cause:** A mid-level developer placed heavy data parsing (10,000 JSON records) inside a `.then()` block of an API call. 
- **Investigation:** Because `.then()` is a microtask, the JS engine refused to process UI interactions (like navigation transitions) until the entire 10,000 records were parsed. The app felt "frozen".
- **Solution:** We moved the parsing to a background thread using `react-native-worklets-core` (or Web Workers/InteractionManager), freeing the JS thread to handle UI events.
- **Lessons Learned:** Microtasks block the UI just as badly as synchronous code if they take too long.

---

### 6. Alternative Solutions & Trade-offs
- **InteractionManager.runAfterInteractions()**
  - *Advantages:* Defers heavy JS execution until after animations/transitions finish.
  - *Disadvantages:* Can be unpredictable if animations never technically "finish" (e.g., looping loaders).
- **Background Threads (e.g., Reanimated Worklets)**
  - *Advantages:* Completely frees the JS thread.
  - *Disadvantages:* Higher complexity, requires JSI knowledge.

---

### 7. Common Mistakes
- **Assuming `setTimeout(..., 0)` executes instantly.** It doesn't; it yields to the event loop.
- **Not knowing the difference between Micro and Macro tasks.**
- **Believing the JS thread controls Native animations** (if `useNativeDriver` is true).

---

### 8. Follow-up Questions
1. If I have an infinite loop of Promises, what happens to the app? 
2. How does the New Architecture (Fabric/JSI) change how we think about the Event Loop?
3. What is `requestAnimationFrame` and where does it sit in the event loop?

---

### 9. How a Senior/Lead Engineer Answers
A Lead engineer will pivot this into a discussion about the **React Native New Architecture**. They will explain that in the old architecture, JSON serialization across the bridge caused massive event loop bottlenecks. They will mention that with JSI, synchronous C++ calls replace the asynchronous bridge, meaning we have to be *even more careful* not to block the JS thread, as JSI calls are synchronous and will block the call stack directly.

---

### 10. Interview Tips
Draw the event loop in the air or on a whiteboard if you have one. State clearly: "Microtasks before Macrotasks."

***

## Question 3 — Object References and State Mutations

### Difficulty
Medium

### Concepts Being Tested
- Pass by Value vs Pass by Reference
- React State Immutability
- Shallow vs Deep Copy

---

### 1. Interview Question
"You receive a large user profile object from an API. You need to update the user's nested `address.city` before saving it to state. You do `const newUser = { ...user }; newUser.address.city = 'Mumbai'; setUser(newUser);`. However, another component displaying the old address suddenly updates before the save is successful. What went wrong?"

---

### 2. What the Interviewer is Evaluating
Evaluating the candidate's understanding of memory references in JS and why immutability in React is critical. A huge source of bugs in mid-level codebases is accidental state mutation.

---

### 3. Ideal Answer
The spread operator (`...`) only creates a **shallow copy**. The top-level `newUser` object is a new reference, but the nested `address` object still points to the exact same memory location as `user.address`. 
By doing `newUser.address.city = 'Mumbai'`, you accidentally mutated the original state directly. This causes other components relying on that reference to reflect the change immediately, bypassing React's render cycle.
We need to do a deep copy or explicitly copy the nested objects.

---

### 4. Code Example
```typescript
// BAD: Mutates original state
const handleUpdateBad = () => {
  const newUser = { ...user };
  newUser.address.city = 'Mumbai'; // Mutates original reference!
  setUser(newUser);
};

// GOOD: Native nested spread (Shallow copies all the way down)
const handleUpdateGood = () => {
  setUser(prev => ({
    ...prev,
    address: {
      ...prev.address,
      city: 'Mumbai'
    }
  }));
};

// GOOD: Structured Clone (Deep Copy)
const handleUpdateDeep = () => {
  const newUser = structuredClone(user);
  newUser.address.city = 'Mumbai';
  setUser(newUser);
}
```

---

### 5. Production Scenario
- **Root Cause:** In an e-commerce app, a user's shopping cart state was being shallow-copied during a "calculate discount" utility function.
- **Investigation:** The utility function modified the item prices directly. Because it was a shallow copy, it mutated the global Redux store without an action being dispatched. The UI showed discounted prices before the user even applied the coupon.
- **Solution:** Integrated `Immer.js` to handle complex nested state updates safely via draft mutations.
- **Lessons Learned:** Never trust manual spread operators for objects deeper than 1 level in global state.

---

### 6. Alternative Solutions & Trade-offs
- **`structuredClone()`**
  - *Advantages:* Native to modern JS, fast deep copy.
  - *Disadvantages:* Fails on functions or DOM nodes.
- **`Immer.js`**
  - *Advantages:* Allows writing mutable code that safely outputs immutable state.
  - *Disadvantages:* Adds a small dependency and slight performance overhead.

---

### 7. Common Mistakes
- **Using `JSON.parse(JSON.stringify(obj))`:** This strips out Dates, undefined, and functions. It is notoriously slow for large objects.
- **Assuming `Object.assign()` does a deep copy.** (It doesn't).

---

### 8. Follow-up Questions
1. What happens if the object has a circular reference and you try to deep copy it?
2. How does Redux Toolkit solve this problem out of the box?
3. How does React's `Object.is()` comparison work when deciding to re-render?

---

### 9. How a Senior/Lead Engineer Answers
A Lead engineer will mention that while `structuredClone` is great, deeply copying massive objects on the JS thread is a CPU-intensive task that can drop UI frames. They would advocate for keeping state as flat as possible (normalization) exactly as Redux recommends, or using an immutable library like `Immer` (built into Redux Toolkit) which uses JS Proxies to only copy the branches of the object tree that actually changed, saving massive amounts of memory.

---

### 10. Interview Tips
Mention `Immer` and "State Normalization". It immediately signals you've worked on large-scale applications.

***

## Question 4 — Asynchronous Flow & Promise.all Trade-offs

### Difficulty
Hard

### Concepts Being Tested
- Async/Await
- Concurrency (`Promise.all` vs `Promise.allSettled`)
- Network Error Handling

---

### 1. Interview Question
"Your dashboard needs to fetch User Profile, User Orders, and Promotions. You wrap all three API calls in a `Promise.all()`. Sometimes the dashboard loads perfectly in 1 second. Other times, the entire screen fails to load and shows a red error, even though the Profile and Orders APIs succeeded. Why? How do you architect this better?"

---

### 2. What the Interviewer is Evaluating
Testing understanding of Promise concurrency and graceful degradation. Mid-level devs often use `Promise.all` blindly, causing entire screens to crash if a non-critical API (like ads or promotions) fails.

---

### 3. Ideal Answer
`Promise.all()` is "fail-fast". If *any* of the promises reject, the entire `Promise.all` immediately rejects, discarding the successful responses. If the Promotions API goes down, the user gets completely blocked from seeing their Profile and Orders.

To architect this better, we should use **`Promise.allSettled()`**. This waits for all promises to finish, regardless of success or failure. We can then inspect the results and degrade gracefully—showing the Profile and Orders, and maybe hiding the Promotions banner.

---

### 4. Code Example
```typescript
const fetchDashboardData = async () => {
  const [profileReq, ordersReq, promosReq] = await Promise.allSettled([
    api.getProfile(),
    api.getOrders(),
    api.getPromotions()
  ]);

  // Handle critical data
  if (profileReq.status === 'fulfilled') {
    setProfile(profileReq.value);
  } else {
    showCriticalError('Failed to load profile');
    return; // Block UI
  }

  // Handle non-critical data gracefully
  if (promosReq.status === 'fulfilled') {
    setPromos(promosReq.value);
  } else {
    // Graceful degradation: Just don't show promos, don't crash the app
    console.warn('Promos failed, continuing without them.');
  }
};
```

---

### 5. Production Scenario
- **Root Cause:** A fintech app's home screen called `Promise.all([getWalletBalance(), getBannerAds()])`.
- **Investigation:** An ad-blocker on the user's network blocked the `getBannerAds` endpoint. Because of `Promise.all`, the wallet balance request was discarded, and the user saw a "Network Error", unable to access their money.
- **Solution:** Switched to `allSettled` and decoupled the critical path (Wallet) from the non-critical path (Ads).
- **Lessons Learned:** Never let a marketing/analytics API bring down the core business logic.

---

### 6. Alternative Solutions & Trade-offs
- **Separate `useEffect` / React Query hooks for each API**
  - *Advantages:* Best UX. Each section of the screen shows a skeleton loader independently and resolves as data arrives.
  - *Disadvantages:* Can cause waterfall rendering if not structured properly.
- **`Promise.allSettled()` (Current)**
  - *Advantages:* Easy to implement, predictable loading state.
  - *Disadvantages:* The user waits for the *slowest* API before seeing *any* data.

---

### 7. Common Mistakes
- **Using `Promise.any()`:** This resolves as soon as *one* promise succeeds, which is wrong because we need all the data.
- **Chaining `await` sequentially:** (`await getProfile(); await getOrders();`). This creates a waterfall, turning a 1-second load into a 3-second load.

---

### 8. Follow-up Questions
1. How does `Promise.race()` differ, and what is a practical use case for it? (Hint: Timeouts).
2. If `getOrders` takes 5 seconds, how do you prevent it from holding up the Profile UI if you use `allSettled`?

---

### 9. How a Senior/Lead Engineer Answers
A Lead Engineer will point out that handling this at the component level with raw Promises is outdated. They will advocate for using **React Query** (TanStack Query) or **RTK Query** with `useQueries`. This allows each piece of data to manage its own cache, retry logic, and loading state independently. The UI can show the Profile immediately from cache, while silently fetching Orders and Promos in the background, resulting in a zero-second perceived load time.

---

### 10. Interview Tips
Use the term "Graceful Degradation". It shows maturity in product thinking, not just coding.

***

## Question 5 — Massive Data Processing and Memory Leaks (Top-Tier Scale)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- JS Engine Garbage Collection
- Memory Leaks in React Native
- High-Performance Data Processing

---

### 1. Interview Question
"Your React Native app is used by delivery drivers. Every 10 seconds, it receives a WebSocket payload containing 5,000 geofence polygons to recalculate dynamic routes. Over 30 minutes of usage, the app slows to a crawl and eventually crashes with an Out Of Memory (OOM) error. How do you find the memory leak, and how do you architect JS to handle this much continuous data?"

---

### 2. What the Interviewer is Evaluating
This tests extreme scale. The interviewer wants to see if you understand the limitations of the Hermes/V8 Garbage Collector (GC), how to use memory profilers, and how to offload heavy computation from the JS thread.

---

### 3. Ideal Answer
The crash happens because allocating and destroying 5,000 massive objects every 10 seconds causes **GC Thrashing**. The Garbage Collector can't clean up memory fast enough, pausing the JS thread and eventually hitting the RAM limit.

**Investigation:** I would use Xcode Instruments (Allocations) for iOS and Android Studio Memory Profiler for native memory, and Chrome DevTools (or Flipper Hermes Debugger) to take JS Heap Snapshots. I'd compare two snapshots taken 5 minutes apart to find "detached" objects not being garbage collected.

**Architecture Fix:**
1. **Stop passing JSON over the bridge:** A 5,000-item array serializing over the React Native bridge every 10 seconds will choke the app. 
2. **Move to Native / C++:** I would write a C++ TurboModule (JSI). The WebSocket connects directly on the Native side. The C++ layer holds the polygon data in memory (which is vastly more memory-efficient than JS objects).
3. **Event-driven UI:** JS only queries the C++ layer for the *current* route string, rather than holding 5,000 polygons in JS memory.

---

### 4. Code Example
"No code required. This is an architectural system design question."

---

### 5. Production Scenario
- **Root Cause:** An Uber-like app processed real-time heatmap pricing on the JS thread. The objects were being stored in a Redux store that kept a "history" of the last 10 states for time-travel debugging, which accidentally shipped to production.
- **Investigation:** A Heap Snapshot revealed the Redux history array was retaining references to millions of old polygon nodes.
- **Solution:** Disabled Redux DevTools in production. Migrated the geographical calculation engine to a Rust core, exposed to React Native via JSI.
- **Lessons Learned:** JS is single-threaded and memory-heavy. Do not use Redux for high-frequency, massive data streams.

---

### 6. Alternative Solutions & Trade-offs
- **Web Workers / `react-native-multithreading`**
  - *Advantages:* Keeps logic in JS, prevents UI thread blocking.
  - *Disadvantages:* Still subject to JS memory limits and GC pauses.
- **C++ JSI TurboModule (Current)**
  - *Advantages:* Near-native performance, predictable memory management.
  - *Disadvantages:* High barrier to entry, requires C++ engineers.

---

### 7. Common Mistakes
- **Trying to optimize the JS array loops:** (e.g., using `for` instead of `forEach`). Loop speed isn't the problem here; memory allocation and bridge serialization are.
- **Assuming Hermes solves all memory problems:** Hermes is optimized for startup time and low memory *footprint*, but aggressive GC thrashing will still kill it.

---

### 8. Follow-up Questions
1. How does Hermes GC differ from V8's GC in handling large arrays?
2. If you *had* to keep this in JS, what data structures would you use to minimize memory? (Hint: TypedArrays like `Float32Array`).
3. How do closures accidentally create memory leaks in WebSockets?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will immediately recognize that **JavaScript is the wrong tool for the job**. They will propose bypassing the JS thread entirely. They will suggest establishing the WebSocket connection on the Native Android/iOS side, doing the geolocation math in a background native thread, and only emitting a lightweight event over the bridge when the UI actually needs to change (e.g., `{"route": "turn left"}`). 

---

### 10. Interview Tips
At this level, you must confidently say, "I wouldn't do this in JavaScript." Recognizing the limitations of your tools is the hallmark of a Principal/Staff engineer.
