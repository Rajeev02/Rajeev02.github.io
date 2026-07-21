# Volume 7 – Set 13 – Networking & Security

## 1. How do you implement robust offline support and data synchronization in React Native?

**Concept:**
Mobile networks are unreliable. A production-grade mobile app should allow users to interact with it seamlessly even when the connection drops, synchronizing data in the background once the network is restored.

**Answer:**
Offline-first architecture requires a robust local database and a background synchronization mechanism. 

My typical stack involves:
1. **Local Database**: I use `WatermelonDB` or `MMKV` for fast, asynchronous local storage. WatermelonDB is designed specifically for React Native and handles thousands of records efficiently by lazy-loading them.
2. **Action Queues**: When a user makes a POST/PUT request offline, I don't throw an error. Instead, I save the action to a local queue table (e.g., SQLite or Redux Offline queue). 
3. **Network Listener**: I use `NetInfo` to monitor network connectivity state changes.
4. **Background Sync**: When the network comes back online, a background job processes the action queue sequentially. 
5. **Conflict Resolution**: To handle cases where the server data was modified by another client while we were offline, I use a Timestamp-based or Version-based conflict resolution strategy on the backend, ensuring the latest changes win or merging them gracefully.

**Key Takeaway:**
Never block the user interface waiting for a network request if the operation can be queued. Treat the local database as the Single Source of Truth for the UI, and treat the remote API simply as a synchronization endpoint.

---

## 2. Explain the concept of SSL Pinning and how to implement it in a React Native app.

**Concept:**
By default, mobile devices trust a wide list of Certificate Authorities (CAs). An attacker (or a malicious proxy like Charles Proxy on a public Wi-Fi) can generate a fake SSL certificate, convince the device to trust it, and intercept encrypted HTTPS traffic. This is a Man-in-the-Middle (MITM) attack.

**Answer:**
SSL Pinning prevents MITM attacks by hardcoding the exact SSL certificate (or its public key hash) of your server directly inside the mobile app's native code. When the app connects to the server, it verifies that the server's certificate strictly matches the \"pinned\" certificate. If it doesn't match, the app aborts the network request immediately.

**Implementation in React Native:**
I implement SSL Pinning using libraries like `react-native-ssl-public-key-pinning` or by writing custom native network interceptors.
- **Android**: Use `network_security_config.xml` to define the pinned domains and their SHA-256 hashes, or configure an `OkHttpClient` interceptor in `MainApplication.java`.
- **iOS**: Use `TrustKit` or configure URLSession delegates in `AppDelegate.m`.

**Key Risk:**
If the server's SSL certificate expires and the DevOps team rotates it, the old pinned hash in the app becomes invalid, permanently breaking the app for all users until they download an update. To mitigate this, we always pin the *Public Key* or pin a *backup certificate* alongside the active one.

---

## 3. What are the best practices for storing sensitive data (like JWT tokens) in React Native?

**Concept:**
React Native developers commonly use `AsyncStorage` because of its simple API. However, `AsyncStorage` saves data in plain text XML files on the device filesystem. Anyone with a rooted/jailbroken device (or physical access) can extract these files easily.

**Answer:**
Sensitive data like JWT access tokens, refresh tokens, PII (Personally Identifiable Information), or encryption keys must *never* be stored in `AsyncStorage`.

They must be stored in the device's hardware-backed Secure Enclave.
1. **iOS**: Use the **Keychain**.
2. **Android**: Use the **Keystore** (or EncryptedSharedPreferences).

In React Native, I use libraries like `react-native-keychain` or `react-native-encrypted-storage`. These libraries provide an asynchronous API similar to AsyncStorage but encrypt the payload using AES algorithms bound to the device hardware.

**Key Takeaway:**
Always classify data. Non-sensitive data (theme preference, onboarding status) goes in `AsyncStorage` or `MMKV`. Highly sensitive data (Auth Tokens, Health Data) goes in `react-native-keychain`.

---

## 4. How do you handle token refresh mechanisms seamlessly without disrupting the user experience?

**Concept:**
For security, Access Tokens usually expire quickly (e.g., 15 minutes). To keep the user logged in, the app holds a long-lived Refresh Token (e.g., 30 days) to request new Access Tokens. This process must happen invisibly in the background.

**Answer:**
I handle this cleanly using an **Axios Interceptor** configured on the API client.

Here is the exact flow:
1. The app makes an API request.
2. The server responds with `401 Unauthorized` because the access token expired.
3. The Axios `response` interceptor catches the `401` error automatically.
4. The interceptor pauses the original request and places it in a retry queue.
5. A background request is fired to `/auth/refresh` using the stored Refresh Token.
6. Upon success, the new Access Token is saved to the secure Keychain.
7. The interceptor updates the `Authorization` header of the paused original request and retries it.

If multiple API requests fail with 401 simultaneously, the interceptor ensures that only *one* refresh request is sent, queuing the rest to wait for the new token.

**Key Takeaway:**
Handling this via Axios Interceptors centralizes the logic so you don't have to write retry logic in every single component or Redux thunk. If the refresh token also expires, the interceptor dispatches a Redux action to forcefully log the user out and redirect to the login screen.

---

## 5. What are common mobile security vulnerabilities (OWASP Mobile Top 10) and how do you mitigate them in RN?

**Concept:**
The Open Web Application Security Project (OWASP) lists the most critical security risks for mobile apps. Senior developers must architect apps defensively.

**Answer:**
Three of the most common OWASP mobile vulnerabilities and their RN mitigations:

1. **Insecure Data Storage (M2):** 
   - *Risk:* Storing tokens in `AsyncStorage`.
   - *Mitigation:* Use `react-native-keychain`. Don't hardcode API secrets in JavaScript files because they can be easily extracted by reverse-engineering the `.jsbundle`. Move API secrets to the backend or use native C++ environment variables (`react-native-config`).

2. **Insecure Communication (M3):**
   - *Risk:* Data intercepted over public Wi-Fi.
   - *Mitigation:* Enforce `HTTPS` for all endpoints. Implement SSL Pinning to prevent MITM attacks using malicious root certificates. Disable cleartext traffic in Android Manifest (`usesCleartextTraffic=\"false\"`).

3. **Reverse Engineering (M8):**
   - *Risk:* Attackers decompile the APK to steal business logic or premium features.
   - *Mitigation:* Enable ProGuard/R8 on Android to obfuscate Java/Kotlin code. For JavaScript, use Hermes engine (which compiles JS to bytecode making it significantly harder to read than minified JS). For highly sensitive apps (like Banking), implement App Attestation (Play Integrity / DeviceCheck) and Jailbreak/Root detection libraries.

**Key Takeaway:**
Security is layered. No app is unhackable, but the goal is to make reverse-engineering so expensive and difficult that attackers move on to easier targets.
