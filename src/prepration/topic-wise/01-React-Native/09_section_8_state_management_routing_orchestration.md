## 📦 Section 8: State Management & Routing Orchestration

*⏱️ 3 min read*

#### 1. State vs. Props & Prop Drilling
- **State**: Mutable data owned and managed internally by the component itself.
- **Props**: Immutable data passed down from a parent component to configure the child.
- **Prop Drilling**: The anti-pattern of passing props through multiple nested layers of child components that do not actually need the data, simply to deliver it to a deeply nested descendant. Avoided by using Context API or State Management libraries.

#### 2. State Management Solutions: Redux vs. Zustand vs. MobX vs. Context API
- Choose the state management solution based on app scope and mutation frequencies:

| Feature | Redux Toolkit (RTK) | Zustand | MobX / MobX State Tree | Context API |
| :--- | :--- | :--- | :--- | :--- |
| **Best For** | Massive enterprise-grade apps with high-frequency mutations and complex middleware rules. | Medium-to-large apps. Lightweight, atomic, and extremely fast. | Complex object-graphs, spreadsheet-like reactivity, and OOP architectures. | Small-scale state (e.g., themes, language preferences). |
| **Re-render Scope** | Only selectors re-render. Highly optimized. | Selectors prevent unneeded re-renders. | Fine-grained observer triggers. Only components accessing accessed properties re-render. | All context consumers re-render when the context value object changes. |
| **Boilerplate** | Medium. Configured via slices and store. | Minimal. Defined in a single hook store. | Low to Medium. Managed via observables and actions. | Low. Native to React. |
| **Async Support** | Native async thunks or sagas. | Integrated directly inside custom store actions. | Handled using flow/generators or custom action callbacks. | Handled manually using asynchronous triggers in parent components. |

##### MobX Core Concepts & React Integration
MobX operates on a **Transparent Functional Reactive Programming (TFRP)** model:
- **Observables (`makeObservable`)**: Marks object properties as observable state values. MobX wraps these properties in getters/setters to track property reads and writes.
- **Computed Values (`@computed` / `computed`)**: Values derived from existing state (like filtering a list). They are cached automatically, only re-evaluating if their underlying observable dependencies change.
- **Actions (`action`)**: Functions that modify observable state. In strict mode, MobX enforces that all state mutations must occur inside an action, batching updates for efficiency.
- **Reactions (`autorun`, `reaction`, `when`)**: Side effects that run automatically whenever dependent observables change (like writing state to storage).
- **Observer Wrappers (`observer`)**: High-Order Component wrapping React components. It automatically registers the component to listen to any observables accessed during its render method. If an accessed property updates, the component re-renders; if an unaccessed property updates, rendering is skipped.
- **MobX State Tree (MST)**: A transactional wrapper around MobX that structures stores into a tree of typed nodes (models). MST provides runtime type-checking, snapshots (for time-travel debugging), and out-of-the-box state serialization.

#### 3. Routing, RBAC & Deep Linking in React Navigation
- **Role-Based Access Control (RBAC)**: Manage access limits using conditional navigation stacks:
  ```tsx
  const AppNavigator = () => {
    const { userRole, isAuthenticated } = useAuth();
    return (
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : userRole === 'admin' ? (
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        ) : (
          <Stack.Screen name="UserDashboard" component={UserDashboard} />
        )}
      </Stack.Navigator>
    );
  };
  ```
- **Query Parameters & Dynamic Routing**: Configure deep linking rules:
  ```typescript
  const linking = {
    prefixes: ['myportal://', 'https://myportal.com'],
    config: {
      screens: {
        Details: 'details/:productId', // maps route params to query params
      },
    },
  };
  ```

##### Recoil: Atom & Selector Architecture
Recoil is useful to understand historically, but it is no longer the default recommendation for new enterprise React Native work. In interviews, mention it as an atomic-state pattern and then steer modern production choices toward **Redux Toolkit**, **Zustand**, **Jotai**, **MobX**, or framework-specific server-state tools depending on team needs.
- **Atoms (Source of Truth)**: Dynamic data containers representing units of state. Components can subscribe to atoms. When an atom updates, *only* components subscribed to that specific atom re-render.
- **Selectors (Derived State)**: Pure functions that transform atoms or other selectors. Selectors are cached automatically, only recalculating if their upstream dependencies (atoms/selectors) change. They can also represent asynchronous operations (e.g. fetching records from a server).
- **Comparison to Redux/MobX**:
  - *Redux*: Relies on a single, global store containing all states. Dispatching actions requires middleware rules, selectors, and reducer setups (higher boilerplate, macro-level state).
  - *MobX*: Uses observables and transparent functional reactive tracking. Very low boilerplate, but relies on object mutability and wrapper components (`observer`).
  - *Recoil*: Atomic design built specifically *for* React. Integrates natively with React features like Concurrent Mode, Suspense, and standard hook patterns (e.g., `useRecoilState` which works exactly like `useState`).

---


---
