# 05-New-Architecture.md

# React Native New Architecture for Senior React Native Developers

---

# 1. Why React Native Introduced New Architecture?

## Problem with Old Architecture

Old Architecture relied on the Bridge.

```text
JavaScript
     ↓
Bridge
     ↓
Native
```

Every communication required:

1. Serialization
2. Transfer
3. Deserialization

---

## Example

```javascript
Camera.takePicture();
```

Flow:

```text
JS
 ↓
Bridge
 ↓
Native Camera
 ↓
Bridge
 ↓
JS
```

---

## Problems

* Slow communication
* Thread hopping
* Serialization cost
* Large data transfer issues
* Async communication only

---

## Solution

React Native introduced:

* JSI
* TurboModules
* Fabric
* Codegen
* Hermes
* Bridgeless Mode

---

## Interview Answer

"The new architecture was introduced to eliminate Bridge bottlenecks and improve performance, startup time, rendering efficiency, and native interoperability."

---

# 2. React Native New Architecture Overview

## High Level Flow

```text
JavaScript
      ↓
Hermes
      ↓
JSI
      ↓
TurboModules
      ↓
Fabric
      ↓
Yoga
      ↓
Native UI
```

---

## Components

### Hermes

JavaScript Engine

### JSI

Communication Layer

### TurboModules

Native Modules

### Fabric

Rendering System

### Yoga

Layout Engine

### Codegen

Type-Safe Bindings

---

## Interview Answer

"The new architecture consists of Hermes, JSI, TurboModules, Fabric, Yoga, and Codegen working together to provide a bridge-less communication model."

---

# 3. What is Bridge?

## Definition

Bridge is the communication layer used in the old architecture.

---

## Flow

```text
JavaScript
      ↓
Bridge
      ↓
Native
```

---

## How It Works?

Data is converted into a serialized format.

```javascript
{
  action:"getUser",
  id:1
}
```

Sent through Bridge.

Native processes it.

Response returns through Bridge.

---

## Problems

### Serialization Cost

Objects converted before transfer.

---

### Thread Hopping

```text
JS Thread
 ↓
Bridge
 ↓
Native Thread
```

---

### Async Only

No synchronous communication.

---

## Interview Answer

"The Bridge enabled communication between JavaScript and native code but introduced serialization overhead and performance bottlenecks."

---

# 4. JSI (JavaScript Interface)

## Definition

JSI is a C++ based communication layer that replaces the Bridge.

---

## Flow

```text
JavaScript
      ↓
JSI
      ↓
Native
```

---

## Why Do We Need It?

Remove:

* Serialization
* Thread hopping
* Bridge overhead

---

## Benefits

### Direct Calls

```text
JS
 ↓
Native
```

---

### Faster Execution

No message passing.

---

### Sync Communication

Possible with JSI.

---

## Example

```javascript
nativeModule
 .getDeviceName();
```

Directly invokes native code.

---

## Interview Answer

"JSI is a lightweight interface that allows JavaScript to communicate directly with native code without using the Bridge."

---

## Bridge vs JSI

| Bridge                 | JSI              |
| ---------------------- | ---------------- |
| Async Only             | Sync + Async     |
| Serialization Required | No Serialization |
| Slower                 | Faster           |
| Thread Hopping         | Direct Calls     |
| Old Architecture       | New Architecture |

---

# 5. Hermes

## Definition

Hermes is React Native's JavaScript engine.

---

## Why Introduced?

Traditional engines:

```text
JS
 ↓
Parse
 ↓
Compile
 ↓
Execute
```

Hermes:

```text
JS
 ↓
Bytecode
 ↓
Execute
```

---

## Benefits

### Faster Startup

Precompiled bytecode.

---

### Less Memory

Optimized runtime.

---

### Smaller Bundle

Reduced APK size.

---

### Better Performance

Faster execution.

---

## Interview Answer

"Hermes is a lightweight JavaScript engine optimized for React Native that improves startup time, memory usage, and overall performance."

---

# 6. TurboModules

## Definition

TurboModules replace traditional Native Modules.

---

## Old Native Modules

Loaded during app startup.

```text
Startup
 ↓
Load All Modules
```

---

## Problem

Even unused modules consume memory.

---

## TurboModules

Lazy Loaded.

```text
Startup
 ↓
Load Only Required Module
```

---

## Benefits

### Faster Startup

Less initialization work.

---

### Lower Memory Usage

Unused modules not loaded.

---

### Better Performance

On-demand loading.

---

## Flow

```text
JS
 ↓
JSI
 ↓
TurboModule
 ↓
Native
```

---

## Interview Answer

"TurboModules are the next generation of Native Modules that use JSI and lazy loading to improve startup time and memory usage."

---

## Native Modules vs TurboModules

| Native Modules | TurboModules   |
| -------------- | -------------- |
| Eager Loading  | Lazy Loading   |
| Bridge         | JSI            |
| Slower Startup | Faster Startup |
| More Memory    | Less Memory    |

---

# 7. Codegen

## Definition

Codegen automatically generates bindings between JavaScript and Native code.

---

## Before Codegen

Developer writes:

```java
Android Bindings
```

```objc
iOS Bindings
```

manually.

---

## With Codegen

Single Specification:

```typescript
Native Module Spec
```

↓

Generated Automatically

```java
Android
```

```objc
iOS
```

```cpp
C++
```

---

## Benefits

* Less Boilerplate
* Type Safety
* Consistency
* Faster Development

---

## Interview Answer

"Codegen automatically generates type-safe bindings for TurboModules and Fabric components."

---

# 8. Fabric

## Definition

Fabric is React Native's new rendering system.

---

## Old Renderer

```text
React
 ↓
Bridge
 ↓
Native UI
```

---

## Fabric Renderer

```text
React
 ↓
Fabric
 ↓
Native UI
```

---

## Why Do We Need It?

Improve:

* Rendering speed
* Synchronization
* Concurrent rendering

---

## Benefits

### Faster UI Updates

Reduced communication overhead.

---

### Better Synchronization

React and Native stay aligned.

---

### Concurrent Rendering Support

Works with React Fiber.

---

## Interview Answer

"Fabric is React Native's new rendering system that provides faster and more efficient UI updates."

---

# 9. Yoga

## Definition

Yoga is React Native's layout engine.

---

## Responsibility

Calculates:

* Width
* Height
* Position
* Alignment

using Flexbox.

---

## Example

```jsx
<View
 style={{
   flex:1,
   justifyContent:"center",
   alignItems:"center"
 }}
>
```

Yoga calculates layout.

---

## Flow

```text
React Component
       ↓
Yoga
       ↓
Layout Calculation
       ↓
Native UI
```

---

## Interview Answer

"Yoga is a cross-platform Flexbox layout engine used by React Native to calculate UI layouts."

---

# 10. Shadow Tree

## Definition

Shadow Tree stores layout information before rendering.

---

## Flow

```text
React Tree
      ↓
Shadow Tree
      ↓
Yoga
      ↓
UI Tree
```

---

## Responsibility

Stores:

* Layout
* Position
* Measurements

before actual rendering.

---

## Interview Answer

"Shadow Tree is an intermediate representation used by Fabric for layout calculations."

---

# 11. Threads in React Native

## JavaScript Thread

Runs:

* React Components
* Business Logic
* State Management
* API Calls

---

## Main/UI Thread

Runs:

* Rendering
* Touch Events
* Gestures
* Native UI

---

## Shadow Thread

Runs:

* Yoga Layout Calculation

---

## Background Threads

Runs:

* Network Requests
* File Operations
* Database Operations

---

## Interview Answer

"React Native uses multiple threads to separate business logic, rendering, layout calculation, and background processing."

---

# 12. Bridgeless Mode

## Definition

Future React Native mode without Bridge.

---

## Old

```text
JS
 ↓
Bridge
 ↓
Native
```

---

## New

```text
JS
 ↓
JSI
 ↓
Native
```

---

## Benefits

* Lower Latency
* Faster Communication
* Better Performance

---

## Interview Answer

"Bridgeless mode removes the traditional Bridge entirely and relies on JSI for communication."

---

# 13. Complete New Architecture Flow

## Startup

```text
App Launch
     ↓
Hermes Starts
     ↓
Load JS Bundle
     ↓
Initialize JSI
     ↓
Register TurboModules
     ↓
Create Fabric Renderer
     ↓
Render UI
```

---

## Rendering

```text
React Component
      ↓
React Fiber
      ↓
Fabric
      ↓
Shadow Tree
      ↓
Yoga
      ↓
Native UI
```

---

## Native Communication

```text
JavaScript
      ↓
JSI
      ↓
TurboModule
      ↓
Native API
```

---

# Most Asked New Architecture Questions

1. Why was New Architecture introduced?
2. What are limitations of the Bridge?
3. What is JSI?
4. JSI vs Bridge?
5. What is Hermes?
6. Why use Hermes?
7. What are TurboModules?
8. Native Modules vs TurboModules?
9. What is Codegen?
10. Why is Codegen needed?
11. What is Fabric?
12. Fabric vs Old Renderer?
13. What is Yoga?
14. What is Shadow Tree?
15. What are React Native Threads?
16. What is Bridgeless Mode?
17. Explain complete New Architecture flow.
18. How does React Native communicate with native code now?
19. What improves startup performance?
20. What improves rendering performance?

---

# Ultimate Senior Interview Answer

"React Native's new architecture replaces the traditional Bridge with JSI, enabling direct communication between JavaScript and native code. Hermes serves as the JavaScript engine, TurboModules provide lazy-loaded native modules, Fabric acts as the new rendering system, Yoga handles layout calculations, and Codegen generates type-safe bindings. Together, these changes significantly improve startup time, rendering performance, memory efficiency, and native interoperability while paving the way for Bridgeless React Native."

---

# Daily Revision Plan

```text
Bridge                5 min
JSI                   5 min
Hermes                5 min
TurboModules          5 min
Codegen               3 min
Fabric                5 min
Yoga                  3 min
Threads               5 min
Bridgeless Mode       2 min

Total: ~38 Minutes
```

Yes, your **05-New-Architecture.md** covers all the topics from your screenshots and notes:

| Topic                              | Covered                    |
| ---------------------------------- | -------------------------- |
| Bridge                             | ✅                          |
| JSI                                | ✅                          |
| Hermes                             | ✅                          |
| Codegen                            | ✅                          |
| TurboModules                       | ✅                          |
| Fabric                             | ✅                          |
| Yoga                               | ✅                          |
| Shadow Tree                        | ✅                          |
| Shadow Thread                      | ✅ (inside Threads section) |
| JS Thread                          | ✅                          |
| Main/UI Thread                     | ✅                          |
| Bridgeless Mode                    | ✅                          |
| React Native New Architecture Flow | ✅                          |

However, for a **Senior React Native Interview (8-10 years)**, I would still add a few enhancements because interviewers often go one level deeper.

---

# Missing Topic #1: React Native Threads Architecture Diagram

Current version explains threads but not their relationship.

Add:

```text
React Component
       ↓
JS Thread
       ↓
Fabric
       ↓
Shadow Tree
       ↓
Shadow Thread (Yoga)
       ↓
Main/UI Thread
       ↓
Native UI
```

### Interview Answer

"React Native separates responsibilities across JS Thread, Shadow Thread, and UI Thread to avoid blocking rendering and improve responsiveness."

---

# Missing Topic #2: What Happens When User Clicks a Button?

Very common senior interview question.

Example:

```jsx
<Button
 onPress={() => {
   setCount(count + 1);
 }}
/>
```

Flow:

```text
User Tap
    ↓
UI Thread
    ↓
JS Thread
    ↓
State Update
    ↓
React Fiber
    ↓
Fabric
    ↓
Shadow Tree
    ↓
Yoga Layout
    ↓
UI Thread
    ↓
Screen Update
```

### Interview Answer

"When a user interacts with the UI, the event originates on the UI Thread, is processed by the JS Thread, React performs reconciliation, Fabric updates the Shadow Tree, Yoga calculates layout, and the UI Thread renders the final screen."

---

# Missing Topic #3: React Fiber + Fabric Relationship

Interviewers often ask:

> What is the relationship between React Fiber and Fabric?

Add:

```text
React Fiber
     ↓
Creates UI Changes
     ↓
Fabric
     ↓
Shadow Tree
     ↓
Yoga
     ↓
Native UI
```

### Interview Answer

"React Fiber determines what should change, while Fabric determines how those changes are rendered to native UI."

---

# Missing Topic #4: Why Hermes + JSI Work Together?

Add:

### Old Architecture

```text
JS Engine
     ↓
Bridge
     ↓
Native
```

### New Architecture

```text
Hermes
     ↓
JSI
     ↓
Native
```

### Interview Answer

"Hermes executes JavaScript while JSI enables direct communication between Hermes and native code without Bridge serialization overhead."

---

# Missing Topic #5: Frequently Asked Comparison Table

### Fabric vs Old Renderer

| Old Renderer               | Fabric                        |
| -------------------------- | ----------------------------- |
| Bridge Based               | JSI Based                     |
| Slower                     | Faster                        |
| Less Efficient             | More Efficient                |
| Limited Concurrent Support | Supports Concurrent Rendering |

---

### Bridge vs JSI

| Bridge              | JSI                 |
| ------------------- | ------------------- |
| Async Only          | Sync + Async        |
| Serialization       | Direct Calls        |
| Slower              | Faster              |
| More Thread Hopping | Less Thread Hopping |

---

### Native Modules vs TurboModules

| Native Modules    | TurboModules   |
| ----------------- | -------------- |
| Loaded at Startup | Lazy Loaded    |
| Bridge            | JSI            |
| Higher Memory     | Lower Memory   |
| Slower Startup    | Faster Startup |

---


At the end add:

```text
Hermes
→ JavaScript Engine

JSI
→ Direct JS ↔ Native Communication Layer

TurboModules
→ Lazy Loaded Native Modules

Fabric
→ New Rendering System

Codegen
→ Generates Native Bindings

Yoga
→ Flexbox Layout Engine

Shadow Tree
→ Layout Representation

Shadow Thread
→ Runs Yoga Calculations

JS Thread
→ Runs JavaScript Logic

UI Thread
→ Renders Native UI

Bridge
→ Old Communication Layer

Bridgeless Mode
→ React Native Without Bridge
```

---



✅ Bridge
✅ JSI
✅ Hermes
✅ Codegen
✅ TurboModules
✅ Fabric
✅ Yoga
✅ Shadow Tree
✅ Shadow Thread
✅ JS Thread
✅ Main/UI Thread
✅ Bridgeless Mode
✅ Complete New Architecture Flow


---


## Fabric Mounting Layer

Responsible for applying UI updates.

```text
React Fiber
 ↓
Fabric
 ↓
Mounting Layer
 ↓
Native UI
```

---

## C++ Core Layer

Shared implementation between:

```text
Android
iOS
```

Used by:

* JSI
* Fabric
* TurboModules

---

## React Native Renderer Flow

```text
React Fiber
 ↓
Fabric
 ↓
Shadow Tree
 ↓
Yoga
 ↓
Mounting Layer
 ↓
Native UI
```

