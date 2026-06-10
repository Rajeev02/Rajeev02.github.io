import re

content = open('/Users/rajeevjoshi/Documents/GitHub/Rajeev02.github.io/src/prepration/topic-wise/01-React-Native-Theory/React_Native_Theory.md', 'r').read().lower()

topics = [
    "Redux Persist", "takeEvery", "takeLatest", "fork", "spawn", "race",
    "Deep Linking", "Universal Links", "App Links",
    "Axios Interceptors", "Request Cancellation", "JWT", "Cookies",
    "Android Studio", "Gradle", "Manifest", "Activities", "Services", "Broadcast Receivers",
    "Xcode", "CocoaPods", "Info.plist", "URL Schemes",
    "Camera", "Barcode Scanning", "Biometrics", "Face ID", "Touch ID",
    "Location Services", "Geofencing", "Push Notifications", "FCM", "APNS",
    "Keychain", "Keystore", "File Handling", "WebView", "Share Sheet",
    "Firebase Analytics", "Adobe Experience", "Tealium", "AppsFlyer", "Dynatrace", "Quantum Metric",
    "MFA", "Root Detection", "Jailbreak Detection", "Certificate Pinning", "OWASP",
    "Reanimated", "Gesture Handler", "Bundle Splitting",
    "Vision Camera", "Apple Pay", "Google Pay", "Klarna", "Expo Updates", "CodePush",
    "Fastlane", "GitHub Actions", "Bitbucket Pipelines", "Jenkins",
    "Scrum", "Sprint Planning", "Retrospectives"
]

missing = []
for t in topics:
    if t.lower() not in content:
        missing.append(t)

print("Missing Topics:")
for m in missing:
    print(m)
