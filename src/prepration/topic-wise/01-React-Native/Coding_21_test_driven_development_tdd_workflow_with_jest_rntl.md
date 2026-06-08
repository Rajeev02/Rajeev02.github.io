## Program 20: Test-Driven Development (TDD) Workflow with Jest & RNTL
*⏱️ 2 min read*

### Question
Demonstrate a Test-Driven Development (TDD) cycle inside a React Native setting. 
1. **Red**: Write a failing Jest test suite using `@testing-library/react-native` for a component `ValidationLabel`. The test must check that:
   - It displays a red warning text `"Weak Password"` if input password length is `< 6`.
   - It displays a green label `"Strong Password"` and calls an `onValidated` trigger callback if password contains at least `8` characters, including a number.
2. **Green**: Write the minimal component execution logic required to pass the test cases.
3. **Refactor**: Clean up the component styling or internal conditional checks while ensuring tests remain green.

### Sample Input & Output
#### TDD Stage 1 (Tests execution output):
- Running `npm test` fails because `ValidationLabel.tsx` does not exist or has empty stubs (Red stage).
#### TDD Stage 2 (Execution code integration):
- Implementing minimal check rules causes all assertions to pass (Green stage).

### Code

#### 1. The Test Suite File (`ValidationLabel.test.tsx` - Written First)
```tsx
import React from 'react';
import { render } from '@testing-library/react-native';
import { ValidationLabel } from './ValidationLabel';

describe('TDD ValidationLabel Suite', () => {
  it('displays warning label for weak inputs', () => {
    const mockOnValidated = jest.fn();
    const { getByTestId } = render(
      <ValidationLabel password="abc" onValidated={mockOnValidated} />
    );

    const labelElement = getByTestId('validation_text');
    expect(labelElement.props.children).toBe('Weak Password');
    expect(labelElement.props.style).toContainEqual(expect.objectContaining({ color: '#e53e3e' }));
    expect(mockOnValidated).not.toHaveBeenCalled();
  });

  it('displays strong label and calls validation handler on correct password', () => {
    const mockOnValidated = jest.fn();
    const { getByTestId } = render(
      <ValidationLabel password="securePass99" onValidated={mockOnValidated} />
    );

    const labelElement = getByTestId('validation_text');
    expect(labelElement.props.children).toBe('Strong Password');
    expect(labelElement.props.style).toContainEqual(expect.objectContaining({ color: '#38a169' }));
    expect(mockOnValidated).toHaveBeenCalledTimes(1);
  });
});
```

#### 2. The Minimal Component Code (`ValidationLabel.tsx` - Written Second to pass the assertions)
```tsx
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ValidationProps {
  password?: string;
  onValidated: () => void;
}

export function ValidationLabel({ password = '', onValidated }: ValidationProps) {
  const hasMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const isStrong = hasMinLength && hasNumber;

  useEffect(() => {
    if (isStrong) {
      onValidated();
    }
  }, [isStrong, onValidated]);

  if (!password) return null;

  return (
    <View style={styles.container}>
      <Text 
        testID="validation_text"
        style={isStrong ? styles.strongLabel : styles.weakLabel}
      >
        {isStrong ? 'Strong Password' : 'Weak Password'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 6 },
  weakLabel: { color: '#e53e3e', fontSize: 13, fontWeight: '600' },
  strongLabel: { color: '#38a169', fontSize: 13, fontWeight: '600' }
});
```

### Complexity & Explanation
- **Time Complexity**: $O(W)$ regular expression character analysis where $W$ is password string length.
- **Space Complexity**: $O(1)$ constant stack memory allocations.
- **Explanation**: This demonstrates a full TDD pipeline loop. In Stage 1 (Red), we write test specifications verifying styles and event dispatches. In Stage 2 (Green), we construct the component containing state validation flags and conditional layouts to resolve the test blocks. In Stage 3 (Refactor), we optimize the RegExp expressions or stylesheets safely without fear of regressions because the Jest test suite immediately catches any broken logic.
```


---
