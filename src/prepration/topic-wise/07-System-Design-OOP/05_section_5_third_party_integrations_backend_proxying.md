
## Page Summary
### Reading Time
`2 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | 📡 Section 5: Third-Party Integrations & Backend Proxying |
| Difficulty | Senior / Lead |
| Interview Frequency | High |
| Tags | 🔥 Must Revise |

---


## 📡 Section 5: Third-Party Integrations & Backend Proxying

*⏱️ 1 min read*

#### 1. Shopify APIs (REST & GraphQL)
- **Shopify GraphQL Storefront API**:
  - Connect to Shopify using Apollo Client.
  - Query product lists and manage carts in a single round-trip:
    ```graphql
    query getProducts {
      products(first: 10) {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
    ```
- **Shopify REST Admin API**:
  - Run admin tasks on a Node.js/Express backend proxy.
  - Rate limits are governed by a **Leaky Bucket** algorithm (default 40 requests/sec). Your backend must check the `X-Shopify-Shop-Api-Call-Limit` response header and queue requests if the bucket is full.
  - **Webhook validation**: Secure Webhooks by hashing the raw request body with your Shopify secret key using HMAC-SHA256, verifying it matches the `x-shopify-hmac-sha256` header.

---

#### 2. Push Notifications (OneSignal)
OneSignal handles target device token registrations and handles incoming pushes:
- **User Token Association**: Map OneSignal's push registration to your internal database user IDs using `OneSignal.login(userId)`.
- **Deep Linking**: Attach metadata `{ targetRoute: "ProductDetails", productId: "123" }` to the notification payload. Listen for notification click events and navigate the user to the correct screen:
  ```javascript
  OneSignal.Notifications.addEventListener('click', (event) => {
    const { targetRoute, productId } = event.notification.additionalData;
    if (targetRoute) {
      navigation.navigate(targetRoute, { id: productId });
    }
  });
  ```

---

#### 3. Node.js & Express.js Mobile Backend API
An API gateway proxying mobile requests should implement key security and rate-limiting features:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Secure Headers
app.use(helmet());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100 // max 100 requests per IP per window
});
app.use('/api/', apiLimiter);

// Mobile Authentication Middleware
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
```

---


---
