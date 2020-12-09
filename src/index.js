import "./styles/index.scss";
import "./styles/navbar.scss";
import "./styles/players.scss";

const nba = require('nba-api-client');

console.log(nba)

const jh = nba.getPlayerID("James Harden");

console.log(jh)

// nba.playerCareerStats({ PlayerID: 201935 }).then(data => {
//     console.log(data).catch(err => console.log(err))
// })

const all = nba.allPlayersList().then(data => {
    console.log(data)
})
console.log(all)