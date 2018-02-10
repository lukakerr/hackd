import * as types from "./types";
import { 
  getItems,
  upvote,
  login,
  comment,
} from "../helpers/api";

const setFetchedPosts = posts => {
  return {
    type: types.SET_POSTS,
    posts,
  };
};

export const setStoryType = storyType => {
  return {
    type: types.SET_STORY_TYPE,
    storyType,
  };
};

export const setPosts = (page, posts) => {
  return (dispatch, getState) => {
    const currentPosts = getState().posts;

    const newPosts = page === 1 ? posts : [...currentPosts, ...posts];

    dispatch(setFetchedPosts(newPosts));
  };
};
