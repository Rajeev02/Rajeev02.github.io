# Volume 5 – Set 5 – Android Fundamentals for React Native

## Question 1 — The Android Activity Lifecycle

### Difficulty
Medium

### Concepts Being Tested
- Android OS Lifecycle
- Memory Management
- AppState in React Native

---

### 1. Interview Question
"A user is filling out a long form in your React Native app. They receive a phone call, answer it, and talk for 10 minutes. When they return to your app, it restarts from the splash screen and all their form data is gone. Explain what happened at the Android OS level and how to prevent it."

---

### 2. What the Interviewer is Evaluating
The interviewer wants to see if you understand how Android manages memory. Mobile development isn't just about React; the OS heavily dictates how your app behaves.

---

### 3. Ideal Answer
When the user answered the phone call, the React Native app was pushed to the background. At the Android OS level, the `Activity` went from `onResume()` -> `onPause()` -> `onStop()`. 

Because they talked for 10 minutes, Android needed memory for the phone app and other background processes. The OS aggressively killed our app's process to free up RAM (a process known as **Tombstoning**). When the user returned, Android cold-started the app (`onCreate()`), causing all local JS state to be wiped out.

To prevent this data loss, we must listen to the `AppState` API in React Native. When the app transitions to `background` or `inactive`, we must immediately save the form data to persistent storage (like MMKV or AsyncStorage) or a local SQLite database, and then re-hydrate the form from storage on the next boot.

---

### 4. Code Example
```typescript
import { AppState, AppStateStatus } from 'react-native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const FormScreen = () => {
  const [formData, setFormData] = useState(() => {
    // 3. Re-hydrate on cold start
    const saved = storage.getString('form_draft');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // 1. Detect backgrounding
      if (nextAppState === 'background') {
        // 2. Persist synchronously
        storage.set('form_draft', JSON.stringify(formData));
      }
    });

    return () => subscription.remove();
  }, [formData]); // Must depend on formData to save the latest state

  return <Form data={formData} onChange={setFormData} />;
};
```

---

### 5. Production Scenario
- **Root Cause:** A banking app required users to switch to an Authenticator app to copy an OTP. 
- **Investigation:** On budget Android phones with low RAM (2GB), switching to the Authenticator caused the OS to instantly kill the banking app. Returning to the banking app restarted the login flow, making it literally impossible to log in.
- **Solution:** Saved the login session state to secure storage on `AppState.background`. 
- **Lessons Learned:** Never assume your app will stay alive in the background on Android.

---

### 6. Alternative Solutions & Trade-offs
- **Redux Persist**
  - *Advantages:* Automatically persists the entire global state without manual `AppState` listeners.
  - *Disadvantages:* Can be slow if persisting massive state objects, causing UI blocking.
- **Manual AppState + MMKV (Current)**
  - *Advantages:* Synchronous, blazing fast, targets only the necessary data.
  - *Disadvantages:* Requires manual implementation per screen.

---

### 7. Common Mistakes
- **Using `AsyncStorage` to save on background:** `AsyncStorage` is asynchronous. The OS might kill the JS thread *before* the async write finishes, resulting in lost data. MMKV is synchronous and much safer here.
- **Not testing on low-end devices:** Developers testing on 16GB RAM Android emulators never experience OS-level app killing.

---

### 8. Follow-up Questions
1. What is the difference between `onPause` and `onStop` in Android?
2. How do you simulate Android killing your app in the background using ADB?
3. What happens to the JS thread when the app goes into the background?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will mention **Android's `SavedInstanceState`**. While `AppState` in JS is good, a true senior will explain that Native Android has a built-in mechanism `onSaveInstanceState` bundle to survive process death. They will mention libraries like `react-native-mmkv` which use C++ JSI for synchronous writes, ensuring the data is flushed to the disk instantaneously before the Linux kernel SIGKILLs the process.

---

### 10. Interview Tips
Explicitly use the terms **"Process Death"** or **"Tombstoning"**.

***

## Question 2 — Android Intents and Deep Linking

### Difficulty
Medium

### Concepts Being Tested
- Android Intents
- `AndroidManifest.xml`
- Inter-app Communication

---

### 1. Interview Question
"You need to allow users to open PDF files from an email directly into your React Native app. How do you configure Android to tell the OS that your app can handle PDFs, and how do you read that file in JS?"

---

### 2. What the Interviewer is Evaluating
Testing if you know how to configure native Android files (Manifest) and understand the concept of Android Intents, which are the backbone of Android's inter-app communication.

---

### 3. Ideal Answer
To handle PDFs, we must register our app as a capable receiver in the `AndroidManifest.xml`. We do this by adding an `<intent-filter>` inside our main `<activity>`. 

We need to specify the `action` as `VIEW`, the `category` as `DEFAULT`, and the `data` mimeType as `application/pdf`.

When the user taps a PDF, Android fires an Intent. Our app launches, and we can use a React Native library (like `react-native-fs` or the built-in `Linking` API) to capture the Intent URL, read the file path on the device, and render it.

---

### 4. Code Example
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<activity android:name=".MainActivity" ...>
  <!-- Standard App Launch Intent -->
  <intent-filter>
      <action android:name="android.intent.action.MAIN" />
      <category android:name="android.intent.category.LAUNCHER" />
  </intent-filter>

  <!-- PDF Handler Intent -->
  <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <!-- Match PDF files -->
      <data android:scheme="content" />
      <data android:scheme="file" />
      <data android:mimeType="application/pdf" />
  </intent-filter>
</activity>
```

---

### 5. Production Scenario
- **Root Cause:** A healthcare app needed users to upload medical records from their Google Drive or File Manager. 
- **Investigation:** The app only supported image mime types. Users were frustrated they couldn't upload standard PDF documents.
- **Solution:** Added the correct Intent filters in Android and Document types in iOS `Info.plist`, then handled the content URI via `react-native-document-picker`.
- **Lessons Learned:** Mobile OS boundaries require explicit permissions and declarations.

---

### 6. Alternative Solutions & Trade-offs
- **React Native Share Menu Libraries**
  - *Advantages:* Provides pre-built native modules to handle incoming intents without writing Java code.
  - *Disadvantages:* Sometimes lack granular control over mime types.
- **Custom Native Module (Java/Kotlin)**
  - *Advantages:* Full control over the Intent parsing before passing it to JS.
  - *Disadvantages:* Requires Native maintenance.

---

### 7. Common Mistakes
- **Forgetting `android:scheme="content"`:** Modern Android (API 29+) uses Content URIs (`content://`) instead of File URIs (`file://`) for security. If you only listen for `file`, the app won't catch files opened from Google Drive.
- **Not handling the intent in `MainActivity.java`:** Sometimes React Native's default intent handling needs to be forwarded correctly if using complex navigation setups.

---

### 8. Follow-up Questions
1. What is an Implicit Intent vs an Explicit Intent?
2. How do you handle this on iOS? (Hint: `Info.plist` CFBundleDocumentTypes).
3. What is Scoped Storage in modern Android?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will explain the security implications. They will mention **Android 11+ Scoped Storage**. Just because you receive an Intent with a `content://` URI doesn't mean you can read it freely. You must use a `ContentResolver` on the native side to stream the bytes, or rely on a robust library, because direct file path access (`/storage/emulated/0/...`) is strictly blocked by modern Android security policies.

---

### 10. Interview Tips
Mention "Scoped Storage" and "Content URIs". It shows you keep up with modern Android OS updates, which heavily impact React Native apps.

***

## Question 3 — Background Tasks and WorkManager

### Difficulty
Hard

### Concepts Being Tested
- Android Background Execution Limits
- WorkManager API
- Battery Optimization

---

### 1. Interview Question
"Your app needs to upload a 500MB video to the server. The user hits 'Upload' and immediately backgrounds the app to check Instagram. A few minutes later, the upload fails. Why did it fail, and how do you architect guaranteed background uploads on Android?"

---

### 2. What the Interviewer is Evaluating
The interviewer is checking if you know about Android's aggressive background execution limits (Doze mode) and how to use the OS's native job schedulers.

---

### 3. Ideal Answer
It failed because the JS thread pauses shortly after the app goes to the background, and Android's OS limits network activity for backgrounded apps to save battery. A standard `fetch` or `axios` call will be killed.

To guarantee the upload, we must hand the task over to the Android OS. We should use a Native Background Service, specifically **Android WorkManager**. 
WorkManager guarantees execution even if the app is killed or the device restarts. In React Native, we can use libraries like `react-native-background-upload` which wrap WorkManager natively. We give the file path and URL to the library, and Android handles the networking entirely outside of the JS thread, eventually waking our app up to deliver a success/failure callback.

---

### 4. Code Example
```typescript
import BackgroundUpload from 'react-native-background-upload';

const startVideoUpload = async (videoPath: string) => {
  const options = {
    url: 'https://api.myapp.com/upload',
    path: videoPath,
    method: 'POST',
    type: 'multipart',
    // Hands control over to Android WorkManager / iOS BackgroundSessions
    field: 'file',
  };

  try {
    const uploadId = await BackgroundUpload.startUpload(options);
    
    BackgroundUpload.addListener('progress', uploadId, (data) => {
      console.log(`Progress: ${data.progress}%`);
    });
    
    BackgroundUpload.addListener('completed', uploadId, (data) => {
      console.log('Upload guaranteed successful!');
    });
  } catch (err) {
    console.error('Upload config failed');
  }
};
```

---

### 5. Production Scenario
- **Root Cause:** A field-inspection app used by engineers in remote areas attempted to sync SQLite databases via `axios` when the app was closed.
- **Investigation:** Due to poor cell reception, the sync took 2 minutes. Android killed the app after 30 seconds of background time. No data was ever synced.
- **Solution:** Migrated the sync logic to a Headless JS task triggered by WorkManager, strictly constrained to run only when the device had `UNMETERED` network (Wi-Fi) and was `CHARGING`.
- **Lessons Learned:** The OS owns the battery. You must negotiate with the OS to do heavy background work.

---

### 6. Alternative Solutions & Trade-offs
- **Headless JS**
  - *Advantages:* Allows you to write background logic in JS.
  - *Disadvantages:* Android limits how long Headless JS can run (usually ~60 seconds) before killing it. Not suitable for massive uploads.
- **Foreground Service with Notification (Current fallback)**
  - *Advantages:* Keeps the app alive indefinitely.
  - *Disadvantages:* Requires showing a sticky notification to the user (e.g., "Uploading Video..."), which can be annoying.

---

### 7. Common Mistakes
- **Using `setInterval` in JS for background work:** It simply stops running when the screen turns off.
- **Ignoring Doze Mode:** Android restricts network access when the phone is unplugged and stationary.

---

### 8. Follow-up Questions
1. What is a Foreground Service, and why does it require a Notification?
2. How do you implement Headless JS in React Native?
3. How is background processing different on iOS vs Android?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will contrast Android's `WorkManager` with iOS's `BGTaskScheduler`. They will explain that Android is generally more lenient if you use a Foreground Service, whereas iOS is extremely strict, giving you at most 30 seconds of background time unless you are an Audio or Navigation app. For massive files, they will strictly advocate for Native OS background networking APIs (`URLSession` on iOS, `WorkManager` on Android) rather than trying to keep the JS bridge alive.

---

### 10. Interview Tips
If you mention "WorkManager" and "Doze Mode", the interviewer will immediately know you have deep Android experience.

***

## Question 4 — React Native Build Process and Gradle

### Difficulty
Hard

### Concepts Being Tested
- Gradle Build System
- ProGuard / R8
- Android Build Variants

---

### 1. Interview Question
"Your team is releasing a new version of the app to the Google Play Store. The debug build works perfectly, but the production release APK crashes immediately on launch. What is the most likely cause, and how do you debug a production Android crash in React Native?"

---

### 2. What the Interviewer is Evaluating
Testing DevOps and build knowledge. The gap between debug and release builds in Android is huge, and mid-to-senior devs must know how to navigate Gradle and ProGuard.

---

### 3. Ideal Answer
The most common cause for a release-only crash is **ProGuard / R8 minification**. 
In release mode, Android aggressively obfuscates and shrinks the Java/Kotlin code by removing classes it thinks are unused. If a React Native third-party package relies on Native code via reflection, ProGuard might delete that code, causing a `ClassNotFoundException` at runtime.

**How to Debug:**
1. Connect an Android device via USB.
2. Run `adb logcat | grep AndroidRuntime`.
3. Launch the release APK. 
4. The logcat will reveal the exact Java exception. If it's a `ClassNotFound` or `NoSuchMethod` error, I need to add a ProGuard keep rule (`-keep class com.thirdparty.sdk.** { *; }`) in `android/app/proguard-rules.pro` to prevent that library from being stripped.

---

### 4. Code Example
```pro
# android/app/proguard-rules.pro

# Example: Preventing ProGuard from deleting a crucial SDK that uses Reflection
-keep class com.stripe.android.** { *; }
-keep interface com.stripe.android.** { *; }

# Keeping React Native's JNI methods
-keep class com.facebook.react.bridge.** { *; }
```

---

### 5. Production Scenario
- **Root Cause:** Added a new biometric authentication library.
- **Investigation:** Debug build worked. Release APK instantly crashed on boot. `adb logcat` showed `java.lang.NoSuchMethodError` inside the biometric package.
- **Solution:** Found the package's documentation, copied their specific ProGuard rules into our `proguard-rules.pro` file, rebuilt, and the crash was fixed.
- **Lessons Learned:** Always thoroughly test the Release build, not just the Debug build, before submitting to QA.

---

### 6. Alternative Solutions & Trade-offs
- **Disabling ProGuard (`def enableProguardInReleaseBuilds = false`)**
  - *Advantages:* Instantly fixes the crash.
  - *Disadvantages:* The APK size increases massively (often by 10-20MB), and the code is easily reverse-engineered. Not acceptable for production.
- **Writing explicit ProGuard Rules (Current)**
  - *Advantages:* Small APK size, secure code, no crashes.
  - *Disadvantages:* Requires manual debugging of logcat errors.

---

### 7. Common Mistakes
- **Testing only on Emulators:** Emulators run `x86` architecture, while real phones run `arm64`. Release builds slice architectures differently, meaning an emulator might not catch native NDK crashes.
- **Assuming JS errors caused the boot crash:** If an app crashes *instantly* before the splash screen drops, it is almost always a Native Java/C++ crash, not a JS crash.

---

### 8. Follow-up Questions
1. What is the difference between an APK and an AAB (Android App Bundle)?
2. How do you map obfuscated crash logs in Sentry back to readable code?
3. What is the purpose of `android/build.gradle` vs `android/app/build.gradle`?

---

### 9. How a Senior/Lead Engineer Answers
A Lead Engineer will expand on **Crash Symbolication**. They will explain that Release builds obfuscate both JS and Native code. To debug crashes in production, you must upload the JS source maps and the Android ProGuard mapping file (`mapping.txt`) to a service like Sentry or Crashlytics during the CI/CD pipeline. Without automating this in Fastlane or GitHub Actions, production crash logs are unreadable garbage.

---

### 10. Interview Tips
Whenever dealing with "Release only" bugs, your immediate reflex answer should be: "ProGuard minification or missing Source Maps."

***

## Question 5 — The UI Thread and Overdraw (Top-Tier Scale)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- GPU Overdraw
- Native Android UI Profiling
- React Native Layout Optimization

---

### 1. Interview Question
"In a highly complex dashboard screen, the app doesn't crash, and memory is fine, but scrolling is jittery and the phone gets physically hot. You suspect GPU Overdraw on Android. What is GPU Overdraw, how do you profile it, and how do you fix it in React Native?"

---

### 2. What the Interviewer is Evaluating
This tests expert-level Android UI performance profiling. At massive scale, poorly structured JSX translates to deeply nested Android `ViewGroups`, which choke the GPU.

---

### 3. Ideal Answer
**GPU Overdraw** happens when the GPU draws pixels on top of each other multiple times in a single frame. For example, if you have a white screen, a white container, and a white card stacked on top of each other, the GPU has to paint the exact same pixel white three times. This wastes GPU cycles and drains battery.

**How to Profile:**
I would turn on **"Debug GPU Overdraw"** in the Android Developer Options on a physical device. The screen will highlight areas in blue, green, light red, and dark red. Dark red means the pixel was overdrawn 4+ times.

**How to Fix in React Native:**
React Native developers love wrapping things in `<View>` for flexbox styling. Every `<View>` becomes an Android `ViewGroup`. 
1. I would remove all unnecessary `<View>` wrappers.
2. I would remove `backgroundColor="white"` from child containers if the parent is already white. In Android, transparent backgrounds are essentially free, but setting a color forces a paint calculation.
3. Use `<React.Fragment>` instead of `<View>` when grouping elements without styling needs.

---

### 4. Code Example
```typescript
// BAD: Massive GPU Overdraw
<View style={{ backgroundColor: 'white', flex: 1 }}>
  <View style={{ backgroundColor: 'white', padding: 10 }}>
    <View style={{ backgroundColor: 'white', borderRadius: 5 }}>
       <Text>Hello</Text>
    </View>
  </View>
</View>

// GOOD: Zero Overdraw, exact same visual result
<View style={{ backgroundColor: 'white', flex: 1, padding: 10 }}>
  <Text style={{ borderRadius: 5 }}>Hello</Text>
</View>
```

---

### 5. Production Scenario
- **Root Cause:** A complex e-commerce product grid used a custom `<ShadowCard>` component that wrapped everything in 3 nested `Views` to achieve a specific shadow effect, all with `backgroundColor: '#FFF'`.
- **Investigation:** Turned on GPU Overdraw in Android developer settings. The entire grid was glowing dark red (severe overdraw). Frame rates dropped to 20fps.
- **Solution:** Flattened the component hierarchy. Removed background colors from the inner views, relying solely on the root view's background. 
- **Lessons Learned:** JSX is not free. Every node translates to a heavy Native View in the old architecture.

---

### 6. Alternative Solutions & Trade-offs
- **Flattening the hierarchy (Current)**
  - *Advantages:* Better CPU/GPU performance, lower memory usage.
  - *Disadvantages:* Can make styling slightly more complex to reason about.
- **Fabric (New Architecture)**
  - *Advantages:* View flattening is handled significantly better natively.
  - *Disadvantages:* Still doesn't save you if you aggressively paint overlapping background colors.

---

### 7. Common Mistakes
- **Assuming empty `<View>` tags are cost-free:** They aren't. They create native UI nodes.
- **Abusing `zIndex`:** Forcing complex layer compositions forces the GPU into heavy calculation modes.

---

### 8. Follow-up Questions
1. What does the "Layout Inspector" in Android Studio show you about React Native apps?
2. How does `collapsable={false}` affect React Native's view optimization?
3. What is the difference between CPU bound and GPU bound performance issues?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will mention React Native's internal **View Flattening** algorithm. They will explain that React Native tries to optimize empty views by not actually rendering a native `ViewGroup` unless the view has a background color, border, or interaction (like `onPress`). Therefore, by explicitly removing unnecessary background colors, we allow React Native's internal optimizer to completely collapse the view tree, dramatically speeding up the Android layout pass.

---

### 10. Interview Tips
If asked about performance, most devs talk about `useMemo`. If you talk about **GPU Overdraw** and the **Android Layout Inspector**, you immediately separate yourself from 95% of React developers and prove you are a true Mobile developer.
