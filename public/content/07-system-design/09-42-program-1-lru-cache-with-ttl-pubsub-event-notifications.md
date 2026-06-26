> 🎯 **Topic:** 4.2 🧠 Program 1: LRU Cache with TTL & PubSub Event Notifications
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## 4.2 🧠 Program 1: LRU Cache with TTL & PubSub Event Notifications
*⏱️ 2 min read*

### Problem Statement
In a high-performance React Native application, you need to implement a client-side memory cache for API responses. To prevent memory leaks and stale data, the cache must combine three distinct concepts:
1. **Least Recently Used (LRU) Eviction Policy**: Keep maximum cache capacity capped at $C$ items. Evictions of the least recently accessed item must execute in $O(1)$ time.
2. **Time-To-Live (TTL) Expiration**: Each key must be configured with a expiration timer (in milliseconds). When a key expires, it must be automatically evicted and its memory reclaimed.
3. **PubSub Event Notifications**: Introduce a publish-subscribe system allowing UI components or logging services to subscribe to cache actions (`'set'`, `'get'`, `'evict'`, `'expire'`).

---

### Implementation (JavaScript)

```javascript
class Node {
  constructor(key, value, ttl) {
    this.key = key;
    this.value = value;
    this.expiryTime = Date.now() + ttl;
    this.timer = null;
    this.prev = null;
    this.next = null;
  }
}

class LRUCacheWithTTL {
  constructor(capacity, defaultTTL = 60000) {
    this.capacity = capacity;
    this.defaultTTL = defaultTTL;
    this.map = new Map(); // Key -> Node
    this.head = new Node(null, null, 0); // Sentinel head
    this.tail = new Node(null, null, 0); // Sentinel tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
    
    // PubSub events store
    this.subscribers = {
      set: [],
      get: [],
      evict: [],
      expire: []
    };
  }

  // --- PubSub Methods ---
  subscribe(event, callback) {
    if (!this.subscribers[event]) return () => {};
    this.subscribers[event].push(callback);
    // Return unsubscribe function for cleanup in React useEffect
    return () => {
      this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
    };
  }

  publish(event, payload) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach(callback => callback(payload));
    }
  }

  // --- Doubly Linked List Operations ---
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _moveToHead(node) {
    this._remove(node);
    this._addToHead(node);
  }

  // --- Cache Operations ---
  get(key) {
    if (!this.map.has(key)) {
      return null;
    }
    const node = this.map.get(key);
    
    // Check if item has expired
    if (Date.now() > node.expiryTime) {
      this._expireNode(key);
      return null;
    }
    
    this._moveToHead(node);
    this.publish('get', { key, value: node.value });
    return node.value;
  }

  set(key, value, ttl = this.defaultTTL) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      clearTimeout(node.timer);
      node.value = value;
      node.expiryTime = Date.now() + ttl;
      this._moveToHead(node);
      this._setupExpirationTimer(node, ttl);
      this.publish('set', { key, value, ttl });
      return;
    }

    if (this.map.size >= this.capacity) {
      const tailNode = this.tail.prev;
      this._evict(tailNode.key);
    }

    const newNode = new Node(key, value, ttl);
    this.map.set(key, newNode);
    this._addToHead(newNode);
    this._setupExpirationTimer(newNode, ttl);
    this.publish('set', { key, value, ttl });
  }

  _setupExpirationTimer(node, ttl) {
    node.timer = setTimeout(() => {
      this._expireNode(node.key);
    }, ttl);
  }

  _expireNode(key) {
    if (!this.map.has(key)) return;
    const node = this.map.get(key);
    clearTimeout(node.timer);
    this._remove(node);
    this.map.delete(key);
    this.publish('expire', { key, value: node.value });
  }

  _evict(key) {
    if (!this.map.has(key)) return;
    const node = this.map.get(key);
    clearTimeout(node.timer);
    this._remove(node);
    this.map.delete(key);
    this.publish('evict', { key, value: node.value });
  }
}
```

---

### Complexity Analysis
- **Time Complexity**:
  - `get(key)`: $O(1)$ lookup via Hash Map, $O(1)$ DLL node rearrangement.
  - `set(key, value)`: $O(1)$ insertion, $O(1)$ DLL rearrangement, and $O(1)$ timer scheduling.
  - Expiration / Eviction triggers: $O(1)$ node deletions.
- **Space Complexity**: $O(C)$ where $C$ is the capacity limit. The Map and DLL store at most $C$ items at any given moment.

---

---
