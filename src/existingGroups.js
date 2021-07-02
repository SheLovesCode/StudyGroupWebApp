
const charactersList = document.getElementById('charactersList')
const searchBar = document.getElementById('searchBar')
let hpCharacters = []
const groupList = []
const username = ' '

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
  createGroupList(hpCharacters)
  displayCharacters(hpCharacters)
})

function applyGroup () {
  username = document.getElementById('username').value
  const group = document.getElementById('groupname').value
  console.log(group)
  let isValiGroup = false
  for (let i = 0; i <= groupList.length; i++) {
    console.log(groupList[i])
    console.log(group)
    if (groupList[i] === group) {
      console.log(groupList)
      isValiGroup = true
    }
  }
  if (!isValiGroup) {
    alert('Group does not exist')
  } else {

  }
}

function createGroupList (hpCharacters) {
  hpCharacters.forEach(element => {
    console.log(element.groupname)
    groupList.push(element.groupname)
  })
}

