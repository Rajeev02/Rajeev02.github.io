To reframe your question with the correct enterprise engineering terminology:

> **"How do we implement Deferred Deep Linking and Attributed Referral Tracking in React Native when a user does not have the app pre-installed?"**

This is a classic mobile growth problem. A standard deep link fails if the app isn't installed. To solve this, you need a mechanism that routes the user to the appropriate App Store, waits for them to install it, and **remembers the referral data even after the app is launched for the first time.**

---

## 1. The Core Architecture: Deferred Deep Linking

Standard deep linking works when the app is already installed on the device. **Deferred Deep Linking** "defers" or postpones the deep link routing until _after_ the user downloads the application from the App Store or Google Play Store.

### The Execution Lifecycle:

1. **The Click:** An unauthenticated user clicks a referral link in an email: `https://finance.app.link/refer?referrerId=user_999`.
2. **The Cloud Fingerprint / Match:** The link hits a cloud attribution server (like **Branch.io** or **AppsFlyer**). The server logs the user's temporary device metadata (IP address, OS version, screen resolution, device brand).
3. **The Redirect:** Since the app isn't installed, the cloud server routes the user to the Apple App Store or Google Play Store.
4. **The Install & First Launch:** The user installs the app and opens it for the first time.
5. **The Attribution Handshake:** Upon cold boot, the SDK inside your React Native app queries the attribution server, passing the current device's metadata. The server matches it with the click log from Step 2.
6. **The Payload Delivery:** The server returns the original query parameters (`referrerId=user_999`) back to your React Native application, allowing you to reward the referrer.

---

## 2. Industry Standard Platforms

Writing this from scratch using raw native code is incredibly unreliable due to strict iOS and Android privacy sandboxes (like iOS App Tracking Transparency). In enterprise codebases, we use trusted Mobile Measurement Partners (MMPs):

1. **Branch.io** (Most popular for deep linking and referrals)
2. **AppsFlyer** (Excellent for deep attribution and marketing analytics)
3. **Firebase Dynamic Links** (_Note for Senior Engineers: Google has deprecated Firebase Dynamic Links, so do not recommend it for new systems in 2026. Stick to Branch or AppsFlyer._)

---

## 3. Production Code Implementation (Using Branch SDK)

Here is how you set up the attribution listener inside your application's root file (`App.tsx`) to capture referral parameters immediately on a cold boot.

```typescript
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import branch from 'react-native-branch'; // Enterprise Standard SDK

export default function App() {

  useEffect(() => {
    // Subscribe to Branch deep link and attribution events
    const unsubscribe = branch.subscribe({
      onInitSuccess: ({ params, error }) => {
        if (error) {
          console.error('Branch initialization error:', error);
          return;
        }

        // 1. Check if this launch was triggered by a deep link or deferred link
        if (params && params['+clicked_branch_link']) {

          // 2. Identify if this is a first-time install attribution event
          const isFirstInstall = params['+is_first_session'] === true;

          // 3. Extract your custom referral metadata parameters
          const referrerId = params['referrerId'];
          const campaignName = params['~campaign'];

          if (referrerId) {
            console.log(`Attribution Matched! Referrer: ${referrerId}, Campaign: ${campaignName}`);

            if (isFirstInstall) {
              // Execute your enterprise tracking or reward logic
              handleNewInstallReferral(referrerId, campaignName);
            } else {
              // Standard deep link handling for existing users
              handleStandardDeepLink(params);
            }
          }
        }
      },
    });

    // Clean up the native event listener when the app context unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const handleNewInstallReferral = (referrerId: string, campaign: string) => {
    Alert.alert(
      "Welcome Bonus!",
      `Account verified. Crediting referral tracking points associated with executive: ${referrerId} under campaign: ${campaign}`
    );
    [cite_start]// Real-world: Dispatch this to your backend database endpoint via Axios/React Query [cite: 404-406]
    // api.post('/claim-referral', { referrerId });
  };

  const handleStandardDeepLink = (params: any) => {
    [cite_start]// Standard routing logic [cite: 10]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Enterprise Mobile Gateway</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F172A' },
  text: { color: '#FFF', fontSize: 16, fontWeight: '600' }
});

```
