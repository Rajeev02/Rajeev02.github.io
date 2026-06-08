## 📦 Section 2: Mobile Data Structures & Practical Scenarios

*⏱️ 1 min read*

- **Queue (Circular Queue) for Turn-Based Actions (Round Robin)**: Ideal for turn-based games or round-robin CPU scheduling. Dequeue the active player, execute their turn, and enqueue them back to the tail in $O(1)$ time.
- **Array for Sequential Storage**: Continual memory locations allow $O(1)$ indexing.
- **Stack for History & Undo Operations**: A Last-In-First-Out (LIFO) stack manages page navigation back buttons (popping the active view) and Ctrl+Z undo buffers.
- **Queue for Scheduling**: First-In-First-Out (FIFO) queue organizes incoming call scheduling or API request execution queues fairly.
- **Hash Map for Phone Book Lookup**: Phone numbers mapped to contacts allow immediate $O(1)$ key searches.
- **Tree for File Systems**: File directories with folders and subfolders are modeled using N-ary Tree structures.
- **Queue in BFS / Stack in DFS**: BFS traverses nodes level-by-level using a FIFO Queue. DFS traverses deep down paths using a LIFO Stack (or recursion stack).
- **Tree in React Reconciliation**: React reconciliation conceptually maps the Virtual DOM using a tree hierarchy and traverses changes in linear $O(N)$ time.

---


---
