# Volume 14 – Set 30 – System Design & Architecture Patterns

## 1. How do you approach designing a large-scale React Native application from scratch?

**Concept:**
Senior engineers are expected to look beyond just writing React components. They must design the entire client-side architecture.

**Answer:**
I approach app design in 5 distinct layers:

1. **Infrastructure Layer (The Foundation):** 
   - Decide the CLI (Expo vs Bare RN).
   - Set up the CI/CD pipeline (EAS or Fastlane) on Day 1 to ensure reproducible builds.
   - Configure environments (`react-native-config`) for DEV, STG, and PROD.
2. **Data & Network Layer:** 
   - Choose REST vs GraphQL.
   - Configure the caching strategy (Apollo Client or React Query) and offline persistence (MMKV or WatermelonDB).
   - Implement network interceptors for token refresh logic and generic error handling.
3. **State Management Layer:** 
   - Delineate Server State (React Query) from Client UI State (Zustand/Jotai). Avoid putting everything in a massive Redux store.
4. **Navigation Layer:** 
   - Configure React Navigation with TypeScript types.
   - Set up Deep Linking rules and Authentication guards (conditionally rendering stacks based on Auth state).
5. **Presentation Layer (UI):** 
   - Establish a Design System (Tokens for Colors, Spacing, Typography).
   - Avoid inline styles; use centralized themes or tools like Restyle/NativeWind.

**Key Takeaway:**
A solid architecture separates concerns. A UI component should never know *how* to refresh a JWT token; it should just call a hook.

---

## 2. Explain the MVVM (Model-View-ViewModel) pattern in the context of React Native.

**Concept:**
React is inherently a view library, but business logic often bleeds into UI components, creating massive, untestable files.

**Answer:**
MVVM helps cleanly separate UI from business logic.

- **Model:** The raw data structure and APIs (e.g., Axios calls, TypeScript interfaces).
- **View:** The React Component (`.tsx`). It contains *absolutely zero* business logic. It only receives props, renders UI, and binds `onPress` events.
- **ViewModel:** A custom React Hook (e.g., `useLoginViewModel.ts`). It handles the state, calls the Model (API), processes the data, and returns exactly what the View needs to render.

**Example:**
Instead of the `LoginScreen` handling the fetch request, saving tokens, and managing the loading boolean, it simply calls:
```typescript
const { email, password, setEmail, setPassword, submit, isLoading, error } = useLoginViewModel();
```
The View just binds these variables to the `<TextInput>` and `<Button>`.

**Key Takeaway:**
Using Custom Hooks as ViewModels makes your components incredibly clean and allows you to unit test the business logic (the Hook) entirely independent of the UI render cycle.

---

## 3. How do you design an app to work seamlessly across Phones and Tablets (iPads)?

**Concept:**
Just stretching a phone UI to fit an iPad looks terrible and wastes massive amounts of screen real estate.

**Answer:**
Designing for tablets requires a **Master-Detail Layout** or adaptive UI strategy.

1. **Detection:** Use `react-native-device-info` to check `isTablet()`, or use React Native's `useWindowDimensions()` to dynamically detect breakpoints (e.g., width > 768px).
2. **Layout Changes:**
   - *Phone:* The user taps a list item on the Home screen and navigates to a new Detail screen.
   - *Tablet:* The screen splits in half. The List stays on the left (Master), and the Detail renders on the right side of the exact same screen.
3. **Navigation Strategy:** React Navigation's Native Stack isn't ideal for split screens. You must use conditional rendering or libraries like `react-native-split-view` to conditionally mount components side-by-side based on the width breakpoint.
4. **Assets:** Ensure all images have `@3x` assets or use SVGs, as iPads have massive Retina displays that will heavily pixelate `@1x` images.

**Key Takeaway:**
Tablet design requires fundamentally rethinking navigation flows (avoiding stack pushes in favor of side-by-side rendering) rather than just scaling up CSS.

---

## 4. What is the clean architecture approach to Dependency Injection in React Native?

**Concept:**
If you hardcode `import { api } from './api'`, your component is tightly coupled to that specific API instance, making it impossible to mock during tests.

**Answer:**
Dependency Injection (DI) passes the dependencies (like the API or a Logger) into the function or component, rather than having the component import it directly.

In React Native, the primary mechanism for DI is **React Context**.

1. You create an `AnalyticsService` class.
2. You inject it at the root of the app:
   ```tsx
   <ServicesContext.Provider value={{ analytics: new MixpanelAnalytics() }}>
      <App />
   </ServicesContext.Provider>
   ```
3. Inside a deeply nested component, you consume it:
   ```tsx
   const { analytics } = useServices();
   analytics.track('Button Clicked');
   ```

**Why this matters:**
During a Jest test, you can wrap the component in a Provider that passes a `new MockAnalytics()` instance. The component doesn't know the difference, and you can test it without actually sending fake data to Mixpanel.

**Key Takeaway:**
React Context is heavily misused as a global state manager (like Redux), but its true and most powerful architectural purpose is Dependency Injection.

---

## 5. How do you handle breaking API changes from the Backend?

**Concept:**
If the backend changes a JSON key from `user_id` to `userId`, older versions of your app still installed on users' phones will crash.

**Answer:**
Mobile apps, unlike websites, cannot force users to update instantly. You must architect defensively.

1. **Backend Versioning:** The backend *must* version their APIs (e.g., `/v1/users` and `/v2/users`). When a breaking change occurs, the backend spins up `v2`, leaving `v1` intact for older app versions.
2. **Force Update Mechanism:** Build a check into your app's startup routine. The app pings a `/config` endpoint. If the server replies that the app's version is deprecated, the app renders a hard-blocking screen saying \"Please update the app to continue\" with a button linking directly to the App Store.
3. **Client-Side Anti-Corruption Layer (Adapters):** Never map API responses directly to your UI components. Create an Adapter function that receives the raw JSON and maps it to a strict TypeScript interface. If the backend changes a key, you only update the Adapter in one place, rather than searching through 50 UI components.

**Key Takeaway:**
Mobile clients are distributed binaries out of your control. You must use API versioning and Force Update flags to manage the lifecycle of older, legacy app versions gracefully.
