'use strict'

const db = require('../db.js')
const validateGrpCrd = require('../src/groupProcess')

module.exports.addGroup = async function (groupDetails, req, res) {
  console.log(groupDetails)
  // Storing the Details entered by the User
  const group = validateGrpCrd.storeGroupCredentials(groupDetails)
  const studyGroupName = group.studyGroup
  let doesGroupExist = false
  // List of the stored study groups=
  const groupList = validateGrpCrd.getGroupList()
  console.log(groupList)
  const foundGroupIndex = groupList.findIndex((group) => {
    return group.groupname === studyGroupName
  })
  const foundGroup = groupList[foundGroupIndex]
  console.log('******************************************')

  // Checking if the Group entered is in the database
  if (foundGroupIndex === -1) {
    console.log('It does not exists')
    doesGroupExist = false
  } else {
    console.log(foundGroup.groupname)
    const groupFound = foundGroup.groupname
    console.log(groupFound + ' does exist')
    doesGroupExist = true
  }

  try {
    // Checking if the User inputted values
    if (group.email === '' || group.studyGroup === '') {
      console.log('The email address or the group name was not entered')
      res.redirect('/creategroup')
      return
    }
    // Checking if the User inputted a correct email
    if (!validateGrpCrd.isEmailValid(group.email)) {
      console.log('The email is not valid')
      res.redirect('/creategroup')
      return
    }
    // Checking if the User inputted a a group name that already exist
    if (doesGroupExist === true) {
      console.log('The group already exist')
      res.redirect('/creategroup')
      return
    }
    // Checking if the User inputted a a group name that already exist
    if (!validateGrpCrd.isGroupNameValid(studyGroupName)) {
      console.log('The study group name is not valid')
      res.redirect('/creategroup')
      return
    }

    // Making the query command for the database
    const cmd = 'INSERT INTO Groups (groupcreator,groupname,grouprating) '
    const cmdValue = `VALUES ('${group.email}','${group.studyGroup}',${group.groupRating});`
    const query = cmd + cmdValue
    // Create a connection
    const pool = await db.pools
    await pool.request().query(query)
    console.log('Successfully added')
    res.redirect('/home')
  } catch (err) {
    console.log(err)
    res.redirect('/creategroup')
  }
}

module.exports.obtainExistingGroups = async function () {
  console.log('Storing Current Study Groups in List')
  try {
    // Making a connection to obtain the available groups in the database
    const pool = await db.pools
    const groups = await pool.request().query('SELECT groupname FROM Groups')
    validateGrpCrd.clearGroupList()
    // Storing all the database study groups in the list
    groups.recordset.forEach(element => {
      validateGrpCrd.storeGroup(element)
    })
  } catch (err) {
    console.log(err)
  }
}
