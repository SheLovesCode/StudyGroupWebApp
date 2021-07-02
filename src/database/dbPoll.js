'use strict'

const db = require('../../db')
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
  }
}

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
    console.log(groupMemberCount)
    await pool.request().query(`UPDATE ${pollObj.table} SET voteCount = ${groupMemberCount} WHERE groupname = '${pollObj.groupname}'`)
    res.json(memberList)
  } catch (err) {
    console.log(err)
  }
}

async function createTerminationPoll (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`INSERT INTO TerminationPoll (username, groupname, reason, terminationStatus, voteCount, yesCount, noCount) VALUES ('${pollObj.member}','${pollObj.groupname}', '${pollObj.reason}', 'In Progress', 0, 0, 0)`)
  } catch (err) {
    console.log(err)
  }
}

async function setTermination (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`UPDATE ${pollObj.table} SET yesCount = ${pollObj.yesVotes}, noCount = ${pollObj.noVotes} WHERE username = '${pollObj.member}' AND groupname = '${pollObj.groupname}'`)
  } catch (err) {
    console.log(err)
  }
}

async function deleteTerminationPoll (pollObj, req, res) {
  try {
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    await pool.request().query(`DELETE FROM ${pollObj.table} WHERE username = '${pollObj.member}' AND groupname = '${pollObj.groupname}'`)
  } catch (err) {
    console.log(err)
  }
}

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
    console.log(err)
  }
}
