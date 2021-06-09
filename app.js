'use strict'
// Template code for group 12

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = require('path')
const express = require('express')
const app = express()
const mainRouter = require('./src/mainRoutes.js')
const port = process.env.PORT || 3000

const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
// const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
// app.use(methodOverride('_method'))

app.use(mainRouter)
app.listen(port)
console.log('Express server running on port 3000')
