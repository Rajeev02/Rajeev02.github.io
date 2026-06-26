> 🎯 **Topic:** 4.1 What is the difference between REST API and GraphQL API? Why do we use GraphQL in React Native applications?
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---

## 4.1 What is the difference between REST API and GraphQL API? Why do we use GraphQL in React Native applications?

### Answer

Both REST and GraphQL are used to communicate between a mobile application and a backend server, but they work differently.

---

### 1. REST API

REST (Representational State Transfer) is an API architecture where each resource has a separate endpoint.

#### Example

##### Get User

```http
GET /users/1
```

Response:

```json
{
  "id": 1,
  "name": "Rajeev",
  "email": "rajeev@gmail.com",
  "phone": "9876543210",
  "address": "Bangalore"
}
```

##### Get User Posts

```http
GET /users/1/posts
```

Response:

```json
[
  {
    "id": 101,
    "title": "React Native Basics"
  }
]
```

To get user information and posts, we need **two API calls**.

---

### 2. GraphQL API

GraphQL allows the client to request exactly the data it needs using a single endpoint.

#### Example

Request:

```graphql
query {
  user(id: 1) {
    name
    email
    posts {
      title
    }
  }
}
```

Response:

```json
{
  "data": {
    "user": {
      "name": "Rajeev",
      "email": "rajeev@gmail.com",
      "posts": [
        {
          "title": "React Native Basics"
        }
      ]
    }
  }
}
```

Everything comes in **one API call**.

---

### REST vs GraphQL Comparison

| Feature            | REST API           | GraphQL API                |
| ------------------ | ------------------ | -------------------------- |
| Endpoint           | Multiple endpoints | Single endpoint            |
| Data Fetching      | Fixed response     | Custom response            |
| Over Fetching      | Possible           | No                         |
| Under Fetching     | Possible           | No                         |
| Network Calls      | More               | Less                       |
| Learning Curve     | Easy               | Medium                     |
| Caching            | Easy               | Complex                    |
| Mobile Performance | Good               | Better for complex screens |
| Versioning         | Required           | Usually not required       |

---

### What is Over Fetching?

Getting more data than required.

#### Example

You only need:

```json
{
  "name": "Rajeev"
}
```

But REST returns:

```json
{
  "id": 1,
  "name": "Rajeev",
  "email": "rajeev@gmail.com",
  "phone": "9876543210",
  "address": "Bangalore",
  "country": "India"
}
```

Unnecessary data increases network usage.

---

### What is Under Fetching?

Getting less data than required and making multiple requests.

Example:

```http
GET /users/1
```

Then:

```http
GET /users/1/posts
```

Then:

```http
GET /users/1/comments
```

Multiple network requests are needed.

---

### Why Use GraphQL in React Native?

GraphQL is useful when:

#### 1. Slow Network Conditions

Mobile users may use 3G/4G networks.

GraphQL sends only required data, reducing payload size.

#### 2. Complex Screens

Example:

Instagram Home Screen

Need:

* User Profile
* Stories
* Posts
* Likes
* Comments

REST:

```text
5-10 API Calls
```

GraphQL:

```text
1 API Call
```

#### 3. Better Performance

* Less network traffic
* Faster screen loading
* Better user experience

#### 4. Multiple Teams

Frontend developers can request required fields without waiting for backend changes.

---

### React Native REST API Example

Using Fetch:

```javascript
const getUser = async () => {
  const response = await fetch(
    "https://api.example.com/users/1"
  );

  const data = await response.json();

  console.log(data);
};
```

---

### React Native GraphQL Example

Using Apollo Client:

#### Installation

```bash
npm install @apollo/client graphql
```

#### Apollo Setup

```javascript
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.example.com/graphql",
  cache: new InMemoryCache(),
});
```

#### Query

```javascript
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
  query {
    user(id: 1) {
      name
      email
    }
  }
`;

const UserScreen = () => {
  const { loading, error, data } =
    useQuery(GET_USER);

  if (loading) return null;

  return (
    <Text>{data.user.name}</Text>
  );
};
```

---

### Pros and Cons

#### REST API Pros

✅ Easy to learn
✅ Easy caching
✅ Widely adopted
✅ Good documentation support

#### REST API Cons

❌ Over-fetching
❌ Under-fetching
❌ Multiple requests for complex screens
❌ API versioning required

---

#### GraphQL Pros

✅ Single endpoint
✅ Fetch only required data
✅ Reduces network calls
✅ Better for mobile apps
✅ Strong schema and typing

#### GraphQL Cons

❌ More complex setup
❌ Caching is harder
❌ Large queries can affect server performance
❌ Learning curve is higher

---

### When Should You Use REST?

Use REST when:

* Small applications
* Simple CRUD operations
* Few screens
* Standard backend services

Examples:

* Login
* Registration
* Profile Update
* Settings

---

### When Should You Use GraphQL?

Use GraphQL when:

* Large-scale applications
* Multiple data sources
* Complex dashboards
* Social media apps
* E-commerce apps
* Real-time applications

Examples:

* Instagram
* Facebook
* LinkedIn
* Netflix-like applications

---

### Interview Summary (2-Minute Answer)

> REST uses multiple endpoints and returns fixed data structures. GraphQL uses a single endpoint and allows clients to request only the required data. REST can suffer from over-fetching and under-fetching, while GraphQL solves both problems. In React Native, GraphQL is preferred for complex screens because it reduces network calls and improves performance. However, REST is simpler to implement and maintain for smaller applications. GraphQL is commonly used in large applications such as social media, e-commerce, and dashboard-based systems.



## 4.1 Can you show REST API and GraphQL API examples using public dummy APIs?

Yes. For interviews, using public APIs makes it easier to demonstrate the difference.

---

### 1. REST API Example

#### Public Dummy API

[JSONPlaceholder](https://jsonplaceholder.typicode.com)

#### Get User

```http
GET https://jsonplaceholder.typicode.com/users/1
```

Response:

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz"
}
```

---

#### Get User Posts

```http
GET https://jsonplaceholder.typicode.com/posts?userId=1
```

Response:

```json
[
  {
    "userId": 1,
    "id": 1,
    "title": "Sample Post"
  }
]
```

Notice:

To show User + Posts, we need **2 API calls**.

---

### React Native REST Example

```javascript
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(response => response.json())
      .then(data => setUser(data));
  }, []);

  return (
    <View>
      <Text>{user?.name}</Text>
      <Text>{user?.email}</Text>
    </View>
  );
};

export default App;
```

---

### 2. GraphQL API Example

#### Public GraphQL API

[Countries GraphQL API](https://countries.trevorblades.com/)

Single endpoint:

```http
POST https://countries.trevorblades.com/
```

---

#### Query Country Data

```graphql
query {
  country(code: "IN") {
    name
    capital
    currency
  }
}
```

Response:

```json
{
  "data": {
    "country": {
      "name": "India",
      "capital": "New Delhi",
      "currency": "INR"
    }
  }
}
```

---

#### Query Multiple Resources in One Request

```graphql
query {
  country(code: "IN") {
    name
    capital
  }

  countryUS: country(code: "US") {
    name
    capital
  }
}
```

Response:

```json
{
  "data": {
    "country": {
      "name": "India",
      "capital": "New Delhi"
    },
    "countryUS": {
      "name": "United States",
      "capital": "Washington D.C."
    }
  }
}
```

Single request → Multiple datasets.

---

### React Native GraphQL Example

#### Install Packages

```bash
npm install @apollo/client graphql
```

---

#### Apollo Client Setup

```javascript
import {
  ApolloClient,
  InMemoryCache
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});
```

---

#### Query Example

```javascript
import React from "react";
import { Text, View } from "react-native";
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRY = gql`
  query {
    country(code: "IN") {
      name
      capital
      currency
    }
  }
`;

const CountryScreen = () => {
  const { loading, error, data } =
    useQuery(GET_COUNTRY);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>{data.country.name}</Text>
      <Text>{data.country.capital}</Text>
      <Text>{data.country.currency}</Text>
    </View>
  );
};

export default CountryScreen;
```

---

### Real-World Example

Suppose you are building a Food Delivery App screen.

#### REST Approach

```text
GET /user/1
GET /orders
GET /restaurants
GET /offers
GET /addresses
```

Total = 5 API Calls

---

#### GraphQL Approach

```graphql
query {
  user(id: 1) {
    name
  }

  orders(userId: 1) {
    orderId
    amount
  }

  restaurants {
    name
  }

  offers {
    title
  }
}
```

Total = 1 API Call

---

### Interview Answer

> A good public REST API example is JSONPlaceholder, where I need separate endpoints such as `/users/1` and `/posts?userId=1` to fetch related data. A good GraphQL example is the Countries GraphQL API, where I can fetch exactly the required fields using a single endpoint and a custom query. In React Native, REST is simpler and suitable for small applications, while GraphQL is preferred for large applications because it reduces API calls, avoids over-fetching, and improves mobile performance.

---

### How to use GraphQL Introspection

In GraphQL, there is **no "get everything automatically" keyword** like REST's `GET /countries/IN` that returns all fields.

You must explicitly ask for the fields you need.

#### Current Query

```graphql
query {
  country(code: "IN") {
    name
    capital
    currency
  }
}
```

Response:

```json
{
  "data": {
    "country": {
      "name": "India",
      "capital": "New Delhi",
      "currency": "INR"
    }
  }
}
```

---

### How do I know all available fields?

Use **GraphQL Introspection**.

#### Option 1: GraphQL Playground / Apollo Studio Explorer

Open:

[Countries GraphQL API Playground](https://countries.trevorblades.com/)

Click **Docs** on the right side.

You can browse:

```graphql
Country
├── code
├── name
├── native
├── phone
├── capital
├── currency
├── emoji
├── emojiU
├── continent
├── languages
├── states
└── ...
```

---

#### Option 2: Introspection Query

```graphql
{
  __type(name: "Country") {
    fields {
      name
    }
  }
}
```

Response:

```json
{
  "data": {
    "__type": {
      "fields": [
        { "name": "code" },
        { "name": "name" },
        { "name": "native" },
        { "name": "phone" },
        { "name": "capital" },
        { "name": "currency" },
        { "name": "emoji" }
      ]
    }
  }
}
```

---

### Get Almost Everything

Once you know the fields, request them explicitly:

```graphql
query {
  country(code: "IN") {
    code
    name
    native
    phone
    capital
    currency
    emoji

    continent {
      code
      name
    }

    languages {
      code
      name
      native
    }
  }
}
```

Response:

```json
{
  "data": {
    "country": {
      "code": "IN",
      "name": "India",
      "native": "भारत",
      "phone": "91",
      "capital": "New Delhi",
      "currency": "INR",
      "emoji": "🇮🇳",
      "continent": {
        "code": "AS",
        "name": "Asia"
      },
      "languages": [
        {
          "code": "hi",
          "name": "Hindi",
          "native": "हिन्दी"
        }
      ]
    }
  }
}
```

---

### React Native Example

Using `fetch`:

```javascript
const query = `
  query {
    country(code: "IN") {
      name
      capital
      currency
      emoji
    }
  }
`;

const response = await fetch(
  "https://countries.trevorblades.com/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  }
);

const result = await response.json();

console.log(result.data.country);
```

Output:

```javascript
{
  name: "India",
  capital: "New Delhi",
  currency: "INR",
  emoji: "🇮🇳"
}
```

---

### Interview Question

**Q: How can you get all fields from a GraphQL API?**

**Answer:**
GraphQL does not provide a `SELECT *` mechanism. Clients must explicitly request the fields they need. To discover available fields, developers use GraphQL schema introspection (`__schema`, `__type`) or the API documentation/explorer. After discovering the schema, they can construct a query containing all required fields. This prevents over-fetching and under-fetching of data.

---
