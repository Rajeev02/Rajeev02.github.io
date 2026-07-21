# Volume 9 – Set 17 – Animations & Gestures

## 1. How does React Native Gesture Handler differ from the built-in PanResponder?

**Concept:**
Gestures (swipes, pinches, drags) are crucial for mobile UX. React Native historically provided `PanResponder` to track touches.

**Answer:**
`PanResponder` is implemented entirely in JavaScript. Every time the user moves their finger (60 times a second), a touch event is sent over the Bridge to the JS thread, the JS thread calculates the new position, and sends an update back over the Bridge to the Native UI thread to move the element. This heavy bridge traffic causes severe lag if the JS thread is busy.

**React Native Gesture Handler (RNGH)** solves this by operating declaratively on the Native thread.
When you attach a `<GestureDetector>`, RNGH registers the gesture rules on the Native side (Java/Objective-C). The actual tracking of the finger and calculation of the gesture happens on the UI thread. It only sends an event back to JS when something meaningful happens (e.g., the gesture ends, or via Reanimated Worklets where JS runs on the UI thread).

**Key Takeaway:**
Always use `react-native-gesture-handler` instead of `PanResponder` for complex, high-performance interactions, especially when paired with Reanimated.

---

## 2. Explain the concept of "Worklets" in React Native Reanimated.

**Concept:**
To achieve 60FPS animations, animation logic must run synchronously on the Native UI thread, completely bypassing the asynchronous React Native Bridge.

**Answer:**
A **Worklet** is a small JavaScript function that Reanimated extracts from your main JS bundle, compiles, and runs on a secondary, dedicated JavaScript engine context that lives directly on the **UI Thread**.

When you write:
```javascript
const animatedStyle = useAnimatedStyle(() => {
  return { transform: [{ translateX: offset.value }] };
});
```
The arrow function passed to `useAnimatedStyle` is automatically converted into a Worklet by the Reanimated Babel plugin. 

Because it runs on the UI thread:
1. It executes synchronously with the screen refresh rate (60FPS/120FPS).
2. It cannot access variables from the main React JS thread directly (they must be captured or passed via `useSharedValue`).
3. If the main React JS thread freezes (e.g., parsing a massive JSON payload), the Worklet continues running smoothly.

**Key Takeaway:**
Worklets bring the flexibility of writing animations in JavaScript while delivering the strict performance guarantees of native code.

---

## 3. How do you implement a robust drag-and-drop sortable list in React Native?

**Concept:**
Drag-and-drop lists are notoriously difficult in React Native because they involve measuring dynamic element sizes, tracking rapid pan gestures, and reordering arrays seamlessly without frame drops.

**Answer:**
I would avoid building it from scratch with `PanResponder` because it will be laggy. 

The industry standard approach is to use libraries built explicitly on top of Reanimated and Gesture Handler, such as **`react-native-reanimated-carousel`** or **`react-native-draggable-flatlist`**.

If asked to build it manually with Reanimated 3:
1. **State:** Use a `useSharedValue` array to hold the current visual order of items.
2. **Gesture:** Wrap each item in a `<GestureDetector>` listening for `Gesture.Pan()`.
3. **Animation:** On pan update (Worklet), modify a `translateY` shared value for the dragged item, bringing its `zIndex` to the front.
4. **Hit Testing:** Calculate if the dragged item's Y position overlaps the bounds of an adjacent item. If so, animate the adjacent item out of the way (swapping their positions in the shared value array).
5. **Finalize:** On pan end, snap the dragged item to its new slot and `runOnJS` to update the actual React component state so the data persists.

**Key Takeaway:**
Drag-and-drop requires calculating intersection bounds continuously at 60FPS. Doing this over the Bridge is impossible; it must be done using Reanimated Worklets.

---

## 4. What is the difference between `Animated.timing` and `Animated.spring`? When should you use each?

**Concept:**
Both the built-in `Animated` API and Reanimated offer different types of animation curves.

**Answer:**
1. **Timing (`withTiming` / `Animated.timing`)**: 
   - Animates a value from A to B over a strictly defined duration (e.g., 300ms) using an easing curve (linear, ease-in, ease-out).
   - **Use Case:** Fading elements in/out (opacity), loading bars, or state transitions where a predictable duration is required.

2. **Spring (`withSpring` / `Animated.spring`)**: 
   - Animates based on real-world physics models (mass, stiffness, damping, velocity). It does *not* have a defined duration; it calculates the end time based on the physics parameters.
   - **Use Case:** Any element the user interacts with (swiping a card, pressing a button, dragging a modal). If a user drags a card fast and releases it, the spring animation inherits that initial velocity and momentum, creating a fluid, natural \"snap\" effect that bounces slightly before settling.

**Key Takeaway:**
Never use `timing` for elements that a user just dragged and released. The sudden loss of velocity feels unnatural. Always use `spring` for gesture-driven UI.

---

## 5. How do you animate layout changes (like elements appearing/disappearing or resizing)?

**Concept:**
Animating properties like `width` or `height` is usually a bad idea because it forces the Native layout engine (Yoga) to recalculate the positions of all surrounding elements on every frame, which is extremely expensive.

**Answer:**
There are three ways to handle layout changes depending on the requirement:

1. **LayoutAnimation (The Easy Way)**:
   Calling `LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)` right before calling `setState`. The Native UI thread will automatically calculate the layout difference and animate *all* views smoothly on the next frame. However, it lacks fine-grained control and can be buggy on Android.

2. **Reanimated Layout Animations (The Modern Way)**:
   Reanimated 3 provides layout modifiers directly on the components:
   ```jsx
   <Animated.View 
     entering={FadeIn.duration(300)} 
     exiting={SlideOutRight}
     layout={LinearTransition}
   >
   ```
   When the component is added/removed from the React tree, Reanimated intercepts the mount/unmount and animates it on the UI thread. `LinearTransition` smoothly animates the view if its siblings push it around.

3. **Transforms (The Performant Way)**:
   Instead of animating `width`/`height` directly, animate `transform: [{ scaleX: value }]`. Scaling an element doesn't trigger layout reflows for siblings, making it much faster.

**Key Takeaway:**
Reanimated's Layout Animations are the current gold standard for animating mount/unmount and resizing flows, offering both ease-of-use and 60FPS performance.
