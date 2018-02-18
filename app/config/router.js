import { Navigation } from 'react-native-navigation';

import Posts from '../screens/Posts';
import Post from '../screens/Post';
import Account from '../screens/Account';
import Search from '../screens/Search';
import Submit from '../screens/Submit';
import Settings from '../screens/Settings';

// Auth
import Saved from '../screens/Auth/Saved';
import Login from '../screens/Auth/Login';
import AccountDetails from '../screens/Auth/AccountDetails';

// Settings
import CommentThemes from '../screens/Settings/CommentThemes';
import AppColors from '../screens/Settings/AppColors';

function registerScreens(store, Provider) {
  Navigation.registerComponent('hackd.Posts', () => Posts, store, Provider);
  Navigation.registerComponent('hackd.Post', () => Post, store, Provider);
  Navigation.registerComponent('hackd.Account', () => Account, store, Provider);
  Navigation.registerComponent('hackd.Search', () => Search, store, Provider);
  Navigation.registerComponent('hackd.Submit', () => Submit, store, Provider);
  Navigation.registerComponent('hackd.Settings', () => Settings, store, Provider);

  Navigation.registerComponent('hackd.Saved', () => Saved, store, Provider);
  Navigation.registerComponent('hackd.Login', () => Login, store, Provider);
  Navigation.registerComponent('hackd.AccountDetails', () => AccountDetails, store, Provider);

  Navigation.registerComponent('hackd.CommentThemes', () => CommentThemes, store, Provider);
  Navigation.registerComponent('hackd.AppColors', () => AppColors, store, Provider);
}

const navigatorStyle = {
  screenBackgroundColor: '#F2F3F6',
};

const hackd = [
  {
    label: 'Feed',
    screen: 'hackd.Posts',
    icon: require('../img/feed.png'),
    selectedIcon: require('../img/feed.png'),
    title: 'Feed',
    navigatorStyle,
  },
  {
    label: 'Account',
    screen: 'hackd.Account',
    icon: require('../img/account.png'),
    selectedIcon: require('../img/account.png'),
    title: 'Account',
    navigatorStyle,
  },
  {
    label: 'Submit',
    screen: 'hackd.Submit',
    icon: require('../img/submit.png'),
    selectedIcon: require('../img/submit.png'),
    title: 'Submit',
    navigatorStyle,
  },
  {
    label: 'Search',
    screen: 'hackd.Search',
    icon: require('../img/search.png'),
    selectedIcon: require('../img/search.png'),
    title: 'Search',
    navigatorStyle,
  },
  {
    label: 'Settings',
    screen: 'hackd.Settings',
    icon: require('../img/settings.png'),
    selectedIcon: require('../img/settings.png'),
    title: 'Settings',
    navigatorStyle,
  },
];

export { 
  registerScreens,
  hackd,
};
