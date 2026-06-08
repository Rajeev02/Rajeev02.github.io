
## Page Summary
### Reading Time
`3 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🗃️ Section 5: State Orchestration: Redux Toolkit vs. React Query |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 🗃️ Section 5: State Orchestration: Redux Toolkit vs. React Query

*⏱️ 2 min read*

Large-scale React applications split state management into two clear domains: **Client UI State** and **Remote Server State**.

```text
[State Management]
  ├── Client UI State  ➡️ (Redux Toolkit)  ➡️ predictable, local UI themes, wizard state
  └── Server Data State ➡️ (React Query)   ➡️ cached backend responses, background synchronization
```

#### 1. Redux Toolkit (RTK) - Client UI State
- **Best For**: Localized application configuration, UI themes, active session authentication flags, user preferences, and multi-step inputs (e.g., a signup wizard).
- **Core Principle**: Unidirectional data flow governed by synchronous actions and reducers. Changes are predictable, trackable via devtools, and run entirely within client memory.
- **Asynchronous Data**: Uses Thunks or Sagas. Orchestrating sequential API calls requires manual loading flags, error tracking, and caching logics.
- **Example**:
  ```javascript
  import { createSlice, configureStore } from '@reduxjs/toolkit';

  // 1. Create slice
  const uiSlice = createSlice({
    name: 'ui',
    initialState: { darkMode: false },
    reducers: {
      toggleTheme: (state) => {
        state.darkMode = !state.darkMode; // Immer library handles safe state copying under the hood
      }
    }
  });

  export const { toggleTheme } = uiSlice.actions;

  // 2. Configure store
  const store = configureStore({
    reducer: { ui: uiSlice.reducer }
  });
  ```

#### 2. React Query (TanStack Query) - Server State
- **Best For**: Data that lives on a remote database (e.g., bank accounts, trade history, transactions).
- **Core Principle**: Declarative cache container. React Query acts as an asynchronous state machine that handles fetching, caching, automatic background re-validation, request deduplication, loading states, and error retries out-of-the-box.
- **Key Strategies**:
  - **Dependent Queries**: Block queries using the `enabled` configuration flag (e.g., `enabled: !!userId`) until parent credentials resolve.
  - **Exponential Backoff**: Configure automatic retries with increasing delay times to gracefully handle temporary network dropouts.
  - **Cache Invalidation**: Query keys (e.g., `['portfolio', userId]`) map variables to cache buckets. Calling `queryClient.invalidateQueries({ queryKey })` triggers background refetches to sync stale components.
- **Example**:
  ```javascript
  import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

  function UserDashboard({ userId }) {
    const queryClient = useQueryClient();

    // 1. Querying data (Server State)
    const { data: user, isLoading, error } = useQuery({
      queryKey: ['user', userId],
      queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json())
    });

    // 2. Dependent Query: Only runs after 'user' is fetched and username is available
    const { data: orders } = useQuery({
      queryKey: ['orders', user?.username],
      queryFn: () => fetch(`/api/orders?user=${user.username}`).then(res => res.json()),
      enabled: !!user?.username // Blocks execution until condition evaluates to true
    });

    // 3. Mutating data + Cache Invalidation
    const mutation = useMutation({
      mutationFn: (newProfile) => fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(newProfile)
      }),
      onSuccess: () => {
        // Automatically triggers background fetch to update outdated components
        queryClient.invalidateQueries({ queryKey: ['user', userId] });
      }
    });

    if (isLoading) return <span>Loading...</span>;
    return <div>User: {user.name} (Orders: {orders?.length ?? 0})</div>;
  }
  ```

---


---
