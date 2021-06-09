'use strict'

const storeNewGroup = new Array()
const wrapper = document.querySelector('.wrapper')
const form = wrapper.querySelectorAll('.form')
const submitInput = form[0].querySelector('input[type="submit"]')

function getDataForm (e) {
  e.preventDefault()
  const formData = new FormData(form[0])
  alert(formData.get('emailField') + '-' + formData.get('groupNameField'))
  storeNewGroup.push(formData.get('emailField'))
}

document.addEventListener('DOMContentLoaded', function () {
  submitInput.addEventListener('click', getDataForm, false)
}, false)
