# Volume 8 – Set 14 – Testing (Unit, Integration, E2E)

## 1. What is the Testing Pyramid and how does it apply to React Native?

**Concept:**
The Testing Pyramid is a framework that guides developers on how to balance different types of tests to maximize coverage while minimizing execution time and maintenance overhead.

**Answer:**
In React Native, the pyramid dictates:
1. **Base (Unit Tests)**: The vast majority of tests. Fast, isolated, and highly deterministic. Used to test pure JavaScript functions, Redux reducers, hooks, and utility classes using **Jest**.
2. **Middle (Integration/Component Tests)**: Fewer than unit tests. Used to test how React components render and interact with their hooks or Redux store. I use **React Native Testing Library (RNTL)** to mount components and simulate user interactions (pressing buttons) without rendering actual native views.
3. **Top (End-to-End / E2E Tests)**: The fewest tests. Slow, brittle, and expensive to run. They test the entire app architecture by booting up a real iOS Simulator or Android Emulator. I use **Detox** or **Maestro** to simulate a real user clicking through critical business flows (e.g., Login -> Add to Cart -> Checkout).

**Key Takeaway:**
Don't rely solely on E2E tests because they are slow and flaky. Push as much logic as possible down into unit and integration tests, reserving E2E for the 5-10 absolute most critical user journeys.

---

## 2. How do you test a component that relies on external APIs (Network Requests)?

**Concept:**
Integration tests should be fast and deterministic. Hitting a real backend server during a test causes tests to fail randomly due to network latency, server downtime, or changing data.

**Answer:**
You must isolate the component from the network by mocking the API layer. 
I use two main approaches:
1. **Mocking Axios/Fetch**: Using `jest.mock('axios')` to manually return fake Promise resolutions. However, this tightly couples the test to the implementation detail (Axios).
2. **Mocking the Network (Preferred)**: I use **MSW (Mock Service Worker)** or `nock`. MSW intercepts network requests at the HTTP level using node interceptors. This means the component's internal logic (using `fetch`, `axios`, or `apollo`) doesn't matter. MSW intercepts the outbound request and returns a pre-defined JSON fixture.

Example:
```javascript
server.use(
  rest.get('/api/user', (req, res, ctx) => {
    return res(ctx.json({ name: 'John Doe' }))
  })
)
```

**Key Takeaway:**
Mocking at the network boundary (MSW) rather than the module boundary (Axios) makes tests more robust to refactoring.

---

## 3. Explain how to test custom React hooks.

**Concept:**
Custom hooks contain complex state and side effects but do not render UI. They cannot be tested directly like regular functions because they must be called inside the body of a React component.

**Answer:**
To test custom hooks in isolation, I use `@testing-library/react-native` (or formerly `@testing-library/react-hooks`). 

It provides a `renderHook` utility that creates a hidden wrapper component to execute the hook.
```javascript
const { result } = renderHook(() => useCounter(0));

// result.current contains the returned values of the hook
expect(result.current.count).toBe(0);

// For asynchronous actions or state updates, wrap in `act()`
act(() => {
  result.current.increment();
});

expect(result.current.count).toBe(1);
```

**Key Takeaway:**
Any state update triggered within a test environment must be wrapped in `act(...)`. This ensures React flushes all state updates and side effects before the test proceeds to the `expect` assertion.

---

## 4. Why is Detox considered a "gray box" testing framework, and why is that better than "black box"?

**Concept:**
E2E tests often fail randomly (flakiness). A test might try to click a button before the loading animation finishes, causing a failure.

**Answer:**
A **Black Box** framework (like Appium) interacts with the app entirely from the outside. It doesn't know what the app is doing internally. Developers have to write arbitrary `sleep(5000)` commands to wait for network requests or animations to finish before clicking a button. These arbitrary sleeps cause immense flakiness.

**Detox is a Gray Box framework.** It operates from the outside but injects a synchronization mechanism *inside* the app. Detox monitors the app's internal state (React Native bridge traffic, active network requests, running animations, and Timers). 

When Detox commands `element(by.id('submit_button')).tap()`, it automatically waits until the app is completely \"idle\" (no network requests pending, no animations running) before executing the tap. 

**Key Takeaway:**
Detox eliminates the need for arbitrary `sleep()` calls, drastically reducing test flakiness and making E2E suites reliable enough for CI/CD pipelines.

---

## 5. How do you deal with mocked dependencies when testing Navigation in React Native?

**Concept:**
Components often call `navigation.navigate('ScreenB')` inside an `onPress`. If a component is rendered in isolation during a test, `react-navigation` isn't fully initialized, causing the test to crash.

**Answer:**
There are two ways to handle navigation in component tests:

1. **Mocking the `useNavigation` Hook**: 
   I create a mock navigation object and inject it via Jest.
   ```javascript
   const mockNavigate = jest.fn();
   jest.mock('@react-navigation/native', () => ({
     useNavigation: () => ({ navigate: mockNavigate }),
   }));
   ```
   Then I render the component, click the button, and assert:
   `expect(mockNavigate).toHaveBeenCalledWith('DetailsScreen');`

2. **Wrapper Component (For complex flows)**:
   If I want to test actual routing, I wrap the component inside a lightweight `NavigationContainer` during the test setup, allowing RNTL to mount multiple screens and test the actual transition.

**Key Takeaway:**
For simple unit/integration tests, mocking the `useNavigation` hook is the fastest and most isolated method to verify that a button click triggers the correct intent to route.
