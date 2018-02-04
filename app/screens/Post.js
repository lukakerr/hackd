import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { upvote } from "../helpers/api";

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

  upvoteItem = (id) => {
    upvote(id).then(response => {
      // If response is true, upvote successful
      console.log("RESPONSE: ", response);
    });
  };

  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>
        <Text>{this.props.url} - {this.props.score}</Text>
        {/*<TouchableOpacity onPress={() => this.upvoteItem(this.props.id)}>
          <Text>Upvote</Text>
        </TouchableOpacity>*/}
      </View>
    );
  }
}
