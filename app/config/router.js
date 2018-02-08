import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Posts from '../screens/Posts';
import Post from '../screens/Post';
import Settings from '../screens/Settings';
import Account from '../screens/Account';
import Search from '../screens/Search';
import Saved from '../components/Auth/Saved';

const PostStack = StackNavigator({
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

const AccountStack = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      title: "Account",
    },
  },
  Saved: {
    screen: Saved,
    navigationOptions: {
      title: 'Saved',
    },
  },
  Post: {
    screen: Post,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.descendants} comments`,
    }),
  },
});

const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: "Settings",
    },
  },
});

const SearchStack = StackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Search",
    },
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
  Search: {
    screen: SearchStack,
    navigationOptions: {
      tabBarLabel: "Search",
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../img/search.png')}
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
}, {
  tabBarOptions: {
    // showLabel: false,
    style: {
      // backgroundColor: '#FFFFFF',
    }
  },
});

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});
