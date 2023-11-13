import React, { useEffect, useState } from 'react';

const HttpListener: React.FC = () => {

  let receieveUrl = '';
  if (window.location.origin.includes('localhost')) {
    // Development environment
    receieveUrl = 'http://localhost:8080/messages';
  } else {
    // Production environment
    receieveUrl = `${window.location.origin}/messages`;
  }

  let sendUrl = '';
  if (window.location.origin.includes('localhost')) {
    // Development environment
    sendUrl = 'http://localhost:8080/sendMessage';
  } else {
    // Production environment
    sendUrl = `${window.location.origin}/sendMessage`;
  }

  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(receieveUrl);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendMessage = async () => {
    try {
      await fetch(sendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      setInputMessage(''); // Clear the input field after sending
      fetchData(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
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

export default HttpListener;
