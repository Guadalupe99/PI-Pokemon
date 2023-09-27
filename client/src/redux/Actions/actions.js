import axios from 'axios';
import {
    FILTER_TYPE,
    GET_DETAIL,
    GET_POKEMONS,
    CLEAN_DETAIL,
    GET_TYPES,
    POST_POKEMON,
    GET_NAME,
    ORDER,
    CREATE
} from './actions_types';

export const getPokemons = () => {
    return async function (dispatch) {
        const { data } = await axios.get('http://localhost:3001/pokemons');
        dispatch({ type: GET_POKEMONS, payload: data });
    };
};

export const getDetail = (id) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`);
            dispatch({ type: GET_DETAIL, payload: data});
        } catch (error) {
            return [];
        }
    };
};

export const getName = (name) => {
    return async function (dispatch) {
        try {
            const { data } = await axios.get(
                `http://localhodt:3001/pokemons?name=${name}`
            );
            dispatch({ type: GET_NAME, payload: data });
        } catch (error) {
            const errorData = {
                message: 'Error: Pokemon not found',
                status: error.response ? error.response.status : null,
            };
            throw errorData;
        }
    };
};

export const getTypes = () => {
    return async function (dispatch) {
        const { data } = await axios.get(`http://localhost:3001/types`);
        dispatch({ type: GET_TYPES, payload: data});
    };
};

export const postPokemon = (newPokemon) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.post(`http://localhost:3001/pokemons`, newPokemon);
            return dispatch({ type: POST_POKEMON, payload: data });
        } catch (error) {
            return error.message;
        }
    };
};

export const filter = (type) => {
    return { type: FILTER_TYPE, payload: type };
};

export const order = (order) => {
    // A: ascendente o D: decendente
    return { type: ORDER, payload: order };
};

export const create = (create) => {
    return { type: CREATE, payload: create };
};

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL };
};