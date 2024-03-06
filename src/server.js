const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');
const { getRandomPokemon } = require('./pokeapi');
const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

app.use(express.static(join(__dirname, '../public')));
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, '../public/index.html'));
});


let CURRENT_POKEMON = {};
const USER_PTS = {};

getRandomPokemon().then((pokemon) => {
    CURRENT_POKEMON = pokemon;
    console.log('Current Pokemon : ', CURRENT_POKEMON);
});


io.on('connection', (socket) => {
    console.log('New user connected')

    socket.on('correct guess', (GUESS_DATA) => {
        console.log('Correct Guess Made : ', GUESS_DATA);
        USER_PTS[GUESS_DATA.UserName] += 10;

        // Get new pokemon
        getRandomPokemon().then((pokemon) => {
            console.log('New Pokemon : ', pokemon);
            CURRENT_POKEMON = pokemon;
            io.emit('change pokemon', GUESS_DATA, CURRENT_POKEMON, USER_PTS);
        });

    });

    socket.on('new user request', (UserName, callback) => {
        console.log('new user request :', UserName);
        if (UserName in USER_PTS) {
            callback({
                status: 'error',
            });
            return;
        }
        else {
            USER_PTS[UserName] = 0;
            callback({
                status: 'ok', pokemon: CURRENT_POKEMON, userpts: USER_PTS
            });
        }
    });

    socket.on('new user from local', (UserName, callback) => {
        console.log('new user from local : ', UserName);
        if (!(UserName in USER_PTS)) {
            USER_PTS[UserName] = 0;
        }
        callback({
            status: 'ok', pokemon: CURRENT_POKEMON, userpts: USER_PTS
        });
    });
});


server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});
module.exports = server;