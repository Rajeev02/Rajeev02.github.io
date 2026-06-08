## ✨ Section 21: Shared Element Transitions & Advanced Animation Patterns

*⏱️ 3 min read*

#### 1. Shared Element Transitions
Shared Element Transitions create the visual illusion that a UI element (like a photo thumbnail, card, or avatar) seamlessly transforms from one screen to another during navigation. The element appears to "fly" from its position on the source screen to its destination on the target screen, preserving visual continuity.

- **How It Works**: Two views on different screens are tagged with the same identifier. During the navigation transition, the system calculates the start and end position/size of the tagged element and animates the transform between them. The original element is hidden, and a clone is animated across the transition overlay.

- **Reanimated 3 + React Navigation Shared Transitions**:
  React Native Reanimated 3 introduced built-in support for shared element transitions using the `sharedTransitionTag` prop:
  ```tsx
  import Animated from 'react-native-reanimated';
  import { SharedTransition } from 'react-native-reanimated';

  // Source Screen (Gallery Grid)
  function GalleryScreen({ navigation }) {
    return (
      <FlatList
        data={photos}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigation.navigate('Detail', { photo: item })}>
            <Animated.Image
              source={{ uri: item.uri }}
              sharedTransitionTag={`photo-${item.id}`}
              style={styles.thumbnail}
            />
          </Pressable>
        )}
      />
    );
  }

  // Destination Screen (Photo Detail)
  function DetailScreen({ route }) {
    const { photo } = route.params;
    return (
      <Animated.Image
        source={{ uri: photo.uri }}
        sharedTransitionTag={`photo-${photo.id}`}
        style={styles.fullImage}
      />
    );
  }
  ```
  The `sharedTransitionTag` prop must match between source and destination. Reanimated handles the interpolation, clipping, and z-ordering automatically.

#### 2. Micro-Interactions & Advanced Patterns
- **Button Press Animations**: Scale-down feedback on press using `useAnimatedStyle` and `withSpring`:
  ```typescript
  import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
  import { Gesture, GestureDetector } from 'react-native-gesture-handler';

  function AnimatedButton({ onPress, children }) {
    const scale = useSharedValue(1);

    const gesture = Gesture.Tap()
      .onBegin(() => { scale.value = withSpring(0.92); })
      .onFinalize(() => { scale.value = withSpring(1); onPress?.(); });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
    }));

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.button, animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    );
  }
  ```

- **Skeleton Loaders**: Animated gradient shimmer placeholders rendered while data fetches. Use Reanimated's `useSharedValue` with `withRepeat(withTiming(...))` to loop the shimmer translation across a `LinearGradient` mask.

- **Gesture-Driven Swipe-to-Dismiss**:
  ```typescript
  import { Gesture, GestureDetector } from 'react-native-gesture-handler';
  import Animated, {
    useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS,
  } from 'react-native-reanimated';

  function SwipeToDismiss({ onDismiss, children }) {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(1);

    const panGesture = Gesture.Pan()
      .onUpdate((event) => {
        translateY.value = Math.max(0, event.translationY); // Only allow downward swipe
        opacity.value = 1 - translateY.value / 400;
      })
      .onEnd(() => {
        if (translateY.value > 150) {
          // Dismiss threshold reached
          translateY.value = withTiming(800, { duration: 200 });
          opacity.value = withTiming(0, { duration: 200 }, () => {
            runOnJS(onDismiss)();
          });
        } else {
          // Snap back
          translateY.value = withSpring(0);
          opacity.value = withSpring(1);
        }
      });

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: translateY.value }],
      opacity: opacity.value,
    }));

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>{children}</Animated.View>
      </GestureDetector>
    );
  }
  ```

#### 3. Worklets in Reanimated
**Worklets** are small JavaScript functions that are compiled and executed on the **UI thread** instead of the JS thread. This is what makes Reanimated animations run at 60/120 FPS without Bridge or JS thread involvement.

- Any function passed to Reanimated gesture callbacks (`.onUpdate()`, `.onEnd()`) or `useAnimatedStyle` runs as a Worklet.
- Worklets cannot access regular JS-thread variables directly. Use `useSharedValue` for cross-thread shared state.
- To call JS-thread functions from a Worklet (e.g., navigation, state dispatch), wrap them with `runOnJS(fn)()`.

> *"How would you implement a photo gallery with shared element transitions?"*

- **Strategic Response**: I would use React Navigation's native stack with Reanimated 3's `sharedTransitionTag` prop. Each thumbnail in the `FlatList` grid receives a unique tag like `photo-${id}`. The detail screen renders a full-size `Animated.Image` with the same tag. Reanimated interpolates the position, size, and border radius between screens automatically. I would ensure the navigation uses `@react-navigation/native-stack` (not JS-based stack) since native stack transitions integrate better with shared element animations. For smooth performance, images should be pre-cached using `react-native-fast-image`.

> *"How do you create a swipe-to-dismiss gesture animation?"*

- **Strategic Response**: I combine `react-native-gesture-handler`'s `Gesture.Pan()` with Reanimated shared values. On `onUpdate`, I map the vertical translation to both `translateY` and `opacity`. On `onEnd`, I check if the translation exceeds a dismiss threshold (e.g., 150dp). If so, I animate out with `withTiming` and call the dismiss callback via `runOnJS`. Otherwise, I snap back with `withSpring`. The entire gesture and animation runs on the UI thread as Worklets, so there is zero frame drop.

---


---
