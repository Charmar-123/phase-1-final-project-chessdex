const nameSearch = document.querySelector('input[type="search"]');

nameSearch.addEventListener('focus', (event) => {
  event.target.style.background = '#CBEDD5';
});

nameSearch.addEventListener('blur', (event) => {
  event.target.style.background = '';
});


fetch('https://api.chess.com/pub/leaderboards')
    .then(res => res.json())
    .then(data => {

        topThreePlayers(data)
    })





function topThreePlayers(data) {
    const leaderBoardCards = [document.querySelector('#first-place'), document.querySelector('#second-place'), document.querySelector('#third-place')]

    for (j = 0; j < 3; j++) {

        leaderBoardCards[j].querySelector('.card-title-leaderboard').textContent = data.battle[j].username
        leaderBoardCards[j].querySelector('.leaderboard-imgs').src = data.battle[j].avatar
        leaderBoardCards[j].querySelector('.leaderboard-group').children[0].textContent = `Score: ${data.battle[j].score}`
        leaderBoardCards[j].querySelector('.leaderboard-group').children[1].textContent = `Country: ${regionNames.of(data.battle[j].country.slice(-2))}`
        leaderBoardCards[j].querySelector('.leaderboard-group').children[2].textContent = `Status: ${data.battle[j].status}`
        leaderBoardCards[j].querySelector('.btn-outline-info').href = `https://www.chess.com/member/${data.battle[j].username}`
    }

}