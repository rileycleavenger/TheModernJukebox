// server.js

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Connection established');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Handle the incoming message from the client
  });

  // Example: Sending a message back to the client
  ws.send('Hello, client! You are now connected to the WebSocket server.');
});
