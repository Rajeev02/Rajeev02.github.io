> 🎯 **Topic:** Section 23: Program 27: Basic 50,000 Items FlatList
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 23: Program 27: Basic 50,000 Items FlatList
*⏱️ 2 min read*

### Question
Implement a basic React Native `FlatList` component rendering 50,000 items utilizing memoization and layout optimizations.

### Sample Input & Output
#### Input:
Generated 50,000 mock items with ID, Name, and Category.
#### Output:
A highly optimized scrollable list that dynamically unmounts off-screen components.

### Code
```tsx
import React, { useMemo, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const ITEM_HEIGHT = 50;

const App = () => {
  const data = useMemo(() => {
    return Array.from({ length: 50000 }, (_, i) => ({
      id: `item_${i}`,
      name: `item_name_${i}`,
      category: `item_category_${i}`,
    }));
  }, []);

  const renderItem = useCallback(({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <Text>
          {index} - {item.name}
        </Text>
      </View>
    );
  }, []);

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <Text>50,000 Items</Text>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={10}
        getItemLayout={getItemLayout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default App;
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ for item generation, $O(W)$ per render frame where $W$ is `windowSize` (number of items rendered).
- **Space Complexity**: $O(N)$ for data storage.
- **Explanation**: This program demonstrates basic `FlatList` rendering optimizations for enormous lists using `getItemLayout`, `useMemo` for static huge data, and `removeClippedSubviews` to garbage collect views outside of the scroll window.

```

---

### React Native Projects Complete Guide
