In React Native, components are the fundamental building blocks of the user interface. Both **Class Components** and **Functional Components** serve the same purpose—rendering UI and managing data—but they use completely different syntaxes, states, and architectural paradigms.

IBM interviewers use this question to evaluate if you understand the evolution of React Native and if you know how memory, cleanups, and side effects are managed under the hood.

---

## 1. Class Components vs. Functional Components (The Core Difference)

- **Class Components:** These are ES6 classes that extend `React.Component`. They maintain local state via a mutable `this.state` object and rely on explicit life cycle methods.
- **Functional Components:** These are standard JavaScript functions that accept `props` as an argument and return JSX. Originally stateless, they now handle state and side effects using **Hooks** (like `useState` and `useEffect`).

---

## 2. Component Life Cycles: End-to-End

A component’s life cycle is split into three main phases: **Mounting** (creation), **Updating** (re-rendering due to data changes), and **Unmounting** (destruction).

Here is how both components handle these phases side by side:

### Phase 1: Mounting (Born)

This is when the component is being initialized and inserted into the application tree.

- **Class Component Methods (Executed in order):**

1. `constructor()`: Initializes local state and binds event handlers.
2. `static getDerivedStateFromProps()`: A rare method used to update state based on prop changes before rendering.
3. `render()`: Evaluates the JSX. _Must be a pure function._
4. `componentDidMount()`: Invoked immediately after the component mounts. **This is where you trigger API calls, setup subscriptions, or add EventListeners.**

- **Functional Component Hook Equivalent:**
- The function body itself acts as the initialization step.
- `useEffect(() => { ... }, [])`: Passing an **empty dependency array `[]**`mirrors`componentDidMount`. It executes exactly once after the initial render.

### Phase 2: Updating (Living)

This happens when a component's `props` or `state` change, triggering a re-render.

- **Class Component Methods (Executed in order):**

1. `static getDerivedStateFromProps()`
2. `shouldComponentUpdate(nextProps, nextState)`: Returns a boolean (`true`/`false`). **Crucial for performance optimization.** You can compare old vs. new props to block unnecessary re-renders.
3. `render()`: Re-evaluates and redraws the UI.
4. `getSnapshotBeforeUpdate()`: Captures UI info (like scroll position) right before the DOM/Native view updates.
5. `componentDidUpdate(prevProps, prevState)`: Invoked immediately after updating. Perfect for making network calls based on data changes (e.g., refetching an API if a user ID changes).

- **Functional Component Hook Equivalent:**
- `useEffect(() => { ... }, [dependency])`: Runs every time the variables inside the dependency array change. This acts like a combined `componentDidMount` and `componentDidUpdate`.
- For `shouldComponentUpdate`, functional components use **`React.memo`** to wrap the component and prevent unnecessary re-renders unless props change.

### Phase 3: Unmounting (Dying)

This occurs when a component is removed from the application screen (e.g., navigating away or closing a modal).

- **Class Component Method:**
- `componentWillUnmount()`: Invoked immediately before a component is destroyed. **This is where you clear timers, cancel network requests, and remove event listeners to prevent memory leaks.**

- **Functional Component Hook Equivalent:**
- The **Cleanup Function** inside `useEffect`. If your `useEffect` returns a function, React executes it when the component unmounts.

---

## Code Comparison: End-to-End Implementation

Here is a side-by-side example of how to build a component that fetches data, tracks state, and listens to a native back-button event.

### The Class Component Way

```javascript
import React, { Component } from "react";
import { Text, View, BackHandler } from "react-native";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, userData: null };
  }

  // 1. Mount
  componentDidMount() {
    this.fetchUserData();
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBack,
    );
  }

  // 2. Update Optimization
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.userData !== this.state.userData ||
      nextState.loading !== this.state.loading
    );
  }

  // 3. Update execution
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUserData(); // Refetch if prop changed
    }
  }

  // 4. Unmount / Cleanup
  componentWillUnmount() {
    this.backHandler.remove();
  }

  fetchUserData = () => {
    /* API Fetch Logic */
  };
  handleBack = () => {
    return true;
  };

  render() {
    return (
      <View>
        {this.state.loading ? (
          <Text>Loading...</Text>
        ) : (
          <Text>Welcome User</Text>
        )}
      </View>
    );
  }
}
export default UserProfile;
```

### The Functional Component Way (Modern & Preferred)

```javascript
import React, { useState, useEffect, memo } from "react";
import { Text, View, BackHandler } from "react-native";

const UserProfile = ({ userId }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // 1. Mount & Update Logic
    const fetchUserData = () => {
      /* API Fetch Logic */
    };
    fetchUserData();

    const handleBack = () => {
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack,
    );

    // 2. Unmount / Cleanup Logic
    return () => {
      backHandler.remove(); // This acts as componentWillUnmount
    };
  }, [userId]); // Triggers refetch if userId changes (componentDidUpdate)

  return (
    <View>{loading ? <Text>Loading...</Text> : <Text>Welcome User</Text>}</View>
  );
};

// Replaces shouldComponentUpdate for performance
export default memo(UserProfile);
```

---

## 🎯 What IBM Looks for in a Senior Answer:

If they ask why the industry shifted to functional components, mention these 3 architectural advantages:

1. **Code Splitting / Separation of Concerns:** In class components, unrelated logic (API calls + EventListeners) are forced into the single `componentDidMount` block. Hooks allow you to split individual features into separate `useEffect` declarations.
2. **No `this` binding issues:** Functional components avoid the confusing JavaScript scope of the `this` keyword, reducing bugs in callbacks.
3. **Better Minification:** Classes do not minify well in JavaScript compilation pipelines, making functional bundles slightly more lightweight.

---

What is the next first-round question we should tackle? Let me know!
