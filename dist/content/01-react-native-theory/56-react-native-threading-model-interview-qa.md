> 🎯 **Topic:** React Native Threading Model & Concurrency
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked, Architecture

---

## 56. Threading in React Native: Non-Blocking Execution

*⏱️ 8 min read*

### Overview
Understanding the threading model is critical to writing high-performance React Native applications. If threads block each other, the app drops frames, resulting in UI stuttering and a poor user experience.

React Native operates primarily on **three main threads**:
1. **The UI Thread (Main Thread):** Native Android/iOS thread. Handles all native UI drawing, user gestures, and OS events.
2. **The JavaScript Thread:** Where your React and JS code executes. This is a single-threaded environment (V8/Hermes).
3. **The Background/Native Modules Thread:** A pool of worker threads utilized by native modules to perform heavy lifting (network requests, disk I/O, database queries) without blocking the JS or UI threads.

---

### Interview Questions & Answers

#### Q1. Since JavaScript is single-threaded, how does React Native handle heavy computations without blocking the UI?
**Answer:**
JavaScript itself is single-threaded, meaning heavy computations (like sorting a 50k item list or processing images) will block the JS thread, preventing React from reconciling the UI or handling subsequent logic. 

However, it does **not** completely freeze the app because the **Native UI Thread runs independently**. Scroll events and native animations (using `useNativeDriver: true` or Reanimated) will continue to work smoothly. To prevent blocking the JS thread, we should:
1. Offload heavy lifting to the Native Modules Thread using a C++/Native module.
2. Use `InteractionManager.runAfterInteractions` to defer heavy JS work until after navigation/animations finish.
3. Use Web Workers or multithreading libraries like `react-native-multithreading` (powered by JSI) to spin up secondary JS threads.

#### Q2. What happens if the UI thread is blocked?
**Answer:**
If the UI thread is blocked (e.g., by synchronous heavy work on the native side, or massive layout calculations happening synchronously in Fabric), the app completely freezes. The user cannot scroll, tap buttons, or interact with the app. If blocked for too long (typically ~5 seconds on Android), the OS will show an ANR (Application Not Responding) crash dialog.

#### Q3. How do you prevent threads from blocking each other in React Native?
**Answer:**
- **UI Thread:** Keep it lightweight. Avoid synchronous native calls that do disk I/O or network requests.
- **JS Thread:** Break down large tasks using `requestAnimationFrame`, `setTimeout`, or `setImmediate`. Use `React.memo` and `useCallback` to prevent massive re-renders. Use `react-native-reanimated` so complex gesture tracking and animations run entirely on the UI thread without crossing back to the JS thread.
- **Native Modules Thread:** Always use asynchronous methods (Promises/Callbacks) for database reads, file access, and network requests so they execute on background threads and return the result to JS asynchronously.

#### Q4. What is `useNativeDriver` in the Animated API, and why does it matter?
**Answer:**
By default, the `Animated` API calculates the next frame's values on the JS thread and sends them over the bridge to the UI thread for every single frame (60 times a second). If the JS thread drops a frame, the animation stutters.
Setting `useNativeDriver: true` serializes the entire animation graph *once* before the animation starts, sending it to the Native UI thread. The native thread then executes the animation independently, guaranteeing 60FPS even if the JS thread is completely blocked.

#### Q5. How does the New Architecture (Fabric) affect the threading model?
**Answer:**
Under the old architecture, all layout (Yoga) and rendering commands were asynchronous. The JS thread sent commands over the bridge, and the UI thread executed them later. 
In the New Architecture, **Fabric allows synchronous execution**. The JS thread can hold a direct pointer to C++ objects and synchronously command the UI thread to update. This is incredibly powerful for complex interactions (like a fast `FlatList` scroll) because JS can measure and render the next frame *before* the screen repaints, completely eliminating UI tearing.
