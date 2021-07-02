/* eslint-env jest */
'use strict'

const accountProcess = require('../src/database/accountProcess')

describe('Tests For Checking if Details Are Unique', () => {
  test('An email address that does not exist in the server is unique', () => {
    accountProcess.clearList()
    expect(accountProcess.isEmailUnique('steven@gmail.com')).toEqual(true)
  })

  test('An email address that already exists in the list is not unique', () => {
    accountProcess.clearList()
    const FirstUser = {
      email: 'steven@gmail.com'
    }
    accountProcess.addUser(accountProcess.createUser(FirstUser))
    expect(accountProcess.isEmailUnique('steven@gmail.com')).toEqual(false)
  })

  test('A username that does not exist in the list is unique', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameUnique('Steven')).toEqual(true)
  })

  test('A username that already exists in the list is not unique', () => {
    accountProcess.clearList()
    const FirstUser = {
      username: 'Steven'
    }
    accountProcess.addUser(accountProcess.createUser(FirstUser))
    expect(accountProcess.isUsernameUnique('Steven')).toEqual(false)
  })
})
/*********************************************************************************/
describe('Tests If Details Are Valid', () => {
  test('A valid email address with @ is valid', () => {
    accountProcess.clearList()
    expect(accountProcess.isEmailValid('steve@gmail.com')).toEqual(true)
  })

  test('An email address without @ is invalid', () => {
    accountProcess.clearList()
    expect(accountProcess.isEmailValid('stevengmail.com')).toEqual(false)
  })

  test('A username with alphabets and/or numbers only is valid', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameValid('123456')).toEqual(true)
  })

  test('A username with 3 characters or less is invalid.', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameValid('Guy')).toEqual(false)
    expect(accountProcess.isUsernameValid('Go')).toEqual(false)
    expect(accountProcess.isUsernameValid('G')).toEqual(false)
  })

  test('A username with punctuation marks is invalid', () => {
    accountProcess.clearList()
    expect(accountProcess.isUsernameValid('Steve!!')).toEqual(false)
  })

  test('A password which is different from the username is valid', () => {
    accountProcess.clearList()
    expect(accountProcess.isPasswordValid('1234@kudu', 'Steven')).toEqual(true)
  })

  test('A physical address which is empty is invalid', () => {
    accountProcess.clearList()
    expect(accountProcess.isAddressValid(' ')).toEqual(true)
  })

  test('A physical address which has no comma is invalid', () => {
    accountProcess.clearList()
    expect(accountProcess.isAddressReal('Makkah Mall, King Abdullah Road, Mecca Saudi Arabia')).toEqual(true)
  })

  test('A password which is the same as the username is invalid', () => {
    accountProcess.clearList()
    expect(accountProcess.isPasswordValid('Steven', 'Steven')).toEqual(false)
  })
})
/*****************************************************************/
describe('Tests for adding users to the user list', () => {
  test('The user details are captured when a user is added to a list', () => {
    accountProcess.clearList()
    const firstUser = {
      username: 'Steve',
      email: 'steven@gmail.com',
      password: 'SoF7WaR3',
      address: '21 Adderly St'
    }

    accountProcess.addUser(accountProcess.createUser(firstUser))
    const storedObject = accountProcess.getList()[0]
    expect(storedObject.username).toEqual(firstUser.username)
    expect(storedObject.email).toEqual(firstUser.email)
    expect(storedObject.password).toEqual(firstUser.password)
    expect(storedObject.address).toEqual(firstUser.address)
  })
})

describe('Tests for user login', () => {
  test('An empty list should returns an invalid user', () => {
    accountProcess.clearList()
    const usernameIndex = accountProcess.usernameExists('Steven')
    const emailIndex = accountProcess.EmailExists('steven@gmail.com')
    expect(emailIndex).toEqual(-1)
    expect(usernameIndex).toEqual(-1)
  })

  test('The index of a valid user is returned from the list', () => {
    accountProcess.clearList()
    const user1 = {
      username: 'Steven',
      email: 'steve@gmail.com',
      password: 'SoF7WaR3',
      address: '21 Adderly St'
    }
    const user2 = {
      username: 'Farai',
      email: 'farai3@gmail.com',
      password: 'weG0agA1N',
      address: '21 Adderly St'
    }
    accountProcess.addUser(accountProcess.createUser(user1))
    accountProcess.addUser(accountProcess.createUser(user2))
    const username1Index = accountProcess.usernameExists('Steven')
    const email1Index = accountProcess.EmailExists('steve@gmail.com')
    const username2Index = accountProcess.usernameExists('Farai')
    const email2Index = accountProcess.EmailExists('farai3@gmail.com')
    expect(username1Index).toEqual(0)
    expect(username2Index).toEqual(1)
    expect(email1Index).toEqual(0)
    expect(email2Index).toEqual(1)
  })

  test('The index of a valid user is returned from a populated list', () => {
    accountProcess.clearList()
    const user1 = {
      username: 'Steven',
      email: 'steve@gmail.com',
      password: 'SoF7WaR3',
      address: '21 Adderly St'
    }
    const user2 = {
      username: 'Farai',
      email: 'farai3@gmail.com',
      password: 'weG0agA1N',
      address: '21 Adderly St'
    }
    accountProcess.addUser(accountProcess.createUser(user1))
    accountProcess.addUser(accountProcess.createUser(user2))
    const username1Index = accountProcess.usernameExists('Elijah')
    const username2Index = accountProcess.usernameExists('Kate')
    expect(username1Index).toEqual(-1)
    expect(username2Index).toEqual(-1)
    const email1Index = accountProcess.EmailExists('eli@gmail.com')
    const email2Index = accountProcess.EmailExists('kate@gmail.com')
    expect(email1Index).toEqual(-1)
    expect(email2Index).toEqual(-1)
  })

  test('Querying for a user does not alter the list', () => {
    const userObj = {
      username: 'Diana',
      email: 'diana@gmail.com',
      password: 'code4Pro',
      address: '99 Yale St'
    }
    accountProcess.clearList()
    let usernameIndex = accountProcess.usernameExists('Diana')
    let emailIndex = accountProcess.EmailExists('diana@gmail.com')
    expect(usernameIndex).toEqual(-1)
    expect(emailIndex).toEqual(-1)
    expect(accountProcess.getList()).toEqual([])

    accountProcess.addUser(accountProcess.createUser(userObj))
    usernameIndex = accountProcess.usernameExists('Diana')
    emailIndex = accountProcess.EmailExists('diana@gmail.com')
    expect(usernameIndex).toEqual(0)
    expect(emailIndex).toEqual(0)
  })
})
