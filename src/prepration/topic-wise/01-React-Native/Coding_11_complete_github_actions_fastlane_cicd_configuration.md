## Program 10: Complete GitHub Actions & Fastlane CI/CD Configuration
*⏱️ 2 min read*

### Question
Write a complete, end-to-end production-grade automation setup for React Native deployment:
1. Provide a **GitHub Actions workflow yaml** that installs environments, caches node/ruby nodes, builds and signs Android packages.
2. Provide a **Fastlane Fastfile** defining automated lanes for Android bundle builds (signing via gradle environments) and iOS TestFlight uploads (managing certificates via Fastlane Match).

### Sample Input & Output
#### Input:
- Developer pushes code modification to `master` branch.
#### Output:
- CI pipeline triggers: runs tests, compiles app binaries, code-signs iOS via Match profiles and Android via secrets keystores, and uploads files to stores consoles automatically.

### Code

#### 1. GitHub Actions Setup (`.github/workflows/deploy.yml`)
```yaml
name: Mobile App Production Build
on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: macos-13 # macOS required for iOS compiling
    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v3

      - name: Setup Node Environment
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install JS Dependencies
        run: npm ci

      - name: Setup Ruby for Fastlane
        uses: actions/setup-ruby@v1
        with:
          ruby-version: '3.0'

      - name: Install Bundler & Gems
        run: |
          gem install bundler
          bundle install

      - name: Cache CocoaPods
        uses: actions/cache@v3
        with:
          path: ios/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('ios/Podfile.lock') }}

      - name: Install iOS Pods
        run: cd ios && pod install

      - name: Setup Android JDK
        uses: actions/setup-java@v3
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Decode Keystore File
        run: echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > android/app/my-release-key.keystore

      - name: Run CI Tests
        run: npm test -- --watchAll=false

      - name: Execute Fastlane Releases
        env:
          MATCH_PASSWORD: ${{ secrets.MATCH_DECRYPT_PASSWORD }}
          FASTLANE_PASSWORD: ${{ secrets.APPLE_ID_PASSWORD }}
          ANDROID_KEYSTORE_PASSWORD: ${{ secrets.ANDROID_KEYSTORE_PASSWORD }}
        run: |
          bundle exec fastlane android release
          bundle exec fastlane ios beta
```

#### 2. Fastlane Automation Script (`fastlane/Fastfile`)
```ruby
default_platform(:ios)

platform :ios do
  desc "Build iOS IPA and deploy to TestFlight"
  lane :beta do
    # 1. Sync development/distribution profiles from Git match repo
    match(
      type: "appstore",
      git_url: "git@github.com:myorg/certificates.git",
      readonly: true
    )
    
    # 2. Increment iOS bundle version
    increment_build_number(xcodeproj: "ios/MyApp.xcodeproj")
    
    # 3. Build signed production IPA
    build_app(
      workspace: "ios/MyApp.xcworkspace",
      scheme: "MyApp",
      export_method: "app-store"
    )
    
    # 4. Push package to Apple Connect TestFlight
    upload_to_testflight(
      skip_waiting_to_submit: true
    )
  end
end

platform :android do
  desc "Compile Android AAB and push to Google Play Store"
  lane :release do
    # 1. Build and sign release AAB bundle via gradle task
    gradle(
      task: "bundle",
      build_type: "Release",
      project_dir: "android"
    )
    
    # 2. Upload to play store internal testing track
    upload_to_play_store(
      track: "internal",
      package_name: "com.mycompany.app",
      json_key_data: ENV["GOOGLE_PLAY_JSON_API_KEY"]
    )
  end
end
```

### Complexity & Explanation
- **Time Complexity**: Build compile steps take $O(B)$ where $B$ is build complexity. Run loops take 5-15 mins depending on caching strategies.
- **Space Complexity**: Runner disk allocation space scaled to standard compiler size (typically 4GB-8GB).
- **Explanation**: Implements a complete CI/CD release workflow. Fastlane Match handles iOS code signing by pulling certificates from an encrypted git repository. The GitHub workflow manages environments, decodes the Android keystore from secret variables, runs Jest tests, and triggers Fastlane to compile Android bundles and iOS IPAs, distributing them directly to app store consoles.

---
