> 🎯 **Topic:** 2.2 🌐 Server Rendering, Styling & Platform Specifics
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## 2.2 🌐 Server Rendering, Styling & Platform Specifics

*⏱️ 1 min read*

#### 1. SSR vs. CSR & React Native SEO
- **Client-Side Rendering (CSR)**: The browser downloads a minimal HTML stub and executes JS to render the Virtual DOM. Faster interactions, but slower initial load and weaker SEO indexing.
- **Server-Side Rendering (SSR)**: The server pre-renders HTML on each request, delivering complete layouts. Highly optimized for SEO crawlers and fast First Contentful Paint.
- **React Native SEO / Indexing**:
  - React Native applications run compiled binaries on devices, meaning traditional SEO crawlers cannot index application screens.
  - **Mitigation**:
    1. **App Indexing**: Register **Android App Links** and **iOS Universal Links** matching domain structures (e.g. `https://myportal.com/deals`).
    2. **Companion Web App**: Deploy an SEO-optimized web companion built with Next.js (using SSR/Static Site Generation). Search engines index the web layouts. When users tap search results on mobile, Universal Links launch the native mobile app directly, routing them to the correct screen.

#### 2. Layout & Styling Frameworks
- Styling decisions dictate layout compilation performance:
  - **StyleSheet (Standard)**: Pre-compiled at compile time. Translates styles into native IDs on the native thread. High performance, zero runtime overhead.
  - **Tailwind CSS (NativeWind)**: Compiles utility classes into standard `StyleSheet` objects at build time. Maintains high performance while improving developer speed.
  - **StyleX**: Type-safe CSS-in-JS compiler. Very robust, but has minor build-time integrations.
  - **Inline Styles (`style={{ flex: 1 }}`)**: Generates a brand-new style object on every single render. This forces style calculations and comparisons on every update cycle, degrading layout speeds.

#### 3. Accessibility, Themes, Security & Multi-language (i18n)
- **Accessibility (a11y)**: Add `accessible={true}`, `accessibilityLabel`, and `accessibilityHint` elements to guarantee screens are readable by Screen Readers (TalkBack on Android, VoiceOver on iOS).
- **Multi-language (i18n)**: Integrate `react-i18next` to translate text dictionaries. Translate strings inside hooks using `const { t } = useTranslation()`.
- **Multi-theme**: Orchestrate themes using `useColorScheme()` or Redux theme stores, changing StyleSheet styles dynamically via style variables.
- **Security Protocols**:
  - SSL Pinning to prevent Man-in-the-Middle (MitM) attacks.
  - App Attestation (Play Integrity / DeviceCheck) to confirm binary security integrity.
  - Cryptographic Keychain/Keystore wrappers (`react-native-keychain`) to protect OAuth tokens.
  - Disable screen recording or capture in high-security pages using native flags (e.g. `WindowManager.LayoutParams.FLAG_SECURE` in Android activity context).

---


---

---
