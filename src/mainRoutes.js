'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const db = require('../db.js')
const accountManager = require('../src/database/dbAccountManagement.js')
const alert = require('alert')
const groupManager = require('../src/createGroup')

function checkIfSignedIn (req, res, next) {
  if (req.session.user) {
    console.log('There')
    console.log(req.session.user)
    console.log('There')
    next()
  } else {
    // const err = new Error('Not logged in')
    // next(err)
    alert('User not logged in!')
    res.redirect('/login')
  }
}

mainRouter.get('/', function (req, res) {
  res.render('../views/register.ejs')
})

mainRouter.get('/login/home', function (req, res) {
  console.log(req.session.user)
  const user = req.session.user
  res.render('../views/home.ejs', { name: user.username })
})

mainRouter.get('/login/home/creategroup', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'createGroupForm.html'))
})

mainRouter.post('/login/home/creategroup', function (req, res) {
  groupManager.obtainExistingGroups()
  groupManager.addGroup(req.body, req, res)
})

mainRouter.get('/login/home/group', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'grouppage.html'))
})

mainRouter.get('/login/home/group/chat', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'insidegroups.html'))
})

mainRouter.get('/login/home/group/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', '/classNotes.html'))
})

mainRouter.get('/login/home/group/files', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', '/files.html'))
})

mainRouter.get('/login/home/group/team', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', '/team.html'))
})

mainRouter.get('/login/home/group/poll', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', '/poll.html'))
  mainRouter.get('/src/poll.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/poll.js'))
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

mainRouter.get('/group/applicationPoll', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'applicationPoll.html'))
  mainRouter.get('/public/votingStyle.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/votingStyle.css'))
  })
  mainRouter.get('/src/applicationPoll.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/applicationPoll.js'))
  })
})

mainRouter.get('/group/terminationPoll', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'terminationPoll.html'))
  mainRouter.get('/public/votingStyle.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/votingStyle.css'))
  })
  mainRouter.get('/src/terminationPoll.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/terminationPoll.js'))
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
  mainRouter.get('/src/profile.js', checkIfSignedIn, function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/profile.js'))
  })
})

mainRouter.get('/login', function (req, res) {
  console.log(req.body)
  console.log(req.session.user)
  res.render('../views/login.ejs')
})

// Serve html file to js file
mainRouter.get('/chat', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'chat.html'))
})

mainRouter.post('/login', function (req, res) {
  accountManager.login(req.body, req, res)
})

mainRouter.delete('/logout', checkIfSignedIn, function (req, res) {
  req.session.destroy(function () { })
  res.redirect('/login')
})

// Covid Screening after invitation
mainRouter.get('/login/home/CovidScreening', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'covidForm.html'))
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
