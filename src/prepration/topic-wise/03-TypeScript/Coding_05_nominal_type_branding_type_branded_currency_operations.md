## Program 4: Nominal Type Branding (Type Branded Currency Operations)
*⏱️ 1 min read*

### Question
Design a nominal type-safety system in TypeScript that enforces strict compile-time checks on currency values:
1. Define nominal branded types **`USD`** and **`INR`** utilizing unique symbol brands.
2. Implement a validation function that acts as a type gatekeeper to cast plain numbers into their branded equivalents.
3. Write type-safe arithmetic operations (addition, subtraction) that prevent compiling actions that add USD values directly to INR values without executing exchange rate conversions first.

### Code
```typescript
// 1. Declare opaque unique symbols for nominal branding
declare const USD_BRAND: unique symbol;
declare const INR_BRAND: unique symbol;

export type USD = number & { readonly [USD_BRAND]: true };
export type INR = number & { readonly [INR_BRAND]: true };

// 2. Type gatekeeper validation functions
export function makeUSD(amount: number): USD {
  if (amount < 0) throw new Error("Currency cannot be negative");
  return amount as USD;
}

export function makeINR(amount: number): INR {
  if (amount < 0) throw new Error("Currency cannot be negative");
  return amount as INR;
}

// 3. Strict Arithmetic Operator wrappers
export class CurrencyWallet {
  static addUSD(a: USD, b: USD): USD {
    return (a + b) as USD;
  }

  static addINR(a: INR, b: INR): INR {
    return (a + b) as INR;
  }

  // Cross currency operations require a mapping conversion step
  static convertUSDToINR(usd: USD, exchangeRate: number): INR {
    return makeINR(usd * exchangeRate);
  }
}

// --- Static Verification Blocks ---
const walletUSD = makeUSD(150);
const walletINR = makeINR(12000);

// Safe operations compile cleanly
const resultUSD = CurrencyWallet.addUSD(walletUSD, makeUSD(50)); // Approved!

// Cross-currency operations trigger compile errors!
// @ts-expect-error - Compile blocks adding USD to INR directly
const errorSum = CurrencyWallet.addINR(walletINR, walletUSD); // Type error: Argument of type 'USD' is not assignable to 'INR'

// Correct conversion path compiles cleanly
const exchangeRate = 83.5;
const convertedUSD = CurrencyWallet.convertUSDToINR(walletUSD, exchangeRate);
const finalSumINR = CurrencyWallet.addINR(walletINR, convertedUSD); // Approved!
```

### Complexity & Explanation
- **Time Complexity**: Evaluated entirely during compile time. Casting functions execute in $O(1)$ constant time at runtime.
- **Space Complexity**: Zero runtime footprint.
- **Explanation**: TypeScript's default structural typing treats all numbers as compatible. Nominal type branding attaches a read-only private branded unique symbol to the primitive `number` type. This informs the compiler to reject assignments between USD, INR, and raw numbers, guaranteeing safety for sensitive transaction logic.
