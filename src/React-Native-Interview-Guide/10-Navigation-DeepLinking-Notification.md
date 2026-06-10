# 10-Navigation-DeepLinking-Notifications.md

# Navigation, Deep Linking & Push Notifications for Senior React Native Developers

---

# 1. What is Navigation?

## Definition

Navigation is the process of moving between screens in a mobile application.

---

## Why Do We Need It?

Examples:

```text
Login
 ↓
Home
 ↓
Profile
 ↓
Settings
```

Without navigation, users cannot move between screens.

---

## Most Popular Library

```text
React Navigation
```

---

## Interview Answer

"Navigation enables users to move between screens and is typically implemented using React Navigation in React Native applications."

---

# 2. React Navigation Architecture

## Flow

```text
NavigationContainer
          ↓
Navigator
          ↓
Screens
```

---

## Example

```jsx
<NavigationContainer>

 <Stack.Navigator>

  <Stack.Screen
   name="Home"
   component={HomeScreen}
  />

 </Stack.Navigator>

</NavigationContainer>
```

---

## Interview Answer

"React Navigation uses NavigationContainer as the root and navigators to manage screen transitions."

---

# 3. Stack Navigator

## Definition

Provides stack-based navigation.

---

## Flow

```text
Home
 ↓
Profile
 ↓
Settings
```

---

## Example

```jsx
navigation.navigate(
 "Profile"
);
```

---

## Back Navigation

```jsx
navigation.goBack();
```

---

## Use Cases

* Authentication Flow
* Detail Screens
* Profile Screens

---

## Interview Answer

"Stack Navigator follows a Last-In-First-Out navigation pattern and is commonly used for screen-to-screen navigation."

---

# 4. Bottom Tab Navigator

## Definition

Navigation using tabs.

---

## Example

```text
Home | Search | Profile
```

---

## Benefits

* Quick Access
* Better UX

---

## Use Cases

* Social Apps
* E-commerce Apps
* Banking Apps

---

## Interview Answer

"Bottom Tabs provide quick access to primary application sections."

---

# 5. Drawer Navigator

## Definition

Side menu navigation.

---

## Example

```text
☰ Menu

Profile
Settings
Logout
```

---

## Benefits

* Large Menu Support
* Better Organization

---

## Interview Answer

"Drawer Navigation provides access to secondary application features through a side menu."

---

# 6. Navigation Methods

## navigate()

Push screen.

```jsx
navigation.navigate(
 "Profile"
);
```

---

## replace()

Replace current screen.

```jsx
navigation.replace(
 "Home"
);
```

---

## goBack()

Return to previous screen.

```jsx
navigation.goBack();
```

---

## reset()

Clear navigation stack.

```jsx
navigation.reset({
 routes:[
  {name:"Home"}
 ]
});
```

---

## Interview Answer

"React Navigation provides methods such as navigate, replace, goBack, and reset for controlling navigation behavior."

---

# 7. Passing Parameters

## Example

```jsx
navigation.navigate(
 "Profile",
 {
  userId: 123
 }
);
```

---

## Access Parameters

```jsx
route.params.userId
```

---

## Interview Answer

"Parameters allow screens to receive dynamic data during navigation."

---

# 8. Nested Navigation

## Example

```text
Stack Navigator
       ↓
Tab Navigator
       ↓
Screens
```

---

## Common Architecture

```text
Auth Stack
     ↓
Main Tabs
     ↓
Feature Screens
```

---

## Interview Answer

"Nested navigation combines multiple navigators to create scalable navigation architectures."

---

# 9. Deep Linking

## Definition

Deep Linking opens a specific screen using a URL.

---

## Example

```text
myapp://profile/123
```

---

## Flow

```text
URL
 ↓
App Opens
 ↓
Specific Screen
```

---

## Use Cases

* Marketing Campaigns
* Emails
* Push Notifications

---

## Interview Answer

"Deep Linking allows users to navigate directly to a specific screen using a custom URL."

---

# 10. Deep Linking Configuration

## Example

```javascript
const linking = {

 prefixes: [
  "myapp://"
 ],

 config: {

  screens: {

   Profile:
   "profile/:id"

  }

 }

};
```

---

## URL

```text
myapp://profile/123
```

---

## Interview Answer

"Deep Linking requires URL schemes and route configuration mapping URLs to screens."

---

# 11. Universal Links (iOS)

## Definition

Open app using HTTPS URLs.

---

## Example

```text
https://myapp.com/profile/123
```

---

## Benefits

* Secure
* Better UX
* App Store Friendly

---

## Interview Answer

"Universal Links allow iOS applications to open directly from web URLs."

---

# 12. Android App Links

## Definition

Android equivalent of Universal Links.

---

## Example

```text
https://myapp.com/profile/123
```

---

## Benefits

* Secure
* Verified Ownership

---

## Interview Answer

"Android App Links connect website URLs directly to Android applications."

---

# 13. Universal Links vs Deep Links

| Deep Links    | Universal/App Links |
| ------------- | ------------------- |
| Custom Scheme | HTTPS               |
| Less Secure   | More Secure         |
| myapp://      | https://            |
| Easier Setup  | More Configuration  |

---

## Interview Answer

"Universal Links and App Links are preferred over custom Deep Links because they are secure and verified."

---

# 14. Push Notifications

## Definition

Messages sent from a server to a device.

---

## Examples

* Order Updates
* Chat Messages
* Promotions
* Reminders

---

## Flow

```text
Server
 ↓
FCM/APNs
 ↓
Device
 ↓
Application
```

---

## Interview Answer

"Push notifications allow backend systems to communicate with users even when the application is closed."

---

# 15. Firebase Cloud Messaging (FCM)

## Definition

Google's push notification service.

---

## Android

```text
FCM
```

---

## Responsibilities

* Device Tokens
* Message Delivery
* Topic Messaging

---

## Interview Answer

"FCM is Google's notification infrastructure used to deliver push notifications to Android devices."

---

# 16. APNs (Apple Push Notification Service)

## Definition

Apple's notification service.

---

## Flow

```text
Server
 ↓
APNs
 ↓
iPhone
```

---

## Interview Answer

"APNs is Apple's service responsible for delivering push notifications to iOS devices."

---

# 17. Notification Lifecycle

## Foreground

App Open.

---

## Background

App Running.

---

## Quit State

App Closed.

---

## Flow

```text
Notification
      ↓
Foreground
or
Background
or
Quit State
```

---

## Interview Answer

"Push notification handling differs depending on whether the application is active, in the background, or terminated."

---

# 18. Foreground Notifications

## Behavior

Notification received while app is open.

---

## Example

```text
Show Custom Banner
```

---

## Interview Answer

"When the application is active, notifications are typically handled manually and displayed through custom UI."

---

# 19. Background Notifications

## Behavior

App not visible.

---

## Example

```text
Notification Arrives
      ↓
User Taps
      ↓
Open Screen
```

---

## Interview Answer

"Background notifications allow applications to react when users interact with delivered notifications."

---

# 20. Notification Deep Linking

## Example

Notification:

```json
{
 "type":"order",
 "orderId":"123"
}
```

---

## Flow

```text
Notification
      ↓
Tap
      ↓
Navigation
      ↓
Order Details Screen
```

---

## Interview Answer

"Notifications often use Deep Linking to navigate users directly to relevant screens."

---

# 21. Device Tokens

## Definition

Unique identifier used to send notifications.

---

## Example

```text
token_abc123
```

---

## Flow

```text
App Launch
      ↓
Get Device Token
      ↓
Send To Backend
```

---

## Interview Answer

"Device tokens uniquely identify a device and are required for push notification delivery."

---

# 22. Topic Notifications

## Definition

Send notifications to groups.

---

## Example

```text
sports
offers
news
```

---

## Flow

```text
User
 ↓
Subscribe
 ↓
Topic
 ↓
Notification
```

---

## Interview Answer

"Topic messaging allows notifications to be broadcast to groups of subscribed users."

---

# 23. Local Notifications

## Definition

Notifications generated by the device itself.

---

## Example

```text
Medicine Reminder
```

---

## Use Cases

* Reminders
* Alarms
* Scheduled Events

---

## Interview Answer

"Local notifications are created directly on the device without requiring a backend."

---

# 24. Navigation + Notification Architecture

```text
Push Notification
        ↓
Notification Handler
        ↓
Deep Link
        ↓
React Navigation
        ↓
Target Screen
```

---

## Enterprise Example

```text
Order Notification
       ↓
Order Details

Chat Notification
       ↓
Chat Screen

Offer Notification
       ↓
Promotion Screen
```

---

## Interview Answer

"In enterprise applications, notifications are typically mapped to deep links that route users to specific screens."

---

# 25. Most Asked Interview Questions

1. What is React Navigation?
2. Stack vs Tab vs Drawer Navigation?
3. What is NavigationContainer?
4. navigate vs replace vs reset?
5. How do you pass parameters?
6. What is Nested Navigation?
7. What is Deep Linking?
8. How does Deep Linking work?
9. Universal Links vs Deep Links?
10. Android App Links?
11. What are Push Notifications?
12. FCM vs APNs?
13. How do notifications work?
14. Foreground vs Background notifications?
15. What is a Device Token?
16. How do Topic Notifications work?
17. What are Local Notifications?
18. How do you navigate from notifications?
19. How do Universal Links work?
20. How do you architect navigation in large apps?

---

# Ultimate Senior Interview Answer

"In enterprise React Native applications, I typically use React Navigation with a combination of Stack, Tab, and Drawer navigators. Deep Linking, Universal Links, and Android App Links are configured to support direct navigation from URLs and notifications. For push notifications, I use FCM for Android and APNs for iOS, handling foreground, background, and terminated states. Notifications are commonly integrated with deep links so users are routed directly to relevant screens such as chats, orders, or promotions."

---

# Daily Revision Plan

```text
Navigation Basics          5 min
Stack/Tab/Drawer           5 min
Navigation Methods         3 min
Deep Linking               5 min
Universal/App Links        3 min
Push Notifications         5 min
FCM/APNs                   5 min
Notification Lifecycle     3 min
Architecture Flow          5 min

Total: ~39 Minutes
```
