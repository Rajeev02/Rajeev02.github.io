# Volume 12 – Set 25 – GraphQL & Apollo Client

## 1. Why use GraphQL instead of REST in a mobile application?

**Concept:**
Mobile apps operate in unpredictable network environments with limited bandwidth and battery life.

**Answer:**
GraphQL solves two massive problems that REST has on mobile: Over-fetching and Under-fetching.

1. **Over-fetching:** A REST API endpoint like `/users/123` might return 50 fields of data (Address, Billing info, etc.). If the mobile app only needs the user's `avatar_url` and `first_name` to display in the header, downloading the other 48 fields wastes bandwidth, parsing time, and battery life. With GraphQL, the client specifies exactly which fields it wants, and the server returns exactly that.
2. **Under-fetching:** To load a Profile Screen, a REST app might need to call `/users/123` (to get the user), then `/users/123/posts` (to get their posts), and then `/posts/456/comments` (to get comments). This requires multiple sequential network round-trips (waterfalls). With GraphQL, you can query all nested relations in a single HTTP request, drastically reducing latency on high-ping mobile networks.

**Key Takeaway:**
GraphQL provides a surgical, highly optimized data fetching layer that drastically improves performance on constrained mobile networks compared to rigid REST architectures.

---

## 2. Explain how Apollo Client handles caching in React Native.

**Concept:**
Caching is the hardest part of building offline-capable mobile apps.

**Answer:**
Apollo Client has a highly intelligent, normalized, in-memory cache (`InMemoryCache`).

When you execute a query:
```graphql
query GetUser {
  user(id: "1") {
    id
    name
  }
}
```
Apollo does not just cache the JSON response string. It \"normalizes\" the data. It splits the response into flat, individual objects based on their `__typename` and `id`. 

For example, it stores: `User:1 -> { name: "Rajeev" }`.

**Why this matters:**
If you run a completely different query later, or execute a Mutation to update the user's name:
```graphql
mutation UpdateUser {
  updateUser(id: "1", name: "Rajeev Joshi") {
    id
    name
  }
}
```
Because Apollo normalizes by ID, it automatically identifies that `User:1` has changed. It instantly updates the central cache. Any React component anywhere in your app that used `useQuery` to fetch `User:1` will instantly re-render with the new name, without writing a single line of Redux or Context code.

**Key Takeaway:**
Apollo Client's normalized cache acts as a self-updating global state manager, almost eliminating the need for Redux when dealing with server-state data.

---

## 3. How do you implement Offline Persistence with Apollo Client?

**Concept:**
Apollo's `InMemoryCache` lives in RAM. If the user kills the app, the cache is wiped.

**Answer:**
To make the app load instantly without a network connection, we must persist the Apollo cache to the disk using `apollo3-cache-persist`.

1. **Setup:** You connect `apollo3-cache-persist` to a synchronous storage engine like MMKV or AsyncStorage.
2. **Initialization:** When the app launches, you `await persistCache(...)`. This reads the serialized cache from MMKV and injects it into the Apollo `InMemoryCache` before React renders the UI.
3. **Usage:** When you use `useQuery`, you configure the `fetchPolicy`. 
   - `cache-and-network`: Instantly returns the stale data from the local MMKV cache to paint the UI immediately, while simultaneously firing a background network request to fetch the latest data. Once the network returns, it updates the cache and re-renders the UI seamlessly.

**Key Takeaway:**
Combining Apollo Cache Persistence with a `cache-and-network` fetch policy is the industry standard for creating \"Instant Load\" mobile experiences.

---

## 4. What are Optimistic UI Updates in GraphQL?

**Concept:**
When a user clicks \"Like\" on a post, waiting 500ms for the server to respond before turning the heart icon red feels sluggish and broken.

**Answer:**
An Optimistic Update is a technique where the client predicts the server's successful response and updates the UI instantly, without waiting for the network.

**In Apollo Client:**
When you trigger a `useMutation`, you provide an `optimisticResponse` object that perfectly mimics what the server *will* return.
Apollo instantly forces the normalized cache to update with this fake response, turning the heart red immediately.

If the actual HTTP request succeeds a second later, Apollo quietly replaces the optimistic fake data with the real server data.
If the HTTP request fails (e.g., network drop), Apollo automatically rolls back the cache to its previous state, turning the heart back to grey.

**Key Takeaway:**
Optimistic UI makes an app feel incredibly fast and responsive, hiding network latency from the user entirely.

---

## 5. How do you handle Pagination (Infinite Scrolling) with Apollo Client?

**Concept:**
You can't load 10,000 items in a FlatList at once. You must load 20, then fetch the next 20 when the user scrolls to the bottom.

**Answer:**
Apollo handles pagination using the `fetchMore` function returned by `useQuery`.

1. **Triggering the Fetch:** Attach `onEndReached` to your `FlatList`. When triggered, call `fetchMore`, passing the cursor of the last item currently loaded.
2. **Merging the Cache:** By default, Apollo doesn't know how to merge two arrays together. You must define a `keyArgs` and a `merge` function inside your `InMemoryCache` configuration.

```javascript
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        feed: {
          keyArgs: false, // Don't cache differently based on pagination arguments
          merge(existing = [], incoming) {
            // Append the new page of items to the existing array
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
});
```
When `fetchMore` resolves, Apollo runs this `merge` function, updates the central array in the cache, and the `FlatList` smoothly renders the new items.

**Key Takeaway:**
Pagination in GraphQL requires explicit cache configuration because Apollo needs to know how to merge incoming chunks of data with the existing cached arrays.
