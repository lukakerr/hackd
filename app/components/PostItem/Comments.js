import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';

import CustomText from '../CustomText';

export default class Comments extends React.PureComponent {
  static defaultProps = {
    count: 0,
  };

  static propTypes = {
    count: PropTypes.number,
  };

  render() {
    return (
      <View style={styles.textWrapper}>
        <View style={styles.iconView}>
          <Image
            style={styles.icon}
            source={require('../../img/comment.png')}
          />
        </View>
        <CustomText>{this.props.count > -1 ? this.props.count : 0}</CustomText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
  },
  iconView: {
    width: 18,
    height: 18,
  },
  textWrapper: {
    fontSize: 14,
    marginLeft: 4,
    marginRight: 4,
    opacity: 0.6,
    flexDirection: 'row',
  },
});
