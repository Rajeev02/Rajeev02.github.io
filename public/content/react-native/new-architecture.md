> 🎯 **Topic:** React Native New Architecture Deep Dive (Fabric, TurboModules, CodeGen, JSI)
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** Very High
> 🏷️ **Tags:** ⭐ Frequently Asked, Architecture, Lead Level

---

## The New React Native Architecture: A Comprehensive Deep Dive

*⏱️ 30 min read*

### 1. Introduction and The Motivation for Change

Since its inception, React Native has revolutionized cross-platform development by allowing developers to write JavaScript that renders native UI components on iOS and Android. However, as applications scaled to enterprise levels, developers encountered performance bottlenecks, primarily due to the **Bridge**.

In 2018, the React Native core team embarked on a massive re-architecture project. The goal was to remove the Bridge entirely, allow synchronous communication, and bring the framework up to par with modern Native performance standards.

---

### 2. The Legacy Architecture: The Bridge

To understand the new architecture, we must first deeply understand the flaws of the old one.

The legacy architecture consists of three main threads:
1. **The JS Thread:** Where your React and JavaScript code runs (via JSC or Hermes).
2. **The Native UI Thread:** The main thread of the iOS/Android device, responsible for drawing views and handling user input.
3. **The Background/Shadow Thread:** Where React Native calculates layout (using Yoga).

**The Communication Bottleneck:**
Whenever the JS thread wanted to update the UI (e.g., changing a View's background color) or access a Native Module (e.g., getting GPS coordinates), it had to pass a message over the **Bridge**.

1. **Asynchronous:** Messages were queued, batched, and sent asynchronously.
2. **Serialized:** Data had to be serialized into a JSON string on one side and deserialized on the other. 

**The Resulting Problems:**
- **The "White Flash" / Tearing:** If navigating to a complex screen, the JS thread sends a massive serialized JSON payload over the bridge. If the Native thread can't deserialize it fast enough to draw the next frame (within 16ms), the user sees dropped frames or a blank white screen.
- **No Synchronous Access:** You couldn't synchronously call a native method and immediately get a result. Everything required a callback or a Promise.
- **Slow Startup:** All Native Modules (Bluetooth, Camera, AsyncStorage, etc.) had to be initialized and linked to the bridge when the app launched, regardless of whether the user actually opened those features.

---

### 3. The Core of the New Architecture: JSI (JavaScript Interface)

The foundation of the entire new architecture is **JSI**.

JSI is a lightweight, general-purpose C++ API that acts as an interface between the JavaScript engine and native C++ code.

**How JSI changes the game:**
- **No More Bridge:** JSI eliminates the need for JSON serialization.
- **Direct Memory Access:** JSI allows JavaScript to hold direct references to C++ Host Objects. 
- **Synchronous Execution:** Because JavaScript holds a direct memory pointer to the C++ object, a JavaScript function can invoke a C++ method synchronously, just as if it were a normal JavaScript object method.

*Think of JSI as the new nervous system of React Native. It connects the JS brain directly to the Native muscles.*

---

### 4. Fabric: The New UI Rendering Engine

Fabric is the new concurrent UI rendering system, built on top of JSI.

In the old architecture, UI updates were asynchronous. React would calculate the virtual DOM, send a batch of UI update commands over the bridge, and eventually, the Native UI thread would execute them.

**How Fabric works:**
1. React determines a state change.
2. Through JSI, the JS thread directly creates a **C++ Shadow Tree**.
3. C++ immediately translates this Shadow Tree into Native UI commands.
4. The Native UI thread is commanded to update **synchronously**.

**Benefits of Fabric:**
- **Synchronous Layout:** Fabric enables layout calculations to happen synchronously. If a user swipes or types rapidly, the UI updates instantly without lagging behind the JS thread.
- **React 18 Concurrent Features:** Fabric is fully compatible with React 18's concurrent features, such as `useTransition` and `Suspense`. It allows React to pause rendering a heavy screen, prioritize a user click, and then resume rendering the screen.
- **Shared Memory:** The C++ Shadow tree is shared directly in memory, reducing the overall memory footprint of the app compared to the old JSON-heavy bridge.

---

### 5. TurboModules: Next-Generation Native Modules

TurboModules replace the legacy Native Modules system, fixing the app startup bottleneck.

**How TurboModules work:**
- **Lazy Initialization:** In the old architecture, all native modules were initialized eagerly at launch. TurboModules are initialized **lazily**. The native code for the Camera module is only loaded into memory at the exact millisecond you import and invoke it in JavaScript.
- **JSI Integration:** Because TurboModules are powered by JSI, function calls are synchronous. You can ask the native side for the device battery level and receive the number immediately without awaiting a Promise.

---

### 6. CodeGen: Ensuring Type Safety

With JSI, JS and Native code (C++, Objective-C, Java) are communicating rapidly. A type mismatch (e.g., JS sending a String when Native expects an Integer) will cause an immediate and catastrophic native crash.

**CodeGen** was introduced to solve this.
1. You write your Native Module or UI Component specification in **TypeScript** or **Flow**.
2. During the build process (when you run `npm run ios` or `gradlew assembleRelease`), CodeGen reads these TypeScript files.
3. It automatically generates strongly-typed C++, Objective-C++, and Java/Kotlin boilerplate interfaces.
4. The developer only needs to fill in the actual implementation details.

**Benefits of CodeGen:**
- Guarantees compile-time type safety across the JS/Native boundary.
- Eliminates human error in writing boilerplate bridging code.
- Ensures the native implementations strictly adhere to the JavaScript contract.

---

### 7. Migration and Interoperability

Migrating an entire ecosystem of thousands of React Native libraries is a monumental task.

To facilitate this, the React Native team built a **backward compatibility layer**.
- If your app has the New Architecture enabled, but you are using an older library that still relies on the Bridge, React Native wraps that library in an interop layer.
- The library will still function correctly (using the Bridge in the background) while the rest of your app enjoys the benefits of Fabric and TurboModules.

However, to unlock the true performance gains of the New Architecture, your app should aim to use libraries that have been fully migrated to Fabric/TurboModules.

---

### Interview Questions & Answers

#### Q1. Describe the journey of a UI update in the Old Architecture vs. the New Architecture.
**Answer:**
**Old:** React triggers an update -> JS thread calculates virtual DOM differences -> Yoga calculates layout -> JS serializes the update commands to a JSON string -> JSON is sent across the async Bridge -> Native thread deserializes the JSON -> Native thread updates the UI.
**New:** React triggers an update -> JS uses JSI to directly call C++ methods -> C++ updates the shared Shadow Tree synchronously -> Native UI thread updates immediately.

#### Q2. Can you explain the difference between asynchronous and synchronous communication across the JS/Native boundary, and why it matters?
**Answer:**
Asynchronous communication (The Bridge) means the sender (JS) fires a message and continues execution without waiting for a reply, resulting in UI updates lagging behind user input if the queue is congested. Synchronous communication (JSI) means the JS thread halts execution for a fraction of a millisecond to directly execute the native C++ function, receiving the result instantly. This is crucial for high-priority UI updates (like scrolling a list) that need to be processed before the next screen refresh (16ms) to maintain 60 FPS.

#### Q3. What is the role of C++ in the new architecture?
**Answer:**
C++ acts as the universal language and glue between the JavaScript engine (Hermes) and the platform-specific native code (Objective-C for iOS, Java/Kotlin for Android). By writing the core layout engine (Fabric) and interfaces (JSI) in C++, React Native achieves massive performance gains through shared memory pointers and avoids writing the same logic twice for two different operating systems.

#### Q4. If I enable the New Architecture, why doesn't my app magically become twice as fast immediately?
**Answer:**
The New Architecture provides a much faster highway (JSI) and a better engine (Fabric/TurboModules). However, if your JavaScript code is poorly written (e.g., massive unnecessary re-renders, anonymous functions in `FlatList`), the JS thread will still choke. Furthermore, if you are utilizing heavy third-party libraries that haven't been rewritten to support TurboModules, they will fall back to the compatibility bridge layer, negating some of the performance benefits.

#### Q5. How does Hermes complement the New Architecture?
**Answer:**
Hermes is an engine optimized for React Native. Unlike V8, which focuses on raw throughput (JIT compilation) at the cost of memory, Hermes focuses on Ahead-Of-Time (AOT) compilation. It pre-compiles your JS into bytecode during the build phase, resulting in incredibly fast app startup times and a smaller memory footprint. JSI was actually designed specifically with Hermes integration in mind, making direct C++ method invocation highly optimized.
