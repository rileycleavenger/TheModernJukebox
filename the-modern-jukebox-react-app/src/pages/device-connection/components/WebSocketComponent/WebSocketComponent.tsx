import React, { useState } from 'react';

const WebSocketComponent = () => {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  const initializeWebSocket = () => {
    const ws = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket server URL

    ws.onopen = () => {
      console.log('WebSocket connected!');
      setWebsocket(ws);
    };

    ws.onmessage = (event) => {
      console.log('Received message:', event.data);
      // Handle incoming messages from the WebSocket server
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed!');
      setWebsocket(null);
    };
  };

  const closeWebSocket = () => {
    if (websocket) {
      websocket.close();
    }
  };

  return (
    <div>
      {websocket ? (
        <p>WebSocket Connected!</p>
      ) : (
        <button onClick={initializeWebSocket}>Connect to WebSocket</button>
      )}

      {websocket && (
        <button onClick={closeWebSocket}>Close WebSocket</button>
      )}
    </div>
  );
};

export default WebSocketComponent;
