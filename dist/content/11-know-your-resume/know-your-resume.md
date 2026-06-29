# KNOW YOUR RESUME: Comprehensive Interview Guide

This guide breaks down every single keyword and experience point mentioned in your resume. It acts as a cheat sheet for interviews, providing the context behind each topic, likely interview questions, and ideal answers.

## 1. Core Profile & Domain Experience
**Topics Covered:** 9+ years experience, 5+ years React Native, 4 years Native Android (Java), Fintech, SaaS, Startup Ecosystem, Travel, Entertainment.

**Explanation:** You have a solid T-shaped profile. Your deep foundation in Native Android allows you to understand the mobile platform constraints (memory, lifecycle, networking), which you apply to building cross-platform apps in React Native. The Fintech and SaaS domains demonstrate your ability to handle complex business logic, sensitive data, and secure transactions.

**Interview Q&A:**
*   **Q:** Walk me through your 9+ years of experience and how you transitioned from Native Android to React Native.
*   **A:** I started in 2016 building native Android apps with Java for travel and entertainment platforms. This taught me core mobile concepts like memory management, offline handling, and native UI patterns. About 5+ years ago, while at LetsVenture, I transitioned to React Native to build cross-platform Fintech applications from a single codebase. My native Android background was a huge asset—it allowed me to easily build custom native modules, integrate complex SDKs (like Razorpay), and seamlessly navigate the React Native New Architecture updates.
*   **Follow-up Q:** Why did you stick with React Native instead of moving to Flutter or Native Kotlin/Swift?
*   **Follow-up A:** Given the web-heavy ecosystem of LetsVenture, React Native allowed us to share business logic, utilize the vast JavaScript/TypeScript ecosystem (like GraphQL and Redux), and ship to both platforms quickly without maintaining two separate native teams.

## 2. React Native Upgrades (0.63 to 0.83) & Stability
**Topics Covered:** Version upgrades across multiple release cycles, compatibility, production stability.

**Explanation:** Upgrading React Native is notoriously difficult. Interviewers value this because it shows you aren't just building greenfield apps; you maintain them. It involves handling breaking changes in Gradle, CocoaPods, Babel, and third-party libraries.

**Interview Q&A:**
*   **Q:** You’ve managed React Native upgrades from 0.63 to 0.83. Walk me through your upgrade strategy and a major challenge you faced.
*   **A:** My strategy starts with the React Native Upgrade Helper to map out core configuration changes (like `build.gradle` and `Podfile`). I always perform upgrades in an isolated branch. The biggest challenges usually involve third-party libraries that haven't kept up with RN releases. For example, moving to 0.68+ required ensuring libraries were New Architecture compatible, and recent updates to 0.73+ required major Android Gradle Plugin (AGP) and Java bumps. If a critical library is broken, I check for community forks or use `patch-package` to apply fixes locally until the maintainer merges a PR.
*   **Follow-up Q:** How do you ensure production stability after a massive upgrade?
*   **Follow-up A:** Heavy reliance on our Detox E2E test suite to catch regressions, alongside manual QA of core native integrations (camera, location). We also deploy gradually using staged rollouts on the Play Store and TestFlight to monitor crash rates via Sentry.

## 3. React Native New Architecture
**Topics Covered:** Hermes, JSI, Fabric, TurboModules.

**Explanation:** This is the most modern part of React Native. Hermes is the JS engine optimized for RN. JSI replaces the asynchronous JSON bridge with synchronous C++ host objects. Fabric is the new concurrent rendering system. TurboModules allow lazy-loading of native modules.

**Interview Q&A:**
*   **Q:** Describe your hands-on experience with the React Native New Architecture (Hermes, JSI, Fabric, TurboModules).
*   **A:** Adopting the New Architecture was key to our platform modernization. Enabling the Hermes engine immediately reduced our Time to Interactive (TTI) and app size. With JSI, I worked on bypassing the traditional asynchronous bridge, allowing JavaScript to call native methods synchronously without serialization overhead, which greatly improved high-frequency UI updates. I've also utilized TurboModules to lazy-load native dependencies, speeding up the app's initial startup time.
*   **Follow-up Q:** Can you explain the fundamental difference between the old Bridge and JSI?
*   **Follow-up A:** The old Bridge serialized all JS-to-Native communication into JSON strings over an asynchronous queue. This caused bottlenecks, especially during heavy data loads or rapid scrolling. JSI (JavaScript Interface) holds direct references to C++ host objects, allowing JS code to invoke native methods directly and synchronously, eliminating the serialization bottleneck.

## 4. State Management, Data Fetching & APIs
**Topics Covered:** GraphQL, REST APIs, Axios, Redux Toolkit, React Query, Context API.

**Explanation:** You have experience with the entire modern data stack. GraphQL prevents over/under-fetching. Redux Toolkit is for global client state. React Query handles server-state caching and synchronization. Context API is for lightweight prop-drilling avoidance.

**Interview Q&A:**
*   **Q:** You list GraphQL, REST APIs, Redux Toolkit, and React Query. How do you decide which to use for a specific problem?
*   **A:** For global UI state—like user preferences, active themes, or complex multi-step form data—I use Redux Toolkit or Context API (if the state is lightweight and doesn't change often). However, for server state, fetching, caching, and data synchronization, React Query is far superior because it handles loading, error states, and automatic retries out of the box. For the API layer, I prefer GraphQL if the backend supports it, as it prevents over-fetching data on mobile networks. If we interact with legacy or external services, I use Axios with REST.
*   **Follow-up Q:** How do you handle token expiration and silent refreshes when using Axios or Apollo Client?
*   **Follow-up A:** I implement response interceptors. If an API call returns a 401 Unauthorized, I pause all incoming requests in a queue, trigger a silent refresh using the stored refresh token, update the secure storage, and then replay the queued requests with the new access token.

## 5. White-Label Applications & Environments
**Topics Covered:** Reusable white-label applications, shared codebase, multi-environment configurations (Dev, QA, UAT, Staging, Production).

**Explanation:** White-labeling means building one core app and skinning/configuring it for different brands (like LVX and Scalix). It requires clean separation of concerns and dynamic configuration injection.

**Interview Q&A:**
*   **Q:** Explain your architectural approach to building reusable white-label applications from a shared codebase.
*   **A:** For the LetsVenture ecosystem, we used a shared core architecture. The core business logic, API services, and generic UI components lived in a central module. Product-specific configurations—like brand colors, fonts, logos, and feature flags—were injected dynamically at build time using environment variables (via `react-native-config`). We leveraged Clean Architecture and MVVM so the UI layer was completely decoupled from the data layer, allowing us to swap out views easily based on the active brand configuration.
*   **Follow-up Q:** How do you manage the release process for multiple apps from the same codebase?
*   **Follow-up A:** I heavily utilize Fastlane. We have parameterized lanes (e.g., `fastlane android deploy brand:LVX env:prod`). Fastlane automatically swaps the `google-services.json` (for Firebase), app icons, bundle identifiers, and `.env` files before executing the build and uploading to the respective stores.

## 6. Authentication, Security & Payments
**Topics Covered:** OAuth, JWT, AWS Cognito, Auth0, Razorpay, Cashfree.

**Explanation:** Fintech requires high security. AWS Cognito/Auth0 provide secure identity management. OAuth/JWT are the protocols. Razorpay/Cashfree handle the transaction gateways.

**Interview Q&A:**
*   **Q:** Working in Fintech, how did you handle authentication and ensure JWT tokens were stored securely?
*   **A:** Security is paramount. I never use `AsyncStorage` for sensitive data. Instead, I use `react-native-keychain` for iOS and EncryptedSharedPreferences for Android to store access and refresh tokens. For our integrations with AWS Cognito and Auth0, we utilized the PKCE (Proof Key for Code Exchange) flow to protect against authorization code interception. Additionally, for sensitive payment flows, we implemented biometric authentication checks before allowing transactions.
*   **Follow-up Q:** How do you handle edge cases in payment integrations like Razorpay, specifically if the user loses network connection right after paying?
*   **Follow-up A:** I never rely solely on the mobile SDK's success callback. We implement a strict backend webhook architecture. Before launching Razorpay, our backend generates an Order ID. When the app returns from the SDK, we poll our backend (Server-to-Server verification) to confirm the transaction status. If the app closes prematurely, our backend still receives the webhook from Razorpay, and the app reconciles the state by polling for pending orders upon the next launch.

## 7. Native Integrations & Hardware APIs
**Topics Covered:** Camera, Location Services, Push Notifications, Deep Linking, Device Permissions.

**Explanation:** React Native often needs native code to interact with the OS. Your Native Android experience shines here, ensuring permissions are handled correctly and native hardware is accessed efficiently.

**Interview Q&A:**
*   **Q:** You mentioned developing and maintaining native integrations. Can you give an example of a complex native integration you handled?
*   **A:** Handling deep linking and push notifications natively is a common challenge. For LetsVenture, we needed complex routing where clicking a push notification would open the app, verify the user's auth state, and navigate them deep into a specific portfolio view. I had to write native code in `MainActivity.java` and `AppDelegate.mm` to capture the intent/URL, delay the navigation until the React context was fully initialized and authenticated, and then pass the payload over the bridge to the JS navigation router.
*   **Follow-up Q:** How do you handle Android runtime permissions dynamically in React Native?
*   **Follow-up A:** I use a central permission manager utility utilizing `react-native-permissions`. Before accessing features like the Camera or Location, I check the status. If denied, I trigger the OS prompt. If permanently denied (user selected 'Don't ask again'), I show a custom UI explaining *why* the permission is needed and provide a deep link directly to the app's settings page via the `Linking` API.

## 8. UX, Accessibility & Localization
**Topics Covered:** Multi-language, multi-theme, Accessibility.

**Explanation:** Modern apps must be inclusive. Multi-theme (Dark/Light mode), multi-language (i18n), and Accessibility (Screen readers, talkback, dynamic text sizes) are markers of a mature, senior developer.

**Interview Q&A:**
*   **Q:** How do you implement multi-language and accessibility features in a large React Native application?
*   **A:** For localization, I use `react-i18next`. It allows dynamic language switching without reloading the app. For accessibility, I ensure all interactive elements (buttons, inputs) have proper `accessibilityLabel`, `accessibilityRole`, and `accessibilityState` props. This ensures screen readers like iOS VoiceOver and Android TalkBack can navigate the app. I also test with dynamic font sizes to ensure our UI scales correctly without breaking the layout.
*   **Follow-up Q:** How do you structure your styling to support dynamic multi-theme (Dark/Light) switching?
*   **Follow-up A:** I avoid hardcoding colors. I define a central design system token file with semantic naming (e.g., `backgroundPrimary`, `textSecondary`). These tokens map to actual hex values depending on the active theme, which is provided to the entire app via a React Context Provider or a library like `styled-components` / `Restyle`.

## 9. Performance Optimization (Low Network & App Speed)
**Topics Covered:** WildTrails (low-network environments), overall app stability and responsiveness, crash reporting.

**Explanation:** Mobile apps must function well on bad 3G networks and old phones. Performance optimization involves both JS thread management and networking strategies.

**Interview Q&A:**
*   **Q:** You optimized applications for low-network environments at WildTrails. What techniques do you use to ensure responsiveness?
*   **A:** For low bandwidth, caching is critical. I use `react-native-fast-image` for aggressive local image caching and React Query to cache API responses, so users see data immediately while it updates in the background. I also implement Optimistic UI updates—for example, if a user likes a post, I immediately update the UI before the API call finishes, falling back only if the request fails.
*   **Follow-up Q:** How do you debug performance bottlenecks or memory leaks in React Native?
*   **Follow-up A:** I use the React DevTools Profiler to identify components that are re-rendering unnecessarily and fix them using `React.memo`, `useMemo`, and `useCallback`. For memory leaks, I use the Memory tab in Flipper/Chrome to take JS heap snapshots, looking for detached DOM nodes or un-cleared intervals. If it's a native memory leak, I fall back to the Android Studio Profiler.

## 10. DevOps, CI/CD & Testing
**Topics Covered:** Fastlane, GitHub Actions, CodePush, Release Management (60+ releases), Jest, Detox, E2E Testing, Sentry, Firebase, PostHog.

**Explanation:** A senior engineer doesn't just write code; they deliver it reliably. Automated testing and CI/CD pipelines are crucial for rapid, safe deployment.

**Interview Q&A:**
*   **Q:** Explain your CI/CD pipeline and testing strategy that enabled you to successfully deliver 60+ production releases.
*   **A:** Our CI/CD pipeline is fully automated using GitHub Actions and Fastlane. On every Pull Request, GitHub Actions runs our ESLint checks, Jest unit tests, and React Native Testing Library component tests. Once merged to the main branch, Fastlane increments the build number, compiles the Android (AAB) and iOS (IPA) artifacts, and automatically uploads them to Firebase App Distribution for QA, and eventually TestFlight/Google Play Console.
*   **Follow-up Q:** How do you handle emergency bug fixes that need to reach users immediately?
*   **Follow-up A:** If the bug is purely in the JavaScript/TypeScript layer, I utilize CodePush (App Center). This allows me to push an Over-The-Air (OTA) update directly to users' devices instantly, completely bypassing the lengthy App Store and Play Store review processes. For native bugs, we do a hotfix release and request an expedited review from Apple/Google.

## 11. Early Career Android Experience
**Topics Covered:** Dunst Technologies (Travel/Events, notifications, multimedia, scheduling), Plurebus Technologies (Entertainment discovery, booking workflows).

**Explanation:** This shows your progression. You built the foundation of your career doing complex native work before shifting to RN.

**Interview Q&A:**
*   **Q:** Your early career involved building native Android apps for travel and entertainment. How did you handle multimedia content delivery and scheduling workflows?
*   **A:** At Dunst and Plurebus, I built apps that relied heavily on media and real-time updates. For multimedia, I used native libraries like ExoPlayer to ensure smooth video streaming and Glide for efficient image loading and memory caching. For scheduling and ticketing workflows, I heavily utilized Android's `AlarmManager` and `WorkManager` (and its predecessors) to handle background tasks and local notifications reliably, even if the app was killed.

## 12. Company Profiles & Experience Details
**Explanation:** Understanding the core business of each company you worked for helps you frame your impact during interviews.

### LetsVenture Technologies Private Limited (Sep 2019 - Feb 2026)
**What they do:** LetsVenture is a pioneering platform in the Indian startup ecosystem that connects founders with angel investors, family offices, and funds. They facilitate fundraising, syndicate creation, and provide tools for equity management (cap tables). Your role here in building SaaS/Fintech solutions directly enabled seamless investment workflows and portfolio tracking.

<details>
<summary><b>View Official Company Details</b></summary>

- **Designation:** Senior Android Developer
- **Start Date:** 12-Sep-2019
- **LWD (Last Working Day):** 12-Feb-2026
- **Address:** WeWork Galaxy, 43, Residency Road, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka - 560025
- **Contact:** +91-8147621535
- **Email/Web:** contact@lvxventures.com | www.lvxventures.com
- **Live LVX App Links:** [Google Play Store](https://play.google.com/store/apps/details?id=com.lvxventures.app&hl=en_IN) | [Apple App Store](https://apps.apple.com/us/app/lvx-letsventure/id6752903270)
- **CIN:** U72900KA2018PTC110746
- **GST No.:** 29AADCL5389F1Z4

</details>

### WildTrails Technology Private Limited (Mar 2018 - Sep 2019)
**What they do:** WildTrails provides an AI-powered platform for wildlife tourism. They offer sightings data, package bookings, and planning tools for wildlife safaris across India and Africa. Your work here focused on optimizing travel platforms, specifically handling low-network conditions common in remote wildlife areas.

<details>
<summary><b>View Official Company Details</b></summary>

- **Designation:** Software Engineer
- **Start Date:** 19-March-2018
- **LWD (Last Working Day):** 11-Sep-2019
- **Address:** No. #69, Usha Devikar 1st Floor, 15th A Cross Road, 6th Main, Malleshwaram, Bangalore - 560055
- **Contact:** +91 9945025317
- **Email:** manju@wildtrails.co
- **CIN:** U93000KA201SPTC084267

</details>

### Dunst Technologies Pvt Ltd (Dec 2017 - Mar 2018)
**What they do:** Dunst Consulting/Technologies provides IT services and product engineering solutions, often partnering with clients to build mobile applications. Your early role here involved hands-on development of native Android applications, focusing on multimedia and event scheduling.

<details>
<summary><b>View Official Company Details</b></summary>

- **Designation:** Junior Android developer
- **Start Date:** 14-DEC-2017
- **LWD (Last Working Day):** 14-Mar-2018
- **Address:** Rohan Plaza, 2331/B, 17th Cross Rd, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102
- **Contact:** +91 8022581155
- **Email:** info@dunstconsulting.com

</details>

### Plurebus Technologies Private Limited (Sep 2016 - Sep 2017)
**What they do:** Plurebus Technologies is a software solutions provider focusing on web and mobile platforms. During your tenure, you worked on entertainment discovery and booking workflows, establishing your core foundations in mobile UI and backend integration.

<details>
<summary><b>View Official Company Details</b></summary>

- **Designation:** JUNIOR R&D ENGINEER
- **Start Date:** 27-September-2016
- **LWD (Last Working Day):** 29-September-2017
- **Address:** No 312, 6th A Cross, OMBR Layout, Bangalore - 43
- **Contact:** +91 994560707
- **Work Phone:** 080-41679193
- **Email:** muralidharan@plurebus.com

</details>

## 13. Education Details
**Explanation:** Your strong academic foundation in computer applications from reputed institutions underpins your technical problem-solving abilities.

<details>
<summary><b>View Official Education Details</b></summary>

**Master of Computer Applications (MCA)**
- **Institution:** National Institute of Technology (NIT) Durgapur
- **Duration:** 15-July-2013 to 30-June-2016
- **Score:** 6.97 CGPA

**Bachelor of Computer Applications (BCA)**
- **Institution:** Dr. Harisingh Gour Vishwavidyalaya, Sagar
- **Duration:** 15-July-2009 to 30-June-2012
- **Score:** 75.12%

</details>
