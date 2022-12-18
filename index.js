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
        leaderboardPlayer(data)
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

function leaderboardPlayer(data) {
    // Set const for all values
    const leaderBoardButton = document.querySelectorAll('.leaderboard-btn')


    for (i = 0; i < 10; i++) {

        leaderBoardButton[i].textContent = data.battle[i].username
        leaderBoardButton[i].addEventListener('mouseenter', (event) => {
            fetch(`https://api.chess.com/pub/player/${event.target.textContent}`)
                .then(res => res.json())
                .then(data => {
                    populateCard(data)
                    

                })
        })

    }
}

function populateCard(data) {
    document.querySelectorAll('.place-card').forEach(element => element.style.display = 'none')
    document.querySelector('#pop-up-card').style.display = 'block'

    document.querySelector('.pop-up-img').src = data.avatar
    document.querySelector('.card-title-pop-up').textContent = data.username
    document.querySelector('.pop-up-group').children[0].textContent = `Player ID: ${data.player_id}`
    document.querySelector('.pop-up-group').children[1].textContent = `Country: ${regionNames.of(data.country.slice(-2))}`

    document.querySelector('.pop-up-group').children[2].textContent = `Status: ${data.status}`
    document.querySelector('.pop-up-profile').href = `https://www.chess.com/member/${data.username}`

    document.querySelector('.leaderboard-list').style.height = '45rem'
    document.querySelector('.pop-up-follow').style.backgroundColor = ""
    document.querySelector('.pop-up-follow').innerText = "Follow!"

}