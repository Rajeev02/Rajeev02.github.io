# Volume 13 – Set 29 – App Store Deployment (iOS & Android)

## 1. What is the difference between an APK and an AAB in Android?

**Concept:**
When building for Android, the standard format used to be the APK. Google now enforces the AAB format for the Play Store.

**Answer:**
1. **APK (Android Package Kit):** A standalone, fully compiled application archive. It contains all the compiled code, resources, and native libraries for every single CPU architecture (ARM, x86). Because it contains everything, the file size is massive. If you send an APK to a friend, they can install it directly on their device (Sideloading).
2. **AAB (Android App Bundle):** This is a publishing format, not an installable format. You cannot install an AAB directly on a phone. When you upload an AAB to the Google Play Store, Google's servers use it to generate highly optimized, device-specific APKs. If a user downloads your app on an ARM device with a high-density screen, Google generates and sends a tiny APK containing *only* the ARM native libraries and high-res images, completely omitting the x86 and low-res assets.

**Key Takeaway:**
AABs drastically reduce the download size of your app for end-users by offloading the final binary generation to the Google Play servers.

---

## 2. Explain the iOS App Store Review Process and common rejection reasons.

**Concept:**
Apple is notorious for strictly enforcing their Human Interface Guidelines and business rules.

**Answer:**
When you submit an `.ipa` to App Store Connect, it goes through automated static analysis, and then a manual review by an Apple employee.

**Common Rejection Reasons:**
1. **In-App Purchases (IAP) Evasion:** If your app sells digital goods (like an eBook or a Premium Subscription) but uses Stripe or PayPal instead of Apple's native IAP system, you will be rejected. Apple demands their 30% cut for digital goods. (Physical goods like Uber rides or physical clothes are exempt and *must* use Stripe/etc.).
2. **Missing Permissions Context:** If your app requests Camera access, the `NSCameraUsageDescription` string in your `Info.plist` must explicitly explain *why*. \"App needs camera\" will be rejected. \"App needs camera so you can take a profile picture\" is required.
3. **Beta/Test Content:** If your app has \"Test\" or \"Beta\" in the title or UI, or contains placeholder text (Lorem Ipsum), it will be rejected.
4. **Web Wrappers:** If your app is just a Webview loading a website without any native mobile features (Push Notifications, Camera, GPS), Apple rejects it for lacking \"Minimum Functionality.\"

**Key Takeaway:**
Understanding the difference between Digital (IAP required) and Physical (Stripe required) goods is the most crucial part of passing Apple review for e-commerce apps.

---

## 3. How do you handle App Versioning? (Version Code vs Version Name)

**Concept:**
Every app has two version numbers. One is for the user, and one is for the App Store.

**Answer:**
1. **Version Name (String):** This is the semantic version the user sees (e.g., `1.0.5`). It usually follows `MAJOR.MINOR.PATCH`.
2. **Version Code / Build Number (Integer):** This is an internal, strictly increasing integer used by the OS and App Stores to determine which binary is newer. 

**The Rule:**
You can have multiple builds with the same Version Name (`1.0.5`), but each build uploaded to TestFlight or the Play Store must have a higher Version Code than the last (e.g., Build `42`, then Build `43`).

**Automation:**
In Fastlane, you use the `increment_build_number` action to automatically bump this integer on every CI run, ensuring you never get a \"Binary already exists\" error when uploading to TestFlight.

**Key Takeaway:**
The App Store only cares that the integer Build Number increases; the semantic Version Name is purely cosmetic for the marketing release.

---

## 4. What is App Thinning (Bitcode) in iOS?

**Concept:**
Similar to Android App Bundles, Apple has mechanisms to reduce the app size downloaded by the user.

**Answer:**
App Thinning is the process where the App Store creates tailored versions of your app for specific devices.

1. **Slicing:** Just like Android AABs, Apple strips out 3x image assets if the user is downloading the app on a 2x screen device (like an older iPhone).
2. **Bitcode (Deprecated but historically relevant):** Bitcode was an intermediate compiled representation of your iOS app. Instead of uploading the final machine code, you uploaded Bitcode. This allowed Apple to re-compile your app on their servers to take advantage of new CPU architectures (like the transition from Intel to Apple Silicon) without requiring you to submit a new update. 
*(Note: Apple officially deprecated Bitcode in Xcode 14, as modern compilers made the size/performance tradeoffs negligible).*

**Key Takeaway:**
Always upload vector assets (PDFs) or the full set of 1x/2x/3x assets and let the App Store servers handle the Slicing to reduce the download size for end-users.

---

## 5. How do you implement Feature Flags to decouple Deployments from Releases?

**Concept:**
Waiting 48 hours for an App Store review means you cannot coordinate a massive feature launch on a specific date reliably.

**Answer:**
You decouple the **Deployment** (submitting the binary to Apple) from the **Release** (the user seeing the feature).

**How it works:**
1. You build the new feature (e.g., a new UI redesign) and hide it behind a Feature Flag (e.g., `if (flags.showNewRedesign) { return <NewUI /> } else { return <OldUI /> }`).
2. You submit the app to Apple a week early. Apple reviews and approves it. The code is completely dormant.
3. The app is live on the App Store, users download it, but they still see the Old UI because the flag on your backend is set to `false`.
4. On Launch Day, at exactly 10:00 AM, you flip the switch on your backend server (e.g., LaunchDarkly, Firebase Remote Config).
5. The apps instantly fetch the new flag value, and the New UI appears for millions of users simultaneously.

**Key Takeaway:**
Feature Flags eliminate the stress of App Store review times, allow for A/B testing, and provide an instant \"kill switch\" if the new feature causes crashes, bypassing the need to wait 48 hours for an emergency hotfix review.
