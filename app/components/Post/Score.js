import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import CustomText from "../CustomText";

export default class Score extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.textWrapper}>
        <View style={styles.iconView}>
          <Image
            style={styles.icon}
            source={require('../../img/arrow.png')}
          />
        </View>
        <CustomText>
          {this.props.score}
        </CustomText>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
  iconView: {
    width: 18,
    height: 18,
    paddingTop: 4,
  },
  textWrapper: {
    fontSize: 14,
    marginLeft: 2,
    marginRight: 4,
  },
});
