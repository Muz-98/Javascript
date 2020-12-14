import "./styles/index.scss";
import "./styles/navbar.scss";
import "./styles/players.scss";

const axios = require('axios');
const search = 'Lebron James'

// Get player by search
axios({
    url: 'https://www.balldontlie.io/api/v1/players',
    method: 'GET',
    params: {
        search
    }
}).then(data => {
    console.log(data.data.data[0])
})

// Get all players

function listPlayers(ele) {
    let li = document.createElement('li');
    let div = document.createElement('div')
    let posdiv = document.createElement('div')
    div.textContent = ele.first_name + " " + ele.last_name 
    posdiv.textContent = ele.team.name
    li.classList.add('drop1-lis')
    li.appendChild(div)
    li.appendChild(posdiv)
    return li;
}


function searchPlayers(search = "") {

    axios({
        url: 'https://www.balldontlie.io/api/v1/players',
        method: 'GET',
        params: {
            search: search,
            per_page: 25
        }
    }).then(data => {
        const list = document.querySelector('.drop1-ul-players')
        list.innerHTML = ''
        data.data.data.forEach( player => {
            list.appendChild(listPlayers(player))
        })
        const selected = document.querySelector('.drop1-ul-players')
        selected.addEventListener('click', (event) => {
            // console.log(event.target)
            // console.log(event.target.innerText)
        
            let name = event.target.innerText 
           
        
            return renderData(getStats(clickPlayer(name)))
        })
    })
}


function clickPlayer(search) {
 
    return axios({
        url: 'https://www.balldontlie.io/api/v1/players',
        method: 'GET',
        params: {
            season: 1990,
            search: search
        }
    }).then(data => {
      
        return data.data.data[0]
    }).catch(err => {
        console.log(err)
    })
}

// searchPlayers()
function renderData(data) {
    debugger
    const tableContainer = document.querySelector('.table-container')
    const table = document.createElement('table')
    let array = []
    tableContainer.appendChild(table)
    array.push(Object.keys(data).map(el => {
        let name = el.split('_').join(' ')
        return name.toUpperCase()
    }))
    array.push(Object.values(data))
    debugger
    array.forEach(row => {
        let tr = table.insertRow();

        row.forEach(ele => {
            let td = tr.insertCell();
            td.innerText = ele;
        })
    })
    
}


const num = 2994
const season = 1990

//Get player season stats 
function getStats(player) {
  
    return axios({
        url: 'https://www.balldontlie.io/api/v1/season_averages',
        method: 'GET',
        params: {
            season: 1990,
            player_ids: player.id,
        }
    }).then(data => {
        // return renderData(data.data.data[0])
        // console.log(data)
        return data.data.data[0]
    })
}

// let yrs = []

// for (let i = 1977; i < 2021; i++) {
//     yrs.push(i)
// }

// console.log(yrs)

searchPlayers()
const searchInput = document.getElementById('search')
searchInput.addEventListener('keyup', event => {
    let se = event.target.value
    return searchPlayers(se)
})
