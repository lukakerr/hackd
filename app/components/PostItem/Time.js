import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import CustomText from "../CustomText";

TimeAgo.locale(en);
const timeAgo = new TimeAgo('en-US');

export default class Time extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CustomText style={styles.textWrapper}>
        <View style={styles.iconView}>
          <Image
            style={styles.icon}
            source={require('../../img/clock.png')}
          />
        </View>
        <CustomText style={this.props.textStyle}>
          {timeAgo.format(new Date(this.props.time * 1000), { flavour: 'tiny' })}
        </CustomText>
      </CustomText>
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
    opacity: 0.6,
  },
});
