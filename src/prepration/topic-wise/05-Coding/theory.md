## ⚙️ Section 1: Execution Control Wrappers (Debounce vs. Throttle)

In client-side applications (especially mobile apps), user interactions can trigger highly frequent events (e.g., typing in a search bar, scrolling a list, or swiping). If these events execute network requests or heavy layout computations directly, they can saturate threads and degrade performance.

We manage these events using execution control wrappers:

### 1. Debouncing
- **Concept**: Delays function execution until a specified quiet period has elapsed since the last time the event was triggered. Every time a new trigger occurs, the pending timer is cancelled and restarted.
- **Trigger Rule**: Executes the function **only once** after the user has completely stopped interacting.
- **Fintech Use Case**: Search input fields (e.g., searching for startup companies on Scalix). We wait 500ms after typing stops before hitting the search API, saving network bandwidth.

### 2. Throttling
- **Concept**: Limits function execution to a maximum of once every specified time interval. Even if events fire hundreds of times per second, the function is executed at a controlled, regular pace.
- **Trigger Rule**: Guarantees periodic execution at a defined frequency (e.g., maximum once every 100ms).
- **Fintech Use Case**: Scroll events inside a live ledger chart or map view updates, where layout updates must occur regularly but not at 120 FPS.

---

## 🏗️ Section 2: JavaScript Polyfills & Prototype Delegation

- **Polyfill**: A piece of code (usually JavaScript on the web) used to provide modern functionality on older browsers or JavaScript engines that do not natively support it.
- **Prototype Delegation**: JavaScript resolves methods on arrays or objects by traversing their prototype chain (`Array.prototype`). To build a polyfill, we define custom methods directly on the base prototype array interface if the native compiler checks resolve to `undefined`.

---

## 📢 Section 3: Event Emitters & The Publish-Subscribe Pattern

- **Publish-Subscribe (PubSub)**: A design pattern where senders (publishers) do not programmatically target messages to specific receivers (subscribers). Instead, events are categorized into channels or namespaces.
- **Event Emitter**: The central broker maintaining a map of active channels to callback subscriber lists.
  - When a subscriber registers (`on("event", callback)`), the broker adds their listener function reference to the event array.
  - When an event publishes (`emit("event", payload)`), the broker iterates over the subscriber array, invoking callbacks.
  - **Memory Safety**: Subscribers must call `off()` or `unsubscribe()` to clear references; otherwise, the broker retains strong references in memory, preventing Garbage Collection sweeps.

---

## 🗄️ Section 4: Function Memoization Caching

- **Memoization**: An optimization technique used to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.
- **Implementation**: The wrapper wraps the target function inside a closure containing a private `cache` map object. It stringifies the input arguments to construct a key hash. If the key exists inside the cache mapping, it returns the value immediately, bypassing function execution.
