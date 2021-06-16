let socket = io();
let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');

// Send message to the server 
form.addEventListener('submit', function(chatMessage) {
    chatMessage.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
    }
});

// Send message to group chat
socket.on('chat message', function(printMessage) {
    let item = document.createElement('li');
    item.textContent = printMessage;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});