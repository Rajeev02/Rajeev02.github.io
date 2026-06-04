<!-- INDEX_START --> <details> 
 <summary> 📖 <b> सामग्री तालिका (विस्तार करने के लिए क्लिक करें) </b> </summary> 

- [📘 धारा 1: प्रकार बनाम इंटरफ़ेस](#section-1-types-vs-interfaces) 
 - [1. संरचनात्मक समानताएँ](#1-structural-similarities) 
 - [2. मुख्य अंतर](#2-key-differences) 
 - [घोषणा विलय (इंटरफ़ेस के लिए अद्वितीय)](#declaration-merging-unique-to-interfaces) 
 - [संरचना एवं विस्तार](#composition-extensions) 
 - [क्षमता सीमाएँ](#capability-limits) 
- [🛠️ धारा 2: जेनरिक और उपयोगिता प्रकार](#section-2-generics-utility-types) 
 - [1. जेनेरिक (प्रकार पैरामीट्रिजेशन)](#1-generics-type-parametrization) 
 - [2. टाइपस्क्रिप्ट उपयोगिता प्रकार](#2-typescript-utility-types) 
- [📱 धारा 3: रिएक्ट नेटिव में टाइप सुरक्षा (कोडजेन स्पेक्स)](#section-3-type-safety-in-react-native-codegen-specs) 
 - [1. कोडजन विशिष्टता नियम](#1-codegen-specification-rules) 
 - [2. टर्बोमॉड्यूल स्पेक उदाहरण](#2-turbomodule-spec-example) 
- [⚙️ धारा 4: सख्त संकलक विकल्प ( `tsconfig.json` )](#section-4-strict-compiler-options-tsconfigjson) 
- [🔬 धारा 5: उन्नत टाइपस्क्रिप्ट प्रश्नोत्तर](#section-5-advanced-typescript-qa) </details> 
 <!-- INDEX_END --> 

## 📘 अनुभाग 1: प्रकार बनाम इंटरफ़ेस
*⏱️ 3 मिनट पढ़ें*

टाइपस्क्रिप्ट ऑब्जेक्ट संरचनाओं और अनुबंधों को घोषित करने के दो मुख्य तरीके प्रदान करता है: **इंटरफ़ेस** और **टाइप एलियासेस**। यह समझना कि कब उपयोग करना है, वरिष्ठ इंजीनियरिंग भूमिकाओं के लिए आवश्यक है।

### 1. संरचनात्मक समानताएँ
दोनों का उपयोग किसी वस्तु के आकार या फ़ंक्शन अनुबंध का वर्णन करने के लिए किया जा सकता है:

```typescript
// Interface
interface UserInterface {
 id: string;
 name: string;
}

// Type Alias
type UserType = {
 id: string;
 name: string;
};
```

---

### 2. मुख्य अंतर

#### घोषणा विलय (इंटरफ़ेस के लिए अद्वितीय)
- यदि आप एक ही दायरे में एक ही नाम के साथ दो इंटरफेस परिभाषित करते हैं, तो टाइपस्क्रिप्ट स्वचालित रूप से उनकी घोषणाओं को एक एकल इंटरफ़ेस परिभाषा में विलय कर देता है।
- प्रकार के उपनामों को एक ही नाम से कई बार घोषित नहीं किया जा सकता; ऐसा करने से डुप्लिकेट पहचानकर्ता त्रुटि उत्पन्न हो जाती है।

```typescript
interface Car { brand: string; }
interface Car { model: string; }
// Result: Car now has both properties: brand and model.
```

#### रचना एवं विस्तार
- **इंटरफ़ेस** `extends` कीवर्ड का उपयोग करके अन्य इंटरफ़ेस का विस्तार करें। यह संकलन-समय अनुकूलन को सक्षम बनाता है क्योंकि टाइपस्क्रिप्ट संबंध वृक्ष को कैश करता है।
- **प्रकार उपनाम** इंटरसेक्शन ऑपरेटरों ( `&` ) का उपयोग करके संरचनाएं बनाएं।

```typescript
// Interface extension
interface Senior extends UserInterface {
 role: string;
}

// Type Alias intersection
type SeniorType = UserType & {
 role: string;
};
```

#### क्षमता सीमाएँ
- **प्रकार उपनाम** आदिम, संघ प्रकार, प्रतिच्छेदन प्रकार, टुपल्स और मैप किए गए प्रकार घोषित कर सकता है।
- **इंटरफ़ेस** वस्तु आकार, वर्गों और फ़ंक्शन संरचनाओं का वर्णन करने तक सख्ती से सीमित हैं। वे सीधे यूनियन प्रकार या उपनाम आदिम प्रकार घोषित नहीं कर सकते।

```typescript
type ID = string | number; // Supported in Types, not Interfaces
type Position = [number, number]; // Tuple
```

---

## 🛠️ धारा 2: जेनेरिक और उपयोगिता प्रकार
*⏱️ 2 मिनट पढ़ें*

### 1. जेनेरिक (प्रकार पैरामीट्रिजेशन)
जेनरिक आपको पुन: प्रयोज्य, प्रकार-सुरक्षित घटकों, कक्षाओं या फ़ंक्शंस को लिखने की अनुमति देता है जो एक ही ठोस प्रकार के बजाय विभिन्न प्रकारों पर काम करते हैं। वे संकलन के दौरान कैप्चर किए गए प्रकार के चर के रूप में कार्य करते हैं।

- *जेनेरिक इंटरफ़ेस*:

```typescript
 // A generic API response container
 interface ApiResponse<T> {
 data: T;
 status: number;
 message: string;
 }

 const userResponse: ApiResponse<{ id: string; name: string }> = {
 data: { id: "101", name: "Rajeev" },
 status: 200,
 message: "Success"
 };
 ```

- *सामान्य कार्य*:

```typescript
 // Resolves to the type of the elements inside the passed array
 function getFirstElement<T>(arr: T[]): T | undefined {
 return arr.length > 0 ? arr[0] : undefined;
 }

 const num = getFirstElement([1, 2, 3]); // num is inferred as: number | undefined
 const str = getFirstElement(["a", "b"]); // str is inferred as: string | undefined
 ```

### 2. टाइपस्क्रिप्ट उपयोगिता प्रकार
टाइपस्क्रिप्ट सामान्य प्रकार के परिवर्तनों को सुविधाजनक बनाने के लिए अंतर्निहित उपयोगिताएँ प्रदान करता है।

- ** `Partial<T>` **: `T` set से लेकर वैकल्पिक तक की सभी संपत्तियों के साथ एक प्रकार का निर्माण करता है।
- ** `Omit<T, K>` **: `T` से सभी गुणों को चुनकर और फिर `K` कुंजियाँ हटाकर एक प्रकार का निर्माण करता है।
- ** `Pick<T, K>` **: `T` से विशिष्ट set गुणों `K` को चुनकर एक प्रकार का निर्माण करता है।
- ** `Record<K, T>` **: एक ऑब्जेक्ट प्रकार का निर्माण करता है जिसकी कुंजियाँ `K` और मान `T` हैं।
- ** `Readonly<T>` **: पुन: असाइनमेंट को रोकते हुए, `T` की सभी संपत्तियों को केवल पढ़ने के लिए सेट करता है।

- *व्यावहारिक उपयोग उदाहरण*:

```typescript
 interface User {
 id: string;
 name: string;
 email: string;
 age: number;
 }

 // 1. Partial: Useful for updates where only some fields are sent
 type UserUpdatePayload = Partial<User>; // { id?: string; name?: string; email?: string; age?: number; }

 // 2. Omit: Useful for creation where 'id' is generated by database
 type UserCreationDraft = Omit<User, "id">; // { name: string; email: string; age: number; }

 // 3. Pick: Extract a subset of fields for presentation summaries
 type UserDisplaySummary = Pick<User, "name" | "email">; // { name: string; email: string; }

 // 4. Record: Dictionary/HashMap lookups mapping IDs to user profiles
 type UserRegistry = Record<string, User>; // { [userId: string]: User }

 // 5. Readonly: Immutable configuration objects
 type ImmutableConfig = Readonly<{ apiUrl: string; timeout: number }>;
 const config: ImmutableConfig = { apiUrl: "https://api.com", timeout: 5000 };
 // config.apiUrl = "new"; // Error: Cannot assign to 'apiUrl' because it is a read-only property.
 ```

---

## 📱 धारा 3: React Native में टाइप सुरक्षा ( Codegen विवरण)
*⏱️ 1 मिनट पढ़ें*

नए आर्किटेक्चर में, ** Codegen ** जावास्क्रिप्ट और मूल C++/Java/Obj-C कोड के बीच प्रकार-सुरक्षा अंतर को पाटता है। इसे कॉन्फ़िगर करने के लिए, आप सख्त टाइपस्क्रिप्ट विशिष्टता फ़ाइलें लिखते हैं।

### 1. Codegen विशिष्टता नियम
- विशिष्ट फ़ाइल नाम को सख्त नामकरण परंपरा का पालन करना चाहिए: `Native<ModuleName>.ts` ( TurboModules के लिए) या `<ModuleName>NativeComponent.ts` ( Fabric घटकों के लिए)।
- आपको React Native ( `Double` , `Float` , `Int32` , `UnsafeObject` , `DirectEventHandler` ) द्वारा प्रदान की गई विशिष्ट, संकलन-सुरक्षित प्रकार की परिभाषाओं का उपयोग करना चाहिए। मानक जावास्क्रिप्ट गतिशील प्रकार जैसे `any` या सामान्य ऑब्जेक्ट प्रकार परिभाषाएँ Codegen कंपाइलर द्वारा अस्वीकार कर दी जाती हैं।

### 2. TurboModule विशिष्ट उदाहरण

```typescript
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
 // Define strict return and input types
 encryptPayload(alias: string, rawData: string): Promise<string>;
 decryptPayload(alias: string, encryptedData: string): Promise<string>;
 isBiometricsAvailable(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SecureEncryptionModule');
```

---
## ⚙️ धारा 4: सख्त कंपाइलर विकल्प ( `tsconfig.json` )
*⏱️ 1 मिनट पढ़ें*

रनटाइम crashes को रोकने और कोड गुणवत्ता लागू करने के लिए, एंटरप्राइज़ कॉन्फ़िगरेशन `tsconfig.json` में सख्त कंपाइलर विकल्प सक्षम करते हैं।

```json
{
 "compilerOptions": {
 "strict": true,
 "noImplicitAny": true,
 "strictNullChecks": true,
 "noEmit": true
 }
}
```

- ** `"strict": true` **: अंतर्निहित `any` ब्लॉक, सख्त शून्य जांच और सख्त बाइंडिंग कॉल आकलन सहित टाइप-चेकिंग व्यवहारों के एक व्यापक सूट को सक्षम करता है।
- ** `"noImplicitAny": true` **: एक निहित `any` प्रकार के साथ अभिव्यक्तियों और घोषणाओं पर एक त्रुटि उत्पन्न करता है। Developers को प्रकार-सुरक्षा अंतराल को कम करते हुए, स्पष्ट प्रकार घोषित करने के लिए मजबूर किया जाता है।
- ** `"strictNullChecks": true` **: `null` और `undefined` को अलग प्रकार मानता है। यह developers को स्पष्ट रूप से शून्य जाँच को संभालने के लिए बाध्य करके क्लासिक "अपरिभाषित की संपत्ति को नहीं पढ़ सकता" रनटाइम crashes को रोकता है।
- ** `"noEmit": true` **: टाइपस्क्रिप्ट को केवल टाइप चेकिंग करने का निर्देश देता है न कि जावास्क्रिप्ट बिल्ड फ़ाइलों को आउटपुट करने का। इसका उपयोग Vite और React Native लेआउट में किया जाता है जहां ट्रांसपिलेशन को Babel या Metro द्वारा नियंत्रित किया जाता है, जबकि टाइपस्क्रिप्ट एक स्थिर द्वारपाल के रूप में सख्ती से कार्य करता है।

---

## 🔬 धारा 5: उन्नत टाइपस्क्रिप्ट प्रश्नोत्तर
*⏱️ 6 मिनट पढ़ें*

### Q1: सशर्त प्रकारों की व्याख्या करें और गतिशील, प्रतिक्रियाशील टाइपिंग लिखने के लिए उनका उपयोग कैसे किया जाता है। `infer` का उपयोग करके कस्टम उपयोगिता प्रकार बनाने का तरीका दिखाने वाला एक उदाहरण प्रदान करें।
- **उत्तर**:
 - **सशर्त प्रकार**: टर्नरी-जैसे सशर्त वाक्यविन्यास का उपयोग करके एक्सप्रेस टाइपिंग: `T extends U ? X : Y` । यह मूल्यांकन करता है कि टाइप `T` को `U` टाइप करने के लिए असाइन किया जा सकता है या नहीं। यदि ऐसा है, तो प्रकार `X` पर हल हो जाता है; अन्यथा, `Y` ।
 - ** `infer` कीवर्ड**: एक सशर्त प्रकार के `extends` खंड के अंदर घोषित किया गया ताकि एक प्रकार के चर को गतिशील रूप से पेश किया जा सके जिसे टाइपस्क्रिप्ट को संकलन समय पर स्वचालित रूप से अनुमान लगाना होगा।
 - **उदाहरण (एक कस्टम `ReturnType<T>` उपयोगिता लिखना)**:

```typescript
 type CustomReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

 const getPortfolioValue = () => 500000;
 type ValueType = CustomReturnType<typeof getPortfolioValue>; // Resolves to 'number'!
 ```

 - **स्पष्टीकरण**: सशर्त जांच यह मूल्यांकन करती है कि प्रकार `T` किसी फ़ंक्शन हस्ताक्षर के लिए असाइन करने योग्य है या नहीं। यह फ़ंक्शन के रिटर्न प्रकार मान को कैप्चर करने के लिए `infer R` का उपयोग करता है, यदि स्थिति हल हो जाती है तो इसे वापस करने के लिए इसे `R` में संग्रहीत करता है।

---

### Q2: टाइपस्क्रिप्ट में संरचनात्मक टाइपिंग बनाम नाममात्र टाइपिंग का वर्णन करें। तर्क त्रुटियों को रोकने के लिए हम नाममात्र टाइपिंग (टाइप ब्रांडिंग) कैसे प्राप्त कर सकते हैं?
- **उत्तर**:
 - **स्ट्रक्चरल टाइपिंग (टाइपस्क्रिप्ट)**: टाइपस्क्रिप्ट की टाइप प्रणाली आकृतियों पर आधारित होती है। यदि दो वस्तुओं में समान गुण और प्रकार हैं, तो उन्हें एक ही प्रकार के रूप में माना जाता है, चाहे उनका नाम कुछ भी हो:

```typescript
 interface Point2D { x: number; y: number; }
 interface Vector2D { x: number; y: number; }
 let pt: Point2D = { x: 1, y: 2 };
 let vec: Vector2D = pt; // Statically allowed!
 ```

 - **नाममात्र टाइपिंग (जैसे जावा/स्विफ्ट)**: प्रकारों की जाँच संरचना के बजाय नाम से की जाती है। भले ही प्वाइंट2डी और वेक्टर2डी के आकार समान हों, असाइनमेंट को अस्वीकार कर दिया जाता है।
 - **टाइप ब्रांडिंग (नाममात्र सिमुलेशन)**: नाममात्र टाइपिंग को लागू करने के लिए (उदाहरण के लिए developers को उन कार्यों में कच्चे, अनियंत्रित स्ट्रिंग्स को पास करने से रोकना, जिनके लिए सुरक्षित क्रिप्टोग्राफ़िक यूएसडी इनपुट की आवश्यकता होती है), हम एक प्रेत अद्वितीय संपत्ति संलग्न करते हैं:

```typescript
 type USD = string & { readonly __brand: unique symbol };

 function validateUSD(amount: string): USD {
 return amount as USD; // Cast after validation
 }

 function processTransaction(value: USD) { ... }

 processTransaction("100"); // Compile error! Prevent plain strings.
 processTransaction(validateUSD("100")); // Statically approved!
 ```

---

### Q3: टाइपस्क्रिप्ट में सहप्रसरण और प्रतिप्रसरण की व्याख्या करें। फ़ंक्शन असाइनमेंट के दौरान टाइपस्क्रिप्ट पैरामीटर बनाम रिटर्न प्रकार का मूल्यांकन कैसे करता है?
- **उत्तर**:
 ये गुण पदानुक्रम से निपटने के दौरान प्रकार संगतता नियमों का वर्णन करते हैं (उदाहरण के लिए, एक सुपरक्लास कंटेनर को उपवर्ग निर्दिष्ट करना)।
 - **सहप्रसरण (दिशा सुरक्षित रखता है)**:
 - रिटर्न प्रकार के फ़ंक्शन **सहसंयोजक** हैं।
 - यदि `Dog extends Animal` है, तो `Dog` लौटाने वाला एक फ़ंक्शन `Animal` ( `() => Dog` ➡️ `() => Animal` ) लौटाने वाले फ़ंक्शन की अपेक्षा वाले वेरिएबल को सौंपा जा सकता है।
 - **विपरीतता (दिशा उलट)**:
- सख्त संकलन योजनाओं ( `strictFunctionTypes: true` ) के तहत फ़ंक्शन के पैरामीटर प्रकार **विपरीत** हैं।
 - यदि `Dog extends Animal` , एक फ़ंक्शन जो `Animal` को संसाधित करता है, उसे एक वेरिएबल को सौंपा जा सकता है जो एक फ़ंक्शन की अपेक्षा करता है जो `Dog` ( `(a: Animal) => void` ➡️ (डी: डॉग) => शून्य) को संसाधित करता है। क्यों? क्योंकि डॉग से अपेक्षा करने वाला फ़ंक्शन केवल डॉग गुणों तक पहुंचता है, और चूंकि एनिमल हैंडलर किसी भी जानवर को संभालता है, इसलिए यह सुरक्षित है। इसके विपरीत, जहां एक जानवर से अपेक्षा की जाती है, वहां केवल डॉग हैंडलर को पास करना विफल हो जाता है क्योंकि उसे एक बिल्ली मिल सकती है, जिससे रनटाइम विफलताएं शुरू हो जाती हैं।

---

### Q4: `unknown` बनाम `any` बनाम `never` की तुलना करें। सख्त प्रकार की सुरक्षा बनाए रखने के लिए प्रत्येक का उपयोग कब और कैसे किया जाना चाहिए?
- **उत्तर**:
 - ** `any` (एस्केप हैच)**: सभी प्रकार की जाँच बंद कर देता है। कंपाइलर किसी भी प्रॉपर्टी को पढ़ने या `any` पर कॉल करने की अनुमति देता है। यह अत्यधिक असुरक्षित है और रनटाइम crashes की ओर ले जाता है।
 - ** `unknown` (टाइप-सेफ `any` )**: किसी भी मूल्य का प्रतिनिधित्व करता है, लेकिन टाइपस्क्रिप्ट `unknown` पर सभी प्रॉपर्टी रीड्स या मेथड इनवोकेशन को तब तक ब्लॉक कर देता है जब तक कि आप स्पष्ट प्रकार संकुचन नहीं करते ( `typeof` , `instanceof` , या कस्टम टाइप गार्ड का उपयोग करके)।
 - *सर्वोत्तम उपयोग*: एपीआई JSON प्रतिक्रियाओं को डिसेरिएलाइज़ करना या उनकी संरचना को मान्य करने से पहले गतिशील इनपुट को पढ़ना।
 - ** `never` (असंभव स्थिति)**: उन मूल्यों का प्रतिनिधित्व करता है जो कभी घटित नहीं होने चाहिए।
 - *सर्वोत्तम उपयोग*: स्विच ब्लॉक के अंदर थकावट की जाँच करता है। यदि developer यूनियन प्रकार में एक नया राज्य जोड़ता है लेकिन संबंधित केस ब्लॉक जोड़ने में विफल रहता है, तो कंपाइलर संकलन के दौरान एक टाइप-त्रुटि फेंकता है:

```typescript
 type Action = 'INIT' | 'SUCCESS' | 'FAIL';
 function handle(action: Action) {
 switch(action) {
 case 'INIT': return;
 case 'SUCCESS': return;
 case 'FAIL': return;
 default:
 const _exhaustiveCheck: never = action; // Fails compile if Action receives new options!
 return _exhaustiveCheck;
 }
 }
 ```

---

### Q5: `incremental` , `composite` और प्रोजेक्ट संदर्भ जैसे टाइपस्क्रिप्ट कंपाइलर फ़्लैग बड़े पैमाने पर एंटरप्राइज़ मोनोरेपोज़ में कंपाइल-टाइम प्रदर्शन को अनुकूलित करने के लिए कैसे काम करते हैं?
- **उत्तर**:
 बड़ी परियोजनाओं (100,000+ लाइनों) के लिए, प्रत्येक प्रतिबद्धता पर संपूर्ण workspace को संकलित करने से बाधाएँ पैदा होती हैं।
 - ** `incremental: true` **: टाइपस्क्रिप्ट को अंतिम संकलन से बिल्ड जानकारी मेटाडेटा ( `.tsbuildinfo` फ़ाइलों के रूप में) सहेजने के लिए कहता है। बाद के संकलन के दौरान, टीएस इस मेटाडेटा को पढ़ता है और केवल अंतिम जांच के बाद से संशोधित फ़ाइलों को संकलित करता है, जिससे निर्माण समय 70% कम हो जाता है।
 - ** `composite: true` / परियोजना संदर्भ**:
 - एक विशाल परियोजना को छोटे, स्वतंत्र उप-परियोजनाओं में विभाजित करता है (जैसे `packages/core` , `packages/ui-kit` )।
 - प्रत्येक उप-प्रोजेक्ट का अपना `tsconfig.json` है जो `"composite": true` निर्दिष्ट करता है।
 - पेरेंट ऐप्स `"references"` प्रॉपर्टी का उपयोग करके इन परियोजनाओं को लिंक करते हैं।
 - निर्माण करते समय, टाइपस्क्रिप्ट केवल संशोधित पैकेजों को संकलित करता है और संकलित परिभाषाओं ( `.d.ts` ) को आउटपुट करता है, जिससे मोनोरेपोज़ में अप्रभावित मॉड्यूल के पुनर्निर्माण को रोका जा सकता है।