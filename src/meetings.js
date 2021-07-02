// Get meetings that are already in the database
const faceMeetings = document.getElementById('faceMeetings')
const onlineMeetings = document.getElementById('onlineMeetings')
const storedMeetingDetails = []
let responseContainer = []
const userEmail = 'munyaradzi.diana@gmail.com'
const currentGroupName = 'WITS2020'

// Extract the entered dates and times
const onlineMeetingDate = document.getElementById('onlineMeetingDate')
const onlineMeetingTime = document.getElementById('onlineMeetingTime')
const onlineMeetingUrl = document.getElementById('onlineLink')

getfromDB().then(response => {
  responseContainer = response
  displayStoredMeetings(responseContainer)
})

// Get meetings when the page is loaded
getfromDB()

function displayStoredMeetings (responseContainer) {
  responseContainer.forEach(element => {
    const obj = {
      groupName: element.groupname,
      date: element.datetime,
      time: element.time,
      covidFormUrl: element.url
    }

    if (currentGroupName === element.groupname) {
      const storedDate = element.datetime
      const storedTime = element.time
      const storedUrl = element.url
      // Display Face to Face Meetings
      if (storedUrl.includes('Covid')) {
        // Creating meeting div
        const newMeeting = document.createElement('div')
        newMeeting.id = 'faceToFaceDiv'
        newMeeting.className = 'meetingDivs' // Will be used to style div
        newMeeting.innerText = 'Date: ' + storedDate + ' at ' + storedTime + ' \n Please complete the COVID-19 form to Accept\Decline the invite '
        faceMeetings.appendChild(newMeeting)

        const covidFormLink = document.createElement('a')
        const covidFormLinkText = document.createTextNode('COVID-19 Screening Form')
        covidFormLink.appendChild(covidFormLinkText)
        covidFormLink.title = 'COVID Screening Form'
        covidFormLink.href = storedUrl
        newMeeting.appendChild(covidFormLink)
      }
      // Display online meetings
      else {
        // Creating meeting div
        const newOnlineMeeting = document.createElement('div')
        newOnlineMeeting.id = 'onlineDiv'
        newOnlineMeeting.className = 'meetingDivs' // Will be used to style div
        newOnlineMeeting.innerText = 'Date: ' + storedDate + ' at ' + storedTime + '\n Meeting Link     '
        onlineMeetings.append(newOnlineMeeting)

        const onlineLink = document.createElement('a')
        onlineLink.id = 'onlineUrl'
        const onlineLinkText = document.createTextNode('Online Meeting Link')
        onlineLink.appendChild(onlineLinkText)
        onlineLink.href = storedUrl
        newOnlineMeeting.appendChild(onlineLink)
      }
    }
  })
}

// When the button is clicked, display the modal
document.getElementById('sendFaceInviteBtn').onclick = function () {
  document.querySelector('.modal').style.display = 'flex'
}

// Extract the div that contains the main_container so we can append to that instead of the body
const meetingDate = document.getElementById('meetingDate')
const meetingTime = document.getElementById('meetingTime')

// When the invitation has been created:
// 1: Append the details to the current meetings
// 2: Store them in the data based
document.getElementById('faceMeetingBtn').onclick = function () {
  // Close the modal when the student submits the invitation details
  document.querySelector('.modal').style.display = 'none'

  // Creating meeting div
  const newMeeting = document.createElement('div')
  newMeeting.id = 'faceToFaceDiv'
  newMeeting.className = 'meetingDivs' // Will be used to style div
  newMeeting.innerText = '/n Date: ' + meetingDate.value + ' at ' + meetingTime.value
  faceMeetings.appendChild(newMeeting)

  async function storingInDB (userEmail, group, formUrl, meetingDate, meetingTime) {
    const text = {
      member: userEmail,
      groupName: group,
      url: formUrl,
      dateTime: meetingDate,
      time: meetingTime,
      status: 'Update'
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    }
    const response = await fetch('/meetingDetails', options)
  }

  // Add paragraph to the div
  const instructions = document.createElement('p')
  instructions.innerHTML = 'Please complete the COVID-19 form to Accept/Decline this meeting invite \n \n'
  newMeeting.appendChild(instructions)

  const covidFormLink = document.createElement('a')
  const covidFormLinkText = document.createTextNode('Complete COVID-19 Screening Form')
  covidFormLink.appendChild(covidFormLinkText)
  covidFormLink.title = 'COVID Screening Form'
  covidFormLink.href = '../CovidScreening'
  newMeeting.appendChild(covidFormLink)

  storingInDB('Diana@gmail.com', 'WITS2020', covidFormLink.href, meetingDate.value, meetingTime.value)
}

// Close the modal if the close button is clicked
document.getElementById('closeFaceModalBtn').onclick = function () {
  document.querySelector('#faceModal').style.display = 'none'
}

async function getfromDB () {
  const text = {
    status: 'Read'
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(text)
  }
  const response = await fetch('/meetingDetails', options)
  return response.json()
}

// -- ONLINE MEETING -- //
// Display the modal when the button is clicked
document.getElementById('sendOnlineInviteBtn').onclick = function () {
  document.querySelector('#onlineModal').style.display = 'flex'
}

// When the invitation has been created:
// 1: Append the details to the current meetings
// 2: Store them in the data based
document.getElementById('onlineMeetingBtn').onclick = function () {
  // Close the modal when the student submits the invitation details
  document.querySelector('.modal').style.display = 'none'

  // Creating meeting div
  const newOnlineMeeting = document.createElement('div')
  newOnlineMeeting.id = 'onlineDiv'
  newOnlineMeeting.className = 'meetingDivs' // Will be used to style div
  newOnlineMeeting.innerText = '/n /n Date: ' + onlineMeetingDate.value + ' at ' + onlineMeetingTime.value + '     Meeting Link: '
  onlineMeetings.append(newOnlineMeeting)

  const onlineLink = document.createElement('a')
  const onlineLinkText = document.createTextNode('Online Meeting Link')
  onlineLink.appendChild(onlineLinkText)

  // Delete relative path:
  const currentURL = window.location.href
  newOnlineMeeting.appendChild(onlineLink)
  const newCurrentURL = currentURL.replace('notes', '')
  finalURL = onlineMeetingUrl.value.replace(newCurrentURL, '')
  onlineLink.href = 'http://' + finalURL
  onlineMeetings.append(onlineLink.href)

  async function storingInDB (userEmail, group, meetingUrl, meetingDate, meetingTime) {
    const text = {
      member: userEmail,
      groupName: group,
      url: meetingUrl,
      dateTime: meetingDate,
      time: meetingTime,
      status: 'Update'
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(text)
    }
    const response = await fetch('/meetingDetails', options)
  }

  storingInDB('Diana@gmail.com', 'WITS2020', onlineLink.href, onlineMeetingDate.value, onlineMeetingTime.value)
  getfromDB()

  // Close the modal when the student submits the invitation details
  document.querySelector('#onlineModal').style.display = 'none'
}

// Close the modal if the close button is clicked
document.getElementById('closeOnlineModalBtn').onclick = function () {
  document.querySelector('#onlineModal').style.display = 'none'
}
