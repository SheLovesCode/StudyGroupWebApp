
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
  } catch (err) {
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
      res.redirect('/register')
      return
    }
    // username valid
    if (!accountProcess.isUsernameUnique(user.username)) {
      res.redirect('/register')
      return
    }
    // email valid
    if (!accountProcess.isEmailValid(user.email)) {
      res.redirect('/register')
      return
    }
    // email unique
    if (!accountProcess.isEmailUnique(user.email)) {
      res.redirect('/register')
      return
    }
    // password valid
    if (!accountProcess.isPasswordValid(user.password, user.username)) {
      res.redirect('/register')
      return
    }
    // address valid
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(createUserQuery(user)) // User details added to the table

    req.session.user = { name: user.username, email: user.email }
    res.redirect('/login')
  } catch (err) {
    res.redirect('/register')
  }
}

module.exports.login = async function (details, req, res) {
  try {
    await getList()
    const index = accountProcess.usernameExists(details.loginUsername)
    if (index !== -1) {
      passwordCompare(index, details.password, req, res)
    } else {
      res.redirect('/login')
    }
  } catch (err) {
  }
}

// updates the address in the db for the individual in session
module.exports.updateAddress = async function (details, req, res, username) {
  try {
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
    res.json(groupList)
  } catch (err) {
  }
}
// get the username of the one in session
module.exports.getUsername = async function (details, req, res) {
  const username = req.session.user.username
  res.json(username)
}
// create row for application in db table
module.exports.sendApplication = async function (details, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`INSERT INTO ApplicationPoll (username, groupname, terminationStatus, voteCount, yesCount, noCount) VALUES ('${details.name}','${details.groupname}', 'In Progress', 0, 0, 0)`)
  } catch (err) {
  }
}
