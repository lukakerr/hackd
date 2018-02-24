import { combineReducers } from 'redux';
import * as itemsReducer from './items';
import * as authReducer from './auth';
import * as settingsReducer from './settings';

export default combineReducers(
  Object.assign(itemsReducer, authReducer, settingsReducer),
);
