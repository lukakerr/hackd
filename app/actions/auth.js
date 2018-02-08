import * as types from "./types";
import { 
  login,
} from "../helpers/api";
import { addToUserAccount } from "../helpers/utils";

const setLoggedInUser = user => {
  return {
    type: types.SET_LOGGED_IN_USER,
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

    const newAccounts = addToUserAccount(accounts, user, post, "upvoted");
    dispatch(setUserDetails(newAccounts));
  };
};

export const addSavedPost = (post) => {
  return (dispatch, getState) => {
    const user = getState().user.username;
    const { accounts } = getState();

    const newAccounts = addToUserAccount(accounts, user, post, "saved");
    dispatch(setUserDetails(newAccounts));
  };
};

export const logIn = (username, password) => {
  return (dispatch, getState) => {
    login(username, password).then(loggedIn => {
      if (loggedIn) {
        const user = {
          username,
          password,
          loggedIn: true,
        };
        dispatch(setLoggedInUser(user));
      } else {
        const user = {
          loggedIn: false,
        };
        dispatch(setLoggedInUser(user));
      }
    });
  };
};

export const logOut = () => {
  return (dispatch, getState) => {
    dispatch(setLoggedInUser({ loggedIn: false }));
  };
};
