# 11-Testing.md

# Testing for Senior React Native Developers

---

# 1. What is Testing?

## Definition

Testing is the process of verifying that an application behaves as expected and remains stable after changes.

---

## Why Do We Need Testing?

Without testing:

* Bugs reach production
* Refactoring becomes risky
* Releases become unstable

---

## Benefits

* Better Code Quality
* Faster Refactoring
* Reduced Bugs
* Improved Confidence

---

## Interview Answer

"Testing ensures that applications behave correctly and helps prevent regressions during development."

---

# 2. Testing Pyramid

## Structure

```text id="j1p0qv"
          E2E
         /   \
   Integration
      /     \
    Unit Tests
```

---

## Distribution

```text id="cv79jq"
70% Unit Tests
20% Integration Tests
10% E2E Tests
```

---

## Interview Answer

"A balanced testing strategy focuses primarily on unit tests, supported by integration and end-to-end testing."

---

# 3. Types of Testing

## Unit Testing

Tests a single function or component.

---

## Integration Testing

Tests multiple units working together.

---

## End-to-End Testing

Tests complete user flows.

---

## Interview Answer

"Unit tests validate isolated logic, integration tests verify component interaction, and E2E tests validate complete application behavior."

---

# 4. What is Jest?

## Definition

Jest is the default testing framework used in React Native applications.

---

## Features

* Assertions
* Mocking
* Snapshot Testing
* Coverage Reports

---

## Example

```javascript id="h53wh9"
test("adds numbers", () => {
 expect(1 + 1).toBe(2);
});
```

---

## Interview Answer

"Jest is the most commonly used testing framework in React Native for unit and integration testing."

---

# 5. Jest Matchers

## toBe()

```javascript id="c3z5b7"
expect(2).toBe(2);
```

---

## toEqual()

```javascript id="m6zr7z"
expect(user).toEqual({
 id: 1
});
```

---

## toContain()

```javascript id="z4e1km"
expect(users)
 .toContain("Raj");
```

---

## toHaveLength()

```javascript id="5itd4n"
expect(users)
 .toHaveLength(3);
```

---

## Interview Answer

"Matchers are used to validate expected outcomes in Jest tests."

---

# 6. Unit Testing

## Definition

Tests individual units of code in isolation.

---

## Example

```javascript id="q4u1e5"
function add(a, b) {
 return a + b;
}
```

Test:

```javascript id="fg39hy"
test("add", () => {
 expect(add(2,3))
  .toBe(5);
});
```

---

## Interview Answer

"Unit testing focuses on verifying the correctness of individual functions, utilities, or components."

---

# 7. Testing React Components

## Example Component

```jsx id="s7kqv4"
const Welcome = () => (
 <Text>Hello</Text>
);
```

---

## Test

```javascript id="ut60cj"
render(<Welcome />);

expect(
 screen.getByText("Hello")
).toBeTruthy();
```

---

## Interview Answer

"React component tests verify rendering, behavior, and user interactions."

---

# 8. React Native Testing Library (RNTL)

## Definition

Official testing library for React Native UI testing.

---

## Installation

```bash id="8d11xu"
npm install
@testing-library/react-native
```

---

## Benefits

* User-Centric Testing
* Better Readability
* Realistic Testing

---

## Interview Answer

"React Native Testing Library focuses on testing components the way users interact with them."

---

# 9. Query Methods

## getByText

```javascript id="wx5r2v"
screen.getByText(
 "Login"
);
```

---

## getByTestId

```javascript id="35v3az"
screen.getByTestId(
 "submit-button"
);
```

---

## getByPlaceholderText

```javascript id="yy2jdi"
screen.getByPlaceholderText(
 "Email"
);
```

---

## Interview Answer

"Queries help locate UI elements during testing."

---

# 10. User Interaction Testing

## Example

```javascript id="5sfr3w"
fireEvent.press(
 screen.getByText(
  "Submit"
 )
);
```

---

## Use Cases

* Button Clicks
* Form Submission
* Navigation

---

## Interview Answer

"Interaction tests validate how components respond to user actions."

---

# 11. Mocking Functions

## Definition

Replace real implementations during tests.

---

## Example

```javascript id="nycm3v"
const mockFn =
 jest.fn();
```

---

## Verify Calls

```javascript id="ep8hr4"
expect(mockFn)
 .toHaveBeenCalled();
```

---

## Interview Answer

"Mocking isolates dependencies and allows tests to focus on specific behavior."

---

# 12. Mocking API Calls

## Example

```javascript id="6h7vab"
jest.mock("axios");
```

---

## Response

```javascript id="azqjfy"
axios.get.mockResolvedValue({
 data:[]
});
```

---

## Interview Answer

"API mocking prevents tests from relying on external services."

---

# 13. Mocking Navigation

## Example

```javascript id="aw30te"
const navigate =
 jest.fn();
```

---

## Verify

```javascript id="frn2eo"
expect(navigate)
 .toHaveBeenCalled();
```

---

## Interview Answer

"Navigation should be mocked to test navigation behavior independently."

---

# 14. Snapshot Testing

## Definition

Captures component output and compares future changes.

---

## Example

```javascript id="7h2dca"
const tree =
 renderer
 .create(
  <Button />
 )
 .toJSON();

expect(tree)
 .toMatchSnapshot();
```

---

## Benefits

* Detect UI Changes
* Prevent Regressions

---

## Limitations

* Large snapshots become difficult to maintain

---

## Interview Answer

"Snapshot testing helps detect unintended UI changes."

---

# 15. Integration Testing

## Definition

Tests multiple components working together.

---

## Example

```text id="7kt3m2"
Login Screen
      ↓
API Call
      ↓
Redux Update
      ↓
Navigation
```

---

## Interview Answer

"Integration tests validate interactions between multiple modules."

---

# 16. Redux Testing

## Example

```javascript id="7p5jq4"
expect(
 reducer(
  initialState,
  increment()
 )
).toEqual({
 value:1
});
```

---

## What To Test?

* Reducers
* Selectors
* RTK Query Logic

---

## Interview Answer

"Redux testing focuses on reducers, selectors, and business logic."

---

# 17. Custom Hook Testing

## Example

```javascript id="iqfj7e"
const {result} =
 renderHook(
  () => useCounter()
 );
```

---

## Verify

```javascript id="e7wx5u"
expect(
 result.current.count
).toBe(0);
```

---

## Interview Answer

"Custom hooks should be tested independently to validate reusable logic."

---

# 18. What is Detox?

## Definition

Detox is the most popular E2E testing framework for React Native.

---

## Why Detox?

Tests real application flows.

---

## Flow

```text id="e6a8tw"
Launch App
      ↓
Login
      ↓
Navigate
      ↓
Verify UI
```

---

## Interview Answer

"Detox provides end-to-end testing by automating real user interactions."

---

# 19. Detox Example

## Test

```javascript id="lr4m5i"
describe("Login", () => {

 it("logs in", async () => {

  await element(
   by.id("login")
  ).tap();

 });

});
```

---

## What Can Detox Test?

* Login
* Navigation
* Payments
* Notifications

---

## Interview Answer

"Detox validates complete user journeys across the application."

---

# 20. Code Coverage

## Definition

Measures how much code is tested.

---

## Example

```text id="3f93u9"
Functions: 90%
Lines: 85%
Branches: 80%
```

---

## Goal

```text id="tlv4lv"
70%-90%
```

---

## Interview Answer

"Coverage indicates how much of the codebase is exercised by tests, but high coverage alone does not guarantee quality."

---

# 21. What Should Be Tested?

## Test

✅ Business Logic

✅ Reducers

✅ Hooks

✅ Utilities

✅ Critical Screens

---

## Avoid Testing

❌ Third-Party Libraries

❌ Internal React Behavior

---

## Interview Answer

"Focus testing efforts on business-critical functionality and application-specific logic."

---

# 22. CI/CD Testing

## Flow

```text id="7gq0nm"
Developer Push
      ↓
GitHub Actions
      ↓
Run Tests
      ↓
Build
      ↓
Deploy
```

---

## Benefits

* Catch Issues Early
* Prevent Broken Releases

---

## Interview Answer

"Automated testing in CI/CD pipelines improves release confidence and software quality."

---

# 23. Common Testing Mistakes

## Mistake 1

Testing implementation details.

---

## Mistake 2

Not mocking external services.

---

## Mistake 3

Overusing snapshots.

---

## Mistake 4

Ignoring E2E testing.

---

## Interview Answer

"Tests should focus on user behavior rather than internal implementation."

---

# 24. Enterprise Testing Strategy

## Recommended

```text id="4mif1z"
Jest
  ↓
React Native Testing Library
  ↓
Redux Tests
  ↓
API Mocking
  ↓
Detox
```

---

## Why?

* Fast Feedback
* Stable Releases
* Better Maintainability

---

# 25. Most Asked Interview Questions

1. What is Testing?
2. Unit vs Integration vs E2E?
3. What is Jest?
4. What is React Native Testing Library?
5. How do you test React Components?
6. How do you mock APIs?
7. How do you mock navigation?
8. What is Snapshot Testing?
9. What is Detox?
10. Why use Detox?
11. How do you test Redux?
12. How do you test Hooks?
13. What should be tested?
14. What should not be tested?
15. What is Code Coverage?
16. What are Jest Matchers?
17. How do you test Async APIs?
18. How do you structure testing in large apps?
19. How do you integrate testing into CI/CD?
20. What testing strategy do you follow?

---

# Ultimate Senior Interview Answer

"In React Native applications, I typically use Jest and React Native Testing Library for unit and integration testing, while Detox is used for end-to-end testing. I focus on testing business logic, reducers, hooks, and critical user flows rather than implementation details. API calls and navigation are mocked to keep tests reliable and deterministic, and all tests are integrated into CI/CD pipelines to ensure application stability."

---

# Daily Revision Plan

```text id="g0r3ix"
Testing Basics             3 min
Jest                       5 min
RNTL                       5 min
Mocking                    5 min
Redux Testing              3 min
Hook Testing               3 min
Snapshot Testing           3 min
Detox                      5 min
Interview Questions        5 min

Total: ~37 Minutes
```

---

## MSW (Mock Service Worker)

API mocking.

```javascript
msw
```

---

## Async Testing

```javascript
await waitFor(...)
```

---

## Flaky Test Prevention

* Stable Selectors
* Proper Waits
* Mock Dependencies

---

## Coverage Reports

```bash
npm test --coverage
```

---
