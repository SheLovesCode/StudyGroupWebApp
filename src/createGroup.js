'use strict'

const db = require('../db.js')
const validateGrpCrd = require('../src/groupProcess')
let groupList = []

module.exports.addGroup = async function (groupDetails, req, res) {
  console.log(groupDetails)
  const rating = 5
  const group = {
    id: Date.now(),
    email: groupDetails.email,
    studyGroup: groupDetails.groupName,
    groupRating: rating
  }
  if (validateGrpCrd.isGroupNameValid(group.studyGroup)) { console.log('Valid Group') } else { console.log('Invalid Group') }
  const isGroupInDB = false
  const number = doesGroupExist(group.studyGroup, isGroupInDB)
  console.log(number)

/*
  if (group.email === '' || group.studyGroup === '') {
    console.log('The email address or the group name was not entered')
  } else if (!validateGrpCrd.isEmail(group.email)) {
    console.log('The email is not valid')
  } else {
    const cmd = 'INSERT INTO Groups (groupcreator,groupname,grouprating) '
    const cmdValue = `VALUES ('${group.email}','${group.studyGroup}',${group.groupRating});`
    const query = cmd + cmdValue
    try {
      const pool = await db.pools
      await pool.request().query(query)
      res.redirect('/home')
    } catch (err) {
      console.log(err)
      res.redirect('/creategroup')
    }
  } */
}

async function doesGroupExist (groupname, isGroupInDB) {
  groupList = []
  try {
    const pool = await db.pools
    const groups = await pool.request().query('SELECT groupname FROM Groups')
    groups.recordset.forEach(element => {
      groupList.push(element)
    })
  } catch (err) {
    console.log(err)
  }
  const foundGroupIndex = groupList.findIndex((group) => {
    return group.groupname === groupname
  })/*
  console.log(groupname)
  console.log('******************************************')
  console.log(groupList)
  console.log('******************************************')
  console.log(foundGroupIndex)
  console.log('******************************************') */
  if (foundGroupIndex === -1) {
    // console.log('It does not exists')
    isGroupInDB = false
    return (trial(isGroupInDB))
  } else { /*
    const foundGroup = groupList[foundGroupIndex]
    console.log('******************************************')
    console.log(foundGroup.groupname)
    const groupFound = foundGroup.groupname
    console.log(groupFound + ' does exist') */
    isGroupInDB = true
    return (trial(isGroupInDB))
  }
}

function trial (state) {
  if (state === true) return 22
  else return 44
}
