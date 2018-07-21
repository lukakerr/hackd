import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import config from '../../config/default.json';

export default class SwipeContent extends React.PureComponent {
  static defaultProps = {
    alignment: 'right',
    backgroundColor: config.colors.orange,
    image: null,
    size: 36,
  };

  static propTypes = {
    alignment: PropTypes.string,
    backgroundColor: PropTypes.string,
    image: PropTypes.number,
    size: PropTypes.number,
  };

  render() {
    const { alignment, backgroundColor, image, size } = this.props;
    return (
      <View
        style={{
          backgroundColor,
          flex: 1,
          alignItems: alignment === 'left' ? 'flex-end' : 'flex-start',
          justifyContent: 'center',
          paddingLeft: alignment === 'left' ? 0 : 20,
          paddingRight: alignment === 'left' ? 20 : 0,
        }}
      >
        <Image
          style={{ width: size, height: size, tintColor: 'white' }}
          source={image}
        />
      </View>
    );
  }
}
