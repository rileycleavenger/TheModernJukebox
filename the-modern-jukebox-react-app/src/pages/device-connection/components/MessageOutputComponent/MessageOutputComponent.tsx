import React, { useState } from 'react';

const MessageOutputComponent: React.FC = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      await fetch('http://localhost:8080', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000', // Allowing origin
        },
        body: JSON.stringify({ message }),
      });
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageOutputComponent;
