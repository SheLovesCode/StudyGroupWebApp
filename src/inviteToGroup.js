'use strict'

// When the accept button is pressed, the page routes to group chat.
const Acceptbutton = document.getElementById('Acceptbtn')
Acceptbutton.addEventListener('click', function myFunction () {
  window.location = '../src/chat.html'
  document.write('Please Wait...Adding you to your new Group...')
  setTimeout(myFunction(), 4000)
}, false)

// When the decline button is pressed it routes back to the home-page.
const button = document.getElementById('Declinebtn')
button.addEventListener('click', function () {
  window.location = 'home.html'
}, false)
