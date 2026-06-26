> 🎯 **Topic:** Deep Linking & Branch.io

**Q: What is Deferred Deep Linking, and how does Branch.io facilitate it in a React Native app?**
**A:** 
- **Standard Deep Linking:** A URL (e.g., `myapp://product/123`) directly opens the app to a specific screen. However, if the app *isn't* installed, the link breaks.
- **Deferred Deep Linking:** If the user clicks the link and doesn't have the app, they are routed to the App Store/Play Store. Once they install and launch the app for the first time, the original link context (e.g., `product/123`) is preserved and they are routed to that specific screen.
- **Branch.io:** An attribution and deep linking platform that handles this seamlessly. It matches the user's pre-install device fingerprint (IP, OS version, screen size) with the post-install app launch to attribute the install and pass the deferred parameters to your React Native routing layer (like React Navigation).

### 15.3 Native Android & iOS Fundamentals
