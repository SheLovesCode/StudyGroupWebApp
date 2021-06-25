'use strict'

// Creates a poll object with a question and possible answers
const poll = {
  question: 'Do you want to terminate the membership of (PersonName) from this group?',
  answers: [
    'Yes', 'No'
  ],
  pollCount: 20,
  answersWeight: [0, 0],
  selectedAnswer: -1
}

// Writes to the document
const pollDOM = {
  question: document.querySelector('.poll .question'),
  answers: document.querySelector('.poll .answers')
}

// Creates a class of the visuals to display the answer and answer values.
pollDOM.question.innerText = poll.question
pollDOM.answers.innerHTML = poll.answers.map(function (answer, i) {
  return (
    `
      <div class="answer" onclick="markAnswer('${i}')">
        ${answer}
        <span class="percentage-bar"></span>
        <span class="percentage-value"></span>
      </div>
    `
  )
}).join('')

// Creates a border around the selected answer, calculates the new percentage of the new answer selected.
// Only allows a user to vote once
function markAnswer (i) {
  poll.selectedAnswer = +i
  try {
    document.querySelector('.poll .answers .answer.selected').classList.remove('selected')
  } catch (msg) {}
  document.querySelectorAll('.poll .answers .answer')[+i].classList.add('selected')
  showResults()
}

// Calculates the pnew percentage of the selected answer
function showResults () {
  const answers = document.querySelectorAll('.poll .answers .answer')
  for (let i = 0; i < answers.length; i++) {
    let percentage = 0
    if (i == poll.selectedAnswer) {
      percentage = rounding(
        (poll.answersWeight[i] + 1) * 100 / (poll.pollCount + 1)
      )
    } else {
      percentage = rounding(
        (poll.answersWeight[i]) * 100 / (poll.pollCount + 1)
      )
    }
    // Implements the percentage bar relative to the size of the answer bar
    answers[i].querySelector('.percentage-bar').style.width = percentage + '%'
    answers[i].querySelector('.percentage-value').innerText = percentage + '%'
  }
}

// Rounds off the numbers
function rounding (number) {
  return Math.round(number)
}
