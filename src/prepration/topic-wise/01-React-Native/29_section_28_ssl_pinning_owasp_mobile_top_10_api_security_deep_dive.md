
## Page Summary
### Reading Time
`8 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🛡️ Section 28: SSL Pinning, OWASP Mobile Top 10 & API Security Deep-Dive |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 🛡️ Section 28: SSL Pinning, OWASP Mobile Top 10 & API Security Deep-Dive

*⏱️ 5 min read*

#### 1. SSL/Certificate Pinning Implementation
SSL Pinning ensures that your app only trusts specific certificates or public keys when communicating with your backend, preventing Man-in-the-Middle (MitM) attacks even if a Certificate Authority is compromised.

##### Public Key Pinning vs. Certificate Pinning

| Approach | What's Pinned | Certificate Rotation | Security Level |
| :--- | :--- | :--- | :--- |
| **Certificate Pinning** | Entire leaf certificate | Requires app update on cert renewal | High but operationally fragile |
| **Public Key Pinning** | Public key (SPKI hash) | Survives cert renewal if key is reused | High and operationally flexible |

**Recommendation**: Always use **Public Key Pinning**. Certificates rotate frequently (every 90 days with Let's Encrypt), but the underlying public key can be preserved across renewals.

##### Android Implementation (OkHttp)
```kotlin
import okhttp3.CertificatePinner
import okhttp3.OkHttpClient

val certificatePinner = CertificatePinner.Builder()
    .add(
        "api.myapp.com",
        "sha256/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" // Primary key hash
    )
    .add(
        "api.myapp.com",
        "sha256/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=" // Backup key hash
    )
    .build()

val client = OkHttpClient.Builder()
    .certificatePinner(certificatePinner)
    .build()
```

##### iOS Implementation (TrustKit)
```swift
import TrustKit

let trustKitConfig: [String: Any] = [
    kTSKSwizzleNetworkDelegates: false,
    kTSKPinnedDomains: [
        "api.myapp.com": [
            kTSKEnforcePinning: true,
            kTSKPublicKeyHashes: [
                "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", // Primary
                "BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB=", // Backup
            ],
        ]
    ]
]

TrustKit.initSharedInstance(withConfiguration: trustKitConfig)
```

##### React Native Implementation
```typescript
import { fetch } from 'react-native-ssl-pinning';

const response = await fetch('https://api.myapp.com/data', {
  method: 'GET',
  sslPinning: {
    certs: ['api_myapp_com'], // .cer file in native assets
  },
  headers: { Authorization: `Bearer ${token}` },
});
```

##### Certificate Rotation Strategy
- Always pin at least **two public keys**: the current key and a backup key.
- Generate the backup key pair in advance and store it securely.
- When rotation is needed, deploy the new certificate using the backup key, then update the app's pin list to include the next backup.
- For apps with infrequent updates, use a **pinning configuration endpoint** fetched at startup (signed and verified) to update pins dynamically.

#### 2. OWASP Mobile Top 10 (2024)

| # | Vulnerability | Description | React Native Mitigation |
| :--- | :--- | :--- | :--- |
| **M1** | Improper Credential Usage | Hardcoded API keys, tokens in source code | Store secrets in native Keychain/Keystore; use environment variables at build time; never commit credentials |
| **M2** | Inadequate Supply Chain Security | Vulnerable or malicious third-party dependencies | Audit with `npm audit`, pin dependency versions, use lockfiles, verify package provenance |
| **M3** | Insecure Authentication/Authorization | Weak login flows, missing session validation | Implement OAuth2 + PKCE, validate tokens server-side, use biometric auth for sensitive operations |
| **M4** | Insufficient Input/Output Validation | SQL injection, XSS via WebViews, malformed data | Validate all inputs client-side and server-side; sanitize WebView content; use parameterized queries |
| **M5** | Insecure Communication | Unencrypted traffic, missing certificate validation | Enforce TLS 1.2+, implement SSL Pinning, disable cleartext traffic in Android Network Security Config |
| **M6** | Inadequate Privacy Controls | Excessive data collection, missing consent | Implement GDPR consent flows, minimize data collection, anonymize analytics, provide data deletion |
| **M7** | Insufficient Binary Protections | Reverse engineering, code tampering | Enable ProGuard/R8 obfuscation, use Hermes bytecode, detect rooted/jailbroken devices, implement integrity checks |
| **M8** | Security Misconfiguration | Debug mode in production, exposed dev endpoints | Strip debug configs in release builds, disable React Native dev menu, configure proper Network Security Config |
| **M9** | Insecure Data Storage | Sensitive data in AsyncStorage, logs, or backups | Use `react-native-keychain` for tokens, MMKV with encryption for sensitive data, disable backup for sensitive files |
| **M10** | Insufficient Cryptography | Weak algorithms, hardcoded keys, improper key management | Use platform Keystore/Keychain for key storage, AES-256-GCM for encryption, avoid MD5/SHA1 for security |

#### 3. API Security for Mobile Apps

##### OAuth2 + PKCE Flow (Proof Key for Code Exchange)
Mobile apps are **public clients** (they cannot securely store a client secret). PKCE prevents authorization code interception attacks:

```text
1. App generates random code_verifier (43-128 chars)
2. App computes code_challenge = SHA256(code_verifier) → Base64URL
3. App opens browser → Authorization Server with code_challenge
4. User authenticates → Server returns authorization_code
5. App sends authorization_code + code_verifier to Token Endpoint
6. Server verifies SHA256(code_verifier) == stored code_challenge
7. Server issues access_token + refresh_token
```

```typescript
import { authorize } from 'react-native-app-auth';

const config = {
  issuer: 'https://auth.myapp.com',
  clientId: 'mobile-app-client',
  redirectUrl: 'com.myapp://oauth/callback',
  scopes: ['openid', 'profile', 'offline_access'],
  usePKCE: true, // Automatically handles code_verifier/code_challenge
};

const authResult = await authorize(config);
// Store tokens securely
await Keychain.setGenericPassword('tokens', JSON.stringify({
  accessToken: authResult.accessToken,
  refreshToken: authResult.refreshToken,
}));
```

##### HMAC Request Signing
Sign API requests to prove they originated from your app and were not tampered with:
```typescript
import { HmacSHA256 } from 'crypto-js';

function signRequest(method: string, path: string, body: string, timestamp: string) {
  const message = `${method}\n${path}\n${timestamp}\n${body}`;
  const signature = HmacSHA256(message, SHARED_SECRET).toString();

  return {
    'X-Timestamp': timestamp,
    'X-Signature': signature,
  };
}
```

##### Request Replay Prevention
- Include a **nonce** (unique random string) and **timestamp** in every request.
- Server validates: (1) timestamp is within a 5-minute window, (2) nonce has not been seen before (stored in Redis with TTL).
- Rejects duplicate nonces and expired timestamps, preventing replay attacks.

##### Secure Token Storage

| Platform | Secure Storage | Mechanism | Access Control |
| :--- | :--- | :--- | :--- |
| **iOS** | Keychain Services | Hardware-backed encryption (Secure Enclave) | Biometric or passcode gated |
| **Android** | Android Keystore | Hardware-backed key storage (TEE/StrongBox) | BiometricPrompt or device credential |
| **React Native** | `react-native-keychain` | Abstraction over Keychain + Keystore | `accessControl: BIOMETRY_ANY` |

**Critical Rule**: Never store tokens in `AsyncStorage` (plaintext, accessible via device backup), `SharedPreferences` (plaintext XML), or `UserDefaults` (unencrypted plist).

> *"How do you implement SSL Pinning in a React Native app?"*

- **Strategic Response**: I implement public key pinning rather than certificate pinning to survive certificate rotations. On Android, I configure OkHttp's `CertificatePinner` with SHA-256 hashes of the server's public key, adding both the primary and a backup key hash. On iOS, I use TrustKit to configure pinning declaratively. For the React Native layer, `react-native-ssl-pinning` wraps these native implementations. I always pin at least two keys—the current and a pre-generated backup—so certificate rotation doesn't require an emergency app update. In CI, I add a test that verifies the pinned endpoints are reachable to catch accidental pin mismatches before release.

> *"What is PKCE and why is it important for mobile OAuth?"*

- **Strategic Response**: PKCE (Proof Key for Code Exchange) is an extension to the OAuth2 authorization code flow designed for public clients like mobile apps that cannot securely store a client secret. Without PKCE, an attacker who intercepts the authorization code (via a malicious app registered on the same redirect URI scheme) could exchange it for tokens. PKCE prevents this by having the app generate a random `code_verifier`, send its SHA-256 hash as `code_challenge` during authorization, and then prove possession of the original verifier during token exchange. The server verifies the hash matches, ensuring only the app that initiated the flow can complete it.

> *"How do you prevent API replay attacks from a mobile app?"*

- **Strategic Response**: I implement a three-layer defense. First, every request includes a timestamp and a cryptographic nonce. The server rejects requests with timestamps older than 5 minutes (clock skew tolerance). Second, the server stores seen nonces in Redis with a 5-minute TTL and rejects duplicates. Third, I sign the entire request (method, path, body, timestamp, nonce) using HMAC-SHA256 with a shared secret. The server recomputes the signature and rejects mismatches. This combination ensures requests cannot be replayed, tampered with, or forged. For additional security, the HMAC secret is stored in native Keystore/Keychain, not in the JavaScript bundle.

> *"Name 5 OWASP Mobile Top 10 vulnerabilities and how you mitigate them in React Native."*

- **Strategic Response**: (1) **Insecure Data Storage (M9)**: I use `react-native-keychain` for tokens and encrypted MMKV for sensitive data—never AsyncStorage. (2) **Insecure Communication (M5)**: I enforce TLS 1.2+ with SSL Pinning using public key hashes, and disable cleartext traffic in Android's Network Security Config. (3) **Insecure Authentication (M3)**: I implement OAuth2 with PKCE for all authentication flows and add biometric verification for sensitive operations. (4) **Insufficient Binary Protections (M7)**: I enable R8/ProGuard for Android obfuscation, ship Hermes bytecode instead of readable JS, and detect rooted/jailbroken devices at startup. (5) **Security Misconfiguration (M8)**: I strip the React Native dev menu in release builds, remove console logs, and ensure debug configurations are never packaged into production binaries.


---


---
