import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
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
      post: null,
    };
  }

  componentWillMount() {
    this.setState({
      post: this.props.navigation.state.params,
    });
  }

  openUrl = (url) => {
    const readerMode = this.props.settings.useSafariReaderMode
    SafariView.show({
      url,
      readerMode
    });
  };

  render() {
    return (
      <ScrollView style={styles.postContainer}>
        <View>
          <View style={styles.headerContainer}>
            <CustomText style={styles.header}>{this.state.post.title}</CustomText>
          </View>
          {this.state.post.url && 
            <TouchableOpacity onPress={() => this.openUrl(this.state.post.url)} activeOpacity={0.8}>
              <View style={styles.subHeaderContainer}>
                <CustomText style={styles.subHeader}>{truncate(this.state.post.url, 35)}</CustomText>
                <View style={styles.rightArrowContainer}>
                  <Image
                    style={styles.rightArrow}
                    source={require('../img/right.png')}
                  />
                </View>
              </View>
            </TouchableOpacity>
          }
          {this.state.post.text && 
            <HTMLView
              value={`<body>${this.state.post.text}</body>`}
              stylesheet={htmlStyles}
              onLinkPress={(url) => this.openUrl(url)}
            />
          }
        </View>

        <View style={styles.postInfo}>
          <View style={styles.postInfoDetails}>
            <User
              by={this.state.post.by}
              style={{opacity: 0.6}}
            />
            <Score
              score={this.state.post.score}
            />
            <Comments
              count={this.state.post.descendants}
            />
            <Time
              time={this.state.post.time}
            />
            <View style={styles.postInfoAction}>
              <View style={styles.postInfoActionText}>
                <Actions
                  item={this.state.post}
                />
              </View>
            </View>
          </View>
        </View>

        <View>
          <AllComments 
            post={this.state.post} 
            settings={this.props.settings}/>
        </View>
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
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: config.colors.gray,
  },
  postInfoDetails: {
    flexDirection: 'row',
    marginLeft: -3,
    paddingTop: 5,
    paddingBottom: 5,
  },
  postInfoAction: {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

