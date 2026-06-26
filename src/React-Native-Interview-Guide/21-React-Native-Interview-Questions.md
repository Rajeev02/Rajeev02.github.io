# 21-React-Native-Interview-Questions.md

# Senior React Native Interview Questions & Answers

---

# 1. What is React Native?

## Answer

React Native is an open-source framework developed by Meta that allows developers to build cross-platform mobile applications using JavaScript/TypeScript and React.

Using a single codebase, applications can run on both Android and iOS.

---

# 2. Why React Native?

## Answer

Benefits:

* Single Codebase
* Faster Development
* Code Reusability
* Large Community
* Native Performance
* OTA Updates

---

# 3. React Native vs React

| React            | React Native        |
| ---------------- | ------------------- |
| Web Applications | Mobile Applications |
| HTML Elements    | Native Components   |
| DOM              | Native UI           |
| Browser          | Android/iOS         |

---

## Interview Answer

"React is used for web development, while React Native is used for building native mobile applications."

---

# 4. React Native vs Flutter

| React Native      | Flutter             |
| ----------------- | ------------------- |
| JavaScript/TS     | Dart                |
| Native Components | Custom Rendering    |
| Large Ecosystem   | Google Ecosystem    |
| Faster Hiring     | Smaller Talent Pool |

---

## Interview Answer

"React Native uses native components and JavaScript, whereas Flutter uses Dart and its own rendering engine."

---

# 5. How Does React Native Work?

## Old Architecture

```text
JavaScript
     ↓
Bridge
     ↓
Native Layer
```

---

## New Architecture

```text
JavaScript
     ↓
JSI
     ↓
Fabric
     ↓
Native Layer
```

---

## Interview Answer

"React Native converts JavaScript logic into native operations through the React Native runtime."

---

# 6. What is Metro Bundler?

## Answer

Metro is React Native's JavaScript bundler.

Responsibilities:

* Bundle JS
* Hot Reloading
* Dependency Resolution
* Asset Handling

---

# 7. What is Babel?

## Answer

Babel converts modern JavaScript into compatible JavaScript.

Example:

```javascript
const add = (a,b) => a+b;
```

is transformed into browser-compatible code.

---

# 8. What is Virtual DOM?

## Answer

Virtual DOM is an in-memory representation of UI.

React compares:

```text
Old VDOM
     ↓
Diff
     ↓
New VDOM
```

and updates only changed parts.

---

# 9. What is Reconciliation?

## Answer

Reconciliation is React's process of comparing Virtual DOM trees and updating only changed elements.

---

# 10. What is React Fiber?

## Answer

Fiber is React's rendering engine responsible for scheduling and prioritizing updates.

---

# 11. What is the Bridge?

## Answer

Bridge enables communication between JavaScript and Native code.

---

## Limitation

* Async Only
* Serialization Cost
* Performance Bottleneck

---

# 12. What is JSI?

## Answer

JSI (JavaScript Interface) enables direct communication between JavaScript and Native code without using the Bridge.

---

## Benefits

* Faster
* Synchronous Calls
* Lower Overhead

---

# 13. What is Hermes?

## Answer

Hermes is React Native's optimized JavaScript engine.

---

## Benefits

* Faster Startup
* Lower Memory Usage
* Smaller Bundle Size

---

# 14. What is Fabric?

## Answer

Fabric is the new rendering system in React Native.

---

## Benefits

* Faster Rendering
* Better Synchronization
* Concurrent Rendering Support

---

# 15. What is TurboModule?

## Answer

TurboModules replace legacy Native Modules and load lazily when required.

---

## Benefits

* Faster Startup
* Better Memory Usage

---

# 16. What is Codegen?

## Answer

Codegen automatically generates native bindings between JavaScript and Native code.

---

# 17. What is Yoga?

## Answer

Yoga is React Native's layout engine.

It calculates:

* Width
* Height
* Position
* Flexbox Layout

---

# 18. What is Shadow Tree?

## Answer

Shadow Tree represents the UI hierarchy before rendering to native views.

---

# 19. What is Shadow Thread?

## Answer

Shadow Thread calculates layouts using Yoga before updates are applied to the UI.

---

# 20. What is Bridgeless Mode?

## Answer

Bridgeless Mode removes the traditional bridge and relies on JSI for communication.

---

# 21. What is AppState?

## Answer

AppState tracks application lifecycle.

States:

```text
active
background
inactive
```

---

# 22. AsyncStorage vs MMKV

| AsyncStorage    | MMKV        |
| --------------- | ----------- |
| Async           | Sync        |
| Slower          | Faster      |
| Larger Overhead | Lightweight |

---

## Interview Answer

"MMKV provides significantly better performance than AsyncStorage."

---

# 23. AsyncStorage vs Keychain

| AsyncStorage  | Keychain/Keystore |
| ------------- | ----------------- |
| Not Encrypted | Encrypted         |
| Preferences   | Sensitive Data    |
| Tokens ❌      | Tokens ✅          |

---

# 24. What is Deep Linking?

## Answer

Deep Linking allows applications to open specific screens from URLs.

Example:

```text
myapp://profile/123
```

---

# 25. What are Push Notifications?

## Answer

Push notifications are messages delivered from servers even when the application is not active.

---

## Services

```text
FCM

APNs
```

---

# 26. What is Headless JS?

## Answer

Headless JS allows JavaScript execution in the background without UI interaction.

---

## Use Cases

* Background Sync
* Notifications
* Upload Tasks

---

# 27. What is RTK Query?

## Answer

RTK Query is Redux Toolkit's data fetching and caching solution.

---

## Benefits

* Auto Caching
* Auto Refetching
* Less Boilerplate

---

# 28. How Do You Optimize FlatList?

## Answer

Use:

```javascript
initialNumToRender

windowSize

removeClippedSubviews

getItemLayout
```

---

## Interview Answer

"FlatList optimization focuses on reducing rendering overhead and memory usage."

---

# 29. React.memo vs useMemo vs useCallback

| Feature     | Purpose               |
| ----------- | --------------------- |
| React.memo  | Component Memoization |
| useMemo     | Value Memoization     |
| useCallback | Function Memoization  |

---

# 30. Common Performance Optimizations

## Techniques

* React.memo
* useMemo
* useCallback
* Hermes
* FlatList Optimization
* FlashList
* Image Caching
* Lazy Loading

---

# 31. How Do You Handle Offline Support?

## Architecture

```text
API
 ↓
Cache
 ↓
Local Storage
```

---

## Storage Options

```text
SQLite

Realm

MMKV
```

---

# 32. How Do You Secure React Native Apps?

## Best Practices

* HTTPS
* JWT
* Refresh Tokens
* Keychain
* Keystore
* Certificate Pinning

---

# 33. What is Certificate Pinning?

## Answer

Certificate Pinning ensures communication occurs only with trusted servers.

---

## Benefit

Prevents:

```text
MITM Attacks
```

---

# 34. How Do You Structure Large React Native Projects?

## Preferred Structure

```text
src
│
├── features
├── navigation
├── services
├── hooks
├── store
├── components
└── utils
```

---

# 35. Which Architecture Do You Use?

## Answer

For enterprise applications:

```text
MVVM
+
Clean Architecture
+
Repository Pattern
```

---

# 36. How Do You Handle API Calls?

## Architecture

```text
Screen
 ↓
Repository
 ↓
RTK Query
 ↓
Backend
```

---

# 37. How Do You Debug React Native Apps?

## Tools

* Flipper
* React DevTools
* Chrome DevTools
* Android Studio
* Xcode

---

# 38. How Do You Monitor Production Apps?

## Tools

```text
Firebase Crashlytics

Sentry

Datadog
```

---

# 39. How Do You Handle Authentication?

## Flow

```text
Login
 ↓
JWT
 ↓
Keychain
 ↓
API
```

---

## Refresh Flow

```text
Expired
 ↓
Refresh Token
 ↓
New Access Token
```

---

# 40. Explain Your Preferred Enterprise Architecture

## Answer

```text
Presentation Layer
       ↓
Redux Toolkit
       ↓
RTK Query
       ↓
Repository Pattern
       ↓
API Layer
       ↓
Backend
```

---

Shared Services:

```text
Auth

Analytics

Notifications

Storage

Monitoring
```

---

# Top 25 Most Asked React Native Questions

1. What is React Native?
2. React Native vs Flutter?
3. React Native vs Native?
4. How React Native Works?
5. What is Metro?
6. What is Babel?
7. What is Virtual DOM?
8. What is Reconciliation?
9. What is Fiber?
10. What is Bridge?
11. What is JSI?
12. What is Hermes?
13. What is Fabric?
14. What is TurboModule?
15. What is Codegen?
16. What is Yoga?
17. What is Deep Linking?
18. What is AppState?
19. AsyncStorage vs MMKV?
20. RTK Query?
21. FlatList Optimization?
22. Offline Support?
23. Security Best Practices?
24. React Native Architecture?
25. Explain Your Current Project Architecture.

---

# Ultimate Senior Interview Answer

"React Native enables efficient cross-platform mobile development using a shared codebase while still leveraging native capabilities. In enterprise applications, I focus on scalable architecture, performance optimization, secure authentication, offline support, monitoring, and React Native's New Architecture features such as JSI, Hermes, Fabric, and TurboModules."

---

# Daily Revision Plan

```text
Core React Native          10 min
New Architecture           15 min
Performance                10 min
Security                   10 min
Offline Support            5 min
Architecture               10 min

Total: ~60 Minutes
```

---

# Question 56: Authorization Interceptor (Axios vs Fetch)

In React Native, **Axios** is much more common than OkHttp.

### Axios Interceptor

```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
```

### If using Secure Storage

```javascript
import * as Keychain from 'react-native-keychain';

api.interceptors.request.use(async config => {
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
        config.headers.Authorization = `Bearer ${credentials.password}`;
    }

    return config;
});
```

### Does `fetch` support interceptors?

**`fetch` does not support interceptors** like Axios or OkHttp.

In React Native, you have three common approaches:

#### 1. Create a wrapper around `fetch` (Recommended)

This is the closest equivalent to an interceptor.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://api.example.com';

export async function apiRequest(endpoint, options = {}) {
    const token = await AsyncStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        throw new Error('API Error');
    }

    return response.json();
}
```

Usage:

```javascript
const users = await apiRequest('/users');

const profile = await apiRequest('/profile', {
    method: 'POST',
    body: JSON.stringify(data),
});
```

#### 2. Pass the token in every API call

```javascript
const token = await AsyncStorage.getItem('token');

fetch(url, {
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
```

This works but leads to repeated code and is harder to maintain.

#### 3. Create a custom `fetch` function

You can even name it `fetchWithAuth`:

```javascript
export async function fetchWithAuth(url, options = {}) {
    const token = await AsyncStorage.getItem('token');

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : '',
        },
    });
}
```

Then use it everywhere:

```javascript
const response = await fetchWithAuth('/users');
```

#### Which approach is used in production?

* **Axios** → Use request/response interceptors.
* **Fetch** → Create a wrapper (`apiRequest` or `fetchWithAuth`).
* **React Query/RTK Query** → Configure a common `baseQuery` or fetch function that automatically attaches the token.

#### Interview answer

If asked, "Can we implement an interceptor with `fetch`?"

A good response is:

> "No. The native Fetch API doesn't provide interceptor support like Axios or OkHttp. In React Native, we typically create a wrapper function around `fetch` or a reusable API service that retrieves the token from secure storage and attaches it to the `Authorization` header before making the request. This gives us interceptor-like behavior."

This demonstrates both the limitation of `fetch` and the standard production pattern.

---

# Question 57: University Course Problem (JavaScript Array Methods)

### Models

```javascript
const students = [
    {
        id: 1,
        name: "Raj",
        subscribedCourses: [
            { id: 1, name: "Maths", isPaid: false },
            { id: 2, name: "Arts", isPaid: true }
        ]
    },
    {
        id: 2,
        name: "John",
        subscribedCourses: [
            { id: 3, name: "History", isPaid: true },
            { id: 4, name: "Biology", isPaid: true }
        ]
    },
    {
        id: 3,
        name: "Mike",
        subscribedCourses: [
            { id: 5, name: "Physics", isPaid: true },
            { id: 3, name: "History", isPaid: true }
        ]
    }
];
```

### Solution

```javascript
function getPaidCoursesWithTheNumbersOfSubscribedStudents(
    students,
    coursesCount
) {
    const courseMap = new Map();

    students.forEach(student => {
        student.subscribedCourses
            .filter(course => course.isPaid)
            .forEach(course => {

                if (!courseMap.has(course.id)) {
                    courseMap.set(course.id, {
                        course,
                        count: 0
                    });
                }

                courseMap.get(course.id).count++;
            });
    });

    return [...courseMap.values()]
        .sort((a, b) => b.count - a.count)
        .slice(0, coursesCount)
        .reduce((result, item) => {
            result[item.course.name] = item.count;
            return result;
        }, {});
}
```

### Example

```javascript
const result =
    getPaidCoursesWithTheNumbersOfSubscribedStudents(students, 3);

console.log(result);
```

Output

```javascript
{
    History: 2,
    Arts: 1,
    Biology: 1
}
```

### More Interview-Friendly JavaScript (using Array methods)

```javascript
const getPaidCoursesWithTheNumbersOfSubscribedStudents = (
    students,
    coursesCount
) => {

    const counts = {};

    students
        .flatMap(student => student.subscribedCourses)
        .filter(course => course.isPaid)
        .forEach(course => {
            counts[course.name] = (counts[course.name] || 0) + 1;
        });

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, coursesCount);
};
```

### React Native Interview Mapping

| Kotlin                     | JavaScript / React Native           |
| -------------------------- | ----------------------------------- |
| `flatMap`                  | `flatMap()`                         |
| `filter`                   | `filter()`                          |
| `groupingBy().eachCount()` | `Map` or `reduce()`                 |
| `sortedByDescending`       | `sort((a,b)=>b-a)`                  |
| `take(n)`                  | `slice(0,n)`                        |
| `associate()`              | `reduce()` / `Object.fromEntries()` |
| OkHttp Interceptor         | Axios Request Interceptor           |

These are the JavaScript patterns interviewers commonly expect for React Native roles.
