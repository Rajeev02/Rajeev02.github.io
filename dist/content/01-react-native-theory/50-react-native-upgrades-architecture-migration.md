> 🎯 **Topic:** React Native Upgrades & Architecture Migration

**Q: You led a massive React Native upgrade from 0.63 to 0.83. How do you approach such a significant leap across multiple breaking changes?**
**A:** A jump of 20 minor versions is practically a rewrite of the build system. My approach involves:
- **Incremental Bumps vs. Fresh Template:** Instead of upgrading incrementally (which causes infinite dependency hell), I use the `npx react-native init` command to generate a fresh 0.83 template. I then use the React Native Upgrade Helper to manually port over our native custom configurations (like `build.gradle`, `Podfile`, and `AppDelegate.mm`).
- **Dependency Audit:** I audit all third-party libraries. If a library is dead or incompatible with the New Architecture, we fork it, replace it, or rewrite it as a custom TurboModule.
- **Hermes & New Architecture Prep:** 0.63 to 0.83 involves Hermes becoming the default engine, and preparing for Fabric. I tackle this in phases: first getting the app to compile on the new version with the old bridge, stabilizing it, and then incrementally enabling New Architecture flags.
