## Program 16: Paginated Transaction Amount Aggregator
*⏱️ 1 min read*

### Question
Write an asynchronous function `aggregateTransactions(apiEndpoint, pagesCount)` that fetches transaction list data across multiple pages sequentially or concurrently using `fetch()`. The function must sum the `amount` fields of all transaction nodes and return the total sum.

### Sample Input & Output
#### Input:
```javascript
// Each page response schema:
{
  data: [
    { id: 1, amount: 120.50 },
    { id: 2, amount: 80.00 }
  ]
}
```
#### Output (for 2 pages):
```javascript
200.50 // Sum of all transactions amounts
```

### Code
```javascript
// Time: O(pages * itemsPerPage) | Space: O(pages) promise queues
async function aggregateTransactions(apiEndpoint, pagesCount) {
  let totalSum = 0;
  const fetchPromises = [];

  for (let page = 1; page <= pagesCount; page++) {
    // 1. Queue all request promises for concurrent execution
    const pageUrl = `${apiEndpoint}?page=${page}`;
    
    const pagePromise = fetch(pageUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        return res.json();
      })
      .then((payload) => {
        // 2. Sum elements locally inside promise resolve callback
        let pageSum = 0;
        if (payload && Array.isArray(payload.data)) {
          payload.data.forEach((tx) => {
            if (tx && typeof tx.amount === 'number') {
              pageSum += tx.amount;
            }
          });
        }
        return pageSum;
      })
      .catch((err) => {
        console.error(`Failed to fetch transactions on page ${page}:`, err);
        return 0; // Fallback to 0 if a single page fails
      });

    fetchPromises.push(pagePromise);
  }

  // 3. Resolve all promises concurrently
  const pageSums = await Promise.all(fetchPromises);
  totalSum = pageSums.reduce((acc, sum) => acc + sum, 0);

  return totalSum;
}
```

### Complexity & Explanation
- **Time Complexity**: $O(P \times M)$ where $P$ is the page count and $M$ is the average number of transaction items per page.
- **Space Complexity**: $O(P)$ promises collection buffer.
- **Explanation**: Fetches data from paginated API endpoints concurrently by building a promise queue. It uses `Promise.all` to execute request threads simultaneously and aggregates values using array accumulation.

---
