## 🔗 Section 19: Bridgeless Mode & React Native Runtime

*⏱️ 3 min read*

The New Architecture introduced JSI, TurboModules, and Fabric to replace specific aspects of the legacy Bridge. However, even with these components enabled, the old Bridge infrastructure could still remain active as a **fallback path** for legacy native modules, event emitters, and certain internal subsystems. **Bridgeless Mode** is the final architectural step that removes the Bridge entirely from the runtime, completing the New Architecture migration.

#### 1. What is Bridgeless Mode?
- In earlier New Architecture adoption, apps could run Fabric for rendering and TurboModules for native module access, but the `RCTBridge` singleton was still instantiated at startup to support legacy compatibility layers (old `NativeModules`, `DeviceEventEmitter` over Bridge, and certain internal RN subsystems).
- **Bridgeless Mode** eliminates the `RCTBridge` object completely. Every communication path between JavaScript and Native—rendering, module invocation, event dispatch, error handling—flows exclusively through **JSI-backed C++ interfaces**.
- This is not just a performance optimization; it is an architectural simplification that removes an entire class of serialization overhead, startup cost, and thread-coordination complexity.

#### 2. React Native Runtime
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

#### 3. Bridgeless vs. New Architecture with Bridge Fallback

| Aspect | New Arch + Bridge Fallback | Fully Bridgeless |
| :--- | :--- | :--- |
| **RCTBridge** | Still instantiated at startup | Completely removed |
| **Legacy NativeModules** | Supported via Bridge compatibility layer | Must migrate to TurboModules or use interop layer |
| **Event Emitters** | Can fall back to Bridge-based `DeviceEventEmitter` | Must use TurboModule event emitters or JSI-based events |
| **Startup Cost** | Bridge initialization adds ~50-150ms overhead | No Bridge init; faster cold start |
| **Memory Footprint** | Bridge infrastructure retained in memory | Reduced baseline memory |
| **Runtime Complexity** | Two communication paths (JSI + Bridge) coexist | Single unified JSI path |

#### 4. Enabling Bridgeless Mode
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

#### 5. What Breaks When You Go Bridgeless?
- **Legacy `NativeModules` access**: Any module registered via the old `RCTBridgeModule` protocol without a TurboModule spec will not be found. You must either migrate to TurboModules or use the **Interop Layer** (a compatibility shim that wraps legacy modules for Bridgeless).
- **`RCTBridge` direct references**: Any native code that accesses `self.bridge` or `reactContext.catalystInstance` will crash. These must be refactored to use `RCTModuleRegistry` or TurboModule APIs.
- **Third-party libraries**: Libraries that have not updated to support Bridgeless Mode will fail at runtime. Always verify library compatibility before enabling.
- **Custom `DeviceEventEmitter` patterns**: Bridge-based event emission must be replaced with TurboModule-based event emitters using Codegen specs.

> *"What is Bridgeless Mode and why is it the final step of the New Architecture?"*

- **Strategic Response**: Bridgeless Mode removes the last remnant of the legacy Bridge from the runtime. While JSI, Fabric, and TurboModules replaced specific subsystems, the Bridge could still exist as a fallback for legacy modules and internal event dispatch. Bridgeless Mode eliminates `RCTBridge` entirely, creating a single unified communication path through JSI. This reduces startup time by removing Bridge initialization overhead, lowers memory usage, and simplifies the runtime architecture. It became the default in RN 0.78+, but requires all native modules to be TurboModule-compatible or wrapped with the interop layer.

> *"How would you audit a large codebase before enabling Bridgeless Mode?"*

- **Strategic Response**: I would first search for any direct `RCTBridge` references in native code and any `NativeModules.X` usage in JavaScript that doesn't have a corresponding TurboModule spec. Then I would audit all third-party native dependencies against the React Native New Architecture compatibility tracker. For libraries without Bridgeless support, I would either upgrade, fork and patch, or use the interop layer as a temporary shim. Finally, I would enable Bridgeless in a feature branch, run the full E2E suite, and monitor for runtime crashes in native module initialization.

---


---
