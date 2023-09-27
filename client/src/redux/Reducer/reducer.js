import {
    GET_POKEMONS,
    GET_DETAIL,
    CLEAN_DETAIL,
    GET_TYPES,
    POST_POKEMON,
    GET_NAME,
    FILTER_TYPE,
    ORDER,
    CREATE
} from '../Actions/actions_types';

const initialState = {
    allPokemons: [],
    pokemons: [],
    pokemonDetail: {},
    pokemonsTypes: [],
    pokrmondFiltered: [],
    selectedType: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            };

        case GET_DETAIL:
            return {
                ...state,
                pokemonDetail: action.payload };

        case GET_NAME: 
            return {
                ...state,
                pokemons: [action.payload],
            };

        case GET_TYPES:
            return {
                ...state,
                pokemonsTypes: action.payload
            };

        case POST_POKEMON:
            return { ...state };

        case FILTER_TYPE:
            let allPokemonsType = state.allPokemons;
            let typeFiltered = 
            action.payload === 'All'
            ? allPokemonsType
            : allPokemonsType.filter((pokemon) => {
                return pokemon.types.some((name) => name === action.payload);
            });
            return {
                ...state,
                pokemons: typeFiltered,
            };

        case ORDER:
            const orderPokemons = [...state.pokemons];
            if (action.payload === 'A') {
                orderPokemons.sort(function (a,b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    pokemons: orderPokemons,
                };
            }

            if (action.payload === 'D') {
                orderPokemons.sort(function (a,b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                });
                return {
                    ...state,
                    pokemons: orderPokemons,
                };
            }

            if (action.payload === 'W') {
                //W de Weak = Debil
                orderPokemons.sort(function (a,b) {
                    if (a.attack > b.attack) {
                        return 1;
                    }
                    if (b.attack > a.attack) {
                        return -1;
                    }
                    return 0;
                });
                return {
                    ...state,
                    pokemons: orderPokemons,
                };
            }

            if (action.payload === 'S') {
                //S de strong = fuerte
                orderPokemons.sort(function(a,b) {
                    if (a.attack > b.attack) {
                        return -1;
                    }
                    if (b.attack > a.attack) {
                        return 1;
                    }
                });
                return {
                    ...state,
                    pokemons: orderPokemons,
                };
            }

            if (action.payload === 'none') {
            }
            return {
                ...state,
                pokemons: orderPokemons,
            };

        case CREATE:
            const pokemonCreado = state.allPokemons;
            const pokemonFilter =
             action.payload === 'Creado'
               ? pokemonCreado.filter((poke) => poke.createdInDB)
               : pokemonCreado.filter((poke) => !poke.createdInDB);
            return {
                ...state,
                pokemons:
                 action.payload === 'A'
                   ? pokemonCreado
                   : pokemonFilter.length
                   ? pokemonFilter
                   : [],
            };

        case CLEAN_DETAIL:
            return {
                ...state,
                pokemonsDetail: {},
            };

        default:
            return { ...state };
    }
};

export default reducer;