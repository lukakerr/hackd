import createReducer from "../helpers/createReducer";
import * as types from "../actions/types";

export const user = createReducer({}, {
  [types.UPDATE_USER](state, action) {
    return action.user;
  },
});

export const accounts = createReducer({}, {
  [types.SET_ACCOUNTS_DETAILS](state, action) {
    return action.accounts;
  },
});
