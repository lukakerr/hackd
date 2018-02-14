import * as types from './types';

const setSettings = settings => {
  return {
    type: types.SET_SETTINGS,
    settings,
  };
};

export const changeSetting = (key, value) => {
  return (dispatch, getState) => {
    const { settings } = getState();
    const newSettings = JSON.parse(JSON.stringify(settings));

    newSettings[key] = value;
    dispatch(setSettings(newSettings));
  };
};
