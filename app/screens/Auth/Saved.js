import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import PostList from '../../components/PostList';
import CustomText from '../../components/CustomText';
import commonStyles from '../../styles/common';
import { getItems } from '../../helpers/api';

export default class Saved extends React.Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
    saved: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoadingPosts: true,
      saved: null,
      savedIds: null,
      refreshing: false,
    };
  }

  componentWillMount() {
    this.setState({
      savedIds: this.props.saved,
    });
  }

  componentDidMount() {
    this.fetchSavedPosts();
  }

  fetchSavedPosts = () => {
    const saved = getItems(null, null, this.state.savedIds);

    // Wait for all Promises to complete
    Promise.all(saved)
      .then(results => {
        this.setState({
          isLoadingPosts: false,
          saved: results,
          refreshing: false,
        });
      })
      .catch();
  };

  handleRefresh = () => {
    this.setState({
      refreshing: true,
    }, this.fetchSavedPosts);
  };

  render() {
    const { navigator } = this.props;

    const {
      saved,
      savedIds,
      isLoadingPosts,
      refreshing,
    } = this.state;

    if (savedIds && savedIds.length === 0) {
      return (
        <View style={commonStyles.center}>
          <CustomText style={commonStyles.error}>No saved posts.</CustomText>
        </View>
      );
    }

    return (
      <PostList
        data={saved}
        isLoadingPosts={isLoadingPosts}
        navigator={navigator}
        refreshing={refreshing}
        onRefresh={() => this.handleRefresh()}
        onEndReached={() => {}}
      />
    );
  }
}
