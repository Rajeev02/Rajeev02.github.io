
## Page Summary
### Reading Time
`3 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 📦 Section 15: Over-the-Air (OTA) Updates & In-App Purchases (IAP) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 📦 Section 15: Over-the-Air (OTA) Updates & In-App Purchases (IAP)

*⏱️ 2 min read*

#### 1. Over-the-Air (OTA) Bundle Delivery
OTA systems bypass store approval times for JavaScript-only updates. For interviews, explain the general OTA model first, then mention that **Expo/EAS Updates** is common for Expo or CNG-based apps, while bare RN teams may use a self-hosted or New-Architecture-compatible OTA provider. Do not present Microsoft App Center CodePush as the default managed service for new projects, because the App Center service has been retired.
- **Handshake Flow**: On launch, the native app shell calls the update registry API, passing the current binary version and active bundle hash. If a new bundle version matches the query, the client downloads the file in the background. On the next restart, the path reference shifts to execute the new Hermes bytecode.
- **Binary Version Locks**: Native module libraries are compiled directly into APKs/IPAs. If an OTA update pushes new JS code that attempts to invoke a native API that does not exist in the client’s running binary code, it triggers an instant fatal crash. 
  - *Mitigation*: OTA configurations enforce strict runtime locks mapping JS bundles to specific app binary version ranges.
- **Rollback Systems**: The native update shell tracks initialization success. If the app crashes repeatedly within a few minutes of executing an OTA bundle, the native runner cancels the reference pointer and rolls back to the stable local embedded bundle.

#### 2. In-App Purchases & Subscription Lifecycles
- **Client flow**: Standard libraries like `react-native-iap` fetch products and coordinate checkout transactions with Apple's StoreKit 2 and Google Play Billing.
- **Hacking Risks**: Jailbroken devices can use local receipt-bypass scripts to intercept the billing transaction success handler, returning a mock "success" payload without charging the user. Thus, client-side receipt parsing is highly insecure.
- **Secure Server-to-Server Validation Flow**:
  1. The app executes a checkout flow. Apple/Google returns an encrypted transaction receipt.
  2. The mobile app uploads this raw receipt to our secure backend database.
  3. The backend makes a cryptographic call to Apple's App Store Connect API / Google's Developer API to validate the receipt.
  4. Once validated by the store server, our database updates the user's subscription record, notifying the app.
  5. **Subscription Webhooks**: The backend registers webhook endpoints with Apple and Google. When a user renews, cancels, refunds, or has a billing issue, Apple/Google hits our server directly, keeping the system database accurate even if the user never opens the app.

---


---
