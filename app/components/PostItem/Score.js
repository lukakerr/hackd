import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

import CustomText from '../CustomText';

export default class Score extends React.PureComponent {
  static defaultProps = {
    score: 0,
  };

  static propTypes = {
    score: PropTypes.number,
  };

  render() {
    return (
      <View style={styles.textWrapper}>
        <View style={styles.iconView}>
          <Image style={styles.icon} source={require('../../img/arrow.png')} />
        </View>
        <CustomText>{this.props.score}</CustomText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
  iconView: {
    width: 18,
    height: 18,
  },
  textWrapper: {
    fontSize: 14,
    marginLeft: 2,
    marginRight: 4,
    opacity: 0.6,
    flexDirection: 'row',
  },
});
