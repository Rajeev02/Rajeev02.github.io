
## Page Summary
### Reading Time
`3 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 15: Hardened C++ JNI Bridge Module (Android JNI/Kotlin & iOS Obj-C++/Swift) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 15: Hardened C++ JNI Bridge Module (Android JNI/Kotlin & iOS Obj-C++/Swift)
*⏱️ 2 min read*

### Question
To prevent reverse engineering of sensitive client secrets (e.g., API keys) from plain-text Javascript bundles, implement a native secure storage module.
1. Write the Android C++ source code (`secure-keys.cpp`) declaring a JNI wrapper returning XOR-obfuscated keys.
2. Write the Android Kotlin Module (`SecureKeysModule.kt`) to bind JNI and register the bridge.
3. Write the iOS Objective-C++ header/implementation files (`SecureKeysBridge.mm`) exporting the Swift methods to React Native.
4. Write the iOS Swift code (`SecureKeys.swift`) to perform XOR decryption of keys stored in C-style byte arrays.

### Sample Input & Output
#### Input:
- JS invokes `NativeModules.SecureKeysModule.getPaymentApiKey()`.
#### Output:
- Returns the decrypted string `sk_live_51M3f...` in JavaScript memory at runtime, while binary strings checks on static build files (e.g. `strings index.bundle` or decompiled Java classes) return only obfuscated byte hashes.

### Code

#### 1. Android JNI C++ Implementation (`secure-keys.cpp`)
```cpp
#include <jni.h>
#include <string>

// XOR Mask key used for obfuscation
const uint8_t XOR_MASK = 0xAA;

// Obfuscated representation of "sk_live_51M3f" using XOR operation
// Hex values: 's' ^ 0xAA = 0xC9, 'k' ^ 0xAA = 0xC1, etc.
const uint8_t OBFUSCATED_KEY[] = { 0xC9, 0xC1, 0xFD, 0xC2, 0xC3, 0xD0, 0xCE, 0xFD, 0x9F, 0x9B, 0x99, 0xC2 };
const size_t KEY_LENGTH = sizeof(OBFUSCATED_KEY);

extern "C"
JNIEXPORT jstring JNICALL
Java_com_myportal_SecureKeysModule_getDecryptedApiKey(JNIEnv *env, jobject thiz) {
    std::string decrypted = "";
    for (size_t i = 0; i < KEY_LENGTH; i++) {
        // Reverse XOR logic in memory
        decrypted += (char)(OBFUSCATED_KEY[i] ^ XOR_MASK);
    }
    return env->NewStringUTF(decrypted.c_str());
}
```

#### 2. Android Kotlin Module Wrapper (`SecureKeysModule.kt`)
```kotlin
package com.myportal

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class SecureKeysModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    init {
        // Load the compiled C++ library binary
        System.loadLibrary("secure-keys")
    }

    override fun getName(): String = "SecureKeysModule"

    // Declare external JNI C++ function signature
    private external fun getDecryptedApiKey(): String

    @ReactMethod
    fun getPaymentApiKey(promise: Promise) {
        try {
            // Retrieve key computed dynamically in C++ binary space
            val key = getDecryptedApiKey()
            promise.resolve(key)
        } catch (e: Exception) {
            promise.reject("DECRYPTION_ERROR", "Failed to resolve native secure key", e)
        }
    }
}
```

#### 3. iOS Objective-C++ Bridge Interface (`SecureKeysBridge.mm`)
```objc
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SecureKeysModule, NSObject)

RCT_EXTERN_METHOD(getPaymentApiKey:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

@end
```

#### 4. iOS Swift Wrapper Implementation (`SecureKeys.swift`)
```swift
import Foundation
import React

@objc(SecureKeysModule)
class SecureKeysModule: NSObject {

  // XOR Mask used for key resolution
  private let xorMask: UInt8 = 0xAA
  
  // Obfuscated representation of "sk_live_51M3f" using XOR operation
  private let obfuscatedKey: [UInt8] = [0xC9, 0xC1, 0xFD, 0xC2, 0xC3, 0xD0, 0xCE, 0xFD, 0x9F, 0x9B, 0x99, 0xC2]

  @objc(getPaymentApiKey:rejecter:)
  func getPaymentApiKey(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    var decryptedBytes = [UInt8]()
    
    for byte in obfuscatedKey {
      // Reverse the XOR mask dynamically in RAM
      decryptedBytes.append(byte ^ xorMask)
    }
    
    if let decryptedString = String(bytes: decryptedBytes, encoding: .utf8) {
      resolve(decryptedString)
    } else {
      reject("DECRYPTION_ERROR", "Failed to decrypt native iOS key", nil)
    }
  }
}
```

### Complexity & Explanation
- **Time Complexity**: $O(K)$ linear conversion where $K$ is key length. Runs in sub-millisecond execution times.
- **Space Complexity**: $O(K)$ temporary memory heap allocation.
- **Explanation**: Metro compiles `.env` variables into plaintext strings directly within `index.bundle`, making them easily discoverable via basic static analysis. This native bridge relocates keys into compiled C++ binary storage (`.so` / `.a` libraries). The strings are obfuscated using XOR masks, which ensures they do not reside as raw strings in binary data pools. They are assembled back into plaintext directly inside CPU register operations only at runtime.

---
