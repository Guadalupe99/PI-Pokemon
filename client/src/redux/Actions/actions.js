import axios from 'axios';
import { 
    GET_BY_NAME,
    GET_ALL_POKEMONS,
    TYPES,
    TYPE_FILTER,
    FILTER_POKEMON,
    GET_DETAILS,
    GET_DETAILS_ERROR
}  from './actions_type';

export const getAllPokemons = () => {
    return async (dispatch) => {
        const response = await axios('http://localhost:3001/pokemons');
        dispatch({
            type: GET_ALL_POKEMONS,
            payload: response.data
        });
    };
}

export const getByName = (name) => {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/pokemons/search?name=${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data
        });
    };
}

export const getTypes = () => {
    return async function(dispatch) {
        const response = await axios ('http://localhost:3001/types')
        return dispatch({
            type: TYPES,
            payload: response.data,
        })
    }
};

export const filterType = (filter) => {
    return {
        type: TYPE_FILTER,
        payload: filter
    };
};

export const filterPokemon = (filterName) => {
    return {
        types: FILTER_POKEMON,
        payload: filterName
    };
};

export const getDetails = (id) => {
    return async function (dispatch) {
        try {
            const response = await axios(`http://localhost:3001/pokemons/${id}`);
            dispatch({
                type: GET_DETAILS,
                payload: response.data
            });
        } catch (error) {
            console.log('Error al obtener los detalles del pokemon', error);
            dispatch({
                type:GET_DETAILS_ERROR,
                payload: error.response?.data?.message  || `Error: No existe pokemon con ese ID: ${id}`
            });
        }
    }
}