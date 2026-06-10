For interview preparation, you should know a **2–5 line definition + senior-level answer** for each question.

# Top 25 GraphQL Interview Questions & Answers

---

# 1. What is GraphQL?

### Answer

GraphQL is a query language for APIs and a runtime for executing those queries. It allows clients to request exactly the data they need from a single endpoint.

### Interview Answer

"GraphQL enables clients to fetch specific data in a single request, reducing over-fetching and under-fetching while improving network efficiency."

---

# 2. REST vs GraphQL?

| REST                    | GraphQL           |
| ----------------------- | ----------------- |
| Multiple Endpoints      | Single Endpoint   |
| Fixed Response          | Flexible Response |
| Over-fetching Possible  | No Over-fetching  |
| Under-fetching Possible | No Under-fetching |

### Interview Answer

"REST exposes multiple endpoints with predefined responses, while GraphQL exposes a single endpoint where clients specify exactly what data they need."

---

# 3. What is Schema?

### Answer

A Schema is the contract between the client and server that defines available data types, queries, mutations, and subscriptions.

```graphql
type User {
  id: ID!
  name: String!
}
```

### Interview Answer

"The schema defines what data can be queried and how clients can interact with the API."

---

# 4. What is Query?

### Answer

A Query is used to fetch data from a GraphQL API.

```graphql
query {
  users {
    id
    name
  }
}
```

### Interview Answer

"Queries are equivalent to GET operations in REST."

---

# 5. What is Mutation?

### Answer

Mutations are used to create, update, or delete data.

```graphql
mutation {
  createUser(name:"Raj"){
    id
  }
}
```

### Interview Answer

"Mutations are equivalent to POST, PUT, PATCH, and DELETE operations in REST."

---

# 6. What is Subscription?

### Answer

Subscriptions provide real-time updates from the server to the client.

```graphql
subscription {
  messageAdded {
    text
  }
}
```

### Use Cases

* Chat
* Stock Market
* Live Tracking

### Interview Answer

"Subscriptions enable real-time communication using WebSockets."

---

# 7. What is Resolver?

### Answer

Resolvers are functions that fetch and return data for GraphQL operations.

```javascript
const resolvers = {
  Query: {
    users: () => db.users
  }
};
```

### Interview Answer

"Resolvers contain the business logic that returns data requested by GraphQL queries."

---

# 8. What are Fragments?

### Answer

Fragments allow reuse of GraphQL fields across multiple queries.

```graphql
fragment UserInfo on User {
  id
  name
  email
}
```

### Benefits

* Reusability
* Cleaner Queries

### Interview Answer

"Fragments help avoid duplication by reusing common field selections."

---

# 9. What are Variables?

### Answer

Variables allow dynamic values to be passed into queries.

```graphql
query GetUser($id: ID!) {
  user(id:$id){
    name
  }
}
```

Variables:

```json
{
  "id":"1"
}
```

### Interview Answer

"Variables improve query reusability and prevent hardcoding values."

---

# 10. What are Aliases?

### Answer

Aliases rename query results.

```graphql
query {
  user1:user(id:"1"){
    name
  }

  user2:user(id:"2"){
    name
  }
}
```

### Interview Answer

"Aliases allow multiple queries of the same field within a single request."

---

# 11. What is Introspection?

### Answer

Introspection allows GraphQL to describe its own schema.

```graphql
{
  __schema {
    types {
      name
    }
  }
}
```

### Uses

* Documentation
* Tooling
* Code Generation

### Interview Answer

"Introspection enables clients and tools to discover available schema information."

---

# 12. What is Apollo Client?

### Answer

Apollo Client is the most popular GraphQL client for React and React Native.

### Features

* Caching
* State Management
* Error Handling
* Optimistic Updates

### Interview Answer

"Apollo Client manages GraphQL requests, caching, and local state efficiently."

---

# 13. What is useQuery?

### Answer

Hook used for fetching GraphQL data.

```javascript
const {
  loading,
  error,
  data
} = useQuery(GET_USERS);
```

### Interview Answer

"useQuery automatically manages loading, error, and data states."

---

# 14. What is useMutation?

### Answer

Hook used for create, update, and delete operations.

```javascript
const [createUser] =
  useMutation(CREATE_USER);
```

### Interview Answer

"useMutation is used for server-side data modifications."

---

# 15. What is useSubscription?

### Answer

Hook used for real-time GraphQL updates.

```javascript
useSubscription(MESSAGE_ADDED);
```

### Interview Answer

"useSubscription listens for real-time server events."

---

# 16. What is Apollo Cache?

### Answer

Apollo Cache stores GraphQL responses locally.

### Benefits

* Faster UI
* Reduced Network Calls
* Better UX

### Interview Answer

"Apollo Cache reduces unnecessary API requests and improves application performance."

---

# 17. What is Optimistic UI?

### Answer

Optimistic UI updates the interface before the server confirms success.

```text
User Clicks Like
        ↓
UI Updates Immediately
        ↓
Server Response Later
```

### Interview Answer

"Optimistic updates improve perceived performance and user experience."

---

# 18. What is Pagination?

### Answer

Pagination loads data in chunks instead of loading everything at once.

### Types

#### Offset

```graphql
users(page:1)
```

#### Cursor

```graphql
users(cursor:"abc")
```

### Interview Answer

"For large applications, cursor-based pagination is preferred because it scales better."

---

# 19. How is Authentication handled in GraphQL?

### Answer

Authentication is usually implemented using JWT tokens.

```javascript
headers: {
  Authorization:
   `Bearer ${token}`
}
```

### Flow

```text
Login
 ↓
JWT
 ↓
Apollo Header
 ↓
GraphQL API
```

### Interview Answer

"GraphQL commonly uses JWT-based authentication passed through request headers."

---

# 20. What is GraphQL Codegen?

### Answer

Code Generation automatically generates TypeScript types from GraphQL schemas.

### Benefits

* Type Safety
* Auto Completion
* Fewer Bugs

### Interview Answer

"GraphQL Codegen eliminates manual type creation and improves developer productivity."

---

# 21. What is GraphQL Architecture?

### Answer

```text
React Native
      ↓
Apollo Client
      ↓
GraphQL Server
      ↓
Resolver
      ↓
Database
```

### Enterprise Architecture

```text
Screen
 ↓
Repository
 ↓
Apollo Client
 ↓
GraphQL API
```

### Interview Answer

"GraphQL architecture consists of clients, schemas, resolvers, and data sources working together through a single endpoint."

---

# 22. What is Over-fetching?

### Answer

Receiving more data than required.

### REST Example

```json
{
  "id":1,
  "name":"Raj",
  "email":"abc@test.com",
  "address":"..."
}
```

Need only:

```json
{
  "name":"Raj"
}
```

### Interview Answer

"Over-fetching occurs when APIs return unnecessary data."

---

# 23. What is Under-fetching?

### Answer

When a client needs multiple API requests to get required data.

### Example

```http
GET /user
GET /posts
GET /comments
```

### Interview Answer

"Under-fetching occurs when a single request doesn't provide all required data."

---

# 24. What are the Benefits of GraphQL?

### Benefits

* Single Endpoint
* Flexible Queries
* Reduced Payload
* Strong Typing
* Better Mobile Performance
* Real-Time Support
* Excellent Developer Experience

### Interview Answer

"GraphQL improves network efficiency, flexibility, and developer productivity while reducing unnecessary data transfer."

---

# 25. GraphQL vs REST for Mobile Apps?

### REST

Good For:

* Simple APIs
* Public APIs
* Easy Caching

### GraphQL

Good For:

* Complex Applications
* Multiple Data Sources
* Mobile Apps
* Dynamic UI

### Senior-Level Interview Answer

"For mobile applications, GraphQL often provides better performance because clients request only the required data, reducing payload size and network calls. However, REST remains simpler and more suitable for straightforward CRUD-based systems. The choice depends on product complexity, team expertise, and backend architecture."

---

# Most Important Questions (Asked Frequently)

1. What is GraphQL?
2. REST vs GraphQL?
3. Query vs Mutation vs Subscription?
4. What is a Resolver?
5. Apollo Client?
6. Apollo Cache?
7. Optimistic UI?
8. Pagination?
9. GraphQL Codegen?
10. Over-fetching vs Under-fetching?
11. Authentication in GraphQL?
12. GraphQL Architecture?
13. GraphQL vs REST for Mobile Apps?

These 13 questions alone cover about **80% of GraphQL interview discussions** for Senior React Native roles.
