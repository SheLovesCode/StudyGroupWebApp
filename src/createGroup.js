'use strict'
// Server side, enabling Queries to occur and the retrival and outsourcing of information
// Between the Kudu server and the User

const db = require('../db.js')
const validateGrpCrd = require('../src/groupProcess')
const alert = require('alert')

module.exports.addGroup = async function (groupDetails, req, res) {
  // Storing the Details entered by the User
  const group = validateGrpCrd.storeGroupCredentials(groupDetails)
  const studyGroupName = group.studyGroup
  let doesGroupExist = false
  // Obtaining the list of the Users study groups
  const groupList = validateGrpCrd.getGroupList()
  // Finding if the Study group exist are not and verifying accordingly
  const foundGroupIndex = groupList.findIndex((group) => {
    return group.groupname === studyGroupName
  })

  // Checking if the Group entered is in the database
  if (foundGroupIndex === -1) {
    doesGroupExist = false
  } else {
    doesGroupExist = true
  }
  try {
    // Checking if the User inputted values
    if (group.email === '' || group.studyGroup === '') {
      alert('The email address or the group name was not entered')
      res.redirect('/login/home/creategroup')
      return
    }
    // Checking if the User inputted a correct email
    if (!validateGrpCrd.isEmailValid(group.email)) {
      alert('The email is not valid')
      res.redirect('/login/home/creategroup')
      return
    }
    // Checking if the User inputted a a group name that already exist
    if (doesGroupExist === true) {
      alert('The group already exist')
      res.redirect('/login/home/creategroup')
      return
    }
    // Checking if the User inputted a a group name that already exist
    if (!validateGrpCrd.isGroupNameValid(studyGroupName)) {
      alert('The study group name is not valid no special character in the name and the numeric cant be the first letter')
      res.redirect('/login/home/creategroup')
      return
    }
    AddToGroupMember(res, group.email, group.studyGroup)
    // Making the query command for the database
    const cmd = 'INSERT INTO Groups (groupcreator,groupname,grouprating) '
    const cmdValue = `VALUES ('${group.email}','${group.studyGroup}',${group.groupRating});`
    const query = cmd + cmdValue
    // Create a connection
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(query)
    alert('Successfully added')
    // Once the query successful redirect the client to the home page
    res.redirect('/login/home')
  } catch (err) {
    // If unsuccessfull refresh the page with the appropriate error  seen in the alert
    alert('Error Processing... Please try again...')
    res.redirect('/login/home/creategroup')
  }
}

// Functionality obtaining the existing groups
module.exports.obtainExistingGroups = async function () {
  try {
    // Making a connection to obtain the available groups in the database
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    const groups = await pool.request().query('SELECT groupname FROM Groups')
    validateGrpCrd.clearGroupList()
    // Storing all the database study groups in the list
    groups.recordset.forEach(element => {
      validateGrpCrd.storeGroup(element)
    })
  } catch (err) {
  }
}

// Functionality adding new or already stored groups members in the server
async function AddToGroupMember (res, member, groupname) {
  try {
    // SQL Insertion command for the GroupMembership table
    const cmd = 'INSERT INTO GroupMembership (groupname,member) '
    const cmdValue = `VALUES ('${groupname}','${member}');`
    const query = cmd + cmdValue
    // Create a connection
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(query)
    // Alert message display once query has been successfully completed
    alert('Successfully added')
  } catch (err) {
    // Alert message if failure occurred and the User is redirected to the home page to
    // demonstrate the failure
    alert('Error with query try again')
    res.redirect('/login/home/creategroup')
  }
}
/**
 *
 * @param {*} memberemail : the User email being passed around once entering the app
 * @param {*} req: request passed by the main router
 * @param {*} res : response passed by the main router
 */
module.exports.getExistingGroups = async function (memberemail, req, res) {
  try {
    // Making a connection to obtain the available groups in the database
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    const groups = await pool.request().query('SELECT groupname FROM GroupMembership WHERE member = ' + '\'' + memberemail + '\'')
    // Storing all the database study groups in the list
    const groupList = []
    groups.recordset.forEach(group => {
      groupList.push(group.groupname)
    })
    // Sending back  the response of the obtained study group a member belongs to
    res.json(groupList)
  } catch (err) {
  }
}

/**
 *
 * @param {variable containing the current user email} memberemail
 * @param {variable containing the current user study groups} groupname
 * @param {main route request} req
 * @param {main route response} res
 */
module.exports.removeExistingGroup = async function (memberemail, groupname, req, res) {
  try {
    // Making a connection to obtain the available groups in the database
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    // DELETE query removing the study group member out of the study group
    await pool.request().query('DELETE FROM GroupMembership WHERE member = ' + '\'' + memberemail + '\'' + ' AND groupname =' + '\'' + groupname + '\'')
  } catch (err) {
    // Display the error message
  }
}
