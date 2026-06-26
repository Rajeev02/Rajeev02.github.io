> 🎯 **Topic:** Complete Lifecycle of Push Notifications (FCM/APNs)
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** Very High
> 🏷️ **Tags:** ⭐ Frequently Asked, Architecture

---

## 54. End-to-End Push Notifications in React Native

*⏱️ 12 min read*

### Overview
Implementing robust push notifications in React Native involves navigating native platform differences between Android (FCM) and iOS (APNs). An enterprise-grade implementation requires understanding the complete lifecycle: from device registration to displaying notifications across various states (foreground, background, quit), managing notification channels for different urgencies, and handling deep links when notifications are tapped.

---

### 1. The Push Notification Lifecycle

The lifecycle of a push notification spans three key entities: the **Device (Client)**, the **Provider (APNs/FCM)**, and your **Backend Server**.

1. **Registration:**
   - The React Native app requests notification permissions from the OS.
   - The OS contacts the Push Provider (APNs for iOS, FCM for Android).
   - The Provider returns a unique **Device Token**.
   - The app sends this Device Token to your Backend Server to store alongside the user's profile.

2. **Triggering:**
   - An event occurs on the backend (e.g., "New Message").
   - The Backend Server formats a payload and sends it to FCM/APNs using the stored Device Token.
   - FCM/APNs routes the payload to the specific device.

3. **Delivery & Display:**
   - **Foreground:** The app receives the data payload silently. It is up to the React Native code to display an in-app banner or update the UI.
   - **Background/Quit:** The OS intercepts the notification payload, wakes up the app (or displays the system tray notification directly), and alerts the user.

---

### 2. End-to-End Registration (FCM & APNs)

Most modern React Native applications use `@react-native-firebase/messaging` or `react-native-push-notification` (often coupled with `Notifee` for rich local notifications).

#### Initializing Firebase and Requesting Permissions

```javascript
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

const usePushNotifications = () => {
  useEffect(() => {
    requestUserPermission();
    registerDevice();
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      badge: true,
      sound: true,
      provisional: false, // Set to true for iOS quiet notifications
    });

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const registerDevice = async () => {
    // For iOS, this ensures APNs is linked to FCM
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
    
    // Get the FCM token
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    
    // TODO: Send token to your backend
    // await api.post('/users/fcm-token', { token });
  };
};
```

---

### 3. Notification Channels and Critical Levels (Android Specific)

Starting from Android 8.0 (API level 26), all notifications must be assigned to a **Channel**. Channels allow users to customize permissions for different *types* of notifications (e.g., Mute marketing, but keep alerts for transactions).

Using a library like **Notifee** is highly recommended for channel management.

#### Creating Channels based on Urgency

```javascript
import notifee, { AndroidImportance } from '@notifee/react-native';

async function createNotificationChannels() {
  // 1. Critical Channel (High Importance, breaks through Do Not Disturb)
  await notifee.createChannel({
    id: 'critical_alerts',
    name: 'Critical System Alerts',
    importance: AndroidImportance.HIGH,
    sound: 'alarm_sound', // Custom sound file in android/app/src/main/res/raw/
    vibration: true,
    badge: true,
  });

  // 2. Default Channel (Standard Messages)
  await notifee.createChannel({
    id: 'chat_messages',
    name: 'Chat Messages',
    importance: AndroidImportance.DEFAULT,
  });

  // 3. Low Priority Channel (Marketing/Promotions)
  await notifee.createChannel({
    id: 'marketing',
    name: 'Promotions',
    importance: AndroidImportance.LOW, // Silent, shows in tray only
  });
}
```

When the backend sends a payload, it specifies the `channel_id` so the OS knows how to present it.

---

### 4. Handling Taps and Navigation

When a user taps a notification, the app needs to navigate to a specific screen (Deep Linking). The behavior depends on the app's state:

1. **Quit State (App is closed):** `messaging().getInitialNotification()`
2. **Background State (App is minimized):** `messaging().onNotificationOpenedApp()`

#### Implementation with React Navigation

```javascript
import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';

export default function App() {
  const navigationRef = useNavigationContainerRef();

  useEffect(() => {
    // 1. App opened from QUIT state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotificationNavigation(remoteMessage.data);
        }
      });

    // 2. App opened from BACKGROUND state
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      handleNotificationNavigation(remoteMessage.data);
    });

    return unsubscribe;
  }, []);

  const handleNotificationNavigation = (data) => {
    if (!data) return;

    // Assuming backend sends { type: 'CHAT', targetId: '123' }
    if (data.type === 'CHAT' && data.targetId) {
      // Navigate to Chat screen
      navigationRef.navigate('ChatScreen', { chatId: data.targetId });
    } else if (data.type === 'PROMO') {
      navigationRef.navigate('OffersScreen');
    }
  };

  return (
    <NavigationContainer ref={navigationRef}>
      {/* App Navigators */}
    </NavigationContainer>
  );
}
```

---

### Interview Questions & Answers

#### Q1. How do APNs and FCM differ in their architecture for iOS?
**Answer:**
FCM (Firebase Cloud Messaging) acts as a unified abstraction layer. On Android, FCM communicates directly with the OS. On iOS, FCM cannot wake the device directly. Instead, FCM acts as a proxy: your server sends the payload to FCM, and FCM forwards it to APNs using your Apple Push Certificates/Keys. APNs then delivers it to the iOS device.

#### Q2. What is a "Silent Push Notification" (Data-only message)?
**Answer:**
A silent push notification contains only a `data` payload and no `notification` block (no title/body). 
- **Purpose:** It wakes up the app in the background to execute code (e.g., syncing new emails, downloading an image) without alerting the user.
- **Handling:** In React Native, this triggers `messaging().setBackgroundMessageHandler()`. You must return a resolved promise quickly, as the OS strictly limits background execution time (usually ~30 seconds).

#### Q3. How do you handle notifications when the app is in the Foreground?
**Answer:**
By default, neither iOS nor Android displays a system notification banner if the app is in the foreground. 
- You must listen to `messaging().onMessage()`.
- Inside the listener, you can either display a custom in-app banner (like a Toast or Snackbar) OR use a local notification library like Notifee to trigger a system banner manually using the received payload.

#### Q4. Why might a push notification fail to deliver?
**Answer:**
1. **Invalid Token:** The device token expired or the user uninstalled/reinstalled the app.
2. **Permissions Revoked:** The user manually disabled notifications in OS Settings.
3. **Power Saving Modes:** Doze Mode (Android) or Low Power Mode (iOS) might delay or drop non-critical notifications.
4. **Certificate Expiry:** For iOS, the APNs Auth Key (.p8) or Push Certificate (.p12) expired on the FCM console.
5. **Payload Size:** The payload exceeded the maximum size limit (4KB for APNs/FCM).

#### Q5. How does React Native handle Notification Channels on iOS?
**Answer:**
Notification Channels (`channel_id`) are **strictly an Android feature** (API 26+). iOS does not have "Channels". Instead, iOS handles grouping via `thread-id` and manages priority implicitly through the payload's `apns-priority` header (5 for background, 10 for immediate). When writing cross-platform code, you define channels for Android, and iOS safely ignores the channel configurations.
