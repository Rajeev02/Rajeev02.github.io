React Hooks were introduced to allow functional components to manage state, lifecycle methods, and optimization without writing ES6 classes. Under the hood, React tracks Hooks based on their execution order during a component's render phase.

Here is the comprehensive, end-to-end guide to the core hooks, structured with their **definitions, primary use cases, and inner workings** to prepare you for the IBM panel.

---

## 1. State Hooks

### A. `useState`

- **Definition:** A hook that allows you to add local state to a functional component.
- **How it Works:** It returns an array with exactly two elements: the current state value and a setter function to update it. When the setter function is called, React schedules a re-render of the component with the new state value.
- **Common Use Cases:**
- Toggling a modal visibility (`true`/`false`).
- Storing the text input from a search bar.
- Handling a simple counter.

### B. `useReducer`

- **Definition:** An alternative to `useState` designed for managing complex state logic that involves multiple sub-values or when the next state depends heavily on the previous one.
- **How it Works:** It uses a Redux-like pattern. It accepts a reducer function `(state, action) => newState` and an initial state. It returns the current state and a `dispatch` function. When you dispatch an action, the reducer calculates the next state deterministically.
- **Common Use Cases:**
- Complex multi-step checkout forms (e.g., handling shipping address, payment tokens, and validation flags in one object).
- Game states or intricate local screen state filtering.

---

## 2. Lifecycle & Context Hooks

### C. `useEffect`

- **Definition:** A hook that lets you perform side effects (data fetching, subscriptions, manual UI updates) in functional components.
- **How it Works:** It runs asynchronously after the render and paint phases are complete. It monitors a dependency array; if any item in the array changes between renders, the callback executes. If it returns a function, that function acts as a cleanup routine right before unmounting or re-running.
- **Common Use Cases:**
- Fetching data from a REST API when a screen loads.
- Subscribing to native event listeners like `BackHandler` or keyboard events.

### D. `useContext`

- **Definition:** A hook that allows you to subscribe to React's Context API, enabling you to share data globally across the component tree without manually passing props down through every level (avoiding "prop drilling").
- **How it Works:** It looks up the component tree to find the nearest matching Context Provider. When the value of that Provider updates, every component calling `useContext` for that specific context will automatically re-render with the fresh data.
- **Common Use Cases:**
- Storing global application themes (Dark Mode / Light Mode).
- Managing localization/language settings (English, Hindi).
- Storing global user authentication states (though complex app state is often offloaded to Redux Toolkit).

---

## 3. Performance Optimization Hooks

### E. `useMemo`

- **Definition:** A hook that memoizes (caches) the **result of a calculation** between re-renders.
- **How it Works:** It takes a function that computes a value and a dependency array. React will execute the function on the first render. On subsequent renders, it returns the cached result _unless_ one of the values in the dependency array has changed.
- **Common Use Cases:**
- Filtering or sorting a massive list of financial transactions (like your investor-facing products at LetsVenture) before passing them to a `FlatList`.
- Heavy cryptographic or mathematical calculations.

### F. `useCallback`

- **Definition:** A hook that memoizes (caches) the **function definition itself** between re-renders.
- **How it Works:** In JavaScript, functions are objects, meaning a new function reference is recreated in memory on every single render. `useCallback` caches that function reference. It only recreates the function if its dependencies change.
- **Common Use Cases:**
- Passing callback functions to optimized child components (wrapped in `React.memo`). Without `useCallback`, the child component will re-render unnecessarily because it receives a brand-new function pointer on every parent render.
- Debouncing search input tracking functions.

---

## 4. Mutable Reference Hooks

### G. `useRef`

- **Definition:** A hook that returns a mutable reference object whose `.current` property can hold any value, persisting across the entire lifecycle of the component **without triggering a re-render when it changes**.
- **How it Works:** It serves two completely distinct purposes: holding direct references to native UI nodes, or acting as a generic instance variable container (like a private class property) that does not disrupt the visual render loop when modified.
- **Common Use Cases:**
- Accessing imperative native methods on UI elements (e.g., calling `.focus()` on a `TextInput`, or calling `.scrollToEnd()` on a `ScrollView`).
- Tracking timers or intervals (`setInterval` IDs) so they can be cleared inside a cleanup function later.
- Storing a mutable flag to track if a component has completed its initial mount phase.

---

## 🎯 React Hooks Summary Reference

| Hook              | Returns                             | Triggers Re-render on Change?      | Core Purpose                                                     |
| ----------------- | ----------------------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| **`useState`**    | `[value, setter]`                   | **Yes**                            | Managing local UI and variable states.                           |
| **`useReducer`**  | `[state, dispatch]`                 | **Yes**                            | Managing complex, transactional state objects.                   |
| **`useEffect`**   | `undefined` (or cleanup function)   | No                                 | Executing asynchronous side effects securely.                    |
| **`useContext`**  | Global value                        | **Yes** (if context value changes) | Global data sharing without prop drilling.                       |
| **`useMemo`**     | Cached **Value**                    | No                                 | Avoiding expensive re-computations.                              |
| **`useCallback`** | Cached **Function**                 | No                                 | Avoiding child re-renders from unstable function references.     |
| **`useRef`**      | Mutable `{ current: value }` object | **No**                             | Targeting native DOM nodes or tracking persistent data silently. |

---

Would you like to write a quick code example combining a couple of these optimization hooks (`useMemo` and `useCallback`) to see how they prevent performance drops in lists, or should we move to mapping out your project architecture stories?

Let’s look at a highly practical, senior-level example. Imagine you are building a screen for **LVX or Scalix** at LetsVenture that displays a list of investor transactions.

We want to:

1. **Filter** a massive list of transactions based on a search query (expensive operation).
2. **Pass a callback function** down to a child component (list item) without causing that child to re-render on every keystroke.

Here is how we use `useMemo`, `useCallback`, and `useRef` together to achieve optimal, production-grade performance.

---

### The Optimized Transaction Screen

```javascript
import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

// 1. A highly optimized Child Component wrapped in React.memo
// It will ONLY re-render if its props (item or onRowPress) physically change.
const TransactionRow = React.memo(({ item, onRowPress }) => {
  console.log(`Rendering Row ID: ${item.id}`); // Debug tracker
  return (
    <View style={styles.row}>
      <Text style={styles.text}>
        {item.title} - ${item.amount}
      </Text>
      <Button title="View" onPress={() => onRowPress(item.id)} />
    </View>
  );
});

export default function TransactionScreen() {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("light"); // Simulating a secondary state change

  // useRef Example: Tracking how many times the user views transactions without re-rendering the UI
  const totalViewsRef = useRef(0);

  // Hardcoded large dataset for illustration
  const transactions = [
    { id: "1", title: "Angelist Equity Investment", amount: 5000 },
    { id: "2", title: "Scalix Platform Subscription", amount: 150 },
    { id: "3", title: "LVX Secondary Market Trade", amount: 12000 },
  ];

  // 2. useMemo Example: Caching the filtered results
  // If the user changes the global theme, 'search' stays the same.
  // useMemo prevents this filtering loop from running again unnecessarily.
  const filteredTransactions = useMemo(() => {
    console.log("Filtering transactions running..."); // Heavy computation simulator
    return transactions.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]); // Only re-runs if 'search' changes

  // 3. useCallback Example: Memoizing the function declaration
  // If we don't use useCallback, a brand-new function reference is created on every render cycle.
  // That would break React.memo inside TransactionRow, forcing every row to re-render on every keystroke.
  const handleRowPress = useCallback((id) => {
    totalViewsRef.current += 1; // Increment ref silently (no re-render)
    console.log(
      `Transaction ${id} tapped. Total row clicks tracked: ${totalViewsRef.current}`,
    );
  }, []); // Empty dependencies mean this function reference remains perfectly stable

  return (
    <View style={[styles.container, theme === "dark" && styles.darkContainer]}>
      <TextInput
        style={styles.input}
        placeholder="Search transactions..."
        value={search}
        onChangeText={setSearch}
      />

      <Button
        title="Toggle App Theme"
        onPress={() =>
          setTheme((prev) => (prev === "light" ? "dark" : "light"))
        }
      />

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionRow item={item} onRowPress={handleRowPress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  darkContainer: { backgroundColor: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  text: { fontSize: 16 },
});
```

---

## 🔍 Why this code makes an IBM Interviewer happy:

- **No Unnecessary Calculations:** When you tap **"Toggle App Theme"**, the screen re-renders to change the background color. Because of `useMemo`, the application skips the `.filter()` logic entirely and reads it instantly from cache.
- **No Child Component Waste:** Because `handleRowPress` is wrapped in `useCallback`, its memory pointer stays fixed. When the theme changes, `TransactionRow` recognizes its props haven't changed and **skips re-rendering completely**.
- **Silent State Tracking:** Using `useRef` to track clicks (`totalViewsRef.current`) allows us to record metrics silently in the background without causing an entire screen refresh cycle.

---

Now that we have covered the entire technical foundation from your first round (Performance, Native Bridges, Lifecycles, and Hooks), we are perfectly primed for **Step 3 of your checklist: Mapping out your actual Fintech projects.**

Would you like to draft exactly how you should walk through your architecture at LetsVenture when they ask, _"Tell me about a complex architectural problem you solved"_?

Let’s complete the picture by looking at the remaining major hooks we discussed: **`useReducer`** and **`useContext`**.

To make this highly relevant for your upcoming IBM interview, we will simulate a real-world scenario from your fintech background at LetsVenture: **An Investment Checkout Wizard**. This component needs to handle complex form states (amount, equity shares, validation errors) and share global configurations like user authentication tokens or display languages across nested elements.

Here is how we implement `useReducer` and `useContext` together in production-grade code.

---

### The Global Context & Complex State Checkout Example

```javascript
import React, { createContext, useContext, useReducer } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

// ==========================================
// 1. useContext SETUP (Global App State)
// ==========================================
// Creating an Authentication Context to share across the app
const AuthContext = createContext(null);

// ==========================================
// 2. useReducer SETUP (Complex Local State)
// ==========================================
const initialState = {
  investmentAmount: "",
  equityShares: 0,
  error: null,
  isSubmitting: false,
};

function checkoutReducer(state, action) {
  switch (action.type) {
    case "SET_AMOUNT":
      const amount = action.payload;
      // Derived state logic: calculate shares dynamically based on a mock share price of $50
      const calculatedShares = amount ? Math.floor(Number(amount) / 50) : 0;
      return {
        ...state,
        investmentAmount: amount,
        equityShares: calculatedShares,
        error:
          amount && Number(amount) < 1000
            ? "Minimum investment is $1,000"
            : null,
      };
    case "START_SUBMIT":
      return { ...state, isSubmitting: true, error: null };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        isSubmitting: false,
        investmentAmount: "",
        equityShares: 0,
      };
    case "SUBMIT_FAILURE":
      return { ...state, isSubmitting: false, error: action.payload };
    default:
      return state;
  }
}

// ==========================================
// 3. MAIN COMPONENT TREE
// ==========================================
export default function App() {
  // Simulating global session data injected at the root of the app
  const globalSession = {
    userToken: "auth0_jwt_token_12345",
    userName: "Rajeev Joshi",
  };

  return (
    <AuthContext.Provider value={globalSession}>
      <View style={styles.container}>
        <InvestmentCheckout />
      </View>
    </AuthContext.Provider>
  );
}

// ==========================================
// 4. NESTED CHILD COMPONENT
// ==========================================
function InvestmentCheckout() {
  // useContext Example: Consume global session without prop drilling
  const session = useContext(AuthContext);

  // useReducer Example: Manage deeply tied, complex transactional states
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const handleConfirmInvestment = async () => {
    if (state.error || !state.investmentAmount) return;

    dispatch({ type: "START_SUBMIT" });

    try {
      console.log(
        `Sending secure transaction for ${session?.userName} using token: ${session?.userToken}`,
      );
      // Simulating a native payment or fintech gateway API call (e.g., Razorpay / Cashfree)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch({ type: "SUBMIT_SUCCESS" });
      alert("Investment Placed Successfully!");
    } catch (err) {
      dispatch({
        type: "SUBMIT_FAILURE",
        payload: "Payment failed. Please try again.",
      });
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.welcomeText}>Investor: {session?.userName}</Text>
      <Text style={styles.title}>Scalix Private Equity Checkout</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Amount ($)"
        keyboardType="numeric"
        value={state.investmentAmount}
        onChangeText={(text) => dispatch({ type: "SET_AMOUNT", payload: text })}
      />

      {state.error && <Text style={styles.errorText}>{state.error}</Text>}

      <View style={styles.infoBox}>
        <Text>Calculated Shares: {state.equityShares}</Text>
      </View>

      <Button
        title={
          state.isSubmitting ? "Processing Payment..." : "Confirm Investment"
        }
        disabled={
          state.isSubmitting || !!state.error || !state.investmentAmount
        }
        onPress={handleConfirmInvestment}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  welcomeText: { fontSize: 14, color: "#666", marginBottom: 5 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  infoBox: {
    padding: 10,
    backgroundColor: "#eef2f7",
    borderRadius: 6,
    marginBottom: 20,
  },
  errorText: { color: "red", marginBottom: 10, fontSize: 12 },
});
```

---

## 🔍 Why this implementation answers the interviewer's depth requirements:

### How `useReducer` solves the complexity here:

If you used `useState` for this form, you would need multiple disconnected states: `const [amount, setAmount] = useState('')`, `const [shares, setShares] = useState(0)`, `const [error, setError] = useState(null)`. When a user alters the amount, you would have to trigger three individual setters simultaneously.

By offloading this logic to a centralized reducer function, **the state transformations become completely deterministic and transactional**. Calculating derived values (like `equityShares` based on `investmentAmount`) or triggering conditional validation rules occurs instantly within a single synchronous state update step. This prevents asynchronous state-desynchronization bugs.

### How `useContext` optimizes the architecture:

Rather than passing down the `session` object through every layout wrapper or parent container view, the `InvestmentCheckout` card reaches directly into the virtual React context tree to capture user metadata. It handles components smoothly by subscribing to updates natively, keeping the codebase clean and modular.

---

Now that we have comprehensively covered every core hook with practical, production-level engineering examples, would you like to move on to simulating **Step 5 of your plan: Handling complex behavioral and hotfix scenarios for enterprise deployments**? Let me know where we should point our focus next.
