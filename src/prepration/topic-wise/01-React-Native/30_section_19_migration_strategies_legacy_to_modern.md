
## Page Summary
### Reading Time
`4 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🚀 Section 19: Migration Strategies (Legacy to Modern) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 🚀 Section 19: Migration Strategies (Legacy to Modern)

*⏱️ 2 min read*

Migrating large-scale applications (millions of users) requires meticulous planning to avoid breaking production. Senior/Architect interviews heavily index on your ability to de-risk these migrations.

#### 1. Legacy Architecture → New Architecture (JSI/Fabric/TurboModules)
**Q: How do you plan and execute a migration from the legacy bridge to the New Architecture?**
- **Audit & Dependency Matrix**: Inventory all 3rd-party native libraries. Verify which ones support TurboModules/Fabric.
- **Hermes Adoption**: Before anything else, migrate the JS engine to Hermes and validate bytecode execution and crash rates.
- **Enable New Architecture (Phased)**: Use `newArchEnabled=true` on a dedicated branch. Use the React Native Upgrade Helper for incremental updates.
- **Backward Compatibility**: For internal native modules, adopt a hybrid approach. Keep the legacy `RCTBridgeModule` while implementing the C++ JSI specs via Codegen so the module works on both architectures during the transition.
- **Risk Mitigation**: Roll out via A/B testing (Feature Flags). If the New Architecture causes a spike in ANRs or crashes, instantly toggle back to the legacy bundle without requiring an App Store review.

#### 2. JavaScript → TypeScript Migration
**Q: How would you migrate a massive legacy JS codebase to TS?**
- **Step 1: Configure `tsconfig.json`**: Enable `allowJs: true` and `strict: false`. This allows TS and JS to coexist.
- **Step 2: Tooling**: Add `@types/react-native`, `@types/react`, and configure ESLint for TS.
- **Step 3: Bottom-Up Migration**: Start by typing the lowest-level modules (utility functions, constants, API payload models).
- **Step 4: Component Typing**: Migrate reusable UI components (Buttons, Inputs). Use `interface` for component props.
- **Step 5: Enforce strictness**: Gradually enable `strictNullChecks` and `noImplicitAny`, directory by directory. Enforce a rule that all *new* files must be `.tsx`.

#### 3. Redux → Redux Toolkit (RTK) Migration
**Q: Redux is slow and boilerplate-heavy in our app. How do we move to RTK?**
- RTK is 100% backward compatible with legacy Redux. You do not need to rewrite the entire store at once.
- **Store Setup**: Replace `createStore` with `configureStore`. This automatically wires up Redux Thunk and the Redux DevTools.
- **Incremental Slices**: For any new feature, use `createSlice` instead of traditional reducers/actions/constants.
- **RTK Query**: Gradually replace manual `useEffect` + `fetch` data fetching with RTK Query for automatic caching and deduplication.

#### 4. Class Components → Functional Components + Hooks
**Q: We have hundreds of Class Components. Should we rewrite them?**
- **A**: No, a full rewrite provides no immediate business value and introduces regression risks.
- **Strategy**: 
  - All *new* components must use Hooks.
  - If a legacy Class Component requires significant new features or a bug fix, refactor it to a Functional Component during that sprint.
  - **Lifecycle Mapping**: `componentDidMount` → `useEffect(..., [])`. `componentWillUnmount` → cleanup return in `useEffect`. `shouldComponentUpdate` → `React.memo`.

#### 5. Old Navigation (v4/v5) → React Navigation v7
- **v4 to v5+**: Moving from static route definitions to dynamic component-based routing (`<Stack.Navigator>`).
- **Migration Plan**: It is often impossible to run two major versions of React Navigation simultaneously. Create a parallel branch. Recreate the Root Navigator, then systematically map old `navigation.navigate('Screen', { params })` calls. Use TypeScript for strict route param typing to catch broken links during compilation.

#### 6. Large-Scale Production Migration Checklist
- **Feature Flags**: Gate the new implementation behind LaunchDarkly or Firebase Remote Config.
- **Phased Rollout**: 1% → 5% → 10% → 50% → 100%. Monitor analytics at each stage.
- **Rollback Strategy**: Ensure the legacy code is not deleted until 100% rollout is stable for at least 2 weeks.
- **Performance Validation**: Benchmark App Startup Time (TTI), Memory Usage (MB), and Frame Drops (FPS) in CI/CD (using tools like Reassure or Flashlight) before merging the migration PR.


---


---
