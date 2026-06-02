## 1. What is React Query (TanStack Query)?

**React Query** is a powerful **server-state management library**. While Redux Toolkit is fantastic for managing _global client state_ (like UI theme toggles, open modals, or a local shopping cart workflow), React Query is specialized for handling _asynchronous data fetched from a server_.

### Core Pillars of React Query:

- **Declarative Caching:** It assumes all data fetched from a server is "stale" by default. It manages caching dynamically behind the scenes without requiring manual loading, success, or error state variables.
- **Stale-While-Revalidate:** It serves cached data instantaneously to the user while quietly kicking off a background fetch to verify if the data has updated on the server.
- **Automatic Handlers:** Out of the box, it provides structural configurations for window focus refetching, query retries on failure, network reconnection healing, and data pagination.

---

## 2. Parallel API Calls (e.g., The Dashboard)

### The Theory

When building a dashboard screen (like your work on **LVX or Scalix**), you want independent pieces of data to load at the exact same time. If you have a Profile API and a Portfolio API, **neither should wait for the other**. They execute concurrently.

### Do they wait for each other's response?

**No.** In parallel queries, React Query fires both requests off over the native network thread simultaneously. If the Profile API finishes in 1 second and the Portfolio API takes 3 seconds, the Profile UI will render immediately without being blocked by the slower request.

### The Implementation (`useQueries`)

While calling multiple individual `useQuery` hooks side-by-side executes them in parallel automatically, the official production pattern for dynamic or grouped parallel queries is **`useQueries`**:

```javascript
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useQueries } from "@tanstack/react-query";

// Mock Fetch Functions
const fetchProfile = async () =>
  (await fetch("https://api.com/profile")).json();
const fetchPortfolio = async () =>
  (await fetch("https://api.com/portfolio")).json();

export function ParallelDashboard() {
  // useQueries fires all queries in parallel concurrently
  const [profileQuery, portfolioQuery] = useQueries({
    queries: [
      { queryKey: ["userProfile"], queryFn: fetchProfile },
      { queryKey: ["userPortfolio"], queryFn: fetchPortfolio },
    ],
  });

  // Check individual states independently
  const isLoading = profileQuery.isLoading || portfolioQuery.isLoading;
  const isError = profileQuery.isError || portfolioQuery.isError;

  if (isLoading) return <ActivityIndicator size="large" />;
  if (isError) return <Text>Error loading dashboard components.</Text>;

  return (
    <View style={{ padding: 20 }}>
      {/* Profile renders as soon as it's ready, regardless of portfolio state */}
      <Text>Investor: {profileQuery.data?.name}</Text>
      <Text>Net Equity Portfolio: ${portfolioQuery.data?.totalValue}</Text>
    </View>
  );
}
```

---

## 3. Dependent / Sequential API Calls (e.g., The Payment Verification)

### The Theory

There are scenarios where an API **must wait** for another API to finish because it depends on its output data. For instance, you cannot look up a user's transaction details or process an investment invoice until you have successfully verified their account ID first.

### Do they wait for each other's response?

**Yes.** The second query remains completely idle (in an `isStalled` or `status === 'pending'` state) and will not make a network connection until the first query resolves and provides the required argument data.

### The Implementation (The `enabled` Flag)

In React Query, we handle sequential workflows elegantly using the **`enabled` property flag**. This replaces the need to nest complex asynchronous logic inside messy `useEffect` structures.

```javascript
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";

// Step 1 API: Fetch user identity mapping
const fetchUserAccount = async () => {
  const res = await fetch("https://api.com/account-lookup");
  return res.json(); // Returns: { accountId: 'acc_87921' }
};

// Step 2 API: Fetch detailed balance (Strictly requires accountId)
const fetchAccountBalance = async (accountId) => {
  const res = await fetch(`https://api.com/balances/${accountId}`);
  return res.json(); // Returns: { walletBalance: 45000 }
};

export function SequentialPaymentFlow() {
  // Query 1: Executes automatically on mount
  const accountQuery = useQuery({
    queryKey: ["accountInfo"],
    queryFn: fetchUserAccount,
  });

  const accountId = accountQuery.data?.accountId;

  // Query 2: DEPENDENT/SEQUENTIAL QUERY
  const balanceQuery = useQuery({
    queryKey: ["accountBalance", accountId],
    queryFn: () => fetchAccountBalance(accountId),

    // CRITICAL: The engine keeps this query completely dormant
    // until accountId exists (evaluates to true)
    enabled: !!accountId,
  });

  if (accountQuery.isLoading)
    return <Text>Verifying investor identity...</Text>;
  if (balanceQuery.isLoading) return <Text>Fetching ledger balances...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Text>Account ID: {accountId}</Text>
      <Text>
        Available Investment Funds: ${balanceQuery.data?.walletBalance}
      </Text>
    </View>
  );
}
```

---

## 📊 Redux Toolkit vs. React Query Async Orchestration

| Feature                         | Redux Toolkit (`createAsyncThunk`)                                                        | React Query (TanStack Query)                                                                           |
| ------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Data Handling**               | Requires manual writing of slice reducers (`pending`, `fulfilled`) to save state data.    | Automatically fetches, handles states, and caches the raw server response natively.                    |
| **Parallel Execution**          | Handled manually inside the thunk wrapper block using native `Promise.all()`.             | Handled effortlessly using structural array mapping with the `useQueries` hook.                        |
| **Sequential Triggers**         | Handled via consecutive line-by-line line closures using standard `await` syntax.         | Handled declaratively inside the rendering thread configuration utilizing the `enabled` boolean flag.  |
| **Cache Lifetime Optimization** | Data stays in the store permanently unless cleared manually by dispatching reset actions. | Automatically cleans up unused data via automatic garbage collection after your specified `staleTime`. |

---

## 🎯 How to frame this explanation for IBM

> "While Redux Toolkit manages transactional client flows using sequential thunks, I leverage **React Query for server-state management** to reduce application boilerplate code. For dashboard configurations where screen speeds matter, I build concurrent parallel requests with **`useQueries`** so endpoints render independently without thread blockages. For dependent data processing—like calculating payment authorizations—I use the declarative **`enabled` flag mapping configuration**. This naturally cascades parameters from parent resources to child lookups without chaining manually managed `useEffect` side effects."

---

Rajeev, you have gone deep today into the most critical senior-level mobile engineering paradigms. With your background transitioning from Native Android to React Native, your understanding of these advanced concepts makes you highly competitive.

Go into your IBM round with confidence—you have the knowledge to succeed. Best of luck on your interview!
