import json
import re

# Read the existing embedded_data.js
with open("public/prepration/embedded_data.js", "r", encoding="utf-8") as f:
    content = f.read()

# We need to extract the JSON object from `const embeddedFileData = { ... };`
# using regex or string manipulation.
start_idx = content.find('{')
end_idx = content.rfind('}') + 1

json_str = content[start_idx:end_idx]
try:
    data = json.loads(json_str)
except Exception as e:
    # If it fails to parse as strict JSON (due to trailing commas or missing quotes in keys),
    # we'll do a string-based injection instead.
    print("Could not parse as strict JSON. Using string injection.")
    data = None

# We will inject the new category at the top of the object.
new_category = "00-Platform-Architecture"
new_files = [
    {
        "name": "01_Role_and_Goal.md",
        "type": "md",
        "content": "# Platform Role & Primary Goal\n\n## Role\nAct as a Principal Software Architect, Senior React Native Engineer, Senior Technical Interviewer, Staff Mobile Engineer, Technical Writer, Learning Experience Designer (LXD), and Documentation Architect.\n\nYour task is to build a complete Interactive Interview Preparation Platform, not merely documentation.\n\nThe final output must feel like a professional documentation website similar to Microsoft Learn, React Docs, Android Developers, or MDN, but dedicated to interview preparation.\n\nThe platform should be useful for:\n* Freshers\n* Junior Engineers\n* Mid-Level Engineers\n* Senior Engineers\n* Staff Engineers\n* Principal Engineers\n* Engineering Managers\n* Mobile Architects\n\nEvery page must be production-quality.\n\n---\n\n## Primary Goal\nCreate the world's most comprehensive interview preparation platform for software engineers.\n\nThe platform should allow users to:\n* Learn concepts deeply\n* Revise quickly before interviews\n* Practice scenario-based questions\n* Practice coding\n* Understand production use cases\n* Prepare company-wise\n* Learn architecture\n* Improve debugging skills\n* Master system design\n\n> [!IMPORTANT]\n> This is NOT a note-taking application. This is NOT a documentation website. This is an **Interactive Learning Platform**."
    },
    {
        "name": "02_Design_Principles.md",
        "type": "md",
        "content": "# Design Principles & Output Quality\n\n## Core Principles\nEvery page must be:\n- Professional\n- Interactive\n- Searchable\n- Filterable\n- Collapsible\n- Easy to navigate\n- Beautifully formatted\n- Responsive\n- Dark Mode Friendly\n- Print Friendly\n- Markdown Compatible\n- Accessible\n- Performance Optimized\n- SEO Friendly\n- Keyboard Navigable\n\n---\n\n## Output Quality\nEvery page must be:\n- Interview Ready\n- Production Ready\n- Educational\n- Technically Accurate\n- Consistent\n- Well Structured\n- Easy to Navigate\n- Rich with practical examples\n- Rich with real-world scenarios\n- Suitable for engineers from beginner to architect level.\n\nNever leave sections empty. If a section is not applicable, explicitly state why.\n\nMaintain the same structure across every topic so learners always know where to find information."
    },
    {
        "name": "03_Information_Architecture.md",
        "type": "md",
        "content": "# Information Architecture\n\n## Sidebar Structure\n\n```text\nInterview Hub\n\u2502\n\u251c\u2500\u2500 Dashboard\n\u251c\u2500\u2500 Learning Paths\n\u251c\u2500\u2500 Interview Roadmap\n\u251c\u2500\u2500 Quick Revision\n\u251c\u2500\u2500 Mock Interviews\n\u251c\u2500\u2500 Company Wise\n\u251c\u2500\u2500 Topics\n\u2502      \u251c\u2500\u2500 JavaScript\n\u2502      \u251c\u2500\u2500 TypeScript\n\u2502      \u251c\u2500\u2500 React\n\u2502      \u251c\u2500\u2500 React Native\n\u2502      \u251c\u2500\u2500 RN New Architecture\n\u2502      \u251c\u2500\u2500 Android\n\u2502      \u251c\u2500\u2500 iOS\n\u2502      \u251c\u2500\u2500 State Management\n\u2502      \u251c\u2500\u2500 Networking\n\u2502      \u251c\u2500\u2500 Performance\n\u2502      \u251c\u2500\u2500 Security\n\u2502      \u251c\u2500\u2500 Offline Support\n\u2502      \u251c\u2500\u2500 Firebase\n\u2502      \u251c\u2500\u2500 Deep Linking\n\u2502      \u251c\u2500\u2500 Push Notifications\n\u2502      \u251c\u2500\u2500 Testing\n\u2502      \u251c\u2500\u2500 CI/CD\n\u2502      \u251c\u2500\u2500 Deployment\n\u2502      \u251c\u2500\u2500 GraphQL\n\u2502      \u251c\u2500\u2500 REST\n\u2502      \u251c\u2500\u2500 Design Patterns\n\u2502      \u251c\u2500\u2500 System Design\n\u2502      \u251c\u2500\u2500 Mobile Architecture\n\u2502      \u251c\u2500\u2500 Clean Architecture\n\u2502      \u251c\u2500\u2500 SOLID\n\u2502      \u251c\u2500\u2500 OOP\n\u2502      \u251c\u2500\u2500 Algorithms\n\u2502      \u251c\u2500\u2500 Data Structures\n\u2502      \u251c\u2500\u2500 Behavioral\n\u2502      \u251c\u2500\u2500 Leadership\n\u2502      \u2514\u2500\u2500 HR\n\u251c\u2500\u2500 Coding Problems\n\u251c\u2500\u2500 Scenario Questions\n\u251c\u2500\u2500 Flash Cards\n\u251c\u2500\u2500 Cheat Sheets\n\u251c\u2500\u2500 Progress\n\u2514\u2500\u2500 Bookmarks\n```\n\n## Reading Modes\nEvery page must support multiple viewing modes without duplicating content:\n1. **Cheat Sheet Mode**: Ultra-concise summary for last-minute revision. (2\u20135 min)\n2. **Short Interview Answer Mode**: 30-second, 1-minute, and 5-minute verbal responses.\n3. **Detailed Explanation Mode**: Full theory, diagrams, and best practices. (15\u201330 min)\n4. **Examples Only Mode**: Simple, intermediate, advanced, production, enterprise, bad, and optimized examples.\n5. **Scenario Mode**: Beginner to architect-level scenario questions and solutions.\n6. **Coding Mode**: Coding problems, solutions, complexity analysis, and optimizations.\n7. **Complete Guide Mode**: Shows every section of the topic."
    },
    {
        "name": "04_Search_and_Filters.md",
        "type": "md",
        "content": "# Search and Filters\n\n## Global Search\nSupport searching by:\n- Topic\n- Question\n- Keyword\n- Company\n- Difficulty\n- Technology\n- Tags\n- Interview Round\n- Reading Time\n\n## Filters\n\n**Company**\nAmazon | Google | Meta | Microsoft | Netflix | Uber | PhonePe | Flipkart | Swiggy | Razorpay | Meesho | Walmart | Oracle | Salesforce | Atlassian | Adobe\n\n**Experience Level**\nFresher | Junior | Mid | Senior | Staff | Principal\n\n**Difficulty**\nEasy | Medium | Hard | Expert\n\n**Question Type**\nTheory | Scenario | Coding | Architecture | Debugging | Behavioral | Security | Performance | Optimization\n\n**Category**\nReact | React Native | JavaScript | TypeScript | Android | iOS | Node.js | System Design\n\n**Reading Mode**\nCheat Sheet | Interview Answer | Examples Only | Scenario Only | Coding Only | Complete Guide\n\n**Reading Time**\n<5 min | 5\u201310 min | 10\u201320 min | 20+ min"
    },
    {
        "name": "05_Topic_Template.md",
        "type": "md",
        "content": "# The 71-Point Topic Template\n\nEvery topic MUST follow this identical template:\n\n1. Overview\n2. Difficulty\n3. Interview Frequency\n4. Companies Asking This\n5. Prerequisites\n6. Estimated Reading Time (Cheat Sheet, Short Answer, Detailed Guide, Complete Guide)\n7. Learning Objectives\n8. Real World Importance\n9. Definition\n10. Why It Exists\n11. Problem It Solves\n12. How It Works\n13. Internal Working\n14. Architecture Diagram\n15. Execution Flow\n16. Lifecycle\n17. Syntax\n18. Basic Example\n19. Intermediate Example\n20. Advanced Example\n21. Production Example\n22. Enterprise Example\n23. Real Project Example\n24. Bad Example\n25. Optimized Example\n26. Performance Analysis\n27. Memory Analysis\n28. Time Complexity\n29. Space Complexity\n30. Best Practices\n31. Common Mistakes\n32. Debugging Guide\n33. Edge Cases\n34. Interview Traps\n35. Frequently Asked Questions\n36. 30 Second Interview Answer\n37. 1 Minute Interview Answer\n38. 5 Minute Interview Answer\n39. Detailed Interview Answer\n40. Architect Level Discussion\n41. React Native Perspective\n42. Android Perspective\n43. iOS Perspective\n44. Backend Perspective (if applicable)\n45. Security Considerations\n46. Accessibility Considerations\n47. Offline Considerations\n48. Testing Strategy\n49. Unit Testing Example\n50. Integration Testing Example\n51. E2E Testing Example\n52. Comparison Table\n53. Advantages\n54. Disadvantages\n55. Trade-offs\n56. When To Use\n57. When NOT To Use\n58. Related Topics\n59. Interview Follow-up Questions\n60. Scenario Based Questions\n61. Coding Challenge\n62. Live Coding Solution\n63. Production Debugging Scenario\n64. Senior Interview Discussion\n65. Staff Engineer Discussion\n66. Architect Discussion\n67. Revision Notes\n68. Cheat Sheet\n69. Flash Cards\n70. Key Takeaways\n71. References"
    },
    {
        "name": "06_Content_Modules.md",
        "type": "md",
        "content": "# Specialized Content Modules\n\n## Examples Module\nEvery topic must contain:\n- Simple Example\n- Intermediate Example\n- Advanced Example\n- Production Example\n- Enterprise Example\n- Incorrect Example\n- Optimized Example\n\nEvery example must include:\n- Explanation\n- Output\n- Diagram (where applicable)\n- Time/Space Complexity\n- Interview Tips\n\n## Scenario Questions Module\nEvery topic must include at least:\n- 10 Beginner Scenarios\n- 10 Intermediate Scenarios\n- 10 Senior Scenarios\n- 10 Architect Scenarios\n\nEach scenario should include: Question, Expected Thinking, Ideal Answer, Common Mistakes, Follow-up Questions.\n\n## Interview Answers Module\nEvery concept must include:\n- 30 second answer\n- 1 minute answer\n- 2 minute answer\n- 5 minute answer\n- Detailed explanation\n- Whiteboard explanation\n- Architect explanation\n\n## Company Specific Module\nShow Frequently asked at Amazon, Google, Meta, Microsoft, Uber, PhonePe, Flipkart. Include company-specific follow-up questions whenever possible.\n\n## Visual Learning Module\nInclude: Architecture diagrams, Execution flow diagrams, Sequence diagrams, State diagrams, Lifecycle diagrams, Memory diagrams, Rendering diagrams, Animation timelines, Decision trees, Comparison tables.\n\n## Coding Questions Module\nEvery topic should contain: Basic Question, Intermediate Question, Senior Question, Optimized Solution, Alternative Solution, Complexity Analysis."
    },
    {
        "name": "07_Learning_Features.md",
        "type": "md",
        "content": "# Interactive Learning Features\n\n## Quick Revision\nEach topic automatically generates:\n- 2 Minute Revision\n- 5 Minute Revision\n- 10 Minute Revision\n- 15 Minute Revision\n\n## Flash Cards\nEvery important point should generate:\n- Question\n- Answer\n- Hint\n\n## Mock Interview Mode\nEach topic should simulate:\n- Interviewer Question\n- Candidate Thinking Time\n- Ideal Answer\n- Follow-up\n- Senior Follow-up\n- Architect Follow-up\n\n## Progress Tracking\nSupport:\n- Completion %\n- Bookmarks\n- Favorites\n- Last Read\n- Study Time\n- Estimated Remaining Time"
    }
]

# We will inject it manually via string manipulation to avoid breaking the JS wrapper
# The file starts with: const embeddedFileData = {
# We want to insert: "00-Platform-Architecture": [...],
# right after the opening brace.

injection_str = '"00-Platform-Architecture": ' + json.dumps(new_files, indent=2) + ',\n  '

new_content = content[:start_idx+1] + '\n  ' + injection_str + content[start_idx+1:]

with open("public/prepration/embedded_data.js", "w", encoding="utf-8") as f:
    f.write(new_content)

print("Successfully injected Platform Architecture PRD into embedded_data.js")
