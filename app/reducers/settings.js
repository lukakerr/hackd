import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const settings = createReducer({
  tapToCollapse: true,
}, {
  [types.SET_SETTINGS](state, action) {
    return action.settings;
  },
});
