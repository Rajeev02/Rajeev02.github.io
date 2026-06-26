> 🎯 **Topic:** LRU Cache Implementation
> 📊 **Difficulty:** Hard | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** DSA, Cache, Mobile

---

## LRU Cache (Least Recently Used)

*⏱️ 15 min read*

### Overview
An LRU (Least Recently Used) Cache is a common data structure question in mobile engineering interviews because it directly maps to real-world scenarios, such as caching images or network responses on a device with limited memory.

When the cache reaches its capacity, it must evict the least recently used item before adding a new one.

### Optimal Implementation
To achieve `O(1)` time complexity for both `get` and `put` operations, we need a combination of:
1. A **Hash Map** (to store key-node pairs for `O(1)` lookup).
2. A **Doubly Linked List** (to maintain the order of usage and allow `O(1)` removal/insertion).

### TypeScript Implementation

```typescript
class Node {
  key: number;
  val: number;
  prev: Node | null;
  next: Node | null;

  constructor(key: number, val: number) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

export class LRUCache {
  capacity: number;
  cache: Map<number, Node>;
  head: Node;
  tail: Node;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cache = new Map();

    // Dummy head and tail to avoid edge cases
    this.head = new Node(-1, -1);
    this.tail = new Node(-1, -1);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private remove(node: Node) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insertRight(node: Node) {
    const prev = this.tail.prev!;
    const next = this.tail;

    prev.next = node;
    next.prev = node;
    node.next = next;
    node.prev = prev;
  }

  get(key: number): number {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      // Move to most recently used (tail)
      this.remove(node);
      this.insertRight(node);
      return node.val;
    }
    return -1;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key)!);
    }
    
    const newNode = new Node(key, value);
    this.cache.set(key, newNode);
    this.insertRight(newNode);

    if (this.cache.size > this.capacity) {
      // Evict LRU (node right after head)
      const lru = this.head.next!;
      this.remove(lru);
      this.cache.delete(lru.key);
    }
  }
}
```

### Interview Questions & Answers

#### Q1. Why use a Doubly Linked List instead of a standard Array for tracking usage?
**Answer:**
If we used an array to track usage, moving an accessed item to the front or back of the array would require shifting elements, resulting in an `O(N)` time complexity. A doubly linked list allows us to remove an element from anywhere in the list and append it to the end in `O(1)` time, provided we have a direct pointer to the node (which the Hash Map provides).

#### Q2. How is this used practically in a React Native app?
**Answer:**
This logic is the foundation of image caching libraries like `react-native-fast-image` (via SDWebImage/Glide). Mobile devices have strict memory limits. If a user scrolls through a feed with 1,000 images, keeping them all in RAM will cause an Out Of Memory (OOM) crash. An LRU cache holds only a fixed number of images in memory, automatically dropping the ones that haven't been seen recently.
