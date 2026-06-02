In React Native, testing is split into clear layers. The closer you get to a real device, the more confidence you get, but the tests also get slower and tougher to maintain.

Most React Native apps use a default stack: **Jest** (comes built-in for running JavaScript tests) paired with **React Native Testing Library (RNTL)** for components, and tools like **Maestro** or **Detox** for full-device automation.

---

## 1. Unit Testing (Functions & Logic)

**What it is:** Testing the smallest, isolated parts of your code—like helper functions, utility methods, or custom hooks—without rendering any UI.

- **Primary Tool:** Jest (built into React Native by default).

### The Code (`utils.js`)

```javascript
export const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "$0.00";
  return `$${amount.toFixed(2)}`;
};
```

### The Test (`utils.test.js`)

```javascript
import { formatCurrency } from "./utils";

describe("formatCurrency", () => {
  it("formats a number into a dollar currency string", () => {
    expect(formatCurrency(10.5)).toBe("$10.50");
  });

  it("returns a fallback string if given an invalid input", () => {
    expect(formatCurrency("invalid")).toBe("$0.00");
  });
});
```

---

## 2. Component/Interaction Testing

**What it is:** Verifying that your React components render correctly and respond properly when users interact with them (e.g., typing or tapping).

- **Primary Tool:** Jest + `@testing-library/react-native` (RNTL).

### The Code (`Counter.js`)

```javascript
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text testID="count-text">Count: {count}</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>Increment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({ container: { padding: 20 } });
```

### The Test (`Counter.test.js`)

```javascript
import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Counter from "./Counter";

describe("<Counter />", () => {
  it("increments the count when the button is pressed", () => {
    // 1. Render the component in memory
    const { getByText, getByTestId } = render(<Counter />);

    // 2. Query elements from the UI
    const countLabel = getByTestId("count-text");
    const button = getByText("Increment");

    // 3. Assert initial state
    expect(countLabel.props.children).container("Count: ", 0);

    // 4. Simulate a real user tap
    fireEvent.press(button);

    // 5. Assert updated state
    expect(countLabel.props.children).container("Count: ", 1);
  });
});
```

---

## 3. Snapshot Testing

**What it is:** Taking a look at the rendered HTML-like output of your component and saving it to a file. Next time the test runs, Jest makes sure nobody accidentally changed the layout structure.

- **Primary Tool:** Jest.

### The Test (`CounterSnapshot.test.js`)

```javascript
import React from "react";
import render from "react-test-renderer";
import Counter from "./Counter";

test("Counter renders consistently", () => {
  const tree = render.create(<Counter />).toJSON();
  expect(tree).toMatchSnapshot();
});
```

> **A quick heads-up on Snapshots:** They are great for simple components, but they break easily if you change minor things like styling or text. Avoid relying too heavily on them for dynamic UIs.

---

## 4. Integration Testing (API / Network Calls)

**What it is:** Testing a user flow across multiple components or screens that rely on external data. Instead of hitting the actual production servers, you mock (fake) the network requests to keep tests fast and predictable.

- **Primary Tool:** Jest + RNTL + MSW (Mock Service Worker) or `jest.mock`.

### The Test with a Mocked API (`UserList.test.js`)

```javascript
import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import UserList from "./UserList";

// Mocking global fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: "Alex" }]),
  }),
);

describe("<UserList />", () => {
  it("fetches data and lists users successfully", async () => {
    const { getByText } = render(<UserList />);

    // Wait for the async API hook to complete and render the text
    await waitFor(() => {
      expect(getByText("Alex")).toBeTruthy();
    });
  });
});
```

---

## 5. End-to-End (E2E) Testing

**What it is:** Running tests like a robot on a real iOS/Android simulator or physical device. It launches the actual built app binaries, boots them up, and navigates through real user journeys (Sign-up, checkout, etc.).

- **Primary Tools:** **Maestro** (highly recommended for modern setup due to simplicity) or **Detox** (the classic gray-box testing library for React Native).

### Maestro Example (`flows/login.yaml`)

Maestro doesn't use JavaScript for tests; it uses a dead-simple declarative YAML script:

```yaml
appId: com.example.myapp
---
- launchApp
- tapOn: "Email Input"
- inputText: "user@example.com"
- tapOn: "Password Input"
- inputText: "securePassword123"
- tapOn: "Login Button"
- assertVisible: "Welcome back, User!"
```

---

### Which one should you prioritize?

If you are wondering where to focus your energy first, look at the classic Testing Pyramid strategy:

- **70% Component & Unit Tests:** Keep these fast, run them automatically on every code commit. They cover your main logic and user interactions.
- **20% Integration/Screen Tests:** Cover key flows that connect multiple views or require API mocking.
- **10% E2E Tests:** Run these strictly on critical application lifelines (like making sure a user can successfully finish a checkout checkout or account registration). They are slower but give you the highest confidence.
