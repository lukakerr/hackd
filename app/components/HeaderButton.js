import React from 'react';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class HeaderButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Image 
          style={[this.props.style, styles.icon]} 
          source={this.props.image} 
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});
