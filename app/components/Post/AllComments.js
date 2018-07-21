import React from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import Comment from './Comment';
import { getComments, toggleComments } from '../../helpers/api';

export default class AllComments extends React.Component {
  static defaultProps = {
    post: {},
    settings: {
      tapToCollapse: false,
    },
  };

  static propTypes = {
    post: PropTypes.object,
    settings: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      loading: true,
      loadingMoreComments: false,
      refreshComments: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchComments();
  }

  componentWillReceiveProps() {
    this.setState({
      refreshComments: !this.state.refreshComments,
    });
  }

  componentWillUnmount() {
    this.mounted = false;
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
                const newComments = this.state.comments || [];
                newComments.push(...comments);

                let loadingMoreComments = true;

                // Last comment finished loading
                if (i === kids.length - 1) {
                  loadingMoreComments = false;
                }

                if (this.mounted) {
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
                if (this.mounted) {
                  this.setState(
                    {
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
              level={parseInt(item.level, 10)}
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
    marginTop: 4,
    paddingBottom: 20,
  },
  loading: {
    marginTop: 20,
  },
});
