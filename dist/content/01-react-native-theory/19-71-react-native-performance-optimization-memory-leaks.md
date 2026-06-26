> 🎯 **Topic:** 7.1 React Native: Performance, Optimization & Memory Leaks
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---

## 7.1 React Native: Performance, Optimization & Memory Leaks

### 1. Finding & Fixing Memory Leaks
**Question:** What are the most common causes of memory leaks in React Native and how do you fix them?

**Answer:**
A memory leak occurs when objects are no longer needed but remain in memory because they are still referenced.
**Causes & Fixes:**
1. **Unmounted Components:** Running `setState` after a component unmounts.
   *Fix:* Cancel API calls and flag `isMounted = false` in the `useEffect` cleanup.
2. **Event Listeners:** Forgetting to remove hardware back button or AppState listeners.
   *Fix:* Call `.remove()` inside the cleanup function.
3. **Timers & Intervals:** Forgetting to clear `setInterval`.
   *Fix:* Call `clearInterval(id)` on unmount.
4. **Closures:** Keeping references to large objects inside closures.

### 2. FlatList Optimization
**Question:** Your FlatList with 1000 items is lagging. How do you optimize it?

**Answer:**
1. **`keyExtractor`:** Ensure a unique key is provided.
2. **`getItemLayout`:** If items have fixed height, providing this skips dynamic measurement calculations.
3. **`initialNumToRender`:** Set this low (e.g., 10) so the initial load is fast.
4. **`maxToRenderPerBatch`:** Limits how many items are rendered per scroll chunk.
5. **`windowSize`:** Controls how many off-screen items are kept in memory (default is 21, drop it to 5-10).
6. **`removeClippedSubviews={true}`:** Unmounts components that are far off-screen.
7. Use **`React.memo`** for the `renderItem` component to prevent unnecessary re-renders.

### 3. Hermes Engine
**Question:** What is Hermes and why does it improve performance?

**Answer:**
Hermes is a JavaScript engine optimized specifically for React Native.
- It **Ahead-Of-Time (AOT)** compiles JavaScript into bytecode during the build process, instead of Just-In-Time (JIT) compiling on the device.
- This results in significantly faster App Launch times (TTI - Time to Interactive), lower memory usage, and smaller app sizes.

### 4. Rendering Optimization
**Question:** Explain `React.memo`, `useMemo`, and `useCallback`.

**Answer:**
- **React.memo:** Wraps a component. It only re-renders the component if its props change (shallow comparison).
- **useMemo:** Caches the *result* of an expensive calculation between renders.
- **useCallback:** Caches the *reference* to a function between renders. Crucial when passing functions down to a child component wrapped in `React.memo`.

### 5. Image Optimization
**Question:** How do you handle heavy image rendering?

**Answer:**
The default `<Image>` component does not cache aggressively. For production apps with heavy image feeds, use `react-native-fast-image`. It handles aggressive caching, memory management, and prioritizing image loading.

---
