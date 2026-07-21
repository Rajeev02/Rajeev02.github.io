# Volume 12 – Set 26 – Hermes Engine & Memory Profiling

## 1. What is the Hermes Engine and how does it improve React Native performance?

**Concept:**
Historically, React Native used JavaScriptCore (JSC) on iOS and V8/JSC on Android to execute your JavaScript bundle.

**Answer:**
Hermes is a lightweight, highly optimized JavaScript engine built by Facebook specifically for React Native.

**Key Improvements:**
1. **Ahead-of-Time (AOT) Compilation:** Unlike JSC, which parses and compiles plain text JavaScript at runtime (JIT - Just in Time), Hermes compiles your JavaScript into bytecode (binary) at build time on your CI server. When the app launches, it doesn't need to parse JS; it just executes the bytecode immediately.
2. **Time to Interactive (TTI):** Because parsing is skipped, the app boots up and becomes interactive exponentially faster, especially on low-end Android devices.
3. **Decreased App Size:** The bytecode format is significantly smaller than minified text JS, leading to smaller APK/IPA sizes.
4. **Reduced Memory Footprint:** Hermes uses a garbage collector optimized specifically for the constraints of mobile operating systems, drastically reducing OOM (Out of Memory) crashes.

**Key Takeaway:**
Hermes is now the default engine in React Native. It fundamentally shifts the heavy lifting of JavaScript compilation from the user's phone to the developer's build machine.

---

## 2. Explain Garbage Collection in Hermes.

**Concept:**
JavaScript is memory-managed. When variables are no longer used, the Garbage Collector (GC) frees up the RAM.

**Answer:**
Hermes uses a generational garbage collector tailored for mobile devices.
- In desktop browsers (V8), the GC tries to maximize throughput, sometimes allowing memory to bloat slightly to avoid pausing execution.
- In mobile, RAM is strictly limited. If an app exceeds its limit, the OS kills it instantly.

Hermes prioritizes **Virtual Memory Efficiency**. It aggressively returns unused memory pages directly back to the OS. It also minimizes \"pause times\" (the moment the JS thread completely freezes to run GC sweeps), ensuring that animations and UI interactions don't stutter when a massive API response is cleared from memory.

**Key Takeaway:**
Hermes's GC is tuned to prevent background OS kills by aggressively keeping the RAM footprint as small as possible.

---

## 3. How do you detect and fix Memory Leaks in a React Native app?

**Concept:**
A memory leak occurs when you hold onto references of data or components that are no longer needed, preventing the GC from cleaning them up.

**Answer:**
**How to Detect:**
1. Use the **React Native CLI Profiler** or **Flipper** (historically) / **Chrome DevTools** (modern via Hermes debugger).
2. Take a \"Heap Snapshot\" when you open a screen.
3. Close the screen.
4. Take a second \"Heap Snapshot\".
5. Compare the two. If the second snapshot shows that the screen component or massive data arrays are still in memory, you have a leak.

**Common Causes & Fixes:**
1. **Unsubscribing Event Listeners:** If you attach `AppState.addEventListener` or a `setInterval` in a `useEffect` but forget to return the cleanup function, the component cannot be destroyed.
   - *Fix:* Always return a cleanup function in `useEffect`.
2. **Closures holding references:** A Redux selector or a debounced function might accidentally hold a reference to a massive object.
3. **Global State Arrays:** Pushing infinite logs or tracking events into a global Redux array that is never truncated.

**Key Takeaway:**
Memory leaks are almost always caused by forgotten cleanup functions in `useEffect` or uncleared timers/listeners.

---

## 4. What is the difference between JIT (Just-In-Time) and AOT (Ahead-Of-Time) compilation?

**Concept:**
This is a fundamental computer science concept applied directly to mobile architecture.

**Answer:**
1. **JIT (JavaScriptCore/V8):** 
   - The app ships with plain text JavaScript. 
   - When the user opens the app, the engine reads the text, converts it to an AST (Abstract Syntax Tree), and compiles it into machine code on-the-fly. 
   - *Pros:* Can optimize hot-loops during runtime. 
   - *Cons:* Extremely slow app startup times because the CPU is heavily taxed compiling code before the UI can render.

2. **AOT (Hermes):** 
   - The JavaScript is compiled into bytecode during the CI/CD build process (e.g., when you run `./gradlew assembleRelease`).
   - The app ships with this pre-compiled binary.
   - When the user opens the app, the engine just reads and executes the binary instructions directly.
   - *Pros:* Blazing fast startup, lower memory usage, smaller binary.
   - *Cons:* Slower build times on the developer's machine (acceptable trade-off).

**Key Takeaway:**
AOT moves the computational cost of compilation away from the user's battery and CPU, placing it onto the developer's build server.

---

## 5. How do you profile JS thread performance vs. UI thread performance?

**Concept:**
When an app feels slow, you must isolate whether the bottleneck is JavaScript computation or Native rendering.

**Answer:**
1. **The Performance Monitor (In-App):** 
   Open the dev menu and enable \"Show Perf Monitor\". You will see two numbers: JS FPS and UI FPS.
   - If **UI FPS drops**, the problem is too many views being rendered (e.g., deep component nesting, large unoptimized images, complex shadows). Fix: Use `useMemo`, flatten UI hierarchies, use FastImage.
   - If **JS FPS drops**, the problem is heavy synchronous computation blocking the bridge (e.g., parsing a 5MB JSON string, massive `reduce` loops, complex re-renders). Fix: Move computations to Web Workers / Reanimated Worklets, or use `InteractionManager.runAfterInteractions`.

2. **React DevTools Profiler:** 
   Record a session to see exactly which React components took the longest to render and *why* they re-rendered (e.g., \"Hook 1 changed\").

3. **Hermes Profiler / Chrome Tracing:** 
   Connect Chrome DevTools to the Hermes engine and record a CPU trace. This shows a flame chart of exact JavaScript function calls, helping you identify if a specific `sort()` or `map()` operation is eating CPU cycles.

**Key Takeaway:**
Always use the Perf Monitor to isolate the thread (JS vs. UI) before attempting to optimize. Blindly memoizing components won't fix a JS thread blocked by a heavy JSON parse.
