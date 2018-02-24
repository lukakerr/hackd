import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { searchPost } from '../helpers/api';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };
  }

  componentDidMount() {
    searchPost({}, 'dog').then(responseJson => {
      this.setState({
        searchResults: responseJson.hits,
      });
    });
  }

  render() {
    const { searchResults } = this.state;
    return (
      <ScrollView style={styles.searchContainer}>
        <View>
          {searchResults.map(result => (
            <Text key={result.title}>{result.title}</Text>
          ))}
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerContainer: {
    marginBottom: 10,
  },
  subHeader: {
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    opacity: 0.8,
  },
  subHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: config.colors.mediumGray,
    borderColor: config.colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
  },
  rightArrowContainer: {
    flexGrow: 1,
  },
  rightArrow: {
    opacity: 0.6,
    width: 20,
    height: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
});