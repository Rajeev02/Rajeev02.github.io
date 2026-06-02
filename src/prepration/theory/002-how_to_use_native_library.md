This is another foundational question that IBM interviewers use to separate high-level JavaScript developers from **true Mobile Engineers**. Since you have a strong background as a Native Android Developer, this is an absolute sweet spot for you to shine.

To answer this comprehensively for a senior-level round, you must address **both** the classic way (the Traditional Bridge) and the modern way (the New Architecture / TurboModules).

Here is how you should structure your answer:

---

## 1. The Short Answer (The Blueprint)

> "To use a native library in React Native, we use **Native Modules**. If the library already provides a React Native wrapper via npm, we can simply install it and use auto-linking. However, if we need to integrate a custom or third-party native SDK (Java/Kotlin for Android, Objective-C/Swift for iOS), we write a bridge wrapper. In the old architecture, this is done via the `Bridge` using `RCTBridgeModule` and `ReactContextBaseJavaModule`. In the New Architecture, we write **TurboModules** using TypeScript/Flow specifications and **Codegen** to generate the C++ JSI layer."

---

## 2. Breaking Down the Two Approaches

### Approach A: The Modern Way (TurboModules - New Architecture)

IBM will be highly impressed if you lead with this, as it shows you are up-to-date with modern React Native standards. TurboModules leverage the **JavaScript Interface (JSI)** for direct, synchronous C++ communication, avoiding the asynchronous JSON bridge.

1. **Define the Specification (TypeScript/Flow):** You write a strongly typed interface using TypeScript that defines the methods your native module will expose. This file _must_ be named matching a specific pattern (e.g., `SpecMyNativeLibrary.ts`).
2. **Run Codegen:** React Native’s **Codegen** tool reads this TypeScript specification and automatically generates the strict C++ scaffolding and native abstract classes for both iOS and Android.
3. **Implement the Native Code:**

- **Android (Java/Kotlin):** You extend the generated Java/Kotlin abstract class and implement your custom logic.
- **iOS (Objective-C++/Swift):** You implement the generated protocol in your iOS codebase.

4. **Register and Export:** You register the module with the React Native runtime, and you can now import and call these native functions synchronously in JavaScript.

### Approach B: The Classic Way (The Traditional Bridge)

Because thousands of enterprise applications still rely on the old architecture, you must demonstrate you know how the legacy bridge works.

- **On Android (Java/Kotlin):**

1. Create a class that extends `ReactContextBaseJavaModule`.
2. Override the `getName()` method to return a string (this is the name used in JS).
3. Annotate the native methods you want to expose to JavaScript with `@ReactMethod`.
4. Create a `ReactPackage` class to register your module, and add this package to your `MainApplication.java`'s list of packages.

- **On iOS (Objective-C/Swift):**

1. Create a class that conforms to the `RCTBridgeModule` protocol.
2. Use the macro `RCT_EXPORT_MODULE()` to export the class.
3. Use the macro `RCT_EXPORT_METHOD()` to expose specific methods to JavaScript.
4. _(If using Swift)_: You need a bridging header and must use the `@objc` attribute to expose Swift methods to the Objective-C runtime that React Native interfaces with.

---

## 3. How Data Flows Between Native and JS

The interviewer might ask: _"How do you pass data back and forth?"_ \* **Arguments:** You can pass basic types across the boundary (Strings, Numbers, Booleans, Arrays, and Maps/Objects).

- **Callbacks:** Used for asynchronous native tasks where JavaScript passes a function that Native executes once when done.
- **Promises:** The preferred modern pattern. On Android, you use the `Promise` object argument; on iOS, you pass `RCTPromiseResolveBlock` and `RCTPromiseRejectBlock`.
- **Events (DeviceEventEmitter / RCTDeviceEventEmitter):** If Native needs to send data to JS unsolicited (e.g., a continuous sensor update or geolocation ping), it broadcasts an event that JS listens to.

---

## 🎯 Pro-Tip for the Interview (Injecting Your Experience)

Tie it directly back to your resume to prove you’ve done this in production:

> "In my previous roles, such as at LetsVenture, while most third-party SDKs like Razorpay or Cashfree come with wrappers , I frequently had to handle native integrations. Having a background in native Android development made debugging CocoaPods configuration issues, handling Android Gradle dependency conflicts, or configuring native manifest permissions second nature to me."

---

What is the next question from your first round? Let’s keep this momentum going!
