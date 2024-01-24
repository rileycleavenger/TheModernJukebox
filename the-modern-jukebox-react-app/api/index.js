const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 8080; // Use the assigned port or default to 8080

let queueMessages = [];
let playingMessages = [];
let controlsMessages = [];
let activeSessions = [];

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
  if (playingMessages.length > 0) {
    res.json(playingMessages[0]);
  } else {
    res.json(null);
  }
});

app.delete('/api/playing', (req, res) => {
  playingMessages = [];
  res.send('Playing cleared successfully!');
});

app.post('/api/addPlaying', (req, res) => {
  const { message } = req.body;
  playingMessages = [message]; // Replace the existing playing message with the new one
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

// endpoint to get the control inputs
app.get('/api/controls', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  if (controlsMessages.length > 0) {
    res.json(controlsMessages[0]);
  } else {
    res.json(null);
  }
});

app.delete('/api/controls', (req, res) => {
  controlsMessages = [];
  res.send('Controls cleared successfully!');
});

app.post('/api/addControls', (req, res) => {
  const { message } = req.body;
  controlsMessages = [message]; // Replace the existing controls message with the new one
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

// endpoint to keep track of sessions and tokens
app.get('/api/sessions', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.json(activeSessions);
});

app.delete('/api/sessions', (req, res) => {
  activeSessions = [];
  res.send('sessions cleared successfully!');
});

app.post('/api/addSession', (req, res) => {
  const { message } = req.body;
  activeSessions.push(message);
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

// listening on 8080 port
app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});
