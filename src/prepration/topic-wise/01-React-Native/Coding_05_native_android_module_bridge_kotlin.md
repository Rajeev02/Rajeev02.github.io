## Program 4: Native Android Module Bridge (Kotlin)
*⏱️ 1 min read*

### Question
Implement a custom Android Native Module structure written in Kotlin that provides a bridge to compute SHA-256 hashes of string buffers natively. The module must register its namespace, declare the hash calculations asynchronously, and return the outputs through a React Native Promise back to the JS thread.

### Sample Input & Output
#### JS Input:
```javascript
import { NativeModules } from 'react-native';
const hash = await NativeModules.CryptoBridge.hashString("secure_payment_payload");
```
#### Output:
```javascript
"2f5f14e7a8cf..." // 64-character SHA-256 hexadecimal string
```

### Code
```kotlin
package com.myportal.cryptobridge

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import java.security.MessageDigest

class CryptoBridgeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    // 1. Define the module namespace exposed to JavaScript
    override fun getName(): String {
        return "CryptoBridge"
    }

    // 2. Implement target method annotated with @ReactMethod for JS invocation
    @ReactMethod
    fun hashString(input: String, promise: Promise) {
        try {
            // Run hash operations inside worker threads rather than blocking native UI thread
            Thread {
                try {
                    val digest = MessageDigest.getInstance("SHA-256")
                    val hashBytes = digest.digest(input.toByteArray(Charsets.UTF_8))
                    
                    // Convert bytes to hex string
                    val hexString = StringBuilder()
                    for (byte in hashBytes) {
                        val hex = Integer.toHexString(0xff and byte.toInt())
                        if (hex.length == 1) hexString.append('0')
                        hexString.append(hex)
                    }
                    
                    // Resolve output through bridge
                    promise.resolve(hexString.toString())
                } catch (e: Exception) {
                    promise.reject("HASH_ERROR", "Failed to calculate SHA-256 hash", e)
                }
            }.start()
        } catch (e: Exception) {
            promise.reject("THREAD_ERROR", "Failed to spawn hashing worker thread", e)
        }
    }
}
```

### Complexity & Explanation
- **Time Complexity**: $O(B)$ where $B$ is the byte length of the input string being hashed. Running the operation inside a Kotlin background thread keeps the Java/Kotlin Main UI Thread free from blocking delays.
- **Space Complexity**: $O(B)$ to buffer the byte array data during message digestion.
- **Explanation**: A React Native Native Module implemented in Kotlin. It registers the class as `CryptoBridge` and runs cryptographic calculations asynchronously. By executing the hash computation in a separate `Thread`, it prevents blocking Android's Main UI thread, returning the hexadecimal hash string back to JS using React Native's `Promise` bridge interface.

---
