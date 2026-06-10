# 17-Design-Patterns.md

# Design Patterns for Senior React Native Developers

---

# 1. What are Design Patterns?

## Definition

Design Patterns are proven solutions to commonly occurring software design problems.

---

## Why Use Design Patterns?

Benefits:

* Reusable Solutions
* Better Maintainability
* Improved Scalability
* Cleaner Code
* Easier Testing

---

## Interview Answer

"Design patterns provide reusable and well-tested solutions to common software design problems."

---

# 2. Types of Design Patterns

## Creational

Object creation.

Examples:

```text
Singleton
Factory
Builder
```

---

## Structural

Object relationships.

Examples:

```text
Adapter
Facade
Decorator
```

---

## Behavioral

Communication patterns.

Examples:

```text
Observer
Strategy
Command
```

---

# 3. Singleton Pattern

## Definition

Ensures only one instance exists throughout the application.

---

## Example

```typescript
class ApiClient {

 static instance;

 static getInstance() {

  if (!ApiClient.instance) {
   ApiClient.instance =
    new ApiClient();
  }

  return ApiClient.instance;
 }

}
```

---

## React Native Use Cases

* API Client
* Analytics Service
* Logger
* Configuration Manager

---

## Interview Answer

"Singleton ensures a single shared instance and is commonly used for services such as networking and analytics."

---

# 4. Factory Pattern

## Definition

Creates objects without exposing creation logic.

---

## Example

```typescript
class NotificationFactory {

 static create(type) {

  if(type === "push")
   return new PushNotification();

  return new LocalNotification();
 }

}
```

---

## Use Cases

* Notifications
* API Providers
* Payment Providers

---

## Interview Answer

"Factory Pattern centralizes object creation and hides implementation details."

---

# 5. Builder Pattern

## Definition

Constructs complex objects step by step.

---

## Example

```typescript
const user =
 UserBuilder
  .setName("Raj")
  .setEmail("raj@test.com")
  .build();
```

---

## Use Cases

* Request Objects
* Form Models
* Configuration Objects

---

## Interview Answer

"Builder Pattern simplifies creation of complex objects with multiple optional properties."

---

# 6. Observer Pattern

## Definition

One object notifies multiple subscribers when state changes.

---

## Flow

```text
Publisher
   ↓
Subscribers
```

---

## Examples

```text
Redux Store

EventEmitter

WebSocket Events
```

---

## Interview Answer

"Observer Pattern enables automatic notification of subscribers when data changes."

---

# 7. Strategy Pattern

## Definition

Encapsulates multiple algorithms and allows switching dynamically.

---

## Example

```typescript
payment.pay(
 new UpiStrategy()
);

payment.pay(
 new CardStrategy()
);
```

---

## Use Cases

* Payment Methods
* Authentication Providers
* Sorting Strategies

---

## Interview Answer

"Strategy Pattern allows runtime selection of different implementations."

---

# 8. Adapter Pattern

## Definition

Makes incompatible interfaces work together.

---

## Example

```text
Old API
   ↓
Adapter
   ↓
New Interface
```

---

## Use Cases

* Third Party SDKs
* Legacy APIs
* Platform Specific APIs

---

## Interview Answer

"Adapter Pattern converts one interface into another expected by the application."

---

# 9. Facade Pattern

## Definition

Provides a simplified interface over a complex subsystem.

---

## Example

```typescript
AuthService.login();
```

Internally:

```text
Token
Storage
API
Analytics
```

---

## Use Cases

* Authentication
* Payment Modules
* Analytics

---

## Interview Answer

"Facade Pattern hides complexity behind a simplified API."

---

# 10. Decorator Pattern

## Definition

Adds functionality without modifying existing code.

---

## Example

```typescript
withAnalytics(
 LoginScreen
);
```

---

## React Examples

```text
HOC

Middleware
```

---

## Interview Answer

"Decorator Pattern extends behavior dynamically without changing original implementations."

---

# 11. Command Pattern

## Definition

Encapsulates requests as objects.

---

## Example

```typescript
SaveCommand

DeleteCommand

UpdateCommand
```

---

## Benefits

* Undo/Redo
* Queue Processing
* Background Tasks

---

## Interview Answer

"Command Pattern encapsulates actions into reusable command objects."

---

# 12. Repository Pattern

## Definition

Separates business logic from data access.

---

## Flow

```text
UI
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
```

---

## Interview Answer

"Repository Pattern abstracts data sources and centralizes data access."

---

# 13. Dependency Injection Pattern

## Definition

Dependencies are supplied externally.

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
* Easy Testing

---

## Interview Answer

"Dependency Injection improves flexibility and testability."

---

# 14. Module Pattern

## Definition

Encapsulates functionality into independent modules.

---

## Example

```text
Auth Module

Chat Module

Payment Module
```

---

## Benefits

* Scalability
* Isolation
* Reusability

---

## Interview Answer

"Module Pattern organizes code into self-contained feature units."

---

# 15. Pub/Sub Pattern

## Definition

Publisher does not know subscribers.

---

## Flow

```text
Publisher
   ↓
Event Bus
   ↓
Subscribers
```

---

## Example

```typescript
eventEmitter.emit(
 "user-login"
);
```

---

## Use Cases

* Analytics
* Notifications
* Cross Module Communication

---

## Interview Answer

"Pub/Sub enables loose coupling through event-based communication."

---

# 16. React Native Examples of Patterns

## React.memo

```text
Optimization Pattern
```

---

## Context API

```text
Observer Pattern
```

---

## Redux

```text
Observer Pattern
```

---

## RTK Query

```text
Repository Pattern
```

---

## HOC

```text
Decorator Pattern
```

---

## EventEmitter

```text
Pub/Sub Pattern
```

---

# 17. Patterns Commonly Used in React Native

## Most Common

```text
Singleton
Repository
Observer
Dependency Injection
Facade
Module
```

---

## Enterprise Applications

```text
MVVM
Repository
Factory
Strategy
Singleton
```

---

# 18. Design Patterns vs Architecture Patterns

## Design Pattern

Small Scope

Example:

```text
Singleton
Factory
Observer
```

---

## Architecture Pattern

Large Scope

Example:

```text
MVC
MVVM
MVI
Clean Architecture
```

---

## Interview Answer

"Design patterns solve localized problems while architecture patterns define the overall application structure."

---

# 19. Most Asked Interview Questions

1. What are Design Patterns?
2. Why use Design Patterns?
3. What is Singleton?
4. Singleton use cases?
5. What is Factory Pattern?
6. What is Builder Pattern?
7. What is Observer Pattern?
8. Redux follows which pattern?
9. What is Strategy Pattern?
10. What is Adapter Pattern?
11. What is Facade Pattern?
12. What is Decorator Pattern?
13. What is Command Pattern?
14. What is Repository Pattern?
15. What is Dependency Injection?
16. What is Pub/Sub?
17. Which patterns do you use in React Native?
18. Design Pattern vs Architecture Pattern?
19. What patterns are used in your current project?
20. Which pattern is most useful in enterprise apps?

---

# Ultimate Senior Interview Answer

"In large React Native applications, I commonly use Singleton for shared services, Repository Pattern for data access, Observer Pattern through Redux and Context API, Dependency Injection for testability, Facade Pattern for simplifying complex modules, and Module Pattern for feature-based architecture. These patterns improve maintainability, scalability, and code quality."

---

# Daily Revision Plan

```text
Singleton                3 min
Factory                  3 min
Builder                  3 min
Observer                 5 min
Strategy                 3 min
Adapter                  3 min
Facade                   3 min
Repository               5 min
Dependency Injection     5 min
Pub/Sub                  3 min

Total: ~36 Minutes
```
