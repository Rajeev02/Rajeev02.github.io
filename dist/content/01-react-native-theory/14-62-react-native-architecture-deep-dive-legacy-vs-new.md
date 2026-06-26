> 🎯 **Topic:** 6.2 🏗️ React Native Architecture Deep Dive (Legacy vs. New)
> 📊 **Difficulty:** Hard | 🔄 **Interview Frequency:** Very High
> 🏷️ **Tags:** 🔥 Must Revise • ⭐ Architecture • 💼 Product Company Favorite

---

## 6.2 🏗️ React Native Architecture Deep Dive (Legacy vs. New)

### 1. Introduction to React Native Threads
At its core, a React Native app is a native mobile application that hosts a JavaScript runtime. To function without freezing the user interface, it distributes work across multiple concurrent threads.

#### The Legacy Threading Model
In the legacy architecture, there are three primary threads running simultaneously:
1. **The JavaScript Thread (JS Thread)**: 
   - This is where the React engine executes. All your business logic, API calls, state management, and React component lifecycle methods run here.
   - It computes the Virtual DOM diffs and generates a batch of UI updates.
2. **The Main / UI Thread (Native Thread)**:
   - This is the host platform's main thread (Objective-C/Swift on iOS, Java/Kotlin on Android).
   - It is responsible for rendering the actual native UI elements on the screen and capturing user inputs (like taps, swipes, and scroll events).
3. **The Shadow Thread (Layout Thread)**:
   - React Native uses a custom layout engine written in C++ called **Yoga** to calculate flexbox layouts.
   - When the JS Thread sends UI changes, they are intercepted by the Shadow Thread. The Shadow Thread uses Yoga to calculate the exact X, Y, Width, and Height coordinates of every element before passing this exact mathematical layout to the Main UI Thread for rendering.

### 2. The Legacy Bridge Architecture
The component that connects these threads is **The Bridge**.

- **How it works**: The JS Thread and Native Thread never speak directly to each other. They communicate by serializing messages into JSON strings, passing them across the asynchronous Bridge, and deserializing them on the other side.
- **The Bottleneck**: Because communication is **asynchronous** and requires **JSON serialization/deserialization**, passing large amounts of data (like base64 images) or rapid events (like 60fps scroll tracking) causes massive traffic jams. If the Bridge is overloaded, the UI thread drops frames, leading to a sluggish "janky" experience.

### 3. The New Architecture: A Paradigm Shift
To solve the Bridge bottleneck, Meta completely overhauled the architecture to enable direct, synchronous communication. This relies on four key pillars:

#### 1. JSI (JavaScript Interface)
JSI is the foundational C++ layer of the New Architecture. 
- It replaces the Bridge.
- It allows the JavaScript runtime (like Hermes) to hold direct references to C++ Host Objects. 
- Instead of serializing data to JSON and sending it over an asynchronous queue, JS can now invoke native C++ functions **synchronously** in real-time, just like calling a regular JS function.

#### 2. Fabric (New Rendering Engine)
Fabric replaces the legacy UI Manager and Shadow Thread workflow.
- **Direct Layouts**: With JSI, the JS thread can now communicate layout changes directly to the Native UI without passing JSON over the Bridge.
- **Concurrent React**: Fabric enables true React 18 Concurrent Features (like `useTransition` and `Suspense`) in React Native. It allows interrupting low-priority renders to process high-priority user interactions immediately.

#### 3. TurboModules
TurboModules replace legacy Native Modules.
- In the old architecture, all native modules (Camera, Bluetooth, Location) were initialized at startup, slowing down app launch time.
- **Lazy Loading**: TurboModules leverage JSI to lazy-load. The native code is only loaded into memory and initialized at the exact moment JavaScript explicitly invokes it, dramatically improving App Startup times.

#### 4. Codegen
Because JS is dynamically typed and C++ is strongly typed, direct JSI communication risks crashing the app if there's a type mismatch.
- **Codegen** reads TypeScript (or Flow) definitions and automatically generates strongly-typed C++ boilerplate code during the build process.
- This ensures absolute type safety between JavaScript and Native boundaries, catching errors at compile-time rather than runtime.

### 5. Bridgeless Mode
Introduced fully in React Native 0.73+, Bridgeless Mode is the final step of the New Architecture. 
- Even with Fabric and TurboModules enabled, older versions of React Native still booted up the legacy Bridge in the background as a fallback for outdated third-party packages.
- **Bridgeless Mode** prevents the `RCTBridge` from initializing completely, saving memory and startup time. It relies entirely on JSI for all operations, forcing native dependencies to adapt or use the new interop layer.

### 6. Summary Comparison Matrix

| Feature | Legacy Architecture | New Architecture |
| :--- | :--- | :--- |
| **Communication** | Asynchronous JSON Bridge | Synchronous JSI (C++ Direct References) |
| **UI Rendering** | UIManager + Shadow Thread (Batched) | Fabric (Direct, Concurrent, Synchronous) |
| **Native Modules** | Initialized entirely on App Startup | TurboModules (Lazy Loaded on demand) |
| **Type Safety** | Loose (Runtime Errors common) | Strict (Compile-time via Codegen) |
| **Animation/Scrolls** | Prone to lag/jank if Bridge is blocked | Smooth 60/120fps due to direct JSI calls |

---
