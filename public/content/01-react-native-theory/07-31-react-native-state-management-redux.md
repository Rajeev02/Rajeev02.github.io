> 🎯 **Topic:** 3.1 React Native: State Management & Redux
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---

## 3.1 React Native: State Management & Redux

### 1. Redux Lifecycle
**Question:** Explain the lifecycle of Redux.

**Answer:**
1. **Action:** A simple JS object containing a `type` and `payload`. Dispatched by the UI.
2. **Middleware:** Intercepts the action before it reaches the reducer (e.g., Redux Thunk or Saga for async API calls).
3. **Reducer:** A pure function that takes the current state and the action, and returns a new updated state.
4. **Store:** The global object holding the state.
5. **View:** Components subscribe to the Store using `useSelector`. When the state changes, components re-render.

### 2. Redux Issues and Fixes
**Question:** What are the common issues with legacy Redux and how do you fix them?

**Answer:**
- **Issue:** Boilerplate code (creating actions, types, reducers in separate files).
  **Fix:** Use **Redux Toolkit (RTK)** which bundles everything into `createSlice`.
- **Issue:** Performance drops due to massive state re-renders.
  **Fix:** Ensure `useSelector` extracts only the specific nested data needed, not the whole state object. Use `reselect` for memoized selectors.
- **Issue:** State mutation bugs.
  **Fix:** RTK uses `Immer.js` under the hood, which allows writing "mutating" code that is safely translated into immutable updates.

### 3. Redux Toolkit (RTK) vs Context API
**Question:** When would you use Context API instead of Redux Toolkit?

**Answer:**
- **Context API** is built-in and great for passing down static or infrequently updated global data (Theme, Localization, User Auth). However, every time context updates, *all* consuming components re-render.
- **Redux Toolkit** is designed for complex, frequently updating state (like E-commerce carts, realtime chat feeds). It prevents unnecessary re-renders via optimized selectors.

### 4. Async Logic in Redux
**Question:** How do you handle asynchronous logic (API calls) in Redux Toolkit?

**Answer:**
Using `createAsyncThunk`. It automatically generates three lifecycle actions: `pending`, `fulfilled`, and `rejected`.

```javascript
export const fetchUser = createAsyncThunk('user/fetchById', async (userId) => {
  const response = await fetch(`https://api.example.com/user/${userId}`);
  return response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => { state.status = 'failed'; });
  },
});
```

### 5. Zustand as an Alternative
**Question:** What is Zustand and why is it gaining popularity over Redux?

**Answer:**
Zustand is a minimalistic, fast state management library.
- It requires zero boilerplate (no context providers, no reducers, no dispatch).
- Uses hooks directly.
- Resolves the "zombie child" and React Context re-render issues out of the box.

---
