'use strict'

let myGroupMembers = []
let memberToBeTerminated = ''
sendingToDB(0, 'TerminationPoll').then(response => {
  myGroupMembers = response
  console.log(myGroupMembers)
})
sendingToDB(0, 'ApplicationPoll').then(response => {
  myGroupMembers = response
  console.log(myGroupMembers)
})

sendingToDB(3, 'TerminationPoll')
// When Create Poll button is pressed, a "Successful Creation of Termination Poll" message must be sent .
const createTerminationPollButton = document.getElementById('createPollbtn')
createTerminationPollButton.addEventListener('click', function myFunction () {
  memberToBeTerminated = document.querySelector('#myUsername').value
  const Reason = document.querySelector('#myReason').value
  const Message = informationChecker(memberToBeTerminated, Reason)
  if (Message !== 'Please enter all information') {
    document.forms[0].reset()
    sendingToDB(1, 'TerminationPoll', Reason)
    myGroupMembers.forEach(function (myEmail) {
      sendEmail(myEmail, memberToBeTerminated)
    })
  }
  alert(Message)
}, false)

async function sendingToDB (inputType, dbTable, Reason = '', groupName) {
  const text = {
    groupname: 'YEEEE',
    table: dbTable,
    member: memberToBeTerminated,
    reason: Reason,
    input: inputType
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(text)
  }
  const response = await fetch('/api', options)
  return response.json()
}

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

// links to smtpJS host to send email
function sendEmail (emailAddress, Username) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'dummylia160@gmail.com',
    Password: '`12345qwerty',
    To: `${emailAddress}`,
    From: 'dummylia160@gmail.com',
    Subject: 'You\'ve been invited!',
    Body: `Hey there Kudu Buddy! \n A new termination poll for ${Username} has been posted. It\'s time for you to vote! \n Click here to view your pending termination polls: `
  })
}
