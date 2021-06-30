'use strict'

// When Create Poll button is pressed, a "Successful Creation of Termination Poll" message must be sent .
const createTerminationPollButton = document.getElementById('createPollbtn')
createTerminationPollButton.addEventListener('click', function myFunction () {
  const Username = document.querySelector('#myUsername').value
  const Reason = document.querySelector('#myReason').value
  const Message = informationChecker(Username, Reason)
  if (Message != 'Please enter all information') {
    document.forms[0].reset()
  }
  alert(Message)
}, false)

function informationChecker (Username, Reason) {
  if (Username === '' || Reason === '') {
    return 'Please enter all information'
  } else {
    return 'Termination poll regarding ' + Username + ' successfully created for this reason: ' + Reason
  }
}

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
