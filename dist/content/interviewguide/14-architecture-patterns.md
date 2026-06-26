# 14-Architecture-Patterns.md

# Architecture Patterns for Senior React Native Developers

---

# 1. What is Software Architecture?

## Definition

Software Architecture defines how different parts of an application are structured and communicate with each other.

---

## Why Do We Need Architecture?

Without architecture:

* Tight Coupling
* Difficult Testing
* Difficult Maintenance
* Difficult Scaling

---

## Interview Answer

"Architecture provides a structured approach for organizing code, improving maintainability, scalability, and testability."

---

# 2. MVC (Model View Controller)

## Definition

MVC separates application logic into:

```text
Model
View
Controller
```

---

## Structure

```text
View
 ↓
Controller
 ↓
Model
```

---

## Responsibilities

### Model

Handles Data

---

### View

Displays UI

---

### Controller

Handles User Actions

---

## Example

```text
Login Screen
      ↓
Login Controller
      ↓
Auth API
```

---

## Advantages

* Separation of Concerns
* Easy Understanding

---

## Disadvantages

* Controller Becomes Large
* Difficult Scaling

---

## Interview Answer

"MVC separates UI, business logic, and data but can lead to massive controllers in large applications."

---

# 3. MVP (Model View Presenter)

## Definition

MVP replaces Controller with Presenter.

---

## Structure

```text
View
 ↕
Presenter
 ↓
Model
```

---

## Responsibilities

### View

Displays UI only.

---

### Presenter

Contains Business Logic.

---

### Model

Provides Data.

---

## Advantages

* Better Testability
* Less UI Logic

---

## Disadvantages

* Presenter Can Become Large

---

## Interview Answer

"MVP improves testability by moving business logic into a presenter layer."

---

# 4. MVVM (Model View ViewModel)

## Definition

MVVM separates UI and business logic through ViewModel.

---

## Structure

```text
View
 ↓
ViewModel
 ↓
Repository
 ↓
API
```

---

## Components

### Model

Data Layer

---

### View

UI Layer

---

### ViewModel

Business Logic

---

## Advantages

* Clean Separation
* Highly Testable
* Scalable

---

## Disadvantages

* Additional Abstraction

---

## Interview Answer

"MVVM separates UI from business logic using ViewModels, improving maintainability and testability."

---

# 5. MVI (Model View Intent)

## Definition

MVI is a unidirectional data flow architecture.

---

## Structure

```text
User Intent
      ↓
Reducer
      ↓
State
      ↓
UI
```

---

## Flow

```text
Button Click
      ↓
Intent
      ↓
Reducer
      ↓
New State
      ↓
Render UI
```

---

## Advantages

* Predictable State
* Easy Debugging

---

## Disadvantages

* More Boilerplate

---

## Interview Answer

"MVI uses a single source of truth and unidirectional data flow for predictable state management."

---

# 6. MVC vs MVP vs MVVM vs MVI

| Pattern | Best For           |
| ------- | ------------------ |
| MVC     | Small Apps         |
| MVP     | Medium Apps        |
| MVVM    | Large Apps         |
| MVI     | Complex State Apps |

---

## Comparison

| Feature          | MVC    | MVP    | MVVM   | MVI       |
| ---------------- | ------ | ------ | ------ | --------- |
| Testability      | Low    | Good   | High   | High      |
| Scalability      | Medium | Medium | High   | High      |
| Complexity       | Low    | Medium | Medium | High      |
| State Management | Weak   | Good   | Good   | Excellent |

---

# 7. Clean Architecture

## Definition

Clean Architecture separates business logic from frameworks and external dependencies.

---

## Layers

```text
Presentation
      ↓
Domain
      ↓
Data
```

---

## Presentation Layer

Contains:

* Screens
* Components
* Navigation

---

## Domain Layer

Contains:

* Use Cases
* Business Rules

---

## Data Layer

Contains:

* APIs
* Database
* Repositories

---

## Interview Answer

"Clean Architecture keeps business logic independent from UI frameworks and data sources."

---

# 8. Clean Architecture Flow

```text
UI
 ↓
Use Case
 ↓
Repository
 ↓
API
```

---

## Example

```text
Login Screen
      ↓
Login Use Case
      ↓
Auth Repository
      ↓
Backend API
```

---

# 9. Repository Pattern

## Definition

Repository acts as a bridge between business logic and data sources.

---

## Structure

```text
Screen
 ↓
Repository
 ↓
API
```

---

## Example

```typescript
UserRepository

getUsers()

updateUser()

deleteUser()
```

---

## Benefits

* Centralized Data Access
* Easy Testing
* Reusable Logic

---

## Interview Answer

"Repository Pattern abstracts data sources and provides a clean API for business logic."

---

# 10. Dependency Injection (DI)

## Definition

Dependencies are provided from outside instead of created internally.

---

## Bad

```typescript
const api =
 new ApiService();
```

---

## Good

```typescript
constructor(
 apiService
)
```

---

## Benefits

* Loose Coupling
* Better Testing
* Reusability

---

## Interview Answer

"Dependency Injection improves flexibility by reducing direct dependencies."

---

# 11. SOLID Principles

## S - Single Responsibility Principle

One class should have one responsibility.

---

## O - Open Closed Principle

Open for extension, closed for modification.

---

## L - Liskov Substitution Principle

Child classes should replace parent classes safely.

---

## I - Interface Segregation Principle

Small focused interfaces.

---

## D - Dependency Inversion Principle

Depend on abstractions, not implementations.

---

## Interview Answer

"SOLID principles help create maintainable, extensible, and loosely coupled systems."

---

# 12. Feature-Based Architecture

## Recommended React Native Structure

```text
src
│
├── features
│   ├── auth
│   ├── profile
│   ├── home
│
├── shared
│
├── navigation
│
├── services
│
└── store
```

---

## Why?

Avoid:

```text
screens/
components/
services/
```

with hundreds of files.

---

## Interview Answer

"Feature-based architecture scales better because each feature contains its own screens, hooks, services, and state."

---

# 13. Modular Architecture

## Definition

Split application into independent modules.

---

## Example

```text
Auth Module

Payment Module

Notification Module

Chat Module
```

---

## Benefits

* Independent Development
* Better Scalability
* Easier Maintenance

---

## Interview Answer

"Modular architecture allows teams to work independently and scale applications more effectively."

---

# 14. Layered Architecture

## Structure

```text
Presentation
      ↓
Business
      ↓
Data
```

---

## Benefits

* Clear Responsibilities
* Easy Maintenance
* Easy Testing

---

## Interview Answer

"Layered architecture separates concerns and improves maintainability."

---

# 15. Unidirectional Data Flow

## Definition

Data moves in one direction.

---

## Flow

```text
Action
 ↓
Reducer
 ↓
State
 ↓
UI
```

---

## Example

Redux Toolkit

MVI

React State

---

## Interview Answer

"Unidirectional data flow makes applications easier to debug and reason about."

---

# 16. Enterprise React Native Architecture

```text
Screen
 ↓
ViewModel
 ↓
Use Case
 ↓
Repository
 ↓
API Client
 ↓
Backend
```

---

## State Layer

```text
Redux Toolkit
      ↓
RTK Query
```

---

## Storage

```text
Keychain
Keystore
AsyncStorage
```

---

# 17. Architecture Selection Guide

## Small Project

```text
MVC
```

---

## Medium Project

```text
MVVM
```

---

## Large Enterprise Project

```text
MVVM
+
Clean Architecture
+
Repository Pattern
```

---

## Complex State Management

```text
MVI
```

---

# 18. Most Asked Interview Questions

1. What is MVC?
2. MVC vs MVP?
3. MVP vs MVVM?
4. MVVM vs MVI?
5. What is Clean Architecture?
6. Why use Clean Architecture?
7. What is Repository Pattern?
8. What is Dependency Injection?
9. Explain SOLID Principles.
10. What is Feature-Based Architecture?
11. What is Modular Architecture?
12. What is Layered Architecture?
13. What is Unidirectional Data Flow?
14. Which architecture do you use in React Native?
15. How do you structure large React Native projects?
16. How do you make apps scalable?
17. How do you separate business logic from UI?
18. How do you improve testability?
19. What architecture is best for enterprise apps?
20. Explain your current project architecture.

---

# Ultimate Senior Interview Answer

"For enterprise React Native applications, I prefer MVVM combined with Clean Architecture. UI components remain in the Presentation layer, business logic is handled through Use Cases and ViewModels, and data access is abstracted using Repository Pattern. State management is handled by Redux Toolkit and RTK Query, while Dependency Injection and SOLID principles ensure scalability, maintainability, and testability."

---

# Daily Revision Plan

```text
MVC                    3 min
MVP                    3 min
MVVM                   5 min
MVI                    5 min
Clean Architecture     5 min
Repository Pattern     5 min
Dependency Injection   3 min
SOLID                  5 min
Feature Architecture   3 min

Total: ~37 Minutes
```
