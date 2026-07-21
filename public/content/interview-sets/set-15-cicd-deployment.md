# Volume 8 – Set 15 – CI/CD & App Deployment

## 1. How do you automate the build and deployment process for a React Native app?

**Concept:**
Manually building `.ipa` and `.aab` files on a developer's laptop using Xcode and Android Studio is prone to environment errors, missing certificates, and takes away valuable development time.

**Answer:**
I automate the entire pipeline using CI/CD platforms like **Bitrise**, **GitHub Actions**, or **AppCenter**, integrated with **Fastlane**.

A typical pipeline looks like this:
1. **Pull Request Trigger**: When a PR is opened, the CI runs `eslint`, `tsc` (TypeScript checks), and `jest` unit tests. If any fail, the PR is blocked.
2. **Merge Trigger**: When merged to `main`, the CI triggers Fastlane.
3. **Fastlane iOS**:
   - `match`: Automatically pulls provisioning profiles and certificates from a secure repo.
   - `gym`: Builds and archives the `.ipa`.
   - `pilot`: Uploads the `.ipa` to TestFlight.
4. **Fastlane Android**:
   - Compiles the `.aab` (Android App Bundle).
   - `supply`: Uploads the `.aab` to the Google Play Console internal testing track.
5. **Notifications**: Sends a Slack message to the QA team with the release notes and download links.

**Key Takeaway:**
Fastlane is the industry standard for mobile automation because it abstracts away the complex command-line arguments of `xcodebuild` and `gradlew`.

---

## 2. What is Over-The-Air (OTA) updating and how does it work in React Native?

**Concept:**
Mobile app updates usually require submitting a new binary to the App Store/Play Store and waiting for review (which can take days) and for users to download it.

**Answer:**
React Native architecture consists of a Native App binary and a JavaScript Bundle (`main.jsbundle`). 
Over-The-Air (OTA) updates allow you to bypass the App Store review process by pushing a new version of the *JavaScript Bundle* and assets directly to the user's device. 

I implement OTA using **EAS Update** (Expo) or **CodePush** (Microsoft AppCenter).
1. When the app launches, it checks the CodePush server for a newer bundle.
2. If available, it downloads it silently in the background.
3. On the next app restart, it loads the new bundle, instantly patching UI bugs or adding minor features.

**Limitations:**
OTA updates can *only* update JS and images. If you add a new native dependency (e.g., `react-native-camera`), you modify native iOS/Android code. This requires a full binary update through the App Stores.

**Key Takeaway:**
OTA is a life-saver for critical hotfixes in production, but it must be used carefully to ensure the new JS bundle is strictly compatible with the native binary version currently on the user's device.

---

## 3. Explain the difference between Debug, Release, and Staging build variants.

**Concept:**
Apps need different configurations depending on who is using them. Developers need debugging tools, QA needs access to staging servers, and users need highly optimized production builds.

**Answer:**
I manage this using **Build Variants** (Android Product Flavors) and **Build Configurations** (iOS Xcode Schemes).

1. **Debug Build**:
   - JS runs locally from the Metro Bundler.
   - Hot Reloading / Fast Refresh is enabled.
   - Unminified code. Slowest performance.
   - API endpoints point to `localhost` or dev servers.
2. **Staging/QA Build**:
   - JS is bundled (not connected to Metro).
   - Minified code, production-level performance.
   - Uses a distinct Bundle ID (e.g., `com.app.staging`) so it can be installed alongside the prod app on the same phone.
   - API points to Staging servers.
3. **Release/Production Build**:
   - Fully optimized, stripped of debug symbols.
   - Obfuscated using ProGuard (Android).
   - Points to Production APIs.

**Key Takeaway:**
Using libraries like `react-native-config`, I inject different environment variables (API Keys, URLs) at compile time based on the selected scheme, ensuring staging keys never accidentally leak into the production binary.

---

## 4. How do you handle App Signing and Provisioning Profiles securely in a team?

**Concept:**
To install an iOS app on a real device or upload it to the App Store, Apple requires cryptographic certificates and provisioning profiles. Managing these manually across a team of 10 developers is a nightmare.

**Answer:**
I solve this using **Fastlane Match**. 

Instead of developers manually generating certificates in the Apple Developer Portal and sharing them via email, Fastlane Match centralizes them.
1. Match generates a single set of certificates and profiles.
2. It encrypts them and stores them in a private Git repository (or Google Cloud/S3).
3. When a new developer joins, they simply run `fastlane match development`. It asks for the repository decryption password, clones the certs, and installs them directly into their local MacOS Keychain.
4. The CI/CD server runs the exact same command to pull the Production certificates to sign the release build.

**Key Takeaway:**
Fastlane Match guarantees that the entire team and the CI server share exactly one unified set of certificates, completely eliminating the dreaded \"Code Signing Error\" in Xcode.

---

## 5. What are the store guidelines regarding OTA updates and what risks do they carry?

**Concept:**
Apple and Google have strict guidelines to protect users from malicious code changes post-install.

**Answer:**
Apple's App Store Review Guidelines explicitly allow OTA updates for JavaScript/HTML/CSS, *provided that* the update does not fundamentally change the primary purpose of the application. 

**Risks & Best Practices:**
1. **Bait and Switch**: If you submit a calculator app to bypass review, and then push an OTA update that turns it into a gambling app, Apple will ban your developer account.
2. **Version Mismatch**: If an OTA update relies on a native module method that only exists in v2.0 of the binary, but the OTA is pushed to users on v1.0, the app will hard crash. 
   - *Mitigation*: CodePush requires you to target specific binary versions (e.g., only apply this OTA to users running `1.2.x`).
3. **Rollbacks**: If a bad OTA is pushed and causes crashes on launch, the user is trapped because the app crashes before it can check for a fix. 
   - *Mitigation*: CodePush has a built-in rollback mechanism. If the app crashes repeatedly immediately after an OTA update, the CodePush SDK detects this and automatically rolls back to the previous stable bundle.
