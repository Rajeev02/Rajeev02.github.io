## Program 17: Batch Concurrent Promise Coordinator (Network Throttler)
*⏱️ 1 min read*

### Question
Write a utility wrapper function `batchPromises(tasks, batchSize)` that coordinates a large queue of asynchronous promise-returning tasks. The utility must run at most `batchSize` tasks concurrently, starting new tasks immediately as running ones resolve, preventing server rate-limiting.

### Sample Input & Output
#### Input:
- 10 task functions: `[task1, task2, ..., task10]` (each taking 100ms to resolve)
- `batchPromises(tasks, 3)`
#### Output:
Executes tasks concurrently in active batches of 3. Resolves all tasks and returns the outputs array sequentially once complete, completing in roughly 400ms rather than 1000ms (sequential) or overloading with 10 concurrent hits.

### Code
```javascript
// Time: O(tasksCount) | Space: O(tasksCount + batchSize) outputs & tracking queues
async function batchPromises(tasks, batchSize) {
  const results = new Array(tasks.length);
  let nextTaskIndex = 0;

  // Worker generator thread that pulls tasks from queue continuously
  async function worker() {
    while (nextTaskIndex < tasks.length) {
      const currentIndex = nextTaskIndex;
      nextTaskIndex++; // Advance index atomically

      try {
        // Execute the promise-returning task function
        results[currentIndex] = await tasks[currentIndex]();
      } catch (err) {
        results[currentIndex] = { error: err }; // Store rejection outputs
      }
    }
  }

  // Spawn concurrent workers up to batch limit
  const workers = [];
  const activeWorkersCount = Math.min(batchSize, tasks.length);
  for (let i = 0; i < activeWorkersCount; i++) {
    workers.push(worker());
  }

  // Wait for all worker streams to finish queue processing
  await Promise.all(workers);
  return results;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(T)$ where $T$ is the number of asynchronous tasks.
- **Space Complexity**: $O(T + B)$ where $T$ is the results array and $B$ is the number of concurrent worker processes.
- **Explanation**: Coordinates and throttles async task processing. It spawns up to `batchSize` worker promises. Each worker continuously pulls the next unexecuted task index, awaits the promise response, maps the outcome to the results array, and proceeds until all tasks are completed.
