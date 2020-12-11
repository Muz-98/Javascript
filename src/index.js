import "./styles/index.scss";
import "./styles/navbar.scss";
import "./styles/players.scss";

const axios = require('axios');
const search = 'Lebron James'

// Get player by search
// axios({
//     url: 'https://www.balldontlie.io/api/v1/players',
//     method: 'GET',
//     params: {
//         search
//     }
// }).then(data => {
//     console.log(data.data.data)
// })

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



axios({
    url: 'https://www.balldontlie.io/api/v1/players',
    method: 'GET',
    params: {
        per_page: 100
    }
}).then(data => {
    const list = document.querySelector('.drop1-ul-players')
    
    data.data.data.forEach( player => {
        list.appendChild(listPlayers(player))
    })
})




function renderData(data) {
    let tr = document.createElement('tr')
    let th = document.createElement('th')
    let td = document.createElement('td')
    const table = document.querySelector('.stats-table')
    let array = []
    array.push(Object.keys(data).map(el => {
        let name = el.split('_').join(' ')
        // let newName = name.slice(0, 1).toUpperCase() + name.slice(1, -1)
        // return newName
        return name.toUpperCase()
    }))
    array.push(Object.values(data))
    console.log(array)

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
axios({
    url: 'https://www.balldontlie.io/api/v1/season_averages',
    method: 'GET',
    params: {
        season,
        player_ids: [2931, num]
    }
}).then(data => {
    return renderData(data.data.data[0])
})

let yrs = []

for (let i = 1977; i < 2021; i++) {
    yrs.push(i)
}

console.log(yrs)