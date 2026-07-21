# Volume 13 – Set 28 – CI/CD & Fastlane

## 1. Why is CI/CD critical for Mobile Development compared to Web?

**Concept:**
Releasing a web app is as simple as uploading JS files to an S3 bucket or Vercel. Releasing a mobile app is a notoriously slow, fragile, and complex process.

**Answer:**
Mobile CI/CD is critical because:
1. **Compilation Time:** Compiling an iOS and Android binary from scratch can take 30-45 minutes. Developers cannot afford to block their laptops doing this manually.
2. **Complex Signing:** iOS requires Provisioning Profiles and Certificates. Managing these manually across a team of 10 developers usually results in broken builds. CI/CD automates certificate injection.
3. **App Store Review:** A broken release on Web can be fixed in 2 minutes by reverting. A broken release on Mobile means waiting up to 48 hours for Apple to review your hotfix. CI/CD runs automated E2E tests (Appium/Detox) before submission to catch crashes *before* the review process.

**Key Takeaway:**
Without CI/CD, mobile releases are a manual, error-prone nightmare. CI/CD standardizes the build environment (e.g., specific Xcode and Node versions) eliminating \"It works on my machine\" issues.

---

## 2. What is Fastlane and how does it fit into the React Native pipeline?

**Concept:**
A CI server (like GitHub Actions or Bitrise) can run shell scripts, but writing bash scripts to interface with Apple's API to upload an IPA is highly complex.

**Answer:**
**Fastlane** is an open-source Ruby tool that automates the tedious tasks of mobile app deployment. 

It acts as the \"glue\" between your CI/CD server and the App Stores. Instead of writing shell scripts, you write a `Fastfile`.

**What Fastlane automates:**
1. **Code Signing:** `match` completely automates syncing iOS certificates across your team via a private git repo.
2. **Building:** `gym` builds the `.ipa` (iOS) and `gradle` builds the `.apk/.aab` (Android).
3. **Deploying:** `deliver` uploads the binary, screenshots, and metadata directly to App Store Connect / TestFlight. `supply` does the same for the Google Play Store.

**Key Takeaway:**
Your CI/CD server (GitHub Actions) runs the job, but Fastlane is the tool *inside* the job actually doing the mobile-specific heavy lifting.

---

## 3. How do you handle Environment Variables (DEV vs PROD) in React Native CI/CD?

**Concept:**
You need your Staging app to point to `api-staging.com` and your Production app to point to `api-prod.com`.

**Answer:**
In a CI/CD pipeline, you do not hardcode APIs in the codebase. 

1. **`react-native-config`:** We use this library because it bridges `.env` variables to both JavaScript *and* Native Code (Java/Objective-C). 
2. **The Pipeline:** 
   - In GitHub Actions, you store your Prod API keys in GitHub Secrets.
   - During the workflow, you dynamically generate a `.env.production` file using those secrets.
   - You run the Fastlane build command specifying the environment: `ENVFILE=.env.production fastlane ios build_prod`.
3. **Build Variants:** On Android, you configure `productFlavors` (dev, prod). On iOS, you configure Xcode Schemes. This allows the CI to build a Staging App (with a different bundle ID, like `com.myapp.staging`) so it can be installed on the phone simultaneously with the Prod app.

**Key Takeaway:**
Environment variables in mobile must be injected at *build time* (unlike web where they can sometimes be injected at deployment/runtime) because the binary is compiled and immutable.

---

## 4. Compare Bitrise, GitHub Actions, and Expo EAS Build.

**Concept:**
Choosing the right CI/CD runner dictates how much DevOps overhead your team will have.

**Answer:**
1. **GitHub Actions:** 
   - *Pros:* Cheap, deeply integrated with your repo. 
   - *Cons:* You are handed a raw macOS virtual machine. You must manually write the YAML scripts to install Ruby, CocoaPods, Java, Android SDK, and configure Fastlane. High DevOps maintenance.
2. **Bitrise:**
   - *Pros:* Built specifically for Mobile. It has a visual drag-and-drop workflow editor. The VMs come pre-installed with the exact Android SDKs and Xcode versions you need.
   - *Cons:* Expensive.
3. **Expo EAS Build:**
   - *Pros:* The ultimate \"Zero DevOps\" solution for React Native. You don't write Fastfiles. You just run `eas build --profile production`. Expo manages the certificates, the VMs, and the submission to the App Stores entirely in the cloud. It works even if you don't use Expo (Bare RN).
   - *Cons:* Less customizable than a raw Fastlane setup if you have extremely obscure native C++ compilation requirements.

**Key Takeaway:**
For modern RN teams, Expo EAS Build is the gold standard for reducing DevOps friction. For legacy enterprise apps with massive custom native layers, Bitrise + Fastlane is preferred.

---

## 5. How do you automate Code Signing for iOS in a team environment?

**Concept:**
iOS Code Signing requires a Certificate (who are you?) and a Provisioning Profile (what app are you allowed to build?). If Developer A revokes a certificate to create a new one, Developer B's builds suddenly fail.

**Answer:**
I use **Fastlane Match**.

1. Instead of every developer manually logging into the Apple Developer Portal and generating their own certificates, you create a private, encrypted Git repository.
2. Fastlane Match generates one central set of certificates and profiles, encrypts them, and pushes them to this private repo.
3. When a new developer joins, or when the CI server runs, they simply run `fastlane match development`. Match pulls the encrypted certificates from the repo, decrypts them via a shared passphrase, and installs them in the local keychain.

**Key Takeaway:**
Fastlane Match guarantees that every developer and the CI server are using the exact same certificates, completely eliminating the dreaded \"Code Signing Error\" from mobile development.
