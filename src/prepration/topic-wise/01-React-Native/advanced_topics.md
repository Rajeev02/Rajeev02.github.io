# React Native: Advanced Topics & Architecture

## 1. Deep Linking and Universal Links
**Question:** How does Deep Linking work in React Native? What is the difference between Deep Links and Universal Links?

**Answer:**
- **Deep Links** use a custom URI scheme (e.g., `myapp://profile/123`). If the app isn't installed, the OS shows an error.
- **Universal Links (iOS) / App Links (Android)** use standard HTTP URLs (e.g., `https://myapp.com/profile/123`). If the app is installed, the OS intercepts the URL and opens the app. If not, it falls back to the website.
**React Navigation Implementation:**
You pass a `linking` configuration object to the `NavigationContainer`. It maps URL paths to screen names and parses route parameters.

## 2. Offline-First Architecture
**Question:** How do you build an app that works seamlessly offline?

**Answer:**
Offline-first apps store data locally and sync with the backend when the network is restored.
1. **Local Database:** Use robust databases like WatermelonDB, Realm, or SQLite instead of AsyncStorage for complex relational data.
2. **State Persistence:** Use `redux-persist` to save the global state to local storage on exit and rehydrate it on launch.
3. **Queueing Requests:** Use libraries like `react-native-offline` or Redux Offline to intercept API requests when offline, queue them, and dispatch them automatically once the connection is back.

## 3. Accessibility (a11y)
**Question:** How do you make a React Native app accessible to users with disabilities?

**Answer:**
- **Screen Readers:** Use `accessible={true}` on views you want VoiceOver/TalkBack to read.
- **Roles & Labels:** Provide `accessibilityRole` (e.g., 'button', 'header') and `accessibilityLabel` to describe what the element does.
- **Dynamic Type:** Do not hardcode font sizes or restrict `numberOfLines` tightly; use relative scaling (`allowFontScaling={true}`).

## 4. Reducing App Size
**Question:** What strategies do you use to reduce the final App Size?

**Answer:**
1. **Android App Bundles (.aab):** Instead of building a fat `.apk` containing resources for all device densities and architectures, build an `.aab`. The Google Play Store will generate an optimized APK specific to the user's device.
2. **Hermes:** Enabled by default in newer versions, it shrinks the JavaScript payload.
3. **Optimize Assets:** Compress images (TinyPNG) or use `.webp` / SVG icons instead of high-res `.png` files.
4. **ProGuard / R8:** Strip out unused Java/Kotlin code and third-party SDK bloat.

## 5. Push Notifications
**Question:** Describe the architecture of Push Notifications.

**Answer:**
1. **Device Registration:** On app launch, the app asks APNs (Apple) or FCM (Firebase/Android) for a unique device token.
2. **Backend Storage:** The app sends this token to your Node.js backend to save in the database.
3. **Trigger:** An event on the backend triggers a notification. The backend sends a request to APNs/FCM using the stored token.
4. **Delivery:** APNs/FCM delivers the notification to the user's device. React Native libraries like `react-native-firebase/messaging` or `react-native-push-notification` handle the foreground/background UI display.
