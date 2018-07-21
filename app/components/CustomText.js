import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import commonStyles from '../styles/common';

export default class CustomText extends React.PureComponent {
  static defaultProps = {
    children: null,
    style: {},
  };

  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.any,
  };

  render() {
    return (
      <Text style={[this.props.style, commonStyles.text]}>
        {this.props.children}
      </Text>
    );
  }
}
