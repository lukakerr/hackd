import React from 'react';
import config from '../config/default.json';
import { StyleSheet, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import HTMLView from 'react-native-htmlview';
import SafariView from 'react-native-safari-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

import htmlStyles from '../styles/html';
import { truncate } from '../helpers/utils';
import CustomText from '../components/CustomText';
import Score from '../components/PostItem/Score';
import Comments from '../components/PostItem/Comments';
import User from '../components/PostItem/User';
import Time from '../components/PostItem/Time';
import Actions from '../components/PostItem/Actions';
import AllComments from '../components/Post/AllComments';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doUpvote: false,
    };
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    if (event.type === 'PreviewActionPress') {
      if (event.id === 'action-upvote') {
        this.setState({
          doUpvote: true,
        });
      }
    }
  }

  openUrl = url => {
    const readerMode = this.props.settings.useSafariReaderMode;
    SafariView.show({
      url,
      readerMode,
    });
  };

  render() {
    return (
      <ScrollView style={styles.postContainer}>
        <View>
          <View style={styles.headerContainer}>
            <CustomText style={styles.header}>{this.props.post.title}</CustomText>
          </View>
          {this.props.post.url && (
            <TouchableOpacity onPress={() => this.openUrl(this.props.post.url)} activeOpacity={0.8}>
              <View style={styles.subHeaderContainer}>
                <CustomText style={styles.subHeader}>{truncate(this.props.post.url, 35)}</CustomText>
                <View style={styles.rightArrowContainer}>
                  <Image style={styles.rightArrow} source={require('../img/right.png')} />
                </View>
              </View>
            </TouchableOpacity>
          )}
          {this.props.post.text && (
            <HTMLView
              value={`<body>${this.props.post.text}</body>`}
              stylesheet={htmlStyles}
              onLinkPress={url => this.openUrl(url)}
            />
          )}
        </View>

        <View style={styles.postInfo}>
          <View style={styles.postInfoDetails}>
            <User by={this.props.post.by} style={{ opacity: 0.6 }} />
            <Score score={this.props.post.score} />
            <Comments count={this.props.post.descendants} />
            <Time time={this.props.post.time} />
            <View style={styles.postInfoAction}>
              <View style={styles.postInfoActionText}>
                <Actions doUpvote={this.state.doUpvote} item={this.props.post} />
              </View>
            </View>
          </View>
        </View>

        <AllComments post={this.props.post} settings={this.props.settings} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    marginBottom: 10,
  },
  subHeader: {
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    opacity: 0.8,
  },
  subHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: config.colors.mediumGray,
    borderColor: config.colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
  },
  rightArrowContainer: {
    flexGrow: 1,
  },
  rightArrow: {
    opacity: 0.6,
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  postInfo: {
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: config.colors.gray,
    height: 36,
  },
  postInfoDetails: {
    flexDirection: 'row',
    marginLeft: -3,
    paddingTop: 5,
    paddingBottom: 5,
  },
  postInfoAction: {
    marginTop: -8,
    flexGrow: 1,
  },
  postInfoActionText: {
    alignSelf: 'flex-end',
  },
});

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
