> 🎯 **Topic:** Section 2: 🧠 1-Hour Daily Theory Routine (React Native, JS/TS, Architecture)
> 📊 **Difficulty:** Hard | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---

## Section 2: 🧠 1-Hour Daily Theory Routine (React Native, JS/TS, Architecture)

*⏱️ 60 min theory revision*

Revise these high-impact Q&As. These questions dictate whether an interviewer grades you as a Mid-level or a Lead/Senior developer.

### 1. JavaScript & TypeScript Core

**Q: Explain the Event Loop and the difference between Microtasks and Macrotasks.**
* **Answer:** JavaScript is single-threaded. The Event Loop monitors the Call Stack and the Callback Queues.
  * **Microtask Queue** has higher priority. It processes `Promises` (`.then`/`.catch`/`.finally`) and `MutationObserver`.
  * **Macrotask Queue** has lower priority. It processes `setTimeout`, `setInterval`, and DOM events.
  * *Rule:* The Event Loop will execute *all* microtasks before moving on to the next macrotask.

**Q: What is a Closure? Where do you use it?**
* **Answer:** A closure is a function that remembers the variables from its lexical scope, even after the outer function has finished executing. We use closures to implement data privacy (encapsulating state) and to build utility functions like `debounce` or `throttle`.

**Q: In TypeScript, what is the difference between an `interface` and a `type`?**
* **Answer:** Both can define the shape of objects. However, an `interface` can be re-declared to merge properties (Declaration Merging), making it ideal for libraries. A `type` alias cannot be re-opened, but it can represent union types (`type Status = 'success' | 'fail'`), tuples, and complex mapped utility types (`Pick`, `Omit`, `Partial`).

---

### 2. React Native Core Architecture

**Q: Explain the Legacy Architecture vs the New Architecture (Fabric & TurboModules).**
* **Answer:** 
  * **Legacy:** The JS thread and Native threads communicate asynchronously by serializing data into JSON strings and sending them over a "Bridge". This serialization causes major bottlenecks (dropped frames) during heavy events like animations or scrolling.
  * **New Architecture:** Uses **JSI (JavaScript Interface)**. JSI allows the JS engine to hold references directly to C++ objects. This means JavaScript can invoke native methods synchronously—*no JSON serialization, no asynchronous Bridge overhead*.
    * *Fabric:* The new synchronous UI rendering system.
    * *TurboModules:* Native modules that are lazily loaded into memory only when needed, vastly improving app startup time.

**Q: What is the Hermes Engine?**
* **Answer:** Hermes is a JavaScript engine explicitly optimized for React Native. Unlike older engines (JSC) that parse and Just-In-Time (JIT) compile JS on the device, Hermes uses **AOT (Ahead of Time) compilation**. It compiles the JS bundle into bytecode during the build process. This leads to drastically faster TTI (Time to Interactive), a smaller memory footprint, and a smaller APK/IPA size.

---

### 3. Optimization & Memory Leaks

**Q: How do you track down and fix Memory Leaks in React Native?**
* **Answer:** A memory leak occurs when an object is no longer needed but cannot be garbage-collected because it's still being referenced.
  1. **Unmounted Components:** Running `setState()` after a component unmounts. *Fix:* Cleanup API calls and use an `isMounted` flag in `useEffect` cleanup.
  2. **Event Listeners:** Forgetting to remove `AppState`, `BackHandler`, or `Keyboard` listeners. *Fix:* Always return a `.remove()` call in the `useEffect` cleanup function.
  3. **Timers:** Leaving `setInterval` running in the background. *Fix:* `clearInterval` on unmount.
  4. **Closures:** Keeping references to huge data sets inside a closure.

**Q: What is the difference between `useMemo` and `useCallback`?**
* **Answer:** Both are optimization hooks. 
  * `useMemo` caches the **result** of an expensive calculation. It only recalculates if dependencies change.
  * `useCallback` caches the **reference to a function**. In React, functions are recreated on every render. If you pass a function as a prop to a child wrapped in `React.memo`, the child will unnecessarily re-render unless you wrap the function in `useCallback`.

---

### 4. State Management (Redux RTK & Zustand)

**Q: Why migrate from legacy Redux to Redux Toolkit (RTK) or Zustand?**
* **Answer:**
  * **Legacy Redux:** Too much boilerplate (actions, types, reducers in separate files) and requires complex third-party tools for async logic (`redux-saga` / `redux-thunk`). State mutation bugs are common.
  * **Redux Toolkit (RTK):** Combines everything into `createSlice`. Uses `Immer.js` under the hood to allow safe "mutation" syntax. Built-in `createAsyncThunk` handles API loading states automatically.
  * **Zustand:** Ultra-minimalist. Zero boilerplate. No Context providers wrapping the app. Uses hooks directly. Resolves the "zombie child" re-render issue found in Redux.

---

### 5. Security & App Size

**Q: How do you secure sensitive data like Auth Tokens in React Native?**
* **Answer:** **Never** use `AsyncStorage` for sensitive data, as it is stored in plain text and can be extracted from rooted/jailbroken devices. Always use native secure storage APIs (iOS Keychain and Android Keystore) via libraries like `react-native-keychain` or `react-native-encrypted-storage`.

**Q: What is SSL Certificate Pinning and why is it important?**
* **Answer:** SSL Pinning prevents Man-In-The-Middle (MITM) attacks. By default, an OS trusts a wide range of root certificates. An attacker can install a proxy certificate (like Charles Proxy) to read API payloads. SSL Pinning hardcodes the server's exact SSL certificate (or public key) inside the app, forcing the app to reject connections if the certificate is spoofed.

**Q: Your Android app size is too large (100MB+). How do you reduce it?**
* **Answer:**
  1. **Use Android App Bundles (.aab):** Instead of a fat `.apk` containing assets for all device architectures, building an `.aab` lets the Google Play Store generate an optimized APK just for the user's specific device model.
  2. **Enable ProGuard / R8:** Strips out unused Java/Kotlin code and minifies native dependencies.
  3. **Enable Hermes:** Shrinks the JavaScript payload.
  4. **Optimize Assets:** Use `.webp` or SVG icons instead of high-res `.png` files.

---

### 6. CodePush & CI/CD

**Q: How does CodePush (Over The Air Updates) work? What are its limitations?**
* **Answer:** CodePush allows developers to deploy mobile app updates instantly, bypassing the App Store / Play Store review process. It works by sending the updated JavaScript bundle (`index.android.bundle`) and assets to a remote server. The app silently downloads this payload in the background and swaps it out on the next launch.
  * *Limitation:* CodePush **only** updates JavaScript and image assets. If you install a new NPM library that requires Native linking (changes to Android `build.gradle` or iOS `Podfile`), you **must** submit a new binary to the App Stores.
