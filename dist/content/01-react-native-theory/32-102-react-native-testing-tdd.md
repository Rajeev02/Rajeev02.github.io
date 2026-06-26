> 🎯 **Topic:** 10.2 React Native: Testing & TDD
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---

## 10.2 React Native: Testing & TDD

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
