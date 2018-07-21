import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import CustomText from '../CustomText';

export default class User extends React.PureComponent {
  static defaultProps = {
    by: '[empty]',
  };

  static propTypes = {
    by: PropTypes.string,
  };

  render() {
    return (
      <View style={[this.props.style, styles.textWrapper]}>
        <View style={styles.iconView} />
        <CustomText>{this.props.by}</CustomText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconView: {
    width: 4,
    height: 18,
  },
  textWrapper: {
    fontSize: 14,
    marginRight: 4,
    flexDirection: 'row',
  },
});
