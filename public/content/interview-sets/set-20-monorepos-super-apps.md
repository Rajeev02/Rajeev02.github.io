# Volume 10 – Set 20 – Monorepos & Super Apps

## 1. What is a Monorepo and why would a React Native team use one?

**Concept:**
As companies grow, they often have a mobile app, a web app, an admin dashboard, and backend services. Managing these in separate repositories (Polyrepo) leads to massive code duplication.

**Answer:**
A Monorepo is a single Git repository containing multiple distinct projects (workspaces). 

A React Native team uses a Monorepo to share code between the Mobile App and the Web App (e.g., Next.js).
Instead of writing the API fetching logic, Redux store, and TypeScript types twice (once for web, once for mobile), they are written once in a shared `packages/core` workspace.

**Benefits:**
1. **Single Source of Truth:** If an API response type changes, you update it once, and TypeScript instantly checks both the web and mobile apps for errors.
2. **Code Reusability:** You can share UI components using libraries like Tamagui or React Native Web.
3. **Unified CI/CD:** One PR can atomically update the backend, web, and mobile app simultaneously, preventing version mismatch bugs.

**Key Takeaway:**
Monorepos solve code sharing, but they introduce complexity in tooling. You must use tools like Yarn Workspaces, Turborepo, or Nx to manage the dependency graphs.

---

## 2. How do you configure a React Native app inside a Yarn Workspace Monorepo?

**Concept:**
React Native's bundler (Metro) historically struggles with symlinks, which is how Yarn Workspaces link shared packages.

**Answer:**
To set up React Native in a monorepo, you must heavily configure Metro to look outside the local `apps/mobile` folder.

1. **Yarn Workspaces:** Structure the repo with `apps/mobile`, `apps/web`, and `packages/shared`.
2. **`metro.config.js`:** 
   - You must set `watchFolders` to include the root of the monorepo so Metro watches for changes in the `packages/shared` directory.
   - You must configure the `nodeModulesPaths` so Metro resolves dependencies from the root `node_modules` (where Yarn hoists them) rather than just the mobile app's local `node_modules`.
3. **Nohoist:** Some React Native native dependencies (like `react-native-reanimated`) cannot be hoisted to the root directory because the Android/iOS Gradle and Podfile scripts expect them to be in the local `apps/mobile/node_modules`. You configure Yarn's `nohoist` array to force these specific packages to install locally.

**Key Takeaway:**
Metro is the biggest bottleneck in RN monorepos. Modifying `metro.config.js` to understand symlinks and root folders is the key to making it work.

---

## 3. What is a Super App Architecture?

**Concept:**
Apps like WeChat, Gojek, or Uber are \"Super Apps.\" They contain dozens of mini-applications (Ride Hailing, Food Delivery, Payments) inside one single binary.

**Answer:**
A Super App Architecture allows hundreds of developers to work on a single app without stepping on each other's toes. 

Instead of building a massive monolithic React Native app, the architecture is split into:
1. **The Host App (Shell):** A thin native wrapper that handles authentication, deep linking, and navigation routing.
2. **Mini-Apps (Mini-Programs):** Independent React Native bundles for specific features (e.g., a Food Delivery bundle, a Wallet bundle).

**How it works:**
These mini-apps are developed and tested completely independently by different squads. When the user opens the \"Food Delivery\" tab in the Host App, the Host App downloads the Food Delivery JS bundle on-the-fly (or loads it from disk) and mounts that React Native instance.

**Key Takeaway:**
Super Apps decouple deployment. The Food Delivery team can push an OTA update for their specific mini-app without needing to coordinate a massive App Store release with the Payments team.

---

## 4. How does Re.Pack enable Micro-Frontends in React Native?

**Concept:**
Metro is a fast bundler, but it outputs a single, massive `main.jsbundle` (Monolith). To build a Super App, you need Code Splitting and Micro-Frontends.

**Answer:**
**Re.Pack** (by Callstack) is a tool that replaces Metro with **Webpack** (and now Rspack) as the bundler for React Native.

Because it uses Webpack, it unlocks Webpack's **Module Federation**.
1. **Module Federation** allows you to split the React Native app into multiple independent bundles (a Host bundle and Remote bundles).
2. The Host app ships with the App Store.
3. When the user navigates to a specific feature, Re.Pack dynamically downloads the chunk (the remote bundle) for that feature over the network and executes it.

This enables true Micro-Frontends on mobile. You don't have to ship a 50MB JS bundle containing code the user might never use. You ship a 5MB Host app, and dynamically inject feature bundles at runtime.

**Key Takeaway:**
Re.Pack bridges the gap between Web architecture (Webpack/Code Splitting) and Mobile architecture, making Super Apps possible in React Native without complex native code.

---

## 5. What are the challenges of Cross-Platform UI sharing (React Native Web)?

**Concept:**
React Native Web allows you to take React Native components (`<View>`, `<Text>`) and render them on a web browser as standard DOM elements (`<div>`, `<span>`).

**Answer:**
While appealing for a \"write once, run anywhere\" monorepo, there are severe challenges:

1. **Navigation:** React Navigation works perfectly on mobile, but Web expects URL-based routing (Next.js App Router, History API). Bridging the two is complex and often leads to broken back buttons or poor SEO.
2. **Styling Limitations:** Web developers rely on media queries, hover states, and CSS grid. React Native's Yoga engine does not support these natively.
3. **Platform-Specific UX:** A dropdown picker on iOS looks and behaves fundamentally differently than an HTML `<select>` on Web. Trying to force a single component to look good on an iPhone and a 27-inch desktop monitor often results in a mediocre experience on both.

**Mitigation (The "Learn Once, Write Anywhere" approach):**
Instead of sharing 100% of the UI, successful teams share the **Business Logic** (Hooks, Redux, API calls, Types) in the monorepo, but build the UI components twice: once using Next.js/React for Web, and once using React Native for Mobile. 

**Key Takeaway:**
Code sharing is a spectrum. Sharing state and logic is highly profitable; forcing a single UI codebase across web and mobile is often a trap.
