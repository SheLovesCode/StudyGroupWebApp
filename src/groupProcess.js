'use strict'

module.exports = {

  isGroupNameValid: function (studyGroupName) {
    const verifyName = studyGroupName
    if (verifyName !== '') {
      if (/[^A-Za-z\d]/.test(verifyName)) {
        //console.log('Study group name has a special character plz enter only letters and numbers')
        return false
      }
      if (studyGroupName[0] === '0' || studyGroupName[0] === '1' || studyGroupName[0] === '2' || studyGroupName[0] === '3' || studyGroupName[0] === '4' || studyGroupName[0] === '5' || studyGroupName[0] === '6' || studyGroupName[0] === '7' || studyGroupName[0] === '8' || studyGroupName[0] === '9') {
        //console.log('Study group name cannot start with a numeric plz enter a Letter first')
        return false
      }
      return true
    } else {
      return false
    }
  },

  isEmailValid: function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
}
