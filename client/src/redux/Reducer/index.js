import { combineReducers } from 'redux';
import reducer from './reducer';

const rootReducer = combineReducers({
    pokemons: reducer,
});

export default rootReducer;