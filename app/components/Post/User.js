import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import CustomText from "../CustomText";

export default class User extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.textWrapper}>
        <View style={styles.iconView}>
        </View>
        <CustomText>
          {this.props.by}
        </CustomText>
      </Text>
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
