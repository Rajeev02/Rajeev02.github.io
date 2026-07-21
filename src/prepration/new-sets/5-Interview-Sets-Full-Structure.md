# React / React Native Interview — 5 Full Question Sets
### Beginner → Medium → Senior | Structured Format with Answers

Each question follows this structure:
**Question → Difficulty → Concepts Tested → Ideal Answer → Code Example → Production Example → Common Mistakes → Follow-up Questions → Tips for Answering**

Each set runs ~60 minutes and progresses from Beginner to Senior so you can stop at the level where the candidate starts struggling.

---
---

# SET 1 — JavaScript, TypeScript & Testing Fundamentals

## Q1. What's the difference between `var`, `let`, and `const`, and where have you seen `var` cause a real bug?
**Difficulty:** Beginner
**Concepts Tested:** Scoping, hoisting, temporal dead zone

**Ideal Answer:** `var` is function-scoped and hoisted (initialized as `undefined`); `let`/`const` are block-scoped and sit in a "temporal dead zone" until their declaration line. `const` prevents reassignment of the binding (not deep immutability).

**Code Example:**
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3 — var leaks out of the loop block
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 0, 1, 2 — let creates a new binding per iteration
}
```

**Production Example:** A classic bug: attaching click handlers in a loop with `var` for an index, where every handler ends up referencing the same final value instead of the value at the time it was created.

**Common Mistakes:** Saying "`let` is just a newer `var`" without mentioning block scope or the loop-closure gotcha above.

**Follow-up Questions:**
- Why does `const arr = []; arr.push(1)` work even though `arr` is `const`?
- What is the "temporal dead zone" exactly?

**Tips for Answering:** Lead with the scoping rule, then immediately give the loop/closure example — that's what separates a rote definition from real understanding.

---

## Q2. Walk me through the output order of this code and explain why.
**Difficulty:** Medium
**Concepts Tested:** Event loop, call stack, microtask vs macrotask queue

**Ideal Answer:** Synchronous code runs first (via the call stack). Once the stack is empty, **all** queued microtasks (Promise callbacks) run before the **next single** macrotask (`setTimeout`, etc.) is picked up.

**Code Example:**
```js
console.log('1: Start');
setTimeout(() => console.log('2: Timeout'), 0);
Promise.resolve().then(() => console.log('3: Promise'));
console.log('4: End');
// Output: 1, 4, 3, 2
```

**Production Example:** A common real bug: code assumes a `setTimeout(fn, 0)` runs "immediately after" a `.then()` callback queued at the same time — it doesn't; all microtasks drain first, which can cause subtle state-ordering bugs in UI updates.

**Common Mistakes:** Assuming `setTimeout(fn, 0)` runs synchronously or immediately; not knowing microtasks fully drain before the next macrotask.

**Follow-up Questions:**
- What happens if a microtask queues another microtask — does it still run before the next macrotask?
- Where does `requestAnimationFrame` fit into this?

**Tips for Answering:** Trace through the example out loud line-by-line rather than reciting the definition — interviewers are grading your mental model, not your vocabulary.

---

## Q3. Explain closures, and show me a real use case you've implemented with one.
**Difficulty:** Medium
**Concepts Tested:** Closures, scope retention, practical application (debounce)

**Ideal Answer:** A closure is a function that retains access to its defining scope's variables even after that outer function has returned. Practically, this is how debounce/throttle, memoization, and private counters work.

**Code Example:**
```js
function debounce(fn, delay) {
  let timer; // retained across calls via closure
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
const debouncedSearch = debounce((query) => fetchResults(query), 400);
```

**Production Example:** A search-as-you-type box firing an API call on every keystroke ("R", "Re", "Rea", "Reac", "React") — debounce collapses this into a single call after the user pauses typing.

**Common Mistakes:** Defining closures correctly but being unable to name a real use case beyond "counters," or not spotting that a closure over a large object in a never-removed event listener is a leak vector.

**Follow-up Questions:**
- How would closures cause a memory leak?
- Difference between debounce and throttle — when would you pick one over the other?

**Tips for Answering:** Always pair the definition with a use case candidates have *actually shipped* — that's the signal interviewers are listening for.

---

## Q4. Implement a `fetchWithRetry` function with exponential backoff, and explain when you'd reach for `Promise.all` vs `allSettled` vs `race` vs `any`.
**Difficulty:** Senior
**Concepts Tested:** Async control flow, Promise combinators, resilience patterns

**Ideal Answer:** `Promise.all` fails fast if any promise rejects; `allSettled` waits for all regardless of outcome; `race` resolves/rejects on whichever settles first; `any` resolves on the first *success*, ignoring rejections until all fail.

**Code Example:**
```js
async function fetchWithRetry(url, retries = 3, delay = 300) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise(r => setTimeout(r, delay * 2 ** attempt)); // exponential backoff
    }
  }
}
```

**Production Example:** A dashboard loading 12 widgets from independent APIs uses `allSettled` so one failing widget doesn't blank the entire screen — each card shows its own error state instead.

**Common Mistakes:** Using `Promise.all` for independent, non-critical data fetches (one failure kills the whole screen); forgetting exponential backoff and hammering a struggling server with immediate retries.

**Follow-up Questions:**
- How would you cap total retry time so a user isn't stuck waiting forever?
- How does this interact with React Query's built-in retry behavior — would you still write this yourself?

**Tips for Answering:** Mention that libraries like TanStack Query already do this, but be ready to write it from scratch — interviewers want to confirm you understand the mechanism, not just the library API.

---

## Q5. Write a generic, strictly-typed data-fetching hook using TypeScript generics.
**Difficulty:** Medium
**Concepts Tested:** TypeScript generics, type-safe hooks

**Ideal Answer:** A generic function parameter `<T>` lets the caller specify the response shape, and TypeScript infers/enforces it at every usage site.

**Code Example:**
```ts
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then((json: T) => { if (!cancelled) setData(json); })
      .catch(err => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}

interface User { id: number; name: string; }
const { data } = useFetch<User>('/api/user'); // data is typed as User | null
```

**Production Example:** A design system's `<UserProfile>` component consumes `useFetch<User>` and gets full autocomplete/type-checking on `data.name`, catching typos like `data.nmae` at compile time instead of runtime.

**Common Mistakes:** Typing the hook's return as `any`, defeating the purpose of using generics at all; forgetting the cancellation flag, causing "set state on unmounted component" warnings.

**Follow-up Questions:**
- How would you add caching to this so the same URL isn't re-fetched?
- How does this compare to what TanStack Query gives you out of the box?

**Tips for Answering:** Emphasize the *why* — generics exist so one hook can serve many typed call sites without duplicating logic or losing type safety.

---

## Q6. Explain discriminated unions and how they help avoid runtime bugs.
**Difficulty:** Senior
**Concepts Tested:** TypeScript type narrowing, exhaustiveness checking

**Ideal Answer:** A shared literal "discriminant" field lets TypeScript narrow a union type inside conditionals, and combined with a `never`-typed exhaustiveness check, the compiler can catch missing cases at build time.

**Code Example:**
```ts
type Success = { status: 'success'; data: string };
type Failure = { status: 'error'; message: string };
type Result = Success | Failure;

function handle(result: Result) {
  switch (result.status) {
    case 'success': return result.data;
    case 'error': return result.message;
    default:
      const _exhaustive: never = result; // compile error if a case is missing
      throw new Error('Unhandled case');
  }
}
```

**Production Example:** An API response type with `status: 'loading' | 'success' | 'error'` used across a whole app — if a new `'empty'` state is added later, every `switch` using the exhaustiveness pattern will fail to compile until it's handled everywhere.

**Common Mistakes:** Using `any` or loose `if` chains instead of a discriminant field, losing all compile-time safety when new states are added.

**Follow-up Questions:**
- How would this change if two branches shared most fields but differed slightly?
- Where else have you used exhaustiveness checking?

**Tips for Answering:** The `never` exhaustiveness trick is a strong senior-level signal — mention it even if not asked directly.

---

## Q7. What's your testing strategy for a React Native app, and how would you unit test a component that fetches data?
**Difficulty:** Medium
**Concepts Tested:** Testing pyramid, Jest, React Native Testing Library (RNTL), mocking

**Ideal Answer:** Layer tests: Jest for pure logic/reducers/utils, RNTL for component behavior (renders, user interaction, state changes) without relying on implementation details, and Detox/E2E for full user flows across screens. Mock network calls rather than hitting real APIs in unit tests.

**Code Example:**
```jsx
// ProductList.test.jsx
import { render, screen, waitFor } from '@testing-library/react-native';
import ProductList from './ProductList';

jest.mock('../api', () => ({
  fetchProducts: jest.fn(() => Promise.resolve([{ id: 1, title: 'Shoe' }])),
}));

test('renders fetched products', async () => {
  render(<ProductList />);
  expect(screen.getByText(/loading/i)).toBeTruthy();
  await waitFor(() => expect(screen.getByText('Shoe')).toBeTruthy());
});
```

**Production Example:** A team ships confidently after every PR because CI runs Jest unit tests (fast, run on every commit) plus a smaller suite of Detox E2E tests (slower, run pre-merge) covering login → checkout — catching regressions before they reach QA.

**Common Mistakes:** Testing implementation details (internal state variable names) instead of user-visible behavior; not mocking network calls, making tests slow/flaky; skipping tests for "obvious" components that later break silently.

**Follow-up Questions:**
- How do you decide what to unit test vs E2E test?
- How would you test a custom hook in isolation?
- How do you handle testing platform-specific code (iOS vs Android)?

**Tips for Answering:** Frame testing as a pyramid (many fast unit tests, fewer slow E2E tests) rather than "we write tests for everything" or "we don't really test" — both extremes are red flags.

---
---

# SET 2 — React & React Native Core

## Q1. What's the difference between state and props, and why do keys matter in lists?
**Difficulty:** Beginner
**Concepts Tested:** Core React data flow, list reconciliation

**Ideal Answer:** Props are passed down and read-only inside the receiving component; state is local and mutable via `setState`/`useState`, triggering a re-render on change. Keys let React match list items across renders so it updates/reorders efficiently instead of re-rendering the whole list; using array index as a key breaks this if the list order changes.

**Code Example:**
```jsx
{items.map(item => <Item key={item.id} {...item} />)} // stable id, not index
```

**Production Example:** A to-do list using index as key caused checkbox states to jump to the wrong row after deleting an item in the middle — switching to a stable `item.id` key fixed it.

**Common Mistakes:** Using array index as key for lists that can reorder, filter, or have items removed.

**Follow-up Questions:**
- When is using index as a key actually safe?
- What happens internally if you don't provide a key at all?

**Tips for Answering:** Explain the "why" behind keys (reconciliation), not just "React needs them."

---

## Q2. When would you use `useMemo` vs `useCallback`, and how do they interact with `React.memo`?
**Difficulty:** Medium
**Concepts Tested:** Render optimization, referential equality

**Ideal Answer:** `useMemo` memoizes a computed **value**; `useCallback` memoizes a **function reference**. Both exist to preserve referential equality across renders so children wrapped in `React.memo` don't re-render due to a "new" prop that's functionally identical.

**Code Example:**
```jsx
const expensiveValue = useMemo(() => computeHeavyStuff(a, b), [a, b]);
const handleClick = useCallback(() => doSomething(id), [id]);

const Child = React.memo(({ onClick }) => <Button onClick={onClick} />);
```

**Production Example:** A parent re-rendering every second (a live clock) was causing a heavy child chart to re-render too — wrapping the chart in `React.memo` and its callback prop in `useCallback` isolated the re-renders to just the clock text.

**Common Mistakes:** Overusing `useMemo`/`useCallback` everywhere "for performance" when the computation is trivial — this adds overhead without benefit. Optimization should be targeted, not blanket.

**Follow-up Questions:**
- How would you prove a re-render was actually prevented (profiling)?
- What's the cost of over-memoizing?

**Tips for Answering:** Say explicitly that memoization isn't free — mention you'd profile first, then optimize, not optimize preemptively everywhere.

---

## Q3. A FlatList with 1,000+ items is dropping frames while scrolling. Walk me through your fix.
**Difficulty:** Medium
**Concepts Tested:** List virtualization, RN performance tuning

**Ideal Answer:** Ensure a stable `keyExtractor`, memoize the row component, provide `getItemLayout` if row height is fixed (skips measurement), and tune `windowSize`/`maxToRenderPerBatch`/`removeClippedSubviews` to control how much is rendered off-screen.

**Code Example:**
```jsx
const Row = React.memo(({ item }) => <Text>{item.title}</Text>);

<FlatList
  data={data}
  keyExtractor={item => item.id}
  renderItem={({ item }) => <Row item={item} />}
  getItemLayout={(_, index) => ({ length: 50, offset: 50 * index, index })}
  windowSize={5}
  removeClippedSubviews
  initialNumToRender={10}
  maxToRenderPerBatch={10}
/>
```

**Production Example:** An e-commerce app's 50,000-item catalog list went from dropping to ~20fps down to a smooth 60fps after adding `getItemLayout` (avoiding dynamic measurement) and memoizing the row — the fix required no backend change at all.

**Common Mistakes:** Inline anonymous `renderItem` functions recreated every render; not memoizing row components; using `.map()` instead of `FlatList` for large lists (no virtualization at all).

**Follow-up Questions:**
- When would you reach for FlashList instead of FlatList?
- How would you profile this to confirm frame drops are actually JS-thread, not UI-thread, bound?

**Tips for Answering:** Mention profiling first (Flipper/Perf Monitor) before listing fixes — shows you diagnose rather than guess.

---

## Q4. Explain the React Native "New Architecture" (JSI, Fabric, TurboModules) vs the legacy Bridge.
**Difficulty:** Senior
**Concepts Tested:** RN internals, cross-platform architecture

**Ideal Answer:** The legacy Bridge sends async, JSON-serialized messages between JS and native — a bottleneck for high-frequency events like scrolling/animations. JSI lets JS hold direct references to native C++ objects, enabling synchronous calls with no serialization. Fabric is the new rendering system built on JSI; TurboModules lazily load native modules on demand via JSI instead of the bridge, improving startup time.

**Production Example:** An app with a custom native Bluetooth module making thousands of calls per second saw major frame drops on the legacy Bridge (serialization overhead); migrating to JSI/TurboModules removed the bottleneck since calls became direct and synchronous.

**Common Mistakes:** Describing Fabric/JSI/TurboModules as marketing terms without explaining *why* they solve the bridge's serialization bottleneck specifically.

**Follow-up Questions:**
- What migration risks exist when upgrading an older app to the New Architecture?
- Does this affect JS-only apps with no custom native modules?

**Tips for Answering:** Anchor the explanation in the *problem* (bridge serialization cost) before naming the solutions — this is what distinguishes real understanding from memorized buzzwords.

---

## Q5. Design a custom `useFetchWithCache` hook with retry logic and TypeScript generics.
**Difficulty:** Senior
**Concepts Tested:** Custom hooks, caching, cleanup, generics

**Ideal Answer:** Use a `useRef`-backed cache keyed by URL, retry with backoff on failure, and a cancellation flag in cleanup to avoid setting state after unmount.

**Code Example:**
```tsx
function useFetchWithCache<T>(url: string, retries = 2) {
  const cache = useRef(new Map<string, T>());
  const [state, setState] = useState<{ data: T | null; loading: boolean; error: Error | null }>({
    data: null, loading: true, error: null,
  });

  useEffect(() => {
    let cancelled = false;
    async function load(attempt = 0): Promise<void> {
      if (cache.current.has(url)) {
        setState({ data: cache.current.get(url)!, loading: false, error: null });
        return;
      }
      try {
        const res = await fetch(url);
        const json: T = await res.json();
        cache.current.set(url, json);
        if (!cancelled) setState({ data: json, loading: false, error: null });
      } catch (err) {
        if (attempt < retries) return load(attempt + 1);
        if (!cancelled) setState({ data: null, loading: false, error: err as Error });
      }
    }
    load();
    return () => { cancelled = true; };
  }, [url]);

  return state;
}
```

**Production Example:** A product detail screen re-visited multiple times during a shopping session serves instantly from cache instead of re-fetching, while still handling flaky network with retries on first load.

**Common Mistakes:** Forgetting the cancellation guard (causes "setState on unmounted component" warnings/crashes); caching indefinitely with no invalidation strategy.

**Follow-up Questions:**
- How would you add cache invalidation/staleness?
- Why might you use TanStack Query instead of hand-rolling this in production?

**Tips for Answering:** Be upfront that in real projects you'd likely use React Query for this — but show you understand what it's doing under the hood.

---

## Q6. What do error boundaries catch, and — critically — what do they *not* catch?
**Difficulty:** Medium
**Concepts Tested:** Error handling, React lifecycle limitations

**Ideal Answer:** Error boundaries catch render/lifecycle errors in the component tree below them. They do **not** catch errors in event handlers, async code (e.g. inside a `fetch().then()` or `setTimeout`), server-side rendering errors, or errors thrown in the boundary itself.

**Code Example:**
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

**Production Example:** A team was confused why their error boundary "didn't work" — the actual crash was inside an `onPress` handler's async API call, which error boundaries never catch; they needed a try/catch plus a Sentry report inside the handler itself.

**Common Mistakes:** Assuming error boundaries are a catch-all safety net for the whole app, including async and event-handler code.

**Follow-up Questions:**
- How do you handle errors in async event handlers then?
- How does this interact with a global crash reporting tool like Sentry/Crashlytics?

**Tips for Answering:** The "what it doesn't catch" half of this answer is the actual signal — most junior candidates only know the "what it does catch" half.

---

## Q7. How do you test React Native components, and what's your approach to E2E testing critical flows like login/checkout?
**Difficulty:** Senior
**Concepts Tested:** RNTL, Detox, testing strategy at scale

**Ideal Answer:** Unit-test hooks/logic in isolation with Jest; use RNTL for component-level tests focused on user-visible behavior (what's rendered, what happens on tap) rather than internals; reserve Detox for a small number of critical, high-value E2E flows since they're slow and can be flaky — running them pre-merge or nightly rather than on every commit.

**Code Example:**
```jsx
// Detox E2E snippet
describe('Login flow', () => {
  it('should navigate to home on valid login', async () => {
    await element(by.id('email')).typeText('user@test.com');
    await element(by.id('password')).typeText('password123');
    await element(by.id('loginButton')).tap();
    await expect(element(by.id('homeScreen'))).toBeVisible();
  });
});
```

**Production Example:** A team limited Detox E2E coverage to just login, checkout, and payment — the highest-risk revenue-impacting flows — while relying on fast Jest/RNTL tests for everything else, keeping CI under 15 minutes instead of an hour.

**Common Mistakes:** Trying to E2E test everything (slow, flaky, expensive to maintain); no tests at all for critical revenue flows because "manual QA covers it."

**Follow-up Questions:**
- How do you keep E2E tests from becoming flaky/unreliable?
- How would you test push notification handling or deep linking?

**Tips for Answering:** Emphasize the trade-off explicitly — testing strategy is a cost/confidence balance, not "more tests = always better."

---
---

# SET 3 — State Management, Architecture & Agile

## Q1. Why might a team choose Zustand plus Context over prop drilling, and what's the trade-off with Context specifically?
**Difficulty:** Beginner/Medium
**Concepts Tested:** Global state rationale, Context re-render behavior

**Ideal Answer:** Prop drilling becomes painful past a few component layers; both Context and external stores solve this, but **any** Context value change re-renders **all** consumers, even ones that only care about part of the value — problematic for frequently-changing state. External stores like Zustand allow selective subscriptions, so only components using the changed slice re-render.

**Code Example:**
```js
// Zustand — selective subscription, no unnecessary re-renders
const useStore = create(set => ({
  user: null,
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
const theme = useStore(state => state.theme); // only re-renders when `theme` changes
```

**Production Example:** A dark-mode toggle stored in Context caused the *entire* app tree to re-render on every toggle since all consumers subscribed to the same Context value — switching just that slice to Zustand fixed it without touching Context's use for rarely-changing values like auth.

**Common Mistakes:** Treating Context as a free global-state solution for everything, including frequently-changing data.

**Follow-up Questions:**
- When is Context still the right choice?
- How would you split Context to reduce this re-render blast radius?

**Tips for Answering:** Don't say "always use library X" — show you weigh update frequency and consumer count before choosing.

---

## Q2. Why separate TanStack Query (server state) from Zustand (client state) instead of putting everything in one store?
**Difficulty:** Medium
**Concepts Tested:** Server vs client state architecture

**Ideal Answer:** Server state (API data) has fundamentally different needs — caching, background refetching, staleness, request deduplication — that TanStack Query handles automatically. Client state (auth session, UI toggles) is inherently local and doesn't need those concerns. Mixing them means reimplementing caching/invalidation logic by hand inside a generic store.

**Code Example:**
```js
// Server state — TanStack Query
const { data } = useQuery({ queryKey: ['dashboard'], queryFn: getDashboard, staleTime: 300000 });

// Client state — Zustand
const useAuthStore = create(set => ({ token: null, setToken: (t) => set({ token: t }) }));
```

**Production Example:** A PR proposed fetching a customer list and storing it in the global Zustand store for reuse across screens — the right call is to reject it: server data belongs in TanStack Query, which already handles caching/refetch/staleness, whereas Zustand would need all that logic rebuilt manually.

**Common Mistakes:** Storing fetched API data in a general-purpose global store, then manually reinventing cache invalidation, loading states, and refetch-on-focus.

**Follow-up Questions:**
- How do you decide `staleTime` for a given query?
- How would you handle a case where client state depends on server state (e.g. a derived value)?

**Tips for Answering:** Use a concrete example of rejecting a PR that mixes the two — it signals you'd actually enforce this standard on a real team, not just recite the theory.

---

## Q3. A task list needs to work offline. A user creates a task offline (no server ID yet) — how do you handle the state and later reconcile it with the real server ID?
**Difficulty:** Senior
**Concepts Tested:** Optimistic updates, offline architecture, data reconciliation

**Ideal Answer:** Assign a temporary client-generated ID (e.g. UUID) immediately and render it optimistically. Queue the create request. When the network returns and the server responds with the real ID, swap the temp ID for the real one in local state/cache — using the temp ID as a lookup key to find and update the exact record, not by re-fetching the whole list.

**Code Example:**
```js
const tempId = `temp-${crypto.randomUUID()}`;
queryClient.setQueryData(['tasks'], old => [...old, { id: tempId, title, pending: true }]);

// On successful sync:
queryClient.setQueryData(['tasks'], old =>
  old.map(task => task.id === tempId ? { ...serverTask, pending: false } : task)
);
```

**Production Example:** A field-inspection app used this exact temp-ID pattern so inspectors could keep working offline for hours, with the UI immediately reflecting new entries — sync happened transparently once connectivity returned, without the list "jumping" or duplicating entries.

**Common Mistakes:** Re-fetching the entire list after sync instead of surgically replacing the temp record (causes UI flicker/reordering); not handling the case where the create request ultimately fails.

**Follow-up Questions:**
- How do you handle a conflict if the server rejects the create (e.g. validation failure)?
- What data structure would you use to track the sync queue itself?

**Tips for Answering:** Walk through the full lifecycle (create → optimistic render → queue → sync → reconcile) as a flow, not just the final data structure — this is what senior interviewers are actually probing for.

---

## Q4. Your monorepo has strict package boundaries (Admin/Agent/Customer features never import each other, shared logic lives in `core`). A new feature needs logic currently living in Admin, for use by Agent. How do you handle it — and how would you design permission checks to run in O(1) time even with multiple overlapping roles?
**Difficulty:** Senior
**Concepts Tested:** Monorepo architecture, RBAC data structures, scalability thinking

**Ideal Answer:** Move the shared logic **down** into `core` so both Admin and Agent depend on it — never link feature packages to each other directly, which would defeat the purpose of the boundary. For RBAC, avoid scattered `if (role === 'admin')` checks; instead maintain a `ROLE_PERMISSIONS` map from role → Set of permission strings, and merge sets for users with multiple roles, so `hasPermission()` is a simple `Set.has()` lookup — O(1) regardless of how many roles/permissions exist.

**Code Example:**
```ts
const ROLE_PERMISSIONS: Record<string, Set<string>> = {
  admin: new Set(['view_dashboard', 'edit_user', 'delete_user']),
  agent: new Set(['view_dashboard']),
};

function hasPermission(userRoles: string[], permission: string): boolean {
  return userRoles.some(role => ROLE_PERMISSIONS[role]?.has(permission));
}
// O(1) per role checked, regardless of total permission count
```

**Production Example:** When product added a "super-agent" role needing access to half of Admin's screens, only one line was added to `ROLE_PERMISSIONS` instead of updating dozens of scattered `if` checks across the codebase.

**Common Mistakes:** Importing directly between sibling feature packages "just this once" (erodes the whole point of the boundary over time); hardcoding role checks inline across many components instead of centralizing them.

**Follow-up Questions:**
- How would you extend this to fully dynamic, user-created custom roles?
- How does Turborepo's caching benefit from this package structure?

**Tips for Answering:** Name the architectural principle explicitly ("shared logic moves down, never sideways") — that's the sentence senior interviewers are listening for.

---

## Q5. What happens in a sprint, and what's your role in standups/retros?
**Difficulty:** Beginner
**Concepts Tested:** Agile basics

**Ideal Answer:** A sprint is a fixed time-box (often 1–2 weeks) where the team commits to delivering a scoped set of backlog items. Daily standup is a short sync (what I did, what I'll do, any blockers). Sprint planning sets the scope; retro reflects on what went well/poorly with concrete action items for the next sprint.

**Common Mistakes:** Describing standup as a status report to a manager rather than a peer sync for surfacing blockers.

**Follow-up Questions:**
- What's the difference between a sprint retro and a post-mortem?
- How do story points factor into planning?

**Tips for Answering:** Keep this concise and practical — this is a calibration question, not a deep-dive one.

---

## Q6. A critical bug shows up mid-sprint. How do you handle it without blowing up the sprint's commitments?
**Difficulty:** Medium
**Concepts Tested:** Agile trade-off judgment, prioritization

**Ideal Answer:** Triage by severity: a true production-blocking issue gets pulled in with the team's shared awareness — likely swapping out a lower-priority committed item rather than just adding work on top. Non-urgent scope changes go back to the product owner/backlog for the *next* sprint, protecting what the team already committed to.

**Common Mistakes:** Silently absorbing all new requests into the current sprint without renegotiating scope, leading to burnout and missed commitments; or rigidly refusing all mid-sprint changes regardless of severity.

**Follow-up Questions:**
- Who should have the authority to approve pulling in urgent work mid-sprint?
- How do you communicate this trade-off to stakeholders who just want "both" done?

**Tips for Answering:** Show you'd negotiate the swap transparently with the team/PO rather than either blindly saying yes or rigidly saying no.

---

## Q7. Two senior developers are in a heated PR disagreement — one wants Zustand for everything, the other insists on strict TanStack Query usage. As the lead, how do you resolve it?
**Difficulty:** Senior
**Concepts Tested:** Technical leadership, conflict resolution, communication

**Ideal Answer:** Reframe the disagreement around the actual distinction that matters — server state vs. client state — rather than personal tool preference. Bring both developers into a short technical discussion anchored on that principle, make a documented decision (e.g. an ADR — Architecture Decision Record), and apply it consistently going forward so the debate doesn't resurface PR by PR.

**Common Mistakes:** Avoiding the conflict and letting each developer do their own thing in their own PRs, leading to an inconsistent codebase; making a decision without documenting the reasoning, so the same argument repeats next month.

**Follow-up Questions:**
- How would you enforce the decision technically (lint rules, code review checklist) rather than relying on memory?
- What do you do if one developer still disagrees after the decision is made?

**Tips for Answering:** Lead with the reframing move (surface the underlying principle, not the tool preference) — that's the leadership signal interviewers want, more than the specific technical answer.

---
---

# SET 4 — Performance, Memory Leaks, Debugging & DSA

## Q1. What is a memory leak in a React Native context, and name two real examples.
**Difficulty:** Beginner
**Concepts Tested:** Memory leak fundamentals

**Ideal Answer:** A memory leak happens when memory that's no longer needed can't be garbage-collected because something still references it. Common examples: event listeners (`AppState`, `Keyboard`, navigation listeners) never removed on unmount, and `setInterval`/`setTimeout` timers left running after a component unmounts.

**Code Example:**
```jsx
useEffect(() => {
  const sub = AppState.addEventListener('change', handleChange);
  return () => sub.remove(); // cleanup — without this, handler + closure never get freed
}, []);
```

**Common Mistakes:** Adding listeners/timers without a cleanup function in `useEffect`.

**Follow-up Questions:**
- What other common sources of leaks exist beyond listeners and timers?
- How would you notice a leak was happening at all?

**Tips for Answering:** Always pair the definition with the `useEffect` cleanup pattern — it's the single most common fix asked for.

---

## Q2. App memory climbs from 100MB to 300MB+ over 20 minutes and never drops. Walk me through your debugging process.
**Difficulty:** Medium
**Concepts Tested:** Heap profiling, systematic debugging

**Ideal Answer:** Use Flipper (RN) or Chrome DevTools heap snapshots: take a baseline snapshot, perform the suspected leaking action repeatedly, take another snapshot, and compare — look for object/detached-node counts that keep growing instead of stabilizing. Prime suspects: uncleaned event listeners, timers, WebSocket connections left open per screen visit, growing in-memory caches with no eviction, and Animated values/navigation listeners not cleaned up.

**Production Example:** A chat app opened a new WebSocket connection every time a chat screen was visited without closing the previous one — after 20 screen visits, 20 open sockets were draining memory and battery; the fix was closing the socket in the screen's unmount cleanup.

**Common Mistakes:** Guessing at a fix without profiling first; fixing only the first leak found without checking for others contributing to the same growth curve.

**Follow-up Questions:**
- How would you distinguish a genuine leak from expected cache growth?
- What's your process if the leak only appears after 20+ minutes (hard to reproduce quickly)?

**Tips for Answering:** Lead with "I'd profile before guessing" — this is the number one thing that separates a strong debugging answer from a weak one.

---

## Q3. Users complain the app takes 8–10 seconds to launch. What's your optimization plan?
**Difficulty:** Senior
**Concepts Tested:** Startup performance, RN-specific optimizations

**Ideal Answer:** Measure first (Flipper/Xcode Instruments/Android Profiler) to find where time is actually going. Common fixes: enable Hermes (AOT-compiled bytecode instead of JIT), remove heavy synchronous work from the root `App.tsx`, lazy-load screens not needed immediately, defer non-critical API calls until after first render, avoid synchronous storage reads on the main thread during startup, and trim splash screen duration to match actual load time rather than padding it.

**Code Example:**
```jsx
const Dashboard = React.lazy(() => import('./Dashboard')); // defer until needed
```

**Production Example:** An app doing a synchronous `AsyncStorage`-equivalent read plus initializing a large Redux store before the first paint was cut from 9 seconds to under 3 by moving that work to happen *after* the first screen rendered, and switching to Hermes.

**Common Mistakes:** Optimizing blindly (e.g., "just enable Hermes") without first measuring where the actual time is spent; treating the splash screen as a fix rather than addressing the real startup cost underneath it.

**Follow-up Questions:**
- How would you measure "time to interactive" specifically, not just splash screen duration?
- What's the trade-off of lazy-loading a screen the user is very likely to visit immediately?

**Tips for Answering:** Structure the answer as measure → diagnose → fix → re-measure, not just a list of tips.

---

## Q4. A crash only happens in production and you can't reproduce it locally. What's your process?
**Difficulty:** Senior
**Concepts Tested:** Production debugging methodology

**Ideal Answer:** Pull the crash report from Crashlytics/Sentry to get the stack trace, device, OS version, and the user action sequence leading up to it. Isolate which layer it's in (JS, native bridge, native Android/iOS code, or backend). Try to reproduce on the same device/OS combination. If still not reproducible, add more granular remote logging/breadcrumbs around the suspected area and ship a build to gather more data before attempting a fix.

**Production Example:** A crash reported only on a specific older Android OS version turned out to be a native module incompatible with that OS's API level — something invisible in local testing on a newer device/emulator, only surfaced by checking the OS version breakdown in Crashlytics.

**Common Mistakes:** Trying to fix "blind" based on a guess without first confirming the device/OS/build-type pattern in the crash reports; ignoring the specific user action sequence that led to the crash.

**Follow-up Questions:**
- How do source maps help you read a minified production stack trace?
- How would you validate the fix actually worked once released?

**Tips for Answering:** Emphasize using the *data available* (crash reports) to narrow the search space before attempting any code change — guessing first is the main red flag here.

---

## Q5 (DSA). Two Sum — given an array and a target, return the indices of two numbers that add up to the target.
**Difficulty:** Medium
**Concepts Tested:** Hash map pattern

**Ideal Answer:** Use a hash map to store each number's index as you iterate; for each number, check if its complement (`target - num`) has already been seen — this gets you from O(n²) brute force down to O(n).

**Code Example:**
```js
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}
// Time: O(n), Space: O(n)
```

**Common Mistakes:** Writing the O(n²) nested-loop brute force and stopping there without mentioning the hash map optimization.

**Follow-up Questions:**
- What if the array has duplicate values?
- What if there's no valid pair — how should the function behave?

**Tips for Answering:** State the brute force approach briefly, then optimize out loud — interviewers want to see the reasoning path, not just the final answer.

---

## Q6 (DSA). Find the length of the longest substring without repeating characters.
**Difficulty:** Medium
**Concepts Tested:** Sliding window pattern

**Ideal Answer:** Maintain a window `[left, right]` and a `Set`/`Map` of characters currently in the window. Expand `right`; whenever a repeat is found, shrink from `left` until the repeat is removed. Track the max window size seen.

**Code Example:**
```js
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1; // jump left past the previous occurrence
    }
    seen.set(ch, right);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}
// Time: O(n), Space: O(min(n, charset size))
```

**Common Mistakes:** Using a naive O(n²) or O(n³) approach (checking every substring) without recognizing the sliding window pattern applies.

**Follow-up Questions:**
- How would this change if you needed the actual substring, not just its length?
- What if the input could contain Unicode characters beyond basic ASCII?

**Tips for Answering:** Say the pattern name ("sliding window") out loud early — it signals pattern recognition, which is what DSA rounds are actually testing.

---

## Q7 (DSA). The API returns a deeply nested category tree (Men → Shoes → Sneakers). You need a flat array for a `FlatList`, with depth tracked for indentation.
**Difficulty:** Senior
**Concepts Tested:** Recursion, tree flattening, practical RN application

**Ideal Answer:** Recursively walk the tree, pushing each node into a result array along with its depth, then recursing into its children with `depth + 1`.

**Code Example:**
```js
function flattenTree(nodes, depth = 0) {
  let result = [];
  for (const node of nodes) {
    result.push({ ...node, depth });
    if (node.children?.length) {
      result = result.concat(flattenTree(node.children, depth + 1));
    }
  }
  return result;
}
// Time: O(n) where n = total nodes, Space: O(n) for the result + recursion stack
```

**Production Example:** A category browsing screen renders this flattened array in a `FlatList`, using `depth` to apply `paddingLeft: depth * 16` for visual indentation — giving virtualization performance benefits that a native recursive tree renderer wouldn't get.

**Common Mistakes:** Rendering the tree recursively as nested components directly inside a `FlatList` (defeats virtualization); forgetting to track/pass depth through the recursion.

**Follow-up Questions:**
- How would you handle an extremely deep tree without hitting recursion limits?
- How would you support collapsing/expanding branches in the UI?

**Tips for Answering:** Connect the DSA solution directly to the RN constraint (FlatList needs a flat array) — this is what makes it a "senior" question rather than a pure algorithm drill.

---
---

# SET 5 — Release, Deployment, CI/CD, Security & System Design

## Q1. Walk me through a typical CI/CD pipeline for a mobile app.
**Difficulty:** Beginner
**Concepts Tested:** CI/CD fundamentals

**Ideal Answer:** Code is pushed → CI runs lint, type-check, and unit tests → a build artifact is produced and deployed to a staging environment for QA/smoke testing → a manual or automated approval gate → deployment to production, with monitoring/alerts watching post-deploy metrics and crash rates.

**Common Mistakes:** Skipping the staging/QA step and describing CI as just "tests pass, ship to prod" with no gate in between.

**Follow-up Questions:**
- What's the difference between CI and CD?
- What would trigger an automatic rollback in your pipeline?

**Tips for Answering:** Name each stage in order — this is a foundational question checking basic process literacy.

---

## Q2. A bad release just went to production. Walk me through how you'd roll it back, and what strategies could have prevented broad impact in the first place.
**Difficulty:** Medium
**Concepts Tested:** Rollback strategy, feature flags, deployment risk mitigation

**Ideal Answer:** Immediate rollback: redeploy the last known-good build/version. To limit blast radius *before* it happens: ship risky code behind a feature flag (disable instantly without a redeploy), use canary releases (roll out to a small % first, watch error rates, then ramp up), or blue-green deployments (switch traffic only after health checks pass, keeping the old environment ready for instant rollback).

**Production Example:** A payment feature shipped behind a feature flag defaulting to "off" for 95% of users; when a bug surfaced in the 5% canary group, the team disabled the flag instantly with zero redeploy and zero impact to the majority of users.

**Common Mistakes:** Treating "rollback" as the *only* tool, with no mention of canary/feature-flag strategies that reduce the need for rollback in the first place.

**Follow-up Questions:**
- How do you decide the size of a canary rollout percentage?
- What metrics would trigger an automatic rollback vs requiring human judgment?

**Tips for Answering:** Cover both the reactive fix (rollback) and the proactive prevention (flags/canary) — a senior answer includes both halves.

---

## Q3. How do OTA updates (CodePush / EAS Update) work, and what are their hard limitations?
**Difficulty:** Medium
**Concepts Tested:** OTA update mechanics, native vs JS boundary

**Ideal Answer:** OTA updates push a new JS bundle (and JS-only assets) directly to installed apps, bypassing the App Store/Play Store review process — the app downloads it in the background and swaps it in on next launch. The hard limitation: **OTA can only update JS and JS-side assets.** Any change requiring native code (a new library needing native linking, a Podfile/Gradle change) requires a full binary submission through the app stores — OTA cannot deliver that.

**Production Example:** A team pushed an OTA update assuming it would fix a bug, but the fix depended on a newly-linked native module — the update silently had no effect for users until a full binary release went through App Store review, costing days of confusion.

**Common Mistakes:** Assuming OTA updates can ship literally any change instantly, including native dependency updates.

**Follow-up Questions:**
- What would you do if an OTA update itself introduces a white-screen bug?
- How do staged rollouts apply to OTA updates specifically?

**Tips for Answering:** State the limitation explicitly and early — many candidates only know the "instant update" half of the story, not the native-code boundary.

---

## Q4. Design a CI/CD pipeline for a Turborepo monorepo shipping iOS, Android, and Web from one codebase, using GitHub Actions and EAS, keeping build times under 10 minutes.
**Difficulty:** Senior
**Concepts Tested:** Monorepo CI/CD, caching, parallelization

**Ideal Answer:** Use Turborepo's built-in remote caching so unaffected packages skip rebuilding/retesting entirely on each PR — only changed packages and their dependents are processed. Parallelize platform builds (iOS/Android/Web) as separate jobs rather than sequential steps. Cache `node_modules` (via pnpm's content-addressable store) and CocoaPods separately, since they have very different invalidation triggers. Use EAS Build for iOS/Android artifacts and a separate web build step, with versioning handled centrally so all three platforms stay in sync.

**Production Example:** A monorepo CI pipeline that used to take 45 minutes dropped to under 10 by combining Turborepo remote caching (skipping untouched packages) with parallel EAS builds for iOS/Android instead of running them sequentially in one job.

**Common Mistakes:** Running the full test/build suite on every package regardless of what actually changed; running iOS and Android builds sequentially instead of in parallel jobs.

**Follow-up Questions:**
- How do you invalidate the cache correctly when a shared `core` package changes?
- How would you version three separate app binaries from one monorepo commit?

**Tips for Answering:** Name Turborepo's caching mechanism specifically — generic "we use caching" answers don't demonstrate real monorepo experience.

---

## Q5. Where should an auth token be stored on-device, and what is SSL pinning protecting against?
**Difficulty:** Senior
**Concepts Tested:** Mobile security fundamentals

**Ideal Answer:** Never in plain `AsyncStorage` (readable as plaintext, especially on rooted/jailbroken devices) — use platform secure storage: Android Keystore/EncryptedSharedPreferences, iOS Keychain/Secure Enclave (often via a library like `react-native-keychain`). SSL pinning hardcodes the server's expected certificate/public key in the app, protecting against man-in-the-middle attacks where an attacker installs a proxy certificate (e.g. via Charles Proxy) that the OS would otherwise trust by default.

**Common Mistakes:** Storing tokens in AsyncStorage "because it's simple"; assuming HTTPS alone is sufficient without SSL pinning for a security-sensitive app (banking, healthcare).

**Follow-up Questions:**
- What's the trade-off/downside of SSL pinning (e.g., what happens if the server rotates its certificate)?
- How would you handle biometric-gated access to a stored token?

**Tips for Answering:** Explicitly name *why* AsyncStorage is wrong (plaintext, extractable) rather than just naming the "correct" alternative.

---

## Q6. Design an offline-first architecture for a field app that needs to handle large video/image uploads over unreliable networks.
**Difficulty:** Senior
**Concepts Tested:** System design, offline sync, upload resilience

**Ideal Answer:** Local persistence layer (SQLite/WatermelonDB/MMKV) stores drafts and an upload queue immediately on capture — never keep unsaved data only in React state. Uploads happen via **native** background upload managers (Android WorkManager, iOS background `URLSession`), not JS-only logic, since JS can't survive app termination. Use chunked/resumable uploads so a 95%-complete upload can resume from its last byte instead of restarting after an interruption. Limit concurrency (e.g., 3–5 simultaneous uploads, not 100) to avoid overwhelming the device/network. Use idempotency keys (UUID/hash) to prevent duplicate uploads on retry. Sync queued items via `NetInfo` connectivity detection with exponential backoff and conflict resolution for anything that changed server-side in the meantime.

**Production Example:** A mining-site inspection app let workers capture photos/videos/forms for a full 8-hour offline shift; everything was queued in SQLite immediately, and a native background upload manager handled sync opportunistically whenever connectivity briefly appeared, resuming any interrupted large video upload from its last completed chunk rather than restarting.

**Common Mistakes:** Relying on JS timers/`setTimeout` for background sync (they stop when the app is suspended); uploading 100 files with `Promise.all` (overwhelms the device/network — needs a bounded queue instead); keeping captured photos only in React state before they're persisted (lost on any crash).

**Follow-up Questions:**
- How do you resolve a conflict if the server-side record changed while the device was offline?
- Why can't you rely on a purely JS background task for a large upload?
- How would you show upload progress without polling every second?

**Tips for Answering:** Structure the answer as a full architecture diagram in words (capture → local persistence → queue → native background upload → sync → conflict resolution) — this is a system-design question, so a scattered list of tips isn't enough; show the end-to-end flow.

---

## Q7. What's your overall testing strategy to ship a release with confidence, across unit, integration, and E2E layers?
**Difficulty:** Senior
**Concepts Tested:** Testing strategy at scale, release confidence, CI integration

**Ideal Answer:** Fast Jest unit tests for business logic/reducers/utility functions run on every commit. RNTL component tests cover user-visible behavior for key components. A small, curated set of Detox E2E tests covers only the highest-risk revenue/critical flows (login, checkout, payment) since E2E is slow and prone to flakiness — running these pre-merge or nightly rather than on every push. Crash reporting (Sentry/Crashlytics) and analytics act as the final safety net in production, catching anything that slipped through pre-release testing.

**Production Example:** A team measured that broad E2E coverage attempts made CI unreliable and slow (45+ minutes, frequent flaky failures); narrowing E2E to 3 critical flows and pushing everything else down to fast unit/component tests got CI under 10 minutes while *increasing* actual confidence, since the flaky broad E2E suite had been ignored by developers anyway.

**Common Mistakes:** Chasing 100% E2E coverage (slow, flaky, expensive to maintain, often ignored once flaky); having no tests at all on critical revenue flows and relying purely on manual QA.

**Follow-up Questions:**
- How do you keep a Detox suite from becoming flaky over time?
- How would you decide if a bug fix needs a regression test added, versus just merging the fix?
- What's your rollout gate — do tests block deployment, or just warn?

**Tips for Answering:** Frame testing explicitly as a cost/confidence trade-off across layers, not "test everything" or "we trust manual QA" — both extremes read as inexperience at this level.

---

## 🎯 Overall Scoring Guide
- **Beginner pass:** correct definition, may need light prompting, can give a simple example.
- **Medium pass:** correct + explains trade-offs/why unprompted + can write working code.
- **Senior pass:** correct + trade-offs + ties the answer to a real production scenario or system-design flow + anticipates follow-up questions before being asked.
