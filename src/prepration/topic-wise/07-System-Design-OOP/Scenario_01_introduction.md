# 🛠️ Section 3: Scenario-Based Coding Algorithms (40+ Problems)

*⏱️ 2 min read*

### Array Algorithms
- **First Non-Repeating Element**: Loop through once to populate a frequency map, then loop a second time to find the first element with a count of 1.
- **Second Largest Number**: Traverse the array tracking two variables (`first` and `second`). If `num > first`, shift `first` to `second` and update `first`.
- **Move Zeros to End**: Use a write pointer `insertPos`. Iterate through the array; if an element is non-zero, swap it with the element at `insertPos` and increment `insertPos`.
- **Rotate Array by K**: Reverse the entire array, reverse the first $K$ elements, and then reverse the remaining $N-K$ elements in $O(1)$ auxiliary space.
- **Find Missing Number**: Calculate the expected arithmetic sum from $1$ to $N$ using $\frac{N(N+1)}{2}$ and subtract the actual array sum.

### String Algorithms
- **Check Palindrome**: Run two pointers from the outer ends (`left`, `right`) meeting at the center, asserting character equality.
- **Reverse Words**: Split the string by spaces, swap elements using two pointers meeting in the middle, and join them back.
- **Duplicate Characters**: Count character occurrences inside a Map and filter keys with counts greater than 1.
- **Check Anagram**: Build a frequency count map from the first string. Decrement counts for each character in the second string. If any count reaches negative or character is missing, they are not anagrams.

### HashMap Algorithms
- **Highest Frequency Element**: Build a frequency map and track the key that holds the maximum count.
- **Group Anagrams**: Sort each string alphabetically. Use the sorted string as a Hash Map key to group matching anagrams in an array.

### Stack & Queue Algorithms
- **Valid Parentheses**: Iterate through characters. Push opening brackets onto a stack. For closing brackets, pop from the stack and assert they match.
- **Min Stack Design**: Keep an auxiliary stack (`minStack`) that stores the minimum values. On a `push(val)`, if the value is less than or equal to the top of `minStack`, push it onto `minStack`.
- **Implement Queue using Stacks**: Use two stacks: `stack1` for enqueue and `stack2` for dequeue. If `stack2` is empty, pop all elements from `stack1` and push them onto `stack2`.

### Linked List & Tree Algorithms
- **Reverse Linked List**: Use three pointers (`prev`, `curr`, `nextNode`) to swap node links in place.
- **Detect Loop (Floyd's Cycle)**: Move a slow pointer by 1 node and a fast pointer by 2 nodes. If they meet, a cycle exists.
- **BST Validation**: Recursively validate that nodes fall between a dynamic `min` and `max` range.

---
