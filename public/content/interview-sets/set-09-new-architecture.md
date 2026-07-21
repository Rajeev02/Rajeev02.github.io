# Volume 4 – Set 9 – React Native New Architecture

## Question 1 — The Classic Bridge vs JSI

### Difficulty
Medium

### Concepts Being Tested
- Asynchronous Serialization (JSON)
- Synchronous Invocation (C++)
- JSI (JavaScript Interface)

---

### 1. Interview Question
"In the classic React Native architecture, if JavaScript needs to ask Native code for the device's battery level, it has to pass a message across the 'Bridge'. Explain why this bridge architecture causes performance bottlenecks, and exactly how the new JSI (JavaScript Interface) solves it."

---

### 2. What the Interviewer is Evaluating
The interviewer is testing if you understand the fundamental shift in React Native's core engine. This is the most important architectural question in modern RN interviews.

---

### 3. Ideal Answer
The **Classic Bridge** relies on asynchronous, batched JSON serialization. When JS asks for the battery level, it serializes the request into a JSON string, drops it into a queue, and the Native thread picks it up, deserializes it, gets the battery level, serializes the result, and sends it back. This queueing and stringification process is slow, asynchronous, and blocks the event loop when data sets are large.

**JSI (JavaScript Interface)** replaces the bridge entirely. JSI is a C++ API that allows the JavaScript engine to hold direct references to C++ Host Objects. 
Instead of sending a JSON message, JS can synchronously invoke a C++ method as if it were a normal JS function (e.g., `nativeModule.getBatteryLevel()`). There is no JSON stringification, no asynchronous queue, and zero delay. The JS thread directly reads the memory of the C++ object.

---

### 4. Code Example
```typescript
// Classic Bridge (Asynchronous, JSON overhead)
import { NativeModules } from 'react-native';

const checkBatteryOld = async () => {
  // A JSON message is sent across the bridge, we wait for a callback
  const level = await NativeModules.BatteryManager.getBatteryLevel();
  console.log(level);
};

// JSI (Synchronous, Direct C++ Invocation)
const checkBatteryNew = () => {
  // `global.BatteryManager` is a C++ HostObject injected directly into JS runtime
  // It executes synchronously, exactly like `Math.random()`
  const level = global.BatteryManager.getBatteryLevel(); 
  console.log(level);
};
```

---

### 5. Production Scenario
- **Root Cause:** A water-tracking app used a massive SQLite database to store 5 years of user hydration data. 
- **Investigation:** Fetching the yearly report required the Native SQLite module to serialize 50,000 rows into a JSON string, send it over the bridge, and have JS parse it. The app froze for 4 seconds during this process.
- **Solution:** Migrated from standard `react-native-sqlite-storage` to `react-native-quick-sqlite` (which uses JSI). The 4-second freeze disappeared because the JS thread read the database rows directly from C++ memory synchronously.
- **Lessons Learned:** JSON serialization is the enemy of mobile performance.

---

### 6. Alternative Solutions & Trade-offs
- **Classic Bridge**
  - *Advantages:* Extremely stable, massive ecosystem of legacy libraries.
  - *Disadvantages:* Inherently slow for large data arrays or high-frequency updates (animations).
- **JSI (Current standard)**
  - *Advantages:* Blazing fast, synchronous, enables Fabric and TurboModules.
  - *Disadvantages:* Extremely difficult to write custom modules from scratch (requires C++ knowledge).

---

### 7. Common Mistakes
- **Assuming JSI is a new JavaScript engine:** JSI is not an engine. It is an *interface* that allows engines (like Hermes or V8) to talk to C++. Hermes is the engine; JSI is the communication protocol.
- **Thinking JSI is only for the New Architecture:** JSI was actually introduced before the New Architecture (WatermelonDB and Reanimated 2 used it on the old architecture by bypassing the bridge manually).

---

### 8. Follow-up Questions
1. If JSI is synchronous, doesn't it block the JS thread?
2. How does JSI enable Reanimated to run animations at 60fps?
3. What is a "Host Object"?

---

### 9. How a Senior/Lead Engineer Answers
A Principal Engineer will address the **synchronous blocking risk**. They will explain that while JSI is incredibly fast, if you invoke a C++ method that takes 500ms to calculate a cryptographic hash, *it will block the JS thread completely* because it is synchronous. Therefore, for heavy computations, a C++ TurboModule must still explicitly dispatch the work to a Native background thread and return a Promise to JS, combining the zero-serialization benefits of JSI with asynchronous concurrency.

---

### 10. Interview Tips
Compare JSI to browser APIs. Say: "JSI makes Native Modules work exactly like the `document.getElementById` API in the browser. JS directly manipulates C++ objects."

***

## Question 2 — Fabric and Synchronous Rendering

### Difficulty
Hard

### Concepts Being Tested
- React Concurrent Mode
- Fabric Renderer
- UI Thread vs JS Thread

---

### 1. Interview Question
"In the old React Native architecture, `FlatList` often shows blank white spaces when scrolling very fast. This is known as 'UI Tearing'. Explain why the old architecture causes this, and how the **Fabric** renderer solves it."

---

### 2. What the Interviewer is Evaluating
Testing if you understand how React's rendering pipeline (the Commit phase) connects to the Native UI, and why Fabric is the most significant update to React Native in its history.

---

### 3. Ideal Answer
In the **Old Architecture**, the UI is inherently asynchronous. When the user scrolls fast, the Native UI thread asks the JS thread for more items. The JS thread renders the items and sends a JSON message across the bridge telling Native to draw them. By the time the Native thread receives the message, the user has already scrolled past the rendered area, resulting in a blank white space (UI Tearing).

**Fabric** is the new C++ rendering system for React Native. Because it uses JSI, it allows React to render UI **synchronously**.
When the Native UI thread needs new items, it can synchronously invoke the React JS thread, calculate the layout using the C++ Yoga engine, and draw the pixels in the exact same frame. There is no asynchronous bridge delay, meaning UI tearing is mathematically eliminated.

---

### 4. Code Example
"No code required. This is an internal rendering engine architecture question."

---

### 5. Production Scenario
- **Root Cause:** A complex drag-and-drop Kanban board (like Trello) felt "floaty" and detached from the user's finger.
- **Investigation:** The gesture coordinates were captured natively, sent asynchronously to JS, JS updated the state, and sent the new UI position asynchronously back to Native. This multi-frame delay caused the component to trail behind the finger.
- **Solution:** Upgraded the app to the New Architecture (Fabric). Because Fabric allows JS and Native to share the same C++ memory space, the gesture and the UI update occurred synchronously within the same 16ms frame limit.
- **Lessons Learned:** Asynchronous UI updates are the root cause of "non-native" feeling apps.

---

### 6. Alternative Solutions & Trade-offs
- **Old Architecture + Reanimated Worklets**
  - *Advantages:* Solved gesture lag on the old architecture by moving logic completely to the UI thread.
  - *Disadvantages:* Required writing complex Worklet code.
- **Fabric (New Architecture)**
  - *Advantages:* Makes *standard* React state updates synchronous and fast, without needing specialized animation libraries.
  - *Disadvantages:* Requires all third-party UI libraries in your `node_modules` to be rewritten in C++ to support Fabric.

---

### 7. Common Mistakes
- **Thinking Fabric speeds up JavaScript:** Fabric does not make your JS logic faster. It makes the *communication* between React and the Native UI faster. If you have a massive `for` loop in JS, your app will still lag.
- **Confusing Fabric with TurboModules:** Fabric is strictly the UI Renderer. TurboModules are the Native APIs (Camera, Bluetooth, etc.).

---

### 8. Follow-up Questions
1. How does Fabric handle layout calculations compared to the old architecture? (Hint: Shadow Tree).
2. What is the C++ Yoga Engine?
3. How does React 18 Concurrent Features (`useTransition`) benefit from Fabric?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will explain the **Shadow Tree**. In Fabric, when React creates a Virtual DOM node in JS, it synchronously creates a C++ "Shadow Node". This Shadow Node calculates the exact X/Y/Width/Height coordinates using the Yoga layout engine *before* the Native iOS/Android view is ever created. This allows React to measure text and components synchronously, solving years of layout bugs where developers had to rely on asynchronous `onLayout` callbacks.

---

### 10. Interview Tips
Use the terms "UI Tearing" and "Synchronous UI Rendering". They are the core buzzwords of the Fabric architecture.

***

## Question 3 — TurboModules and Lazy Loading

### Difficulty
Hard

### Concepts Being Tested
- TurboModules
- Startup Time Optimization
- C++ JSI

---

### 1. Interview Question
"In a classic React Native app, if you install 50 Native Modules (Camera, Maps, Bluetooth, Firebase, etc.), the app's startup time increases drastically, even if the user never opens the Camera screen. How do **TurboModules** in the New Architecture fix this specific startup performance issue?"

---

### 2. What the Interviewer is Evaluating
Testing your understanding of Native initialization bottlenecks and how the New Architecture improves the Time-To-Interactive (TTI) metric.

---

### 3. Ideal Answer
In the classic architecture, the Native runtime (Java/Obj-C) must instantiate and initialize **every single Native Module** at launch, before the JavaScript bundle even starts executing. It does this so that when JS asks for a module over the bridge, it is guaranteed to be ready. 50 modules = massive startup delay.

**TurboModules** solve this through **Lazy Loading**.
Because TurboModules use JSI, JavaScript holds a direct reference to a C++ object registry. When the app launches, NO modules are initialized. 
If the user navigates to the Camera screen and JS calls `TurboModuleRegistry.get('Camera')`, the C++ engine intercepts this call and instantiates the Native Camera module *synchronously, exactly at that moment*. 

By deferring initialization until the exact moment of use, TurboModules drastically reduce app startup time and memory footprint.

---

### 4. Code Example
```typescript
// Classic Architecture (Native module is initialized at app boot)
import { NativeModules } from 'react-native';
const Camera = NativeModules.CameraModule; 

// New Architecture (TurboModule)
import { TurboModuleRegistry } from 'react-native';

// The Native Java/Obj-C class is NOT initialized yet!
// It is only instantiated at the exact millisecond this line is executed.
const Camera = TurboModuleRegistry.getEnforcing<Spec>('CameraModule');
```

---

### 5. Production Scenario
- **Root Cause:** A complex banking app had a 6-second startup time. 
- **Investigation:** Using Xcode Instruments, we saw that initializing the Mapbox SDK, Zendesk Chat SDK, and a biometric SDK in `AppDelegate.mm` took 3.5 seconds.
- **Solution:** Upgraded to the New Architecture. We converted our custom Native Modules to TurboModules. The initialization was deferred until the user actually clicked the "Support Chat" or "Find ATM" buttons. Startup time dropped to 2 seconds.
- **Lessons Learned:** Do not pay the initialization cost for features the user isn't actively using.

---

### 6. Alternative Solutions & Trade-offs
- **Manual Lazy Loading (Old Architecture)**
  - *Advantages:* You could theoretically delay SDK initialization in Java/Obj-C using background threads.
  - *Disadvantages:* Requires massive manual orchestration and error-prone bridging logic.
- **TurboModules (Current)**
  - *Advantages:* Automated lazy loading built directly into the core engine.
  - *Disadvantages:* Migrating old Native Modules to TurboModules requires rewriting them using Codegen.

---

### 7. Common Mistakes
- **Assuming TurboModules are just 'faster bridge modules':** They are fundamentally different. They don't use the bridge at all, and their lazy-loading nature is a structural paradigm shift.

---

### 8. Follow-up Questions
1. If a TurboModule is initialized synchronously upon first use, does that cause a UI stutter at that moment?
2. How do TurboModules guarantee type safety across the JS/Native boundary?
3. What is the role of C++ in a TurboModule?

---

### 9. How a Senior/Lead Engineer Answers
A Staff engineer will mention that while lazy loading is the primary feature, the secondary superpower of TurboModules is **Strong Typing**. They will explain that TurboModules require a strict TypeScript specification file. During the build process, RN's Codegen reads this TS file and automatically generates the C++, Java, and Objective-C interfaces. This guarantees that if JS expects a `string`, the Native code will strictly require a `NSString`, completely eliminating a massive category of runtime crashes caused by mismatched types across the bridge.

---

### 10. Interview Tips
When answering this, clearly emphasize the phrase "Deferred Initialization" or "Lazy Loading".

***

## Question 4 — Codegen and Type Safety

### Difficulty
Hard

### Concepts Being Tested
- Codegen
- TypeScript to C++ generation
- Build Pipelines

---

### 1. Interview Question
"To create a TurboModule or a Fabric component in the New Architecture, you must write a specific TypeScript file (the Spec) and run **Codegen**. What exactly is Codegen doing during the build process, and what massive problem from the old architecture does it solve?"

---

### 2. What the Interviewer is Evaluating
Codegen is the glue that makes the New Architecture work. You must understand it to build libraries or complex custom native integrations.

---

### 3. Ideal Answer
In the old architecture, you wrote JS on one side, and Java/Obj-C on the other. If JS sent a `string`, but Java expected an `int`, the app would crash at runtime, usually in production. There was no compile-time safety across the bridge.

**Codegen** solves this by acting as a compiler step. 
You write a single Source of Truth: a strictly typed TypeScript interface (e.g., `NativeCalculatorSpec.ts`). 
During the build phase (before Xcode or Gradle compile the app), Codegen parses this TypeScript file and automatically generates C++, Java, and Objective-C boilerplate code (interfaces and structs). 

The Native developer then implements these generated interfaces. If the Native developer tries to return an `int` where the TS spec demanded a `string`, Xcode/Android Studio will fail to compile. This guarantees 100% type safety across the JS and Native boundaries.

---

### 4. Code Example
```typescript
// NativeCalculatorSpec.ts (The Source of Truth)
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Codegen reads this and generates C++/Java/Obj-C interfaces
  add(a: number, b: number): number;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCalculator');
```

---

### 5. Production Scenario
- **Root Cause:** A Native developer updated an Android module to accept an options object instead of a boolean, but forgot to tell the React Native developers.
- **Investigation:** The app compiled perfectly. It crashed instantly in production because JS was still passing a boolean `true`, which the Java layer failed to cast to a `ReadableMap`.
- **Solution:** Migrated the module to a TurboModule using Codegen.
- **Lessons Learned:** Without Codegen, the JS/Native boundary is a highly dangerous blind spot.

---

### 6. Alternative Solutions & Trade-offs
- **Manual Type Checking (Old Architecture)**
  - *Advantages:* No build-time setup required.
  - *Disadvantages:* Extremely error-prone, relies on human communication.
- **Codegen (Current)**
  - *Advantages:* Compile-time safety, generates tedious C++ JSI boilerplate for you.
  - *Disadvantages:* Slows down the initial build process slightly, strict naming conventions for spec files.

---

### 7. Common Mistakes
- **Naming the spec file incorrectly:** Codegen is very strict. The file *must* be named `Native<ModuleName>.ts` (e.g., `NativeCalculator.ts`), otherwise the parser ignores it.
- **Using unsupported TS types:** Codegen cannot translate complex TS mapped types or generics into C++. You are restricted to a specific subset of types (primitives, arrays, simple objects, Promises).

---

### 8. Follow-up Questions
1. How does Codegen integrate with CocoaPods and Gradle?
2. Why does Codegen generate C++ code instead of just Java/Obj-C?
3. What is the difference between a Fabric Spec and a TurboModule Spec?

---

### 9. How a Senior/Lead Engineer Answers
A Lead will explain that Codegen removes the need for JS developers to write C++ **JSI bridging code**. Writing JSI directly is incredibly difficult and prone to memory leaks (managing C++ pointers). By generating the C++ layer automatically, Codegen allows a React Native developer to simply write TypeScript, and a Native developer to simply write Swift/Kotlin, completely abstracting the terrifying C++ JSI layer away from both teams.

---

### 10. Interview Tips
Summarize Codegen as: "It provides compile-time type safety across the JS/Native boundary."

***

## Question 5 — Migrating a Legacy App to the New Architecture (Expert)

### Difficulty
Expert (Top-Tier Scale)

### Concepts Being Tested
- Architecture Migration Strategy
- `RCTNewArchitectureEnabled`
- Interoperability Layer

---

### 1. Interview Question
"You are tasked with migrating a 4-year-old enterprise React Native app to the New Architecture. The app uses 40 third-party libraries, half of which haven't been updated to support Fabric or TurboModules. Explain your step-by-step strategy for migrating this app without breaking production."

---

### 2. What the Interviewer is Evaluating
This is a Staff/Architect level question. They are looking for risk mitigation, backwards compatibility understanding, and project management strategy.

---

### 3. Ideal Answer
A big-bang rewrite is guaranteed to fail. I would use a phased approach leveraging the **Interop Layer**.

1. **Audit Dependencies:** Run `npx react-native-clean-project` and audit all 40 libraries. Categorize them into: 1) Supports New Arch, 2) Does not support, 3) Abandoned.
2. **Replace Abandoned Libraries:** Find modern equivalents for abandoned libraries (e.g., replacing an old `react-native-camera` with `react-native-vision-camera`).
3. **Enable the New Architecture:** Set `newArchEnabled=true` in `gradle.properties` and `RCT_NEW_ARCH_ENABLED=1` for `pod install`.
4. **Leverage the Interop Layer:** React Native provides a backwards-compatibility layer. Old Native Modules will still work via the Bridge, even if Fabric is rendering the UI. However, old UI components might break.
5. **Progressive Refactoring:** Over several sprints, I would rewrite our custom internal Native Modules into TurboModules using Codegen, testing thoroughly.
6. **Performance Profiling:** Compare the before/after TTI (Time to Interactive) and frame drops to prove the ROI to stakeholders.

---

### 4. Code Example
"No code required. This is an organizational architecture question."

---

### 5. Production Scenario
- **Root Cause:** A team enabled `newArchEnabled=true` on a massive app, fixed the compile errors, and shipped it to TestFlight.
- **Investigation:** While the app booted incredibly fast, a critical third-party charting library was completely invisible on the screen. The library relied on synchronous `onLayout` calculations that broke when forced through the Fabric Interop layer.
- **Solution:** Rolled back the flag. Forked the charting library and manually migrated it to Fabric C++ specs before re-enabling the New Architecture.
- **Lessons Learned:** The Interop layer is not magic. UI components are much harder to migrate than Native Modules.

---

### 6. Alternative Solutions & Trade-offs
- **Wait for the Community**
  - *Advantages:* Zero risk.
  - *Disadvantages:* You fall behind on performance, and eventually, RN will deprecate the old architecture completely.
- **Phased Migration with Interop (Current)**
  - *Advantages:* Safest path forward.
  - *Disadvantages:* Running the Bridge and JSI simultaneously (Interop) consumes slightly more memory during the transition period.

---

### 7. Common Mistakes
- **Assuming old libraries will just work:** While the Interop layer is great for standard Native Modules (Bluetooth, storage), complex UI components (Maps, Video players) almost always require a full rewrite to support Fabric.
- **Forgetting to update React:** The New Architecture relies heavily on React 18 Concurrent features. You must upgrade React DOM/Core first.

---

### 8. Follow-up Questions
1. What exactly does the Interop Layer do?
2. How do you conditionally compile code in iOS/Android for both architectures so a library can support both simultaneously?
3. What is Bridgeless Mode?

---

### 9. How a Senior/Lead Engineer Answers
A true Architect will pivot to **Bridgeless Mode**. They will explain that simply enabling the New Architecture doesn't actually turn off the Bridge—it just enables Fabric and TurboModules. To get the ultimate performance gain, you must eventually enable Bridgeless Mode (default in RN 0.74+), which completely destroys the asynchronous bridge. If you enable this, *any* library relying on the Interop layer will instantly crash. Therefore, the migration is actually a two-step process: 1. Migrate to New Arch (Interop allowed). 2. Migrate to Bridgeless (Zero legacy allowed).

---

### 10. Interview Tips
Mention **"Bridgeless Mode"**. Many developers confuse the New Architecture with Bridgeless Mode, but defining them separately proves expert knowledge.
