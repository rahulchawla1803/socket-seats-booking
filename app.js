/** Requires */
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./apis/movies/index.js');
const socketEvents = require('./websocket/events.js');
// const config = require('./config/config.json')
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());

// Define io
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

// Router 
app.use('/movies', router);
socketEvents(io);

// Listens

console.log(`Listening 7000`);
server.listen(7000);

// Socket events
