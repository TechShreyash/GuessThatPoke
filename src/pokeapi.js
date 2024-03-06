const TotalPokemons = 1025;

// fucntion to get random no
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// function to get json from url
async function getJson(url) {
    const response = await fetch(url);
    return await response.json();
}

// function to get random pokemon
async function getRandomPokemon() {
    try {
        const id = getRandomNumber(TotalPokemons - 1) + 1; // from 1 to 1302
        console.log('Random Pokemon ID : ', id);

        const pokemonData = await getJson(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const name = pokemonData.name.toLowerCase();
        const image = pokemonData.sprites.other['official-artwork'].front_default;
        return { name, image };
    }
    catch (err) {
        return getRandomPokemon();
    }
}

module.exports = { getRandomPokemon };