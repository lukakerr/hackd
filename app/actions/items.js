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

export const fetchPosts = (page, limit, itemIds) => {
  return (dispatch, getState) => {
    const posts = getItems(page, limit, itemIds);

    // Wait for all Promises to complete
    Promise.all(posts)
      .then(results => {
        dispatch(setFetchedPosts(results));
      })
      .catch(e => {
        console.error(e);
      });
  };
};
