'use strict'

const db = require('../../db')
const accountProcess = require('./accountProcess')

const createUserQuery = function (user) {
  const command = 'INSERT INTO Users (id, name, email, password) '
  const formattedData = `VALUES ('${user.id}','${user.name}','${user.email}', '${user.password}');`
  return command + formattedData
}

const inserQuery = function (tablename, columns, values) {
  const command = 'INSERT INTO ' + tablename + ' ' + columns + ' VALUES ' + values
  // const formattedData = `VALUES ('${user.id}','${user.name}','${user.email}', '${user.password}');`
  return command
}

const readQuery = function (tablename, columns) {
  const command = 'SELECT '+ columns +' FROM '+ tablename
  // const formattedData = `VALUES ('${user.id}','${user.name}','${user.email}', '${user.password}');`
  return command
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
  const colum = '(username,email,password,address)'
  const formattedData = `('${user.name}','${user.email}', '${user.password}','JHB');`
  try {
    const pool = await db.pools
    // await pool.request().query(createUserQuery(user))
    //* **********************************************/
    await pool.request().query(inserQuery('Users', colum, formattedData))
    /************************************************/
    req.session.user = { id: user.id, name: user.name, email: user.email, password: user.password }
    res.redirect('/login')
  } catch (err) {
    console.log(err)
    res.redirect('/register')
  }

  module.exports.login = async function (details, req, res) {
    try {
      await getList()
    } catch (err) {
      console.log(err)
    }
  }
}
