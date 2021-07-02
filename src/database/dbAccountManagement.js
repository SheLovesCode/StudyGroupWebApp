
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
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
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
    req.session.user = { username: user.username, address: user.address, email: user.email }
    res.redirect('/login/home')
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
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(createUserQuery(user)) // User details added to the table

    req.session.user = { name: user.username, email: user.email }
    console.log(req.session.user)
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

// updates the address in the db for the individual in session
module.exports.updateAddress = async function (details, req, res, username) {
  try {
    console.log('shdjdkdldlldl')
    console.log(details.address.length)
    if (!accountProcess.isAddressValid(details.address)) {
      res.redirect('/profile')
      return
    }
    if (!accountProcess.isAddressReal(details.address)) {
      res.redirect('/profile')
      return
    }
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`UPDATE Users SET address = \'${details.address}\' WHERE username = \'${username}\'`) // User details added to the table
    req.session.user = { address: details.address }
  } catch (err) {
    console.log(err)
    res.redirect('/register')
  }
}
// Selects all the groups in the db table and stores in array of objects
module.exports.getGroups = async function (details, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    const groups = await pool.request().query('SELECT groupname FROM Groups')

    const groupList = []
    groups.recordset.forEach(user => {
      groupList.push(user)
    })
    console.log('sjjsj')
    console.log(groupList)
    console.log('sjjsj')
    res.json(groupList)
  } catch (err) {
    console.log(err)
  }
}
