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
    console.log(data.data.data)
})

const num = 2994
const season = 1990
//Get player career stats 
axios({
    url: 'https://www.balldontlie.io/api/v1/season_averages',
    method: 'GET',
    params: {
        season,
        player_ids: [2931, num]
    }
}).then(data => {
    console.log(data.data.data)
})