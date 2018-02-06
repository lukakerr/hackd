import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  AlertIOS,
} from 'react-native';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../actions";

import config from "../../config/default";
import { upvote } from "../../helpers/api";
import CustomText from "../CustomText";

class Actions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upvoted: false,
    };
  }

  componentDidMount() {
    const isUpvoted = this.props.upvotedPosts.indexOf(this.props.id) !== -1;
    this.setState({
      upvoted: isUpvoted,
    });
  }

  showActions = () => {
    const OPTIONS = [
      "Cancel", 
      "Upvote",
      "Share",
      "Reply",
    ];
    ActionSheetIOS.showActionSheetWithOptions({
      options: OPTIONS,
      cancelButtonIndex: 0,
    }, (buttonIndex) => {
      const selectedFeed = OPTIONS[buttonIndex].toLowerCase();

      // If "Cancel" not pressed and selectedFeed isnt current storyType
      if (buttonIndex !== 0) {
        if (buttonIndex === 1) {
          this.upvote(this.props.id);
        }
      }
    });
  };

  showAlert = (title, message) => {
    AlertIOS.alert(
      title,
      message
    );
  };

  upvote = id => {
    if (!this.props.user.loggedIn) {
      this.showAlert(
        'Cannot upvote',
        'Please login and try again.'
      );
      return;
    }

    this.setState({
      upvoted: true,
    });
    
    upvote(id).then(upvoted => {
      if (upvoted) {
        this.props.addUpvotedPost(id);
      } else {
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

  render() {
    const isUpvoted = this.state.upvoted;
    return (
      <Text style={styles.textWrapper}>
        <View style={styles.iconView}>
          <TouchableOpacity onPress={this.showActions} activeOpacity={0.8} style={styles.iconDotsContainer}>
            <Image
              style={styles.iconDots}
              source={require('../../img/dots.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => this.upvote(this.props.id)} 
            activeOpacity={0.8} 
            style={[styles.iconArrowContainer, {backgroundColor: isUpvoted ? config.orange : "transparent",}]}>

            <Image
              style={[styles.iconArrow, { tintColor: isUpvoted ? "white" : "black" }]}
              source={require('../../img/arrow.png')}
            />
          </TouchableOpacity>
        </View>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  iconArrowContainer: {
    height: 30, 
    width: 30, 
    padding: 2,  
    borderRadius: 5,
    marginLeft: 3,
  },
  iconArrow: {
    width: 26,
    height: 26,
  },
  iconDotsContainer: {
    height: 30, 
    width: 30,
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

mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect((state) => { 
  return {
    storyType: state.storyType,
    posts: state.posts,
    isLoadingPosts: state.isLoadingPosts,
    user: state.user,
    upvotedPosts: state.upvotedPosts,
  }
}, mapDispatchToProps)(Actions);
