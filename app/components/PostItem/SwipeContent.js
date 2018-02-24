import React from 'react';
import { View, Image } from 'react-native';

export default class SwipeContent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { alignment, backgroundColor, image, size } = this.props;
    return (
      <View
        style={{
          backgroundColor: backgroundColor,
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
