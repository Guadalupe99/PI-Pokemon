import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import index from '../Reducer/index';

const store = createStore(
    index,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;

