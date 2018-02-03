import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Post extends React.Component {
  constructor(props) {
    super(props);
  }

  // Extend props from navigator
  componentWillMount() {
    this.props = {
      ...this.props,
      ...this.props.navigation.state.params,
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <Text>{this.props.url} - {this.props.score}</Text>
      </View>
    );
  }
}
