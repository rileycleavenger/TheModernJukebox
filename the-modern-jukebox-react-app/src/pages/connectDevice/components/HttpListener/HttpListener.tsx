import React, { useEffect, useState } from 'react';

const HttpListener: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/messages');
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
      await fetch('http://localhost:8080/sendMessage', {
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
      <div className="flex items-center gap-8">
        <input
          className="rounded-md bg-gray-100 px-10 py-2 text-black"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button 
        className="rounded-md bg-primary-500 px-10 py-2 hover:bg-primary-700"
        onClick={sendMessage}>
          Send</button>
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