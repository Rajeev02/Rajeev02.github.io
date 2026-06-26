> 🎯 **Topic:** Apple Certificates & Provisioning Profiles

**Q: What is the difference between a Certificate and a Provisioning Profile in iOS, and how do you manage them in a CI/CD pipeline?**
**A:**
- **Certificate:** Cryptographically identifies *who* built the app (a developer or team). It's a public/private key pair used for code signing.
- **Provisioning Profile:** Authorizes the app to run on physical devices. It securely ties together the Certificate, the App ID (Bundle Identifier), and a list of authorized device UDIDs (for Ad-Hoc/Development) or store distribution rules.
- **CI/CD Management:** I use **Fastlane Match** inside GitHub Actions. It securely stores encrypted certificates and profiles in a private Git repository. The CI runner pulls and decrypts them during the build process, preventing the "works on my machine" code-signing nightmare.

### 15.4 API Layer & Networking
