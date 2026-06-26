> 🎯 **Topic:** 4.2 Program 2: Generic Type-Safe Item Selection List Component
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## 4.2 Program 2: Generic Type-Safe Item Selection List Component
*⏱️ 1 min read*

### Question
Write a generic, type-safe React Native Component in TypeScript that displays a list of objects and supports single item selection callbacks. The component must enforce that the list items extend a base structure containing an `id` and `label`, and it must statically type the selection handler.

### Sample Input & Output
#### Input:
```tsx
const users = [
  { id: "u_1", label: "Rajeev Joshi", email: "rajeev@test.com" },
  { id: "u_2", label: "John Doe", email: "john@test.com" }
];

<GenericSelectionList 
  items={users} 
  onSelect={(item) => console.log(item.email)} // Type-safe autocompletion of properties!
/>
```
#### Output:
Renders lists dynamically with full static typing, enforcing that only items with `id` and `label` properties are passed, and typed callbacks resolve with the specific element type.

### Code
```tsx
import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, ListRenderItem } from 'react-native';

// 1. Declare a base interface constraint requiring essential properties
export interface SelectableItem {
  id: string;
  label: string;
}

// 2. Declare Generic parameters extending the base interface
interface GenericListProps<T extends SelectableItem> {
  items: T[];
  onSelect: (item: T) => void;
}

export function GenericSelectionList<T extends SelectableItem>({
  items,
  onSelect,
}: GenericListProps<T>) {
  
  const handlePress = useCallback((item: T) => {
    onSelect(item);
  }, [onSelect]);

  const renderItem: ListRenderItem<T> = useCallback(({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.itemRow} 
        onPress={() => handlePress(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.itemText}>{item.label}</Text>
      </TouchableOpacity>
    );
  }, [handlePress]);

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  itemRow: {
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#f7fafc',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemText: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '500',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of items rendered by the FlatList. The selection handler runs in $O(1)$ constant time.
- **Space Complexity**: $O(1)$ auxiliary space as it wraps inputs using memoized React callbacks.
- **Explanation**: This component leverages TypeScript Generics (`<T extends SelectableItem>`) to build an abstract, reusable list. The compiler statically checks that any object array passed contains at least the properties defined in `SelectableItem` (here, `id` and `label`). By binding the generic parameter `T` to both the `items` array and `onSelect` callback signature, the parent receives full type inference and autocompletion for custom object attributes (e.g. `item.email` or `item.userId`) without type-casting.

---

---
