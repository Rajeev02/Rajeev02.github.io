> 🎯 **Topic:** Advanced Unit Testing with Jest
> 📊 **Difficulty:** Intermediate | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** Testing, Jest, Unit Test

---

## Advanced Unit Testing with Jest

*⏱️ 25 min read*

### Overview
Unit testing ensures that individual components or functions of your application work as expected in isolation. Jest is the standard testing framework for React Native, providing zero-config setup, instant feedback, snapshot testing, and powerful mocking capabilities.

### Key Concepts

#### 1. Setup and Teardown
Jest provides hooks to run code before and after tests. This is crucial for setting up a consistent environment and cleaning up afterward (e.g., clearing mocks or timers).
- `beforeAll()` / `afterAll()`
- `beforeEach()` / `afterEach()`

#### 2. Mocking
Mocking allows you to isolate the unit being tested by replacing dependencies with controlled stand-ins.
- **Function Mocks:** `jest.fn()`
- **Module Mocks:** `jest.mock('module-name')`
- **Timer Mocks:** `jest.useFakeTimers()`

#### 3. Snapshot Testing
Snapshots capture a rendered React tree and compare it against a saved reference. If the UI changes, the test fails, prompting you to either fix the regression or update the snapshot (`jest -u`).

### Example: Testing a React Native Component

```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CustomButton } from '../components/CustomButton';

describe('CustomButton', () => {
  it('renders correctly', () => {
    const { getByText } = render(<CustomButton title="Click Me" onPress={() => {}} />);
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockPress = jest.fn();
    const { getByText } = render(<CustomButton title="Submit" onPress={mockPress} />);
    
    fireEvent.press(getByText('Submit'));
    expect(mockPress).toHaveBeenCalledTimes(1);
  });
});
```

### Interview Questions & Answers

#### Q1. What is the difference between `jest.mock` and `jest.spyOn`?
**Answer:**
`jest.mock` completely replaces an entire module with a mock implementation. It is hoisted to the top of the file during execution. `jest.spyOn` allows you to observe a specific method on an existing object without replacing it entirely (unless you chain `.mockImplementation()`), and you can restore the original implementation later using `.mockRestore()`.

#### Q2. How do you test asynchronous code in Jest?
**Answer:**
You can test async code by either returning a Promise from the test block, using `async/await`, or using the `done` callback. The preferred modern approach is `async/await`:
```javascript
it('fetches data successfully', async () => {
  const data = await fetchData();
  expect(data).toEqual({ id: 1 });
});
```

#### Q3. Why use React Native Testing Library (RNTL) over Enzyme?
**Answer:**
RNTL encourages testing components the way users interact with them (e.g., finding text, firing presses) rather than testing implementation details (like state or instance methods). This leads to more robust tests that don't break during refactoring. Enzyme is also largely deprecated for newer React versions.
