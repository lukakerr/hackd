import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import CustomText from "../CustomText";

export default class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={styles.textWrapper}>
        <View style={styles.iconView}>
          <Image
            style={styles.icon}
            source={require('../../img/comment.png')}
          />
        </View>
        <CustomText>
          {this.props.count}
        </CustomText>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
  },
  iconView: {
    width: 18,
    height: 18,
    paddingTop: 5,
  },
  textWrapper: {
    fontSize: 14,
    marginLeft: 4,
    marginRight: 4,
  },
});
