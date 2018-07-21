import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ActionSheetIOS, Share } from 'react-native';
import PropTypes from 'prop-types';
import ReactNativeHaptic from 'react-native-haptic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import config from '../../config/default.json';
import { validateUserLoggedIn } from '../../helpers/utils';
import CustomText from '../CustomText';

class Actions extends React.Component {
  static defaultProps = {
    doUpvote: false,
    upvotePost: null,
    savePost: null,
    user: {},
    accounts: {},
    item: {},
    settings: {},
  };

  static propTypes = {
    doUpvote: PropTypes.any,
    upvotePost: PropTypes.func,
    savePost: PropTypes.func,
    user: PropTypes.object,
    accounts: PropTypes.object,
    item: PropTypes.object,
    settings: PropTypes.object,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.doUpvote !== nextProps.doUpvote) {
      this.upvote();
    }
  }

  checkIfUpvoted = () => {
    const { accounts, user, item } = this.props;

    if (user.loggedIn) {
      if (accounts[user.username]) {
        if (accounts[user.username].upvoted) {
          if (accounts[user.username].upvoted.indexOf(item.id) !== -1) {
            return true;
          }
        }
      }
    }

    return false;
  };

  showActions = () => {
    let saveOption = 'Save';

    const { accounts, user, item } = this.props;

    if (user.loggedIn) {
      if (accounts[user.username]) {
        if (accounts[user.username].saved) {
          if (accounts[user.username].saved.indexOf(item.id) !== -1) {
            saveOption = 'Unsave';
          }
        }
      }
    }

    const OPTIONS = ['Cancel', 'Reply', 'Share', saveOption];

    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Post actions',
        options: OPTIONS,
        tintColor: this.props.settings.appColor,
        cancelButtonIndex: 0,
      },
      buttonIndex => {
        const { loggedIn } = this.props.user;

        // If 'Cancel' not pressed
        if (buttonIndex !== 0) {
          if (buttonIndex === 1) {
            if (!validateUserLoggedIn(loggedIn, 'reply')) {
              return;
            }
          } else if (buttonIndex === 2) {
            this.share();
          } else if (buttonIndex === 3) {
            if (!validateUserLoggedIn(loggedIn, 'save')) {
              return;
            }
            this.save();
          }
        }
      },
    );
  };

  upvote = () => {
    if (!validateUserLoggedIn(this.props.user.loggedIn, 'upvote')) {
      return;
    }
    ReactNativeHaptic.generate('impact');
    this.props.upvotePost(this.props.item.id);
  };

  share = () => {
    Share.share({
      message: 'Checkout this Hacker News post!',
      url: this.props.item.url,
      title: this.props.item.title,
    });
  };

  save = () => {
    ReactNativeHaptic.generate('impact');
    this.props.savePost(this.props.item.id);
  };

  render() {
    const isUpvoted = this.checkIfUpvoted();
    return (
      <View style={styles.textWrapper}>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={this.showActions} activeOpacity={0.8} style={styles.iconDotsContainer}>
            <Image style={styles.iconDots} source={require('../../img/dots.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.upvote}
            activeOpacity={0.8}
            style={[
              styles.iconArrowContainer,
              {
                backgroundColor: isUpvoted ? config.colors.orange : 'transparent',
              },
            ]}
          >
            <Image
              style={[styles.iconArrow, { tintColor: isUpvoted ? 'white' : 'black' }]}
              source={require('../../img/arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconArrowContainer: {
    height: 28,
    width: 28,
    padding: 2,
    borderRadius: 5,
    marginLeft: 3,
  },
  iconArrow: {
    width: 24,
    height: 24,
  },
  iconDotsContainer: {
    padding: 2,
    marginTop: 2,
    marginRight: 3,
  },
  iconDots: {
    width: 22,
    height: 22,
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    width: 50,
    height: 20,
    marginTop: 2,
  },
  textWrapper: {
    fontSize: 14,
    marginLeft: 4,
    marginRight: 20,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  user: state.user,
  accounts: state.accounts,
  settings: state.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Actions);
