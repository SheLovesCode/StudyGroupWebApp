'use strict'

const db = require('../../db')
const accountProcess = require('./accountProcess')

const createUserQuery = function (user) {
  const command = 'INSERT INTO Users (id, name, email, password) '
  const formattedData = `VALUES ('${user.id}','${user.name}','${user.email}', '${user.password}');`
  return command + formattedData
}

async function getList () {
  try {
    const pool = await db.pools
    const users = await pool.request().query('SELECT * FROM Users')
    // accountProcess.clearList()
    // users.recordset.forEach(user => {
    //   accountProcess.addUser(user)
    // })
    console.log(users)
  } catch (err) {
    console.log(err)
  }
}

module.exports.addUser = async function (details, req, res) {
  const user = accountProcess.createUser(details)
  try {
    const pool = await db.pools
    await pool.request().query(createUserQuery(user))

    req.session.user = { id: user.id, name: user.name, email: user.email, password: user.password }
    res.redirect('/login')
  } catch (err) {
    console.log(err)
    res.redirect('/register')
  }

  module.exports.login = async function (details, req, res) {
    try {
      await getList()
      // if ('loginUsername' in details) {
      //   const index = accountProcess.userNameExists(details.loginUsername)
      //   if (index !== -1) {
      //     passwordCompare(index, details.loginUsernamePassword, req, res)
      //   } else {
      //     const message = `The username for '${details.loginUsername}' does not exist.`
      //     res.render('error.ejs',
      //       { error: 'Invalid Username', message: message, tips: [], link: '/', button: 'Accounts' })
      //   }
      // }
      // if ('loginEmail' in details) {
      //   const index = accountProcess.emailExists(details.loginEmail)
      //   if (index !== -1) {
      //     passwordCompare(index, details.loginEmailPassword, req, res)
      //   } else {
      //     const message = `The email address for '${details.loginEmail}' does not exist.`
      //     res.render('error.ejs',
      //       { error: 'Invalid Email', message: message, tips: [], link: '/', button: 'Accounts' })
      //   }
      // }
    } catch (err) {
      console.log(err)
      //   const message = 'Please Try Again'
      //   res.render('error.ejs',
      //     { error: 'Error Accessing Database', message: message, tips: [], link: '/', button: 'Accounts' })
    }
  }
}
