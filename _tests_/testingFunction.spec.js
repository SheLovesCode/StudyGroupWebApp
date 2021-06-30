'use strict'

const myModule = require('../src/testingFunctions.js')
const rounding = myModule.method1
const isEmail = myModule.method2
const informationChecker = myModule.method3

describe('Rounding off testing', () => {
  test('rounded down number', () => {
    const B = 10.1
    const output = 10
    expect(rounding(B)).toEqual(output)
  })
  test('rounded up number', () => {
    const B = 10.7
    const output = 11
    expect(rounding(B)).toEqual(output)
  })
})

describe('Email validation testing', () => {
  test('valid email entered', () => {
    const email = 'kate.ember99@gmail.com'
    const result = true
    expect(isEmail(email)).toEqual(result)
  })

  test('invalid email entered', () => {
    const email = 'kate.embgmail.com'
    const result = false
    expect(isEmail(email)).toEqual(result)
  })
})

describe('From poll.js - information getter from form', () => {
  test('Both username and reason are empty', () => {
    const Username = ''
    const Reason = ''
    const result = 'Please enter all information'
    expect(informationChecker(Username, Reason)).toEqual(result)
  })
  test('Only username is empty', () => {
    const Username = ''
    const Reason = 'I have one'
    const result = 'Please enter all information'
    expect(informationChecker(Username, Reason)).toEqual(result)
  })
  test('Only reason is empty', () => {
    const Username = 'someUsername'
    const Reason = ''
    const result = 'Please enter all information'
    expect(informationChecker(Username, Reason)).toEqual(result)
  })
  test('Both username and reason are entered', () => {
    const Username = 'someUsername'
    const Reason = 'I have one'
    const result = 'Termination poll regarding ' + Username + ' successfully created for this reason: ' + Reason
    expect(informationChecker(Username, Reason)).toEqual(result)
  })
})
