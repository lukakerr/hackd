import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import CustomText from './CustomText';
import Score from './PostItem/Score';
import Comments from './PostItem/Comments';
import User from './PostItem/User';
import Time from './PostItem/Time';
import Actions from './PostItem/Actions';

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
            <CustomText style={styles.listItemTitle}>
              {this.props.item.title}
            </CustomText>
          </CustomText>
          <View>
            <View style={styles.listItemSubTitle}>
              <User
                by={this.props.item.by}
                style={{opacity: 0.6}}
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
                    item={this.props.item}
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
    backgroundColor: config.colors.mediumGray,
  },
  listItemSection: {
    paddingBottom: 5
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '400',
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
    alignSelf: 'flex-end',
  },
});
