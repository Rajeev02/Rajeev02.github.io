## 📦 Section 8: Deployment Pipelines & Store Releases

*⏱️ 1 min read*

#### 1. iOS App Store Release Management
- **iOS Target Upgrades**: Set the minimum iOS target (e.g. iOS 15.0) inside both the Podfile and Xcode build settings.
- **Certificates & Provisioning**:
  - **Development Certificate**: Used to sign apps for local testing.
  - **Distribution Certificate**: Used to sign apps for TestFlight and App Store submission.
  - **Provisioning Profile**: Links your developer certificate and App ID to authorize runs.
- **Fastlane Automation**:
  Use Fastlane to build and upload your app to TestFlight automatically:
  ```bash
  fastlane gym --scheme "ProductionApp" --export_method "app-store"
  fastlane pilot upload_to_testflight
  ```
- **Privacy Manifests (`PrivacyInfo.xcprivacy`)**:
  Declare all SDKs (Sentry, Firebase) and APIs that track user data inside Xcode's Privacy Manifest to pass App Store review.

---

#### 2. Android Play Store Release Management
- **Compile & Target SDK**:
  Set target SDK versions inside `android/app/build.gradle`:
  ```groovy
  android {
      compileSdkVersion 34
      defaultConfig {
          targetSdkVersion 34
      }
  }
  ```
- **Signing Keys (Keystore)**:
  Sign your production build using a secure keystore file configured in `gradle.properties`:
  ```properties
  MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
  MYAPP_RELEASE_KEY_ALIAS=my-key-alias
  ```
- **Google Play Release Tracks**:
  - **Internal Sharing**: Share builds instantly with testers without Google review.
  - **Closed / Open Testing**: Release builds to beta testers. Requires a short review time.
  - **Production Track**: Release the app to the general public. Use progressive rollouts (e.g. 5% ➡️ 20% ➡️ 100%) to monitor crash rates on Sentry before reaching all users.

---
