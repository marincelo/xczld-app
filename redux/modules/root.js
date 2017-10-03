import { combineReducers } from 'redux';
import races from './races';
import clubs from './clubs';

const reducer = combineReducers({ races, clubs });

export default reducer;
