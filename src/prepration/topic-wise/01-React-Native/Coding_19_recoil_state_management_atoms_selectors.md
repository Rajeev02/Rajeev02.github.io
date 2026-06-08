## Program 18: Recoil State Management (Atoms & Selectors)
*⏱️ 3 min read*

> Interview note: understand Recoil as an atomic-state pattern, but avoid presenting it as the default choice for new React Native projects. For production architecture, prefer Redux Toolkit, Zustand, Jotai, MobX, or TanStack Query depending on whether the state is client state or server state.

### Question
Implement a complete state management structure in React Native using **Recoil**.
1. Create a Recoil State module defining an Atom to track an array of active trade listings (`tradeListingsState`).
2. Create a Selector to compute the total value of filtered trades (`totalPortfolioValueState`) based on a selected trade category type filter.
3. Build a component screen displaying the trade counts, active filter picker, and items list, using `useRecoilState`, `useRecoilValue`, and `useSetRecoilState` hooks.

### Sample Input & Output
#### Input:
- User changes filter input state from `'ALL'` to `'TECH'`.
#### Output:
- Selector re-calculates, components observing the selector update their values, while unrelated sub-components are skipped, achieving optimal frame rendering speed.

### Code
```tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { 
  RecoilRoot, 
  atom, 
  selector, 
  useRecoilState, 
  useRecoilValue, 
  useSetRecoilState 
} from 'recoil';

export interface Trade {
  id: string;
  symbol: string;
  shares: number;
  price: number;
  category: 'TECH' | 'ENERGY' | 'HEALTH';
}

// 1. Define Atom - Source of Truth
export const tradeListingsState = atom<Trade[]>({
  key: 'tradeListingsState',
  default: [
    { id: '1', symbol: 'AAPL', shares: 50, price: 175.00, category: 'TECH' },
    { id: '2', symbol: 'TSLA', shares: 20, price: 200.00, category: 'TECH' },
    { id: '3', symbol: 'XOM', shares: 100, price: 110.00, category: 'ENERGY' },
    { id: '4', symbol: 'JNJ', shares: 40, price: 155.00, category: 'HEALTH' }
  ],
});

// Define filter atom
type CategoryFilter = 'ALL' | 'TECH' | 'ENERGY' | 'HEALTH';
export const categoryFilterState = atom<CategoryFilter>({
  key: 'categoryFilterState',
  default: 'ALL',
});

// 2. Define Selectors for Derived State (Auto-Cached)
export const filteredTradesState = selector<Trade[]>({
  key: 'filteredTradesState',
  get: ({ get }) => {
    const filter = get(categoryFilterState);
    const list = get(tradeListingsState);

    if (filter === 'ALL') return list;
    return list.filter((item) => item.category === filter);
  }
});

export const totalPortfolioValueState = selector<number>({
  key: 'totalPortfolioValueState',
  get: ({ get }) => {
    const list = get(filteredTradesState);
    return list.reduce((sum, item) => sum + (item.shares * item.price), 0);
  }
});

// 3. Implement Recoil Component
export function PortfolioConsole() {
  const [filter, setFilter] = useRecoilState(categoryFilterState);
  const trades = useRecoilValue(filteredTradesState);
  const totalValue = useRecoilValue(totalPortfolioValueState);
  const setTrades = useSetRecoilState(tradeListingsState);

  const addNewTrade = () => {
    const newTrade: Trade = {
      id: String(Date.now()),
      symbol: 'MSFT',
      shares: 15,
      price: 420.00,
      category: 'TECH',
    };
    setTrades((prev) => [...prev, newTrade]);
  };

  const categories: CategoryFilter[] = ['ALL', 'TECH', 'ENERGY', 'HEALTH'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Asset Dashboard</Text>
      
      <View style={styles.valueCard}>
        <Text style={styles.label}>TOTAL VALUE (FILTERED)</Text>
        <Text style={styles.value}>${totalValue.toLocaleString()}</Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, filter === cat && styles.activeTab]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.tabText, filter === cat && styles.activeTabText]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={trades}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={styles.symbol}>{item.symbol}</Text>
              <Text style={styles.subtext}>{item.category}</Text>
            </View>
            <Text style={styles.amount}>
              {item.shares} x ${item.price.toFixed(2)}
            </Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.actionBtn} onPress={addNewTrade}>
        <Text style={styles.btnText}>ADD TECH TRADE (MSFT)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f5f7' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1a202c', marginBottom: 16 },
  valueCard: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 2 },
  label: { fontSize: 11, fontWeight: 'bold', color: '#a0aec0', letterSpacing: 1 },
  value: { fontSize: 26, fontWeight: 'bold', color: '#2d3748', marginTop: 4 },
  tabContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  tab: { flex: 1, paddingVertical: 8, alignItems: 'center', backgroundColor: '#e2e8f0', marginHorizontal: 2, borderRadius: 6 },
  activeTab: { backgroundColor: '#4c51bf' },
  tabText: { fontSize: 12, color: '#4a5568', fontWeight: 'bold' },
  activeTabText: { color: '#fff' },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#fff', marginVertical: 4, borderRadius: 8 },
  symbol: { fontWeight: 'bold', color: '#2d3748' },
  subtext: { fontSize: 11, color: '#718096', marginTop: 2 },
  amount: { fontWeight: '600', color: '#2d3748' },
  actionBtn: { backgroundColor: '#4c51bf', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

export function RecoilAppWrapper() {
  return (
    <RecoilRoot>
      <PortfolioConsole />
    </RecoilRoot>
  );
}
```

### Complexity & Explanation
- **Time Complexity**: $O(T)$ where $T$ represents filtered items. Read/write operations inside the atom execute in $O(1)$. Selectors cache results, reducing computation cost to $O(1)$ on duplicate queries.
- **Space Complexity**: $O(T)$ proportional to total trades in state cache.
- **Explanation**: This program builds a modular Recoil tree. It leverages `atom` for state sources and `selector` for derived state calculations. Subscribed React nodes re-render selectively only when targeted atoms or computed branches update.

---
