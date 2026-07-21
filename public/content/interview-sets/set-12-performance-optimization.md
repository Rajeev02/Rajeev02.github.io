# Volume 7 – Set 12 – Performance Optimization

## 1. How do you identify and fix unnecessary re-renders in a React Native app?

**Concept:**
Unnecessary re-renders occur when a component renders again even though its output hasn't changed. This happens because the parent component re-rendered or the component received a new reference for props (like objects or functions) that haven't fundamentally changed. In React Native, excessive re-renders block the JS thread, causing UI stutters.

**Answer:**
To identify unnecessary re-renders, I use tools like React DevTools Profiler, `why-did-you-render`, or the native Flipper performance plugin. 

Once identified, I fix them using these techniques:
1. **`React.memo`**: Wraps functional components to memoize the rendered output. It skips re-rendering if the shallow equality check of props is true.
2. **`useCallback`**: Memoizes function definitions. Passing an inline function `onPress={() => doSomething()}` to a child component creates a new reference on every render, forcing the child to re-render. `useCallback` preserves the reference across renders.
3. **`useMemo`**: Memoizes expensive computations and object creations. Passing an inline object `style={{ padding: 10 }}` breaks `React.memo` on the child component.
4. **State Colocation**: Moving state down to the lowest possible component in the tree prevents parent components from re-rendering the entire subtree.

**Key Takeaway:**
Don't prematurely optimize every component with `memo`, `useMemo`, or `useCallback`, as the memoization itself carries a small memory overhead. Apply them strategically to heavy components (like list items) or components deep in the tree.

---

## 2. Explain the differences between `FlatList` and `FlashList`. How do they manage memory for large lists?

**Concept:**
Lists are notoriously difficult to optimize in React Native because the scroll view is handled natively, but the items are rendered by the JavaScript thread. If the user scrolls faster than the JS thread can render, they see blank space.

**Answer:**
`FlatList` manages memory using a \"virtualized\" approach. It renders items within a specific window (viewport + some buffer) and unmounts items that scroll far off-screen to save memory. However, when those items come back on-screen, `FlatList` has to recreate and mount the entire component tree for that item again, which is a heavy operation and leads to dropped frames.

`FlashList` (by Shopify) solves this by using \"Component Recycling\". Instead of unmounting the component and destroying the native view, `FlashList` keeps the native view alive in a recycling pool. When an item scrolls off-screen, its view is moved to the bottom of the list and simply updated with new props. This entirely skips the expensive \"Mounting\" phase (no `View` creation, no memory allocation for new views), resulting in a massive performance boost, especially on low-end Android devices.

**Key Takeaway:**
`FlashList` can achieve 60FPS (or 120FPS) on massive lists by recycling views rather than destroying and recreating them. It requires specifying an `estimatedItemSize` to calculate layouts efficiently.

---

## 3. What is the impact of inline functions and inline object styles on React Native performance?

**Concept:**
In JavaScript, objects and functions are compared by reference, not by value. Two identical objects `{ a: 1 } === { a: 1 }` evaluate to `false`.

**Answer:**
When you use inline functions or inline objects in a component's render method, a brand new reference is created in memory every single time the component re-renders. 

1. **Inline Styles**: `<View style={{ margin: 10 }} />` creates a new object every render. If passed to a child component wrapped in `React.memo`, the child will always re-render because `oldProps.style !== newProps.style`. To fix this, define styles outside the component using `StyleSheet.create`.
2. **Inline Functions**: `<Button onPress={() => submit()} />` creates a new function signature every render. This forces child components to re-render. To fix this, wrap the function in a `useCallback` hook.

While modern JS engines (like Hermes) are very fast at garbage collection, creating hundreds of inline objects in a `FlatList` with 1000 items creates 1000 new objects in memory *every time* the user scrolls, triggering aggressive garbage collection pauses (Jank).

**Key Takeaway:**
Always pull static styles out into `StyleSheet.create` and memoize functions passed as props to heavy child components.

---

## 4. How do you track down and resolve memory leaks in a React Native application?

**Concept:**
A memory leak occurs when the application allocates memory for an object but never releases it back to the operating system, causing the app's memory footprint to grow infinitely until the OS kills it (OOM - Out of Memory crash).

**Answer:**
To track down memory leaks, I use Xcode Instruments (Allocations/Leaks profile) for iOS and Android Studio Memory Profiler for Android. These tools allow me to take a memory heap dump, navigate back and forth between screens, take another heap dump, and compare them to see which objects (like View Controllers or Bitmaps) were not destroyed.

Common causes and fixes in React Native:
1. **Unclosed Subscriptions/Listeners**: Adding an event listener (like `AppState.addEventListener` or an EventEmitter) in `useEffect` but forgetting to call `.remove()` in the cleanup function.
2. **Timers**: Starting a `setInterval` and not calling `clearInterval` when the component unmounts.
3. **Closures**: Creating large data arrays inside a component that get trapped in a closure (like a heavy timeout function) and cannot be garbage collected.
4. **Native Image Caching**: Loading massive, unoptimized high-resolution images. I always use `react-native-fast-image` for aggressive LRU (Least Recently Used) caching and downsampling images before rendering them.

**Key Takeaway:**
Always clean up side effects in the `return () => {}` phase of a `useEffect`.

---

## 5. How does Hermes improve app startup time and memory footprint compared to JSC?

**Concept:**
React Native requires a JavaScript Engine to execute JS code on the mobile device. Historically, this was JavaScriptCore (JSC). Hermes is a new, lightweight engine built specifically by Facebook for React Native.

**Answer:**
Hermes drastically improves performance by changing *when* the JavaScript is compiled.

With JSC, the JS bundle is parsed and Just-In-Time (JIT) compiled into machine code *on the user's device* at runtime. This consumes heavy CPU and memory during app launch, leading to a slow Time To Interactive (TTI).

Hermes uses Ahead-Of-Time (AOT) compilation. The JavaScript bundle is pre-compiled into optimized bytecode during the build process on the developer's machine (or CI server). 
1. **Startup Time**: The device no longer needs to parse and compile JS on launch. It just loads the bytecode directly into memory and executes it, cutting TTI by up to 50%.
2. **Memory Footprint**: Bytecode is much smaller than raw JS text. Furthermore, Hermes doesn't need a JIT compiler in memory, heavily reducing the RAM usage (often by tens of megabytes), preventing OOM crashes on low-end Android devices.
3. **App Size**: The APK/AAB size is smaller because the Hermes engine itself is smaller than JSC.

**Key Takeaway:**
Hermes shifts the heavy lifting of compilation from the user's phone to the build server, optimizing for the constraints of mobile devices.
