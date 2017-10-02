import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import client from '../utils/apiClient';
import apiMiddleware from './middlewares/apiMiddleware';
import races from './modules/races';
import clubs from './modules/clubs';

const reducer = combineReducers({ races, clubs });
const store = createStore(
  reducer,
  applyMiddleware(thunk, apiMiddleware(client))
);

export default store;
