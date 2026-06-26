> 🎯 **Topic:** 1.1 🏗️ Object-Oriented Programming (OOP) & Conceptual Q&A
> 📊 **Difficulty:** Senior / Lead | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## 1.1 🏗️ Object-Oriented Programming (OOP) & Conceptual Q&A

*⏱️ 1 min read*

#### 1. Abstract Class Instantiation
An abstract class cannot be instantiated directly. It serves as a base class containing partial implementations and signatures. You must inherit it and implement all its abstract methods in a subclass.

```java
abstract class Animal {
   abstract void sound();
}
// Animal a = new Animal(); // ❌ Error: cannot be instantiated directly

class Dog extends Animal {
   void sound() {
      System.out.println("Bark");
   }
}
Animal dog = new Dog(); // ✅ Works (Polymorphism)
```

#### 2. Interface vs. Abstract Class

| Abstract Class | Interface |
| :--- | :--- |
| Can have fully implemented methods and state. | Acts primarily as a contract (Java 8+ allows default methods). |
| Supports constructors. | Does not support constructors. |
| Single inheritance (class can extend only one class). | Multiple inheritance (class can implement multiple interfaces). |
| Used for sharing common behavior or code structure. | Used to define common capabilities across unrelated classes. |

#### 3. Polymorphism
Polymorphism allows methods to behave differently depending on the class instance calling them.

```javascript
class Animal {
  sound() { console.log("Generic sound"); }
}
class Dog extends Animal {
  sound() { console.log("Bark"); }
}
```

---


---

---
