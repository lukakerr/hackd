import { getItem } from './api';

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

export { 
  getComments,
};
