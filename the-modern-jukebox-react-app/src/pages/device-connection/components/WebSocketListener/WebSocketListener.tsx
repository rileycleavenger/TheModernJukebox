import React, { useState, useEffect } from 'react';

const WebSocketListener: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [receivedMessage, setReceivedMessage] = useState<string>('');
  const serverURL = 'ws://localhost:8080'; // Replace with your WebSocket server's domain

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        setReceivedMessage(event.data);
      };
    }
  }, [ws]);

  const toggleWebSocket = () => {
    if (ws) {
      ws.close();
      setWs(null);
    } else {
      const newWs = new WebSocket(serverURL);
      setWs(newWs);
    }
  };

  return (
    <div>
      <div>
        <button onClick={toggleWebSocket}>
          {ws ? 'Disconnect WebSocket' : 'Connect WebSocket'}
        </button>
      </div>
      <textarea value={receivedMessage} readOnly />
    </div>
  );
};

export default WebSocketListener;
