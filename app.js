/** Requires */
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./apis/movies/index.js');
const socketEvents = require('./websocket/events.js');

// const config = require('./config/config.json')
const path = require('path');
const app = express();

// Middlewares
app.use(express.static('public'));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'ejs');

// Define io
const server = require('http').createServer(app);  
const io = require('socket.io')(server);

// Router 
app.use('/movies', router);
socketEvents(io);

// Listens
console.log(`Listening 7000`);
server.listen(7000);
