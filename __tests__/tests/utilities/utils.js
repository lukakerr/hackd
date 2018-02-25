import {
  capitalize,
  truncate,
  addToUserAccount,
  removeFromUserAccount,
} from '../../../app/helpers/utils';

import { post } from '../../data/api/post';
import { appUser } from '../../data/api/user';

describe('App Utils', () => {
  it('should capitalize', () => {
    const string = 'my string';
    const stringCapitalized = 'My string';
    expect(capitalize(string)).toBe(stringCapitalized);
  });

  // Truncate shortens to given length and adds 3 dots
  it('should truncate', () => {
    const string = post.title;
    expect(truncate(string, 5)).toHaveLength(5 + 3);
  });

  it('should create a test user account with one upvoted post', () => {
    const account = {};
    const id = post.id;
    const type = 'upvoted';

    expect(addToUserAccount(account, appUser, id, type)).toEqual({
      [appUser.username]: {
        upvoted: [id],
      },
    });
  });

  it('should remove an upvote from a users upvoted comments', () => {
    let account = {};
    const id = post.id;
    const id2 = 87654321;
    const type = 'upvotedComments';

    account = addToUserAccount(account, appUser, id, type);
    account = addToUserAccount(account, appUser, id2, type);

    expect(removeFromUserAccount(account, appUser, id, type)).toEqual({
      [appUser.username]: {
        upvotedComments: [id2],
      },
    });
  });
});
