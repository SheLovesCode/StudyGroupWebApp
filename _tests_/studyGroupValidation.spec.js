const validateGrpCrd = require('../src/groupProcess')
/**
 * Testing the credentials to add a new group to the database
 */
describe('Validating the Credentials to make a study Group', () => {
  test('Return False if the email entered has no @', () => {
    const email = 'student.gmail.com'
    const state = validateGrpCrd.isEmailValid(email)
    expect(state).toEqual(false)
  })
  test('Return False if the email entered has the wrong url after @', () => {
    const email = 'student@no'
    const state = validateGrpCrd.isEmailValid(email)
    expect(state).toEqual(false)
  })
  test('Is the email entered valid', () => {
    const email = 'student@gmail.com'
    const state = validateGrpCrd.isEmailValid(email)
    expect(state).toEqual(true)
  })
  test('Return False if the Study Group name has a special case', () => {
    const groupname = '_Group_Name'
    const state = validateGrpCrd.isGroupNameValid(groupname)
    expect(state).toEqual(false)
  })
  test('Return False if the Study Group name has a number has the first character', () => {
    const groupname = '12Group_Name'
    const state = validateGrpCrd.isGroupNameValid(groupname)
    expect(state).toEqual(false)
  })
  test('is the Study Group name valid', () => {
    const groupname = 'GroupName'
    const state = validateGrpCrd.isGroupNameValid(groupname)
    expect(state).toEqual(true)
  })
})
