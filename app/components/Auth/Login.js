import React from 'react';
import commonStyles from '../../styles/common';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Not logged in</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
