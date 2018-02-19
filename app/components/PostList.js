import React from 'react';
import commonStyles from '../styles/common';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  FlatList,
  Image,
} from 'react-native';
import Swipeable from 'react-native-swipeable';
import ReactNativeHaptic from 'react-native-haptic';

import config from '../config/default';
import { truncate } from '../helpers/utils';
import ListItem from './ListItem';
import SwipeContent from './PostItem/SwipeContent';

export default class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.previewRefs = [];
    this.state = {
      isSwiping: false,
    };
  }

  showPost = (post) => {
    const title = post.descendants > -1 
      ? `${post.descendants} comments` 
      : truncate(post.title, 20);
    this.props.navigator.push({
      screen: 'hackd.Post',
      title,
      passProps: {
        post,
      },
    });
  };

  showPostPreview = (post) => {
    const title = post.descendants > -1 
      ? `${post.descendants} comments` 
      : truncate(post.title, 20);
    this.props.navigator.push({
      screen: 'hackd.Post',
      title,
      passProps: {
        post,
      },
      previewCommit: true,
      previewHeight: 400,
      previewView: this.previewRefs[post.id.toString()],
      previewActions: [{
        id: 'action-cancel',
        title: 'Cancel',
      }, {
        id: 'action-upvote',
        title: 'Upvote',
      }, {
        id: 'action-save',
        title: 'Save',
      }]
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

  setActivated = (activated) => {
    if (activated) {
      ReactNativeHaptic.generate('impact')
    }
  };

  doUpvote = (id) => {
    
  };

  doSave = (id) => {
    
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
          scrollEnabled={!this.state.isSwiping}
          keyboardShouldPersistTaps='always'
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
          refreshing={this.props.refreshing}
          onRefresh={this.onRefresh}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => (
            <Swipeable 
              rightContent={(
                <SwipeContent
                  backgroundColor={config.colors.orange}
                  alignment={'right'}
                  image={require('../img/arrow.png')}
                  size={36}
                />
              )}
              leftContent={(
                <SwipeContent
                  backgroundColor={config.colors.green}
                  alignment={'left'}
                  image={require('../img/save.png')}
                  size={32}
                />
              )} 
              rightActionActivationDistance={150}
              leftActionActivationDistance={150}
              onRightActionActivate={() => this.setActivated(true)}
              onRightActionRelease={() => this.doUpvote(item.id)}
              onLeftActionActivate={() => this.setActivated(true)}
              onLeftActionRelease={() => this.doSave(item.id)}
              onSwipeStart={() => this.setState({isSwiping: true})}
              onSwipeRelease={() => this.setState({isSwiping: false})}
            >
              <ListItem
                item={item}
                ref={(ref) => (this.previewRefs[item.id.toString()] = ref)}
                onPress={() => this.showPost(item)}
                onPressIn={() => this.showPostPreview(item)}
                navigator={this.props.navigator}
              />
            </Swipeable>
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
