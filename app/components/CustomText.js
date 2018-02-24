import React from 'react';
import { Text } from 'react-native';

import commonStyles from '../styles/common';

export default class CustomText extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={[this.props.style, commonStyles.text]}>
        {this.props.children}
      </Text>
    );
  }
}
