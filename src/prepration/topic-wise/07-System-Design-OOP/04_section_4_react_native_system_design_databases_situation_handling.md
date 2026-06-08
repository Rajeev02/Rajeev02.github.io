## Page Summary
### Reading Time
`7 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Mobile System Design: Large-Scale React Native Architecture |
| Difficulty | Lead |
| Interview Frequency | High |
| Tags | 👨💼 Lead Round Favorite<br>🔥 Must Revise<br>🏢 MNC Favorite |

---

# Mobile System Design: Large-Scale React Native Architecture

## Concept Summary
Mobile System Design differs heavily from Backend System Design. Instead of focusing on load balancers and horizontal database scaling, mobile system design focuses on **offline-first capabilities**, **local database limits**, **battery consumption**, **UI responsiveness (60/120FPS)**, and **over-the-air (OTA) updates**. 

## Requirements
*Example Prompt: Design a WhatsApp-like Chat Application in React Native.*
- **Functional:** 1-on-1 chat, group chat, image sharing, offline message composition.
- **Non-Functional:** Fast startup time (< 2s), 60 FPS scrolling, battery efficient, secure storage for tokens.

## Architecture Diagram
```mermaid
graph TD;
    UI[React Native UI (Fabric)] --> State[Zustand / Redux Toolkit]
    State --> Query[React Query / SWR]
    Query --> LocalDB[(WatermelonDB / MMKV)]
    Query --> Network[Axios + Interceptors]
    Network --> Socket((WebSockets))
    Network --> REST((REST API))
    Socket --> Server[Chat Backend]
    REST --> Server
```

## Database Design
For complex relational data (like Chat threads and Messages), using `AsyncStorage` or `MMKV` is an anti-pattern because they are Key-Value stores. They require loading massive JSON strings into JS memory to filter/sort.

**Optimal Choice:** **WatermelonDB** or **Realm**
- **WatermelonDB** uses a SQLite backbone but pushes all querying to a background thread. Only the visible records are loaded into JS memory, making it highly optimized for React Native lists (`FlatList`).

## API Design
- **REST:** Used for heavy, one-off operations (fetching chat history, uploading media).
- **WebSockets / gRPC:** Used for real-time bi-directional message syncing.
- **GraphQL:** Excellent for reducing over-fetching if the app needs complex relational data across multiple entities.

## Scaling Considerations
- **Memory Scaling:** FlatLists will crash if thousands of messages are loaded. Use `windowSize`, `maxToRenderPerBatch`, and `initialNumToRender` to recycle views.
- **Image Scaling:** Use `react-native-fast-image` (or Expo Image) to utilize SDWebImage/Glide native caching to prevent memory leaks during rapid scrolling.

## Caching Strategy
- **React Query:** Manages server-state caching, deduplicates requests, and handles background refetching.
- **MMKV:** Fast, synchronous Key-Value store used ONLY for scalar values (auth tokens, theme preferences, feature flags).

## Offline Strategy
1. **Outbox Pattern:** When offline, messages are stored in a local SQLite `outbox_queue` table with status `PENDING`.
2. **Background Sync:** Use `react-native-background-fetch` or WorkManager/BackgroundTasks. When network is restored, an interceptor dequeues messages, sends them via API, and marks them `SENT`.
3. **Optimistic UI:** Immediately render the message in the UI with a "clock" icon before the server confirms receipt.

## Security Considerations
- **Token Storage:** Never store JWTs in raw AsyncStorage. Use `react-native-keychain` (iOS Keychain / Android Keystore) or MMKV with encryption.
- **SSL Pinning:** Prevent Man-in-the-Middle (MITM) attacks by pinning the backend SSL certificate using `react-native-ssl-public-key-pinning`.
- **Code Obfuscation:** Use ProGuard/R8 on Android and DexGuard to obfuscate native code and Hermes bytecode encryption for JS.

## Trade-Offs
- **WebSockets vs. Push Notifications:** WebSockets are real-time but drain battery if kept alive in the background. **Trade-off:** Keep WebSockets open *only* when the app is in the foreground. Fall back to APNS/FCM Push Notifications when the app goes into the background.

## React Native Perspective
Unlike native Swift/Kotlin, RN shares a single JS thread. If you parse a 10MB JSON response from the chat server synchronously, the UI thread will freeze. 
**Solution:** Use background threads (React Native Reanimated Worklets) for heavy computations, or parse large JSON payloads natively before passing them over the JSI bridge.

## Senior-Level Follow-Ups
### Q: How do you handle OTA (Over-the-Air) updates breaking the app?
**A:** Use CodePush or Expo Updates. I would implement a phased rollout strategy (10% -> 50% -> 100%). Crucially, if an OTA update touches a screen that requires a new Native Module not present in the current binary, the app will crash. I always implement a version-check boundary: `if (nativeVersion >= requiredVersion) { renderNewFeature() }`.

### Q: Explain how you would profile memory leaks in this chat app.
**A:** I would use Xcode Instruments (Allocations/Leaks) for the iOS native layer and Android Studio Profiler for Android. For the JS layer, I would take a Heap Snapshot using the Hermes Debugger (via Flipper or Chrome DevTools) before and after opening a chat screen. If the detached DOM nodes or React Fibers remain in memory after the screen unmounts, I investigate lingering closures or un-cleared event listeners.
