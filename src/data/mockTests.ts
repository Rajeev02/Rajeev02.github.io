export interface Question {
  id: number;
  type: "Theory" | "Coding";
  timeMinutes: number;
  text: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
}

export interface MockTest {
  id: number;
  title: string;
  description: string;
  durationMinutes: number; // calculated dynamically
  completed: boolean;
  score: number | null;
  locked: boolean;
  questions: Question[];
}

export const mockTestsData: MockTest[] = [
  {
    id: 1,
    title: "Assessment Set 1: Core Fundamentals",
    description: "Core JS, React Native basics, and Component Lifecycle.",
    durationMinutes: 0,
    completed: false,
    score: null,
    locked: false,
    questions: [
      {
        id: 101,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the primary difference between state and props in React?",
        options: [
          "Props are mutable by the child component, state is immutable.",
          "State is passed from parent to child, props are managed internally.",
          "Props are read-only and passed by the parent, state is local and mutable by the component.",
          "There is no difference; they can be used interchangeably."
        ],
        correctAnswer: 2
      },
      {
        id: 102,
        type: "Theory",
        timeMinutes: 1,
        text: "Which hook should you use to perform side effects in a functional component?",
        options: ["useMemo", "useReducer", "useEffect", "useCallback"],
        correctAnswer: 2
      },
      {
        id: 103,
        type: "Coding",
        timeMinutes: 4,
        text: "How do you correctly update a state object in React without mutating the original state?",
        options: [
          "state.user.name = 'John'; setState(state);",
          "setState({ ...state, user: { ...state.user, name: 'John' } });",
          "setState({ user.name: 'John' });",
          "state.user.name = 'John'; forceUpdate();"
        ],
        correctAnswer: 1
      },
      {
        id: 104,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the purpose of the 'key' prop in React lists?",
        options: [
          "It styles the list items automatically.",
          "It helps React identify which items have changed, are added, or are removed.",
          "It allows passing data to child components securely.",
          "It defines the index of the array mapped."
        ],
        correctAnswer: 1
      },
      {
        id: 105,
        type: "Theory",
        timeMinutes: 1,
        text: "In React Native, which component is the fundamental building block equivalent to a 'div' in web?",
        options: ["<Text>", "<View>", "<Container>", "<Div>"],
        correctAnswer: 1
      },
      {
        id: 106,
        type: "Coding",
        timeMinutes: 3,
        text: "What does the array map() method return?",
        options: [
          "The original array, modified.",
          "A new array with the results of calling a provided function on every element.",
          "undefined.",
          "The total count of elements."
        ],
        correctAnswer: 1
      },
      {
        id: 107,
        type: "Theory",
        timeMinutes: 2,
        text: "What is event bubbling in JavaScript?",
        options: [
          "Events triggering from the topmost element down to the target.",
          "Events triggering from the target element up through its ancestors.",
          "Events being duplicated multiple times.",
          "A memory leak caused by unremoved event listeners."
        ],
        correctAnswer: 1
      },
      {
        id: 108,
        type: "Coding",
        timeMinutes: 4,
        text: "How do you check if a variable 'arr' is an array in JavaScript?",
        options: [
          "typeof arr === 'array'",
          "arr instanceof Array",
          "Array.isArray(arr)",
          "Both B and C are correct, but C is preferred."
        ],
        correctAnswer: 3
      },
      {
        id: 109,
        type: "Theory",
        timeMinutes: 1,
        text: "What is a closure in JavaScript?",
        options: [
          "A function that returns another function.",
          "A block of code wrapped in curly braces.",
          "A combination of a function bundled together with references to its surrounding state (lexical environment).",
          "A way to hide variables from the global scope using immediately invoked functions."
        ],
        correctAnswer: 2
      },
      {
        id: 110,
        type: "Coding",
        timeMinutes: 5,
        text: "What will be the output of `console.log(typeof null)`?",
        options: [
          "'null'",
          "'undefined'",
          "'object'",
          "'string'"
        ],
        correctAnswer: 2
      },
      {
        id: 111,
        type: "Theory",
        timeMinutes: 2,
        text: "In React Native, how do you handle platform-specific code?",
        options: [
          "Using the Platform module or platform-specific file extensions (.ios.js, .android.js).",
          "Writing separate apps entirely.",
          "Using CSS media queries.",
          "React Native handles it 100% automatically; you cannot write platform-specific code."
        ],
        correctAnswer: 0
      },
      {
        id: 112,
        type: "Coding",
        timeMinutes: 4,
        text: "Which method is best for creating a deep copy of a nested JSON object in modern JS without external libraries?",
        options: [
          "Object.assign()",
          "Spread operator (...)",
          "JSON.parse(JSON.stringify(obj))",
          "structuredClone(obj)"
        ],
        correctAnswer: 3
      },
      {
        id: 113,
        type: "Theory",
        timeMinutes: 2,
        text: "What does the 'flex: 1' style property do in React Native?",
        options: [
          "Makes the component take up 1 pixel of space.",
          "Makes the component take up all available space in its container.",
          "Enables flexbox on the component.",
          "Aligns items to the center."
        ],
        correctAnswer: 1
      },
      {
        id: 114,
        type: "Coding",
        timeMinutes: 5,
        text: "What is the difference between == and === in JavaScript?",
        options: [
          "== compares value, === compares reference.",
          "== compares value with type coercion, === compares value and type without coercion.",
          "There is no difference.",
          "=== is used only for objects."
        ],
        correctAnswer: 1
      },
      {
        id: 115,
        type: "Theory",
        timeMinutes: 1,
        text: "What does the SafeAreaView component do?",
        options: [
          "Encrypts data displayed within it.",
          "Renders content within the safe area boundaries of a device, avoiding notches and system UI.",
          "Prevents crashes by catching errors.",
          "Restricts user interactions within the view."
        ],
        correctAnswer: 1
      },
      {
        id: 116,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the Virtual DOM?",
        options: [
          "A direct representation of the actual DOM in the browser.",
          "A lightweight JavaScript representation of the DOM used to optimize rendering.",
          "A database used by React to store state.",
          "A virtual machine that runs React code."
        ],
        correctAnswer: 1
      },
      {
        id: 117,
        type: "Coding",
        timeMinutes: 4,
        text: "How do you pass a parameter to an event handler in React?",
        options: [
          "onClick={handleClick(id)}",
          "onClick={() => handleClick(id)}",
          "onClick={handleClick.bind(id)}",
          "Both B and C are valid approaches."
        ],
        correctAnswer: 3
      },
      {
        id: 118,
        type: "Theory",
        timeMinutes: 2,
        text: "What is a Promise in JavaScript?",
        options: [
          "A guarantee that a function will execute synchronously.",
          "An object representing the eventual completion or failure of an asynchronous operation.",
          "A strict typing system for JavaScript.",
          "A built-in method for parsing JSON."
        ],
        correctAnswer: 1
      },
      {
        id: 119,
        type: "Coding",
        timeMinutes: 3,
        text: "Which array method is best for finding the first element that satisfies a condition?",
        options: [
          "filter()",
          "some()",
          "find()",
          "map()"
        ],
        correctAnswer: 2
      },
      {
        id: 120,
        type: "Theory",
        timeMinutes: 1,
        text: "What is the purpose of ScrollView in React Native?",
        options: [
          "To render large lists of data efficiently.",
          "To provide a scrollable container for a small amount of content.",
          "To create a swipeable image gallery.",
          "To handle gesture navigation."
        ],
        correctAnswer: 1
      },
      {
        id: 121,
        type: "Theory",
        timeMinutes: 2,
        text: "Why is FlatList preferred over ScrollView for long lists?",
        options: [
          "FlatList looks better by default.",
          "FlatList is easier to type.",
          "FlatList renders items lazily (only when they appear on screen), saving memory.",
          "There is no difference; they are interchangeable."
        ],
        correctAnswer: 2
      },
      {
        id: 122,
        type: "Coding",
        timeMinutes: 5,
        text: "What is the output of `0.1 + 0.2 === 0.3` in JavaScript?",
        options: [
          "true",
          "false",
          "undefined",
          "TypeError"
        ],
        correctAnswer: 1
      },
      {
        id: 123,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the purpose of the 'ref' attribute in React?",
        options: [
          "To reference an external CSS file.",
          "To directly access a DOM element or React component instance.",
          "To refresh the component.",
          "To pass data backwards to a parent component."
        ],
        correctAnswer: 1
      },
      {
        id: 124,
        type: "Coding",
        timeMinutes: 4,
        text: "In React Native, how do you specify an image source from a local file?",
        options: [
          "<Image src='myImage.png' />",
          "<Image source={{ uri: 'myImage.png' }} />",
          "<Image source={require('./myImage.png')} />",
          "<Image href='./myImage.png' />"
        ],
        correctAnswer: 2
      },
      {
        id: 125,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the Context API used for?",
        options: [
          "Parsing JSON data.",
          "Routing between screens.",
          "Sharing state across the entire app without passing props down manually at every level.",
          "Connecting to a SQL database."
        ],
        correctAnswer: 2
      },
      {
        id: 126,
        type: "Coding",
        timeMinutes: 4,
        text: "What is the output of the following event loop code snippet?",
        codeSnippet: `console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");`,
        options: [
          "A, B, C, D",
          "A, D, C, B",
          "A, D, B, C",
          "A, C, D, B"
        ],
        correctAnswer: 1
      },
      {
        id: 127,
        type: "Coding",
        timeMinutes: 5,
        text: "Find the output of this closure snippet.",
        codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}`,
        options: [
          "0, 1, 2",
          "3, 3, 3",
          "0, 0, 0",
          "undefined, undefined, undefined"
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 2,
    title: "Assessment Set 2: Advanced React Native",
    description: "New Architecture, JSI, Fabric, and TurboModules.",
    durationMinutes: 0,
    completed: false,
    score: null,
    locked: false,
    questions: [
      {
        id: 201,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the primary advantage of the New Architecture (JSI) in React Native?",
        options: [
          "It allows for synchronous communication between JS and Native without JSON serialization.",
          "It completely removes the need for Native Modules.",
          "It automatically converts JavaScript code into native Swift/Kotlin code.",
          "It runs JavaScript on the main UI thread."
        ],
        correctAnswer: 0
      },
      {
        id: 202,
        type: "Theory",
        timeMinutes: 2,
        text: "How does Fabric improve the rendering pipeline?",
        options: [
          "It replaces JavaScript with WebAssembly.",
          "It uses a virtual DOM that runs exclusively on a background thread.",
          "It allows UI creation and layout to happen synchronously, preventing 'white flashes'.",
          "It pre-compiles all React components into HTML."
        ],
        correctAnswer: 2
      },
      {
        id: 203,
        type: "Coding",
        timeMinutes: 5,
        text: "If a TurboModule is initialized lazily, when is it actually loaded into memory?",
        options: [
          "At app startup to save time later.",
          "Only when one of its methods is called for the very first time from JS.",
          "When the React Native bridge initializes.",
          "During the compilation phase of the app."
        ],
        correctAnswer: 1
      },
      {
        id: 204,
        type: "Theory",
        timeMinutes: 2,
        text: "Which JavaScript engine is optimized specifically for React Native?",
        options: ["V8", "SpiderMonkey", "Hermes", "JavaScriptCore"],
        correctAnswer: 2
      },
      {
        id: 205,
        type: "Theory",
        timeMinutes: 2,
        text: "What does CodeGen do in the New Architecture?",
        options: [
          "Generates C++ boilerplate for type safety between JS and Native.",
          "Minifies the JavaScript bundle.",
          "Generates App Icons automatically.",
          "Converts Objective-C to Swift automatically."
        ],
        correctAnswer: 0
      },
      {
        id: 206,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the C++ interface that enables React Native's JS thread to talk directly to native modules?",
        options: [
          "JSON Bridge",
          "JavaScript Interface (JSI)",
          "JNI (Java Native Interface)",
          "Objective-C Runtime"
        ],
        correctAnswer: 1
      },
      {
        id: 207,
        type: "Coding",
        timeMinutes: 4,
        text: "How does JSI differ from the old Bridge?",
        options: [
          "JSI uses XML instead of JSON.",
          "JSI is slower because it is written in C++.",
          "JSI allows JS to hold references to C++ Host Objects and call methods synchronously.",
          "JSI is only available on iOS."
        ],
        correctAnswer: 2
      },
      {
        id: 208,
        type: "Theory",
        timeMinutes: 2,
        text: "What does 'Yoga' do in React Native?",
        options: [
          "It manages Redux state.",
          "It is a cross-platform layout engine that translates Flexbox to native views.",
          "It is an animation library.",
          "It handles offline storage."
        ],
        correctAnswer: 1
      },
      {
        id: 209,
        type: "Coding",
        timeMinutes: 4,
        text: "Why are TurboModules more memory efficient than classic Native Modules?",
        options: [
          "They are written in pure JavaScript.",
          "They are initialized on-demand rather than all at startup.",
          "They do not use memory.",
          "They automatically compress all assets."
        ],
        correctAnswer: 1
      },
      {
        id: 210,
        type: "Theory",
        timeMinutes: 2,
        text: "In Fabric, what replaces the UIManager module?",
        options: [
          "JSI",
          "ReactShadowNode",
          "The Fabric Renderer (C++ core)",
          "Hermes"
        ],
        correctAnswer: 2
      },
      {
        id: 211,
        type: "Coding",
        timeMinutes: 4,
        text: "Which command correctly enables the New Architecture on an existing iOS app?",
        options: [
          "npm run enable-fabric",
          "cd ios && pod install --enable-new-architecture",
          "react-native link new-architecture",
          "RCT_NEW_ARCH_ENABLED=1 pod install"
        ],
        correctAnswer: 3
      },
      {
        id: 212,
        type: "Theory",
        timeMinutes: 2,
        text: "What does AOT stand for in the context of Hermes engine?",
        options: [
          "Ahead of Time compilation",
          "Array of Types",
          "Application Over The-air",
          "Asynchronous Object Thread"
        ],
        correctAnswer: 0
      },
      {
        id: 213,
        type: "Coding",
        timeMinutes: 5,
        text: "What happens if a Native Module method returns a Promise over the old Bridge?",
        options: [
          "The Promise is resolved synchronously.",
          "The Promise ID is passed to native, and Native invokes the JS callback asynchronously via the bridge.",
          "The bridge crashes.",
          "The JS thread blocks until it resolves."
        ],
        correctAnswer: 1
      },
      {
        id: 214,
        type: "Theory",
        timeMinutes: 2,
        text: "What is 'Bridgeless Mode' in React Native 0.74+?",
        options: [
          "A mode where React Native runs without a UI.",
          "A new initialization phase where the legacy Bridge is completely disabled in favor of JSI.",
          "A mode that only allows React Web.",
          "A security feature that blocks network requests."
        ],
        correctAnswer: 1
      },
      {
        id: 215,
        type: "Theory",
        timeMinutes: 2,
        text: "What problem does Fabric solve regarding User Interactions (like scrolling)?",
        options: [
          "It stops the user from scrolling too fast.",
          "It allows UI updates (like rendering a new list item) to happen synchronously with native events, removing the visual lag caused by async bridge communication.",
          "It automatically caches images.",
          "It translates touch events into mouse events."
        ],
        correctAnswer: 1
      },
      {
        id: 216,
        type: "Coding",
        timeMinutes: 4,
        text: "How do you define a spec for CodeGen?",
        options: [
          "Writing a Python script.",
          "Writing a TypeScript interface or Flow type inside a file named *Native<Module>.ts.",
          "Writing a raw C++ header file.",
          "Using a JSON configuration file."
        ],
        correctAnswer: 1
      },
      {
        id: 217,
        type: "Theory",
        timeMinutes: 2,
        text: "What is a 'Host Object' in JSI?",
        options: [
          "A cloud server hosting the app.",
          "A C++ object that is exposed to JavaScript, allowing JS to call its methods directly.",
          "A React Native View component.",
          "The root component of the app."
        ],
        correctAnswer: 1
      },
      {
        id: 218,
        type: "Coding",
        timeMinutes: 5,
        text: "How do you handle background tasks (like audio playback) in React Native?",
        options: [
          "Use a `useEffect` hook.",
          "Use standard native background services (like Headless JS or iOS Background Tasks) because the JS thread pauses when the app is backgrounded.",
          "Run a while(true) loop.",
          "It is not possible in React Native."
        ],
        correctAnswer: 1
      },
      {
        id: 219,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the primary language used to write the core of the New Architecture?",
        options: [
          "JavaScript",
          "Objective-C",
          "C++",
          "Swift"
        ],
        correctAnswer: 2
      },
      {
        id: 220,
        type: "Theory",
        timeMinutes: 1,
        text: "Does the New Architecture require rewriting all existing React components?",
        options: [
          "Yes, completely.",
          "No, most React/JS code remains the same; the changes are largely internal to the framework and Native Modules.",
          "Yes, but only for iOS.",
          "No, but CSS needs to be rewritten."
        ],
        correctAnswer: 1
      },
      {
        id: 221,
        type: "Coding",
        timeMinutes: 4,
        text: "What is the benefit of Hermes precompiling JS into bytecode?",
        options: [
          "It makes the app download faster from the App Store.",
          "It drastically reduces the Time To Interactive (TTI) since the engine doesn't have to parse JS at runtime.",
          "It converts JS directly into Swift.",
          "It encrypts the source code completely."
        ],
        correctAnswer: 1
      },
      {
        id: 222,
        type: "Theory",
        timeMinutes: 2,
        text: "What is 'Concurrent React'?",
        options: [
          "A feature that allows React to interrupt a long-running render to handle a high-priority event (like user input).",
          "Running multiple React Native apps at the same time.",
          "A way to run React on a GPU.",
          "A networking library for React."
        ],
        correctAnswer: 0
      },
      {
        id: 223,
        type: "Theory",
        timeMinutes: 2,
        text: "How does the New Architecture handle View flattening?",
        options: [
          "It disables View flattening entirely.",
          "Fabric handles View flattening in C++ before passing the tree to the native platform, saving memory.",
          "It relies on the OS to flatten views.",
          "View flattening is done in JavaScript."
        ],
        correctAnswer: 1
      },
      {
        id: 224,
        type: "Coding",
        timeMinutes: 5,
        text: "What is the main drawback of using the legacy Bridge for high-frequency events (like scrolling)?",
        options: [
          "It uses too much disk space.",
          "Every event must be serialized to JSON, sent across the bridge, and deserialized, causing severe bottlenecking and frame drops.",
          "It only supports strings.",
          "It requires an internet connection."
        ],
        correctAnswer: 1
      },
      {
        id: 225,
        type: "Theory",
        timeMinutes: 2,
        text: "Which of the following describes the 'Shadow Tree'?",
        options: [
          "A CSS feature for rendering drop shadows.",
          "A tree of C++ nodes used by Yoga to calculate the layout before creating actual native views.",
          "A hidden DOM tree used for SEO.",
          "An encrypted data structure."
        ],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 3,
    title: "Assessment Set 3: Performance & Optimization",
    description: "Memory leaks, Frame drops, Re-renders, and Profiling.",
    durationMinutes: 0,
    completed: false,
    score: null,
    locked: false,
    questions: [
      {
        id: 301,
        type: "Coding",
        timeMinutes: 4,
        text: "How do you prevent a heavy JavaScript computation from dropping UI frames?",
        options: [
          "Use `InteractionManager.runAfterInteractions` or offload to a Web Worker.",
          "Increase the thread priority.",
          "Wrap the computation in a `useEffect`.",
          "Wrap the entire component in `React.memo`."
        ],
        correctAnswer: 0
      },
      {
        id: 302,
        type: "Theory",
        timeMinutes: 2,
        text: "What is the purpose of `useNativeDriver: true` in the Animated API?",
        options: [
          "It generates native Swift code.",
          "It sends the animation graph to the native UI thread once, bypassing the JS thread.",
          "It forces 120 FPS on supported devices.",
          "It disables JavaScript entirely."
        ],
        correctAnswer: 1
      },
      {
        id: 303,
        type: "Theory",
        timeMinutes: 2,
        text: "What is a common cause of Memory Leaks in React Native?",
        options: [
          "Using too many `useState` hooks.",
          "Failing to clear timeouts/intervals or remove event listeners in `useEffect` cleanup.",
          "Importing large JSON files.",
          "Using `View` instead of `SafeAreaView`."
        ],
        correctAnswer: 1
      },
      {
        id: 304,
        type: "Coding",
        timeMinutes: 5,
        text: "When should you use `useCallback`?",
        options: [
          "Always, to wrap every function inside a component.",
          "When passing a function as a prop to a memoized child component to prevent unnecessary re-renders.",
          "To cache API responses.",
          "To delay function execution until the DOM is painted."
        ],
        correctAnswer: 1
      },
      {
        id: 305,
        type: "Theory",
        timeMinutes: 2,
        text: "Which tool is best for finding iOS Native Memory Leaks (Retain Cycles)?",
        options: [
          "React Developer Tools",
          "Chrome Inspect",
          "Xcode Instruments (Allocations/Leaks)",
          "Flipper"
        ],
        correctAnswer: 2
      },
      {
        id: 306,
        type: "Theory",
        timeMinutes: 2,
        text: "What does the React Profiler record?",
        options: [
          "Network requests only.",
          "Memory usage on the native side.",
          "Rendering times and re-render frequency for components.",
          "JavaScript thread priority."
        ],
        correctAnswer: 2
      },
      {
        id: 307,
        type: "Coding",
        timeMinutes: 4,
        text: "How do you optimize an image-heavy React Native app?",
        options: [
          "Load all images at startup into memory.",
          "Use the standard <Image> component with 4K resolution images.",
          "Use libraries like `react-native-fast-image` for caching and request lower resolution images.",
          "Convert all images to base64 strings."
        ],
        correctAnswer: 2
      },
      {
        id: 308,
        type: "Theory",
        timeMinutes: 2,
        text: "What causes 'jank' or frame drops during navigation transitions?",
        options: [
          "The JS thread is blocked rendering the new screen, preventing the UI thread from completing the animation.",
          "The internet connection is slow.",
          "The device screen is too small.",
          "Redux state is too large."
        ],
        correctAnswer: 0
      },
      {
        id: 309,
        type: "Coding",
        timeMinutes: 5,
        text: "Look at the snippet. What is the main performance issue?",
        codeSnippet: `const MyList = ({ data }) => {
  return (
    <ScrollView>
      {data.map(item => <ListItem key={item.id} {...item} />)}
    </ScrollView>
  );
};`,
        options: [
          "ScrollView cannot have children.",
          "The map function mutates the data.",
          "ScrollView renders all children at once, causing memory and performance issues for large lists. FlatList should be used instead.",
          "ListItem is missing a ref."
        ],
        correctAnswer: 2
      },
      {
        id: 310,
        type: "Theory",
        timeMinutes: 1,
        text: "True or False: React.memo will ALWAYS improve performance.",
        options: [
          "True",
          "False, it adds comparison overhead and should only be used for heavy components that render often with the same props."
        ],
        correctAnswer: 1
      },
      {
        id: 311,
        type: "Coding",
        timeMinutes: 4,
        text: "What happens when you pass an inline arrow function as a prop (e.g., `onPress={() => doSomething()}`)?",
        options: [
          "It automatically memoizes the function.",
          "It creates a new function reference on every render, which can cause child components to unnecessarily re-render.",
          "It throws a syntax error.",
          "It runs asynchronously."
        ],
        correctAnswer: 1
      },
      {
        id: 312,
        type: "Theory",
        timeMinutes: 2,
        text: "What does 'TTI' stand for in performance metrics?",
        options: [
          "Time To Interactive",
          "Total Thread Interruptions",
          "Time To Install",
          "Thread Timing Interval"
        ],
        correctAnswer: 0
      },
      {
        id: 313,
        type: "Coding",
        timeMinutes: 5,
        text: "Which hook should you use to cache a complex calculation so it only re-runs when its dependencies change?",
        options: [
          "useEffect",
          "useCallback",
          "useMemo",
          "useRef"
        ],
        correctAnswer: 2
      },
      {
        id: 314,
        type: "Theory",
        timeMinutes: 2,
        text: "Why should you avoid `console.log` in production builds of React Native?",
        options: [
          "It causes compilation errors.",
          "It synchronously crosses the JS bridge and severely impacts frame rates.",
          "It drains the battery.",
          "It forces the app to restart."
        ],
        correctAnswer: 1
      },
      {
        id: 315,
        type: "Theory",
        timeMinutes: 2,
        text: "What is Hermes primarily designed to optimize?",
        options: [
          "App startup time (TTI), bundle size, and memory consumption.",
          "Server-side rendering speeds.",
          "Network latency.",
          "Database query execution."
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 4,
    title: "Assessment Set 4: Data Structures & Algorithms",
    description: "Mobile-focused DSA, Time Complexity, and Optimization.",
    durationMinutes: 0,
    completed: false,
    score: null,
    locked: false,
    questions: [
      {
        id: 401,
        type: "Coding",
        timeMinutes: 4,
        text: "What is the average time complexity of looking up a key in a Hash Map?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
        correctAnswer: 0
      },
      {
        id: 402,
        type: "Coding",
        timeMinutes: 5,
        text: "Which data structure is ideal for implementing a 'Back/Forward' navigation stack?",
        options: ["Queue", "Stack", "Linked List", "Binary Tree"],
        correctAnswer: 1
      },
      {
        id: 403,
        type: "Coding",
        timeMinutes: 5,
        text: "How would you efficiently implement an LRU (Least Recently Used) Cache?",
        options: [
          "Using just an Array.",
          "Using a Hash Map paired with a Doubly Linked List.",
          "Using a Binary Search Tree.",
          "Using a Stack."
        ],
        correctAnswer: 1
      },
      {
        id: 404,
        type: "Theory",
        timeMinutes: 2,
        text: "Why is O(N^2) time complexity generally avoided on mobile devices?",
        options: [
          "It drains the battery extremely fast and causes device thermal throttling on large datasets.",
          "Mobile OS automatically kills O(N^2) processes.",
          "It takes up too much disk space.",
          "Java/Swift do not support nested loops well."
        ],
        correctAnswer: 0
      },
      {
        id: 405,
        type: "Coding",
        timeMinutes: 5,
        text: "What is the time complexity of Binary Search on a sorted array?",
        options: ["O(1)", "O(N)", "O(log N)", "O(N log N)"],
        correctAnswer: 2
      },
      {
        id: 406,
        type: "Theory",
        timeMinutes: 2,
        text: "Which data structure is typically used to implement an undo/redo feature?",
        options: [
          "Queue",
          "Stack",
          "Graph",
          "Set"
        ],
        correctAnswer: 1
      },
      {
        id: 407,
        type: "Coding",
        timeMinutes: 5,
        text: "What is the Big-O time complexity of inserting an element at the beginning of an Array?",
        options: [
          "O(1)",
          "O(N)",
          "O(log N)",
          "O(N^2)"
        ],
        correctAnswer: 1
      },
      {
        id: 408,
        type: "Theory",
        timeMinutes: 2,
        text: "What is a 'Collision' in a Hash Map?",
        options: [
          "When two keys are hashed to the same index.",
          "When the map runs out of memory.",
          "When two maps are merged together.",
          "When a key is deleted while being read."
        ],
        correctAnswer: 0
      },
      {
        id: 409,
        type: "Coding",
        timeMinutes: 5,
        text: "What is the time complexity of the fastest comparison-based sorting algorithms (like Merge Sort or Quick Sort)?",
        options: [
          "O(N)",
          "O(N log N)",
          "O(N^2)",
          "O(log N)"
        ],
        correctAnswer: 1
      },
      {
        id: 410,
        type: "Theory",
        timeMinutes: 3,
        text: "In a Graph data structure, what does BFS stand for?",
        options: [
          "Binary Forward Search",
          "Breadth-First Search",
          "Binary Fast Search",
          "Breadth-Forward Search"
        ],
        correctAnswer: 1
      },
      {
        id: 411,
        type: "Coding",
        timeMinutes: 5,
        text: "What is the primary difference between a Set and an Array in JavaScript?",
        options: [
          "Sets only hold strings.",
          "Sets automatically sort their elements.",
          "Sets only store unique values, automatically preventing duplicates.",
          "Arrays are faster for lookups."
        ],
        correctAnswer: 2
      },
      {
        id: 412,
        type: "Theory",
        timeMinutes: 2,
        text: "What data structure does the JavaScript event loop rely on to manage asynchronous callbacks (like setTimeout)?",
        options: [
          "A Stack",
          "A Queue",
          "A Binary Tree",
          "A Hash Map"
        ],
        correctAnswer: 1
      },
      {
        id: 413,
        type: "Coding",
        timeMinutes: 5,
        text: "Look at the code. What is the output?",
        codeSnippet: `const set = new Set([1, 2, 2, 3, 4, 4]);
console.log(set.size);`,
        options: [
          "6",
          "4",
          "5",
          "undefined"
        ],
        correctAnswer: 1
      },
      {
        id: 414,
        type: "Theory",
        timeMinutes: 3,
        text: "Which of these data structures uses LIFO (Last-In-First-Out) ordering?",
        options: [
          "Queue",
          "Stack",
          "Linked List",
          "Heap"
        ],
        correctAnswer: 1
      },
      {
        id: 415,
        type: "Coding",
        timeMinutes: 6,
        text: "What is the time complexity of accessing an element in a Linked List by its index?",
        options: [
          "O(1)",
          "O(log N)",
          "O(N)",
          "O(N^2)"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 5,
    title: "Assessment Set 5: Testing & QA",
    description: "Unit testing, Jest, Detox, and Mocking.",
    durationMinutes: 0,
    completed: false,
    score: null,
    locked: false,
    questions: [
      {
        id: 501,
        type: "Theory",
        timeMinutes: 2,
        text: "In the context of End-to-End Testing (like Detox), what does 'Gray Box Testing' mean?",
        options: [
          "The test runner operates completely blind to the app's internal state.",
          "The test runner knows the app's internal state and synchronizes with network requests and animations.",
          "The test runner only tests the UI layout colors.",
          "Testing is done manually by a QA team."
        ],
        correctAnswer: 1
      },
      {
        id: 502,
        type: "Coding",
        timeMinutes: 4,
        text: "How do you mock a native module in Jest?",
        options: [
          "By using `jest.mock('react-native', () => ({ NativeModules: { MyModule: { myFunc: jest.fn() } } }))`.",
          "By writing a Swift/Kotlin mock file.",
          "Native modules cannot be mocked in Jest.",
          "By using the `@mock` decorator in React."
        ],
        correctAnswer: 0
      },
      {
        id: 503,
        type: "Theory",
        timeMinutes: 2,
        text: "What is snapshot testing in Jest?",
        options: [
          "Taking a physical screenshot of the device.",
          "Comparing the rendered JSON tree of a React component to a previously saved reference file.",
          "Testing the camera module.",
          "Profiling the memory state at a given time."
        ],
        correctAnswer: 1
      },
      {
        id: 504,
        type: "Theory",
        timeMinutes: 1,
        text: "Which library is recommended by React Native for component rendering tests?",
        options: ["Enzyme", "React Native Testing Library (RNTL)", "Cypress", "Selenium"],
        correctAnswer: 1
      },
      {
        id: 505,
        type: "Theory",
        timeMinutes: 2,
        text: "What does TDD stand for?",
        options: [
          "Test Driven Development",
          "Testing Data Defaults",
          "Technical Design Document",
          "Thread Driven Dispatch"
        ],
        correctAnswer: 0
      }
    ]
  },
  {
    id: 6,
    title: "Assessment Set 6: System Design & Architecture",
    description: "Offline-first, Syncing, State Management.",
    durationMinutes: 0,
    completed: false,
    score: null,
    locked: false,
    questions: [
      {
        id: 601,
        type: "Theory",
        timeMinutes: 3,
        text: "When building an Offline-First app, which database is commonly used in React Native?",
        options: ["MongoDB", "WatermelonDB or SQLite", "Redis", "Firebase Realtime DB"],
        correctAnswer: 1
      },
      {
        id: 602,
        type: "Theory",
        timeMinutes: 3,
        text: "What is a 'dead letter queue' used for in background synchronization?",
        options: [
          "Storing emails that failed to send.",
          "Storing failed API requests so they can be retried later when the network is stable.",
          "Caching images.",
          "Deleting user accounts."
        ],
        correctAnswer: 1
      },
      {
        id: 603,
        type: "Coding",
        timeMinutes: 4,
        text: "In Redux, what is a 'Thunk'?",
        options: [
          "A native module for audio.",
          "A middleware that allows action creators to return a function instead of an action object, enabling async logic.",
          "A component that connects to the store.",
          "A slice reducer."
        ],
        correctAnswer: 1
      }
    ]
  }
];

// Helper to pre-calculate durations for all tests
mockTestsData.forEach(test => {
  test.durationMinutes = test.questions.reduce((sum, q) => sum + (q.timeMinutes || 2), 0);
});
