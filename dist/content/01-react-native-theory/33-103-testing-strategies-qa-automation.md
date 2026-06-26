> 🎯 **Topic:** 10.3 🧪 Testing Strategies & QA Automation
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## 10.3 🧪 Testing Strategies & QA Automation

*⏱️ 2 min read*

#### 1. The Mobile Testing Pyramid
- **Test-Driven Development (TDD)**: The software development process where you write failing test cases first, then write minimal code to pass the tests, and finally refactor for clean patterns.

```text
       ▲
      / \     E2E Testing (Detox) ➡️ Simulates real device layouts and flows
     /   \    
    /     \   Integration (Jest)  ➡️ Tests component updates, redux states and routing
   /_______\  Unit (RNTL + Jest)  ➡️ Validates atomic hooks and logic calculations
```

#### 2. Unit & Integration Testing (Jest + React Native Testing Library)
- **RNTL** allows rendering components inside a virtual environment to assert UI elements and fire events.
- **Example Test Code**:
  ```typescript
  import React from 'react';
  import { render, fireEvent } from '@testing-library/react-native';
  import { ButtonComponent } from './ButtonComponent';

  describe('ButtonComponent', () => {
    it('fires callback triggers when pressed', () => {
      const mockPress = jest.fn();
      const { getByText } = render(<ButtonComponent label="Submit" onPress={mockPress} />);
      
      fireEvent.press(getByText('Submit'));
      expect(mockPress).toHaveBeenCalledTimes(1);
    });
  });
  ```

#### 3. End-to-End Testing (Detox / Appium + JUnit)
- **Detox**: A grey-box end-to-end testing library. It tests the compiled app on real simulators or devices, waiting for asynchronous network calls and animations to finish automatically before asserting elements, minimizing flaky tests.
- **Appium**: A black-box, WebDriver-based E2E tool that automates iOS and Android apps like an external user. It is slower than Detox but useful when QA teams need cross-platform device farms, language-agnostic tests, or shared automation across native and React Native apps.
- **JUnit**: Used as the test runner reporting framework.
- **Detox E2E Script Example**:
  ```javascript
  describe('Authentication Flow', () => {
    beforeEach(async () => {
      await device.reloadReactNative();
    });

    it('navigates to dashboard after successful login', async () => {
      // Find element by unique testID and type inputs
      await element(by.id('username_input')).typeText('admin_user');
      await element(by.id('password_input')).typeText('secure_password');
      await element(by.id('login_button')).tap();

      // Assert visual element exists on the next page
      await expect(element(by.text('Welcome Back, Admin'))).toBeVisible();
    });
  });
  ```

##### Detox vs. Appium Interview Answer
| Tool | Best For | Tradeoff |
| :--- | :--- | :--- |
| **Detox** | React Native teams needing fast, grey-box E2E on simulators/emulators with RN synchronization. | Requires app instrumentation and RN-aware setup. |
| **Appium** | Enterprise QA/device-farm automation across RN, native Android, native iOS, and hybrid apps. | Slower and more brittle if selectors/accessibility IDs are not maintained. |

#### 4. Code Quality Gates (ESLint + Prettier + Husky)
- **ESLint**: Enforces TypeScript, React, React Hooks, import-order, accessibility, and React Native-specific rules before code reaches review.
- **Prettier**: Owns formatting so code review focuses on behavior, architecture, and test quality rather than style debates.
- **Husky + lint-staged**: Runs lightweight checks only on changed files before commit, commonly `eslint --fix`, `prettier --write`, and focused tests.
- **CI Enforcement**: Pre-commit hooks are convenience, not security. CI must still run `tsc --noEmit`, lint, unit tests, and build checks.

#### 5. Test-Driven Development (TDD) Workflow in React Native
Test-Driven Development (TDD) is a development methodology where code is written in a strict iterative feedback loop:
1. **Red**: Write a failing unit or integration test defining a small, single requirement.
2. **Green**: Write the minimal application code required to make the test pass.
3. **Refactor**: Clean up code styling, extract components, or improve performance while ensuring tests remain green.

- **Mental Model for Mobile TDD**:
  - Focus on testing *behaviors* and *states* rather than implementation details. Avoid asserting component internals; instead, assert what the user sees (e.g. text elements, buttons) or what callback events fire.
  - When testing custom hooks (like standard query fetch wrappers), write test cases representing: Initial loading state ➡️ Successful payload resolution ➡️ Network error rejection.
- **Mocking Strategy**:
  - Mock native libraries that do not run inside Node.js environments (like `@react-native-async-storage/async-storage`, `react-native-reanimated`, or `react-native-device-info`).
  - Use `jest.mock()` to replace complex native dependencies or heavy network wrappers (like `axios` or Apollo Client's mock provider) with predictable mock functions (`jest.fn()`).

---


---

---
