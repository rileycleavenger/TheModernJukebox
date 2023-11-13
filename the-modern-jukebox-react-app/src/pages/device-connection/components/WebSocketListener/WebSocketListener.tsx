// WebSocketListener.tsx

import React, { useEffect, useState } from 'react';

const WebSocketListener: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [inputMessage, setInputMessage] = useState('');

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

  const sendMessage = () => {
    if (ws && inputMessage.trim() !== '') {
      ws.send(inputMessage);
      setInputMessage(''); // Clear the input field after sending
    }
  };

  return (
    <div>
      <button onClick={toggleConnection}>
        {ws ? 'Disconnect from WebSocket' : 'Connect to WebSocket'}
      </button>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketListener;
