import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import SafariView from 'react-native-safari-view';

import htmlStyles from '../../styles/html';
import config from '../../config/default';
import User from '../PostItem/User';
import Time from '../PostItem/Time';
import CustomText from '../CustomText';

const NUM_COLORS = 5;
const COMMENT_BORDER_WIDTH = 2;

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  openUrl = url => {
    SafariView.show({
      url,
    });
  };

  toggle = (id, level) => {
    this.props.toggle(id, level);
  };

  render() {
    return (
      <TouchableOpacity onPress={() => this.toggle(this.props.id, this.props.level)} activeOpacity={0.5}>
        { !this.props.hidden && 
          <View style={styles.commentBox}>
            <View style={[styles.commentContainer, { marginLeft: (12 * this.props.level) - 10, }]}>
              <View style={[styles.comment, { 
                borderLeftWidth: this.props.level > 0 ? COMMENT_BORDER_WIDTH : 0,
                borderLeftColor: this.props.level > 0 
                                 ? config.commentThemes[this.props.commentTheme][this.props.level - 1 % NUM_COLORS] 
                                 : 'transparent',
              }]}>
                <View style={styles.commentInfo}>
                  <User by={this.props.author} style={styles.userName} />
                  <Time time={this.props.time} />
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
});
