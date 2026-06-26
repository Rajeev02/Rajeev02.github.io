> 🎯 **Topic:** Crash Monitoring & Symbolication

**Q: What is Symbolication, and why is it critical for tools like Sentry or Firebase Crashlytics?**
**A:** When we release an app, the JavaScript is minified, and native code is obfuscated (via ProGuard/R8 on Android). If a production crash occurs, the stack trace will look like `TypeError: a.b is not a function at line 1, col 425`.
- **Symbolication:** The process of mapping that obfuscated code back to the original, readable source code.
- **How it works:** During the CI/CD build process, we must automatically upload **Source Maps** (for JS) and **dSYM/Mapping files** (for iOS/Android) to Sentry. Sentry uses these files to translate the stack trace into exact file names and line numbers, drastically reducing Mean Time To Resolution (MTTR).
