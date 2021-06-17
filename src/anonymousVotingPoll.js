'use strict'

// Setting the value of the heading to 1 + existing value.
// For when yes button is pressed.
function setValue1 () {
  const element1 = document.getElementById('num1')
  const value1 = element1.innerHTML
  document.getElementById('num1').innerHTML = incrementYesButton(value1)
}
// For when no button is pressed.
function setValue2 () {
  const element2 = document.getElementById('num2')
  const value2 = element2.innerHTML
  document.getElementById('num2').innerHTML = incrementNoButton(value2)
}

// Incrementation for each button
function incrementYesButton (value1) {
  return ++value1
}
function incrementNoButton (value2) {
  return ++value2
}
module.exports = incrementYesButton
