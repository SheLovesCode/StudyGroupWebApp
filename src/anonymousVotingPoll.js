'use strict'

function incrementYesButton () {
  const element = document.getElementById('num1')
  let value = element.innerHTML
  ++value

  document.getElementById('num1').innerHTML = value
}
function incrementNoButton () {
  const element = document.getElementById('num2')
  let value = element.innerHTML
  ++value

  document.getElementById('num2').innerHTML = value
}
