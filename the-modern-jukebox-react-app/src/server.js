const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the 'cors' module

const app = express();
const port = 8080;

let messages = [];

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/sendMessage', (req, res) => {
  const { message } = req.body;
  messages.push(message);

  // Set the 'Access-Control-Allow-Origin' header to allow requests from any origin
  res.header('Access-Control-Allow-Origin', '*');

  res.send('Message received successfully!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
