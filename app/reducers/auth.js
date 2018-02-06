import createReducer from "../helpers/createReducer";
import * as types from "../actions/types";

export const user = createReducer({}, {
  [types.SET_LOGGED_IN_USER](state, action) {
    return action.user;
  },
});
