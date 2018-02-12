import { getItem } from './api';

/**
 * Convert nested comments into an array of comments
 * where child comment is simply the next element
 * in the array. Is recursive
 * @param  {Object}   comments      An object containing nested comments
 * @param  {Object[]} commentsArray An array containing flattened comments
 * @return {Object[]}               An array containing all flattened comments
 */
flatten = (comments, commentsArray) => {
  for (var key in comments) {
    const currentComment = comments[key];

    if (comments.hasOwnProperty(key) && !currentComment.dead && !currentComment.deleted) {
      commentsArray.push(currentComment);
      if (currentComment.kids && currentComment.kids.length > 0) {
        flatten(currentComment.kids, commentsArray);
      }
    }
  }
  return commentsArray;
};

/**
 * Get all comments from an array of comment IDs
 * @param  {Number[]} commentIds An array of all comment IDs
 * @return {Promise}             A promise that resolves with
 *                               all comments
 */
getComments = (commentIds) => {
  return new Promise((resolve, reject) => {
    const comments = commentIds.map(id => {
      return getChildComment(id, 0)
        .then(comment => {
          return comment;
        });
    });

    Promise.all(comments)
      .then(allComments => {
        resolve(flatten(allComments, []));
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * A recursive function to get child comments of
 * a parent comment
 * @param  {Number} parentId The parent ID to get the child comment
 * @param  {Number} level    The level of nesting
 * @return {Promise}         A promise containing all child comments
 */
getChildComment = (parentId, level) => {
  return new Promise((resolve, reject) => {
    getItem(parentId)
      .then(comment => {
        comment.level = level;
        comment.open = true;
        comment.hidden = false;

        if (comment.kids && comment.kids.length > 0) {
          const results = comment.kids.map(id => {
            return getChildComment(id, level + 1)
              .then(c => {
                return c;
              });
          });

          Promise.all(results)
            .then(kids => {
              resolve({ ...comment, kids: kids });
            });
        } else {
          resolve(comment);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

/**
 * Toggles comment visibility when a comment
 * is clicked on
 * @param  {Object[]} comments An array of comment objects
 * @param  {Number} id         The id of the comment clicked on
 * @param  {Number} level      The level of the comment clicked on
 * @return {Object[]}          The new array of comment objects
 *                             with certain comments hidden/closed
 */
toggleComments = (comments, id, level) => {
  comments.forEach(function (comment, index) {
    if (comment.id === id) {
      // Toggle content visibility, but still show comment header
      comment.open = !comment.open;

      let highestLevel = level;

      for (i = index + 1; i < comments.length; i++) {
        // If comment is a children of comment clicked on
        if (comments[i].level > level) {
          // If clicked on comment is being closed
          if (!comment.open) {
            // Hide every child comment
            comments[i].hidden = true;
          } else if (comment.open) {
            // Child comment has a parent, check if the parent is closed
            if (comments[i].parent) {
              for (k = 0; k < comments.length; k++) {
                // Found the parent
                if (comments[k].id === comments[i].parent) {
                  // If the parent is closed
                  if (!comments[k].open) {
                    // Hide the child
                    comments[i].hidden = true;
                  } else {
                    comments[i].hidden = false;
                  }
                }
              }
            } else {
              // No parent so unhide it
              comments[i].hidden = false;
            }
          }
        } else {
          break;
        }
      }
    }
  });
  return comments;
};

export { 
  getComments,
  toggleComments,
};
