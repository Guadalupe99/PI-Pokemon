import axios from 'axios';
import { 
    GET_BY_NAME
}  from './actions_type';

export const getByName = (name) => {
    return async function (dispatch) {
        const response = await axios(`http://localhost:3001/pokemons/search?name=${name}`);
        return dispatch({
            type: GET_BY_NAME,
            payload: response.data
        });
    };
}