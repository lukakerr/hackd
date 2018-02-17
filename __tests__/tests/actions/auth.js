import * as types from '../../../app/actions/types';
import * as actions from '../../../app/actions/auth';

import { appUser } from '../../data/api/user';
import { post } from '../../data/api/post';

const dispatch = jest.fn();

describe('Auth Actions', () => {

  it('should login a user', () => {
    const getState = () => ({});

    actions.login(appUser)(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'UPDATE_USER', 
      user: appUser,
    });
  });

  it('should add a post to the upvoted section of a new users account', () => {
    const getState = () => ({ 
      user: appUser,
      accounts: {},
    });

    const expectedAccounts = {
      [appUser.username]: {
        upvoted: [post.id],
      },
    };

    actions.addIdToUserAccount(post.id, 'upvoted')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACCOUNTS_DETAILS', 
      accounts: expectedAccounts,
    });
  });

  it('should add a post to the saved section of a new users account', () => {
    const getState = () => ({ 
      user: appUser,
      accounts: {},
    });

    const expectedAccounts = {
      [appUser.username]: {
        saved: [post.id],
      },
    };

    actions.addIdToUserAccount(post.id, 'saved')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACCOUNTS_DETAILS', 
      accounts: expectedAccounts,
    });
  });

  it('should remove a post from the saved section of an existing users account', () => {
    const getState = () => ({ 
      user: appUser,
      accounts: {
        [appUser.username]: {
          saved: [post.id],
        },
      },
    });

    const expectedAccounts = {
      [appUser.username]: {
        saved: [],
      },
    };

    actions.removeIdFromUserAccount(post.id, 'saved')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACCOUNTS_DETAILS', 
      accounts: expectedAccounts,
    });
  });

  it('should add a post to the upvotedComments section of a new users account', () => {
    const getState = () => ({ 
      user: appUser,
      accounts: {},
    });

    const expectedAccounts = {
      [appUser.username]: {
        upvotedComments: [post.id],
      },
    };

    actions.addIdToUserAccount(post.id, 'upvotedComments')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACCOUNTS_DETAILS', 
      accounts: expectedAccounts,
    });
  });

  it('should remove a post from the upvotedComments section of an existing users account', () => {
    const getState = () => ({ 
      user: appUser,
      accounts: {
        [appUser.username]: {
          upvotedComments: [post.id],
        },
      },
    });

    const expectedAccounts = {
      [appUser.username]: {
        upvotedComments: [],
      },
    };

    actions.removeIdFromUserAccount(post.id, 'upvotedComments')(dispatch, getState);
    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_ACCOUNTS_DETAILS', 
      accounts: expectedAccounts,
    });
  });

});