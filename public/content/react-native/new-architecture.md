> 🎯 **Topic:** Introduction to the New Architecture
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** Architecture, Fabric, TurboModules

---

## The New React Native Architecture

*⏱️ 5 min read*

*Note: For a deep dive into this topic, please see the **React Native Theory** section.*

### High-Level Overview

React Native's new architecture replaces the asynchronous JSON-based Bridge with a synchronous, memory-shared interface known as JSI (JavaScript Interface).

**The three core pillars:**

1. **JSI (JavaScript Interface):** The foundational layer that replaces the Bridge. It allows JavaScript to directly invoke C++ methods synchronously by holding references to host objects.
2. **Fabric:** The new concurrent UI rendering system. It moves layout calculations to be synchronous, fixing frame drops and layout tearing during heavy UI updates.
3. **TurboModules:** The new native modules system. Native modules are lazily loaded into memory exactly when they are needed, rather than all at once during app startup, significantly reducing app load times.

### Key Interview Takeaway
If asked why React Native migrated away from the bridge: "The bridge relied on asynchronous, batched JSON serialization, creating a massive bottleneck for high-frequency updates like animations or rapid state changes. JSI eliminates this bottleneck by allowing synchronous execution and memory sharing between JS and Native threads."
