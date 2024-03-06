const PokemonImage = document.getElementById('pokemon-image')
let CurrentPokemonName = '';
const winnerScreen = document.getElementById('winner-screen');
const winnerTitle = document.getElementById('winner-title');
const nameForm = document.getElementById('name-form');
const mainContainer = document.getElementById('main-container');
const UserNameInput = document.getElementById('userNameInput');
const rankingBody = document.getElementById('ranking-body');

let UserName;
const socket = io();
let USER_PTS = {};

// Get User Name
async function getUserNameFromLocal() {
    UserName = localStorage.getItem('UserName');
    if (UserName) {
        console.log('User Name : ', UserName);
        nameForm.style.display = 'none';
        mainContainer.style.display = 'flex';

        const newUserReq = await socket.timeout(5000).emitWithAck('new user from local', UserName);
        startServerConnection(newUserReq.pokemon, newUserReq.userpts);
    }
}

async function newUserName() {
    UserName = UserNameInput.value;
    if (!UserName) return;

    const newUserReq = await socket.timeout(5000).emitWithAck('new user request', UserName);
    console.log('New User Request : ', newUserReq);
    if (newUserReq.status === 'error') {
        UserNameInput.value = '';
        alert('User Name Already Exists, Choose Another !');
        return;
    }

    localStorage.setItem('UserName', UserName);
    nameForm.style.display = 'none';
    mainContainer.style.display = 'flex';

    startServerConnection(newUserReq.pokemon, newUserReq.userpts);
}

UserNameInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        newUserName();
    }
});

// Handle User Input

const UserInput = document.getElementById('guess-input')
const SubmitButton = document.getElementById('submit-button')

UserInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

function checkGuess() {
    const pokemonName = UserInput.value.toLowerCase();
    if (!pokemonName) return;

    console.log(pokemonName);
    UserInput.value = '';

    if (pokemonName === CurrentPokemonName) {
        // Send a message to the server
        socket.emit('correct guess', { UserName: UserName, PokemonName: CurrentPokemonName });
    }
    else {
        alert('Incorrect!');
    }

}


// Handle Server Response

function updateRankings() {
    let items = Object.keys(USER_PTS).map(function (key) {
        return [key, USER_PTS[key]];
    });
    items.sort(function (first, second) {
        return second[1] - first[1];
    })
    console.log('Items : ', items);

    let html = '';

    for (let i = 0; i < Math.min(10, items.length); i++) {
        const user = items[i];
        console.log('UserPts : ', user);

        html += `<tr><td>${i + 1}</td><td>${user[0]}</td><td>${user[1]}</td></tr>`;
    }

    rankingBody.innerHTML = html;
}

function startServerConnection(pokemon, userpts) {
    // Add first pokemon
    PokemonImage.src = pokemon.image;
    CurrentPokemonName = pokemon.name;
    USER_PTS = userpts;
    updateRankings();

    socket.on('change pokemon', (GUESS_DATA, c_pokemon, userpts) => {
        PokemonImage.style.display = 'none';
        winnerScreen.style.display = 'flex';
        winnerScreen.style.opacity = 1;

        if (GUESS_DATA.UserName === UserName) {
            winnerTitle.innerHTML = `Congratulations! You Guessed Correctly, Pokemon Is ${GUESS_DATA.PokemonName}`;
        } else {
            winnerTitle.innerHTML = `${GUESS_DATA.UserName} Guessed Correctly, Pokemon Is ${GUESS_DATA.PokemonName}`;
        }

        USER_PTS = userpts;
        updateRankings();

        setTimeout(() => {
            winnerScreen.style.opacity = 0;
            setTimeout(() => {
                winnerScreen.style.display = 'none';
                PokemonImage.style.display = 'inline';
            }, 500);
        }, 3000);

        PokemonImage.src = c_pokemon.image;
        CurrentPokemonName = c_pokemon.name;
    });
}


// Running Functions

getUserNameFromLocal();