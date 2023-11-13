// WebSocketListener.tsx

import React, { useEffect, useState } from 'react';

const WebSocketListener: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        setMessages((prevMessages) => [...prevMessages, event.data]);
      };
    }
  }, [ws]);

  const toggleConnection = () => {
    if (ws) {
      ws.close();
      setWs(null);
    } else {
      const newWs = new WebSocket('ws://localhost:8080');
      newWs.onopen = () => {
        console.log('Connected to server');
      };
      setWs(newWs);
    }
  };

  return (
    <div>
      <button onClick={toggleConnection}>
        {ws ? 'Disconnect from WebSocket' : 'Connect to WebSocket'}
      </button>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketListener;
