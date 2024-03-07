const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
const port = process.env.PORT || 8080; // Use the assigned port or default to 8080

let queueMessages = [];
let playingMessages = [];
let controlsMessages = [];
let activeSessions = [];
let sessions = {};

app.use(bodyParser.json());
app.use(cors());

// endpoint to get the queue
app.get('/api/:sessionId/queue', (req, res) => {
  const sessionId = req.params.sessionId;
  if (!sessions[sessionId]) {
    sessions[sessionId] = { queueMessages: [], playingMessages: [], controlsMessages: [] };
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.json(sessions[sessionId].queueMessages);
});

app.delete('/api/:sessionId/queue', (req, res) => {
  const sessionId = req.params.sessionId;
  if (sessions[sessionId]) {
    sessions[sessionId].queueMessages = [];
  }
  res.send('Queue cleared successfully!');
});

app.post('/api/:sessionId/addQueue', (req, res) => {
  const sessionId = req.params.sessionId;
  const { message } = req.body;
  if (!sessions[sessionId]) {
    sessions[sessionId] = { queueMessages: [], playingMessages: [], controlsMessages: [] };
  }
  sessions[sessionId].queueMessages.push(message);
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

// endpoint to get the current playing song
app.get('/api/:sessionId/playing', (req, res) => {
  const sessionId = req.params.sessionId;
  if (!sessions[sessionId]) {
    sessions[sessionId] = { queueMessages: [], playingMessages: [], controlsMessages: [] };
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  if (sessions[sessionId].playingMessages.length > 0) {
    res.json(sessions[sessionId].playingMessages[0]);
  } else {
    res.json(null);
  }
});

app.delete('/api/:sessionId/playing', (req, res) => {
  const sessionId = req.params.sessionId;
  if (sessions[sessionId]) {
    sessions[sessionId].playingMessages = [];
  }
  res.send('Playing cleared successfully!');
});

app.post('/api/:sessionId/addPlaying', (req, res) => {
  const sessionId = req.params.sessionId;
  const { message } = req.body;
  if (!sessions[sessionId]) {
    sessions[sessionId] = { queueMessages: [], playingMessages: [], controlsMessages: [] };
  }
  sessions[sessionId].playingMessages = [message]; // Replace the existing playing message with the new one
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

// endpoint to get the control inputs
app.get('/api/:sessionId/controls', (req, res) => {
  const sessionId = req.params.sessionId;
  if (!sessions[sessionId]) {
    sessions[sessionId] = { queueMessages: [], playingMessages: [], controlsMessages: [] };
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  if (sessions[sessionId].controlsMessages.length > 0) {
    res.json(sessions[sessionId].controlsMessages[0]);
  } else {
    res.json(null);
  }
});

app.delete('/api/:sessionId/controls', (req, res) => {
  const sessionId = req.params.sessionId;
  if (sessions[sessionId]) {
    sessions[sessionId].controlsMessages = [];
  }
  res.send('Controls cleared successfully!');
});

app.post('/api/:sessionId/addControls', (req, res) => {
  const sessionId = req.params.sessionId;
  const { message } = req.body;
  if (!sessions[sessionId]) {
    sessions[sessionId] = { queueMessages: [], playingMessages: [], controlsMessages: [] };
  }
  sessions[sessionId].controlsMessages = [message]; // Replace the existing controls message with the new one
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
