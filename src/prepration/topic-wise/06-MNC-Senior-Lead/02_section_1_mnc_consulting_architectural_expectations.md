
## Page Summary
### Reading Time
`8 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Section 1: MNC & Consulting Architectural Expectations |
| Difficulty | Senior / Lead |
| Interview Frequency | High |
| Tags | 👨💼 Lead Round Favorite |

---


## 🏗️ Section 1: MNC & Consulting Architectural Expectations

*⏱️ 6 min read*

MNC client architectures require robust separation of concerns, scalability, and long-term maintainability. Senior and Lead developers must design architectures that can scale across large teams and multi-year product cycles.

#### 0. Mandatory Skills Coverage Matrix

Use this matrix to align answers with common Senior React Native JD keywords without sounding like you are reading a checklist.

| Skill Area | Must Mention | Interview Positioning |
| :--- | :--- | :--- |
| **Mandatory Mobile Stack** | React Native, Android, Redux Toolkit | "I can own cross-platform RN delivery while debugging native Android issues and designing predictable RTK state flows." |
| **Core App Layer** | TypeScript/JavaScript, React Navigation, Redux/RTK or Zustand, React Query/TanStack Query | "I separate server state from client state: React Query for remote cache, RTK/Zustand for app state, React Navigation for guarded flows and deep links." |
| **Interaction Layer** | RN Reanimated, RN Gesture Handler | "I keep gestures and animations on the UI thread using shared values, worklets, and gesture composition." |
| **Build & Runtime** | Hermes, Metro bundler, Gradle, CocoaPods | "I understand JS bundling, Hermes bytecode, Android build variants/signing, and iOS pod/linking issues." |
| **Native Tooling** | Android Studio, Xcode, Kotlin, Swift | "I can write light native modules, inspect native crashes, manage permissions, and profile platform-specific performance." |
| **Testing & Quality** | Jest, React Native Testing Library, Detox/Appium, ESLint, Prettier, Husky | "I cover business logic, component behavior, device flows, and enforce code quality before CI." |
| **CI/CD & Release** | Fastlane, CodePush/App Center maintenance, GitHub Actions, Bitrise, Azure DevOps, Play Console, App Store Connect | "I can automate signing, build distribution, staged rollout, OTA risk controls, and store release operations." |
| **Analytics & Observability** | Firebase/GA4, Segment, Amplitude, Sentry/Crashlytics, Datadog | "I separate product analytics, crash diagnostics, RUM/APM, and event routing based on team and compliance needs." |

#### 1. Clean Architecture & SOLID Principles in React Native

Applying **Clean Architecture** to React Native ensures that business logic is completely decoupled from the UI framework, styling libraries, and state management frameworks:

```text
[UI Components (Views)] ➡️ [React Hooks (Presenters)] ➡️ [Use Cases (Domain)] ➡️ [Repositories / Adapters (Data)]
       |                           |                                                  |
(Styles, Native Components)  (Local State/Zustand/RTK)                         (Axios, Apollo, MMKV)
```

- **Domain Layer (Core)**: Contains pure business entities and use cases. This layer should have zero dependencies on React, React Native, or third-party storage/networking APIs. It defines interface contracts (interfaces) for data fetching.
- **Data Layer (Infrastructure)**: Implements repository interfaces defined by the Domain layer. Handles remote API calls (Axios, Apollo Client), local storage operations (MMKV, SQLite), and caching.
- **Presentation Layer (UI)**: Contains React components, styling (StyleSheet, Tailwind), and local state hooks. It calls Domain use cases to execute business logic.

##### Applying SOLID Principles:
- **Single Responsibility Principle (SRP)**: Split screens into presenting views (UI-only components) and state containers (custom hooks containing data fetching and form control logic).
- **Open/Closed Principle (OCP)**: Design components to accept styles, custom action renderers, or configurations as props instead of hardcoding platform or feature checks directly inside components.
- **Liskov Substitution Principle (LSP)**: Ensure custom wrapper components (e.g. `CustomTextInput`) extend and maintain the native properties interface of React Native's `<TextInput>` without breaking behavior.
- **Interface Segregation Principle (ISP)**: Create small, focused typescript interfaces for components and API models instead of passing large global user objects to components that only require a user name.
- **Dependency Inversion Principle (DIP)**: Use Dependency Injection (DI). UI components depend on abstract hooks or domain interfaces rather than importing concrete API client singletons directly.

---

#### 2. Monorepos vs. Multirepos (Yarn, pnpm, Nx) for Large Teams

When coordinating development across multiple sister applications (e.g., customer, partner, agent apps) in large MNC projects, choosing a repository model is a critical decision.

| Model / Feature | Yarn/pnpm Workspaces Monorepo | Nx/Turborepo Monorepo | Multirepos (Separate Git Repos) |
| :--- | :--- | :--- | :--- |
| **Best For** | Medium teams sharing basic TS interfaces & UI elements. | Enterprise-grade multi-app systems with shared native modules. | Siloed teams with completely independent release cycles. |
| **Code Reuse** | High. Shared local folders with workspace symlinks. | Extreme. Enforces strict dependency mapping rules. | Low. Requires publishing private npm packages. |
| **CI/CD Build caching** | Basic. Rebuilds everything unless custom scripts exist. | Advanced. Invalidate cache based on code hashes. | Separate builds. No cross-repo cache sharing. |
| **Dependency Lock** | Single Lockfile. Keeps packages on identical versions. | Single lockfile or workspace scoping options. | Multiple lockfiles. Version drift is common. |

##### Architectural Lead Strategy:
For large-scale teams (50+ engineers), configure **Nx Monorepos** with **pnpm**:
- Enforce boundaries using Nx module tags (e.g., `app:customer` cannot import from `app:agent` directly).
- Use dynamic path mapping in `tsconfig.json` to prevent relative import paths (e.g., import from `@shared/ui` instead of `../../shared/ui`).
- Implement independent version tagging inside packages to decouple deployment cycles while maintaining single-source code storage.

---

#### 3. Legacy Migration & Upgrades (e.g., v0.60 to Modern RN)

Tech Leads are frequently tasked with resolving technical debt by migrating legacy apps or executing major version upgrades.

##### A. Upgrading Legacy React Native (e.g., v0.63 to a modern target):
1. **Analyze Dependencies**: Run audits to check compatibility of third-party native libraries with the target React Native version, Hermes, Fabric, TurboModules, and Codegen.
2. **Utilize React Native Upgrade Helper**: Generate code diffs for native files (`AndroidManifest.xml`, `AppDelegate.mm`, `build.gradle`, `Podfile`) using the community upgrade tool.
3. **Execute Upgrade Steps in Controlled Hops**: Do not jump blindly from a very old RN version to the latest target in one PR. Move through stable checkpoints, update native templates, run both platform builds, and validate the app after each hop.
4. **Hermes & New Architecture Migration**:
   - Hermes is the normal engine expectation in modern RN; verify bytecode builds and Hermes-specific debugging/profiling.
   - Migrate native entry points to modern AppDelegate/ReactHost patterns used by the target template.
   - Enforce TurboModules/Fabric compatibility. Replace or isolate libraries that only work on the legacy architecture when the target app is moving to New Architecture.
5. **Modern RN Target Checks**:
   - Use the Node.js version required by the target React Native template.
   - Update Jest config from `preset: 'react-native'` to `preset: '@react-native/jest-preset'`.
   - Replace removed `StyleSheet.absoluteFillObject` usage with `StyleSheet.absoluteFill` or an explicit absolute-positioning style object.

##### B. Migration Planning Checklist: Legacy RN to Modern RN
Use this answer when an interviewer asks, *"What steps will you follow before migrating a legacy React Native app to a modern app?"*

1. **Discovery & Risk Mapping**:
   - Identify current RN version, native template age, package manager, Node version, Gradle/AGP/Kotlin versions, Xcode/CocoaPods versions, and CI setup.
   - List all native dependencies and custom modules. Mark each as business-critical, replaceable, New-Architecture-ready, or legacy-only.
   - Capture baseline metrics: startup time, bundle size, memory usage, crash-free sessions, ANR rate, slow screens, and release build time.
2. **Business Scope & Release Strategy**:
   - Decide whether the migration is only a framework upgrade or also includes navigation, state, storage, design system, and native SDK changes.
   - Avoid mixing a large feature launch with the architecture migration. Keep the migration branch behaviorally equivalent wherever possible.
   - Define rollback strategy: store release rollback, feature flags, OTA eligibility, and beta-track validation.
3. **Test & Observability Preparation**:
   - Add smoke tests for app launch, login, navigation, payments, push notification handling, deep links, offline sync, and logout.
   - Ensure Sentry/Crashlytics source maps, dSYMs, ProGuard mapping files, and breadcrumbs are uploaded correctly.
   - Add performance checks for startup, large lists, key animations, and memory leaks.
4. **Dependency Upgrade Path**:
   - Upgrade React Native in controlled hops using Upgrade Helper.
   - Upgrade React, React Navigation, Reanimated, Gesture Handler, Screens, Safe Area, MMKV/SQLite, push, analytics, and payment SDKs according to compatibility.
   - Replace abandoned libraries before enabling New Architecture.
5. **Native Template Migration**:
   - Update Android Gradle files, Kotlin configuration, MainApplication/MainActivity, package registration, permissions, ProGuard/R8 rules, and build variants.
   - Update iOS AppDelegate, Podfile, privacy manifests/permissions, entitlements, deployment target, Swift/Objective-C bridging files, and build settings.
6. **Hermes & New Architecture Rollout**:
   - Enable or verify Hermes first; test release bytecode, source maps, and crash symbolication.
   - Enable New Architecture in an internal build; fix Fabric rendering issues, TurboModule specs, event emitters, and Codegen contracts.
   - Keep legacy modules temporarily if they are low-frequency and stable, but migrate performance-sensitive native modules to typed TurboModules/JSI.
7. **Production Rollout**:
   - Release to internal QA, then beta tracks, then a small production percentage.
   - Monitor crash-free sessions, ANRs, startup time, memory, screen load time, API failure rates, and app-store reviews.
   - Remove old bridge shims, deprecated APIs, and unused native configs only after the rollout is stable.

##### C. Migrating Native Android/iOS to React Native:
- **Phase 1: Hybrid Integration (Sub-views)**: Rather than rewriting the entire app, integrate React Native as a single fragment/controller inside the native application. Load the `ReactRootView` inside an Android Activity or iOS UIViewController.
- **Phase 2: Data Bridge Synchronization**: Synchronize authentication states, database registries, and configurations between the native container and React Native JS context using custom bridge events.
- **Phase 3: Incremental Screen Replaces**: Replace legacy screens one-by-one based on feature updates. Once the container navigation is fully replaced by React Navigation, remove native routing files completely.

---


---
