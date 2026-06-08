## Page Summary
### Reading Time
`6 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Core Architecture (Legacy vs. New Architecture) |
| Difficulty | Hard |
| Interview Frequency | High |
| Tags | 🔥 Must Revise<br>⭐ Frequently Asked<br>💼 Product Company Favorite |

---

# React Native Core Architecture (Legacy vs. Modern)

## Concept Summary
React Native's runtime environment has undergone a massive architectural transition. The legacy architecture relied on an asynchronous JSON bridge to communicate between JavaScript and Native threads. The modern "New Architecture" replaces this with synchronous, C++ backed interfaces (JSI), allowing lazy-loading of modules (TurboModules) and concurrent, direct UI rendering (Fabric), protected by strict type-safety (Codegen).

## Must Know Points
- [ ] Understand the 3 legacy threads: JS Thread, Native UI Thread, and Shadow Thread.
- [ ] Understand the bottleneck of the legacy Bridge (Asynchronous, batched, JSON serialization).
- [ ] Explain **JSI (JavaScript Interface)** and how it allows JS to hold references to C++ host objects.
- [ ] Explain **TurboModules** and how they lazy-load native dependencies to improve startup time.
- [ ] Explain **Fabric** and how it computes layout directly in C++ without bridge serialization.
- [ ] Explain **Codegen** and how it guarantees cross-language type safety.
- [ ] Be able to outline a 10-step migration plan for enterprise applications.

## Interview Questions

### Q1: What was the primary bottleneck of the Legacy React Native Architecture?
**Answer:**
Historically, React Native relied on three threads: the JavaScript Thread, the Native UI Thread, and the Shadow (Layout) Thread. The bottleneck was **The Bridge**. Whenever data or UI actions passed between the JS and Native layers, they had to be serialized into JSON strings, sent asynchronously over the bridge, and deserialized. This batch-based serialization created severe performance bottlenecks for high-frequency interactions (e.g., rapid list scrolling, animations). If the bridge was flooded, the UI thread lagged behind, causing frame drops.

### Q2: How does JSI (JavaScript Interface) solve the bridge problem?
**Answer:**
JSI is a lightweight C++ abstraction layer. Instead of relying on an asynchronous JSON bridge, JSI allows the JavaScript engine (like Hermes) to hold direct references to host native C++ objects. This means JavaScript can invoke native methods synchronously (or asynchronously) without any JSON serialization overhead, enabling instant communication between JS and Native realms.

### Q3: What is the difference between legacy Native Modules and modern TurboModules?
**Answer:**
In the legacy model, all native modules (Camera, Bluetooth, Storage) were initialized eagerly at app startup, bloating the launch time even if the user never opened the camera. **TurboModules** leverage JSI to lazy-load native libraries. They are initialized and loaded into memory *only* when explicitly invoked by the JavaScript code, significantly reducing app startup latency.

### Q4: Explain the Fabric Rendering Engine.
**Answer:**
Fabric is the modern concurrent rendering engine that replaces the legacy UIManager. Fabric computes UI layout changes inside C++ and commits them directly to the native OS layout thread. Because JSI allows synchronous access, Fabric can execute UI mutations instantly on the main thread, eliminating layout jumps and flickering during rapid scroll views. It also natively supports React 18 concurrent rendering features.

## Follow-up Questions
1. If JSI allows synchronous calls, why shouldn't we make all Native Module calls synchronous?
2. How does Codegen prevent production crashes when working with Native Modules?
3. What is the role of the Hermes engine in the New Architecture?

## Real World / Scenario Example
**Scenario:** You are migrating a 5-year-old React Native e-commerce app to the New Architecture. How do you approach this to minimize risk?

**Solution:**
Migration is a phased risk-management exercise, not a one-shot upgrade:
1. **Audit Current Baseline**: Capture the current RN version, React version, Hermes usage, and library compatibility matrices.
2. **Dependency Compatibility**: Classify dependencies as New-Architecture-ready, legacy-only, or replaceable. Pay attention to custom native SDK wrappers.
3. **Stabilize Before Upgrade**: Add E2E tests for core flows (login/checkout) and ensure crash reporting is active.
4. **Upgrade in Controlled Hops**: Use the React Native Upgrade Helper to update templates incrementally.
5. **Enable Hermes**: Verify release builds, startup time, memory, and source maps on the new engine.
6. **New Architecture Readiness**: Enable Fabric/TurboModules in a beta branch. Fix Codegen specs and synchronous native calls.
7. **Native Module Modernization**: Migrate performance-sensitive legacy `RCTBridgeModule` modules to TurboModules/JSI.
8. **Release Gradually**: Ship behind internal tracks, monitor crash-free sessions and ANRs, and then roll out gradually to the public.

## Common Mistakes & Quick Revision Notes
- **Mistake:** Assuming JSI means everything is faster. *Correction:* JSI is faster because it removes JSON serialization, but doing heavy I/O synchronously over JSI will completely freeze the JS thread.
- **Mistake:** Confusing TurboModules with Fabric. *Correction:* TurboModules handle Native APIs (Bluetooth, Storage). Fabric handles the UI Rendering (Views, Text).
- **Quick Note:** Bridge = Asynchronous + JSON. JSI = Synchronous capable + C++ references.

## Related Topics
- Native Modules & Kotlin/Swift Integration
- Performance Optimization & Profiling
- Hermes Engine Deep Dive
