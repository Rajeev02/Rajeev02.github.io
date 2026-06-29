# Rajeev Kumar Joshi - Portfolio & React Native Preparation Portal

This repository contains the source code for the personal developer portfolio website of **Rajeev Kumar Joshi**, a Senior Mobile Engineer & React Native Developer with over 9 years of experience. It also hosts a password-protected **React Native & Coding Interview Preparation Portal** under `/prepration`.

## 🚀 Live Links
- **Developer Portfolio**: [https://rajeev02.github.io](https://rajeev02.github.io)
- **Preparation Portal**: [https://rajeev02.github.io/prepration](https://rajeev02.github.io/prepration)

---

## 🛠️ Tech Stack & Technologies

The project is built using modern front-end technologies:

- **Core Framework**: Vite + React 18 (TypeScript)
- **Styling**: Tailwind CSS + shadcn-ui + Lucide Icons + Tailwind CSS Animate
- **State & Data**: TanStack React Query + React Hook Form + Zod
- **Backend & Config**: Firebase Integration (Firestore Rules & Schema)
- **Tooling & Build**: PostCSS, ESLint, TypeScript, Vitest (testing)
- **Security (Portal)**: Web Crypto API (SHA-256 client-side session hashing)

---

## ✨ Features

### 1. Interactive Developer Portfolio
- **Hero Profile**: Highlights contact details, 9+ years of experience, and summary statistics.
- **About & Skills**: Detailed breakdown of technical competencies grouped by domain.
- **Employment Record**: Professional history timeline across LetsVenture, WildTrails, Dunst, and Plurebus.
- **Projects Showcase**: Interactive list of developed applications with filtering and store links.
- **Education Timeline**: Academic degrees including MCA from NIT Durgapur and BCA from DHSGSU.
- **Theme Toggle**: Modern theme switching between dark and light modes.

### 2. Password-Protected Preparation Portal (`/prepration`)
- Secure client-side password protection using SHA-256 encryption.
- **Interactive File Viewer**: Fast markdown rendering and code views of 50+ interview resources:
  - **Coding (11 files)**: Data Structures, Algorithms, practice questions, and code examples.
  - **Theory (37 files)**: In-depth React Native concepts, architecture, performance, Hermes, TurboModules.
  - **Others (2 files)**: Cases, notes, and general strategy guides.
- **Responsive Layout**: Designed for mobile and desktop reading with a sticky sidebar.

---

## 📁 Repository Structure

```text
├── .github/workflows/      # CI/CD Deployment configurations (GitHub Actions)
├── assets/                 # Static media and assets
├── public/                 # Favicons, manifests, and site assets
│   └── prepration/         # Security-protected portal HTML pages
├── src/
│   ├── components/         # Reusable React UI & layout components
│   ├── data/               # Static project data & mock responses
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Main routing pages (Index, EmploymentRecord, NotFound)
│   ├── prepration/         # Preparation study resources (markdown files)
│   └── main.tsx            # Application entry point
├── scripts/                # Verification and build helper scripts
├── package.json            # Scripts & project dependencies
├── tailwind.config.ts      # Design system/theme configurations
├── vite.config.ts          # Vite bundler configuration
└── vitest.config.ts        # Unit test configuration
```

---

## 💻 Getting Started (Local Development)

To run this project locally, ensure you have **Node.js** (v18+) and **npm** or **Bun** installed.

### 1. Clone the Repository
```bash
git clone https://github.com/Rajeev02/Rajeev02.github.io.git
cd Rajeev02.github.io
```

### 2. Install Dependencies
Using **npm**:
```bash
npm install
```
Or using **Bun**:
```bash
bun install
```

### 3. Start the Development Server
```bash
npm run dev
```
The application will start on `http://localhost:5173` (or the port specified in terminal).

### 4. Run Tests
```bash
npm run test
```

### 5. Build for Production
To build a highly optimized production bundle:
```bash
npm run build
```
The output will be created in the `dist/` directory.

### 6. Verify the Build
To ensure compile safety and script health before deploying:
```bash
npm run verify-build
```

---

## 🚀 Deployment

The site is automatically deployed to **GitHub Pages** on every push to the `master` branch via GitHub Actions (`.github/workflows/deploy.yml`).

The deployment pipeline performs the following steps:
1. Installs clean dependencies via `npm ci`
2. Lints source files (`npm run lint`)
3. Runs unit tests (`npm run test`)
4. Builds the distribution files (`npm run build`) with Firebase build variables injected
5. Runs verification scripts (`npm run verify-build`)
6. Publishes to GitHub Pages.

---

## 🔒 Security Notice
The `/prepration` portal is protected with a client-side SHA-256 hash. If you need to change the password:
1. Generate the hash of your new password:
   ```bash
   echo -n "new-password" | shasum -a 256
   ```
2. Update the hash in:
   - `public/prepration/index.html` (under `ACCESS_HASH`)
   - `public/prepration/viewer.html` (under `ACCESS_HASH`)
