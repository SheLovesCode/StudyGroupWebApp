'use strict'

const charactersList = document.getElementById('charactersList')
const searchBar = document.getElementById('searchBar')
let hpCharacters = []

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase()

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.groupname.toLowerCase().includes(searchString)
    )
  })
  displayCharacters(filteredCharacters)
})

async function loadCharacters () {
  const ob = {
    name: 'name'
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  body: JSON.stringify(ob)
  const response = await fetch('/nApi', options)
  return response.json()
}

const displayCharacters = (characters) => {
  const htmlString = characters
    .map((character) => {
      return `
            <li class="character">
                <h2>${character.groupname}</h2>
            </li>
        `
    })
    .join('')
  charactersList.innerHTML = htmlString
}

loadCharacters().then(response => {
  hpCharacters = response
  displayCharacters(hpCharacters)
})
