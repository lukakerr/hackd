import React from 'react';
import config from '../config/default';
import commonStyles from '../styles/common';

import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import SearchBar from 'react-native-search-bar'

import { searchPost , getItems} from '../helpers/api';
import {posts} from '../reducers/items';

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResults: [],
    };

    this.onSearchTextChanged = this.onSearchTextChanged.bind(this);
  }

  onSearchTextChanged(searchBarText) {
    // There's no point in us searching for nothing
    // If they don't have anything in the search box, dont bother showing previous search results
    // Of course this can always be changed, I don't know if thats proper functionality :p
    if (searchBarText.length !== 0) {
      searchPost({}, searchBarText).then(responseJson => {
        this.setState({
          searchResults: responseJson.hits,
        });
      });
    } else if (searchBarText.length === 0) {
      this.setState({
        searchResults: [],
      });
    }
  }

  render() {
    const { searchResults } = this.state;
    return (
      <View style={commonStyles.flex}>
        <SearchBar
          ref='SearchBar'
          placeholder='Search'
          onChangeText={this.onSearchTextChanged}
        />
        <ScrollView style={styles.searchContainer}>
          <View>
            {searchResults.map(result => (
              <Text key={result.title}>{result.title}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
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