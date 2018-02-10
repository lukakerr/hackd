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
import { getComments } from '../../helpers/comments';

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
    this.fetchComments();
  }

  fetchComments = () => {
    const { kids } = this.props.post;
    if (kids) {
      getComments(kids)
        .then(comments => {
          console.log(comments);
          this.setState({
            comments,
            loading: false,
          });
        })
        .catch(error => {
          this.setState({
            error,
          });
        });
    } else {
      this.setState({
        comments: [],
        loading: false,
      })
    }
  };

  toggle = (id, level) => {
    const { comments } = this.state;

    comments.forEach(function (comment, index) {
      if (comment.id === id) {
        // Toggle content visibility, but still show comment header
        comment.open = !comment.open;

        let heighestLevel = level; // e.g. 3

        for (i = index + 1; i < comments.length; i++) {
          // If comment is a children of comment clicked on
          if (level < comments[i].level) {
            // If clicked on comment is being closed
            if (!comment.open) {
              // Hide every child element
              comments[i].hidden = true;
            } else if (comment.open) {
              // Show all children which:
              // - Are not !comment[i].open (closed)
              // - Dont have a greater level than highestLevel
              
              // If closed
              if (!comments[i].open) {
                heighestLevel = comments[i].level;
                comments[i].hidden = false;
                if (comments[i].level < heighestLevel) {
                  comments[i].hidden = false;
                }
                continue;
              }

              // If child element is greater than highestLevel, continue
              // if (comments[i].level > highestLevel) {
              //   continue;
              // }
              if (comments[i].level <= heighestLevel) {
                comments[i].hidden = false;
              }
            }
          } else {
            break;
          }
        }
      }
    });

    console.log(comments);
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
          keyboardShouldPersistTaps="always"
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
