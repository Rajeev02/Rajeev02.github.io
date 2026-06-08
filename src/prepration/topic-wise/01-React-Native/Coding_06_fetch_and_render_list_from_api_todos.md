
## Page Summary
### Reading Time
`4 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 5: Fetch and Render List from API (Todos) |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 5: Fetch and Render List from API (Todos)
*⏱️ 3 min read*

### Question
Write a complete, optimized React Native component structure that fetches a list of todos from `https://dummyjson.com/todos` on component mount, handles loading and error states, and renders the list using a `FlatList` container displaying each todo's status and title.

### Sample Input & Output
#### API Input:
```json
{
  "todos": [
    { "id": 1, "todo": "Do something nice for someone you care about", "completed": false, "userId": 152 },
    { "id": 2, "todo": "Memorize a poem", "completed": true, "userId": 13 }
  ],
  "total": 254,
  "skip": 0,
  "limit": 30
}
```
#### Output:
Renders a loading indicator during fetch operations. Once fetched, displays a scrollable list of todos showing their completion status (e.g. checkmark or dot) and titles in a clean cards layout, with pull-to-refresh capabilities.

### Code
```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

const API_URL = 'https://dummyjson.com/todos';

interface TodoItem {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

interface ApiResponse {
  todos: TodoItem[];
  total: number;
  skip: number;
  limit: number;
}

// 1. Memoized todo cell to prevent redundant draws
const TodoRow = React.memo(({ item }: { item: TodoItem }) => {
  return (
    <View style={[styles.todoCard, item.completed && styles.todoCardCompleted]}>
      <View style={styles.statusIndicator}>
        <Text style={[styles.statusText, item.completed && styles.statusTextCompleted]}>
          {item.completed ? '✅' : '⏳'}
        </Text>
      </View>
      <Text style={[styles.todoText, item.completed && styles.todoTextCompleted]}>
        {item.todo}
      </Text>
    </View>
  );
});

export default function TodoListApp() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch data from remote endpoint using AbortController for memory safety
  const fetchTodos = useCallback(async (abortSignal?: AbortSignal) => {
    try {
      setError(null);
      const response = await fetch(API_URL, { signal: abortSignal });
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data: ApiResponse = await response.json();
      setTodos(data.todos || []);
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    
    fetchTodos(controller.signal);

    // Clean up to abort pending request if component unmounts mid-flight
    return () => {
      controller.abort();
    };
  }, [fetchTodos]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchTodos();
  };

  const renderItem = useCallback(({ item }: { item: TodoItem }) => {
    return <TodoRow item={item} />;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.infoText}>Loading todos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>❌ Error: {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Task Board ({todos.length})</Text>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        refreshing={isLoading}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.infoText}>No tasks found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e0',
  },
  listContent: {
    padding: 12,
  },
  todoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  todoCardCompleted: {
    backgroundColor: '#edf2f7',
    borderColor: '#cbd5e0',
  },
  statusIndicator: {
    marginRight: 12,
  },
  statusText: {
    fontSize: 18,
  },
  statusTextCompleted: {
    opacity: 0.8,
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    color: '#2d3748',
    lineHeight: 20,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#718096',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    marginTop: 10,
    fontSize: 15,
    color: '#718096',
  },
  errorText: {
    fontSize: 16,
    color: '#c53030',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#667eea',
    borderRadius: 6,
  },
  retryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
```

### Complexity & Explanation
- **Time Complexity**: $O(N)$ where $N$ is the number of fetched todo items rendered by the FlatList. The API request takes $O(1)$ networking time.
- **Space Complexity**: $O(N)$ space in memory to store the todo array list in state.
- **Explanation**: This component fetches todo data from dummyjson and handles loading and error states. It uses an `AbortController` passed to the fetch signal inside a `useEffect` loop. If the component unmounts before the network call completes, the controller aborts the request, preventing memory leaks and attempts to run `setTodos` on an unmounted context.

---
