import * as types from './types';

const setSettings = settings => ({
  type: types.SET_SETTINGS,
  settings,
});

export const changeSetting = (key, value) => (dispatch, getState) => {
  const { settings } = getState();
  const newSettings = JSON.parse(JSON.stringify(settings));

  newSettings[key] = value;
  dispatch(setSettings(newSettings));
};
