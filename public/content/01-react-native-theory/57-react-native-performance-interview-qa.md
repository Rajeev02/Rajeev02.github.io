> 🎯 **Topic:** React Native Performance Metrics & Profiling
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** Very High
> 🏷️ **Tags:** ⭐ Frequently Asked, Performance

---

## 57. Performance in React Native

*⏱️ 10 min read*

### Overview
React Native performance involves three distinct layers:
1. **JavaScript Performance:** Ensuring the JS thread renders efficiently (React component lifecycle).
2. **Bridge Performance:** Minimizing data passing over the bridge.
3. **Native Performance:** Efficient UI rendering, image decoding, and thread management on the OS level.

---

### Interview Questions & Answers

#### Q1. How do you measure the performance of a React Native application?
**Answer:**
There are several tools to measure different aspects of performance:
1. **React Profiler (DevTools):** Measures JS thread performance, specifically how long components take to mount or update, helping identify unnecessary re-renders.
2. **Flipper (Deprecated) / React Native DevTools:** Used for network profiling, layout inspection, and database inspection.
3. **Xcode Instruments / Android Studio Profiler:** Deep native profiling. Used to detect memory leaks, high CPU usage by native threads, and network request bottlenecks at the OS level.
4. **Flashlight / Maestro:** Used for automated performance scoring and E2E performance testing (FPS drops, TTI).

#### Q2. What is TTI (Time to Interactive), and how do you improve it in React Native?
**Answer:**
TTI is the time it takes from the user launching the app until the UI is fully responsive to user input. To improve TTI:
- **Hermes Engine:** Enable Hermes, which precompiles JS into bytecode at build time, significantly reducing JS parsing time on startup.
- **Lazy Loading (Code Splitting):** Use `React.lazy` and `Suspense` so only the JS required for the initial screen is evaluated.
- **Inline Requires:** Enable inline requires in Metro so JS modules are only executed when actually imported inside a function, not at file load time.
- **TurboModules:** Migrate to the New Architecture where native modules are lazily loaded.

#### Q3. How do you optimize large lists in React Native to maintain 60FPS?
**Answer:**
`FlatList` and `SectionList` are virtualized, but they can still drop frames. To optimize:
1. `removeClippedSubviews={true}`: Unmounts components that are far off-screen.
2. `getItemLayout`: If item heights are fixed, provide this prop to skip dynamic layout calculations entirely.
3. `initialNumToRender`: Keep this low (e.g., 10) so the initial render is instantaneous.
4. `maxToRenderPerBatch`: Determines how many items are rendered per JS frame.
5. `windowSize`: Reduce this (default is 21) to consume less memory for off-screen items.
6. **FlashList:** Replace `FlatList` with Shopify's `FlashList`, which recycles views (like Android's `RecyclerView`) instead of destroying and recreating them, resulting in massive FPS gains.

#### Q4. Why should you avoid anonymous functions in `renderItem` or `onChange` handlers?
**Answer:**
If you pass an anonymous function like `onPress={() => doSomething()}` to a child component, a new function reference is created on every single render. If the child component uses `React.memo`, the reference check (`prevProps.onPress === nextProps.onPress`) will always fail, causing the child to re-render needlessly. You should wrap the function in `useCallback`.

#### Q5. How does image rendering impact performance, and how do you optimize it?
**Answer:**
The default `<Image>` component in React Native is notoriously bad at handling large lists of images because it lacks advanced caching and aggressive memory management. 
- **Solution:** Use `react-native-fast-image`. It wraps `SDWebImage` (iOS) and `Glide` (Android) natively. It handles aggressive memory caching, disk caching, image prioritization, and automatic memory eviction when the app goes into the background, preventing Out Of Memory (OOM) crashes.
