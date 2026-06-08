## 🏗️ Section 1: Core Architecture (Legacy vs. New Architecture)

*⏱️ 3 min read*

React Native's runtime environment has gone through a major architectural transition. For interviews, you should understand **both** the legacy Bridge architecture and the modern New Architecture, because many production apps still run on older versions while new projects and upgrades increasingly expect Hermes, JSI, Fabric, TurboModules, and Codegen knowledge.

#### 1. [LEGACY] The Legacy Bridge Architecture
Historically, React Native relied on three main threads:
- **JavaScript Thread**: Executes the compiled JS/TS application code (React components, business logic).
- **Native UI Thread (Main Thread)**: Handles native OS rendering (Android Views, iOS UIKit), layouts, and user interactions.
- **Shadow Thread**: Computes Flexbox layout dimensions using the Yoga engine before passing them to the Native thread.

**The Bottleneck**: Communication between the JS Thread and the Native Thread was governed by **The Bridge**. 
- Whenever data or UI actions passed between layers, they had to be serialized into JSON strings, sent asynchronously over the bridge, and deserialized on the other side.
- This asynchronous, batch-based serialization created severe performance bottlenecks for high-frequency interactions such as rapid list scrolling, gestures, native animations, and input validation. If the bridge was flooded, the UI thread lagged behind, causing visual stuttering and frame drops.

---

#### 2. [MODERN] The New Architecture (JSI, TurboModules, Fabric)
The New Architecture eliminates the old asynchronous JSON bridge for core rendering and modern native-module access, replacing it with JSI-backed C++ interfaces.

##### JavaScript Interface (JSI)
- **JSI** is a lightweight C++ abstraction layer that allows the JavaScript engine (Hermes) to hold direct references to host native C++ objects.
- JavaScript can invoke host methods without JSON serialization. Some APIs can be synchronous, but senior engineers avoid synchronous native calls for slow I/O because they can still block the JS runtime.

##### TurboModules (Native Modules Reborn)
- In the legacy model, all native modules (e.g., Camera, Bluetooth, Storage) were initialized eagerly at app startup, regardless of whether the user accessed them. This bloated app launch time.
- **TurboModules** leverage JSI to lazy-load native libraries. They are only initialized and loaded into memory when explicitly invoked by the JavaScript code, significantly reducing app startup latency.

##### Fabric Rendering Engine
- Fabric is the concurrent rendering engine that replaces the legacy UIManager.
- Fabric computes UI layout changes inside C++ and commits them directly to the native OS layout thread. Because JSI allows synchronous access, Fabric can execute UI mutations instantly on the main thread, eliminating layout jumps and flickering (e.g., during rapid scroll views).
- Fabric supports modern React concurrent rendering, including update prioritization and smoother coordination between React work and native UI commits.

##### Codegen (Type-Safety Guarantee)
- Codegen is a build-time compiler tool that reads your TypeScript interfaces (which define the contract between JavaScript and native modules) and automatically generates the corresponding C++ binding code.
- If a developer attempts to pass an invalid type parameter from JavaScript (e.g., passing an array instead of a string to a native function), the build fails immediately in the CI pipeline. This guarantees runtime type-safety across the JavaScript-native boundary.

#### 3. Legacy to Modern Architecture Migration Plan
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


---
