const { Pokemon, Type } = require('../db');
const { API_URL } = process.env;
const axios = require('axios');

const getAPIPokemons = async () => {
    //Traigo de la API
    const getPokemonDetails = (url) => {
        //Obtengo los detalles de un pokemon
        return axios
        .get(url)
        .then((response) => response.data)
        .catch((error) => console.log(error));
    };

    //Obtengo la lista de URLs de todos los pokemon
    const response = await axios.get(`${API_URL}?limit=250`);
    const urls = response.data.results.map((pokemon) => pokemon.url);

    //Obtengo los detalles de todos los pokemon
    const pokemonDetails = await Promise.all(
        urls.map((url) => getPokemonDetails(url))
    );

    //convertimos el arrat de detalles
    const pokemonsAPI = pokemonDetails.map((pokemon) => {
        return {
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.home.front_default,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            speed: pokemon.stats[5].base_stat,
            height: pokemon.height,
            weight: pokemon.weight,
            types: pokemon.types.map((type) => type.type.name),
        };
    });
    return pokemonsAPI;
};

const getDBPokemons = async () => {
    //Busco en la base de datos
    const pokemonsDB = await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });

    const pokemonsDbMap = pokemonsDB.map((pokemon) => ({
        ...pokemon.toJSON(),
        types: pokemon.types.map((type) => type.name),
    }));
    
    return pokemonsDbMap;
};

const getAllPokemons = async () => {
    const pokemonsAPI = await getAPIPokemons();
    const pokemonsDB = await getDBPokemons();

    //Guardo ambas respuestas en un array
    const allPokemons = [...pokemonsDB, ...pokemonsAPI];

    return allPokemons;
};

module.exports = getAllPokemons;