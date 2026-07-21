# Volume 11 – Set 24 – Security: SSL Pinning, Biometrics, Obfuscation

## 1. How do you protect a React Native app against reverse engineering?

**Concept:**
React Native applications compile JavaScript into a `.jsbundle` file which is shipped inside the `.apk` or `.ipa`. Attackers can easily unzip the app, extract the bundle, and read your source code (even if minified).

**Answer:**
You cannot make an app 100% unhackable, but you can make it incredibly difficult using a layered defense.

1. **Hermes Engine:** Hermes compiles your JavaScript into bytecode (binary) instead of plain text JS. While bytecode can technically be decompiled, it is astronomically harder to read and modify than a minified text file.
2. **Obfuscation:** For the Native code (Java/Kotlin), use **ProGuard** or **R8** in Android. It renames all classes and methods to random letters (e.g., `a.b.c()`), making the native decompiled source code nearly impossible to follow.
3. **Never Hardcode Secrets:** API Keys or AWS Secrets should never be hardcoded in the JS bundle. They should be fetched securely from the backend post-authentication, or injected via native CI/CD environment variables using `react-native-config`.

**Key Takeaway:**
Using Hermes and ProGuard provides a strong baseline defense against casual reverse-engineering of both your JS and Native logic.

---

## 2. Explain Biometric Authentication (FaceID/TouchID) in React Native.

**Concept:**
Biometrics provide a frictionless way to verify user identity without requiring a password on every launch.

**Answer:**
React Native does not have a built-in API for biometrics. I use `expo-local-authentication` or `react-native-biometrics`.

**How it works securely:**
You do *not* use biometrics to \"log the user in\" to your backend directly. 
1. The user logs in via username/password and receives a JWT Access/Refresh token.
2. You encrypt and store this token in the device's Secure Enclave / Keychain.
3. On next launch, you prompt for Biometrics (`LocalAuthentication.authenticateAsync()`).
4. If the OS returns `success: true`, you unlock the Keychain, retrieve the Refresh Token, and proceed.

**Advanced Security (Cryptographic Binding):**
Libraries like `react-native-biometrics` generate a public/private RSA keypair inside the hardware Secure Enclave. The private key can *only* be used if the user successfully scans their fingerprint. The app uses this private key to sign a cryptographic challenge sent by your backend, proving cryptographically that the exact user authenticated locally.

**Key Takeaway:**
Biometrics simply act as the physical key to unlock cryptographic secrets stored safely in the device's hardware.

---

## 3. What is Jailbreak/Root Detection and why is it controversial?

**Concept:**
A \"rooted\" Android or \"jailbroken\" iOS device gives the user superuser (admin) privileges. This allows them to bypass OS sandboxes, read memory of running apps, and bypass SSL pinning using frameworks like Frida or Xposed.

**Answer:**
For highly sensitive apps (like Banking or Healthcare), developers use libraries like `jailmonkey` or `react-native-device-info` to detect if the device is rooted. If detected, the app forcefully crashes or locks the user out.

**How it detects:**
It checks for known root directories (like `/sbin/su`), looks for known hacking apps (like Cydia or Magisk), or attempts to write to restricted file paths to see if the OS permits it.

**Why it's controversial:**
1. **Cat and Mouse:** Hackers constantly update tools (like Magisk Hide) to spoof root detection checks. It is impossible to guarantee 100% accurate detection.
2. **False Positives:** Some Android manufacturers ship devices with permissive permissions that trigger false positives, locking legitimate users out of their banking apps.

**Key Takeaway:**
Instead of relying solely on hacky local root detection, modern apps use **App Attestation** (Google Play Integrity API / Apple DeviceCheck) where the OS sends a cryptographically signed token to your backend proving the device is untampered.

---

## 4. How do you implement Secure Deep Linking?

**Concept:**
Deep links (Universal Links) open your app directly from a URL. However, attackers can construct malicious URLs to trick your app into performing unauthorized actions if not validated properly.

**Answer:**
1. **Never trust the payload:** If a deep link URL is `https://bank.com/transfer?amount=1000&to=hacker`, you must never execute that action automatically. The URL should only *route* the user to the Transfer screen. The user must manually click \"Confirm\" and the app must validate the auth token.
2. **Validate Domains:** If you use Custom URI schemes (`my-app://`), ensure that the domain or payload is strictly validated using regex before passing it to React Navigation or internal business logic.
3. **Use Universal Links:** Always prefer Universal Links (`https://`) over Custom Schemes (`app://`) because Universal Links require cryptographic verification (the `apple-app-site-association` file) proving your app actually owns the domain.

**Key Takeaway:**
Treat incoming Deep Links exactly like user input in a web form: assume it is malicious and sanitize/validate everything before updating the UI state.

---

## 5. What are some lesser-known security risks in React Native (e.g., Clipboard, Screen Recording)?

**Concept:**
Security isn't just about network traffic; it involves protecting the data physically visible on the device.

**Answer:**
1. **Screen Recording & Screenshots:** 
   If your app displays a temporary password or sensitive health data, you should prevent the user (or malware) from taking a screenshot.
   - *Android:* You can easily set `WindowManager.LayoutParams.FLAG_SECURE` in `MainActivity.java`.
   - *iOS:* Apple does not allow blocking screenshots completely, but you can listen to the `UIApplicationUserDidTakeScreenshotNotification` and delete sensitive data, or overlay a blurred view when the app moves to the background multitask switcher.
2. **Clipboard Leaks:**
   If a user copies a password or secure token inside your app, it stays on the global OS clipboard, accessible by any other malicious app on the phone. You should use `Clipboard.setString('')` to automatically clear the clipboard after a timeout (e.g., 60 seconds).
3. **Keyboard Cache:**
   Mobile OS keyboards cache frequently typed words to improve autocorrect. If a user types their credit card, it might get cached. Always use `secureTextEntry={true}` or `keyboardType=\"numeric\"` to disable OS-level keyboard caching for sensitive inputs.

**Key Takeaway:**
A Senior mobile engineer considers the physical constraints of the device, including the multitasking screen, clipboard, and keyboard, when securing an application.
