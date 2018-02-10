import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import SafariView from "react-native-safari-view";

import htmlStyles from '../../styles/html';
import config from '../../config/default';
import User from '../PostItem/User';
import Time from '../PostItem/Time';
import CustomText from '../CustomText';

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.counter = 33;
  }

  openUrl = (url) => {
    SafariView.show({
      url,
    });
  };

  toggle = (id, level) => {
    this.props.toggle(id, level);
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.toggle(this.props.id, this.props.level)} activeOpacity={0.8}>
        { !this.props.hidden && 
          <View style={styles.commentBox}>
            <View style={[styles.commentContainer, { marginLeft: (12 * this.props.level) - 10, }]}>
              <View style={[styles.comment, { 
                borderLeftWidth: this.props.level > 0 ? 2 : 0,
                borderLeftColor: this.props.level > 0 ? config.borderColors[this.props.level % 5] : 'transparent',
              }]}>
                <View style={styles.commentInfo}>
                  <User by={this.props.author} style={styles.userName} />
                  <Time time={this.props.time} />
                </View>
                {this.props.open && 
                  <HTMLView
                    value={this.props.content}
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
});
