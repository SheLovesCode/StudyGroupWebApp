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
  res.render('../views/register.ejs')
})

mainRouter.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'))
  mainRouter.get('/public/home.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/home.css'))
  })
})

mainRouter.get('/creategroup', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'createGroupForm.html'))
  mainRouter.get('/public/form.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/form.css'))
  })
  mainRouter.get('/src/createGroup.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/createGroup.js'))
  })
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

// Serve html file to js file
mainRouter.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, '../src', 'chat.html'))
})

mainRouter.post('/login', passport.authenticate('local', {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true
}))

mainRouter.delete('/logout', function (req, res) {
  req.logOut()
  res.redirect('/login')
})

module.exports = mainRouter
