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
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

// Import chatMessages.js
const createChatMessage = require('./src/chatMessages')
const publicPath = path.join(__dirname, './src') // Important for chat.js external script

const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')

const cookieParser = require('cookie-parser') // load cookie-parser for session

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/cdn', express.static('public'))

app.use('/src', express.static('src'))
app.use('/utils', express.static('utils'))

app.use(express.static('public'))
app.use(express.static(publicPath))
app.set('view engine', 'ejs')
app.set('view engine', 'pug')
// app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(cookieParser())
app.use(session({
  secret: 'cookie_secret',
  resave: false,
  saveUninitialized: false
}))
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))

app.use(mainRouter)

// io.on listens for an event (in this case 'connection') and the call back function is the same
// as the socket declared in index.html
// the socket parameter will now be used to access the io() object in this function
io.on('connection', function (socket) {
  // Print out that the user has connected
  console.log('a user has connected')

  // Events created when a new user joins the group: for the new user and for the rest of the group
  // socket.emit('createNewMessage', createChatMessage('Diana', 'Welcome to the group chat'));
  // socket.broadcast.emit('createNewMessage', createChatMessage('Diana', 'New user has joined'));

  // Print out chat message server side
  socket.on('createMessage', function (chatMessage) {
    console.log('createMessage:', chatMessage) // Print out chat message in the console
    io.emit('createNewMessage', createChatMessage(chatMessage)) // Print out message in the group chat
  })

  // Print out that the user has disconnected
  socket.on('disconnect', function () {
    console.log('A user has disconnected')
  })
})

server.listen(port, function () {
  console.log(`Server is up on ${port}`)
})
