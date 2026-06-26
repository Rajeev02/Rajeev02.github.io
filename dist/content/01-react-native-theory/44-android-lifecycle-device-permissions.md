> 🎯 **Topic:** Android Lifecycle & Device Permissions

**Q: Can you explain the Android Activity Lifecycle and how it impacts a React Native application?**
**A:** An Android Activity transitions through several states: `onCreate()`, `onStart()`, `onResume()`, `onPause()`, `onStop()`, and `onDestroy()`.
- **Impact on React Native:** While RN abstracts much of this into the `AppState` API (returning `active`, `background`, or `inactive`), understanding the native lifecycle is crucial for native module development. For example:
  - If a user backgrounds the app, `onPause()`/`onStop()` fires. You should stop heavy animations, pause video playback, and release camera resources to prevent ANRs (Application Not Responding) and save battery.
  - If the OS kills the app for memory, `onDestroy()` is called. 

**Q: How do you handle Native Device Permissions in React Native across both platforms?**
**A:** I use a unified library like `react-native-permissions` alongside native configuration:
- **Android:** Permissions must be declared in `AndroidManifest.xml` via `<uses-permission>`. For Android 6.0+, dangerous permissions (Camera, Location) require a runtime prompt using the JS API.
- **iOS:** Apple requires usage description keys (e.g., `NSCameraUsageDescription`, `NSLocationWhenInUseUsageDescription`) to be added in the `Info.plist`. If you request a permission via JS without this key, the app will crash instantly.
