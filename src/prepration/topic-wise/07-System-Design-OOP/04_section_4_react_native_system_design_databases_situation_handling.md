## 🌐 Section 4: React Native System Design, Databases & Situation Handling

*⏱️ 3 min read*

Designing a mobile application requires balancing offline availability, RAM constraints, network instability, and fast rendering.

```text
                                  [Mobile Client]
                                         │
                 ┌───────────────────────┼───────────────────────┐
                 ▼                       ▼                       ▼
            [UI Layer]            [Local Database]       [Network Sync]
        (React Native UI)         (MMKV / Watermelon)      (Axios/WebSockets)
                 │                       │                       │
                 └───────► Read/Write ───┘                       ▼
                                                        [Offline Outbox Queue]
```

#### 1. Local Database Matrix
Choosing the right local storage layer is critical for mobile performance:

| Database | Architecture Type | Read/Write Latency | Max Storage Limit | Sync Protocol & Best For |
| :--- | :--- | :--- | :--- | :--- |
| **MMKV** | Key-Value Store | Extremely Low (< 1ms) | Limited by Device RAM | In-memory mapping serialized directly to disk. Best for small metadata, user tokens, auth flags, and lightweight cache keys. |
| **WatermelonDB** | Relational / SQLite | Low (Lazy-loaded queries) | Multi-gigabyte (Device Storage) | Reactive SQLite layer. Provides local sync schemas (push/pull webhooks). Best for high-frequency relational data (e.g. Chat history, Product feeds, Offline order ledgers). |
| **SQLite (Raw)** | Relational | Medium | Multi-gigabyte | Direct SQL queries. Lacks built-in reactive triggers. Best for legacy native integrations or structured offline reports. |
| **Realm** | Object-Oriented | Low (Live object mappings) | Multi-gigabyte | Syncs automatically with MongoDB Atlas Device Sync. Best for highly complex nested object models requiring live synchronization. |

---

#### 2. Architectural Design Patterns
To maintain a large React Native codebase (100k+ lines of code) with high testability, you should enforce structured architecture patterns:

- **Monorepos (Yarn Workspaces/Turbo)**:
  - Separate concerns into distinct packages: `@app/shared` (types, utilities), `@app/ui` (reusable atomic design components), and `@app/core` (state management, API clients).
  - Maximizes code sharing between iOS, Android, and Web platforms.
- **Clean Architecture & Feature-First Directory Structure**:
  - Organize files by domain feature (e.g., `features/authentication`, `features/checkout`) rather than by technical file type (`components`, `redux`, `hooks`).
  - **Clean Layers**:
    - **Domain Layer (Entities & Rules)**: Pure business logic, independent of UI frameworks.
    - **Data Layer (Repositories & Sources)**: Handles local storage and API integrations.
    - **Presentation Layer (Components & Hooks)**: Focuses strictly on rendering UI layout.
- **MVVM Pattern (Model-View-ViewModel)**:
  - **Model**: Local/server data models (Zustand, React Query data).
  - **View**: Pure React components (`features/checkout/components/PaymentForm.tsx`) focusing on UI layout and styles.
  - **ViewModel**: Custom React hooks (`features/checkout/hooks/usePaymentHandler.ts`) managing UI state, input validation, and business logic.

##### Feature-First Clean MVVM Directory Layout Example (Auth, Profile, Home)
```text
src/
├── features/
│   ├── auth/                      # Authentication Feature Module
│   │   ├── components/            # [View] Presentation UI layouts
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/                 # [ViewModel] Auth states & validation hooks
│   │   │   ├── useLoginViewModel.ts
│   │   │   └── useRegisterViewModel.ts
│   │   ├── services/              # [Data Layer] API clients & storage adapters
│   │   │   └── AuthService.ts
│   │   └── domain/                # [Domain Layer] Pure rules & validation entities
│   │       └── AuthValidation.ts
│   │
│   ├── profile/                   # Profile Management Feature Module
│   │   ├── components/            # [View] User Profile details & edit inputs
│   │   │   ├── ProfileDetails.tsx
│   │   │   └── EditProfileForm.tsx
│   │   ├── hooks/                 # [ViewModel] Avatar updates & edit form controls
│   │   │   └── useProfileViewModel.ts
│   │   ├── services/              # [Data Layer] MMKV secure storage & synchronization
│   │   │   └── ProfileRepository.ts
│   │   └── domain/                # [Domain Layer] User entity schemas
│   │       └── UserEntity.ts
│   │
│   └── home/                      # Dashboard / Home Feature Module
│       ├── components/            # [View] Feed lists, headers, cards & items
│       │   ├── HomeDashboard.tsx
│       │   └── FeedCard.tsx
│       ├── hooks/                 # [ViewModel] Paginated scrolling & refresh state handlers
│       │   └── useHomeViewModel.ts
│       ├── services/              # [Data Layer] Feed request fetching & local cache
│       │   └── FeedService.ts
│       └── domain/                # [Domain Layer] Feed item structures
│           └── FeedItemEntity.ts
```

---

#### 3. Edge-Case Situation Handling

##### A. Low Memory / RAM Limits
Mobile devices (especially older Android phones) can quickly trigger Out-Of-Memory (OOM) crashes:
- **Hermes Garbage Collection**: Hermes uses a generational mark-and-sweep GC. To prevent spikes, avoid allocating large arrays or objects inside high-frequency execution loops.
- **Cell recycling via FlashList**: Replace `FlatList` with `@shopify/flash-list`. FlashList recycles cell views instead of unmounting and recreating them, reducing native allocations.
- **Image Cache Eviction**: Cap image caches in memory and clear them dynamically when the app enters the background:
  ```javascript
  import FastImage from 'react-native-fast-image';
  // Clear memory cache on low-memory warnings or background transitions
  FastImage.clearMemoryCache();
  ```

##### B. Low Network / Offline States
Cellular networks drop out frequently. Apps must handle network changes gracefully:
- **Query Retries with Backoff**: Configure API call wrappers to retry queries with exponential backoff:
  ```javascript
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000)
  });
  ```
- **Persistent Outbox Queue**: Store pending offline mutations in local storage (MMKV or SQLite) and process them sequentially when the device goes back online.
- **Conflict Resolution (Vector Clocks)**: If a user modifies an order offline, append a vector clock timestamp `{ clientVersion: 5, serverVersion: 4 }` to the payload. The server validates if the base version matches the database; if a conflict occurs, it applies a merge resolution strategy (e.g., "Keep Server version" or "Merge items").

##### C. Large Assets & Startup Performance
A large bundle size slows down the app startup:
- **Asset Slicing**: Use Xcode Asset Catalogs (`.xcassets`) and Android drawable folders. The app store serves only the image densities (`@2x`, `@3x`) matching the target device.
- **Lazy Loading Components**: Use `React.lazy()` or dynamic imports to defer loading secondary screens (e.g., settings, profile sub-pages) until the user navigates to them.
- **Convert Images to WebP**: Replace raw PNG/JPG assets with compressed WebP images to decrease bundle footprint.

##### D. Background Tasks
Run tasks in the background without draining the battery:
- **HeadlessJS (Android)**: Start a Java background service that runs a JavaScript task, even when the app is closed.
- **Background Fetch (iOS)**: Use native background fetch tasks scheduled by the iOS system to periodically update local databases.

---


---
