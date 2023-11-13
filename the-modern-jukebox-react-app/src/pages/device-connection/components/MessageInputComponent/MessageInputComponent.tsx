import React, { useState, useEffect } from 'react';

const MessageInputComponent: React.FC = () => {
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000', // Allowing origin
          },
        });
        const data = await response.json();
        setReceivedMessage(data.message);
      } catch (error) {
        console.error('Error fetching message:', error);
      }
    };

    fetchData();
  }, []);

  return <input type="text" value={receivedMessage} readOnly />;
};

export default MessageInputComponent;
