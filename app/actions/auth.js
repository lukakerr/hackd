import * as types from './types';
import { addToUserAccount } from '../helpers/utils';
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

export const addUpvotedPost = post => {
  return (dispatch, getState) => {
    const user = getState().user.username;
    const { accounts } = getState();

    const newAccounts = addToUserAccount(accounts, user, post, 'upvoted');
    dispatch(setUserDetails(newAccounts));
  };
};

export const addSavedPost = (post) => {
  return (dispatch, getState) => {
    const user = getState().user.username;
    const { accounts } = getState();

    const newAccounts = addToUserAccount(accounts, user, post, 'saved');
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
