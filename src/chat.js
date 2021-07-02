const socket = io()
const container = document.getElementById('message')

socket.on('connect', function () {
})

socket.on('disconnect', function () {
})

// Send message to the server
document.querySelector('#sendMessageButton').addEventListener('click', function (chatMessage) {
  chatMessage.preventDefault()
  socket.emit('createMessage', document.querySelector('input[name="message"]').value)
})

// Send message to group chat
socket.on('createNewMessage', function (printMessage) {
  const item = document.createElement('li')
  item.innerText = printMessage
  // document.querySelector('body').appendChild(item);
  container.appendChild(item)
  window.scrollTo(0, document.body.scrollHeight)
})
