# 23-GraphQL.md

# GraphQL for Senior React Native Developers

---

# 1. What is GraphQL?

## Definition

GraphQL is a query language for APIs and a runtime for executing those queries.

It allows clients to request exactly the data they need.

---

## Created By

```text
Facebook (Meta)
```

---

## Interview Answer

"GraphQL is a query language that allows clients to request specific data from APIs, reducing over-fetching and under-fetching problems."

---

# 2. Why GraphQL?

## REST Problem

Suppose we need:

```text
User Name

Profile Picture

Posts
```

Using REST:

```http
GET /user

GET /posts
```

Multiple API calls.

---

## GraphQL Solution

```graphql
query {
  user(id: "1") {
    name
    profilePicture
    posts {
      title
    }
  }
}
```

Single request.

---

## Benefits

* Less Network Calls
* Smaller Responses
* Better Mobile Performance
* Strong Typing

---

# 3. REST vs GraphQL

| REST               | GraphQL              |
| ------------------ | -------------------- |
| Multiple Endpoints | Single Endpoint      |
| Over-fetching      | No Over-fetching     |
| Under-fetching     | No Under-fetching    |
| Fixed Response     | Flexible Response    |
| Easier Caching     | More Complex Caching |

---

## Interview Answer

"REST exposes multiple endpoints while GraphQL exposes a single endpoint where clients specify exactly what data is required."

---

# 4. GraphQL Architecture

```text
React Native
      ↓
Apollo Client
      ↓
GraphQL Server
      ↓
Database
```

---

## Flow

```text
Query
 ↓
Resolver
 ↓
Database
 ↓
Response
```

---

# 5. GraphQL Endpoint

Unlike REST:

```http
/users

/posts
/orders
```

GraphQL usually exposes:

```http
/graphql
```

Single endpoint.

---

# 6. GraphQL Schema

## Definition

Schema defines available data and operations.

---

## Example

```graphql
type User {
  id: ID!
  name: String!
  email: String!
}
```

---

## Interview Answer

"Schema is the contract between client and server."

---

# 7. GraphQL Types

## Scalar Types

```graphql
String

Int

Float

Boolean

ID
```

---

## Custom Type

```graphql
type User {
  id: ID!
  name: String!
}
```

---

# 8. Query

## Definition

Used for fetching data.

---

## Example

```graphql
query {
  users {
    id
    name
  }
}
```

---

## Response

```json
{
  "data": {
    "users": [
      {
        "id": "1",
        "name": "Raj"
      }
    ]
  }
}
```

---

# 9. Mutation

## Definition

Used for create, update, delete operations.

---

## Example

```graphql
mutation {
  createUser(
    name:"Raj"
  ){
    id
    name
  }
}
```

---

## Similar To

```http
POST
PUT
DELETE
```

in REST.

---

# 10. Subscription

## Definition

Real-time GraphQL communication.

---

## Example

```graphql
subscription {
  messageAdded {
    id
    text
  }
}
```

---

## Uses

* Chat
* Tracking
* Live Scores

---

# 11. Resolver

## Definition

Function responsible for returning data.

---

## Example

```javascript
const resolvers = {

 Query: {

  users: () => {
    return db.users;
  }

 }

};
```

---

## Interview Answer

"Resolvers are responsible for fetching and returning data for GraphQL queries."

---

# 12. GraphQL Query Variables

## Bad

```graphql
query {
 user(id:"1"){
  name
 }
}
```

---

## Better

```graphql
query GetUser(
 $id: ID!
){
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

---

# 13. Aliases

## Example

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

---

## Response

```json
{
 "user1": {},
 "user2": {}
}
```

---

# 14. Fragments

## Definition

Reusable GraphQL fields.

---

## Example

```graphql
fragment UserInfo
on User {

 id
 name
 email

}
```

---

## Usage

```graphql
query {

 users {
  ...UserInfo
 }

}
```

---

## Benefits

* Reusability
* Cleaner Queries

---

# 15. Introspection

## Definition

GraphQL can describe itself.

---

## Example

```graphql
{
 __schema {
  types {
   name
  }
 }
}
```

---

## Uses

* Documentation
* Tooling
* Code Generation

---

# 16. GraphQL Playground

## Purpose

Test GraphQL APIs.

---

## Alternatives

```text
Apollo Studio

GraphiQL

Postman
```

---

# 17. Apollo Client

## Definition

Most popular GraphQL client for React Native.

---

## Installation

```bash
npm install
@apollo/client
graphql
```

---

## Setup

```javascript
const client =
 new ApolloClient({

  uri:
   GRAPHQL_URL,

  cache:
   new InMemoryCache()

});
```

---

# 18. useQuery Hook

## Example

```javascript
const {
 loading,
 error,
 data
}
=
useQuery(
 GET_USERS
);
```

---

## Returned Values

```text
loading

error

data
```

---

# 19. useMutation Hook

## Example

```javascript
const [
 createUser
]
=
useMutation(
 CREATE_USER
);
```

---

## Execute

```javascript
createUser({
 variables:{
  name:"Raj"
 }
});
```

---

# 20. useSubscription Hook

## Example

```javascript
useSubscription(
 MESSAGE_ADDED
);
```

---

## Use Cases

* Chat
* Live Tracking
* Notifications

---

# 21. Apollo Cache

## Definition

Client-side GraphQL cache.

---

## Benefits

```text
Faster UI

Less Requests

Offline Support
```

---

# 22. Optimistic UI

## Definition

Update UI before server response.

---

## Example

```text
User Likes Post
      ↓
UI Updates Immediately
      ↓
Server Confirms Later
```

---

## Benefits

* Better UX
* Faster Feel

---

# 23. Error Handling

## GraphQL Errors

```json
{
 "errors":[]
}
```

---

## Network Errors

```text
Timeout

No Internet

Server Error
```

---

# 24. Pagination

## Offset

```graphql
users(
 page:1
)
```

---

## Cursor

```graphql
users(
 cursor:"abc"
)
```

---

## Recommendation

Large Applications:

```text
Cursor Pagination
```

---

# 25. Authentication

## JWT Flow

```text
Login
 ↓
JWT
 ↓
Apollo Header
 ↓
GraphQL API
```

---

## Example

```javascript
headers:{
 Authorization:
 `Bearer ${token}`
}
```

---

# 26. Code Generation

## Purpose

Generate TypeScript types automatically.

---

## Tools

```text
GraphQL Code Generator
```

---

## Benefits

* Type Safety
* Auto Completion
* Fewer Bugs

---

# 27. GraphQL in React Native Architecture

```text
Screen
 ↓
Apollo Client
 ↓
GraphQL API
 ↓
Backend
```

---

## Enterprise Architecture

```text
Screen
 ↓
Repository
 ↓
Apollo Client
 ↓
GraphQL API
```

---

# 28. Public GraphQL APIs For Practice

## Countries API

```text
https://countries.trevorblades.com/
```

---

## Example

```graphql
query {

 country(code:"IN"){

  name
  capital
  currency

 }

}
```

---

# 29. Advantages of GraphQL

## Benefits

* Flexible Queries
* Reduced Payload
* Strong Typing
* Single Endpoint
* Better Mobile Performance

---

# 30. Disadvantages of GraphQL

## Challenges

* More Complex Backend
* Complex Caching
* Learning Curve
* Query Cost Management

---

# Top 25 GraphQL Interview Questions

1. What is GraphQL?
2. REST vs GraphQL?
3. What is Schema?
4. What is Query?
5. What is Mutation?
6. What is Subscription?
7. What is Resolver?
8. What are Fragments?
9. What are Variables?
10. What are Aliases?
11. What is Introspection?
12. Apollo Client?
13. useQuery?
14. useMutation?
15. useSubscription?
16. Apollo Cache?
17. Optimistic UI?
18. Pagination?
19. Authentication?
20. GraphQL Codegen?
21. GraphQL Architecture?
22. Over-fetching?
23. Under-fetching?
24. Benefits of GraphQL?
25. GraphQL vs REST for Mobile Apps?

---

# Ultimate Senior Interview Answer

"GraphQL allows mobile applications to fetch exactly the data required through a single endpoint, reducing network overhead and improving performance. In React Native applications, I typically use Apollo Client with TypeScript code generation, Apollo Cache, optimistic updates, and cursor-based pagination. For enterprise applications, GraphQL integrates well with Repository Pattern and Clean Architecture while providing excellent developer experience and mobile performance."

---

# Daily Revision Plan

```text
GraphQL Basics          5 min
Schema                 3 min
Query                  3 min
Mutation               3 min
Subscription           3 min
Apollo Client          5 min
Caching                3 min
Pagination             3 min
Authentication         3 min
Interview Questions    5 min

Total: ~36 Minutes
```
