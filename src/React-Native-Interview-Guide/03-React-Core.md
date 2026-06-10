# 03-React-Core.md

# React Fundamentals for Senior React Native Developers

---

# 1. What is React?

## Definition

React is an open-source JavaScript library developed by Facebook for building user interfaces using reusable components.

React follows a component-based architecture and uses a Virtual DOM to efficiently update the UI.

---

## Why Do We Need React?

Before React:

* Direct DOM manipulation
* Complex UI updates
* Difficult state management
* Poor maintainability

React solves this by:

* Component-based development
* Declarative UI
* Efficient rendering
* Better code reusability

---

## Key Features

* Component-Based
* Virtual DOM
* One-Way Data Flow
* Reusable Components
* Declarative UI

---

## Interview Answer

"React is a JavaScript library for building user interfaces using reusable components. It improves performance through the Virtual DOM and simplifies UI development through a declarative programming model."

---

# 2. JSX

## Definition

JSX (JavaScript XML) is a syntax extension that allows writing HTML-like UI code inside JavaScript.

---

## Example

```jsx
const element =
  <Text>Hello</Text>;
```

---

## Without JSX

```javascript
React.createElement(
  Text,
  null,
  "Hello"
);
```

---

## How It Works?

```text
JSX
 ↓
Babel
 ↓
React.createElement()
 ↓
React Element
 ↓
Virtual DOM
```

---

## Why Do We Need It?

* Easier to read
* Easier to write UI
* Better developer experience

---

## Interview Answer

"JSX is a syntax extension that allows developers to write UI in an HTML-like format. Babel converts JSX into React.createElement calls before execution."

---

# 3. React Elements

## Definition

React Elements are plain JavaScript objects that describe what should appear on the screen.

---

## Example

```jsx
<Text>Hello</Text>
```

Internally:

```javascript
{
  type: "Text",
  props: {
    children: "Hello"
  }
}
```

---

## Interview Answer

"React Elements are immutable JavaScript objects representing UI components."

---

# 4. Virtual DOM (VDOM)

## Definition

Virtual DOM is a lightweight in-memory representation of the actual UI.

---

## Why Do We Need It?

Updating the real DOM/UI is expensive.

React compares:

```text
Old Virtual DOM
      vs
New Virtual DOM
```

and updates only changed nodes.

---

## Flow

```text
State Change
     ↓
New Virtual DOM
     ↓
Diffing
     ↓
Update UI
```

---

## Benefits

* Better performance
* Fewer UI updates
* Faster rendering

---

## Interview Answer

"Virtual DOM is a lightweight copy of the UI stored in memory. React compares Virtual DOM trees and updates only changed elements."

---

# 5. Reconciliation

## Definition

Reconciliation is React's process of comparing old and new Virtual DOM trees.

---

## Why Do We Need It?

To avoid re-rendering the entire UI.

---

## Example

Old:

```jsx
<Text>Hello</Text>
```

New:

```jsx
<Text>Hello Raj</Text>
```

React updates only the text node.

---

## Interview Answer

"Reconciliation is React's diffing algorithm that determines the minimum number of UI updates required after a state change."

---

# 6. React Fiber

## Definition

Fiber is React's modern reconciliation engine introduced in React 16.

---

## Why Was Fiber Introduced?

Old reconciliation blocked the UI.

Fiber allows:

* Prioritization
* Scheduling
* Incremental rendering
* Interruptible work

---

## Benefits

* Better responsiveness
* Concurrent Rendering
* Improved performance

---

## Interview Answer

"Fiber is React's internal reconciliation engine responsible for scheduling and prioritizing rendering work."

---

# 7. Rendering Process

## Flow

```text
State Change
      ↓
Render Phase
      ↓
Virtual DOM Creation
      ↓
Reconciliation
      ↓
Commit Phase
      ↓
UI Update
```

---

## Render Phase

Creates Virtual DOM.

---

## Commit Phase

Applies changes to UI.

---

## Interview Answer

"React rendering consists of a render phase where the Virtual DOM is generated and a commit phase where changes are applied to the UI."

---

# 8. Components

## Definition

Components are reusable building blocks of React applications.

---

## Types

### Functional Components

```jsx
function Header() {
  return <Text>Hello</Text>;
}
```

---

### Class Components

```jsx
class Header extends React.Component {
  render() {
    return <Text>Hello</Text>;
  }
}
```

---

## Interview Answer

"Components are reusable units of UI. Modern React applications primarily use Functional Components."

---

# 9. Props

## Definition

Props (Properties) are read-only values passed from parent to child components.

---

## Example

```jsx
<Header
  title="Home"
/>
```

Child:

```jsx
function Header(props) {
  return (
    <Text>{props.title}</Text>
  );
}
```

---

## Interview Answer

"Props are immutable inputs passed from parent components to child components."

---

# 10. State

## Definition

State represents data managed by a component.

---

## Example

```jsx
const [count, setCount] =
 useState(0);
```

---

## Props vs State

| Props             | State                |
| ----------------- | -------------------- |
| Read Only         | Mutable              |
| Parent Controlled | Component Controlled |
| External Data     | Internal Data        |

---

## Interview Answer

"State represents mutable component data that triggers re-rendering when updated."

---

# 11. Component Lifecycle

## Mounting

```text
Component Created
↓
Rendered
```

---

## Updating

```text
State Change
↓
Re-render
```

---

## Unmounting

```text
Component Removed
```

---

## Class Lifecycle Methods

```javascript
componentDidMount()

componentDidUpdate()

componentWillUnmount()
```

---

## Interview Answer

"Lifecycle methods allow components to perform actions during mounting, updating, and unmounting phases."

---

# 12. React Hooks

## Definition

Hooks allow functional components to use React features such as state and lifecycle methods.

---

# useState

## Example

```jsx
const [
 count,
 setCount
] = useState(0);
```

Used for:

* Counters
* Forms
* UI State

---

# useEffect

## Definition

Performs side effects.

---

## Example

```jsx
useEffect(() => {

  fetchData();

}, []);
```

---

## Common Uses

* API Calls
* Event Listeners
* Timers

---

## Cleanup

```jsx
useEffect(() => {

  const timer =
    setInterval(() => {},1000);

  return () => {
    clearInterval(timer);
  };

}, []);
```

---

# useRef

## Definition

Stores mutable values without causing re-renders.

---

## Example

```jsx
const inputRef =
 useRef(null);
```

---

## Uses

* Focus Input
* Store Previous Values
* Access Native Components

---

# useMemo

## Definition

Memoizes expensive calculations.

---

## Example

```jsx
const total =
 useMemo(
   () =>
     calculateTotal(data),
   [data]
 );
```

---

## Interview Answer

"useMemo prevents unnecessary recalculation of expensive computations."

---

# useCallback

## Definition

Memoizes functions.

---

## Example

```jsx
const onPress =
 useCallback(() => {

 }, []);
```

---

## Interview Answer

"useCallback prevents unnecessary recreation of functions during re-renders."

---

# useContext

## Definition

Consumes Context values.

---

## Example

```jsx
const theme =
 useContext(
   ThemeContext
 );
```

---

## Interview Answer

"useContext allows components to access shared data without prop drilling."

---

# 13. Context API

## Definition

Provides global state management without prop drilling.

---

## Flow

```text
Provider
   ↓
Consumer
```

---

## Example

Theme Management

```jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

---

## Interview Answer

"Context API enables data sharing across component trees without manually passing props."

---

# 14. React.memo

## Definition

Prevents unnecessary component re-renders.

---

## Example

```jsx
export default React.memo(
  UserCard
);
```

---

## Why Do We Need It?

Without React.memo:

Parent re-render

↓

Child re-render

---

With React.memo:

Parent re-render

↓

Child skipped

---

## Interview Answer

"React.memo memoizes functional components and prevents unnecessary re-renders when props remain unchanged."

---

# 15. useMemo vs useCallback vs React.memo

| Feature           | useMemo | useCallback | React.memo |
| ----------------- | ------- | ----------- | ---------- |
| Memoize Value     | ✅       | ❌           | ❌          |
| Memoize Function  | ❌       | ✅           | ❌          |
| Memoize Component | ❌       | ❌           | ✅          |

---

## Interview Answer

"useMemo memoizes values, useCallback memoizes functions, and React.memo memoizes components."

---

# 16. Controlled vs Uncontrolled Components

## Controlled

React manages state.

```jsx
<TextInput
 value={text}
 onChangeText={setText}
/>
```

---

## Uncontrolled

Uses refs.

```jsx
const inputRef =
 useRef();
```

---

## Interview Answer

"Controlled components use React state, while uncontrolled components manage data through refs."

---

# 17. Higher Order Components (HOC)

## Definition

A function that takes a component and returns a new component.

---

## Example

```jsx
withAuth(HomeScreen);
```

---

## Interview Answer

"HOCs are patterns used for reusing component logic across multiple components."

---

# 18. Custom Hooks

## Definition

Reusable functions that contain Hook logic.

---

## Example

```jsx
function useUser() {

}
```

---

## Benefits

* Reusability
* Cleaner Components
* Better Separation

---

## Interview Answer

"Custom Hooks allow sharing stateful logic between components."

---

# Most Asked React Interview Questions

1. What is React?
2. JSX vs React.createElement?
3. What is Virtual DOM?
4. How does Reconciliation work?
5. What is React Fiber?
6. Props vs State?
7. Functional vs Class Components?
8. What is useEffect?
9. useMemo vs useCallback?
10. What is React.memo?
11. What is Context API?
12. Controlled vs Uncontrolled Components?
13. What are Custom Hooks?
14. What is the React Rendering Process?
15. Why is React Fast?

---

# Daily Revision Plan

```text
React Basics            5 min
JSX + Elements          5 min
VDOM + Reconciliation   8 min
Fiber                   5 min
Hooks                   10 min
Context API             3 min
Performance             5 min

Total: ~40 Minutes
```

---

## Error Boundaries

Catch rendering errors.

```jsx
class ErrorBoundary
extends React.Component {}
```

Interview Answer:

"Error Boundaries prevent the entire application from crashing when component rendering fails."

---

## Render Props

```jsx
<DataProvider
 render={(data)=>
  <User data={data}/>
 }
/>
```

---

## Pure Component

Class component equivalent of React.memo.

```jsx
class User
extends React.PureComponent
```

---

## React.StrictMode

```jsx
<React.StrictMode>
 <App />
</React.StrictMode>
```

Helps identify issues during development.
