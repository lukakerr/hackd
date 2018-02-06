import { combineReducers } from "redux";
import * as itemsReducer from "./items";
import * as authReducer from "./auth";
import * as navReducer from "./nav";

export default combineReducers(Object.assign(
  itemsReducer,
  authReducer,
  navReducer,
));
