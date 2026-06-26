> 🎯 **Topic:** 2.2 🔒 High-Stakes Fintech System Design
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 👨💼 Lead Round Favorite

---


## 2.2 🔒 High-Stakes Fintech System Design

*⏱️ 2 min read*

Fintech platforms handle transactions, investments, and PII. Security and resilience are core requirements.

#### 1. Data Security at Rest (Keychain / Keystore)
- **Problem**: Storing access tokens, refresh keys, or private financial metrics inside `AsyncStorage` or unencrypted `MMKV` is unsafe. On rooted or jailbroken devices, these plaintext files can be read easily.
- **Solution**: Reframe storage using **`react-native-keychain`** or **Expo SecureStore**. These wrappers interface directly with the device's hardware secure enclaves: **Keychain** (iOS) and **Keystore** (Android).
- **Silent Token Refresh Interceptor**: Set up an Axios response interceptor. If an API call fails with a `401 Unauthorized` due to access token expiration, the interceptor pauses subsequent outgoing requests, reads the secure Refresh Token from the Keychain, fetches a new Access Token from AWS Cognito/Auth0 in the background, updates storage, and automatically retries the failed requests without interrupting the user session.

#### 2. Data in Transit (SSL Pinning & Attestation)
- **Problem**: Protect the app from Man-in-the-Middle (MitM) attacks (e.g., attackers using proxy tools like Charles or Fiddler to intercept API requests on public networks).
- **Solution**: Implement **SSL Pinning** at the native network layer.
  - **Android**: Configure `CertificatePinner` inside the native `OkHttpClient` setup.
  - **iOS**: Integrate `TrustKit` via CocoaPods.
  - The app will reject connections to any backend server that fails to present a cryptographic certificate matching our pre-bundled public key hashes.
- **Device Attestation**: Pair SSL Pinning with **Google Play Integrity API** (Android) and **Apple App Attest** (iOS) to cryptographically verify that API requests are coming from our unaltered, signed production binary running on a real, untampered device.

#### 3. Payment Gateway Resilience (Razorpay & Cashfree)
- **Problem**: A user completes a payment in the Razorpay SDK, but before the success callback returns to the JavaScript thread, the app crashes, the network drops, or the user force-closes the app. The client-side success handler never fires, leaving the transaction in a broken state.
- **Solution**: 
  1. **Idempotency Keys**: Attach a unique checkout session UUID (`idempotency-key`) to the payment metadata. If network retries occur, the gateway detects the duplicate key and prevents double-charging.
  2. **Server-to-Server Webhooks**: The mobile app is **never** treated as the source of truth for transactions. When a payment completes, the payment gateway triggers a secure webhook payload directly to our backend server. The backend verifies the signature, updates the database ledger, and pushes the updated transaction status to the mobile client (via websockets, polling, or push notifications) once verified.

---


---

---
