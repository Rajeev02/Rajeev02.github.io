## 🏗️ Section: System Design Coding
*⏱️ 2 min read*

### Program 24: Implement an LRU Cache (Memory Management)
**Question**: Image caching is critical in React Native. Implement an LRU (Least Recently Used) cache with `get` and `put` methods in $O(1)$ time complexity using a Hash Map and a Doubly Linked List.
```typescript
class DLinkedNode {
    key: number;
    value: number;
    prev: DLinkedNode | null = null;
    next: DLinkedNode | null = null;
    constructor(key: number = 0, value: number = 0) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    private capacity: number;
    private cache: Map<number, DLinkedNode>;
    private head: DLinkedNode;
    private tail: DLinkedNode;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new DLinkedNode();
        this.tail = new DLinkedNode();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    private addNode(node: DLinkedNode) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next!.prev = node;
        this.head.next = node;
    }

    private removeNode(node: DLinkedNode) {
        let prev = node.prev;
        let next = node.next;
        prev!.next = next;
        next!.prev = prev;
    }

    private moveToHead(node: DLinkedNode) {
        this.removeNode(node);
        this.addNode(node);
    }

    private popTail(): DLinkedNode {
        let res = this.tail.prev;
        this.removeNode(res!);
        return res!;
    }

    get(key: number): number {
        const node = this.cache.get(key);
        if (!node) return -1;
        this.moveToHead(node);
        return node.value;
    }

    put(key: number, value: number): void {
        const node = this.cache.get(key);
        if (!node) {
            const newNode = new DLinkedNode(key, value);
            this.cache.set(key, newNode);
            this.addNode(newNode);
            if (this.cache.size > this.capacity) {
                const tail = this.popTail();
                this.cache.delete(tail.key);
            }
        } else {
            node.value = value;
            this.moveToHead(node);
        }
    }
}
```

### Program 25: Implement an Event Bus (Pub/Sub)
**Question**: Implement a lightweight Event Emitter (Pub/Sub) class for cross-component communication without using React Context or Redux.
```typescript
type Callback = (...args: any[]) => void;

class EventBus {
    private events: Map<string, Callback[]>;

    constructor() {
        this.events = new Map();
    }

    subscribe(event: string, callback: Callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event)!.push(callback);

        // Return unsubscribe function
        return () => {
            const listeners = this.events.get(event)!;
            this.events.set(event, listeners.filter(cb => cb !== callback));
        };
    }

    publish(event: string, ...args: any[]) {
        if (this.events.has(event)) {
            this.events.get(event)!.forEach(callback => callback(...args));
        }
    }
}
```

### Program 26: State Machine for Checkout Flow
**Question**: Build a finite state machine (FSM) hook to manage a complex checkout flow (Cart -> Shipping -> Payment -> Success / Error).
```typescript
import { useReducer } from 'react';

type State = 'CART' | 'SHIPPING' | 'PAYMENT' | 'SUCCESS' | 'ERROR';
type Action = 
  | { type: 'NEXT_TO_SHIPPING' }
  | { type: 'NEXT_TO_PAYMENT' }
  | { type: 'COMPLETE_PAYMENT' }
  | { type: 'FAIL_PAYMENT' }
  | { type: 'RETRY' };

const checkoutReducer = (state: State, action: Action): State => {
  switch (state) {
    case 'CART':
      return action.type === 'NEXT_TO_SHIPPING' ? 'SHIPPING' : state;
    case 'SHIPPING':
      return action.type === 'NEXT_TO_PAYMENT' ? 'PAYMENT' : state;
    case 'PAYMENT':
      if (action.type === 'COMPLETE_PAYMENT') return 'SUCCESS';
      if (action.type === 'FAIL_PAYMENT') return 'ERROR';
      return state;
    case 'ERROR':
      return action.type === 'RETRY' ? 'PAYMENT' : state;
    default:
      return state;
  }
};

export const useCheckoutStateMachine = () => {
  const [state, dispatch] = useReducer(checkoutReducer, 'CART');
  return { state, dispatch };
};

---
