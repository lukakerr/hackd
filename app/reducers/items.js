import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const storyType = createReducer('top', {
  [types.SET_STORY_TYPE](state, action) {
    return action.storyType;
  },
});

export const posts = createReducer(
  [],
  {
    [types.SET_POSTS](state, action) {
      return action.posts;
    },
    // When storyType is set, clear out posts
    [types.SET_STORY_TYPE](state, action) {
      return {};
    },
  },
);

export const isLoadingPosts = createReducer(true, {
  // When storyType is set, posts are loading
  [types.SET_STORY_TYPE](state, action) {
    return true;
  },
  // When posts are set, no posts are loading anymore
  [types.SET_POSTS](state, action) {
    return false;
  },
});
