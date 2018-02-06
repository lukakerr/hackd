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

const setUpvotedPost = post => {
  return {
    type: types.ADD_UPVOTED_POST,
    post,
  };
};

export const addUpvotedPost = post => {
  return (dispatch, getState) => {
    const upvotedPosts = getState().upvotedPosts;

    // If not already in upvotedPosts
    if (upvotedPosts.indexOf(post) === -1) {
      dispatch(setUpvotedPost(post));
    }
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
