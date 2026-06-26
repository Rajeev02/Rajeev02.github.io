> 🎯 **Topic:** React Native New Architecture (Fabric & TurboModules)
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** Very High
> 🏷️ **Tags:** ⭐ Frequently Asked, Architecture

---

## 55. React Native New Architecture: Why and How?

*⏱️ 8 min read*

### Overview: The Old Architecture
In the Old Architecture, React Native relied on a **Bridge** to communicate between the JavaScript thread and the Native threads (UI and Background). 
- The Bridge used asynchronous JSON serialization/deserialization to pass messages.
- **Drawbacks:** Since communication was asynchronous and batched, it caused bottlenecks. Large payloads (like complex animations or large lists) led to dropped frames and "white flashes" because the JS thread couldn't instruct the UI thread fast enough.

### The New Architecture (JSI, Fabric, TurboModules)
The New Architecture eliminates the Bridge entirely and replaces it with **JSI (JavaScript Interface)**.
- **JSI:** Allows JavaScript to hold direct references to C++ host objects. JS can invoke methods on native modules synchronously without JSON serialization.
- **Fabric:** The new concurrent rendering system (UI layer). It allows UI operations to be executed synchronously, fixing layout jumps and enabling React 18 Concurrent Mode (e.g., `useTransition`).
- **TurboModules:** The new native modules system. Instead of loading all native modules at startup, TurboModules are initialized lazily (on-demand), significantly improving app startup time.

---

### Interview Questions & Answers

#### Q1. Why did React Native move away from the Bridge to JSI?
**Answer:**
The Bridge relied on asynchronous JSON serialization, creating a massive bottleneck for high-frequency updates like animations, scrolling, or gestures. By moving to JSI, JavaScript can directly invoke C++ methods synchronously using memory pointers. This eliminates the serialization overhead, allows synchronous execution, and enables sharing memory directly between JS and Native.

#### Q2. What is Fabric, and how does it improve UI rendering?
**Answer:**
Fabric is the new rendering engine. In the old architecture, layout calculations (Yoga) happened asynchronously over the bridge. Fabric allows UI creation and layout to happen synchronously. If a high-priority UI update is needed (like a user typing or scrolling), Fabric can preempt lower-priority tasks, ensuring 60FPS and eliminating the infamous "white flash" when navigating.

#### Q3. How do TurboModules improve app startup time?
**Answer:**
In the legacy architecture, all native modules (Bluetooth, Camera, AsyncStorage, etc.) had to be initialized and linked to the Bridge during app startup, even if the user never opened those features. TurboModules allow native modules to be lazily loaded. They are only initialized into memory the exact moment JavaScript calls them, dramatically reducing the Time To Interactive (TTI).

#### Q4. What is CodeGen in the context of the New Architecture?
**Answer:**
CodeGen is a build tool that parses TypeScript (or Flow) definitions and generates strongly-typed C++, Objective-C++, and Java/Kotlin interfaces. This guarantees type safety between JavaScript and Native code at compile time, eliminating runtime type mismatch crashes.

#### Q5. Can we use both the Old and New Architecture simultaneously?
**Answer:**
Yes, through a backward compatibility layer. However, to get the full performance benefits, libraries must be fully migrated to TurboModules and Fabric. Until they are, React Native wraps legacy modules in an interop layer, which adds a slight overhead but ensures your app doesn't break during migration.
