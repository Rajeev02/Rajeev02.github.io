> 🎯 **Topic:** 6.6 🖼️ Native UI Components (ViewManagers)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## 6.6 🖼️ Native UI Components (ViewManagers)

*⏱️ 2 min read*

#### 1. Native Modules vs. Native UI Components
- **Native Modules** expose native **logic and APIs** to JavaScript (e.g., reading device battery level, accessing Bluetooth, encrypting data). They do not render any visual UI.
- **Native UI Components** expose native **views** to JavaScript (e.g., a native map view, a native video player, a custom camera preview). They render platform-specific UI elements that are embedded directly into the React Native view tree.

#### 2. Legacy Architecture: ViewManagers

##### Android ViewManager (Kotlin)
On Android, a Native UI Component is created by extending `SimpleViewManager<T>` where `T` is the native `View` subclass:

```kotlin
// NativeVideoViewManager.kt
package com.myapp.views

import android.widget.VideoView
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class NativeVideoViewManager : SimpleViewManager<VideoView>() {

    override fun getName(): String = "NativeVideoView"

    override fun createViewInstance(context: ThemedReactContext): VideoView {
        return VideoView(context)
    }

    @ReactProp(name = "videoUrl")
    fun setVideoUrl(view: VideoView, url: String?) {
        url?.let {
            view.setVideoPath(it)
            view.start()
        }
    }

    @ReactProp(name = "paused")
    fun setPaused(view: VideoView, paused: Boolean) {
        if (paused) view.pause() else view.start()
    }
}
```

Register via a `ReactPackage`:
```kotlin
class VideoViewPackage : ReactPackage {
    override fun createViewManagers(context: ReactApplicationContext) =
        listOf(NativeVideoViewManager())

    override fun createNativeModules(context: ReactApplicationContext) = emptyList()
}
```

##### iOS ViewManager (Swift/Objective-C)
On iOS, extend `RCTViewManager`:

```swift
// NativeVideoViewManager.swift
import UIKit
import AVKit

@objc(NativeVideoViewManager)
class NativeVideoViewManager: RCTViewManager {

    override func view() -> UIView! {
        return NativeVideoView()
    }

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
```

```swift
// NativeVideoView.swift
class NativeVideoView: UIView {
    private var playerLayer: AVPlayerLayer?

    @objc var videoUrl: String = "" {
        didSet {
            guard let url = URL(string: videoUrl) else { return }
            let player = AVPlayer(url: url)
            playerLayer?.removeFromSuperlayer()
            playerLayer = AVPlayerLayer(player: player)
            playerLayer?.frame = bounds
            layer.addSublayer(playerLayer!)
            player.play()
        }
    }
}
```

Bridge macro (Objective-C):
```swift
// NativeVideoViewManager.m
##import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(NativeVideoViewManager, RCTViewManager)
RCT_EXPORT_VIEW_PROPERTY(videoUrl, NSString)
RCT_EXPORT_VIEW_PROPERTY(paused, BOOL)
@end
```

##### JavaScript Wrapper
```typescript
import { requireNativeComponent, ViewProps } from 'react-native';

interface NativeVideoViewProps extends ViewProps {
  videoUrl: string;
  paused?: boolean;
}

const NativeVideoView = requireNativeComponent<NativeVideoViewProps>('NativeVideoView');

export default NativeVideoView;
```

#### 3. Fabric Native Components (Modern Replacement)
In the New Architecture, Native UI Components are defined using **Codegen specifications** instead of manual ViewManagers:
1. **Define a Spec**: Write a TypeScript interface describing the component's props using Codegen types (`codegenNativeComponent`).
2. **Codegen Generates Bindings**: The build process generates C++ `ShadowNode`, `ComponentDescriptor`, and platform-specific view manager boilerplate automatically.
3. **Implement the Native View**: Write the platform-specific view rendering code (Kotlin/Swift) conforming to the generated interface.

```typescript
// NativeVideoViewNativeComponent.ts (Codegen Spec)
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { ViewProps } from 'react-native';

interface NativeProps extends ViewProps {
  videoUrl: string;
  paused?: boolean;
}

export default codegenNativeComponent<NativeProps>('NativeVideoView');
```

> *"What's the difference between a Native Module and a Native UI Component?"*

- **Strategic Response**: A Native Module exposes native logic (functions, APIs, computations) to JavaScript—it has no visual representation. You call its methods from JS. A Native UI Component exposes a native view that renders on screen and is embedded into the React Native view hierarchy. On Android, modules extend `ReactContextBaseJavaModule` while UI components extend `SimpleViewManager`. On iOS, modules use `RCT_EXPORT_MODULE()` while UI components use `RCTViewManager`. In the New Architecture, both use Codegen specs, but the distinction remains: TurboModules for logic, Fabric Native Components for views.

> *"How do you pass props from JS to a native view?"*

- **Strategic Response**: In legacy architecture, you annotate setter methods with `@ReactProp` on Android and use `RCT_EXPORT_VIEW_PROPERTY` macros on iOS. The JS side uses `requireNativeComponent` with a typed props interface. In Fabric, you define props in a Codegen spec TypeScript file, and the build generates type-safe C++ bindings that map directly to native view property setters without manual annotation.

---


---

---
