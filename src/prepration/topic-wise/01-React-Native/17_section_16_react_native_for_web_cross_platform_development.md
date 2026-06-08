## 🌐 Section 16: React Native for Web (Cross-Platform Development)

*⏱️ 1 min read*

React Native for Web (`react-native-web`) makes it possible to run React Native applications on the web using standard web technologies. It acts as a translation layer between React Native components/APIs and native HTML DOM equivalents.

#### 1. How It Works (Compilation & Mapping)
- **Component Mapping**: At runtime, React Native components are mapped to semantic HTML elements:
  - `<View>` ➡️ `<div>` (with `display: flex` and layout rules styling)
  - `<Text>` ➡️ `<span>` (or `<div role="text">`)
  - `<Image>` ➡️ `<img>`
  - `<TextInput>` ➡️ `<input>` or `<textarea>`
  - `<ScrollView>` ➡️ `<div>` with `overflow: auto`
- **Style Compilation**: `StyleSheet.create` compiles style declarations into static, unique CSS classes at build time or initial render, attaching them using `className` elements to avoid the slow performance of runtime inline styles.

#### 2. Monorepo Setup & Code Sharing
- To share code between iOS, Android, and Web, developers structure projects in monorepos (e.g., using Yarn Workspaces, Turborepo, or Nx):
  - `packages/app/`: Core UI components, hooks, stores, and business logic.
  - `apps/mobile/`: Native React Native shell (configured via Metro).
  - `apps/web/`: Web application shell (Next.js, Vite, or Webpack).
- **Metro and Webpack Integration**:
  - Web builders use bundlers like Webpack or Vite. You configure them to resolve `.web.js` extensions first, and alias React Native dependencies to React Native for Web:
    ```javascript
    // webpack.config.js alias rules
    resolve: {
      alias: {
        'react-native$': 'react-native-web'
      },
      extensions: ['.web.js', '.js', '.ts', '.tsx']
    }
    ```

#### 3. Key Differences & Limitations
- **Platform-Specific Code**: Use the `Platform` API or platform-specific extensions:
  - `MyComponent.android.tsx` / `MyComponent.ios.tsx` / `MyComponent.web.tsx`
- **API Availability**:
  - Many native APIs (e.g., `Camera`, `Keychain` secure storage, push notifications, and hardware sensor listeners) do not exist on the web.
  - *Remedial Strategy*: Wrap these in abstract service wrappers. For storage, use `localStorage` or `IndexedDB` on Web, while using native `MMKV` or `AsyncStorage` on mobile.
- **Layout Behavior**: Web scroll containers and focus accessibility outlines behave differently than mobile OS equivalents. You must explicitly configure `outlineStyle: 'none'` in styles to prevent focus rings on interactive divs.

---


---
