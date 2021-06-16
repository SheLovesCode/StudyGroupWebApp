'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const db = require('../db.js')
const bcrypt = require('bcrypt')
const users = []

const passport = require('passport')

const initializePassport = require('./passport-config')
initializePassport(passport, email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

mainRouter.get('/', function (req, res) {
  //  res.send('Hello World, I\'m Node.js. Nice to meet you!')
  res.render('../views/register.ejs')
})

mainRouter.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'home.html'))
})

mainRouter.get('/test', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'welcome.html'))
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

/*
mainRouter.post('/home', function (req, res) {
  res.redirect('/chat')
}) */

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
