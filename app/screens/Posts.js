import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  ActionSheetIOS,
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";

import HeaderButton from "../components/HeaderButton";
import PostList from "../components/PostList";
import { getItems } from "../helpers/api";
import { capitalize } from "../helpers/utils";

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
    this.selectFeed = this.selectFeed.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.storyTitle,
      headerRight: (
        <HeaderButton
          style={{width: 26, height: 26, marginRight: 25, tintColor: "#007AFF"}}
          onPress={() => params.handleSelect()}
          image={require('../img/list.png')}
        />
      ),
    };
  };

  componentDidMount() {
    this.makeRequest();
    this.props.navigation.setParams({ 
      handleSelect: this.selectFeed,
      storyTitle: capitalize(this.props.storyType),
    });
  }

  // Called when a user clicks the right header button
  // The storyType is updated in the store
  // And the posts are reloaded
  selectFeed = () => {
    const OPTIONS = [
      "Cancel", 
      "Top", 
      "New", 
      "Best",
      "Ask",
      "Show",
      "Jobs",
    ];
    ActionSheetIOS.showActionSheetWithOptions({
      title: "Select a feed",
      options: OPTIONS,
      cancelButtonIndex: 0,
    }, (buttonIndex) => {
      const selectedFeed = OPTIONS[buttonIndex].toLowerCase();

      // If "Cancel" not pressed and selectedFeed isnt current storyType
      if (buttonIndex !== 0 && selectedFeed !== this.props.storyType) {
        this.props.navigation.setParams({ 
          storyTitle: capitalize(selectedFeed) 
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

    if (storyType === "jobs") {
      storyType = "job";
    }

    console.log("LOADING: ", storyType)

    return fetch(`${config.api}/${storyType}stories.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        const posts = getItems(page, limit, responseJson);

        // Wait for all Promises to complete
        Promise.all(posts)
          .then(results => {
            console.log(results);
            this.props.setPosts(page, results);
            this.setState({
              refreshing: false,
              loadingMorePosts: false,
            });
          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch((error) => {
        console.error(error);
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
    this.setState({
      page: this.state.page + 1,
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
        navigation={this.props.navigation}
        refreshing={this.state.refreshing}
        onRefresh={() => this.handleRefresh()}
        onEndReached={() => this.handleEndReached()}
      />
    )
  }
}

mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect((state) => { 
  return {
    storyType: state.storyType,
    posts: state.posts,
    isLoadingPosts: state.isLoadingPosts,
  }
}, mapDispatchToProps)(Posts);
