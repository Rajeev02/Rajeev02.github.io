# System Design

## Table of Contents

- [Section 1: 🏗️ Object-Oriented Programming (OOP) & Conceptual Q&A](#section-1-object-oriented-programming-oop-conceptual-q-a)
- [Section 2: 📦 Mobile Data Structures & Practical Scenarios](#section-2-mobile-data-structures-practical-scenarios)
- [Section 3: Mobile System Design: Large-Scale React Native Architecture](#section-3-mobile-system-design-large-scale-react-native-architecture)
- [Section 4: 📡 Third-Party Integrations & Backend Proxying](#section-4-third-party-integrations-backend-proxying)
- [Section 5: 🧪 Mobile Testing Frameworks & TDD Strategy](#section-5-mobile-testing-frameworks-tdd-strategy)
- [Section 6: 🧪 Performance Profiling & Native Memory Leak Detection](#section-6-performance-profiling-native-memory-leak-detection)
- [Section 7: 📦 Deployment Pipelines & Store Releases](#section-7-deployment-pipelines-store-releases)
- [Section 8: 🧠 Program 1: LRU Cache with TTL & PubSub Event Notifications](#section-8-program-1-lru-cache-with-ttl-pubsub-event-notifications)
- [Section 9: 📡 Program 2: Asynchronous Sync Outbox Queue with Batching & Exponential Backoff](#section-9-program-2-asynchronous-sync-outbox-queue-with-batching-exponential-backoff)
- [Section 10: 🔍 Program 3: Prefix Auto-Suggestions Trie with Priority Heap & Input Debouncing](#section-10-program-3-prefix-auto-suggestions-trie-with-priority-heap-input-debouncing)


---

### System Design OOP Complete Guide

> 🎯 **Topic:** System Design OOP Complete Guide
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---



---

> 🎯 **Topic:** Section 1: Object-Oriented Programming (OOP) & Conceptual Q&A
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 1: 🏗️ Object-Oriented Programming (OOP) & Conceptual Q&A

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

---

> 🎯 **Topic:** 📦 Section 2: Mobile Data Structures & Practical Scenarios
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 2: 📦 Mobile Data Structures & Practical Scenarios

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

---

> 🎯 **Topic:** Mobile System Design: Large-Scale React Native Architecture
> 📊 **Difficulty:** Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 👨💼 Lead Round Favorite • 🔥 Must Revise • 🏢 MNC Favorite

---

## Section 3: Mobile System Design: Large-Scale React Native Architecture

### Concept Summary
Mobile System Design differs heavily from Backend System Design. Instead of focusing on load balancers and horizontal database scaling, mobile system design focuses on **offline-first capabilities**, **local database limits**, **battery consumption**, **UI responsiveness (60/120FPS)**, and **over-the-air (OTA) updates**. 

### Requirements
*Example Prompt: Design a WhatsApp-like Chat Application in React Native.*
- **Functional:** 1-on-1 chat, group chat, image sharing, offline message composition.
- **Non-Functional:** Fast startup time (< 2s), 60 FPS scrolling, battery efficient, secure storage for tokens.

### Architecture Diagram
```mermaid
graph TD;
    UI[React Native UI (Fabric)] --> State[Zustand / Redux Toolkit]
    State --> Query[React Query / SWR]
    Query --> LocalDB[(WatermelonDB / MMKV)]
    Query --> Network[Axios + Interceptors]
    Network --> Socket((WebSockets))
    Network --> REST((REST API))
    Socket --> Server[Chat Backend]
    REST --> Server
```

### Database Design
For complex relational data (like Chat threads and Messages), using `AsyncStorage` or `MMKV` is an anti-pattern because they are Key-Value stores. They require loading massive JSON strings into JS memory to filter/sort.

**Optimal Choice:** **WatermelonDB** or **Realm**
- **WatermelonDB** uses a SQLite backbone but pushes all querying to a background thread. Only the visible records are loaded into JS memory, making it highly optimized for React Native lists (`FlatList`).

### API Design
- **REST:** Used for heavy, one-off operations (fetching chat history, uploading media).
- **WebSockets / gRPC:** Used for real-time bi-directional message syncing.
- **GraphQL:** Excellent for reducing over-fetching if the app needs complex relational data across multiple entities.

### Scaling Considerations
- **Memory Scaling:** FlatLists will crash if thousands of messages are loaded. Use `windowSize`, `maxToRenderPerBatch`, and `initialNumToRender` to recycle views.
- **Image Scaling:** Use `react-native-fast-image` (or Expo Image) to utilize SDWebImage/Glide native caching to prevent memory leaks during rapid scrolling.

### Caching Strategy
- **React Query:** Manages server-state caching, deduplicates requests, and handles background refetching.
- **MMKV:** Fast, synchronous Key-Value store used ONLY for scalar values (auth tokens, theme preferences, feature flags).

### Offline Strategy
1. **Outbox Pattern:** When offline, messages are stored in a local SQLite `outbox_queue` table with status `PENDING`.
2. **Background Sync:** Use `react-native-background-fetch` or WorkManager/BackgroundTasks. When network is restored, an interceptor dequeues messages, sends them via API, and marks them `SENT`.
3. **Optimistic UI:** Immediately render the message in the UI with a "clock" icon before the server confirms receipt.

### Security Considerations
- **Token Storage:** Never store JWTs in raw AsyncStorage. Use `react-native-keychain` (iOS Keychain / Android Keystore) or MMKV with encryption.
- **SSL Pinning:** Prevent Man-in-the-Middle (MITM) attacks by pinning the backend SSL certificate using `react-native-ssl-public-key-pinning`.
- **Code Obfuscation:** Use ProGuard/R8 on Android and DexGuard to obfuscate native code and Hermes bytecode encryption for JS.

### Trade-Offs
- **WebSockets vs. Push Notifications:** WebSockets are real-time but drain battery if kept alive in the background. **Trade-off:** Keep WebSockets open *only* when the app is in the foreground. Fall back to APNS/FCM Push Notifications when the app goes into the background.

### React Native Perspective
Unlike native Swift/Kotlin, RN shares a single JS thread. If you parse a 10MB JSON response from the chat server synchronously, the UI thread will freeze. 
**Solution:** Use background threads (React Native Reanimated Worklets) for heavy computations, or parse large JSON payloads natively before passing them over the JSI bridge.

### Senior-Level Follow-Ups
### Q: How do you handle OTA (Over-the-Air) updates breaking the app?
**A:** Use CodePush or Expo Updates. I would implement a phased rollout strategy (10% -> 50% -> 100%). Crucially, if an OTA update touches a screen that requires a new Native Module not present in the current binary, the app will crash. I always implement a version-check boundary: `if (nativeVersion >= requiredVersion) { renderNewFeature() }`.

### Q: Explain how you would profile memory leaks in this chat app.
**A:** I would use Xcode Instruments (Allocations/Leaks) for the iOS native layer and Android Studio Profiler for Android. For the JS layer, I would take a Heap Snapshot using the Hermes Debugger (via Flipper or Chrome DevTools) before and after opening a chat screen. If the detached DOM nodes or React Fibers remain in memory after the screen unmounts, I investigate lingering closures or un-cleared event listeners.

---

> 🎯 **Topic:** 📡 Section 5: Third-Party Integrations & Backend Proxying
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 4: 📡 Third-Party Integrations & Backend Proxying

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

---

> 🎯 **Topic:** 🧪 Section 6: Mobile Testing Frameworks & TDD Strategy
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 5: 🧪 Mobile Testing Frameworks & TDD Strategy

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

---

> 🎯 **Topic:** 🧪 Section 7: Performance Profiling & Native Memory Leak Detection
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 6: 🧪 Performance Profiling & Native Memory Leak Detection

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

---

> 🎯 **Topic:** 📦 Section 8: Deployment Pipelines & Store Releases
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 7: 📦 Deployment Pipelines & Store Releases

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

---

> 🎯 **Topic:** Coding 01 Introduction
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


<!-- INDEX_START -->

<!-- INDEX_END -->

---

> 🎯 **Topic:** 🧠 Program 1: LRU Cache with TTL & PubSub Event Notifications
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 8: 🧠 Program 1: LRU Cache with TTL & PubSub Event Notifications
*⏱️ 2 min read*

### Problem Statement
In a high-performance React Native application, you need to implement a client-side memory cache for API responses. To prevent memory leaks and stale data, the cache must combine three distinct concepts:
1. **Least Recently Used (LRU) Eviction Policy**: Keep maximum cache capacity capped at $C$ items. Evictions of the least recently accessed item must execute in $O(1)$ time.
2. **Time-To-Live (TTL) Expiration**: Each key must be configured with a expiration timer (in milliseconds). When a key expires, it must be automatically evicted and its memory reclaimed.
3. **PubSub Event Notifications**: Introduce a publish-subscribe system allowing UI components or logging services to subscribe to cache actions (`'set'`, `'get'`, `'evict'`, `'expire'`).

---

### Implementation (JavaScript)

```javascript
class Node {
  constructor(key, value, ttl) {
    this.key = key;
    this.value = value;
    this.expiryTime = Date.now() + ttl;
    this.timer = null;
    this.prev = null;
    this.next = null;
  }
}

class LRUCacheWithTTL {
  constructor(capacity, defaultTTL = 60000) {
    this.capacity = capacity;
    this.defaultTTL = defaultTTL;
    this.map = new Map(); // Key -> Node
    this.head = new Node(null, null, 0); // Sentinel head
    this.tail = new Node(null, null, 0); // Sentinel tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
    
    // PubSub events store
    this.subscribers = {
      set: [],
      get: [],
      evict: [],
      expire: []
    };
  }

  // --- PubSub Methods ---
  subscribe(event, callback) {
    if (!this.subscribers[event]) return () => {};
    this.subscribers[event].push(callback);
    // Return unsubscribe function for cleanup in React useEffect
    return () => {
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
    };
  }

  publish(event, payload) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(payload));
    }
  }

  // --- Doubly Linked List Operations ---
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _moveToHead(node) {
    this._remove(node);
    this._addToHead(node);
  }

  // --- Cache Operations ---
  get(key) {
    if (!this.map.has(key)) {
      return null;
    }
    const node = this.map.get(key);
    
    // Check if item has expired
    if (Date.now() > node.expiryTime) {
      this._expireNode(key);
      return null;
    }
    
    this._moveToHead(node);
    this.publish('get', { key, value: node.value });
    return node.value;
  }

  set(key, value, ttl = this.defaultTTL) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      clearTimeout(node.timer);
      node.value = value;
      node.expiryTime = Date.now() + ttl;
      this._moveToHead(node);
      this._setupExpirationTimer(node, ttl);
      this.publish('set', { key, value, ttl });
      return;
    }

    if (this.map.size >= this.capacity) {
      const tailNode = this.tail.prev;
      this._evict(tailNode.key);
    }

    const newNode = new Node(key, value, ttl);
    this.map.set(key, newNode);
    this._addToHead(newNode);
    this._setupExpirationTimer(newNode, ttl);
    this.publish('set', { key, value, ttl });
  }

  _setupExpirationTimer(node, ttl) {
    node.timer = setTimeout(() => {
      this._expireNode(node.key);
    }, ttl);
  }

  _expireNode(key) {
    if (!this.map.has(key)) return;
    const node = this.map.get(key);
    clearTimeout(node.timer);
    this._remove(node);
    this.map.delete(key);
    this.publish('expire', { key, value: node.value });
  }

  _evict(key) {
    if (!this.map.has(key)) return;
    const node = this.map.get(key);
    clearTimeout(node.timer);
    this._remove(node);
    this.map.delete(key);
    this.publish('evict', { key, value: node.value });
  }
}
```

---

### Complexity Analysis
- **Time Complexity**:
  - `get(key)`: $O(1)$ lookup via Hash Map, $O(1)$ DLL node rearrangement.
  - `set(key, value)`: $O(1)$ insertion, $O(1)$ DLL rearrangement, and $O(1)$ timer scheduling.
  - Expiration / Eviction triggers: $O(1)$ node deletions.
- **Space Complexity**: $O(C)$ where $C$ is the capacity limit. The Map and DLL store at most $C$ items at any given moment.

---

---

> 🎯 **Topic:** 📡 Program 2: Asynchronous Sync Outbox Queue with Batching & Exponential Backoff
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 9: 📡 Program 2: Asynchronous Sync Outbox Queue with Batching & Exponential Backoff
*⏱️ 2 min read*

### Problem Statement
In an offline-first mobile app, users can create and edit data transactions (like orders or chat messages) when network connectivity is lost. You must write a robust, asynchronous **Sync Outbox Manager** that:
1. **Outbox Action Stacking**: Local modifications are stacked as structured actions `{ id, endpoint, payload, attempts: 0 }`.
2. **Dynamic Batching**: Periodically processes queued operations in batches (e.g., maximum 3 operations per outbound HTTP POST API call).
3. **Exponential Backoff Retries**: If a network request fails (network error or `5xx Server Error`), retry the specific batch using an exponential backoff timing algorithm (e.g., $Base \times 2^{attempts}$ milliseconds) up to a max attempt count.
4. **Local State Persistence Sync**: Persistence triggers to save remaining queue states to local storage (mocked) upon any state mutation.

---

### Implementation (JavaScript)

```javascript
class SyncOutboxManager {
  constructor(apiClient, storageMock, batchSize = 3, maxAttempts = 5) {
    this.apiClient = apiClient;
    this.storageMock = storageMock;
    this.batchSize = batchSize;
    this.maxAttempts = maxAttempts;
    this.queue = [];
    this.isProcessing = false;
  }

  // --- Outbox Management ---
  async addAction(endpoint, payload) {
    const action = {
      id: Math.random().toString(36).substr(2, 9),
      endpoint,
      payload,
      attempts: 0
    };
    this.queue.push(action);
    await this._persistQueue();
    this.triggerSync();
  }

  async _persistQueue() {
    await this.storageMock.setItem('outbox_queue', JSON.stringify(this.queue));
  }

  async loadPersistedQueue() {
    const data = await this.storageMock.getItem('outbox_queue');
    if (data) {
      this.queue = JSON.parse(data);
    }
  }

  // --- Async Processing Loop ---
  async triggerSync() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      // 1. Slice out a batch of actions
      const batch = this.queue.slice(0, this.batchSize);
      console.log(`Processing batch of ${batch.length} actions...`);
      
      try {
        // 2. Dispatch batch request
        await this.apiClient.sendBatch(batch);
        
        // 3. Success: Remove batch from queue
        this.queue.splice(0, batch.length);
        await this._persistQueue();
        console.log(`Successfully synced ${batch.length} items.`);
      } catch (error) {
        console.error("Batch sync failed. Initializing backoff...", error.message);
        
        // 4. Failure: Apply exponential backoff and retry limits on the current batch
        const failedAction = batch[0];
        failedAction.attempts++;
        
        if (failedAction.attempts >= this.maxAttempts) {
          console.warn(`Action ${failedAction.id} exceeded max retries. Dropping.`);
          this.queue.shift(); // Drop the un-syncable action
          await this._persistQueue();
        } else {
          // Calculate delay: Base 1000ms * 2^attempts
          const delay = 1000 * Math.pow(2, failedAction.attempts);
          console.log(`Retrying in ${delay}ms...`);
          
          this.isProcessing = false; // Pause processing loop
          setTimeout(() => {
            this.triggerSync();
          }, delay);
          return;
        }
      }
    }
    this.isProcessing = false;
  }
}
```

---

### Complexity Analysis
- **Time Complexity**:
  - `addAction`: $O(1)$ queue append, $O(S)$ serialization write to storage (where $S$ is queue size).
  - Batching processing: $O(N / B)$ network round trips (where $N$ is queue size, $B$ is batch limit).
- **Space Complexity**: $O(N)$ memory allocations where $N$ is the count of pending offline transactions.

---

---

> 🎯 **Topic:** 🔍 Program 3: Prefix Auto-Suggestions Trie with Priority Heap & Input Debouncing
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## Section 10: 🔍 Program 3: Prefix Auto-Suggestions Trie with Priority Heap & Input Debouncing
*⏱️ 2 min read*

### Problem Statement
In a mobile search interface, you need to implement a lightning-fast search suggestions box. Since network latency makes fetching suggestions from the server on every keystroke too slow, you cache candidate query terms locally and resolve searches using a custom client-side pipeline combining:
1. **Trie (Prefix Tree)**: Store query terms (such as "react", "react native", "redux") efficiently.
2. **Frequency-Weighted Suggestions**: Each search term node inside the Trie stores a `frequency` weight. Prefix matching must return suggestions sorted by popularity.
3. **Priority Queue / Max-Heap**: Extracted candidates are sorted using a Max-Heap based on their popularity weights.
4. **Input Debouncer**: Wrap client input query calls in a debounce closure to prevent triggering searches while the user is actively typing.

---

### Implementation (JavaScript)

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
    this.frequency = 0;
    this.wordStr = "";
  }
}

class AutoSuggestTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, frequency = 1) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isWord = true;
    node.frequency = frequency;
    node.wordStr = word;
  }

  // --- Suggestion Prefix Matching ---
  getSuggestions(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return []; // No matches found
      }
      node = node.children[char];
    }

    // Accumulate all descendant leaf nodes representing completed words
    const candidates = [];
    this._dfsCollect(node, candidates);

    // Sort candidates by frequency using a Max-Heap structure conceptually
    const heap = new MaxHeap(candidates);
    const sortedSuggestions = [];
    while (heap.size() > 0 && sortedSuggestions.length < 5) {
      sortedSuggestions.push(heap.extractMax().wordStr);
    }
    return sortedSuggestions;
  }

  _dfsCollect(node, arr) {
    if (node.isWord) {
      arr.push(node);
    }
    for (const child in node.children) {
      this._dfsCollect(node.children[child], arr);
    }
  }
}

// --- Max-Heap Implementation for Priority Sorting ---
class MaxHeap {
  constructor(arr = []) {
    this.heap = [];
    for (const val of arr) {
      this.insert(val);
    }
  }

  size() {
    return this.heap.length;
  }

  insert(node) {
    this.heap.push(node);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return max;
  }

  _bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIdx];
      if (element.frequency <= parent.frequency) break;
      this.heap[index] = parent;
      index = parentIdx;
    }
    this.heap[index] = element;
  }

  _sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.frequency > element.frequency) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild.frequency > element.frequency) ||
          (swap !== null && rightChild.frequency > leftChild.frequency)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = element;
  }
}

// --- Debouncer Function Wrapper ---
function debounceSearch(searchFn, delay = 300) {
  let timerId = null;
  return function (...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      searchFn.apply(this, args);
    }, delay);
  };
}
```

---

### Complexity Analysis
- **Time Complexity**:
  - Insert query: $O(L)$ where $L$ is the word length.
  - Suggestion traversal (Trie traversal to prefix node): $O(P)$ where $P$ is prefix search length.
  - Candidate extraction: $O(M)$ where $M$ is the number of matching descendant words.
  - Sorting via Max-Heap: $O(M \log M)$ to heapify/extract top 5.
- **Space Complexity**: $O(K \times L)$ where $K$ is total words and $L$ is average word length.

---

### 🛠️ Section 3: Scenario-Based Coding Algorithms (40+ Problems)

> 🎯 **Topic:** 🛠️ Section 3: Scenario-Based Coding Algorithms (40+ Problems)
> 📊 **Difficulty:** Hard | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---



*⏱️ 2 min read*

### Array Algorithms
- **First Non-Repeating Element**: Loop through once to populate a frequency map, then loop a second time to find the first element with a count of 1.
- **Second Largest Number**: Traverse the array tracking two variables (`first` and `second`). If `num > first`, shift `first` to `second` and update `first`.
- **Move Zeros to End**: Use a write pointer `insertPos`. Iterate through the array; if an element is non-zero, swap it with the element at `insertPos` and increment `insertPos`.
- **Rotate Array by K**: Reverse the entire array, reverse the first $K$ elements, and then reverse the remaining $N-K$ elements in $O(1)$ auxiliary space.
- **Find Missing Number**: Calculate the expected arithmetic sum from $1$ to $N$ using $\frac{N(N+1)}{2}$ and subtract the actual array sum.

### String Algorithms
- **Check Palindrome**: Run two pointers from the outer ends (`left`, `right`) meeting at the center, asserting character equality.
- **Reverse Words**: Split the string by spaces, swap elements using two pointers meeting in the middle, and join them back.
- **Duplicate Characters**: Count character occurrences inside a Map and filter keys with counts greater than 1.
- **Check Anagram**: Build a frequency count map from the first string. Decrement counts for each character in the second string. If any count reaches negative or character is missing, they are not anagrams.

### HashMap Algorithms
- **Highest Frequency Element**: Build a frequency map and track the key that holds the maximum count.
- **Group Anagrams**: Sort each string alphabetically. Use the sorted string as a Hash Map key to group matching anagrams in an array.

### Stack & Queue Algorithms
- **Valid Parentheses**: Iterate through characters. Push opening brackets onto a stack. For closing brackets, pop from the stack and assert they match.
- **Min Stack Design**: Keep an auxiliary stack (`minStack`) that stores the minimum values. On a `push(val)`, if the value is less than or equal to the top of `minStack`, push it onto `minStack`.
- **Implement Queue using Stacks**: Use two stacks: `stack1` for enqueue and `stack2` for dequeue. If `stack2` is empty, pop all elements from `stack1` and push them onto `stack2`.

### Linked List & Tree Algorithms
- **Reverse Linked List**: Use three pointers (`prev`, `curr`, `nextNode`) to swap node links in place.
- **Detect Loop (Floyd's Cycle)**: Move a slow pointer by 1 node and a fast pointer by 2 nodes. If they meet, a cycle exists.
- **BST Validation**: Recursively validate that nodes fall between a dynamic `min` and `max` range.

---

---

