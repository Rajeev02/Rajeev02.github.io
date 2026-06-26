> 🎯 **Topic:** Deployment & Hotfix Management

**Q: Can you outline your Play Store Deployment and App Store Review processes?**
**A:**
- **Android:** We build a signed Android App Bundle (AAB), which optimizes APK size based on user device architecture. We deploy to the Internal or Closed Beta track for QA. Once approved, we use a Staged Rollout (e.g., 10%, 50%, 100%) in Production to safely monitor for spikes in crash rates before full release.
- **iOS:** We build an IPA and upload it to App Store Connect via Fastlane. It's distributed internally via TestFlight. For production, we submit it for Apple's App Review, ensuring compliance with their strict UI/UX, privacy, and payment guidelines.

**Q: How do you handle Hotfixes in a React Native app?**
**A:** 
- **JavaScript/Asset Fixes:** If the bug is strictly in the React Native JS bundle, I use Over-The-Air (OTA) updates like **CodePush** or Expo Updates. This pushes the fix directly to users upon next app launch, bypassing store review delays.
- **Native Fixes:** If the bug involves Native Modules (Java/Swift), OTA cannot be used. We must cut a new release branch, build a new binary, and submit an Expedited Review request to Apple and Google for immediate rollout.

### 15.6 Workflow & Processes
