import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/**
 * =====================================================
 * CONSTANTS
 * =====================================================
 */

const ITEM_HEIGHT = 110;

const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Books"];

const SORT_OPTIONS = [
  {
    label: "Default",
    value: "DEFAULT",
  },
  {
    label: "Name A-Z",
    value: "NAME_ASC",
  },
  {
    label: "Name Z-A",
    value: "NAME_DESC",
  },
  {
    label: "Category A-Z",
    value: "CATEGORY_ASC",
  },
  {
    label: "Category Z-A",
    value: "CATEGORY_DESC",
  },
];

/**
 * =====================================================
 * MOCK DATA
 * =====================================================
 */

const PRODUCTS = Array.from({ length: 50000 }, (_, index) => ({
  id: String(index + 1),
  name: `Product ${index + 1}`,
  category: CATEGORIES[index % CATEGORIES.length],
}));

/**
 * =====================================================
 * PRODUCT MAP
 * Faster selected lookup
 * =====================================================
 */

const PRODUCT_MAP = PRODUCTS.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});

/**
 * =====================================================
 * PRECOMPUTED SORTS
 * Avoid re-sorting 50k items repeatedly
 * =====================================================
 */

const SORTED_PRODUCTS = {
  DEFAULT: PRODUCTS,

  NAME_ASC: [...PRODUCTS].sort((a, b) => a.name.localeCompare(b.name)),

  NAME_DESC: [...PRODUCTS].sort((a, b) => b.name.localeCompare(a.name)),

  CATEGORY_ASC: [...PRODUCTS].sort((a, b) =>
    a.category.localeCompare(b.category),
  ),

  CATEGORY_DESC: [...PRODUCTS].sort((a, b) =>
    b.category.localeCompare(a.category),
  ),
};

/**
 * =====================================================
 * DEBOUNCE HOOK
 * =====================================================
 */

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * =====================================================
 * PRODUCT CARD
 * =====================================================
 */

const ProductItem = memo(
  ({ item, isSelected, onToggle }) => {
    const handlePress = useCallback(() => {
      onToggle(item.id);
    }, [item.id, onToggle]);

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={handlePress}
        style={[styles.productCard, isSelected && styles.selectedProductCard]}
      >
        <View style={styles.cardTopRow}>
          <View style={styles.cardContent}>
            <Text style={styles.productName}>{item.name}</Text>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
          </View>

          {isSelected && (
            <View style={styles.checkContainer}>
              <Text style={styles.checkText}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  },

  /**
   * Prevent unnecessary rerenders
   */
  (prev, next) => {
    return prev.isSelected === next.isSelected && prev.item.id === next.item.id;
  },
);

ProductItem.displayName = "ProductItem";

/**
 * =====================================================
 * MAIN SCREEN
 * =====================================================
 */

const ProductSelectionScreen = () => {
  /**
   * =====================================================
   * STATE
   * =====================================================
   */

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const [sortType, setSortType] = useState("DEFAULT");

  const [selectedIds, setSelectedIds] = useState(new Set());

  /**
   * =====================================================
   * TOGGLE SELECTION
   * =====================================================
   */

  const toggleSelection = useCallback((id) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);

      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }

      return updated;
    });
  }, []);

  /**
   * =====================================================
   * CLEAR SELECTIONS
   * =====================================================
   */

  const clearSelections = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  /**
   * =====================================================
   * SORTED PRODUCTS
   * =====================================================
   */

  const sortedProducts = useMemo(() => {
    return SORTED_PRODUCTS[sortType];
  }, [sortType]);

  /**
   * =====================================================
   * FILTERED PRODUCTS
   * =====================================================
   */

  const filteredProducts = useMemo(() => {
    const value = debouncedSearch.trim().toLowerCase();

    if (!value) {
      return sortedProducts;
    }

    return sortedProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value),
    );
  }, [debouncedSearch, sortedProducts]);

  /**
   * =====================================================
   * SELECTED PRODUCTS
   * =====================================================
   */

  const selectedProducts = useMemo(() => {
    return Array.from(selectedIds).map((id) => PRODUCT_MAP[id]);
  }, [selectedIds]);

  /**
   * =====================================================
   * GET ITEM LAYOUT
   * =====================================================
   */

  const getItemLayout = useCallback(
    (_, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  /**
   * =====================================================
   * KEY EXTRACTOR
   * =====================================================
   */

  const keyExtractor = useCallback((item) => item.id, []);

  /**
   * =====================================================
   * RENDER ITEM
   * =====================================================
   */

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <ProductItem
          item={item}
          isSelected={selectedIds.has(item.id)}
          onToggle={toggleSelection}
        />
      );
    },
    [selectedIds, toggleSelection],
  );

  /**
   * =====================================================
   * HEADER
   * =====================================================
   */

  const renderHeader = useMemo(() => {
    return (
      <>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Products</Text>

          <Text style={styles.headerSubtitle}>{selectedIds.size} selected</Text>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            placeholder="Search products"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        {/* Sort */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContainer}
        >
          {SORT_OPTIONS.map((option) => {
            const active = option.value === sortType;

            return (
              <TouchableOpacity
                key={option.value}
                activeOpacity={0.8}
                onPress={() => setSortType(option.value)}
                style={[styles.filterChip, active && styles.activeFilterChip]}
              >
                <Text
                  style={[styles.filterText, active && styles.activeFilterText]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Selected Items */}
        {selectedProducts.length > 0 && (
          <View style={styles.selectedSection}>
            <View style={styles.selectedTopRow}>
              <Text style={styles.selectedHeading}>Selected Items</Text>

              <TouchableOpacity onPress={clearSelections}>
                <Text style={styles.clearButtonText}>Clear</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  activeOpacity={0.8}
                  style={styles.selectedChip}
                  onPress={() => toggleSelection(product.id)}
                >
                  <Text style={styles.selectedChipText}>{product.name}</Text>

                  <Text style={styles.removeIcon}>✕</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </>
    );
  }, [
    clearSelections,
    search,
    selectedIds.size,
    selectedProducts,
    sortType,
    toggleSelection,
  ]);

  /**
   * =====================================================
   * UI
   * =====================================================
   */

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews
        getItemLayout={getItemLayout}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default ProductSelectionScreen;

/**
 * =====================================================
 * STYLES
 * =====================================================
 */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FA",
  },

  listContent: {
    padding: 16,
    paddingTop: 56,
    paddingBottom: 40,
  },

  /**
   * Header
   */

  headerContainer: {
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#111",
  },

  headerSubtitle: {
    marginTop: 4,
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },

  /**
   * Search
   */

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 18,
    height: 58,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,

    elevation: 2,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },

  /**
   * Filter Chips
   */

  filterContainer: {
    paddingBottom: 18,
  },

  filterChip: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.03,
    shadowRadius: 4,

    elevation: 1,
  },

  activeFilterChip: {
    backgroundColor: "#1677FF",
  },

  filterText: {
    color: "#333",
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#FFF",
  },

  /**
   * Selected Section
   */

  selectedSection: {
    marginBottom: 18,
  },

  selectedTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  selectedHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
  },

  clearButtonText: {
    color: "#FF4D4F",
    fontWeight: "700",
  },

  selectedChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1677FF",
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginRight: 10,
  },

  selectedChipText: {
    color: "#FFF",
    fontWeight: "600",
    marginRight: 6,
  },

  removeIcon: {
    color: "#FFF",
    fontWeight: "700",
  },

  /**
   * Product Card
   */

  productCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,

    elevation: 2,
  },

  selectedProductCard: {
    borderWidth: 2,
    borderColor: "#1677FF",
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  cardContent: {
    flex: 1,
  },

  productName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 12,
  },

  /**
   * Category Badge
   */

  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EDF4FF",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  categoryText: {
    color: "#1677FF",
    fontWeight: "600",
    fontSize: 13,
  },

  /**
   * Check Icon
   */

  checkContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1677FF",
    justifyContent: "center",
    alignItems: "center",
  },

  checkText: {
    color: "#FFF",
    fontWeight: "700",
  },
});
