import * as types from './types';

const setFetchedPosts = posts => ({
  type: types.SET_POSTS,
  posts,
});

export const setStoryType = storyType => ({
  type: types.SET_STORY_TYPE,
  storyType,
});

export const setPosts = (page, posts) => (dispatch, getState) => {
  const currentPosts = getState().posts;

  const newPosts = page === 1 ? posts : [...currentPosts, ...posts];

  dispatch(setFetchedPosts(newPosts));
};
