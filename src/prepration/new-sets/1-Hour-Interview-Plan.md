# 1-Hour Technical Interview Plan
### React | React Native | JavaScript | TypeScript | Agile | Release/Deployment | Performance | Debugging | DSA

**Total time:** 60 minutes | **Total questions in bank:** 50 (you will realistically ask 12–16 of these live — pick based on candidate level and how deep answers go)

---

## ⏱️ Time-Boxing Overview

| # | Section | Duration | Questions to Ask |
|---|---------|----------|-------------------|
| 1 | Intro & Warm-up | 5 min | 0 (rapport building) |
| 2 | JavaScript Fundamentals | 8 min | 2–3 |
| 3 | TypeScript | 6 min | 2 |
| 4 | React | 10 min | 3 |
| 5 | React Native | 8 min | 2–3 |
| 6 | Performance, Memory Leaks & Optimization | 8 min | 2–3 |
| 7 | Debugging & Bug Fixing | 5 min | 1–2 |
| 8 | Agile Methodology | 4 min | 1–2 |
| 9 | Release / Deployment Process | 4 min | 1–2 |
| 10 | DSA (live, on paper/shared doc) | 8 min | 1 problem |
| 11 | Candidate Q&A / Wrap-up | 4 min | 0 |

**Rule of thumb:** Start every section at Beginner difficulty. If the candidate answers confidently and fast, jump straight to Medium/Advanced in that section and skip the rest of the easy ones — this is how you cover "beginner to advanced" without blowing the clock.

---

## 1. Intro & Warm-up (5 min)
- Walk through their resume/recent project briefly.
- Ask them to describe their role and tech stack on their last project (sets context for which sections to weight heavier).

---

## 2. JavaScript Fundamentals (8 min — ask 2–3)

**Beginner**
1. What is the difference between `var`, `let`, and `const`?
2. Explain the difference between `==` and `===`.
3. What is a closure? Give a simple example.

**Medium**
4. Explain event loop, call stack, microtask vs macrotask queue.
5. What is `this` and how does it behave differently in arrow functions vs regular functions?
6. Explain prototypal inheritance in JS.
7. Difference between `Promise.all`, `Promise.race`, `Promise.allSettled`.

**Advanced**
8. How does JavaScript garbage collection work (mark-and-sweep)?
9. Explain debounce vs throttle — implement one on the spot.
10. What causes memory leaks in JS closures and how would you avoid them?

---

## 3. TypeScript (6 min — ask 2)

**Beginner**
11. What are the benefits of TypeScript over JavaScript?
12. Difference between `interface` and `type`.

**Medium**
13. What are generics? Give an example use case.
14. Explain `unknown` vs `any` vs `never`.
15. What are utility types like `Partial`, `Pick`, `Omit`, `Record`?

**Advanced**
16. Explain discriminated unions and how they help with type narrowing.
17. How would you type a higher-order function or a React custom hook with generics?

---

## 4. React (10 min — ask 3)

**Beginner**
18. What is the Virtual DOM and why does React use it?
19. Difference between state and props.
20. What are keys in lists and why are they important?

**Medium**
21. Explain `useEffect` — dependency array behavior and cleanup function.
22. Difference between `useMemo` and `useCallback`, when would you use each?
23. What causes unnecessary re-renders and how do you prevent them (React.memo, memoization)?
24. Explain Context API vs prop drilling vs state management libraries (Redux/Zustand).

**Advanced**
25. Explain React reconciliation and fiber architecture at a high level.
26. How does React batching work (React 18 automatic batching)?
27. Design a custom hook for data fetching with caching/retry logic — talk through approach.
28. How would you handle error boundaries and where do they not work (e.g., async errors)?

---

## 5. React Native (8 min — ask 2–3)

**Beginner**
29. How does React Native rendering differ from React web (native components vs DOM)?
30. What is the purpose of `FlatList` over `.map()` rendering a list?

**Medium**
31. Explain the old Bridge architecture vs the New Architecture (JSI, Fabric, TurboModules).
32. How do you handle platform-specific code (`Platform.OS`, `.ios.js`/`.android.js`)?
33. How do you optimize FlatList performance for long lists (getItemLayout, windowSize, removeClippedSubviews)?

**Advanced**
34. How would you debug a native crash vs a JS-side crash?
35. How do you handle deep linking and push notifications across iOS/Android?
36. Explain how you'd profile and fix a laggy animation or slow screen transition in RN.

---

## 6. Performance, Memory Leaks & Optimization (8 min — ask 2–3)

**Beginner**
37. What are common causes of a web/app page loading slowly?
38. What tools do you use to check performance (Chrome DevTools, React DevTools Profiler, Flipper)?

**Medium**
39. What is a memory leak? Give 2–3 real examples you've encountered (uncleared timers/listeners, detached DOM nodes, closures holding references).
40. How do you identify a memory leak using Chrome DevTools heap snapshots?
41. Explain code-splitting and lazy loading — how have you implemented it?

**Advanced**
42. Walk through a real performance issue you fixed — root cause, diagnosis steps, and fix.
43. How do you optimize bundle size (tree-shaking, dynamic imports, analyzing bundle with source-map-explorer/webpack-bundle-analyzer)?

---

## 7. Debugging & Bug Fixing (5 min — ask 1–2)

**Beginner**
44. Walk me through your general approach when you get a bug report with no repro steps.

**Medium**
45. Describe the most difficult/intermittent bug you've fixed — how did you isolate it?

**Advanced**
46. How do you debug a production-only issue that doesn't reproduce locally (logging strategy, source maps, remote debugging, feature flags)?

---

## 8. Agile Methodology (4 min — ask 1–2)

**Beginner**
47. What is a sprint, and what happens in a sprint planning/retro/standup?

**Medium**
48. How do you handle scope creep or a mid-sprint urgent bug in an Agile team?

---

## 9. Release / Deployment Process (4 min — ask 1–2)

**Beginner**
49. Walk me through your typical CI/CD pipeline (build → test → staging → prod).

**Medium/Advanced**
50. How do you handle a rollback if a bad release goes to production? Have you used feature flags, canary releases, or blue-green deployments?

---

## 10. DSA — Live Coding (8 min, 1 problem)

Pick **one**, matched to level:

**Beginner:** Reverse a string / find duplicates in an array.
**Medium:** Two Sum, or "find first non-repeating character in a string."
**Advanced:** Detect a cycle in a linked list, or "find the longest substring without repeating characters."

*Evaluate:* problem-solving approach, edge cases, time/space complexity discussion — not just a working answer.

---

## 11. Wrap-up (4 min)
- Ask if they have questions about the role/team.
- Give a rough sense of next steps/timeline.

---

## 📝 Interviewer Tips
- **Calibrate fast:** the first 1–2 answers per section tell you the candidate's true level — don't waste time on easy questions if they're clearly senior.
- **Prioritize based on role:** if hiring for RN-heavy role, steal 2–3 min from JS/TS section and give it to React Native.
- **Score as you go:** rate each section 1–5 immediately after, don't wait until the end.
- **Leave DSA last:** if you're running short on time, this is the section to trim to 5 min or make it a quick verbal walkthrough instead of full coding.
