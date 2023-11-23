const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 8080; // Use the assigned port or default to 8080

let messages = [];

app.use(bodyParser.json());
app.use(cors());

app.get('/api/queue', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.json(messages);
});

app.post('/api/addQueue', (req, res) => {
  const { message } = req.body;
  messages.push(message);
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
