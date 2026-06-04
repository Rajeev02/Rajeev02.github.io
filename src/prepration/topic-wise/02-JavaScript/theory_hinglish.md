<!-- INDEX_START --> <details> 
 <summary> 📖 <b> सामग्री तालिका (विस्तार करने के लिए क्लिक करें) </b> </summary> 

- [☕ धारा 1: इंजन बुनियादी बातें और स्कोपिंग](#section-1-engine-fundamentals-scoping) 
 - [1. लेक्सिकल स्कोपिंग और क्लोजर](#1-lexical-scoping-closures) 
 - [2. परिवर्तनीय दायरा: `var` बनाम `let` बनाम `const` ](#2-variable-scoping-var-vs-let-vs-const) 
 - [3. इवेंट लूप और कॉनकरेंसी मॉडल](#3-the-event-loop-concurrency-model) 
- [🗑️ धारा 2: मेमोरी प्रबंधन और कचरा संग्रहण](#section-2-memory-management-garbage-collection) 
 - [1. हर्मीस मार्क-एंड-स्वीप कचरा संग्रह](#1-hermes-mark-and-sweep-garbage-collection) 
 - [2. मेमोरी लीक की पहचान और निदान](#2-identifying-diagnosing-memory-leaks) 
 - [विशिष्ट जेएस मेमोरी लीक परिदृश्य:](#typical-js-memory-leak-scenarios) 
- [⚛️ धारा 3: प्रतिक्रिया जीवनचक्र: वर्ग घटक बनाम कार्यात्मक हुक](#section-3-react-lifecycle-class-components-vs-functional-hooks) 
 - [1. संरचनात्मक तुलना: वर्ग बनाम हुक](#1-structural-comparison-classes-vs-hooks) 
 - [2. जीवनचक्र मानचित्रण संदर्भ](#2-lifecycle-mapping-reference) 
- [⚡ धारा 4: रिएक्ट ऑप्टिमाइज़ेशन हुक ( `useMemo` , `useCallback` , `useRef` )](#section-4-react-optimization-hooks-usememo-usecallback-useref) 
 - [1. `useMemo` (वैल्यू कैशिंग)](#1-usememo-value-caching) 
 - [2. `useCallback` (संदर्भ कैशिंग)](#2-usecallback-reference-caching) 
 - [3. `useRef` (परिवर्तनीय कंटेनर)](#3-useref-mutable-container) 
 - [4. जब याद नहीं करना है](#4-when-not-to-memoize) 
- [🗃️ धारा 5: राज्य ऑर्केस्ट्रेशन: रेडक्स टूलकिट बनाम रिएक्ट क्वेरी](#section-5-state-orchestration-redux-toolkit-vs-react-query) 
 - [1. रिडक्स टूलकिट (आरटीके) - क्लाइंट यूआई स्थिति](#1-redux-toolkit-rtk-client-ui-state) 
 - [2. रिएक्ट क्वेरी (टैनस्टैक क्वेरी) - सर्वर स्थिति](#2-react-query-tanstack-query-server-state) 
- [⚙️ धारा 6: उन्नत कोर जेएस और रिएक्ट इंजन अवधारणाएँ](#section-6-advanced-core-js-react-engine-concepts) 
 - [1. करी और उत्थापन](#1-currying-hoisting) 
 - [2. प्रोटोटाइप वंशानुक्रम और श्रृंखला](#2-prototypal-inheritance-the-chain) 
 - [3. उथली बनाम गहरी नकल](#3-shallow-vs-deep-copying) 
 - [4. स्प्रेड बनाम रेस्ट ऑपरेटर्स ( `...` )](#4-spread-vs-rest-operators) 
 - [5. जेनरेटर और इटरेटर](#5-generators-iterators) 
 - [6. कॉलबैक और कॉलबैक नरक](#6-callbacks-callback-hell) 
 - [7. वादे, एसिंक/प्रतीक्षा करें और प्रयास करें/पकड़ें](#7-promises-asyncawait-trycatch) 
 - [7बी. Redux Async वर्कफ़्लो: सिंक्रोनस एक्शन और मिडलवेयर (थंक्स/सागास)](#7b-redux-async-workflow-synchronous-actions-middlewares-thunkssagas) 
 - [8. प्रतिक्रिया सुलह और अंतर (प्रतिक्रिया फाइबर)](#8-react-reconciliation-diffing-react-fiber) 
 - [9. आलसी लोडिंग और कोड विभाजन](#9-lazy-loading-code-splitting) 
 - [10. डिबाउंस बनाम थ्रॉटल (निष्पादन नियंत्रण रैपर्स)](#10-debounce-vs-throttle-execution-control-wrappers) 
 - [11. इवेंट एमिटर और पब्लिश-सब्सक्राइब पैटर्न](#11-event-emitters-the-publish-subscribe-pattern) 
 - [12. फ़ंक्शन मेमोइज़ेशन कैशिंग](#12-function-memoization-caching) 
 - [13. जावास्क्रिप्ट पॉलीफ़िल और प्रोटोटाइप प्रतिनिधिमंडल](#13-javascript-polyfills-prototype-delegation) 
 - [14. उन्नत जेएस इंजन और कॉनकरेंसी प्रश्नोत्तरी](#14-advanced-js-engine-concurrency-qa) </details> 
 <!-- INDEX_END --> 

## ☕ अनुभाग 1: इंजन बुनियादी बातें और स्कोपिंग
*⏱️ 4 मिनट पढ़ें*

### 1. लेक्सिकल स्कोपिंग और क्लोजर
- **लेक्सिकल स्कोपिंग**: जावास्क्रिप्ट नेस्टेड सोर्स कोड संरचनाओं के भीतर वेरिएबल्स की घोषणाओं की भौतिक स्थिति के आधार पर वेरिएबल्स को हल करता है। आंतरिक कार्यों के पास उनके बाहरी मूल दायरे में घोषित चर तक पहुंच होती है।
 - *उदाहरण*:

```javascript
 function outer() {
 const outerVar = "I am from the outer scope";
 function inner() {
 console.log(outerVar); // Accesses outerVar because of lexical placement
 }
 inner();
 }
 outer(); // Logs: "I am from the outer scope"
 ```

- **क्लोजर**: क्लोजर एक फ़ंक्शन का संयोजन है जो इसके आस-पास की स्थिति (इसके **लेक्सिकल वातावरण**) के संदर्भ में एक साथ बंडल होता है। 
 - जावास्क्रिप्ट में, हर बार किसी फ़ंक्शन को परिभाषित करने पर, फ़ंक्शन निर्माण के समय क्लोजर बनाए जाते हैं।
 - एक क्लोजर एक आंतरिक फ़ंक्शन को उसके बाहरी दायरे से वेरिएबल्स तक पहुंचने की अनुमति देता है, भले ही बाहरी फ़ंक्शन का निष्पादन समाप्त हो गया हो और उसके निष्पादन संदर्भ को कॉल स्टैक से हटा दिया गया हो।
 - *उदाहरण*:

```javascript
 function createCounter() {
 let count = 0; // State variable in outer scope
 return function() {
 count++; // Accesses and modifies the outer variable
 return count;
 };
 }
 const counter = createCounter();
 console.log(counter()); // 1
 console.log(counter()); // 2 (count variable persists in memory due to closure)
 ```

### 2. वेरिएबल स्कोपिंग: `var` बनाम `let` बनाम `const` 
- ** `var` (फ़ंक्शन स्कोप)**: `var` के साथ घोषित वेरिएबल्स को निकटतम फ़ंक्शन ब्लॉक के दायरे में रखा गया है। वे ब्लॉक सीमाओं का सम्मान नहीं करते (जैसे `if` स्टेटमेंट या `for` लूप)। उन्हें उनके दायरे के शीर्ष पर फहराया जाता है और `undefined` के साथ आरंभ किया जाता है।
- ** `let` और `const` (ब्लॉक स्कोप)**: `let` या `const` के साथ घोषित वेरिएबल्स को निकटतम संलग्न घुंघराले ब्रेसिज़ `{}` तक सीमित किया गया है। उन्हें फहराया जाता है लेकिन प्रारंभ नहीं किया जाता है, वे **टेम्पोरल डेड जोन (टीडीजेड)** के अंदर तब तक बने रहते हैं जब तक कि उनकी वास्तविक घोषणा रेखा निष्पादित नहीं हो जाती।
 - `let` मानों को पुनः निर्दिष्ट करने की अनुमति देता है।
 - `const` वेरिएबल संदर्भ के पुन: असाइनमेंट को रोकता है (हालांकि `const` ऑब्जेक्ट के अंदर ऑब्जेक्ट गुण अभी भी उत्परिवर्तित किए जा सकते हैं)।
 - *उदाहरण*:

```javascript
 // Block Scope vs. Function Scope
 if (true) {
 var functionScoped = "var is NOT block-scoped";
 let blockScoped = "let IS block-scoped";
 }
 console.log(functionScoped); // Logs: "var is NOT block-scoped"
 // console.log(blockScoped); // ReferenceError: blockScoped is not defined

 // Hoisting & TDZ
 console.log(hoistedVar); // Logs: undefined (var is hoisted and initialized to undefined)
 var hoistedVar = 10;

 // console.log(tdzVar); // ReferenceError: Cannot access 'tdzVar' before initialization
 let tdzVar = 20;
 ```

### 3. इवेंट लूप और कॉनकरेंसी मॉडल
जावास्क्रिप्ट एक एकल-थ्रेडेड भाषा है, जिसका अर्थ है कि इसमें एक कॉल स्टैक है और एक समय में एक ऑपरेशन निष्पादित करता है। कॉन्करेंसी को **इवेंट लूप** का उपयोग करके ब्राउज़र या Node.js रनटाइम वातावरण द्वारा नियंत्रित किया जाता है।

```text
[Call Stack] (Main Thread, Synchronous execution)
 ⬇️ (Asynchronous callback offloaded to WebAPI/Host thread)
[WebAPIs / OS Host] (Timers, Network requests, I/O)
 ⬇️ (Callbacks queued upon completion)
[Queues]
 1. Microtask Queue (High Priority: Promise resolutions, queueMicrotask)
 2. Macrotask Queue (Low Priority: setTimeout, setInterval, I/O)
```

- **कॉल स्टैक**: सिंक्रोनस कोड को क्रमिक रूप से निष्पादित करता है।
- **वेबएपीआई**: एसिंक वेब/नोड कार्यों (टाइमर, फ़ेच अनुरोध, फ़ाइल सिस्टम I/O) को ऑफ-थ्रेड संभालता है।
- **माइक्रोटास्क Queue **: उच्च-प्राथमिकता वाले कॉलबैक संग्रहीत करता है (उदाहरण के लिए, `Promise.then` रिज़ॉल्यूशन, `MutationObserver` , `queueMicrotask` )।
- **मैक्रोटास्क Queue (कॉलबैक Queue )**: मानक स्थगित कॉलबैक संग्रहीत करता है (उदाहरण के लिए, `setTimeout` , `setInterval` , उपयोगकर्ता इंटरैक्शन ईवेंट)।
- **इवेंट लूप नियम**: 
 1. इवेंट लूप तब तक प्रतीक्षा करता है जब तक कॉल स्टैक पूरी तरह से खाली न हो जाए।
 2. इसके बाद यह **संपूर्ण** माइक्रोटास्क Queue (फ्लश के दौरान पंक्तिबद्ध किसी भी माइक्रोटास्क सहित) को फ्लश करता है।
 3. एक बार जब माइक्रोटास्क Queue पूरी तरह से खाली हो जाता है, तो यह मैक्रोटास्क Queue से **पहला** कार्य लेता है, इसे निष्पादित करने के लिए कॉल स्टैक पर धकेलता है, और चक्र को दोहराता है।
 - *उदाहरण (प्राथमिकता क्रम)*:

```javascript
 console.log("1. Synchronous");

 setTimeout(() => {
 console.log("4. Macrotask (setTimeout)");
 }, 0);

 Promise.resolve().then(() => {
 console.log("3. Microtask (Promise)");
 });

 console.log("2. Synchronous End");

 // Execution Output:
 // 1. Synchronous
 // 2. Synchronous End
 // 3. Microtask (Promise)
 // 4. Macrotask (setTimeout)
 ```

---
## 🗑️ धारा 2: मेमोरी प्रबंधन और कचरा संग्रहण
*⏱️ 3 मिनट पढ़ें*

### 1. Hermes मार्क-एंड-स्वीप कचरा संग्रहण
 React Native का Hermes इंजन **मार्क-एंड-स्वीप गारबेज कलेक्टर (जीसी)** का उपयोग करके मेमोरी का प्रबंधन करता है:
1. **मार्क चरण**: जीसी वैश्विक रूट ऑब्जेक्ट (विंडो संदर्भ, सक्रिय क्लोजर, निष्पादन stack संदर्भ) से शुरू होता है और सभी संदर्भ बिंदुओं को पुनरावर्ती रूप से पार करता है। पहुंची हुई प्रत्येक वस्तु को सक्रिय (पहुंचने योग्य) के रूप में "चिह्नित" किया जाता है।
2. **स्वीप चरण**: जीसी heap मेमोरी स्पेस को स्कैन करता है। कोई भी वस्तु जिसमें कोई सक्रिय चिह्न नहीं है, उसे अप्राप्य (मृत) माना जाता है और उसके आवंटित मेमोरी स्थान को पुनः प्राप्त (स्वेप्ट) कर दिया जाता है।

### 2. मेमोरी लीक की पहचान और निदान
 memory leak तब होता है जब वेरिएबल या ऑब्जेक्ट जिनकी अब ऐप लॉजिक को आवश्यकता नहीं है, उन्हें अभी भी रूट कंटेनर द्वारा संदर्भित किया जाता है, जिससे कचरा कलेक्टर को उन्हें साफ़ करने से रोका जा सकता है।

#### विशिष्ट जेएस मेमोरी लीक परिदृश्य:
- **लंबे समय तक चलने वाले टाइमर/अंतराल**: अनमाउंटिंग के दौरान `clearInterval` पर कॉल किए बिना रिएक्ट घटक के अंदर `setInterval` बनाना। अंतराल कॉलबैक क्लोजर सभी घटक स्थिति चर के संदर्भों को बनाए रखते हुए चलता रहता है।
 - *उदाहरण*:

```javascript
 // ❌ LEAK: Missing clearInterval on unmount
 useEffect(() => {
 setInterval(() => { console.log("Timer ticking..."); }, 1000);
 }, []);

 // ✅ FIX: Clean up the interval using return cleanup function
 useEffect(() => {
 const id = setInterval(() => { console.log("Timer ticking..."); }, 1000);
 return () => clearInterval(id);
 }, []);
 ```

- **अनरिमूव्ड इवेंट श्रोता**: वैश्विक श्रोताओं को पंजीकृत करना (उदाहरण के लिए, `DeviceEventEmitter` , `AppState.addEventListener` , या कस्टम इवेंट डिस्पैचर) और क्लीनअप ब्लॉक में `.remove()` पर कॉल करने में विफल होना।
 - *उदाहरण*:

```javascript
 // ❌ LEAK: window listener remains attached after component unmounts
 useEffect(() => {
 window.addEventListener("resize", handleResize);
 }, []);

 // ✅ FIX: Clean up the event listener
 useEffect(() => {
 window.addEventListener("resize", handleResize);
 return () => window.removeEventListener("resize", handleResize);
 }, []);
 ```

- **क्लोजर लीक**: बाहरी दायरे में बड़े एरे या संदर्भ होते हैं जो लंबे समय तक रहने वाले आंतरिक कार्यों द्वारा फंस जाते हैं।
- **वैश्विक चर**: गलती से बड़ी वस्तुओं या सूचियों को वैश्विक `global` या `window` दायरे में संलग्न करना।
 - *उदाहरण*:

```javascript
 // ❌ LEAK: Attaching big data to global object
 function processData() {
 global.leakData = new Array(1000000).fill("Data");
 }
 ```

---

## ⚛️ धारा 3: प्रतिक्रिया जीवनचक्र: वर्ग घटक बनाम कार्यात्मक हुक
*⏱️ 2 मिनट पढ़ें*

रिएक्ट तीन अलग-अलग चरणों में घटक जीवनचक्र का प्रबंधन करता है: **माउंटिंग** (प्रारंभिक पेंट), **अपडेटिंग** (प्रोप/स्टेट म्यूटेशन के कारण पुन: प्रस्तुत करना), और **अनमाउंटिंग** (डीओएम/नेटिव लेआउट ट्री से हटाना)।

### 1. संरचनात्मक तुलना: कक्षाएं बनाम हुक
- **वर्ग घटक**: स्पष्ट वर्ग उदाहरण विधियों ( `componentDidMount` , `componentDidUpdate` , आदि) का उपयोग करके जीवनचक्र चरणों के अनुसार समूह तर्क। राज्य को एकल इंस्टेंस ऑब्जेक्ट ( `this.state` ) में बनाए रखा जाता है।
- **कार्यात्मक घटक + हुक**: पृथक कार्यों का उपयोग करके चिंता के आधार पर समूह तर्क (दुष्प्रभाव, कैश, स्थिति)। राज्य को परमाणु hook घोषणाओं ( `useState` ) में विभाजित किया गया है।

### 2. जीवनचक्र मानचित्रण संदर्भ

| वर्ग घटक जीवनचक्र विधि | कार्यात्मक हुक समतुल्य ( `useEffect` ) | विवरण/नियम |
| :--- | :--- | :--- |
| ** `componentDidMount` ** | `useEffect(() => {}, [])` | घटक माउंट होने के बाद एक बार चलता है। खाली निर्भरता सरणी `[]` यह सुनिश्चित करती है कि यह बाद के अद्यतनों पर निष्पादित न हो। |
| ** `componentDidUpdate(prevProps, prevState)` ** | `useEffect(() => {}, [dep1, dep2])` | props या राज्य परिवर्तन के बाद चलता है। निर्भरता सरणी उथली समानता ( `Object.is` ) का उपयोग करके चर की तुलना करती है। |
| ** `componentWillUnmount` ** | `useEffect(() => { return () => { /* clean up */ } }, [])` | अनमाउंट करने से ठीक पहले चलता है। लौटाया गया क्लीनअप फ़ंक्शन अनमाउंट इवेंट के रूप में कार्य करता है। |

- *साथ-साथ उदाहरण*:

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

## ⚡ धारा 4: रिएक्ट ऑप्टिमाइज़ेशन हुक ( `useMemo` , `useCallback` , `useRef` )
*⏱️ 4 मिनट पढ़ें*

### 1. `useMemo` (वैल्यू कैशिंग)
- **उद्देश्य**: रेंडर चक्रों में महंगी गणना के परिणाम को कैश करता है।
- **तंत्र**: गणना का मूल्यांकन तभी करता है जब इसकी निर्भरता सरणी के अंदर चर बदलते हैं। यदि निर्भरताएँ समान रहती हैं, तो यह निष्पादन को रोकता है और सीपीयू-भारी तर्क को छोड़कर, कैश्ड परिणाम प्रस्तुत करता है।
- **फिनटेक उदाहरण**:

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

### 2. `useCallback` (संदर्भ कैशिंग)
- **उद्देश्य**: रेंडर चक्रों में फ़ंक्शन इंस्टेंस संदर्भ को याद रखना।
- **तंत्र**: जावास्क्रिप्ट में, फ़ंक्शन ऑब्जेक्ट हैं। एक इनलाइन फ़ंक्शन ( `onPress={() => {}}` ) बनाने से प्रत्येक रेंडर पर मेमोरी में एक बिल्कुल नया ऑब्जेक्ट संदर्भ आवंटित होता है। यदि यह कॉलबैक `React.memo` के साथ अनुकूलित चाइल्ड घटक को पास किया जाता है, तो बच्चा एक "परिवर्तित" प्रोप संदर्भ का पता लगाएगा और एक पूर्ण, अनावश्यक पुन: प्रस्तुतीकरण को ट्रिगर करेगा। `useCallback` में कॉलबैक लपेटने से बिल्कुल वही मेमोरी एड्रेस रेफरेंस पॉइंटर बना रहता है जब तक कि निर्भरता सरणी मान परिवर्तित न हो जाएं।
- **उदाहरण**:

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

### 3. `useRef` (परिवर्तनीय कंटेनर)
- **उद्देश्य**: एक परिवर्तनशील कंटेनर बना रहता है जिसकी `.current` संपत्ति घटक के पूरे जीवनचक्र के दौरान एक मूल्य रखती है।
- **मुख्य विशेषता**: `.current` को बदलने से **किसी घटक का पुन: प्रस्तुतीकरण ट्रिगर नहीं होता**। इसका उपयोग परिवर्तनशील स्थिति मानों को संग्रहीत करने के लिए किया जाता है जो दृश्य UI पेंट चक्रों को प्रभावित नहीं करना चाहिए, जैसे वेबसॉकेट संदर्भ, एनीमेशन ऑब्जेक्ट या टाइमर आईडी।
- **उदाहरण**:

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

### 4. कब याद नहीं करना है
 `useMemo` और `useCallback` का अत्यधिक उपयोग करना एक सामान्य गलती है जो प्रदर्शन को ख़राब करती है:
- **तुच्छ तर्क**: `useMemo` में सरल गणनाओं को लपेटना (उदाहरण के लिए, दो संख्याओं को जोड़ना या स्ट्रिंग props को जोड़ना) अनावश्यक ओवरहेड जोड़ता है। निर्भरता के लिए मेमोरी स्लॉट आवंटित करने और प्रत्येक रेंडर पर उथली तुलना चलाने की लागत आदिम मूल्य की पुन: गणना करने की लागत से अधिक है।
 - *उदाहरण*:

```javascript
 // ❌ BAD: Trivial math is cheaper than hook validation setup
 const total = useMemo(() => price + tax, [price, tax]);
 ```

- **अनावश्यक निर्भरताएँ**: `useCallback` में रैपिंग फ़ंक्शंस जब उन्हें मानक HTML/मूल तत्वों (जैसे `<View>` या `<Button>` ) में पास किया जाता है, तो यह अनावश्यक है, क्योंकि मानक तत्व `React.memo` जैसे संदर्भ जाँच अनुकूलन को लागू नहीं करते हैं।
 - *उदाहरण*:

```javascript
 // ❌ BAD: Native <button> does not check reference equality
 const onNativeClick = useCallback(() => { console.log("clicked"); }, []);
 return <button onClick={onNativeClick}>Click</button>;
 ```

---

## 🗃️ धारा 5: राज्य आर्केस्ट्रा: Redux Toolkit बनाम प्रतिक्रिया क्वेरी
*⏱️ 3 मिनट पढ़ें*

बड़े पैमाने पर रिएक्ट एप्लिकेशन state management को दो स्पष्ट डोमेन में विभाजित करते हैं: **क्लाइंट UI स्टेट** और **रिमोट सर्वर स्टेट**।

```text
[State Management]
 ├── Client UI State ➡️ (Redux Toolkit) ➡️ predictable, local UI themes, wizard state
 └── Server Data State ➡️ (React Query) ➡️ cached backend responses, background synchronization
```

### 1. Redux Toolkit (आरटीके) - क्लाइंट UI राज्य
- **इसके लिए सर्वश्रेष्ठ**: स्थानीयकृत एप्लिकेशन कॉन्फ़िगरेशन, UI थीम, सक्रिय सत्र प्रमाणीकरण झंडे, उपयोगकर्ता प्राथमिकताएं और बहु-चरण इनपुट (उदाहरण के लिए, एक साइनअप विज़ार्ड)।
- **मुख्य सिद्धांत**: यूनिडायरेक्शनल डेटा प्रवाह सिंक्रोनस actions और reducers द्वारा नियंत्रित होता है। परिवर्तन पूर्वानुमेय हैं, डेवटूल्स के माध्यम से ट्रैक करने योग्य हैं, और पूरी तरह से क्लाइंट मेमोरी के भीतर चलते हैं।
- **एसिंक्रोनस डेटा**: थंक्स या सागास का उपयोग करता है। ऑर्केस्ट्रेटिंग अनुक्रमिक एपीआई कॉल के लिए मैन्युअल लोडिंग फ़्लैग, त्रुटि ट्रैकिंग और कैशिंग लॉजिक्स की आवश्यकता होती है।
- **उदाहरण**:

```javascript
 import { createSlice, configureStore } from '@reduxjs/toolkit';

 // 1. Create slice
 const uiSlice = createSlice({
 name: 'ui',
 initialState: { darkMode: false },
 reducers: {
 toggleTheme: (state) => {
 state.darkMode = !state.darkMode; // Immer library handles safe state copying under the hood
 }
 }
 });

 export const { toggleTheme } = uiSlice.actions;

 // 2. Configure store
 const store = configureStore({
 reducer: { ui: uiSlice.reducer }
 });
 ```

### 2. रिएक्ट क्वेरी (टैनस्टैक क्वेरी) - सर्वर स्थिति
- **इसके लिए सर्वश्रेष्ठ**: डेटा जो दूरस्थ डेटाबेस पर रहता है (उदाहरण के लिए, बैंक खाते, व्यापार इतिहास, लेनदेन)।
- **मुख्य सिद्धांत**: घोषणात्मक कैश कंटेनर। रिएक्ट क्वेरी एक एसिंक्रोनस स्टेट मशीन के रूप में कार्य करती है जो फ़ेचिंग, कैशिंग, स्वचालित बैकग्राउंड री-वैलिडेशन, रिक्वेस्ट डिडुप्लीकेशन, लोडिंग स्टेट्स और आउट-ऑफ़-द-बॉक्स त्रुटि पुनः प्रयास को संभालती है।
- **मुख्य रणनीतियाँ**:
 - **आश्रित क्वेरीज़**: मूल क्रेडेंशियल हल होने तक `enabled` कॉन्फ़िगरेशन ध्वज (उदाहरण के लिए, `enabled: !!userId` ) का उपयोग करके क्वेरीज़ को ब्लॉक करें।
 - **घातीय बैकऑफ़**: अस्थायी नेटवर्क ड्रॉपआउट को शालीनता से संभालने के लिए बढ़ते विलंब समय के साथ स्वचालित पुनर्प्रयासों को कॉन्फ़िगर करें।
 - **कैश अमान्यकरण**: क्वेरी कुंजियाँ (उदाहरण के लिए, `['portfolio', userId]` ) वैरिएबल को कैश बकेट में मैप करती हैं। `queryClient.invalidateQueries({ queryKey })` पर कॉल करने से पुराने घटकों को सिंक करने के लिए बैकग्राउंड रीफ़ेच ट्रिगर हो जाता है।
- **उदाहरण**:

```javascript
 import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

 function UserDashboard({ userId }) {
 const queryClient = useQueryClient();

 // 1. Querying data (Server State)
 const { data: user, isLoading, error } = useQuery({
 queryKey: ['user', userId],
 queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json())
 });

 // 2. Dependent Query: Only runs after 'user' is fetched and username is available
 const { data: orders } = useQuery({
 queryKey: ['orders', user?.username],
 queryFn: () => fetch(`/api/orders?user=${user.username}`).then(res => res.json()),
 enabled: !!user?.username // Blocks execution until condition evaluates to true
 });

 // 3. Mutating data + Cache Invalidation
 const mutation = useMutation({
 mutationFn: (newProfile) => fetch(`/api/users/${userId}`, {
 method: 'PUT',
 body: JSON.stringify(newProfile)
 }),
 onSuccess: () => {
 // Automatically triggers background fetch to update outdated components
 queryClient.invalidateQueries({ queryKey: ['user', userId] });
 }
 });

 if (isLoading) return <span>Loading...</span>;
 return <div>User: {user.name} (Orders: {orders?.length ?? 0})</div>;
 }
 ```

---
## ⚙️ धारा 6: उन्नत कोर जेएस और रिएक्ट इंजन अवधारणाएँ
*⏱️ 24 मिनट पढ़ें*

### 1. करी और उत्थापन
- **उत्थापन**: संकलन चरण के दौरान, जावास्क्रिप्ट घोषणाओं (चर और फ़ंक्शन) को उनके संलग्न दायरे के शीर्ष पर ले जाता है।
 - *फ़ंक्शन घोषणाएँ* पूरी तरह से फहराई जाती हैं (घोषणा और कार्यान्वयन दोनों), जिससे उन्हें उनकी भौतिक रेखा स्थिति से पहले लागू किया जा सकता है।
 - * `var` वेरिएबल* फहराए गए हैं और `undefined` पर आरंभ किए गए हैं।
 - * `let` और `const` वेरिएबल* फहराए गए हैं लेकिन **टेम्पोरल डेड जोन (टीडीजेड)** में अप्रारंभित रहते हैं, अगर जल्दी पहुंच जाए तो `ReferenceError` फेंक दिया जाता है।
 - *फ़ंक्शन एक्सप्रेशन* (उदाहरण के लिए, `const fn = () => {}` ) वेरिएबल की तरह व्यवहार करते हैं और पूरी तरह से फहराए नहीं जाते हैं।
 - *उदाहरण*:

```javascript
 console.log(greet()); // Logs: "Hello!" (Function declaration hoisted)
 function greet() { return "Hello!"; }

 console.log(hoistedVar); // Logs: undefined (var declaration hoisted, not initialized)
 var hoistedVar = "Var is here";

 // console.log(letVar); // ReferenceError: Cannot access 'letVar' before initialization (in TDZ)
 let letVar = "Let is here";

 // console.log(sum(1, 2)); // TypeError: sum is not a function (function expression hoisted as var)
 var sum = function(a, b) { return a + b; };
 ```

- **करींग**: एक कार्यात्मक प्रोग्रामिंग पैटर्न जहां एक फ़ंक्शन कई तर्क लेता है, नेस्टेड फ़ंक्शन की श्रृंखला में बदल जाता है, प्रत्येक एक एकल तर्क लेता है। यह मूल्यांकनों में तर्कों को बनाए रखने के लिए क्लोजर का लाभ उठाता है।
 - *उदाहरण*:

```javascript
 const multiply = a => b => a * b; 
 multiply(2)(3); // 6

 // Practical application: Configuring partial arguments
 const discountCalculator = (discount) => (price) => price * (1 - discount);
 const tenPercentOff = discountCalculator(0.10);
 console.log(tenPercentOff(100)); // 90
 console.log(tenPercentOff(250)); // 225
 ```

### 2. प्रोटोटाइप वंशानुक्रम और श्रृंखला
- प्रत्येक जावास्क्रिप्ट ऑब्जेक्ट में एक निजी लिंक होता है जो किसी अन्य ऑब्जेक्ट को संदर्भित करता है जिसे उसका **प्रोटोटाइप** ( `__proto__` ) कहा जाता है। 
- **प्रोटोटाइप श्रृंखला**: किसी ऑब्जेक्ट पर किसी संपत्ति तक पहुंचते समय, जावास्क्रिप्ट सबसे पहले ऑब्जेक्ट के स्थानीय गुणों को देखता है। यदि नहीं मिला, तो यह प्रोटोटाइप श्रृंखला ( `object.__proto__` , `object.__proto__.__proto__` ) को पुनरावर्ती रूप से पार करता है जब तक कि संपत्ति स्थित नहीं हो जाती या श्रृंखला `null` पर समाप्त नहीं हो जाती।
- **प्रॉपर्टी शैडोइंग**: यदि कोई ऑब्जेक्ट किसी स्थानीय संपत्ति को उसके प्रोटोटाइप पर मौजूद संपत्ति के समान नाम से परिभाषित करता है, तो स्थानीय संपत्ति प्रोटोटाइप की संपत्ति को "छाया" (ओवरराइड) कर देती है।
- *उदाहरण*:

```javascript
 const animal = {
 eats: true,
 walk() { console.log("Animal walks"); }
 };

 const rabbit = Object.create(animal); // Links rabbit.__proto__ to animal
 rabbit.jumps = true;

 console.log(rabbit.jumps); // Logs: true (Local property)
 console.log(rabbit.eats); // Logs: true (Inherited property from prototype)
 rabbit.walk(); // Logs: "Animal walks" (Inherited method)

 // Property Shadowing
 rabbit.walk = function() { console.log("Rabbit hops"); };
 rabbit.walk(); // Logs: "Rabbit hops" (Local walk shadows prototype's walk)
 ```

### 3. उथली बनाम गहरी नकल
- **उथली प्रतिलिपि**: केवल प्रथम स्तर की कुंजियों की प्रतिलिपि बनाता है। नेस्टेड ऑब्जेक्ट के लिए, यह मेमोरी रेफरेंस पॉइंटर्स को कॉपी करता है, जिसका अर्थ है कि कॉपी के अंदर नेस्टेड ऑब्जेक्ट को म्यूट करने से मूल ऑब्जेक्ट संशोधित हो जाएगा।
 - *तरीके*: स्प्रेड ऑपरेटर ( `{ ...obj }` ), `Object.assign({}, obj)` ।
- **डीप कॉपी**: सभी प्रॉपर्टी स्तरों को पुनरावर्ती रूप से कॉपी करता है, सभी नेस्टेड ऑब्जेक्ट के लिए पूरी तरह से नए मेमोरी स्लॉट आवंटित करता है। प्रतिलिपि में किए गए परिवर्तन मूल को प्रभावित नहीं करते हैं.
 - *तरीके*: `structuredClone(obj)` (मूल आधुनिक मानक), `JSON.parse(JSON.stringify(obj))` (बुनियादी, ड्रॉप फ़ंक्शन/अपरिभाषित/दिनांक), या कस्टम पुनरावर्ती डीप-क्लोनिंग उपयोगिताएँ।
- *उदाहरण*:

```javascript
 const original = { name: "Rajeev", details: { age: 30 } };

 // --- SHALLOW COPY ---
 const shallowCopy = { ...original };
 shallowCopy.details.age = 35; // Mutating nested object
 console.log(original.details.age); // Logs: 35 (Shared reference mutated!)

 // --- DEEP COPY ---
 const originalObj = { name: "Rajeev", details: { age: 30 } };
 const deepCopy = structuredClone(originalObj);
 deepCopy.details.age = 40; // Mutating nested object in deep copy
 console.log(originalObj.details.age); // Logs: 30 (Completely isolated)
 ```

### 4. स्प्रेड बनाम रेस्ट ऑपरेटर्स ( `...` )
यद्यपि वे समान सिंटैक्स ( `...` ) का उपयोग करते हैं, वे जहां उनका उपयोग किया जाता है उसके आधार पर विपरीत संचालन करते हैं:
- **स्प्रेड ऑपरेटर (अनपैक/विस्तार)**: किसी सरणी के तत्वों या किसी ऑब्जेक्ट के गुणों का विस्तार करता है। मूल्यों को अनपैक करने के लिए अभिव्यक्ति संदर्भों (जैसे सरणी/ऑब्जेक्ट शाब्दिक या फ़ंक्शन कॉल) में उपयोग किया जाता है।
 - *ऐरे/ऑब्जेक्ट क्लोनिंग और मर्जिंग*:

```javascript
 const original = [1, 2];
 const cloneAndAdd = [...original, 3, 4]; // [1, 2, 3, 4]

 const user = { name: "Rajeev", role: "Dev" };
 const updatedUser = { ...user, active: true }; // { name: "Rajeev", role: "Dev", active: true }
 ```

 - *फ़ंक्शन तर्क (अनपैकिंग)*:

```javascript
 const coordinates = [10, 20];
 function drawPoint(x, y) { console.log(x, y); }
 drawPoint(...coordinates); // equivalent to drawPoint(10, 20)
 ```

- **रेस्ट पैरामीटर / रेस्ट पैटर्न (इकट्ठा/पैक्स)**: अलग-अलग मानों/तर्कों को एक एकल संरचित कंटेनर (सरणी या ऑब्जेक्ट) में एकत्रित करता है। पैरामीटर सूचियों या डिस्ट्रक्चरिंग में उपयोग किया जाता है।
 - *फ़ंक्शन पैरामीटर्स*:

```javascript
 function sum(...nums) { // Gathers all arguments into a 'nums' array
 return nums.reduce((a, b) => a + b, 0);
 }
 sum(1, 2, 3, 4); // Returns 10 (nums is [1, 2, 3, 4])
 ```

 - *विनाशकारी*:

```javascript
 const [first, second, ...remaining] = [10, 20, 30, 40, 50];
 console.log(remaining); // [30, 40, 50]

 const { name, ...otherInfo } = { name: "Rajeev", age: 30, country: "India" };
 console.log(otherInfo); // { age: 30, country: "India" }
 ```

#### मुख्य स्मरणीय
- **रेस्ट** = *अलग-अलग तत्वों को एक कंटेनर में इकट्ठा करता है (असाइनमेंट/पैरामीटर के बाईं ओर उपयोग किया जाता है)।
- **स्प्रेड** = *एक कंटेनर को अलग-अलग तत्वों में फैलाता है (असाइनमेंट के दाईं ओर/अंदर के तर्क/शब्दांश में उपयोग किया जाता है)।

### 5. जेनरेटर और इटरेटर
- **इटरेटर्स**: `next()` विधि के साथ इटरेटर प्रोटोकॉल को कार्यान्वित करने वाला एक ऑब्जेक्ट `{ value, done: boolean }` लौटाता है। ऑब्जेक्ट `[Symbol.iterator]` के माध्यम से कस्टम पुनरावृत्ति की घोषणा कर सकते हैं।
 - *उदाहरण*:

```javascript
 // Custom Iterator representing a count sequence
 const countIterator = {
 data: [10, 20, 30],
 [Symbol.iterator]() {
 let index = 0;
 return {
 next: () => {
 if (index < this.data.length) {
 return { value: this.data[index++], done: false };
 } else {
 return { value: undefined, done: true };
 }
 }
 };
 }
 };

 for (const item of countIterator) {
 console.log(item); // Logs: 10, 20, 30
 }
 ```

- **जेनरेटर**: ** `function*` ** का उपयोग करके घोषित, जेनरेटर ऐसे फ़ंक्शन हैं जो निष्पादन को रोक सकते हैं और फिर से शुरू कर सकते हैं। वे राज्यों को वापस करने के लिए ** `yield` ** कीवर्ड का उपयोग करते हैं, कॉल में उनके निष्पादन संदर्भ (परिवर्तनीय दायरे) को बनाए रखते हैं।
 - *उदाहरण*:

```javascript
 function* numberGenerator() {
 yield 1;
 yield 2;
 yield 3;
 }
 const gen = numberGenerator();

 console.log(gen.next()); // { value: 1, done: false }
 console.log(gen.next()); // { value: 2, done: false }
 console.log(gen.next()); // { value: 3, done: false }
 console.log(gen.next()); // { value: undefined, done: true }
 ```

### 6. कॉलबैक और कॉलबैक नरक
- **कॉलबैक**: एक फ़ंक्शन किसी अन्य फ़ंक्शन के तर्क के रूप में पारित किया जाता है, जिसे अतुल्यकालिक घटनाओं को पूरा करने के लिए बाहरी फ़ंक्शन के अंदर निष्पादित किया जाता है।
- **कॉलबैक हेल**: एसिंक्रोनस कॉलबैक का पिरामिड-आकार का नेस्टिंग, कोड को अपठनीय, ट्रेस करना कठिन और डीबग करने में नाजुक बनाता है।
 - *उदाहरण*:

```javascript
 fetchUser(userId, (user) => {
 fetchOrders(user.id, (orders) => {
 fetchOrderDetails(orders[0].id, (details) => {
 console.log(details);
 }, errorCallback);
 }, errorCallback);
 }, errorCallback);
 ```

 - *रिज़ॉल्यूशन*: कॉलबैक को प्रॉमिस या Async/Await से बदलकर हल किया गया।

### 7. वादे, एसिंक/प्रतीक्षा करें और प्रयास करें/पकड़ें
- **वादा**: एक वस्तु जो किसी एसिंक्रोनस ऑपरेशन के अंतिम समापन या विफलता का प्रतिनिधित्व करती है।
 - *राज्य*: `Pending` (उड़ान के दौरान), `Fulfilled` (सफलता), `Rejected` (त्रुटि)।
- **प्रॉमिस चेनिंग**: `.then()` हैंडलर के भीतर से एक नया वादा लौटाकर क्रमिक रूप से कई अतुल्यकालिक संचालन को चेन करने का पैटर्न।
 - *उदाहरण*:

```javascript
 fetchUser(userId)
 .then(user => fetchOrders(user.id))
 .then(orders => fetchOrderDetails(orders[0].id))
 .then(details => console.log(details))
 .catch(err => console.error("Error in chain:", err));
 ```

- **वादे एपीआई**:
 - ** `Promise.all(iterable)` **: समाधान तब होता है जब **सभी** वादे सुलझ जाते हैं; यदि **कोई** वादा अस्वीकार करता है (सभी-या-कुछ भी नहीं) तो तुरंत अस्वीकार कर देता है।
 - ** `Promise.allSettled(iterable)` **: **सभी** वादों के निपटान (या तो समाधान या अस्वीकार) की प्रतीक्षा करता है और परिणाम विवरणकों की एक श्रृंखला लौटाता है: `{ status: 'fulfilled' | 'rejected', value?: any, reason?: any }` । कभी भी जल्दी अस्वीकार नहीं करता.
 - ** `Promise.any(iterable)` **: **पहला** वादा पूरा होते ही समाधान हो जाता है। `AggregateError` के साथ केवल तभी अस्वीकार करता है जब **सभी** वादे अस्वीकार हो जाते हैं।
 - ** `Promise.race(iterable)` **: जैसे ही **पहला** वादा तय हो जाता है (या तो समाधान हो जाता है या अस्वीकार हो जाता है)।
- **एसिंक/प्रतीक्षा**: सिंटैक्टिक शुगर को एसिंक्रोनस कोड लिखने के वादे के शीर्ष पर बनाया गया है जो सिंक्रोनस कोड की तरह पढ़ता है, जिससे इसका पालन करना आसान हो जाता है।
- **सीमाओं को पकड़ने/कोशिश करने का प्रयास करें**: तुल्यकालिक और अतुल्यकालिक त्रुटि सीमाएँ। `async/await` का उपयोग करते समय, त्रुटियाँ `try-catch` ब्लॉक के अंदर स्पष्ट रूप से पकड़ी जाती हैं, जिससे बिना संभाले हुए वादे को अस्वीकार करने से रोका जा सकता है।

### 7बी. Redux एसिंक वर्कफ़्लो: सिंक्रोनस एक्शन और मिडलवेयर (थंक्स/सागास)
- ** Redux सिंक्रोनस है**: डिज़ाइन के अनुसार, Redux का कोर प्रवाह पूरी तरह से सिंक्रोनस है: `dispatch(action) -> store calls reducer(state, action) -> state updates` । रेड्यूसर बिना किसी दुष्प्रभाव (कोई एपीआई अनुरोध, कोई टाइमर) के साथ शुद्ध कार्य होना चाहिए।
- ** Redux एसिंक कार्यों को कैसे संभालता है**: एसिंक कार्यों को करने के लिए (उदाहरण के लिए कई एपीआई को कॉल करना), Redux **मिडिलवेयर** का उपयोग करता है जो actions को reducer तक पहुंचने से पहले ही इंटरसेप्ट कर लेता है।
- ** Redux थंक**:
 - *यह कैसे काम करता है*: सादे action ऑब्जेक्ट के बजाय एक फ़ंक्शन (थंक) भेजने की अनुमति देता है। मिडलवेयर फ़ंक्शन निष्पादित करता है और `dispatch` और `getState` विधियों को पास करता है।
 - *व्यवहार*: यह मुख्य JS निष्पादन लूप को अवरुद्ध **नहीं** करता है। एकाधिक एपीआई कॉल को `await` या `Promise.all` का उपयोग करके थंक के अंदर क्रमिक या समवर्ती रूप से निष्पादित किया जा सकता है।
 - *उदाहरण*:

```javascript
 const fetchUserAndOrders = (userId) => async (dispatch) => {
 dispatch({ type: 'FETCH_START' });
 try {
 const user = await api.fetchUser(userId);
 dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
 const orders = await api.fetchOrders(user.id);
 dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: orders });
 } catch (err) {
 dispatch({ type: 'FETCH_FAIL', error: err.message });
 }
 };
 ```

- ** Redux सागा**:
 - *यह कैसे काम करता है*: जटिल एसिंक प्रवाह को व्यवस्थित करने के लिए ES6 **जेनरेटर** ( `function*` ) का उपयोग करता है। यह भेजे गए actions को सुनता है और पृष्ठभूमि जनरेटर कार्य ( sagas ) चलाता है।
 - *व्यवहार*: सहायक कार्यों का उपयोग करके उन्नत समवर्ती नियंत्रण प्रदान करता है (उदाहरण के लिए, यदि नया action भेजा जाता है तो पिछले चल रहे एपीआई अनुरोधों को स्वचालित रूप से रद्द करने के लिए `takeLatest` , समानांतर प्रसंस्करण के लिए `takeEvery` , गैर-अवरुद्ध कॉल के लिए `fork` )।
 - *उदाहरण*:

```javascript
 function* fetchUserSaga(action) {
 try {
 const user = yield call(api.fetchUser, action.payload);
 yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
 } catch (err) {
 yield put({ type: 'FETCH_FAIL', message: err.message });
 }
 }
 function* watchFetchUser() {
 yield takeLatest('FETCH_USER_REQUEST', fetchUserSaga);
 }
 ```

### 8. प्रतिक्रिया समाधान और अंतर (प्रतिक्रिया फाइबर)
- **वर्चुअल डोम**: रिएक्ट वास्तविक UI लेआउट ट्री का हल्का इन-मेमोरी प्रतिनिधित्व बनाए रखता है।
- **सुलह (रिएक्ट फाइबर)**: रिएक्ट एल्गोरिथ्म UI को अपडेट करने के लिए उपयोग करता है। यह रेंडरिंग को एक गैर-अवरुद्ध संकलन चरण (फाइबर वर्क ट्री बनाना) और एक प्रतिबद्ध चरण (स्क्रीन पर परिवर्तन लिखना) में विभाजित करता है।
- **डिफ़िंग एल्गोरिथम**: रिएक्ट $O(N)$ अनुमानी डिफिंग दृष्टिकोण का उपयोग करके वर्चुअल DOM नोड्स की तुलना करता है:
 1. यदि दो तत्व अलग-अलग प्रकार के हैं, तो रिएक्ट पुराने पेड़ को तोड़कर एक नया पेड़ बनाता है।
 2. यदि तत्व एक ही प्रकार के हैं, तो रिएक्ट विशेषताओं की तुलना करता है और केवल परिवर्तित गुणों को अपडेट करता है।
 3. **सूचियों में कुंजियाँ**: कुंजियाँ सूची आइटमों के लिए विशिष्ट पहचानकर्ता के रूप में कार्य करती हैं। जब कोई सूची बदलती है, तो रिएक्ट पुराने और नए पेड़ों के बीच नोड्स का मिलान करने के लिए कुंजियों का उपयोग करता है। अद्वितीय कुंजियाँ प्रदान करने में विफल होने (या कुंजियों के रूप में सरणी अनुक्रमित का उपयोग करने) के कारण रिएक्ट अनावश्यक रूप से घटकों को नष्ट कर देता है और फिर से बना देता है या हटाने/सम्मिलन के दौरान स्थानीय स्थितियों को गलत तरीके से संरेखित कर देता है।

### 9. आलसी लोडिंग और कोड विभाजन
- **कोड विभाजन**: जावास्क्रिप्ट बंडल को छोटे टुकड़ों में विभाजित करना जिन्हें गतिशील रूप से डाउनलोड किया जा सकता है।
- **आलसी लोडिंग**: सुविधाओं के लोड समय में तब तक देरी करना जब तक उन तक पहुंच न हो जाए। रिएक्ट में, यह लोडिंग फ़ॉलबैक UI प्रदर्शित करने के लिए ** `React.lazy()` ** (गतिशील घटक आयात के लिए) ** `<Suspense>` ** सीमा में लपेटकर प्राप्त किया जाता है। इससे ऐप लॉन्च बंडल का आकार घट जाता है और स्टार्टअप समय में सुधार होता है।
- *उदाहरण*:

```javascript
 import React, { Suspense } from 'react';

 // Lazy load the Profile component dynamically (separate chunk is only loaded when needed)
 const LazyProfile = React.lazy(() => import('./components/Profile'));

 function App() {
 return (
 <div>
 <h1>My App</h1>
 <Suspense fallback={<div>Loading component...</div>}>
 <LazyProfile />
 </Suspense>
 </div>
 );
 }
 ```

### 10. डिबाउंस बनाम थ्रॉटल (निष्पादन नियंत्रण रैपर्स)
क्लाइंट-साइड एप्लिकेशन (विशेष रूप से मोबाइल ऐप्स) में, उपयोगकर्ता इंटरैक्शन अत्यधिक बार-बार होने वाली घटनाओं को ट्रिगर कर सकता है (उदाहरण के लिए, खोज बार में टाइप करना, सूची स्क्रॉल करना या स्वाइप करना)। यदि ये ईवेंट सीधे नेटवर्क अनुरोधों या भारी लेआउट गणनाओं को निष्पादित करते हैं, तो वे थ्रेड्स को संतृप्त कर सकते हैं और प्रदर्शन को ख़राब कर सकते हैं।

- **डिबाउंसिंग**: पिछली बार जब ईवेंट ट्रिगर हुआ था तब से एक निर्दिष्ट शांत अवधि बीत जाने तक फ़ंक्शन निष्पादन में देरी होती है। हर बार जब कोई नया ट्रिगर होता है, तो लंबित टाइमर रद्द कर दिया जाता है और पुनः प्रारंभ किया जाता है।
 - *ट्रिगर नियम*: उपयोगकर्ता के पूरी तरह से इंटरैक्ट करना बंद करने के बाद फ़ंक्शन को **केवल एक बार** निष्पादित करता है।
 - *उदाहरण*:

```javascript
 function debounce(func, delay = 500) {
 let timeoutId = null;
 return function (...args) {
 if (timeoutId) clearTimeout(timeoutId);
 timeoutId = setTimeout(() => {
 func.apply(this, args);
 }, delay);
 };
 }
 ```

- **थ्रॉटलिंग**: प्रत्येक निर्दिष्ट समय अंतराल पर फ़ंक्शन निष्पादन को अधिकतम एक बार सीमित करता है। भले ही घटनाएँ प्रति सेकंड सैकड़ों बार सक्रिय हों, फ़ंक्शन नियंत्रित, नियमित गति से निष्पादित होता है।
 - *ट्रिगर नियम*: एक निर्धारित आवृत्ति पर आवधिक निष्पादन की गारंटी देता है (उदाहरण के लिए, प्रत्येक 200ms में अधिकतम एक बार)।
 - *उदाहरण*:

```javascript
 function throttle(func, limit = 200) {
 let inThrottle = false;
 return function (...args) {
 if (!inThrottle) {
 func.apply(this, args);
 inThrottle = true;
 setTimeout(() => inThrottle = false, limit);
 }
 };
 }
 ```

### 11. इवेंट एमिटर और प्रकाशन-सदस्यता पैटर्न
- **प्रकाशन-सदस्यता (पबसब)**: एक डिज़ाइन पैटर्न जहां प्रेषक (प्रकाशक) विशिष्ट प्राप्तकर्ताओं (ग्राहकों) को संदेशों को प्रोग्रामेटिक रूप से लक्षित नहीं करते हैं। इसके बजाय, घटनाओं को चैनल या नामस्थान में वर्गीकृत किया जाता है।
- **इवेंट एमिटर**: केंद्रीय ब्रोकर ग्राहक सूचियों को कॉलबैक करने के लिए सक्रिय चैनलों का मानचित्र बनाए रखता है।
 - जब कोई ग्राहक पंजीकृत होता है ( `on("event", callback)` ), तो ब्रोकर उनके श्रोता फ़ंक्शन संदर्भ को ईवेंट सरणी में जोड़ता है।
 - जब कोई ईवेंट ( `emit("event", payload)` ) प्रकाशित होता है, तो ब्रोकर सब्सक्राइबर ऐरे पर पुनरावृति करता है, कॉलबैक लागू करता है।
 - **मेमोरी सुरक्षा**: सब्सक्राइबर्स को सदस्यता समाप्त करनी होगी या संदर्भ साफ़ करना होगा (उदाहरण के लिए, रिएक्ट घटक के अनमाउंट क्लीनअप में); अन्यथा, ईवेंट एमिटर कॉलबैक और संलग्न घटक स्थिति का एक मजबूत संदर्भ बनाए रखता है, जिससे memory leak बनता है।
 - *उदाहरण*:

```javascript
 class EventEmitter {
 constructor() { this.events = {}; }
 on(event, listener) {
 if (!this.events[event]) this.events[event] = [];
 this.events[event].push(listener);
 return () => this.off(event, listener); // Unsubscribe helper
 }
 off(event, listenerToRemove) {
 if (!this.events[event]) return;
 this.events[event] = this.events[event].filter(l => l !== listenerToRemove);
 }
 emit(event, data) {
 if (!this.events[event]) return;
 this.events[event].forEach(listener => listener(data));
 }
 }
 ```

### 12. फ़ंक्शन मेमोइज़ेशन कैशिंग
- **मेमोइज़ेशन**: एक अनुकूलन तकनीक जिसका उपयोग महंगे फ़ंक्शन कॉल के परिणामों को संग्रहीत करके और समान इनपुट दोबारा होने पर कैश्ड परिणाम लौटाकर कंप्यूटर प्रोग्राम को गति देने के लिए किया जाता है।
- **कार्यान्वयन**: रैपर लक्ष्य फ़ंक्शन को एक निजी `cache` मानचित्र ऑब्जेक्ट वाले क्लोजर के अंदर लपेटता है। यह कुंजी हैश बनाने के लिए इनपुट तर्कों को स्ट्रिंग करता है। यदि कुंजी कैश मैपिंग के अंदर मौजूद है, तो यह फ़ंक्शन निष्पादन को दरकिनार करते हुए तुरंत मान लौटा देती है।
 - *उदाहरण*:

```javascript
 function memoize(fn) {
 const cache = {};
 return function (...args) {
 const key = JSON.stringify(args);
 if (key in cache) {
 return cache[key];
 }
 const result = fn.apply(this, args);
 cache[key] = result;
 return result;
 };
 }
 ```

### 13. जावास्क्रिप्ट पॉलीफिल्स और प्रोटोटाइप प्रतिनिधिमंडल
- **पॉलीफ़िल**: पुराने ब्राउज़रों या जावास्क्रिप्ट इंजनों पर आधुनिक कार्यक्षमता प्रदान करने के लिए उपयोग किया जाने वाला कोड का एक टुकड़ा जो मूल रूप से इसका समर्थन नहीं करता है (उदाहरण के लिए, `Array.prototype.map` को फिर से बनाने के लिए पुराने सिंटैक्स का उपयोग करना)।
- **प्रोटोटाइप डेलिगेशन**: जावास्क्रिप्ट उनकी प्रोटोटाइप श्रृंखला ( `Array.prototype` ) को पार करके सरणियों या वस्तुओं पर विधियों का समाधान करता है। पॉलीफ़िल बनाने के लिए, यदि मूल कंपाइलर `undefined` पर रिज़ॉल्यूशन की जाँच करता है, तो हम सीधे बेस प्रोटोटाइप ऐरे इंटरफ़ेस पर कस्टम तरीकों को परिभाषित करते हैं।
 - *उदाहरण*:

```javascript
 if (!Array.prototype.myMap) {
 Array.prototype.myMap = function (callback) {
 const result = [];
 for (let i = 0; i < this.length; i++) {
 if (i in this) { // Handle sparse arrays safely
 result.push(callback(this[i], i, this));
 }
 }
 return result;
 };
 }
 ```

### 14. उन्नत जेएस इंजन और समवर्ती प्रश्नोत्तर

#### Q1: V8/ Hermes मेमोरी लेआउट (स्टैक बनाम हीप) को समझाएं और जावास्क्रिप्ट वेरिएबल्स को कैसे आवंटित और संदर्भित किया जाता है।
- **उत्तर**:
 जेएस रनटाइम वातावरण मेमोरी को दो प्रमुख क्षेत्रों में विभाजित करता है: **स्टैक** और **द हीप**।
 - **स्टैक (स्थिर आवंटन)**:
 - वस्तुओं को लक्षित करने वाले आदिम (संख्या, स्ट्रिंग, बूलियन, अपरिभाषित, अशक्त, प्रतीक, बिगिंट) और संदर्भ (मेमोरी एड्रेस पॉइंटर्स) को संग्रहीत करता है।
 - ओएस द्वारा सीधे प्रबंधित LIFO (लास्ट-इन-फर्स्ट-आउट) निष्पादन आदेश पर काम करता है।
 - अत्यधिक तेज़, आवंटन/डीलोकेशन स्वचालित रूप से निष्पादित होता है क्योंकि निष्पादन फ़्रेम कॉल स्टैक में प्रवेश करते हैं और छोड़ते हैं।
 - **ढेर (गतिशील आवंटन)**:
 - संदर्भ प्रकार (ऑब्जेक्ट, सरणियाँ, फ़ंक्शन, क्लोजर, घटक स्थिति) संग्रहीत करता है।
 - असंरचित, गतिशील मेमोरी heap । जैसे-जैसे वस्तुएं बढ़ती हैं, रनटाइम परिवर्तनीय खंड आवंटित करता है।
 - मेमोरी को पुनः प्राप्त करने के लिए कचरा संग्रहण (जीसी) संचालन की आवश्यकता होती है (उदाहरण के लिए, Hermes में मार्क-एंड-स्वीप), जो कम्प्यूटेशनल रूप से महंगे हैं।
 - **परिवर्तनीय संदर्भ यांत्रिकी**:
 - जब आप `const a = { x: 10 }` असाइन करते हैं, तो एक संदर्भ सूचक ( heap ऑब्जेक्ट का हेक्साडेसिमल मेमोरी पता) स्टैक पर संग्रहीत होता है, जबकि वास्तविक `{ x: 10 }` ऑब्जेक्ट हीप पर रहता है।
 - यदि आप किसी फ़ंक्शन में `a` पास करते हैं, तो पॉइंटर मान फ़ंक्शन के stack फ़्रेम में कॉपी हो जाता है। दोनों सूचक समान heap ब्लॉक का संदर्भ देते हैं। फ़ंक्शन के अंदर गुणों को संशोधित करने से स्रोत heap ऑब्जेक्ट बदल जाता है।

---

#### Q2: इवेंट लूप भुखमरी क्या है? `process.nextTick()` , `Promise.then()` , `setImmediate()` , और `setTimeout()` की निष्पादन प्राथमिकता की तुलना करें।
- **उत्तर**:
 - **इवेंट लूप भुखमरी**: तब होता है जब उच्च-प्राथमिकता वाली कतारें (जैसे माइक्रोटास्क Queue ) लगातार पॉप्युलेट होती हैं, जो इवेंट लूप को कम-प्राथमिकता वाले मैक्रोटास्क (जैसे इनपुट रेंडर करना, स्क्रॉल श्रोता या टाइमर) निष्पादित करने से पूरी तरह से रोकती हैं।
 - **प्राथमिकता और लूप चरण**:
 1. **सिंक्रोनस निष्पादन**: कॉल स्टैक तत्काल कार्यों को निष्पादित करता है।
 2. ** `process.nextTick()` (नोड.जेएस विशिष्ट)**: वर्तमान सिंक्रोनस ऑपरेशन समाप्त होने के तुरंत बाद सक्रिय हो जाता है, *इससे पहले* माइक्रोटास्क का मूल्यांकन किया जाता है। यदि कोई स्क्रिप्ट `process.nextTick` पर पुनरावर्ती रूप से कॉल करती है, तो यह इवेंट लूप को पूरी तरह से ब्लॉक कर देती है।
3. **माइक्रोटास्क Queue (वादे, क्यूमाइक्रोटास्क)**: कॉल stack साफ़ होने के बाद और लूप के अगले चरण में जाने से पहले निष्पादित किया जाता है। इवेंट लूप तब तक आगे नहीं बढ़ेगा जब तक कि माइक्रोटास्क queue *पूरी तरह से* खाली न हो जाए। यदि माइक्रोटास्क लगातार queue नए माइक्रोटास्क, मैक्रोटास्क भूखे रहते हैं।
 4. **मैक्रोटास्क Queue (सेटटाइमआउट/सेटइंटरवल, आई/ओ)**: माइक्रोटास्क queue खाली होने पर बाद के लूप चक्रों में ट्रिगर किया जाता है।
 5. ** `setImmediate()` **: लूप के चेक चरण में तुरंत निष्पादित होता है, I/O कॉलबैक के बाद लेकिन कई Node.js जीवनचक्र स्थितियों में मानक टाइमर से पहले चलता है।

---

#### Q3: जावास्क्रिप्ट प्रॉक्सी और रिफ्लेक्ट एपीआई क्या हैं? प्रतिक्रियाशील राज्य ट्रैकिंग प्रणाली बनाने के लिए उनका उपयोग कैसे किया जा सकता है?
- **उत्तर**:
 - **प्रॉक्सी**: एक ES6 ऑब्जेक्ट एक लक्ष्य ऑब्जेक्ट को लपेटता है, जो आपको मौलिक संचालन को रोकने और अनुकूलित करने की अनुमति देता है (जैसे प्रॉपर्टी एक्सेस `get` , असाइनमेंट `set` , विलोपन `deleteProperty` )।
 - **रिफ्लेक्ट**: एक वैश्विक वस्तु जो प्रॉक्सी ट्रैप के अनुरूप स्थिर सहायक विधियाँ प्रदान करती है (उदाहरण के लिए, `Reflect.get(target, prop)` )। यह बूलियन सफलता मार्कर लौटाता है और डिफ़ॉल्ट ऑब्जेक्ट संचालन को पूर्वानुमानित बनाता है।
 - **बिल्डिंग रिएक्टिविटी (संकल्पना और उदाहरण)**:
 - स्टेट सिस्टम (जैसे Vue 3 रिएक्टिविटी या कस्टम स्टेट लाइब्रेरी) सादे ऑब्जेक्ट को प्रॉक्सी में लपेटते हैं।
 - ** `get` ट्रैप**: सक्रिय घटक निर्भरता (निर्भरता ट्रैकिंग) को ट्रैक करता है। जब कोई घटक `proxy.price` प्रस्तुत करता है और पढ़ता है, तो सिस्टम घटक को उस संपत्ति के ग्राहक के रूप में पंजीकृत करता है।
 - ** `set` ट्रैप**: प्रतिक्रियाशीलता को ट्रिगर करता है। जब कोई उत्परिवर्तन होता है ( `proxy.price = 100` ), तो प्रॉक्सी इंटरसेप्ट करता है, `Reflect.set()` पर कॉल करता है, और UI पुनः प्रस्तुत करने के लिए मजबूर करने के लिए सभी सब्सक्राइब किए गए घटकों के माध्यम से स्वचालित रूप से लूप करता है।
 - *उदाहरण*:

```javascript
 const item = { price: 100 };
 const reactiveItem = new Proxy(item, {
 get(target, prop, receiver) {
 console.log(`Getting value for prop: "${prop}" (Dependency Tracking)`);
 return Reflect.get(target, prop, receiver);
 },
 set(target, prop, value, receiver) {
 console.log(`Setting value for "${prop}" to ${value}. Triggering render update!`);
 return Reflect.set(target, prop, value, receiver);
 }
 });

 reactiveItem.price; // Logs: Getting value for prop: "price"
 reactiveItem.price = 120; // Logs: Setting value for "price" to 120. Triggering render update!
 ```

---

#### Q4: वीकमैप और वीकसेट मैप और Set से किस प्रकार भिन्न हैं? memory leak की रोकथाम में उनके उपयोग के मामले क्या हैं?
- **उत्तर**:
 - **कमजोर संदर्भ**: मानक `Map` और `Set` में, कुंजी या मान के रूप में जोड़े गए ऑब्जेक्ट को मजबूत संदर्भ के साथ रखा जाता है। garbage collector (जीसी) उन्हें साफ़ नहीं कर सकता, भले ही अन्य सभी चर संदर्भ संकेतक नष्ट हो गए हों।
 - **वीकमैप और वीकसेट**: वस्तुओं के संदर्भ को *कमजोर* रखता है।
 - `WeakMap` के अंदर की कुंजियाँ ऑब्जेक्ट होनी चाहिए (आदिम नहीं)।
 - यदि एप्लिकेशन मेमोरी में किसी मुख्य ऑब्जेक्ट का कोई अन्य मजबूत संदर्भ नहीं है, तो जीसी इसे स्वीप कर सकता है, और `WeakMap` के अंदर इसकी प्रविष्टि स्वचालित रूप से साफ़ हो जाती है।
 - **उपयोग के मामले**:
 - **कैशिंग/मेमोइज़ेशन**: ऑब्जेक्ट संदर्भों के लिए अस्थायी मेटाडेटा (जैसे उपयोगकर्ता फ़ेच स्थिति मानचित्र) को मैप करना। एक बार जब उपयोगकर्ता ऑब्जेक्ट को अनमाउंट के दौरान डीरेफ़रेंस किया जाता है, तो कैश स्वचालित रूप से मेमोरी से मुक्त हो जाता है।
 - **एनकैप्सुलेशन**: निजी ऑब्जेक्ट वैरिएबल संग्रहीत करना।
 - *उदाहरण*:

```javascript
 let userObject = { id: 101, name: "Rajeev" };
 const cacheMap = new WeakMap();

 // Cache metadata about userObject
 cacheMap.set(userObject, { loginTime: Date.now() });

 console.log(cacheMap.has(userObject)); // true

 // Break the strong reference to userObject
 userObject = null; 

 // Once garbage collection occurs, cacheMap will automatically clear the entry
 // for this user object, preventing a memory leak.
 ```

---

#### Q5: हुड के तहत प्रोटोटाइप इनहेरिटेंस मैकेनिक्स को समझाएं और वे ES6 क्लास संकलन से कैसे संबंधित हैं।
- **उत्तर**:
 - **प्रोटोटाइप इनहेरिटेंस**: जावास्क्रिप्ट में पारंपरिक ऑब्जेक्ट-ओरिएंटेड क्लासेस नहीं हैं। इसके बजाय, वंशानुक्रम एक छिपी हुई `[[Prototype]]` संपत्ति ( `__proto__` के रूप में पहुंच योग्य) के माध्यम से अन्य वस्तुओं से जुड़ने वाली वस्तुओं पर निर्भर करता है।
 - **लुकअप चेन**: `obj.prop` तक पहुंचने से पुनरावर्ती खोज शुरू हो जाती है: `obj` ➡️ `obj.__proto__` ➡️ `obj.__proto__.__proto__` `Object.prototype` तक, जो `null` पर समाप्त होती है।
 - **ES6 कक्षा संकलन**:
 - ईएस6 `class` सिंटैक्स पूरी तरह से सिंटैक्टिक शुगर रैपिंग प्रोटोटाइप निर्माण है।
 - जब आप `class Developer extends Person {}` लिखते हैं, तो Babel इसे मानक कंस्ट्रक्टर फ़ंक्शंस में संकलित करता है:

```javascript
 function Developer() {
 Person.call(this); // Inherit instance properties
 }
 Developer.prototype = Object.create(Person.prototype); // Link prototype chain
 Developer.prototype.constructor = Developer; // Reset constructor pointer
 ```

- क्लास ऑब्जेक्ट पर घोषित विधियाँ मेमोरी को बचाने के लिए `Developer.prototype` से जुड़ी हुई हैं, यह सुनिश्चित करते हुए कि सभी इंस्टेंस डुप्लिकेट इंस्टेंस के बजाय प्रोटोटाइप ऑब्जेक्ट पर एक एकल फ़ंक्शन संदर्भ साझा करते हैं।