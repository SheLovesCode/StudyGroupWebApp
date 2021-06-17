'use strict'
let userList = []

module.exports = {
  createUser: function (info) {
    // Extracts user info and returns an object with the necessary info
    const userObj = {
      id: Date.now().toString(),
      name: info.name,
      email: info.email,
      password: info.password
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
  }
  
}
