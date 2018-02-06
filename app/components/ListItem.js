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
import Time from "./Post/Time";
import Actions from "./Post/Actions";

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onPress = () => {
    this.props.onPressItem();
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress} activeOpacity={0.8}>
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
              <Time
                time={this.props.item.time}
              />
              <View style={styles.listItemAction}>
                <View style={styles.listItemActionText}>
                  <Actions
                    id={this.props.item.id}
                  />
                </View>
              </View>
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
    flex: 1,
    flexDirection: 'row',
    marginLeft: -3,
    paddingTop: 5,
    paddingBottom: 5,
  },
  listItemAction: {
    flexGrow: 1
  },
  listItemActionText: {
    alignSelf: 'flex-end'
  },
});
