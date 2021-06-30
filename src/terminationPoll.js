'use strict'

const myUsernames = ['Elijah', 'Steve', 'Diana', 'Farai']

function createPoll (Name) {
  const poll = {
    question: 'Do you want to terminate the membership of ' + Name + '?',
    groupMemberNum: 20, // Need to get from db
    answersWeight: [0, 0], // Also from db
    // selectedAnswer: -1,
    pollCount: 0,
    No: 0,
    Yes: 0
  }
  return [poll.question, poll.groupMemberNum, poll.pollCount, poll.Yes, poll.No]
}

const heading = document.getElementById('myHeading')
const pollBtn = document.createElement('button')
pollBtn.innerHTML = 'Go Back to Poll'
heading.appendChild(pollBtn)
let numOfPollsLeft = myUsernames.length
myUsernames.forEach(function (element) {
  const pollQuestion = document.createElement('li')
  const pollElements = createPoll(element)
  pollQuestion.innerText = pollElements[0]
  heading.append(pollQuestion)
  const yesBtn = document.createElement('button')
  const noBtn = document.createElement('button')
  yesBtn.innerHTML = 'Yes'
  noBtn.innerHTML = 'No'
  heading.appendChild(yesBtn)
  heading.appendChild(noBtn)

  yesBtn.addEventListener('click', function myFunction () {
    pollElements[2] += 1
    pollElements[3] += 1
    yesBtn.remove()
    noBtn.remove()
    pollQuestion.remove()
    // alert('Number of votes cast: ' + pollElements[2] + '\n' + 'Number of yes votes: ' + pollElements[3] + '\n' + 'Number of no votes: ' + pollElements[4])
    if (numOfPollsLeft === 1) {
      heading.innerHTML = 'No polls to review'
      heading.appendChild(pollBtn)
      numOfPollsLeft -= 1
    } else {
      numOfPollsLeft -= 1
    }
    // Change db status
  }, false)

  noBtn.addEventListener('click', function myFunction () {
    pollElements[2] += 1
    pollElements[4] += 1
    yesBtn.remove()
    noBtn.remove()
    pollQuestion.remove()
    // alert('Number of votes cast: ' + pollElements[2] + '\n' + 'Number of yes votes: ' + pollElements[3] + '\n' + 'Number of no votes: ' + pollElements[4])
    if (numOfPollsLeft === 1) {
      heading.innerHTML = 'No polls to review'
      heading.appendChild(pollBtn)
      numOfPollsLeft -= 1
    } else {
      numOfPollsLeft -= 1
    }
    // Change db status
  }, false)

  pollBtn.addEventListener('click', function myFunction () {
    window.location = '/group/poll.html'
    // document.write('Please Wait...Taking you back...')
    // setTimeout(myFunction(), 10)
  })
})
