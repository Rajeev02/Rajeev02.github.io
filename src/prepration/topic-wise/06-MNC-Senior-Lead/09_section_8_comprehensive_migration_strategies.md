
## Page Summary
### Reading Time
`19 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🔄 Section 8: Comprehensive Migration Strategies |
| Difficulty | Senior / Lead |
| Interview Frequency | High |
| Tags | 👨💼 Lead Round Favorite |

---


## 🔄 Section 8: Comprehensive Migration Strategies

*⏱️ 12 min read*

Large-scale migrations are defining moments for senior React Native engineers. MNC interviews heavily test your ability to plan, execute, and de-risk migrations across codebases serving millions of users. This section covers the most common migration paths with step-by-step strategies, risks, and interview-ready responses.

#### 1. JavaScript → TypeScript Migration

##### Why Migrate:
- **Type safety** catches bugs at compile time rather than runtime
- **Better IDE support** with autocomplete, refactoring, and inline documentation
- **Fewer runtime errors** from type mismatches, null/undefined access, and wrong function signatures
- **Codegen requirement**: React Native's New Architecture Codegen requires TypeScript specs for TurboModules and Fabric components

##### Step-by-Step Strategy:

```text
Phase 1: Setup (Week 1)
├── Install typescript, @types/react, @types/react-native
├── Create tsconfig.json with allowJs: true (coexistence mode)
├── Add path aliases (@components, @screens, @services)
└── Configure ESLint with @typescript-eslint parser

Phase 2: Gradual Conversion (Weeks 2-8)
├── Start with utility files (.js → .ts): API clients, helpers, constants
├── Convert shared types/interfaces: API responses, navigation params, store state
├── Convert screen components (.js → .tsx): start with leaf screens, move to navigators
└── Convert hooks and context providers

Phase 3: Strict Mode (Weeks 9-12)
├── Enable strict: true in tsconfig.json
├── Eliminate all 'any' types (search for ': any' and 'as any')
├── Add return types to all exported functions
└── Enable noImplicitAny, strictNullChecks, strictFunctionTypes
```

##### tsconfig.json Setup:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "lib": ["es2021"],
    "allowJs": true,
    "checkJs": true,
    "jsx": "react-native",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@screens/*": ["src/screens/*"],
      "@services/*": ["src/services/*"],
      "@hooks/*": ["src/hooks/*"],
      "@store/*": ["src/store/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "babel.config.js", "metro.config.js"]
}
```

##### Common Challenges:
- **Third-party library types**: Some libraries lack `@types/*` packages — create local `.d.ts` declaration files
- **`any` escape hatch overuse**: Set up ESLint rule `@typescript-eslint/no-explicit-any: "warn"` to track and gradually eliminate
- **Estimated timeline for 50k LOC app**: 8–12 weeks with 2 engineers, or 4–6 sprints of gradual migration alongside feature work

---

#### 2. Redux → Redux Toolkit Migration

##### Why Migrate:
- **Less boilerplate**: `createSlice` eliminates separate action type constants, action creators, and reducers
- **Built-in Immer**: Write "mutating" state updates that are safely converted to immutable operations
- **`createAsyncThunk`**: Standardized async action pattern with pending/fulfilled/rejected states
- **RTK Query**: Powerful data fetching and caching layer that can replace Saga/Thunk API logic entirely

##### Before/After Comparison:

```typescript
// ========== BEFORE: Traditional Redux ==========

// actionTypes.ts
export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// actions.ts
export const fetchUsersRequest = () => ({ type: FETCH_USERS_REQUEST });
export const fetchUsersSuccess = (users: User[]) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersFailure = (error: string) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// reducer.ts
const initialState = { users: [], loading: false, error: null };
export const usersReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

// ========== AFTER: Redux Toolkit ==========

// usersSlice.ts — Everything in one file
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getUsers();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [] as User[],
    loading: false,
    error: null as string | null,
  },
  reducers: {
    clearUsers(state) {
      state.users = [];  // Immer makes this safe
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
```

##### Coexistence Strategy:

```typescript
// store.ts — Old reducers and new slices can coexist
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import usersSlice from './slices/usersSlice';          // New RTK slice
import { legacyAuthReducer } from './reducers/auth';    // Old reducer (not yet migrated)
import { legacyCartReducer } from './reducers/cart';     // Old reducer (not yet migrated)

const rootReducer = combineReducers({
  users: usersSlice,           // ✅ Migrated to RTK
  auth: legacyAuthReducer,     // ⏳ Migrate next sprint
  cart: legacyCartReducer,     // ⏳ Migrate later
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable if legacy actions use non-serializable data
    }),
});
```

##### Migration Steps:
1. Install `@reduxjs/toolkit` — it's fully compatible alongside existing Redux
2. Replace `createStore` with `configureStore` (includes Redux DevTools and thunk middleware by default)
3. Convert reducers to `createSlice` one at a time (old and new coexist in `combineReducers`)
4. Replace manual action creators with slice-generated actions
5. Replace custom async middleware (Saga/Thunk patterns) with `createAsyncThunk`
6. Optionally replace API fetching layer with **RTK Query** for automatic caching and invalidation

---

#### 3. Class Components → Functional Components + Hooks

##### Lifecycle Mapping:

| Class Component | Functional Component + Hooks |
| :--- | :--- |
| `constructor(props)` | Function parameters + `useState` |
| `this.state = {}` | `const [state, setState] = useState()` |
| `componentDidMount` | `useEffect(() => {}, [])` |
| `componentDidUpdate(prevProps)` | `useEffect(() => {}, [deps])` |
| `componentWillUnmount` | `useEffect(() => { return () => cleanup() }, [])` |
| `shouldComponentUpdate` | `React.memo(Component, areEqual)` |
| `this.props` | Function parameters (destructured) |
| `static getDerivedStateFromProps` | `useState` + `useEffect` or derive during render |
| HOC pattern (withAuth, withTheme) | Custom hooks (`useAuth`, `useTheme`) |

##### Before/After Comparison:

```typescript
// ========== BEFORE: Class Component ==========
class UserProfile extends React.Component<Props, State> {
  state = { user: null, loading: true };
  
  componentDidMount() {
    this.fetchUser();
    this.analyticsSubscription = Analytics.subscribe(this.handleEvent);
  }
  
  componentDidUpdate(prevProps: Props) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }
  
  componentWillUnmount() {
    this.analyticsSubscription?.unsubscribe();
  }
  
  fetchUser = async () => {
    this.setState({ loading: true });
    const user = await api.getUser(this.props.userId);
    this.setState({ user, loading: false });
  };
  
  render() {
    if (this.state.loading) return <ActivityIndicator />;
    return <Text>{this.state.user?.name}</Text>;
  }
}

// ========== AFTER: Functional Component + Hooks ==========
const UserProfile: React.FC<Props> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let cancelled = false;
    const fetchUser = async () => {
      setLoading(true);
      const data = await api.getUser(userId);
      if (!cancelled) {
        setUser(data);
        setLoading(false);
      }
    };
    fetchUser();
    return () => { cancelled = true; };
  }, [userId]); // Re-fetches when userId changes (componentDidUpdate)
  
  useEffect(() => {
    const subscription = Analytics.subscribe(handleEvent);
    return () => subscription.unsubscribe(); // Cleanup (componentWillUnmount)
  }, []);
  
  if (loading) return <ActivityIndicator />;
  return <Text>{user?.name}</Text>;
};
```

##### Common Pitfalls:
- **Stale closures**: Callbacks capture old state values — use `useRef` or functional `setState` updates
- **Missing dependencies**: ESLint `react-hooks/exhaustive-deps` rule must be enabled and respected
- **Over-using useEffect**: Not every piece of logic needs `useEffect` — derive state during render when possible

---

#### 4. React Navigation v4/v5 → v6/v7 Migration

##### Key Breaking Changes:

| Change | v5 | v6/v7 |
| :--- | :--- | :--- |
| **Default Stack** | `createStackNavigator` (JS-based) | `createNativeStackNavigator` (native) |
| **Screen Options** | `options={{ headerShown: true }}` | Same API, but `NativeStackNavigationOptions` type |
| **Tab Bar** | `tabBarOptions={{ activeTintColor }}` | Moved into `screenOptions` directly |
| **Drawer** | `drawerContentOptions={{ ... }}` | Moved into `screenOptions` directly |
| **Params** | `navigation.navigate('Screen', { id })` | Same, but stricter TypeScript types recommended |
| **v7 Static API** | N/A | Optional `createStaticNavigation()` for type-safe config |

##### Migration Steps:

```typescript
// Step 1: Update packages
// npm install @react-navigation/native @react-navigation/native-stack

// Step 2: Replace Stack Navigator
// BEFORE (v5)
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

// AFTER (v6)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator<RootStackParamList>();

// Step 3: Update screen options
// BEFORE (v5)
<Tab.Navigator tabBarOptions={{ activeTintColor: 'blue', style: { height: 60 } }}>

// AFTER (v6)
<Tab.Navigator screenOptions={{
  tabBarActiveTintColor: 'blue',
  tabBarStyle: { height: 60 },
}}>

// Step 4: Update TypeScript types
type RootStackParamList = {
  Home: undefined;
  Profile: { userId: string };
  Settings: { section?: string };
};

// Typed navigation hook
const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
```

---

#### 5. Native Modules → TurboModules Migration

##### Why Migrate:
- **Lazy loading**: TurboModules are loaded on first access, not at app startup
- **Type safety**: Codegen generates C++ interfaces from TypeScript specs
- **Better performance**: Direct JSI communication replaces async JSON bridge

##### Migration Steps:

```typescript
// Step 1: Create TypeScript spec file
// src/specs/NativeDeviceInfo.ts
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getDeviceModel(): string;           // Synchronous
  getBatteryLevel(): Promise<number>; // Asynchronous
  getConstants(): {
    appVersion: string;
    buildNumber: string;
  };
}

export default TurboModuleRegistry.getEnforcing<Spec>('DeviceInfo');
```

```kotlin
// Step 2: Implement native spec (Android — Kotlin)
// Generated interface: NativeDeviceInfoSpec
class DeviceInfoModule(reactContext: ReactApplicationContext) :
    NativeDeviceInfoSpec(reactContext) {

    override fun getName() = "DeviceInfo"

    override fun getDeviceModel(): String = Build.MODEL

    override fun getBatteryLevel(promise: Promise) {
        val batteryManager = reactApplicationContext
            .getSystemService(Context.BATTERY_SERVICE) as BatteryManager
        val level = batteryManager.getIntProperty(
            BatteryManager.BATTERY_PROPERTY_CAPACITY
        )
        promise.resolve(level.toDouble())
    }

    override fun getTypedExportedConstants(): MutableMap<String, Any> {
        return mutableMapOf(
            "appVersion" to BuildConfig.VERSION_NAME,
            "buildNumber" to BuildConfig.VERSION_CODE.toString()
        )
    }
}
```

```text
Step 3: Run Codegen
  cd android && ./gradlew generateCodegenArtifactsFromSchema

Step 4: Remove old bridge registration
  - Remove @ReactModule annotation if using old pattern
  - Remove manual ReactPackage registration
  - Ensure TurboReactPackage or auto-linking handles registration

Step 5: Test with New Architecture enabled
  - android/gradle.properties: newArchEnabled=true
  - ios/Podfile: ENV['RCT_NEW_ARCH_ENABLED'] = '1'
  - Verify module loads lazily and functions return correct types
```

##### Backward Compatibility:
During migration, use the **interop layer** — TurboModules fall back to bridge behavior when New Architecture is disabled. The same TypeScript spec can work with both architectures, allowing gradual rollout.

---

#### 6. Bridge → JSI Communication Migration

##### When to Migrate:
- **Performance-sensitive native calls** that happen frequently (e.g., sensor data streaming, real-time audio processing)
- **Synchronous data access** needed (bridge is always async with JSON serialization overhead)

##### How JSI Differs from Bridge:

| Aspect | Bridge | JSI |
| :--- | :--- | :--- |
| **Communication** | Async message queue | Synchronous function calls |
| **Serialization** | JSON serialization/deserialization | Zero-copy, direct memory access |
| **Threading** | Messages queued between threads | Runs on JS thread (or any thread with runtime access) |
| **Latency** | Higher (queue + serialize + deserialize) | Near-zero overhead |
| **Complexity** | Simple (JavaScript ↔ JSON ↔ Native) | Requires C++ host objects |

##### JSI Host Object Example:

```cpp
// DeviceInfoHostObject.cpp
##include <jsi/jsi.h>

using namespace facebook::jsi;

class DeviceInfoHostObject : public HostObject {
public:
    Value get(Runtime &rt, const PropNameID &name) override {
        auto propName = name.utf8(rt);
        
        if (propName == "getDeviceModel") {
            return Function::createFromHostFunction(
                rt, name, 0,
                [](Runtime &rt, const Value &, const Value *, size_t) -> Value {
                    // Direct native call — no bridge overhead
                    return String::createFromUtf8(rt, getDeviceModelNative());
                }
            );
        }
        return Value::undefined();
    }
};

// Install on the JS runtime
void install(Runtime &jsiRuntime) {
    auto hostObject = std::make_shared<DeviceInfoHostObject>();
    auto object = Object::createFromHostObject(jsiRuntime, hostObject);
    jsiRuntime.global().setProperty(jsiRuntime, "DeviceInfo", std::move(object));
}
```

##### Considerations:
- **Thread safety**: JSI calls execute on the JS thread by default. If native work is heavy, dispatch to a background thread and use a callback/Promise to return results.
- **Error handling**: C++ exceptions must be caught and converted to JS errors — uncaught C++ exceptions crash the app.
- **Debugging**: JSI objects don't appear in Chrome DevTools (use Flipper or Hermes debugger).

---

#### 7. Large-Scale Production Migration (Millions of Users)

For apps with millions of active users, a migration failure can cost significant revenue and user trust. Production migrations require rigorous planning beyond code changes.

##### Phase Planning:

```text
Phase 1: Internal (Week 1-2)
├── Deploy migrated build to internal team (dogfooding)
├── Run automated test suites (unit, integration, E2E)
├── Verify crash-free rate ≥ 99.5%
└── Baseline performance metrics

Phase 2: Alpha (Week 3)
├── Release to 100-500 volunteer testers
├── Monitor Sentry/Crashlytics for new crash patterns
├── Collect qualitative feedback
└── Fix critical issues before beta

Phase 3: Beta (Week 4-5)
├── Release to 5-10% of production users via staged rollout
├── A/B test: old vs new code paths (feature flags)
├── Compare metrics: crash rate, ANR rate, startup time, engagement
└── Hold for 1 week minimum before expanding

Phase 4: Staged Production (Week 6-8)
├── 10% → 25% → 50% → 100% rollout
├── Each stage: monitor for 48 hours minimum
├── Automated rollback trigger: if crash rate increases > 0.5%
└── Full rollout only after all metrics are green
```

##### Feature Flags for A/B Testing:

```typescript
// Feature flag to toggle between old and new code paths
import { useFeatureFlag } from '@services/featureFlags';

const PaymentScreen: React.FC = () => {
  const useNewPaymentFlow = useFeatureFlag('new_payment_flow');

  if (useNewPaymentFlow) {
    return <NewPaymentFlow />;   // Migrated implementation
  }
  return <LegacyPaymentFlow />;  // Old implementation (fallback)
};
```

##### Rollback Plan:

| Rollback Type | Trigger | Recovery Time | Scope |
| :--- | :--- | :--- | :--- |
| **OTA Rollback** | JS-only regression | Minutes | Roll back OTA bundle to last stable version |
| **Store Rollback** | Native crash spike | Hours–Days | Submit hotfix to App Store / Play Store |
| **Server-Side Kill Switch** | Critical security issue | Seconds | Feature flag disables new code path remotely |
| **Phased Rollout Halt** | Metrics degradation | Immediate | Stop percentage rollout, revert staged users |

---

#### Migration Checklists

##### Performance Validation Checklist:

| Metric | Pre-Migration Baseline | Post-Migration Target | Tool |
| :--- | :--- | :--- | :--- |
| App startup time (cold) | Measured | ≤ baseline + 5% | Flipper, Perfetto |
| App startup time (warm) | Measured | ≤ baseline | Flipper |
| JS bundle size | Measured | ≤ baseline + 2% | Metro bundler stats |
| Memory usage (idle) | Measured | ≤ baseline | Xcode Instruments / Android Profiler |
| Frame rate (key screens) | Measured | ≥ 58 FPS | Perf Monitor overlay |
| API response handling | Measured | ≤ baseline | Network profiler |

##### Testing Checklist:

| Test Category | Items | Status |
| :--- | :--- | :--- |
| **Smoke Tests** | App launch, login, main navigation, logout | ☐ |
| **Critical Flows** | Payment, registration, push notifications, deep links | ☐ |
| **Platform-Specific** | iOS permissions, Android back button, notch/cutout handling | ☐ |
| **Edge Cases** | Offline mode, low memory, interrupted network, app backgrounding | ☐ |
| **Regression** | All existing E2E tests pass | ☐ |
| **Accessibility** | Screen reader, dynamic font sizes, color contrast | ☐ |

##### Release Checklist:

| Step | Description | Status |
| :--- | :--- | :--- |
| Source maps uploaded | Sentry/Crashlytics can symbolicate JS + native crashes | ☐ |
| ProGuard mapping uploaded | Android native crashes are readable | ☐ |
| dSYMs uploaded | iOS native crashes are readable | ☐ |
| Feature flags configured | New features behind flags, kill switch ready | ☐ |
| Rollback plan documented | OTA, store, and server-side rollback steps written | ☐ |
| Staged rollout configured | Play Console / App Store Connect phased release enabled | ☐ |
| Monitoring dashboards ready | Crash rate, ANR rate, startup time, engagement metrics | ☐ |

##### Rollback Readiness Checklist:

| Readiness Item | Verified |
| :--- | :--- |
| Previous stable OTA bundle tagged and available | ☐ |
| Previous store binary archived and downloadable | ☐ |
| Server-side feature flags tested (on/off toggle) | ☐ |
| Rollback runbook reviewed by on-call engineer | ☐ |
| Communication template ready (for stakeholders, support team) | ☐ |
| Post-rollback smoke test plan prepared | ☐ |

---

#### Interview Q&A for Migration Strategies

##### Interview Scenario:
> *"How would you migrate a legacy RN app with 5M users to New Architecture?"*

- **Strategic Response**:
  "For a 5M-user app, I'd never do a big-bang migration. My approach:
  1. **Audit Phase**: Identify all native modules and third-party libraries. Check each for New Architecture compatibility using the React Native Directory and library changelogs.
  2. **Enable Hermes First**: If not already using Hermes, migrate to Hermes separately — this is a prerequisite and should be validated independently.
  3. **Interop Layer Testing**: Enable New Architecture in a development build. The interop layer lets old bridge modules work alongside TurboModules. Run the full E2E test suite to identify breaking modules.
  4. **Migrate Critical Modules**: Convert the highest-traffic native modules to TurboModules with TypeScript specs first. Keep low-usage modules on the interop layer temporarily.
  5. **Staged Rollout**: Internal → Alpha (500 users) → Beta (5%) → watch crash rates and performance for 1 week at each stage → expand to 100%.
  6. **Rollback Safety**: Feature flags control whether specific TurboModules or Fabric components are active. Server-side kill switch can revert to bridge behavior instantly."

##### Interview Scenario:
> *"How do you evaluate migration risks for a production app?"*

- **Strategic Response**:
  "I use a structured risk assessment matrix:
  - **Dependency Risk**: How many third-party libraries are affected? Are they actively maintained? Do they support the target architecture?
  - **Surface Area Risk**: How much of the codebase changes? A navigation library migration touches every screen; a state management migration touches every connected component.
  - **User Impact Risk**: What's the blast radius if something fails? Payment flows are high-risk; settings screens are low-risk.
  - **Rollback Complexity**: Can we roll back with OTA (minutes) or do we need a store release (days)?
  - **Testing Coverage**: Do we have E2E tests covering the migrated flows? If coverage is low, I invest in adding tests before migrating.
  Each risk is scored Low/Medium/High, and I prioritize migrations with clear value and manageable risk profiles."

##### Interview Scenario:
> *"How do you ensure zero downtime during a major migration?"*

- **Strategic Response**:
  "True zero downtime in mobile is achieved through:
  1. **Feature Flags**: Old and new implementations coexist. The flag determines which path runs. Switch is instant and server-controlled.
  2. **Backward-Compatible APIs**: If the migration involves API changes, the backend supports both old and new contracts simultaneously during the transition window.
  3. **Phased Rollout**: Use Play Store staged rollout (1% → 5% → 20% → 100%) and App Store phased release. Never push to 100% on day one.
  4. **OTA Updates**: For JS-only changes, push fixes in minutes without waiting for store review.
  5. **Blue-Green Deployment**: For backend changes, run both old and new API versions. Route traffic based on app version headers.
  The key insight is that 'zero downtime' means zero downtime *for users* — some users may be on the old version while others are on the new version, and both must work correctly."

##### Interview Scenario:
> *"How do you migrate from Redux Saga to Redux Toolkit?"*

- **Strategic Response**:
  "Redux Saga to RTK migration is best done incrementally:
  1. **Install RTK** alongside existing Saga middleware — they coexist in the same store.
  2. **Identify isolated sagas**: Start with sagas that handle simple API calls (fetch, post, put). These map directly to `createAsyncThunk`.
  3. **Convert one saga at a time**: Replace the saga watcher + worker with a `createAsyncThunk` + `extraReducers` in a new slice. Remove the saga from the root saga.
  4. **Handle complex sagas last**: Sagas with `takeLatest`, `race`, `channel`, or `fork` patterns need careful conversion. Some may use RTK listener middleware (`createListenerMiddleware`) instead of `createAsyncThunk`.
  5. **Replace API layer with RTK Query** (optional): For CRUD operations, RTK Query eliminates both sagas and manual thunks entirely — it auto-generates hooks with loading/error states and manages caching.
  6. **Remove redux-saga** only after all sagas are migrated and tested."

##### Interview Scenario:
> *"How do you handle backward compatibility during a phased migration?"*

- **Strategic Response**:
  "Backward compatibility is the foundation of safe phased migrations:
  - **Code Level**: Use adapter patterns — wrap new implementations behind the same interface as old ones. Consumers don't need to change until they're ready.
  - **API Level**: Version APIs (v1/v2) or use feature negotiation headers. The server handles both old and new request formats.
  - **Storage Level**: When changing data schemas (e.g., migrating from AsyncStorage to MMKV or changing Room database schemas), write migration scripts that transform old data formats to new ones on first launch.
  - **Navigation Level**: During navigation library migration, both old and new navigators can coexist using nested navigators — migrate one stack at a time.
  - **Feature Flags**: Toggle new behavior per-user. If a user experiences issues, disable the flag for that user segment while you investigate."

##### Interview Scenario:
> *"What's your rollback strategy if a migration causes production issues?"*

- **Strategic Response**:
  "My rollback strategy has three tiers:
  1. **Tier 1 — Immediate (seconds)**: Server-side feature flag disables the new code path. All users fall back to the old implementation. This is my first line of defense and requires no app update.
  2. **Tier 2 — Fast (minutes)**: Push an OTA update that reverts the JS bundle to the last stable version. This works for JavaScript-only regressions and doesn't require store review.
  3. **Tier 3 — Store Release (hours–days)**: If the issue is in native code, submit an expedited hotfix build to App Store and Play Store. Use Play Store's staged rollout halt to stop the broken version from reaching more users. For App Store, request expedited review.
  I always prepare all three tiers before any production migration begins. The rollback runbook is reviewed by the on-call team, and we do a rollback drill in staging before the production rollout."

---


---
