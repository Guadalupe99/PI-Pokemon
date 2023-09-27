import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../Reducer/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose; //esta linea sirve para conectar nuestra App con la extension REDUX DEVTOOLS DEL NAVEGADOR

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunkMiddleware))
);

export default store;