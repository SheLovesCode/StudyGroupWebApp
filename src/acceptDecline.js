function generateAcceptDeclineBtns (allowedToMeet) {
  // Extracting meeting div
  const meetingDiv = document.getElementById('faceToFaceDiv')

  // Add an accept button to the meeting div
  const acceptBtn = document.createElement('button')
  acceptBtn.id = 'acceptBtn'
  acceptBtn.innerHTML = 'Accept Invitation'
  meetingDiv.appendChild(acceptBtn)

  // Add a decline button to the meeting div
  const declineBtn = document.createElement('button')
  declineBtn.id = 'declineBtn'
  declineBtn.innerHTML = 'Decline Invitation'
  meetingDiv.appendChild(declineBtn)

  // Display warning about co-morbidities etc
}

export { generateAcceptDeclineBtns }
