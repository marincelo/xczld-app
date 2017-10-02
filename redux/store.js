import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './modules/root';
import apiMiddleware from './middlewares/apiMiddleware';
import client from '../utils/apiClient';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, apiMiddleware(client))
);

export default store;
