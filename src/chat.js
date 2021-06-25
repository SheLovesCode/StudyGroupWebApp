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

document.querySelector('#sendLocation').addEventListener('click', function(geolocation) {
    // Check if their browser supports Geolocation
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.');
    }

    // First function returns the position; Second function is if the position cannot be determine
    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function() {
        alert('Unable to fetch location.')
    })
});