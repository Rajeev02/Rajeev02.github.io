# Rajeev Kumar Joshi Portfolio

A personal developer portfolio and React Native preparation portal.

## Overview

This repository contains a Single Page Application (SPA) that serves two primary purposes:
1. A developer portfolio detailing professional experience, projects, and skills.
2. A password-protected preparation portal containing study resources and coding examples for React Native interviews.

The application is built to be fast, responsive, and easily maintainable, utilizing static hosting combined with Firebase for dynamic data storage.

## Features

- **Portfolio Interface** — Displays employment history, technical skills, and educational background.
- **Preparation Portal** — Renders markdown-based study materials, coding examples, and theory notes.
- **Client-Side Authentication** — Restricts access to the preparation portal using a SHA-256 hash validation mechanism.
- **Dark Mode Support** — Toggles between light and dark themes using CSS variables and local storage.

## Architecture

The application follows a standard SPA architecture:
- **Routing**: `react-router-dom` handles client-side transitions.
- **State Management**: `react-query` manages asynchronous data fetching and caching from Firebase.
- **UI Components**: `shadcn/ui` provides accessible, unstyled components that are customized via Tailwind CSS.
- **Data Persistence**: Firebase Firestore stores dynamic content, with security rules defining read/write access.

## Technology Stack

| Category       | Technology |
| -------------- | ---------- |
| Language       | TypeScript |
| Framework      | React 18, Vite |
| State/Data     | TanStack React Query, Firebase |
| Styling        | Tailwind CSS, shadcn/ui, Radix UI |
| Testing        | Vitest, Testing Library |
| Infrastructure | GitHub Pages |

## Project Structure

```
├── .github/workflows/    # CI/CD pipelines for deployment
├── public/               # Static assets and preparation portal HTML
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Top-level route components
│   ├── App.tsx           # Application routing entry point
│   └── main.tsx          # React DOM mounting
├── firebase.json         # Firebase hosting and rules configuration
├── package.json          # Dependency definitions and scripts
└── vite.config.ts        # Bundler configuration
```

## Prerequisites

- Node.js (v18 or higher)
- npm or Bun

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rajeev02/Rajeev02.github.io.git
   cd Rajeev02.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the project root containing your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY="your-api-key"
   VITE_FIREBASE_AUTH_DOMAIN="your-auth-domain"
   VITE_FIREBASE_PROJECT_ID="your-project-id"
   VITE_FIREBASE_STORAGE_BUCKET="your-storage-bucket"
   VITE_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   VITE_FIREBASE_APP_ID="your-app-id"
   ```

## Quick Start

Start the local Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## Testing

The project uses Vitest for unit testing.

Run the test suite:
```bash
npm run test
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

## Deployment

The application is continuously deployed to GitHub Pages. The CI/CD pipeline (`.github/workflows`) executes the following steps on pushes to the `master` branch:
1. Installs dependencies.
2. Runs ESLint checks.
3. Executes the Vitest test suite.
4. Builds the production bundle (`npm run build`).
5. Validates the build output (`npm run verify-build`).
6. Publishes the `dist` directory to GitHub Pages.

## Security

- **Preparation Portal Access**: The `/prepration` endpoint requires a password. Validation occurs client-side by comparing the input against a pre-computed SHA-256 hash. To change the password, generate a new hash (`echo -n "password" | shasum -a 256`) and update the `ACCESS_HASH` constant in `public/prepration/index.html`.
- **Database Rules**: Firestore access is governed by `firestore.rules`, ensuring only authorized reads/writes occur in the production environment.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Ensure tests and linting pass (`npm run test && npm run lint`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a Pull Request.
