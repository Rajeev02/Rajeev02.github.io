Let's walk through a button click example and see exactly how **Hermes + JSI + TurboModules + Fabric** work together in modern React Native.

---

# 1. Hermes (JavaScript Engine)

Hermes is the engine that executes your JavaScript code.

Your code:

```js
function App() {
  const [count, setCount] = useState(0);

  return <Button title="Increment" onPress={() => setCount(count + 1)} />;
}
```

### What happens?

```text
App Launch
    │
    ▼
Hermes Starts
    │
    ▼
Loads JS Bundle
    │
    ▼
Executes JavaScript
```

Similar to:

```text
Chrome → V8
Safari → JavaScriptCore
React Native → Hermes
```

Hermes's job is only:

- Execute JavaScript
- Manage memory (Garbage Collection)
- Create JS objects/functions
- Run React code

Hermes **does not create Android Views or iOS Views**.

---

# 2. Fabric (UI Renderer)

When Hermes executes:

```jsx
<Text>Hello Rajeev</Text>
```

React creates a virtual tree:

```text
App
 └── Text
       └── Hello Rajeev
```

Now Fabric takes over.

### Fabric's job

Convert React elements into native views.

```text
React Tree
      │
      ▼
Fabric
      │
      ▼
Android TextView
or
iOS UILabel
```

Example:

```jsx
<View>
  <Text>Hello</Text>
</View>
```

Android:

```text
LinearLayout
    │
    └── TextView
```

iOS:

```text
UIView
    │
    └── UILabel
```

Fabric is the modern rendering system.

---

# 3. User Clicks Button

User taps:

```jsx
<Button onPress={increment} />
```

Native Android:

```text
Button Clicked
```

Native iOS:

```text
UIButton Tapped
```

Event flow:

```text
Native UI
    │
    ▼
Fabric
    │
    ▼
Hermes
    │
    ▼
increment()
```

Your JS function executes:

```js
const increment = () => {
  setCount((c) => c + 1);
};
```

Hermes runs it.

---

# 4. State Changes

```js
setCount(5);
```

React detects:

```text
Old Count = 4
New Count = 5
```

React creates a new UI tree.

```text
Old Tree
Count: 4

New Tree
Count: 5
```

Fabric compares them.

```text
Diff Found
```

Only changed views are updated.

```text
TextView.setText("5")
```

No full screen redraw.

---

# 5. Need Native Feature (Camera Example)

Suppose:

```js
Camera.takePhoto();
```

JavaScript cannot access Android Camera APIs directly.

Needs native code.

---

# Old Bridge Architecture

React Native used:

```text
JS
 │
 ▼
Bridge
 │
 ▼
Native
```

Message:

```json
{
  "module": "Camera",
  "method": "takePhoto"
}
```

Problems:

- Convert to JSON
- Send through bridge
- Parse again

Every call crossed the bridge.

---

# 6. JSI (JavaScript Interface)

JSI removes the bridge.

Instead of:

```text
JS
 │
 ▼
Bridge
 │
 ▼
Native
```

Now:

```text
JS
 │
 ▼
JSI
 │
 ▼
Native
```

Direct C++ communication.

Think:

```text
Old:
Call → Serialize → Bridge → Deserialize

New:
Call → Native Function
```

Much faster.

---

# Example of JSI

JS:

```js
Camera.takePhoto();
```

Behind the scenes:

```cpp
cameraModule.takePhoto();
```

Directly.

No JSON.

No Bridge.

---

# 7. TurboModules

TurboModules are native modules built on top of JSI.

Example modules:

```text
Camera
Location
Bluetooth
Contacts
FileSystem
```

Old:

```text
App Start
   │
   ▼
Load ALL Native Modules
```

Maybe 50 modules.

Even unused ones.

---

## TurboModules

Load only when needed.

```text
App Start
   │
   ▼
Load Nothing
```

User opens camera:

```text
Camera Requested
      │
      ▼
TurboModule Loads
```

Lazy loading.

Benefits:

- Faster startup
- Lower memory
- Better performance

---

# Example Flow

JS:

```js
const photo = await Camera.takePhoto();
```

Flow:

```text
Hermes
   │
   ▼
JSI
   │
   ▼
TurboModule(Camera)
   │
   ▼
Android CameraX
or
iOS AVFoundation
   │
   ▼
Photo Taken
   │
   ▼
Return Result
   │
   ▼
Hermes
```

---

# Putting Everything Together

Suppose user clicks:

```js
const takePicture = async () => {
  const photo = await Camera.takePhoto();
  setImage(photo.path);
};
```

### Complete Flow

```text
1. User taps button
          │
          ▼
2. Native Button Event
          │
          ▼
3. Fabric receives event
          │
          ▼
4. Hermes executes takePicture()
          │
          ▼
5. Camera TurboModule requested
          │
          ▼
6. JSI directly calls native camera
          │
          ▼
7. Android/iOS camera captures image
          │
          ▼
8. Result returned through JSI
          │
          ▼
9. Hermes gets photo path
          │
          ▼
10. setImage()
          │
          ▼
11. React re-renders
          │
          ▼
12. Fabric calculates UI changes
          │
          ▼
13. Native ImageView updated
```

## One-Line Summary

```text
Hermes      → Executes JavaScript
JSI         → Direct JS ↔ Native communication
TurboModule → Native modules (Camera, GPS, etc.)
Fabric      → Creates and updates native UI
```

Think of it as:

```text
User Action
     │
     ▼
Hermes (runs JS)
     │
     ├── Fabric → UI updates
     │
     └── JSI → TurboModules → Native APIs
```

This is the core architecture of modern React Native (New Architecture).

They are completely different things.

## JavaScript Bundle

The JavaScript Bundle is the **compiled output of your React Native application**.

You write:

```jsx
// App.tsx
function App() {
  return <Text>Hello</Text>;
}
```

After Babel + Metro:

```text
App.tsx
Home.tsx
Profile.tsx
Utils.ts
     │
     ▼
Metro Bundler
     │
     ▼
index.bundle
```

This `index.bundle` contains all your app's JavaScript code.

At app startup:

```text
JavaScript Bundle
       │
       ▼
Hermes
       │
       ▼
Executes JS
```

---

## JSI (JavaScript Interface)

JSI is a **communication layer/API** that allows JavaScript running inside Hermes to call native code directly.

Example:

```js
Camera.takePhoto();
```

Flow:

```text
Hermes
   │
   ▼
JSI
   │
   ▼
Native Camera Code
```

JSI is not a file and not a bundle.

It is a runtime interface.

---

## Relationship

```text
Your Code
   │
   ▼
Babel
   │
   ▼
Metro
   │
   ▼
JavaScript Bundle
   │
   ▼
Hermes
   │
   ├── React/Fabric/Yoga
   │
   └── JSI
           │
           ▼
      TurboModules
           │
           ▼
      Native APIs
```

### Example

Suppose you write:

```js
const location = await Location.getCurrentPosition();
```

1. This code is included in the **JavaScript Bundle**.
2. Hermes executes it.
3. Hermes uses **JSI** to access the native Location module.
4. Native Android/iOS code gets GPS coordinates.
5. Result comes back to JavaScript.

```text
JavaScript Bundle
       │
       ▼
Hermes executes code
       │
       ▼
JSI
       │
       ▼
Native GPS
       │
       ▼
Return result
```

### Easy Interview Answer

If asked:

**What is the difference between JavaScript Bundle and JSI?**

**Answer:**

- **JavaScript Bundle** contains all the application's JavaScript code generated by Metro.
- **JSI (JavaScript Interface)** is the runtime layer that enables direct communication between JavaScript (Hermes) and native code without the old React Native Bridge.

Think of it this way:

```text
JavaScript Bundle = The code
Hermes            = Executes the code
JSI               = Connects the code to Native APIs
```

Good question. If you want the **complete React Native architecture**, then Hermes, JSI, TurboModules, and Fabric are only part of the picture.

## React Native Architecture Overview

```text
Your Code (JS/TS/JSX)
        │
        ▼
      Babel
        │
        ▼
 JavaScript Bundle
        │
        ▼
      Hermes
        │
        ▼
      React
        │
        ▼
      Fabric
        │
        ▼
      Yoga
        │
        ▼
 Native UI
        │
        ▼
Android/iOS Views
```

For native features:

```text
Hermes
   │
   ▼
JSI
   │
   ▼
TurboModules
   │
   ▼
Android/iOS APIs
```

---

# 1. Babel

Babel is a JavaScript compiler/transpiler.

You write:

```jsx
const App = () => {
  return <Text>Hello</Text>;
};
```

Browsers and Hermes don't understand JSX directly.

Babel converts it into:

```js
const App = () => {
  return React.createElement(Text, null, "Hello");
};
```

---

### TypeScript Example

You write:

```ts
const name: string = "Rajeev";
```

Babel removes TypeScript types:

```js
const name = "Rajeev";
```

---

### Babel's Job

```text
JSX
TypeScript
Modern JavaScript
        │
        ▼
Plain JavaScript
```

Babel works during build time, not runtime.

---

# 2. Metro Bundler

After Babel converts everything:

```text
App.tsx
Home.tsx
Profile.tsx
Utils.ts
```

Metro combines them into one bundle.

```text
index.bundle
```

Think:

```text
Webpack -> React Web
Metro -> React Native
```

Metro provides:

- Bundling
- Hot Reloading
- Fast Refresh
- Dependency resolution

---

# 3. Hermes

Hermes executes the JavaScript bundle.

```text
index.bundle
      │
      ▼
Hermes
      │
      ▼
Runs JavaScript
```

Example:

```js
console.log("Hello");
```

Hermes executes it.

---

# 4. React Reconciliation

React builds a virtual tree.

```jsx
<View>
  <Text>Hello</Text>
</View>
```

React creates:

```text
View
 └── Text
```

React compares:

```text
Old Tree
vs
New Tree
```

and determines what changed.

This process is called **Reconciliation**.

---

# 5. Fabric

Fabric is the renderer.

React says:

```text
Create Text
```

Fabric says:

```text
Android → TextView
iOS → UILabel
```

Example:

```jsx
<Text>Hello</Text>
```

becomes:

```text
Android
 └── TextView

iOS
 └── UILabel
```

Fabric handles:

- Creating views
- Updating views
- Deleting views

---

# 6. Yoga

This is one of the most important pieces.

Yoga is React Native's layout engine.

---

You write:

```jsx
<View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }}
/>
```

Who calculates:

```text
Width
Height
X Position
Y Position
```

?

👉 Yoga.

---

### Example

```jsx
<View style={{ flex: 1 }}>
  <View style={{ flex: 2 }} />
  <View style={{ flex: 1 }} />
</View>
```

Screen height:

```text
900px
```

Yoga calculates:

```text
First View  = 600px
Second View = 300px
```

Because:

```text
2 + 1 = 3

600 = 900 × (2/3)
300 = 900 × (1/3)
```

---

### Yoga's Job

```text
Flexbox
Margins
Padding
Position
Width
Height
```

It calculates layout before Fabric renders views.

---

Flow:

```text
React
   │
   ▼
Yoga
   │
Calculates Layout
   │
   ▼
Fabric
   │
Creates Views
```

---

# 7. JSI

JSI allows JavaScript to call native code directly.

Without JSI:

```text
JS
 │
 ▼
Bridge
 │
 ▼
Native
```

With JSI:

```text
JS
 │
 ▼
Native
```

Direct access.

---

# 8. TurboModules

TurboModules are native modules.

Examples:

- Camera
- GPS
- Bluetooth
- Contacts
- Filesystem

Example:

```js
Camera.takePhoto();
```

Flow:

```text
Hermes
  │
  ▼
JSI
  │
  ▼
TurboModule(Camera)
  │
  ▼
Native Camera
```

---

# 9. Native APIs

Actual Android/iOS code.

Android:

```text
CameraX
LocationManager
BluetoothAdapter
```

iOS:

```text
AVFoundation
CoreLocation
CoreBluetooth
```

TurboModules call these APIs.

---

# Full Example

Suppose:

```jsx
<Button title="Get Location" onPress={getLocation} />
```

### Build Time

```text
JSX
 │
 ▼
Babel
 │
 ▼
JavaScript
 │
 ▼
Metro Bundle
```

---

### Runtime

```text
Hermes
 │
 ▼
React
 │
 ▼
Fabric
 │
 ▼
Yoga Layout
 │
 ▼
Native Button
```

---

### User Clicks

```text
Button Click
 │
 ▼
Hermes
 │
 ▼
getLocation()
```

---

### Access GPS

```js
Location.getCurrentPosition();
```

```text
Hermes
 │
 ▼
JSI
 │
 ▼
TurboModule(Location)
 │
 ▼
Android/iOS GPS
 │
 ▼
Location Returned
```

---

### Update UI

```js
setLocation(data);
```

```text
React Reconciliation
 │
 ▼
Yoga Recalculates Layout
 │
 ▼
Fabric Updates Native Views
 │
 ▼
Screen Updated
```

## Quick Interview Summary

| Component            | Responsibility                     |
| -------------------- | ---------------------------------- |
| Babel                | Converts JSX/TS → JavaScript       |
| Metro                | Bundles JS files                   |
| Hermes               | Executes JavaScript                |
| React Reconciliation | Finds UI changes                   |
| Yoga                 | Calculates layout using Flexbox    |
| Fabric               | Creates/updates native views       |
| JSI                  | Direct JS ↔ Native communication   |
| TurboModules         | Native modules (Camera, GPS, etc.) |
| Android/iOS APIs     | Actual platform functionality      |

A simple way to remember:

```text
Babel      → Convert code
Metro      → Bundle code
Hermes     → Run code
React      → Calculate UI changes
Yoga       → Calculate layout
Fabric     → Draw native UI
JSI        → Connect JS to Native
TurboModule→ Native features
```
