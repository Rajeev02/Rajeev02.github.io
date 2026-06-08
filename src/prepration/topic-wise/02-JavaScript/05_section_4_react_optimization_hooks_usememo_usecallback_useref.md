## ⚡ Section 4: React Optimization Hooks (`useMemo`, `useCallback`, `useRef`)

*⏱️ 2 min read*

#### 1. `useMemo` (Value Caching)
- **Purpose**: Caches the result of an expensive computation across render cycles.
- **Mechanism**: Evaluates the computation only when variables inside its dependency array change. If dependencies remain identical, it intercepts the execution and serves the cached result, skipping the CPU-heavy logic.
- **Fintech Example**:
  ```javascript
  const FinancialPortfolio = ({ assets, filterText }) => {
    // Expensive filtering/sorting calculation only runs when assets or filterText change
    const filteredAssets = useMemo(() => {
      console.log("Filtering financial securities...");
      return assets
        .filter(asset => asset.name.toLowerCase().includes(filterText.toLowerCase()))
        .sort((a, b) => b.value - a.value);
    }, [assets, filterText]);

    return (
      <ul>
        {filteredAssets.map(asset => <li key={asset.id}>{asset.name}: ${asset.value}</li>)}
      </ul>
    );
  };
  ```

#### 2. `useCallback` (Reference Caching)
- **Purpose**: Memoizes a function instance reference across render cycles.
- **Mechanism**: In JavaScript, functions are objects. Creating an inline function (`onPress={() => {}}`) allocates a brand-new object reference in memory on every render. If this callback is passed to a child component optimized with `React.memo`, the child will detect a "changed" prop reference and trigger a complete, unnecessary re-render. Wrapping the callback in `useCallback` maintains the exact same memory address reference pointer unless dependency array values mutate.
- **Example**:
  ```javascript
  const Parent = () => {
    const [count, setCount] = useState(0);
    
    // Caches the handleClick function reference so it does not change on Parent re-renders
    const handleClick = useCallback(() => {
      console.log("Child button clicked!");
    }, []); // Empty dependencies = function reference never changes

    return (
      <div>
        <button onClick={() => setCount(count + 1)}>Increment Parent ({count})</button>
        {/* MemoizedButton will skip re-rendering because handleClick keeps the same reference */}
        <MemoizedButton onClick={handleClick} />
      </div>
    );
  };

  const MemoizedButton = React.memo(({ onClick }) => {
    console.log("MemoizedButton Rendered!");
    return <button onClick={onClick}>Click Me</button>;
  });
  ```

#### 3. `useRef` (Mutable Container)
- **Purpose**: Persists a mutable container whose `.current` property holds a value throughout the entire lifecycle of the component.
- **Key Feature**: Mutating `.current` **does not trigger a component re-render**. It is used to store mutable state values that should not affect the visual UI paint cycles, such as WebSocket references, animation objects, or timer IDs.
- **Example**:
  ```javascript
  const TimerComponent = () => {
    const timerRef = useRef(null); // Holds the interval ID persistently
    const [seconds, setSeconds] = useState(0);

    const startTimer = () => {
      if (timerRef.current !== null) return;
      timerRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    };

    const stopTimer = () => {
      clearInterval(timerRef.current);
      timerRef.current = null; // Clearing this ref value does NOT trigger a re-render
    };

    useEffect(() => {
      return () => clearInterval(timerRef.current); // Cleanup on unmount
    }, []);

    return (
      <div>
        <h3>Timer: {seconds}s</h3>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
      </div>
    );
  };
  ```

#### 4. When NOT to Memoize
Overusing `useMemo` and `useCallback` is a common mistake that degrades performance:
- **Trivial Logic**: Wrapping simple computations (e.g., adding two numbers or concatenating string props) in `useMemo` adds unnecessary overhead. The cost of allocating memory slots for dependencies and running shallow comparisons on every render exceeds the cost of re-calculating the primitive value.
  - *Example*:
    ```javascript
    // ❌ BAD: Trivial math is cheaper than hook validation setup
    const total = useMemo(() => price + tax, [price, tax]);
    ```
- **Unnecessary Dependencies**: Wrapping functions in `useCallback` when they are passed to standard HTML/Native elements (like `<View>` or `<Button>`) is redundant, as standard elements do not implement reference checking optimizations like `React.memo`.
  - *Example*:
    ```javascript
    // ❌ BAD: Native <button> does not check reference equality
    const onNativeClick = useCallback(() => { console.log("clicked"); }, []);
    return <button onClick={onNativeClick}>Click</button>;
    ```

---


---
