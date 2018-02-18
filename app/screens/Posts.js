import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  ActionSheetIOS,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import PostList from '../components/PostList';
import { getItems } from '../helpers/api';
import { capitalize } from '../helpers/utils';

const MAX_NUM_POSTS = 15 * 10;

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingInitially: true,
      page: 1,
      limit: 15,
      refreshing: false,
      loadingMorePosts: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static navigatorButtons = {
    rightButtons: [{
      icon: require('../img/list.png'),
      id: 'selectFeed'
    }],
  };

  onNavigatorEvent(event) {
    if (event.type == 'NavBarButtonPress') { 
      if (event.id == 'selectFeed') {
        this.selectFeed();
      }
    }
  }

  componentDidMount() {
    this.makeRequest();
    this.props.navigator.setTitle({
      title: capitalize(this.props.storyType),
    });
  }

  // Called when a user clicks the right header button
  // The storyType is updated in the store
  // And the posts are reloaded
  selectFeed = () => {
    const OPTIONS = [
      'Cancel', 
      'Top', 
      'New', 
      'Best',
      'Ask',
      'Show',
      'Jobs',
    ];
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Select a feed',
      options: OPTIONS,
      tintColor: this.props.settings.appColor,
      cancelButtonIndex: 0,
    }, (buttonIndex) => {
      const selectedFeed = OPTIONS[buttonIndex].toLowerCase();

      // If 'Cancel' not pressed and selectedFeed isnt current storyType
      if (buttonIndex !== 0 && selectedFeed !== this.props.storyType) {
        this.props.navigator.setTitle({
          title: capitalize(selectedFeed),
        });
        this.props.setStoryType(selectedFeed);
        this.makeRequest();
      }
    });
  };

  // Get posts based on storyType
  makeRequest = () => {
    let storyType = this.props.storyType;
    const { page, limit } = this.state;

    if (storyType === 'jobs') {
      storyType = 'job';
    }

    return fetch(`${config.api}/${storyType}stories.json`)
      .then((response) => response.json())
      .then((responseJson) => {
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
          .catch(e => {
            return;
          });
      })
      .catch((error) => {
        return;
      });
  };

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
    }, () => {
      this.makeRequest();
    });
  };

  handleEndReached = () => {
    const { page, limit } = this.state;

    if (page * limit > MAX_NUM_POSTS) {
      return;
    }

    this.setState({
      page: page + 1,
      loadingMorePosts: true,
    }, () => {
      this.makeRequest();
    });
  };

  render() {
    return (
      <PostList
        data={this.props.posts}
        isLoadingPosts={this.props.isLoadingPosts}
        loadingMore={this.state.loadingMorePosts}
        navigator={this.props.navigator}
        refreshing={this.state.refreshing}
        onRefresh={() => this.handleRefresh()}
        onEndReached={() => this.handleEndReached()}
      />
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  storyType: state.storyType,
  posts: state.posts,
  isLoadingPosts: state.isLoadingPosts,
  settings: state.settings,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
