import {
    GET_BY_NAME,
    GET_ALL_POKEMONS,
    FILTER_POKEMON,
    TYPE_FILTER,
    TYPES,
    GET_DETAILS,
    GET_DETAILS_ERROR
} from '../Actions/actions_type';

const initialState = {
    pokemons: [],
    copy: [],
    order: [],
    filter: 'types',
    types: []
};

const reducer = (state= initialState, action) => {
    switch (action.type) {
        case GET_BY_NAME:
            return {
                ...state,
                pokemons: action.payload,
            };
        
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                copy: action.payload,
                order: action.payload,
            };
        
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            };
        
        case FILTER_POKEMON:
            if (action.payload === 'aToZ') {
                return {
                    ...state,
                    pokemons: [...state.copy].sort((a,b) => a.name.localeCompare(b.name)).reverse(),
                };
            }

            if (action.payload === 'ataqueDes') {
                return {
                    ...state,
                    pokemons: [...state.copy].sort((a,b) => {
                        return a.ataque.split(' - ')[1] - b.ataque.split(' - ')[1];
                    }),
                };
            }

            if (action.payload === 'ataqueAsc') {
                return {
                    ...state,
                    pokemons: [...state.copy].sort((a,b) => {
                        return b.ataque.split(' - ')[1] - a.ataque.split(' - ')[1];
                    }),
                };
            }

            return state; //  devuelve el estado actual si no se cumple ninguna de las condiciones anteriores 

        
        case TYPE_FILTER:
            if (action.payload === 'types') {
                return {
                    pokemons: state.copy,
                    filter: action.payload
                };
            } else {
                return {
                    ...state,
                    filter: action.payload,
                    pokemons: state.copy.filter((pokemon) => {
                        return pokemon.type.filter((type) => type === action.payload).length
                    })
                }
            }

        case TYPES:
            return {
                ...state,
                types: action.payload.slice(0, 100)
            };

        case GET_DETAILS_ERROR:
            return {
                ...state,
                details: null,
                error: action.payload
            };

        default:
             return state;
    }
};

export default reducer;