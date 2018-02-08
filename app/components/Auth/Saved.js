import React from 'react';
import PostList from "../PostList";

import { getItems } from "../../helpers/api";

export default class Saved extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingPosts: true,
      saved: null,
    };
  }

  componentWillMount() {
    const saved = { 
      saved: this.props.navigation.state.params,
    };

    this.props = {
      ...this.props,
      ...saved,
    };
  }

  componentDidMount() {
    this.fetchSavedPosts();
  }

  fetchSavedPosts = () => {
    const saved = getItems(1, 20, this.props.saved);

    // Wait for all Promises to complete
    Promise.all(saved)
      .then(results => {
        this.setState({
          isLoadingPosts: false,
          saved: results,
        });
      })
      .catch(e => {
        console.error(e);
      });
  };

  render() {
    return (
      <PostList
        data={this.state.saved}
        isLoadingPosts={this.state.isLoadingPosts}
        navigation={this.props.navigation}
      />
    )
  }
}
