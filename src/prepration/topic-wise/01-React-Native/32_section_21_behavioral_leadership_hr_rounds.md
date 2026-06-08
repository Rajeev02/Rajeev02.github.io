
## Page Summary
### Reading Time
`15 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🤝 Section 21: Behavioral, Leadership & HR Rounds |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 🤝 Section 21: Behavioral, Leadership & HR Rounds

*⏱️ 2 min read*

Senior and Lead roles are evaluated heavily on soft skills, mentoring, and conflict resolution. Always use the **STAR Method** (Situation, Task, Action, Result) for these questions.

#### 1. Conflict Resolution & Code Review Culture
**Q: You disagree with a senior engineer on an architectural decision. How do you handle it?**
- **Action**: Take the discussion offline or to a synchronous call rather than arguing in PR comments. Present objective data (e.g., performance benchmarks, bundle size impacts, maintenance overhead) rather than opinions.
- **Result**: "We created a quick PoC for both approaches. The data showed my approach was 20% faster, but their approach was easier to maintain. We compromised by documenting the trade-offs and choosing the maintainable route since it wasn't a critical hot-path."

**Q: How do you ensure high code quality across a large mobile team?**
- Implement strict CI/CD gates (Husky pre-commit hooks, ESLint, Prettier, TypeScript strict mode).
- Require at least 2 approvals for PRs.
- Establish a "Mobile Guild" that meets bi-weekly to discuss patterns, share knowledge, and update internal documentation.

#### 2. Mentoring & Team Leadership
**Q: Tell me about a time you mentored a junior developer.**
- **Action**: Instead of giving them the answers, I pair-programmed with them. I assigned them to a complex feature but broke it down into 5 small, manageable PRs. I reviewed each PR rigorously but supportively.
- **Result**: Within 3 months, they were independently delivering features and eventually mentored the next new hire.

#### 3. Client & Stakeholder Management (MNC Specific)
**Q: The client wants a feature delivered in 2 weeks, but your team estimates it will take 4 weeks. What do you do?**
- **Action**: Never say a flat "No". Negotiate the scope. Break the feature down into "Must-have", "Should-have", and "Could-have". Offer to deliver the MVP (Must-have) in 2 weeks, and phase the rest for the next sprint.
- **Result**: The client gets value delivered on their timeline without burning out the engineering team.

#### 4. Agile & Scrum Methodology
- **Story Points**: Used for complexity and effort, not hours.
- **Ceremonies**: Sprint Planning, Daily Standup, Sprint Review (Demo), Sprint Retrospective.
- **Lead Role**: Removing blockers for the team, protecting the team from scope creep during the sprint, and ensuring technical debt tickets are prioritized alongside product features (typically an 80/20 split).

#### 5. Salary Negotiation Strategy
- **Never give the first number**: "I'm currently focused on finding a role that is the right fit. Once we establish mutual interest, I'm sure we can agree on a competitive number based on market rates for a Senior Architect."
- **Counter-offers**: If you have a competing offer, disclose the existence of it, but not necessarily the company name. "I have another offer on the table for X, but I prefer your tech stack and culture. If you can match X, I will sign today."


---

## React Native: Advanced Topics & Architecture

### 1. Deep Linking and Universal Links
**Question:** How does Deep Linking work in React Native? What is the difference between Deep Links and Universal Links?

**Answer:**
- **Deep Links** use a custom URI scheme (e.g., `myapp://profile/123`). If the app isn't installed, the OS shows an error.
- **Universal Links (iOS) / App Links (Android)** use standard HTTP URLs (e.g., `https://myapp.com/profile/123`). If the app is installed, the OS intercepts the URL and opens the app. If not, it falls back to the website.
**React Navigation Implementation:**
You pass a `linking` configuration object to the `NavigationContainer`. It maps URL paths to screen names and parses route parameters.

### 2. Offline-First Architecture
**Question:** How do you build an app that works seamlessly offline?

**Answer:**
Offline-first apps store data locally and sync with the backend when the network is restored.
1. **Local Database:** Use robust databases like WatermelonDB, Realm, or SQLite instead of AsyncStorage for complex relational data.
2. **State Persistence:** Use `redux-persist` to save the global state to local storage on exit and rehydrate it on launch.
3. **Queueing Requests:** Use libraries like `react-native-offline` or Redux Offline to intercept API requests when offline, queue them, and dispatch them automatically once the connection is back.

### 3. Accessibility (a11y)
**Question:** How do you make a React Native app accessible to users with disabilities?

**Answer:**
- **Screen Readers:** Use `accessible={true}` on views you want VoiceOver/TalkBack to read.
- **Roles & Labels:** Provide `accessibilityRole` (e.g., 'button', 'header') and `accessibilityLabel` to describe what the element does.
- **Dynamic Type:** Do not hardcode font sizes or restrict `numberOfLines` tightly; use relative scaling (`allowFontScaling={true}`).

### 4. Reducing App Size
**Question:** What strategies do you use to reduce the final App Size?

**Answer:**
1. **Android App Bundles (.aab):** Instead of building a fat `.apk` containing resources for all device densities and architectures, build an `.aab`. The Google Play Store will generate an optimized APK specific to the user's device.
2. **Hermes:** Enabled by default in newer versions, it shrinks the JavaScript payload.
3. **Optimize Assets:** Compress images (TinyPNG) or use `.webp` / SVG icons instead of high-res `.png` files.
4. **ProGuard / R8:** Strip out unused Java/Kotlin code and third-party SDK bloat.

### 5. Push Notifications
**Question:** Describe the architecture of Push Notifications.

**Answer:**
1. **Device Registration:** On app launch, the app asks APNs (Apple) or FCM (Firebase/Android) for a unique device token.
2. **Backend Storage:** The app sends this token to your Node.js backend to save in the database.
3. **Trigger:** An event on the backend triggers a notification. The backend sends a request to APNs/FCM using the stored token.
4. **Delivery:** APNs/FCM delivers the notification to the user's device. React Native libraries like `react-native-firebase/messaging` or `react-native-push-notification` handle the foreground/background UI display.

---

## React Native: CI/CD Pipelines

### 1. What is CI/CD?
**Question:** Explain CI and CD in the context of a React Native app.

**Answer:**
- **Continuous Integration (CI):** Automating the process of linting, type-checking (TypeScript), running unit tests (Jest), and building the app every time code is pushed to a repository.
- **Continuous Deployment/Delivery (CD):** Automating the distribution of the app to QA testers (via App Center / TestFlight / Firebase App Distribution) and eventually to production (App Store / Google Play).

### 2. Fastlane
**Question:** What is Fastlane and why is it essential for Mobile CI/CD?

**Answer:**
Fastlane is an open-source tool written in Ruby that automates tedious mobile development tasks.
With a `Fastfile`, you can script commands to:
- Automatically increment build numbers.
- Generate and manage Provisioning Profiles & Certificates (`fastlane match`).
- Capture automated screenshots for the app store.
- Build the `.ipa` or `.aab`.
- Upload directly to TestFlight or Google Play Console.

### 3. GitHub Actions / Bitrise Workflow
**Question:** Can you describe a standard CI/CD workflow for a React Native App?

**Answer:**
1. **Push to `main` branch:** Triggers the pipeline.
2. **Setup:** Install Node, Ruby, and Java SDKs.
3. **Install Dependencies:** `npm install` & `pod install`.
4. **Code Quality:** Run `npm run lint` and `npm run test`.
5. **Build Android:** Run Gradle commands or Fastlane lane to build `.aab`.
6. **Build iOS:** Run Xcodebuild or Fastlane lane to build `.ipa`.
7. **Deploy:** Upload binaries to App Center (for QA) or App Store / Play Store tracks.

### 4. CodePush (Over The Air Updates)
**Question:** What is CodePush and how does it work?

**Answer:**
App Center CodePush allows you to push updates to users instantly without going through the App Store / Google Play review process.
It works by downloading a new JavaScript bundle and asset files `index.android.bundle` in the background and replacing the old ones.
*Limitation:* It cannot be used if you update native code (Java/Swift) or add new native modules. You must do a full store release for native changes.

### 5. Handling iOS Certificates
**Question:** Code signing on iOS is notoriously difficult in CI. How do you handle it?

**Answer:**
The industry standard is **Fastlane Match**. It creates all required certificates and provisioning profiles and stores them in a private Git repository or cloud storage. During the CI pipeline, Fastlane downloads these certificates and installs them in the CI runner's keychain automatically, ensuring a deterministic and error-free signing process.

---

## React Native: Performance, Optimization & Memory Leaks

### 1. Finding & Fixing Memory Leaks
**Question:** What are the most common causes of memory leaks in React Native and how do you fix them?

**Answer:**
A memory leak occurs when objects are no longer needed but remain in memory because they are still referenced.
**Causes & Fixes:**
1. **Unmounted Components:** Running `setState` after a component unmounts.
   *Fix:* Cancel API calls and flag `isMounted = false` in the `useEffect` cleanup.
2. **Event Listeners:** Forgetting to remove hardware back button or AppState listeners.
   *Fix:* Call `.remove()` inside the cleanup function.
3. **Timers & Intervals:** Forgetting to clear `setInterval`.
   *Fix:* Call `clearInterval(id)` on unmount.
4. **Closures:** Keeping references to large objects inside closures.

### 2. FlatList Optimization
**Question:** Your FlatList with 1000 items is lagging. How do you optimize it?

**Answer:**
1. **`keyExtractor`:** Ensure a unique key is provided.
2. **`getItemLayout`:** If items have fixed height, providing this skips dynamic measurement calculations.
3. **`initialNumToRender`:** Set this low (e.g., 10) so the initial load is fast.
4. **`maxToRenderPerBatch`:** Limits how many items are rendered per scroll chunk.
5. **`windowSize`:** Controls how many off-screen items are kept in memory (default is 21, drop it to 5-10).
6. **`removeClippedSubviews={true}`:** Unmounts components that are far off-screen.
7. Use **`React.memo`** for the `renderItem` component to prevent unnecessary re-renders.

### 3. Hermes Engine
**Question:** What is Hermes and why does it improve performance?

**Answer:**
Hermes is a JavaScript engine optimized specifically for React Native.
- It **Ahead-Of-Time (AOT)** compiles JavaScript into bytecode during the build process, instead of Just-In-Time (JIT) compiling on the device.
- This results in significantly faster App Launch times (TTI - Time to Interactive), lower memory usage, and smaller app sizes.

### 4. Rendering Optimization
**Question:** Explain `React.memo`, `useMemo`, and `useCallback`.

**Answer:**
- **React.memo:** Wraps a component. It only re-renders the component if its props change (shallow comparison).
- **useMemo:** Caches the *result* of an expensive calculation between renders.
- **useCallback:** Caches the *reference* to a function between renders. Crucial when passing functions down to a child component wrapped in `React.memo`.

### 5. Image Optimization
**Question:** How do you handle heavy image rendering?

**Answer:**
The default `<Image>` component does not cache aggressively. For production apps with heavy image feeds, use `react-native-fast-image`. It handles aggressive caching, memory management, and prioritizing image loading.

---

## React Native: Security Best Practices

### 1. Secure Storage
**Question:** Why shouldn't you use `AsyncStorage` for sensitive data like Auth Tokens?

**Answer:**
`AsyncStorage` stores data in plain text. Any malicious app or physical access to an unencrypted device can read this data.
**Fix:** Use secure native storage solutions that utilize iOS Keychain and Android Keystore.
- `react-native-keychain`
- `react-native-encrypted-storage`

### 2. SSL Pinning
**Question:** What is SSL Pinning and how do you implement it?

**Answer:**
SSL Pinning prevents Man-In-The-Middle (MITM) attacks by hardcoding the server's public key or SSL certificate inside the app. If the server's certificate doesn't match the pinned certificate, the app refuses the connection.
**Implementation:** You can use libraries like `react-native-ssl-pinning` or configure it natively via `network_security_config.xml` (Android) and `Info.plist` (iOS).

### 3. Reverse Engineering & Obfuscation
**Question:** How do you protect your React Native code from reverse engineering?

**Answer:**
Since React Native bundles JS code, attackers can easily unpack the `.apk` or `.ipa` and read the `index.android.bundle`.
- **Hermes:** Enabling Hermes compiles JS into bytecode, which is significantly harder to reverse engineer than plain JS.
- **ProGuard / R8:** For Android, enable ProGuard in `build.gradle` to shrink and obfuscate Java/Kotlin native code.
- **DexGuard:** For enterprise Android apps, use DexGuard for advanced string encryption and anti-tampering.

### 4. Jailbreak / Root Detection
**Question:** Should banking apps run on rooted devices? How do you prevent it?

**Answer:**
Running on a rooted/jailbroken device bypasses OS sandboxing, allowing malware to read the app's memory.
Use libraries like `jail-monkey` or `react-native-device-info` to detect root status and gracefully exit or block sensitive operations.

### 5. API Key Security
**Question:** Where should you store third-party API keys?

**Answer:**
Never hardcode API keys in the JS bundle. Use libraries like `react-native-config` to load environment variables natively.
*However, note that ANY secret shipped in the mobile client can be extracted.* The most secure way is to proxy third-party API calls through your own backend.

---

## React Native: State Management & Redux

### 1. Redux Lifecycle
**Question:** Explain the lifecycle of Redux.

**Answer:**
1. **Action:** A simple JS object containing a `type` and `payload`. Dispatched by the UI.
2. **Middleware:** Intercepts the action before it reaches the reducer (e.g., Redux Thunk or Saga for async API calls).
3. **Reducer:** A pure function that takes the current state and the action, and returns a new updated state.
4. **Store:** The global object holding the state.
5. **View:** Components subscribe to the Store using `useSelector`. When the state changes, components re-render.

### 2. Redux Issues and Fixes
**Question:** What are the common issues with legacy Redux and how do you fix them?

**Answer:**
- **Issue:** Boilerplate code (creating actions, types, reducers in separate files).
  **Fix:** Use **Redux Toolkit (RTK)** which bundles everything into `createSlice`.
- **Issue:** Performance drops due to massive state re-renders.
  **Fix:** Ensure `useSelector` extracts only the specific nested data needed, not the whole state object. Use `reselect` for memoized selectors.
- **Issue:** State mutation bugs.
  **Fix:** RTK uses `Immer.js` under the hood, which allows writing "mutating" code that is safely translated into immutable updates.

### 3. Redux Toolkit (RTK) vs Context API
**Question:** When would you use Context API instead of Redux Toolkit?

**Answer:**
- **Context API** is built-in and great for passing down static or infrequently updated global data (Theme, Localization, User Auth). However, every time context updates, *all* consuming components re-render.
- **Redux Toolkit** is designed for complex, frequently updating state (like E-commerce carts, realtime chat feeds). It prevents unnecessary re-renders via optimized selectors.

### 4. Async Logic in Redux
**Question:** How do you handle asynchronous logic (API calls) in Redux Toolkit?

**Answer:**
Using `createAsyncThunk`. It automatically generates three lifecycle actions: `pending`, `fulfilled`, and `rejected`.

```javascript
export const fetchUser = createAsyncThunk('user/fetchById', async (userId) => {
  const response = await fetch(`https://api.example.com/user/${userId}`);
  return response.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => { state.status = 'failed'; });
  },
});
```

### 5. Zustand as an Alternative
**Question:** What is Zustand and why is it gaining popularity over Redux?

**Answer:**
Zustand is a minimalistic, fast state management library.
- It requires zero boilerplate (no context providers, no reducers, no dispatch).
- Uses hooks directly.
- Resolves the "zombie child" and React Context re-render issues out of the box.

---

## React Native: Testing & TDD

### 1. Test-Driven Development (TDD)
**Question:** What is TDD and how do you apply it in React Native?

**Answer:**
TDD is a software development process relying on a very short development cycle:
1. **Red:** Write a failing test for a new feature.
2. **Green:** Write the minimum code required to pass the test.
3. **Refactor:** Clean up the code while ensuring tests still pass.

In React Native, this means writing your Jest/RNTL tests for a component's expected output before you even write the component logic.

### 2. Unit Testing with Jest
**Question:** How do you test business logic and utility functions?

**Answer:**
We use **Jest**. It provides the test runner, assertion library, and mocking capabilities.
```javascript
// math.js
export const add = (a, b) => a + b;

// math.test.js
import { add } from './math';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
```

### 3. Component Testing with React Native Testing Library
**Question:** How do you test UI components and user interactions?

**Answer:**
React Native Testing Library (RNTL) is the standard. It encourages testing the application as a user would interact with it, rather than testing implementation details.

```javascript
import { render, fireEvent } from '@testing-library/react-native';
import Counter from './Counter';

test('increments counter on button press', () => {
  const { getByText } = render(<Counter />);
  
  const button = getByText('Increment');
  fireEvent.press(button);
  
  expect(getByText('Count: 1')).toBeTruthy();
});
```

### 4. E2E Testing with Detox
**Question:** What is Detox and why is it used?

**Answer:**
Detox is a gray-box End-to-End (E2E) testing framework specifically designed for React Native. Unlike Appium, Detox runs inside the app process, which reduces flakiness because it synchronizes with the app's network requests and animations before asserting.

```javascript
// Detox example
describe('Login Flow', () => {
  it('should login successfully with valid credentials', async () => {
    await element(by.id('email_input')).typeText('user@test.com');
    await element(by.id('password_input')).typeText('password123');
    await element(by.id('login_button')).tap();
    await expect(element(by.id('welcome_screen'))).toBeVisible();
  });
});
```

### 5. Mocking in React Native
**Question:** How do you handle Native Modules when testing in a Node environment?

**Answer:**
Since Jest runs in Node (not on a device), native modules must be mocked. 
You can use `jest.mock()` to mock third-party libraries:
```javascript
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
```

---
