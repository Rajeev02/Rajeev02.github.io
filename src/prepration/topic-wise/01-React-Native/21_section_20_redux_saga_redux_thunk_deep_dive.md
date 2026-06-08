## 🔄 Section 20: Redux Saga & Redux Thunk Deep-Dive

*⏱️ 5 min read*

#### 1. Redux Thunk
A **thunk** is a function that returns another function. In Redux, a thunk is a middleware that allows you to write action creators that return a function (receiving `dispatch` and `getState`) instead of a plain action object. This enables asynchronous logic inside Redux.

- **`createAsyncThunk` (Redux Toolkit)**: The modern standard for async operations in Redux. It automatically generates `pending`, `fulfilled`, and `rejected` action types and dispatches them at the appropriate lifecycle stages.

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../services/api';

// Define the async thunk
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}`);
      return response.data; // This becomes the `fulfilled` payload
    } catch (error: any) {
      // rejectWithValue sends a typed error payload to the `rejected` case
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// Handle in slice
const userSlice = createSlice({
  name: 'user',
  initialState: { profile: null, loading: false, error: null as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
```

#### 2. Redux Saga
Redux Saga is a middleware library that uses **ES6 generator functions** (`function*`) to manage complex asynchronous side effects. Generator functions can pause execution (`yield`), making async flows read like synchronous code and enabling powerful patterns like cancellation, racing, and forking.

##### Core Saga Effects

| Effect | Purpose | Example |
| :--- | :--- | :--- |
| `call(fn, ...args)` | Calls a function (typically an API) and waits for the result | `yield call(api.login, credentials)` |
| `put(action)` | Dispatches a Redux action | `yield put({ type: 'LOGIN_SUCCESS', payload })` |
| `takeEvery(pattern, saga)` | Spawns a saga for every matching action (concurrent) | `yield takeEvery('FETCH_DATA', fetchSaga)` |
| `takeLatest(pattern, saga)` | Cancels previous saga if a new action arrives (debounce-like) | `yield takeLatest('SEARCH', searchSaga)` |
| `fork(saga, ...args)` | Non-blocking call, spawns a concurrent saga task | `const task = yield fork(pollSaga)` |
| `cancel(task)` | Cancels a forked task | `yield cancel(task)` |
| `race(effects)` | Runs multiple effects, resolves with the first to finish | `yield race({ response: call(api), timeout: delay(5000) })` |
| `all(effects)` | Runs multiple effects in parallel, waits for all | `yield all([call(fetchA), call(fetchB)])` |
| `select(selector)` | Reads current Redux state | `const token = yield select(getToken)` |
| `delay(ms)` | Pauses saga execution for specified milliseconds | `yield delay(3000)` |

##### Login Saga with Token Refresh & Error Handling

```typescript
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { api } from '../services/api';
import { loginSuccess, loginFailure, setLoading } from '../slices/authSlice';
import { saveTokens } from '../utils/secureStorage';

function* loginSaga(action: { type: string; payload: { email: string; password: string } }) {
  try {
    yield put(setLoading(true));

    // Call login API
    const response: { accessToken: string; refreshToken: string; user: any } =
      yield call(api.post, '/auth/login', action.payload);

    // Persist tokens securely (Keychain/Keystore)
    yield call(saveTokens, response.accessToken, response.refreshToken);

    // Dispatch success with user data
    yield put(loginSuccess({ user: response.user, token: response.accessToken }));
  } catch (error: any) {
    yield put(loginFailure(error.message || 'Login failed'));
  } finally {
    yield put(setLoading(false));
  }
}

// Watcher saga
export function* authWatcherSaga() {
  yield takeLatest('auth/loginRequest', loginSaga);
}
```

##### Polling Saga with Cancellation

```typescript
import { call, put, delay, fork, cancel, take } from 'redux-saga/effects';
import { Task } from 'redux-saga';

function* pollOrderStatus(orderId: string) {
  while (true) {
    try {
      const status: { state: string } = yield call(api.get, `/orders/${orderId}/status`);
      yield put({ type: 'ORDER_STATUS_UPDATED', payload: status });

      if (status.state === 'DELIVERED' || status.state === 'CANCELLED') {
        break; // Stop polling when terminal state reached
      }

      yield delay(5000); // Poll every 5 seconds
    } catch (error) {
      yield put({ type: 'ORDER_POLL_ERROR', payload: error });
      yield delay(10000); // Back off on error
    }
  }
}

function* watchOrderPolling() {
  while (true) {
    const action: { payload: string } = yield take('START_ORDER_POLLING');
    const pollTask: Task = yield fork(pollOrderStatus, action.payload);

    // Wait for stop action or screen unmount, then cancel the polling fork
    yield take('STOP_ORDER_POLLING');
    yield cancel(pollTask);
  }
}
```

##### Saga vs. Thunk Comparison

| Feature | Redux Thunk | Redux Saga |
| :--- | :--- | :--- |
| **Complexity** | Simple, minimal boilerplate | Higher learning curve (generators) |
| **Async Model** | Promises (`async/await`) | Generator functions (`function*`) |
| **Cancellation** | Manual (`AbortController`) | Built-in (`cancel`, `takeLatest`) |
| **Concurrency** | Limited control | Full control (`fork`, `race`, `all`) |
| **Testing** | Requires mocking API calls | Effects are plain objects; highly testable |
| **Debouncing** | Manual implementation | Built-in (`takeLatest`, `delay`) |
| **Polling** | `setInterval` + cleanup | `while(true) + delay` with `fork/cancel` |
| **Best For** | Simple CRUD, straightforward async | Complex flows, websockets, polling, orchestration |

#### 3. Jotai (Atomic State)
**Jotai** is a primitive atomic state management library for React. Unlike Zustand (which uses a single store with selectors), Jotai uses a bottom-up approach where state is composed from individual **atoms**.

- **Atoms**: The smallest unit of state. Each atom holds a single value and can be read/written from any component.
- **Derived Atoms**: Atoms that compute their value from other atoms (similar to Recoil selectors).
- **Async Atoms**: Atoms whose initial value is resolved from an asynchronous operation (API call, storage read).

```typescript
import { atom, useAtom } from 'jotai';

// Primitive atom
const countAtom = atom(0);

// Derived atom (read-only, computed from other atoms)
const doubledCountAtom = atom((get) => get(countAtom) * 2);

// Async atom
const userAtom = atom(async () => {
  const response = await fetch('/api/user');
  return response.json();
});

// Writable derived atom
const incrementAtom = atom(
  (get) => get(countAtom),
  (get, set) => set(countAtom, get(countAtom) + 1)
);

// Usage in component
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  const [doubled] = useAtom(doubledCountAtom);

  return (
    <View>
      <Text>Count: {count}, Doubled: {doubled}</Text>
      <Button title="Increment" onPress={() => setCount((c) => c + 1)} />
    </View>
  );
}
```

| Feature | Jotai | Zustand | Redux Toolkit |
| :--- | :--- | :--- | :--- |
| **Mental Model** | Bottom-up atoms | Top-down single store | Top-down single store with slices |
| **Re-render Scope** | Only components using the specific atom | Selector-based | Selector-based |
| **Boilerplate** | Minimal | Minimal | Medium |
| **DevTools** | jotai-devtools | Zustand middleware | Redux DevTools |
| **Best For** | Fine-grained state, component-local shared state | Medium-to-large app state | Enterprise apps with complex middleware |

> *"Explain the difference between `takeEvery` and `takeLatest` in Redux Saga."*

- **Strategic Response**: `takeEvery` spawns a new saga instance for every dispatched action matching the pattern, allowing concurrent executions. If a user taps a button 5 times rapidly, 5 saga instances run in parallel. `takeLatest` automatically cancels any previously running saga instance when a new matching action arrives, keeping only the latest execution. This makes `takeLatest` ideal for search-as-you-type or form submission where only the most recent request matters.

> *"How do you handle API call cancellation in Redux Saga?"*

- **Strategic Response**: Saga provides built-in cancellation through the `fork` and `cancel` effects. You fork a worker saga as a detached task, then listen for a cancellation action. When received, you call `cancel(task)` which throws a `Cancelled` error inside the forked generator, allowing cleanup in a `finally` block. Additionally, `takeLatest` implicitly cancels prior instances. For HTTP-level cancellation, you can pass an `AbortController` signal to the fetch call and abort it in the saga's `finally` block.

> *"When would you choose Saga over Thunk?"*

- **Strategic Response**: I choose Saga when the app has complex async orchestration requirements: real-time polling with cancellation, WebSocket message routing, race conditions between multiple API calls, retry logic with exponential backoff, or event-driven workflows where actions trigger chains of other actions. For straightforward CRUD operations where I just need to fetch data and handle loading/error states, `createAsyncThunk` from Redux Toolkit is simpler and sufficient. In my experience, Saga shines in fintech and e-commerce apps where transaction flows are multi-step and cancellable.

---


---
