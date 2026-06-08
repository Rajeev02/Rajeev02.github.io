## 🎨 Section 2: Layout, Flexbox & styling (Yoga Engine)

*⏱️ 2 min read*

#### 1. Yoga Layout Engine
React Native does not compile to HTML/CSS. Instead, it embeds **Yoga**, a custom C++ layout engine that translates a subset of Flexbox rules into native Android and iOS view layouts.

#### 2. Flexbox Behavior Differences in React Native vs. Web
While Yoga mirrors Web Flexbox, there are critical default configuration differences:
- **`flexDirection` Defaults to `column`**: On the web, divs default to `row`. In React Native, flex containers default to `column`.
- **No Unit Values**: Dimensions and margins are specified as raw numbers representing **Density-Independent Pixels (dp)** on Android or **Points (pt)** on iOS. You cannot use `%` (except in specific stylesheet rules), `vh`, `vw`, or `em`.
- **`boxSizing` is Locked to `border-box`**: All layouts calculate widths and heights inclusive of padding and borders.
- **`flex` Interpretation**: On the web, `flex` accepts multiple parameters (grow, shrink, basis). In React Native, `flex` is a single number. `flex: 1` means "fill all available space".

#### 3. Axis Alignment Guide
Alignment behavior depends entirely on the parent's `flexDirection`:

```text
If flexDirection = 'column' (Default)
  - Main Axis: Vertical ↕️   (Controlled by justifyContent)
  - Cross Axis: Horizontal ↔️ (Controlled by alignItems)

If flexDirection = 'row'
  - Main Axis: Horizontal ↔️ (Controlled by justifyContent)
  - Cross Axis: Vertical ↕️   (Controlled by alignItems)
```

- **`justifyContent`**: Aligns items along the **Main Axis** (options: `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly`).
- **`alignItems`**: Aligns items along the **Cross Axis** (options: `flex-start`, `center`, `flex-end`, `stretch` [default]).

#### 4. Animations & UI Cloning (Animated vs. Reanimated)
Animations are calculated on two different runtime threads in React Native:
- **Animated API**: Compiles animation configurations. If `useNativeDriver: true` is set, supported non-layout properties such as `opacity` and `transform` run on the native/UI side after the configuration is sent. In legacy and most stable app code, layout properties such as `width`, `height`, margins, and flex values are treated as unsupported by the native driver. Modern RN is evolving here with a shared animation backend, so a strong interview answer says: "traditionally unsupported in legacy apps; newer RN versions are expanding this area, but I would verify support before using it in production."
- **LayoutAnimation**: Instructs the native OS thread to pre-calculate transitions (fade, scale) automatically for the entire UI layout on the next render cycle. Extremely fast, but lacks fine-grained interactive control (e.g. pan gestures tracking).
- **React Native Reanimated**: Fully asynchronous animation engine that eliminates the JS thread bottleneck. It utilizes **Worklets**—small JavaScript functions compiled to C++ that execute directly inside a secondary JS engine context on the UI/Render thread. Reanimated values (`shared values`) are modified directly on the UI thread at 60/120 FPS, binding seamlessly with gesture handlers (e.g., swiping cards, zooming views) with zero bridge round-trips.
- **High-Fidelity UI Cloning**: To replicate complex layouts (like finance tracking charts, swipe-to-reveal lists, or drag-and-drop lists), developers structure views by nesting absolute positioned elements, binding gesture inputs (`Gesture.Pan()`), and applying Reanimated's `useAnimatedStyle` to interpolate values (e.g. mapping swipe distance to rotation angle and container opacity).

---


---
