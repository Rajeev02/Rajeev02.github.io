# 06-Expo-vs-RNCLI.md

# Expo vs React Native CLI for Senior React Native Developers

---

# 1. What is Expo?

## Definition

Expo is a framework and platform built on top of React Native that simplifies mobile app development by providing tools, libraries, and cloud services.

It allows developers to build React Native applications without managing native Android and iOS projects initially.

---

## Why Do We Need Expo?

Traditional React Native setup requires:

* Android Studio
* Xcode
* Native Configuration
* Build Management

Expo simplifies this process.

---

## Features

* Expo Go
* EAS Build
* OTA Updates
* Expo Router
* Prebuilt Native Modules
* Push Notifications

---

## Interview Answer

"Expo is a framework built on top of React Native that simplifies development by providing tooling, cloud services, and preconfigured native functionality."

---

# 2. What is React Native CLI?

## Definition

React Native CLI is the official React Native development approach that provides direct access to Android and iOS native projects.

---

## Structure

```text
android/
ios/
src/
```

Developers have complete control over:

* Gradle
* Xcode
* Native SDKs
* Native Modules

---

## Interview Answer

"React Native CLI provides full access to Android and iOS native projects and is preferred when extensive native customization is required."

---

# 3. Expo Architecture

## Flow

```text
React Native App
        ↓
Expo SDK
        ↓
Expo Runtime
        ↓
Android / iOS
```

---

## Components

### Expo SDK

Provides APIs for:

* Camera
* Location
* Notifications
* Contacts
* Sensors

---

### Expo Go

Runs applications without native builds.

---

### EAS Build

Cloud-based build service.

---

## Interview Answer

"Expo sits on top of React Native and provides a managed environment with built-in native functionality."

---

# 4. React Native CLI Architecture

## Flow

```text
React Native App
        ↓
React Native Runtime
        ↓
Native Android/iOS
```

---

## Features

* Full native control
* Native SDK integration
* Custom Gradle
* Custom Xcode configuration

---

## Interview Answer

"React Native CLI provides direct interaction with native Android and iOS projects without an additional abstraction layer."

---

# 5. Expo Go

## Definition

Expo Go is a mobile application that allows developers to run Expo applications without creating native builds.

---

## How It Works?

```text
Code Change
      ↓
Metro
      ↓
Expo Go
      ↓
Live Preview
```

---

## Benefits

* Fast Development
* No Build Required
* Instant Preview

---

## Limitations

Cannot use custom native code not included in Expo Go.

---

## Interview Answer

"Expo Go enables rapid development by running React Native applications directly on a device without building native binaries."

---

# 6. EAS Build

## Definition

Expo Application Services (EAS) Build is Expo's cloud build platform.

---

## Why Do We Need It?

Avoid local build setup.

Without EAS:

```text
Mac Required
↓
Xcode Build
```

---

With EAS:

```text
Code
 ↓
Cloud Build
 ↓
APK / IPA
```

---

## Benefits

* Cloud Builds
* CI/CD Integration
* Easier Releases

---

## Interview Answer

"EAS Build is Expo's cloud-based build system for generating Android and iOS binaries."

---

# 7. Expo Router

## Definition

Expo Router is a file-based routing system built on top of React Navigation.

---

## Example

```text
app/
 ├─ index.tsx
 ├─ profile.tsx
 └─ settings.tsx
```

Routes generated automatically.

---

## Benefits

* Simpler Navigation
* File-Based Routing
* Deep Linking Support

---

## Interview Answer

"Expo Router provides file-based routing similar to Next.js while leveraging React Navigation underneath."

---

# 8. Expo Managed Workflow

## Definition

Expo manages native configuration for developers.

---

## Benefits

* Easier Setup
* Faster Development
* Less Native Knowledge Required

---

## Limitations

Limited low-level customization.

---

## Interview Answer

"Managed Workflow abstracts native project configuration and allows developers to focus primarily on JavaScript."

---

# 9. Expo Prebuild

## Definition

Prebuild generates Android and iOS projects from an Expo application.

---

## Command

```bash
npx expo prebuild
```

---

## Result

```text
android/
ios/
```

Generated automatically.

---

## Why Is It Important?

Allows Expo apps to use custom native modules.

---

## Interview Answer

"Expo Prebuild converts a managed Expo project into a native React Native project."

---

# 10. Expo Config Plugins

## Definition

Config Plugins automate native project configuration.

---

## Example

```json
{
  "expo": {
    "plugins": [
      "expo-camera"
    ]
  }
}
```

---

## Benefits

* Automated native setup
* Less manual configuration

---

## Interview Answer

"Config Plugins allow Expo packages to automatically modify Android and iOS native projects."

---

# 11. Expo Updates (OTA Updates)

## Definition

Update JavaScript code without App Store or Play Store release.

---

## Flow

```text
Code Update
      ↓
Expo Updates
      ↓
User Device
```

---

## Benefits

* Faster Releases
* Critical Bug Fixes
* Smaller Updates

---

## Interview Answer

"Expo Updates provides Over-The-Air updates for JavaScript code without requiring a new app store submission."

---

# 12. Can Expo Use Native Modules?

## Old Answer

Historically:

```text
No
```

---

## Modern Answer

Today:

```text
Yes
```

Using:

* Expo Prebuild
* Expo Modules
* Config Plugins

---

## Interview Answer

"Modern Expo applications can use custom native modules through Expo Prebuild and Expo Modules."

---

# 13. Expo Modules

## Definition

Expo Modules are modern native modules built for Expo and React Native.

---

## Benefits

* JSI Compatible
* New Architecture Ready
* Type Safe

---

## Interview Answer

"Expo Modules provide a unified way to build native functionality for both Expo and React Native applications."

---

# 14. New Architecture Support

## Does Expo Support New Architecture?

### Yes

Expo supports:

* Hermes
* JSI
* TurboModules
* Fabric
* New Architecture

---

## Interview Answer

"Modern Expo fully supports React Native's New Architecture including Hermes, Fabric, and TurboModules."

---

# 15. Expo vs React Native CLI

| Feature                  | Expo                  | React Native CLI |
| ------------------------ | --------------------- | ---------------- |
| Setup                    | Easy                  | More Complex     |
| Native Access            | Limited Initially     | Full             |
| Custom SDKs              | Possible via Prebuild | Full Support     |
| Build Process            | EAS Build             | Xcode/Gradle     |
| OTA Updates              | Built-in              | Manual Setup     |
| Learning Curve           | Lower                 | Higher           |
| Development Speed        | Faster                | Slower           |
| Enterprise Flexibility   | High                  | Very High        |
| Native Customization     | Moderate              | Complete         |
| New Architecture Support | Yes                   | Yes              |

---

# 16. When Should You Use Expo?

## Good Choice For

### MVPs

Rapid development.

---

### Startups

Small teams.

---

### Internal Apps

Faster delivery.

---

### Projects Without Heavy Native Requirements

Standard mobile functionality.

---

## Interview Answer

"Expo is ideal when development speed and simplicity are more important than low-level native customization."

---

# 17. When Should You Use React Native CLI?

## Good Choice For

### Banking Apps

Custom security SDKs.

---

### Healthcare Apps

Device integrations.

---

### Enterprise Apps

Complex native requirements.

---

### Custom Native Development

Bluetooth, NFC, proprietary SDKs.

---

## Interview Answer

"React Native CLI is preferred when applications require significant native customization or third-party native SDK integration."

---

# 18. Expo vs React Native CLI Interview Scenarios

## Scenario 1

Startup MVP

### Choice

Expo

### Reason

Fast development.

---

## Scenario 2

Banking Application

### Choice

React Native CLI

### Reason

Native security SDKs.

---

## Scenario 3

Healthcare Device Integration

### Choice

React Native CLI

### Reason

Custom Bluetooth/NFC requirements.

---

## Scenario 4

Food Delivery App

### Choice

Expo or RN CLI

Depends on native requirements.

---

## Scenario 5

Enterprise Application

### Choice

Usually RN CLI

More control.

---

# 19. Most Asked Interview Questions

1. What is Expo?
2. What is React Native CLI?
3. Expo vs React Native CLI?
4. What is Expo Go?
5. What is EAS Build?
6. What is Expo Router?
7. What are Expo Modules?
8. What are Config Plugins?
9. What is Expo Prebuild?
10. Can Expo use native modules?
11. Does Expo support New Architecture?
12. Does Expo support Hermes?
13. What are Expo Updates?
14. When should you choose Expo?
15. When should you choose RN CLI?
16. Can Expo be used for enterprise applications?
17. What are limitations of Expo?
18. What are advantages of Expo?
19. Expo Managed vs Bare Workflow?
20. Which would you choose for a new project and why?

---

# Ultimate Senior Interview Answer

"For rapid development, MVPs, and standard mobile applications, I would choose Expo because it provides Expo Go, EAS Build, OTA updates, and a simplified developer experience. For enterprise applications requiring extensive native customization, custom SDK integrations, Bluetooth, NFC, or proprietary native functionality, I would choose React Native CLI. Modern Expo has evolved significantly and now supports Hermes, Fabric, TurboModules, and custom native modules through Expo Prebuild and Expo Modules."

---

# Daily Revision Plan

```text
Expo Basics               5 min
Expo Go                   3 min
EAS Build                 3 min
Expo Router               3 min
Expo Prebuild             3 min
Config Plugins            2 min
Expo Modules              3 min
Expo vs RN CLI            10 min
Interview Scenarios       5 min

Total: ~37 Minutes
```


---


## EAS Update

OTA updates.

```bash
eas update
```

---

## EAS Submit

Automatically uploads builds.

```bash
eas submit
```

---

## Managed vs Bare Workflow

| Managed            | Bare               |
| ------------------ | ------------------ |
| Expo Controlled    | Native Control     |
| Easy               | Flexible           |
| Less Native Access | Full Native Access |

