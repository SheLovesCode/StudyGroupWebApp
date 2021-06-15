'use strict'
// Template code for group 12

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./src/mainRoutes.js')
const port = process.env.PORT || 3000

// Socket IO configuration
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(mainRouter)
server.listen(port)

// Connection and disconnection functionality
io.on('connection', (socket) => {

  // Print out that the user has connected
  console.log('a user has connected');
  
  // Print out chat message server side
  socket.on('chat message', (chatMessage) => {
      console.log('message: ' + chatMessage); // Print out chat message in the console
      io.emit('chat message', chatMessage); // Print out message in the group chat
  });

  // Print out that the user has disconnected
  socket.on('disconnect', () => {
      console.log('User disconnected');
  });
});

console.log('Express server running on port 3000')
