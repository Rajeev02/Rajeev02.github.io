# Volume 4 – Set 4 – React Native Core

## Question 1 — ScrollView vs FlatList Memory Usage

### Difficulty
Easy

### Concepts Being Tested
- Rendering Performance
- Memory Management
- Virtualized Lists

---

### 1. Interview Question
"You have a list of 5,000 user profiles to display. A junior developer used a `<ScrollView>` and mapped over the array. The app takes 10 seconds to load this screen, and scrolling is extremely laggy. Why did this happen, and how does `<FlatList>` fix it?"

---

### 2. What the Interviewer is Evaluating
Checking if the candidate understands *virtualization* and how React Native handles memory for massive UI components.

---

### 3. Ideal Answer
`<ScrollView>` renders **all 5,000 child components immediately**, regardless of whether they are visible on the screen or not. This requires allocating massive amounts of memory on both the JS thread and the Native UI thread, causing the 10-second freeze and eventual crashes.

`<FlatList>` fixes this through **Virtualization**. It only renders the items currently visible on the screen (plus a few off-screen buffer items). As the user scrolls, it recycles the off-screen views and replaces their data with the new items, keeping memory usage flat and rendering time minimal.

---

### 4. Code Example
```typescript
// BAD: Mounts 5000 views at once
<ScrollView>
  {users.map(user => <UserCard key={user.id} user={user} />)}
</ScrollView>

// GOOD: Virtualized, only mounts ~10 views at a time
<FlatList
  data={users}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <UserCard user={item} />}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

---

### 5. Production Scenario
- **Root Cause:** A startup's social feed was built using `ScrollView`. As the company grew, users started following thousands of people.
- **Investigation:** Users on older Android devices reported the app crashing immediately upon opening the feed. Memory profiling showed a massive spike in UI View allocations.
- **Solution:** Migrated to `FlatList`. 
- **Lessons Learned:** Never use `ScrollView` for unbounded data arrays.

---

### 6. Alternative Solutions & Trade-offs
- **`FlatList` (Current)**
  - *Advantages:* Built into React Native, reliable.
  - *Disadvantages:* Can still suffer from "blank space" when scrolling extremely fast.
- **`FlashList` (by Shopify)**
  - *Advantages:* Uses true View Recycling (reusing native views instead of destroying and creating new ones), vastly superior performance.
  - *Disadvantages:* Third-party dependency, slight learning curve.

---

### 7. Common Mistakes
- **Putting an anonymous arrow function in `renderItem`:** `<FlatList renderItem={() => <Card />} />`. This creates a brand new function reference on every render, destroying FlatList's internal optimizations.
- **Not defining a `keyExtractor`:** Causes React to fall back to array indices, leading to UI bugs when items are reordered or deleted.

---

### 8. Follow-up Questions
1. What does `removeClippedSubviews` do?
2. How do you prevent the "blank spaces" when scrolling very fast in a FlatList?
3. Why did Shopify create `FlashList` if `FlatList` already exists?

---

### 9. How a Senior/Lead Engineer Answers
A senior engineer will discuss **View Recycling**. They will explain that `FlatList` doesn't actually recycle native views—it destroys them and mounts new React components, which still incurs bridge overhead. They will recommend `FlashList` for any true enterprise app, as it recycles the Native Views directly (similar to Android's `RecyclerView` or iOS's `UICollectionView`), resulting in 5-10x faster scroll performance and zero blank spaces.

---

### 10. Interview Tips
Mentioning `FlashList` by Shopify immediately flags you as an up-to-date, senior-level React Native developer.

***

## Question 2 — The React Native Bridge Bottleneck

### Difficulty
Medium

### Concepts Being Tested
- The Old Architecture (Bridge)
- JSON Serialization
- JS Thread vs UI Thread

---

### 1. Interview Question
"In the classic React Native architecture, you have a heavy animation running using `Animated.timing`. At the same time, you start an API call that parses a massive JSON response. The animation suddenly stutters and pauses. Explain exactly why this happens in relation to the React Native Bridge."

---

### 2. What the Interviewer is Evaluating
Testing deep architectural knowledge of how React Native actually works under the hood (the Bridge mechanism) and how it handles concurrency.

---

### 3. Ideal Answer
In the classic architecture, the JS thread and the Native UI thread communicate by sending serialized JSON messages back and forth across an asynchronous **Bridge**.

If `useNativeDriver: false` was used, the animation requires the JS thread to calculate every frame and send a JSON message across the bridge 60 times a second. 
When the massive API response arrives, parsing it blocks the single JS thread. Because the JS thread is blocked, it stops sending the animation frames across the bridge. The UI thread waits for instructions that never arrive, causing the animation to freeze.

---

### 4. Code Example
```typescript
// BAD: Animation runs on JS thread, blocking the bridge
Animated.timing(opacity, {
  toValue: 1,
  duration: 1000,
  useNativeDriver: false, // This is the killer
}).start();

// GOOD: Animation runs entirely on the Native UI thread
Animated.timing(opacity, {
  toValue: 1,
  duration: 1000,
  useNativeDriver: true, // Bypasses the JS thread completely
}).start();
```

---

### 5. Production Scenario
- **Root Cause:** A map-based app parsed thousands of location markers on load. Simultaneously, a "loading spinner" animation was running.
- **Investigation:** The spinner completely froze for 3 seconds while the markers parsed.
- **Solution:** We switched the spinner to `Lottie` (which runs natively) and ensured `useNativeDriver: true` was set. We also moved the JSON parsing to a native background thread.
- **Lessons Learned:** The JS thread is precious. Offload everything possible to Native.

---

### 6. Alternative Solutions & Trade-offs
- **`useNativeDriver: true`**
  - *Advantages:* Freezes are eliminated because the animation instructions are sent to the UI thread once, up front.
  - *Disadvantages:* Can only animate non-layout properties (opacity, transform). Cannot animate width, height, or colors.
- **Reanimated (v2/v3)**
  - *Advantages:* Runs animations synchronously on the UI thread using Worklets, allowing layout animations without bridge latency.
  - *Disadvantages:* Higher complexity.

---

### 7. Common Mistakes
- **Assuming all animations can use Native Driver:** Trying to animate `height` with `useNativeDriver: true` will throw a runtime error.
- **Using `setInterval` for animations:** Completely saturates the bridge and drops frames.

---

### 8. Follow-up Questions
1. How does Reanimated bypass the Bridge?
2. What are the three main threads in a React Native app?
3. How does the New Architecture (JSI) solve the JSON serialization problem?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will pivot this to discuss the **New Architecture**. They will explain that the Bridge is being deprecated. With **JSI (JavaScript Interface)**, the JS thread can hold direct references to C++ host objects. This means we no longer have to serialize data into JSON strings to pass messages; JS can invoke native methods synchronously, eliminating the queueing and serialization bottlenecks entirely.

---

### 10. Interview Tips
Always clarify the difference between the **JS Thread** and the **UI/Main Thread**. It's the most important concept in React Native.

***

## Question 3 — Deep Linking and Navigation State

### Difficulty
Medium

### Concepts Being Tested
- React Navigation
- Deep Linking Configuration
- Cold vs Warm Starts

---

### 1. Interview Question
"A user receives a push notification. If the app is already open in the background (warm start), clicking the notification takes them perfectly to the `OrderDetails` screen. But if the app is completely killed (cold start), clicking the notification just opens the app to the `Home` screen. How do you fix this?"

---

### 2. What the Interviewer is Evaluating
Testing practical experience with mobile-specific flows. Handling deep links on cold starts is a notoriously tricky issue that every mid-level developer faces.

---

### 3. Ideal Answer
On a warm start, the app is already running, so event listeners for deep links/notifications fire immediately. 
On a **cold start**, the app is destroyed. The notification launches the app, but by the time React Navigation mounts, the initial notification event has already been consumed or missed.

To fix this, we must configure the `getInitialURL` method in React Navigation's linking configuration. This tells React Navigation to explicitly check if the app was launched by a URL or Notification during its initial mount, and if so, route to that specific screen instead of the default `Home` screen.

---

### 4. Code Example
```typescript
import { LinkingOptions } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      OrderDetails: 'order/:id',
    },
  },
  // Handles Cold Starts
  async getInitialURL() {
    // Check if app was launched via deep link
    const url = await Linking.getInitialURL();
    if (url != null) return url;

    // Check if app was launched via Push Notification
    const message = await messaging().getInitialNotification();
    if (message?.data?.deeplink) {
      return message.data.deeplink;
    }
    return null;
  },
  // Handles Warm Starts
  subscribe(listener) {
    const onReceiveURL = (url: string) => listener(url);
    Linking.addEventListener('url', onReceiveURL);
    // ... setup push notification foreground listener
    return () => {
      // cleanup listeners
    };
  },
};

// Usage
<NavigationContainer linking={linking}> ... </NavigationContainer>
```

---

### 5. Production Scenario
- **Root Cause:** Marketing sent out a massive push notification campaign with a discount code.
- **Investigation:** Users who had force-quit the app tapped the notification and landed on the Home screen without the discount code applied. Conversion rates plummeted.
- **Solution:** Implemented `getInitialURL` to capture the cold-start notification payload and correctly hydrate the navigation state.
- **Lessons Learned:** Always test deep links from a fully killed app state, not just backgrounded.

---

### 6. Alternative Solutions & Trade-offs
- **Manual Navigation in App.tsx**
  - *Advantages:* Hacky but quick.
  - *Disadvantages:* Violates React Navigation paradigms, causes race conditions where the UI flashes Home before jumping to OrderDetails.
- **React Navigation Linking Config (Current)**
  - *Advantages:* The router natively handles the initial state before rendering the first frame, preventing UI flashing.

---

### 7. Common Mistakes
- **Using `useEffect` to handle cold starts:** Trying to wait for the app to load and then calling `navigation.navigate()`. This results in a jarring user experience where they see the Home screen, and a second later, get pushed to the target screen.
- **Not mapping parameters correctly:** Failing to map the `:id` in the URL to the screen's route params.

---

### 8. Follow-up Questions
1. What is the difference between a Universal Link (iOS) and a App Link (Android) vs a custom URI scheme?
2. How do you handle authentication when deep linking? (e.g., The user is logged out but clicks an order link).
3. How do you pass complex objects (not just strings) through a deep link?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will address the **Authentication Guard** edge case. They will explain that deep links shouldn't just route blindly. If the user is logged out, the linking config should capture the intended destination, route them to the Login screen, store the deep link in a Redux/Zustand slice, and then *resume* the deep link navigation automatically after successful authentication.

---

### 10. Interview Tips
Mention "Cold Start vs Warm Start" clearly. It shows you understand the mobile operating system lifecycle, not just React.

***

## Question 4 — App Startup Time Optimization

### Difficulty
Hard

### Concepts Being Tested
- Hermes Engine
- Bundle Size
- Inline Requires

---

### 1. Interview Question
"Your React Native app takes 7 seconds to open and show the first interactive screen (TTI - Time to Interactive). Users are complaining and leaving bad reviews. How do you systematically identify the bottlenecks and optimize the startup time?"

---

### 2. What the Interviewer is Evaluating
Testing systematic debugging, profiling tools, and knowledge of React Native specific optimizations (Hermes, Metro, Native Modules).

---

### 3. Ideal Answer
A 7-second startup time is usually caused by the JS engine parsing a massive JavaScript bundle before it can render anything. 

My systematic approach:
1. **Enable Hermes:** If it's not enabled, enable it. Hermes pre-compiles JS into bytecode at build time (AOT compilation), drastically reducing parse time on launch.
2. **Enable Inline Requires:** This tells the Metro bundler to delay requiring modules/files until they are actually executed, rather than loading the entire app's source code into memory at boot.
3. **Lazy Load Non-Critical Components:** Use `React.lazy` for screens the user isn't seeing immediately (like Settings or Profile).
4. **Profile Native Modules:** Check if a heavy Native Module (like Firebase or an SDK) is blocking the Main UI Thread synchronously during the `AppDelegate.mm` (iOS) or `MainApplication.java` (Android) initialization.

---

### 4. Code Example
```typescript
// BAD: Loaded at startup
import { HeavyChartComponent } from './HeavyChart';

// GOOD: Loaded only when the user navigates to this screen (Inline Require/Lazy)
import React, { lazy, Suspense } from 'react';

const HeavyChartComponent = lazy(() => import('./HeavyChart'));

export const Dashboard = () => (
  <Suspense fallback={<Spinner />}>
    <HeavyChartComponent />
  </Suspense>
);
```

---

### 5. Production Scenario
- **Root Cause:** A developer imported `moment.js` and a massive custom icon font file in the root `App.tsx`.
- **Investigation:** Using the Flipper Startup Profiler, we saw the JS initialization taking 4 seconds. The bundle size had ballooned to 15MB.
- **Solution:** Replaced `moment.js` with `date-fns` (tree-shakeable), enabled Hermes, and moved heavy imports to lazy-loaded routes. Startup time dropped to 1.5 seconds.
- **Lessons Learned:** Every import at the top of a file adds to the initial bundle parse time.

---

### 6. Alternative Solutions & Trade-offs
- **Hermes (Current standard)**
  - *Advantages:* Best startup time, lower memory footprint.
  - *Disadvantages:* Slightly slower peak execution performance compared to V8 (though rarely noticeable in UI).
- **V8 (Standard Android)**
  - *Advantages:* Fast execution (JIT).
  - *Disadvantages:* JIT compilation happens at runtime, causing slow app boot times.

---

### 7. Common Mistakes
- **Initializing all SDKs synchronously on boot:** e.g., starting Analytics, Crashlytics, Intercom, and Map SDKs in `App.tsx` before the first render.
- **Ignoring image sizes:** Loading a 5MB splash screen image natively.

---

### 8. Follow-up Questions
1. What is the difference between JIT (V8) and AOT (Hermes) compilation?
2. How do you analyze the size of your JavaScript bundle? (Hint: `react-native-bundle-visualizer`).
3. How can Native code slow down a React Native startup?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will talk about **Native initialization bottlenecks**. They will explain that if the Android `Application.onCreate` or iOS `didFinishLaunchingWithOptions` contains synchronous, blocking SDK initializations, no amount of JS optimization will fix the startup time. They will advocate for moving third-party SDK initializations to background threads natively, or deferring them until after the first React frame is rendered.

---

### 10. Interview Tips
Use the acronyms **TTI** (Time To Interactive) and **AOT** (Ahead of Time compilation). It sounds highly professional.

***

## Question 5 — Writing Custom Native Modules (Top-Tier Scale)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- Native Modules (Java/Kotlin/Obj-C/Swift)
- JSI (TurboModules)
- Inter-language Communication

---

### 1. Interview Question
"You need to integrate a proprietary C++ facial recognition library into your React Native app. It processes 30 frames per second from the camera. If you use the standard React Native Bridge to send the frames to Native and return the results, the app will drop frames and overheat the phone. How do you architect this using the New Architecture?"

---

### 2. What the Interviewer is Evaluating
This tests your capability to break out of JavaScript and work at the C++/Native level, which is a requirement for Staff/Principal roles at companies building complex mobile tooling.

---

### 3. Ideal Answer
The classic Bridge serializes data to JSON. Sending 30 images per second as base64 JSON strings across the bridge will immediately crash the app due to memory limits and serialization overhead.

To fix this, I would build a **JSI (JavaScript Interface) TurboModule**.
1. **Bypass the Bridge:** JSI allows JS to hold a direct reference to a C++ HostObject. 
2. **Shared Memory:** Instead of sending image strings, the native Camera module captures the frame and passes the memory pointer directly to the C++ facial recognition library.
3. **Direct Invocation:** JS simply calls a synchronous C++ function `module.getFaceCoordinates()`, which returns the mathematical coordinates instantaneously without ever serializing the image.

---

### 4. Code Example
```cpp
// Conceptual C++ JSI Implementation (No JSON Serialization needed!)

#include <jsi/jsi.h>
using namespace facebook::jsi;

// Exposing a C++ method directly to JS
Value getFaceCoordinates(Runtime &rt, const Value *args, size_t count) {
    // Call proprietary C++ library directly
    FaceData data = FacialRecognitionEngine::processCurrentFrame();
    
    // Return data synchronously to JS
    Object result(rt);
    result.setProperty(rt, "x", data.x);
    result.setProperty(rt, "y", data.y);
    return result;
}
```

---

### 5. Production Scenario
- **Root Cause:** A crypto wallet app tried to generate a secure RSA key pair using a pure JavaScript library. 
- **Investigation:** On older Android phones, generating the key took 12 seconds, blocking the JS thread entirely and making the app unresponsive.
- **Solution:** We wrote a custom JSI TurboModule that invoked Android's native `KeyStore` and iOS's `SecureEnclave` via C++. 
- **Lessons Learned:** CPU-intensive cryptographic or mathematical tasks should never be done in JS.

---

### 6. Alternative Solutions & Trade-offs
- **Classic Native Modules (Bridge)**
  - *Advantages:* Easier to write (tons of documentation for Java/Obj-C).
  - *Disadvantages:* Asynchronous, serialization overhead, too slow for 30fps video processing.
- **JSI TurboModules (Current)**
  - *Advantages:* Synchronous execution, zero serialization, direct C++ access.
  - *Disadvantages:* Requires C++ knowledge, harder to debug, less community documentation.

---

### 7. Common Mistakes
- **Using Base64 encoding for large files:** Converting images/video to Base64 strings to pass over the bridge is a massive memory sink.
- **Blocking the UI Thread:** Even in Native, if you run heavy C++ tasks on the Main UI thread, the app will freeze. You must still use native background threads.

---

### 8. Follow-up Questions
1. What is a `HostObject` in JSI?
2. How does Codegen fit into the TurboModule architecture?
3. How do you handle asynchronous tasks in C++ JSI without blocking JS?

---

### 9. How a Senior/Lead Engineer Answers
A Principal engineer will explain the **memory layout differences** between JS and Native. They will mention that React Native's New Architecture relies heavily on Codegen to automatically generate the C++ boilerplate based on TypeScript interfaces, guaranteeing type safety across the JS/C++ boundary. They will also emphasize memory management—since C++ doesn't have a garbage collector, you have to be extremely careful with memory leaks when bridging JS objects to C++.

---

### 10. Interview Tips
If you don't know C++, admit it, but explain the *concept* of JSI clearly (direct memory references vs JSON serialization). Architecture knowledge is often just as valuable as syntax knowledge.
