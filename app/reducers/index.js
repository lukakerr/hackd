import { combineReducers } from 'redux';
import * as itemsReducer from './items';
import * as authReducer from './auth';

export default combineReducers(Object.assign(
  itemsReducer,
  authReducer,
));
