
<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [🏗️ Section 1: Core Architecture (Legacy vs. New Architecture)](#section-1-core-architecture-legacy-vs-new-architecture)
  - [1. The Legacy Bridge Architecture](#1-the-legacy-bridge-architecture)
  - [2. The New Architecture (JSI, TurboModules, Fabric)](#2-the-new-architecture-jsi-turbomodules-fabric)
    - [JavaScript Interface (JSI)](#javascript-interface-jsi)
    - [TurboModules (Native Modules Reborn)](#turbomodules-native-modules-reborn)
    - [Fabric Rendering Engine](#fabric-rendering-engine)
    - [Codegen (Type-Safety Guarantee)](#codegen-type-safety-guarantee)
  - [3. Legacy to Modern Architecture Migration Plan](#3-legacy-to-modern-architecture-migration-plan)
- [🎨 Section 2: Layout, Flexbox & styling (Yoga Engine)](#section-2-layout-flexbox-styling-yoga-engine)
  - [1. Yoga Layout Engine](#1-yoga-layout-engine)
  - [2. Flexbox Behavior Differences in React Native vs. Web](#2-flexbox-behavior-differences-in-react-native-vs-web)
  - [3. Axis Alignment Guide](#3-axis-alignment-guide)
  - [4. Animations & UI Cloning (Animated vs. Reanimated)](#4-animations-ui-cloning-animated-vs-reanimated)
- [🔌 Section 3: Custom Native Modules & Expo CNG](#section-3-custom-native-modules-expo-cng)
  - [1. Implementing Custom Native Modules](#1-implementing-custom-native-modules)
    - [Native Android Module (Kotlin/Java)](#native-android-module-kotlinjava)
    - [Native iOS Module (Swift/Objective-C)](#native-ios-module-swiftobjective-c)
    - [Dispatching Native Events (Asynchronous Calls)](#dispatching-native-events-asynchronous-calls)
  - [2. Expo Continuous Native Generation (CNG)](#2-expo-continuous-native-generation-cng)
  - [3. Native Application Lifecycles & Bridging Mechanics](#3-native-application-lifecycles-bridging-mechanics)
    - [Android Activity & Fragment Lifecycles](#android-activity-fragment-lifecycles)
    - [iOS Application & ViewController Lifecycles](#ios-application-viewcontroller-lifecycles)
    - [React Native Library Creation Flow](#react-native-library-creation-flow)
- [📦 Section 4: App Compilation, Metro & Babel](#section-4-app-compilation-metro-babel)
  - [1. Babel (Transpilation Phase)](#1-babel-transpilation-phase)
  - [2. Metro Bundler (Packaging Phase)](#2-metro-bundler-packaging-phase)
  - [3. Hermes Compilation (Production Phase)](#3-hermes-compilation-production-phase)
- [⚡ Section 5: List Optimization & Memory Profiling](#section-5-list-optimization-memory-profiling)
  - [1. Virtualized List Optimizations](#1-virtualized-list-optimizations)
  - [2. Memory Leak Auditing Pipeline](#2-memory-leak-auditing-pipeline)
    - [Diagnostic Steps:](#diagnostic-steps)
- [🔒 Section 6: Release Engineering & Diagnostic Workflows](#section-6-release-engineering-diagnostic-workflows)
  - [1. Deep Linking & Attribution (Branch SDK)](#1-deep-linking-attribution-branch-sdk)
  - [2. Push Notifications](#2-push-notifications)
  - [3. Production Diagnostics (Sentry + PostHog)](#3-production-diagnostics-sentry-posthog)
  - [4. Navigation Lifecycles (`useFocusEffect`)](#4-navigation-lifecycles-usefocuseffect)
  - [5. CI/CD Pipelines & Mobile Deployment Workflow](#5-cicd-pipelines-mobile-deployment-workflow)
    - [Android Signing & Release](#android-signing-release)
    - [iOS Code Signing & Match](#ios-code-signing-match)
  - [6. Telemetry & Analytics Orchestration: Firebase, Sentry & Azure App Insights](#6-telemetry-analytics-orchestration-firebase-sentry-azure-app-insights)
- [⚛️ Section 7: React Architecture & Core Engine](#section-7-react-architecture-core-engine)
  - [1. Virtual DOM, React Fiber, Reconciliation & Diffing](#1-virtual-dom-react-fiber-reconciliation-diffing)
  - [2. Component Lifecycles: Class vs. Functional Components](#2-component-lifecycles-class-vs-functional-components)
  - [3. Higher-Order Components (HOC)](#3-higher-order-components-hoc)
  - [4. React Hooks: Definitions & Code Examples](#4-react-hooks-definitions-code-examples)
  - [5. Custom Hooks: Rationale & Implementation](#5-custom-hooks-rationale-implementation)
- [📦 Section 8: State Management & Routing Orchestration](#section-8-state-management-routing-orchestration)
  - [1. State vs. Props & Prop Drilling](#1-state-vs-props-prop-drilling)
  - [2. State Management Solutions: Redux vs. Zustand vs. MobX vs. Context API](#2-state-management-solutions-redux-vs-zustand-vs-mobx-vs-context-api)
    - [MobX Core Concepts & React Integration](#mobx-core-concepts-react-integration)
    - [Recoil: Atom & Selector Architecture](#recoil-atom-selector-architecture)
  - [3. Routing, RBAC & Deep Linking in React Navigation](#3-routing-rbac-deep-linking-in-react-navigation)
- [🌐 Section 9: Server Rendering, Styling & Platform Specifics](#section-9-server-rendering-styling-platform-specifics)
  - [1. SSR vs. CSR & React Native SEO](#1-ssr-vs-csr-react-native-seo)
  - [2. Layout & Styling Frameworks](#2-layout-styling-frameworks)
  - [3. Accessibility, Themes, Security & Multi-language (i18n)](#3-accessibility-themes-security-multi-language-i18n)
- [🧪 Section 10: Testing Strategies & QA Automation](#section-10-testing-strategies-qa-automation)
  - [1. The Mobile Testing Pyramid](#1-the-mobile-testing-pyramid)
  - [2. Unit & Integration Testing (Jest + React Native Testing Library)](#2-unit-integration-testing-jest-react-native-testing-library)
  - [3. End-to-End Testing (Detox + JUnit)](#3-end-to-end-testing-detox-junit)
  - [4. Test-Driven Development (TDD) Workflow in React Native](#4-test-driven-development-tdd-workflow-in-react-native)
- [💾 Section 11: Enterprise Offline Storage & Synchronizer Architectures](#section-11-enterprise-offline-storage-synchronizer-architectures)
  - [1. Storage Solution Comparison Matrix](#1-storage-solution-comparison-matrix)
  - [2. React Query Offline Caching & Persister Integration](#2-react-query-offline-caching-persister-integration)
  - [3. Redux Toolkit Offline Hydration & Redux Persist](#3-redux-toolkit-offline-hydration-redux-persist)
  - [4. Enterprise Offline Sync Architecture](#4-enterprise-offline-sync-architecture)
    - [Sync Reconciliation Core Rules:](#sync-reconciliation-core-rules)
  - [5. GraphQL Integration & Caching with Apollo Client](#5-graphql-integration-caching-with-apollo-client)
- [🗺️ Section 12: Micro-Frontends & Super-App Architecture (Re.Pack & Module Federation)](#section-12-micro-frontends-super-app-architecture-repack-module-federation)
  - [1. Metro vs. Re.Pack (Webpack)](#1-metro-vs-repack-webpack)
  - [2. Webpack Module Federation Mechanics](#2-webpack-module-federation-mechanics)
  - [3. Dynamic Bundle Loading Workflow](#3-dynamic-bundle-loading-workflow)
- [🔒 Section 13: Advanced Mobile Security & Reverse Engineering Defenses](#section-13-advanced-mobile-security-reverse-engineering-defenses)
  - [1. Root & Jailbreak Detection](#1-root-jailbreak-detection)
  - [2. Runtime Debugging & Anti-Frida Protection](#2-runtime-debugging-anti-frida-protection)
  - [3. Native Code Obfuscation (R8 & ProGuard)](#3-native-code-obfuscation-r8-proguard)
  - [4. Hardened Secret Management (C++ JNI)](#4-hardened-secret-management-c-jni)
- [⚡ Section 14: App Startup Performance & Modern Debugging (Post-Flipper)](#section-14-app-startup-performance-modern-debugging-post-flipper)
  - [1. Breakdown of App Startup Phases](#1-breakdown-of-app-startup-phases)
  - [2. TTI Optimization Strategies](#2-tti-optimization-strategies)
  - [3. Debugging in the Post-Flipper Era](#3-debugging-in-the-post-flipper-era)
- [📦 Section 15: Over-the-Air (OTA) Updates & In-App Purchases (IAP)](#section-15-over-the-air-ota-updates-in-app-purchases-iap)
  - [1. Over-the-Air (OTA) Bundle Delivery](#1-over-the-air-ota-bundle-delivery)
  - [2. In-App Purchases & Subscription Lifecycles](#2-in-app-purchases-subscription-lifecycles)
- [🌐 Section 16: React Native for Web (Cross-Platform Development)](#section-16-react-native-for-web-cross-platform-development)
  - [1. How It Works (Compilation & Mapping)](#1-how-it-works-compilation-mapping)
  - [2. Monorepo Setup & Code Sharing](#2-monorepo-setup-code-sharing)
  - [3. Key Differences & Limitations](#3-key-differences-limitations)
- [📦 Section 17: App Size & Bundle Optimization (APK & IPA Reduction)](#section-17-app-size-bundle-optimization-apk-ipa-reduction)
  - [1. Android Specific Size Reduction (build.gradle)](#1-android-specific-size-reduction-buildgradle)
  - [2. iOS Specific Size Reduction (Xcode Configurations)](#2-ios-specific-size-reduction-xcode-configurations)
  - [3. JavaScript & Bundle Optimization](#3-javascript-bundle-optimization)
- [⚡ Section 18: Senior-Level Performance Engineering Checklist](#section-18-senior-level-performance-engineering-checklist)
  - [1. Minimizing Bridge & JSI Crossing Overhead](#1-minimizing-bridge-jsi-crossing-overhead)
  - [2. Render Loop Optimization](#2-render-loop-optimization)
  - [3. Dynamic Lists (FlashList / FlatList)](#3-dynamic-lists-flashlist-flatlist)
  - [4. Memory Leak Triage](#4-memory-leak-triage)
</details>
<!-- INDEX_END -->

## 🏗️ Section 1: Core Architecture (Legacy vs. New Architecture)
*⏱️ 2 min read*

React Native's runtime environment has gone through a major architectural transition. For interviews, you should understand **both** the legacy Bridge architecture and the modern New Architecture, because many production apps still run on older versions while new projects and upgrades increasingly expect Hermes, JSI, Fabric, TurboModules, and Codegen knowledge.

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
The New Architecture eliminates the old asynchronous JSON bridge for core rendering and modern native-module access, replacing it with JSI-backed C++ interfaces.

#### JavaScript Interface (JSI)
- **JSI** is a lightweight C++ abstraction layer that allows the JavaScript engine (Hermes) to hold direct references to host native C++ objects.
- JavaScript can invoke host methods without JSON serialization. Some APIs can be synchronous, but senior engineers avoid synchronous native calls for slow I/O because they can still block the JS runtime.

#### TurboModules (Native Modules Reborn)
- In the legacy model, all native modules (e.g., Camera, Bluetooth, Storage) were initialized eagerly at app startup, regardless of whether the user accessed them. This bloated app launch time.
- **TurboModules** leverage JSI to lazy-load native libraries. They are only initialized and loaded into memory when explicitly invoked by the JavaScript code, significantly reducing app startup latency.

#### Fabric Rendering Engine
- Fabric is the concurrent rendering engine that replaces the legacy UIManager.
- Fabric computes UI layout changes inside C++ and commits them directly to the native OS layout thread. Because JSI allows synchronous access, Fabric can execute UI mutations instantly on the main thread, eliminating layout jumps and flickering (e.g., during rapid scroll views).
- Fabric supports modern React concurrent rendering, including update prioritization and smoother coordination between React work and native UI commits.

#### Codegen (Type-Safety Guarantee)
- Codegen is a build-time compiler tool that reads your TypeScript interfaces (which define the contract between JavaScript and native modules) and automatically generates the corresponding C++ binding code.
- If a developer attempts to pass an invalid type parameter from JavaScript (e.g., passing an array instead of a string to a native function), the build fails immediately in the CI pipeline. This guarantees runtime type-safety across the JavaScript-native boundary.

### 3. Legacy to Modern Architecture Migration Plan
When interviewers ask how you would migrate a legacy React Native app to a modern architecture, answer as a phased risk-management plan rather than a one-shot upgrade.

1. **Audit Current Baseline**: Capture the current RN version, React version, Hermes/JSC usage, Gradle, AGP, Kotlin, Xcode, CocoaPods, Node, navigation, state libraries, native modules, CI scripts, crash rate, and app startup metrics.
2. **Dependency Compatibility Matrix**: Classify each dependency as New-Architecture-ready, legacy-only, replaceable, or internally owned. Pay special attention to camera, maps, push, analytics, payment, storage, animation, and custom native SDK wrappers.
3. **Stabilize Before Upgrade**: Add smoke tests, E2E tests for login/payment/core flows, source-map upload, crash reporting, and a rollback plan. Migration without observability is risky.
4. **Upgrade in Controlled Hops**: Use React Native Upgrade Helper and update native templates in small steps. Build Android and iOS after every hop instead of batching all native changes into one large PR.
5. **Enable Hermes and Validate Bytecode Builds**: Verify release builds, startup time, memory, source maps, debugging, and any engine-specific issues.
6. **New Architecture Readiness**: Enable Fabric/TurboModules in a branch or internal build, then fix library incompatibilities, native event emitters, Codegen specs, and synchronous native calls.
7. **Native Module Modernization**: Keep simple legacy `RCTBridgeModule` modules working where acceptable, but migrate performance-sensitive modules to TurboModules/JSI with typed specs and background-thread handling.
8. **UI and Animation Validation**: Test gestures, Reanimated, LayoutAnimation, navigation transitions, lists, keyboard handling, modals, and accessibility because architecture upgrades often expose subtle UI regressions.
9. **Release Gradually**: Ship behind internal/beta tracks first, monitor crash-free sessions, ANRs, startup time, memory, and key business flows, then roll out gradually.
10. **Cleanup Phase**: Remove deprecated APIs, old Flipper configs, unused bridge shims, stale Gradle/Pod settings, and dead compatibility wrappers only after production stability is proven.

---

## 🎨 Section 2: Layout, Flexbox & styling (Yoga Engine)
*⏱️ 3 min read*

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

### 4. Animations & UI Cloning (Animated vs. Reanimated)
Animations are calculated on two different runtime threads in React Native:
- **Animated API**: Compiles animation configurations. If `useNativeDriver: true` is set, supported non-layout properties such as `opacity` and `transform` run on the native/UI side after the configuration is sent. In legacy and most stable app code, layout properties such as `width`, `height`, margins, and flex values are treated as unsupported by the native driver. Modern RN is evolving here with a shared animation backend, so a strong interview answer says: "traditionally unsupported in legacy apps; newer RN versions are expanding this area, but I would verify support before using it in production."
- **LayoutAnimation**: Instructs the native OS thread to pre-calculate transitions (fade, scale) automatically for the entire UI layout on the next render cycle. Extremely fast, but lacks fine-grained interactive control (e.g. pan gestures tracking).
- **React Native Reanimated**: Fully asynchronous animation engine that eliminates the JS thread bottleneck. It utilizes **Worklets**—small JavaScript functions compiled to C++ that execute directly inside a secondary JS engine context on the UI/Render thread. Reanimated values (`shared values`) are modified directly on the UI thread at 60/120 FPS, binding seamlessly with gesture handlers (e.g., swiping cards, zooming views) with zero bridge round-trips.
- **High-Fidelity UI Cloning**: To replicate complex layouts (like finance tracking charts, swipe-to-reveal lists, or drag-and-drop lists), developers structure views by nesting absolute positioned elements, binding gesture inputs (`Gesture.Pan()`), and applying Reanimated's `useAnimatedStyle` to interpolate values (e.g. mapping swipe distance to rotation angle and container opacity).

---

## 🔌 Section 3: Custom Native Modules & Expo CNG
*⏱️ 4 min read*

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

### 3. Native Application Lifecycles & Bridging Mechanics
Understanding the interaction between React Native and the host OS lifecycles is critical for managing memory, background tasks, and native modules safely.

#### Android Activity & Fragment Lifecycles
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

#### iOS Application & ViewController Lifecycles
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

#### React Native Library Creation Flow
To package native modules and JS bindings as a reusable NPM library:
1. **Initialize Directory**: Run `npx create-react-native-library react-native-my-feature` to generate a scaffold.
2. **Package Structure**:
   - `android/`: Contains `build.gradle`, Kotlin/Java module source files, and the ReactPackage registration.
   - `ios/`: Contains Objective-C/Swift code, and the `<LibraryName>.podspec` file for CocoaPods integration.
   - `src/`: Contains TypeScript/JavaScript API wrappers that define the public method interfaces.
   - `package.json`: Configures peer dependencies on `react` and `react-native`.

---

## 📦 Section 4: App Compilation, Metro & Babel
*⏱️ 2 min read*

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
Babel parses JS/TS files and converts the code into an Abstract Syntax Tree (AST). It then applies React Native presets (e.g., `module:@react-native/babel-preset`, which covers JSX and TypeScript syntax used by the template) to:
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
*⏱️ 2 min read*

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
1. **Heap Snapshot Comparisons**: Use React Native DevTools / Hermes-compatible heap tooling to capture Snapshot A at screen init and Snapshot B after performing actions (like scrolling or opening/closing pages). Filter by allocation differences to locate variables that are not being collected.
2. **Native Memory Profiling**: Use **Android Studio Profiler (Memory)** or **Xcode Instruments (Allocations/Leaks)** to watch the native memory heap. A rising, staircase-like memory graph indicates that views or native allocations are leaking.
3. **Common Culprits**:
   - **Lingering Subscriptions & Timers**: Timers and listeners must be explicitly cleared in the `useEffect` cleanup return.
   - **Uncancelled Network Request Callbacks**: If a screen fetches data and the user backs out before the HTTP response returns, the JS thread will attempt to invoke `setState` on the unmounted component, resulting in memory leaks and console warnings.
     - *Prevention*: Re-route requests using **`AbortController`** to cancel fetch events when components unmount, or implement an **`isMounted`** ref tracker flag to check the mount state defensively before calling state updates.
   - **Global Redux References**: Retaining dead references in global stores.

---

## 🔒 Section 6: Release Engineering & Diagnostic Workflows
*⏱️ 5 min read*

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

### 4. Navigation Lifecycles (`useFocusEffect`)
- Using standard `useEffect` hooks will not fire when a screen gets re-focused.
- To execute data syncs or trigger screen entries cleanly, implement the **`useFocusEffect`** hook. This acts as a navigator-specific lifecycle controller, firing code only when the tab gains visual focus, and executing its cleanup callback when the screen loses focus.

### 5. CI/CD Pipelines & Mobile Deployment Workflow
Automating builds ensures reliable releases and prevents manual code signing errors.

```text
  [Git Commit] ➡️ Trigger CI (GitHub Actions)
                    ⬇️
  [Build Steps] ➡️ Lint, compile Typescript, execute Jest unit tests
                    ⬇️
  [Signing Steps] ➡️ decrypt Keystore (Android) / sync Certificates via Match (iOS)
                    ⬇️
  [Fastlane Lanes] ➡️ build APK/AAB (Android) / compile IPA (iOS)
                    ⬇️
  [Distribution] ➡️ upload to Play Console (Internal Track) & App Store Connect (TestFlight)
```

#### Android Signing & Release
- **Keystore**: The release APK/AAB must be cryptographically signed using a `.keystore` certificate file.
- **GitHub Secrets**: The Keystore file is base64 encoded and stored in GitHub secrets along with the store password and alias. The CI runner decodes this file to sign the app dynamically.
- **AAB format**: Android App Bundle format is built using `./gradlew bundleRelease`. It aggregates raw assets and binary files, allowing the Google Play Console to dynamically build optimized APKs sized for specific user devices.

#### iOS Code Signing & Match
- **Certificates & Provisioning**: iOS builds require dynamic code signing certificates (Development or Distribution) and provisioning profiles bound to specific App IDs and devices.
- **Fastlane Match**: Automates iOS code signing by storing all certificates and provisioning profiles inside a private Git repository encrypted with a shared passcode. During CI runs, `fastlane match appstore` clones the repository, decrypts the files, and installs them onto the macOS runner, preventing signing mismatches.
- **Fastfile**: Script containing "lanes" that compile the iOS app (`build_app` or `gym`) and submit the `.ipa` package to TestFlight (`upload_to_testflight` or `pilot`).

### 6. Telemetry & Analytics Orchestration: Firebase, Sentry & Azure App Insights
Production-grade applications rely on a multi-tiered monitoring stack to track stability, usability, and execution performance.
- **Sentry (Crash & Error Diagnostics)**: Focuses strictly on debugging and runtime stability. It captures uncaught exceptions, promise rejections, and native crashes (JVM/C++ on Android, Objective-C/Swift on iOS). It reconstructs readable stack traces via dSYM and source map symbolication. Sentry is optimized for developer diagnostics.
- **Firebase (Engagement & Operational Telemetry)**:
  - **Firebase Analytics**: Tracks user behavioral flows, screen views, conversions, and demographic metrics.
  - **Firebase Crashlytics**: Tracks crashes similarly to Sentry, but is tightly integrated with the Google/Android Play ecosystem.
  - **Firebase Remote Config**: Dynamically updates feature flags and values over-the-air, enabling A/B testing and conditional feature delivery.
- **Azure App Insights (Enterprise Performance Monitor)**:
  - Often used in Microsoft-backed enterprise architectures to correlate client-side telemetry with backend API transaction logs.
  - Tracks web request latency, custom client-side events, component rendering durations, and network failure rates, allowing end-to-end trace correlation using a shared `Correlation ID` across frontend and backend services.

| Tool | Primary Purpose | Key Metrics | Developer vs. Product Focus |
| :--- | :--- | :--- | :--- |
| **Sentry** | Real-time JS and Native crash reporting and symbolication. | Crash-free sessions, breadcrumbs, stack traces. | Highly Developer focused. |
| **Firebase** | Behavioral analytics, dynamic configuration, notification handling. | Screen views, event conversions, active users. | Highly Product/Marketing focused. |
| **Azure App Insights** | End-to-end performance tracing and enterprise APM. | Latency, dependency tracking, transaction correlation. | Operational/Infrastructure focused. |

---

## ⚛️ Section 7: React Architecture & Core Engine
*⏱️ 7 min read*

### 1. Virtual DOM, React Fiber, Reconciliation & Diffing
- **Virtual DOM**: A lightweight, in-memory representation of the real DOM/Native UI layout tree. It acts as a blue-print stage where updates are calculated first to avoid expensive layouts reflows.
- **Reconciliation**: The reconciliation process compares the new Virtual DOM tree with the previous one. In React 16+, this is powered by **React Fiber**.
- **React Fiber**: A complete rewrite of React’s core reconciliation algorithm. 
  - *Why Fiber*: The legacy reconciler used a synchronous call-stack recursion that could not be interrupted. If a rendering cycle took too long, it blocked the main thread, causing frame drops (jank).
  - *How it works*: Fiber breaks rendering work down into small units called "fibers" and processes them incrementally in two phases:
    1. **Render Phase**: Asynchronous and interruptible. React builds a new work-in-progress tree, calculates changes, and prioritizes updates (e.g., user inputs are prioritized over background list fetches).
    2. **Commit Phase**: Synchronous and uninterruptible. Writes the final layout updates directly to the host platform (DOM or Native views).
- **The Diffing Heuristic ($O(N)$)**:
  - If elements have different types (e.g., changing a `<View>` to a `<ScrollView>`), React tears down the old tree and builds the new one from scratch.
  - If elements are the same type, React compares and updates changed props or attributes only.
  - **Keys in Lists**: React uses keys to match Virtual DOM elements across render frames. Without unique keys, list updates (reordering, inserting, deleting) force React to recreate all native view cells from scratch, destroying state and causing UI flickering.

### 2. Component Lifecycles: Class vs. Functional Components
- Components transition through three core phases: **Mounting**, **Updating**, and **Unmounting**.
- **Method Execution Order**:

```text
[Mounting] 
  Class: constructor() ➡️ static getDerivedStateFromProps() ➡️ render() ➡️ componentDidMount()
  Functional: Function Executes (Initial Paint) ➡️ useEffect() execution

[Updating]
  Class: getDerivedStateFromProps() ➡️ shouldComponentUpdate() ➡️ render() ➡️ getSnapshotBeforeUpdate() ➡️ componentDidUpdate()
  Functional: Function Executes (Re-render) ➡️ useEffect() cleanup ➡️ useEffect() execution

[Unmounting]
  Class: componentWillUnmount()
  Functional: useEffect() cleanup function executes
```

### 3. Higher-Order Components (HOC)
- **Definition**: An HOC is a pure function that takes a component as an argument and returns an enhanced component. It represents a structural pattern for sharing cross-cutting concerns (authentication, layouts, analytics tracking).
- **When to Use**: Decoupling layout styles, injecting global contexts, or shielding screens with authorization wrappers.
- **Example HOC**:
  ```tsx
  import React from 'react';
  import { View, Text } from 'react-native';

  export function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
    return (props: P) => {
      const isAuthenticated = true; // fetch from auth context

      if (!isAuthenticated) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Access Denied. Please log in.</Text>
          </View>
        );
      }

      return <WrappedComponent {...props} />;
    };
  }
  ```

### 4. React Hooks: Definitions & Code Examples
- **`useState`**: Hook to declare local component state.
  ```typescript
  const [count, setCount] = useState<number>(0);
  ```
- **`useEffect`**: Hook to perform side effects (subscriptions, data fetches, listeners).
  ```typescript
  import { AppState } from 'react-native';

  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      console.log('app state changed', state);
    });

    return () => subscription.remove(); // cleanup
  }, []);
  ```
- **`useContext`**: Reads and subscribes to a React context without nesting consumer components.
  ```typescript
  const theme = useContext(ThemeContext);
  ```
- **`useReducer`**: Alternative to `useState` for managing complex state objects with action dispatch rules.
  ```typescript
  const [state, dispatch] = useReducer(reducerFn, initialState);
  ```
- **`useMemo`**: Caches computed values to avoid recalculations on every render.
  ```typescript
  const sortedData = useMemo(() => data.sort(), [data]);
  ```
- **`useCallback`**: Memoizes function instances to preserve reference pointers.
  ```typescript
  const handleClick = useCallback(() => console.log(id), [id]);
  ```
- **`useRef`**: Returns a mutable ref object whose `.current` persists across renders and does not trigger re-renders upon mutation.
  ```typescript
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  ```

### 5. Custom Hooks: Rationale & Implementation
- **Why**: Encourages code reusability, modularity, and readability. It separates UI presentation from business logic.
- **Example (Encrypted Secure Storage Custom Hook)**:
  ```typescript
  import { useState, useEffect, useCallback } from 'react';
  import { MMKV } from 'react-native-mmkv';

  const storage = new MMKV();

  export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
      try {
        const item = storage.getString(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (error) {
        return initialValue;
      }
    });

    const setValue = useCallback((value: T | ((val: T) => T)) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        storage.set(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(error);
      }
    }, [key, storedValue]);

    return [storedValue, setValue] as const;
  }
  ```

---

## 📦 Section 8: State Management & Routing Orchestration
*⏱️ 5 min read*

### 1. State vs. Props & Prop Drilling
- **State**: Mutable data owned and managed internally by the component itself.
- **Props**: Immutable data passed down from a parent component to configure the child.
- **Prop Drilling**: The anti-pattern of passing props through multiple nested layers of child components that do not actually need the data, simply to deliver it to a deeply nested descendant. Avoided by using Context API or State Management libraries.

### 2. State Management Solutions: Redux vs. Zustand vs. MobX vs. Context API
- Choose the state management solution based on app scope and mutation frequencies:

| Feature | Redux Toolkit (RTK) | Zustand | MobX / MobX State Tree | Context API |
| :--- | :--- | :--- | :--- | :--- |
| **Best For** | Massive enterprise-grade apps with high-frequency mutations and complex middleware rules. | Medium-to-large apps. Lightweight, atomic, and extremely fast. | Complex object-graphs, spreadsheet-like reactivity, and OOP architectures. | Small-scale state (e.g., themes, language preferences). |
| **Re-render Scope** | Only selectors re-render. Highly optimized. | Selectors prevent unneeded re-renders. | Fine-grained observer triggers. Only components accessing accessed properties re-render. | All context consumers re-render when the context value object changes. |
| **Boilerplate** | Medium. Configured via slices and store. | Minimal. Defined in a single hook store. | Low to Medium. Managed via observables and actions. | Low. Native to React. |
| **Async Support** | Native async thunks or sagas. | Integrated directly inside custom store actions. | Handled using flow/generators or custom action callbacks. | Handled manually using asynchronous triggers in parent components. |

#### MobX Core Concepts & React Integration
MobX operates on a **Transparent Functional Reactive Programming (TFRP)** model:
- **Observables (`makeObservable`)**: Marks object properties as observable state values. MobX wraps these properties in getters/setters to track property reads and writes.
- **Computed Values (`@computed` / `computed`)**: Values derived from existing state (like filtering a list). They are cached automatically, only re-evaluating if their underlying observable dependencies change.
- **Actions (`action`)**: Functions that modify observable state. In strict mode, MobX enforces that all state mutations must occur inside an action, batching updates for efficiency.
- **Reactions (`autorun`, `reaction`, `when`)**: Side effects that run automatically whenever dependent observables change (like writing state to storage).
- **Observer Wrappers (`observer`)**: High-Order Component wrapping React components. It automatically registers the component to listen to any observables accessed during its render method. If an accessed property updates, the component re-renders; if an unaccessed property updates, rendering is skipped.
- **MobX State Tree (MST)**: A transactional wrapper around MobX that structures stores into a tree of typed nodes (models). MST provides runtime type-checking, snapshots (for time-travel debugging), and out-of-the-box state serialization.

### 3. Routing, RBAC & Deep Linking in React Navigation
- **Role-Based Access Control (RBAC)**: Manage access limits using conditional navigation stacks:
  ```tsx
  const AppNavigator = () => {
    const { userRole, isAuthenticated } = useAuth();
    return (
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : userRole === 'admin' ? (
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        ) : (
          <Stack.Screen name="UserDashboard" component={UserDashboard} />
        )}
      </Stack.Navigator>
    );
  };
  ```
- **Query Parameters & Dynamic Routing**: Configure deep linking rules:
  ```typescript
  const linking = {
    prefixes: ['myportal://', 'https://myportal.com'],
    config: {
      screens: {
        Details: 'details/:productId', // maps route params to query params
      },
    },
  };
  ```

#### Recoil: Atom & Selector Architecture
Recoil is useful to understand historically, but it is no longer the default recommendation for new enterprise React Native work. In interviews, mention it as an atomic-state pattern and then steer modern production choices toward **Redux Toolkit**, **Zustand**, **Jotai**, **MobX**, or framework-specific server-state tools depending on team needs.
- **Atoms (Source of Truth)**: Dynamic data containers representing units of state. Components can subscribe to atoms. When an atom updates, *only* components subscribed to that specific atom re-render.
- **Selectors (Derived State)**: Pure functions that transform atoms or other selectors. Selectors are cached automatically, only recalculating if their upstream dependencies (atoms/selectors) change. They can also represent asynchronous operations (e.g. fetching records from a server).
- **Comparison to Redux/MobX**:
  - *Redux*: Relies on a single, global store containing all states. Dispatching actions requires middleware rules, selectors, and reducer setups (higher boilerplate, macro-level state).
  - *MobX*: Uses observables and transparent functional reactive tracking. Very low boilerplate, but relies on object mutability and wrapper components (`observer`).
  - *Recoil*: Atomic design built specifically *for* React. Integrates natively with React features like Concurrent Mode, Suspense, and standard hook patterns (e.g., `useRecoilState` which works exactly like `useState`).

---

## 🌐 Section 9: Server Rendering, Styling & Platform Specifics
*⏱️ 2 min read*

### 1. SSR vs. CSR & React Native SEO
- **Client-Side Rendering (CSR)**: The browser downloads a minimal HTML stub and executes JS to render the Virtual DOM. Faster interactions, but slower initial load and weaker SEO indexing.
- **Server-Side Rendering (SSR)**: The server pre-renders HTML on each request, delivering complete layouts. Highly optimized for SEO crawlers and fast First Contentful Paint.
- **React Native SEO / Indexing**:
  - React Native applications run compiled binaries on devices, meaning traditional SEO crawlers cannot index application screens.
  - **Mitigation**:
    1. **App Indexing**: Register **Android App Links** and **iOS Universal Links** matching domain structures (e.g. `https://myportal.com/deals`).
    2. **Companion Web App**: Deploy an SEO-optimized web companion built with Next.js (using SSR/Static Site Generation). Search engines index the web layouts. When users tap search results on mobile, Universal Links launch the native mobile app directly, routing them to the correct screen.

### 2. Layout & Styling Frameworks
- Styling decisions dictate layout compilation performance:
  - **StyleSheet (Standard)**: Pre-compiled at compile time. Translates styles into native IDs on the native thread. High performance, zero runtime overhead.
  - **Tailwind CSS (NativeWind)**: Compiles utility classes into standard `StyleSheet` objects at build time. Maintains high performance while improving developer speed.
  - **StyleX**: Type-safe CSS-in-JS compiler. Very robust, but has minor build-time integrations.
  - **Inline Styles (`style={{ flex: 1 }}`)**: Generates a brand-new style object on every single render. This forces style calculations and comparisons on every update cycle, degrading layout speeds.

### 3. Accessibility, Themes, Security & Multi-language (i18n)
- **Accessibility (a11y)**: Add `accessible={true}`, `accessibilityLabel`, and `accessibilityHint` elements to guarantee screens are readable by Screen Readers (TalkBack on Android, VoiceOver on iOS).
- **Multi-language (i18n)**: Integrate `react-i18next` to translate text dictionaries. Translate strings inside hooks using `const { t } = useTranslation()`.
- **Multi-theme**: Orchestrate themes using `useColorScheme()` or Redux theme stores, changing StyleSheet styles dynamically via style variables.
- **Security Protocols**:
  - SSL Pinning to prevent Man-in-the-Middle (MitM) attacks.
  - App Attestation (Play Integrity / DeviceCheck) to confirm binary security integrity.
  - Cryptographic Keychain/Keystore wrappers (`react-native-keychain`) to protect OAuth tokens.
  - Disable screen recording or capture in high-security pages using native flags (e.g. `WindowManager.LayoutParams.FLAG_SECURE` in Android activity context).

---

## 🧪 Section 10: Testing Strategies & QA Automation
*⏱️ 3 min read*

### 1. The Mobile Testing Pyramid
- **Test-Driven Development (TDD)**: The software development process where you write failing test cases first, then write minimal code to pass the tests, and finally refactor for clean patterns.

```text
       ▲
      / \     E2E Testing (Detox) ➡️ Simulates real device layouts and flows
     /   \    
    /     \   Integration (Jest)  ➡️ Tests component updates, redux states and routing
   /_______\  Unit (RNTL + Jest)  ➡️ Validates atomic hooks and logic calculations
```

### 2. Unit & Integration Testing (Jest + React Native Testing Library)
- **RNTL** allows rendering components inside a virtual environment to assert UI elements and fire events.
- **Example Test Code**:
  ```typescript
  import React from 'react';
  import { render, fireEvent } from '@testing-library/react-native';
  import { ButtonComponent } from './ButtonComponent';

  describe('ButtonComponent', () => {
    it('fires callback triggers when pressed', () => {
      const mockPress = jest.fn();
      const { getByText } = render(<ButtonComponent label="Submit" onPress={mockPress} />);
      
      fireEvent.press(getByText('Submit'));
      expect(mockPress).toHaveBeenCalledTimes(1);
    });
  });
  ```

### 3. End-to-End Testing (Detox + JUnit)
- **Detox**: A grey-box end-to-end testing library. It tests the compiled app on real simulators or devices, waiting for asynchronous network calls and animations to finish automatically before asserting elements, minimizing flaky tests.
- **JUnit**: Used as the test runner reporting framework.
- **Detox E2E Script Example**:
  ```javascript
  describe('Authentication Flow', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
    });

    it('navigates to dashboard after successful login', async () => {
      // Find element by unique testID and type inputs
      await element(by.id('username_input')).typeText('admin_user');
      await element(by.id('password_input')).typeText('secure_password');
      await element(by.id('login_button')).tap();

      // Assert visual element exists on the next page
      await expect(element(by.text('Welcome Back, Admin'))).toBeVisible();
    });
  });
  ```

### 4. Test-Driven Development (TDD) Workflow in React Native
Test-Driven Development (TDD) is a development methodology where code is written in a strict iterative feedback loop:
1. **Red**: Write a failing unit or integration test defining a small, single requirement.
2. **Green**: Write the minimal application code required to make the test pass.
3. **Refactor**: Clean up code styling, extract components, or improve performance while ensuring tests remain green.

- **Mental Model for Mobile TDD**:
  - Focus on testing *behaviors* and *states* rather than implementation details. Avoid asserting component internals; instead, assert what the user sees (e.g. text elements, buttons) or what callback events fire.
  - When testing custom hooks (like standard query fetch wrappers), write test cases representing: Initial loading state ➡️ Successful payload resolution ➡️ Network error rejection.
- **Mocking Strategy**:
  - Mock native libraries that do not run inside Node.js environments (like `@react-native-async-storage/async-storage`, `react-native-reanimated`, or `react-native-device-info`).
  - Use `jest.mock()` to replace complex native dependencies or heavy network wrappers (like `axios` or Apollo Client's mock provider) with predictable mock functions (`jest.fn()`).

---

## 💾 Section 11: Enterprise Offline Storage & Synchronizer Architectures
*⏱️ 5 min read*

Mobile banking, investment, and remote operations apps require reliable offline support. This section outlines local storage comparison, offline caching hydration, and ledger synchronization strategies.

### 1. Storage Solution Comparison Matrix

| Storage Engine | Paradigm | Threading | Benchmarks (Write 10k rows) | Best For | Limitations |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AsyncStorage** | Key-Value (Plaintext JSON) | Asynchronous native storage API | Slowest relative option | Simple UI configs and non-sensitive preferences. | No indexing/query model; avoid for tokens and large datasets. |
| **MMKV** | Key-Value (Binary serialized) | Synchronous JSI/C++ bindings | Fastest for small key-value reads/writes | Redux/Zustand hydration states, rapid key lookups, encrypted local profiles. | Lacks complex relations, database query filters, or ACID table operations. |
| **SQLite** | Relational (SQL Tables) | Sync/async wrappers depending on library | Strong transactional performance | Raw transactional records, structured schemas, ledger reporting. | Manual migrations and query/schema ownership. |
| **WatermelonDB** | Reactive ORM (Built on SQLite) | Background SQLite work with observable models | Strong for large reactive datasets | High-performance lists (50k+ records), dynamic search/lazy lists. | Requires model/decorator structure and careful migration planning. |

- **MMKV Optimization Mechanics**: MMKV maps files directly to memory using the kernel’s **`mmap`** call. Reads and writes bypass bridge queues and serialization delays. JSI allows React Native code to query MMKV directly on the main thread in under 1ms.
- **WatermelonDB Reactive Architecture**: Designed to keep React threads responsive when managing large tables. It uses SQLite but runs queries on a separate native background thread. View components are connected to DB tables using observables (`@withObservables`). When a database record changes, only components displaying that specific record re-render.

### 2. React Query Offline Caching & Persister Integration
React Query (TanStack Query) manages remote state in memory. To support offline restarts, the query cache is serialized and written to disk (MMKV or AsyncStorage) using **persister adapters**:
1. **Bootstrap**: Upon application launch, the persister reads the stored JSON cache from MMKV and hydrates the React Query client cache.
2. **Persistence**: Every time a network request resolves and updates the cache in memory, the persister writes the serialized cache state back to MMKV.
3. **Execution**: If the app is launched offline, the hydrated cache is served immediately with a `stale-while-revalidate` lifecycle. Queries return cached data, and background network refetches are paused until connection is recovered.

### 3. Redux Toolkit Offline Hydration & Redux Persist
To maintain client-side application state (e.g. user details, app theme settings) across launches, we configure `redux-persist` with an MMKV-backed storage adapter:
1. **Hydration Phase**: The store is initialized in a blocked state. `PersistGate` intercepts component mounting, reading stored keys from MMKV.
2. **Rehydration Action**: Once loaded, Redux dispatches `persist/REHYDRATE` containing the parsed payload. Slice state is updated, and the UI continues rendering.
3. **Write-Through Caching**: Action triggers update slice states. The MMKV adapter writes state changes back to disk synchronously, preventing data loss if the app crashes mid-session.

### 4. Enterprise Offline Sync Architecture
Offline synchronization is modeled using a **Transactional Outbox Queue** pattern. This ensures data consistency, prevents data loss, and manages transaction ordering:

```text
 [App Action: Pay $10]
          ⬇️
   (Device Offline) ➡️ Write transaction details to SQLite Outbox & update UI state
          ⬇️
  [Connection Recovers] ➡️ NetInfo listener triggers Sync Process
          ⬇️
 [Outbox Sequencer] ➡️ Reads queue from SQLite ➡️ Sequentially sends API calls
          ⬇️
  (API Success) ➡️ Deletes item from SQLite outbox queue ➡️ Refreshes cache
```

#### Sync Reconciliation Core Rules:
1. **NetInfo Connectivity Listener**: Monitors changes. On transition from offline to online, it triggers the synchronization processor.
2. **Idempotency Keys**: A UUID is generated for each transaction and stored in the SQLite outbox. Retried API calls include this header. The server uses it to prevent executing the transaction twice.
3. **Conflict Resolution Strategy**:
   - **Last-Write-Wins (LWW)**: The client timestamp determines the final state (simplest, best for settings).
   - **Server-Wins / Merge**: The server merges non-conflicting fields, rejecting conflicts and forcing the client to re-fetch and resolve.
   - **Interactive User Reconciliation**: The app displays a comparison modal to let the user choose which state to keep (ideal for collaborative document models).
4. **Persistent Background Workers**: If the user backgrounds the app during sync, the transaction is handed off to OS workers (`WorkManager` in Android / `BackgroundTasks` in iOS) to complete the queue execution in the background.

### 5. GraphQL Integration & Caching with Apollo Client
GraphQL enables mobile clients to request only the specific fields required, reducing network payload sizes on constrained cellular connections.
- **Client Configuration**: Initialized via `ApolloClient` utilizing an `InMemoryCache` instance. The client manages query normalization (mapping server objects to cache keys using `__typename` and `id`).
- **Fetch Policies**:
  - `cache-first` (Default): Returns cached data if available; otherwise makes a network request.
  - `network-only`: Always bypasses the local cache to fetch the latest state from the server.
  - `cache-and-network`: Serves cached data instantly while simultaneously triggering a background network request to update the cache and view.
  - `cache-only`: Reads exclusively from the cache, throwing an error if data is missing (ideal for offline-locked screens).
- **Error Handling**: Uses link chains (e.g. `@apollo/client/link/error`). You catch global errors (like `401 Unauthorized` or `500 Server Error`) and handle them via retry logics or routing resets.
- **Offline Sync & Store Hydration**: Apollo Client can be persisted to local storage using `apollo3-cache-persist`. Upon app startup, the local cache database (e.g., SQLite or MMKV) is read to hydrate the client cache, allowing immediate offline rendering of last-seen graphs.

---

## 🗺️ Section 12: Micro-Frontends & Super-App Architecture (Re.Pack & Module Federation)
*⏱️ 2 min read*

For large-scale enterprise applications, building a single monolithic JavaScript bundle results in massive build-time bottlenecks, git merge conflicts, and regression risks. Senior architects design super-apps composed of independent, modular micro-frontends (mini-apps) using **Re.Pack** and **Webpack Module Federation**.

### 1. Metro vs. Re.Pack (Webpack)
- **Metro Bundler**: React Native’s default bundler compiles all source code, assets, and libraries statically into a singular `index.bundle` file at compile time. Metro does not natively support dynamic code splitting, remote URLs loading, or sharing runtimes at runtime.
- **Re.Pack**: A Webpack-based compiler and runtime tool that replaces Metro. Re.Pack allows configuration of Webpack's core plugins, including **Module Federation**, enabling dynamic code loading, chunk splits, and multi-bundle mobile compilation.

### 2. Webpack Module Federation Mechanics
Module Federation separates code into **Hosts** (Container App) and **Remotes** (Mini-Apps).
- **Host (Container)**: The main shell application. It sets up the navigation shell, imports core dependencies, and handles dynamic loader orchestration.
- **Remotes (Mini-Apps)**: Independent features (e.g., Credit Card screen, Loan Application process, Rewards Hub). Each remote defines specific entry components it exposes (exports) to the host.
- **Shared Dependencies (`shared` configuration)**: Both the Host and Remotes declare shared dependencies (e.g. `react`, `react-native`, `react-native-reanimated`). Webpack resolves these dynamically at runtime: if the host has already loaded React, the remote will utilize the host's runtime instance in memory rather than loading its own duplicate React version.

```text
       [Host Shell Container] (Registers Remotes & Shared Core Libs)
         /               \
   (Loads on-demand)   (Loads on-demand)
       /                   \
  [Remote Mini-App A]    [Remote Mini-App B] 
  (Cards Feature)        (Loans Feature)
```

### 3. Dynamic Bundle Loading Workflow
1. **On-Demand Resolution**: When a user navigates to the "Rewards" section, the Host app triggers a dynamic import (`import('rewards/Component')`).
2. **Dynamic Script Loader**: Re.Pack interceptors load the remote Javascript/Hermes bytecode chunk from a remote CDN/Server URL (e.g., `https://cdn.mybank.com/rewards/1.0.0/bundle.js`).
3. **Execution**: The script is downloaded, verified, and executed inside the Hermes virtual machine, rendering the component seamlessly inside the Host's navigation stack.
4. **Offline Hydration**: To support offline launch, the Container App can eagerly pre-download and cache remote chunks to local MMKV/FileSystem storage during background sync cycles.

---

## 🔒 Section 13: Advanced Mobile Security & Reverse Engineering Defenses
*⏱️ 3 min read*

Fintech, banking, and wealth-management applications deal with high-value transactions and sensitive PII. Security must be managed across multiple client-side vectors.

### 1. Root & Jailbreak Detection
Compromised operating systems (rooted Android, jailbroken iOS) bypass kernel sandbox isolation, allowing attackers to inspect active RAM, log keys, and bypass local authentication controls.
- **Android Root Indicators**: 
  - Presence of system files like `su` or `busybox` in directories like `/system/bin/`, `/system/xbin/`, `/sbin/`, `/system/sd/xbin/`.
  - Installed root packages (e.g., SuperSU, Magisk manager).
  - Writable `/system` directory permissions (checking mounting tables).
- **iOS Jailbreak Indicators**:
  - Presence of directories or files like `Cydia.app`, `MobileSubstrate.dylib`, `/etc/apt/`, `/Library/MobileSubstrate/MobileSubstrate.dylib`.
  - Testing sandbox escaping by attempting to write a test file outside the app's document directory.
  - Checking if system calls like `fork()` return valid process IDs (sandboxed iOS apps cannot spawn subprocesses).

### 2. Runtime Debugging & Anti-Frida Protection
Attackers use dynamic instrumentation frameworks to hook Javascript or Native methods in memory at runtime to alter application logic (e.g. bypassing biometric screens).
- **Anti-Debugging Hooks**:
  - **Android**: Custom modules query `android.os.Debug.isDebuggerConnected()` or inspect the `/proc/self/status` file for the `TracerPid` property. A non-zero `TracerPid` value indicates an attached debugger process.
  - **iOS**: Invoking the `ptrace` system call with the `PT_DENY_ATTACH` flag in native C layer. This informs the kernel to terminate the application if a debugger (like LLDB) attempts to attach.
- **Frida Defenses**:
  - Frida typically runs a background server listening on TCP port `27042`. Native modules scan active socket tables on localhost to detect this port.
  - Detecting the injection of Frida’s dynamic library (`frida-agent.so` or `frida-gadget.dylib`) by parsing local memory mappings (`/proc/self/maps` on Android, or calling `_dyld_get_image_name` on iOS).

### 3. Native Code Obfuscation (R8 & ProGuard)
- **ProGuard / R8**: Build-time tools that shrink, optimize, and obfuscate Android Java/Kotlin bytecode. They replace human-readable class, method, and variable names (e.g., `PaymentService.processTransaction`) with minified tokens (e.g., `a.b`), complicating static analysis in decompilers (like JADX).
- Developers must maintain a `proguard-rules.pro` file specifying `-keep` directives for React Native library bindings; otherwise, ProGuard may optimize and strip native method interfaces called from JavaScript, resulting in `NoSuchMethodError` crashes.

### 4. Hardened Secret Management (C++ JNI)
- **The Vulnerability**: Storing access keys or encryption secrets in `.env` files is insecure. Metro compiles `.env` variables directly into plaintext strings inside the final Javascript bundle file (`index.bundle`), which can be extracted in seconds using standard string analysis tools (`strings index.bundle`).
- **The Secure Solution (JNI/C++)**: Store cryptographic keys or API secrets inside C++ header files. C++ code compiles directly into native machine code binary files (`.so` library file on Android, `.a` static library on iOS), which cannot be read as plain text.
  - The C++ library exposes JNI wrappers (Android) and Objective-C++ wrappers (iOS) to resolve keys dynamically.
  - To prevent memory scanning, the keys are stored inside C++ as XOR-masked byte arrays and decrypted in memory only at the moment of request.

---

## ⚡ Section 14: App Startup Performance & Modern Debugging (Post-Flipper)
*⏱️ 2 min read*

Optimizing startup speed directly drives user conversion. Senior developers split app launch calculations into discrete phases and utilize modern debugging tools.

### 1. Breakdown of App Startup Phases
1. **Pre-Main Phase (Native Init)**: 
   - The OS loads the application binary.
   - Dynamic linker (`dyld` on iOS) loads frameworks and CocoaPods.
   - Native constructors and initializers run.
   - Native libraries are initialized.
2. **Main Phase (React Native Context Init)**:
   - Android JVM / iOS Main runs.
   - Hermes engine instance is instantiated.
   - React Native core context and native module registries are loaded into memory.
3. **JS Execution Phase**:
   - The Hermes engine reads and parses the pre-compiled `.hbc` bytecode bundle.
   - JavaScript global variables are allocated, files are imported, and initial execution starts.
4. **Visual Paint Phase**:
   - React mounts the initial component tree.
   - The Yoga engine calculates Flexbox rules.
   - Native UI views are instantiated on the Main Thread and rendered to the device screen (Time-to-Interactive - TTI achieved).

### 2. TTI Optimization Strategies
- **Inline Requires**: Enabled in `metro.config.js`. It wraps imports in helper functions that lazy-resolve files only when they are first referenced in code. This stops the JS execution engine from evaluating all imported modules at initial app boot.
- **Lazy SDK Initialization**: Do not initialize heavy libraries (e.g., PostHog, Branch, Sentry) on the main app boot timeline. Initialize them asynchronously inside `InteractionManager.runAfterInteractions` or wrap them in background timers after the primary UI has painted.
- **Hermes Bytecode AOT**: Ensure Hermes compilation is enabled so JavaScript compiles to bytecode during CI assembly, completely skipping the JS text parsing and optimization phases during runtime startup.

### 3. Debugging in the Post-Flipper Era
With **Flipper** deprecated and removed from modern React Native templates, teams use the bundled **React Native DevTools** experience plus native profilers:
- **React Native DevTools Desktop App**: Modern RN releases ship a bundled DevTools app rather than relying on a browser window. It supports component inspection, console, breakpoints, and modern debugging flows.
- **Network Panel**: Modern DevTools includes built-in network inspection for `fetch`, `XMLHttpRequest`, and image requests, including request metadata and initiator information where supported.
- **Performance Panel**: RN DevTools can record JavaScript execution, React performance tracks, user timings, and network events in one timeline. This is now the first answer for JS-side performance profiling.
- **Native Profilers**: Use Android Studio Profiler, Perfetto, and Xcode Instruments for main-thread stalls, native heap growth, startup tracing, and OS-level crashes.
- **Memory Profiling**: Use Hermes-compatible heap snapshots and native memory tools together; JS heap leaks and native view leaks often have different roots.
- **Network Proxy Triage**: To inspect API network calls without debugging overlays, use **Charles Proxy** or **Proxyman**. 
  - Install custom SSL certificate authorities on simulators.
  - Configure `networkSecurityConfig` XML rules on Android to explicitly trust user certificates *only* inside debug/staging compilation schemes, keeping production binaries locked.

---

## 📦 Section 15: Over-the-Air (OTA) Updates & In-App Purchases (IAP)
*⏱️ 2 min read*

### 1. Over-the-Air (OTA) Bundle Delivery
OTA systems bypass store approval times for JavaScript-only updates. For interviews, explain the general OTA model first, then mention that **Expo/EAS Updates** is common for Expo or CNG-based apps, while bare RN teams may use a self-hosted or New-Architecture-compatible OTA provider. Do not present Microsoft App Center CodePush as the default managed service for new projects, because the App Center service has been retired.
- **Handshake Flow**: On launch, the native app shell calls the update registry API, passing the current binary version and active bundle hash. If a new bundle version matches the query, the client downloads the file in the background. On the next restart, the path reference shifts to execute the new Hermes bytecode.
- **Binary Version Locks**: Native module libraries are compiled directly into APKs/IPAs. If an OTA update pushes new JS code that attempts to invoke a native API that does not exist in the client’s running binary code, it triggers an instant fatal crash. 
  - *Mitigation*: OTA configurations enforce strict runtime locks mapping JS bundles to specific app binary version ranges.
- **Rollback Systems**: The native update shell tracks initialization success. If the app crashes repeatedly within a few minutes of executing an OTA bundle, the native runner cancels the reference pointer and rolls back to the stable local embedded bundle.

### 2. In-App Purchases & Subscription Lifecycles
- **Client flow**: Standard libraries like `react-native-iap` fetch products and coordinate checkout transactions with Apple's StoreKit 2 and Google Play Billing.
- **Hacking Risks**: Jailbroken devices can use local receipt-bypass scripts to intercept the billing transaction success handler, returning a mock "success" payload without charging the user. Thus, client-side receipt parsing is highly insecure.
- **Secure Server-to-Server Validation Flow**:
  1. The app executes a checkout flow. Apple/Google returns an encrypted transaction receipt.
  2. The mobile app uploads this raw receipt to our secure backend database.
  3. The backend makes a cryptographic call to Apple's App Store Connect API / Google's Developer API to validate the receipt.
  4. Once validated by the store server, our database updates the user's subscription record, notifying the app.
  5. **Subscription Webhooks**: The backend registers webhook endpoints with Apple and Google. When a user renews, cancels, refunds, or has a billing issue, Apple/Google hits our server directly, keeping the system database accurate even if the user never opens the app.

---

## 🌐 Section 16: React Native for Web (Cross-Platform Development)
*⏱️ 3 min read*

React Native for Web (`react-native-web`) makes it possible to run React Native applications on the web using standard web technologies. It acts as a translation layer between React Native components/APIs and native HTML DOM equivalents.

### 1. How It Works (Compilation & Mapping)
- **Component Mapping**: At runtime, React Native components are mapped to semantic HTML elements:
  - `<View>` ➡️ `<div>` (with `display: flex` and layout rules styling)
  - `<Text>` ➡️ `<span>` (or `<div role="text">`)
  - `<Image>` ➡️ `<img>`
  - `<TextInput>` ➡️ `<input>` or `<textarea>`
  - `<ScrollView>` ➡️ `<div>` with `overflow: auto`
- **Style Compilation**: `StyleSheet.create` compiles style declarations into static, unique CSS classes at build time or initial render, attaching them using `className` elements to avoid the slow performance of runtime inline styles.

### 2. Monorepo Setup & Code Sharing
- To share code between iOS, Android, and Web, developers structure projects in monorepos (e.g., using Yarn Workspaces, Turborepo, or Nx):
  - `packages/app/`: Core UI components, hooks, stores, and business logic.
  - `apps/mobile/`: Native React Native shell (configured via Metro).
  - `apps/web/`: Web application shell (Next.js, Vite, or Webpack).
- **Metro and Webpack Integration**:
  - Web builders use bundlers like Webpack or Vite. You configure them to resolve `.web.js` extensions first, and alias React Native dependencies to React Native for Web:
    ```javascript
    // webpack.config.js alias rules
    resolve: {
      alias: {
        'react-native$': 'react-native-web'
      },
      extensions: ['.web.js', '.js', '.ts', '.tsx']
    }
    ```

### 3. Key Differences & Limitations
- **Platform-Specific Code**: Use the `Platform` API or platform-specific extensions:
  - `MyComponent.android.tsx` / `MyComponent.ios.tsx` / `MyComponent.web.tsx`
- **API Availability**:
  - Many native APIs (e.g., `Camera`, `Keychain` secure storage, push notifications, and hardware sensor listeners) do not exist on the web.
  - *Remedial Strategy*: Wrap these in abstract service wrappers. For storage, use `localStorage` or `IndexedDB` on Web, while using native `MMKV` or `AsyncStorage` on mobile.
- **Layout Behavior**: Web scroll containers and focus accessibility outlines behave differently than mobile OS equivalents. You must explicitly configure `outlineStyle: 'none'` in styles to prevent focus rings on interactive divs.

---

## 📦 Section 17: App Size & Bundle Optimization (APK & IPA Reduction)
*⏱️ 3 min read*

Reducing app binary weight directly reduces user acquisition bounce rates. Senior developers target optimizations across both JavaScript assets and platform-specific native binaries.

### 1. Android Specific Size Reduction (build.gradle)
- **CPU Architecture (ABI) Splitting**:
  - By default, a release build packs native `.so` binaries for all supported CPU architectures (arm64-v8a, armeabi-v7a, x86, x86_64) into a single "fat" APK.
  - *Optimization*: Configure Gradle to split APKs per architecture or generate an **Android App Bundle (AAB)** which lets the Google Play Store serve optimized, single-architecture APKs to user devices:
    ```groovy
    // android/app/build.gradle
    def enableSeparateBuildPerCPUArchitecture = true
    ```
- **Code Shrinking & Obfuscation (R8/ProGuard)**:
  - R8 traverses the Java/Kotlin compile tree, performing static dead-code stripping (tree shaking) and class minification.
  - *Optimization*: Enable ProGuard in release builds:
    ```groovy
    def enableProguardInReleaseBuilds = true
    ```
- **Locale & Resource Configurations (`resConfigs`)**:
  - If third-party libraries (e.g. Google Play Services) bundle multiple localized resource dictionaries, strip unused translations to save several megabytes:
    ```groovy
    defaultConfig {
        resConfigs "en", "es" // Bundles English and Spanish translations only
    }
    ```

### 2. iOS Specific Size Reduction (Xcode Configurations)
- **Apple App Slicing**:
  - Organize raw image assets into **Asset Catalogs (`.xcassets`)** rather than bundling raw PNGs in the bundle root. The App Store uses App Slicing to package only the image densities (`@2x`, `@3x`) matching the target device.
- **Stripping Debug Symbols**:
  - Configure build settings to strip debugging logs and symbol mapping references from the final compiled binary:
    - Set `Strip Debug Symbols During Copy` to `YES`.
    - Set `Deployment Postprocessing` to `YES`.
- **CocoaPods Optimization**:
  - Avoid compiling unused native dependencies. Inspect `Podfile` configurations and use modular imports to limit framework inclusions.

### 3. JavaScript & Bundle Optimization
- **Hermes Bytecode Engine**:
  - Ensure Hermes is enabled. Pre-compiling raw JS files into Hermes bytecode (`.hbc`) reduces bundle parse overhead and reduces final binary size.
- **Bundle Auditing (react-native-bundle-visualizer)**:
  - Run the visualizer to construct a tree-map of your `index.bundle`, highlighting which NPM packages consume the most space.
- **Tree-Shaking & Dependency Pruning**:
  - Avoid importing massive monolithic libraries like `lodash` in their entirety. Instead of `import { cloneDeep } from 'lodash'`, use `import cloneDeep from 'lodash/cloneDeep'` or migrate to lighter utilities.
  - Replace heavy icons libraries with optimized vector files compiled via SVGR.
  - Compress local assets (convert PNG/JPG backgrounds to highly optimized WebP format).

---

## ⚡ Section 18: Senior-Level Performance Engineering Checklist
*⏱️ 3 min read*

Ensure smooth 60/120 FPS interactions and minimize thread blocks by checking off these core performance vectors during code reviews:

### 1. Minimizing Bridge & JSI Crossing Overhead
- **The Rule**: Keep interactions on the native thread without jumping back to JavaScript.
- **Implementation**:
  - Use **React Native Reanimated** and **Gesture Handler** to run touch responses, scrolling, and dragging animations fully on the UI thread using C++ Worklets.
  - Do not pass high-frequency events (like `onScroll` coordinates) back to the JS thread to update React state; bind them directly to native layout transforms using shared values.

### 2. Render Loop Optimization
- **Prevent Unnecessary Updates**:
  - Wrap list items and heavy components in `React.memo` using strict dependency comparisons.
  - Memoize complex calculations with `useMemo`, and callbacks with `useCallback` to preserve reference identities across renders.
  - Avoid inline objects or arrow functions inside component render trees (e.g. `<Component style={{ padding: 10 }} onPress={() => execute()} />`).

### 3. Dynamic Lists (FlashList / FlatList)
- **Virtualization Tuning**:
  - Set `windowSize` to a low value (e.g., `5` screens' worth of elements) to prevent excessive off-screen allocations.
  - Pass `getItemLayout` (for FlatList) or `estimatedItemSize` (for FlashList) to completely bypass dynamic cell measurements.
  - Use `keyExtractor` returning unique IDs to prevent reconciliation tree rebuilds.

### 4. Memory Leak Triage
- **Clean up Subscriptions**: Always return cleanup functions in `useEffect` hooks to destroy native event listeners (`DeviceEventEmitter`), interval timers, and database subscription queries.
- **Request Aborting**: Use `AbortController` in Axios/Fetch configurations to abort active HTTP network promises if components unmount before the API resolves.

---

## 🔗 Section 19: Bridgeless Mode & React Native Runtime
*⏱️ 3 min read*

The New Architecture introduced JSI, TurboModules, and Fabric to replace specific aspects of the legacy Bridge. However, even with these components enabled, the old Bridge infrastructure could still remain active as a **fallback path** for legacy native modules, event emitters, and certain internal subsystems. **Bridgeless Mode** is the final architectural step that removes the Bridge entirely from the runtime, completing the New Architecture migration.

### 1. What is Bridgeless Mode?
- In earlier New Architecture adoption, apps could run Fabric for rendering and TurboModules for native module access, but the `RCTBridge` singleton was still instantiated at startup to support legacy compatibility layers (old `NativeModules`, `DeviceEventEmitter` over Bridge, and certain internal RN subsystems).
- **Bridgeless Mode** eliminates the `RCTBridge` object completely. Every communication path between JavaScript and Native—rendering, module invocation, event dispatch, error handling—flows exclusively through **JSI-backed C++ interfaces**.
- This is not just a performance optimization; it is an architectural simplification that removes an entire class of serialization overhead, startup cost, and thread-coordination complexity.

### 2. React Native Runtime
The **React Native Runtime** is the unified C++ runtime layer that hosts all core subsystems after the Bridge is removed:

```text
┌──────────────────────────────────────────────┐
│              React Native Runtime            │
│  ┌────────────────────────────────────────┐  │
│  │  Hermes Engine (JavaScript Execution)  │  │
│  └──────────────┬─────────────────────────┘  │
│                 │ JSI (C++ Bindings)          │
│       ┌─────────┼──────────┐                 │
│       ▼         ▼          ▼                 │
│   Fabric    TurboModules  Event Loop         │
│  (Renderer)  (Native API)  (Async Tasks)     │
└──────────────────────────────────────────────┘
```

- **Hermes** executes JavaScript and exposes host objects through JSI.
- **Fabric** handles view creation, layout computation (Yoga), and commits to the native UI thread.
- **TurboModules** provide lazy-loaded, type-safe access to native platform APIs.
- **The Event Loop** manages async callbacks, timers, and microtask queues without any Bridge relay.

### 3. Bridgeless vs. New Architecture with Bridge Fallback

| Aspect | New Arch + Bridge Fallback | Fully Bridgeless |
| :--- | :--- | :--- |
| **RCTBridge** | Still instantiated at startup | Completely removed |
| **Legacy NativeModules** | Supported via Bridge compatibility layer | Must migrate to TurboModules or use interop layer |
| **Event Emitters** | Can fall back to Bridge-based `DeviceEventEmitter` | Must use TurboModule event emitters or JSI-based events |
| **Startup Cost** | Bridge initialization adds ~50-150ms overhead | No Bridge init; faster cold start |
| **Memory Footprint** | Bridge infrastructure retained in memory | Reduced baseline memory |
| **Runtime Complexity** | Two communication paths (JSI + Bridge) coexist | Single unified JSI path |

### 4. Enabling Bridgeless Mode
- **React Native 0.73+**: Bridgeless Mode became available as an opt-in configuration.
- **React Native 0.78+**: Bridgeless Mode is enabled by default with the New Architecture.
- **Android** (`ReactNativeHost` or `ReactActivity`):
  ```kotlin
  override val reactHost: ReactHost
      get() = ReactHostBuilder(applicationContext, jsMainModuleName, bundleAssetName)
          .setBridgelessEnabled(true)
          .build()
  ```
- **iOS** (`AppDelegate`):
  ```swift
  // In RCTAppDelegate subclass
  override func bundleURL() -> URL? {
      RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index")
  }
  // Bridgeless is automatically enabled when using RCTAppDelegate with New Architecture
  ```

### 5. What Breaks When You Go Bridgeless?
- **Legacy `NativeModules` access**: Any module registered via the old `RCTBridgeModule` protocol without a TurboModule spec will not be found. You must either migrate to TurboModules or use the **Interop Layer** (a compatibility shim that wraps legacy modules for Bridgeless).
- **`RCTBridge` direct references**: Any native code that accesses `self.bridge` or `reactContext.catalystInstance` will crash. These must be refactored to use `RCTModuleRegistry` or TurboModule APIs.
- **Third-party libraries**: Libraries that have not updated to support Bridgeless Mode will fail at runtime. Always verify library compatibility before enabling.
- **Custom `DeviceEventEmitter` patterns**: Bridge-based event emission must be replaced with TurboModule-based event emitters using Codegen specs.

> *"What is Bridgeless Mode and why is it the final step of the New Architecture?"*

- **Strategic Response**: Bridgeless Mode removes the last remnant of the legacy Bridge from the runtime. While JSI, Fabric, and TurboModules replaced specific subsystems, the Bridge could still exist as a fallback for legacy modules and internal event dispatch. Bridgeless Mode eliminates `RCTBridge` entirely, creating a single unified communication path through JSI. This reduces startup time by removing Bridge initialization overhead, lowers memory usage, and simplifies the runtime architecture. It became the default in RN 0.78+, but requires all native modules to be TurboModule-compatible or wrapped with the interop layer.

> *"How would you audit a large codebase before enabling Bridgeless Mode?"*

- **Strategic Response**: I would first search for any direct `RCTBridge` references in native code and any `NativeModules.X` usage in JavaScript that doesn't have a corresponding TurboModule spec. Then I would audit all third-party native dependencies against the React Native New Architecture compatibility tracker. For libraries without Bridgeless support, I would either upgrade, fork and patch, or use the interop layer as a temporary shim. Finally, I would enable Bridgeless in a feature branch, run the full E2E suite, and monitor for runtime crashes in native module initialization.

---

## 🔄 Section 20: Redux Saga & Redux Thunk Deep-Dive
*⏱️ 5 min read*

### 1. Redux Thunk
A **thunk** is a function that returns another function. In Redux, a thunk is a middleware that allows you to write action creators that return a function (receiving `dispatch` and `getState`) instead of a plain action object. This enables asynchronous logic inside Redux.

- **`createAsyncThunk` (Redux Toolkit)**: The modern standard for async operations in Redux. It automatically generates `pending`, `fulfilled`, and `rejected` action types and dispatches them at the appropriate lifecycle stages.

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

// Define the async thunk
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data; // This becomes the `fulfilled` payload
    } catch (error: any) {
      // rejectWithValue sends a typed error payload to the `rejected` case
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// Handle in slice
const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
```

### 2. Redux Saga
Redux Saga is a middleware library that uses **ES6 generator functions** (`function*`) to manage complex asynchronous side effects. Generator functions can pause execution (`yield`), making async flows read like synchronous code and enabling powerful patterns like cancellation, racing, and forking.

#### Core Saga Effects

| Effect | Purpose | Example |
| :--- | :--- | :--- |
| `call(fn, ...args)` | Calls a function (typically an API) and waits for the result | `yield call(api.login, credentials)` |
| `put(action)` | Dispatches a Redux action | `yield put({ type: 'LOGIN_SUCCESS', payload })` |
| `takeEvery(pattern, saga)` | Spawns a saga for every matching action (concurrent) | `yield takeEvery('FETCH_DATA', fetchSaga)` |
| `takeLatest(pattern, saga)` | Cancels previous saga if a new action arrives (debounce-like) | `yield takeLatest('SEARCH', searchSaga)` |
| `fork(saga, ...args)` | Non-blocking call, spawns a concurrent saga task | `const task = yield fork(pollSaga)` |
| `cancel(task)` | Cancels a forked task | `yield cancel(task)` |
| `race(effects)` | Runs multiple effects, resolves with the first to finish | `yield race({ response: call(api), timeout: delay(5000) })` |
| `all(effects)` | Runs multiple effects in parallel, waits for all | `yield all([call(fetchA), call(fetchB)])` |
| `select(selector)` | Reads current Redux state | `const token = yield select(getToken)` |
| `delay(ms)` | Pauses saga execution for specified milliseconds | `yield delay(3000)` |

#### Login Saga with Token Refresh & Error Handling

```typescript
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { api } from '../services/api';
import { loginSuccess, loginFailure, setLoading } from '../slices/authSlice';
import { saveTokens } from '../utils/secureStorage';

function* loginSaga(action: { type: string; payload: { email: string; password: string } }) {
  try {
    yield put(setLoading(true));

    // Call login API
    const response: { accessToken: string; refreshToken: string; user: any } =
      yield call(api.post, '/auth/login', action.payload);

    // Persist tokens securely (Keychain/Keystore)
    yield call(saveTokens, response.accessToken, response.refreshToken);

    // Dispatch success with user data
    yield put(loginSuccess({ user: response.user, token: response.accessToken }));
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
  } finally {
    yield put(setLoading(false));
  }
}

// Watcher saga
export function* authWatcherSaga() {
  yield takeLatest('auth/loginRequest', loginSaga);
}
```

#### Polling Saga with Cancellation

```typescript
import { call, put, delay, fork, cancel, take } from 'redux-saga/effects';
import { Task } from 'redux-saga';

function* pollOrderStatus(orderId: string) {
  while (true) {
    try {
      const status: { state: string } = yield call(api.get, `/orders/${orderId}/status`);
      yield put({ type: 'ORDER_STATUS_UPDATED', payload: status });

      if (status.state === 'DELIVERED' || status.state === 'CANCELLED') {
        break; // Stop polling when terminal state reached
      }

      yield delay(5000); // Poll every 5 seconds
    } catch (error) {
      yield put({ type: 'ORDER_POLL_ERROR', payload: error });
      yield delay(10000); // Back off on error
    }
  }
}

function* watchOrderPolling() {
  while (true) {
    const action: { payload: string } = yield take('START_ORDER_POLLING');
    const pollTask: Task = yield fork(pollOrderStatus, action.payload);

    // Wait for stop action or screen unmount, then cancel the polling fork
    yield take('STOP_ORDER_POLLING');
    yield cancel(pollTask);
  }
}
```

#### Saga vs. Thunk Comparison

| Feature | Redux Thunk | Redux Saga |
| :--- | :--- | :--- |
| **Complexity** | Simple, minimal boilerplate | Higher learning curve (generators) |
| **Async Model** | Promises (`async/await`) | Generator functions (`function*`) |
| **Cancellation** | Manual (`AbortController`) | Built-in (`cancel`, `takeLatest`) |
| **Concurrency** | Limited control | Full control (`fork`, `race`, `all`) |
| **Testing** | Requires mocking API calls | Effects are plain objects; highly testable |
| **Debouncing** | Manual implementation | Built-in (`takeLatest`, `delay`) |
| **Polling** | `setInterval` + cleanup | `while(true) + delay` with `fork/cancel` |
| **Best For** | Simple CRUD, straightforward async | Complex flows, websockets, polling, orchestration |

### 3. Jotai (Atomic State)
**Jotai** is a primitive atomic state management library for React. Unlike Zustand (which uses a single store with selectors), Jotai uses a bottom-up approach where state is composed from individual **atoms**.

- **Atoms**: The smallest unit of state. Each atom holds a single value and can be read/written from any component.
- **Derived Atoms**: Atoms that compute their value from other atoms (similar to Recoil selectors).
- **Async Atoms**: Atoms whose initial value is resolved from an asynchronous operation (API call, storage read).

```typescript
import { atom, useAtom } from 'jotai';

// Primitive atom
const countAtom = atom(0);

// Derived atom (read-only, computed from other atoms)
const doubledCountAtom = atom((get) => get(countAtom) * 2);

// Async atom
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// Writable derived atom
const incrementAtom = atom(
  (get) => get(countAtom),
  (get, set) => set(countAtom, get(countAtom) + 1)
);

// Usage in component
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubled] = useAtom(doubledCountAtom);

  return (
    <View>
      <Text>Count: {count}, Doubled: {doubled}</Text>
      <Button title="Increment" onPress={() => setCount((c) => c + 1)} />
    </View>
  );
}
```

| Feature | Jotai | Zustand | Redux Toolkit |
| :--- | :--- | :--- | :--- |
| **Mental Model** | Bottom-up atoms | Top-down single store | Top-down single store with slices |
| **Re-render Scope** | Only components using the specific atom | Selector-based | Selector-based |
| **Boilerplate** | Minimal | Minimal | Medium |
| **DevTools** | jotai-devtools | Zustand middleware | Redux DevTools |
| **Best For** | Fine-grained state, component-local shared state | Medium-to-large app state | Enterprise apps with complex middleware |

> *"Explain the difference between `takeEvery` and `takeLatest` in Redux Saga."*

- **Strategic Response**: `takeEvery` spawns a new saga instance for every dispatched action matching the pattern, allowing concurrent executions. If a user taps a button 5 times rapidly, 5 saga instances run in parallel. `takeLatest` automatically cancels any previously running saga instance when a new matching action arrives, keeping only the latest execution. This makes `takeLatest` ideal for search-as-you-type or form submission where only the most recent request matters.

> *"How do you handle API call cancellation in Redux Saga?"*

- **Strategic Response**: Saga provides built-in cancellation through the `fork` and `cancel` effects. You fork a worker saga as a detached task, then listen for a cancellation action. When received, you call `cancel(task)` which throws a `Cancelled` error inside the forked generator, allowing cleanup in a `finally` block. Additionally, `takeLatest` implicitly cancels prior instances. For HTTP-level cancellation, you can pass an `AbortController` signal to the fetch call and abort it in the saga's `finally` block.

> *"When would you choose Saga over Thunk?"*

- **Strategic Response**: I choose Saga when the app has complex async orchestration requirements: real-time polling with cancellation, WebSocket message routing, race conditions between multiple API calls, retry logic with exponential backoff, or event-driven workflows where actions trigger chains of other actions. For straightforward CRUD operations where I just need to fetch data and handle loading/error states, `createAsyncThunk` from Redux Toolkit is simpler and sufficient. In my experience, Saga shines in fintech and e-commerce apps where transaction flows are multi-step and cancellable.

---

## ✨ Section 21: Shared Element Transitions & Advanced Animation Patterns
*⏱️ 3 min read*

### 1. Shared Element Transitions
Shared Element Transitions create the visual illusion that a UI element (like a photo thumbnail, card, or avatar) seamlessly transforms from one screen to another during navigation. The element appears to "fly" from its position on the source screen to its destination on the target screen, preserving visual continuity.

- **How It Works**: Two views on different screens are tagged with the same identifier. During the navigation transition, the system calculates the start and end position/size of the tagged element and animates the transform between them. The original element is hidden, and a clone is animated across the transition overlay.

- **Reanimated 3 + React Navigation Shared Transitions**:
  React Native Reanimated 3 introduced built-in support for shared element transitions using the `sharedTransitionTag` prop:
  ```tsx
  import Animated from 'react-native-reanimated';
  import { SharedTransition } from 'react-native-reanimated';

  // Source Screen (Gallery Grid)
  function GalleryScreen({ navigation }) {
    return (
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Detail', { photo: item })}>
            <Animated.Image
              source={{ uri: item.uri }}
              sharedTransitionTag={`photo-${item.id}`}
              style={styles.thumbnail}
            />
          </Pressable>
        )}
      />
    );
  }

  // Destination Screen (Photo Detail)
  function DetailScreen({ route }) {
    const { photo } = route.params;
    return (
      <Animated.Image
        source={{ uri: photo.uri }}
        sharedTransitionTag={`photo-${photo.id}`}
        style={styles.fullImage}
      />
    );
  }
  ```
  The `sharedTransitionTag` prop must match between source and destination. Reanimated handles the interpolation, clipping, and z-ordering automatically.

### 2. Micro-Interactions & Advanced Patterns
- **Button Press Animations**: Scale-down feedback on press using `useAnimatedStyle` and `withSpring`:
  ```typescript
  import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
  import { Gesture, GestureDetector } from 'react-native-gesture-handler';

  function AnimatedButton({ onPress, children }) {
    const scale = useSharedValue(1);

    const gesture = Gesture.Tap()
      .onBegin(() => { scale.value = withSpring(0.92); })
      .onFinalize(() => { scale.value = withSpring(1); onPress?.(); });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.button, animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
  ```

- **Skeleton Loaders**: Animated gradient shimmer placeholders rendered while data fetches. Use Reanimated's `useSharedValue` with `withRepeat(withTiming(...))` to loop the shimmer translation across a `LinearGradient` mask.

- **Gesture-Driven Swipe-to-Dismiss**:
  ```typescript
  import { Gesture, GestureDetector } from 'react-native-gesture-handler';
  import Animated, {
    useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS,
  } from 'react-native-reanimated';

  function SwipeToDismiss({ onDismiss, children }) {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);

    const panGesture = Gesture.Pan()
      .onUpdate((event) => {
        translateY.value = Math.max(0, event.translationY); // Only allow downward swipe
        opacity.value = 1 - translateY.value / 400;
      })
      .onEnd(() => {
        if (translateY.value > 150) {
          // Dismiss threshold reached
          translateY.value = withTiming(800, { duration: 200 });
          opacity.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(onDismiss)();
          });
        } else {
          // Snap back
          translateY.value = withSpring(0);
          opacity.value = withSpring(1);
        }
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </GestureDetector>
    );
  }
  ```

### 3. Worklets in Reanimated
**Worklets** are small JavaScript functions that are compiled and executed on the **UI thread** instead of the JS thread. This is what makes Reanimated animations run at 60/120 FPS without Bridge or JS thread involvement.

- Any function passed to Reanimated gesture callbacks (`.onUpdate()`, `.onEnd()`) or `useAnimatedStyle` runs as a Worklet.
- Worklets cannot access regular JS-thread variables directly. Use `useSharedValue` for cross-thread shared state.
- To call JS-thread functions from a Worklet (e.g., navigation, state dispatch), wrap them with `runOnJS(fn)()`.

> *"How would you implement a photo gallery with shared element transitions?"*

- **Strategic Response**: I would use React Navigation's native stack with Reanimated 3's `sharedTransitionTag` prop. Each thumbnail in the `FlatList` grid receives a unique tag like `photo-${id}`. The detail screen renders a full-size `Animated.Image` with the same tag. Reanimated interpolates the position, size, and border radius between screens automatically. I would ensure the navigation uses `@react-navigation/native-stack` (not JS-based stack) since native stack transitions integrate better with shared element animations. For smooth performance, images should be pre-cached using `react-native-fast-image`.

> *"How do you create a swipe-to-dismiss gesture animation?"*

- **Strategic Response**: I combine `react-native-gesture-handler`'s `Gesture.Pan()` with Reanimated shared values. On `onUpdate`, I map the vertical translation to both `translateY` and `opacity`. On `onEnd`, I check if the translation exceeds a dismiss threshold (e.g., 150dp). If so, I animate out with `withTiming` and call the dismiss callback via `runOnJS`. Otherwise, I snap back with `withSpring`. The entire gesture and animation runs on the UI thread as Worklets, so there is zero frame drop.

---

## 🖼️ Section 22: Native UI Components (ViewManagers)
*⏱️ 3 min read*

### 1. Native Modules vs. Native UI Components
- **Native Modules** expose native **logic and APIs** to JavaScript (e.g., reading device battery level, accessing Bluetooth, encrypting data). They do not render any visual UI.
- **Native UI Components** expose native **views** to JavaScript (e.g., a native map view, a native video player, a custom camera preview). They render platform-specific UI elements that are embedded directly into the React Native view tree.

### 2. Legacy Architecture: ViewManagers

#### Android ViewManager (Kotlin)
On Android, a Native UI Component is created by extending `SimpleViewManager<T>` where `T` is the native `View` subclass:

```kotlin
// NativeVideoViewManager.kt
package com.myapp.views

import android.widget.VideoView
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class NativeVideoViewManager : SimpleViewManager<VideoView>() {

    override fun getName(): String = "NativeVideoView"

    override fun createViewInstance(context: ThemedReactContext): VideoView {
        return VideoView(context)
    }

    @ReactProp(name = "videoUrl")
    fun setVideoUrl(view: VideoView, url: String?) {
        url?.let {
            view.setVideoPath(it)
            view.start()
        }
    }

    @ReactProp(name = "paused")
    fun setPaused(view: VideoView, paused: Boolean) {
        if (paused) view.pause() else view.start()
    }
}
```

Register via a `ReactPackage`:
```kotlin
class VideoViewPackage : ReactPackage {
    override fun createViewManagers(context: ReactApplicationContext) =
        listOf(NativeVideoViewManager())

    override fun createNativeModules(context: ReactApplicationContext) = emptyList()
}
```

#### iOS ViewManager (Swift/Objective-C)
On iOS, extend `RCTViewManager`:

```swift
// NativeVideoViewManager.swift
import UIKit
import AVKit

@objc(NativeVideoViewManager)
class NativeVideoViewManager: RCTViewManager {

    override func view() -> UIView! {
        return NativeVideoView()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
```

```swift
// NativeVideoView.swift
class NativeVideoView: UIView {
    private var playerLayer: AVPlayerLayer?

    @objc var videoUrl: String = "" {
        didSet {
            guard let url = URL(string: videoUrl) else { return }
            let player = AVPlayer(url: url)
            playerLayer?.removeFromSuperlayer()
            playerLayer = AVPlayerLayer(player: player)
            playerLayer?.frame = bounds
            layer.addSublayer(playerLayer!)
            player.play()
        }
    }
}
```

Bridge macro (Objective-C):
```swift
// NativeVideoViewManager.m
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(NativeVideoViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(videoUrl, NSString)
RCT_EXPORT_VIEW_PROPERTY(paused, BOOL)
@end
```

#### JavaScript Wrapper
```typescript
import { requireNativeComponent, ViewProps } from 'react-native';

interface NativeVideoViewProps extends ViewProps {
  videoUrl: string;
  paused?: boolean;
}

const NativeVideoView = requireNativeComponent<NativeVideoViewProps>('NativeVideoView');

export default NativeVideoView;
```

### 3. Fabric Native Components (Modern Replacement)
In the New Architecture, Native UI Components are defined using **Codegen specifications** instead of manual ViewManagers:
1. **Define a Spec**: Write a TypeScript interface describing the component's props using Codegen types (`codegenNativeComponent`).
2. **Codegen Generates Bindings**: The build process generates C++ `ShadowNode`, `ComponentDescriptor`, and platform-specific view manager boilerplate automatically.
3. **Implement the Native View**: Write the platform-specific view rendering code (Kotlin/Swift) conforming to the generated interface.

```typescript
// NativeVideoViewNativeComponent.ts (Codegen Spec)
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';

interface NativeProps extends ViewProps {
  videoUrl: string;
  paused?: boolean;
}

export default codegenNativeComponent<NativeProps>('NativeVideoView');
```

> *"What's the difference between a Native Module and a Native UI Component?"*

- **Strategic Response**: A Native Module exposes native logic (functions, APIs, computations) to JavaScript—it has no visual representation. You call its methods from JS. A Native UI Component exposes a native view that renders on screen and is embedded into the React Native view hierarchy. On Android, modules extend `ReactContextBaseJavaModule` while UI components extend `SimpleViewManager`. On iOS, modules use `RCT_EXPORT_MODULE()` while UI components use `RCTViewManager`. In the New Architecture, both use Codegen specs, but the distinction remains: TurboModules for logic, Fabric Native Components for views.

> *"How do you pass props from JS to a native view?"*

- **Strategic Response**: In legacy architecture, you annotate setter methods with `@ReactProp` on Android and use `RCT_EXPORT_VIEW_PROPERTY` macros on iOS. The JS side uses `requireNativeComponent` with a typed props interface. In Fabric, you define props in a Codegen spec TypeScript file, and the build generates type-safe C++ bindings that map directly to native view property setters without manual annotation.

---

## 🧭 Section 23: Navigation Performance & Universal Links
*⏱️ 3 min read*

### 1. Navigation Performance Optimization

#### Lazy Loading Screens
Loading all screens upfront increases initial bundle evaluation time and memory usage. Use `React.lazy` with React Navigation to defer screen component loading:

```typescript
import React, { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
const AnalyticsScreen = React.lazy(() => import('./screens/AnalyticsScreen'));

function LazyScreen(Component: React.LazyExoticComponent<any>) {
  return (props: any) => (
    <Suspense fallback={<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>}>
      <Component {...props} />
    </Suspense>
  );
}

// In navigator
<Stack.Screen name="Settings" component={LazyScreen(SettingsScreen)} />
<Stack.Screen name="Analytics" component={LazyScreen(AnalyticsScreen)} />
```

#### react-native-screens & Native Stack
- **`react-native-screens`** converts React Navigation screens into native platform views (`Fragment` on Android, `UIViewController` on iOS) instead of keeping them as JS-managed `<View>` wrappers.
- **`@react-navigation/native-stack`** uses native navigation controllers, resulting in smoother transitions and lower memory usage compared to the JS-based `@react-navigation/stack`.
- **`enableFreeze()`**: Calling `enableFreeze()` from `react-native-screens` freezes all JS rendering for screens that are not currently visible. Frozen screens consume zero JS thread resources, which is critical for apps with deep navigation stacks or heavy tab navigators.
  ```typescript
  import { enableFreeze } from 'react-native-screens';
  enableFreeze(true); // Call once at app startup
  ```

#### Navigation State Persistence
Save and restore navigation state across app restarts (useful for development and enterprise apps):
```typescript
const [isReady, setIsReady] = React.useState(false);
const [initialState, setInitialState] = React.useState();

React.useEffect(() => {
  const restoreState = async () => {
    const savedState = storage.getString('NAVIGATION_STATE');
    if (savedState) setInitialState(JSON.parse(savedState));
    setIsReady(true);
  };
  restoreState();
}, []);

if (!isReady) return null;

<NavigationContainer
  initialState={initialState}
  onStateChange={(state) => storage.set('NAVIGATION_STATE', JSON.stringify(state))}
>
  {/* navigators */}
</NavigationContainer>
```

#### Tab Navigator Optimization
- Set `lazy={true}` (default) on Tab navigators to defer rendering of tab screens until the user first visits them.
- Combine with `enableFreeze()` to prevent background tabs from re-rendering.

### 2. Universal Links (iOS) & App Links (Android)

#### Deep Links vs. Universal Links vs. App Links

| Type | Platform | Format | App Required? | Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **URI Scheme Deep Links** | Both | `myapp://path` | Yes (fails silently if not installed) | None |
| **Universal Links** | iOS | `https://domain.com/path` | No (opens browser if not installed) | Safari |
| **App Links** | Android | `https://domain.com/path` | No (opens browser if not installed) | Chrome |

#### Universal Links (iOS)
1. **Server Configuration**: Host an `apple-app-site-association` (AASA) file at `https://yourdomain.com/.well-known/apple-app-site-association`:
   ```json
   {
     "applinks": {
       "apps": [],
       "details": [
         {
           "appIDs": ["TEAM_ID.com.myapp.bundleid"],
           "paths": ["/deals/*", "/profile/*"]
         }
       ]
     }
   }
   ```
2. **Xcode**: Enable **Associated Domains** capability and add `applinks:yourdomain.com`.
3. **React Navigation**: Configure the `linking` prop to handle incoming URLs and map them to screens.

#### App Links (Android)
1. **Server Configuration**: Host `assetlinks.json` at `https://yourdomain.com/.well-known/assetlinks.json`:
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.myapp",
       "sha256_cert_fingerprints": ["SHA256_OF_SIGNING_CERT"]
     }
   }]
   ```
2. **AndroidManifest.xml**: Add intent filters with `autoVerify="true"`:
   ```xml
   <intent-filter android:autoVerify="true">
     <action android:name="android.intent.action.VIEW" />
     <category android:name="android.intent.category.DEFAULT" />
     <category android:name="android.intent.category.BROWSABLE" />
     <data android:scheme="https" android:host="yourdomain.com" android:pathPrefix="/deals" />
   </intent-filter>
   ```

#### Handling in React Navigation
```typescript
const linking = {
  prefixes: ['https://yourdomain.com', 'myapp://'],
  config: {
    screens: {
      Deals: 'deals/:dealId',
      Profile: 'profile/:userId',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* navigators */}
</NavigationContainer>
```

> *"How do Universal Links differ from custom URI scheme deep links?"*

- **Strategic Response**: URI scheme deep links (`myapp://`) require the app to be installed—if it's not, nothing happens or the user sees an error. They also lack domain verification, meaning any app could register the same scheme. Universal Links (`https://domain.com/path`) are verified through a server-hosted AASA file tied to your Apple Team ID, ensuring only your app handles those URLs. If the app isn't installed, Universal Links gracefully fall back to Safari. They also bypass the disambiguation dialog that URI schemes can trigger.

> *"How do you handle deferred deep linking?"*

- **Strategic Response**: Deferred deep linking handles the case where a user clicks a link but doesn't have the app installed yet. The link redirects them to the App Store. After installation and first launch, the app must recover the original link context. Services like Branch SDK persist the referral data server-side (using fingerprinting or clipboard APIs) and deliver it to the app on first open. In React Navigation, you listen for the Branch callback in your root component and programmatically navigate to the target screen with the original parameters.

---

## 🧹 Section 24: Code Quality & Developer Tooling
*⏱️ 4 min read*

### 1. ESLint Configuration for React Native
**ESLint** performs static analysis on your codebase, identifying problematic patterns, potential bugs, and code style violations before runtime.

- **Key Plugins**:
  - `@react-native/eslint-config`: Base configuration for React Native projects (extends community standards).
  - `eslint-plugin-react-hooks`: Enforces the Rules of Hooks (`exhaustive-deps`, no conditional hooks).
  - `eslint-plugin-react-native`: React Native-specific rules (`no-inline-styles`, `no-unused-styles`, `no-raw-text` to catch untranslated strings).

- **Example Configuration** (`eslint.config.mjs` — flat config format):
  ```javascript
  import reactNative from '@react-native/eslint-config';
  import reactHooks from 'eslint-plugin-react-hooks';
  import reactNativePlugin from 'eslint-plugin-react-native';

  export default [
    ...reactNative,
    {
      plugins: {
        'react-hooks': reactHooks,
        'react-native': reactNativePlugin,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-unused-styles': 'error',
        'react-native/no-raw-text': 'warn',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
    },
  ];
  ```

### 2. Prettier
**Prettier** is an opinionated code formatter that enforces consistent formatting across the entire codebase, eliminating style debates in code reviews.

- **Integration with ESLint**: Use `eslint-config-prettier` to disable ESLint rules that conflict with Prettier's formatting. Prettier handles formatting; ESLint handles logic/quality rules.

- **`.prettierrc` Configuration**:
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 100,
    "bracketSpacing": true,
    "arrowParens": "always"
  }
  ```

### 3. Husky & lint-staged
**Husky** is a Git hooks manager that runs scripts automatically at specific Git lifecycle events (pre-commit, pre-push, commit-msg).

- **Pre-commit Hook**: Run ESLint, Prettier, and TypeScript type checking on staged files only (not the entire codebase) using `lint-staged`:
  ```json
  {
    "lint-staged": {
      "*.{ts,tsx}": [
        "eslint --fix --max-warnings 0",
        "prettier --write"
      ],
      "*.{json,md}": [
        "prettier --write"
      ]
    }
  }
  ```

- **Pre-push Hook**: Run the full test suite before pushing to prevent broken code from reaching the remote:
  ```text
  # .husky/pre-push
  npx jest --bail --passWithNoTests
  npx tsc --noEmit
  ```

- **Setup Commands**:
  ```text
  npx husky init
  npm install --save-dev lint-staged
  ```

### 4. Commit Conventions
**Conventional Commits** enforce a structured commit message format that enables automated changelog generation, semantic versioning, and clear project history.

- **Format**: `<type>(<optional scope>): <description>`
- **Types**:

| Type | Usage |
| :--- | :--- |
| `feat:` | New feature or user-facing functionality |
| `fix:` | Bug fix |
| `chore:` | Build configs, dependency updates, CI changes |
| `docs:` | Documentation-only changes |
| `refactor:` | Code restructuring without behavior change |
| `test:` | Adding or updating test cases |
| `perf:` | Performance improvement |
| `style:` | Formatting changes (no logic change) |

- **Enforcement**: Use `commitlint` with Husky's `commit-msg` hook:
  ```text
  # .husky/commit-msg
  npx --no -- commitlint --edit "$1"
  ```

  ```json
  // commitlint.config.js
  { "extends": ["@commitlint/config-conventional"] }
  ```

### 5. Code Review Best Practices for Mobile Teams
- **PR Size Limits**: Keep PRs under ~400 lines of code changes. Large PRs lead to shallow reviews and missed bugs. Split features into vertical slices (e.g., API layer → state management → UI → tests).
- **Review Checklist**:
  - Performance: unnecessary re-renders, missing `memo`/`useCallback`, inline styles.
  - Accessibility: missing `accessibilityLabel`, touch target sizes (minimum 44x44pt).
  - Memory leaks: uncleaned `useEffect` subscriptions, missing `AbortController`.
  - Platform parity: tested on both iOS and Android, platform-specific code handled.
- **Automated Checks**: CI pipeline runs lint + type check + unit tests + build verification before a PR is eligible for human review. This prevents reviewers from wasting time on code that doesn't compile.

> *"How do you enforce code quality in a team of 10 developers?"*

- **Strategic Response**: I set up a three-layer defense. First, IDE-level: shared ESLint and Prettier configurations ensure real-time feedback as developers write code. Second, Git-level: Husky pre-commit hooks run lint-staged to auto-fix and validate only changed files, and commitlint enforces conventional commit messages. Third, CI-level: GitHub Actions runs the full lint, TypeScript type-check, and test suite on every PR. PRs cannot merge without passing all checks and receiving at least one approval. I also establish a team code review checklist covering performance, accessibility, and platform parity.

> *"What Git hooks do you set up for a React Native project?"*

- **Strategic Response**: Three hooks. Pre-commit: lint-staged runs ESLint with `--fix` and Prettier on staged `.ts/.tsx` files, catching issues before they enter the commit. Commit-msg: commitlint validates the commit message follows conventional commits format. Pre-push: runs `jest --bail` and `tsc --noEmit` to ensure tests pass and TypeScript compiles before code reaches the remote. This layered approach catches issues progressively without slowing down the development workflow.

---

## 📊 Section 25: Analytics & Monitoring Deep-Dive
*⏱️ 4 min read*

### 1. GA4 (Google Analytics 4)
GA4 uses an **event-based data model** (replacing Universal Analytics' session-based model). Every user interaction is an event with parameters.

- **Key Events**: `screen_view`, `purchase`, `sign_up`, `login`, `search`, `share`, and custom events.
- **User Properties**: Persistent attributes attached to a user (e.g., `subscription_tier`, `preferred_language`).
- **Integration**:
  ```typescript
  import analytics from '@react-native-firebase/analytics';

  // Log screen view
  await analytics().logScreenView({
    screen_name: 'ProductDetails',
    screen_class: 'ProductDetailsScreen',
  });

  // Log custom event
  await analytics().logEvent('add_to_cart', {
    item_id: 'SKU_12345',
    item_name: 'Premium Widget',
    value: 29.99,
    currency: 'USD',
  });

  // Set user property
  await analytics().setUserProperty('subscription_tier', 'premium');
  ```
- **Funnels**: Define conversion funnels (e.g., `screen_view(ProductList) → screen_view(ProductDetail) → add_to_cart → purchase`) to measure drop-off rates at each stage.

### 2. Segment (Customer Data Platform)
**Segment** is a customer data platform that acts as a single integration point. Instead of embedding 10 separate analytics SDKs, you send events to Segment, which routes them to configured destinations.

```text
[Mobile App] → Segment SDK → ┬→ GA4
                               ├→ Amplitude
                               ├→ Mixpanel
                               ├→ Sentry
                               ├→ Braze (Marketing)
                               └→ Data Warehouse (BigQuery)
```

- **Integration**:
  ```typescript
  import { createClient } from '@segment/analytics-react-native';

  const segmentClient = createClient({ writeKey: 'YOUR_WRITE_KEY' });

  // Track event
  segmentClient.track('Order Completed', {
    orderId: 'ORD-9876',
    total: 149.99,
    currency: 'USD',
  });

  // Identify user
  segmentClient.identify('user-123', {
    email: 'user@example.com',
    plan: 'enterprise',
  });
  ```

- **GDPR Consent Management**: Segment supports category-based consent. You configure which destinations require consent, and the SDK only sends events to destinations the user has opted into.

### 3. Amplitude
**Amplitude** is a product analytics platform focused on user behavior analysis, cohort segmentation, and experimentation.

- **Event Taxonomy Design**: Structure events hierarchically (e.g., `Feature.Action.Detail` → `Cart.Item.Added`). Maintain a centralized event taxonomy document that all teams reference.
- **Behavioral Cohorts**: Group users by behavior patterns (e.g., "Users who added to cart but did not purchase in 7 days") for targeted engagement.
- **Integration**:
  ```typescript
  import { track, identify, Identify } from '@amplitude/analytics-react-native';

  // Track event
  track('Product Viewed', { productId: 'SKU_123', category: 'Electronics' });

  // Identify user with properties
  const identifyObj = new Identify().set('plan', 'premium').set('region', 'US');
  identify(identifyObj);
  ```

### 4. Datadog
**Datadog** provides Application Performance Monitoring (APM) and Real User Monitoring (RUM) for mobile apps.

- **RUM Features**: Session replay (visual replay of user sessions), error tracking, resource timing (API call durations), long task detection, and frustration signals (rage taps).
- **Log Management**: Structured logging from the mobile app, searchable and correlated with backend traces.
- **Integration**:
  ```typescript
  import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';

  const config = new DdSdkReactNativeConfiguration(
    'DD_CLIENT_TOKEN',
    'DD_ENVIRONMENT', // 'production' | 'staging'
    'DD_APPLICATION_ID',
    true, // track interactions
    true, // track resources (network)
    true, // track errors
  );

  await DdSdkReactNative.initialize(config);
  ```

- **When to Use Datadog vs Sentry**: Datadog excels at infrastructure monitoring, APM, and full-stack observability (correlating mobile errors with backend latency). Sentry excels at developer-focused error debugging with richer source map support, breadcrumbs, and issue grouping. Many teams use both: Sentry for crash debugging, Datadog for performance monitoring.

### 5. Monitoring Architecture Decision Matrix

| Tool | Primary Use Case | Strengths | When to Choose |
| :--- | :--- | :--- | :--- |
| **Firebase Analytics** | Product analytics, marketing funnels | Free, deep Google Ads integration | Default for startups, marketing-driven apps |
| **Sentry** | Crash reporting, error diagnostics | Best-in-class symbolication, breadcrumbs | Every production app (error monitoring is non-negotiable) |
| **GA4** | Web + App unified analytics | Cross-platform attribution, Google ecosystem | When marketing/product teams need Google-integrated funnels |
| **Segment** | Data pipeline, multi-destination routing | Single SDK, GDPR controls, warehouse sync | When integrating 3+ analytics/marketing tools |
| **Amplitude** | Product behavior analytics, experiments | Cohorts, retention analysis, A/B testing | Data-driven product teams optimizing conversion |
| **Datadog** | Full-stack APM, RUM, infrastructure | Session replay, distributed tracing, logs | Enterprise apps needing backend correlation |
| **Azure App Insights** | Enterprise APM, Microsoft ecosystem | End-to-end Azure trace correlation | Microsoft-stack enterprises, B2B apps |

> *"How would you design an analytics architecture for a 10M user app?"*

- **Strategic Response**: I would use a layered approach. Segment as the central data pipeline—one SDK integration in the app that routes events to all downstream destinations. Sentry for crash and error monitoring with full source map symbolication. Amplitude for product analytics, cohort analysis, and A/B testing. Datadog RUM for performance monitoring, session replay, and correlating client errors with backend API latency. Firebase Remote Config for feature flags. All events flow through Segment, reducing SDK bloat and enabling destination changes without app updates. For GDPR, Segment's consent management gates event routing per user preference.

> *"How do you handle analytics consent and GDPR?"*

- **Strategic Response**: I implement a consent management layer that presents a consent modal on first launch with granular categories: Essential (crash reporting), Analytics (usage tracking), Marketing (attribution). User preferences are stored locally in MMKV and synced to the backend. The analytics initialization code checks consent state before enabling each SDK. Segment's consent-based filtering ensures events only reach destinations the user has approved. We also implement data deletion APIs so users can request their data be purged from all downstream systems.

---

## 🧪 Section 26: Appium & Cross-Platform E2E Testing
*⏱️ 2 min read*

### 1. What is Appium?
**Appium** is an open-source cross-platform mobile testing automation framework. It uses the **WebDriver protocol** to drive native, hybrid, and mobile web applications on iOS and Android real devices and simulators/emulators.

```text
[Test Script (JS/Python/Java)]
          ⬇️ WebDriver Protocol (HTTP)
    [Appium Server]
          ⬇️ Platform Driver
  ┌───────┴────────┐
  ▼                ▼
[XCUITest]     [UiAutomator2]
(iOS Driver)   (Android Driver)
  ▼                ▼
[iOS Device]   [Android Device]
```

### 2. Appium vs. Detox

| Feature | Detox | Appium |
| :--- | :--- | :--- |
| **Architecture** | Grey-box (synchronizes with app internals) | Black-box (no app internal knowledge) |
| **Speed** | Fast (direct app communication) | Slower (HTTP WebDriver protocol) |
| **Flakiness** | Low (auto-waits for idle state) | Higher (requires explicit waits) |
| **Language** | JavaScript only | Java, Python, Ruby, JavaScript, C# |
| **Cross-Platform** | React Native only | Any mobile app (native, hybrid, web) |
| **Real Devices** | Limited support | Full support (device farms: BrowserStack, Sauce Labs) |
| **Team Fit** | RN developers writing E2E tests | QA engineers with WebDriver experience |
| **CI Integration** | Jest runner, simple CI setup | Requires Appium server setup in CI |

### 3. Appium with React Native
- Appium locates elements using standard accessibility identifiers. In React Native, use the `testID` prop, which maps to `accessibilityIdentifier` on iOS and `content-desc` (via `resource-id`) on Android.
- **Element Location Strategies**: `id` (Android resource ID), `accessibility id` (maps to `testID`), `xpath` (fragile, avoid when possible).

### 4. Basic Appium Test Example

```typescript
import { remote } from 'webdriverio';

describe('Login Flow', () => {
  let driver: WebdriverIO.Browser;

  beforeAll(async () => {
    driver = await remote({
      hostname: 'localhost',
      port: 4723,
      capabilities: {
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:app': '/path/to/app.apk',
        'appium:deviceName': 'Pixel_7_API_34',
      },
    });
  });

  afterAll(async () => {
    await driver.deleteSession();
  });

  it('should login successfully', async () => {
    const usernameField = await driver.$('~username_input'); // ~ = accessibility id
    const passwordField = await driver.$('~password_input');
    const loginButton = await driver.$('~login_button');

    await usernameField.setValue('admin_user');
    await passwordField.setValue('secure_password');
    await loginButton.click();

    const welcomeText = await driver.$('~welcome_message');
    await welcomeText.waitForDisplayed({ timeout: 5000 });
    expect(await welcomeText.getText()).toContain('Welcome');
  });
});
```

> *"When would you choose Appium over Detox?"*

- **Strategic Response**: I choose Appium in three scenarios. First, when QA teams write tests independently from the development team and prefer languages like Python or Java over JavaScript. Second, when testing needs to run on real device cloud services like BrowserStack or Sauce Labs for broad device coverage. Third, when the testing scope extends beyond React Native—for example, testing interactions between an RN app and a companion native app, or validating deep link handling across different browsers. Detox is superior for developer-authored RN E2E tests due to its grey-box synchronization and speed, but Appium provides broader platform and language flexibility.

> *"How does Appium interact with React Native components?"*

- **Strategic Response**: Appium uses accessibility identifiers to locate elements. In React Native, the `testID` prop maps to the platform's accessibility identifier: `accessibilityIdentifier` on iOS and `content-description` or `resource-id` on Android. Appium's accessibility ID locator strategy (`~testID`) targets these identifiers. It's critical to ensure `testID` is set on interactive elements throughout the app. Appium does not have direct access to React Native's component tree or state—it operates purely at the native UI layer, which is why it's considered a black-box testing tool.

---

## 🔧 Section 27: CI/CD Expansion — Bitrise, Azure DevOps & Feature Flags
*⏱️ 4 min read*

### 1. Bitrise
**Bitrise** is a mobile-first CI/CD platform with pre-built workflow steps optimized for iOS and Android builds.

- **Workflow Structure**:
  ```text
  [Git Clone] → [Install Node Dependencies] → [Run ESLint + TypeScript Check]
       → [Run Jest Tests] → [Install CocoaPods (iOS)] → [Build Android APK/AAB]
       → [Build iOS IPA] → [Run Detox E2E Tests] → [Deploy to TestFlight / Play Console]
  ```

- **Key Advantages**:
  - Pre-built steps for React Native, Fastlane, Detox, and code signing.
  - macOS build machines available by default (required for iOS builds).
  - Triggers: push to branch, pull request, tag-based releases.
  - Caching for `node_modules`, Gradle, and CocoaPods to speed up builds.

#### Bitrise vs. GitHub Actions for Mobile

| Feature | Bitrise | GitHub Actions |
| :--- | :--- | :--- |
| **macOS Runners** | Included (all plans) | Available but expensive (3x Linux cost) |
| **Mobile-Specific Steps** | 200+ pre-built mobile steps | Requires community actions or custom scripts |
| **Code Signing** | Built-in certificate/profile management | Manual setup via secrets + Fastlane |
| **Learning Curve** | Visual workflow editor (low barrier) | YAML-based (developer-friendly) |
| **Pricing** | Per-build-minute, mobile-optimized | Per-minute, general-purpose |
| **Best For** | Mobile-only teams, less DevOps experience | Teams with existing GitHub ecosystem, multi-platform CI |

### 2. Azure DevOps Pipelines
**Azure DevOps** provides enterprise-grade CI/CD with Role-Based Access Control (RBAC), audit logs, and compliance features.

- **Pipeline Configuration** (YAML):
  ```text
  trigger:
    branches:
      include: [main, release/*]

  pool:
    vmImage: 'macos-latest'  # Required for iOS builds

  steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '20.x'

    - script: npm ci
      displayName: 'Install Dependencies'

    - script: npx eslint . --max-warnings 0
      displayName: 'Run ESLint'

    - script: npx tsc --noEmit
      displayName: 'TypeScript Check'

    - script: npx jest --ci --coverage
      displayName: 'Run Tests'

    - task: Gradle@3
      inputs:
        workingDirectory: 'android'
        gradleWrapperFile: 'android/gradlew'
        tasks: 'bundleRelease'
      displayName: 'Build Android AAB'

    - task: Xcode@5
      inputs:
        actions: 'build'
        scheme: 'MyApp'
        configuration: 'Release'
      displayName: 'Build iOS'
  ```

- **Enterprise Advantages**: Azure Active Directory integration for RBAC, build approval gates (require manager sign-off before production deploys), artifact retention policies, and integration with Azure Boards for work item tracking.

### 3. Feature Flags & Phased Rollouts
**Feature flags** are runtime toggles that enable or disable features without deploying new code. They decouple deployment from release, allowing you to ship code to production while controlling who sees it.

#### Firebase Remote Config Implementation
```typescript
import remoteConfig from '@react-native-firebase/remote-config';

// Set defaults (used before server values are fetched)
await remoteConfig().setDefaults({
  new_checkout_enabled: false,
  max_cart_items: 10,
});

// Fetch and activate server values
await remoteConfig().fetchAndActivate();

// Read flag value
const isNewCheckoutEnabled = remoteConfig().getValue('new_checkout_enabled').asBoolean();

// Use in component
function CheckoutScreen() {
  const showNewCheckout = remoteConfig().getValue('new_checkout_enabled').asBoolean();

  return showNewCheckout ? <NewCheckoutFlow /> : <LegacyCheckoutFlow />;
}
```

#### LaunchDarkly Integration Pattern
```typescript
import { useBoolVariation } from '@launchdarkly/react-native-client-sdk';

function PaymentButton() {
  const useNewPaymentFlow = useBoolVariation('new-payment-flow', false);

  return useNewPaymentFlow ? <NewPaymentButton /> : <LegacyPaymentButton />;
}
```

#### Phased Rollout Strategy

```text
Stage 1: Internal Dogfooding (1%)
  → Enable flag for internal employees only
  → Monitor crash-free rate, error logs, performance metrics

Stage 2: Beta Testers (5%)
  → Expand to opt-in beta users
  → Collect qualitative feedback + quantitative metrics

Stage 3: Staged Production Rollout
  → 10% → Monitor 24h → 25% → Monitor 24h → 50% → Monitor 48h → 100%
  → At each stage, compare crash rates and key business metrics against baseline

Kill Switch: If crash-free rate drops below 99.5% or error rate spikes 2x,
  → Immediately set flag to false (instant rollback, no app update needed)
```

> *"How would you implement feature flags in a React Native app?"*

- **Strategic Response**: I use Firebase Remote Config for simple boolean/string flags and LaunchDarkly for advanced targeting (user segments, percentage rollouts, A/B experiments). Flags are fetched at app startup with `fetchAndActivate()` and cached locally. Default values are set in code so the app functions correctly even if the fetch fails. For critical features like payments, I wrap the feature in a flag check component and implement a kill switch—a single flag that can disable the feature instantly across all users without an app update. Flags are evaluated on the client side, so changes propagate within the configured cache TTL (typically 12 hours for Remote Config, real-time for LaunchDarkly).

> *"How do you manage phased rollouts for a critical payment feature?"*

- **Strategic Response**: I follow a five-stage rollout. First, internal dogfooding at 1% traffic with the flag enabled only for employees—we verify crash-free rate, transaction success rate, and error logs. Second, expand to 5% beta users with opt-in. Third, staged production: 10% for 24 hours, monitoring crash-free sessions and payment completion rates against a control group. If metrics hold, increase to 25%, then 50%, then 100%. At every stage, I set a kill switch threshold: if crash-free rate drops below 99.5% or payment failures increase by 2x, the flag is automatically disabled via server-side rules. The key is that feature flags make this a server-side configuration change—no app update required for rollback.

---

## 🛡️ Section 28: SSL Pinning, OWASP Mobile Top 10 & API Security Deep-Dive
*⏱️ 4 min read*

### 1. SSL/Certificate Pinning Implementation
SSL Pinning ensures that your app only trusts specific certificates or public keys when communicating with your backend, preventing Man-in-the-Middle (MitM) attacks even if a Certificate Authority is compromised.

#### Public Key Pinning vs. Certificate Pinning

| Approach | What's Pinned | Certificate Rotation | Security Level |
| :--- | :--- | :--- | :--- |
| **Certificate Pinning** | Entire leaf certificate | Requires app update on cert renewal | High but operationally fragile |
| **Public Key Pinning** | Public key (SPKI hash) | Survives cert renewal if key is reused | High and operationally flexible |

**Recommendation**: Always use **Public Key Pinning**. Certificates rotate frequently (every 90 days with Let's Encrypt), but the underlying public key can be preserved across renewals.

#### Android Implementation (OkHttp)
```kotlin
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

val certificatePinner = CertificatePinner.Builder()
    .add(
        "api.myapp.com",
        "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" // Primary key hash
    )
    .add(
        "api.myapp.com",
        "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=" // Backup key hash
    )
    .build()

val client = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()
```

#### iOS Implementation (TrustKit)
```swift
import TrustKit

let trustKitConfig: [String: Any] = [
    kTSKSwizzleNetworkDelegates: false,
    kTSKPinnedDomains: [
        "api.myapp.com": [
            kTSKEnforcePinning: true,
            kTSKPublicKeyHashes: [
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", // Primary
                "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=", // Backup
            ],
        ]
    ]
]

TrustKit.initSharedInstance(withConfiguration: trustKitConfig)
```

#### React Native Implementation
```typescript
import { fetch } from 'react-native-ssl-pinning';

const response = await fetch('https://api.myapp.com/data', {
  method: 'GET',
  sslPinning: {
    certs: ['api_myapp_com'], // .cer file in native assets
  },
  headers: { Authorization: `Bearer ${token}` },
});
```

#### Certificate Rotation Strategy
- Always pin at least **two public keys**: the current key and a backup key.
- Generate the backup key pair in advance and store it securely.
- When rotation is needed, deploy the new certificate using the backup key, then update the app's pin list to include the next backup.
- For apps with infrequent updates, use a **pinning configuration endpoint** fetched at startup (signed and verified) to update pins dynamically.

### 2. OWASP Mobile Top 10 (2024)

| # | Vulnerability | Description | React Native Mitigation |
| :--- | :--- | :--- | :--- |
| **M1** | Improper Credential Usage | Hardcoded API keys, tokens in source code | Store secrets in native Keychain/Keystore; use environment variables at build time; never commit credentials |
| **M2** | Inadequate Supply Chain Security | Vulnerable or malicious third-party dependencies | Audit with `npm audit`, pin dependency versions, use lockfiles, verify package provenance |
| **M3** | Insecure Authentication/Authorization | Weak login flows, missing session validation | Implement OAuth2 + PKCE, validate tokens server-side, use biometric auth for sensitive operations |
| **M4** | Insufficient Input/Output Validation | SQL injection, XSS via WebViews, malformed data | Validate all inputs client-side and server-side; sanitize WebView content; use parameterized queries |
| **M5** | Insecure Communication | Unencrypted traffic, missing certificate validation | Enforce TLS 1.2+, implement SSL Pinning, disable cleartext traffic in Android Network Security Config |
| **M6** | Inadequate Privacy Controls | Excessive data collection, missing consent | Implement GDPR consent flows, minimize data collection, anonymize analytics, provide data deletion |
| **M7** | Insufficient Binary Protections | Reverse engineering, code tampering | Enable ProGuard/R8 obfuscation, use Hermes bytecode, detect rooted/jailbroken devices, implement integrity checks |
| **M8** | Security Misconfiguration | Debug mode in production, exposed dev endpoints | Strip debug configs in release builds, disable React Native dev menu, configure proper Network Security Config |
| **M9** | Insecure Data Storage | Sensitive data in AsyncStorage, logs, or backups | Use `react-native-keychain` for tokens, MMKV with encryption for sensitive data, disable backup for sensitive files |
| **M10** | Insufficient Cryptography | Weak algorithms, hardcoded keys, improper key management | Use platform Keystore/Keychain for key storage, AES-256-GCM for encryption, avoid MD5/SHA1 for security |

### 3. API Security for Mobile Apps

#### OAuth2 + PKCE Flow (Proof Key for Code Exchange)
Mobile apps are **public clients** (they cannot securely store a client secret). PKCE prevents authorization code interception attacks:

```text
1. App generates random code_verifier (43-128 chars)
2. App computes code_challenge = SHA256(code_verifier) → Base64URL
3. App opens browser → Authorization Server with code_challenge
4. User authenticates → Server returns authorization_code
5. App sends authorization_code + code_verifier to Token Endpoint
6. Server verifies SHA256(code_verifier) == stored code_challenge
7. Server issues access_token + refresh_token
```

```typescript
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://auth.myapp.com',
  clientId: 'mobile-app-client',
  redirectUrl: 'com.myapp://oauth/callback',
  scopes: ['openid', 'profile', 'offline_access'],
  usePKCE: true, // Automatically handles code_verifier/code_challenge
};

const authResult = await authorize(config);
// Store tokens securely
await Keychain.setGenericPassword('tokens', JSON.stringify({
  accessToken: authResult.accessToken,
  refreshToken: authResult.refreshToken,
}));
```

#### HMAC Request Signing
Sign API requests to prove they originated from your app and were not tampered with:
```typescript
import { HmacSHA256 } from 'crypto-js';

function signRequest(method: string, path: string, body: string, timestamp: string) {
  const message = `${method}\n${path}\n${timestamp}\n${body}`;
  const signature = HmacSHA256(message, SHARED_SECRET).toString();

  return {
    'X-Timestamp': timestamp,
    'X-Signature': signature,
  };
}
```

#### Request Replay Prevention
- Include a **nonce** (unique random string) and **timestamp** in every request.
- Server validates: (1) timestamp is within a 5-minute window, (2) nonce has not been seen before (stored in Redis with TTL).
- Rejects duplicate nonces and expired timestamps, preventing replay attacks.

#### Secure Token Storage

| Platform | Secure Storage | Mechanism | Access Control |
| :--- | :--- | :--- | :--- |
| **iOS** | Keychain Services | Hardware-backed encryption (Secure Enclave) | Biometric or passcode gated |
| **Android** | Android Keystore | Hardware-backed key storage (TEE/StrongBox) | BiometricPrompt or device credential |
| **React Native** | `react-native-keychain` | Abstraction over Keychain + Keystore | `accessControl: BIOMETRY_ANY` |

**Critical Rule**: Never store tokens in `AsyncStorage` (plaintext, accessible via device backup), `SharedPreferences` (plaintext XML), or `UserDefaults` (unencrypted plist).

> *"How do you implement SSL Pinning in a React Native app?"*

- **Strategic Response**: I implement public key pinning rather than certificate pinning to survive certificate rotations. On Android, I configure OkHttp's `CertificatePinner` with SHA-256 hashes of the server's public key, adding both the primary and a backup key hash. On iOS, I use TrustKit to configure pinning declaratively. For the React Native layer, `react-native-ssl-pinning` wraps these native implementations. I always pin at least two keys—the current and a pre-generated backup—so certificate rotation doesn't require an emergency app update. In CI, I add a test that verifies the pinned endpoints are reachable to catch accidental pin mismatches before release.

> *"What is PKCE and why is it important for mobile OAuth?"*

- **Strategic Response**: PKCE (Proof Key for Code Exchange) is an extension to the OAuth2 authorization code flow designed for public clients like mobile apps that cannot securely store a client secret. Without PKCE, an attacker who intercepts the authorization code (via a malicious app registered on the same redirect URI scheme) could exchange it for tokens. PKCE prevents this by having the app generate a random `code_verifier`, send its SHA-256 hash as `code_challenge` during authorization, and then prove possession of the original verifier during token exchange. The server verifies the hash matches, ensuring only the app that initiated the flow can complete it.

> *"How do you prevent API replay attacks from a mobile app?"*

- **Strategic Response**: I implement a three-layer defense. First, every request includes a timestamp and a cryptographic nonce. The server rejects requests with timestamps older than 5 minutes (clock skew tolerance). Second, the server stores seen nonces in Redis with a 5-minute TTL and rejects duplicates. Third, I sign the entire request (method, path, body, timestamp, nonce) using HMAC-SHA256 with a shared secret. The server recomputes the signature and rejects mismatches. This combination ensures requests cannot be replayed, tampered with, or forged. For additional security, the HMAC secret is stored in native Keystore/Keychain, not in the JavaScript bundle.

> *"Name 5 OWASP Mobile Top 10 vulnerabilities and how you mitigate them in React Native."*

- **Strategic Response**: (1) **Insecure Data Storage (M9)**: I use `react-native-keychain` for tokens and encrypted MMKV for sensitive data—never AsyncStorage. (2) **Insecure Communication (M5)**: I enforce TLS 1.2+ with SSL Pinning using public key hashes, and disable cleartext traffic in Android's Network Security Config. (3) **Insecure Authentication (M3)**: I implement OAuth2 with PKCE for all authentication flows and add biometric verification for sensitive operations. (4) **Insufficient Binary Protections (M7)**: I enable R8/ProGuard for Android obfuscation, ship Hermes bytecode instead of readable JS, and detect rooted/jailbroken devices at startup. (5) **Security Misconfiguration (M8)**: I strip the React Native dev menu in release builds, remove console logs, and ensure debug configurations are never packaged into production binaries.
