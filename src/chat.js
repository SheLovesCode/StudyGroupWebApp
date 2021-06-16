const socket = io();
const chatBox = document.getElementById('chatBox');
const messageInput = document.querySelector('input[name="message"]');

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// Send message to the server 
chatBox.addEventListener('submit', function(chatMessage) {
    chatMessage.preventDefault();
    socket.emit("createMessage:", messageInput.value);
});

// Send message to group chat
socket.on('createNewMessage', function(printMessage) {
    console.log('createNewMessage', printMessage);
    const item = document.createElement('li');
    item.innerText = printMessage;
    document.querySelector('body').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});