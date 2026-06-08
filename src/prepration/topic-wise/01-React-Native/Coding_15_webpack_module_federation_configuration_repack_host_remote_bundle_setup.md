
## Page Summary
### Reading Time
`3 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 14: Webpack Module Federation Configuration (Re.Pack Host & Remote Bundle Setup) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 14: Webpack Module Federation Configuration (Re.Pack Host & Remote Bundle Setup)
*⏱️ 2 min read*

### Question
Design and implement a Webpack configuration (`webpack.config.js`) for a React Native Container (Host) application using **Re.Pack** to enable Webpack Module Federation. Include the dynamic script component loader interface in TypeScript (`FederatedLoader.tsx`) that dynamically resolves and renders remote bundles on-demand.

### Sample Input & Output
#### Input:
- React Native renders `<FederatedLoader remote="rewards" module="./RewardsHub" />`.
#### Output:
- Webpack ScriptManager fetches the remote JS/Hermes chunk from `https://cdn.mybank.com/rewards/1.0.0/rewards.container.bundle.js` at runtime, resolves dependencies, and mounts the RewardsHub screen dynamically.

### Code

#### 1. Webpack Federation Config (`webpack.config.js`)
```javascript
const path = require('path');
const Repack = require('@callstack/repack');

module.exports = (env) => {
  const { mode, platform, devServer } = env;

  return {
    mode,
    entry: './index.js',
    output: {
      path: path.join(__dirname, 'build', platform),
      filename: 'index.bundle',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['module:@react-native/babel-preset'],
            },
          },
        },
      ],
    },
    plugins: [
      new Repack.RepackPlugin({
        platform,
        devServer,
      }),
      // Module Federation configuration
      new Repack.plugins.ModuleFederationPlugin({
        name: 'container',
        shared: {
          react: { singleton: true, eager: true },
          'react-native': { singleton: true, eager: true },
          'react-native-reanimated': { singleton: true, eager: true },
          '@react-navigation/native': { singleton: true, eager: true },
        },
        remotes: {
          // Remotes are loaded dynamically via URL script resolution
          rewards: 'rewards@https://cdn.mybank.com/rewards/1.0.0/[platform]/rewards.container.bundle.js',
          loans: 'loans@https://cdn.mybank.com/loans/1.0.0/[platform]/loans.container.bundle.js',
        },
      }),
    ],
  };
};
```

#### 2. Dynamic Component Script Loader (`FederatedLoader.tsx`)
```typescript
import React, { Suspense, lazy } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Federated } from '@callstack/repack/client';

interface FederatedLoaderProps {
  remote: string;   // Remote container name (e.g. 'rewards')
  module: string;   // Exposed module path (e.g. './RewardsHub')
  fallback?: React.ComponentType;
}

export function FederatedLoader({ remote, module, fallback }: FederatedLoaderProps) {
  // Load remote component dynamically using Federated resolver
  const DynamicComponent = lazy(() => 
    Federated.importModule(remote, module)
      .then((m) => m)
      .catch((err) => {
        console.error('Failed to load federated module:', err);
        return {
          default: () => (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Feature temporarily unavailable offline</Text>
            </View>
          ),
        };
      })
  );

  return (
    <Suspense fallback={fallback || <ActivityIndicator size="large" color="#3182ce" style={styles.spinner} />}>
      <DynamicComponent />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  spinner: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  errorText: { color: '#718096', fontSize: 15, fontWeight: '500' },
});
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Resolution**: $O(1)$ lookup inside Webpack container registry.
  - **Loading**: $O(N)$ network latency based on network capacity to download the chunk.
- **Space Complexity**: $O(B)$ memory allocation inside the Hermes JS Virtual Machine corresponding to the dynamic chunk bundle size $B$.
- **Explanation**: Metro cannot split or load remote code chunks at runtime. Re.Pack replaces Metro with Webpack, allowing the Host container to boot dynamically. When `<FederatedLoader>` is mounted, the ScriptManager downloads the remote Javascript/Hermes bytecode container, resolves shared singleton dependencies (`react`, `react-native`) from the host's active RAM space, and compiles the feature on-the-fly, creating a Super-App interface.

---
