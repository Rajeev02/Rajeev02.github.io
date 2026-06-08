
## Page Summary
### Reading Time
`4 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 🧹 Section 24: Code Quality & Developer Tooling |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## 🧹 Section 24: Code Quality & Developer Tooling

*⏱️ 3 min read*

#### 1. ESLint Configuration for React Native
**ESLint** performs static analysis on your codebase, identifying problematic patterns, potential bugs, and code style violations before runtime.

- **Key Plugins**:
  - `@react-native/eslint-config`: Base configuration for React Native projects (extends community standards).
  - `eslint-plugin-react-hooks`: Enforces the Rules of Hooks (`exhaustive-deps`, no conditional hooks).
  - `eslint-plugin-react-native`: React Native-specific rules (`no-inline-styles`, `no-unused-styles`, `no-raw-text` to catch untranslated strings).

- **Example Configuration** (`eslint.config.mjs` — flat config format):
  ```javascript
  import reactNative from '@react-native/eslint-config';
  import reactHooks from 'eslint-plugin-react-hooks';
  import reactNativePlugin from 'eslint-plugin-react-native';

  export default [
    ...reactNative,
    {
      plugins: {
        'react-hooks': reactHooks,
        'react-native': reactNativePlugin,
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react-native/no-inline-styles': 'warn',
        'react-native/no-unused-styles': 'error',
        'react-native/no-raw-text': 'warn',
        'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
    },
  ];
  ```

#### 2. Prettier
**Prettier** is an opinionated code formatter that enforces consistent formatting across the entire codebase, eliminating style debates in code reviews.

- **Integration with ESLint**: Use `eslint-config-prettier` to disable ESLint rules that conflict with Prettier's formatting. Prettier handles formatting; ESLint handles logic/quality rules.

- **`.prettierrc` Configuration**:
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 100,
    "bracketSpacing": true,
    "arrowParens": "always"
  }
  ```

#### 3. Husky & lint-staged
**Husky** is a Git hooks manager that runs scripts automatically at specific Git lifecycle events (pre-commit, pre-push, commit-msg).

- **Pre-commit Hook**: Run ESLint, Prettier, and TypeScript type checking on staged files only (not the entire codebase) using `lint-staged`:
  ```json
  {
    "lint-staged": {
      "*.{ts,tsx}": [
        "eslint --fix --max-warnings 0",
        "prettier --write"
      ],
      "*.{json,md}": [
        "prettier --write"
      ]
    }
  }
  ```

- **Pre-push Hook**: Run the full test suite before pushing to prevent broken code from reaching the remote:
  ```text
  # .husky/pre-push
  npx jest --bail --passWithNoTests
  npx tsc --noEmit
  ```

- **Setup Commands**:
  ```text
  npx husky init
  npm install --save-dev lint-staged
  ```

#### 4. Commit Conventions
**Conventional Commits** enforce a structured commit message format that enables automated changelog generation, semantic versioning, and clear project history.

- **Format**: `<type>(<optional scope>): <description>`
- **Types**:

| Type | Usage |
| :--- | :--- |
| `feat:` | New feature or user-facing functionality |
| `fix:` | Bug fix |
| `chore:` | Build configs, dependency updates, CI changes |
| `docs:` | Documentation-only changes |
| `refactor:` | Code restructuring without behavior change |
| `test:` | Adding or updating test cases |
| `perf:` | Performance improvement |
| `style:` | Formatting changes (no logic change) |

- **Enforcement**: Use `commitlint` with Husky's `commit-msg` hook:
  ```text
  # .husky/commit-msg
  npx --no -- commitlint --edit "$1"
  ```

  ```json
  // commitlint.config.js
  { "extends": ["@commitlint/config-conventional"] }
  ```

#### 5. Code Review Best Practices for Mobile Teams
- **PR Size Limits**: Keep PRs under ~400 lines of code changes. Large PRs lead to shallow reviews and missed bugs. Split features into vertical slices (e.g., API layer → state management → UI → tests).
- **Review Checklist**:
  - Performance: unnecessary re-renders, missing `memo`/`useCallback`, inline styles.
  - Accessibility: missing `accessibilityLabel`, touch target sizes (minimum 44x44pt).
  - Memory leaks: uncleaned `useEffect` subscriptions, missing `AbortController`.
  - Platform parity: tested on both iOS and Android, platform-specific code handled.
- **Automated Checks**: CI pipeline runs lint + type check + unit tests + build verification before a PR is eligible for human review. This prevents reviewers from wasting time on code that doesn't compile.

> *"How do you enforce code quality in a team of 10 developers?"*

- **Strategic Response**: I set up a three-layer defense. First, IDE-level: shared ESLint and Prettier configurations ensure real-time feedback as developers write code. Second, Git-level: Husky pre-commit hooks run lint-staged to auto-fix and validate only changed files, and commitlint enforces conventional commit messages. Third, CI-level: GitHub Actions runs the full lint, TypeScript type-check, and test suite on every PR. PRs cannot merge without passing all checks and receiving at least one approval. I also establish a team code review checklist covering performance, accessibility, and platform parity.

> *"What Git hooks do you set up for a React Native project?"*

- **Strategic Response**: Three hooks. Pre-commit: lint-staged runs ESLint with `--fix` and Prettier on staged `.ts/.tsx` files, catching issues before they enter the commit. Commit-msg: commitlint validates the commit message follows conventional commits format. Pre-push: runs `jest --bail` and `tsc --noEmit` to ensure tests pass and TypeScript compiles before code reaches the remote. This layered approach catches issues progressively without slowing down the development workflow.

---


---
