## 🔌 Section 3: Custom Native Modules & Expo CNG

*⏱️ 3 min read*

#### 1. Implementing Custom Native Modules
When a feature requires native OS hardware interfaces, background services, or proprietary native SDKs (e.g., payment gateways, secure enclaves), you write a custom native module to bridge the JavaScript and Native domains.

##### Native Android Module (Kotlin/Java)
1. **Define the Module**: Create a class extending `ReactContextBaseJavaModule` (Java) or implementing the interface in Kotlin.
2. **Register Methods**: Annotate methods with `@ReactMethod` to expose them to JavaScript.
3. **Register the Package**: Implement `ReactPackage` to map the module.
4. **Export to JS**: Access via `NativeModules.MyCustomModule` in JS.

##### Native iOS Module (Swift/Objective-C)
1. **Objective-C Bridge**: iOS bridging requires an Objective-C wrapper since the React Native runtime is written in C++.
2. **Define in Swift**: Create a Swift class subclassing `NSObject` and using `@objc`.
3. **Export macros**: Create an Objective-C file calling `RCT_EXPORT_MODULE()` and `RCT_EXPORT_METHOD()` to register the Swift signatures.

##### Dispatching Native Events (Asynchronous Calls)
To stream data asynchronously from Native to JS (e.g., continuous GPS coordinates or network connectivity state updates), you do not use standard callbacks. Instead, you send native event updates using:
- **Android**: `DeviceEventEmitter` using `reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("EventName", payload)`
- **iOS**: Subclassing `RCTEventEmitter` and calling `sendEventWithName("EventName", body)`

#### 2. Expo Continuous Native Generation (CNG)
In modern Expo projects, developers do not manually edit the `/android` and `/ios` native directories. Instead, they treat them as build artifacts that are generated dynamically.
- **`npx expo prebuild`** reads the project configuration in `app.json` and generates clean native directories on the fly.
- **Expo Config Plugins**: To configure native settings (like modifying `AndroidManifest.xml`, registering permissions, or adding custom CocoaPods settings), you write a JavaScript setup file called a Config Plugin. During prebuild, Expo runs this plugin to programmatically inject the native modifications, keeping your primary code repository 100% universal and folderless.

#### 3. Native Application Lifecycles & Bridging Mechanics
Understanding the interaction between React Native and the host OS lifecycles is critical for managing memory, background tasks, and native modules safely.

##### Android Activity & Fragment Lifecycles
- **Android Activity** is the single visual screen context. Its lifecycle is:
  - `onCreate()`: Initial setup (ReactActivity / ReactHost initialization happens here).
  - `onStart()`: Activity becomes visible.
  - `onResume()`: Activity enters foreground, starts interacting.
  - `onPause()`: Another activity takes focus (e.g., split-screen or permission alert).
  - `onStop()`: Activity is no longer visible (hidden in background).
  - `onDestroy()`: Activity is killed by the OS or finished.
- **Android Fragment** represents a modular portion of an activity. Its lifecycle adds view-specific phases:
  - `onAttach()` ➡️ `onCreate()` ➡️ `onCreateView()` (inflates XML layout) ➡️ `onViewCreated()` ➡️ `onStart()` ➡️ `onResume()` ➡️ `onPause()` ➡️ `onStop()` ➡️ `onDestroyView()` ➡️ `onDestroy()` ➡️ `onDetach()`.
- **React Native Hook**: Custom modules implementing Android's **`LifecycleEventListener`** register callbacks for `onHostResume()`, `onHostPause()`, and `onHostDestroy()`. This lets native code release resources (like stop camera previews or GPS polling) when the containing Activity pauses.

##### iOS Application & ViewController Lifecycles
- **iOS App Lifecycle** is governed by `UIApplicationDelegate` states:
  - `Active`: App is running in the foreground and receiving events.
  - `Inactive`: App is transitioning or interrupted (e.g., incoming phone call, notification panel swipe).
  - `Background`: App is hidden but executing background code (e.g. audio playing, location updates).
  - `Suspended`: App is in background and execution is paused by the kernel.
- **UIViewController Lifecycle** governs the native view tree:
  - `viewDidLoad()`: View container is loaded in memory.
  - `viewWillAppear()` / `viewDidAppear()`: Triggers before/after the view paints on screen.
  - `viewWillDisappear()` / `viewDidDisappear()`: Triggers before/after the view is dismissed.
- **React Native Hook**: Custom iOS modules subscribe to `UIApplication` events (like `UIApplicationDidBecomeActiveNotification` and `UIApplicationDidEnterBackgroundNotification`) to pause background animations or connection pools.

##### React Native Library Creation Flow
To package native modules and JS bindings as a reusable NPM library:
1. **Initialize Directory**: Run `npx create-react-native-library react-native-my-feature` to generate a scaffold.
2. **Package Structure**:
   - `android/`: Contains `build.gradle`, Kotlin/Java module source files, and the ReactPackage registration.
   - `ios/`: Contains Objective-C/Swift code, and the `<LibraryName>.podspec` file for CocoaPods integration.
   - `src/`: Contains TypeScript/JavaScript API wrappers that define the public method interfaces.
   - `package.json`: Configures peer dependencies on `react` and `react-native`.

---


---
