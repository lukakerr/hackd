import * as types from './types';
import { addToUserAccount, removeFromUserAccount } from '../helpers/utils';
import { logout, upvote } from '../helpers/api';

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
    const { user, accounts } = getState();

    const newAccounts = addToUserAccount(accounts, user, id, type);
    dispatch(setUserDetails(newAccounts));
  };
};

export const removeIdFromUserAccount = (id, type) => {
  return (dispatch, getState) => {
    const { user, accounts } = getState();

    const newAccounts = removeFromUserAccount(accounts, user, id, type);
    dispatch(setUserDetails(newAccounts));
  };
};

export const upvotePost = id => {
  return (dispatch, getState) => {
    // Add upvote initially for immediate feedback
    dispatch(addIdToUserAccount(id, 'upvoted'));

    upvote(id).then(upvoted => {
      if (!upvoted) {
        dispatch(removeIdFromUserAccount(id, 'upvoted'));
      }
    });
  };
};

export const savePost = id => {
  return (dispatch, getState) => {
    dispatch(addIdToUserAccount(id, 'saved'));
  };
};

export const login = user => {
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
