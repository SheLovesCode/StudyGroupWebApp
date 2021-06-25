'use strict'

// When View Pending Application button is pressed, the page routes to Pending applications.
const viewApplicationbutton = document.getElementById('Applicationbtn')
viewApplicationbutton.addEventListener('click', function myFunction () {
  window.location = '/group/applicationPoll'
}, false)

// When the View Pending Termination button is pressed it routes to the Pending terminations.
const viewTerminationbutton = document.getElementById('Terminationbtn')
viewTerminationbutton.addEventListener('click', function myFunction () {
  window.location = '/group/terminationPoll'
}, false)
