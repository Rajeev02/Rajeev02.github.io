## 📊 Section 25: Analytics & Monitoring Deep-Dive

*⏱️ 3 min read*

#### 1. GA4 (Google Analytics 4)
GA4 uses an **event-based data model** (replacing Universal Analytics' session-based model). Every user interaction is an event with parameters.

- **Key Events**: `screen_view`, `purchase`, `sign_up`, `login`, `search`, `share`, and custom events.
- **User Properties**: Persistent attributes attached to a user (e.g., `subscription_tier`, `preferred_language`).
- **Integration**:
  ```typescript
  import analytics from '@react-native-firebase/analytics';

  // Log screen view
  await analytics().logScreenView({
    screen_name: 'ProductDetails',
    screen_class: 'ProductDetailsScreen',
  });

  // Log custom event
  await analytics().logEvent('add_to_cart', {
    item_id: 'SKU_12345',
    item_name: 'Premium Widget',
    value: 29.99,
    currency: 'USD',
  });

  // Set user property
  await analytics().setUserProperty('subscription_tier', 'premium');
  ```
- **Funnels**: Define conversion funnels (e.g., `screen_view(ProductList) → screen_view(ProductDetail) → add_to_cart → purchase`) to measure drop-off rates at each stage.

#### 2. Segment (Customer Data Platform)
**Segment** is a customer data platform that acts as a single integration point. Instead of embedding 10 separate analytics SDKs, you send events to Segment, which routes them to configured destinations.

```text
[Mobile App] → Segment SDK → ┬→ GA4
                               ├→ Amplitude
                               ├→ Mixpanel
                               ├→ Sentry
                               ├→ Braze (Marketing)
                               └→ Data Warehouse (BigQuery)
```

- **Integration**:
  ```typescript
  import { createClient } from '@segment/analytics-react-native';

  const segmentClient = createClient({ writeKey: 'YOUR_WRITE_KEY' });

  // Track event
  segmentClient.track('Order Completed', {
    orderId: 'ORD-9876',
    total: 149.99,
    currency: 'USD',
  });

  // Identify user
  segmentClient.identify('user-123', {
    email: 'user@example.com',
    plan: 'enterprise',
  });
  ```

- **GDPR Consent Management**: Segment supports category-based consent. You configure which destinations require consent, and the SDK only sends events to destinations the user has opted into.

#### 3. Amplitude
**Amplitude** is a product analytics platform focused on user behavior analysis, cohort segmentation, and experimentation.

- **Event Taxonomy Design**: Structure events hierarchically (e.g., `Feature.Action.Detail` → `Cart.Item.Added`). Maintain a centralized event taxonomy document that all teams reference.
- **Behavioral Cohorts**: Group users by behavior patterns (e.g., "Users who added to cart but did not purchase in 7 days") for targeted engagement.
- **Integration**:
  ```typescript
  import { track, identify, Identify } from '@amplitude/analytics-react-native';

  // Track event
  track('Product Viewed', { productId: 'SKU_123', category: 'Electronics' });

  // Identify user with properties
  const identifyObj = new Identify().set('plan', 'premium').set('region', 'US');
  identify(identifyObj);
  ```

#### 4. Datadog
**Datadog** provides Application Performance Monitoring (APM) and Real User Monitoring (RUM) for mobile apps.

- **RUM Features**: Session replay (visual replay of user sessions), error tracking, resource timing (API call durations), long task detection, and frustration signals (rage taps).
- **Log Management**: Structured logging from the mobile app, searchable and correlated with backend traces.
- **Integration**:
  ```typescript
  import { DdSdkReactNative, DdSdkReactNativeConfiguration } from '@datadog/mobile-react-native';

  const config = new DdSdkReactNativeConfiguration(
    'DD_CLIENT_TOKEN',
    'DD_ENVIRONMENT', // 'production' | 'staging'
    'DD_APPLICATION_ID',
    true, // track interactions
    true, // track resources (network)
    true, // track errors
  );

  await DdSdkReactNative.initialize(config);
  ```

- **When to Use Datadog vs Sentry**: Datadog excels at infrastructure monitoring, APM, and full-stack observability (correlating mobile errors with backend latency). Sentry excels at developer-focused error debugging with richer source map support, breadcrumbs, and issue grouping. Many teams use both: Sentry for crash debugging, Datadog for performance monitoring.

#### 5. Monitoring Architecture Decision Matrix

| Tool | Primary Use Case | Strengths | When to Choose |
| :--- | :--- | :--- | :--- |
| **Firebase Analytics** | Product analytics, marketing funnels | Free, deep Google Ads integration | Default for startups, marketing-driven apps |
| **Sentry** | Crash reporting, error diagnostics | Best-in-class symbolication, breadcrumbs | Every production app (error monitoring is non-negotiable) |
| **GA4** | Web + App unified analytics | Cross-platform attribution, Google ecosystem | When marketing/product teams need Google-integrated funnels |
| **Segment** | Data pipeline, multi-destination routing | Single SDK, GDPR controls, warehouse sync | When integrating 3+ analytics/marketing tools |
| **Amplitude** | Product behavior analytics, experiments | Cohorts, retention analysis, A/B testing | Data-driven product teams optimizing conversion |
| **Datadog** | Full-stack APM, RUM, infrastructure | Session replay, distributed tracing, logs | Enterprise apps needing backend correlation |
| **Azure App Insights** | Enterprise APM, Microsoft ecosystem | End-to-end Azure trace correlation | Microsoft-stack enterprises, B2B apps |

> *"How would you design an analytics architecture for a 10M user app?"*

- **Strategic Response**: I would use a layered approach. Segment as the central data pipeline—one SDK integration in the app that routes events to all downstream destinations. Sentry for crash and error monitoring with full source map symbolication. Amplitude for product analytics, cohort analysis, and A/B testing. Datadog RUM for performance monitoring, session replay, and correlating client errors with backend API latency. Firebase Remote Config for feature flags. All events flow through Segment, reducing SDK bloat and enabling destination changes without app updates. For GDPR, Segment's consent management gates event routing per user preference.

> *"How do you handle analytics consent and GDPR?"*

- **Strategic Response**: I implement a consent management layer that presents a consent modal on first launch with granular categories: Essential (crash reporting), Analytics (usage tracking), Marketing (attribution). User preferences are stored locally in MMKV and synced to the backend. The analytics initialization code checks consent state before enabling each SDK. Segment's consent-based filtering ensures events only reach destinations the user has approved. We also implement data deletion APIs so users can request their data be purged from all downstream systems.

---


---
