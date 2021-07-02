// Havig environment problems with testing from where these functions are used hence,
// Placing them into one folder for the testing process.

function rounding (number) {
  return Math.round(number)
}

function isEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

function informationChecker (Username, Reason) {
  if (Username === '' || Reason === '') {
    return 'Please enter all information'
  } else {
    return 'Termination poll regarding ' + Username + ' successfully created for this reason: ' + Reason
  }
}

function createPoll (Name, Reason) {
  const poll = {
    question: 'Do you want to terminate the membership of ' + Name + ' because ' + Reason + '?'
  }
  return [poll.question]
}

module.exports = {
  method1: rounding,
  method2: isEmail,
  method3: informationChecker,
  method4: createPoll
}
