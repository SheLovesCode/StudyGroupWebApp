'use strict'

const email = document.getElementById('email')
const studyGroup = document.getElementById('groupName')

const sendInvite = (event) => {
  event.preventDefault()
  const emailAddress = email.value
  const studyGroupName = studyGroup.value

  if (emailAddress === '' || studyGroupName === '') {
    document.forms[0].reset()
    alert('The email address or the group name was not entered')
  } else if (!isEmail(emailAddress)) {
    document.forms[0].reset()
    alert('The email is not valid')
  } else {
    sendEmail(emailAddress, studyGroupName)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn').addEventListener('click', sendInvite)
})

function isEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

// links to smtpJS host to send email
function sendEmail (emailAddress, studyGroupName) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'dummylia160@gmail.com',
    Password: '`12345qwerty',
    To: `${emailAddress}`,
    From: 'dummylia160@gmail.com',
    Subject: 'You\'ve been invited!',
    Body: `Hey there Kudu Buddy! \n You\'ve been invited to study with ${studyGroupName}! \n Click this link below to accept/decline \n http://127.0.0.1:5500/views/inviteToGroup.html`
  }).then(
    message => alert(`Successfully sent to ${emailAddress}`)
  )
  document.forms[0].reset()
}

// takes you back to home after clicking the "Cancel" button
const Homebutton = document.getElementById('Homebtn')
Homebutton.addEventListener('click', function myFunction () {
  window.location = 'home'
  document.write('Please Wait...Taking you home...')
  setTimeout(myFunction(), 4000)
}, false)
