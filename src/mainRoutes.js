'use strict'

const path = require('path')
const express = require('express')
const mainRouter = express.Router()
const db = require('../db.js')
const accountManager = require('../src/database/dbAccountManagement.js')
const alert = require('alert')

function checkIfSignedIn(req, res, next) {
  if (req.session.user) { next() } else {
    // const err = new Error('Not logged in')
    console.log(req.session.user)
    // next(err)
    alert('User not logged in!')
    res.redirect('/login')
  }
}

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

mainRouter.get('/group', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'grouppage.html'))
  mainRouter.get('/public/page.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/page.css'))
  })
  mainRouter.get('/utils/hello-and-hi.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, '../utils', '/hello-and-hi.jpg'))
  })
})

mainRouter.get('/group/content', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'insidegroups.html'))
  mainRouter.get('/group/team.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/team.html'))
  })
  mainRouter.get('/group/insidegroups.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/insidegroups.html'))
  })
  mainRouter.get('/group/classNotes.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/classNotes.html'))
  })
  mainRouter.get('/group/files.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/files.html'))
  })
  mainRouter.get('/group/poll.html', function (req, res) {
    res.sendFile(path.join(__dirname, '../views', '/poll.html'))
  })
  mainRouter.get('/src/poll.js', function (req, res) {
    res.sendFile(path.join(__dirname, '../src', '/poll.js'))
  })
  mainRouter.get('/public/insideGroups.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/insideGroups.css'))
  })
  mainRouter.get('/utils/hello-and-hi.jpg', function (req, res) {
    res.sendFile(path.join(__dirname, '../utils', '/hello-and-hi.jpg'))
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
  mainRouter.get('/public/form.css', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', '/form.css'))
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

mainRouter.post('/login', )

// Covid Screening after invitation
mainRouter.get('/CovidScreening', function (req, res) {
  res.sendFile(path.join(__dirname, '../views', 'covidForm.html'))
})

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
