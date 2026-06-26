> 🎯 **Topic:** 4.4 🔍 Program 3: Prefix Auto-Suggestions Trie with Priority Heap & Input Debouncing
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** 🔥 Must Revise

---


## 4.4 🔍 Program 3: Prefix Auto-Suggestions Trie with Priority Heap & Input Debouncing
*⏱️ 2 min read*

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

---

### 🛠️ Section 3: Scenario-Based Coding Algorithms (40+ Problems)

