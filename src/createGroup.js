'use strict'
//Just a random comment

const groupList = []
const email = document.getElementById('email')
const studyGroup = document.getElementById('groupName')

const addStudyGroup = (ev) => {
  ev.preventDefault() // to stop the event from submitting
  const emailAddr = email.value
  const studyGroupName = studyGroup.value

  if (emailAddr === '' || studyGroupName === '') {
    document.forms[0].reset()
    alert('The email address or the group name was not entered')
  } else if (!isEmail(emailAddr)) {
    document.forms[0].reset()
    alert('The email is not valid')
  } else {
    const movie = {
      id: Date.now(),
      email: emailAddr,
      studyGroup: studyGroupName
    }
    groupList.push(movie)
    document.forms[0].reset()
    alert('Group : ' + studyGroupName + ' succesfully added')
  }
/*
  // for displaying purposes
  console.warn('added', { groupList })
  const pre = document.querySelector('#msg pre')
  pre.textContent = '\n' + JSON.stringify(groupList, '\t', 2)

  // Save maybe to a local storage
  localStorage.setItem('MyMoviesList', JSON.stringify(groupList)) */
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn').addEventListener('click', addStudyGroup)
})

function isEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}
