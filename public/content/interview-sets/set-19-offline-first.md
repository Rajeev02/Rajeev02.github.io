# Volume 9 – Set 19 – Offline-First Architectures & Databases

## 1. What makes an application truly "Offline-First" versus just having "Offline Support"?

**Concept:**
Mobile networks drop frequently. Apps shouldn't show endless spinners or crash when a user enters a subway tunnel.

**Answer:**
- **Offline Support:** The app fetches data from the API and saves it in a cache. If the network drops, it shows the cached data. However, if the user tries to *write* data (e.g., \"Like\" a post) while offline, the app shows an error like \"No internet connection.\" The API is the primary Source of Truth.
- **Offline-First:** The local database on the phone is the *only* Source of Truth for the UI. When a user opens the app, it reads from the local database instantly. When a user writes data, they write it to the local database, and the UI updates instantly. A background worker (Synchronizer) is responsible for taking local changes and pushing them to the backend whenever the network is available.

**Key Takeaway:**
Offline-First architectures provide zero-latency UI updates because the user is always interacting with the local disk, never waiting on the network.

---

## 2. Compare AsyncStorage, MMKV, and WatermelonDB. When would you use each?

**Concept:**
React Native has multiple storage solutions, each designed for different scales of data.

**Answer:**
1. **AsyncStorage:** 
   - *How it works:* Stores data as unencrypted strings/JSON in XML files. Reads and writes are asynchronous but slow.
   - *Use Case:* Storing small, non-sensitive preferences (e.g., `hasSeenOnboarding: true`). It should be avoided in modern RN apps due to poor performance.

2. **MMKV:**
   - *How it works:* A key-value store built by WeChat. It uses C++ JSI to read/write memory-mapped files synchronously. It is exponentially faster than AsyncStorage.
   - *Use Case:* The modern replacement for AsyncStorage. Perfect for persisting Zustand/Redux stores, user preferences, and small caches.

3. **WatermelonDB:**
   - *How it works:* A reactive, relational database built on top of SQLite. It uses lazy-loading. If you have 10,000 records, it only loads the records visible on the screen into memory.
   - *Use Case:* Offline-First architectures. When you need complex relationships (e.g., Users have Posts, Posts have Comments) and need to query, filter, and sync massive datasets efficiently.

**Key Takeaway:**
Use MMKV for simple Key-Value pairs. Use WatermelonDB (or Realm) for complex relational data and offline-first synchronization.

---

## 3. How does WatermelonDB achieve high performance with massive datasets in React Native?

**Concept:**
Loading 10,000 JSON objects into the React Native JS thread will instantly cause the app to crash due to OOM (Out of Memory) limits.

**Answer:**
WatermelonDB is fast because it is **Lazy** and **Reactive**.

1. **Lazy Loading:** It is built on SQLite. When you query for posts, it doesn't load 10,000 posts into JS memory. It loads only the specific models that you access. If a Post has 500 comments, it won't fetch the comments from the disk until you explicitly resolve the relation.
2. **Reactivity:** You connect WatermelonDB queries directly to React components using `withObservables` (or hooks). The UI subscribes to the database query. If a background sync inserts a new Post into SQLite, the database notifies the JS thread, and only the specific React component displaying that list re-renders.
3. **Multi-threading:** The actual SQL queries are executed on a separate background thread on the Native side, preventing the JS thread from blocking during heavy reads/writes.

**Key Takeaway:**
WatermelonDB forces you to keep data on the disk and out of JS memory until the exact moment it needs to be rendered on the screen.

---

## 4. What are the core challenges of synchronizing a local database with a remote server?

**Concept:**
Syncing data sounds easy (just send the local data to the server), but distributed systems are incredibly complex due to race conditions and conflicts.

**Answer:**
The three hardest challenges are:
1. **Tracking Changes:** The local DB must track exactly which records were created, updated, or deleted while offline. (Usually done by adding `_status` and `last_modified` columns to every local table).
2. **Conflict Resolution:** If User A goes offline, changes a document, and User B changes the exact same document online, what happens when User A connects? 
   - *Fix:* The backend usually dictates the conflict strategy (e.g., Last-Write-Wins based on timestamps, or merging fields).
3. **Data Integrity:** What happens if the phone sends an update to the server, the server saves it, but the phone loses connection before receiving the HTTP 200 OK? The phone still thinks the record needs to be synced.
   - *Fix:* Idempotent APIs. The client generates unique IDs (UUIDv4) locally. If the client retries the sync, the server recognizes the UUID and ignores the duplicate insert.

**Key Takeaway:**
Synchronization requires a heavily coordinated effort between the mobile app (tracking local modifications) and the backend API (resolving conflicts and preventing duplicates).

---

## 5. How do you secure data stored locally on the device?

**Concept:**
Databases like SQLite and Key-Value stores like MMKV are unencrypted by default. An attacker with physical access to the device can extract the database files.

**Answer:**
To secure local data, we must use encryption keys bound to the device's hardware security module (Secure Enclave on iOS, Keystore on Android).

1. **Generate a Key:** When the app first launches, generate a strong cryptographic key (e.g., AES-256) and store it securely inside the iOS Keychain or Android Keystore using `react-native-keychain`.
2. **Encrypt the DB:** 
   - If using **MMKV**, you pass the encryption key during initialization. MMKV encrypts the memory-mapped file automatically.
   - If using **WatermelonDB/SQLite**, you compile SQLite with SQLCipher. You pass the key to the DB connection, and SQLCipher transparently encrypts all pages written to disk.
3. **Biometrics:** For highly sensitive apps (Banking), you can require FaceID/TouchID to unlock the Keychain to retrieve the database encryption key, ensuring the DB remains encrypted at rest until the user physically authenticates.

**Key Takeaway:**
Never hardcode encryption keys in JS. Always generate them dynamically per-device and store them in the hardware-backed Keychain/Keystore.
