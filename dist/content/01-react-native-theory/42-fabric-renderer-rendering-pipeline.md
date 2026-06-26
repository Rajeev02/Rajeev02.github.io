> 🎯 **Topic:** Fabric Renderer & Rendering Pipeline

**Q: How does the Fabric Renderer improve the rendering pipeline in React Native's New Architecture?**
**A:** Fabric fundamentally changes how UI is rendered by eliminating the asynchronous JSON bridge. 
- **Old Architecture:** React communicated with the native UI layer asynchronously by serializing JSON messages across the Bridge. This caused UI jumps and lag during heavy animations or fast scrolling.
- **Fabric Architecture:** Uses **JSI (JavaScript Interface)** to allow JavaScript to directly invoke C++ methods synchronously. The rendering pipeline now executes in three distinct phases:
  1. **Render Phase:** React executes your JS code to create React Element Trees.
  2. **Commit Phase:** React elements are synchronously committed to a C++ Shadow Tree. Yoga (the layout engine) calculates flexbox layouts in C++.
  3. **Mount Phase:** The C++ Shadow Tree is instantly transformed into a Host View Tree and rendered directly on the native screen (Android/iOS).
- **Result:** Synchronous UI updates, smooth animations, and better interoperability with native layout mechanisms like `UICollectionView` and `RecyclerView`.

### 15.2 Deep Linking & Growth
