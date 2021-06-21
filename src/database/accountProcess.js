'use strict'
let userList = []

module.exports = {
  createUser: function (info) {
    // Extracts user info and returns an object with the necessary info
    const userObj = {
      username: info.username,
      email: info.email,
      password: info.password,
      address: info.address
    }

    return userObj
  },

  addUser: function (userObj) {
    // Pushes user object into user list
    userList.push(userObj)
  },

  // getUserList
  getList: function () {
    return [...userList]
  },

  // clearUserList
  clearList: function () {
    userList = []
  },

  // Username exists
  usernameExists: function (username) {
    const index = userList.findIndex((user) => {
      return user.username === username
    })
    return index
  },
  // Username unique
  isUsernameUnique: function (username_) {
    for (let i = 0; i !== userList.length; i++) {
      if (userList[i].username === username_) { return false }
    }
    return true
  },
  // Username is valid
  isUsernameValid: function (username_) {
    const validLength = 4
    if (username_.length < validLength) { return false }

    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')
    const numbers = '0123456789'.split('')

    for (let i = 0; i !== username_.length; i++) {
      if ((letters.indexOf(username_[i].toLowerCase()) !== -1) || (numbers.indexOf(username_[i]) !== -1)) { continue } else { return false }
    }
    return true
  },
  // email is valid
  isEmailValid: function (email_) {
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailFormat.test(String((email_.toLowerCase())))
  },
  // Email Unique
  isEmailUnique: function (email_) {
    for (let i = 0; i !== userList.length; i++) {
      if (userList[i].email === email_) { return false }
    }
    return true
  }
  // Email exists

}