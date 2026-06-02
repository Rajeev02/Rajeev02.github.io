In React Native, **Garbage Collection (GC)** is the automatic memory management process that identifies allocated memory that is no longer needed by the application and frees it up. Because a mobile device has strictly limited RAM compared to a desktop computer, understanding how garbage collection works is vital for a Senior Engineer to prevent app crashes (Out-Of-Memory errors) and micro-stutters.

To impress the IBM panel, you must explain that React Native is unique because it manages **two distinct runtime environments simultaneously**, meaning there are actually **two Garbage Collectors** working at the same time.

---

## 1. The Dual-Engine Garbage Collection Architecture

Because React Native bridges JavaScript with Native code, memory is split across two environments:

### Engine A: The JavaScript Garbage Collector (Hermes)

React Native modern apps run on the **Hermes engine**. Hermes uses a highly optimized garbage collector designed specifically for mobile devices.

- **How it works:** It uses a **Mark-and-Sweep** algorithm.

1. **Mark Phase:** The GC starts from the "root" (global variables, currently executing functions, active component states) and traverses the entire object graph. Every object that can be reached is "marked" as alive.
2. **Sweep Phase:** The GC scans the heap memory. Any object that was _not_ marked during the first phase is considered unreachable and its memory is reclaimed.

- **Mobile Optimization:** Hermes uses a **Generational GC**. It divides memory into "Young" and "Old" generations. Most JavaScript objects die young (like local variables inside a component render). Hermes cleans the Young generation incredibly fast via frequent "Gen 0" sweeps, reducing UI pauses.

### Engine B: The Native Garbage Collector (Android JVM / iOS ARC)

When your JavaScript code creates a native element (like rendering a `<View>` which instantiates an Android `android.view.View` or an iOS `UIView`), memory is allocated on the native side.

- **On Android:** The Android Virtual Machine (ART) runs its own separate Garbage Collector to manage Java/Kotlin objects.
- **On iOS:** iOS does not use a traditional Garbage Collector; instead, it uses **ARC (Automatic Reference Counting)**. ARC automatically tracks reference counts to objects in real-time and frees them the exact millisecond their reference count hits zero.

---

## 2. The Bridge/JSI Connection: How they talk to each other

The biggest engineering challenge in React Native is: _How does the JavaScript GC know when to let go of a Native object, and vice versa?_

### In the New Architecture (JSI / C++)

In the modern architecture, React Native uses **JSI (JavaScript Interface)**. JSI exposes C++ host objects directly to JavaScript.

- JavaScript variables hold a direct memory pointer to a C++ wrapper, which in turn holds a reference to the native view.
- When the Hermes GC determines that the JavaScript variable is out of scope and sweeps it, the C++ destructor runs instantly, notifying the Native Android/iOS runtime to release its corresponding native memory asset. This makes memory cleanup incredibly fast and deterministic.

---

## 3. The Senior Engineering Pitfall: Memory Leaks

Even with automated Garbage Collection, developers can accidentally write code that blocks the GC from freeing memory, resulting in a **Memory Leak**.

As a Senior Developer, you should highlight how to avoid these 3 common mobile memory leaks:

### Pitfall 1: Uncleared Timers or Event Listeners

If you start a continuous interval or attach a native listener inside a component but fail to clear it, the global runtime keeps a reference to that component's logic alive forever.

```javascript
useEffect(() => {
  const handleKeyboard = () => {
    /* Logic */
  };
  Keyboard.addListener("keyboardDidShow", handleKeyboard);

  // ❌ LEAK: Missing cleanup function!
  // The global Keyboard native module holds a reference to handleKeyboard,
  // preventing the Hermes GC from ever sweeping this component.
}, []);
```

### Pitfall 2: Closures in Long-Running Async Actions

If you fire a long-running network request and the user leaves the screen, the Promise callback is still sitting in the JavaScript event loop. That callback retains a closure reference to the component's state setters, forcing the entire screen to stay trapped in memory until the API resolves or times out. (This is why we use `AbortController` or `isMounted` flags!).

### Pitfall 3: Massive Retained Lists

If you render a massive feed of images using a standard scroll wrapper like `<ScrollView>`, React Native instantiates every single row component simultaneously and refuses to let the native views go.

- **The Fix:** Use `FlatList` or `FlashList`, which recycle native views as they scroll off-screen, allowing the native GC to reclaim image memory dynamically.

---

## 🎯 How to frame this for IBM:

> "React Native uses a hybrid memory ecosystem. While the Hermes engine runs an event-driven, generational Mark-and-Sweep garbage collector for JavaScript, the host mobile platform handles native view de-allocation using ARC on iOS and ART on Android. As an engineer, I prevent memory leaks across this boundary by strictly managing component lifecycles—ensuring all native listeners are decoupled on unmount, async requests are aborted gracefully, and infinite lists leverage view-recycling architectures like FlatList to keep the heap size lightweight."

---

What is the next topic on your mind, Rajeev? We can tackle another concept or pivot to behavioral strategies.
