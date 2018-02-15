import * as types from './types';
import { 
  addToUserAccount, 
  removeFromUserAccount 
} from '../helpers/utils';
import { logout } from '../helpers/api';

const setUser = user => {
  return {
    type: types.UPDATE_USER,
    user,
  };
};

const setUserDetails = accounts => {
  return {
    type: types.SET_ACCOUNTS_DETAILS,
    accounts,
  };
};

export const addIdToUserAccount = (id, type) => {
  return (dispatch, getState) => {
    const user = getState().user.username;
    const { accounts } = getState();

    const newAccounts = addToUserAccount(accounts, user, id, type);
    dispatch(setUserDetails(newAccounts));
  };
};

export const removeIdFromUserAccount = (id, type) => {
  return (dispatch, getState) => {
    const user = getState().user.username;
    const { accounts } = getState();

    const newAccounts = removeFromUserAccount(accounts, user, id, type);
    dispatch(setUserDetails(newAccounts));
  };
};

export const updateUser = (username, password) => {
  return (dispatch, getState) => {
    const { loggedIn } = getState().user;
    const user = {
      username,
      password,
      loggedIn,
    };
    dispatch(setUser(user));
  };
};

export const login = (user) => {
  return (dispatch, getState) => {
    dispatch(setUser(user));
  };
};

export const logOut = () => {
  return (dispatch, getState) => {
    const { user } = getState();

    if (!user.loggedIn) {
      return;
    }

    logout().then(loggedOut => {
      if (loggedOut) {
        dispatch(setUser({ loggedIn: false }));
      }
    });
  };
};
