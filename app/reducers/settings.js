import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

import config from '../config/default.json';

// Default settings
export const settings = createReducer(
  {
    tapToCollapse: true,
    useSafariReaderMode: false,
    commentTheme: 'raw',
    appColor: config.colors.blue,
  },
  {
    [types.SET_SETTINGS](state, action) {
      return action.settings;
    },
  },
);
