import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  AlertIOS,
} from 'react-native';
import PropTypes from 'prop-types';
import HTMLView from 'react-native-htmlview';
import SafariView from 'react-native-safari-view';
import ReactNativeHaptic from 'react-native-haptic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { upvote, unvote } from '../../helpers/api';
import htmlStyles from '../../styles/html';
import config from '../../config/default.json';
import User from '../PostItem/User';
import Time from '../PostItem/Time';

const NUM_COLORS = 5;
const COMMENT_BORDER_WIDTH = 2;

class Comment extends React.Component {
  static defaultProps = {
    toggle: null,
    removeIdFromUserAccount: null,
    addIdToUserAccount: null,
    settings: {
      tapToCollapse: true,
      useSafariReaderMode: false,
      commentTheme: 'raw',
      appColor: config.colors.blue,
    },
    user: {},
    accounts: {},
    level: 0,
    hidden: false,
    author: '',
    time: 0,
    content: '',
    open: true,
  };

  static propTypes = {
    toggle: PropTypes.func,
    removeIdFromUserAccount: PropTypes.func,
    addIdToUserAccount: PropTypes.func,
    settings: PropTypes.object,
    user: PropTypes.object,
    accounts: PropTypes.object,
    level: PropTypes.number,
    hidden: PropTypes.bool,
    author: PropTypes.string,
    time: PropTypes.number,
    content: PropTypes.string,
    open: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  openUrl = url => {
    const { useSafariReaderMode } = this.props.settings;
    SafariView.show({
      url,
      useSafariReaderMode,
    });
  };

  toggle = (id, level) => {
    this.props.toggle(id, level);
  };

  checkIfUpvoted = () => {
    const { accounts, user, id } = this.props;

    if (user.loggedIn) {
      if (accounts[user.username]) {
        if (accounts[user.username].upvotedComments) {
          if (accounts[user.username].upvotedComments.indexOf(id) !== -1) {
            return true;
          }
        }
      }
    }

    return false;
  };

  upvote = () => {
    const { id } = this.props;

    // Already upvoted, lets unvote it
    if (this.checkIfUpvoted()) {
      this.props.removeIdFromUserAccount(id, 'upvotedComments');
      this.unvoteComment(id);
    } else {
      // Otherwise lets upvote it
      this.props.addIdToUserAccount(id, 'upvotedComments');
      this.upvoteComment(id);
    }
    ReactNativeHaptic.generate('impact');
  };

  unvoteComment = id => {
    unvote(id).then(unvoted => {
      if (!unvoted) {
        this.props.addIdToUserAccount(id, 'upvotedComments');
        AlertIOS.alert(
          'Cannot unvote',
          'There was an error, please try again later.',
        );
      }
    });
  };

  upvoteComment = id => {
    upvote(id).then(upvoted => {
      if (!upvoted) {
        this.props.removeIdFromUserAccount(id, 'upvotedComments');
        AlertIOS.alert(
          'Cannot upvote',
          'There was an error, please try again later.',
        );
      }
    });
  };

  render() {
    const isUpvoted = this.checkIfUpvoted();

    const commentThemeIndex = (this.props.level - 1) % NUM_COLORS;
    const borderColor = this.props.level > 0 
      ? config.commentThemes[this.props.settings.commentTheme][commentThemeIndex]
      : 'transparent';

    return (
      <TouchableOpacity
        onPress={() => this.toggle(this.props.id, this.props.level)}
        activeOpacity={0.5}
      >
        {!this.props.hidden && (
          <View style={styles.commentBox}>
            <View
              style={[
                styles.commentContainer,
                { marginLeft: 12 * this.props.level - 10 },
              ]}
            >
              <View
                style={[
                  styles.comment,
                  { borderLeftWidth: this.props.level > 0 ? COMMENT_BORDER_WIDTH : 0,
                    borderLeftColor: borderColor
                  },
                ]}
              >
                <View style={styles.commentInfo}>
                  <User by={this.props.author} style={styles.userName} />
                  <Time time={this.props.time} />
                  {this.props.user.loggedIn && (
                    <TouchableOpacity
                      onPress={this.upvote}
                      activeOpacity={0.8}
                      style={styles.iconArrowContainer}
                    >
                      <Image
                        style={[ styles.iconArrow,
                          { tintColor: isUpvoted ? config.colors.orange : 'black',
                            opacity: isUpvoted ? 1 : 0.6,
                          }]}
                        source={require('../../img/arrow.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {this.props.open && (
                  <HTMLView
                    style={styles.content}
                    value={`<body>${this.props.content}</body>`}
                    stylesheet={htmlStyles}
                    onLinkPress={url => this.openUrl(url)}
                  />
                )}
              </View>
            </View>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  commentBox: {
    marginLeft: -2,
    paddingTop: 6,
    paddingBottom: 6,
  },
  commentContainer: {
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: config.colors.gray,
  },
  comment: {
    paddingLeft: 14,
  },
  commentInfo: {
    flexDirection: 'row',
    marginLeft: -4,
  },
  content: {
    marginTop: 6,
  },
  userName: {
    opacity: 0.9,
    fontWeight: 'bold',
  },
  iconArrowContainer: {
    height: 20,
    width: 20,
    borderRadius: 5,
    marginLeft: 4,
    marginTop: -2,
  },
  iconArrow: {
    width: 20,
    height: 20,
  },
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  settings: state.settings,
  user: state.user,
  accounts: state.accounts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
