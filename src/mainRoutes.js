'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const db = require('../db.js')
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('./passport-config')
const accountManager = require('../src/database/dbAccountManagement.js')

const users = []
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

mainRouter.get('/sendInvite', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'sendInvite.html'))
  mainRouter.get('/public/form.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/form.css'))
  })
  mainRouter.get('/src/sendInvite.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/sendInvite.js'))
  })
})

mainRouter.get('/register', (req, res) => {
  res.render('../views/register.ejs')
})

mainRouter.post('/register', async function (req, res) {
  console.log(req.body)
  accountManager.addUser(req.body, req, res)
})

mainRouter.get('/profile', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'profile.html'))
  mainRouter.get('/public/profile.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/profile.css'))
  })
  mainRouter.get('/src/profile.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/profile.js'))
  })
})

mainRouter.get('/login', function (req, res) {
  console.log(req.body)
  accountManager.login(req.body, req, res)
  res.render('../views/login.ejs')
})

// Serve html file to js file
mainRouter.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'chat.html'))
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

mainRouter.get('/database', function (req, res) {
  // Make a query to the database
  db.pools
    // Run query
    .then((pool) => {
      return pool.request()
        // This is only a test query, change it to whatever you need
        .query('SELECT 1')
    })
    // Send back the result
    .then(result => {
      res.send(result)
    })
    // If there's an error, return that with some description
    .catch(err => {
      res.send({
        Error: err
      })
    })
})

module.exports = mainRouter
