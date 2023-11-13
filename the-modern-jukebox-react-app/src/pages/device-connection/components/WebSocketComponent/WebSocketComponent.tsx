import React, { useState } from 'react';

const WebSocketComponent: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const serverURL = 'ws://localhost:8080'; // Replace with your WebSocket server's domain

  const toggleWebSocket = () => {
    if (ws) {
      ws.close();
      setWs(null);
    } else {
      const newWs = new WebSocket(serverURL);
      newWs.onopen = () => {
        console.log('Connection made');
      };
      setWs(newWs);
    }
  };

  return (
    <div>
      <button onClick={toggleWebSocket}>
        {ws ? 'Disconnect WebSocket' : 'Connect WebSocket'}
      </button>
    </div>
  );
};

export default WebSocketComponent;
