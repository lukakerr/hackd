import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import Comment from './Comment';
import CustomText from '../CustomText';
import commonStyles from '../../styles/common';
import { 
  getComments,
  toggleComments
} from '../../helpers/api';

export default class AllComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: null,
      error: null,
      loading: true,
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

  fetchComments = () => {
    const { kids } = this.props.post;
    if (kids) {
      getComments(kids)
        .then(comments => {
          if (this._mounted) {
            this.setState({
              comments,
              loading: false,
            });
          }
        })
        .catch(error => {
          if (this._mounted) {
            this.setState({
              error,
            });
          }
        });
    } else {
      this.setState({
        comments: [],
        loading: false,
      })
    }
  };

  toggle = (id, level) => {
    if (!this.props.settings.tapToCollapse) {
      return;
    };
    
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
          extraData={this.state.refreshComments}
          keyboardShouldPersistTaps='always'
          keyExtractor={(item, index) => index}
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
