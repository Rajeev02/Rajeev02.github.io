> 🎯 **Topic:** 9.1 React Native: Security Best Practices
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---

## 9.1 React Native: Security Best Practices

### 1. Secure Storage
**Question:** Why shouldn't you use `AsyncStorage` for sensitive data like Auth Tokens?

**Answer:**
`AsyncStorage` stores data in plain text. Any malicious app or physical access to an unencrypted device can read this data.
**Fix:** Use secure native storage solutions that utilize iOS Keychain and Android Keystore.
- `react-native-keychain`
- `react-native-encrypted-storage`

### 2. SSL Pinning
**Question:** What is SSL Pinning and how do you implement it?

**Answer:**
SSL Pinning prevents Man-In-The-Middle (MITM) attacks by hardcoding the server's public key or SSL certificate inside the app. If the server's certificate doesn't match the pinned certificate, the app refuses the connection.
**Implementation:** You can use libraries like `react-native-ssl-pinning` or configure it natively via `network_security_config.xml` (Android) and `Info.plist` (iOS).

### 3. Reverse Engineering & Obfuscation
**Question:** How do you protect your React Native code from reverse engineering?

**Answer:**
Since React Native bundles JS code, attackers can easily unpack the `.apk` or `.ipa` and read the `index.android.bundle`.
- **Hermes:** Enabling Hermes compiles JS into bytecode, which is significantly harder to reverse engineer than plain JS.
- **ProGuard / R8:** For Android, enable ProGuard in `build.gradle` to shrink and obfuscate Java/Kotlin native code.
- **DexGuard:** For enterprise Android apps, use DexGuard for advanced string encryption and anti-tampering.

### 4. Jailbreak / Root Detection
**Question:** Should banking apps run on rooted devices? How do you prevent it?

**Answer:**
Running on a rooted/jailbroken device bypasses OS sandboxing, allowing malware to read the app's memory.
Use libraries like `jail-monkey` or `react-native-device-info` to detect root status and gracefully exit or block sensitive operations.

### 5. API Key Security
**Question:** Where should you store third-party API keys?

**Answer:**
Never hardcode API keys in the JS bundle. Use libraries like `react-native-config` to load environment variables natively.
*However, note that ANY secret shipped in the mobile client can be extracted.* The most secure way is to proxy third-party API calls through your own backend.

---
