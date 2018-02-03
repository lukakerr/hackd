import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import timeAgo from 'epoch-timeago';
import CustomText from "../CustomText";

export default class TimeAgo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.textWrapper}>
        <View style={styles.iconView}>
          <Image
            style={styles.icon}
            source={require('../../img/clock.png')}
          />
        </View>
        <CustomText>
          {timeAgo(new Date(this.props.time * 1000))}
        </CustomText>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
    paddingTop: 2.5,
  },
  iconView: {
    width: 18,
    height: 18,
    paddingTop: 5.5,
  },
  textWrapper: {
    fontSize: 14,
    marginLeft: 4,
  },
});
