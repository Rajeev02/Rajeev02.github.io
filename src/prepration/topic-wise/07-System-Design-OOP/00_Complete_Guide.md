# System Design OOP Complete Guide

## Table of Contents
- [🏗️ Section 1: Object-Oriented Programming (OOP) & Conceptual Q&A](#-section-1-object-oriented-programming-oop--conceptual-qa)
- [📦 Section 2: Mobile Data Structures & Practical Scenarios](#-section-2-mobile-data-structures--practical-scenarios)
- [🌐 Section 4: React Native System Design, Databases & Situation Handling](#-section-4-react-native-system-design-databases--situation-handling)
- [📡 Section 5: Third-Party Integrations & Backend Proxying](#-section-5-third-party-integrations--backend-proxying)
- [🧪 Section 6: Mobile Testing Frameworks & TDD Strategy](#-section-6-mobile-testing-frameworks--tdd-strategy)
- [🧪 Section 7: Performance Profiling & Native Memory Leak Detection](#-section-7-performance-profiling--native-memory-leak-detection)
- [📦 Section 8: Deployment Pipelines & Store Releases](#-section-8-deployment-pipelines--store-releases)
---

## 🏗️ Section 1: Object-Oriented Programming (OOP) & Conceptual Q&A

*⏱️ 1 min read*

#### 1. Abstract Class Instantiation
An abstract class cannot be instantiated directly. It serves as a base class containing partial implementations and signatures. You must inherit it and implement all its abstract methods in a subclass.

```java
abstract class Animal {
   abstract void sound();
}
// Animal a = new Animal(); // ❌ Error: cannot be instantiated directly

class Dog extends Animal {
   void sound() {
      System.out.println("Bark");
   }
}
Animal dog = new Dog(); // ✅ Works (Polymorphism)
```

#### 2. Interface vs. Abstract Class

| Abstract Class | Interface |
| :--- | :--- |
| Can have fully implemented methods and state. | Acts primarily as a contract (Java 8+ allows default methods). |
| Supports constructors. | Does not support constructors. |
| Single inheritance (class can extend only one class). | Multiple inheritance (class can implement multiple interfaces). |
| Used for sharing common behavior or code structure. | Used to define common capabilities across unrelated classes. |

#### 3. Polymorphism
Polymorphism allows methods to behave differently depending on the class instance calling them.

```javascript
class Animal {
  sound() { console.log("Generic sound"); }
}
class Dog extends Animal {
  sound() { console.log("Bark"); }
}
```

---


---

## 📦 Section 2: Mobile Data Structures & Practical Scenarios

*⏱️ 1 min read*

- **Queue (Circular Queue) for Turn-Based Actions (Round Robin)**: Ideal for turn-based games or round-robin CPU scheduling. Dequeue the active player, execute their turn, and enqueue them back to the tail in $O(1)$ time.
- **Array for Sequential Storage**: Continual memory locations allow $O(1)$ indexing.
- **Stack for History & Undo Operations**: A Last-In-First-Out (LIFO) stack manages page navigation back buttons (popping the active view) and Ctrl+Z undo buffers.
- **Queue for Scheduling**: First-In-First-Out (FIFO) queue organizes incoming call scheduling or API request execution queues fairly.
- **Hash Map for Phone Book Lookup**: Phone numbers mapped to contacts allow immediate $O(1)$ key searches.
- **Tree for File Systems**: File directories with folders and subfolders are modeled using N-ary Tree structures.
- **Queue in BFS / Stack in DFS**: BFS traverses nodes level-by-level using a FIFO Queue. DFS traverses deep down paths using a LIFO Stack (or recursion stack).
- **Tree in React Reconciliation**: React reconciliation conceptually maps the Virtual DOM using a tree hierarchy and traverses changes in linear $O(N)$ time.

---


---

## 🌐 Section 4: React Native System Design, Databases & Situation Handling

*⏱️ 3 min read*

Designing a mobile application requires balancing offline availability, RAM constraints, network instability, and fast rendering.

```text
                                  [Mobile Client]
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 ▼                       ▼                       ▼
            [UI Layer]            [Local Database]       [Network Sync]
        (React Native UI)         (MMKV / Watermelon)      (Axios/WebSockets)
                 │                       │                       │
                 └───────► Read/Write ───┘                       ▼
                                                        [Offline Outbox Queue]
```

#### 1. Local Database Matrix
Choosing the right local storage layer is critical for mobile performance:

| Database | Architecture Type | Read/Write Latency | Max Storage Limit | Sync Protocol & Best For |
| :--- | :--- | :--- | :--- | :--- |
| **MMKV** | Key-Value Store | Extremely Low (< 1ms) | Limited by Device RAM | In-memory mapping serialized directly to disk. Best for small metadata, user tokens, auth flags, and lightweight cache keys. |
| **WatermelonDB** | Relational / SQLite | Low (Lazy-loaded queries) | Multi-gigabyte (Device Storage) | Reactive SQLite layer. Provides local sync schemas (push/pull webhooks). Best for high-frequency relational data (e.g. Chat history, Product feeds, Offline order ledgers). |
| **SQLite (Raw)** | Relational | Medium | Multi-gigabyte | Direct SQL queries. Lacks built-in reactive triggers. Best for legacy native integrations or structured offline reports. |
| **Realm** | Object-Oriented | Low (Live object mappings) | Multi-gigabyte | Syncs automatically with MongoDB Atlas Device Sync. Best for highly complex nested object models requiring live synchronization. |

---

#### 2. Architectural Design Patterns
To maintain a large React Native codebase (100k+ lines of code) with high testability, you should enforce structured architecture patterns:

- **Monorepos (Yarn Workspaces/Turbo)**:
  - Separate concerns into distinct packages: `@app/shared` (types, utilities), `@app/ui` (reusable atomic design components), and `@app/core` (state management, API clients).
  - Maximizes code sharing between iOS, Android, and Web platforms.
- **Clean Architecture & Feature-First Directory Structure**:
  - Organize files by domain feature (e.g., `features/authentication`, `features/checkout`) rather than by technical file type (`components`, `redux`, `hooks`).
  - **Clean Layers**:
    - **Domain Layer (Entities & Rules)**: Pure business logic, independent of UI frameworks.
    - **Data Layer (Repositories & Sources)**: Handles local storage and API integrations.
    - **Presentation Layer (Components & Hooks)**: Focuses strictly on rendering UI layout.
- **MVVM Pattern (Model-View-ViewModel)**:
  - **Model**: Local/server data models (Zustand, React Query data).
  - **View**: Pure React components (`features/checkout/components/PaymentForm.tsx`) focusing on UI layout and styles.
  - **ViewModel**: Custom React hooks (`features/checkout/hooks/usePaymentHandler.ts`) managing UI state, input validation, and business logic.

##### Feature-First Clean MVVM Directory Layout Example (Auth, Profile, Home)
```text
src/
├── features/
│   ├── auth/                      # Authentication Feature Module
│   │   ├── components/            # [View] Presentation UI layouts
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/                 # [ViewModel] Auth states & validation hooks
│   │   │   ├── useLoginViewModel.ts
│   │   │   └── useRegisterViewModel.ts
│   │   ├── services/              # [Data Layer] API clients & storage adapters
│   │   │   └── AuthService.ts
│   │   └── domain/                # [Domain Layer] Pure rules & validation entities
│   │       └── AuthValidation.ts
│   │
│   ├── profile/                   # Profile Management Feature Module
│   │   ├── components/            # [View] User Profile details & edit inputs
│   │   │   ├── ProfileDetails.tsx
│   │   │   └── EditProfileForm.tsx
│   │   ├── hooks/                 # [ViewModel] Avatar updates & edit form controls
│   │   │   └── useProfileViewModel.ts
│   │   ├── services/              # [Data Layer] MMKV secure storage & synchronization
│   │   │   └── ProfileRepository.ts
│   │   └── domain/                # [Domain Layer] User entity schemas
│   │       └── UserEntity.ts
│   │
│   └── home/                      # Dashboard / Home Feature Module
│       ├── components/            # [View] Feed lists, headers, cards & items
│       │   ├── HomeDashboard.tsx
│       │   └── FeedCard.tsx
│       ├── hooks/                 # [ViewModel] Paginated scrolling & refresh state handlers
│       │   └── useHomeViewModel.ts
│       ├── services/              # [Data Layer] Feed request fetching & local cache
│       │   └── FeedService.ts
│       └── domain/                # [Domain Layer] Feed item structures
│           └── FeedItemEntity.ts
```

---

#### 3. Edge-Case Situation Handling

##### A. Low Memory / RAM Limits
Mobile devices (especially older Android phones) can quickly trigger Out-Of-Memory (OOM) crashes:
- **Hermes Garbage Collection**: Hermes uses a generational mark-and-sweep GC. To prevent spikes, avoid allocating large arrays or objects inside high-frequency execution loops.
- **Cell recycling via FlashList**: Replace `FlatList` with `@shopify/flash-list`. FlashList recycles cell views instead of unmounting and recreating them, reducing native allocations.
- **Image Cache Eviction**: Cap image caches in memory and clear them dynamically when the app enters the background:
  ```javascript
  import FastImage from 'react-native-fast-image';
  // Clear memory cache on low-memory warnings or background transitions
  FastImage.clearMemoryCache();
  ```

##### B. Low Network / Offline States
Cellular networks drop out frequently. Apps must handle network changes gracefully:
- **Query Retries with Backoff**: Configure API call wrappers to retry queries with exponential backoff:
  ```javascript
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000)
  });
  ```
- **Persistent Outbox Queue**: Store pending offline mutations in local storage (MMKV or SQLite) and process them sequentially when the device goes back online.
- **Conflict Resolution (Vector Clocks)**: If a user modifies an order offline, append a vector clock timestamp `{ clientVersion: 5, serverVersion: 4 }` to the payload. The server validates if the base version matches the database; if a conflict occurs, it applies a merge resolution strategy (e.g., "Keep Server version" or "Merge items").

##### C. Large Assets & Startup Performance
A large bundle size slows down the app startup:
- **Asset Slicing**: Use Xcode Asset Catalogs (`.xcassets`) and Android drawable folders. The app store serves only the image densities (`@2x`, `@3x`) matching the target device.
- **Lazy Loading Components**: Use `React.lazy()` or dynamic imports to defer loading secondary screens (e.g., settings, profile sub-pages) until the user navigates to them.
- **Convert Images to WebP**: Replace raw PNG/JPG assets with compressed WebP images to decrease bundle footprint.

##### D. Background Tasks
Run tasks in the background without draining the battery:
- **HeadlessJS (Android)**: Start a Java background service that runs a JavaScript task, even when the app is closed.
- **Background Fetch (iOS)**: Use native background fetch tasks scheduled by the iOS system to periodically update local databases.

---


---

## 📡 Section 5: Third-Party Integrations & Backend Proxying

*⏱️ 1 min read*

#### 1. Shopify APIs (REST & GraphQL)
- **Shopify GraphQL Storefront API**:
  - Connect to Shopify using Apollo Client.
  - Query product lists and manage carts in a single round-trip:
    ```graphql
    query getProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
    ```
- **Shopify REST Admin API**:
  - Run admin tasks on a Node.js/Express backend proxy.
  - Rate limits are governed by a **Leaky Bucket** algorithm (default 40 requests/sec). Your backend must check the `X-Shopify-Shop-Api-Call-Limit` response header and queue requests if the bucket is full.
  - **Webhook validation**: Secure Webhooks by hashing the raw request body with your Shopify secret key using HMAC-SHA256, verifying it matches the `x-shopify-hmac-sha256` header.

---

#### 2. Push Notifications (OneSignal)
OneSignal handles target device token registrations and handles incoming pushes:
- **User Token Association**: Map OneSignal's push registration to your internal database user IDs using `OneSignal.login(userId)`.
- **Deep Linking**: Attach metadata `{ targetRoute: "ProductDetails", productId: "123" }` to the notification payload. Listen for notification click events and navigate the user to the correct screen:
  ```javascript
  OneSignal.Notifications.addEventListener('click', (event) => {
    const { targetRoute, productId } = event.notification.additionalData;
    if (targetRoute) {
      navigation.navigate(targetRoute, { id: productId });
    }
  });
  ```

---

#### 3. Node.js & Express.js Mobile Backend API
An API gateway proxying mobile requests should implement key security and rate-limiting features:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Secure Headers
app.use(helmet());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100 // max 100 requests per IP per window
});
app.use('/api/', apiLimiter);

// Mobile Authentication Middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

---


---

## 🧪 Section 6: Mobile Testing Frameworks & TDD Strategy

*⏱️ 1 min read*

Enforcing a Test-Driven Development (TDD) strategy prevents UI regressions and ensures your code is easy to maintain.

```text
                              [TDD Loop: Red-Green-Refactor]
                                           ┌──◄──┐
                                           ▼     │
  1. Write failing test ──► 2. Write minimal code ──► 3. Refactor code
```

#### 1. Testing Pyramid Mappings

- **Unit Testing (Jest)**:
  - Focuses on testing isolated functions, utility helpers, and custom hooks.
  - Use `jest.mock()` to mock native modules (like `react-native-device-info` or `react-native-keychain`).
  - Example (Testing a custom state hook):
    ```javascript
    import { renderHook, act } from '@testing-library/react-hooks';
    import { useCounter } from './useCounter';

    test('should increment counter', () => {
      const { result } = renderHook(() => useCounter());
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(1);
    });
    ```
- **Integration Testing (React Native Testing Library - RNTL)**:
  - Verifies interactions between components, contexts, and hooks.
  - Simulates user actions (like typing, clicking) and asserts that the UI updates correctly.
  - Example:
    ```javascript
    import { render, fireEvent, screen } from '@testing-library/react-native';
    import LoginForm from './LoginForm';

    test('submits username and password', () => {
      const mockSubmit = jest.fn();
      render(<LoginForm onSubmit={mockSubmit} />);
      
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'rajeev');
      fireEvent.press(screen.getByText('Login'));
      
      expect(mockSubmit).toHaveBeenCalledWith('rajeev');
    });
    ```
- **End-to-End Testing (Detox)**:
  - Runs the app on a real device or simulator. It controls the app, simulates actual user taps, and verifies visual outcomes.
  - Uses `testID` attributes to locate components.
  - Example:
    ```javascript
    describe('Login Flow E2E', () => {
      beforeEach(async () => {
        await device.reloadReactNative();
      });

      it('should navigate to home screen on successful login', async () => {
        await element(by.id('username-input')).typeText('rajeev');
        await element(by.id('login-button')).tap();
        await expect(element(by.id('home-screen-header'))).toBeVisible();
      });
    });
    ```

---


---

## 🧪 Section 7: Performance Profiling & Native Memory Leak Detection

*⏱️ 1 min read*

#### 1. Diagnostic Profilers
When users report sluggish rendering or crashes, use these tools to diagnose the cause:
- **Flipper (Performance Logs & Layout)**:
  - Profile the React component tree and inspect state updates.
  - Analyze network traffic and track database queries.
- **Xcode Instruments (iOS Profiling)**:
  - **Allocations**: Monitor RAM memory footprint over time.
  - **Leaks**: Detect object allocations that remain in memory after they are no longer needed.
- **Android Profiler (Android Studio)**:
  - Track CPU usage and inspect thread scheduling.
  - Monitor memory usage to identify staircase-like RAM patterns (indicates memory leaks).

---

#### 2. Finding & Fixing Memory Leaks
Memory leaks in React Native usually occur in the bridge layer between JavaScript and Native memory:
- **Symptom**: Memory usage increases continuously as you navigate back and forth between screens, never returning to its baseline.
- **Common Cause: Uncleaned event listeners**:
  ```javascript
  // ❌ LEAK: AppState listener remains in memory after component unmounts
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  // ✅ FIX: Clean up the event listener
  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, []);
  ```
- **Common Cause: Retained UI View Nodes (Flipper/Leaks)**:
  If a native view is unmounted in JS but remains referenced by a native pointer, it will leak memory. Use Xcode Instruments to trace the retain graph and locate the dangling reference.

---

#### 3. State Management Libraries Comparison

- **Redux Toolkit (RTK)**:
  - **Type**: Global Centralized Store.
  - **Mechanism**: Predictable state updates using actions and reducers.
  - **Best For**: Large-scale client-side UI configurations, user settings, and complex forms.
- **MobX (Observable State)**:
  - **Type**: Reactive / Mutable State.
  - **Mechanism**: Uses observables and reactions. Automatically updates UI components when variables they depend on change.
  - **Best For**: Complex nested relationships requiring high-frequency updates (e.g. Real-time mapping).
- **Recoil / Jotai**:
  - **Type**: Atomic State.
  - **Mechanism**: Uses small, isolated pieces of state (atoms) that can be combined and updated independently.
  - **Best For**: Large apps requiring fine-grained updates without re-rendering the entire component tree.

---


---

## 📦 Section 8: Deployment Pipelines & Store Releases

*⏱️ 1 min read*

#### 1. iOS App Store Release Management
- **iOS Target Upgrades**: Set the minimum iOS target (e.g. iOS 15.0) inside both the Podfile and Xcode build settings.
- **Certificates & Provisioning**:
  - **Development Certificate**: Used to sign apps for local testing.
  - **Distribution Certificate**: Used to sign apps for TestFlight and App Store submission.
  - **Provisioning Profile**: Links your developer certificate and App ID to authorize runs.
- **Fastlane Automation**:
  Use Fastlane to build and upload your app to TestFlight automatically:
  ```bash
  fastlane gym --scheme "ProductionApp" --export_method "app-store"
  fastlane pilot upload_to_testflight
  ```
- **Privacy Manifests (`PrivacyInfo.xcprivacy`)**:
  Declare all SDKs (Sentry, Firebase) and APIs that track user data inside Xcode's Privacy Manifest to pass App Store review.

---

#### 2. Android Play Store Release Management
- **Compile & Target SDK**:
  Set target SDK versions inside `android/app/build.gradle`:
  ```groovy
  android {
      compileSdkVersion 34
      defaultConfig {
          targetSdkVersion 34
      }
  }
  ```
- **Signing Keys (Keystore)**:
  Sign your production build using a secure keystore file configured in `gradle.properties`:
  ```properties
  MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
  MYAPP_RELEASE_KEY_ALIAS=my-key-alias
  ```
- **Google Play Release Tracks**:
  - **Internal Sharing**: Share builds instantly with testers without Google review.
  - **Closed / Open Testing**: Release builds to beta testers. Requires a short review time.
  - **Production Track**: Release the app to the general public. Use progressive rollouts (e.g. 5% ➡️ 20% ➡️ 100%) to monitor crash rates on Sentry before reaching all users.

---

