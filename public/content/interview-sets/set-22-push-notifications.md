# Volume 11 – Set 22 – Push Notifications & Background Tasks

## 1. How does the architecture of Push Notifications work in React Native?

**Concept:**
Push notifications are a critical engagement tool, but they involve complex coordination between the device OS, Apple/Google servers, and your backend.

**Answer:**
The flow involves three main actors: Your Backend, APNs (Apple Push Notification service) / FCM (Firebase Cloud Messaging), and the Device.

1. **Registration:** When the app launches, it requests permission from the user. If granted, the device registers with APNs (iOS) or FCM (Android) and receives a unique device token.
2. **Backend Storage:** The React Native app sends this unique device token to your backend, which saves it against the user's database record.
3. **Trigger:** When an event occurs (e.g., \"New Message\"), your backend uses the token to send a payload to APNs/FCM.
4. **Delivery:** APNs/FCM delivers the notification to the device.
5. **Handling in RN:** 
   - If the app is in the *Foreground*, the OS intercepts it and passes it silently to your JS listener (so you can update the UI or show an in-app toast).
   - If the app is in the *Background/Killed*, the OS displays the notification in the system tray. When the user taps it, the app launches, and the payload is passed to the JS thread.

**Key Takeaway:**
React Native developers typically use libraries like `react-native-firebase/messaging` or `expo-notifications` to abstract the native SDKs, but understanding the APNs/FCM bridge is crucial for debugging missing notifications.

---

## 2. What are "Silent" Push Notifications and how are they used?

**Concept:**
Not all notifications are meant to be seen by the user. Sometimes the server just needs to wake up the app to sync data.

**Answer:**
A Silent Push Notification (also known as a Data-Only notification) contains no `alert`, `sound`, or `badge` payload. 

When the device receives it, it does not alert the user or show up in the Notification Center. Instead, the OS wakes up the app in the background for a brief window (usually around 30 seconds).

**Use Cases in RN:**
- Pre-fetching data so the app opens instantly next time the user launches it.
- Updating local badge counts.
- Triggering a background sync of the WatermelonDB offline database.

**Caveat:**
The OS (especially iOS) heavily rate-limits silent push notifications to preserve battery life. If the user force-quits the app, silent pushes are often ignored until the user launches the app manually again.

**Key Takeaway:**
Silent pushes are for data sync, but they are \"best effort\" by the OS and cannot be relied upon as a guaranteed execution mechanism.

---

## 3. How do you run background tasks periodically in React Native?

**Concept:**
Mobile operating systems strictly limit what an app can do in the background to preserve battery and memory.

**Answer:**
Running continuous background tasks (like a `setInterval` pinging a server) is killed almost immediately by iOS and Android.

To run tasks periodically in the background, you must use OS-level job schedulers. In React Native, this is implemented using libraries like `react-native-background-fetch` or `expo-background-fetch`.

**How it works:**
1. You register a Headless JS task with the library.
2. The OS decides *when* to run it based on the user's habits, battery level, and network availability.
3. On iOS, the minimum interval is typically 15 minutes, but the OS may wait hours if the phone is idle.
4. When triggered, the OS wakes the RN engine, runs your JS function, and you have exactly 30 seconds to fetch data, save it to AsyncStorage, and call `.finish()` to tell the OS you are done.

**Key Takeaway:**
Background tasks in mobile are strictly scheduled and throttled by the OS; they are never continuous or precisely timed.

---

## 4. What is Headless JS in React Native?

**Concept:**
Normally, JavaScript execution is tied to the React component lifecycle and the UI rendering. But background tasks need to run when there is no UI.

**Answer:**
Headless JS is a feature (primarily on Android) that allows you to run JavaScript tasks in the background even if the app has been closed and the UI is destroyed.

When a background event triggers (like a push notification, a background fetch, or a geofence crossing), the Native code boots up the JavaScript Virtual Machine (without mounting the React UI root) and executes a registered JS function.

```javascript
import { AppRegistry } from 'react-native';

// Register the headless task
AppRegistry.registerHeadlessTask('SyncDataTask', () => 
  async (taskData) => {
    const data = await fetch('/sync');
    await saveToLocalDB(data);
  }
);
```

**Key Takeaway:**
Headless JS allows you to execute pure business logic (Redux actions, API calls) in the background without the overhead of mounting the visual component tree.

---

## 5. How do you handle deep linking from a Push Notification?

**Concept:**
When a user receives a \"New Message from Alice\" notification, tapping it shouldn't just open the Home screen; it should open the Chat screen with Alice.

**Answer:**
This requires integrating the Push Notification listener with React Navigation.

1. **Payload Structure:** The backend must include routing metadata in the push notification data payload (e.g., `data: { screen: 'Chat', userId: 123 }`).
2. **React Navigation Configuration:** 
   React Navigation's `linking` prop accepts a `subscribe` function. Inside this function, you listen for notification interactions.

```javascript
const linking = {
  prefixes: ['my-app://'],
  async getInitialURL() {
    // Handle the case where the app was killed and opened via a notification
    const message = await messaging().getInitialNotification();
    if (message?.data?.screen) {
      return `my-app://${message.data.screen}/${message.data.userId}`;
    }
    return null;
  },
  subscribe(listener) {
    // Handle the case where the app is running in the background
    const unsubscribe = messaging().onNotificationOpenedApp(message => {
      if (message?.data?.screen) {
        listener(`my-app://${message.data.screen}/${message.data.userId}`);
      }
    });
    return () => unsubscribe();
  },
};
```

**Key Takeaway:**
By mapping the notification data payload into a standard deep link URL format, React Navigation's standard router can seamlessly handle notification routing exactly like normal deep links.
