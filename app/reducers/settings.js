import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const settings = createReducer({
  tapToCollapse: true,
  useSafariReaderMode: false,
  commentTheme: 'raw',
}, {
  [types.SET_SETTINGS](state, action) {
    return action.settings;
  },
});
