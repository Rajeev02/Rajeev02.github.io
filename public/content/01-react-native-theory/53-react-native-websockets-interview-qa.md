> 🎯 **Topic:** React Native WebSockets & Real-Time Communication
> 📊 **Difficulty:** Advanced | 🔄 **Interview Frequency:** High
> 🏷️ **Tags:** ⭐ Frequently Asked

---

## 53. WebSockets & Real-Time Communication in React Native

*⏱️ 8 min read*

### Overview
WebSockets provide a persistent, full-duplex communication channel over a single TCP connection. Unlike HTTP, which is request-response based and stateless, WebSockets allow servers to push data to clients instantly. In React Native, WebSockets are critical for real-time applications such as chat apps, live sports scoring, trading platforms, and multiplayer games.

React Native supports WebSockets out of the box through the global `WebSocket` object, which implements the standard Web API.

---

### Implementation Example

**Basic Native WebSocket API usage:**

```javascript
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    // 1. Initialize WebSocket connection
    ws.current = new WebSocket('wss://echo.websocket.events');

    // 2. Handle connection open
    ws.current.onopen = () => {
      console.log('Connected to the server');
    };

    // 3. Handle incoming messages
    ws.current.onmessage = (e) => {
      setMessages((prev) => [...prev, { id: Date.now().toString(), text: e.data }]);
    };

    // 4. Handle errors
    ws.current.onerror = (e) => {
      console.log(e.message);
    };

    // 5. Handle connection close
    ws.current.onclose = (e) => {
      console.log('Connection closed', e.code, e.reason);
    };

    // Cleanup on unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() && ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(inputText);
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
      />
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          value={inputText} 
          onChangeText={setInputText} 
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  message: { padding: 8, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', marginRight: 8, padding: 8 }
});

export default ChatRoom;
```

---

### Interview Questions & Answers

#### Q1. What is the difference between WebSockets, Long Polling, and Server-Sent Events (SSE)?
**Answer:**
- **WebSockets:** Provides full-duplex, bidirectional communication over a single, persistent TCP connection. Ideal for chat, gaming, and real-time trading where both the client and server send high-frequency data.
- **Long Polling:** The client makes an HTTP request, and the server holds the connection open until it has new data. Once data is sent, the client immediately opens a new request. It is resource-intensive and has higher latency due to HTTP header overhead on every request.
- **Server-Sent Events (SSE):** A unidirectional channel where the client connects via HTTP and the server pushes updates. It is easier to implement than WebSockets but only supports server-to-client streaming (e.g., live news feeds).

#### Q2. How do you handle WebSocket connection drops and automatic reconnections in React Native?
**Answer:**
The native `WebSocket` API does not handle automatic reconnections. If the connection drops (e.g., user moves from Wi-Fi to cellular), the `onclose` event fires. 

To handle this, we can implement an Exponential Backoff strategy:
1. Listen to the `onclose` and `onerror` events.
2. Set a timeout to attempt reconnection.
3. If it fails, double the timeout duration before the next attempt, up to a maximum threshold.
4. Alternatively, use robust libraries like `Socket.io-client` or `ReconnectingWebSocket` which provide automatic reconnections, ping/pong heartbeats, and fallback mechanisms (like long-polling) out of the box.

#### Q3. What are Heartbeats (Ping/Pong) in WebSockets, and why are they necessary?
**Answer:**
Mobile connections are notoriously unstable. Sometimes, a connection drops silently (half-open connection) without firing the `onclose` event. 
- **Heartbeats** involve the server periodically sending a `ping` frame, to which the client must respond with a `pong` frame (or vice versa).
- If the server misses several consecutive `pongs`, it assumes the client is disconnected and explicitly closes the socket.
- If the client doesn't receive a `ping` within a specific timeframe, it can programmatically close and attempt to reconnect.

#### Q4. Why might you choose `Socket.io` over the native `WebSocket` API?
**Answer:**
While the native `WebSocket` API is lightweight, `Socket.io` provides several enterprise-grade abstractions:
1. **Automatic Reconnections:** Handles dropped connections gracefully.
2. **Fallbacks:** Automatically downgrades to HTTP long-polling if WebSockets are blocked by corporate firewalls or proxies.
3. **Room/Namespace Support:** Easily broadcast messages to specific subsets of users (e.g., chat rooms).
4. **Event Emitters:** Provides clean syntactic sugar for emitting and listening to custom events (`socket.emit('newMessage', data)`).

#### Q5. How does a WebSocket affect battery life and performance in React Native?
**Answer:**
Maintaining a persistent TCP connection prevents the device's radio from entering low-power sleep states, which can drain the battery.
- **Optimization:** WebSockets should be closed when the app goes into the background (using React Native's `AppState` API) and reopened when it comes to the foreground. Push Notifications (FCM/APNs) should be used to wake the app and notify the user of background events instead of keeping a socket alive in the background.
