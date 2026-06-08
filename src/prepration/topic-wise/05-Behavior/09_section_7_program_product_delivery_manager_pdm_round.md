## 📈 Section 7: Program & Product Delivery Manager (PDM) Round

*⏱️ 2 min read*

Product and Delivery Managers evaluate your leadership traits, execution ownership, delivery metrics, and cross-functional collaboration styles.

#### 1. Feature Delivery vs. Technical Debt & Refactoring
- **Question**: *How do you coordinate with Product Managers (PMs) and Delivery Managers (DMs) to balance feature delivery speed vs. technical debt/refactoring?*
- **Answer**:
  I utilize a **Technical Debt Allocation Framework** to prevent discussions from becoming subjective. PMs are driven by business metrics and timelines, while engineers are driven by stability and code hygiene. 
  - I establish data-driven justifications for technical tasks. For example, rather than saying "we need to refactor the payment link modules," I show the business impact: "This refactoring will resolve a dependency bottleneck, which will reduce checkout failure rates by 3% and decrease development time for new integrations by 20%."
  - In our sprint planning sessions, I negotiate a stable **80/20 capacity split**: 80% of resources target user-facing features, and 20% is allocated for refactoring, tooling improvements, library upgrades, and unit test coverage. This preserves feature delivery while preventing the codebase from becoming obsolete.

#### 2. Sprint Velocity Tracking & Project Risk Management
- **Question**: *Describe how you track and optimize team sprint velocity. What steps do you take if a critical sprint is at risk of missing its milestones?*
- **Answer**:
  I track sprint velocity using Jira burn-down charts, cumulative flow diagrams, and historic average velocity maps. If a sprint is at risk of slipping:
  - **Triage and Blocker Removal**: I hold an immediate team huddle to identify the blockers (e.g., API changes, native build issues). As a Tech Lead, my first priority is to resolve these blockers.
  - **Decoupling and Scope Negotiation**: I work with the Product Owner to prioritize backlog stories. We identify non-critical scope elements (nice-to-have UI states or tertiary configs) that can be deferred to the next sprint, safeguarding the core release milestone.
  - **Avoid Brooks' Law**: I never add external developers to a late project, as onboarding overhead slows the team down further. Instead, I implement **Swarming**—pairing engineers to unblock critical path tasks.

#### 3. Cross-Functional Dependencies Resolution
- **Question**: *How do you manage dependencies when your mobile features depend on backend API teams with different release schedules?*
- **Answer**:
  I implement **API Contract-First Development**. Before developers begin coding:
  - The mobile and backend teams co-design the Swagger/OpenAPI specifications, aligning on input/output payload shapes and HTTP status behaviors.
  - The mobile team sets up a local mock server schema (using MSW or JSON Server) to replicate these contracts, allowing us to build, test, and verify features in parallel with backend development.
  - When backend APIs are deployed to staging, we switch the configurations to live staging endpoints, resolving integration mismatches early.

---


---
