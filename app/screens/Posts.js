import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActionSheetIOS,
} from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";

import ListItem from "../components/ListItem";
import HeaderButton from "../components/HeaderButton";
import { capitalize } from "../helpers/utils";
import { getItems } from "../helpers/api";

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
    this.makeRequest(true);
    this.props.navigation.setParams({ 
      handleSelect: this.selectFeed,
      storyTitle: capitalize(this.props.storyType),
    });
  }

  selectFeed = () => {
    OPTIONS = [
      "Cancel", 
      "Top", 
      "New", 
      "Best",
      "Ask",
      "Show",
      "Jobs",
    ]
    ActionSheetIOS.showActionSheetWithOptions({
      title: "Select a feed",
      options: OPTIONS,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
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

  // Get top stories
  makeRequest = (initial = false) => {
    let storyType = this.props.storyType;

    if (storyType === "jobs") {
      storyType = "job";
    }

    return fetch(`${config.api}/${storyType}stories.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.getData(initial, responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  getData = (initial = false, items) => {
    const { page, limit } = this.state;
    this.props.fetchItems(page, limit, items);
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
  }
}, mapDispatchToProps)(Posts);
