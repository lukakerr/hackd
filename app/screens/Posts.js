import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { ActionSheetIOS } from 'react-native';

import config from '../config/default.json';
import { ActionCreators } from '../actions';

import PostList from '../components/PostList';
import { getItems } from '../helpers/api';
import { capitalize } from '../helpers/utils';

const MAX_NUM_POSTS = 15 * 10;

const LIST = require('../img/list.png');

class Posts extends React.Component {
  static navigatorButtons = {
    rightButtons: [
      {
        icon: LIST,
        id: 'selectFeed',
      },
    ],
  };

  static propTypes = {
    posts: PropTypes.array.isRequired,
    navigator: PropTypes.object.isRequired,
    storyType: PropTypes.string.isRequired,
    setPosts: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    upvotePost: PropTypes.func.isRequired,
    setStoryType: PropTypes.func.isRequired,
    isLoadingPosts: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    settings: PropTypes.shape({
      appColor: PropTypes.string
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      limit: 15,
      refreshing: false,
      loadingMorePosts: false,
    };

    this.savePost = this.savePost.bind(this);
    this.upvotePost = this.upvotePost.bind(this);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.makeRequest();
    this.props.navigator.setTitle({
      title: capitalize(this.props.storyType),
    });
  }

  onNavigatorEvent(event) {
    if (event.type === 'NavBarButtonPress' && event.id === 'selectFeed') {
      this.selectFeed();
    }
  }

  // Called when a user clicks the right header button
  // The storyType is updated in the store
  // And the posts are reloaded
  selectFeed = () => {
    const OPTIONS = ['Cancel', 'Top', 'New', 'Best', 'Ask', 'Show', 'Jobs'];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Select a feed',
        options: OPTIONS,
        tintColor: this.props.settings.appColor,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        const selectedFeed = OPTIONS[buttonIndex].toLowerCase();

        // If 'Cancel' not pressed and selectedFeed isnt current storyType
        if (buttonIndex !== 0 && selectedFeed !== this.props.storyType) {
          this.props.navigator.setTitle({
            title: capitalize(selectedFeed),
          });
          this.props.setStoryType(selectedFeed);
          this.makeRequest();
        }
      },
    );
  };

  // Get posts based on storyType
  makeRequest = () => {
    let { storyType } = this.props;
    const { page, limit } = this.state;

    if (storyType === 'jobs') {
      storyType = 'job';
    }

    return fetch(`${config.api}/${storyType}stories.json`)
      .then(response => response.json())
      .then(responseJson => {
        const posts = getItems(page, limit, responseJson);

        // Wait for all Promises to complete
        Promise.all(posts)
          .then(results => {
            this.props.setPosts(page, results);
            this.setState({
              refreshing: false,
              loadingMorePosts: false,
            });
          })
          .catch();
      })
      .catch();
  };

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
    }, this.makeRequest);
  };

  handleEndReached = () => {
    const { page, limit } = this.state;

    if (page * limit > MAX_NUM_POSTS) {
      return;
    }

    this.setState({
      page: page + 1,
      loadingMorePosts: true,
    }, this.makeRequest);
  };

  upvotePost = id => {
    this.props.upvotePost(id);
  };

  savePost = id => {
    this.props.savePost(id);
  };

  render() {
    const {
      posts,
      isLoadingPosts,
      navigator,
      user
    } = this.props;

    const { loadingMorePosts, refreshing } = this.state;

    return (
      <PostList
        data={posts}
        isLoadingPosts={isLoadingPosts}
        loadingMore={loadingMorePosts}
        navigator={navigator}
        refreshing={refreshing}
        user={user}
        onRefresh={this.handleRefresh}
        onEndReached={this.handleEndReached}
        upvotePost={this.upvotePost}
        savePost={this.savePost}
      />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  storyType: state.storyType,
  posts: state.posts,
  isLoadingPosts: state.isLoadingPosts,
  settings: state.settings,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
