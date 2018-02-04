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
    posts
  }
};

export const setStoryType = storyType => {
  return {
    type: types.SET_STORY_TYPE,
    storyType
  }
};

export const fetchItems = (page, limit, items) => {
  return (dispatch, getState) => {
    const posts = getItems(page, limit, items);

    // Wait for all Promises to complete
    Promise.all(posts)
      .then(results => {
        dispatch(setFetchedPosts(results));
      })
      .catch(e => {
        console.error(e);
      })
  }
};