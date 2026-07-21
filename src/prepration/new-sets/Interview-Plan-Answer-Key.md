# Interview Answer Key — Solutions & Examples
### Companion to the 1-Hour Interview Plan

Use this as your reference sheet while interviewing — check candidate answers against these, not for reading verbatim.

---

## 2. JavaScript Fundamentals

**1. `var` vs `let` vs `const`**
- `var`: function-scoped, hoisted (initialized as `undefined`), can be redeclared.
- `let`: block-scoped, hoisted but in a "temporal dead zone" until declaration, can be reassigned.
- `const`: block-scoped, cannot be reassigned (but objects/arrays it points to are still mutable).
```js
function test() {
  if (true) {
    var a = 1;   // function-scoped
    let b = 2;   // block-scoped
  }
  console.log(a); // 1
  console.log(b); // ReferenceError
}
```

**2. `==` vs `===`**
- `==` compares after type coercion. `===` compares value AND type, no coercion.
```js
0 == '0'   // true  (string coerced to number)
0 === '0'  // false
null == undefined  // true
null === undefined // false
```
Good answer: candidate should say "always prefer `===` unless there's a specific coercion reason."

**3. Closures**
A closure is a function that retains access to its outer scope's variables even after the outer function has returned.
```js
function counter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}
const increment = counter();
increment(); // 1
increment(); // 2 — `count` persisted between calls
```

**4. Event loop / call stack / micro vs macro tasks**
- Call stack executes synchronous code.
- Microtasks (Promises, `queueMicrotask`) run **immediately after** the current stack empties, before any macrotask.
- Macrotasks (`setTimeout`, `setInterval`, I/O) run after all microtasks are drained.
```js
console.log('1');
setTimeout(() => console.log('2'), 0);   // macrotask
Promise.resolve().then(() => console.log('3')); // microtask
console.log('4');
// Output: 1, 4, 3, 2
```

**5. `this` in arrow vs regular functions**
Regular functions: `this` is determined by how the function is *called* (dynamic).
Arrow functions: `this` is lexically inherited from the enclosing scope at definition time.
```js
const obj = {
  name: 'Claude',
  regular: function () { console.log(this.name); },  // 'Claude'
  arrow: () => { console.log(this.name); }            // undefined (this = outer scope)
};
```

**6. Prototypal inheritance**
Every object has an internal `[[Prototype]]` link. Property lookups walk up the prototype chain until found or `null`.
```js
const animal = { speak() { return 'generic sound'; } };
const dog = Object.create(animal);
dog.speak(); // 'generic sound' — inherited via prototype chain
```

**7. `Promise.all` / `race` / `allSettled`**
- `Promise.all`: resolves when *all* resolve, rejects immediately if *any* rejects.
- `Promise.race`: settles as soon as the *first* promise settles (resolve or reject).
- `Promise.allSettled`: waits for all to settle, returns status of each (never short-circuits).
```js
await Promise.allSettled([p1, p2, p3]);
// [{status:'fulfilled', value}, {status:'rejected', reason}, ...]
```

**8. Garbage collection (mark-and-sweep)**
The GC starts from "roots" (global object, active call stack) and marks every object reachable from them. Anything unmarked (unreachable) is swept/freed. Objects become leak sources when something unintentionally keeps a reference alive (e.g., a forgotten global, a closure, or an event listener never removed).

**9. Debounce vs Throttle**
- Debounce: delay execution until after a pause in events (e.g., search-as-you-type — wait until user stops typing).
- Throttle: execute at most once every X ms regardless of event frequency (e.g., scroll handler).
```js
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
```

**10. Closures causing memory leaks**
If a closure captures a large object/DOM node but the closure itself (e.g., an event listener) is never removed, that object can never be garbage collected.
```js
function attachHandler() {
  const bigData = new Array(1000000).fill('x');
  document.getElementById('btn').addEventListener('click', () => {
    console.log(bigData.length); // bigData is kept alive as long as listener exists
  });
}
// Fix: removeEventListener when component/page unmounts, or null out references.
```

---

## 3. TypeScript

**11. Benefits of TS**
Static typing catches errors at compile time, better IDE autocomplete/refactoring, self-documenting code, safer refactors at scale.

**12. `interface` vs `type`**
- `interface`: can be extended/merged (declaration merging), best for object shapes, classes.
- `type`: can represent unions, intersections, primitives, tuples — more flexible but no merging.
```ts
interface User { name: string }
interface User { age: number } // merges automatically

type Status = 'active' | 'inactive'; // interface can't do this
```

**13. Generics**
Allow writing reusable, type-safe code that works across multiple types.
```ts
function identity<T>(arg: T): T {
  return arg;
}
identity<string>('hello');
identity<number>(42);

// Practical: a typed API fetch wrapper
async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}
```

**14. `unknown` vs `any` vs `never`**
- `any`: opts out of type checking entirely (unsafe).
- `unknown`: type-safe counterpart of `any` — must narrow type before use.
- `never`: represents values that never occur (e.g., a function that always throws, or exhaustive switch fallback).
```ts
let val: unknown = 'hello';
val.toUpperCase(); // Error — must narrow first
if (typeof val === 'string') val.toUpperCase(); // OK
```

**15. Utility types**
```ts
interface User { id: number; name: string; email: string; }

type PartialUser = Partial<User>;      // all fields optional
type UserPreview = Pick<User, 'id' | 'name'>; // only id & name
type UserWithoutEmail = Omit<User, 'email'>;  // everything except email
type UserMap = Record<number, User>;   // { [id: number]: User }
```

**16. Discriminated unions**
A common literal field ("discriminant") lets TS narrow the type inside conditionals.
```ts
type Success = { status: 'success'; data: string };
type Failure = { status: 'error'; message: string };
type Result = Success | Failure;

function handle(result: Result) {
  if (result.status === 'success') {
    console.log(result.data); // TS knows this is Success here
  } else {
    console.log(result.message); // TS knows this is Failure here
  }
}
```

**17. Typing a generic custom hook**
```ts
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url).then(res => res.json()).then((json: T) => {
      setData(json);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
}
// Usage: const { data } = useFetch<User>('/api/user');
```

---

## 4. React

**18. Virtual DOM**
A lightweight JS representation of the real DOM. React diffs the new virtual tree against the previous one (reconciliation) and applies only the minimal set of real DOM updates — cheaper than direct DOM manipulation on every change.

**19. State vs Props**
- Props: passed from parent, read-only inside the child.
- State: local to the component, mutable via `setState`/`useState`, triggers re-render on change.

**20. Keys in lists**
Keys help React identify which items changed/added/removed between renders, so it can update the DOM efficiently instead of re-rendering the whole list. Using array index as a key is problematic if the list order changes (can cause stale state/incorrect re-use).
```jsx
{items.map(item => <Item key={item.id} {...item} />)} // use stable unique id, not index
```

**21. `useEffect` dependency array & cleanup**
```jsx
useEffect(() => {
  const id = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(id); // cleanup — runs before next effect & on unmount
}, [dependency]); // effect re-runs only when `dependency` changes
```
- `[]` → runs once on mount.
- No array → runs after every render.
- Missing cleanup for subscriptions/timers/listeners is a classic memory-leak source.

**22. `useMemo` vs `useCallback`**
- `useMemo` memoizes a **computed value**.
- `useCallback` memoizes a **function reference** (so it doesn't cause child re-renders via changed prop identity).
```jsx
const expensiveValue = useMemo(() => computeHeavyStuff(a, b), [a, b]);
const handleClick = useCallback(() => doSomething(id), [id]);
```

**23. Preventing unnecessary re-renders**
```jsx
const Child = React.memo(function Child({ value }) {
  return <div>{value}</div>;
});
// Child only re-renders if `value` prop actually changes (shallow compare)
```
Other techniques: splitting state to avoid unrelated re-renders, `useCallback`/`useMemo` for stable references, avoiding inline object/array literals as props.

**24. Context API vs prop drilling vs Redux/Zustand**
- Prop drilling: passing props through many layers — fine for shallow trees, painful at scale.
- Context: avoids drilling for state needed broadly (theme, auth) but **all consumers re-render** on any context value change — not ideal for high-frequency updates.
- Redux/Zustand: external stores with selective subscriptions, better for complex/frequently-changing global state, includes devtools/middleware.

**25. Reconciliation & Fiber**
Fiber is React's internal reimplementation of the reconciler that breaks rendering work into units, allowing React to pause, prioritize, and resume work (enabling concurrent features like transitions). Reconciliation itself is the diffing algorithm React uses to decide the minimal DOM mutations needed between renders.

**26. Automatic batching (React 18)**
Before React 18, state updates were only batched inside React event handlers. React 18 batches updates everywhere — including inside promises, `setTimeout`, and native event handlers — resulting in fewer re-renders.
```jsx
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 18: both batched into a single re-render
}, 1000);
```

**27. Custom data-fetching hook with caching/retry**
```jsx
function useFetchWithCache(url, retries = 2) {
  const cache = useRef(new Map());
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    async function load(attempt = 0) {
      if (cache.current.has(url)) {
        setState({ data: cache.current.get(url), loading: false, error: null });
        return;
      }
      try {
        const res = await fetch(url);
        const json = await res.json();
        cache.current.set(url, json);
        if (!cancelled) setState({ data: json, loading: false, error: null });
      } catch (err) {
        if (attempt < retries) return load(attempt + 1);
        if (!cancelled) setState({ data: null, loading: false, error: err });
      }
    }
    load();
    return () => { cancelled = true; }; // avoid setting state on unmounted component
  }, [url]);

  return state;
}
```

**28. Error boundaries**
Catch render/lifecycle errors in the component tree below them, but do **not** catch: errors in event handlers, async code (e.g., inside `setTimeout` or `fetch` callbacks), server-side rendering errors, or errors thrown in the boundary itself.
```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { logErrorToService(error, info); }
  render() {
    return this.state.hasError ? <FallbackUI /> : this.props.children;
  }
}
```

---

## 5. React Native

**29. Rendering vs React web**
RN doesn't render to a DOM/browser — JS describes a tree of components that map to actual native views (`UIView` on iOS, `android.view.View` on Android) via the bridge/native modules, giving native look/performance instead of a WebView.

**30. `FlatList` vs `.map()`**
`.map()` renders every item immediately (fine for very short static lists). `FlatList` virtualizes — only renders items currently visible (plus a small buffer), recycling views as you scroll, critical for performance with long/dynamic lists.

**31. Bridge vs New Architecture (JSI, Fabric, TurboModules)**
- Old bridge: JS and native communicate via asynchronous, serialized (JSON) messages — batched, can bottleneck with high-frequency updates (e.g., animations, gestures).
- JSI (JavaScript Interface): lets JS hold direct references to native objects/methods — synchronous calls, no serialization overhead.
- Fabric: new rendering system built on JSI for more consistent/synchronous UI updates.
- TurboModules: native modules loaded lazily and accessed directly via JSI instead of the bridge.

**32. Platform-specific code**
```js
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});
// Or separate files: Button.ios.js / Button.android.js — RN auto-resolves per platform
```

**33. Optimizing FlatList**
```jsx
<FlatList
  data={data}
  keyExtractor={item => item.id}
  renderItem={renderItem}
  getItemLayout={(data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
  windowSize={5}                 // reduce off-screen render window
  removeClippedSubviews={true}   // unmount off-screen views (Android especially)
  initialNumToRender={10}
  maxToRenderPerBatch={10}
/>
```

**34. Native crash vs JS crash debugging**
- JS crash: usually caught by RN's red-box/error overlay, or via `console.error`/Sentry/Crashlytics JS logs — check the JS stack trace.
- Native crash: app crashes without a JS error screen; check native crash logs (Xcode console/Crashlytics native reports for iOS, `adb logcat` or Android Studio Logcat for Android) — often a native module or memory issue.

**35. Deep linking & push notifications**
Deep linking: configure URL schemes/Universal Links (iOS) and intent filters (Android), handle via `Linking` API or a navigation library's linking config to route to the right screen.
Push notifications: typically via Firebase Cloud Messaging (Android) and APNs (iOS), often abstracted through a library (e.g., `react-native-firebase` or `notifee`), handling foreground/background/quit-state notification taps differently.

**36. Debugging a laggy animation**
Use the RN Performance Monitor / Flipper to check JS thread vs UI thread FPS. If the JS thread is the bottleneck, move the animation logic to the native thread using `useNativeDriver: true` (Animated API) or Reanimated (which runs entirely on the UI thread). Also check for unnecessary re-renders during the animation and heavy synchronous work blocking the JS thread.

---

## 6. Performance, Memory Leaks & Optimization

**37. Common causes of slow load**
Large/unoptimized bundle size, unoptimized images, too many synchronous/blocking scripts, no code-splitting, excessive re-renders, slow/uncached API calls, render-blocking CSS.

**38. Tools**
Chrome DevTools (Performance tab, Memory/Heap snapshots, Lighthouse), React DevTools Profiler (component render times), Flipper (RN — network, layout, performance plugins).

**39. Memory leak examples**
- Event listener added but never removed on unmount.
- `setInterval`/`setTimeout` not cleared.
- Detached DOM nodes still referenced in JS variables/closures.
- Global variables accidentally accumulating data (e.g., a growing cache with no eviction).

**40. Finding leaks with heap snapshots**
Take a heap snapshot, perform the suspected leaking action multiple times, take another snapshot, and compare — look for objects/detached DOM trees whose count keeps growing across snapshots instead of being garbage collected.

**41. Code-splitting / lazy loading**
```jsx
const Settings = React.lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Settings />
    </Suspense>
  );
}
```
Splits the bundle so `Settings`'s code only loads when actually needed, reducing initial load time.

**42. Real performance fix (talking point structure)**
Good answers follow: symptom noticed (e.g., slow list scroll) → tool used to diagnose (Profiler/Flamegraph) → root cause found (e.g., re-rendering entire list on every keystroke) → fix applied (memoization/virtualization) → measured improvement.

**43. Optimizing bundle size**
Tree-shaking (ES modules + a bundler that supports it), dynamic imports for route-based code-splitting, analyzing with `webpack-bundle-analyzer` or `source-map-explorer` to find heavy dependencies, replacing large libraries with lighter alternatives, removing unused dependencies.

---

## 7. Debugging & Bug Fixing

**44. Approach to a vague bug report**
Reproduce first (ask for steps/environment/screenshots if missing), check logs/error tracking (Sentry, Crashlytics), isolate by bisecting (recent commits/feature flags), use browser/RN devtools to inspect state at the point of failure, write a failing test once reproduced, then fix and verify.

**45. Hardest bug — what to listen for**
Look for a structured story: symptom → why it was hard to reproduce (e.g., race condition, timing-dependent, environment-specific) → the specific tool/technique that cracked it (logging, breakpoints, bisecting commits) → the actual fix.

**46. Debugging production-only issues**
Add structured/remote logging (e.g., Sentry breadcrumbs), use source maps to get readable stack traces from minified code, use feature flags to toggle suspect code paths for specific users, and where possible use remote debugging tools or session replay (e.g., LogRocket) to see exactly what the user did.

---

## 8. Agile Methodology

**47. Sprint / standup / retro basics**
- Sprint: a fixed time-box (commonly 1–2 weeks) to deliver a set of committed work.
- Standup: short daily sync — what I did, what I'll do, blockers.
- Retro: end-of-sprint reflection on what went well/poorly and action items for improvement.
- Sprint planning: team commits to a scoped set of backlog items for the upcoming sprint.

**48. Handling scope creep / urgent bugs mid-sprint**
Good answer: triage severity — a true production-blocking bug gets pulled in (with the team's awareness, possibly swapping out lower-priority committed work), while non-urgent scope changes go back to the product owner/backlog for the next sprint, protecting the current sprint's commitment.

---

## 9. Release / Deployment Process

**49. Typical CI/CD pipeline**
Code pushed → CI runs lint/unit tests/build → artifact deployed to a staging environment for QA/smoke tests → manual or automated approval gate → deployed to production (often with monitoring/alerts watching post-deploy metrics).

**50. Handling a bad production release**
- Rollback: redeploy the last known-good build/version (or use `git revert` + redeploy).
- Feature flags: ship code disabled by default, enable gradually — bad behavior can be flagged off instantly without a redeploy.
- Canary release: roll out to a small % of users/servers first, monitor error rates, then progressively increase.
- Blue-green deployment: run two identical environments; switch traffic to the new one only after health checks pass, keeping the old one ready for instant rollback.

---

## 10. DSA Solutions

**Reverse a string (Beginner)**
```js
function reverseString(str) {
  return str.split('').reverse().join('');
}
// Time: O(n), Space: O(n)
```

**Find duplicates in an array (Beginner)**
```js
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  for (const num of arr) {
    if (seen.has(num)) duplicates.add(num);
    seen.add(num);
  }
  return [...duplicates];
}
// Time: O(n), Space: O(n)
```

**Two Sum (Medium)**
```js
function twoSum(nums, target) {
  const map = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n) — vs brute force O(n^2)
```

**First non-repeating character (Medium)**
```js
function firstNonRepeating(str) {
  const counts = {};
  for (const ch of str) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of str) if (counts[ch] === 1) return ch;
  return null;
}
// Time: O(n), Space: O(n)
```

**Detect cycle in a linked list (Advanced — Floyd's algorithm)**
```js
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true; // pointers meet => cycle
  }
  return false;
}
// Time: O(n), Space: O(1)
```

**Longest substring without repeating characters (Advanced — sliding window)**
```js
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let start = 0, maxLen = 0;
  for (let end = 0; end < s.length; end++) {
    const ch = s[end];
    if (seen.has(ch) && seen.get(ch) >= start) {
      start = seen.get(ch) + 1; // move window past the repeat
    }
    seen.set(ch, end);
    maxLen = Math.max(maxLen, end - start + 1);
  }
  return maxLen;
}
// Time: O(n), Space: O(min(n, charset size))
```

---

## 🎯 Quick Scoring Guide
- **Beginner-level pass:** correct definition/basic example, may need prompting.
- **Medium-level pass:** correct + can explain *why*/trade-offs unprompted.
- **Advanced-level pass:** correct + trade-offs + can relate to a real production scenario or edge case unprompted.
