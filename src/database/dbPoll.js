'use strict'

const db = require('../../db')

// Certain functions are called based on the pollObj.input value
module.exports.selectFunction = async function (pollObj, req, res) {
  if (pollObj.input === 0) {
    getGroupMembers(pollObj, req, res)
  } else if (pollObj.input === 1) {
    createTerminationPoll(pollObj, req, res)
  } else if (pollObj.input === 2) {
    setTermination(pollObj, req, res)
  } else if (pollObj.input === 3) {
    deleteTerminationPoll(pollObj, req, res)
  } else if (pollObj.input === 4) {
    getTerminationPolls(pollObj, req, res)
  } else if (pollObj.input === 5) {
    addMember(pollObj, req, res)
  }
}

// Get the group members of the group from database
async function getGroupMembers (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    const member = await pool.request().query(`SELECT member FROM GroupMembership WHERE groupname = '${pollObj.groupname}'`)
    let groupMemberCount = 0
    const memberList = []
    member.recordset.forEach(user => {
      groupMemberCount += 1
      memberList.push(user.member)
    })
    await pool.request().query(`UPDATE ${pollObj.table} SET voteCount = ${groupMemberCount} WHERE groupname = '${pollObj.groupname}'`)
    res.json(memberList)
  } catch (err) {
  }
}

// creates termination poll row in db
async function createTerminationPoll (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`INSERT INTO TerminationPoll (username, groupname, reason, terminationStatus, voteCount, yesCount, noCount) VALUES ('${pollObj.member}','${pollObj.groupname}', '${pollObj.reason}', 'In Progress', 0, 0, 0)`)
  } catch (err) {
  }
}

// updates the termination table
async function setTermination (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`UPDATE ${pollObj.table} SET yesCount = ${pollObj.yesVotes}, noCount = ${pollObj.noVotes} WHERE username = '${pollObj.member}' AND groupname = '${pollObj.groupname}'`)
  } catch (err) {
  }
}

// removes the row from table once the voting has been completed
async function deleteTerminationPoll (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`DELETE FROM ${pollObj.table} WHERE username = '${pollObj.member}' AND groupname = '${pollObj.groupname}'`)
  } catch (err) {
  }
}

// returns all the pending termination and application polls
async function getTerminationPolls (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    const terminationPolls = await pool.request().query(`SELECT * FROM ${pollObj.table}`)
    const memberList = []
    terminationPolls.recordset.forEach(user => {
      memberList.push(user)
    })
    res.json(memberList)
  } catch (err) {
  }
}

// adds member to group in db
async function addMember (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`INSERT INTO GroupMembership (groupname, member, memberrating) VALUES ('${pollObj.groupname}','${pollObj.member}', 0)`)
  } catch (err) {
  }
}
