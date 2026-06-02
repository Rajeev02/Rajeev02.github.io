These are good **React Native interview questions** because they test:

- JavaScript fundamentals (objects, shallow/deep copy)
- API calling
- React Hooks (`useState`, `useEffect`)
- Rendering lists
- Async programming
- Debugging

---

# Question 1: JavaScript Object Manipulation

### Given Object

```javascript
const person = {
  first_Name: "Alex",
  "last Name": "Smith",
  age: 20,
  hobbies: ["watching movies", "playing games"],
  directory: {
    1: {
      type: "home",
      address: "123 Main Street",
      city: "TechCity",
    },
  },
};
```

---

## Q1. Access the first name and last name

### Solution

```javascript
console.log(person.first_Name);
console.log(person["last Name"]);
```

### Output

```javascript
Alex;
Smith;
```

---

## Q2. Copy person object to person2

### Deep Copy

```javascript
const person2 = structuredClone(person);
```

Alternative:

```javascript
const person2 = JSON.parse(JSON.stringify(person));
```

---

## Q3. Access person2's first_Name

```javascript
console.log(person2.first_Name);
```

### Output

```javascript
Alex;
```

---

## Q4. Update person2's first_Name to "Foo"

```javascript
person2.first_Name = "Foo";
```

---

## Q5. What will be the value of person2.first_Name and person.first_Name?

```javascript
console.log(person2.first_Name);
console.log(person.first_Name);
```

### Output

```javascript
Foo;
John;
```

### Why?

Because `structuredClone()` creates a completely new object.

---

## Q6. Access person's city

```javascript
console.log(person.directory["1"].city);
```

### Output

```javascript
Bengaluru;
```

---

## Q7. Update person2's city to Chennai

```javascript
person2.directory["1"].city = "Chennai";
```

---

## Q8. What will be the value of person2.city and person.city?

```javascript
console.log(person2.directory["1"].city);
console.log(person.directory["1"].city);
```

### Output

```javascript
Chennai;
Bengaluru;
```

### Why?

Because deep copy creates separate nested objects.

---

# Follow-up Interview Question

### What happens if we use spread operator?

```javascript
const person2 = { ...person };
```

This creates a **shallow copy**.

```javascript
person2.directory["1"].city = "Chennai";

console.log(person.directory["1"].city);
```

### Output

```javascript
Chennai;
```

### Why?

Nested objects are still sharing the same reference.

---

# Question 2: API Fetching in React Native

### API

```javascript
https://dummyjson.com/todos
```

---

## What's wrong in the code?

Current code:

```javascript
setTodos(data);
```

API response:

```javascript
{
  todos: [...],
  total: 254,
  skip: 0,
  limit: 30
}
```

You only need:

```javascript
data.todos;
```

---

## Correct Solution

```javascript
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

const API_URL = "https://dummyjson.com/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      const data = await response.json();

      setTodos(data.todos);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Text>
          {item.id}. {item.todo}
        </Text>
      )}
    />
  );
}
```

---

# Follow-up Questions

### Why use useEffect?

```javascript
useEffect(() => {
  fetchData();
}, []);
```

Because it runs once after component mount.

---

### What happens if dependency array is removed?

```javascript
useEffect(() => {
  fetchData();
});
```

Infinite re-render loop.

---

### Difference between useEffect and useLayoutEffect?

| useEffect        | useLayoutEffect |
| ---------------- | --------------- |
| Async            | Sync            |
| After paint      | Before paint    |
| Doesn't block UI | Blocks UI       |

---

# Senior React Native Interview Questions

### 1. Difference between State and Props

**State**

```javascript
const [count, setCount] = useState(0);
```

Mutable.

**Props**

```javascript
<MyComponent title="Hello" />
```

Read-only.

---

### 2. What is React Reconciliation?

Process React uses to compare Virtual DOM and update only changed nodes.

---

### 3. What is Memoization?

```javascript
React.memo(Component);
```

Prevents unnecessary re-renders.

---

### 4. Difference between useMemo and useCallback

#### useMemo

Caches value.

```javascript
const total = useMemo(() => {
  return calculateTotal(items);
}, [items]);
```

#### useCallback

Caches function.

```javascript
const onPress = useCallback(() => {
  console.log("Clicked");
}, []);
```

---

### 5. Explain FlatList Optimization

```javascript
<FlatList
  removeClippedSubviews
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

Used for large datasets.

---

### 6. Difference between ScrollView and FlatList

| ScrollView        | FlatList           |
| ----------------- | ------------------ |
| Renders all items | Lazy rendering     |
| Poor performance  | Better performance |
| Small data        | Large data         |

---

### 7. What is the React Native Bridge?

Bridge enables communication between:

- JavaScript Thread
- Native Android/iOS Thread

New Architecture replaces much of this with:

- JSI
- TurboModules
- Fabric

---

### 8. How does Redux Toolkit work?

```javascript
const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
  },
});
```

Benefits:

- Less boilerplate
- Immer support
- Better performance

---

### 9. Difference between AsyncStorage and MMKV

| AsyncStorage | MMKV        |
| ------------ | ----------- |
| Async        | Sync        |
| Slower       | Faster      |
| Old approach | Recommended |

---

### 10. Explain React Native New Architecture

Components:

1. JSI
2. TurboModules
3. Fabric Renderer

Benefits:

- Faster startup
- Better performance
- Direct JS ↔ Native communication
- Reduced bridge overhead

These are the kinds of JavaScript + React Native questions typically asked in Senior React Native interviews at companies like IBM, UST, Infosys, Accenture, Capgemini, TCS Digital, and product companies.
