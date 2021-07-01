// When the button is clicked, display the modal
document.getElementById('sendFaceInviteBtn').onclick = function () {
  document.querySelector('.modal').style.display = 'flex'
}

// Extract the div that contains the main_container so we can append to that instead of the body
const meetingInformation = document.getElementsByClassName('faceMeeting')

document.getElementById('faceMeetingBtn').onclick = function () {
  // Creating meeting div
  const mainContainer = document.getElementById('mainContainer')
  const newMeeting = document.createElement('div')
  newMeeting.id = 'faceToFaceDiv'
  newMeeting.className = 'meetingDivs' // Will be used to style div
  newMeeting.innerText = 'Date: ' + meetingInformation[0].value + ' at ' + meetingInformation[1].value + '\n'
  mainContainer.appendChild(newMeeting)

  // Add paragraph to the div
  const instructions = document.createElement('p')
  instructions.innerHTML = 'Please complete the COVID-19 form to Accept/Decline this meeting invite.'
  newMeeting.appendChild(instructions)

  // Add a button to that div so users can be taken to the Covid Form
  const covidFormBtn = document.createElement('button')
  covidFormBtn.id = 'getCovidForm'
  covidFormBtn.innerHTML = 'Complete COVID-19 Screening Form'
  newMeeting.appendChild(covidFormBtn)

  // Close the modal if the close button is clicked
  document.getElementById('faceMeetingModalBtn').onclick = function () {
    document.querySelector('.modal').style.display = 'none'
  }

  // When the student opts to fill in the Covid Form
  document.getElementById('getCovidForm').onclick = function () {
    console.log('GET COVID FORM')
    window.location.href = '../CovidScreening'
  }
}
