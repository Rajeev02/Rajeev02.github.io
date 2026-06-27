export interface Question {
  id: number;
  type: "Theory" | "Coding";
  timeMinutes: number;
  text: string;
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
