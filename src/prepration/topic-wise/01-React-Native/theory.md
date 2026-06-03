## 🏗️ Section 1: Core Architecture (Legacy vs. New Architecture)

React Native's runtime environment has undergone a complete architectural rewrite. To show senior-level engineering depth, you must contrast the legacy JSON Bridge model with the modern JSI-based New Architecture.

### 1. The Legacy Bridge Architecture
Historically, React Native relied on three main threads:
- **JavaScript Thread**: Executes the compiled JS/TS application code (React components, business logic).
- **Native UI Thread (Main Thread)**: Handles native OS rendering (Android Views, iOS UIKit), layouts, and user interactions.
- **Shadow Thread**: Computes Flexbox layout dimensions using the Yoga engine before passing them to the Native thread.

**The Bottleneck**: Communication between the JS Thread and the Native Thread was governed by **The Bridge**. 
- Whenever data or UI actions passed between layers, they had to be serialized into JSON strings, sent asynchronously over the bridge, and deserialized on the other side.
- This asynchronous, batch-based serialization created severe performance bottlenecks for high-frequency interactions such as rapid list scrolling, gestures, native animations, and input validation. If the bridge was flooded, the UI thread lagged behind, causing visual stuttering and frame drops.

---

### 2. The New Architecture (JSI, TurboModules, Fabric)
The New Architecture eliminates the asynchronous JSON bridge entirely, replacing it with direct memory bindings.

#### JavaScript Interface (JSI)
- **JSI** is a lightweight C++ abstraction layer that allows the JavaScript engine (Hermes) to hold direct references to host native C++ objects.
- JavaScript can invoke methods directly on native objects synchronously, without JSON serialization or thread jumping. It enables a unified execution context where JS and Native run side-by-side.

#### TurboModules (Native Modules Reborn)
- In the legacy model, all native modules (e.g., Camera, Bluetooth, Storage) were initialized eagerly at app startup, regardless of whether the user accessed them. This bloated app launch time.
- **TurboModules** leverage JSI to lazy-load native libraries. They are only initialized and loaded into memory when explicitly invoked by the JavaScript code, significantly reducing app startup latency.

#### Fabric Rendering Engine
- Fabric is the concurrent rendering engine that replaces the legacy UIManager.
- Fabric computes UI layout changes inside C++ and commits them directly to the native OS layout thread. Because JSI allows synchronous access, Fabric can execute UI mutations instantly on the main thread, eliminating layout jumps and flickering (e.g., during rapid scroll views).
- Fabric supports React 18 concurrent features (like transitions and updates prioritization).

#### Codegen (Type-Safety Guarantee)
- Codegen is a build-time compiler tool that reads your TypeScript interfaces (which define the contract between JavaScript and native modules) and automatically generates the corresponding C++ binding code.
- If a developer attempts to pass an invalid type parameter from JavaScript (e.g., passing an array instead of a string to a native function), the build fails immediately in the CI pipeline. This guarantees runtime type-safety across the JavaScript-native boundary.

---

## 🎨 Section 2: Layout, Flexbox & styling (Yoga Engine)

### 1. Yoga Layout Engine
React Native does not compile to HTML/CSS. Instead, it embeds **Yoga**, a custom C++ layout engine that translates a subset of Flexbox rules into native Android and iOS view layouts.

### 2. Flexbox Behavior Differences in React Native vs. Web
While Yoga mirrors Web Flexbox, there are critical default configuration differences:
- **`flexDirection` Defaults to `column`**: On the web, divs default to `row`. In React Native, flex containers default to `column`.
- **No Unit Values**: Dimensions and margins are specified as raw numbers representing **Density-Independent Pixels (dp)** on Android or **Points (pt)** on iOS. You cannot use `%` (except in specific stylesheet rules), `vh`, `vw`, or `em`.
- **`boxSizing` is Locked to `border-box`**: All layouts calculate widths and heights inclusive of padding and borders.
- **`flex` Interpretation**: On the web, `flex` accepts multiple parameters (grow, shrink, basis). In React Native, `flex` is a single number. `flex: 1` means "fill all available space".

### 3. Axis Alignment Guide
Alignment behavior depends entirely on the parent's `flexDirection`:

```text
If flexDirection = 'column' (Default)
  - Main Axis: Vertical ↕️   (Controlled by justifyContent)
  - Cross Axis: Horizontal ↔️ (Controlled by alignItems)

If flexDirection = 'row'
  - Main Axis: Horizontal ↔️ (Controlled by justifyContent)
  - Cross Axis: Vertical ↕️   (Controlled by alignItems)
```

- **`justifyContent`**: Aligns items along the **Main Axis** (options: `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`).
- **`alignItems`**: Aligns items along the **Cross Axis** (options: `flex-start`, `center`, `flex-end`, `stretch` [default]).

---

## 🔌 Section 3: Custom Native Modules & Expo CNG

### 1. Implementing Custom Native Modules
When a feature requires native OS hardware interfaces, background services, or proprietary native SDKs (e.g., payment gateways, secure enclaves), you write a custom native module to bridge the JavaScript and Native domains.

#### Native Android Module (Kotlin/Java)
1. **Define the Module**: Create a class extending `ReactContextBaseJavaModule` (Java) or implementing the interface in Kotlin.
2. **Register Methods**: Annotate methods with `@ReactMethod` to expose them to JavaScript.
3. **Register the Package**: Implement `ReactPackage` to map the module.
4. **Export to JS**: Access via `NativeModules.MyCustomModule` in JS.

#### Native iOS Module (Swift/Objective-C)
1. **Objective-C Bridge**: iOS bridging requires an Objective-C wrapper since the React Native runtime is written in C++.
2. **Define in Swift**: Create a Swift class subclassing `NSObject` and using `@objc`.
3. **Export macros**: Create an Objective-C file calling `RCT_EXPORT_MODULE()` and `RCT_EXPORT_METHOD()` to register the Swift signatures.

#### Dispatching Native Events (Asynchronous Calls)
To stream data asynchronously from Native to JS (e.g., continuous GPS coordinates or network connectivity state updates), you do not use standard callbacks. Instead, you send native event updates using:
- **Android**: `DeviceEventEmitter` using `reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("EventName", payload)`
- **iOS**: Subclassing `RCTEventEmitter` and calling `sendEventWithName("EventName", body)`

### 2. Expo Continuous Native Generation (CNG)
In modern Expo projects, developers do not manually edit the `/android` and `/ios` native directories. Instead, they treat them as build artifacts that are generated dynamically.
- **`npx expo prebuild`** reads the project configuration in `app.json` and generates clean native directories on the fly.
- **Expo Config Plugins**: To configure native settings (like modifying `AndroidManifest.xml`, registering permissions, or adding custom CocoaPods settings), you write a JavaScript setup file called a Config Plugin. During prebuild, Expo runs this plugin to programmatically inject the native modifications, keeping your primary code repository 100% universal and folderless.

---

## 📦 Section 4: App Compilation, Metro & Babel

The lifecycle of React Native code from a local developer laptop to a compiled production app follows a structured compilation pipeline.

```text
[Source JS/TS Code] 
        ⬇️
    (Babel) ➡️ Transpiles syntax, strips TS annotations
        ⬇️
    (Metro) ➡️ Resolves dependencies, aggregates into a singular bundle
        ⬇️
  (Hermes compiler) ➡️ Compiles bundle into bytecode (.hbc)
        ⬇️
[Native APK/IPA Assembly]
```

### 1. Babel (Transpilation Phase)
Babel parses JS/TS files and converts the code into an Abstract Syntax Tree (AST). It then applies presets (e.g., `@babel/preset-typescript`, `metro-react-native-babel-preset`) to:
- Strip TypeScript annotations.
- Convert JSX tags into standard `React.createElement` functions.
- Transpile modern ES6+ JS features into backward-compatible ES5 code.

### 2. Metro Bundler (Packaging Phase)
Metro is the dedicated bundler for React Native. It runs in three distinct steps:
1. **Resolution**: Metro constructs a dependency graph by scanning all `import` and `require` statements starting from `index.js`.
2. **Transformation**: Calls Babel to transpile individual source files.
3. **Serialization**: Combines all transformed source files into a single, massive JavaScript bundle file (e.g., `index.bundle`).

### 3. Hermes Compilation (Production Phase)
For release builds, React Native uses **Hermes**, a lightweight JS engine optimized for mobile devices.
- Instead of downloading and parsing raw JavaScript text at runtime (which consumes CPU and slows app launch), Hermes pre-compiles the JavaScript bundle into optimized **bytecode** during the build phase.
- The compiled APK (Android) or IPA (iOS) ships with this `.hbc` binary file, which the Hermes engine executes immediately upon launch, resulting in faster startup times, reduced memory usage, and smaller bundle sizes.

---

## ⚡ Section 5: List Optimization & Memory Profiling

### 1. Virtualized List Optimizations
Displaying massive datasets (e.g., a ledger of 50,000 transactions in a fintech app) will instantly crash the app if rendered inside a standard ScrollView. ScrollView mounts all items immediately, flooding native memory.
To optimize list structures, you configure virtualized layouts (`FlatList` or Shopify `FlashList`):

- **Row Recycling**: Shopify `FlashList` recycles cell container views as they scroll off-screen, swapping only the underlying data rather than destroying and creating native views.
- **`initialNumToRender`**: Renders only a small subset of items initially to speed up the initial mount.
- **`windowSize`**: Restricts the off-screen rendering bounds (the number of screens' worth of items rendered above/below the fold). Keeping this small (e.g., 5) reduces memory pressure.
- **`removeClippedSubviews`**: Dynamically unloads off-screen views from native memory buffers.
- **`getItemLayout`**: If row heights are fixed, passing this property tells the layout engine the exact offset coordinates of every row. This completely saves the CPU from measuring views dynamically.

### 2. Memory Leak Auditing Pipeline
Memory leaks occur when the JS engine (Hermes) cannot clean up dead objects during its **Mark-and-Sweep Garbage Collection** cycle because strong references remain in active queues.

#### Diagnostic Steps:
1. **Heap Snapshot Comparisons**: Open Chrome DevTools hooked into the Hermes execution thread. Capture Snapshot A at screen init and Snapshot B after performing actions (like scrolling or opening/closing pages). Filter by allocation differences to locate variables that are not being collected.
2. **Native Memory Profiling**: Use **Android Studio Profiler (Memory)** or **Xcode Instruments (Allocations/Leaks)** to watch the native memory heap. A rising, staircase-like memory graph indicates that views or native allocations are leaking.
3. **Common Culprits**:
   - Long-running `setInterval` timers or event listeners (`DeviceEventEmitter`, `NetInfo`) initialized inside `useEffect` without returning a proper cleanup method.
   - Retaining static references inside global Redux stores.
   - Retaining un-recycled DOM/native views due to large scroll containers.

---

## 🔒 Section 6: Release Engineering & Diagnostic Workflows

### 1. Deep Linking & Attribution (Branch SDK)
Deep links route users directly to a specific feature inside the app (e.g., `/deals/123`).
- **Deferred Deep Linking**: If a user does not have the app installed, clicking a Branch link redirects them to the App Store. Once installed, Branch persists the original referral data across the install. On launch, the Branch SDK retrieves this data and passes it to the app routing state.
- **Routing Integration**: The Branch payload parameters must be mapped to the `React Navigation` state, checking if authentication is required (e.g., if the user needs to log in via Auth0/Cognito before being routed to their portfolio sheet).

### 2. Push Notifications
Push notifications require a secure handshake between client, server, and APNs/FCM:
1. The app registers with Apple Push Notification service (APNs) and Firebase Cloud Messaging (FCM).
2. The OS provides a unique **Device Token**.
3. The app uploads this token to your backend database and maps it to the user's session profile.
4. When sending a notification, your backend triggers a payload containing the token to FCM/APNs, which routes it directly to the target device.

### 3. Production Diagnostics (Sentry + PostHog)
- **Symbolication**: Release builds are minified, converting readable stack traces into hexadecimal memory locations. To diagnose crashes, your build pipeline must upload **dSYM files** (iOS) and **ProGuard/Source Maps** (Android/JS) to Sentry to map those locations back to line-numbered source code.
- **Telemetry Correlation**: Pair behavioral analytics (PostHog screen taps and network latency logs) with error reports (Sentry) using a shared session identifier. This allows you to view the exact sequence of user actions leading up to a production crash.
