'use strict'

const db = require('../../db')
const accountProcess = require('./accountProcess')

module.exports.addUser = async function (details, req, res) {
  const user = accountProcess.createUser(details) // Create an object from the req.body

  try {
    // address valid
    const pool = await db.pools
    await pool.request().query(createUserQuery(user)) // User details added to the table

    req.session.user = { name: user.username, email: user.email }
    console.log(req.session.user)
    res.redirect('/login')
  } catch (err) {
    console.log(err)
    res.redirect('/register')
  }
}
