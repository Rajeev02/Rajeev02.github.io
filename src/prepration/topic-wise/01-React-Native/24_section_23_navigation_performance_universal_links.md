
## Page Summary
### Reading Time
`4 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🧭 Section 23: Navigation Performance & Universal Links |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 🧭 Section 23: Navigation Performance & Universal Links

*⏱️ 3 min read*

#### 1. Navigation Performance Optimization

##### Lazy Loading Screens
Loading all screens upfront increases initial bundle evaluation time and memory usage. Use `React.lazy` with React Navigation to defer screen component loading:

```typescript
import React, { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

const SettingsScreen = React.lazy(() => import('./screens/SettingsScreen'));
const AnalyticsScreen = React.lazy(() => import('./screens/AnalyticsScreen'));

function LazyScreen(Component: React.LazyExoticComponent<any>) {
  return (props: any) => (
    <Suspense fallback={<View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View>}>
      <Component {...props} />
    </Suspense>
  );
}

// In navigator
<Stack.Screen name="Settings" component={LazyScreen(SettingsScreen)} />
<Stack.Screen name="Analytics" component={LazyScreen(AnalyticsScreen)} />
```

##### react-native-screens & Native Stack
- **`react-native-screens`** converts React Navigation screens into native platform views (`Fragment` on Android, `UIViewController` on iOS) instead of keeping them as JS-managed `<View>` wrappers.
- **`@react-navigation/native-stack`** uses native navigation controllers, resulting in smoother transitions and lower memory usage compared to the JS-based `@react-navigation/stack`.
- **`enableFreeze()`**: Calling `enableFreeze()` from `react-native-screens` freezes all JS rendering for screens that are not currently visible. Frozen screens consume zero JS thread resources, which is critical for apps with deep navigation stacks or heavy tab navigators.
  ```typescript
  import { enableFreeze } from 'react-native-screens';
  enableFreeze(true); // Call once at app startup
  ```

##### Navigation State Persistence
Save and restore navigation state across app restarts (useful for development and enterprise apps):
```typescript
const [isReady, setIsReady] = React.useState(false);
const [initialState, setInitialState] = React.useState();

React.useEffect(() => {
  const restoreState = async () => {
    const savedState = storage.getString('NAVIGATION_STATE');
    if (savedState) setInitialState(JSON.parse(savedState));
    setIsReady(true);
  };
  restoreState();
}, []);

if (!isReady) return null;

<NavigationContainer
  initialState={initialState}
  onStateChange={(state) => storage.set('NAVIGATION_STATE', JSON.stringify(state))}
>
  {/* navigators */}
</NavigationContainer>
```

##### Tab Navigator Optimization
- Set `lazy={true}` (default) on Tab navigators to defer rendering of tab screens until the user first visits them.
- Combine with `enableFreeze()` to prevent background tabs from re-rendering.

#### 2. Universal Links (iOS) & App Links (Android)

##### Deep Links vs. Universal Links vs. App Links

| Type | Platform | Format | App Required? | Fallback |
| :--- | :--- | :--- | :--- | :--- |
| **URI Scheme Deep Links** | Both | `myapp://path` | Yes (fails silently if not installed) | None |
| **Universal Links** | iOS | `https://domain.com/path` | No (opens browser if not installed) | Safari |
| **App Links** | Android | `https://domain.com/path` | No (opens browser if not installed) | Chrome |

##### Universal Links (iOS)
1. **Server Configuration**: Host an `apple-app-site-association` (AASA) file at `https://yourdomain.com/.well-known/apple-app-site-association`:
   ```json
   {
     "applinks": {
       "apps": [],
       "details": [
         {
           "appIDs": ["TEAM_ID.com.myapp.bundleid"],
           "paths": ["/deals/*", "/profile/*"]
         }
       ]
     }
   }
   ```
2. **Xcode**: Enable **Associated Domains** capability and add `applinks:yourdomain.com`.
3. **React Navigation**: Configure the `linking` prop to handle incoming URLs and map them to screens.

##### App Links (Android)
1. **Server Configuration**: Host `assetlinks.json` at `https://yourdomain.com/.well-known/assetlinks.json`:
   ```json
   [{
     "relation": ["delegate_permission/common.handle_all_urls"],
     "target": {
       "namespace": "android_app",
       "package_name": "com.myapp",
       "sha256_cert_fingerprints": ["SHA256_OF_SIGNING_CERT"]
     }
   }]
   ```
2. **AndroidManifest.xml**: Add intent filters with `autoVerify="true"`:
   ```xml
   <intent-filter android:autoVerify="true">
     <action android:name="android.intent.action.VIEW" />
     <category android:name="android.intent.category.DEFAULT" />
     <category android:name="android.intent.category.BROWSABLE" />
     <data android:scheme="https" android:host="yourdomain.com" android:pathPrefix="/deals" />
   </intent-filter>
   ```

##### Handling in React Navigation
```typescript
const linking = {
  prefixes: ['https://yourdomain.com', 'myapp://'],
  config: {
    screens: {
      Deals: 'deals/:dealId',
      Profile: 'profile/:userId',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* navigators */}
</NavigationContainer>
```

> *"How do Universal Links differ from custom URI scheme deep links?"*

- **Strategic Response**: URI scheme deep links (`myapp://`) require the app to be installed—if it's not, nothing happens or the user sees an error. They also lack domain verification, meaning any app could register the same scheme. Universal Links (`https://domain.com/path`) are verified through a server-hosted AASA file tied to your Apple Team ID, ensuring only your app handles those URLs. If the app isn't installed, Universal Links gracefully fall back to Safari. They also bypass the disambiguation dialog that URI schemes can trigger.

> *"How do you handle deferred deep linking?"*

- **Strategic Response**: Deferred deep linking handles the case where a user clicks a link but doesn't have the app installed yet. The link redirects them to the App Store. After installation and first launch, the app must recover the original link context. Services like Branch SDK persist the referral data server-side (using fingerprinting or clipboard APIs) and deliver it to the app on first open. In React Navigation, you listen for the Branch callback in your root component and programmatically navigate to the target screen with the original parameters.

---


---
