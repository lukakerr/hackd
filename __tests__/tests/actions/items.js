import * as types from '../../../app/actions/types';
import * as actions from '../../../app/actions/items';

import { posts } from '../../data/api/post';

describe('Items Actions', () => {
  it('should set first page posts', () => {
    const getState = () => ({});

    const dispatch = jest.fn();

    const page = 1;

    actions.setPosts(1, posts)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_POSTS',
      posts,
    });
  });

  it('should set feed story type', () => {
    const storyType = 'top';

    expect(actions.setStoryType(storyType)).toEqual({
      type: 'SET_STORY_TYPE',
      storyType,
    });
  });
});
