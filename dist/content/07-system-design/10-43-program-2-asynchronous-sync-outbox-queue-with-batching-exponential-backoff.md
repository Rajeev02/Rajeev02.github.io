> 🎯 **Topic:** 4.3 📡 Program 2: Asynchronous Sync Outbox Queue with Batching & Exponential Backoff
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## 4.3 📡 Program 2: Asynchronous Sync Outbox Queue with Batching & Exponential Backoff
*⏱️ 2 min read*

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

---
