<!-- INDEX_START -->
<details>
  <summary>📖 <b>Table of Contents (Click to expand)</b></summary>

- [🧠 Program 1: LRU Cache with TTL & PubSub Event Notifications](#-program-1-lru-cache-with-ttl--pubsub-event-notifications)
- [📡 Program 2: Asynchronous Sync Outbox Queue with Batching & Exponential Backoff](#-program-2-asynchronous-sync-outbox-queue-with-batching--exponential-backoff)
- [🔍 Program 3: Prefix Auto-Suggestions Trie with Priority Heap & Input Debouncing](#-program-3-prefix-auto-suggestions-trie-with-priority-heap--input-debouncing)
</details>
<!-- INDEX_END -->

## 🧠 Program 1: LRU Cache with TTL & PubSub Event Notifications
*⏱️ 15 min read*

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

## 📡 Program 2: Asynchronous Sync Outbox Queue with Batching & Exponential Backoff
*⏱️ 15 min read*

### Problem Statement
In an offline-first mobile app, users can create and edit data transactions (like orders or chat messages) when network connectivity is lost. You must write a robust, asynchronous **Sync Outbox Manager** that:
1. **Outbox Action Stacking**: Local modifications are stacked as structured actions `{ id, endpoint, payload, attempts: 0 }`.
2. **Dynamic Batching**: Periodically processes queued operations in batches (e.g., maximum 3 operations per outbound HTTP POST API call).
3. **Exponential Backoff Retries**: If a network request fails (network error or `5xx Server Error`), retry the specific batch using an exponential backoff timing algorithm (e.g., $Base \times 2^{attempts}$ milliseconds) up to a max attempt count.
4. **Local State Persistence Sync**: Persistence triggers to save remaining queue states to local storage (mocked) upon any state mutation.

---

### Implementation (JavaScript)

```javascript
class SyncOutboxManager {
  constructor(apiClient, storageMock, batchSize = 3, maxAttempts = 5) {
    this.apiClient = apiClient;
    this.storageMock = storageMock;
    this.batchSize = batchSize;
    this.maxAttempts = maxAttempts;
    this.queue = [];
    this.isProcessing = false;
  }

  // --- Outbox Management ---
  async addAction(endpoint, payload) {
    const action = {
      id: Math.random().toString(36).substr(2, 9),
      endpoint,
      payload,
      attempts: 0
    };
    this.queue.push(action);
    await this._persistQueue();
    this.triggerSync();
  }

  async _persistQueue() {
    await this.storageMock.setItem('outbox_queue', JSON.stringify(this.queue));
  }

  async loadPersistedQueue() {
    const data = await this.storageMock.getItem('outbox_queue');
    if (data) {
      this.queue = JSON.parse(data);
    }
  }

  // --- Async Processing Loop ---
  async triggerSync() {
    if (this.isProcessing || this.queue.length === 0) return;
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      // 1. Slice out a batch of actions
      const batch = this.queue.slice(0, this.batchSize);
      console.log(`Processing batch of ${batch.length} actions...`);
      
      try {
        // 2. Dispatch batch request
        await this.apiClient.sendBatch(batch);
        
        // 3. Success: Remove batch from queue
        this.queue.splice(0, batch.length);
        await this._persistQueue();
        console.log(`Successfully synced ${batch.length} items.`);
      } catch (error) {
        console.error("Batch sync failed. Initializing backoff...", error.message);
        
        // 4. Failure: Apply exponential backoff and retry limits on the current batch
        const failedAction = batch[0];
        failedAction.attempts++;
        
        if (failedAction.attempts >= this.maxAttempts) {
          console.warn(`Action ${failedAction.id} exceeded max retries. Dropping.`);
          this.queue.shift(); // Drop the un-syncable action
          await this._persistQueue();
        } else {
          // Calculate delay: Base 1000ms * 2^attempts
          const delay = 1000 * Math.pow(2, failedAction.attempts);
          console.log(`Retrying in ${delay}ms...`);
          
          this.isProcessing = false; // Pause processing loop
          setTimeout(() => {
            this.triggerSync();
          }, delay);
          return;
        }
      }
    }
    this.isProcessing = false;
  }
}
```

---

### Complexity Analysis
- **Time Complexity**:
  - `addAction`: $O(1)$ queue append, $O(S)$ serialization write to storage (where $S$ is queue size).
  - Batching processing: $O(N / B)$ network round trips (where $N$ is queue size, $B$ is batch limit).
- **Space Complexity**: $O(N)$ memory allocations where $N$ is the count of pending offline transactions.

---

## 🔍 Program 3: Prefix Auto-Suggestions Trie with Priority Heap & Input Debouncing
*⏱️ 15 min read*

### Problem Statement
In a mobile search interface, you need to implement a lightning-fast search suggestions box. Since network latency makes fetching suggestions from the server on every keystroke too slow, you cache candidate query terms locally and resolve searches using a custom client-side pipeline combining:
1. **Trie (Prefix Tree)**: Store query terms (such as "react", "react native", "redux") efficiently.
2. **Frequency-Weighted Suggestions**: Each search term node inside the Trie stores a `frequency` weight. Prefix matching must return suggestions sorted by popularity.
3. **Priority Queue / Max-Heap**: Extracted candidates are sorted using a Max-Heap based on their popularity weights.
4. **Input Debouncer**: Wrap client input query calls in a debounce closure to prevent triggering searches while the user is actively typing.

---

### Implementation (JavaScript)

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
    this.frequency = 0;
    this.wordStr = "";
  }
}

class AutoSuggestTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, frequency = 1) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isWord = true;
    node.frequency = frequency;
    node.wordStr = word;
  }

  // --- Suggestion Prefix Matching ---
  getSuggestions(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return []; // No matches found
      }
      node = node.children[char];
    }

    // Accumulate all descendant leaf nodes representing completed words
    const candidates = [];
    this._dfsCollect(node, candidates);

    // Sort candidates by frequency using a Max-Heap structure conceptually
    const heap = new MaxHeap(candidates);
    const sortedSuggestions = [];
    while (heap.size() > 0 && sortedSuggestions.length < 5) {
      sortedSuggestions.push(heap.extractMax().wordStr);
    }
    return sortedSuggestions;
  }

  _dfsCollect(node, arr) {
    if (node.isWord) {
      arr.push(node);
    }
    for (const child in node.children) {
      this._dfsCollect(node.children[child], arr);
    }
  }
}

// --- Max-Heap Implementation for Priority Sorting ---
class MaxHeap {
  constructor(arr = []) {
    this.heap = [];
    for (const val of arr) {
      this.insert(val);
    }
  }

  size() {
    return this.heap.length;
  }

  insert(node) {
    this.heap.push(node);
    this._bubbleUp(this.heap.length - 1);
  }

  extractMax() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._sinkDown(0);
    }
    return max;
  }

  _bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIdx];
      if (element.frequency <= parent.frequency) break;
      this.heap[index] = parent;
      index = parentIdx;
    }
    this.heap[index] = element;
  }

  _sinkDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIdx < length) {
        leftChild = this.heap[leftChildIdx];
        if (leftChild.frequency > element.frequency) {
          swap = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        rightChild = this.heap[rightChildIdx];
        if (
          (swap === null && rightChild.frequency > element.frequency) ||
          (swap !== null && rightChild.frequency > leftChild.frequency)
        ) {
          swap = rightChildIdx;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = element;
  }
}

// --- Debouncer Function Wrapper ---
function debounceSearch(searchFn, delay = 300) {
  let timerId = null;
  return function (...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      searchFn.apply(this, args);
    }, delay);
  };
}
```

---

### Complexity Analysis
- **Time Complexity**:
  - Insert query: $O(L)$ where $L$ is the word length.
  - Suggestion traversal (Trie traversal to prefix node): $O(P)$ where $P$ is prefix search length.
  - Candidate extraction: $O(M)$ where $M$ is the number of matching descendant words.
  - Sorting via Max-Heap: $O(M \log M)$ to heapify/extract top 5.
- **Space Complexity**: $O(K \times L)$ where $K$ is total words and $L$ is average word length.
