//Import express
const express = require('express');
const app = express();

// // Import http
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Serve html file to js file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
 });

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

// Listen on a port
server.listen(3000, () => {
    console.log('listening on port 3000');
});