import React from 'react';
import commonStyles from '../styles/common';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';

import config from '../config/default';
import ListItem from './ListItem';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.previewRefs = [];
  }

  showPost = (post) => {
    this.props.navigator.push({
      screen: 'hackd.Post',
      title: 'Post',
      passProps: {
        post,
      },
    });
  };

  showPostPreview = (post) => {
    this.props.navigator.push({
      screen: 'hackd.Post',
      title: 'Post',
      passProps: {
        post,
      },
      previewCommit: true,
      previewHeight: 400,
      previewView: this.previewRefs[post.id.toString()],
    });
  };

  renderSeparator = () => (<View style={styles.rowSeperator} />);

  renderFooter = () => {
    if (!this.props.loadingMore) {
      return null;
    }

    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator animating />
      </View>
    );
  };

  onRefresh = () => {
    this.props.onRefresh();
  };

  onEndReached = () => {
    this.props.onEndReached();
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
          style={styles.fullHeight}
          data={this.props.data}
          extraData={this.props.loadingMore}
          keyboardShouldPersistTaps='always'
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <ListItem
              item={item}
              ref={(ref) => (this.previewRefs[item.id.toString()] = ref)}
              onPress={() => this.showPost(item)}
              onPressIn={() => this.showPostPreview(item)}
              navigator={this.props.navigator}
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
    borderColor: config.colors.mediumGray,
  },
  rowSeperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#EEEEEE',
    padding: 1,
  },
  fullHeight: {
    height: '100%',
  },
});
