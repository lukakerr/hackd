import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomText from "./CustomText";
import Score from "./Post/Score";
import Comments from "./Post/Comments";
import User from "./Post/User";
import TimeAgo from "./Post/TimeAgo";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  _onPress = () => {
    this.props.onPressItem();
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress} activeOpacity={0.8}>
        <View style={styles.listItem}>
          <CustomText styles={styles.listItemSection}>
            <Text style={styles.listItemTitle}>
              {this.props.item.title}
            </Text>
          </CustomText>
          <View>
            <View style={styles.listItemSubTitle}>
              <User
                by={this.props.item.by}
              />
              <Score
                score={this.props.item.score}
              />
              <Comments
                count={this.props.item.descendants}
              />
              <TimeAgo
                time={this.props.item.time}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#FAFAFA",
  },
  listItemSection: {
    paddingBottom: 5
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: "400",
  },
  listItemSubTitle: {
    flexDirection: 'row',
    marginLeft: -3,
    paddingBottom: 5,
    opacity: 0.6,
  },
});
