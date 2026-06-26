> 🎯 **Topic:** 5.1 💼 MNC Client Scenarios & Tech Lead Behavior Q&A
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 👨💼 Lead Round Favorite

---


## 5.1 💼 MNC Client Scenarios & Tech Lead Behavior Q&A

*⏱️ 2 min read*

These scenarios evaluate consulting capabilities, leadership skills, and architectural decision-making.

#### 1. Client-Facing Communication & React Native Recommendations

##### Interview Scenario:
> *"A banking client asks if they should rebuild their existing native iOS and Android retail banking apps using React Native. How do you advise them?"*

- **Strategic Response**:
  "I would guide the client through an Objective Decision Matrix, evaluating their product roadmap, engineering resources, and performance requirements:
  - **When to recommend React Native**:
    - If the product roadmap focuses on UI interactions, forms, statements, data charts, and dynamic content updates.
    - If the client wants to reduce maintenance costs by unifying business logic (TypeScript) and styling across a single team, reducing feature release cycles.
  - **When to retain Native (Swift/Kotlin)**:
    - If the app integrates low-level hardware or OS services (e.g., continuous background location tracking, background audio processing).
    - If the app requires high-performance GPU-bound processing (e.g., real-time face detection models, AR/VR scanning).
  - **Hybrid Recommendation (The Enterprise Way)**:
    - For large banks, I recommend a **Hybrid Strategy**. Retain native containers for core security frameworks, device token registrations, and biometrics. Integrate React Native inside native Activities/Controllers to deliver feature screens (e.g., loans, rewards). This combines native security with cross-platform release speeds."

---

#### 2. Project Estimation & Resource Planning Methods

##### Interview Scenario:
> *"How do you estimate a complex project migration from legacy architectures to React Native?"*

- **Strategic Response**:
  "I apply a multi-tier estimation approach to ensure accuracy and account for integration risks:
  - **1. Feature Decomposition**: Break down the application into modular components: Core Infrastructure (Auth, Networking, Secure Storage), Shared UI Kit components, Feature Screens, and Native Integrations (Custom bridges, push notifications).
  - **2. Three-Point Estimation**: For each component, I gather inputs from senior team members to calculate:
    - $O$: Optimistic duration
    - $P$: Pessimistic duration
    - $M$: Most Likely duration
    - Calculate expected duration using: $E = \frac{O + 4M + P}{6}$
  - **3. Risk Buffer Allocation**: Add a 20-30% buffer specifically for native module integration, build pipeline setups, and third-party SDK upgrades.
  - **4. Sprint Planning Integration**: Map feature components to 2-week sprints, accounting for velocity, testing cycles, and store approval queues."

---

#### 3. Resolving Technical Debt and Team Performance Bottlenecks

##### Interview Scenario:
> *"You join a team where the React Native app build is extremely slow, developers complain about continuous merge conflicts, and crash rates in production are rising. What is your first 30-day action plan?"*

- **Strategic Response**:
  "My first 30 days would follow a structured assessment and remediation framework:
  - **Days 1–10: Audit and Diagnostics**:
    - Analyze crash logs in Sentry to identify the top 3 crash causes.
    - Audit the current CI/CD pipeline bottlenecks (e.g., identify why local caching is disabled during node module restorations).
    - Map dependency graphs to locate version mismatches.
  - **Days 11–20: Immediate Remediations (Quick Wins)**:
    - Implement strict Git hooks (Husky, lint-staged) to enforce linting and type-checks before commits occur, reducing compiler breakages.
    - Fix the top 3 crash causes to stabilize production.
    - Configure dependency cache directories on CI/CD runners to reduce build times by 40-50%.
  - **Days 21–30: Long-Term Architecture Setup**:
    - Introduce feature-based folder organization to isolate code changes, minimizing git merge conflicts.
    - Establish a monorepo strategy if multiple teams are working on shared packages.
    - Draft clear documentation, alignment guidelines, and define automated code review rules."

---


---

---



#### 4. Handling Complex Architectural Race Conditions

##### Interview Scenario:
> *"Can you describe a complex issue you faced with Redux and asynchronous data fetching in a large-scale application, and how you resolved it?"*

- **Strategic Response**:
  "On a previous enterprise project (like LVX), we had a robust React/Redux architecture using JWT authentication. We encountered a persistent race condition where users would randomly get logged out and kicked to the login screen, usually right when navigating to heavy dashboard pages."
  
  - **The Investigation**: 
    "I dug into the network logs and found the dashboard was firing 4 or 5 API calls on mount. If the access token was expired at that exact moment, all 5 calls would fail with a 401 Unauthorized error. This triggered 5 simultaneous refresh token requests. Because our backend implemented Refresh Token Rotation for security, seeing 5 requests using the same old refresh token triggered a security protocol that revoked all access and logged the user out. Additionally, it caused Redux state thrashing."
  
  - **The Resolution (The Lock & Queue Pattern)**:
    "I realized we couldn't handle this in individual Redux Thunks; we needed a centralized way to pause requests. I implemented a solution using our Axios response interceptor combined with Redux:
    1. **The Lock**: I introduced a boolean flag `isRefreshing`.
    2. **The Queue**: I created an array `failedQueue = []`.
    3. **Interceptor Logic**: When a 401 occurs, I check `isRefreshing`. If `false`, I set it to `true`, dispatch the Redux `refreshToken()` action, and make the API call. If `true` (meaning another request already triggered a refresh), I return a new Promise and push its `resolve`/`reject` into `failedQueue`.
    4. **Processing the Queue**: Once the single refresh request succeeds, I update the Redux store, loop through the `failedQueue`, resolve pending Promises with the new token so they automatically retry their original API calls, and finally unlock `isRefreshing = false`."
    
  - **The Impact**: 
    "This completely solved the random logout issue, optimized network traffic, and ensured Redux state remained clean without race conditions."
