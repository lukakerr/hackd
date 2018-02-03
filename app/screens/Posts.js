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
import ListItem from "../components/ListItem";
import HeaderButton from "../components/HeaderButton";
import { capitalize } from "../helpers/utils";
import { getItems } from "../helpers/api";

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingInitially: true,
      isLoading: false,
      data: [],
      page: 1,
      limit: 20,
      storyType: "top",
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
    this.makeRequest(this.state.storyType, true);
    this.props.navigation.setParams({ 
      handleSelect: this.selectFeed,
      storyTitle: capitalize(this.state.storyType),
    });
  }

  selectFeed() {
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

      // If "Cancel" not pressed and selectedFeed isnt current feed, set state
      if (buttonIndex !== 0 && selectedFeed !== this.state.storyType) {
        this.setState({
          isLoading: true,
          storyType: selectedFeed,
        });
        this.makeRequest(this.state.storyType);
        this.props.navigation.setParams({ 
          storyTitle: capitalize(this.state.storyType) 
        });
      }
    });
  }

  // Get top stories
  makeRequest = (storyType, initial = false) => {
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
    const posts = getItems(page, limit, items);

    // Wait for all Promises to complete
    Promise.all(posts)
      .then(results => {
        if (initial) {
          this.setState({
            isLoadingInitially: false,
          });
        }
        this.setState({
          isLoading: false,
          data: page === 1 ? results : [...this.state.data, ...results],
        });
      })
      .catch(e => {
        console.error(e);
      })
  };

  showPost = (post) => this.props.navigation.navigate("Post", post);

  renderSeparator = () => (<View style={styles.rowSeperator} />);

  renderFooter = () => {
    if (!this.state.isLoading) {
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
    if (this.state.isLoadingInitially || this.state.isLoading) {
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
          data={this.state.data}
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
