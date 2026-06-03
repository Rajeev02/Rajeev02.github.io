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
