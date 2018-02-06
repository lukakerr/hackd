import * as types from "./types";
import { 
  getItems,
  upvote,
  login,
  comment,
} from "../helpers/api";

const setLoggedInUser = user => {
  return {
    type: types.SET_LOGGED_IN_USER,
    user,
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
