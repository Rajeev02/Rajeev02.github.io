> 🎯 **Topic:** Section 9: Program 9: Native Module Bridge (Kotlin Android & Swift iOS)
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 9: Program 9: Native Module Bridge (Kotlin Android & Swift iOS)
*⏱️ 2 min read*

### Question
Create a custom Native Module package battery status bridge named `BatteryMonitor`.
1. Implement the Android portion in **Kotlin** exposing a ReactMethod `getBatteryStatus()` to query battery level percentage and charging state.
2. Implement the iOS portion in **Swift** with Objective-C macros to export variables and methods.
3. Show how to interface the native module in TypeScript, including type configurations.

### Sample Input & Output
#### JS/TS Invocation:
```typescript
import NativeModules from 'react-native';
const status = await NativeModules.BatteryMonitor.getBatteryStatus();
```
#### Output:
```json
{ "level": 84, "isCharging": true }
```

### Code

#### 1. Android Native Kotlin Module (`BatteryMonitorModule.kt`)
```kotlin
package com.myportal.batterymonitor

import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.*

class BatteryMonitorModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    
    override fun getName(): String = "BatteryMonitor"

    @ReactMethod
    fun getBatteryStatus(promise: Promise) {
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
        val intent = reactApplicationContext.registerReceiver(null, filter)
        
        if (intent != null) {
            val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
            val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)
            val percentage = (level.toFloat() / scale.toFloat() * 100).toInt()
            
            val status = intent.getIntExtra(BatteryManager.EXTRA_STATUS, -1)
            val isCharging = status == BatteryManager.BATTERY_STATUS_CHARGING || 
                             status == BatteryManager.BATTERY_STATUS_FULL

            val response = Arguments.createMap().apply {
                putInt("level", percentage)
                putBoolean("isCharging", isCharging)
            }
            promise.resolve(response)
        } else {
            promise.reject("BATTERY_ERROR", "Could not fetch battery details from system intent")
        }
    }
}
```

#### 2. iOS Native Swift Module (`BatteryMonitor.swift`)
```swift
import Foundation
import UIKit

@objc(BatteryMonitor)
class BatteryMonitor: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false // Operations are not UI-bound, runs off main queue safely
  }

  @objc
  func getBatteryStatus(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    UIDevice.current.isBatteryMonitoringEnabled = true
    let level = Int(UIDevice.current.batteryLevel * 100)
    let isCharging = UIDevice.current.batteryState == .charging || UIDevice.current.batteryState == .full
    
    // Check if device battery state is accessible (returns -100 if simulator)
    if level >= 0 {
      let response: [String: Any] = [
        "level": level,
        "isCharging": isCharging
      ]
      resolve(response)
    } else {
      reject("BATTERY_ERROR", "Battery monitoring unavailable or running on iOS Simulator", nil)
    }
  }
}
```

#### 3. iOS Objective-C Bridge Export (`BatteryMonitorBridge.m`)
```objc
#import <React/RCTBridgeModule.h>

@interface RCT_EXPORT_MODULE(BatteryMonitor)

RCT_EXPORT_METHOD(getBatteryStatus:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
```

#### 4. TypeScript Typing Interface (`BatteryMonitor.ts`)
```typescript
import { NativeModules } from 'react-native';

interface BatteryStatus {
  level: number;
  isCharging: boolean;
}

interface BatteryMonitorInterface {
  getBatteryStatus(): Promise<BatteryStatus>;
}

export const BatteryMonitor = NativeModules.BatteryMonitor as BatteryMonitorInterface;
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ constant time queries.
- **Space Complexity**: $O(1)$ mapping structures.
- **Explanation**: Accesses platform-specific OS APIs synchronously and passes them back asynchronously through the bridge. Android retrieves details using System Broadcast Intents (`ACTION_BATTERY_CHANGED`), and iOS queries the `UIDevice` battery state properties, resolving values into JS Promises.

---

---
