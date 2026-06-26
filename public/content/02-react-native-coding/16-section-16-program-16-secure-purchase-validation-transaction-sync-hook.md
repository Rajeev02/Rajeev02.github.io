> 🎯 **Topic:** Section 16: Program 16: Secure Purchase Validation & Transaction Sync Hook
> 📊 **Difficulty:** Medium | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---


## Section 16: Program 16: Secure Purchase Validation & Transaction Sync Hook
*⏱️ 2 min read*

### Question
Design a React Native custom hook (`usePurchaseManager.ts`) using `react-native-iap` to coordinate secure subscription transactions:
1. Initialize the purchase event listeners, register purchase updates, and serialize purchase payloads into a local transactional SQLite database (outbox).
2. Invoke a secure backend validation server endpoint (`/api/verify-receipt`) for verification.
3. Automatically monitor connection recovery using `NetInfo` to reconcile and upload pending transactions offline.

### Sample Input & Output
#### Input:
- User triggers `buyProduct("gold_monthly")`.
- Device goes offline during transaction completion.
#### Output:
- Saves the transaction to SQLite.
- On connection recovery, `NetInfo` fires, executing receipt uploads to the server, updates local logs, and confirms the purchase.

### Code

```typescript
import { useEffect, useState, useCallback } from 'react';
import * as RNIap from 'react-native-iap';
import NetInfo from '@react-native-community/netinfo';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'transactions.db', location: 'default' });

export function usePurchaseManager() {
  const [purchases, setPurchases] = useState<RNIap.ProductPurchase[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize SQLite Transaction Table
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS receipt_outbox (
          id TEXT PRIMARY KEY,
          productId TEXT,
          transactionReceipt TEXT,
          status TEXT
        );`
      );
    });
  }, []);

  // Post receipt payload to backend database for secure validation
  const validateReceiptWithServer = useCallback(async (purchase: RNIap.ProductPurchase) => {
    const response = await fetch('https://api.mybank.com/api/verify-receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: purchase.productId,
        receipt: purchase.transactionReceipt,
      }),
    });

    if (!response.ok) {
      throw new Error('Server receipt validation failed');
    }

    // Acknowledge validation directly with StoreKit / Play Console billing
    await RNIap.finishTransaction({ purchase, isConsumable: false });
  }, []);

  // Sync outbox queue upon network restoration
  const processOfflineOutbox = useCallback(async () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM receipt_outbox WHERE status = 'PENDING';`,
        [],
        async (_, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            try {
              await validateReceiptWithServer({
                productId: item.productId,
                transactionReceipt: item.transactionReceipt,
              } as RNIap.ProductPurchase);

              // Update Outbox Status on Success
              db.transaction((innerTx) => {
                innerTx.executeSql(
                  `UPDATE receipt_outbox SET status = 'COMPLETED' WHERE id = ?;`,
                  [item.id]
                );
              });
            } catch (err) {
              console.error('Failed to sync offline receipt:', err);
            }
          }
        }
      );
    });
  }, [validateReceiptWithServer]);

  // Monitor network status to trigger offline synchronization
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        processOfflineOutbox();
      }
    });
    return () => unsubscribe();
  }, [processOfflineOutbox]);

  // Set up IAP Transaction Update Listeners
  useEffect(() => {
    const purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        setIsProcessing(true);
        try {
          // 1. Immediately log to local SQLite outbox
          db.transaction((tx) => {
            tx.executeSql(
              `INSERT OR REPLACE INTO receipt_outbox (id, productId, transactionReceipt, status) 
               VALUES (?, ?, ?, 'PENDING');`,
              [purchase.transactionId, purchase.productId, receipt]
            );
          });

          // 2. Attempt validation
          await validateReceiptWithServer(purchase);

          // 3. Mark completed on success
          db.transaction((tx) => {
            tx.executeSql(
              `UPDATE receipt_outbox SET status = 'COMPLETED' WHERE id = ?;`,
              [purchase.transactionId]
            );
          });
        } catch (err) {
          console.warn('IAP error cached in outbox for offline retry:', err);
        } finally {
          setIsProcessing(false);
        }
      }
    });

    const purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
      console.warn('Purchase Error listener:', error);
    });

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    };
  }, [validateReceiptWithServer]);

  const buyProduct = async (sku: string) => {
    try {
      await RNIap.requestPurchase({ sku });
    } catch (err) {
      console.error('Purchase request failed:', err);
    }
  };

  return { buyProduct, isProcessing, syncOutbox: processOfflineOutbox };
}
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Database Logging**: $O(1)$ instant write.
  - **Server validation**: $O(N)$ HTTP round-trip latency.
- **Space Complexity**: $O(D)$ local storage growth proportional to queue size $D$.
- **Explanation**: This system secures transactions using the Outbox pattern. If network connection fails or the app is closed mid-session, the purchase token remains saved inside local SQLite databases with a `'PENDING'` tag. The hook listens to `NetInfo` alerts, and when internet reaches stability, it flushes the queue sequentially, verifying transactions with the remote backend, ensuring no product purchases are lost.

---

---
