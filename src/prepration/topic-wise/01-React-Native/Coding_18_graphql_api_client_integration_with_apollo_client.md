
## Page Summary
### Reading Time
`5 Minutes`

## Topic Metadata
| Property | Value |
| --- | --- |
| Topic Name | Program 17: GraphQL API Client Integration with Apollo Client |
| Difficulty | Medium |
| Interview Frequency | High |
| Tags | ⭐ Frequently Asked |

---


## Program 17: GraphQL API Client Integration with Apollo Client
*⏱️ 3 min read*

### Question
Write a complete React Native component structure that integrates with a GraphQL API endpoint using Apollo Client. 
1. Bootstrap the Apollo Client instance with custom headers, error-link interception (logging out on `401 Unauthorized`), and in-memory cache normalization.
2. Build a component `SecurityPortfolioList` that queries user transactions, uses parameters, handles loading/error layouts, and implements a mutation (e.g. `addTransaction`) with optimistic UI response updates to maintain 60 FPS visual state transitions.

### Sample Input & Output
#### GraphQL Schema (Queries & Mutations):
```graphql
query GetPortfolio($userId: ID!) {
  portfolio(userId: $userId) {
    id
    balance
    holdings {
      symbol
      shares
      value
    }
  }
}

mutation AddHolding($userId: ID!, $symbol: String!, $shares: Int!) {
  addHolding(userId: $userId, symbol: $symbol, shares: $shares) {
    id
    symbol
    shares
    value
  }
}
```
#### Output:
- Displays loading indicators while fetching.
- Renders transaction list normalized from cache.
- Tapping "Add Holding" instantly updates list in memory (Optimistic UI) before network resolver returns.

### Code
```tsx
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity, 
  Button 
} from 'react-native';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  useQuery, 
  useMutation, 
  gql, 
  createHttpLink 
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

// 1. Setup Apollo Client Http Link
const httpLink = createHttpLink({
  uri: 'https://api.myportal.com/graphql',
});

// 2. Inject Authorization Credentials Dynamically
const authLink = setContext(async (_, { headers }) => {
  const token = 'mock_jwt_session_token'; // Load from Secure MMKV in production
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  };
});

// 3. Error Interception Link (Token Expired Handling)
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      if (err.extensions?.code === 'UNAUTHENTICATED') {
        console.warn('Session expired, triggering logout redirect...');
        // Perform redirection or dispatch logout action here
      }
    }
  }
  if (networkError) console.error(`[Network Error]: ${networkError}`);
});

// 4. Instantiate Normalized Cache Apollo Client
export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink).concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Portfolio: {
        fields: {
          holdings: {
            merge(existing = [], incoming) {
              return [...incoming]; // Cache policy replacement rules
            }
          }
        }
      }
    }
  })
});

// GraphQL Query & Mutation Documents
const GET_PORTFOLIO = gql`
  query GetPortfolio($userId: ID!) {
    portfolio(userId: $userId) {
      id
      balance
      holdings {
        id
        symbol
        shares
        value
      }
    }
  }
`;

const ADD_HOLDING = gql`
  mutation AddHolding($userId: ID!, $symbol: String!, $shares: Int!) {
    addHolding(userId: $userId, symbol: $symbol, shares: $shares) {
      id
      symbol
      shares
      value
    }
  }
`;

interface Holding {
  id: string;
  symbol: string;
  shares: number;
  value: number;
}

interface PortfolioData {
  portfolio: {
    id: string;
    balance: number;
    holdings: Holding[];
  };
}

export function SecurityPortfolioList({ userId }: { userId: string }) {
  // Query hook with configuration policies
  const { data, loading, error, refetch } = useQuery<PortfolioData>(GET_PORTFOLIO, {
    variables: { userId },
    fetchPolicy: 'cache-and-network',
  });

  // Mutation hook with Optimistic UI updates
  const [addHoldingMutation] = useMutation(ADD_HOLDING);

  const handleAddAsset = async () => {
    try {
      await addHoldingMutation({
        variables: { userId, symbol: 'GOOGL', shares: 10 },
        // Optimistic Response triggers instant local cache writes
        optimisticResponse: {
          __typename: 'Mutation',
          addHolding: {
            __typename: 'Holding',
            id: 'temp_id_' + Date.now(),
            symbol: 'GOOGL',
            shares: 10,
            value: 1500.00
          }
        },
        // Update local apollo cache manually based on result
        update: (cache, { data: { addHolding } }) => {
          const existingData = cache.readQuery<PortfolioData>({
            query: GET_PORTFOLIO,
            variables: { userId }
          });

          if (existingData) {
            cache.writeQuery({
              query: GET_PORTFOLIO,
              variables: { userId },
              data: {
                portfolio: {
                  ...existingData.portfolio,
                  holdings: [...existingData.portfolio.holdings, addHolding]
                }
              }
            });
          }
        }
      });
    } catch (err) {
      console.error('Mutation failure:', err);
    }
  };

  if (loading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4a5568" />
        <Text>Fetching Portfolio...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>GraphQL Error: {error.message}</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  const holdings = data?.portfolio?.holdings || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Portfolio (Balance: ${data?.portfolio?.balance?.toFixed(2) || '0.00'})</Text>
      <FlatList
        data={holdings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.symbol}>{item.symbol}</Text>
            <Text style={styles.details}>{item.shares} shares - ${item.value.toFixed(2)}</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddAsset}>
        <Text style={styles.btnText}>+ ADD GOOGL POSITION</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f7fafc' },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#2d3748' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: '#e53e3e', marginBottom: 10 },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 14, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    marginVertical: 4 
  },
  symbol: { fontWeight: 'bold', color: '#4a5568' },
  details: { color: '#718096' },
  addButton: { 
    backgroundColor: '#3182ce', 
    padding: 16, 
    borderRadius: 8, 
    alignItems: 'center', 
    marginTop: 10 
  },
  btnText: { color: '#fff', fontWeight: 'bold' }
});

export function ApolloAppWrapper({ userId }: { userId: string }) {
  return (
    <ApolloProvider client={apolloClient}>
      <SecurityPortfolioList userId={userId} />
    </ApolloProvider>
  );
}
```

### Complexity & Explanation
- **Time Complexity**: $O(1)$ query retrieval from normalized cache. Network round trips are $O(G)$ where $G$ is GraphQL server resolver query response time.
- **Space Complexity**: $O(M)$ memory storage in Apollo Cache proportional to number of active nodes.
- **Explanation**: Setting up Apollo Provider with normalized caches avoids prop drilling or manual REST caches. We configured setContext to handle access headers, onError to monitor session expirations globally, and update/optimisticResponse hooks to bypass server round-trips for instant client updates.

---
