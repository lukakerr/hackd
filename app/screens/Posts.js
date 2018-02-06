import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  ActionSheetIOS,
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";

import ListItem from "../components/ListItem";
import HeaderButton from "../components/HeaderButton";
import { capitalize } from "../helpers/utils";

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingInitially: true,
      page: 1,
      limit: 20,
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
          storyTitle: capitalize(this.props.storyType) 
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

    return fetch(`${config.api}/${storyType}stories.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.fetchPosts(page, limit, responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  showPost = (post) => this.props.navigation.navigate("Post", post);

  renderSeparator = () => (<View style={styles.rowSeperator} />);

  renderFooter = () => {
    if (!this.props.isLoadingPosts) {
      return null;
    }

    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator animating />
      </View>
    );
  };

  render() {
    // If loading, render activity indicator
    if (this.props.isLoadingPosts) {
      return (
        <View style={commonStyles.center}>
          <ActivityIndicator />
        </View>
      );
    }
    // Otherwise render posts
    return (
      <View>
        <FlatList
          data={this.props.posts}
          keyboardShouldPersistTaps="always"
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              onPressItem={() => this.showPost(item)}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#FAFAFA"
  },
  rowSeperator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#EEEEEE",
    padding: 1,
  },
});

mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect((state) => { 
  return {
    storyType: state.storyType,
    posts: state.posts,
    isLoadingPosts: state.isLoadingPosts,
    user: state.user,
  }
}, mapDispatchToProps)(Posts);
