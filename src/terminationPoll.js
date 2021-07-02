'use strict'

const generateList = document.getElementById('view')
let myUsernames = []
let myGroupMembers = []

// Sends the members of sendingToDB to mainroutes to interact with backend DB
sendingToDB(4).then(response => { // 4 => getTerminationPoll from TerminationPoll table
  myUsernames = response
  console.log(myUsernames)
})
let emailContent = ''
sendingToDB(0, 'TerminationPoll').then(response => { // 0 => getGroupMembers from GroupMember table
  myGroupMembers = response
})

// When the view button is pressed, generate the various termination polls
generateList.addEventListener('click', function myFunction () {
  generateList.remove()
  const heading = document.getElementById('myHeading')
  const pollBtn = document.createElement('button')
  pollBtn.innerHTML = 'Go Back to Poll'
  heading.appendChild(pollBtn)
  let numOfPollsLeft = myUsernames.length

  // Create poll question with reason
  myUsernames.forEach(function (element) {
    const pollQuestion = document.createElement('li')
    const pollElements = createPoll(element.username, element.reason)
    pollQuestion.innerText = pollElements
    heading.append(pollQuestion)

    const yesBtn = document.createElement('button')
    const noBtn = document.createElement('button')
    yesBtn.innerHTML = 'Yes'
    noBtn.innerHTML = 'No'
    heading.appendChild(yesBtn)
    heading.appendChild(noBtn)

    yesBtn.addEventListener('click', function myFunction () {
      element.yesCount += 1
      sendingToDB(2, 'TerminationPoll', element.yesCount, element.noCount, element.username, element.groupname)
      yesBtn.remove()
      noBtn.remove()
      pollQuestion.remove()
      const totalVotes = element.yesCount + element.noCount
      if (totalVotes === element.voteCount) {
        if (element.yesCount > element.noCount) {
          emailContent = element.member + 'has not found favour with the team and has been removed from the group!'
          sendingToDB(3, 'GroupMembership', element.yesCount, element.noCount, element.member, element.groupname)
        } else {
          emailContent = element.member + 'has found favour with the team and will continue to be part of the group!'
        }
        sendingToDB(3, 'TerminationPoll', element.yesCount, element.noCount, element.username, element.groupname)
        myGroupMembers.forEach(function (groupEmail) {
          sendEmail(groupEmail, emailContent)
          heading.innerHTML = 'No polls to review'
        })
      }
      if (numOfPollsLeft === 1) {
        heading.innerHTML = 'No polls to review'
        heading.appendChild(pollBtn)
        numOfPollsLeft -= 1
      } else {
        numOfPollsLeft -= 1
      }
      pollBtn.addEventListener('click', function myFunction () {
        window.location = '/group/poll.html'
      })
    }, false)

    noBtn.addEventListener('click', function myFunction () {
      element.noCount += 1
      sendingToDB(2, 'TerminationPoll', element.yesCount, element.noCount, element.username, element.groupname)
      yesBtn.remove()
      noBtn.remove()
      pollQuestion.remove()
      // send verdict when everyone has voted
      const totalVotes = (element.yesCount + element.noCount)
      if (totalVotes === element.voteCount) {
        if (element.yesCount > element.noCount) {
          emailContent = element.member + 'has not found favour with the team and has been removed from the group!'
          sendingToDB(3, 'GroupMembership', element.yesCount, element.noCount, element.member, element.groupname)
        } else if (element.yesCount <= element.noCount) {
          emailContent = element.member + 'has found favour with the team and will continue to be part of the group!'
        }
        sendingToDB(3, 'TerminationPoll', element.yesCount, element.noCount, element.username, element.groupname)
        myGroupMembers.forEach(function (groupEmail) {
          sendEmail(groupEmail, emailContent)
        })
        heading.innerHTML = 'No polls to review'
      }
      if (numOfPollsLeft === 1) {
        heading.innerHTML = 'No polls to review'
        heading.appendChild(pollBtn)
        numOfPollsLeft -= 1
      } else {
        numOfPollsLeft -= 1
      }
      pollBtn.addEventListener('click', function myFunction () {
        window.location = '/group/poll.html'
      })
    }, false)
  })

  pollBtn.addEventListener('click', function myFunction () {
    window.location = '/group/poll.html'
  })

  function createPoll (Name, Reason) {
    const poll = {
      question: 'Do you want to terminate the membership of ' + Name + ' because ' + Reason + '?'
    }
    return [poll.question]
  }
}, false)

// Function to interact with backend
async function sendingToDB (inputType, tableName = 'TerminationPoll', yesNum = 0, noNum = 0, user = '', group = '') {
  const text = {
    input: inputType,
    yesVotes: yesNum,
    noVotes: noNum,
    member: user,
    groupname: group,
    table: tableName
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

function sendEmail (emailAddress, emailContent) {
  Email.send({
    Host: 'smtp.gmail.com',
    Username: 'dummylia160@gmail.com',
    Password: '`12345qwerty',
    To: `${emailAddress}`,
    From: 'dummylia160@gmail.com',
    Subject: 'Termination Poll Results',
    Body: `${emailContent}`
  }).then(
    // message => alert(`Successfully sent to ${emailAddress}`)
  )
}
