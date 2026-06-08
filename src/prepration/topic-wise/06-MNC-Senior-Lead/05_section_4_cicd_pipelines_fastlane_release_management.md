## 📦 Section 4: CI/CD Pipelines, Fastlane & Release Management

*⏱️ 2 min read*

In large MNC teams, manual app compilation is unacceptable. Automated deployment guarantees reproducibility and consistency.

#### 1. Fastlane Match & Provisioning Profile Automation

Managing iOS certificate files and provisioning profiles across multiple developers and build agents frequently causes build failures.

- **Fastlane Match**: Implements a Git-based code signing strategy:
  - All developer and distribution certificates, along with their matching provisioning profiles, are encrypted using a symmetric passphrase and stored in a private Git repository.
  - During local or CI/CD builds, Fastlane clones this repository, decrypts the certificates, and installs them directly onto the build machine.
  - Prevents provisioning profile mismatches, duplicate certificate creations, and ensures Xcode builds execute successfully.

---

#### 2. Over-the-Air (OTA) Updates Rollback & Versioning Strategy

OTA updates allow immediate JS-only updates without App Store reviews. However, they carry significant runtime crash risks if managed poorly. Do not position Microsoft App Center CodePush as the default managed service for new projects because the App Center service has been retired. Prefer Expo/EAS Updates for Expo/CNG stacks, or a self-hosted/New-Architecture-compatible OTA provider for bare React Native.

- **The Gold Rules of OTA Versioning**:
  - **Target Binary Locking**: Every OTA bundle must target specific native binary versions (e.g., `~1.4.0` or `1.4.x`). Never target open ranges if native dependencies are updated.
  - **Checking Native Signatures**: If an update changes a native module binding (e.g. adding a new native library), you must bump the binary version. If an old binary downloads the new JS bundle, it will crash immediately due to missing native selectors.
- **Rollback Orchestration**:
  - Configure the updater client to track app start health. If the app crashes twice within 2 minutes of applying an OTA bundle, the updater client must roll back to the stable local embedded bundle immediately.

---

#### 3. Managing App Store Rejections & Play Store Compliance

Tech Leads must navigate compliance requirements to avoid release delays:

- **App Store Rejections (Apple Guidelines)**:
  - *Guideline 2.1 (Performance)*: Ensure Apple reviewers can log in (provide valid mock credentials) and that the app runs without placeholder data or network timeouts.
  - *Guideline 4.8 (Sign in with Apple)*: If the app implements third-party social logins (Google, Facebook), you **must** also provide Apple Sign-In as an equivalent option.
  - *Guideline 5.1.1 (Privacy)*: Declare all background permissions clearly in the `Info.plist` (e.g., Location, Camera) and request usage authorization prompt messages.
- **Play Store Compliance (Google Policies)**:
  - *Target SDK Updates*: Android requires apps to target recent Android API versions. Ensure `compileSdkVersion` and `targetSdkVersion` are updated annually.
  - *Google Play Billing*: Paid features must route through Google Billing APIs rather than external payment portals.

---


---
