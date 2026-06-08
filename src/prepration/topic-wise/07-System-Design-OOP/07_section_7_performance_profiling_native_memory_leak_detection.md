
## Page Summary
### Reading Time
`2 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🧪 Section 7: Performance Profiling & Native Memory Leak Detection |
| Difficulty | Senior / Lead |
| Interview Frequency | High |
| Tags | 🔥 Must Revise |

---


## 🧪 Section 7: Performance Profiling & Native Memory Leak Detection

*⏱️ 1 min read*

#### 1. Diagnostic Profilers
When users report sluggish rendering or crashes, use these tools to diagnose the cause:
- **Flipper (Performance Logs & Layout)**:
  - Profile the React component tree and inspect state updates.
  - Analyze network traffic and track database queries.
- **Xcode Instruments (iOS Profiling)**:
  - **Allocations**: Monitor RAM memory footprint over time.
  - **Leaks**: Detect object allocations that remain in memory after they are no longer needed.
- **Android Profiler (Android Studio)**:
  - Track CPU usage and inspect thread scheduling.
  - Monitor memory usage to identify staircase-like RAM patterns (indicates memory leaks).

---

#### 2. Finding & Fixing Memory Leaks
Memory leaks in React Native usually occur in the bridge layer between JavaScript and Native memory:
- **Symptom**: Memory usage increases continuously as you navigate back and forth between screens, never returning to its baseline.
- **Common Cause: Uncleaned event listeners**:
  ```javascript
  // ❌ LEAK: AppState listener remains in memory after component unmounts
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  // ✅ FIX: Clean up the event listener
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);
  ```
- **Common Cause: Retained UI View Nodes (Flipper/Leaks)**:
  If a native view is unmounted in JS but remains referenced by a native pointer, it will leak memory. Use Xcode Instruments to trace the retain graph and locate the dangling reference.

---

#### 3. State Management Libraries Comparison

- **Redux Toolkit (RTK)**:
  - **Type**: Global Centralized Store.
  - **Mechanism**: Predictable state updates using actions and reducers.
  - **Best For**: Large-scale client-side UI configurations, user settings, and complex forms.
- **MobX (Observable State)**:
  - **Type**: Reactive / Mutable State.
  - **Mechanism**: Uses observables and reactions. Automatically updates UI components when variables they depend on change.
  - **Best For**: Complex nested relationships requiring high-frequency updates (e.g. Real-time mapping).
- **Recoil / Jotai**:
  - **Type**: Atomic State.
  - **Mechanism**: Uses small, isolated pieces of state (atoms) that can be combined and updated independently.
  - **Best For**: Large apps requiring fine-grained updates without re-rendering the entire component tree.

---


---
