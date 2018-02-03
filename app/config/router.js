import React from 'react';
import { StyleSheet, Image, Button } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Posts from '../screens/Posts';
import Post from '../screens/Post';
import Settings from '../screens/Settings';
import Account from '../screens/Account';

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

export const AccountStack = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: ({ navigation }) => ({
      title: "Account",
    }),
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: "Settings",
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
  Account: {
    screen: AccountStack,
    navigationOptions: {
      tabBarLabel: "Account",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../img/account.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    },
  },
  Settings: {
    screen: SettingsStack,
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
