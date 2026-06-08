
## Page Summary
### Reading Time
`2 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 14: Mobile Device Token Deduplicator (CleanTokens) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 14: Mobile Device Token Deduplicator (CleanTokens)
*⏱️ 1 min read*

### Question
Write a function `cleanTokens(sessions)` in JavaScript that takes an array of mobile session objects containing push notification tokens. The function must filter out invalid tokens (such as `null`, `undefined`, or empty string tokens), ignore inactive sessions, remove duplicate tokens, and return a sorted array of clean tokens.

### Sample Input & Output
#### Input:
```javascript
const sessions = [
  { sessionId: "s1", token: "tok_abc", isActive: true },
  { sessionId: "s2", token: null, isActive: true },
  { sessionId: "s3", token: "tok_xyz", isActive: false },
  { sessionId: "s4", token: "tok_abc", isActive: true }, // Duplicate
  { sessionId: "s5", token: "  tok_def  ", isActive: true } // Needs trimming
];
```
#### Output:
```javascript
["tok_abc", "tok_def"]
```

### Code
```javascript
// Time: O(n log(n)) due to sort | Space: O(n) sets and outputs
function cleanTokens(sessions) {
  if (!sessions || !Array.isArray(sessions)) return [];

  const uniqueTokens = new Set();

  for (const session of sessions) {
    // 1. Verify session object exists and is active
    if (session && session.isActive !== false) {
      const token = session.token;
      
      // 2. Validate token is a non-empty string
      if (typeof token === 'string') {
        const trimmedToken = token.trim();
        if (trimmedToken.length > 0) {
          uniqueTokens.add(trimmedToken);
        }
      }
    }
  }

  // 3. Convert Set back to Array and sort alphabetically
  return Array.from(uniqueTokens).sort();
}
```

### Complexity & Explanation
- **Time Complexity**: $O(N \log N)$ where $N$ is the number of clean tokens (due to the final sorting operation).
- **Space Complexity**: $O(N)$ to allocate clean arrays and deduplication sets.
- **Explanation**: Cleans, deduplicates, and sorts session notification tokens. It ignores inactive accounts, validates that tokens are non-empty strings, trims whitespaces, filters duplicates using a `Set`, and outputs sorted alphabetical arrays.

---
