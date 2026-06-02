In React Native (and web development), **`justifyContent`** and **`alignItems`** are the two foundational Flexbox properties used to align and distribute child elements inside a parent container.

To understand exactly how they work, you must first understand the concept of **Axes (the Main Axis and the Cross Axis)**. How these properties behave depends entirely on your **`flexDirection`**.

---

## 1. The Core Rule: Understanding the Axes

Flexbox handles alignment along two invisible lines:

1. **Main Axis:** The primary direction in which child items are laid out.
2. **Cross Axis:** The line running exactly perpendicular (at a 90-degree angle) to the Main Axis.

### The React Native Default

In web development, the main axis defaults to horizontal (`row`). However, **in React Native, the default layout is vertical (`column`)** to match the vertical screen orientation of mobile devices.

- If `flexDirection: 'column'` (Default): The Main Axis is **Vertical (Top to Bottom)** and the Cross Axis is **Horizontal (Left to Right)**.
- If `flexDirection: 'row'`: The Main Axis is **Horizontal (Left to Right)** and the Cross Axis is **Vertical (Top to Bottom)**.

---

## 2. `justifyContent` (Aligns along the Main Axis)

`justifyContent` is responsible for distributing empty space and aligning child items along the **Main Axis**.

### Common Values and How They Work:

- **`flex-start` (Default):** Items are grouped tightly at the start of the main axis (e.g., at the top for columns, or the left for rows).
- **`center`:** Items are grouped tightly right in the exact middle of the main axis.
- **`flex-end`:** Items are grouped tightly at the end of the main axis (e.g., at the bottom for columns, or the right for rows).
- **`space-between`:** Items are spread out evenly across the entire main axis. The first item goes to the absolute start, the last item goes to the absolute end, and the remaining space is divided equally between the items in the middle.
- **`space-around`:** Items are spread out evenly, but each item gets an equal amount of blank space on _both_ sides of it. (The gap between two items will look twice as wide as the gap at the outer edges).
- **`space-evenly`:** Items are distributed so that the spacing between any two items, and the spacing from the items to the outer edges, is exactly identical.

---

## 3. `alignItems` (Aligns along the Cross Axis)

`alignItems` is responsible for aligning child items along the **Cross Axis** (perpendicular to how they are flowing).

### Common Values and How They Work:

- **`stretch` (Default):** Items are stretched out to fill the entire width or height of the cross axis (unless you give the child a hardcoded width/height, which overrides the stretch).
- **`flex-start`:** Items are aligned to the start of the cross axis (e.g., aligned to the left edge if your main axis is a vertical column).
- **`center`:** Items are centered perfectly along the cross axis line.
- **`flex-end`:** Items are aligned to the trailing end of the cross axis (e.g., aligned to the right edge if your main axis is a vertical column).

---

## 4. Visual Code Example: Putting Them Together

Let's look at a common production scenario: Centering an investment balance card perfectly on a mobile dashboard screen.

```javascript
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CenteredCard() {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.balanceCard}>
        <Text style={styles.text}>Wallet Balance</Text>
        <Text style={styles.amount}>$45,000</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",

    // 1. By default, flexDirection is 'column' (Main Axis = Vertical, Cross Axis = Horizontal)

    // 2. Centering vertically along the Main Axis (Moves card to the vertical middle of the screen)
    justifyContent: "center",

    // 3. Centering horizontally along the Cross Axis (Moves card to the horizontal middle of the screen)
    alignItems: "center",
  },
  balanceCard: {
    width: 300,
    height: 120,
    backgroundColor: "#0052cc",
    borderRadius: 12,
    padding: 20,

    // Inside the card, let's change the axis to row!
    flexDirection: "row",
    // Now: Main Axis = Horizontal (Left to Right), Cross Axis = Vertical (Top to Bottom)

    // Pushes the text label to the left and amount to the far right edge horizontally
    justifyContent: "space-between",

    // Centers the text and amount vertically so they line up cleanly in the middle of the card
    alignItems: "center",
  },
  text: { color: "#fff", fontSize: 16 },
  amount: { color: "#fff", fontSize: 22, fontWeight: "bold" },
});
```

---

## 🎯 How Yoga and JSI Process This (For Your IBM Interview)

To tie this back to the architectural concepts you mastered earlier, here is how you can explain the mechanics of these two properties to an interviewer:

> "`justifyContent` and `alignItems` are declarative Flexbox alignment structures. When we declare them in JavaScript, they don't map directly to native Android or iOS XML styling parameters. Instead, the **Yoga layout engine** parses these style objects.
> Yoga reads the `flexDirection` to establish the Main and Cross axes. If we use `justifyContent: 'space-between'`, Yoga's C++ core calculates the total viewport size, subtracts the widths of the inner elements, divides the remaining pixel space, and assigns absolute `Top` and `Left` coordinate bounding boxes. The **Fabric rendering system** then passes these exact pixel numbers across the **JSI memory layer** to the main OS thread to instantly paint the native views exactly where they belong."
