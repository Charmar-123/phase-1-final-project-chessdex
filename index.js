// Change the color of the input filed when clicked on

const nameSearch = document.querySelector('input[type="search"]');

nameSearch.addEventListener('focus', (event) => {
  event.target.style.background = '#CBEDD5';
});

nameSearch.addEventListener('blur', (event) => {
  event.target.style.background = '';
});

//Fetch the data from the Chess.com API and invoke the functions

fetch('https://api.chess.com/pub/leaderboards')
    .then(res => res.json())
    .then(data => {

        topThreePlayers(data);
        leaderboardPlayer(data);
        getChessPlayerName();
    })



// Populate the top three players card with data from Chess.com API and add event listner to the Follow! button

function topThreePlayers(data) {
    const leaderBoardCards = [document.querySelector('#first-place'), document.querySelector('#second-place'), document.querySelector('#third-place')]

    for (j = 0; j < 3; j++) {

        leaderBoardCards[j].querySelector('.card-title-leaderboard').textContent = data.battle[j].username
        leaderBoardCards[j].querySelector('.leaderboard-imgs').src = data.battle[j].avatar
        leaderBoardCards[j].querySelector('.leaderboard-group').children[0].textContent = `Score: ${data.battle[j].score}`
        leaderBoardCards[j].querySelector('.leaderboard-group').children[1].textContent = `Country: ${regionNames.of(data.battle[j].country.slice(-2))}`
        leaderBoardCards[j].querySelector('.leaderboard-group').children[2].textContent = `Status: ${data.battle[j].status}`
        leaderBoardCards[j].querySelector('.btn-outline-info').href = `https://www.chess.com/member/${data.battle[j].username}`
        leaderBoardCards[j].querySelector('.btn-outline-danger').addEventListener("click", (event) => {
            const name = event.target.parentElement.parentElement.querySelector('.card-title-leaderboard').textContent;
            event.target.style.backgroundColor = "grey"
            event.target.innerText = "✔️"

            fetch(`https://api.chess.com/pub/player/${name}`)
                .then(res => res.json())
                .then(data => {
                    followButton(data);
                })
        }, { once: true })
    }

}

// Leaderboard list with event listener to display single card

function leaderboardPlayer(data) {

    const leaderBoardButton = document.querySelectorAll('.leaderboard-btn');


    for (i = 0; i < 10; i++) {

        leaderBoardButton[i].textContent = data.battle[i].username
        leaderBoardButton[i].addEventListener('mouseenter', (event) => {
            fetch(`https://api.chess.com/pub/player/${event.target.textContent}`)
                .then(res => res.json())
                .then(data => {
                    populateCard(data);
                    

                })
        })

    }
}

//Populate a card with the information of the username from the input field

function getChessPlayerName() {
    document.querySelector('#search-btn').addEventListener('click', function () {
        const value = document.querySelector('#input-name').value;
        fetch(`https://api.chess.com/pub/player/${value}`)
            .then(function (res) {
                if (res.ok) {
                    return res.json()
                } else {
                    alert("Username does not exist!")
                    throw res.status;
                }
            })
            .then(data => {

                populateCard(data);

            })
    })

}

// Populate the pop-up card and hide top three

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
    document.querySelector('.pop-up-follow').parentElement.innerHTML = document.querySelector('.pop-up-follow').parentElement.innerHTML

    document.querySelector('.pop-up-follow').addEventListener("click", (event) => {
        followButton(data);
        event.target.style.backgroundColor = "grey"
        event.target.innerText = "✔️"

    }, { once: true })
}


// Create a card and add it to the carousel at the bottom along with a delete button

function followButton(data) {

    const cardHtml = `<div class= "card carousel-player-card" style="width: 18rem;">
    <img class="card-img-top carousel-img" src="${data.avatar}" alt="No User Image">
    <div class="card-body">
    <h5 class="card-title card-title-carousel"> ${data.username}</h5>
    </div>
    <ul class="list-group list-group-flush carousel-group">
    <li class="list-group-item">Player ID: ${data.player_id}</li>
    <li class="list-group-item">Country: ${regionNames.of(data.country.slice(-2))}</li>
    <li class="list-group-item">Status: ${data.status}</li></ul>
    <div class="card-body">
    <button class="btn btn-danger">Delete!</button>
    <a href="https://www.chess.com/member/${data.username}" class="btn btn-outline-info carousel-profile" target="_blank">Profile</a></div>
     </div >`

    const carouselElem = document.createElement('div');
    carouselElem.className = "carousel-item";
    carouselElem.innerHTML = cardHtml;

    document.querySelector(".carousel-inner").append(carouselElem)

    carouselElem.querySelector('.btn-danger').addEventListener("click", (event) => {
        event.target.parentElement.parentElement.parentElement.remove()
        document.querySelector('#carousel-img').className += ' active'
    })

}

// Get country by two letter ID

const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );