
## Page Summary
### Reading Time
`5 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 1: Performance-Optimized List Component |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 1: Performance-Optimized List Component
*⏱️ 4 min read*

### Question
Write a performance-optimized list component that displays a massive dataset of items (such as product listings or transactions). The list must prevent unnecessary cell re-renders, handle scroll operations efficiently, and utilize layout caching rules to maintain 60 FPS scrolling on low-end devices.

### Sample Input & Output
#### Input:
```javascript
const transactions = [
  { id: "tx_101", title: "Apple Subscription", amount: 9.99, date: "2026-06-01" },
  { id: "tx_102", title: "Amazon Purchase", amount: 49.99, date: "2026-06-02" },
  // ... Up to 50,000 transaction items
];
```
#### Output:
Renders a smooth scrollable list where container cells are recycled, off-screen cells are dynamically unloaded, scroll-to-index transitions execute instantly, and cells do not re-render unless their specific transactions change.

### Code
```tsx
import React, { useState, useCallback, useMemo } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
  ListRenderItem
} from 'react-native';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

// 1. Wrap individual list item in React.memo
// Ensure the component only re-renders if its item details or selection state changes.
const ProductRow = React.memo(({ 
  item, 
  isSelected, 
  onPress 
}: { 
  item: Product; 
  isSelected: boolean; 
  onPress: (id: string) => void; 
}) => {
  console.log(`Rendering Row: ${item.name}`); // Debug render cycles
  return (
    <TouchableOpacity 
      style={[styles.row, isSelected && styles.rowSelected]} 
      onPress={() => onPress(item.id)}
      activeOpacity={0.7}
    >
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.selectionIndicator}>{isSelected ? '🔵' : '⚪'}</Text>
      </View>
    </TouchableOpacity>
  );
}, (prevProps, nextProps) => {
  // Custom equality checker to prevent unneeded redraws:
  // Skip render if the item reference and the selected flag remain identical.
  return prevProps.item === nextProps.item && prevProps.isSelected === nextProps.isSelected;
});

export function OptimizedProductList({ initialData }: { initialData: Product[] }) {
  const [data, setData] = useState<Product[]>(initialData);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // 2. Client-Side Search and Filter optimized via useMemo
  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return data;
    return data.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  // 3. Selection handler using a stable reference callback
  const handleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  // 4. Infinite Scroll Pagination Trigger
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || searchQuery.length > 0) return; // Skip pagination during active search
    setIsLoadingMore(true);
    
    // Simulate API fetch delay for next page
    setTimeout(() => {
      const nextPage = page + 1;
      const newItems: Product[] = Array.from({ length: 20 }).map((_, i) => ({
        id: `prod_${nextPage}_${i}`,
        name: `Product ${nextPage}-${i + 1}`,
        price: Math.floor(Math.random() * 100) + 10,
        category: i % 2 === 0 ? 'Electronics' : 'Apparel'
      }));
      
      setData(prev => [...prev, ...newItems]);
      setPage(nextPage);
      setIsLoadingMore(false);
    }, 1500);
  }, [page, isLoadingMore, searchQuery]);

  // 5. Pull-to-Refresh handling
  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(initialData);
      setPage(1);
      setSelectedIds(new Set());
      setIsRefreshing(false);
    }, 1000);
  }, [initialData]);

  // 6. Memoize row renderer to maintain function pointer address
  const renderItem: ListRenderItem<Product> = useCallback(({ item }) => {
    return (
      <ProductRow 
        item={item} 
        isSelected={selectedIds.has(item.id)} 
        onPress={handleSelect} 
      />
    );
  }, [selectedIds, handleSelect]);

  // 7. Stable layout parameters calculation
  // Eliminates dynamic measuring calculations on scroll.
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 70, // Height of each row (row style + bottom border height)
    offset: 70 * index,
    index,
  }), []);

  // 8. Extract unique keys
  const keyExtractor = useCallback((item: Product) => item.id, []);

  // 9. List Header Component containing the search inputs
  const renderHeader = useCallback(() => {
    return (
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products or category..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        <Text style={styles.selectionText}>Selected Items: {selectedIds.size}</Text>
      </View>
    );
  }, [searchQuery, selectedIds]);

  // 10. Footer Component rendering the loading spinner for pagination
  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#667eea" />
        <Text style={styles.footerText}>Loading more items...</Text>
      </View>
    );
  }, [isLoadingMore]);

  return (
    <FlatList 
      data={filteredProducts}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      renderItem={renderItem}
      
      // Core Virtualization & Rendering Tuning
      initialNumToRender={10}       // Speed up screen mount
      windowSize={10}               // Limit memory rendering range (10 screen bounds)
      removeClippedSubviews={true}  // Free off-screen cells from native memory buffer
      getItemLayout={getItemLayout}
      
      // Scroll-to-End Triggers
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}   // Fired when scroll is halfway through remaining content
      
      // Pull to refresh triggers
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
    backgroundColor: '#f7fafc',
  },
  headerContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInput: {
    height: 44,
    borderColor: '#cbd5e0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 15,
    backgroundColor: '#f7fafc',
  },
  selectionText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    color: '#4a5568',
  },
  row: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  rowSelected: {
    backgroundColor: '#ebf8ff',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a202c',
  },
  category: {
    fontSize: 12,
    color: '#718096',
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginRight: 10,
  },
  selectionIndicator: {
    fontSize: 18,
  },
  footerContainer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  footerText: {
    marginLeft: 8,
    fontSize: 13,
    color: '#718096',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the count of items in the list. Virtualization keeps active renders to $O(W)$ where $W$ is the visible window height.
- **Space Complexity**: $O(N)$ to keep the items array in memory.
- **Explanation**: This list implements several react performance optimizations. Individual rows are wrapped in `React.memo` using custom equality properties checks. Callbacks for scrolling and row updates are memoized using `useCallback` to avoid re-allocating reference addresses. FlatList's `getItemLayout` is configured to bypass dynamic cell dimension calculations, and virtual parameters (`windowSize`, `initialNumToRender`, `removeClippedSubviews`) are tuned to reduce runtime heap footprints.

---
