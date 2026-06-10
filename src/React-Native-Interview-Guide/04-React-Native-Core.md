# 04-React-Native-Core.md

# React Native Core Concepts for Senior React Native Developers

---

# 1. What is React Native?

## Definition

React Native is an open-source framework developed by Facebook that allows developers to build cross-platform mobile applications using JavaScript, TypeScript, and React.

React Native uses native UI components instead of WebViews.

---

## Why Do We Need React Native?

Before React Native:

* Separate Android Team
* Separate iOS Team
* Duplicate codebase

React Native allows:

* Shared codebase
* Faster development
* Lower maintenance cost
* Near-native performance

---

## How React Native Works?

```text
JavaScript
      ↓
React Native
      ↓
Native Bridge
      ↓
Android / iOS
```

(New Architecture replaces Bridge with JSI)

---

## Interview Answer

"React Native is a cross-platform framework that allows developers to build native mobile applications using React and JavaScript while sharing most of the code between Android and iOS."

---

# 2. React Native Architecture Overview

## Old Architecture

```text
JavaScript
     ↓
Bridge
     ↓
Native Modules
     ↓
Android / iOS
```

---

## Limitations

* Asynchronous only
* Serialization overhead
* Performance bottlenecks

---

## New Architecture

```text
JavaScript
      ↓
JSI
      ↓
TurboModules
      ↓
Fabric
      ↓
Native UI
```

---

## Interview Answer

"React Native originally used the Bridge for communication, while the new architecture uses JSI, Fabric, and TurboModules to improve performance."

---

# 3. Metro Bundler

## Definition

Metro is React Native's JavaScript bundler.

---

## Responsibilities

* Bundle JavaScript
* Asset Management
* Babel Integration
* Fast Refresh
* Source Maps

---

## Flow

```text
Source Code
     ↓
Babel
     ↓
Metro
     ↓
Bundle.js
     ↓
React Native Runtime
```

---

## Interview Answer

"Metro is the bundler used by React Native to transform and package JavaScript code and assets."

---

# 4. React Native CLI vs Expo

## React Native CLI

### Advantages

* Full native access
* Custom SDK integration
* Native modules
* Enterprise projects

### Limitations

* More setup
* Native knowledge required

---

## Expo

### Advantages

* Faster development
* Expo Go
* OTA Updates
* EAS Build

### Limitations

* Limited native customization

---

## Interview Answer

"Expo is ideal for rapid development and MVPs, while React Native CLI is preferred for enterprise applications requiring native customization."

---

# 5. Platform Specific Code

## Definition

Different code for Android and iOS.

---

## Example

```javascript
import {
  Platform
} from "react-native";

if(
 Platform.OS === "ios"
){
}
```

---

## Separate Files

```text
Home.android.tsx

Home.ios.tsx
```

---

## Interview Answer

"Platform-specific code allows developers to customize behavior for Android and iOS when required."

---

# 6. Native Modules

## Definition

Native Modules allow JavaScript code to communicate with Android and iOS native code.

---

## Why Do We Need Them?

Not every feature is available in JavaScript.

Examples:

* Camera SDK
* Payment SDK
* Bluetooth
* NFC

---

## Flow

```text
JavaScript
     ↓
Bridge / JSI
     ↓
Native Module
     ↓
Android / iOS
```

---

## Interview Answer

"Native Modules expose platform-specific functionality to JavaScript."

---

# 7. Native UI Components

## Definition

Custom native views exposed to React Native.

---

## Examples

* Google Maps
* Camera Preview
* Video Players

---

## Interview Answer

"Native UI Components allow native Android and iOS views to be rendered inside React Native applications."

---

# 8. Navigation

## Definition

Navigation allows moving between screens.

---

## Types

### Stack Navigation

```text
Home
 ↓
Profile
 ↓
Settings
```

---

### Bottom Tab Navigation

```text
Home
Search
Profile
```

---

### Drawer Navigation

```text
☰ Menu
```

---

## Interview Answer

"React Navigation is the most widely used navigation library in React Native, supporting stack, tab, and drawer navigators."

---

# 9. Deep Linking

## Definition

Deep Linking opens a specific screen in the application from a URL.

---

## Example

```text
myapp://profile/123
```

---

## Use Cases

* Email Links
* Notifications
* Marketing Campaigns

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

## Interview Answer

"Deep Linking enables users to navigate directly to a specific screen using a URL."

---

# 10. Universal Links & App Links

## Universal Links

iOS

```text
https://app.com/profile
```

---

## App Links

Android

```text
https://app.com/profile
```

---

## Benefits

* Better user experience
* Secure linking
* SEO friendly

---

## Interview Answer

"Universal Links and App Links allow web URLs to directly open mobile applications."

---

# 11. Push Notifications

## Definition

Push Notifications allow servers to send messages to devices.

---

## Components

### Android

```text
Firebase Cloud Messaging (FCM)
```

---

### iOS

```text
APNs
```

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

## Notification States

### Foreground

App Open

### Background

App Running

### Quit State

App Closed

---

## Interview Answer

"Push notifications are delivered through FCM on Android and APNs on iOS to engage users even when the app is not active."

---

# 12. App Lifecycle

## States

### Active

App visible.

---

### Background

App not visible.

---

### Inactive

Transition state.

---

## AppState API

```javascript
import {
 AppState
}
from "react-native";
```

---

## Interview Answer

"AppState helps track whether the application is active, inactive, or running in the background."

---

# 13. Permissions

## Common Permissions

### Camera

```text
Camera Access
```

### Location

```text
GPS Access
```

### Notifications

```text
Push Notifications
```

### Storage

```text
File Access
```

---

## Interview Answer

"Permissions provide secure access to device resources and must be requested explicitly from users."

---

# 14. AsyncStorage

## Definition

Persistent key-value storage.

---

## Example

```javascript
await AsyncStorage.setItem(
 "token",
 token
);
```

---

## Limitations

* Not encrypted
* Not ideal for sensitive data

---

## Interview Answer

"AsyncStorage is a simple persistent storage solution for lightweight application data."

---

# 15. Secure Storage

## Android

```text
Keystore
```

---

## iOS

```text
Keychain
```

---

## Use Cases

* JWT Tokens
* Refresh Tokens
* User Credentials

---

## Interview Answer

"Sensitive data should be stored in Keychain or Keystore rather than AsyncStorage."

---

# 16. Networking

## Fetch API

```javascript
fetch(url);
```

---

## Axios

```javascript
axios.get(url);
```

---

## Why Axios?

* Interceptors
* Timeout
* Better Error Handling

---

## Interview Answer

"Axios is commonly preferred because of its interceptors, request cancellation, and improved error handling."

---

# 17. WebSocket

## Definition

Real-time bidirectional communication.

---

## Use Cases

* Chat Applications
* Live Tracking
* Stock Market Apps

---

## Example

```javascript
const socket =
 new WebSocket(url);
```

---

## Interview Answer

"WebSockets provide persistent connections for real-time communication."

---

# 18. Offline Support

## Why?

Users may lose internet connectivity.

---

## Strategies

* Local Database
* AsyncStorage
* Redux Persist
* Cache

---

## Interview Answer

"Offline support improves reliability by allowing applications to function without network connectivity."

---

# 19. Error Boundaries

## Definition

Catches rendering errors.

---

## Example

```javascript
class ErrorBoundary
extends React.Component
```

---

## Benefits

* Prevent App Crashes
* Better UX

---

## Interview Answer

"Error Boundaries catch JavaScript rendering errors and display fallback UI."

---

# 20. OTA Updates

## Definition

Update JavaScript bundle without app store release.

---

## Examples

* Expo Updates
* CodePush (Legacy)

---

## Benefits

* Faster deployments
* Quick bug fixes

---

## Interview Answer

"OTA updates allow JavaScript code changes to be delivered without requiring a new app store release."

---

# Most Asked React Native Core Questions

1. What is React Native?
2. React Native vs Native Development?
3. React Native vs Flutter?
4. Metro Bundler?
5. Expo vs React Native CLI?
6. What are Native Modules?
7. What are Native Components?
8. How does Navigation work?
9. Deep Linking?
10. Universal Links vs App Links?
11. Push Notification Flow?
12. App Lifecycle?
13. AsyncStorage vs Secure Storage?
14. Axios vs Fetch?
15. WebSocket?
16. Offline Support?
17. OTA Updates?
18. Error Boundaries?
19. Platform-Specific Code?
20. How does React Native communicate with Native Code?

---

# Daily Revision Plan

```text
React Native Basics        5 min
Metro Bundler             3 min
Expo vs CLI               5 min
Native Modules            5 min
Navigation                5 min
Deep Linking              3 min
Notifications             5 min
Storage                   3 min
Networking                3 min
OTA Updates               3 min

Total: ~40 Minutes
```

---

## Headless JS

### Definition

Runs JavaScript without UI.

Use Cases:

* Background Sync
* Background Uploads

---

## Native Event Emitters

Communication from Native → JavaScript.

```javascript
NativeEventEmitter
```

---

## Accessibility

Examples:

```jsx
accessibilityLabel

accessible

accessibilityHint
```

---

## Background Tasks

Libraries:

```text
react-native-background-fetch
expo-background-fetch
```
