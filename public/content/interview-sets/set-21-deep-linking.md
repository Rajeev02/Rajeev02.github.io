# Volume 10 – Set 21 – Deep Linking & Universal Links

## 1. What is the difference between a Custom URI Scheme and Universal Links / App Links?

**Concept:**
When a user taps a link on their phone, you want the link to open directly inside your native application instead of the Safari/Chrome browser.

**Answer:**
1. **Custom URI Scheme (e.g., `myportal://`):**
   - *How it works:* You register a custom scheme in your app's `Info.plist` (iOS) and `AndroidManifest.xml` (Android). When a link like `myportal://products/123` is tapped, the OS opens the app.
   - *The Problem:* They are insecure. Any app can register the `myportal://` scheme. If a malicious app registers it, it can steal the user's data when they click the link. If the user doesn't have the app installed, clicking the link simply results in an ugly \"Cannot Open Page\" error.

2. **Universal Links (iOS) / App Links (Android):**
   - *How it works:* They use standard HTTP/HTTPS URLs (e.g., `https://myportal.com/products/123`). 
   - *Security:* They require cryptographic verification. You must host a specific JSON file (`apple-app-site-association` for iOS, `assetlinks.json` for Android) on your website. When the app is installed, the OS silently pings your website to verify the app is actually authorized to claim that domain.
   - *Fallback:* If the app is *not* installed, the OS falls back to opening the URL in the standard web browser, showing the user the web version of the product page (or a prompt to download the app).

**Key Takeaway:**
Custom URI schemes are legacy and primarily used for internal app-to-app communication (like OAuth callbacks). Universal Links are the secure, modern standard for external links.

---

## 2. How do you handle Deep Links in React Navigation?

**Concept:**
When the OS opens your app via a deep link, the native Android/iOS code receives the URL string. You must pass this string to the JavaScript thread and parse it so React Navigation can mount the correct screen.

**Answer:**
React Navigation provides a `linking` prop for the `NavigationContainer`.

```javascript
const linking = {
  prefixes: ['https://myportal.com', 'myportal://'],
  config: {
    screens: {
      Home: 'home',
      Profile: 'user/:id',
      ProductDetail: {
        path: 'item/:productId',
        parse: {
          productId: (id) => Number(id), // parse string to number
        },
      },
      NotFound: '*',
    },
  },
};

<NavigationContainer linking={linking}>
  {/* Stacks */}
</NavigationContainer>
```

**How it works:**
If the user taps `https://myportal.com/item/456`, React Navigation intercepts the URL, matches it to the `ProductDetail` configuration, extracts `456`, converts it to a number, and automatically dispatches a navigation action to open the `ProductDetail` screen, passing `{ productId: 456 }` in `route.params`.

**Key Takeaway:**
React Navigation's linking configuration automatically handles the complex parsing of URLs into navigation states and route params.

---

## 3. How do you test Universal Links during development?

**Concept:**
Testing Universal Links is notoriously frustrating because the OS relies on caching the `apple-app-site-association` file, and the app must be compiled and signed correctly.

**Answer:**
1. **iOS Simulator:**
   You can trigger a deep link directly from the terminal using the `xcrun simctl` command:
   ```bash
   xcrun simctl openurl booted "https://myportal.com/item/123"
   ```
   Or in the simulator, open the Notes app, type the URL, and click it. Note: Universal Links strictly require the app to be signed with a valid provisioning profile that matches the Associated Domains entitlement, which can sometimes be tricky on simulators.

2. **Android Emulator:**
   You trigger links using the `adb` command:
   ```bash
   adb shell am start -W -a android.intent.action.VIEW -d "https://myportal.com/item/123" com.myportal.app
   ```

**Key Takeaway:**
Always use terminal commands (`adb` and `xcrun`) to inject the URL payload directly into the emulator to test how your JavaScript routing logic handles the link without needing to rely on emails or text messages.

---

## 4. What happens if a Deep Link requires authentication? How do you handle this flow?

**Concept:**
A user clicks an email link for a special offer: `https://myportal.com/offers/special`. The OS opens the app. However, the user is currently logged out.

**Answer:**
If you naively route the user to the `Offers` screen, the API calls will fail, or the app will crash because it expects a user token. 

To handle this elegantly:
1. **Intercept the Link:** Do not let React Navigation automatically route if the user is unauthenticated.
2. **State Management:** When the link is intercepted, store the pending route (e.g., `pendingDeepLink = '/offers/special'`) in your global state (Redux/Zustand) or `AsyncStorage`.
3. **Redirect to Login:** Route the user to the Login/Signup screen.
4. **Resume Flow:** Upon successful authentication, check if `pendingDeepLink` exists. If it does, clear it from the state and programmatically navigate the user to that route.

Alternatively, React Navigation allows overriding the `getInitialURL` and `subscribe` methods in the `linking` configuration to manually intercept and block URLs based on the auth context before they are parsed into navigation states.

**Key Takeaway:**
Deep links must always respect the Authentication Guard limits of the application.

---

## 5. What are Deferred Deep Links?

**Concept:**
A standard deep link only works if the app is already installed on the phone. But what if the user doesn't have the app installed yet?

**Answer:**
A **Deferred Deep Link** \"survives\" the app installation process.

**Flow:**
1. User clicks a Facebook Ad for a specific product (e.g., Red Shoes).
2. They don't have the app, so the link redirects them to the App Store.
3. They download and install the app.
4. When they open the app for the *very first time*, the app automatically routes them directly to the \"Red Shoes\" product page, rather than the generic Home screen.

**Implementation:**
This cannot be done natively with standard Universal Links because Apple/Google do not pass the referral URL through the App Store installation process due to privacy restrictions.

To implement Deferred Deep Links, you must use a third-party attribution service like **AppsFlyer** or **Branch.io**. These SDKs use probabilistic matching (IP address, device type, click time) to map the user who clicked the link in the browser to the user who opened the app 30 seconds later, passing the original deep link data to your JavaScript code on first launch.

**Key Takeaway:**
Deferred Deep Links are essential for marketing and user acquisition campaigns, but require integrating a paid third-party SDK to bypass App Store data silos.
