> 🎯 **Topic:** 12.2 🤝 Behavioral, Leadership & HR Rounds
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## 12.2 🤝 Behavioral, Leadership & HR Rounds

*⏱️ 2 min read*

Senior and Lead roles are evaluated heavily on soft skills, mentoring, and conflict resolution. Always use the **STAR Method** (Situation, Task, Action, Result) for these questions.

#### 1. Conflict Resolution & Code Review Culture
**Q: You disagree with a senior engineer on an architectural decision. How do you handle it?**
- **Action**: Take the discussion offline or to a synchronous call rather than arguing in PR comments. Present objective data (e.g., performance benchmarks, bundle size impacts, maintenance overhead) rather than opinions.
- **Result**: "We created a quick PoC for both approaches. The data showed my approach was 20% faster, but their approach was easier to maintain. We compromised by documenting the trade-offs and choosing the maintainable route since it wasn't a critical hot-path."

**Q: How do you ensure high code quality across a large mobile team?**
- Implement strict CI/CD gates (Husky pre-commit hooks, ESLint, Prettier, TypeScript strict mode).
- Require at least 2 approvals for PRs.
- Establish a "Mobile Guild" that meets bi-weekly to discuss patterns, share knowledge, and update internal documentation.

#### 2. Mentoring & Team Leadership
**Q: Tell me about a time you mentored a junior developer.**
- **Action**: Instead of giving them the answers, I pair-programmed with them. I assigned them to a complex feature but broke it down into 5 small, manageable PRs. I reviewed each PR rigorously but supportively.
- **Result**: Within 3 months, they were independently delivering features and eventually mentored the next new hire.

#### 3. Client & Stakeholder Management (MNC Specific)
**Q: The client wants a feature delivered in 2 weeks, but your team estimates it will take 4 weeks. What do you do?**
- **Action**: Never say a flat "No". Negotiate the scope. Break the feature down into "Must-have", "Should-have", and "Could-have". Offer to deliver the MVP (Must-have) in 2 weeks, and phase the rest for the next sprint.
- **Result**: The client gets value delivered on their timeline without burning out the engineering team.

#### 4. Agile & Scrum Methodology
- **Story Points**: Used for complexity and effort, not hours.
- **Ceremonies**: Sprint Planning, Daily Standup, Sprint Review (Demo), Sprint Retrospective.
- **Lead Role**: Removing blockers for the team, protecting the team from scope creep during the sprint, and ensuring technical debt tickets are prioritized alongside product features (typically an 80/20 split).

#### 5. Salary Negotiation Strategy
- **Never give the first number**: "I'm currently focused on finding a role that is the right fit. Once we establish mutual interest, I'm sure we can agree on a competitive number based on market rates for a Senior Architect."
- **Counter-offers**: If you have a competing offer, disclose the existence of it, but not necessarily the company name. "I have another offer on the table for X, but I prefer your tech stack and culture. If you can match X, I will sign today."


---



---

# 14. Additional Interview Topics (Publicis Sapient Specific)

This section covers additional topics identified in the preparation checklist that were not explicitly detailed in the previous sections.

### 14.1 Networking & API

**Axios Interceptors**
- **Definition:** Interceptors are functions that Axios calls for every request or response before they are handled by `then` or `catch`. They are useful for adding authentication tokens, logging, or handling global errors.
- **Example:**
```javascript
import axios from 'axios';
axios.interceptors.request.use(config => {
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, error => Promise.reject(error));
```

**Request Cancellation**
- **Definition:** Canceling an API request if it is no longer needed (e.g., component unmounts before request completes) to prevent memory leaks and unnecessary network usage.
- **Example:** Using `AbortController` (modern standard):
```javascript
const controller = new AbortController();
axios.get('/api/data', { signal: controller.signal });
// to cancel:
controller.abort();
```

**JWT (JSON Web Token)**
- **Definition:** A compact, URL-safe means of representing claims to be transferred between two parties. Used for authorization and information exchange. It consists of three parts: Header, Payload, and Signature.

**Cookies in React Native**
- **Definition:** By default, React Native handles cookies automatically via the underlying OS networking libraries (OkHttp for Android, NSURLSession for iOS). For manual management, libraries like `@react-native-cookies/cookies` are used to clear or read cookies explicitly.

### 14.2 Native Mobile Components

**Android Activities**
- **Definition:** An Activity represents a single screen with a user interface. In a standard React Native app, there is typically one main `MainActivity` that hosts the React Root View.

**Android Broadcast Receivers**
- **Definition:** Android components that respond to system-wide broadcast announcements (e.g., battery low, network state changed). 

**iOS URL Schemes**
- **Definition:** A way to structure URIs to launch your app and pass data to it (Deep Linking). Configured in `Info.plist` (e.g., `myapp://path/to/resource`).

### 14.3 Device Features & Integrations

**Vision Camera & Barcode Scanning**
- **Definition:** `react-native-vision-camera` is a modern, high-performance camera library. It supports frame processors (via Reanimated) for tasks like barcode/QR code scanning, facial recognition, and real-time image processing.

**Biometrics (Face ID / Touch ID)**
- **Definition:** Using device hardware for secure authentication. Libraries like `react-native-biometrics` or `expo-local-authentication` provide unified APIs to prompt for Face ID (iOS) or Fingerprint/Face (Android).

**Location Services & Geofencing**
- **Definition:** Geofencing involves setting up a virtual perimeter for a real-world geographic area. Apps trigger events when a user enters or exits this area. Requires background location permissions.

**File Handling & Share Sheet**
- **Definition:** Handling local files (downloads, reading PDFs) is usually done via `react-native-fs` or `expo-file-system`. The "Share Sheet" is invoked using the built-in `Share` API to share text, URLs, or files to other apps natively.

### 14.4 Performance & Architecture

**Bundle Splitting**
- **Definition:** A technique to split the JavaScript bundle into smaller chunks that load on demand, reducing the initial startup time of the app. In React Native, this is heavily supported by the new Re.Pack (Webpack based) or upcoming Metro features.

### 14.5 Analytics & Observability

Enterprise apps use specialized tools for monitoring:
- **Tealium / Adobe Experience / AppsFlyer:** Enterprise marketing and attribution tools for tracking user journeys, ad conversions, and managing customer data platforms (CDP).
- **Dynatrace / Quantum Metric:** Advanced observability tools for real user monitoring (RUM), performance bottlenecks, and behavioral analytics.

### 14.6 Security

**MFA (Multi-Factor Authentication)**
- **Definition:** Adding an extra layer of security beyond passwords, typically involving SMS OTP, Authenticator apps, or biometrics.

### 14.7 CI/CD & Delivery

**OTA Updates (Expo Updates / CodePush)**
- **Definition:** Over-The-Air updates allow you to deploy JavaScript and asset changes directly to users without going through the App Store/Play Store review process.

**Jenkins & Bitbucket Pipelines**
- **Definition:** CI/CD automation servers/tools used to automatically run tests, build native binaries, and upload them to TestFlight/Google Play Console when code is merged.

### 14.8 Agile Practices

**Retrospectives**
- **Definition:** A Scrum ceremony held at the end of a sprint where the team discusses what went well, what went wrong, and how to improve processes for the next sprint.

## 15. Detailed Interview Q&A on Resume Topics (Newly Added)

Based on your resume, the following topics have been expanded into detailed interview questions and answers to ensure comprehensive preparation.

### 15.1 Core Architecture & React Native Internals
