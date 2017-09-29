import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import races from './modules/races';

const initialState = {};

const reducer = combineReducers({ races });
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
