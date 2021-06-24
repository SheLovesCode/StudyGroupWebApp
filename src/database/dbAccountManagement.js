
'use strict'

const db = require('../../db')
const accountProcess = require('./accountProcess')

const createUserQuery = function (user) {
  const command = 'INSERT INTO Users ( username, email, password, address) '
  const formattedData = `VALUES ('${user.username}','${user.email}', '${user.password}', '${user.address}');`
  return command + formattedData
}
async function getList () {
  try {
    const pool = await db.pools
    const users = await pool.request().query('SELECT * FROM Users')

    accountProcess.clearList()
    users.recordset.forEach(user => {
      accountProcess.addUser(user)
    })
    // console.log(users)
  } catch (err) {
    console.log(err)
  }
}

const passwordCompare = function (index, password, req, res) {
  const user = accountProcess.getList()[index]
  if (user.password === password) {
    req.session.user = { firstName: user.firstName, username: user.username }
    res.redirect('/home')
  } else {
    res.redirect('/login')
  }
}

module.exports.addUser = async function (details, req, res) {
  const user = accountProcess.createUser(details) // Create an object from the req.body
  try {
    // username unique
    if (!accountProcess.isUsernameValid(user.username)) {
      console.log('Error: Username not valid')
      res.redirect('/register')
      return
    }
    // username valid
    if (!accountProcess.isUsernameUnique(user.username)) {
      console.log('Error: Username not unique')
      res.redirect('/register')
      return
    }
    // email valid
    if (!accountProcess.isEmailValid(user.email)) {
      console.log('Error: Email not valid')
      res.redirect('/register')
      return
    }
    // email unique
    if (!accountProcess.isEmailUnique(user.email)) {
      console.log('Error: Email not valid')
      res.redirect('/register')
      return
    }
    // password valid
    if (!accountProcess.isPasswordValid(user.password, user.username)) {
      console.log('Error: Password not valid')
      res.redirect('/register')
      return
    }
    // address valid
    const pool = await db.pools
    await pool.request().query(createUserQuery(user)) // User details added to the table

    req.session.user = { name: user.username, email: user.email }
    res.redirect('/login')
  } catch (err) {
    console.log(err)
    res.redirect('/register')
  }
}

module.exports.login = async function (details, req, res) {
  try {
    await getList()
    const index = accountProcess.usernameExists(details.loginUsername)
    console.log(index)
    if (index !== -1) {
      passwordCompare(index, details.password, req, res)
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err)
  }
}
