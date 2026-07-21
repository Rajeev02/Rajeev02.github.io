# Volume 8 – Set 16 – Native Modules & JSI

## 1. What is the React Native Bridge and what are its primary limitations?

**Concept:**
Historically, React Native used the "Bridge" to communicate between the JavaScript thread and the Native (Java/Objective-C) threads.

**Answer:**
The Bridge is an asynchronous message-passing queue. 
When JS wants to tell a native view to render, it serializes the command into a JSON string, sends it across the bridge, and the native side deserializes it and executes it.

**Limitations:**
1. **Asynchronous**: Because the bridge is async, JS can never ask for native data and get it synchronously on the exact same frame. This causes issues in highly interactive UI (like dragging a slider and having a native view react instantly), often resulting in 1-frame lags.
2. **Serialization Overhead**: Converting large objects (like base64 image strings or large arrays) to JSON strings, sending them across the bridge, and parsing them on the native side is extremely CPU intensive and slow.
3. **Batched Execution**: The bridge batches messages. If the JS thread is busy calculating heavy logic, the bridge gets blocked, meaning UI updates (which happen on the native UI thread) wait in the queue, causing visual stuttering.

**Key Takeaway:**
The Bridge was the foundational innovation of React Native, but its async JSON-serialization model is the root cause of almost all classic React Native performance bottlenecks.

---

## 2. What is JSI (JavaScript Interface) and how does it solve the Bridge's problems?

**Concept:**
JSI is the core engine of the React Native New Architecture. It completely replaces the old JSON Bridge.

**Answer:**
JSI is a lightweight C++ interface that allows JavaScript to hold direct references to C++ Host Objects.

Instead of serializing a message into JSON and throwing it over a bridge:
1. **Synchronous Execution**: JSI allows JS code to call a C++ or Native method synchronously. `const result = nativeModule.doMath(5)`. The JS thread waits for the result exactly like a normal function call.
2. **Direct Memory Access (Zero Serialization)**: JSI allows JS and Native code to share memory. Instead of copying a 5MB image string over the bridge, Native creates the image in memory, gives JS a C++ pointer to that memory address, and JS reads it instantly. No JSON serialization overhead.
3. **Engine Agnostic**: JSI standardizes the interface, meaning React Native can swap out the JavaScript Engine (Hermes vs JSC vs V8) easily as long as the engine implements JSI.

**Key Takeaway:**
JSI brings React Native performance incredibly close to pure native performance by eliminating serialization and enabling synchronous, shared-memory communication.

---

## 3. How do you create a custom Native Module in the Old Architecture?

**Concept:**
Sometimes you need to access device hardware (e.g., a specific Bluetooth printer SDK) that doesn't have an open-source React Native wrapper.

**Answer:**
To create a custom Native Module using the Bridge:

1. **Android (Java/Kotlin)**:
   - Create a class that extends `ReactContextBaseJavaModule`.
   - Override `getName()` to expose the module name to JS.
   - Annotate methods with `@ReactMethod`.
   - Use `Promise` or `Callback` parameters because bridge methods are strictly asynchronous.
   - Register the module in a `ReactPackage` and add it to `MainApplication.java`.

2. **iOS (Objective-C/Swift)**:
   - Create a class that implements the `RCTBridgeModule` protocol.
   - Use the `RCT_EXPORT_MODULE()` macro to expose it.
   - Use `RCT_EXPORT_METHOD()` to expose functions to JS, again using callbacks or promises.

3. **JavaScript**:
   - Access it via `NativeModules.MyCustomModule`.

**Key Takeaway:**
While writing the native code is required, the hardest part is strictly managing data types. Only primitive types and dictionaries (maps) can be passed across the bridge.

---

## 4. What is TurboModules and how does it relate to JSI?

**Concept:**
TurboModules is the evolution of Native Modules in the New Architecture, built directly on top of JSI.

**Answer:**
Under the old architecture, every single Native Module (Bluetooth, Camera, AsyncStorage) had to be initialized immediately when the app launched, severely slowing down app startup times.

**TurboModules solve this through Lazy Loading.**
Because TurboModules use JSI, the JavaScript code can synchronously ask the C++ layer for a module only exactly at the moment it is needed. If the user never opens the Camera screen, the Camera native code is never loaded into memory.

Furthermore, TurboModules use **Codegen**. As a developer, you write a strict TypeScript (or Flow) interface defining your module's methods and types. The Codegen tool automatically generates the C++ boilerplate code, guaranteeing type safety between JavaScript and Native code at compile-time.

**Key Takeaway:**
TurboModules = JSI + Lazy Loading + Compile-time Type Safety via Codegen.

---

## 5. Explain how React Native Reanimated achieves 60FPS animations despite the JS thread.

**Concept:**
Standard `Animated` in React Native calculates animation frames on the JS thread and sends updates over the bridge to the Native UI thread, causing lag if the JS thread is busy doing business logic.

**Answer:**
`react-native-reanimated` (specifically v2 and v3) bypasses the JS thread entirely for animation calculations.

It does this using **Worklets** and **JSI**.
1. **Worklets**: Reanimated takes your small animation functions (worklets) written in JavaScript, extracts them, and runs them on a secondary, dedicated JS runtime that lives directly on the UI Thread.
2. **JSI**: It uses JSI to synchronously read and write layout properties (like `translateX`) to native views from this UI-thread runtime without ever using the bridge.

Because the worklet runs on the UI thread, it operates perfectly in sync with the screen's refresh rate (60FPS or 120FPS). Even if the main React JS thread is locked up calculating a massive array, the animation remains buttery smooth.

**Key Takeaway:**
Reanimated proved the power of JSI long before the rest of the New Architecture was stable, demonstrating that bypassing the bridge leads to flawless UI performance.
