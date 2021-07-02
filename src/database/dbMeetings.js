'use strict'

const db = require('../../db')
module.exports.storeMeetingDetails = async function (meetingDetails, req, res) {
  try {
    // Connecting to the db
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)
    // Making the query command for the database
    const cmd = 'INSERT INTO MeetingDetails (member, groupname, url, datetime, time) '
    const cmdValue = `VALUES ('${meetingDetails.member}','${meetingDetails.groupName}','${meetingDetails.url}', '${meetingDetails.dateTime}', '${meetingDetails.time}')`
    const query = cmd + cmdValue

    await pool.request().query(query)
  } catch (err) {
    res.redirect('/login')
  }
}

module.exports.getMeetingDetails = async function (req, res) {
  try {
    // Connecting to the db
    const sql = db.sql
    const config = db.config
    const pool = await sql.connect(config)

    // Making the query command for the database
    const storedMeetingDetails = []
    const meetingDetails = await pool.request().query('SELECT groupname, url, datetime, time FROM MeetingDetails ')
    meetingDetails.recordset.forEach(eachMeeting => {
      storedMeetingDetails.push(eachMeeting)
    })
    res.json(storedMeetingDetails)
  } catch (err) {
    res.redirect('/login')
  }
}
