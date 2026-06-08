
## Page Summary
### Reading Time
`4 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Section 20: Senior / Lead / Architect Scenarios |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 🏗️ Section 20: Senior / Lead / Architect Scenarios

*⏱️ 3 min read*

#### 1. Design a Scalable React Native Architecture for 5M+ Users
**Scenario**: You are the lead architect for a fintech app scaling to millions of users. What is your architectural blueprint?
- **Monorepo**: Use Nx or Turborepo to share code (types, utils, design system) between the RN app, Web app, and Backend services.
- **Micro-frontends**: If the app has 50+ engineers across multiple domains (e.g., Payments, Crypto, Trading), use **Re.Pack (Webpack Module Federation)**. This allows the Payments team to deploy their bundle independently from the Crypto team without full App Store releases.
- **State Management**: Use Zustand for local UI state, RTK Query / React Query for server state caching, and MMKV for persistent key-value storage.
- **Design System**: Build a strict UI library using Restyle or NativeWind. No hardcoded hex colors or inline padding.
- **Observability**: Sentry for crashes, Datadog for APM/RUM, and Segment for routing product analytics.

#### 2. Reduce App Startup Time from 4s to 1.5s
**Scenario**: Our app takes 4 seconds to reach TTI (Time to Interactive). Fix it.
- **Phase 1: Engine & Bundler**: Enable Hermes (Bytecode AOT compilation). Enable inline requires in Metro to defer evaluating JS modules until they are actually used.
- **Phase 2: Native Modules**: Convert eagerly loaded legacy Native Modules to TurboModules so they load lazily.
- **Phase 3: Component Rendering**: Ensure the initial screen is extremely lightweight. Use a splash screen while deferring heavy computations (like loading large Redux stores or hydrating AsyncStorage) using `InteractionManager.runAfterInteractions()`.
- **Phase 4: Network**: Parallelize the initial API calls natively before the JS bundle even finishes parsing, passing the pre-fetched data across the bridge via initial props.

#### 3. Debugging Memory Leaks in Production
**Scenario**: The app crashes after 20 minutes of usage due to Out Of Memory (OOM) errors.
- **Identify**: Look at Sentry OOM reports. Check Android Studio Memory Profiler for an ever-increasing memory graph.
- **Root Causes**:
  - **Unbound Listeners**: `AppState.addEventListener` or Redux `store.subscribe` not being cleaned up in `useEffect` returns.
  - **Closures retaining large objects**: A heavy base64 string or large array captured inside a persistent closure.
  - **FlatList/FlashList misconfiguration**: Rendering thousands of complex components without `removeClippedSubviews` or `windowSize` optimizations.
- **Fix**: Take heap snapshots before and after navigating back and forth between screens. Use the comparison tool in Hermes Debugger to find "Detached Views" or detached DOM nodes.

#### 4. Design an Offline-First Application
**Scenario**: Build a field-worker app that operates with zero network connectivity for days.
- **Local Database**: Use WatermelonDB or SQLite, as they run asynchronously and do not block the JS thread (unlike large AsyncStorage blobs).
- **Architecture**: 
  - The UI reads exclusively from the local database (single source of truth).
  - The Sync Engine (using background workers via WorkManager/BGTaskScheduler) monitors network connectivity.
- **Conflict Resolution**: Implement a CRDT (Conflict-free Replicated Data Type) or a Timestamp-based Last-Write-Wins strategy to merge server state with local state when the device comes back online.

#### 5. Handle a Crash Spike After a Production Release
**Scenario**: You rolled out v2.4, and crash rates spiked from 0.1% to 4%. Walk through your incident response.
1. **Acknowledge & Halt**: Immediately halt the phased rollout on Play Store/App Store.
2. **Triage via Sentry**: Identify the exact stack trace. Is it a JS crash or a Native crash? Which devices/OS versions are affected?
3. **OTA Rollback**: If it's a JS-only logic bug, push an emergency Over-The-Air (OTA) update via CodePush or EAS Update to instantly revert the JS bundle on users' devices.
4. **Hotfix Release**: If it's a native code crash (e.g., a broken Gradle dependency), check out the release branch, fix the native bug, bump the build number, and submit for an expedited review to the App Stores.
5. **Post-Mortem**: Write a blameless RCA (Root Cause Analysis). Add a regression test (E2E Detox test) to prevent this specific failure in the future.

#### 6. Design an Instagram/WhatsApp-like Architecture
**Scenario**: Design a media-heavy social feed and real-time chat.
- **Feed**: Use Shopify `FlashList` for memory recycling. Use `react-native-fast-image` (or Expo Image) for aggressive disk/memory caching of images. Pre-fetch images natively just before they scroll into view.
- **Video**: Use a native video player wrapper. Only auto-play the video strictly in the center of the viewport (calculate via ViewabilityConfig). Pause all others.
- **Chat**: Use WebSockets (Socket.io) for real-time delivery. Use SQLite to persist messages instantly for offline viewing. Use MMKV for fast read/write of read-receipts.


---


---
