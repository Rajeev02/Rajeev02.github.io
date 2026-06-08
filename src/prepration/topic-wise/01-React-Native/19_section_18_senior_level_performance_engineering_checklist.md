## ⚡ Section 18: Senior-Level Performance Engineering Checklist

*⏱️ 1 min read*

Ensure smooth 60/120 FPS interactions and minimize thread blocks by checking off these core performance vectors during code reviews:

#### 1. Minimizing Bridge & JSI Crossing Overhead
- **The Rule**: Keep interactions on the native thread without jumping back to JavaScript.
- **Implementation**:
  - Use **React Native Reanimated** and **Gesture Handler** to run touch responses, scrolling, and dragging animations fully on the UI thread using C++ Worklets.
  - Do not pass high-frequency events (like `onScroll` coordinates) back to the JS thread to update React state; bind them directly to native layout transforms using shared values.

#### 2. Render Loop Optimization
- **Prevent Unnecessary Updates**:
  - Wrap list items and heavy components in `React.memo` using strict dependency comparisons.
  - Memoize complex calculations with `useMemo`, and callbacks with `useCallback` to preserve reference identities across renders.
  - Avoid inline objects or arrow functions inside component render trees (e.g. `<Component style={{ padding: 10 }} onPress={() => execute()} />`).

#### 3. Dynamic Lists (FlashList / FlatList)
- **Virtualization Tuning**:
  - Set `windowSize` to a low value (e.g., `5` screens' worth of elements) to prevent excessive off-screen allocations.
  - Pass `getItemLayout` (for FlatList) or `estimatedItemSize` (for FlashList) to completely bypass dynamic cell measurements.
  - Use `keyExtractor` returning unique IDs to prevent reconciliation tree rebuilds.

#### 4. Memory Leak Triage
- **Clean up Subscriptions**: Always return cleanup functions in `useEffect` hooks to destroy native event listeners (`DeviceEventEmitter`), interval timers, and database subscription queries.
- **Request Aborting**: Use `AbortController` in Axios/Fetch configurations to abort active HTTP network promises if components unmount before the API resolves.

---


---
