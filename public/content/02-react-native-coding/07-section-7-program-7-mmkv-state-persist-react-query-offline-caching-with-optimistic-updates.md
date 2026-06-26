> 🎯 **Topic:** Section 7: Program 7: MMKV State Persist & React Query Offline Caching with Optimistic Updates
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 7: Program 7: MMKV State Persist & React Query Offline Caching with Optimistic Updates
*⏱️ 3 min read*

### Question
Implement a complete React Native state and query cache synchronization setup:
1. Configure a **Zustand store** persisted in local memory using **MMKV**.
2. Configure **TanStack React Query** with a Sync Storage Persister wrapper around **MMKV** to support offline client starts.
3. Write clean CRUD query hook definitions (GET, POST, PUT, DELETE) using the `posts` endpoint structure from `https://dummy-json.mock.beeceptor.com/posts`.
4. Implement **Optimistic Updates** on the POST/PUT mutations to immediately reflect updates in the UI during offline states, and rollback mutations if the API request rejects.

### Sample Input & Output
#### Input:
- Client goes offline. User modifies a post's title.
#### Output:
- The UI reflects the new title instantly (Optimistic update).
- If the network request fails, the local query cache rolls back to the previous title, and a console warning triggers.
- The entire cache state remains stored inside MMKV, allowing instant loading on subsequent app launches.

### Code

#### 1. MMKV Zustand Persistence Engine Setup
```typescript
import { create } from 'zustand';
import { persist, StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

// Custom StateStorage adapter to bind MMKV storage with Zustand persist hooks
const mmkvZustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.delete(name);
  },
};

interface UserSessionState {
  userId: string | null;
  username: string | null;
  setSession: (userId: string, username: string) => void;
  clearSession: () => void;
}

export const useUserSessionStore = create<UserSessionState>()(
  persist(
    (set) => ({
      userId: null,
      username: null,
      setSession: (userId, username) => set({ userId, username }),
      clearSession: () => set({ userId: null, username: null }),
    }),
    {
      name: 'user-session-storage', // Key name in MMKV
      storage: mmkvZustandStorage,
    }
  )
);
```

#### 2. TanStack Query Cache Persister Setup (MMKV-Backed)
```typescript
import { QueryClient } from '@tanstack/react-query';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // Keep garbage collection cache active for 24 hours
      staleTime: 1000 * 60 * 5,     // Treat data as fresh for 5 minutes
      networkMode: 'offlineFirst', // Allow cached data resolution before network checks
    },
    mutations: {
      networkMode: 'offlineFirst',
    }
  },
});

// Configure synchronous persister using MMKV
const queryCacheStorage = new MMKV({ id: 'react-query-cache' });

const mmkvQueryPersister = createSyncStoragePersister({
  storage: {
    setItem: (key, value) => queryCacheStorage.set(key, value),
    getItem: (key) => {
      const value = queryCacheStorage.getString(key);
      return value ?? null;
    },
    removeItem: (key) => queryCacheStorage.delete(key),
  },
});

// Initialize persister binding
persistQueryClient({
  queryClient,
  persister: mmkvQueryPersister,
  maxAge: 1000 * 60 * 60 * 24, // 24 Hours validity
});
```

#### 3. CRUD Hooks & Optimistic Updates
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE = 'https://dummy-json.mock.beeceptor.com';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

// 1. GET Query (Read)
export function useFetchPosts() {
  return useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/posts`);
      return res.data;
    },
  });
}

// 2. POST Mutation (Create) with Optimistic Updates
export function useCreatePost() {
  return useMutation<Post, Error, Omit<Post, 'id'>>({
    mutationFn: async (newPost) => {
      const res = await axios.post(`${API_BASE}/posts`, newPost);
      return res.data;
    },
    // Triggers instantly before the api promise resolves
    onMutate: async (newPost) => {
      // Cancel outgoing refetches to prevent cache overrides
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous query cache state
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically append the new item with a temp ID
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(['posts'], [
          ...previousPosts,
          { ...newPost, id: Date.now() }, // Temp client-side ID
        ]);
      }

      // Return context containing previous state for rollback
      return { previousPosts };
    },
    // If the network call fails, restore the snapshot
    onError: (err, newPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      console.warn("Create Post mutation failed, cache rolled back:", err.message);
    },
    // Always invalidates and refetches on completion or error to sync database
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 3. PUT Mutation (Update) with Optimistic Updates
export function useUpdatePost() {
  return useMutation<Post, Error, Post>({
    mutationFn: async (updatedPost) => {
      const res = await axios.put(`${API_BASE}/posts/${updatedPost.id}`, updatedPost);
      return res.data;
    },
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically update the target post inside the array
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ['posts'],
          previousPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
        );
      }

      return { previousPosts };
    },
    onError: (err, updatedPost, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

// 4. DELETE Mutation (Delete) with Optimistic Updates
export function useDeletePost() {
  return useMutation<void, Error, number>({
    mutationFn: async (postId) => {
      await axios.delete(`${API_BASE}/posts/${postId}`);
    },
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically remove the item from the list
      if (previousPosts) {
        queryClient.setQueryData<Post[]>(
          ['posts'],
          previousPosts.filter((post) => post.id !== postId)
        );
      }

      return { previousPosts };
    },
    onError: (err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ local read/write caches.
- **Space Complexity**: $O(N)$ state memory to cache the transactions.
- **Explanation**: Binds Zustand state storage and TanStack React Query with synchronous MMKV storage. Configures query client offline caching persisters. Implements optimistic query updates (POST, PUT, DELETE) that immediately update client-side caches, with `onError` rollbacks restoring previous values if remote API calls reject.

---

---
