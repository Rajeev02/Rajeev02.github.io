> 🎯 **Topic:** Section 8: Program 8: Reanimated Swipe & Pan Gesture Card Component (UI Cloning & Animation)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 8: Program 8: Reanimated Swipe & Pan Gesture Card Component (UI Cloning & Animation)
*⏱️ 2 min read*

### Question
Implement an interactive swipe-to-dismiss dashboard payment card using `react-native-gesture-handler` and `react-native-reanimated`. The card layout must represent a high-fidelity credit card clone, animate rotation and transition dynamically based on drag coordinates, trigger callback events when swiped off-screen limits, and snap back smoothly using spring physics if released early.

### Sample Input & Output
#### Props Input:
```tsx
<SwipableCard 
  onSwipeLeft={() => console.log('Discarded Card')}
  onSwipeRight={() => console.log('Selected Card')}
/>
```
#### Output:
Renders a credit card component that can be dragged in 2D space. The card tilts dynamically as it is dragged. Swiping beyond 40% of the screen width animates the card off-screen and fires JS callbacks; releasing it early triggers a spring snap animation restoring card origin coordinate values.

### Code
```tsx
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  runOnJS 
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.4;

export function SwipableCard({ onSwipeLeft, onSwipeRight }: { 
  onSwipeLeft: () => void; 
  onSwipeRight: () => void; 
}) {
  // Shared values run in C++ thread, keeping the JS thread free
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd((event) => {
      if (translateX.value > SWIPE_THRESHOLD) {
        // Swipe Right animation
        translateX.value = withSpring(SCREEN_WIDTH, { velocity: event.velocityX });
        runOnJS(onSwipeRight)();
      } else if (translateX.value < -SWIPE_THRESHOLD) {
        // Swipe Left animation
        translateX.value = withSpring(-SCREEN_WIDTH, { velocity: event.velocityX });
        runOnJS(onSwipeLeft)();
      } else {
        // Snap back to starting position using spring physics
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    const rotate = `${(translateX.value / SCREEN_WIDTH) * 15}deg`;
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: rotate },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, animatedStyle]}>
          <Text style={styles.cardTitle}>PREMIUM LEDGER</Text>
          <Text style={styles.cardNumber}>**** **** **** 9876</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardHolderLabel}>CARD HOLDER</Text>
              <Text style={styles.cardHolder}>RAJEEV JOSHI</Text>
            </View>
            <View>
              <Text style={styles.cardHolderLabel}>EXPIRES</Text>
              <Text style={styles.cardHolder}>12/30</Text>
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7fafc',
  },
  card: {
    width: 320,
    height: 200,
    backgroundColor: '#1a202c',
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  cardTitle: { 
    color: '#ed8936', 
    fontSize: 16, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  cardNumber: { 
    color: '#ffffff', 
    fontSize: 22, 
    letterSpacing: 2, 
    marginVertical: 16,
    fontFamily: 'Courier'
  },
  cardFooter: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  cardHolderLabel: { 
    color: '#a0aec0', 
    fontSize: 9, 
    fontWeight: '600' 
  },
  cardHolder: { 
    color: '#ffffff', 
    fontSize: 13, 
    fontWeight: 'bold',
    marginTop: 2
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ calculations. Gesture tracking compiles natively on the OS thread, bypassing event serialize delays.
- **Space Complexity**: $O(1)$ space allocation for shared values.
- **Explanation**: This program clones a premium card UI utilizing gesture pan configurations. By using Reanimated's `useSharedValue` and `useAnimatedStyle`, translation values are tracked and computed entirely on the UI thread via C++ modules (Worklets). This ensures the JS main thread never drops frames, executing swipe snapping at 60/120 FPS.

---

---
