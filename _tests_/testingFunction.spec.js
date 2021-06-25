const myModule = require('../src/testingFunctions.js')
const rounding = myModule.method
const isEmail = myModule.otherMethod

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
