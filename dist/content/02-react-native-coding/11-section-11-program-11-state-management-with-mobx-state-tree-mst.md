> 🎯 **Topic:** Section 11: Program 11: State Management with MobX State Tree (MST)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 11: Program 11: State Management with MobX State Tree (MST)
*⏱️ 3 min read*

### Question
Write a complete React Native state manager setup using **MobX State Tree (MST)**:
1. Declare a transactional model `CartItem` representing product selections.
2. Declare the root model store `CartStore` tracking items list, and compute reactive total price calculations.
3. Write actions to safely modify observables (addItem, increment, decrement).
4. Implement a shopping cart component wrapped in an `observer` HOC to listen and react to store property updates.

### Sample Input & Output
#### Input Action:
- Client adds product item details to cart.
#### Output:
- Component detects changes and re-renders cart totals instantly. Clicking increment/decrement triggers MST model actions directly, updating prices without triggering rendering checks on unaffected properties.

### Code
```typescript
import React from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { types, Instance } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';

// 1. Define atomic model node for cart item
export const CartItem = types
  .model('CartItem', {
    id: types.identifier,
    name: types.string,
    price: types.number,
    quantity: types.number,
  })
  .actions((self) => ({
    // Actions are strict: mutations are not allowed outside action closures
    increment() {
      self.quantity += 1;
    },
    decrement() {
      if (self.quantity > 1) {
        self.quantity -= 1;
      }
    },
  }));

// 2. Define root Cart Store
export const CartStore = types
  .model('CartStore', {
    items: types.array(CartItem),
  })
  .views((self) => ({
    // Derived values are computed: cached and only updated if dependencies change
    get totalCount(): number {
      return self.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    get totalPrice(): number {
      return self.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  }))
  .actions((self) => ({
    addItem(id: string, name: string, price: number) {
      const existing = self.items.find((item) => item.id === id);
      if (existing) {
        existing.increment();
      } else {
        self.items.push(CartItem.create({ id, name, price, quantity: 1 }));
      }
    },
    removeItem(id: string) {
      const idx = self.items.findIndex((item) => item.id === id);
      if (idx !== -1) {
        self.items.splice(idx, 1);
      }
    },
  }));

// Generate TypeScript instance contracts
export type ICartStore = Instance<typeof CartStore>;
export type ICartItem = Instance<typeof CartItem>;

// Initialize model instance (mock database lookup)
export const cartStoreInstance = CartStore.create({
  items: [
    { id: "p101", name: "Fintech Token", price: 1.99, quantity: 2 },
    { id: "p102", name: "Ledger Card", price: 15.50, quantity: 1 }
  ]
});

// 3. React Component wrapped in observer to trigger reactive UI updates
export const CartView = observer(({ store }: { store: ICartStore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Portfolio Store Cart ({store.totalCount})</Text>
      
      <FlatList
        data={store.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: ICartItem }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>${item.price.toFixed(2)} x {item.quantity}</Text>
            </View>
            <View style={styles.actions}>
              <Button title="-" onPress={item.decrement} />
              <Text style={styles.qty}>{item.quantity}</Text>
              <Button title="+" onPress={item.increment} />
              <Button title="✕" color="red" onPress={() => store.removeItem(item.id)} />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Grand Total:</Text>
        <Text style={styles.totalValue}>${store.totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
  },
  sub: {
    fontSize: 13,
    color: '#718096',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qty: {
    fontSize: 14,
    fontWeight: 'bold',
    minWidth: 20,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#a0aec0',
    marginTop: 40,
  },
  footer: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#cbd5e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a5568',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#38a169',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ average mutations and property resolution.
- **Space Complexity**: $O(N)$ memory bounds where $N$ is product items size.
- **Explanation**: MobX State Tree uses static type definitions to validate model nodes. The `observer` HOC tracks property getters called during render, ensuring updates only trigger re-renders for components accessing changed fields. Derived calculations (`totalCount`, `totalPrice`) are cached using `@computed` view properties, preventing redundant evaluations.

---

---
