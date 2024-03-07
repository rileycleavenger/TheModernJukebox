require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

const sessionSchema = new mongoose.Schema({
  sessionId: String,
  queueMessages: Array,
  playingMessages: Array,
  controlsMessages: Array
});

const Session = mongoose.model('Session', sessionSchema);

app.use(bodyParser.json());
app.use(cors());

app.get('/api/:sessionId/queue', async (req, res) => {
  const sessionId = req.params.sessionId;
  let session = await Session.findOne({ sessionId: sessionId });
  if (!session) {
    session = new Session({ sessionId: sessionId, queueMessages: [], playingMessages: [], controlsMessages: [] });
    await session.save();
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.json(session.queueMessages);
});

app.delete('/api/:sessionId/queue', async (req, res) => {
  const sessionId = req.params.sessionId;
  let session = await Session.findOne({ sessionId: sessionId });
  if (session) {
    session.queueMessages = [];
    await session.save();
  }
  res.send('Queue cleared successfully!');
});

app.post('/api/:sessionId/addQueue', async (req, res) => {
  const sessionId = req.params.sessionId;
  const { message } = req.body;
  let session = await Session.findOne({ sessionId: sessionId });
  if (!session) {
    session = new Session({ sessionId: sessionId, queueMessages: [], playingMessages: [], controlsMessages: [] });
  }
  session.queueMessages.push(message);
  await session.save();
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

app.get('/api/:sessionId/playing', async (req, res) => {
  const sessionId = req.params.sessionId;
  let session = await Session.findOne({ sessionId: sessionId });
  if (!session) {
    session = new Session({ sessionId: sessionId, queueMessages: [], playingMessages: [], controlsMessages: [] });
    await session.save();
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  if (session.playingMessages.length > 0) {
    res.json(session.playingMessages[0]);
  } else {
    res.json(null);
  }
});

app.delete('/api/:sessionId/playing', async (req, res) => {
  const sessionId = req.params.sessionId;
  let session = await Session.findOne({ sessionId: sessionId });
  if (session) {
    session.playingMessages = [];
    await session.save();
  }
  res.send('Playing cleared successfully!');
});

app.post('/api/:sessionId/addPlaying', async (req, res) => {
  const sessionId = req.params.sessionId;
  const { message } = req.body;
  let session = await Session.findOne({ sessionId: sessionId });
  if (!session) {
    session = new Session({ sessionId: sessionId, queueMessages: [], playingMessages: [], controlsMessages: [] });
  }
  session.playingMessages = [message];
  await session.save();
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

app.get('/api/:sessionId/controls', async (req, res) => {
  const sessionId = req.params.sessionId;
  let session = await Session.findOne({ sessionId: sessionId });
  if (!session) {
    session = new Session({ sessionId: sessionId, queueMessages: [], playingMessages: [], controlsMessages: [] });
    await session.save();
  }
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  if (session.controlsMessages.length > 0) {
    res.json(session.controlsMessages[0]);
  } else {
    res.json(null);
  }
});

app.delete('/api/:sessionId/controls', async (req, res) => {
  const sessionId = req.params.sessionId;
  let session = await Session.findOne({ sessionId: sessionId });
  if (session) {
    session.controlsMessages = [];
    await session.save();
  }
  res.send('Controls cleared successfully!');
});

app.post('/api/:sessionId/addControls', async (req, res) => {
  const sessionId = req.params.sessionId;
  const { message } = req.body;
  let session = await Session.findOne({ sessionId: sessionId });
  if (!session) {
    session = new Session({ sessionId: sessionId, queueMessages: [], playingMessages: [], controlsMessages: [] });
  }
  session.controlsMessages = [message];
  await session.save();
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Message received successfully!');
});

app.get('/api/sessions', async (req, res) => {
  const sessions = await Session.find({});
  const activeSessions = sessions.map(session => session.sessionId);
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.json(activeSessions);
});

app.delete('/api/sessions', async (req, res) => {
  await Session.deleteMany({});
  res.send('Sessions cleared successfully!');
});

app.post('/api/addSession', async (req, res) => {
  const { message } = req.body;
  let session = await Session.findOne({ sessionId: message });
  if (!session) {
    session = new Session({ sessionId: message, queueMessages: [], playingMessages: [], controlsMessages: [] });
    await session.save();
  }
  res.header('Access-Control-Allow-Origin', '*');
  res.send('Session added successfully!');
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});