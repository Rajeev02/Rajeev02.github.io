## 💻 Section: DSA & Algorithmic Coding (Mobile Optimized)
*⏱️ 1 min read*

Senior mobile interviews often require basic-to-medium DSA to test logical thinking. These are framed in real-world mobile contexts.

### Program 21: Two Pointers / Sliding Window (Transaction Fraud Detection)
**Question**: Given an array of daily transaction amounts and a window size `k`, find the maximum average transaction amount in any contiguous window of `k` days. (Variation of Maximum Average Subarray I).
```typescript
function findMaxAverage(transactions: number[], k: number): number {
    let sum = 0;
    for (let i = 0; i < k; i++) {
        sum += transactions[i];
    }
    
    let maxSum = sum;
    for (let i = k; i < transactions.length; i++) {
        sum = sum - transactions[i - k] + transactions[i];
        maxSum = Math.max(maxSum, sum);
    }
    
    return maxSum / k;
}
```

### Program 22: HashMaps & Arrays (Two Sum / Contact Syncing)
**Question**: You are syncing a user's address book. Given an array of phone numbers (represented as integers for simplicity) and a `target` sum, return the indices of the two numbers that add up to the target.
```typescript
function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
}
```

### Program 23: Trees / Graphs (Nested Folder/Comment Hierarchy)
**Question**: Given a nested folder structure (or Reddit-style comment thread) represented as a tree, write a function to return the maximum depth (depth of the deepest comment thread).
```typescript
class TreeNode {
    val: number;
    children: TreeNode[];
    constructor(val?: number, children?: TreeNode[]) {
        this.val = (val===undefined ? 0 : val);
        this.children = (children===undefined ? [] : children);
    }
}

function maxDepth(root: TreeNode | null): number {
    if (!root) return 0;
    let maxChildDepth = 0;
    for (const child of root.children) {
        maxChildDepth = Math.max(maxChildDepth, maxDepth(child));
    }
    return maxChildDepth + 1;
}
```

---
