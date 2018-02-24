import React from 'react';
import commonStyles from '../styles/common';

import {
  Text,
  View,
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
      <View>
        {searchResults.map(result => (
          <Text>{result.title}</Text>
        ))}
      </View>
    );
  }
}