import * as types from './types';
import { addToUserAccount, removeFromUserAccount } from '../helpers/utils';
import { logout, upvote } from '../helpers/api';

const setUser = user => ({
  type: types.UPDATE_USER,
  user,
});

const setUserDetails = accounts => ({
  type: types.SET_ACCOUNTS_DETAILS,
  accounts,
});

export const addIdToUserAccount = (id, type) => (dispatch, getState) => {
  const { user, accounts } = getState();

  const newAccounts = addToUserAccount(accounts, user, id, type);
  dispatch(setUserDetails(newAccounts));
};

export const removeIdFromUserAccount = (id, type) => (dispatch, getState) => {
  const { user, accounts } = getState();

  const newAccounts = removeFromUserAccount(accounts, user, id, type);
  dispatch(setUserDetails(newAccounts));
};

export const upvotePost = id => dispatch => {
  // Add upvote initially for immediate feedback
  dispatch(addIdToUserAccount(id, 'upvoted'));

  upvote(id).then(upvoted => {
    if (!upvoted) {
      dispatch(removeIdFromUserAccount(id, 'upvoted'));
    }
  });
};

export const savePost = id => dispatch => {
  dispatch(addIdToUserAccount(id, 'saved'));
};

export const login = user => dispatch => {
  dispatch(setUser(user));
};

export const logOut = () => (dispatch, getState) => {
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
