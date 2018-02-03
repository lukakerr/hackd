import React from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Posts from '../screens/Posts';
import Settings from '../screens/Settings';

import Post from '../components/Post';

export const PostStack = StackNavigator({
  Posts: {
    screen: Posts,
  },
  Post: {
    screen: Post,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.descendants} comments`,
    }),
  },
});

export const Tabs = TabNavigator({
  Posts: {
    screen: PostStack,
    navigationOptions: {
      tabBarLabel: 'Feed',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../img/feed.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    },
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../img/settings.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    },
  },
});

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});
