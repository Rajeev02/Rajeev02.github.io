# 25 Scenario-Based Senior React Native Interview Questions

Here is a curated set of **exactly 20 scenario-based and high-level interview questions** (plus 5 New Architecture upgrade scenarios) tailored for senior or mid-senior React Native roles.

---

## 🛠️ Memory Leaks & Performance Optimization

# 1. The Screen Freezes on Infinite Scroll

## Scenario
Users scrolling through a fast-updating feed report that after 3 to 4 minutes, the app becomes sluggish and eventually crashes with an Out Of Memory (OOM) error. How do you isolate and resolve this?

## Solution & Approach
The issue is caused by memory bloating from rendering too many items simultaneously and breaking component memoization.

*   **Step 1:** Replace `FlatList` with `FlashList` from Shopify, which recycles views instead of just destroying and recreating them, massively reducing memory overhead.
*   **Step 2:** If `FlatList` must be used, optimize key props:
    *   `windowSize={5}` (default is 21, which renders too much off-screen).
    *   `maxToRenderPerBatch={5}` to prevent freezing the JS thread.
    *   `removeClippedSubviews={true}` to unmount off-screen views.
*   **Step 3:** Ensure the `renderItem` function and `keyExtractor` are defined outside the component or wrapped in `useCallback` to prevent re-creating the function on every render.
*   **Step 4:** Ensure the item components passed to `renderItem` are wrapped in `React.memo` with proper prop equality checks.

## Interview Answer
"I would first profile the memory using Flipper or React DevTools. The OOM crash on a feed is usually due to FlatList retaining too many off-screen elements or breaking memoization. I would migrate to Shopify's FlashList for view recycling. If restricted to FlatList, I would tune `windowSize`, `maxToRenderPerBatch`, and enforce strict `React.memo` and `useCallback` on the `renderItem` to prevent unnecessary re-renders."

---

# 2. Hunting Down JavaScript Memory Leaks

## Scenario
A user navigates between the Home screen and a heavy Map screen multiple times. Memory consumption increases linearly with each visit and never drops. How do you find the source in code?

## Solution & Approach
This is a classic unmounted component memory leak where references to the component are kept alive by external subscribers.

*   **Step 1:** Identify uncleared event listeners. Check if `DeviceEventEmitter.addListener`, `Keyboard.addListener`, or AppState listeners are attached in a `useEffect` but never removed in the cleanup function.
*   **Step 2:** Check for uncleared `setInterval` or `setTimeout` blocks that reference state variables.
*   **Step 3:** Check for un-unsubscribed RxJS observables or WebSocket connections.
*   **Step 4:** Use the Hermes Sampling Profiler or Chrome DevTools Memory tab. Take a heap snapshot before navigating to the Map, and another after navigating back. Compare the snapshots to see what JS objects (usually detached DOM nodes or closures) are retained.

## Interview Answer
"Memory increasing linearly implies a retention leak. I would look for external subscriptions inside `useEffect`—like EventEmitters, WebSockets, or Redux store subscriptions—that are missing their cleanup return functions. I would verify this by taking heap snapshots in Chrome DevTools before and after navigation, looking for detached components that aren't being garbage collected."

---

# 3. Native Memory Leaks vs. JS Memory Leaks

## Scenario
Your JavaScript heap sizes look perfectly stable in performance monitors, but Xcode/Android Studio profile views show total RAM consumption soaring until the OS kills the app. What is happening?

## Solution & Approach
React Native applications have two memory heaps: the JavaScript heap (limited and managed by Hermes/V8) and the Native heap (managed by iOS/Android). 

*   **Step 1:** High native memory usage without JS memory spikes usually points to **Images** or **Native Modules** (like Video players, Maps, or Camera).
*   **Step 2:** The standard React Native `<Image>` component caches aggressively on the native side. Replace it with `react-native-fast-image` which handles memory caching much better on iOS/Android.
*   **Step 3:** Check native bridge data transfers. Passing massive Base64 strings over the old bridge allocates heavy native memory. Migrate to JSI or TurboModules to share memory references instead of serializing data.

## Interview Answer
"While JS memory might be stable, the Native heap handles images, views, and native modules. Soaring native RAM is almost always caused by aggressive image caching or memory leaks in custom iOS/Android bridging code. I would swap standard Images for `react-native-fast-image` and use Xcode Instruments and Android Studio Memory Profiler to track native allocations."

---

# 4. Keeping Animations Crisp at 60 FPS

## Scenario
You are building a complex swipeable Tinder-like card interaction. When other API network calls or state updates occur simultaneously, the animation drops frames significantly. How do you solve this?

## Solution & Approach
The legacy `Animated` API (even with `useNativeDriver`) often relies on the JS thread to calculate intermediate steps, causing frame drops when the JS thread is busy with API calls.

*   **Step 1:** Completely abandon the JS thread for animation calculations.
*   **Step 2:** Implement `React Native Reanimated` (v2/v3). Reanimated runs animations directly on the UI thread using isolated JavaScript execution environments called **Worklets**.
*   **Step 3:** Pair it with `React Native Gesture Handler` to capture swipe gestures on the native side, mapping them directly to Reanimated shared values without crossing the JS bridge.

## Interview Answer
"Frame drops occur when animations share the single JavaScript thread with business logic. I would refactor the interaction using React Native Reanimated and Gesture Handler. By using Shared Values and Worklets, the animation and gesture math execute entirely on the Native UI thread, guaranteeing 60 or 120 FPS regardless of JS thread congestion."

---

## 🔍 Code Diagnostics & Crash Tracking

# 5. Production Diagnostics with Hermes

## Scenario
A production-only performance bug occurs only on certain low-end Android devices. The app runs fine in debug mode. How do you profile this inside the actual code?

## Solution & Approach
Debug mode uses a different execution environment (often bridging to Chrome's V8) than production (which uses compiled Hermes bytecode). 

*   **Step 1:** Enable the Hermes Sampling Profiler in the production build (can be toggled via developer menus or custom native code triggers).
*   **Step 2:** Reproduce the lag on the low-end device to record the trace.
*   **Step 3:** Extract the `.cpuprofile` file from the device storage.
*   **Step 4:** Load the profile into Chrome DevTools (Performance tab) to visualize exactly which JavaScript functions took the longest to execute on the device's actual Hermes engine.

## Interview Answer
"Because Debug mode bypasses Hermes optimizations, I would enable the Hermes Sampling Profiler in a release build. After reproducing the issue, I would extract the generated `.cpuprofile` and analyze it in Chrome DevTools to pinpoint exactly which functions are bottlenecking the production bytecode."

---

# 6. Deciphering a Native Crash Log

## Scenario
Your crash reporting tool flags an obfuscated native crash (`SIGSEGV` or `Fatal Exception: java.lang.NullPointerException`) inside an Android release build. What steps do you take to trace this back to your React Native project?

## Solution & Approach
Release builds strip out readable class names and line numbers to reduce size, resulting in obfuscated crash logs.

*   **Step 1:** Ensure that during the build process, the ProGuard/R8 mapping files (`mapping.txt` on Android) and the dSYM files (on iOS) are being generated.
*   **Step 2:** Automatically upload these files to your crash tracker (like Sentry or Crashlytics) during your CI/CD pipeline using their respective plugins.
*   **Step 3:** If doing it manually, use the `retrace` tool provided by the Android SDK, feeding it the `mapping.txt` and the obfuscated stack trace to translate the hexadecimal addresses back into readable Java/Kotlin code, which usually points to a specific Native Module bridge failing.

## Interview Answer
"Obfuscated native crashes require symbolication. I would ensure that our CI pipeline uploads the Android Proguard `mapping.txt` and iOS `dSYM` files directly to our crash reporting tool like Sentry. This automatically deobfuscates the stack trace, turning memory addresses back into the exact native module and line number causing the issue."

---

# 7. Trapping Silent JavaScript Exceptions

## Scenario
An asynchronous API call fails silently inside a critical user checkout flow. The UI doesn't crash, but buttons stop responding, leaving the user stuck. How do you intercept and log these failures?

## Solution & Approach
Unhandled promise rejections do not always crash the app natively; they often just freeze JS execution flows.

*   **Step 1:** Implement a global unhandled promise rejection tracker using `Promise.rejectionTracker`. 
*   **Step 2:** Override the global React Native error handler using `ErrorUtils.setGlobalHandler((error, isFatal) => {...})` to catch synchronous silent errors.
*   **Step 3:** Wrap critical UI boundaries (like the Checkout screen) in a **React Error Boundary** (`componentDidCatch`).
*   **Step 4:** Send caught exceptions to a monitoring tool (Sentry/Datadog) and render a fallback UI so the user isn't stuck on a frozen screen.

## Interview Answer
"Silent failures are often unhandled promises. I would configure a global `ErrorUtils` handler and Promise rejection tracker to catch these at the root level and forward them to Sentry. Additionally, I would wrap the checkout flow in an Error Boundary so if the JS thread fails, we can display a graceful fallback UI instead of a frozen screen."

---

## 🏗️ State Management & System Architecture

# 8. Ride-Hailing Architecture (The "OLA" Scenario)

## Scenario
Design the state management and data architecture for a real-time ride-hailing app like OLA/Uber. Drivers move constantly, prices update, and the map must reflect changes smoothly.

## Solution & Approach
A global Redux store will cause massive re-rendering across the app if driver coordinates update every 100ms.

*   **Step 1:** **Decouple Ephemeral vs. Global State.** Global state (User auth, payment methods) goes into a standard store (Redux Toolkit or Zustand).
*   **Step 2:** **Ephemeral Real-Time State:** Driver coordinates should bypass the global store entirely. Connect a WebSocket/gRPC stream directly to a localized context or a micro-store specifically for the Map component.
*   **Step 3:** Use **Zustand** or **Signals** for the map state, allowing the Map component to subscribe *only* to the `driverCoordinates` node without triggering re-renders in the sidebar, header, or pricing components.
*   **Step 4:** Use Reanimated to interpolate the driver's native map marker smoothly between coordinate updates.

## Interview Answer
"For a ride-hailing app, injecting high-frequency WebSocket data into a global Redux store will destroy performance. I would split the architecture: user data in a global store, and real-time map data in a localized Zustand store. The map component selectively subscribes to coordinate updates, and I'd use Reanimated to interpolate marker movements natively, bypassing React renders entirely."

---

# 9. Real-Time Trading Architecture (The "Crypto App" Scenario)

## Scenario
Design a state layer for a cryptocurrency trading app handling high-throughput order books, rapid price tickers, and instant user balance calculations.

## Solution & Approach
Similar to the Ola scenario, but with heavy data transformation requirements (calculating order book depths).

*   **Step 1:** Utilize an event-driven architecture using **RxJS** to handle high-frequency WebSocket data streams. RxJS allows you to debounce, throttle, and buffer thousands of ticker updates per second before they ever touch React.
*   **Step 2:** Pass the buffered data to a localized state manager (like Zustand).
*   **Step 3:** Use React `memo` extensively on list items. Use `useMemo` for heavy calculations (like depth charts) only when the buffered data batch actually changes.

## Interview Answer
"High-throughput trading apps require data buffering. I would use RxJS to manage the WebSocket streams, allowing us to throttle and batch incoming price ticks every 500ms before updating the UI. This batched data would be fed into a granular state manager like Zustand, ensuring only specific ticker components re-render rather than the entire dashboard."

---

# 10. Cache Management: MMKV vs. AsyncStorage

## Scenario
For either the Ola or Crypto app, you need to store thousands of historical transactions offline. Why would you choose MMKV over AsyncStorage?

## Solution & Approach
`AsyncStorage` serializes data to JSON and sends it asynchronously over the React Native bridge. For thousands of records, this blocks the bridge, dropping frames.

*   **Step 1:** Migrate to `react-native-mmkv`.
*   **Step 2:** MMKV utilizes JSI (JavaScript Interface) which allows JavaScript to hold a direct reference to a C++ object in memory. 
*   **Step 3:** This allows **synchronous** reads and writes bypassing the bridge entirely, making it up to 100x faster than AsyncStorage, and completely safe to use for massive data blobs without freezing the UI.

## Interview Answer
"AsyncStorage is asynchronous and relies on bridge serialization, which creates massive bottlenecks when parsing thousands of transactions. I would use MMKV, which leverages JSI (C++ bindings) for synchronous, highly efficient memory access. It completely bypasses the bridge, making it exponentially faster for heavy offline caching."

---

## 🛡️ Security & Attack Mitigation

# 11. Hardening Mobile Authentication Storage

## Scenario
A security audit warns that your app is storing OAuth Refresh Tokens insecurely. Where should they be saved, and what are the native mechanisms involved?

## Solution & Approach
Plain text storage is vulnerable to device extraction.

*   **Step 1:** Never use AsyncStorage, Redux Persist, or unencrypted local files.
*   **Step 2:** Use `react-native-keychain` or `react-native-encrypted-storage`.
*   **Step 3:** Under the hood, these libraries store secrets in the **iOS Keychain** (secure enclave) and the **Android Keystore** (hardware-backed AES encryption). This ensures the tokens cannot be extracted even if the device filesystem is accessed.

## Interview Answer
"Refresh tokens must never be stored in AsyncStorage as it is unencrypted plain text. I would migrate auth tokens to `react-native-keychain`, which natively interfaces with the iOS Keychain and Android Keystore. This ensures secrets are encrypted at the hardware level and are safe from filesystem extractions."

---

# 12. Thwarting Man-In-The-Middle (MITM) Attacks

## Scenario
For a fintech or cryptocurrency application, how do you guarantee that your app is communicating *only* with your verified backend servers, even if a user is on a compromised public Wi-Fi?

## Solution & Approach
Hackers can install fake Root Certificates on a device to decrypt SSL traffic.

*   **Step 1:** Implement **SSL/TLS Certificate Pinning**.
*   **Step 2:** On Android, configure `network_security_config.xml` with the SHA-256 hash of your server's public key.
*   **Step 3:** On iOS, configure `NSPinnedDomains` inside the `Info.plist`.
*   **Step 4:** Alternatively, use a library like `react-native-ssl-public-key-pinning` to manage it dynamically. If the server's certificate doesn't match the pinned hash, the network request is killed immediately.

## Interview Answer
"To prevent MITM attacks via rogue root certificates, I would implement SSL Pinning. By hardcoding the SHA-256 hash of our backend's public key directly into the native `Info.plist` and `network_security_config.xml`, the native network stack will outright reject any connections intercepted by a proxy, ensuring strict server authenticity."

---

# 13. Securing Javascript Source Code Against Reverse Engineering

## Scenario
A competitor downloads your public production APK file, decompiles it using an open-source tool, and extracts your private API keys and business logic. How do you prevent this?

## Solution & Approach
JavaScript bundles are notoriously easy to extract from `.apk` or `.ipa` files.

*   **Step 1:** **Remove Secrets:** Never hardcode API keys in JS. Fetch them dynamically upon authenticated login, or proxy requests through your own backend.
*   **Step 2:** **Enable Hermes:** Hermes compiles JavaScript into proprietary bytecode. While not impossible to reverse, it stops casual attackers from reading plain text JS.
*   **Step 3:** **Native Obfuscation:** Enable ProGuard/R8 in Android to obfuscate Java classes so attackers cannot easily read custom native bridge logic.
*   **Step 4:** Use commercial shielding tools (DexGuard/Jscrambler) for enterprise-grade obfuscation if required by compliance.

## Interview Answer
"First, I ensure absolutely no sensitive API keys exist in the JS bundle—they must be fetched dynamically or handled server-side. Secondly, I enable the Hermes engine so the JS bundle is compiled into bytecode rather than plain text. Finally, I enforce ProGuard on Android to obfuscate the native codebase, significantly raising the barrier to reverse engineering."

---

# 14. Implementing Jailbreak and Root Detection

## Scenario
Your enterprise security policy dictates that the app must refuse to open if it runs on a rooted Android or jailbroken iOS device. How do you integrate this check cleanly?

## Solution & Approach
Rooted devices bypass OS sandboxing, allowing malicious apps to read your app's secure memory.

*   **Step 1:** Use a library like `react-native-device-info` or JailMonkey.
*   **Step 2:** These libraries execute native checks: looking for installed binaries like `su` or `Cydia`, checking if the OS allows writing to read-only directories, or checking if the bootloader is unlocked.
*   **Step 3:** Implement this check at the very root of your app (`App.tsx`). If root is detected, immediately unmount the main navigator and render a blocking "Security Lockout" screen, while clearing any active session tokens.

## Interview Answer
"I would integrate root detection at the native level using a library like JailMonkey. It checks for anomalous binaries like `su` or `Cydia` and verifies filesystem sandbox integrity. I would run this check synchronously at app launch; if true, I immediately wipe local session data and mount a persistent Lockout screen."

---

## 📐 Folder Structure, Architecture & Custom Hooks

# 15. Scaling a Monolithic App Folder Structure

## Scenario
Your React Native project has grown from 10 screens to over 150 screens with multiple developer squads contributing concurrently. What folder architecture prevents merge conflicts and spaghetti code?

## Solution & Approach
A feature-agnostic structure (`/components`, `/screens`, `/hooks`) becomes unmanageable as teams step on each other's toes.

*   **Step 1:** Migrate to a **Feature-Based (Domain-Driven)** architecture.
*   **Step 2:** Create a `/features` directory. Inside, create domains like `/auth`, `/checkout`, `/wallet`.
*   **Step 3:** Each feature folder acts as an isolated micro-app containing its own `/components`, `/hooks`, `/api`, and `/store`.
*   **Step 4:** Enforce an `index.ts` (barrel file) in each feature. Other features are ONLY allowed to import what is exported from `index.ts`, creating strict, encapsulated boundaries.

## Interview Answer
"I would move from a flat file-type structure to a Domain-Driven Feature architecture. By grouping code into `/features/auth` or `/features/wallet`, we isolate components, hooks, and state locally. We enforce strict boundaries using barrel `index.ts` files, ensuring squads can work on separate domains simultaneously without creating merge conflicts or spaghetti dependencies."

---

# 16. Abstracting Platform Divergence cleanly

## Scenario
The UX team demands a completely distinct presentation layer for iOS (following Apple Human Interface guidelines) and Android (following Material Design) for a complex tabbed interface. How do you structure this without polluting code with `Platform.OS === 'ios'` checks?

## Solution & Approach
Using inline `Platform.OS` ternary operators across a massive component creates unreadable, heavily bloated files.

*   **Step 1:** Leverage Metro Bundler's extension resolution.
*   **Step 2:** Create three files: `TabContainer.ios.tsx` (Apple UI), `TabContainer.android.tsx` (Material UI), and `TabContainer.tsx` (types/interfaces).
*   **Step 3:** In your main navigator, simply use `import TabContainer from './TabContainer'`.
*   **Step 4:** The bundler will automatically select the correct OS file at compile time, completely separating the complex platform logic into isolated files.

## Interview Answer
"I strictly avoid inline `Platform.OS` checks for complex divergence. Instead, I use Metro's file extension resolution by creating `Component.ios.tsx` and `Component.android.tsx`. This keeps platform-specific UI completely decoupled, making the code much cleaner and reducing the bundle size since the bundler drops the unused platform file during compilation."

---

# 17. Writing a Bulletproof Custom Hook for Network Resilience

## Scenario
You need a reusable way to detect connection state fluctuations across the app and automatically retry failed background queries. Design a custom hook architecture for this.

## Solution & Approach
Connection state must be observed and debounced to prevent spamming retries on flaky networks.

*   **Step 1:** Create `useNetworkResilience()`.
*   **Step 2:** Inside the hook, subscribe to `@react-native-community/netinfo` to track online status.
*   **Step 3:** Keep track of failed query callbacks in a global Ref or Context array.
*   **Step 4:** Add a `useEffect` that listens for the network transition `offline -> online`. Add a debounce (e.g., 2000ms) to ensure the connection is stable, then iterate and execute the queued retry callbacks.

## Interview Answer
"I would build a `useNetworkResilience` hook that wraps `NetInfo`. It would accept fallback callbacks for failed API requests and push them into a queue. A `useEffect` listening to the network state would detect when the device comes back online, wait for a 2-second debounce to confirm stability, and automatically execute the queued retries."

---

# 18. Custom Hooks and Memory Isolation

## Scenario
If three different screen components invoke a custom hook `useCryptoTicker()`, do they share the underlying state values, or do they create multiple duplicate WebSocket connections? How do you enforce a singleton connection?

## Solution & Approach
By default, custom hooks do NOT share state. If `useCryptoTicker()` creates a WebSocket, calling it in three components opens three separate, duplicate connections.

*   **Step 1:** To fix this, lift the WebSocket connection logic completely OUT of the hook and into a higher-order **Context API Provider** or a global state store (Zustand).
*   **Step 2:** The `useCryptoTicker()` hook should merely act as a consumer wrapper: `return useContext(TickerContext)`.
*   **Step 3:** This guarantees the WebSocket is initialized exactly once at the root level, and all three screens securely subscribe to the exact same memory instance.

## Interview Answer
"Custom hooks share logic, not state. Calling it thrice opens three separate WebSockets. To enforce a singleton, I would move the WebSocket initialization into a global Context Provider or Zustand store at the app root. The custom hook would then be refactored to just consume that Context, ensuring all components share a single underlying connection."

---

## 🚀 Advanced New Architecture (Modern Context)

# 19. Moving from Bridge to Bridgeless Mode

## Scenario
Your team is planning a migration of a legacy 0.70 React Native application to the latest version running fully on the New Architecture. What are the key architectural changes you must explain to stakeholders?

## Solution & Approach
The upgrade radically changes how JavaScript talks to Native code.

*   **Step 1:** Explain the death of the **Asynchronous Bridge**. Data is no longer serialized into JSON strings and sent over a queue.
*   **Step 2:** Introduce **JSI (JavaScript Interface)**: JS can now hold direct references to C++ native objects and invoke them synchronously.
*   **Step 3:** Introduce **TurboModules**: Native modules are now lazy-loaded on demand instead of all at app boot, drastically improving startup time.
*   **Step 4:** Introduce **Fabric**: The new UI renderer that allows synchronous layout calculations natively, eliminating layout jumps and flickering.

## Interview Answer
"I would explain that we are removing the legacy JSON communication bridge. By adopting JSI, our JavaScript will communicate directly and synchronously with Native C++ code. This unlocks TurboModules for faster app boot times via lazy-loading, and the Fabric renderer, which eliminates asynchronous UI flickering by calculating layouts natively and synchronously."

---

# 20. Maximizing App Startup Efficiency

## Scenario
The business metrics reveal that users on mid-to-low tier devices drop off because the app takes over 5 seconds just to show the splash screen. What configurations and optimizations fix startup latency?

## Solution & Approach
Startup latency is a combination of native initialization and JS bundle parsing.

*   **Step 1:** Ensure **Hermes** is enabled. Hermes precompiles JS to bytecode during the build, saving the device from parsing raw text at startup.
*   **Step 2:** **Lazy load UI:** Use `React.lazy()` for screens not immediately visible on startup.
*   **Step 3:** **Defer heavy logic:** Wrap non-critical SDK initializations (like Analytics or Crashlytics) inside `InteractionManager.runAfterInteractions()` so they boot only after the first frame renders.
*   **Step 4:** Switch to **TurboModules** (New Architecture) so native modules are initialized only when called, not globally at launch.

## Interview Answer
"To fix startup latency, my first check is ensuring Hermes is compiling bytecode. I would then lazy-load heavy non-home screens, and use `InteractionManager` to defer the initialization of heavy third-party analytics SDKs until after the initial UI frame renders. Finally, migrating to the New Architecture’s TurboModules ensures native code is only loaded on-demand, freeing up the main thread during boot."

---

## 🏗️ The 0.63 to 0.83 Upgrade Interview Scenarios

# 21. Strategizing the Leap: Step-by-Step vs. One Big Jump

## Scenario
Your team needs to upgrade a massive production application from React Native 0.63 straight to 0.83. Do you attempt a direct upgrade using `react-native-upgrade-helper` in one go, or do you take an incremental path? Defend your approach.

## Solution & Approach
A direct leap across 20 versions will cause catastrophic failures in native compilation and dependency linking.

*   **Step 1:** Adopt a stepping-stone strategy. First, target an intermediate stable version (e.g., 0.72) where the legacy bridge is still fully supported.
*   **Step 2:** At the 0.72 milestone, resolve the "Lean Core" extractions (replacing core `AsyncStorage` with the community package) and update third-party dependencies to standard React 18 patterns.
*   **Step 3:** Only after stabilizing at the intermediate step, execute the final upgrade to 0.83 to flip the switch on the New Architecture (Fabric/TurboModules).

## Interview Answer
"A one-jump upgrade is extremely risky and impossible to debug when it fails. I would enforce a stepping-stone strategy. Phase 1 upgrades to a stable bridge version like 0.72 to clean up deprecated Lean Core modules and stabilize dependencies. Phase 2 takes the modernized codebase and leaps to 0.83, where we focus entirely on native toolchains and activating the New Architecture."

---

# 22. Navigating the Native Build Tooling Apocalypse

## Scenario
During the upgrade from 0.63 to 0.83, the iOS app crashes during `pod install`, and the Android app fails to compile in Gradle before even touching JavaScript code. What underlying native environment changes during this timeline cause this, and how do you fix them?

## Solution & Approach
Between 2020 and 2025, the underlying mobile development ecosystems aggressively evolved.

*   **Step 1:** **Android Updates:** You must update Gradle to version 8+, migrate to Java 17 (or 21), and update the Android SDK targets.
*   **Step 2:** **iOS Updates:** Ruby versions dictate CocoaPods compatibility. You must update Ruby, upgrade CocoaPods, and ensure Xcode is on the latest version. 
*   **Step 3:** Use the **React Native Upgrade Helper** specifically for the native files (`build.gradle`, `Podfile`, `AppDelegate.mm`) to manually merge the new C++ structured initializations.

## Interview Answer
"The build fails because the underlying environments changed. Android requires jumping to Gradle 8 and Java 17, while iOS requires modern Ruby and CocoaPods environments. I would use the RN Upgrade Helper to manually diff and merge the native wrapper files—especially `AppDelegate.mm` and `build.gradle`—to align with the new C++ initialization structures required by the framework."

---

# 23. The Deletion of the Legacy Bridge & Interop Layer Fallbacks

## Scenario
React Native 0.82+ completely freezes and removes the legacy runtime bridge configuration by default. If your 0.63 codebase relies heavily on old, unmaintained third-party native modules that haven't been re-written into TurboModules or Fabric, how do you prevent the app from breaking?

## Solution & Approach
Not all community packages have migrated to the New Architecture.

*   **Step 1:** Utilize the **New Architecture Interop Layer**. React Native built this layer specifically to wrap legacy native modules and allow them to run inside the Fabric renderer.
*   **Step 2:** Ensure `newArchEnabled=true` is correctly configured in native properties.
*   **Step 3:** If a specific package breaks the interop layer, you must fork the repository, write a custom TurboModule C++ wrapper for it yourself, or find a modernized alternative package.

## Interview Answer
"I would rely on the React Native Interop Layer, which automatically wraps legacy native modules so they function inside the Bridgeless environment. If an abandoned module fails the interop checks, we are forced to either patch it by writing our own TurboModule C++ specification or rip it out and replace it with a modern alternative."

---

# 24. Resolving the "Community Extraction" Package Chaos

## Scenario
Upon booting the freshly upgraded 0.83 app, you get flooded with RedBox crashes screaming `Invariant Violation: Native component X does not exist` or `AsyncStorage has been removed from React Native core`. What happened to the codebase, and how do you resolve it?

## Solution & Approach
This is the result of the "Lean Core" initiative where Facebook stripped non-essential modules from the main React Native bundle.

*   **Step 1:** Audit the codebase for imports directly from `react-native` (e.g., `import { AsyncStorage, NetInfo } from 'react-native'`).
*   **Step 2:** Run a migration script or manually replace these with their community equivalents (`@react-native-async-storage/async-storage`, `@react-native-community/netinfo`).
*   **Step 3:** Run `pod install` and clean the Gradle cache to ensure the native links for these newly added external libraries are registered.

## Interview Answer
"These crashes stem from the 'Lean Core' initiative where Meta deleted bloated modules from the framework. I would run a project-wide regex audit to identify deprecated core imports like AsyncStorage or NetInfo, replace them with the official `@react-native-community` packages, and rebuild the native links."

---

# 25. Managing the React Core Evolution (Hooks & Concurrent Mode)

## Scenario
React Native 0.63 used React 16.13, while React Native 0.83 operates on **React 19.2**. When you finally get the app to build, several screen UI layers crash or behave erratically due to unhandled state changes. What React-specific breaking changes must you refactor in the JS code?

## Solution & Approach
React underwent massive paradigm shifts with Concurrent Mode and automatic batching.

*   **Step 1:** **Remove Legacy Lifecycles:** Strip out any remaining `componentWillMount` or `componentWillReceiveProps` from class components.
*   **Step 2:** **Automatic Batching:** In React 19, state updates inside promises or timeouts are batched automatically. If legacy code relied on sequential, unbatched renders, it will break. Wrap necessary sequential updates in `flushSync`.
*   **Step 3:** Address strict mode warnings which double-invoke `useEffect` in development to expose missing cleanup functions.

## Interview Answer
"React 19 enforces strict Concurrent Rendering and automatic state batching. Erratic UI behaviors are usually caused by legacy code that relied on asynchronous state updates triggering sequential renders. I would audit state flows, fix missing `useEffect` cleanups exposed by React Strict Mode, and use `flushSync` only if we absolutely require an immediate, synchronous DOM flush."

---
