# Volume 6 – Set 10 – React Native Tooling & Expo

## Question 1 — Expo vs React Native CLI

### Difficulty
Medium

### Concepts Being Tested
- Ecosystem Architecture
- Bare Workflow vs Managed Workflow
- Native Code Access

---

### 1. Interview Question
"Your team is starting a new React Native project. Half the team wants to use the traditional React Native CLI because 'Expo is for beginners and you can't use custom native modules'. How would you address this argument, and what architecture would you recommend for an enterprise application in 2026?"

---

### 2. What the Interviewer is Evaluating
The interviewer wants to see if your knowledge of Expo is outdated. Historically, Expo was indeed limited, but the modern Expo ecosystem (EAS, Prebuild) is the industry standard.

---

### 3. Ideal Answer
I would respectfully tell the team that their argument is based on outdated information. 

In the past, the **Expo Managed Workflow** prevented you from adding custom native modules (Swift/Kotlin). If you needed a proprietary SDK, you had to "eject" to the **Bare Workflow** (React Native CLI).

However, modern Expo uses **Continuous Native Generation (CNG)** and **Expo Prebuild**. 
Today, we can use the **Expo framework** for an enterprise app and still add any custom native code we want by writing an **Expo Config Plugin**. Expo Prebuild dynamically generates the `android` and `ios` folders on demand, injecting our custom native code into the Gradle/Podfile configurations. This gives us the extreme power of native development combined with the automated upgrades and CI/CD simplicity of Expo.

---

### 4. Code Example
"No code required. This is an architectural decision."

---

### 5. Production Scenario
- **Root Cause:** A startup used React Native CLI. Every time they upgraded RN versions (e.g., 0.70 to 0.71), it took a developer two weeks of manual conflict resolution in `AppDelegate.mm` and `build.gradle`.
- **Investigation:** The `ios` and `android` folders had become massive "snowflakes"—heavily mutated and impossible to maintain.
- **Solution:** Migrated the project to Expo. Deleted the `ios` and `android` folders from Git entirely. Relied on `npx expo prebuild` to generate clean native folders purely from the `app.json` configuration. Upgrade times dropped from weeks to hours.
- **Lessons Learned:** Do not treat your native folders as source code; treat them as build artifacts.

---

### 6. Alternative Solutions & Trade-offs
- **React Native CLI (Legacy)**
  - *Advantages:* You have literal folders you can open in Xcode/Android Studio immediately. Good for teams where 80% of the work is in Java/Swift.
  - *Disadvantages:* Horrible upgrade path, manual code signing, fragmentation.
- **Expo CNG (Current Standard)**
  - *Advantages:* Ephemeral native folders, incredibly easy upgrades, EAS build infrastructure.
  - *Disadvantages:* You must learn how to write Config Plugins if a library doesn't support Expo out of the box.

---

### 7. Common Mistakes
- **Ejecting:** Junior developers still think "Ejecting" is a normal workflow. Expo actually deprecated the `expo eject` command years ago. You should never eject; you just run `prebuild`.
- **Committing native folders to Git in Expo:** If you are using CNG, you should add `/ios` and `/android` to your `.gitignore`.

---

### 8. Follow-up Questions
1. What does `npx expo prebuild` actually do?
2. Why is upgrading React Native without Expo so difficult?
3. How does Expo Router differ from React Navigation?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will mention that React Native itself explicitly recommends Expo in its official documentation as the standard way to start a new project. They will emphasize that building a mobile app requires massive DevOps infrastructure (Fastlane, Match, TestFlight APIs). By choosing Expo, you aren't just choosing a JS framework; you are getting **EAS (Expo Application Services)**, which instantly solves code signing, cloud builds, and OTA updates for the entire organization.

---

### 10. Interview Tips
Be very firm about this: "Expo is no longer for beginners. It is the enterprise standard."

***

## Question 2 — Over-The-Air (OTA) Updates & EAS

### Difficulty
Medium

### Concepts Being Tested
- App Store Guidelines
- OTA Mechanics
- Expo Application Services (EAS Update / CodePush)

---

### 1. Interview Question
"You deployed a critical hotfix to your production React Native app using an Over-The-Air (OTA) update. The next day, Apple rejects your app update, citing a violation of App Store guidelines regarding dynamic code loading. Why did they reject it, and what are the strict rules for using OTA updates in React Native?"

---

### 2. What the Interviewer is Evaluating
Checking if you understand the limits of JS bundling and Apple's strict App Store Review Guidelines regarding executing downloaded code.

---

### 3. Ideal Answer
OTA updates (like EAS Update or Microsoft CodePush) allow us to push a new JavaScript bundle and assets to users instantly, bypassing the 2-day App Store review process.

However, Apple strictly regulates this. They rejected the app because an OTA update **fundamentally changed the primary purpose or UI of the app**. 

The strict rules for OTA updates are:
1. **No Native Changes:** You cannot push updates that require changes to Java, Swift, `AndroidManifest.xml`, or `Info.plist`.
2. **No Feature Changes:** You cannot use OTA to introduce entirely new features, change the core UI drastically, or bypass Apple's In-App Purchase rules.
3. **Only Bug Fixes & Minor Tweaks:** OTA is strictly for fixing JS logic bugs, updating copy/translations, or making minor UI tweaks. 

If the hotfix radically changed the app's behavior, Apple detected the dynamic code execution and banned it.

---

### 4. Code Example
```json
// app.json (EAS Update Configuration)
{
  "expo": {
    "updates": {
      "url": "https://u.expo.dev/YOUR-PROJECT-ID",
      "fallbackToCacheTimeout": 0 // Forces app to load fast, checks for updates in background
    },
    "runtimeVersion": {
      "policy": "appVersion"
    }
  }
}
```

---

### 5. Production Scenario
- **Root Cause:** A marketing team wanted to launch a completely new "Crypto Trading" tab in the app on a specific date. To ensure all users got it instantly, developers pushed it via OTA.
- **Investigation:** A few days later, the standard App Store binary update was rejected. Apple flagged the OTA bundle as attempting to hide features from the review team.
- **Solution:** Disabled the OTA update, disabled the crypto tab, resubmitted the binary, and waited for approval.
- **Lessons Learned:** Never use OTA to bypass Apple's feature review.

---

### 6. Alternative Solutions & Trade-offs
- **Binary App Store Updates**
  - *Advantages:* 100% compliant, allows native code changes.
  - *Disadvantages:* Slow (1-3 days for approval), users have to manually go to the App Store to update.
- **OTA Updates (EAS / CodePush)**
  - *Advantages:* Instant bug fixes, perfect for A/B testing copy.
  - *Disadvantages:* High risk if misused; only updates JS code.

---

### 7. Common Mistakes
- **Changing Native Modules and pushing OTA:** If you add `react-native-camera` to your package.json and push an OTA update, the app will instantly crash for all users because the native iOS/Android camera binaries do not exist on their phones.
- **Forgetting `runtimeVersion`:** If the OTA system doesn't strictly match the Native App Version, a V2 JS bundle might accidentally download onto a V1 Native app, causing a fatal crash.

---

### 8. Follow-up Questions
1. How does the app know an OTA update is available?
2. What happens if the user opens the app while the OTA update is still downloading?
3. What is the difference between EAS Update and Microsoft CodePush?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will discuss **Rollback Strategies and Release Channels**. They will explain that pushing an OTA directly to `production` is reckless. They will architect a CI/CD pipeline where every PR generates a unique OTA bundle tied to a specific `preview` channel. Only after QA tests the specific preview bundle is it promoted to `staging`, and finally promoted to `production`. If a crash spike is detected in Sentry, the CI/CD pipeline automatically issues a rollback command to EAS.

---

### 10. Interview Tips
If asked about OTA, always mention the caveat: "Only for JS and Asset changes. Never for Native changes."

***

## Question 3 — Writing Custom Expo Config Plugins

### Difficulty
Hard

### Concepts Being Tested
- AST (Abstract Syntax Trees)
- XML/Regex Parsing
- Continuous Native Generation (CNG)

---

### 1. Interview Question
"You are using the Expo Managed Workflow (CNG). You need to integrate a third-party SDK that requires you to add a custom `<meta-data>` tag inside the Android `AndroidManifest.xml` and modify a specific line in `AppDelegate.mm`. Since you don't commit the `ios` or `android` folders to Git, how do you inject this code?"

---

### 2. What the Interviewer is Evaluating
This tests if you truly understand how modern Expo works under the hood. Config Plugins are the bridge between JavaScript developers and Native build configurations.

---

### 3. Ideal Answer
Since the `ios` and `android` folders are generated ephemerally, any manual changes to them will be overwritten on the next `npx expo prebuild`. 

To solve this, I must write an **Expo Config Plugin**.
A Config Plugin is a JavaScript function that hooks into Expo's prebuild lifecycle. 
1. For the `AndroidManifest.xml`, I would use the built-in `withAndroidManifest` hook. Expo passes the parsed XML to my function as a JSON object, I inject the `<meta-data>` tag into the object, and return it. Expo handles rewriting the XML file.
2. For `AppDelegate.mm`, I would use `withAppDelegate`. Since this is a raw C++ file, Expo passes it to my function as a pure string. I would use Regex to find the `didFinishLaunchingWithOptions` function and inject the required initialization code before returning the modified string.

---

### 4. Code Example
```javascript
// my-custom-plugin.js
const { withAndroidManifest, withAppDelegate } = require('@expo/config-plugins');

const withMyCustomSDK = (config, apiKey) => {
  // 1. Modify Android Manifest
  config = withAndroidManifest(config, (config) => {
    const mainApplication = config.modResults.manifest.application[0];
    
    mainApplication['meta-data'].push({
      $: {
        'android:name': 'com.mysdk.API_KEY',
        'android:value': apiKey,
      },
    });
    return config;
  });

  // 2. Modify iOS AppDelegate
  config = withAppDelegate(config, (config) => {
    const appDelegate = config.modResults.contents;
    // Regex to inject before the return statement
    const newAppDelegate = appDelegate.replace(
      'return YES;',
      `[MySDK initializeWithKey:@"${apiKey}"];\n  return YES;`
    );
    config.modResults.contents = newAppDelegate;
    return config;
  });

  return config;
};

module.exports = withMyCustomSDK;
```

---

### 5. Production Scenario
- **Root Cause:** A company migrated to Expo. They used a niche Bluetooth SDK that didn't have an official Expo plugin. Developers manually edited the `AndroidManifest.xml`.
- **Investigation:** The CI/CD pipeline failed because the cloud build server ran `prebuild`, wiping out the manual edits, causing the Bluetooth SDK to crash on launch due to missing permissions.
- **Solution:** Wrote a local Config Plugin that dynamically injected the `BLUETOOTH_CONNECT` permissions and `Service` declarations during the CI/CD build phase.
- **Lessons Learned:** In a CNG environment, configuration must be scripted, never hardcoded.

---

### 6. Alternative Solutions & Trade-offs
- **Patch-Package**
  - *Advantages:* Quick and dirty way to modify `node_modules`.
  - *Disadvantages:* Fails completely for Expo's native folders because they are generated *after* `patch-package` runs.
- **Config Plugins (Current)**
  - *Advantages:* Robust, reusable, can be published to NPM for others to use.
  - *Disadvantages:* Requires writing brittle Regex for modifying raw `.swift` or `.java` files.

---

### 7. Common Mistakes
- **Using String Replacement blindly:** If you replace `return YES;` in AppDelegate, but another plugin already modified it to `return [super application...];`, your plugin will fail. You must use robust Regex or AST (Abstract Syntax Tree) parsing.
- **Not testing idempotency:** A config plugin must be idempotent. If you run `prebuild` twice, the plugin shouldn't inject the code twice.

---

### 8. Follow-up Questions
1. What is an AST (Abstract Syntax Tree) and how does it help modifying native files?
2. What is the difference between `withDangerousMod` and standard hooks?
3. Where do you register a Config Plugin in an Expo project? (Hint: `app.json`).

---

### 9. How a Senior/Lead Engineer Answers
A Principal engineer will discuss the fragility of modifying `.java` and `.swift` files via Regex. They will strongly advocate against using `withAppDelegate` unless absolutely necessary. Instead, they will suggest writing a custom Native Expo Module using the **Expo Modules API**. The new API has lifecycle hooks (like `onStartObserving` or `ApplicationLifecycle`) that allow you to execute native initialization code entirely inside your own Swift/Kotlin files, bypassing the need to hack the main `AppDelegate` via Regex entirely.

---

### 10. Interview Tips
If asked about modifying Native code in Expo, explicitly say: "I would use a Config Plugin, specifically `withAndroidManifest` or `withInfoPlist`."

***

## Question 4 — Debugging with Hermes and Flipper

### Difficulty
Hard

### Concepts Being Tested
- JS Engine Internals
- Chrome DevTools Protocol
- Profiling memory/CPU

---

### 1. Interview Question
"A React Native app using the Hermes engine is dropping frames when navigating between screens. You can't reproduce it on the iOS Simulator, only on cheap Android devices. How do you systematically debug and profile the JS thread to find the exact function causing the lag?"

---

### 2. What the Interviewer is Evaluating
Testing if you know how to move beyond `console.log()` and use professional profiling tools to debug real-world performance issues.

---

### 3. Ideal Answer
Since the issue only happens on cheap physical devices, we must profile on the actual device. 

Because we are using **Hermes**, we cannot rely on the old React Native "Debug in Chrome" feature (which swapped the device's JS engine for Chrome's V8 engine, hiding device-specific bugs).

Instead, I would use **Flipper** (or Chrome DevTools directly connecting to the Hermes inspector).
1. Connect the cheap Android device via USB and start the app in Debug mode.
2. Open Flipper and attach the **Hermes Debugger**.
3. Go to the **Profiler** tab and click "Start Profiling".
4. Perform the navigation that causes the lag.
5. Stop profiling. Hermes will generate a Flame Chart (Trace).
6. I will inspect the Flame Chart looking for wide, flat blocks on the JS thread. These indicate long, synchronous functions. Once I identify the exact function name in the trace taking 200ms+, I know where to optimize the code (e.g., using `InteractionManager` or moving heavy parsing off the main thread).

---

### 4. Code Example
"No code required. This is a tooling and profiling question."

---

### 5. Production Scenario
- **Root Cause:** A developer used a massive `moment.js` locale file that was lazily required exactly when the user navigated to the "Calendar" screen.
- **Investigation:** Navigating to the Calendar screen took 2 seconds on a physical device, but was instant on the simulator.
- **Solution:** A Hermes trace showed `require('./moment-locale-fr.js')` taking 1500ms to parse synchronously. We swapped `moment` for `date-fns` and pre-loaded the required locales on a background thread.
- **Lessons Learned:** Real devices parse JS 10x slower than simulators. Always profile on physical hardware.

---

### 6. Alternative Solutions & Trade-offs
- **React DevTools Profiler**
  - *Advantages:* Great for finding *which* component re-rendered.
  - *Disadvantages:* Only tracks React render times, not pure JS execution (like heavy loops or Redux parsing).
- **Hermes Profiler (Current)**
  - *Advantages:* Shows every single function call on the JS thread.
  - *Disadvantages:* The flame chart can be incredibly dense and difficult to read for beginners.

---

### 7. Common Mistakes
- **Using "Debug in Chrome":** In RN < 0.70, hitting "Debug" ran your code in Chrome's V8 engine instead of the phone's Hermes engine. Chrome is so powerful it easily masks performance bugs that would crash a real phone.
- **Profiling in Development Mode:** You should profile in a release/production build whenever possible, as DEV mode includes massive overhead for warnings and source mapping.

---

### 8. Follow-up Questions
1. What is a Flame Chart?
2. How does Hermes handle Garbage Collection compared to V8?
3. What is the difference between CPU profiling and Memory profiling?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will emphasize **Production Profiling**. They will explain that if the bug only happens in production, they will instruct the app to generate a `.cpuprofile` trace file directly on the user's device using `react-native-performance` or custom native bridging, upload that trace file silently to an S3 bucket or Sentry, and then pull it down to analyze it locally in Chrome DevTools. 

---

### 10. Interview Tips
If asked about performance, immediately ask: "Is this happening in DEV or Release mode?" This proves you know that DEV mode performance is fundamentally untrustworthy.

***

## Question 5 — CI/CD, Fastlane, and Code Signing (Expert)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- DevOps
- Fastlane
- Store Releases

---

### 1. Interview Question
"You joined a team where releasing a new version of the app to the App Store and Play Store requires a developer to manually generate keys, open Xcode and Android Studio, click 'Archive', wait 30 minutes, and manually upload files to the portals. This results in broken builds and lost keys. Architect a fully automated CI/CD pipeline from PR merge to Store submission."

---

### 2. What the Interviewer is Evaluating
This tests your DevOps mastery. A Principal/Staff Mobile Engineer must know how to automate away the most painful part of mobile development: the deployment pipeline.

---

### 3. Ideal Answer
I would architect a CI/CD pipeline using **GitHub Actions (or Bitrise)** combined with **Fastlane** and **Fastlane Match**.

**1. The Infrastructure (Fastlane Match):**
First, I would revoke all personal certificates. I would use `fastlane match` to generate a single enterprise distribution certificate and provisioning profile, encrypt them, and store them in a private Git repo.

**2. The Android Pipeline (Fastlane):**
- **Build:** GitHub Action runs `gradlew bundleRelease` to generate an `.aab` file.
- **Signing:** Securely injects the Keystore file and password via GitHub Secrets.
- **Deploy:** Fastlane uses the `supply` action (Google Play Developer API) to automatically upload the `.aab` to the Internal Testing track and update the release notes.

**3. The iOS Pipeline (Fastlane):**
- **Signing:** GitHub Action runs `fastlane match appstore --readonly` to pull the encrypted certificates.
- **Build:** Fastlane uses `gym` (`xcodebuild`) to compile the `.ipa`.
- **Deploy:** Fastlane uses `pilot` (App Store Connect API) to automatically upload the `.ipa` to TestFlight and distribute it to internal testers.

**4. Trigger:**
This pipeline is strictly triggered when a PR is merged into the `main` branch and tagged with a release version (`v1.2.0`).

---

### 4. Code Example
```ruby
# fastlane/Fastfile

default_platform(:ios)

platform :ios do
  desc "Push a new beta build to TestFlight"
  lane :beta do
    # 1. Fetch Certificates securely
    match(type: "appstore", readonly: true)
    
    # 2. Increment Build Number automatically
    increment_build_number(build_number: ENV["GITHUB_RUN_NUMBER"])
    
    # 3. Build the app
    gym(
      workspace: "MyApp.xcworkspace",
      scheme: "MyApp",
      export_method: "app-store"
    )
    
    # 4. Upload to TestFlight
    pilot(skip_waiting_for_build_processing: true)
    
    # 5. Notify Slack
    slack(message: "Successfully uploaded iOS to TestFlight! 🚀")
  end
end
```

---

### 5. Production Scenario
- **Root Cause:** A junior developer archived the app in Xcode on their machine, but their machine had an outdated version of Node.js and a stale CocoaPods cache.
- **Investigation:** The uploaded App Store binary contained an old JS bundle that crashed on launch. Millions of users were affected.
- **Solution:** Revoked all manual developer access to App Store Connect. Forced 100% of releases to go through the remote CI/CD pipeline, ensuring a pristine, isolated, and highly reproducible build environment.
- **Lessons Learned:** Humans should never build production binaries.

---

### 6. Alternative Solutions & Trade-offs
- **Expo EAS Build**
  - *Advantages:* Replaces Fastlane entirely. Managed cloud infrastructure specifically designed for React Native. Zero local setup required.
  - *Disadvantages:* Costs money for high-tier concurrency; less customizable than raw Fastlane if you have complex native mono-repo setups.
- **Fastlane + GitHub Actions (Current)**
  - *Advantages:* Ultimate flexibility, completely free if self-hosting runners.
  - *Disadvantages:* Managing Mac OS runners on GitHub Actions is slow and expensive; high maintenance for Fastlane Ruby scripts.

---

### 7. Common Mistakes
- **Storing Keystores in plaintext:** Committing your Android `.keystore` or iOS `.p12` password in plain text in the repo.
- **Failing to increment build numbers:** Apple will reject any binary uploaded to TestFlight that shares a build number with a previous upload. The CI must auto-increment this.

---

### 8. Follow-up Questions
1. What is an App Store Connect API Key, and why is it better than a username/password?
2. How do you handle environment variables (e.g., `.env.production`) in a CI pipeline?
3. Why is an `.aab` better than an `.apk`?

---

### 9. How a Senior/Lead Engineer Answers
A true Architect will advocate for **Expo EAS Build**. Even if the app is bare React Native CLI, EAS Build is structurally superior to raw Fastlane. They will explain that maintaining Mac OS infrastructure, Xcode version updates, and Ruby dependencies for Fastlane is a full-time DevOps job. EAS abstracts the OS, the signing, and the compilation into a single command (`eas build --platform ios --profile production`), allowing the team to focus entirely on product features rather than fixing broken CI pipelines every time Apple updates macOS.

---

### 10. Interview Tips
Say "Humans should never build production binaries." It is a golden rule of DevOps.
