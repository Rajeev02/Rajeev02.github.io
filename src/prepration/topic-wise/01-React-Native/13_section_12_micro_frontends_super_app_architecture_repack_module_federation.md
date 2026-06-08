## 🗺️ Section 12: Micro-Frontends & Super-App Architecture (Re.Pack & Module Federation)

*⏱️ 2 min read*

For large-scale enterprise applications, building a single monolithic JavaScript bundle results in massive build-time bottlenecks, git merge conflicts, and regression risks. Senior architects design super-apps composed of independent, modular micro-frontends (mini-apps) using **Re.Pack** and **Webpack Module Federation**.

#### 1. Metro vs. Re.Pack (Webpack)
- **Metro Bundler**: React Native’s default bundler compiles all source code, assets, and libraries statically into a singular `index.bundle` file at compile time. Metro does not natively support dynamic code splitting, remote URLs loading, or sharing runtimes at runtime.
- **Re.Pack**: A Webpack-based compiler and runtime tool that replaces Metro. Re.Pack allows configuration of Webpack's core plugins, including **Module Federation**, enabling dynamic code loading, chunk splits, and multi-bundle mobile compilation.

#### 2. Webpack Module Federation Mechanics
Module Federation separates code into **Hosts** (Container App) and **Remotes** (Mini-Apps).
- **Host (Container)**: The main shell application. It sets up the navigation shell, imports core dependencies, and handles dynamic loader orchestration.
- **Remotes (Mini-Apps)**: Independent features (e.g., Credit Card screen, Loan Application process, Rewards Hub). Each remote defines specific entry components it exposes (exports) to the host.
- **Shared Dependencies (`shared` configuration)**: Both the Host and Remotes declare shared dependencies (e.g. `react`, `react-native`, `react-native-reanimated`). Webpack resolves these dynamically at runtime: if the host has already loaded React, the remote will utilize the host's runtime instance in memory rather than loading its own duplicate React version.

```text
       [Host Shell Container] (Registers Remotes & Shared Core Libs)
         /               \
   (Loads on-demand)   (Loads on-demand)
       /                   \
  [Remote Mini-App A]    [Remote Mini-App B] 
  (Cards Feature)        (Loans Feature)
```

#### 3. Dynamic Bundle Loading Workflow
1. **On-Demand Resolution**: When a user navigates to the "Rewards" section, the Host app triggers a dynamic import (`import('rewards/Component')`).
2. **Dynamic Script Loader**: Re.Pack interceptors load the remote Javascript/Hermes bytecode chunk from a remote CDN/Server URL (e.g., `https://cdn.mybank.com/rewards/1.0.0/bundle.js`).
3. **Execution**: The script is downloaded, verified, and executed inside the Hermes virtual machine, rendering the component seamlessly inside the Host's navigation stack.
4. **Offline Hydration**: To support offline launch, the Container App can eagerly pre-download and cache remote chunks to local MMKV/FileSystem storage during background sync cycles.

---


---
