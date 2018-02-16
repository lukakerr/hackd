import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  AlertIOS,
  Share,
} from 'react-native';
import ReactNativeHaptic from 'react-native-haptic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import config from '../../config/default';
import { upvote } from '../../helpers/api';

import CustomText from '../CustomText';

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoted: false,
    };
  }

  componentDidMount() {
    this.setState({
      upvoted: this.checkIfUpvoted(),
    });
  }

  checkIfUpvoted = () => {
    if (this.props.user.loggedIn) {
      if (this.props.accounts[this.props.user.username]) {
        if (this.props.accounts[this.props.user.username].upvoted) {
          if (this.props.accounts[this.props.user.username].upvoted.indexOf(this.props.item.id) !== -1) {
            return true;
          }
        }
      }
    }
    
    return false;
  };

  showActions = () => {
    let saveOption = 'Save';

    if (this.props.user.loggedIn) {
      if (this.props.accounts[this.props.user.username]) {
        if (this.props.accounts[this.props.user.username].saved) {
          if (this.props.accounts[this.props.user.username].saved.indexOf(this.props.item.id) !== -1) {
            saveOption = 'Unsave';
          }
        }
      }
    }

    const OPTIONS = [
      'Cancel', 
      'Reply',
      'Share',
      saveOption,
    ];

    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Post actions',
      options: OPTIONS,
      cancelButtonIndex: 0,
    }, (buttonIndex) => {
      const selectedAction = OPTIONS[buttonIndex].toLowerCase();

      // If 'Cancel' not pressed and selectedFeed isnt current storyType
      if (buttonIndex !== 0) {
        if (buttonIndex === 1) {
          if (!this.validateUserLoggedIn('reply')) {
            return;
          }
        } else if (buttonIndex === 2) {
          this.share(
            this.props.item.url,
            this.props.item.title
          );
        } else if (buttonIndex === 3) {
          if (!this.validateUserLoggedIn('save')) {
            return;
          }
          this.props.addIdToUserAccount(this.props.item.id, 'saved');
        };
      }
    });
  };

  showAlert = (title, message) => {
    AlertIOS.alert(
      title,
      message
    );
  };

  validateUserLoggedIn = (action) => {
    if (!this.props.user.loggedIn) {
      this.showAlert(
        `Cannot ${action}`,
        'Please login and try again.'
      );
      return false;
    }
    return true;
  };

  upvote = () => {
    ReactNativeHaptic.generate('impact')
    const id = this.props.item.id;
    if (!this.validateUserLoggedIn('upvote')) {
      return;
    }

    this.setState({
      upvoted: true,
    });

    this.props.addIdToUserAccount(id, 'upvoted');
    
    upvote(id).then(upvoted => {
      if (!upvoted) {
        this.props.removeIdFromUserAccount(id, 'upvoted');
        this.setState({
          upvoted: false,
        });
        this.showAlert(
          'Cannot upvote',
          'There was an error, please try again later.'
        );
      }
    });
  };

  share = (url, title) => {
    Share.share({
      message: 'Checkout this Hacker News post!',
      url,
      title
    });
  };

  render() {
    const isUpvoted = this.checkIfUpvoted();
    return (
      <CustomText style={styles.textWrapper}>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={this.showActions} activeOpacity={0.8} style={styles.iconDotsContainer}>
            <Image
              style={styles.iconDots}
              source={require('../../img/dots.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={this.upvote} 
            activeOpacity={0.8} 
            style={[styles.iconArrowContainer, { backgroundColor: isUpvoted ? config.colors.orange : 'transparent' }]}>
            <Image
              style={[styles.iconArrow, { tintColor: isUpvoted ? 'white' : 'black' }]}
              source={require('../../img/arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </CustomText>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Actions);
