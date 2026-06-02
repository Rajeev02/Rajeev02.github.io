# IBM Senior React Native Interview Guide

Complete First Round Technical Preparation Guide for Senior React Native Developers

---

# 1. Tell Me About Yourself

## Question

Tell me about yourself.

## Answer

I am a Senior Mobile Engineer with around 9 years of experience in mobile application development, including around 5 years in React Native development.

My expertise includes:

- React Native
- JavaScript
- TypeScript
- Android development
- Redux Toolkit
- React Query
- Authentication systems
- CI/CD
- Performance optimization
- Release management
- Scalable mobile architecture

I have worked on cross-platform applications for Android and iOS, handling complete development lifecycle including:

- Feature development
- API integration
- Deep linking
- Push notifications
- Analytics
- App releases
- Production support

---

# 2. React Native Architecture

## Question

Explain React Native architecture.

## Answer

### Main Components

- JavaScript Thread
- Native/UI Thread
- Bridge

The JavaScript thread handles business logic while the Native thread handles rendering. Communication happens through the bridge.

In the old architecture, bridge communication created performance bottlenecks.

### New Architecture Introduces

- JSI
- TurboModules
- Fabric Renderer

These improve performance and reduce bridge overhead.

### Important for Senior Interviews

Explain:

- Why bridge communication was slow
- How JSI improves direct communication

---

# 3. React Hooks

## useEffect

### Question

What is useEffect?

### Answer

`useEffect` is used for handling side effects like:

- API calls
- Subscriptions
- Listeners
- Timers

```javascript
useEffect(() => {
  fetchUsers();
}, []);
```

---

## useMemo vs useCallback

### Answer

- `useMemo` memoizes values
- `useCallback` memoizes functions

```javascript
const filteredUsers = useMemo(() => {
  return users.filter((item) => item.active);
}, [users]);

const onPress = useCallback(() => {
  navigation.navigate("Home");
}, []);
```

---

# 4. FlatList Optimization

## Question

How do you optimize FlatList?

## Answer

### Optimization Techniques

- keyExtractor
- getItemLayout
- pagination
- windowSize
- initialNumToRender
- removeClippedSubviews
- memoization

```javascript
<FlatList
  data={users}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderItem}
  initialNumToRender={10}
  windowSize={5}
  removeClippedSubviews
/>
```

### Important Senior-Level Point

Senior-level interviews often ask:

> “How did you optimize large data rendering in production?”

---

# 5. Redux Toolkit

## Question

Why Redux Toolkit?

## Answer

Redux Toolkit reduces boilerplate code and simplifies Redux implementation.

### Benefits

- Cleaner reducers
- Built-in Immer support
- Better maintainability
- Scalable architecture

```javascript
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});
```

---

# 6. API Calling

## Fetch Example

```javascript
const fetchUsers = async () => {
  const response = await fetch("https://api.com/users");
  const data = await response.json();
  return data;
};
```

## Axios Example

```javascript
const response = await axios.get("https://api.com/users");
console.log(response.data);
```

## Question

Axios vs Fetch?

## Answer

Axios provides:

- Interceptors
- Timeout handling
- Request cancellation
- Automatic JSON parsing

---

# 7. JavaScript Concepts

## Closure

```javascript
function outer() {
  let count = 0;

  return function inner() {
    count++;
    return count;
  };
}
```

---

## Debouncing

Debouncing delays function execution until the user stops typing.

Commonly used in search.

---

## Event Loop

JavaScript is single-threaded.

Event loop handles async operations.

---

# 8. TypeScript Concepts

## Question

Interface vs Type?

## Answer

Interfaces are mainly used for object structures.

Types are more flexible and support:

- Union types
- Intersection types
- Primitive aliases

```javascript
interface User {
  name: string;
  age: number;
}
```

---

# 9. Authentication Flow

## Question

Explain JWT authentication flow.

## Answer

### Flow

1. User logs in
2. Server returns access token and refresh token
3. Access token used for API authorization
4. Refresh token generates new access token

Tokens should be securely stored using:

- Keychain
- Keystore

---

# 10. Production Issues

## Question

Biggest challenge you faced?

## Answer

One major challenge was performance lag on low-end Android devices because of heavy rendering and multiple API-driven components.

### Optimizations Done

- FlatList rendering
- memoization
- API loading sequence
- image rendering

This improved responsiveness and reduced frame drops.

---

# 11. Final Interview Tips

- Speak slowly and confidently
- Give practical examples
- Mention production experience
- Focus on performance and scalability
- Keep answers structured
- Avoid overly theoretical explanations

---

# 12. Most Asked JavaScript & React Native Coding Programs

## 1. Reverse String

```javascript
function reverseString(str) {
  return str.split("").reverse().join("");
}

console.log(reverseString("react"));
// Output: tcaer
```

---

## 2. Palindrome Check

```javascript
function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}

console.log(isPalindrome("madam"));
// Output: true
```

---

## 3. Find Maximum Number

```javascript
function findMax(arr) {
  return Math.max(...arr);
}

console.log(findMax([1, 5, 10, 3]));
// Output: 10
```

---

## 4. Remove Duplicates

```javascript
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

console.log(removeDuplicates([1, 2, 2, 3, 4, 4]));
// Output: [1,2,3,4]
```

---

## 5. Fibonacci Series

```javascript
function fibonacci(n) {
  let series = [0, 1];

  for (let i = 2; i < n; i++) {
    series[i] = series[i - 1] + series[i - 2];
  }

  return series;
}

console.log(fibonacci(6));
// Output: [0,1,1,2,3,5]
```

---

## 6. Factorial

```javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));
// Output: 120
```

---

## 7. Count Character Frequency

```javascript
function frequencyCount(str) {
  const count = {};

  for (let char of str) {
    count[char] = (count[char] || 0) + 1;
  }

  return count;
}

console.log(frequencyCount("hello"));
// Output: { h:1, e:1, l:2, o:1 }
```

---

## 8. Sort Array

```javascript
function sortArray(arr) {
  return arr.sort((a, b) => a - b);
}

console.log(sortArray([5, 2, 8, 1]));
// Output: [1,2,5,8]
```

---

## 9. Find Even Numbers

```javascript
function findEven(arr) {
  return arr.filter((num) => num % 2 === 0);
}

console.log(findEven([1, 2, 3, 4, 5, 6]));
// Output: [2,4,6]
```

---

## 10. Sum of Array

```javascript
function sumArray(arr) {
  return arr.reduce((sum, item) => sum + item, 0);
}

console.log(sumArray([1, 2, 3, 4]));
// Output: 10
```

---

## 11. Find Largest Word

```javascript
function largestWord(sentence) {
  return sentence.split(" ").sort((a, b) => b.length - a.length)[0];
}

console.log(largestWord("React Native Developer"));
// Output: Developer
```

---

## 12. Debounce Function

```javascript
function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
```

---

## 13. Throttle Function

```javascript
function throttle(func, limit) {
  let flag = true;

  return function (...args) {
    if (flag) {
      func(...args);
      flag = false;

      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
}
```

---

## 14. Find Missing Number

```javascript
function missingNumber(arr, n) {
  const total = (n * (n + 1)) / 2;
  const sum = arr.reduce((a, b) => a + b, 0);

  return total - sum;
}

console.log(missingNumber([1, 2, 4, 5], 5));
// Output: 3
```

---

## 15. Capitalize First Letter

```javascript
function capitalize(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

console.log(capitalize("react native developer"));
// Output: React Native Developer
```

---

## 16. Flatten Nested Array

```javascript
function flatten(arr) {
  return arr.flat(Infinity);
}

console.log(flatten([1, [2, [3, 4]]]));
// Output: [1,2,3,4]
```

---

## 17. Check Prime Number

```javascript
function isPrime(num) {
  if (num <= 1) return false;

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

console.log(isPrime(7));
// Output: true
```

---

## 18. Find Second Largest Number

```javascript
function secondLargest(arr) {
  const unique = [...new Set(arr)].sort((a, b) => b - a);
  return unique[1];
}

console.log(secondLargest([10, 5, 8, 20]));
// Output: 10
```

---

## 19. Group By Age

```javascript
const users = [
  { name: "A", age: 20 },
  { name: "B", age: 20 },
  { name: "C", age: 25 },
];

const grouped = users.reduce((acc, item) => {
  acc[item.age] = acc[item.age] || [];
  acc[item.age].push(item);
  return acc;
}, {});

console.log(grouped);
```

---

## 20. Async Await API Example

```javascript
async function fetchData() {
  try {
    const response = await fetch("https://api.com/users");
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
```

---

# 13. Senior-Level Interview Explanation Guide

## React Native Architecture — What You Should Explain

### Important for Senior Interviews

Interviewers are not only checking definitions.

They want to know:

- WHY problems happen
- HOW architecture solves them

---

## Old Architecture Problems

In old React Native architecture, communication between JavaScript and native modules happened through the bridge.

### Problems

- Bridge communication was asynchronous
- Messages were serialized into JSON
- Heavy UI updates created bottlenecks
- Large bridge communication caused frame drops
- Animations became laggy when JS thread was busy

---

## How JSI Improves This

JSI allows JavaScript to directly communicate with native modules without relying heavily on the bridge.

### Benefits

- less serialization
- faster execution
- better rendering performance
- reduced frame drops
- improved startup time

---

## Best Senior-Level Answer

> In old React Native architecture, communication between JavaScript and native modules happened through the bridge.
>
> When apps became complex with heavy rendering, large lists, animations, and multiple API calls, bridge communication created bottlenecks because all data needed serialization.
>
> The new architecture using JSI, TurboModules, and Fabric reduces bridge dependency and improves direct communication between JavaScript and native layers, which significantly improves rendering and performance.

---

# FlatList Optimization — What You Should Explain

## Common Problems in Large Lists

- memory issues
- slow rendering
- frame drops
- scroll lag
- multiple re-renders

---

## Important Props Explanation

- `keyExtractor` → stable unique keys
- `initialNumToRender` → initial rendering optimization
- `windowSize` → controls render window
- `removeClippedSubviews` → removes offscreen views
- `getItemLayout` → avoids layout calculation

---

## Best Senior-Level Answer

> For large lists, performance becomes critical because rendering thousands of items can cause memory issues and frame drops.
>
> I optimize FlatList using pagination, memoization, keyExtractor, getItemLayout, and virtualization-related props.
>
> I also avoid unnecessary re-renders by memoizing renderItem components and using debounced search handling.
>
> In one project, these optimizations improved scrolling performance significantly on low-end Android devices.

---

# Hooks — What You Should Explain

## useEffect

### Best Explanation

> useEffect is used for handling side effects such as API calls, subscriptions, timers, and listeners.
>
> Dependency management is very important because incorrect dependencies can cause unnecessary API calls, infinite loops, and performance issues.
>
> I usually separate effects based on responsibility to keep components maintainable and avoid unnecessary re-renders.

---

## useMemo vs useCallback

### What Interviewer Expects

- Why memoization matters
- When NOT to use it
- Performance understanding

### Best Explanation

> useMemo memoizes computed values while useCallback memoizes functions.
>
> I mainly use them to reduce unnecessary re-renders, especially in large component trees and FlatList rendering.
>
> However, overusing memoization can also increase complexity, so I only use it when performance optimization is actually needed.

---

# Redux Toolkit — What You Should Explain

## Important Concepts

- Global state management
- Boilerplate reduction
- Scalability
- Maintainability

---

## Best Senior-Level Answer

> Redux Toolkit simplifies Redux implementation by reducing boilerplate code and improving maintainability.
>
> I mainly use Redux Toolkit for global client-side state like authentication, user profile, and theme management.
>
> For server-side state like API caching and synchronization, I prefer React Query because it provides caching, retries, and background refetching.

---

# React Query — What You Should Explain

## Key Concepts

- server state
- caching
- background sync
- pagination
- stale data handling

---

## Best Senior-Level Answer

> React Query helps efficiently manage server-side state.
>
> Instead of manually handling loading, caching, and retries, React Query provides built-in mechanisms.
>
> This reduces boilerplate code and improves performance, especially in API-heavy applications.

---

# Authentication Flow — What You Should Explain

## Key Concepts

- JWT authentication
- refresh token
- secure storage
- session expiration

---

## Best Senior-Level Answer

> In JWT authentication flow, user credentials are validated by backend, and access token and refresh token are returned.
>
> Access token is used for API authorization.
>
> When the token expires, refresh token generates a new access token.
>
> Sensitive tokens should always be stored securely using Keychain or Keystore instead of AsyncStorage.

---

# Performance Optimization — What You Should Explain

## Key Concepts

- reducing re-renders
- image optimization
- lazy loading
- pagination
- Hermes
- memory management

---

## Best Senior-Level Answer

> I focus on reducing unnecessary re-renders, optimizing large lists, lazy loading heavy screens, and reducing image memory usage.
>
> I also use Hermes for better startup performance and monitor performance using tools like:
>
> - Flipper
> - React DevTools
> - Android Profiler
> - Crashlytics

---

# JavaScript Event Loop — What You Should Explain

## Best Explanation

> JavaScript is single-threaded.
>
> The event loop helps manage asynchronous operations.
>
> When async operations like API calls complete, callbacks move from callback queue to call stack.
>
> Understanding event loop is important because blocking the JavaScript thread can freeze UI interactions in React Native.

---

# Production Crash Debugging — What You Should Explain

## Best Explanation

> I usually debug production crashes using Crashlytics, logs, stack traces, and analytics.
>
> First I identify:
>
> - affected devices
> - OS version
> - app version
> - reproduction steps
>
> Then I prioritize fixes based on impact and release hotfix updates if required.

---

# Native Modules — What You Should Explain

## Best Explanation

> Native modules are required when React Native cannot directly provide platform-specific functionality such as:
>
> - Bluetooth
> - background services
> - camera processing
> - biometric authentication
>
> I have worked on integrating third-party SDKs and native modules where performance-critical features were needed.

---

# CI/CD — What You Should Explain

## Best Explanation

> CI/CD helps automate builds, testing, and deployments.
>
> I have worked with tools like:
>
> - Fastlane
> - GitHub Actions
> - Jenkins
>
> for automated Android and iOS release workflows.
>
> This reduces manual deployment errors and improves release consistency.

---

# Senior-Level Communication Tips

Interviewers judge communication and ownership at senior level.

## Always Explain Using This Structure

1. Problem
2. Why issue happened
3. How you solved it
4. Result or improvement

---

## Example

> We noticed screen lag on low-end Android devices.
>
> After profiling, we identified unnecessary re-renders and large image loading issues.
>
> We optimized FlatList, implemented memoization, and reduced image memory usage.
>
> This significantly improved scroll performance and reduced frame drops.

---

# Prepared for IBM Senior React Native Developer Interview

Best of Luck 🚀
