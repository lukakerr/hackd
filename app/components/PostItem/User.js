import React from 'react';
import { View, StyleSheet } from 'react-native';

import CustomText from '../CustomText';

export default class User extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <CustomText style={[this.props.style, styles.textWrapper]}>
        <View style={styles.iconView} />
        <CustomText>{this.props.by}</CustomText>
      </CustomText>
    );
  }
}

const styles = StyleSheet.create({
  iconView: {
    width: 4,
    height: 18,
    paddingTop: 5,
  },
  textWrapper: {
    fontSize: 14,
    marginRight: 4,
  },
});
