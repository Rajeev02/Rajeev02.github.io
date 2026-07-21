# Volume 13 – Set 27 – Over-The-Air (OTA) Updates & CodePush

## 1. What are Over-The-Air (OTA) Updates and how are they possible in React Native?

**Concept:**
When you fix a bug in a native iOS/Android app, you must compile a new binary, submit it to Apple/Google for review (which can take days), and hope users download the update.

**Answer:**
OTA Updates allow you to bypass the App Store review process and deliver bug fixes or new features to users instantly.

This is possible because React Native apps are split into two parts:
1. The **Native Binary** (compiled Java/Objective-C code).
2. The **JavaScript Bundle** (your React code) and assets (images).

When the app is compiled, the JS Bundle is embedded inside the binary. However, OTA tools (like Microsoft CodePush or Expo Updates) modify the app to check a remote server on launch. If a newer JS Bundle exists on the server, the app downloads it, caches it, and reloads the JS engine using the new bundle instead of the embedded one.

**Key Takeaway:**
OTA updates only work for changes made entirely in JavaScript or Assets. They cannot update Native Code.

---

## 2. When are OTA Updates NOT allowed?

**Concept:**
Apple and Google have strict guidelines on what can and cannot be updated dynamically to prevent malware injection.

**Answer:**
You **cannot** use an OTA update if:
1. **You changed Native Code:** If you added a new native library (e.g., you installed `react-native-camera` and ran `pod install`), you must release a new binary through the App Store. The old native binary cannot execute the new native Java/Swift code.
2. **You changed the App's Primary Purpose:** Apple strictly forbids using OTA updates to change the fundamental purpose of the app (e.g., turning a calculator app into a gambling app after it passes review).
3. **You changed Permissions:** If your update now requires Microphone access but the original app didn't, you must go through the App Store.

**Key Takeaway:**
OTA updates are strictly for JS bug fixes, UI tweaks, and A/B testing. Any native layer changes require a full App Store submission.

---

## 3. How does Microsoft CodePush manage rollbacks?

**Concept:**
If you push a broken JS bundle via OTA, it will crash the app for every user instantly upon download.

**Answer:**
CodePush has a built-in safety mechanism called **Automatic Rollbacks**.

1. When the app downloads and installs a new CodePush update, it requires the developer's JS code to explicitly call `codePush.notifyAppReady()` upon a successful mount.
2. If the new JS bundle contains a fatal syntax error or crashes *before* `notifyAppReady()` is called, the app closes.
3. On the next launch, the CodePush SDK detects that the previous update crashed. It instantly deletes the broken bundle, rolls back to the previous stable JS bundle, and reports the failure to the CodePush server.

**Key Takeaway:**
Always ensure `notifyAppReady` is called only when you are absolutely certain the core React tree has mounted successfully, otherwise you risk locking users into a crash loop.

---

## 4. What are the deployment strategies for OTA Updates?

**Concept:**
Downloading a 5MB JS bundle over a 3G network takes time. How you handle the download affects UX.

**Answer:**
There are three main strategies when configuring OTA updates:
1. **Immediate (For Critical Hotfixes):** The app checks for an update on launch. If found, a full-screen blocking modal appears (\"Downloading Update...\"). Once finished, the app forcibly restarts. *Highly disruptive, use only for critical bugs.*
2. **Next Restart (The Standard):** The app boots using the current bundle. In the background, it silently downloads the new bundle. The next time the user organically closes and reopens the app, it uses the new bundle. *Zero disruption.*
3. **On Resume:** The app downloads the update in the background. If the user minimizes the app for more than X minutes and resumes it, the app silently restarts and applies the update.

**Key Takeaway:**
Never use Immediate blocking updates for minor UI tweaks. Save them for critical payment or security bugs to avoid frustrating users.

---

## 5. What is Expo EAS Update and how does it compare to CodePush?

**Concept:**
CodePush has been the industry standard for years, but Expo has built a modern competitor deeply integrated into their ecosystem.

**Answer:**
**EAS Update** is Expo's hosted OTA service.
- **CodePush:** Maintained by Microsoft (App Center). It is free but has seen slower development lately. It requires manual native linking if not using Expo.
- **EAS Update:** Deeply integrated into the Expo ecosystem (EAS Build/Submit). It supports concept like **Channels** and **Branches** perfectly mapped to Git branches (e.g., pushing to the `staging` git branch automatically triggers an EAS Update to the `preview` app channel).

**Key Differences:**
EAS Update is built specifically to handle Expo's robust asset pipeline (images, fonts), ensuring that if you add a new image in JS, EAS Update correctly serves that image OTA. CodePush sometimes struggles with complex asset linking.

**Key Takeaway:**
If you are using Expo (even Expo Bare Workflow), EAS Update is the vastly superior choice due to seamless CI/CD integration. If you are on an older, purely React Native CLI project, CodePush is the standard fallback.
