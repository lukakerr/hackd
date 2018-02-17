import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  AlertIOS,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import SafariView from 'react-native-safari-view';
import ReactNativeHaptic from 'react-native-haptic';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { upvote, unvote } from '../../helpers/api';
import htmlStyles from '../../styles/html';
import config from '../../config/default';
import User from '../PostItem/User';
import Time from '../PostItem/Time';
import CustomText from '../CustomText';

const NUM_COLORS = 5;
const COMMENT_BORDER_WIDTH = 2;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoted: false,
    }
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      upvoted: this.checkIfUpvoted(),
    });
  }

  openUrl = url => {
    const readerMode = this.props.settings.useSafariReaderMode
    SafariView.show({
      url,
      readerMode
    });
  };

  toggle = (id, level) => {
    this.props.toggle(id, level);
  };

  checkIfUpvoted = () => {
    if (this.props.user.loggedIn) {
      if (this.props.accounts[this.props.user.username]) {
        if (this.props.accounts[this.props.user.username].upvotedComments) {
          if (this.props.accounts[this.props.user.username].upvotedComments.indexOf(this.props.id) !== -1) {
            return true;
          }
        }
      }
    }
    
    return false;
  };

  upvote = () => {
    const id = this.props.id;

    // Already upvoted, lets unvote it
    if (this.checkIfUpvoted()) {
      this.setState({
        upvoted: true,
      });
      this.props.removeIdFromUserAccount(id, 'upvotedComments');
      this.unvoteComment(id);
    } else {
      // Otherwise lets upvote it
      this.setState({
        upvoted: true,
      });

      this.props.addIdToUserAccount(id, 'upvotedComments');
      this.upvoteComment(id);
    }
    ReactNativeHaptic.generate('impact')
  };

  unvoteComment = (id) => {
    unvote(id).then(unvoted => {
      if (!unvoted) {
        this.props.addIdToUserAccount(id, 'upvotedComments');
        this.setState({
          upvoted: true,
        });
        AlertIOS.alert(
          'Cannot unvote',
          'There was an error, please try again later.'
        );
      }
    });
  };

  upvoteComment = (id) => {
    upvote(id).then(upvoted => {
      if (!upvoted) {
        this.props.removeIdFromUserAccount(id, 'upvotedComments');
        this.setState({
          upvoted: false,
        });
        AlertIOS.alert(
          'Cannot upvote',
          'There was an error, please try again later.'
        );
      }
    });
  };

  render() {
    const isUpvoted = this.checkIfUpvoted();
    return (
      <TouchableOpacity onPress={() => this.toggle(this.props.id, this.props.level)} activeOpacity={0.5}>
        { !this.props.hidden && 
          <View style={styles.commentBox}>
            <View style={[styles.commentContainer, { marginLeft: (12 * this.props.level) - 10, }]}>
              <View style={[styles.comment, { 
                borderLeftWidth: this.props.level > 0 ? COMMENT_BORDER_WIDTH : 0,
                borderLeftColor: this.props.level > 0 
                                 ? config.commentThemes[this.props.settings.commentTheme][this.props.level - 1 % NUM_COLORS] 
                                 : 'transparent',
              }]}>
                <View style={styles.commentInfo}>
                  <User by={this.props.author} style={styles.userName} />
                  <Time time={this.props.time} />
                  {this.props.user.loggedIn && 
                    <TouchableOpacity 
                      onPress={this.upvote} 
                      activeOpacity={0.8} 
                      style={styles.iconArrowContainer}>
                      <Image
                        style={[styles.iconArrow, { 
                          tintColor: isUpvoted ? config.colors.orange : 'black',
                          opacity: isUpvoted ? 1 : 0.6,
                        }]}
                        source={require('../../img/arrow.png')}
                      />
                    </TouchableOpacity>
                  }
                </View>
                {this.props.open && 
                  <HTMLView
                    value={`<body>${this.props.content}</body>`}
                    stylesheet={htmlStyles}
                    onLinkPress={(url) => this.openUrl(url)}
                  />
                }
              </View>
            </View>
          </View>
        }
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  commentBox: {
    marginLeft: -2,
    marginBottom: 8,
    paddingBottom: 8,
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
    marginTop: -6,
    paddingBottom: 6,
  },
  userName: {
    opacity: 0.9,
    fontWeight: 'bold',
  },
  iconArrowContainer: {
    height: 20, 
    width: 20,
    marginTop: 1,
    padding: 2,  
    borderRadius: 5,
    marginLeft: 3,
  },
  iconArrow: {
    width: 20,
    height: 20,
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  settings: state.settings,
  user: state.user,
  accounts: state.accounts,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
