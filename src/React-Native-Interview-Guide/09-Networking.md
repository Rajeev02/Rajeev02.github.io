# 09-Networking.md

# Networking for Senior React Native Developers

---

# 1. What is Networking?

## Definition

Networking is the process of communication between a mobile application and backend services over the internet.

---

## Why Do We Need It?

Most applications require:

* Authentication
* User Profiles
* Payments
* Notifications
* Real-time Updates
* Content Management

All of these require backend communication.

---

## Interview Answer

"Networking enables React Native applications to communicate with backend services, APIs, databases, and third-party systems."

---

# 2. HTTP Basics

## Definition

HTTP (HyperText Transfer Protocol) is the foundation of communication between client and server.

---

## Flow

```text
Mobile App
      ↓
HTTP Request
      ↓
Backend API
      ↓
HTTP Response
      ↓
Mobile App
```

---

## Interview Answer

"HTTP is a request-response protocol used for communication between mobile applications and backend services."

---

# 3. HTTP Methods

## GET

Retrieve data.

```http
GET /users
```

---

## POST

Create data.

```http
POST /users
```

---

## PUT

Update complete resource.

```http
PUT /users/1
```

---

## PATCH

Partial update.

```http
PATCH /users/1
```

---

## DELETE

Remove resource.

```http
DELETE /users/1
```

---

## Interview Answer

"GET retrieves data, POST creates resources, PUT replaces resources, PATCH updates partially, and DELETE removes resources."

---

# 4. HTTP Status Codes

## Success

```text
200 OK
201 Created
204 No Content
```

---

## Client Errors

```text
400 Bad Request
401 Unauthorized
403 Forbidden
404 Not Found
429 Too Many Requests
```

---

## Server Errors

```text
500 Internal Server Error
502 Bad Gateway
503 Service Unavailable
```

---

## Interview Answer

"Status codes indicate whether a request succeeded, failed due to client issues, or failed because of server-side problems."

---

# 5. REST API

## Definition

REST (Representational State Transfer) is the most common API architecture.

---

## Example

```http
GET /users

GET /users/1

POST /users
```

---

## Characteristics

* Stateless
* Resource Based
* HTTP Driven

---

## Interview Answer

"REST APIs expose resources through HTTP endpoints and follow stateless communication principles."

---

# 6. GraphQL

## Definition

GraphQL is a query language for APIs that allows clients to request exactly the data they need.

---

## REST Example

```http
GET /user/1
```

Returns:

```json
{
  "id":1,
  "name":"Raj",
  "email":"..."
}
```

---

## GraphQL Example

```graphql
query {
  user(id:1){
    name
  }
}
```

Returns:

```json
{
  "name":"Raj"
}
```

---

## Benefits

* Avoid Over-fetching
* Avoid Under-fetching
* Single Endpoint

---

## Interview Answer

"GraphQL allows clients to request only the required data, reducing payload size and improving flexibility."

---

# 7. REST vs GraphQL

| Feature            | REST     | GraphQL |
| ------------------ | -------- | ------- |
| Multiple Endpoints | Yes      | No      |
| Single Endpoint    | No       | Yes     |
| Over-fetching      | Possible | No      |
| Under-fetching     | Possible | No      |
| Caching            | Easier   | Complex |
| Learning Curve     | Lower    | Higher  |

---

## Interview Answer

"REST is simpler and widely adopted, while GraphQL offers more flexibility by allowing clients to request specific data."

---

# 8. Fetch API

## Definition

Built-in JavaScript API for network requests.

---

## Example

```javascript
const response =
 await fetch(url);

const data =
 await response.json();
```

---

## Advantages

* Built-in
* Lightweight

---

## Limitations

* No Interceptors
* Manual Error Handling

---

## Interview Answer

"Fetch is a built-in browser and React Native API for making network requests."

---

# 9. Axios

## Definition

Popular HTTP client for React Native.

---

## Example

```javascript
const response =
 await axios.get("/users");
```

---

## Benefits

### Interceptors

```javascript
axios.interceptors.request.use(
 config => config
);
```

---

### Timeout Support

```javascript
timeout: 10000
```

---

### Better Error Handling

---

## Interview Answer

"Axios is preferred in enterprise applications due to interceptors, timeout support, request cancellation, and improved error handling."

---

# 10. Axios Interceptors

## Definition

Functions executed before requests or after responses.

---

## Request Interceptor

```javascript
axios.interceptors.request.use(
 config => {

  config.headers.Authorization =
   `Bearer ${token}`;

  return config;
 }
);
```

---

## Response Interceptor

```javascript
axios.interceptors.response.use(
 response => response,
 error => error
);
```

---

## Use Cases

* JWT Tokens
* Logging
* Refresh Tokens

---

## Interview Answer

"Interceptors allow centralized request and response handling."

---

# 11. Authentication Flow

## JWT Authentication

```text
Login
   ↓
Server
   ↓
Access Token
   ↓
Store Securely
   ↓
Attach to Requests
```

---

## Request Example

```http
Authorization:
Bearer token
```

---

## Interview Answer

"JWT authentication uses tokens attached to request headers to identify users."

---

# 12. Refresh Token Flow

## Problem

Access Tokens expire.

---

## Solution

```text
Access Token Expired
         ↓
Refresh Token Request
         ↓
New Access Token
         ↓
Retry Original Request
```

---

## Interview Answer

"Refresh tokens allow applications to obtain new access tokens without requiring users to log in again."

---

# 13. Request Cancellation

## Why?

User leaves screen.

API still running.

---

## Axios

```javascript
AbortController
```

---

## Example

```javascript
const controller =
 new AbortController();

fetch(url,{
 signal:
  controller.signal
});
```

---

## Interview Answer

"Request cancellation prevents unnecessary network activity and memory leaks."

---

# 14. Pagination

## Definition

Load data in chunks.

---

## Example

Bad:

```text
10000 Records
```

---

Good:

```text
Page 1
Page 2
Page 3
```

---

## Types

### Offset Pagination

```http
?page=1
```

---

### Cursor Pagination

```http
?cursor=abc
```

---

## Interview Answer

"Pagination improves performance by loading data incrementally."

---

# 15. Infinite Scrolling

## Example

```jsx
<FlatList
 onEndReached={() =>
  fetchNextPage()
 }
/>
```

---

## Benefits

* Better UX
* Lower Memory Usage

---

## Interview Answer

"Infinite scrolling loads additional data dynamically as the user scrolls."

---

# 16. Caching

## Definition

Store responses locally.

---

## Benefits

* Faster Responses
* Reduced API Calls
* Offline Support

---

## Solutions

### RTK Query

### React Query

### AsyncStorage

---

## Interview Answer

"Caching reduces server load and improves application performance."

---

# 17. RTK Query

## Benefits

* Caching
* Refetching
* Loading States
* Error Handling

---

## Example

```javascript
useGetUsersQuery();
```

---

## Interview Answer

"RTK Query simplifies API integration through automatic caching and synchronization."

---

# 18. React Query

## Definition

Server State Management Library.

---

## Example

```javascript
const {data} =
 useQuery({
  queryKey:["users"],
  queryFn:getUsers
 });
```

---

## Interview Answer

"React Query manages server state, caching, synchronization, and background updates."

---

# 19. WebSockets

## Definition

Persistent bidirectional communication.

---

## Example

```javascript
const socket =
 new WebSocket(url);
```

---

## Use Cases

* Chat
* Live Tracking
* Trading Apps
* Notifications

---

## Interview Answer

"WebSockets provide real-time communication between client and server."

---

# 20. Polling vs WebSocket

## Polling

```text
Request Every 5 Seconds
```

---

## WebSocket

```text
Server Pushes Updates
```

---

## Comparison

| Polling             | WebSocket          |
| ------------------- | ------------------ |
| Repeated Requests   | Single Connection  |
| Higher Network Cost | Lower Network Cost |
| Delayed Updates     | Real-Time          |

---

## Interview Answer

"WebSockets are preferred for real-time communication, while polling is simpler but less efficient."

---

# 21. Network Security

## HTTPS

Always use HTTPS.

---

## Certificate Pinning

Prevents MITM attacks.

Libraries:

```text
react-native-ssl-pinning
```

---

## Secure Storage

Use:

```text
Keychain
Keystore
```

---

## Interview Answer

"Network security involves HTTPS, certificate pinning, secure token storage, and proper authentication practices."

---

# 22. Offline Support

## Strategy

```text
Network Available
      ↓
API Call
```

Else:

```text
Local Cache
```

---

## Solutions

* RTK Query
* React Query
* AsyncStorage
* SQLite

---

## Interview Answer

"Offline support improves reliability by using local storage and caching when network connectivity is unavailable."

---

# 23. Error Handling Strategy

## Common Errors

### Network Error

```text
No Internet
```

---

### Timeout

```text
Request Timeout
```

---

### Server Error

```text
500 Error
```

---

### Authentication Error

```text
401 Error
```

---

## Interview Answer

"Applications should gracefully handle network failures, server errors, timeouts, and authentication issues."

---

# 24. API Architecture (Enterprise Apps)

```text
React Native
      ↓
Axios Client
      ↓
Interceptors
      ↓
Repository Layer
      ↓
RTK Query / Redux
      ↓
Backend APIs
```

---

## Benefits

* Scalable
* Testable
* Maintainable

---

# 25. Most Asked Interview Questions

1. What is Networking?
2. REST vs GraphQL?
3. Fetch vs Axios?
4. Why Axios?
5. What are Interceptors?
6. How JWT Authentication Works?
7. Access Token vs Refresh Token?
8. How do you refresh tokens automatically?
9. What is Pagination?
10. Offset vs Cursor Pagination?
11. Infinite Scrolling?
12. What is Caching?
13. RTK Query vs React Query?
14. Polling vs WebSocket?
15. How do WebSockets work?
16. What is Request Cancellation?
17. How do you secure API communication?
18. What is Certificate Pinning?
19. How do you handle offline support?
20. How do you structure networking in enterprise apps?

---

# Ultimate Senior Interview Answer

"In enterprise React Native applications, I typically use Axios with request and response interceptors, JWT authentication with refresh token handling, RTK Query or React Query for caching and synchronization, cursor-based pagination for scalability, WebSockets for real-time communication, and secure storage for sensitive credentials. I also implement proper error handling, request cancellation, offline support, and HTTPS with certificate pinning for security."

---

# Daily Revision Plan

```text
HTTP Basics               3 min
REST vs GraphQL           5 min
Fetch vs Axios            5 min
Interceptors              5 min
Authentication            5 min
Pagination                3 min
RTK Query / React Query   5 min
WebSockets                3 min
Security                  3 min

Total: ~37 Minutes
```


---


## SSE (Server-Sent Events)

Server pushes updates.

```text
Server
 ↓
Client
```

One-way communication.

---

## Retry Strategy

Retry failed requests.

```javascript
retry 3 times
```

---

## Exponential Backoff

```text
1 sec
2 sec
4 sec
8 sec
```

---

## Rate Limiting

Prevents abuse.

```text
100 Requests / Minute
```

