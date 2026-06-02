# React Native Async Handling & Navigation Lifecycle — Senior Interview Notes

_Source file reference:_ fileciteturn0file0

---

# 1. Async Functions Inside `useEffect`

In React Native, asynchronous operations are commonly used for:

- API calls
- Secure storage access
- Native hardware interactions
- Database operations

## ❌ Incorrect Pattern

```javascript
useEffect(async () => {
  const data = await fetchFintechData();
}, []);
```

### Why This Is Wrong

`useEffect` expects:

- `undefined`
- or a cleanup function

But an `async` function always returns a `Promise`.

---

## ✅ Correct Production Pattern

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function AccountBalance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'https://api.ledger.local/v1/balance'
        );

        const data = await response.json();
        setBalance(data.amount);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return <Text>Wallet Balance: ${balance}</Text>;
}
```

---

# 2. Preventing Memory Leaks During Async Operations

If a user leaves the screen before an API call completes, updating state on an unmounted component may cause:

- Memory leaks
- Warning logs
- Unexpected UI behavior

---

## Cleanup Pattern Using `isMounted`

```javascript
useEffect(() => {
  let isMounted = true;

  const loadData = async () => {
    try {
      const result = await secureApiCall();

      if (isMounted) {
        setData(result);
      }
    } catch (err) {
      if (isMounted) {
        setError(err.message);
      }
    }
  };

  loadData();

  return () => {
    isMounted = false;
  };
}, []);
```

---

# 3. Parallel Execution with `Promise.all`

## ❌ Sequential Waterfall (Slow)

```javascript
const user = await fetchUserData();
const portfolio = await fetchPortfolio(user.id);
```

Total wait time becomes cumulative.

---

## ✅ Parallel Execution (Optimized)

```javascript
const fetchDashboardData = async () => {
  try {
    setLoading(true);

    const [userResponse, marketResponse] = await Promise.all([
      fetch('https://api.com/user-profile'),
      fetch('https://api.com/market-rates'),
    ]);

    const user = await userResponse.json();
    const market = await marketResponse.json();

    setProfile(user);
    setRates(market);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
};
```

---

## Senior Optimization Pattern

```javascript
const fetchAndParse = async (url) => {
  const res = await fetch(url);
  return res.json();
};

const [user, market] = await Promise.all([
  fetchAndParse('https://api.com/user-profile'),
  fetchAndParse('https://api.com/market-rates'),
]);
```

---

# 4. Sequential vs Parallel API Architecture

## Sequential / Blocking Flow

Used when operations depend on each other.

Example:

```text
Add Item
→ Check Cart
→ Payment
→ Order Status
→ Invoice
→ History Record
```

Each step requires the previous step to complete successfully.

---

## Parallel / Concurrent Flow

Used when requests are independent.

Example:

- User profile
- Dashboard metrics
- Market rates
- Notifications

All APIs can execute simultaneously using `Promise.all`.

---

# 5. AbortController — Production Cleanup Strategy

`isMounted` only prevents state updates.

`AbortController` physically terminates the network request.

---

## Production Example

```javascript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

export default function TransactionHistory() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const loadFintechRecords = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'https://api.letsventure.local/transactions',
          { signal }
        );

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted safely.');
        } else {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    loadFintechRecords();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Error loading transactions: {error}</Text>;
  }

  return (
    <View>
      <Text>Transaction records loaded successfully.</Text>
    </View>
  );
}
```

---

# 6. React Navigation Lifecycle Trap

## Common Misconception

Developers often assume:

```text
Screen A → Screen B → Back to Screen A
```

causes Screen A to remount.

That is incorrect.

In React Navigation stack navigators:

- Screen A usually remains mounted
- Only focus changes
- `useEffect(..., [])` does NOT run again

---

# 7. `useFocusEffect` — Production Navigation Pattern

```javascript
import React, {
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import {
  useFocusEffect,
} from '@react-navigation/native';

export default function ScreenA() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const controller = new AbortController();
      const { signal } = controller;

      const loadData = async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(
            'https://api.com/dashboard',
            { signal }
          );

          const json = await response.json();
          setData(json);
        } catch (err) {
          if (err.name === 'AbortError') {
            console.log('API call aborted.');
          } else {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      };

      loadData();

      return () => {
        controller.abort();
      };
    }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View>
      <Text>Fresh data loaded successfully.</Text>
    </View>
  );
}
```

---

# 8. Preventing Unnecessary Refetches

## Problem

`useFocusEffect` refetches data every time the screen regains focus.

This may create:

- Loading flickers
- Extra API calls
- Poor UX

---

## Local Cache Guard Solution

```javascript
useFocusEffect(
  useCallback(() => {
    if (data) return;

    const controller = new AbortController();
    const { signal } = controller;

    const loadData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          'https://api.com/dashboard',
          { signal }
        );

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    loadData();

    return () => controller.abort();
  }, [data])
);
```

---

# 9. Enterprise Approach — React Query

React Query simplifies:

- API caching
- Background synchronization
- Abort signal handling
- Stale data management
- Refetch strategies

---

## React Query Example

```javascript
import { useQuery } from '@tanstack/react-query';

function ScreenA() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardData'],

    queryFn: async ({ signal }) => {
      const res = await fetch(
        'https://api.com/dashboard',
        { signal }
      );

      return res.json();
    },

    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  return <Text>Clean cached dashboard.</Text>;
}
```

---

# 10. Understanding `staleTime`

## Important Clarification

```javascript
staleTime: 1000 * 60 * 5
```

does NOT automatically refetch every 5 minutes.

Instead:

- Data remains marked as "fresh" for 5 minutes
- No refetch occurs during that period
- Refetch only happens after a trigger event

---

## Common Trigger Events

React Query refetches when:

1. User revisits the screen
2. App returns to foreground
3. Internet reconnects
4. Manual invalidation occurs

---

# 11. Automatic Polling with `refetchInterval`

If true periodic polling is required:

```javascript
const { data } = useQuery({
  queryKey: ['marketRates'],
  queryFn: fetchRates,

  staleTime: 1000 * 60 * 5,

  refetchInterval: 1000 * 60 * 5,
});
```

---

# 12. Senior-Level Interview Summary

## Key Interview Talking Points

### Async Handling

- Never make the root `useEffect` callback async
- Wrap async logic inside nested functions
- Use `try/catch/finally`

### Cleanup Strategy

- Use `AbortController` for production-grade cancellation
- Differentiate `AbortError` from real failures

### Parallel Execution

- Use `Promise.all` for independent API calls
- Avoid async waterfalls

### Navigation Lifecycle

- React Navigation screens remain mounted
- Use `useFocusEffect` for focus-based refreshes

### Enterprise Data Management

- Prefer React Query for caching and background synchronization
- Use `staleTime` carefully
- Use `refetchInterval` only when real polling is required

---

# 13. IBM Interview One-Line Summary

> “In enterprise React Native applications, I focus heavily on efficient async orchestration, lifecycle-safe cleanup handling, optimized concurrent data fetching, and intelligent caching strategies using React Query to deliver scalable and high-performance mobile experiences.”

