import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import client from '../utils/apiClient'
import apiMiddleware from './middlewares/apiMiddleware';
import races from './modules/races';

const initialState = {};

const reducer = combineReducers({ races });
const store = createStore(reducer, applyMiddleware(thunk, apiMiddleware(client)));

export default store;
