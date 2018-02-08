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
      <CustomText style={styles.textWrapper}>
        <View style={styles.iconView}>
        </View>
        <CustomText>
          {this.props.by}
        </CustomText>
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
    opacity: 0.6,
  },
});
