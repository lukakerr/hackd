import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import Comment from './Comment';
import CustomText from '../CustomText';
import commonStyles from '../../styles/common';
import { getComments, toggleComments } from '../../helpers/api';

export default class AllComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      error: null,
      loading: true,
      loadingMoreComments: false,
      refreshComments: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this._mounted = true;
    this.fetchComments();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillReceiveProps() {
    this.setState({
      refreshComments: !this.state.refreshComments,
    });
  }

  fetchComments = () => {
    const { kids } = this.props.post;

    if (!kids) {
      this.setState({
        comments: [],
        loading: false,
      });
      return;
    }

    for (let i = 0, p = Promise.resolve(); i < kids.length; i++) {
      p = p.then(
        _ =>
          new Promise(resolve => {
            // Get replies for current top level comment
            getComments([kids[i]])
              .then(comments => {
                let newComments = this.state.comments || [];
                newComments.push(...comments);

                let loadingMoreComments = true;

                // Last comment finished loading
                if (i == kids.length - 1) {
                  loadingMoreComments = false;
                }

                if (this._mounted) {
                  this.setState(
                    {
                      comments: newComments,
                      loading: false,
                      loadingMoreComments,
                    },
                    () => {
                      resolve();
                    },
                  );
                } else {
                  resolve();
                }
              })
              .catch(error => {
                if (this._mounted) {
                  this.setState(
                    {
                      error,
                      loading: false,
                    },
                    () => {
                      resolve();
                    },
                  );
                }
              });
          }),
      );
    }
  };

  toggle = (id, level) => {
    if (!this.props.settings.tapToCollapse) {
      return;
    }

    let { comments } = this.state;
    comments = toggleComments(comments, id, level);

    this.setState({
      comments,
      refreshComments: !this.state.refreshComments,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.allComments}>
        <FlatList
          data={this.state.comments}
          extraData={[this.state.refreshComments, this.state.comments]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Comment
              id={item.id}
              level={parseInt(item.level)}
              content={item.text}
              author={item.by}
              time={item.time}
              open={item.open}
              hidden={item.hidden}
              toggle={this.toggle}
            />
          )}
        />
        {this.state.loadingMoreComments && (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  allComments: {
    marginTop: 10,
  },
  loading: {
    marginTop: 20,
  },
});
