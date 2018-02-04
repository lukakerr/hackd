import { combineReducers } from "redux";
import * as itemsReducer from "./items";
import * as navReducer from "./nav";

export default combineReducers(Object.assign(
  itemsReducer,
  navReducer,
));