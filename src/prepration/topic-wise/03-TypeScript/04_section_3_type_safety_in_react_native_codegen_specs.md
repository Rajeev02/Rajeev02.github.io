
## Page Summary
### Reading Time
`1 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 📱 Section 3: Type Safety in React Native (Codegen Specs) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | 🔥 Must Revise |

---


## 📱 Section 3: Type Safety in React Native (Codegen Specs)

*⏱️ 1 min read*

In the New Architecture, **Codegen** bridges the type-safety gap between JavaScript and native C++/Java/Obj-C code. To configure this, you write strict TypeScript Specification files.

#### 1. Codegen Specification Rules
- The spec file name must follow a strict naming convention: `Native<ModuleName>.ts` (for TurboModules) or `<ModuleName>NativeComponent.ts` (for Fabric components).
- You must use specific, compile-safe type definitions provided by React Native (`Double`, `Float`, `Int32`, `UnsafeObject`, `DirectEventHandler`). Standard JavaScript dynamic types like `any` or generic object type definitions are rejected by the Codegen compiler.

#### 2. TurboModule Spec Example
```typescript
import { TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  // Define strict return and input types
  encryptPayload(alias: string, rawData: string): Promise<string>;
  decryptPayload(alias: string, encryptedData: string): Promise<string>;
  isBiometricsAvailable(): boolean;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SecureEncryptionModule');
```

---


---
