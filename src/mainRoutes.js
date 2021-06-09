'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const bcrypt = require('bcrypt')
const users = []

const passport = require('passport')

const initializePassport = require('./passport-config')
const { response } = require('express')
initializePassport(passport, email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

mainRouter.get('/', function (req, res) {
  res.send('Hello World, I\'m Node.js. Nice to meet you!')
})

mainRouter.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'))
})

mainRouter.get('/register', function (req, res) {
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

// Serve html file to js file
mainRouter.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, '../src', 'chat.html'))
})

mainRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}))

mainRouter.post('/home', function (req, res) {
  res.redirect('/chat')
})

module.exports = mainRouter
