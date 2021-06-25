// Havig ennvironment problems with testing from where these functions are used hence,
// Placing them into one folder for the testing process.

function rounding (number) {
  return Math.round(number)
}

function isEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

module.exports = {
  method: rounding,
  otherMethod: isEmail
}
