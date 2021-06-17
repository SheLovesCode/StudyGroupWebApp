'use strict'

const physicalAddressList = []
const physicalAddress = document.getElementById('physicalAddress')

const updatePhysicalAddress = (ev) => {
  ev.preventDefault() // to stop the event from submitting
  const physicalAddr = physicalAddress.value
  if (emailAddr === '') {
    document.forms[0].reset()
    alert('The physical address is not entered')
  }  else {
    const move = {
      id: Date.now(),
      physicalAddress: physicalAddr
    }
    physicalAddressList.push(move)
    document.forms[0].reset()
    alert('Physical Address : ' + physicalAddr + ' succesfully added')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('updateBtn').addEventListener('click', updatePhysicalAddress)
})
module.exports = physicalAddr
