> 🎯 **Topic:** Section 9: Program 9: Custom Event Broker (Publish-Subscribe Pattern) with Wildcards
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 9: Program 9: Custom Event Broker (Publish-Subscribe Pattern) with Wildcards
*⏱️ 1 min read*

### Question
Implement a complete JavaScript **Event Emitter / Broker** class supporting a Publish-Subscribe pattern.
The class must export methods:
1. `.on(event, callback)`: Register event listeners.
2. `.off(event, callback)`: Remove registered listeners.
3. `.emit(event, payload)`: Dispatch events.
4. `.once(event, callback)`: Run a callback exactly once, then unsubscribe.
5. Support **wildcard** selectors (e.g. emitting `'user.*'` triggers callbacks listening to both `'user.login'` and `'user.logout'`).

### Code
```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  // 1. Subscribe to events
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    
    // Return unsubscribe utility hook
    return () => this.off(event, callback);
  }

  // 2. Unsubscribe from events
  off(event, callback) {
    if (!this.events.has(event)) return;
    const list = this.events.get(event).filter((cb) => cb !== callback);
    if (list.length === 0) {
      this.events.delete(event);
    } else {
      this.events.set(event, list);
    }
  }

  // 3. Subscribe once
  once(event, callback) {
    const wrapped = (...args) => {
      this.off(event, wrapped);
      callback.apply(this, args);
    };
    return this.on(event, wrapped);
  }

  // 4. Emit events with Wildcard resolution (e.g. 'order.*')
  emit(event, ...args) {
    this.events.forEach((callbacks, registeredEvent) => {
      if (this.matchEvent(registeredEvent, event)) {
        callbacks.forEach((cb) => {
          try {
            cb(...args);
          } catch (err) {
            console.error(`Error in event listener for ${registeredEvent}:`, err);
          }
        });
      }
    });
  }

  private matchEvent(registered, emitted) {
    if (registered === emitted) return true;
    
    // Convert wildcard pattern 'user.*' to regex 'user\.[^.]+'
    if (registered.includes('*')) {
      const pattern = '^' + registered.replace(/\*/g, '[^.]+') + '$';
      const regex = new RegExp(pattern);
      return regex.test(emitted);
    }
    
    if (emitted.includes('*')) {
      const pattern = '^' + emitted.replace(/\*/g, '[^.]+') + '$';
      const regex = new RegExp(pattern);
      return regex.test(registered);
    }

    return false;
  }
}
```

- **Explanation**: This implementation models a custom event bus. It holds subscription lists inside private Maps. It implements wildcard matching by converting string structures (e.g., `'user.*'`) to regex expressions at runtime, evaluates listeners, and uses try/catch blocks to isolate listener errors.

---

---
