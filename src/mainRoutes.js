'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const bcrypt = require('bcrypt')
const users = []

const passport = require('passport')

const initializePassport = require('./passport-config')
initializePassport(passport, email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

mainRouter.get('/', function (req, res) {
  res.send('Hello World, I\'m Node.js. Nice to meet you!')
})
mainRouter.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'about.html'))
})

mainRouter.get('/register', (req, res) => {
  res.render('../views/register.ejs')
})

mainRouter.post('/register', async function (req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
  console.log(users)
})

mainRouter.get('/login', function (req, res) {
  res.render('../views/login.ejs')
})

mainRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

module.exports = mainRouter
