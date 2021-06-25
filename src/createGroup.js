'use strict'

const db = require('../db.js')
let groupList = []
function isEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

module.exports.addGroup = async function (groupDetails, req, res) {
  console.log(groupDetails)
  const rating = 5
  const group = {
    id: Date.now(),
    email: groupDetails.email,
    studyGroup: groupDetails.groupName,
    groupRating: rating
  }
  doesGroupExist(group.studyGroup)/*
  if (group.email === '' || group.studyGroup === '') {
    console.log('The email address or the group name was not entered')
  } else if (!isEmail(group.email)) {
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

async function doesGroupExist (groupname) {
  groupList = []
  try {
    const pool = await db.pools
    const groups = await pool.request().query('SELECT groupname FROM Groups')
    groups.recordset.forEach(element => {
      groupList.push(element)
    })
    // console.log(groups.groupname)
    // console.log(groupList)
  } catch (err) {
    console.log(err)
  }
  // const
  // array.find(x => x.name === 'string 1')
  // var foundValue = array.filter(obj=>obj.name==='string 1');
  const foundGroupIndex = groupList.findIndex((group) => {
    return group.groupname === groupname
  })
  console.log(groupname)
  console.log('******************************************')
  console.log(groupList)
  console.log('******************************************')
  console.log(foundGroupIndex)
  console.log('******************************************')

  if (foundGroupIndex === -1) {
    console.log('It does not exists')
  } else {
    const foundGroup = groupList[foundGroupIndex]
    console.log('******************************************')
    console.log(foundGroup.groupname)
    const groupFound = foundGroup.groupname
    console.log(groupFound + 'does exist')
  }
}
