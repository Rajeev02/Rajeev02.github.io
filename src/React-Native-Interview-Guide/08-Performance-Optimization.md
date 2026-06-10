# 08-Performance-Optimization.md

# React Native Performance Optimization for Senior React Native Developers

---

# 1. Why Performance Optimization Matters?

## Definition

Performance Optimization is the process of improving application speed, responsiveness, memory usage, startup time, and rendering efficiency.

---

## Common Performance Problems

* Slow App Startup
* UI Lag
* Frame Drops
* Excessive Re-renders
* High Memory Usage
* Large Bundle Size
* Slow API Calls

---

## Performance Metrics

### FPS (Frames Per Second)

```text
60 FPS = Smooth UI

< 60 FPS = Laggy UI
```

---

### Startup Time

Time required for application launch.

---

### Memory Usage

RAM consumed by application.

---

## Interview Answer

"Performance optimization focuses on reducing unnecessary rendering, improving startup time, lowering memory consumption, and ensuring smooth user interactions."

---

# 2. React Native Rendering Process

```text
State Change
      ↓
Component Re-render
      ↓
Virtual DOM
      ↓
Reconciliation
      ↓
Fabric/UI Update
```

---

## Problem

Unnecessary re-renders increase CPU usage.

---

## Interview Answer

"Most React Native performance issues originate from unnecessary component re-renders and inefficient rendering strategies."

---

# 3. React.memo()

## Definition

Prevents unnecessary re-renders when props haven't changed.

---

## Example

```jsx
const UserCard = ({name}) => {
  return <Text>{name}</Text>;
};

export default React.memo(UserCard);
```

---

## Without React.memo

```text
Parent Re-render
      ↓
Child Re-render
```

---

## With React.memo

```text
Parent Re-render
      ↓
Child Skipped
```

---

## Use Cases

* List Items
* Cards
* Static Components

---

## Interview Answer

"React.memo memoizes functional components and prevents unnecessary renders when props remain unchanged."

---

# 4. useMemo()

## Definition

Memoizes expensive calculations.

---

## Example

```jsx
const total = useMemo(
  () => calculateTotal(data),
  [data]
);
```

---

## Why Use It?

Avoid recalculating expensive values.

---

## Bad Example

```jsx
const total =
  calculateTotal(data);
```

Runs on every render.

---

## Interview Answer

"useMemo caches expensive calculations and recalculates them only when dependencies change."

---

# 5. useCallback()

## Definition

Memoizes functions.

---

## Example

```jsx
const onPress = useCallback(
  () => {
    navigate("Profile");
  },
  []
);
```

---

## Problem

Without useCallback:

```jsx
onPress={() => {}}
```

Creates a new function on every render.

---

## Interview Answer

"useCallback prevents unnecessary function recreation and helps avoid child re-renders."

---

# 6. React.memo vs useMemo vs useCallback

| Feature           | React.memo | useMemo | useCallback |
| ----------------- | ---------- | ------- | ----------- |
| Memoize Component | ✅          | ❌       | ❌           |
| Memoize Value     | ❌          | ✅       | ❌           |
| Memoize Function  | ❌          | ❌       | ✅           |

---

## Interview Answer

"React.memo memoizes components, useMemo memoizes values, and useCallback memoizes functions."

---

# 7. FlatList Optimization

## Why FlatList?

Avoid rendering all items at once.

---

## Example

```jsx
<FlatList
  data={users}
  renderItem={renderItem}
/>
```

---

## Key Optimizations

### keyExtractor

```jsx
keyExtractor={(item) =>
 item.id
}
```

---

### Memoized renderItem

```jsx
const renderItem =
 useCallback(
  ({item}) => (
   <UserCard />
  ),
 []
);
```

---

### Remove Inline Functions

Bad:

```jsx
renderItem={({item}) =>
 <UserCard />
}
```

---

## Interview Answer

"FlatList improves performance through virtualization and should be optimized using keyExtractor, memoized renderItem, and stable props."

---

# 8. FlashList

## Definition

FlashList is Shopify's high-performance replacement for FlatList.

---

## Benefits

* Better FPS
* Lower Memory Usage
* Faster Rendering

---

## Example

```jsx
<FlashList
 data={users}
 renderItem={renderItem}
 estimatedItemSize={100}
/>
```

---

## Interview Answer

"FlashList is optimized for large datasets and generally provides better performance than FlatList."

---

# 9. Image Optimization

## Common Problems

* Large Images
* Slow Loading
* High Memory Usage

---

## Best Practices

### Resize Images

Avoid:

```text
4000x4000
```

---

### Use WebP

Smaller size.

---

### Caching

Use:

```text
react-native-fast-image
```

---

## Interview Answer

"Image optimization reduces memory consumption and improves rendering performance through compression, resizing, and caching."

---

# 10. Lazy Loading

## Definition

Load resources only when required.

---

## Example

```jsx
const SettingsScreen =
 React.lazy(() =>
  import("./Settings")
 );
```

---

## Benefits

* Faster Startup
* Smaller Initial Bundle

---

## Interview Answer

"Lazy loading reduces startup time by loading components only when needed."

---

# 11. Virtualization

## Definition

Render only visible items.

---

## Example

```text
10000 Items
     ↓
20 Visible
     ↓
Render Only 20
```

---

## Used By

* FlatList
* FlashList

---

## Interview Answer

"Virtualization improves performance by rendering only visible content."

---

# 12. Avoid Inline Objects

## Bad

```jsx
<View
 style={{
   margin:10
 }}
/>
```

---

## Good

```jsx
const styles =
 StyleSheet.create({
   container:{
    margin:10
   }
 });
```

---

## Why?

New object created every render.

---

## Interview Answer

"Inline objects create new references on every render and may trigger unnecessary re-renders."

---

# 13. Avoid Inline Functions

## Bad

```jsx
<Button
 onPress={() => {}}
/>
```

---

## Good

```jsx
const handlePress =
 useCallback(
  () => {},
 []
);
```

---

## Interview Answer

"Inline functions generate new references on every render and can negatively impact performance."

---

# 14. Memory Leaks

## Definition

Objects remain in memory longer than necessary.

---

## Common Causes

### Timers

```jsx
setInterval()
```

---

### Event Listeners

```jsx
addEventListener()
```

---

### WebSockets

```jsx
new WebSocket()
```

---

### Missing Cleanup

```jsx
useEffect(() => {

 return () => {

 };

}, []);
```

---

## Interview Answer

"Memory leaks occur when references remain active after they are no longer needed."

---

# 15. Hermes Performance

## Definition

Hermes is React Native's optimized JavaScript engine.

---

## Benefits

### Faster Startup

Bytecode execution.

---

### Lower Memory Usage

Optimized runtime.

---

### Smaller APK

Reduced bundle size.

---

## Interview Answer

"Hermes improves startup time and memory efficiency by precompiling JavaScript into bytecode."

---

# 16. Bundle Size Optimization

## Why?

Smaller bundle = Faster startup.

---

## Techniques

### Remove Unused Libraries

---

### Tree Shaking

---

### Dynamic Imports

```jsx
import("./Settings");
```

---

### Use Hermes

---

## Interview Answer

"Reducing bundle size improves startup performance and decreases memory consumption."

---

# 17. App Startup Optimization

## Common Techniques

### Enable Hermes

---

### Lazy Load Screens

---

### Reduce Initial API Calls

---

### Avoid Heavy Calculations

---

### Optimize Assets

---

## Interview Answer

"Startup optimization focuses on minimizing work performed during application launch."

---

# 18. Network Optimization

## Best Practices

### Cache Responses

RTK Query

React Query

---

### Pagination

Avoid:

```text
Load 10000 Records
```

Use:

```text
Page 1
Page 2
Page 3
```

---

### Request Debouncing

Search APIs.

---

## Interview Answer

"Network optimization reduces latency through caching, pagination, and request batching."

---

# 19. Profiling Tools

## React DevTools

Analyze component renders.

---

## Flipper

React Native debugging.

---

## Hermes Profiling

Performance analysis.

---

## Android Studio Profiler

Memory and CPU.

---

## Xcode Instruments

iOS performance profiling.

---

## Interview Answer

"Performance bottlenecks should be identified using profiling tools before optimization."

---

# 20. Performance Optimization Checklist

## Rendering

✅ React.memo

✅ useMemo

✅ useCallback

---

## Lists

✅ FlatList

✅ FlashList

✅ Virtualization

---

## Images

✅ WebP

✅ FastImage

✅ Resize Assets

---

## Memory

✅ Cleanup Timers

✅ Remove Listeners

✅ Close WebSockets

---

## Startup

✅ Hermes

✅ Lazy Loading

✅ Dynamic Imports

---

## Network

✅ Cache APIs

✅ Pagination

✅ Debounce Requests

---

# Common Senior Interview Questions

1. What causes unnecessary re-renders?
2. React.memo vs useMemo vs useCallback?
3. FlatList optimization techniques?
4. FlashList vs FlatList?
5. How do you optimize large lists?
6. What causes memory leaks?
7. How do you optimize startup time?
8. How does Hermes improve performance?
9. How do you reduce bundle size?
10. How do you profile React Native apps?
11. Why use keyExtractor?
12. Why avoid inline functions?
13. Why avoid inline styles?
14. What is virtualization?
15. How do you optimize images?
16. How do you cache API responses?
17. How do you debug memory issues?
18. What tools do you use for profiling?
19. How do you optimize navigation performance?
20. What are the biggest performance mistakes in React Native?

---

# Ultimate Senior Interview Answer

"When optimizing React Native applications, I first identify bottlenecks using profiling tools such as Flipper, Hermes Profiling, Android Studio Profiler, and Xcode Instruments. I focus on reducing unnecessary re-renders using React.memo, useMemo, and useCallback, optimize large lists with FlatList or FlashList, reduce startup time through Hermes and lazy loading, optimize images and bundle size, and ensure proper cleanup of timers, listeners, and WebSockets to avoid memory leaks."

---

# Daily Revision Plan

```text
Rendering Optimization      5 min
Memoization                 5 min
FlatList / FlashList        5 min
Image Optimization          3 min
Memory Leaks                5 min
Hermes                      3 min
Startup Optimization        3 min
Profiling Tools             5 min

Total: ~34 Minutes
```


---


## why-did-you-render

Detects unnecessary re-renders.

---

## InteractionManager

Delays heavy work.

```javascript
InteractionManager
.runAfterInteractions()
```

---

## useTransition

React Concurrent Feature.

```javascript
const [
 isPending,
 startTransition
] = useTransition();
```

---

## React Profiler

Measures rendering performance.

