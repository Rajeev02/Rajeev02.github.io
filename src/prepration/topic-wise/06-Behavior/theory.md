## 🧭 Section 1: Senior Career Walkthrough (STAR Format)

When interviewing for Senior/Lead roles (9+ years experience), you must present your career progression, architectural ownership, and business value metrics clearly.

### 1. The Walkthrough Pitch
> *"I am a Senior Mobile Engineer with 9 years of hands-on experience building, shipping, and maintaining cross-platform Android and iOS applications. I started my career as a native Android developer (working with Java and the Android SDK), which gave me a deep understanding of native lifecycles, background services, threading, and performance optimization. Over the last several years, I transitioned into React Native, owning end-to-end mobile delivery for investor-facing products.*
>
> *Most recently, at LetsVenture, I spent over 6 years leading mobile delivery for investor-facing fintech products like LVX, LVXQ, and Scalix. I was responsible for the entire architecture, from Auth0/Cognito authentication and secure payment gateway integrations to offline sync caching and Play Store/App Store releases. Because I understand both the JavaScript ecosystem and native mobile engineering, I can confidently take an application from greenfield setup to production while optimizing performance across both platforms."*

---

## 🏗️ Section 2: Monorepo & Multi-App Code Sharing

### Scenario: Code Sharing across Sister Products (LVX, LVXQ, Scalix)
- **Challenge**: Building three separate, siloed products would lead to massive duplication of business logic (authentication, caching, API wrappers) and UI components (fintech tables, input states). However, a simple copy-paste approach would create a maintenance nightmare.
- **Solution**: Design a **Yarn/pnpm Workspaces Monorepo structure** to separate dependencies and share code cleanly.
- **Architecture Layers**:
  - **`packages/core`**: Headless business logic, Axios interceptors, Auth0/Cognito authentication hooks, Redux Toolkit slices, and caching layers. This serves as the single source of truth for the fintech data model.
  - **`packages/ui-kit`**: A shared design system containing atomized, platform-agnostic UI elements (buttons, input fields, secure cards) built on React Native Web.
  - **`apps/`**: Separate workspaces for `apps/lvx`, `apps/lvxq`, and `apps/scalix`. Each application imports components and services from `packages/core` and `packages/ui-kit` but maintains its own routing, assets, permissions, and `app.json` configs.
- **Business Result**: Reduced time-to-market for new features by over 40% and enabled a small mobile team of individual contributors to maintain three enterprise-grade production applications simultaneously.

---

## 🔒 Section 3: High-Stakes Fintech System Design

Fintech platforms handle transactions, investments, and PII. Security and resilience are core requirements.

### 1. Data Security at Rest (Keychain / Keystore)
- **Problem**: Storing access tokens, refresh keys, or private financial metrics inside `AsyncStorage` or unencrypted `MMKV` is unsafe. On rooted or jailbroken devices, these plaintext files can be read easily.
- **Solution**: Reframe storage using **`react-native-keychain`** or **Expo SecureStore**. These wrappers interface directly with the device's hardware secure enclaves: **Keychain** (iOS) and **Keystore** (Android).
- **Silent Token Refresh Interceptor**: Set up an Axios response interceptor. If an API call fails with a `401 Unauthorized` due to access token expiration, the interceptor pauses subsequent outgoing requests, reads the secure Refresh Token from the Keychain, fetches a new Access Token from AWS Cognito/Auth0 in the background, updates storage, and automatically retries the failed requests without interrupting the user session.

### 2. Data in Transit (SSL Pinning & Attestation)
- **Problem**: Protect the app from Man-in-the-Middle (MitM) attacks (e.g., attackers using proxy tools like Charles or Fiddler to intercept API requests on public networks).
- **Solution**: Implement **SSL Pinning** at the native network layer.
  - **Android**: Configure `CertificatePinner` inside the native `OkHttpClient` setup.
  - **iOS**: Integrate `TrustKit` via CocoaPods.
  - The app will reject connections to any backend server that fails to present a cryptographic certificate matching our pre-bundled public key hashes.
- **Device Attestation**: Pair SSL Pinning with **Google Play Integrity API** (Android) and **Apple App Attest** (iOS) to cryptographically verify that API requests are coming from our unaltered, signed production binary running on a real, untampered device.

### 3. Payment Gateway Resilience (Razorpay & Cashfree)
- **Problem**: A user completes a payment in the Razorpay SDK, but before the success callback returns to the JavaScript thread, the app crashes, the network drops, or the user force-closes the app. The client-side success handler never fires, leaving the transaction in a broken state.
- **Solution**: 
  1. **Idempotency Keys**: Attach a unique checkout session UUID (`idempotency-key`) to the payment metadata. If network retries occur, the gateway detects the duplicate key and prevents double-charging.
  2. **Server-to-Server Webhooks**: The mobile app is **never** treated as the source of truth for transactions. When a payment completes, the payment gateway triggers a secure webhook payload directly to our backend server. The backend verifies the signature, updates the database ledger, and pushes the updated transaction status to the mobile client (via websockets, polling, or push notifications) once verified.

---

## ⛺ Section 4: Dunst & WildTrails Case Studies

### 1. Offline-First Safari Syncing (WildTrails)
- **Context**: A wildlife tracking app used in remote areas with poor network coverage. Users need to log sightings offline, and the data must sync when connection is restored.
- **Challenge**: JavaScript background timers are throttled or killed by the mobile OS when the app is backgrounded.
- **Solution**: Build a custom Android Native Module using the Android SDK's **`WorkManager` API** (in Java/Kotlin) and iOS **BackgroundTasks Framework**.
  - Sightings are stored locally in an encrypted MMKV database.
  - When offline, sighting uploads are placed in an Outbox Queue.
  - NetInfo detects connection changes. The native background sync manager schedules execution queues that respect OS-level battery optimizations. Data is synced to the server, and the JavaScript layer is notified via `DeviceEventEmitter` when the sync finishes.

### 2. Dunst Technologies: VR and Ticketing
- **Context**: Consumer-facing travel apps utilizing VR tours and ticketing.
- **Challenge**: Seamless rendering of VR media and tickets on low-end devices without blocking the main thread.
- **Solution**: Offload high-computation rendering processes and image decoding from the single JavaScript thread to the native OS layer. Leverage native views (Fragments/UIViews) inside custom native view wrappers in React Native to keep the main thread responsive during media playback.

---

## 🏛️ Section 4b: Mobile Solution Architecture, Native Integration & Enterprise Banking (CAPCO Context)

### 1. Enterprise Banking & Fintech Architectural Imperatives (CAPCO Alignment)
Banking and capital market systems require uncompromising standards of security, auditability, data integrity, and transactional safety:
- **Uncompromised Data Security (At Rest & In Transit)**: Attaining compliance with financial regulations (e.g. PCI-DSS, SOC2) requires implementing native certificate pinning, encrypting MMKV instances with AES-256 keys, and offloading biometric authentication checks (FaceID/TouchID) to OS enclaves via `react-native-fingerprint-scanner` or local Swift/Kotlin hardware wrappers.
- **Transaction Idempotency**: Network failures must not lead to double-charges or duplicate asset transfers. We assign a client-generated UUID `idempotency-key` to all transaction payloads. If a socket times out and is retried, the gateway returns the cached state of the first request instead of processing a duplicate order.
- **Offline Ledger Reconciliation**: In high-stakes operations, offline caching must function as a transactional database. We design database schemas using atomic transactions (SQLite/Realm) or write-ahead logging (WAL) databases to prevent corruption if the app is force-closed during writes.

### 2. Native vs. Hybrid Performance Limits (Architectural Decision Matrix)
*Can React Native achieve native performance today?* 
- **The Architect's Verdict**: **Yes**, React Native performance is now indistinguishable from native for 98% of standard banking, wealth management, and transactional products. Modern engines (Hermes JSI) render layouts, animations, dynamic lists, and forms at 60/120 FPS.
- **Limitation Triggers (When to go Pure Native)**:
  - **Heavy Multi-Threaded Computations**: JavaScript runs on a single main thread. Operations like real-time video rendering, machine learning models, or heavy background cryptographic hashing saturate the JS thread, causing UI frames to drop.
  - **Direct GPU Processing**: Apps requiring custom 3D game engines, AR/VR tracking, or custom low-level metal/vulkan shaders.
  - **Heavy Background Work**: Background audio recording, persistent socket listening, or sensor streaming that must run indefinitely, even if the OS enters battery-saver modes.

### 3. Native Integration Mechanics (Bridge vs. JSI/TurboModules)
Integrating custom native Android/iOS SDKs or wrapping Java/Kotlin and Swift libraries in React Native follows two architectures:
- **Legacy Bridge (RCTBridgeModule)**: Exposes native classes through JSON-based asynchronous serialization. Native method arguments are serialized on the JS thread, sent across the C++ bridge queue, deserialized on the native UI/Background thread, executed, and returned asynchronously via callbacks or promises.
- **Modern JSI (TurboModules)**: Eliminates the bridge. C++ bindings allow the JS engine to hold a reference pointer directly to the native object in memory. Methods can be invoked **synchronously** (e.g. synchronous cryptography or reading device memory) with zero type conversion or batching delays, ensuring immediate responses.

### 4. Advanced Native Android SDK & Enterprise Java Architecture
Leveraging a native Java/Kotlin background enables designing highly resilient custom native modules and services inside enterprise applications:
- **Clean Architecture & Design Patterns**: We divide native layers into:
  - **Data Layer**: Repositories, SQLite OpenHelpers, network interceptors.
  - **Domain Layer**: Pure business logic and use cases.
  - **Presentation Layer**: Native layouts (XML/Jetpack Compose), ViewModels.
  - Utilizes design patterns like Repository Pattern, Singleton, Dependency Injection (Dagger/Hilt), and Observer Pattern (LiveData/RxJava).
- **Advanced Java Development & Concurrency**: We handle native asynchronous processing using Java concurrency primitives, including `ExecutorServices`, `AsyncTask` (legacy), `Coroutines` (Kotlin), or `RxJava` threads, ensuring that heavy native network tasks never block Android's main UI thread (preventing ANR - App Not Responding errors).
- **Cloud-Based Mobile Integrations**: Implement robust synchronization handlers with cloud providers (AWS Cognito, Firebase, Azure) for auth sessions, remote config toggles (Feature Flags), and real-time ledger updates.

---

## 🏆 Section 5: Standard Behavioral & Technical Interview Q&A

### 1. Walk me through your experience and how it relates to this role.
- **Answer**: 
  I have over **9 years of professional software engineering experience**, with a strong background in native Android development (Java/Kotlin) before transitioning to React Native. Over the past 6+ years, I have served as the core mobile lead at LetsVenture, architecting and delivering high-stakes fintech products like **LVX**, **LVXQ**, and **Scalix**. 
  
  In this role, I owned the entire lifecycle: building a shared monorepo structure to maximize code reuse, establishing robust security systems (SSL Pinning, Keychain/Keystore encryption, App Attestation), integrating complex payment SDKs, and managing the release process for both Google Play Store and Apple App Store. 
  
  This position is an excellent fit because I bring a unique combination of high-level JavaScript/TypeScript expertise and low-level native Android/iOS knowledge. I don't just write React components—I debug the underlying native bridge, optimize UI threads, and integrate complex hardware and OS services to build highly performant, secure mobile apps.

---

### 2. I see you have strong React Native experience. Describe a complex performance bottleneck you encountered in a React Native application. How did you identify it, and what specific tools or techniques did you use to resolve it?
- **Answer**: 
  - **The Problem**: In our investor platform, users scrolled through a long transaction ledger consisting of hundreds of complex cards. When scrolling quickly, the UI would freeze, keyframes dropped, and the JS thread frame rate plunged from 60 FPS down to **8-12 FPS**.
  - **Identification & Diagnostics**:
    1. I used the React Native **Performance Monitor** overlay (`Cmd + D` menu) to confirm the bottleneck was on the JS Thread (which dropped significantly), while the UI/Render Thread remained close to 60 FPS.
    2. I attached **Flipper** and ran the **Hermes Debugger** to capture CPU profiles. The profile highlighted massive call stacks originating from currency conversions and date formatting inside render methods.
    3. I used **React DevTools Profiler** to record render cycles. I noticed that parent updates caused the entire list of items to re-render, even if individual list item details had not changed.
  - **Resolution**:
    1. **Pre-computation**: I moved CPU-intensive formatting (e.g., date formats, exchange rate calculations) out of the render loop. I formatted the objects immediately after the API fetch, storing the ready-to-render strings in the state.
    2. **List Item Memoization**: Wrapped individual list item components in `React.memo` with a custom comparison function to prevent unneeded re-renders.
    3. **FlatList Layout Caching**: Provided the `getItemLayout` prop to precalculate layout heights, preventing the FlatList from continuously measuring layout dimensions dynamically.
    4. **FlashList Migration**: Eventually migrated the list to Shopify's `@shopify/flash-list` to take advantage of view cell recycling instead of recreating view nodes.
    5. **Sync Storage Optimization**: Replaced the default asynchronous `AsyncStorage` with `react-native-mmkv` for synchronous, memory-mapped data retrieval, removing asynchronous delays from storage accesses.
    *Outcome*: The JS thread stabilized back to a consistent **58-60 FPS**, creating a fluid scrolling experience.

---

### 3. You've worked with Android SDK. In a React Native project, when would you decide to implement a feature using a native Android module rather than sticking purely to JavaScript? Provide a specific example.
- **Answer**: 
  - **Decision Criteria**: I decide to write a native Android module (Java/Kotlin) when:
    1. The feature requires low-level OS APIs that are not exposed to JavaScript (e.g., persistent background processes, device hardware, or system broadcasts).
    2. The feature performs intense computations (like real-time image processing or decryption) that would freeze the single JavaScript thread.
    3. We need to integrate a third-party SDK that only provides native Android/iOS libraries with no official React Native wrapper.
  - **Specific Example**: In our WildTrails application, we needed to implement an **offline-first background synchronizer** that syncs queued data back to the server. 
    - Standard JS timer APIs (`setTimeout` or `setInterval`) are throttled or terminated by the OS when the app is placed in the background or when the phone enters Doze mode.
    - **Native Implementation**: I built a custom React Native module exposing the native **Android `WorkManager` API**. The module accepts sync queue targets from the JS thread, stores them in an encrypted database, and registers a `PeriodicWorkRequest` with constraints (e.g., network must be connected, battery should not be low). 
    - This native task runs reliably in its own background service thread managed by the OS, even if the user force-closes the app, notifying the JavaScript layer of completion via `DeviceEventEmitter` when the app is next active.

---

### 4. Your resume mentions Xcode. For an iOS React Native application, what are the key steps you follow to diagnose and resolve a crash that only occurs on a specific iOS device model or version?
- **Answer**: 
  When a crash is isolated to a specific device model (e.g., iPhone 15 Pro) or iOS version (e.g., iOS 17.2), I follow this systematic triage process:
  1. **Crashlytics / Sentry Investigation**: Examine the aggregated crash details on Sentry. I retrieve the stack trace, locate the failing thread, and look at the exception type (e.g., `EXC_BAD_ACCESS` indicating memory corruption or `NSInvalidArgumentException`).
  2. **Symbolicate Crash Logs**: Ensure that the appropriate **dSYM (debugging symbols)** files for the release build are uploaded so that memory addresses are resolved to actual file names and line numbers.
  3. **Xcode Organizer**: Open the **Organizer** window in Xcode and review the "Crashes" panel to view official logs sent directly from Apple devices, highlighting patterns.
  4. **Targeted Reproduction**: Spin up an iOS Simulator with the exact iOS version in Xcode. If the crash is device-specific (e.g., related to the dynamic island or GPU APIs), I attach a physical test device.
  5. **LLDB Exception Breakpoint**: Run the debug scheme via Xcode on the target device, enabling an **All Exceptions Breakpoint**. When the crash occurs, Xcode halts execution exactly at the offending native line.
  6. **Bridge Verification**: Check for **Native-JS Type mismatches**. A common source of crashes on specific OS versions is when React Native passes a `null` or type-mismatched JSON payload down the bridge, and the Swift/Objective-C code attempts to force-unwrap it (e.g., `stringValue!`), triggering a crash. Adding default native value fallbacks or strong TypeScript typings resolved this.

---

### 5. You have experience with CI/CD pipelines. How do you ensure code quality and prevent regressions in a React Native project's Git workflow before merging to the main branch?
- **Answer**: 
  To enforce strict code quality and prevent regressions across our team, I establish a multi-layered verification pipeline:
  1. **Local Pre-commit Validation**: I configure **Husky** and `lint-staged` to run ESLint, Prettier, and basic type-checks locally. Developers cannot commit code that violates styling rules or fails static analysis.
  2. **Git Branching Strategy**: Developers branch off `develop` (e.g., `feature/payment-fix`) and submit a Pull Request. PR templates require screenshots of changes on both iOS and Android.
  3. **Automated CI Pipeline (GitHub Actions)**:
     - **Dependency Audit**: Restores cached node dependencies and CocoaPods to speed up execution.
     - **Static Analysis**: Runs TypeScript compilation check (`tsc --noEmit`) to catch type safety regressions.
     - **Unit & Integration Tests**: Executes Jest tests (e.g., testing Redux slices, utility functions, and mock API services).
     - **Native Compilation Checks**: Compiles a headless debug build of both Android (using `./gradlew assembleDebug`) and iOS (using `xcodebuild`) to verify that native configuration changes (like `plist` or `build.gradle` updates) do not break the compiler.
  4. **Manual & Beta Distribution**: Once the PR is approved by senior peers and merged into `develop`, **Fastlane** triggers automated beta builds to **TestFlight** and **Google Play Console Internal Testing** for QA verification.

---

### 6. You have extensive mobile app development experience. Describe a challenging system design decision you faced when architecting a new feature for a React Native application. What factors influenced your choices?
- **Answer**: 
  - **The Challenge**: Architecting a robust, **offline-first investment transaction outbox** at LetsVenture. Financial transactions must execute exactly once (idempotent), cannot afford data loss if the app is closed, and must resume automatically when the device recovers from poor cellular connection.
  - **Design Choices & Tradeoffs**:
    1. **Storage Choice**: I chose **MMKV** over SQLite or AsyncStorage. MMKV is backed by memory-mapped files, providing ultra-fast synchronous read/write access. This ensured that transactions could be written to the local disk in under 1ms, eliminating any risk of write failures if the app was closed immediately after a user tapped "Submit".
    2. **Transaction Queue Design**: Built a FIFO (First-In, First-Out) transaction outbox. Transactions are assigned a unique, immutable `idempotency-key` (UUID v4) on creation.
    3. **Network Synchronization**: I used `NetInfo` to detect network status. On connection restoration, the queue manager parses the outbox, executing requests sequentially. The backend relies on the `idempotency-key` to ensure that if a request was received twice due to a network dropout, the second request returns the first request's cached response instead of processing a duplicate payment.
    4. **Reliable Background Execution**: Integrated native background tasks (using `WorkManager` for Android) to process the outbox if the user minimized the app during sync.
  - **Outcome**: Created a robust, transactional outbox system that successfully handled millions of dollars in transactions with zero double-charge incidents and a 99.9% successful sync recovery rate.

---

### 7. You've worked with React Query and Redux Toolkit. How would you decide which state management solution is more appropriate for different types of data in a large-scale React Native application?
- **Answer**: 
  In a large-scale application, I divide state into two distinct categories: **Server State** and **Client UI State**.
  
  | Feature | React Query (TanStack Query) | Redux Toolkit (RTK) |
  | :--- | :--- | :--- |
  | **State Type** | **Remote Server State** | **Local Client UI State** |
  | **Use Cases** | Portfolios, transaction lists, user profiles, market data. | Dark mode toggle, navigation drawer state, complex form wizards. |
  | **Core Job** | Acts as an asynchronous cache manager. Handles fetching, caching, retries, polling, and deduplication. | Acts as a synchronous, predictable in-memory store. |
  | **Boilerplate** | Very Low. Replaces Thunks/Reducers with simple custom hooks. | Medium. Requires actions, reducers, and store configuration. |
  
  - **Decision Logic**:
    - If the data is **fetched from a database**, must be kept fresh, requires automatic background refreshing, and is updated by other users, I use **React Query**. I configure query keys (e.g., `['deals', dealId]`) to scope and invalidate the caches declaratively.
    - If the data is **purely local to the client**, does not interact directly with APIs, needs to be shared across unrelated screens, and requires complex synchronous operations, I use **Redux Toolkit**. 
  - **Hybrid Approach**: We keep the Redux store small and lightweight, focusing only on UI configurations, while offloading 90% of our asynchronous data-fetching boilerplate to React Query hooks.

---

### 8. Your resume mentions JavaScript. How do JavaScript's asynchronous patterns (Promises, async/await) impact the performance and responsiveness of a React Native application, especially when dealing with network requests or heavy computations?
- **Answer**: 
  - **The Threading Model**: JavaScript in React Native is single-threaded, running on the **JS Thread**. Gestures, animations, and layouts are processed on the **UI Thread**. 
  - **Async Execution**: Promises and `async/await` do not create new threads in JavaScript. Instead, when an asynchronous operation (like `fetch()`) is called, the network I/O is offloaded to native background threads. When the native operation completes, the callback is pushed to the JS Event Loop's **Microtask Queue**.
  - **Performance Impact**:
    1. **Responsive UI**: During network requests, the JS thread remains free to handle user interactions because the networking is handled off-thread. This keeps the UI responsive.
    2. **The "Blocked Thread" Risk**: If the callback of a resolved Promise contains intensive synchronous JavaScript computations (e.g., parsing a 5MB JSON payload or sorting a large dataset of 10,000 arrays), the JS thread will block. During this time, the JS thread cannot send layout commands or process incoming gesture events across the bridge, causing the app to lag or stutter.
  - **Mitigation Strategies**:
    - **Offload Computations**: For heavy math or file manipulation, write a Native Module to perform the work on a background native thread, returning only the final outcome to the JS thread.
  - **Mitigation Strategies**:
    - **Offload Computations**: For heavy math or file manipulation, write a Native Module to perform the work on a background native thread, returning only the final outcome to the JS thread.
    - **InteractionManager**: Use `InteractionManager.runAfterInteractions()` to delay non-critical state updates or heavy JS executions until active navigation or touch animations have completely finished, preserving a smooth 60 FPS transition.

---

### 9. How do you structure a large-scale React Native application?
- **Answer**: 
  For enterprise-grade apps, I prefer a **feature-based structure** (screaming architecture) instead of organizing folders strictly by technical type (e.g. putting all components together, all hooks together).
  - **Proposed Layout**:
    ```text
    src/
     ├── features/
     │    ├── auth/          # Slices, hooks, components, routes specific to Auth
     │    ├── portfolio/     # Portfolio graphs, calculations, ledger components
     │    ├── payments/      # Razorpay/Cashfree configurations, checkout views
     │    └── profile/       # Security preferences, settings
     ├── components/         # Shared design system components (buttons, secure inputs)
     ├── services/           # Axios configs, Branch deep linking, PostHog modules
     ├── navigation/         # Protected routes mapping, navigation container configurations
     ├── hooks/              # Global custom hooks (e.g., useNetwork, useLocalStorage)
     ├── store/              # Redux slices, hydration bindings
     └── utils/              # Decimal calculations, date parsers
    ```
  - **Tradeoffs**:
    - *Pros*: Minimizes coupling, allows independent feature development, scales with large teams, and speeds up feature onboarding.
    - *Cons*: Slightly increases directory depth, requiring absolute import paths configured via `tsconfig.json` path mapping.

---

### 10. How do you handle offline support in React Native?
- **Answer**: 
  My design for handling offline operations uses a layered sync approach:
  1. **Connectivity Detection**: Track network status changes using `@react-native-community/netinfo`.
  2. **Query Caching**: Configure React Query with a synchronous MMKV-backed cache persister to make GET api data accessible instantly during offline states.
  3. **Local Store Hydration**: Keep user configs, auth state, and theme flags persisted using Zustand/Redux with `redux-persist` MMKV wrappers.
  4. **Sync Queue (Outbox Pattern)**: User mutations executed offline (like saving a transaction or updating a detail) are serialized and placed in a local SQLite outbox queue.
  5. **Sync Reconciliation**: Once `NetInfo` confirms network recovery, the queue processor iterates over the SQLite queue, firing API requests sequentially. We attach an `idempotency-key` to all calls, ensuring the backend rejects duplicate runs if network dropped midway.

---

### 11. Explain the React Native Bridge and its limitations.
- **Answer**: 
  - **The Bridge Model**: The legacy bridge acts as a communication queue between the JavaScript thread (running logic) and the Native OS main thread (rendering views). Communication is **asynchronous, batched, and serialized**.
  - **Bridge Limitations**: To execute actions (like updating view borders on scroll or receiving touch gestures), data must be serialized into JSON string buffers, queued over the C++ bridge, and deserialized on the other side. Flooding this queue (e.g., during rapid scroll views, map rotations, or continuous input validation) causes delays, dropping frame rates down to 10-15 FPS.
  - **Modern Solution**: React Native's New Architecture replaces the bridge with the **JavaScript Interface (JSI)**. JSI allows JavaScript to invoke methods directly on native objects synchronously by holding direct memory reference pointers, removing serialization queues completely.

---

### 12. How would you reduce app startup time?
- **Answer**: 
  I optimize app launch time using these production strategies:
  1. **Lazy Loading**: Delay loading non-critical screens until navigation calls occur using `React.lazy()` and `Suspense`.
  2. **Eager Initializations Audit**: Audit Third-Party SDKs (PostHog analytics, Branch links, Facebook marketing). Do not run these on the initial startup flow; delay initialization until after the component tree mounts.
  3. **Hermes Bytecode Engine**: Build release packages using Hermes pre-compiled bytecode (`.hbc`) instead of parsing raw JavaScript files at runtime.
  4. **Lazy TurboModules**: In the New Architecture, configure native modules as TurboModules to lazy-load them into memory only when they are first invoked, decreasing JVM launch overhead.
  5. **Inline Requires**: Enable inline requires in `metro.config.js` to defer package evaluation until the module is actually required in the JS execution path.

---

### 13. What is Hermes and why is it useful?
- **Answer**: 
  **Hermes** is an open-source JavaScript engine developed by Meta, optimized specifically for running React Native apps:
  - **Ahead-of-Time (AOT) Compilation**: Traditional engines parse and compile JavaScript code at runtime (JIT). Hermes compiles the JavaScript bundle into bytecode during build time. The binary ships with pre-compiled bytecode, saving CPU cycles on app startup.
  - **Memory Efficiency**: Hermes decreases memory usage (RAM footprints) on mobile devices by releasing memory allocations early and implementing an aggressive mark-and-sweep garbage collector designed for mobile constraints.
  - **Smaller APK/IPA Sizes**: Compiling to bytecode reduces the overall binary bundle size of the application.

---

### 14. How do you secure sensitive information in mobile apps?
- **Answer**: 
  1. **Secure Tokens**: Never store JWTs, Cognito refresh tokens, or passwords inside plaintext environments like `AsyncStorage` or unencrypted `MMKV` files. Implement `react-native-keychain` which encrypts data at rest using **Keychain** (iOS) and **Keystore** (Android).
  2. **SSL Pinning**: Integrate certificate public key hashes directly into native clients (`OkHttpClient` on Android, `TrustKit` on iOS) to prevent Man-in-the-Middle (MitM) interceptors from reading data in transit.
  3. **API Integrity Checks**: Pair AWS Cognito/Auth0 validation checks with device attestation tokens generated via Google Play Integrity and Apple App Attest.
  4. **Prevent Screen Captures**: Set high-security screens (like payments or bank details) to block screenshots and video recordings by enabling native layout security flags (e.g. `FLAG_SECURE` in Android Activity windows).

---

### 15. How would you investigate a memory leak?
- **Answer**: 
  - **Investigation Workflow**:
    1. **Locate Symptom**: Monitor Sentry crash rates or watch for staircase-like RAM patterns in Android Profiler or Xcode Instruments (Allocations/Leaks).
    2. **Hermes Memory Profiling**: Connect Flipper to the Hermes debugger. Capture **Heap Snapshot A** (initial view), perform interactions (opening and closing the target screen 10 times), and capture **Heap Snapshot B**. Compare the snapshots to identify objects that are not collected.
  - **Common Culprits**:
    - **Active Subscriptions**: Event emitters (`DeviceEventEmitter`) or AppState listeners not cleared in `useEffect` returns.
    - **Active Timers**: `setInterval` loops referencing component properties that are not cleared via `clearInterval` on unmount.
    - **Retained Navigation References**: Custom navigator histories holding references to screens, preventing GC sweeps.

---

### 16. Detail useMemo and useCallback optimizations.
- **Answer**: 
  - **`useMemo`** caches the computed value of a function across renders.
    - *Use Case*: Filtering or sorting a large dataset of transactions.
  - **`useCallback`** caches the memory reference of a function pointer itself.
    - *Use Case*: Preventing child components wrapped in `React.memo` from re-rendering due to changing function reference pointers on every render.
  - **Anti-Pattern Warning**: Overusing them on simple operations adds overhead. Comparing dependency arrays on every render is more expensive than re-creating a primitive value or re-allocating a simple inline arrow function. Only use them when profiling displays performance degradations or unnecessary re-renders of heavy components.

---

### 17. How would you implement Push Notifications?
- **Answer**: 
  - **Flow Architecture**:
    1. **Registration**: The mobile app requests permission from the OS. Once approved, the app fetches the native Device Token from FCM (Firebase Cloud Messaging) and APNs (Apple Push Notification service).
    2. **Token Sync**: The token is sent to our backend database and mapped to the active user's account session.
    3. **Payload Dispatch**: When a transaction occurs, the backend sends a secure payload containing the target token to FCM/APNs, which routes it to the target device.
    4. **Handling States**:
       - *Foreground*: Handle incoming messages using notification listeners and display local banners.
       - *Background/Quit*: The OS displays the notification automatically. When clicked, the notification payload is parsed to route deep-link paths (via React Navigation) to the appropriate screen.

---

### 18. What would you monitor after a production release?
- **Answer**: 
  I monitor the health of the app during the first 24-48 hours using these tools:
  1. **Crash Telemetry (Sentry)**: Watch the crash-free user percentage. Inspect raw JS exceptions and native crash logs to identify early regressions.
  2. **Behavioral Funnels (PostHog)**: Monitor registration success rates, checkout funnel conversions, and core features adoption.
  3. **Network Latency dashboards**: Check API response time metrics and HTTP failure rates.
  4. **Store Health (Play Store & App Store Connect)**: Check developer consoles for startup failures (ANRs), user reviews, and app launch ratings.

---

### 19. How do you handle API failures gracefully?
- **Answer**: 
  To prevent users from staring at a blank screen or a broken UI, I implement these patterns:
  1. **Automatic Retries**: Configure React Query to retry queries up to 3 times with **exponential backoff** to handle temporary network dropouts.
  2. **Error Boundary Fallbacks**: Wrap screen modules in React Error Boundaries to catch unhandled runtime errors, displaying a fallback UI with a "Try Again" button.
  3. **User Notifications**: Display contextual alerts or toast messages for network failures.
  4. **Graceful Cache Resolution**: If a refetch fails, keep displaying cached data from MMKV while showing a warning banner (stale data indicator) rather than clearing the UI.

---

### 20. Describe a difficult production issue you solved.
- **Answer**: 
  - **The Problem**: In our investor-facing LetsVenture app, users reported random logouts while browsing deals. Sentry captured zero native crashes, but analytics displayed a sharp rise in sudden session terminations.
  - **Investigation**: I checked network logs and Sentry breadcrumbs. The issue was traced to Cognito token refresh failures. When access tokens expired, the app sent a refresh request. However, if the user was on a poor cellular connection, the request timed out. The interceptor treated the timeout as an invalid token, cleared local keys, and forced a logout.
  - **Resolution**: I refactored the Axios response interceptor. I increased the refresh timeout, queued failed API calls during token refresh operations, and configured a retry limit. Only if the refresh token returned a formal 400/401 did the app trigger a logout.
  - **Outcome**: The logout incident rate dropped by over 95%, restoring session stability for users on cellular connections.

---

### 21. Redux Toolkit vs. React Query: Why not use Redux for everything?
- **Answer**: 
  - **Redux Toolkit** is designed for global application state (user preferences, themes, active session profiles).
  - **React Query** is designed for remote server state (cached data from database API endpoints).
  - *Why not Redux for everything*: Using Redux for API data requires writing hundreds of lines of boilerplate code (actions, reducers, thunks, loading states, error structures, caching logic, invalidation rules). React Query manages this out of the box (fetching, caching, deduplication, background validation, refetching on focus).
  - *Unified Rule*: Keep the Redux store small and focused only on UI state, while offloading 90% of asynchronous API data to React Query.

---

### 22. If you became Tech Lead tomorrow, what improvements would you introduce?
- **Answer**: 
  I would prioritize these engineering improvements:
  1. **CI/CD Quality Gates**: Enforce automated linting, TypeScript type audits (`tsc --noEmit`), unit tests coverage gates, and native build tests before allowing PR merges.
  2. **Automated Beta Distribution**: Configure Fastlane to build and deploy beta bundles to TestFlight and Google Play Console Internal tracks automatically on merges to `develop`.
  3. **Design System Integration**: Build a reusable, styled components library matching design specs to reduce duplicate UI code.
  4. **Performance Monitoring**: Set up Sentry Performance dashboards to track transaction speeds and list frame rates across releases.

---

## 👥 Section 6: Agile vs. Scrum Methodologies

Understanding the distinction between project frameworks and mindsets is essential for senior delivery roles:

- **Agile (The Mindset)**: A philosophy for software development based on iterative delivery, customer collaboration, continuous improvement, and responsiveness to change.
- **Scrum (The Framework)**: A structured implementation of Agile principles. It defines specific roles, events, and artifacts:
  - **Roles**:
    - *Product Owner (PO)*: Defines, refines, and prioritizes the Product Backlog.
    - *Scrum Master*: Facilitates sprint execution, removes team blockers, and ensures Scrum practices are followed.
    - *Development Team*: Multi-functional group building the increment.
  - **Events (Ceremonies)**:
    - *Sprint*: Time-boxed iteration (typically 2 weeks) to deliver a usable product increment.
    - *Sprint Planning*: Outlines backlog scope for the upcoming sprint.
    - *Daily Stand-up*: 15-minute sync to discuss daily tasks and identify blockers.
    - *Sprint Review*: Demonstrates completed sprint increments to stakeholders.
    - *Sprint Retrospective*: Analyzes process improvements for future sprints.
  - **Artifacts**:
    - *Product Backlog*: Master list of app requirements.
    - *Sprint Backlog*: Target backlog items selected for execution in the current sprint.
    - *Increment*: The cumulative sum of all backlog items completed during a sprint.

---

## ❓ Questions to Ask the Interviewers

At the end of senior technical interviews, asking strategic questions demonstrates leadership, system ownership, and domain interest:
1. *"How large is the React Native codebase, and are you planning or currently adopting the New Architecture (JSI/Fabric)?"*
2. *"What are the biggest performance bottlenecks or native bridge challenges the team is currently facing?"*
3. *"How are releases and CI/CD pipelines managed? Do you automate TestFlight and Play Store internal track delivery?"*
4. *"What is the testing coverage expectations for PR approvals? Is the team using Detox for E2E layouts checks?"*
5. *"What does technical success look like for this position in the first 90 days?"*


