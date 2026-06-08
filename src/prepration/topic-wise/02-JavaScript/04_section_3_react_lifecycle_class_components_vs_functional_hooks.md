## ⚛️ Section 3: React Lifecycle: Class Components vs. Functional Hooks

*⏱️ 1 min read*

React manages component lifecycles in three distinct phases: **Mounting** (initial paint), **Updating** (re-renders due to prop/state mutations), and **Unmounting** (removal from DOM/Native layout tree).

#### 1. Structural Comparison: Classes vs. Hooks
- **Class Components**: Group logic by lifecycle stages using explicit class instance methods (`componentDidMount`, `componentDidUpdate`, etc.). State is maintained in a single instance object (`this.state`).
- **Functional Components + Hooks**: Group logic by concern (side effects, cache, state) using isolated functions. State is split into atomic hook declarations (`useState`).

#### 2. Lifecycle Mapping Reference

| Class Component Lifecycle Method | Functional Hook equivalent (`useEffect`) | Description / Rules |
| :--- | :--- | :--- |
| **`componentDidMount`** | `useEffect(() => {}, [])` | Runs once after the component mounts. The empty dependency array `[]` ensures it does not execute on subsequent updates. |
| **`componentDidUpdate(prevProps, prevState)`** | `useEffect(() => {}, [dep1, dep2])` | Runs after props or state changes. The dependency array compares variables using shallow equality (`Object.is`). |
| **`componentWillUnmount`** | `useEffect(() => { return () => { /* clean up */ } }, [])` | Runs immediately before unmounting. The returned cleanup function acts as the unmount event. |

- *Side-by-Side Example*:
  ```javascript
  // --- CLASS COMPONENT APPROACH ---
  class ProfileClass extends React.Component {
    componentDidMount() {
      console.log("Component mounted");
    }
    componentDidUpdate(prevProps) {
      if (this.props.userId !== prevProps.userId) {
        console.log("userId updated");
      }
    }
    componentWillUnmount() {
      console.log("Cleanup before unmounting");
    }
    render() { return <div>User ID: {this.props.userId}</div>; }
  }

  // --- FUNCTIONAL COMPONENT + HOOKS APPROACH ---
  function ProfileHook({ userId }) {
    useEffect(() => {
      console.log("Component mounted equivalent");
      return () => {
        console.log("Cleanup before unmounting equivalent");
      };
    }, []); // Empty dependencies = runs on mount, cleanup runs on unmount

    useEffect(() => {
      console.log("userId updated equivalent");
    }, [userId]); // Runs only when userId changes

    return <div>User ID: {userId}</div>;
  }
  ```

---


---
