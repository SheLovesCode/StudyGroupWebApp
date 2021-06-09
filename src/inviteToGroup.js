'use strict'

const Acceptbutton = document.getElementById('Acceptbtn')
Acceptbutton.addEventListener('click', function myFunction () {
  window.location = 'groupPage.html'
  document.write('Please Wait...Adding you to your Group')
  setTimeout(myFunction(), 3000)
}, false)

const button = document.getElementById('Declinebtn')
button.addEventListener('click', function () {
  const headerElement = document.getElementById('heading')
  headerElement.innerHTML = 'Welcome to my Kudu Buddy!'
}, false)
