> 🎯 **Topic:** 3.1 🧪 Mobile Testing Frameworks & TDD Strategy
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## 3.1 🧪 Mobile Testing Frameworks & TDD Strategy

*⏱️ 1 min read*

Enforcing a Test-Driven Development (TDD) strategy prevents UI regressions and ensures your code is easy to maintain.

```text
                              [TDD Loop: Red-Green-Refactor]
                                           ┌──◄──┐
                                           ▼     │
  1. Write failing test ──► 2. Write minimal code ──► 3. Refactor code
```

#### 1. Testing Pyramid Mappings

- **Unit Testing (Jest)**:
  - Focuses on testing isolated functions, utility helpers, and custom hooks.
  - Use `jest.mock()` to mock native modules (like `react-native-device-info` or `react-native-keychain`).
  - Example (Testing a custom state hook):
    ```javascript
    import { renderHook, act } from '@testing-library/react-hooks';
    import { useCounter } from './useCounter';

    test('should increment counter', () => {
      const { result } = renderHook(() => useCounter());
      act(() => {
        result.current.increment();
      });
      expect(result.current.count).toBe(1);
    });
    ```
- **Integration Testing (React Native Testing Library - RNTL)**:
  - Verifies interactions between components, contexts, and hooks.
  - Simulates user actions (like typing, clicking) and asserts that the UI updates correctly.
  - Example:
    ```javascript
    import { render, fireEvent, screen } from '@testing-library/react-native';
    import LoginForm from './LoginForm';

    test('submits username and password', () => {
      const mockSubmit = jest.fn();
      render(<LoginForm onSubmit={mockSubmit} />);
      
      fireEvent.changeText(screen.getByPlaceholderText('Username'), 'rajeev');
      fireEvent.press(screen.getByText('Login'));
      
      expect(mockSubmit).toHaveBeenCalledWith('rajeev');
    });
    ```
- **End-to-End Testing (Detox)**:
  - Runs the app on a real device or simulator. It controls the app, simulates actual user taps, and verifies visual outcomes.
  - Uses `testID` attributes to locate components.
  - Example:
    ```javascript
    describe('Login Flow E2E', () => {
      beforeEach(async () => {
        await device.reloadReactNative();
      });

      it('should navigate to home screen on successful login', async () => {
        await element(by.id('username-input')).typeText('rajeev');
        await element(by.id('login-button')).tap();
        await expect(element(by.id('home-screen-header'))).toBeVisible();
      });
    });
    ```

---


---

---
