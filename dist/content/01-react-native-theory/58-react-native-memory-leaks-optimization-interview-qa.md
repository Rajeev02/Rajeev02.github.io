> 🎯 **Topic:** Memory Leaks & Memory Optimization
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked, Performance

---

## 58. Memory Leaks and Optimization in React Native

*⏱️ 8 min read*

### Overview
A memory leak occurs when an application allocates memory for an object but fails to release it when the object is no longer needed. In React Native, memory leaks can occur in the JavaScript context (V8/Hermes) or the Native context (Objective-C/Swift/Java/Kotlin). If memory grows unbounded, the OS will aggressively kill the app, resulting in an Out Of Memory (OOM) crash.

---

### Interview Questions & Answers

#### Q1. What are the most common causes of Memory Leaks in React Native?
**Answer:**
1. **Unregistered Listeners/Subscriptions:** Subscribing to an event (e.g., `DeviceEventEmitter`, Redux store, or WebSocket) in `useEffect` and forgetting to unsubscribe in the cleanup function. The event emitter retains a strong reference to the component, preventing garbage collection even after the component unmounts.
2. **Timers & Intervals:** Starting a `setInterval` or `setTimeout` and not clearing it using `clearInterval` or `clearTimeout` when the component unmounts.
3. **Closures Capturing Large Objects:** A closure that captures a large object or React state and is passed to a long-living global object or event listener.
4. **Native Modules (Bridge Retain Cycles):** A native module (iOS/Android) storing a strong reference to a callback or promise and never invoking/releasing it.

#### Q2. How do you detect and debug a memory leak?
**Answer:**
1. **JavaScript Memory:** Use the **React Native DevTools** or **Chrome DevTools (Memory Tab)**. Take a Heap Snapshot, interact with the app (e.g., navigate back and forth 10 times), and take a second Heap Snapshot. Compare them to see if detached DOM nodes or components are piling up.
2. **Native Memory (iOS):** Open Xcode, run the app in **Instruments**, and select the **Leaks** and **Allocations** instruments. It tracks strong reference cycles in Objective-C/Swift.
3. **Native Memory (Android):** Open Android Studio, go to the **Profiler**, and use the **Memory Profiler** to record memory allocations and force garbage collection.

#### Q3. How does React Native's Hermes engine handle Garbage Collection (GC)?
**Answer:**
Hermes implements a generational, concurrent garbage collector optimized for mobile limits. However, GC causes a temporary pause (STW - Stop The World). If an app frequently allocates and deallocates massive objects, the GC runs constantly, causing frame drops (GC thrashing).
**Optimization:** Minimize object allocations inside `render` loops. Pre-allocate arrays if sizes are known, and avoid generating massive nested JSON structures unnecessarily.

#### Q4. What is a "Detached Component" or "Retained Tree" in a heap snapshot?
**Answer:**
In a heap snapshot, a "Detached" element means the component has been unmounted from the active React tree, but something in memory (like a global variable, an un-cleared interval, or a native listener) is still holding a reference to it. Because of this reference, the Garbage Collector refuses to destroy it.

#### Q5. How do you optimize memory consumption for apps with heavily image-driven feeds (like Instagram)?
**Answer:**
Images consume the vast majority of memory in mobile apps (an uncompressed 4K image can take 30MB+ of RAM).
1. **Downsampling:** Only request thumbnail-sized images from the CDN for the feed. Never load a 4K image into a 100x100 pixel `<Image>` container.
2. **Library Selection:** Use `react-native-fast-image`. It allows clearing memory caches programmatically.
3. **Paging:** Do not fetch 1000 posts at once. Fetch in pages of 10-20.
4. **Unmounting:** Use `FlatList` with strict memory constraints (`windowSize`, `removeClippedSubviews`) so that `<Image>` components completely unmount and release native memory when scrolled far out of view.
