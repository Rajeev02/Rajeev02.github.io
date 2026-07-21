# Volume 5 – Set 8 – iOS Fundamentals for React Native

## Question 1 — iOS App Lifecycle and Background Fetch

### Difficulty
Medium

### Concepts Being Tested
- iOS App Lifecycle (`AppDelegate`)
- Background Modes
- React Native AppState

---

### 1. Interview Question
"Your React Native app needs to fetch the latest news headlines in the background every few hours so the app opens instantly with fresh data. You tried using a JavaScript `setInterval`, but it stops working as soon as the app goes to the background. How do you correctly implement periodic background fetching on iOS?"

---

### 2. What the Interviewer is Evaluating
The interviewer wants to see if you understand iOS's extremely restrictive background execution policies and how to interface with `BGTaskScheduler` natively.

---

### 3. Ideal Answer
iOS aggressively freezes the JavaScript thread as soon as the app enters the background to save battery. `setInterval` will not work.

To fetch data in the background, we must use iOS's Native Background Fetch API (`BGTaskScheduler`). 
1. In Xcode, we enable the **"Background fetch"** capability in the Background Modes.
2. We configure the `Info.plist` with the `Permitted background task scheduler identifiers`.
3. In React Native, we use a library like `react-native-background-fetch`. This library registers a headless JS task that iOS will wake up periodically (based on the OS's machine learning of when the user typically opens the app).
4. The JS task fetches the news, saves it to a local DB (like MMKV or WatermelonDB), and **must** return a `UIBackgroundFetchResult.newData` signal to the OS within 30 seconds, otherwise iOS will terminate the app and penalize future background executions.

---

### 4. Code Example
```typescript
import BackgroundFetch from 'react-native-background-fetch';

// Must be registered outside of any React components (Headless Task)
const MyHeadlessTask = async (taskId: string) => {
  console.log('[BackgroundFetch] Task start: ', taskId);

  try {
    const news = await fetchNewsFromAPI();
    await localDatabase.save(news);
    
    // CRITICAL: You must signal completion to iOS
    BackgroundFetch.finish(taskId);
  } catch (error) {
    console.error('Fetch failed', error);
    BackgroundFetch.finish(taskId);
  }
};

// Register in index.js
BackgroundFetch.registerHeadlessTask(MyHeadlessTask);
```

---

### 5. Production Scenario
- **Root Cause:** A podcast app tried to download new episodes in the background using `fetch()` and `setTimeout`. 
- **Investigation:** Downloads failed at 90% completion. Apple's watchdog process was killing the app because it exceeded the 30-second background execution limit without requesting a background task assertion.
- **Solution:** Moved downloading to a proper Background Session natively (`URLSessionConfiguration.background`), passing control to the iOS daemon, which continues the download even if the app is force-quit.
- **Lessons Learned:** You cannot force iOS to do background work on your schedule. You must hand the task over to the OS.

---

### 6. Alternative Solutions & Trade-offs
- **Silent Push Notifications (Current standard for immediate updates)**
  - *Advantages:* The server decides when to wake the app up (e.g., "Breaking News").
  - *Disadvantages:* Requires backend infrastructure. Apple still throttles them if the user doesn't interact with the app often.
- **Background Fetch API**
  - *Advantages:* No backend push needed.
  - *Disadvantages:* Completely unpredictable. iOS might trigger it every 2 hours, or once a week, depending on battery and user habits.

---

### 7. Common Mistakes
- **Assuming exact intervals:** Developers often assume they can fetch data exactly every 15 minutes. iOS guarantees a *minimum* delay, but never an exact time.
- **Forgetting to call `finish()`:** If you don't tell the OS the task is done, iOS assumes your app is a battery hog and will silently ban it from ever running in the background again.

---

### 8. Follow-up Questions
1. What is a "Silent" Push Notification vs a Standard Push Notification?
2. How do you simulate a Background Fetch in the iOS Simulator? (Hint: Xcode Features Menu).
3. Why does Apple restrict background tasks so aggressively compared to Android?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will explain the architectural difference between **Background Fetch** and **Background Processing Tasks**. They will note that iOS 13 introduced `BGTaskScheduler`, which allows for heavy processing (like database cleanup) but *only* when the phone is plugged in and connected to Wi-Fi. They will emphasize that for true reliability on mobile, you should rely on an Offline-First architecture rather than fighting the OS for background time.

---

### 10. Interview Tips
Use the phrase "Handing the task over to the OS." It shows you respect the boundaries of mobile operating systems.

***

## Question 2 — iOS Build Systems: CocoaPods vs SPM

### Difficulty
Medium

### Concepts Being Tested
- iOS Dependency Management
- Podfile Configuration
- React Native Auto-linking

---

### 1. Interview Question
"In React Native, when we install a new NPM package that has native iOS code, we have to run `cd ios && pod install`. What exactly is CocoaPods doing during this step, and how does React Native's auto-linking feature work under the hood?"

---

### 2. What the Interviewer is Evaluating
Checking if you understand the iOS build pipeline. React Native devs who only know JavaScript usually fail when Xcode throws a "Framework not found" error.

---

### 3. Ideal Answer
When you run `pod install`, **CocoaPods** (the Ruby-based dependency manager for iOS) looks at your `Podfile`. 

In modern React Native, the `Podfile` contains a Ruby script provided by React Native called `use_react_native!`. This script executes **Auto-linking**.
1. Auto-linking scans your `node_modules` for any package containing a `.podspec` file.
2. It dynamically adds these Pods to your iOS project.
3. CocoaPods then downloads the native Objective-C/Swift source code (or pre-compiled frameworks) for those packages, creates an Xcode Workspace (`.xcworkspace`), and links them together so the React Native app can compile them.

If a package doesn't have a `.podspec`, CocoaPods ignores it, and the native code will not be included in the build, resulting in a runtime crash when JS tries to call it.

---

### 4. Code Example
```ruby
# ios/Podfile

target 'MyApp' do
  config = use_native_modules!

  # 1. This invokes the auto-linking script
  use_react_native!(
    :path => config[:reactNativePath],
    # 2. Enables the New Architecture (Fabric/JSI)
    :fabric_enabled => true
  )

  # Manual Pod override example
  pod 'Firebase/Crashlytics', '~> 10.0.0'
end
```

---

### 5. Production Scenario
- **Root Cause:** A developer updated `react-native-device-info` via NPM but forgot to run `pod install` on their CI/CD server.
- **Investigation:** The JS bundle expected a new method (`getMacAddress`), but the native iOS binary was still running the old Objective-C code. The app crashed on launch.
- **Solution:** Added a strict check in the CI/CD pipeline that runs `pod install --repo-update` before every Fastlane build.
- **Lessons Learned:** NPM manages JS; CocoaPods manages Native. They must be kept in sync manually (or via Expo Prebuild).

---

### 6. Alternative Solutions & Trade-offs
- **CocoaPods (Current RN Standard)**
  - *Advantages:* Massive ecosystem, deeply integrated into RN auto-linking.
  - *Disadvantages:* Written in Ruby (slow), relies on a centralized Master Repo that often breaks.
- **Swift Package Manager (SPM)**
  - *Advantages:* Native to Apple, integrated directly into Xcode, much faster.
  - *Disadvantages:* React Native auto-linking is heavily tied to CocoaPods, making SPM integration difficult for hybrid apps.

---

### 7. Common Mistakes
- **Opening the `.xcodeproj` instead of `.xcworkspace`:** If you open the raw project file in Xcode, none of the Pods will be linked, and the build will immediately fail with thousands of errors.
- **Committing the `Pods/` directory to Git:** This bloats the repository. You should only commit the `Podfile.lock`.

---

### 8. Follow-up Questions
1. What does `pod install --repo-update` do?
2. How do you fix the classic iOS error: "Undefined symbols for architecture arm64"?
3. What is the purpose of the `Podfile.lock`?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will explain how to debug Auto-linking failures. If a module fails to link, they will run `npx react-native config` to inspect the JSON output of what the CLI *thinks* is linked. They will also mention the industry shift towards **Expo Prebuild (Continuous Native Generation)**, which essentially eliminates the need to manually manage the `Podfile`, dynamically generating the `ios` folder on demand during the build process.

---

### 10. Interview Tips
Mention "Expo Prebuild / CNG (Continuous Native Generation)." It shows you are forward-thinking and looking to automate away DevOps pain.

***

## Question 3 — Permissions and the `Info.plist`

### Difficulty
Medium

### Concepts Being Tested
- iOS Privacy Security
- `Info.plist` Configuration
- App Store Review Guidelines

---

### 1. Interview Question
"You added a barcode scanner to your React Native app. The camera works perfectly on the Android emulator and the iOS simulator. However, when you install the app on a physical iPhone via TestFlight, the app crashes instantly the moment you navigate to the scanner screen. Why did it crash, and how do you fix it?"

---

### 2. What the Interviewer is Evaluating
Testing your knowledge of strict iOS Privacy requirements. iOS handles permissions very differently (and much more strictly) than Android.

---

### 3. Ideal Answer
The app crashed because it attempted to access a protected hardware feature (the Camera) without declaring a usage description in the **`Info.plist`** file. 

Unlike Android, where missing permissions just return a "denied" state, iOS is ruthless—if you call the Camera API without a declared privacy string, the OS instantly terminates the app with a `SIGABRT` crash to protect user privacy.

To fix this, I must open Xcode (or edit the `Info.plist` directly) and add the `NSCameraUsageDescription` key with a string value explaining *exactly* why the app needs the camera (e.g., "We need the camera to scan barcode receipts").

---

### 4. Code Example
```xml
<!-- ios/MyApp/Info.plist -->
<dict>
  ...
  <!-- CRITICAL: Without this, the app crashes on launch -->
  <key>NSCameraUsageDescription</key>
  <string>We need access to your camera to scan product barcodes for inventory management.</string>

  <!-- If saving the photo -->
  <key>NSPhotoLibraryAddUsageDescription</key>
  <string>We need permission to save the scanned barcode to your gallery.</string>
</dict>
```

---

### 5. Production Scenario
- **Root Cause:** A developer added the generic string "Camera access needed" to the `NSCameraUsageDescription`.
- **Investigation:** The app worked perfectly in TestFlight, but was **Rejected by Apple App Store Review**.
- **Solution:** Apple reviewers rejected the app because the description wasn't specific enough. We had to change the string to "Camera access is required to scan QR codes for login." resubmit, and wait 24 hours.
- **Lessons Learned:** The `Info.plist` isn't just for the compiler; it is read by Apple's human reviewers.

---

### 6. Alternative Solutions & Trade-offs
- **React Native CLI (Manual XML Editing)**
  - *Advantages:* Full control.
  - *Disadvantages:* Prone to merge conflicts, easy to forget when installing new libraries.
- **Expo Config Plugins (`app.json`)**
  - *Advantages:* You declare the permission in `app.json`, and Expo automatically injects it into the `Info.plist` during the build phase.
  - *Disadvantages:* Requires adopting the Expo build pipeline.

---

### 7. Common Mistakes
- **Testing cameras on the iOS Simulator:** The iOS simulator does not have a camera, so the app might not crash in the same way it does on a physical device.
- **Requesting tracking permission (ATT) incorrectly:** If you use analytics (like Firebase or Facebook SDK) and don't include `NSUserTrackingUsageDescription`, your app will be rejected.

---

### 8. Follow-up Questions
1. How do you handle a user who permanently denies the camera permission?
2. What is App Tracking Transparency (ATT) and when do you need it?
3. How do you open the iOS Settings app directly from React Native so the user can toggle a denied permission?

---

### 9. How a Senior/Lead Engineer Answers
A senior engineer will discuss the UX flow of permissions. They will mention that you should **never ask for permissions on app launch**. Instead, you should use an "Educational UI" (a pre-prompt screen) that explains why you need the camera *before* triggering the native OS prompt. Since the iOS native prompt can only be shown *once*, if the user denies it initially, you lose them forever. A pre-prompt ensures they only trigger the native prompt when they are ready to click "Accept."

---

### 10. Interview Tips
Mention the "Pre-prompt" or "Soft Prompt" pattern. Product Managers and Interviewers love developers who care about UX and conversion rates.

***

## Question 4 — iOS Certificates, Provisioning Profiles, and CI/CD

### Difficulty
Hard

### Concepts Being Tested
- Apple Developer Portal
- Code Signing
- Fastlane / CI/CD Automation

---

### 1. Interview Question
"You are trying to build an `.ipa` file to upload to TestFlight. Xcode throws the error: 'No matching provisioning profiles found'. Explain what a Provisioning Profile is, how it relates to Certificates, and how you would automate this painful process for a team of 10 developers."

---

### 2. What the Interviewer is Evaluating
Code signing is universally hated by mobile developers. A senior developer must know how to manage Apple's cryptography system and automate it so the rest of the team doesn't have to suffer.

---

### 3. Ideal Answer
Code signing in iOS requires three main components:
1. **The Certificate (Who you are):** A cryptographic key proving you are a verified Apple Developer.
2. **The App ID (What the app is):** The unique bundle identifier (e.g., `com.company.app`).
3. **The Provisioning Profile (The Glue):** A file generated by Apple that ties the Certificate, the App ID, and (for Ad-Hoc builds) a list of allowed device UDIDs together.

The error means Xcode cannot find a Profile that matches your current Certificate and App ID.

To solve this for a team of 10, manual management in Xcode is a disaster. I would implement **Fastlane Match**. 
Fastlane Match generates a single set of Certificates and Profiles, encrypts them, and stores them in a private Git repository. When any developer (or the CI/CD server) needs to build the app, they simply run `fastlane match development`, which pulls the encrypted certificates, decrypts them with a shared password, and installs them locally.

---

### 4. Code Example
```ruby
# fastlane/Matchfile

git_url("https://github.com/mycompany/ios-certificates")
storage_mode("git")
type("appstore") # development, adhoc, enterprise, or appstore
app_identifier(["com.mycompany.app"])
username("apple-developer@mycompany.com")
```
*No JS required, this is pure DevOps.*

---

### 5. Production Scenario
- **Root Cause:** The Lead iOS developer went on vacation. Their personal Apple Distribution Certificate expired.
- **Investigation:** The CI/CD pipeline (GitHub Actions) failed to deploy a critical hotfix to the App Store because it relied on the Lead's local certificate tied to their machine.
- **Solution:** Revoked all personal certificates. Migrated the entire organization to **Fastlane Match** using a dedicated "Bot" Apple ID. 
- **Lessons Learned:** Never tie production builds to an individual developer's machine or personal certificate.

---

### 6. Alternative Solutions & Trade-offs
- **Xcode Automatic Managing Signing**
  - *Advantages:* Easy for solo developers. Xcode handles it all.
  - *Disadvantages:* Terrible for teams. Xcode constantly revokes and regenerates certificates, causing chaos and broken builds on other developers' machines.
- **Fastlane Match (Current)**
  - *Advantages:* Single source of truth, CI/CD friendly, impossible to mess up.
  - *Disadvantages:* Requires setting up a private repo and managing encryption keys.

---

### 7. Common Mistakes
- **Revoking a Distribution Certificate blindly:** If you revoke an active Enterprise Distribution Certificate, all apps installed on employee devices worldwide will instantly stop opening.
- **Mixing Ad-Hoc and App Store profiles:** Trying to upload an Ad-Hoc build to App Store Connect will result in a rejection.

---

### 8. Follow-up Questions
1. What is the difference between a Development Certificate and a Distribution Certificate?
2. How does Expo EAS Handle iOS Code Signing?
3. What is a `.p12` file?

---

### 9. How a Senior/Lead Engineer Answers
A Staff Engineer will pivot to **Expo EAS Build**. They will explain that while Fastlane Match is the industry standard for bare React Native, Expo's EAS infrastructure completely abstracts this away. EAS securely stores the certificates in the cloud and manages the provisioning profiles automatically during remote builds. This allows developers on Windows or Linux to build iOS apps without ever touching Xcode or Fastlane.

---

### 10. Interview Tips
If asked about iOS deployment, immediately drop the words "Fastlane Match". It is the silver bullet for this topic.

***

## Question 5 — Building a Custom Swift Native Module (Expert)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- Swift / Objective-C bridging
- React Native Macros (`RCT_EXPORT_MODULE`)
- Promises across the Bridge

---

### 1. Interview Question
"You need to integrate a proprietary iOS-only SDK written in Swift. There is no React Native wrapper available. Explain the exact steps you would take to expose a Swift function `calculateTax(amount: Double)` to JavaScript so that it returns a Promise."

---

### 2. What the Interviewer is Evaluating
Testing your ability to break out of the JS sandbox. Senior React Native developers must be comfortable reading and writing native code when third-party libraries fall short.

---

### 3. Ideal Answer
To expose Swift to React Native (which uses an Objective-C runtime), we need to create three files:
1. **The Swift File (`TaxCalculator.swift`):** This contains the actual logic. We must annotate the class and methods with `@objc` so the React Native Objective-C bridge can see them.
2. **The Bridging Header (`MyApp-Bridging-Header.h`):** Xcode uses this to expose Objective-C headers to Swift.
3. **The Objective-C Bridge File (`TaxCalculator.m`):** This file uses React Native Macros (`RCT_EXTERN_MODULE` and `RCT_EXTERN_METHOD`) to register the Swift class with the JS engine.

To return a Promise, the Swift function signature must accept `RCTPromiseResolveBlock` and `RCTPromiseRejectBlock` as its final arguments.

---

### 4. Code Example
```swift
// 1. TaxCalculator.swift
import Foundation

@objc(TaxCalculator)
class TaxCalculator: NSObject {
  
  @objc
  func calculateTax(
    _ amount: Double,
    resolver resolve: @escaping RCTPromiseResolveBlock,
    rejecter reject: @escaping RCTPromiseRejectBlock
  ) {
    if amount < 0 {
      reject("INVALID_AMOUNT", "Amount cannot be negative", nil)
    } else {
      let tax = amount * 0.20
      resolve(tax)
    }
  }
  
  // Required for React Native Main Thread safety
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
```

```objc
// 2. TaxCalculator.m (The Objective-C Bridge)
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(TaxCalculator, NSObject)

RCT_EXTERN_METHOD(calculateTax:(double)amount
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
```

```typescript
// 3. Usage in JavaScript
import { NativeModules } from 'react-native';

const { TaxCalculator } = NativeModules;

const getTax = async () => {
  try {
    const tax = await TaxCalculator.calculateTax(100);
    console.log(tax); // 20
  } catch (error) {
    console.error(error);
  }
};
```

---

### 5. Production Scenario
- **Root Cause:** A client provided a secure biometric SDK that was only available as a compiled Swift `.framework` file.
- **Investigation:** We couldn't use standard npm packages.
- **Solution:** We imported the `.framework` into Xcode, wrote a custom Swift Native Module to wrap the SDK's initialization and verification methods, and exposed them as async Promises to React Native.
- **Lessons Learned:** Do not be afraid of Native code. It is often much more stable than relying on abandoned community npm wrappers.

---

### 6. Alternative Solutions & Trade-offs
- **Classic Native Modules (Current)**
  - *Advantages:* Huge amount of documentation, easy to implement Promises.
  - *Disadvantages:* Asynchronous, serialization overhead, requires Objective-C boilerplate for Swift.
- **JSI (TurboModules)**
  - *Advantages:* Synchronous, extremely fast.
  - *Disadvantages:* Requires writing C++ bridging code, incredibly steep learning curve for Swift integration.

---

### 7. Common Mistakes
- **Forgetting `@objc`:** If you forget to prefix your Swift class or method with `@objc`, the React Native macro in the `.m` file will fail to compile because it literally cannot see the Swift code.
- **Blocking the Main Thread:** If the Swift function does heavy calculation, it will block the iOS Main Thread by default unless you explicitly dispatch it to a background queue (`DispatchQueue.global().async { ... }`).

---

### 8. Follow-up Questions
1. What is the purpose of `requiresMainQueueSetup`?
2. How do you emit events from Swift to JavaScript (e.g., download progress)? (Hint: `RCTEventEmitter`).
3. Why does React Native use Objective-C macros instead of pure Swift?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will immediately mention **Expo Modules API**. They will explain that writing Objective-C macros (`RCT_EXTERN_METHOD`) is outdated. The modern standard is using the `expo-modules-core` API, which allows you to write 100% pure Swift (and Kotlin) using a beautiful, declarative DSL (Domain Specific Language) without touching a single line of Objective-C or C++, drastically reducing bugs and native onboarding time for JS developers.

---

### 10. Interview Tips
If asked to build a native module, mention the **Expo Modules API**. It is the future of React Native native integrations and shows you are deeply embedded in the modern RN ecosystem.
