> 🎯 **Topic:** 11.3 🔧 CI/CD Expansion — Bitrise, Azure DevOps & Feature Flags
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## 11.3 🔧 CI/CD Expansion — Bitrise, Azure DevOps & Feature Flags

*⏱️ 3 min read*

#### 1. Bitrise
**Bitrise** is a mobile-first CI/CD platform with pre-built workflow steps optimized for iOS and Android builds.

- **Workflow Structure**:
  ```text
  [Git Clone] → [Install Node Dependencies] → [Run ESLint + TypeScript Check]
       → [Run Jest Tests] → [Install CocoaPods (iOS)] → [Build Android APK/AAB]
       → [Build iOS IPA] → [Run Detox E2E Tests] → [Deploy to TestFlight / Play Console]
  ```

- **Key Advantages**:
  - Pre-built steps for React Native, Fastlane, Detox, and code signing.
  - macOS build machines available by default (required for iOS builds).
  - Triggers: push to branch, pull request, tag-based releases.
  - Caching for `node_modules`, Gradle, and CocoaPods to speed up builds.

##### Bitrise vs. GitHub Actions for Mobile

| Feature | Bitrise | GitHub Actions |
| :--- | :--- | :--- |
| **macOS Runners** | Included (all plans) | Available but expensive (3x Linux cost) |
| **Mobile-Specific Steps** | 200+ pre-built mobile steps | Requires community actions or custom scripts |
| **Code Signing** | Built-in certificate/profile management | Manual setup via secrets + Fastlane |
| **Learning Curve** | Visual workflow editor (low barrier) | YAML-based (developer-friendly) |
| **Pricing** | Per-build-minute, mobile-optimized | Per-minute, general-purpose |
| **Best For** | Mobile-only teams, less DevOps experience | Teams with existing GitHub ecosystem, multi-platform CI |

#### 2. Azure DevOps Pipelines
**Azure DevOps** provides enterprise-grade CI/CD with Role-Based Access Control (RBAC), audit logs, and compliance features.

- **Pipeline Configuration** (YAML):
  ```text
  trigger:
    branches:
      include: [main, release/*]

  pool:
    vmImage: 'macos-latest'  # Required for iOS builds

  steps:
    - task: NodeTool@0
      inputs:
        versionSpec: '20.x'

    - script: npm ci
      displayName: 'Install Dependencies'

    - script: npx eslint . --max-warnings 0
      displayName: 'Run ESLint'

    - script: npx tsc --noEmit
      displayName: 'TypeScript Check'

    - script: npx jest --ci --coverage
      displayName: 'Run Tests'

    - task: Gradle@3
      inputs:
        workingDirectory: 'android'
        gradleWrapperFile: 'android/gradlew'
        tasks: 'bundleRelease'
      displayName: 'Build Android AAB'

    - task: Xcode@5
      inputs:
        actions: 'build'
        scheme: 'MyApp'
        configuration: 'Release'
      displayName: 'Build iOS'
  ```

- **Enterprise Advantages**: Azure Active Directory integration for RBAC, build approval gates (require manager sign-off before production deploys), artifact retention policies, and integration with Azure Boards for work item tracking.

#### 3. Feature Flags & Phased Rollouts
**Feature flags** are runtime toggles that enable or disable features without deploying new code. They decouple deployment from release, allowing you to ship code to production while controlling who sees it.

##### Firebase Remote Config Implementation
```typescript
import remoteConfig from '@react-native-firebase/remote-config';

// Set defaults (used before server values are fetched)
await remoteConfig().setDefaults({
  new_checkout_enabled: false,
  max_cart_items: 10,
});

// Fetch and activate server values
await remoteConfig().fetchAndActivate();

// Read flag value
const isNewCheckoutEnabled = remoteConfig().getValue('new_checkout_enabled').asBoolean();

// Use in component
function CheckoutScreen() {
  const showNewCheckout = remoteConfig().getValue('new_checkout_enabled').asBoolean();

  return showNewCheckout ? <NewCheckoutFlow /> : <LegacyCheckoutFlow />;
}
```

##### LaunchDarkly Integration Pattern
```typescript
import { useBoolVariation } from '@launchdarkly/react-native-client-sdk';

function PaymentButton() {
  const useNewPaymentFlow = useBoolVariation('new-payment-flow', false);

  return useNewPaymentFlow ? <NewPaymentButton /> : <LegacyPaymentButton />;
}
```

##### Phased Rollout Strategy

```text
Stage 1: Internal Dogfooding (1%)
  → Enable flag for internal employees only
  → Monitor crash-free rate, error logs, performance metrics

Stage 2: Beta Testers (5%)
  → Expand to opt-in beta users
  → Collect qualitative feedback + quantitative metrics

Stage 3: Staged Production Rollout
  → 10% → Monitor 24h → 25% → Monitor 24h → 50% → Monitor 48h → 100%
  → At each stage, compare crash rates and key business metrics against baseline

Kill Switch: If crash-free rate drops below 99.5% or error rate spikes 2x,
  → Immediately set flag to false (instant rollback, no app update needed)
```

> *"How would you implement feature flags in a React Native app?"*

- **Strategic Response**: I use Firebase Remote Config for simple boolean/string flags and LaunchDarkly for advanced targeting (user segments, percentage rollouts, A/B experiments). Flags are fetched at app startup with `fetchAndActivate()` and cached locally. Default values are set in code so the app functions correctly even if the fetch fails. For critical features like payments, I wrap the feature in a flag check component and implement a kill switch—a single flag that can disable the feature instantly across all users without an app update. Flags are evaluated on the client side, so changes propagate within the configured cache TTL (typically 12 hours for Remote Config, real-time for LaunchDarkly).

> *"How do you manage phased rollouts for a critical payment feature?"*

- **Strategic Response**: I follow a five-stage rollout. First, internal dogfooding at 1% traffic with the flag enabled only for employees—we verify crash-free rate, transaction success rate, and error logs. Second, expand to 5% beta users with opt-in. Third, staged production: 10% for 24 hours, monitoring crash-free sessions and payment completion rates against a control group. If metrics hold, increase to 25%, then 50%, then 100%. At every stage, I set a kill switch threshold: if crash-free rate drops below 99.5% or payment failures increase by 2x, the flag is automatically disabled via server-side rules. The key is that feature flags make this a server-side configuration change—no app update required for rollback.

---


---

---
