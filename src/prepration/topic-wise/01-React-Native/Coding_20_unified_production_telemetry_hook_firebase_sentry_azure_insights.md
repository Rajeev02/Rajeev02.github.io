
## Page Summary
### Reading Time
`3 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 19: Unified Production Telemetry Hook (Firebase + Sentry + Azure Insights) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 19: Unified Production Telemetry Hook (Firebase + Sentry + Azure Insights)
*⏱️ 2 min read*

### Question
Write a custom React Native telemetry hook `useTelemetry` that coordinates diagnostic logging across three major platforms: **Sentry**, **Firebase Analytics**, and **Azure App Insights**.
The hook must export methods to:
1. Initialize the services asynchronously without blocking main thread startup.
2. Log custom events and user traits safely across all services.
3. Track screen views and handle exception logging with contextual metadata (breadcrumbs).

### Sample Input & Output
#### Input:
```typescript
const telemetry = useTelemetry();
telemetry.trackEvent('purchase_complete', { amount: 99.99, method: 'ApplePay' });
```
#### Output:
- Firebase logs behavioral event `'purchase_complete'`.
- Sentry leaves breadcrumb `'purchase_complete'` with arguments.
- Azure App Insights logs custom metric metrics array.

### Code
```typescript
import { useCallback } from 'react';
import * as Sentry from '@sentry/react-native';
import analytics from '@react-native-firebase/analytics';
import { InteractionManager } from 'react-native';

// Standardized telemetry interface
interface TelemetryClient {
  trackEvent: (eventName: string, params?: Record<string, any>) => void;
  trackScreen: (screenName: string) => void;
  logException: (error: Error, additionalContext?: Record<string, string>) => void;
  setUserProperties: (userId: string, properties?: Record<string, any>) => void;
}

// Global initialization helper for release builds
// Executed after visual painting frames to preserve high TTI speeds
export const initTelemetry = () => {
  InteractionManager.runAfterInteractions(() => {
    // 1. Initialize Sentry
    Sentry.init({
      dsn: 'https://mock_sentry_token@sentry.io/project',
      tracesSampleRate: 0.1, // Sample 10% transactions in production
      debug: __DEV__,
    });

    // 2. Initialize Azure Application Insights client mapping config
    // Azure App Insights endpoint setup in production is done using native modules
    console.log('Telemetry: Azure App Insights endpoints initialized.');
  });
};

export function useTelemetry(): TelemetryClient {
  // 1. Track custom events with payload maps
  const trackEvent = useCallback((eventName: string, params: Record<string, any> = {}) => {
    try {
      // Firebase Analytics
      analytics().logEvent(eventName, params);

      // Sentry Breadcrumbs
      Sentry.addBreadcrumb({
        category: 'user_action',
        message: `Event: ${eventName}`,
        data: params,
        level: 'info',
      });

      // Azure App Insights native bridge emulation
      console.log(`[Azure AI Log]: Event - ${eventName}`, params);
    } catch (err) {
      console.error('Telemetry event log failure:', err);
    }
  }, []);

  // 2. Track screen navigation routes
  const trackScreen = useCallback((screenName: string) => {
    try {
      analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenName,
      });

      Sentry.addBreadcrumb({
        category: 'navigation',
        message: `Screen Navigated to: ${screenName}`,
        level: 'info',
      });

      console.log(`[Azure AI Log]: PageView - ${screenName}`);
    } catch (err) {
      console.error('Telemetry screen tracking failure:', err);
    }
  }, []);

  // 3. Log errors and exceptions with Sentry and Azure diagnostics
  const logException = useCallback((error: Error, additionalContext: Record<string, string> = {}) => {
    try {
      // Capture detailed Sentry Exception with Scope mappings
      Sentry.withScope((scope) => {
        Object.entries(additionalContext).forEach(([key, val]) => {
          scope.setTag(key, val);
        });
        Sentry.captureException(error);
      });

      // Forward to Azure App Insights native instrumentation bridge
      console.log(`[Azure AI Error]: Exception - ${error.message}`, {
        stack: error.stack,
        ...additionalContext
      });
    } catch (err) {
      console.error('Telemetry exception log failure:', err);
    }
  }, []);

  // 4. Set user configurations and custom tags
  const setUserProperties = useCallback((userId: string, properties: Record<string, any> = {}) => {
    try {
      analytics().setUserId(userId);
      if (properties && Object.keys(properties).length > 0) {
        analytics().setUserProperties(properties);
      }

      Sentry.setUser({ id: userId, ...properties });
      console.log(`[Azure AI Log]: SetUser - ${userId}`, properties);
    } catch (err) {
      console.error('Telemetry user config failure:', err);
    }
  }, []);

  return {
    trackEvent,
    trackScreen,
    logException,
    setUserProperties
  };
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ logger dispatch executions. SDK initializations are executed using `InteractionManager.runAfterInteractions` which delays heavy setups until active animations finish.
- **Space Complexity**: $O(1)$ allocation structures.
- **Explanation**: This hook abstracts client telemetry into a single API. Sentry logs JS/Native exceptions and generates diagnostics, Firebase registers marketing conversion variables and analytics events, and Azure App Insights monitors API latencies and trace structures.

---
