import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class Circles extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.circles}>
        {Object.keys(this.props.data).map(key =>
          <View 
            key={key}
            style={[{ 
              width: 10,
              height: 10,
              backgroundColor: this.props.data[key],
            }, styles.circle]} 
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  circles: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 16,
  },
  circle: {
    margin: 4,
    borderRadius: 5,
  },
});
