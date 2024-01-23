const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 8080; // Use the assigned port or default to 8080

let queueMessages = [];
let playingMessages = [];

app.use(bodyParser.json());
app.use(cors());

// endpoint to get the queue
app.get('/api/queue', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.json(queueMessages);
});

app.delete('/api/queue', (req, res) => {
  queueMessages = [];
  res.send('Queue cleared successfully!');
});

app.post('/api/addQueue', (req, res) => {
  const { message } = req.body;
  queueMessages.push(message);
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

// endpoint to get the current playing song
app.get('/api/playing', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.json(playingMessages);
});

app.delete('/api/playing', (req, res) => {
  playingMessages = [];
  res.send('Playing cleared successfully!');
});

app.post('/api/addPlaying', (req, res) => {
  const { message } = req.body;
  playingMessages.push(message);
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

// listening on 8080 port
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
