## Program 13: Multi-Layered Testing Suite (Jest + RNTL + Detox)
*⏱️ 2 min read*

### Question
Write a complete, structured test automation suite for a React Native component.
1. Provide a standard React Native **Authentication Screen** component (`LoginScreen`).
2. Provide a **Jest unit test** suite using `@testing-library/react-native` to verify mock component actions, credentials verification, and button touch trigger calls.
3. Provide a **Detox E2E test** specification script asserting visual view shifts and element matching.

### Sample Input & Output
#### Input:
- User launches test runner.
#### Output:
- Jest outputs successful unit verification reports.
- Detox spins up iOS/Android emulator, types keys into fields, clicks the login button, and verifies successful navigation transitions.

### Code

#### 1. React Native Target Component (`LoginScreen.tsx`)
```tsx
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export function LoginScreen({ onLoginSuccess }: { onLoginSuccess: () => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'secret') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Gateway</Text>
      
      <TextInput
        testID="username_input"
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        testID="password_input"
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      {error ? <Text testID="error_text" style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity 
        testID="login_button" 
        style={styles.button} 
        onPress={handleLogin}
      >
        <Text style={styles.btnLabel}>AUTHORIZE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#ffffff' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: { borderWidth: 1, borderColor: '#cbd5e0', padding: 12, borderRadius: 8, marginVertical: 8 },
  errorText: { color: '#e53e3e', fontSize: 13, textAlign: 'center', marginVertical: 8, fontWeight: '600' },
  button: { backgroundColor: '#3182ce', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16 },
  btnLabel: { color: '#ffffff', fontWeight: 'bold', fontSize: 15 }
});
```

#### 2. Jest & React Native Testing Library Integration Suite (`LoginScreen.test.tsx`)
```tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from './LoginScreen';

describe('LoginScreen Component', () => {
  it('displays error message on invalid credentials', () => {
    const mockSuccess = jest.fn();
    const { getByTestId, queryByTestId } = render(<LoginScreen onLoginSuccess={mockSuccess} />);
    
    // Simulate typing text inputs
    fireEvent.changeText(getByTestId('username_input'), 'wrong_user');
    fireEvent.changeText(getByTestId('password_input'), 'wrong_pass');
    
    // Simulate press interaction
    fireEvent.press(getByTestId('login_button'));
    
    expect(getByTestId('error_text').props.children).toBe('Invalid credentials');
    expect(mockSuccess).not.toHaveBeenCalled();
  });

  it('triggers login callback on correct credentials', () => {
    const mockSuccess = jest.fn();
    const { getByTestId, queryByTestId } = render(<LoginScreen onLoginSuccess={mockSuccess} />);
    
    fireEvent.changeText(getByTestId('username_input'), 'admin');
    fireEvent.changeText(getByTestId('password_input'), 'secret');
    fireEvent.press(getByTestId('login_button'));
    
    expect(queryByTestId('error_text')).toBeNull();
    expect(mockSuccess).toHaveBeenCalledTimes(1);
  });
});
```

#### 3. Detox End-to-End Test Spec (`login.spec.js`)
```javascript
describe('E2E Authentication Flow', () => {
  beforeEach(async () => {
    // Reload react native instance before each test
    await device.reloadReactNative();
  });

  it('validates navigation stack swap upon correct login', async () => {
    // Match elements using testID queries and enter test values
    await element(by.id('username_input')).typeText('admin');
    await element(by.id('password_input')).typeText('secret');
    
    // Dismiss keyboard and press login button
    await element(by.id('login_button')).tap();
    
    // Verify error does not exist and target view transitions successfully
    await expect(element(by.id('error_text'))).toNotExist();
    await expect(element(by.text('Dashboard'))).toBeVisible();
  });
});
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Unit testing**: $O(1)$ assertions running in ms.
  - **E2E testing**: $O(S)$ where $S$ is scenario complexity. Takes seconds due to emulator launches.
- **Space Complexity**: $O(N)$ virtualization heap memory.
- **Explanation**: Shows a multi-layered testing workflow. Unit tests execute virtual rendering using JS/React Native Testing Library in node memory, asserting callbacks instantly. Detox runs grey-box E2E testing on compiled Android/iOS apps on real device simulators, waiting for background animations to finish before running checks.

---
