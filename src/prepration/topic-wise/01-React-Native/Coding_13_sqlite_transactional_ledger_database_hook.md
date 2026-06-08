
## Page Summary
### Reading Time
`3 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 12: SQLite Transactional Ledger Database Hook |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 12: SQLite Transactional Ledger Database Hook
*⏱️ 2 min read*

### Question
Write a custom React Native hook `useLedgerDatabase` that integrates a local **SQLite database** using `react-native-sqlite-storage`. The hook must:
1. Initialize the SQLite database connection off-thread.
2. Execute a database transaction to create tables if they do not exist.
3. Provide a transactional action `addTransaction()` that inserts record fields within an ACID SQL transaction.
4. Calculate net balance aggregates using SQL `SUM()` queries and clean up connection files on hook unmount.

### Sample Input & Output
#### Hook usage:
```typescript
const { balance, addTransaction } = useLedgerDatabase();
await addTransaction("tx_999", 250.00, "credit");
```
#### Output:
Saves transactions locally. Calculates balance via SQL aggregates, triggering updates to balance state. SQLite transactions run in a separate native SQL thread, leaving the main JS thread unblocked.

### Code
```typescript
import { useEffect, useState, useCallback } from 'react';
import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true); // Enable promise-based SQLite calls

const DB_PARAMS = { name: 'FintechLedger.db', location: 'default' };

export function useLedgerDatabase() {
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);
  const [balance, setBalance] = useState<number>(0);

  // Helper to re-evaluate total balance via SQL sum query
  const calculateBalance = async (database: SQLite.SQLiteDatabase) => {
    try {
      const results = await database.executeSql(
        "SELECT SUM(CASE WHEN type = 'credit' THEN amount ELSE -amount END) as netBalance FROM ledger;"
      );
      const row = results[0].rows.item(0);
      setBalance(row.netBalance || 0);
    } catch (err: any) {
      console.error("SQL aggregation failure:", err.message);
    }
  };

  useEffect(() => {
    let activeDb: SQLite.SQLiteDatabase | null = null;

    const openDatabase = async () => {
      try {
        const openedDb = await SQLite.openDatabase(DB_PARAMS);
        activeDb = openedDb;
        setDb(openedDb);

        // Execute table initialization inside a Transaction
        await openedDb.transaction((tx) => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS ledger (
              id TEXT PRIMARY KEY,
              amount REAL NOT NULL,
              type TEXT CHECK(type IN ('credit', 'debit')) NOT NULL,
              timestamp INTEGER NOT NULL
            );`
          );
        });

        await calculateBalance(openedDb);
      } catch (err: any) {
        console.error("Database connection failure:", err.message);
      }
    };

    openDatabase();

    // Close connections on unmount to prevent resource locks
    return () => {
      if (activeDb) {
        activeDb.close().catch(err => console.error("Database close failure:", err));
      }
    };
  }, []);

  // Expose transactional insert API
  const addTransaction = useCallback(async (id: string, amount: number, type: 'credit' | 'debit') => {
    if (!db) {
      throw new Error("Database not initialized yet");
    }

    try {
      await db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO ledger (id, amount, type, timestamp) VALUES (?, ?, ?, ?);",
          [id, amount, type, Date.now()]
        );
      });
      
      // Update balance calculations
      await calculateBalance(db);
    } catch (err: any) {
      console.error("SQL execution transaction rejected:", err.message);
      throw err;
    }
  }, [db]);

  return { balance, addTransaction };
}
```

### Complexity & Explanation
- **Time Complexity**: 
  - **Transaction execution**: $O(1)$ average query insertions.
  - **Balance summation query**: $O(K)$ where $K$ is transaction records size.
- **Space Complexity**: $O(1)$ memory usage. Records are stored on disk.
- **Explanation**: This hook establishes a local SQLite relational storage engine. It creates tables and runs write commands inside a SQL `transaction` to guarantee ACID properties (atomicity and data integrity). The computations are offloaded to a background native C++ thread by `react-native-sqlite-storage`, keeping the JS thread unblocked.

---
