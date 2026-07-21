# Volume 11 – Set 23 – Accessibility (A11y) & Internationalization (i18n)

## 1. Why is Accessibility important and how do you implement it in React Native?

**Concept:**
Accessibility (a11y) ensures that users with visual, motor, or auditory impairments can use your app effectively, primarily using Screen Readers (VoiceOver on iOS, TalkBack on Android).

**Answer:**
Accessibility is legally required in many regions (e.g., ADA compliance in the US, EAA in Europe) and vastly expands your user base.

In React Native, I implement it using specific props on UI components:
1. **`accessible={true}`**: Groups children into a single selectable component for the screen reader.
2. **`accessibilityLabel`**: Provides the text the screen reader will read (e.g., `<TouchableOpacity accessibilityLabel=\"Submit Form\">`). This is critical for icon-only buttons.
3. **`accessibilityRole`**: Tells the screen reader the purpose of the element (e.g., `button`, `header`, `link`). This allows the screen reader to append context, like \"Submit Form, Button.\"
4. **`accessibilityHint`**: Gives additional context about what happens after interaction (e.g., \"Opens the checkout modal\").

**Key Takeaway:**
Never assume an Icon or a custom interactive `View` is inherently understandable. Always provide a clear `accessibilityLabel` and `accessibilityRole`.

---

## 2. How do you handle Dynamic Type (Font Scaling) without breaking your UI?

**Concept:**
Users with visual impairments often increase the system font size in their OS settings.

**Answer:**
By default, React Native `<Text>` components scale automatically based on the OS setting. If a user increases their font size by 200%, your beautifully designed fixed-height cards will clip the text or break the layout entirely.

**How to handle it:**
1. **Never use fixed heights:** Avoid `height: 50` on containers wrapping text. Use `minHeight` and padding so the container can grow vertically if the text wraps to multiple lines.
2. **Limit Scaling:** If scaling breaks a complex layout like a bottom tab bar, you can cap the maximum scale using the `maxFontSizeMultiplier` prop (e.g., `maxFontSizeMultiplier={1.5}`).
3. **`allowFontScaling`:** In extremely rare cases (like a custom icon font where scaling breaks the glyphs), you can disable it via `allowFontScaling={false}`, but this should be avoided for readable text.

**Key Takeaway:**
Responsive design in mobile isn't just about screen width; it's heavily about vertical elasticity to accommodate Dynamic Type.

---

## 3. How do you implement Internationalization (i18n) and Right-to-Left (RTL) support?

**Concept:**
To release an app globally, it must support multiple languages, formatting (dates/currencies), and reading directions.

**Answer:**
I use the standard **`react-i18next`** library.
1. **Setup:** Create JSON dictionaries for each language (`en.json`, `fr.json`, `ar.json`).
2. **Usage:** Instead of hardcoding strings, wrap them in the translation hook: `<Text>{t('home.welcome_message')}</Text>`.
3. **OS Detection:** Use `react-native-localize` to detect the device's current locale and automatically set the default language and currency formats.

**RTL Support (Arabic, Hebrew):**
React Native's Yoga layout engine handles RTL automatically! 
- If you use `marginLeft: 10`, it will stay on the left (which is wrong in RTL).
- If you use **`marginStart: 10`** and **`marginEnd`**, Yoga automatically flips them. In English (LTR), `marginStart` is the left. In Arabic (RTL), `marginStart` becomes the right. 

To force the app into RTL mode based on the language, use `I18nManager.forceRTL(true)` and restart the app.

**Key Takeaway:**
Always use `start` and `end` layout properties instead of `left` and `right` to ensure zero-effort RTL compatibility.

---

## 4. What are common accessibility pitfalls developers make in React Native?

**Concept:**
Developers often test on visual simulators and forget to turn on VoiceOver/TalkBack on real devices.

**Answer:**
The most common pitfalls include:
1. **Icon-only Buttons:** A `<TouchableOpacity>` containing only an SVG `<Icon>` has no readable text. The screen reader will just say \"Button, unlabelled.\" Always add an `accessibilityLabel`.
2. **Nested Touchable Elements:** Placing a `TouchableOpacity` inside another `TouchableOpacity`. Screen readers struggle to navigate nested interactive elements.
3. **Missing State Feedback:** If a toggle switch is pressed, the UI changes visually, but the screen reader needs to know. Use `accessibilityState={{ checked: true }}` so it reads \"Checked.\"
4. **Modal Trapping:** When a custom modal opens, the screen reader might still be able to select and read elements \"behind\" the modal on the main screen. Use `importantForAccessibility=\"no-hide-descendants\"` (Android) or `accessibilityElementsHidden={true}` (iOS) on the background view to trap the focus inside the modal.

**Key Takeaway:**
Run your app on a physical device, close your eyes, turn on VoiceOver, and try to complete a core user flow. If you can't, your a11y implementation is broken.

---

## 5. How do you test Accessibility and Internationalization automatically?

**Concept:**
Manual testing for a11y and i18n is tedious. It should be caught in CI/CD.

**Answer:**
1. **Static Analysis:** Use `eslint-plugin-react-native-a11y`. It throws linting errors if you write a `TouchableOpacity` without an `accessibilityRole` or label.
2. **Unit Tests (Jest):** React Native Testing Library (RNTL) is explicitly designed around accessibility. Instead of querying elements by generic Test IDs (`getByTestId`), RNTL encourages querying by accessibility labels (`getByRole`, `getByLabelText`). If your test passes, your element is highly likely to be accessible to a screen reader.
3. **i18n Extraction:** Use automated scripts (like `i18next-parser`) in CI/CD to scan your `.tsx` files for `t('some.key')` and verify that `some.key` actually exists in all JSON language dictionaries, failing the build if a translation is missing.

**Key Takeaway:**
Tying your Jest unit tests directly to Accessibility identifiers ensures that your app remains accessible by default, as breaking a11y breaks the test suite.
