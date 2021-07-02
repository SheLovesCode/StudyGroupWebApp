'use strict'

async function sendingToDB (physicalAddress) {
  const ob = {
    address: physicalAddress
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ob)
  }
  const response = await fetch('/mApi', options)
  return response.json()
}

function updatePhysicalAddress () {
  const physicalAddress = document.getElementById('physicalAddress').value
  sendingToDB(physicalAddress).then(response => {
    console.log('dddd')
  })
  alert('The address,' + physicalAddress + ',was updated.')
}

function goHome () {
  window.location = '/login/home'
  document.write('Please Wait...Taking you home...')
  setTimeout(goHome(), 4000)
}
