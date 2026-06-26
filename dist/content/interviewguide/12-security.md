# 12-Security.md

# Security for Senior React Native Developers

---

# 1. What is Mobile App Security?

## Definition

Mobile App Security is the practice of protecting applications, user data, APIs, and devices from unauthorized access, attacks, and vulnerabilities.

---

## Why Is Security Important?

Applications store:

* User Information
* Banking Data
* Authentication Tokens
* Personal Information
* Payment Details

A security breach can result in:

* Data Theft
* Financial Loss
* Compliance Violations
* Reputation Damage

---

## Interview Answer

"Mobile app security focuses on protecting user data, authentication systems, API communication, and device interactions from potential threats."

---

# 2. Authentication vs Authorization

## Authentication

Verifies who the user is.

Example:

```text
Username + Password
```

---

## Authorization

Determines what the user can access.

Example:

```text
Admin
↓
Can Manage Users

User
↓
Can View Profile
```

---

## Interview Answer

"Authentication verifies identity, while authorization determines access permissions."

---

# 3. What is JWT?

## Definition

JWT (JSON Web Token) is a compact token used for authentication and authorization.

---

## Structure

```text
Header
.
Payload
.
Signature
```

Example:

```text
xxxxx.yyyyy.zzzzz
```

---

## Flow

```text
Login
 ↓
Backend
 ↓
JWT Token
 ↓
Store Securely
 ↓
Send With Requests
```

---

## Authorization Header

```http
Authorization:
Bearer <token>
```

---

## Interview Answer

"JWT is a token-based authentication mechanism that allows stateless user authentication."

---

# 4. Access Token vs Refresh Token

## Access Token

Short-lived token.

Example:

```text
15 Minutes
```

Used for:

```text
API Requests
```

---

## Refresh Token

Long-lived token.

Example:

```text
30 Days
```

Used for:

```text
Generate New Access Token
```

---

## Flow

```text
Access Token Expired
          ↓
Refresh Token
          ↓
New Access Token
          ↓
Retry Request
```

---

## Interview Answer

"Access tokens authenticate API requests, while refresh tokens obtain new access tokens without requiring users to log in again."

---

# 5. OAuth 2.0

## Definition

OAuth is an authorization framework that allows third-party login.

---

## Examples

* Google Login
* Facebook Login
* Apple Login
* Microsoft Login

---

## Flow

```text
User
 ↓
Google Login
 ↓
Authorization Code
 ↓
Backend
 ↓
Access Token
```

---

## Interview Answer

"OAuth allows applications to access user information from third-party providers without exposing credentials."

---

# 6. Where Should Tokens Be Stored?

## Wrong

```text
AsyncStorage
```

Reason:

```text
Not Encrypted
```

---

## Recommended

### Android

```text
Keystore
```

---

### iOS

```text
Keychain
```

---

## Libraries

```text
react-native-keychain
expo-secure-store
```

---

## Interview Answer

"Sensitive tokens should be stored in Keychain or Keystore rather than AsyncStorage."

---

# 7. AsyncStorage vs Secure Storage

| Feature     | AsyncStorage | Keychain/Keystore |
| ----------- | ------------ | ----------------- |
| Encrypted   | ❌            | ✅                 |
| Secure      | ❌            | ✅                 |
| Tokens      | ❌            | ✅                 |
| Preferences | ✅            | ✅                 |

---

## Interview Answer

"AsyncStorage is suitable for non-sensitive data, while Keychain and Keystore should be used for authentication tokens."

---

# 8. HTTPS

## Definition

HTTPS encrypts communication between client and server.

---

## Flow

```text
App
 ↓
HTTPS
 ↓
Server
```

---

## Benefits

* Encryption
* Integrity
* Authentication

---

## Interview Answer

"HTTPS protects data in transit and should always be used in production applications."

---

# 9. SSL/TLS

## Definition

SSL/TLS protocols secure network communication.

---

## Flow

```text
App
 ↓
TLS Handshake
 ↓
Encrypted Connection
 ↓
Server
```

---

## Interview Answer

"TLS encrypts communication channels and protects against network interception attacks."

---

# 10. Certificate Pinning

## Definition

Certificate Pinning ensures the application trusts only a specific server certificate.

---

## Why Do We Need It?

Prevents:

```text
Man-In-The-Middle (MITM)
```

attacks.

---

## Flow

```text
App
 ↓
Verify Certificate
 ↓
Server
```

---

## Library

```text
react-native-ssl-pinning
```

---

## Interview Answer

"Certificate pinning prevents attackers from intercepting traffic using fraudulent certificates."

---

# 11. Man-In-The-Middle (MITM) Attack

## Definition

An attacker intercepts communication between app and server.

---

## Flow

```text
App
 ↓
Attacker
 ↓
Server
```

---

## Protection

* HTTPS
* Certificate Pinning
* Secure APIs

---

## Interview Answer

"MITM attacks intercept network traffic and can be mitigated using TLS and certificate pinning."

---

# 12. API Security Best Practices

## Use HTTPS

---

## Validate Tokens

---

## Short-Lived Access Tokens

---

## Refresh Token Rotation

---

## Rate Limiting

---

## Input Validation

---

## Interview Answer

"API security requires encrypted communication, token validation, input sanitization, and proper authorization checks."

---

# 13. Data Encryption

## Definition

Encryption converts readable data into unreadable data.

---

## Example

```text
Original:
password123

Encrypted:
X7A2K91P...
```

---

## Types

### At Rest

Stored data.

---

### In Transit

Network communication.

---

## Interview Answer

"Encryption protects sensitive information both during storage and transmission."

---

# 14. Secure Local Storage

## Store Securely

### JWT

### Refresh Tokens

### API Secrets

### Credentials

---

## Avoid Storing

### Passwords

### Sensitive User Data

---

## Interview Answer

"Only essential sensitive data should be securely stored using platform-provided encryption mechanisms."

---

# 15. Root Detection (Android)

## Definition

Detects rooted devices.

---

## Why?

Rooted devices bypass security restrictions.

---

## Risks

* Data Theft
* Reverse Engineering
* Tampering

---

## Libraries

```text
jail-monkey
```

---

## Interview Answer

"Root detection helps identify compromised Android devices that may expose application data."

---

# 16. Jailbreak Detection (iOS)

## Definition

Detects jailbroken devices.

---

## Risks

* Security Bypass
* Data Extraction
* App Tampering

---

## Interview Answer

"Jailbreak detection helps protect applications from running on compromised iOS devices."

---

# 17. Code Obfuscation

## Definition

Makes source code difficult to understand.

---

## Android

```text
ProGuard
R8
```

---

## Benefits

* Harder Reverse Engineering
* Better Protection

---

## Interview Answer

"Code obfuscation reduces the risk of reverse engineering and code tampering."

---

# 18. Environment Variables

## Why?

Avoid hardcoding secrets.

---

## Wrong

```javascript
const API_KEY =
 "secret-key";
```

---

## Better

```text
.env
```

---

## Libraries

```text
react-native-config
```

---

## Interview Answer

"Sensitive configuration should be managed through environment variables rather than hardcoded values."

---

# 19. Secure Authentication Flow

## Enterprise Flow

```text
Login
 ↓
Backend
 ↓
Access Token
 ↓
Keychain/Keystore

API Request
 ↓
Authorization Header
 ↓
Backend

Token Expired
 ↓
Refresh Token
 ↓
New Access Token
```

---

## Interview Answer

"A secure authentication flow uses short-lived access tokens, refresh tokens, secure storage, and HTTPS communication."

---

# 20. Biometrics Authentication

## Definition

Authentication using device biometrics.

---

## Examples

* Fingerprint
* Face ID
* Touch ID

---

## Libraries

```text
react-native-biometrics
expo-local-authentication
```

---

## Benefits

* Better UX
* Additional Security Layer

---

## Interview Answer

"Biometric authentication provides a secure and convenient method for verifying user identity."

---

# 21. App Tampering Detection

## Definition

Detects modifications to application binaries.

---

## Risks

* Modified APK
* Repackaged App
* Malicious Changes

---

## Protection

* Integrity Checks
* Play Integrity API
* App Attest

---

## Interview Answer

"Tampering detection helps prevent modified applications from compromising security."

---

# 22. OWASP Mobile Top Risks

## Common Risks

### Insecure Storage

---

### Weak Authentication

---

### Insecure Communication

---

### Insufficient Cryptography

---

### Reverse Engineering

---

### Code Tampering

---

## Interview Answer

"OWASP Mobile Top 10 highlights the most critical mobile application security risks."

---

# 23. Security Checklist

## Authentication

✅ JWT

✅ Refresh Tokens

---

## Storage

✅ Keychain

✅ Keystore

---

## Networking

✅ HTTPS

✅ Certificate Pinning

---

## Device Security

✅ Root Detection

✅ Jailbreak Detection

---

## App Security

✅ Obfuscation

✅ Environment Variables

---

## Monitoring

✅ Logging

✅ Crash Reporting

---

# 24. Enterprise Security Architecture

```text
React Native
      ↓
HTTPS
      ↓
Axios Interceptors
      ↓
JWT Authentication
      ↓
Refresh Tokens
      ↓
Keychain / Keystore
      ↓
Backend APIs
```

---

## Benefits

* Secure Communication
* Secure Storage
* Scalable Authentication
* Enterprise Ready

---

# 25. Most Asked Interview Questions

1. Authentication vs Authorization?
2. What is JWT?
3. JWT Structure?
4. Access Token vs Refresh Token?
5. How does OAuth work?
6. Where should JWT tokens be stored?
7. AsyncStorage vs Keychain?
8. What is HTTPS?
9. What is TLS?
10. What is Certificate Pinning?
11. What is MITM Attack?
12. How do you secure APIs?
13. What is Encryption?
14. Root vs Jailbreak Detection?
15. What is Code Obfuscation?
16. Why use Environment Variables?
17. How do you secure authentication?
18. What are biometrics?
19. What is app tampering?
20. What are OWASP Mobile Risks?

---

# Ultimate Senior Interview Answer

"In enterprise React Native applications, I use JWT-based authentication with short-lived access tokens and refresh tokens stored securely in Keychain or Keystore. All communication is secured using HTTPS and certificate pinning. I implement root and jailbreak detection, code obfuscation, secure environment configuration, biometric authentication, and proper API authorization controls. Security is integrated throughout the application lifecycle rather than being treated as a separate feature."

---

# Daily Revision Plan

```text
Authentication            5 min
JWT + Refresh Tokens      5 min
OAuth                     3 min
Storage Security          5 min
HTTPS + TLS               3 min
Certificate Pinning       5 min
Encryption                3 min
Root/Jailbreak            3 min
Security Architecture     5 min

Total: ~37 Minutes
```
