
const charactersList = document.getElementById('charactersList')
const searchBar = document.getElementById('searchBar')
let hpCharacters = []
const groupList = []
let username = ' '

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

async function loadUsername () {
  const ob = {
    name: 'name'
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ob)
  }

  const response = await fetch('/jApi', options)
  return response.json()
}

async function makeApplication (username, group) {
  const ob = {
    name: username,
    groupname: group
  }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ob)
  }

  const response = await fetch('/pApi', options)
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
  createGroupList(hpCharacters)
  displayCharacters(hpCharacters)
})

loadUsername().then(response => {
  username = response
})

function applyGroup () {
  const group = document.getElementById('groupname').value
  let isValiGroup = false
  for (let i = 0; i <= groupList.length; i++) {
    if (groupList[i] === group) {
      isValiGroup = true
    }
  }
  if (!isValiGroup) {
    alert('Group does not exist')
  } else {
    makeApplication(username, group)
  }
}

function createGroupList (hpCharacters) {
  hpCharacters.forEach(element => {
    groupList.push(element.groupname)
  })
}
