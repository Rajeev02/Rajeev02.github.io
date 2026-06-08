## 🗑️ Section 2: Memory Management & Garbage Collection

*⏱️ 1 min read*

#### 1. Hermes Mark-and-Sweep Garbage Collection
React Native's Hermes engine manages memory using a **Mark-and-Sweep Garbage Collector (GC)**:
1. **Mark Phase**: The GC starts from global root objects (window context, active closures, execution stack references) and traverses all reference pointers recursively. Every object reached is "marked" as active (reachable).
2. **Sweep Phase**: The GC scans the heap memory space. Any object that does not contain an active mark is considered unreachable (dead) and its allocated memory space is reclaimed (swept).

#### 2. Identifying & Diagnosing Memory Leaks
A memory leak occurs when variables or objects that are no longer needed by the app logic are still referenced by a root container, preventing the Garbage Collector from sweeping them.

##### Typical JS Memory Leak Scenarios:
- **LINGERING TIMERS/INTERVALS**: Creating a `setInterval` inside a React component without calling `clearInterval` during unmounting. The interval callback closure continues running, retaining references to all component state variables.
  - *Example*:
    ```javascript
    // ❌ LEAK: Missing clearInterval on unmount
    useEffect(() => {
      setInterval(() => { console.log("Timer ticking..."); }, 1000);
    }, []);

    // ✅ FIX: Clean up the interval using return cleanup function
    useEffect(() => {
      const id = setInterval(() => { console.log("Timer ticking..."); }, 1000);
      return () => clearInterval(id);
    }, []);
    ```
- **UNREMOVED EVENT LISTENERS**: Registering global listeners (e.g., `DeviceEventEmitter`, `AppState.addEventListener`, or custom event dispatchers) and failing to call `.remove()` in the cleanup block.
  - *Example*:
    ```javascript
    // ❌ LEAK: window listener remains attached after component unmounts
    useEffect(() => {
      window.addEventListener("resize", handleResize);
    }, []);

    // ✅ FIX: Clean up the event listener
    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    ```
- **CLOSURE LEAKS**: Outer scopes holding large arrays or references that are trapped by long-lived inner functions.
- **GLOBAL VARIABLES**: Accidentally attaching large objects or lists to the global `global` or `window` scope.
  - *Example*:
    ```javascript
    // ❌ LEAK: Attaching big data to global object
    function processData() {
      global.leakData = new Array(1000000).fill("Data");
    }
    ```

---


---
