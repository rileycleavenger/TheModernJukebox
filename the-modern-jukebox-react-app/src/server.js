// server.js

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Connection made');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
  });
});
