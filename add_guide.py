import json
import re

content = """
# 25 Scenario-Based Senior React Native Interview Questions

Here is a curated set of **exactly 20 scenario-based and high-level interview questions** tailored for senior or mid-senior React Native roles. These cover all your requested topics—memory leaks, optimizations, diagnostics, security, state management architecture (specifically focusing on real-world scenarios like Ola and Crypto), and custom hooks.

---

## 🛠️ Memory Leaks & Performance Optimization

### 1. The Screen Freezes on Infinite Scroll

> **Scenario:** Users scrolling through a fast-updating feed report that after 3 to 4 minutes, the app becomes sluggish and eventually crashes with an Out Of Memory (OOM) error. How do you isolate and resolve this?

* **What the interviewer is looking for:** Knowledge of `FlatList` vs. Shopify’s `FlashList`. Use of key optimization props like `windowSize`, `maxToRenderPerBatch`, `removeClippedSubviews`, and checking for anonymous functions or inline objects inside `renderItem` that break component memoization.

### 2. Hunting Down JavaScript Memory Leaks

> **Scenario:** A user navigates between the Home screen and a heavy Map screen multiple times. Memory consumption increases linearly with each visit and never drops. How do you find the source in code?

* **What the interviewer is looking for:** Identifying uncleared global event listeners (`DeviceEventEmitter`), uncleaned intervals (`setInterval`), or active RxJS/Event subscriptions inside a `useEffect` return cleanup function.

### 3. Native Memory Leaks vs. JS Memory Leaks

> **Scenario:** Your JavaScript heap sizes look perfectly stable in performance monitors, but Xcode/Android Studio profile views show total RAM consumption soaring until the OS kills the app. What is happening?

* **What the interviewer is looking for:** Understanding that images or native modules (like video players or custom bridges) allocate memory on the native heap, not the JS side. Solutions involve aggressive image caching adjustments or upgrading to modern TurboModules/JSI.

### 4. Keeping Animations Crisp at 60 FPS

> **Scenario:** You are building a complex swipeable Tinder-like card interaction. When other API network calls or state updates occur simultaneously, the animation drops frames significantly. How do you solve this?

* **What the interviewer is looking for:** Shifting animation logic completely off the single JavaScript thread. Use of `React Native Reanimated` (which executes animations directly on the UI thread via worklets) and `React Native Gesture Handler` instead of the legacy `Animated` API.

---

## 🔍 Code Diagnostics & Crash Tracking

### 5. Production Diagnostics with Hermes

> **Scenario:** An production-only performance bug occurs only on certain low-end Android devices. The app runs fine in debug mode. How do you profile this inside the actual code?

* **What the interviewer is looking for:** Using the Hermes sampling profiler. Downloading the `.cpuprofile` from the device via Chrome DevTools / Flipper or using React DevTools Profiler to track unnecessary re-renders.

### 6. Deciphering a Native Crash Log

> **Scenario:** Your crash reporting tool flags an obfuscated native crash (`SIGSEGV` or `Fatal Exception: java.lang.NullPointerException`) inside an Android release build. What steps do you take to trace this back to your React Native project?

* **What the interviewer is looking for:** Utilizing source maps and Proguard/R8 deobfuscation mapping files symbols to turn raw hexadecimal memory addresses back into readable JavaScript/Java stack traces.

### 7. Trapping Silent JavaScript Exceptions

> **Scenario:** An asynchronous API call fails silently inside a critical user checkout flow. The UI doesn't crash, but buttons stop responding, leaving the user stuck. How do you intercept and log these failures?

* **What the interviewer is looking for:** Implementing custom `ErrorUtils.setGlobalHandler` to capture unhandled global promises, using React Error Boundaries for rendering fallbacks, and integrating automatic error capturing with tools like Sentry or Bugsnag.

---

## 🏗️ State Management & System Architecture

### 8. Ride-Hailing Architecture (The "OLA" Scenario)

> **Scenario:** Design the state management and data architecture for a real-time ride-hailing app like OLA/Uber. Drivers move constantly, prices update, and the map must reflect changes smoothly.

* **What the interviewer is looking for:** A hybrid state architecture. Short-lived ephemeral state (real-time driver coordinate streams) handled via lightweight WebSockets/gRPC mapped directly to a local map component state or a micro-state manager (Zustand/Signals) to avoid global re-rendering of the entire app shell. Long-lived state (user profile, payment tokens) can reside in a central store.

### 9. Real-Time Trading Architecture (The "Crypto App" Scenario)

> **Scenario:** Design a state layer for a cryptocurrency trading app handling high-throughput order books, rapid price tickers, and instant user balance calculations.

* **What the interviewer is looking for:** Performance-focused isolation. Using standard Redux or Context API here will cause catastrophic re-render cycles. The answer should focus on event-driven architectures with high-frequency streams handled via tools like RxJS or localized Zustand stores with selective component subscriptions (`useStore(state => state.specificTicker)`).

### 10. Cache Management: MMKV vs. AsyncStorage

> **Scenario:** For either the Ola or Crypto app, you need to store thousands of historical transactions offline. Why would you choose MMKV over AsyncStorage?

* **What the interviewer is looking for:** Understanding that `AsyncStorage` relies on asynchronous JSON serialization over the old bridge, causing blockages during heavy data transfers. `MMKV` uses direct C++ JSI bindings to read/write memory synchronously, making it up to 100x faster.

---

## 🛡️ Security & Attack Mitigation

### 11. Hardening Mobile Authentication Storage

> **Scenario:** A security audit warns that your app is storing OAuth Refresh Tokens insecurely. Where should they be saved, and what are the native mechanisms involved?

* **What the interviewer is looking for:** Never using AsyncStorage or plain text files for secrets. Using **iOS Keychain** and **Android Keystore** via libraries like `react-native-keychain` or encrypted MMKV instances.

### 12. Thwarting Man-In-The-Middle (MITM) Attacks

> **Scenario:** For a fintech or cryptocurrency application, how do you guarantee that your app is communicating *only* with your verified backend servers, even if a user is on a compromised public Wi-Fi?

* **What the interviewer is looking for:** Implementing **SSL/TLS Certificate Pinning**. Restricting communication by hardcoding or dynamic building of trusted public key hashes (SHA-256) directly into the native network stack layer (`NetworkSecurityConfig` on Android and `Info.plist` on iOS).

### 13. Securing Javascript Source Code Against Reverse Engineering

> **Scenario:** A competitor downloads your public production APK file, decompiles it using an open-source tool, and extracts your private API keys and business logic. How do you prevent this?

* **What the interviewer is looking for:** Code obfuscation using Proguard/R8 on Android, avoiding any hardcoded secrets in code (moving them to runtime environment variables or secure storage), and understanding that Hermes compiles JS directly into bytecode, making it harder (though not impossible) to reverse engineer compared to plain JS text bundles.

### 14. Implementing Jailbreak and Root Detection

> **Scenario:** Your enterprise security policy dictates that the app must refuse to open if it runs on a rooted Android or jailbroken iOS device. How do you integrate this check cleanly?

* **What the interviewer is looking for:** Integrating native environment verification libraries (like `react-native-device-info` or custom native hooks) that check for anomalous binaries (e.g., `su`, `Cydia`), test write access outside sandbox environments, and execute a graceful lock-out screen.

---

## 📐 Folder Structure, Architecture & Custom Hooks

### 15. Scaling a Monolithic App Folder Structure

> **Scenario:** Your React Native project has grown from 10 screens to over 150 screens with multiple developer squads contributing concurrently. What folder architecture prevents merge conflicts and spaghetti code?

* **What the interviewer is looking for:** Moving away from a feature-agnostic layout (`/components`, `/screens`) to a modular **Feature-Based/Domain-Driven** directory structure (e.g., `/features/auth`, `/features/wallet`, `/features/booking`), isolating state, components, and hooks locally to that specific feature namespace.

### 16. Abstracting Platform Divergence cleanly

> **Scenario:** The UX team demands a completely distinct presentation layer for iOS (following Apple Human Interface guidelines) and Android (following Material Design) for a complex tabbed interface. How do you structure this without polluting code with `Platform.OS === 'ios'` checks?

* **What the interviewer is looking for:** Leveraging React Native’s extension-based file resolution. Creating `TabContainer.ios.tsx` and `TabContainer.android.tsx` files so the bundler cleanly resolves the correct platform version automatically at build time when importing `import TabContainer from './TabContainer'`.

### 17. Writing a Bulletproof Custom Hook for Network Resilience

> **Scenario:** You need a reusable way to detect connection state fluctuations across the app and automatically retry failed background queries. Design a custom hook architecture for this.

* **What the interviewer is looking for:** Creating a custom hook wrapper combining `useNetInfo` (from NetInfo) along with custom state/effects that subscribe to online status transitions, triggering retry functions while correctly debouncing rapid connection switches.

### 18. Custom Hooks and Memory Isolation

> **Scenario:** If three different screen components invoke a custom hook `useCryptoTicker()`, do they share the underlying state values, or do they create multiple duplicate WebSocket connections? How do you enforce a singleton connection?

* **What the interviewer is looking for:** Explaining that custom hooks share *logic*, not state data. To prevent duplicate expensive socket connections, the hook must interact with an external global state manager or context wrapper that acts as the single source of truth socket provider.

---

## 🚀 Advanced New Architecture (Modern Context)

### 19. Moving from Bridge to Bridgeless Mode

> **Scenario:** Your team is planning a migration of a legacy 0.70 React Native application to the latest version running fully on the New Architecture. What are the key architectural changes you must explain to stakeholders?

* **What the interviewer is looking for:** Explaining how the asynchronous JSON Bridge is eliminated in favor of the **JavaScript Interface (JSI)**, moving from legacy Native Modules to typed **TurboModules** (lazy loading) and upgrading the layout system to the **Fabric Renderer**.

### 20. Maximizing App Startup Efficiency

> **Scenario:** The business metrics reveal that users on mid-to-low tier devices drop off because the app takes over 5 seconds just to show the splash screen. What configurations and optimizations fix startup latency?

* **What the interviewer is looking for:** Ensuring the **Hermes engine** is fully optimized, utilizing lazy loading of heavy JavaScript dependencies, delaying initialization of third-party SDKs (Analytics, Ads) using `InteractionManager`, and keeping native app initializations (`MainApplication.java` / `AppDelegate.mm`) strictly minimal.

---

Upgrading a project across 20 versions of React Native—from **0.63** (released in 2020) to **0.83** (released in late 2025)—is a massive architectural jump. It spans moving from the legacy asynchronous JSON Bridge to the completely re-engineered **New Architecture** (JSI, Fabric, TurboModules) and updates the React core all the way up to **React 19**.

Here are 5 tailored interview questions covering the strategy, execution, and critical breaking points of this major migration:

---

## 🏗️ The 0.63 to 0.83 Upgrade Interview Scenarios

### 21. Strategizing the Leap: Step-by-Step vs. One Big Jump

> **Scenario:** Your team needs to upgrade a massive production application from React Native 0.63 straight to 0.83. Do you attempt a direct upgrade using `react-native-upgrade-helper` in one go, or do you take an incremental path? Defend your approach.

* **What the interviewer is looking for:** A direct leap over 20 versions will result in a completely broken native project configuration. The candidate should propose a targeted **stepping-stone strategy**, upgrading first to a stable bridge milestone (like `0.71` or `0.73`), cleaning up community package migrations, and then executing the final hop into the `0.80+` New Architecture environment.

### 22. Navigating the Native Build Tooling Apocalypse

> **Scenario:** During the upgrade from 0.63 to 0.83, the iOS app crashes during `pod install`, and the Android app fails to compile in Gradle before even touching JavaScript code. What underlying native environment changes during this timeline cause this, and how do you fix them?

* **What the interviewer is looking for:** Awareness of major toolchain updates. Moving from 0.63 to 0.83 forces transitions to **CocoaPods versions**, **Ruby updates**, minimum **Xcode configurations**, and major updates to **Gradle (version 8+)** along with Java 17/21 requirements. The solution requires utilizing the *React Native Upgrade Helper* to manually align the native files (`build.gradle`, `Podfile`, `AppDelegate.mm`, `MainApplication.java`).

### 23. The Deletion of the Legacy Bridge & Interop Layer Fallbacks

> **Scenario:** React Native 0.82+ completely freezes and removes the legacy runtime bridge configuration by default. If your 0.63 codebase relies heavily on old, unmaintained third-party native modules that haven't been re-written into TurboModules or Fabric, how do you prevent the app from breaking?

* **What the interviewer is looking for:** Deep familiarity with the **New Architecture Interop Layers**. The candidate should explain how React Native uses an interop layer to allow legacy components to render in Fabric and old native modules to be wrapped, or if necessary, how to plan a strict phased migration strategy using version `0.81` as an intermediate dual-architecture validation point before moving forward.

### 24. Resolving the "Community Extraction" Package Chaos

> **Scenario:** Upon booting the freshly upgraded 0.83 app, you get flooded with RedBox crashes screaming `Invariant Violation: Native component X does not exist` or `AsyncStorage has been removed from React Native core`. What happened to the codebase, and how do you resolve it?

* **What the interviewer is looking for:** Knowledge of **Lean Core**. Between 0.63 and 0.83, Meta completely stripped modules like `AsyncStorage`, `Slider`, `NetInfo`, and `WebView` from the core framework. The candidate must outline a migration script to systematically replace core imports with `@react-native-async-storage/async-storage`, `react-native-webview`, etc., and handle corresponding native link updates.

### 25. Managing the React Core Evolution (Hooks & Concurrent Mode)

> **Scenario:** React Native 0.63 used React 16.13, while React Native 0.83 operates on **React 19.2**. When you finally get the app to build, several screen UI layers crash or behave erratically due to unhandled state changes. What React-specific breaking changes must you refactor in the JS code?

* **What the interviewer is looking for:** Adapting to the modern React ecosystem. Legacy lifecycle methods (`componentWillReceiveProps`) are fully removed. The candidate must explain how React 18/19's **Concurrent Rendering** changes state batching rules (which can break poorly written race conditions in sequential states), the replacement of old ref behaviors, and the enforcement of stricter typing under modern TypeScript guidelines introduced natively in the `0.80+` cycle.

---

### Additional Visual Resources

To better visualize the fundamental shift in how your application executes code after this major upgrade, you can check out this comprehensive breakdown on the [React Native New Architecture](https://www.youtube.com/watch?v=4nVoLX2taFg). This video is highly relevant as it details modern architectural patterns, setup configurations, and performance tooling that became standard practice moving into the modern versions of the framework.

When managing a massive leap like **React Native 0.63 to 0.83**, treating it like a standard weekend patch is a recipe for a broken codebase. Because the framework fundamentally dropped its legacy asynchronous bridge and mandated the **New Architecture** during this timeline, the upgrade demands a highly strategic, phased approach.

---

## 🗺️ The Strategic Approach: Three-Phase Migration

An upgrade of this scale must be split into three distinct, decoupled phases. Jumping straight into the latest version will flood you with unresolvable compilation errors.

### Phase 1: The Dependency & Core Cleanup (Target: v0.72 - v0.73)

* **The Goal:** Isolate your JavaScript from native build tool changes.
* **Action:** Upgrade third-party dependencies to versions that support standard React 18 patterns and have decoupled from the old "Lean Core" modules (like replacing core `AsyncStorage` with `@react-native-async-storage/async-storage`).
* **Why:** This gets all your community packages updated to modern standards while still allowing the app to run on the legacy bridge architecture.

### Phase 2: The Interop / Dual-Arch Bridge (Target: v0.81)

* **The Goal:** Bridge the gap before the old architecture is completely deleted.
* **Action:** Upgrade to `0.81`—the last version where you can validate your custom native modules using the New Architecture's Interop layers, while verifying that the code compiles under modern native toolchains (Gradle 8+, Java 17, and modern CocoaPods).

### Phase 3: The Native Transition & Final Optimization (Target: v0.83)

* **The Goal:** Land fully on React Native 0.83 and React 19.
* **Action:** Enable the New Architecture natively (`newArchEnabled=true`). Clean up lingering `useLayoutEffect` layout flashes, refactor any legacy React concurrent state batching bugs, and maximize startup optimization via the Hermes compiler bytecode.

---

## ⏱️ Recommended Timeline (6-Week Roadmap)

For a mid-to-large-scale production application, a realistic timeline spans **6 weeks** from auditing to a safe production rollout.

* Weeks 1: Week 1: Audit & Package Inventory
Analyze `package.json`. Flag abandoned third-party libraries. Set up a dedicated Git branch and map out the exact native adjustments needed using the official **React Native Upgrade Helper** tool.


* Week 2: Week 2: JavaScript & Dependency Alignment
Execute **Phase 1**. Remove deprecated React Core modules, swap out old libraries for community-maintained equivalents, and update TypeScript configuration types. Ensure the app builds on the legacy bridge configuration.


* Week 3: Week 3: Native Toolchain & Environment Upgrade
Execute **Phase 2**. Update local development environments (Xcode, Android Studio, Java 17/21, Gradle 8+). Fix native configuration files (`Podfile`, `build.gradle`, `MainApplication`) to resolve native compilation blocks.


* Week 4: Week 4: New Architecture Activation & Refactoring
Execute **Phase 3**. Flip the native flags to activate Fabric, TurboModules, and React 19 concurrent features. Refactor breaking layout or lifecycle patterns uncovered by the new rendering pipelines.


* Week 5: Week 5: Quality Assurance & Performance Auditing
Internal and beta regression testing. Use memory profilers to catch runtime leaks, check rendering frames on lower-end devices, and monitor error logging tools (like Sentry) for unhandled exceptions.


* Week 6: Week 6: Phased Staged Production Rollout
Release to production using a staged rollout plan (e.g., 1% $\rightarrow$ 10% $\rightarrow$ 50% $\rightarrow$ 100%) on Google Play Store and Apple TestFlight to catch edge-case crashes before the entire user base is updated.


---

## ⚠️ Critical Challenges You Will Face

1. **Abandoned Native Modules:** Several packages your app depends on won't have been updated to support TurboModules/Fabric. You will either need to patch them with `patch-package`, write custom interop wrappers, or find modern alternatives.
2. **CocoaPods and Gradle Script Hell:** React Native shifted heavily away from custom Ruby/Groovy initializations toward structured C++ code compilation. Merging changes into your native wrapper files (`AppDelegate.mm` or `MainApplication.java`) will cause severe git merge conflicts that must be resolved manually.
3. **React 19 State Batching and Strict Mode:** Early React Native code often relied on unbatched, sequential state updates. React 19 batches updates more aggressively, which can trigger subtle race conditions or layout mismatches that weren't visible in 0.63.

---

To wrap your head around how the modern system renders layouts and handles memory after this upgrade, check out this comprehensive [React Native Full Course Workflow](https://www.youtube.com/watch?v=4nVoLX2taFg). This video is incredibly valuable for navigating a modern setup because it walks through scaffolding apps using current native configurations, managing modern asset pipelines, and using tools that became standard practice throughout the 0.80+ framework era.

You are completely right. Taking 6 weeks for a *minor* version upgrade would be massive overkill.

The 6-week timeline is strictly an **emergency roadmap for a massive generational jump** (like going from 0.63 to 0.83, which skips 20 versions and completely replaces the underlying architecture).

For standard, routine React Native upgrades (e.g., jumping from **0.81 to 0.82**, or **0.82 to 0.83**), the process is significantly faster because the native toolchains, React versions, and underlying architectures remain mostly identical.

---

## ⚡ Real-World Timelines Based on Upgrade Scope

| Upgrade Scope | Typical Timeframe | Primary Focus |
| --- | --- | --- |
| **Patch Version** *(e.g., 0.83.1 $\rightarrow$ 0.83.2)* | **1 to 2 Hours** | Just updating the version string in `package.json`, running `npm install`, and running a quick sanity check. No native code changes. |
| **Minor Version** *(e.g., 0.82.0 $\rightarrow$ 0.83.0)* | **2 to 5 Days** | Running the *React Native Upgrade Helper*, applying small diffs to native files (`Podfile`, `build.gradle`), updating 2–3 major dependencies, and running regression QA. |
| **Major Generational Jump** *(e.g., 0.63 $\rightarrow$ 0.83)* | **4 to 6 Weeks** | Upgrading build tools (Java/Gradle/Xcode), rewriting legacy native modules, fixing React core breaking changes, and doing full app regression testing. |

---

## 🏎️ The 3-Day Sprint Approach for Minor Upgrades

When you are doing a routine minor upgrade (e.g., 0.82 $\rightarrow$ 0.83), you can compress your approach into a tight **3-day workflow**:

1. **Day 1: Diff & Native Alignment:** ~3-4 Hours.
Go straight to the **React Native Upgrade Helper**. Filter the diff from your current version to the new version. Apply changes directly to your `Podfile`, `build.gradle`, and native initialization files. Run `pod install` and ensure the project compiles natively.


2. **Day 2: Dependency & JS Fixes:** ~4-6 Hours.
Run the app. Address any immediate JavaScript deprecation warnings or third-party library peer-dependency conflicts. Update the few packages that require it.


3. **Day 3: Smoke Testing & Release:** 1 Day.
Pass the build to QA for a targeted smoke test focused on core user flows (Login, Payment, Push Notifications). If clean, push immediately to staging or a phased production rollout.


---

## 💡 How to keep upgrades to days, not weeks:

* **Upgrade at least twice a year:** Skipping a single minor version is easy to fix. Skipping 5+ versions introduces a compounding layout of breaking changes that slows you down.
* **Keep dependencies thin:** The fewer unmaintained third-party native libraries you have, the fewer things break when the React Native core updates.
"""

file_path = "public/prepration/embedded_data.js"
with open(file_path, "r", encoding="utf-8") as f:
    js_content = f.read()

# Create a json representation of the new entry
new_entry = {
    "name": "Senior_RN_Scenarios.md",
    "content": content
}
new_entry_json = json.dumps(new_entry, indent=2)

# Insert it after "InterviewGuide": [
search_str = '"InterviewGuide": ['
idx = js_content.find(search_str)
if idx != -1:
    insert_idx = idx + len(search_str)
    # prepend with a newline, comma, and the new entry
    new_js_content = js_content[:insert_idx] + "\n    " + new_entry_json + "," + js_content[insert_idx:]
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_js_content)
    print("Successfully added new entry to embedded_data.js")
else:
    print("Could not find InterviewGuide in embedded_data.js")
