const socket = io();

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// Send message to the server 
document.querySelector('#sendMessageButton').addEventListener('click', function(chatMessage) {
    chatMessage.preventDefault();
    socket.emit("createMessage", document.querySelector('input[name="message"]').value);
});

// Send message to group chat
socket.on('createNewMessage', function(printMessage) {
    console.log("createNewMessage", printMessage);

    let item = document.createElement('li');
    item.innerText = printMessage;
    document.querySelector('body').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});