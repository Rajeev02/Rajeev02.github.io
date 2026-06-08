# 💻 Senior & Lead React Native Coding Challenges

## Page Summary
### Reading Time
`14 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Senior & Lead React Native Coding Challenges |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | 👨💼 Lead Round Favorite |

---



<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [Challenge 1: Resilient Offline Sync Manager (Zustand + MMKV + NetInfo)](#challenge-1-resilient-offline-sync-manager-zustand-mmkv-netinfo)
- [Challenge 2: Native Android Kotlin Module for Device Security](#challenge-2-native-android-kotlin-module-for-device-security)
- [Challenge 3: High-Performance Swipable Card Component (Reanimated & Gestures)](#challenge-3-high-performance-swipable-card-component-reanimated-gestures)
- [Challenge 4: Lead-Level Navigation Guards & Role-Based Stack Controller](#challenge-4-lead-level-navigation-guards-role-based-stack-controller)
- [Challenge 5: TDD Jest & RNTL Suite for Async Form Wizard](#challenge-5-tdd-jest-rntl-suite-for-async-form-wizard)
</details>
<!-- INDEX_END -->

---

## Challenge 1: Resilient Offline Sync Manager (Zustand + MMKV + NetInfo)
*⏱️ 3 min read*

### Question
Implement a complete, production-ready offline outbox sync manager hook in React Native.
1. Use **Zustand** coupled with **MMKV** to store an outbox queue of pending network requests (mutations) to disk.
2. Monitor network connectivity status using `@react-native-community/netinfo`.
3. When the network is restored, automatically execute the queued requests sequentially. Support dynamic retries with exponential backoff (e.g. initial 1s delay, doubling up to a maximum delay) and idempotency keys to ensure transaction safety.

### Code
```typescript
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

// 1. Initialize MMKV Storage Adapter
const storage = new MMKV();
const zustandStorage = {
  setItem: (name: string, value: string) => storage.set(name, value),
  getItem: (name: string) => storage.getString(name) ?? null,
  removeItem: (name: string) => storage.delete(name),
};

export interface OutboxItem {
  id: string; // Idempotency UUID
  url: string;
  method: 'POST' | 'PUT' | 'DELETE';
  payload: Record<string, any>;
  retries: number;
  lastAttemptTimestamp: number;
}

interface OutboxState {
  outbox: OutboxItem[];
  isSyncing: boolean;
  addToOutbox: (item: Omit<OutboxItem, 'retries' | 'lastAttemptTimestamp'>) => void;
  removeFromOutbox: (id: string) => void;
  incrementRetries: (id: string) => void;
  setSyncing: (status: boolean) => void;
}

// 2. Zustand Persisted Outbox Store
export const useOutboxStore = create<OutboxState>()(
  persist(
    (set) => ({
      outbox: [],
      isSyncing: false,
      addToOutbox: (item) =>
        set((state) => ({
          outbox: [...state.outbox, { ...item, retries: 0, lastAttemptTimestamp: Date.now() }],
        })),
      removeFromOutbox: (id) =>
        set((state) => ({
          outbox: state.outbox.filter((item) => item.id !== id),
        })),
      incrementRetries: (id) =>
        set((state) => ({
          outbox: state.outbox.map((item) =>
            item.id === id
              ? { ...item, retries: item.retries + 1, lastAttemptTimestamp: Date.now() }
              : item
          ),
        })),
      setSyncing: (status) => set({ isSyncing: status }),
    }),
    {
      name: 'offline-outbox-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

// 3. Resilient Outbox Sync Execution Engine
export class OfflineSyncManager {
  private static MAX_RETRIES = 5;
  private static BASE_BACKOFF_MS = 1000;

  static async startSyncProcess() {
    const store = useOutboxStore.getState();
    if (store.isSyncing || store.outbox.length === 0) return;

    // Verify active internet connection
    const netState = await NetInfo.fetch();
    if (!netState.isConnected) return;

    store.setSyncing(true);
    console.log(`Starting sync process for ${store.outbox.length} pending items.`);

    // Execute items sequentially to preserve dependency order
    for (const item of [...store.outbox]) {
      const backoffDelay = this.calculateBackoff(item.retries);
      const timeSinceLastAttempt = Date.now() - item.lastAttemptTimestamp;

      // Skip item if it is in backoff cooldown period
      if (item.retries > 0 && timeSinceLastAttempt < backoffDelay) {
        console.log(`Item ${item.id} is cooling down, skipping in this cycle.`);
        continue;
      }

      const success = await this.executeRequest(item);
      if (success) {
        store.removeFromOutbox(item.id);
        console.log(`Item ${item.id} successfully synced.`);
      } else {
        store.incrementRetries(item.id);
        console.log(`Item ${item.id} execution failed, incrementing retries.`);
        
        // Stop execution queue on failure to preserve sequential integrity
        break;
      }
    }

    store.setSyncing(false);
  }

  private static calculateBackoff(retries: number): number {
    // Exponential backoff with jitter: 2^retries * 1000ms
    const delay = Math.pow(2, retries) * this.BASE_BACKOFF_MS;
    const jitter = Math.random() * 200; // Prevent collision stampede
    return Math.min(delay + jitter, 30000); // Caps at 30 seconds max delay
  }

  private static async executeRequest(item: OutboxItem): Promise<boolean> {
    if (item.retries >= this.MAX_RETRIES) {
      console.error(`Item ${item.id} exceeded maximum retries. Discarding or moving to DLQ.`);
      return true; // Discard or route to Dead Letter Queue (DLQ)
    }

    try {
      const response = await axios({
        url: item.url,
        method: item.method,
        data: item.payload,
        headers: {
          'Content-Type': 'application/json',
          'X-Idempotency-Key': item.id, // Guarantee server-side idempotency
        },
        timeout: 10000, // 10s execution timeout
      });

      return response.status >= 200 && response.status < 300;
    } catch (error: any) {
      console.warn(`Request failed for ${item.id}:`, error.message);
      
      // If error is 4xx client-side input error, don't retry, remove from queue
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        console.error(`Client error ${error.response.status} on ${item.id}, discarding request.`);
        return true;
      }
      return false; // Server-side or connectivity issue warrants a retry
    }
  }

  // Hook listener mapping NetInfo connectivity shifts
  static registerNetworkListener() {
    return NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        this.startSyncProcess();
      }
    });
  }
}
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the count of items in the queue. Sequential execution maintains dependency consistency.
- **Space Complexity**: $O(N)$ memory allocations to keep serialized items on disk.
- **Explanation**: This module combines MMKV, Zustand, and NetInfo. MMKV writes queue structures synchronously to native files. Idempotency UUIDs are assigned to each item to prevent double-processing on server retries. The scheduler implements an exponential backoff algorithm with jitter to avoid slamming servers upon network recovery.

---

## Challenge 2: Native Android Kotlin Module for Device Security
*⏱️ 1 min read*

### Question
Write a custom Android Native Module structure in **Kotlin** that exposes device security integrity metrics to React Native JavaScript:
1. Detect if the host system is rooted.
2. Detect if the app is running on an emulator.
3. Detect if a native debugger is currently attached to the process context.
4. Implement a Promise-based Kotlin bridge signature returning these checks in a payload object.

### Code
```kotlin
package com.mncapp.security

import android.os.Build
import android.os.Debug
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File

class DeviceSecurityModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "DeviceSecurity"
    }

    @ReactMethod
    fun getSecurityIntegrity(promise: Promise) {
        try {
            val payload = Arguments.createMap()
            payload.putBoolean("isRooted", checkRootMethod())
            payload.putBoolean("isEmulator", checkEmulatorMethod())
            payload.putBoolean("isDebuggerAttached", checkDebuggerMethod())
            
            promise.resolve(payload)
        } catch (e: Exception) {
            promise.reject("SECURITY_ERROR", "Failed to retrieve security markers", e)
        }
    }

    private fun checkRootMethod(): Boolean {
        val rootPaths = arrayOf(
            "/system/app/Superuser.apk",
            "/sbin/su",
            "/system/bin/su",
            "/system/xbin/su",
            "/data/local/xbin/su",
            "/data/local/bin/su",
            "/system/sd/xbin/su",
            "/system/bin/failsafe/su",
            "/data/local/su"
        )
        
        // 1. Check file path signatures
        for (path in rootPaths) {
            if (File(path).exists()) return true
        }

        // 2. Check test-keys signature configurations
        val buildTags = Build.TAGS
        if (buildTags != null && buildTags.contains("test-keys")) return true

        return false
    }

    private fun checkEmulatorMethod(): Boolean {
        // Evaluate emulator fingerprint patterns across android Build configs
        return (Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || "google_sdk" == Build.PRODUCT)
    }

    private fun checkDebuggerMethod(): Boolean {
        // Query debugger connection state directly from native Debug runtime APIs
        return Debug.isDebuggerConnected()
    }
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ constant execution runtime.
- **Space Complexity**: $O(1)$ stack allocations.
- **Explanation**: This native Kotlin module queries Android OS attributes directly. It checks build fingerprints for emulator matches, checks known binary locations for root signatures, and queries Android runtime APIs (`android.os.Debug`) to detect active debugger attachments. It returns results as a React Native `WritableMap` dictionary back to JavaScript.

---

## Challenge 3: High-Performance Swipable Card Component (Reanimated & Gestures)
*⏱️ 2 min read*

### Question
Write an interactive swipable card component (often used for swipe-to-delete patterns in lists) using **React Native Reanimated** and **React Native Gesture Handler**.
The component must:
1. Handle horizontal swipe gestures (`Gesture.Pan()`) running purely on the UI thread via worklets.
2. Transition the card smoothly when swiped past a threshold (e.g. 150px), invoking an `onDismiss` callback.
3. Automatically slide back into place if released before the threshold.

### Code
```tsx
import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.4;

interface SwipeProps {
  children: React.ReactNode;
  onDismiss: () => void;
}

export function SwipeableCard({ children, onDismiss }: SwipeProps) {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(75); // Initial height of recycled cell
  const opacity = useSharedValue(1);

  // 1. Define Pan Gesture Handler running on UI Thread
  const panGesture = Gesture.Pan()
    .onChange((event) => {
      // Limit swipes strictly to the left direction
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        // Trigger dismiss transition
        translateX.value = withSpring(-SCREEN_WIDTH);
        opacity.value = withSpring(0);
        itemHeight.value = withSpring(0, {}, (isFinished) => {
          if (isFinished) {
            runOnJS(onDismiss)(); // Invoke callback on JS thread
          }
        });
      } else {
        // Snap back to origin style
        translateX.value = withSpring(0);
      }
    });

  // 2. Bind reanimated styles to shared values
  const rCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const rContainerStyle = useAnimatedStyle(() => ({
    height: itemHeight.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, rContainerStyle]}>
      <View style={styles.backgroundContainer}>
        <Text style={styles.deleteText}>Delete</Text>
      </View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, rCardStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#e53e3e',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 24,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ layout rendering. Animation steps compile to native loops running at 60/120 FPS.
- **Space Complexity**: $O(1)$ constant allocations.
- **Explanation**: This component utilizes React Native Reanimated's UI worklets. The gesture listener intercepts movement details and sets `translateX` values entirely on the native render thread. Using `runOnJS` ensures the native thread triggers the callback asynchronously, keeping frames responsive.

---

## Challenge 4: Lead-Level Navigation Guards & Role-Based Stack Controller
*⏱️ 2 min read*

### Question
Write a routing stack controller component using `@react-navigation/native` and `@react-navigation/stack`.
The stack must act as a **Navigation Guard**:
1. Check authentication status globally.
2. If authenticated, verify the user's role (e.g. `'ADMIN'` vs `'USER'`).
3. If an unauthorized role attempts to route to a protected area, route them to an Access Denied fallback panel. Include a token-refresh handler intercepting transition errors.

### Code
```tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button } from 'react-native';

type UserRole = 'ADMIN' | 'USER' | null;

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  const login = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };
  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
};

// 1. Mock Screen Components
function LoginScreen() {
  const { login } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Button title="Login as User" onPress={() => login('USER')} />
      <View style={{ height: 12 }} />
      <Button title="Login as Admin" onPress={() => login('ADMIN')} />
    </View>
  );
}

function UserDashboard() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Dashboard</Text>
      <Button title="Sign Out" onPress={logout} />
    </View>
  );
}

function AdminConsole() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Admin Console (Protected)</Text>
      <Button title="Sign Out" onPress={logout} />
    </View>
  );
}

function UnauthorizedScreen() {
  const { logout } = useAuth();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
      <Text style={{ color: '#e53e3e', fontSize: 16, fontWeight: 'bold' }}>Access Denied</Text>
      <Text style={{ textAlign: 'center', marginVertical: 8 }}>You do not have permissions to access this module.</Text>
      <Button title="Return to Login" onPress={logout} />
    </View>
  );
}

// 2. Guarded Navigation Stack Controller
const Stack = createStackNavigator();

export function GuardedNavigator() {
  const { isAuthenticated, userRole } = useAuth();

  // Define conditional navigation stacks based on user state
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      {!isAuthenticated ? (
        // Unauthenticated Stack
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : userRole === 'ADMIN' ? (
        // Admin Stack
        <Stack.Screen name="AdminConsole" component={AdminConsole} />
      ) : userRole === 'USER' ? (
        // Standard User Stack
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
      ) : (
        // Unauthorized Fallback
        <Stack.Screen 
          name="Unauthorized" 
          component={UnauthorizedScreen} 
          options={{ headerLeft: () => null }} 
        />
      )}
    </Stack.Navigator>
  );
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ stack evaluation. React Navigation dynamic stacking optimizes memory by mounting only the active stack.
- **Space Complexity**: $O(S)$ stack size state footprint.
- **Explanation**: This navigation pattern acts as an architectural guard. By conditionally declaring stack routes based on the current user state instead of performing screen-level redirect checks, we guarantee that unauthorized screens cannot be reached via navigation APIs, completely securing deep linking endpoints.

---

## Challenge 5: TDD Jest & RNTL Suite for Async Form Wizard
*⏱️ 2 min read*

### Question
Write a complete Test-Driven Development (TDD) cycle for an asynchronous registration wizard component (`WizardForm`):
1. **Red**: Write a failing test suite using `@testing-library/react-native` asserting that:
   - Entering an invalid email throws a validation warning.
   - Clicking "Submit" triggers an active loading indicator, fetches API endpoints asynchronously, and shows a success layout on completion.
2. **Green**: Write the minimal React Native component code to resolve and pass all tests.

### Code

#### 1. The Test Suite File (`WizardForm.test.tsx` - Written First)
```tsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { WizardForm } from './WizardForm';

// Mock global API fetch utility
global.fetch = jest.fn();

describe('TDD WizardForm Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('validates invalid email strings and shows warnings', async () => {
    const { getByTestId, getByText } = render(<WizardForm />);
    
    const emailInput = getByTestId('email_input');
    fireEvent.changeText(emailInput, 'invalid-email');
    
    const submitBtn = getByTestId('submit_btn');
    fireEvent.press(submitBtn);
    
    await waitFor(() => {
      expect(getByText('Invalid Email Address')).toBeTruthy();
    });
  });

  it('submits form inputs, displays loading states, and renders success messages', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    const { getByTestId, getByText, queryByTestId } = render(<WizardForm />);
    
    fireEvent.changeText(getByTestId('email_input'), 'admin@myportal.com');
    fireEvent.changeText(getByTestId('name_input'), 'Rajeev');
    fireEvent.press(getByTestId('submit_btn'));

    // Verify loading spinner is visible during API execution
    expect(getByTestId('loading_indicator')).toBeTruthy();

    await waitFor(() => {
      expect(getByText('Registration Complete!')).toBeTruthy();
      expect(queryByTestId('loading_indicator')).toBeNull();
    });
  });
});
```

#### 2. The Form Component Code (`WizardForm.tsx` - Written Second to pass the tests)
```tsx
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  View 
} from 'react-native';

export function WizardForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError('');
    // Simple email validation regex check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid Email Address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.myportal.com/register', {
        method: 'POST',
        body: JSON.stringify({ email, name }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        setError('Server Registration Failed');
      }
    } catch (err) {
      setError('Network Connection Error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <View style={styles.container}>
        <Text style={styles.successText}>Registration Complete!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        testID="email_input"
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        testID="name_input"
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      {loading ? (
        <ActivityIndicator testID="loading_indicator" size="small" color="#3182ce" />
      ) : (
        <TouchableOpacity testID="submit_btn" onPress={handleSubmit} style={styles.button}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#cbd5e0', padding: 12, borderRadius: 8, marginVertical: 6 },
  errorText: { color: '#e53e3e', fontSize: 13, marginVertical: 4 },
  successText: { color: '#38a169', fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  button: { backgroundColor: '#3182ce', padding: 14, borderRadius: 8, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold' }
});
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ validation executions. Async fetch resolves depending on network speed.
- **Space Complexity**: $O(1)$ memory footprints.
- **Explanation**: This showcases a full TDD loop. In the "Red" phase, we wrote test specifications checking UI elements and mocked fetch actions. In the "Green" phase, we implemented email regex validation, state handling, loading indicators, and success panels to make the tests pass.
