# React Native: CI/CD Pipelines

## 1. What is CI/CD?
**Question:** Explain CI and CD in the context of a React Native app.

**Answer:**
- **Continuous Integration (CI):** Automating the process of linting, type-checking (TypeScript), running unit tests (Jest), and building the app every time code is pushed to a repository.
- **Continuous Deployment/Delivery (CD):** Automating the distribution of the app to QA testers (via App Center / TestFlight / Firebase App Distribution) and eventually to production (App Store / Google Play).

## 2. Fastlane
**Question:** What is Fastlane and why is it essential for Mobile CI/CD?

**Answer:**
Fastlane is an open-source tool written in Ruby that automates tedious mobile development tasks.
With a `Fastfile`, you can script commands to:
- Automatically increment build numbers.
- Generate and manage Provisioning Profiles & Certificates (`fastlane match`).
- Capture automated screenshots for the app store.
- Build the `.ipa` or `.aab`.
- Upload directly to TestFlight or Google Play Console.

## 3. GitHub Actions / Bitrise Workflow
**Question:** Can you describe a standard CI/CD workflow for a React Native App?

**Answer:**
1. **Push to `main` branch:** Triggers the pipeline.
2. **Setup:** Install Node, Ruby, and Java SDKs.
3. **Install Dependencies:** `npm install` & `pod install`.
4. **Code Quality:** Run `npm run lint` and `npm run test`.
5. **Build Android:** Run Gradle commands or Fastlane lane to build `.aab`.
6. **Build iOS:** Run Xcodebuild or Fastlane lane to build `.ipa`.
7. **Deploy:** Upload binaries to App Center (for QA) or App Store / Play Store tracks.

## 4. CodePush (Over The Air Updates)
**Question:** What is CodePush and how does it work?

**Answer:**
App Center CodePush allows you to push updates to users instantly without going through the App Store / Google Play review process.
It works by downloading a new JavaScript bundle and asset files `index.android.bundle` in the background and replacing the old ones.
*Limitation:* It cannot be used if you update native code (Java/Swift) or add new native modules. You must do a full store release for native changes.

## 5. Handling iOS Certificates
**Question:** Code signing on iOS is notoriously difficult in CI. How do you handle it?

**Answer:**
The industry standard is **Fastlane Match**. It creates all required certificates and provisioning profiles and stores them in a private Git repository or cloud storage. During the CI pipeline, Fastlane downloads these certificates and installs them in the CI runner's keychain automatically, ensuring a deterministic and error-free signing process.
