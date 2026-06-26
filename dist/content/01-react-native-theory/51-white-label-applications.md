> 🎯 **Topic:** White-Label Applications

**Q: How do you architect a white-label React Native application to support multiple brands from a single codebase?**
**A:** I abstract the differences across three layers:
- **Native Layer (Build Variants):** I use Android Product Flavors and iOS Xcode Schemes. This allows each brand to have its own App Icon, Bundle ID, Splash Screen, and native Firebase configurations generated dynamically at compile time.
- **Configuration Layer:** I use `.env` files (e.g., `.env.brandA`, `.env.brandB`) managed via `react-native-config` to inject brand-specific API endpoints and feature flags.
- **UI/Theming Layer:** I use a dynamic theming context (or a library like Restyle/styled-components). When the app boots, it reads the active environment and injects the corresponding color palette, typography, and logo assets, ensuring the core React components remain highly reusable.
