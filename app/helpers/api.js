import cheerio from 'cheerio-without-node-native';
import config from '../config/default';

/**
 * Get item from given ID
 * @param  {String} itemId The ID of the item to fetch
 * @return {Promise}       Returns a promise
 */
getItem = (itemId) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.api}/item/${itemId}.json`)
      .then(response => response.json())
      .then(responseJson => {
        resolve(responseJson);
      }).catch(error => {
        reject(error);
      });
  });
};

/**
 * Given a list of IDs, get each item for that ID
 * @param  {Number[]}  itemIds An array of item IDs
 * @return {Promise[]}         An array of Promises resolved
 *                             with Promise.all
 */
getItems = (page, limit, itemIds) => {
  let slicedItems = itemIds;

  if (page && limit) {
    const beginning = (page - 1) * limit;
    const end = beginning + limit;
    slicedItems = itemIds.slice(beginning, end);
  }

  // Map each itemId to an Array of Promises
  const posts = slicedItems.map(item => {
    return getItem(item)
      .then(post => post);
  });

  return posts;
};

/**
 * Gets a users information from their username
 * @param  {String} username The users username
 * @return {Object}          The users data
 */
getUser = (username) => {
  return fetch(`${config.api}/user/${username}.json`)
    .then(response => response.json())
    .then(responseJson => responseJson)
    .catch(error => null);
};

/**
 * Get the URL needed to upvote
 * @param  {String} itemId The item ID to upvote
 * @return {Promise}       Returns a promise that
 *                         resolves with the upvote URL
 */
getUpvoteUrl = (itemId) => {
  return fetch(`${config.base}/item?id=${itemId}`, {
    mode: 'no-cors',
    credentials: 'include',
  }).then(response => response.text())
    .then(responseText => {
      const document = cheerio.load(responseText);
      return document(`#up_${itemId}`).attr('href');
    });
};

/**
 * Get the URL needed to unvote
 * @param  {String} itemId The item ID to upvote
 * @return {Promise}       Returns a promise that
 *                         resolves with the unvote URL
 */
getUnvoteUrl = (itemId) => {
  return fetch(`${config.base}/item?id=${itemId}`, {
    mode: 'no-cors',
    credentials: 'include',
  }).then(response => response.text())
    .then(responseText => {
      const document = cheerio.load(responseText);
      return document(`#un_${itemId}`).attr('href');
    });
};

/**
 * Upvote an item
 * @param  {String} itemId The item ID to upvote
 * @return {Promise}       Returns a promise that
 *                         resolves true if upvoted, else false
 */
upvote = (itemId) => {
  return this.getUpvoteUrl(itemId)
    .then(upvoteUrl => fetch(`${config.base}/${upvoteUrl}`, {
      mode: 'no-cors',
      credentials: 'include',
    }))
    .then(response => response.text())
    .then(responseText => true)
    .catch(error => false);
};

/**
 * Unvote an item
 * @param  {String} itemId The item ID to upvote
 * @return {Promise}       Returns a promise that
 *                         resolves true if unvoted, else false
 */
unvote = (itemId) => {
  return this.getUnvoteUrl(itemId)
    .then(upvoteUrl => fetch(`${config.base}/${upvoteUrl}`, {
      mode: 'no-cors',
      credentials: 'include',
    }))
    .then(response => response.text())
    .then(responseText => true)
    .catch(error => false);
};

/**
 * Login a user
 * @param  {String} username The users username
 * @param  {String} password The users password
 * @return {Promise}         Returns a promise that
 *                           resolves true if logged in, else false
 */
login = (username, password) => {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  });

  return fetch(`${config.base}/login`, {
    method: 'POST',
    headers,
    body: `acct=${username}&pw=${password}&goto=news`,
    mode: 'no-cors',
    credentials: 'include',
  }).then(response => response.text())
    .then(responseText => {
      if (responseText.match(/Bad Login/i)) {
        return false;
      }
      return true;
    });
};

/**
 * Get the URL needed to logout
 * @return {Promise}       Returns a promise that
 *                         resolves with the logout URL
 */
getLogoutUrl = () => {
  return fetch(`${config.base}/news`, {
    mode: 'no-cors',
    credentials: 'include',
  }).then(response => response.text())
    .then(responseText => {
      const document = cheerio.load(responseText);
      return document('#logout').attr('href');
    });
};

/**
 * Logout a user
 * @return {Promise}       Returns a promise that
 *                         resolves true if logged out, else false
 */
logout = () => {
  return this.getLogoutUrl()
    .then(logoutUrl => fetch(`${config.base}/${logoutUrl}`, {
      mode: 'no-cors',
      credentials: 'include',
    })).then(response => response.text())
      .then(responseText => true)
      .catch(error => false);
};

/**
 * Get the URL needed to comment
 * @param  {String} itemId The item ID to comment on
 * @return {Promise}       Returns a promise that
 *                         resolves with the comment URL
 */
getCommentUrl = (itemId) => {
  return fetch(`${config.base}/item?id=${itemId}`, {
    mode: 'no-cors',
    credentials: 'include',
  }).then(response => response.text())
    .then(responseText => {
      const document = cheerio.load(responseText);
      return document('input[name=hmac]').attr('value');
    });
};

/**
 * Reply to a story or a comment
 * @param  {String} itemId The item ID to comment on
 * @param  {String} reply  The text content of the reply
 * @return {Promise}       Returns a promise that
 *                         resolves true if commented, else false
 */
comment = (itemId, reply) => {
  return this.getCommentUrl(itemId).then(commentUrl => {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    });

    return fetch(`${config.base}/comment`, {
      method: 'POST',
      headers,
      body: `parent=${itemId}&goto=item?id=${itemId}&hmac=${commentUrl}&text=${reply}`,
      mode: 'no-cors',
      credentials: 'include',
    });
  }).then(response => response.text())
    .then(responseText => true)
    .catch(error => false);
};

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
              resolve({ ...comment, kids });
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
  comments.forEach((comment, index) => {
    if (comment.id === id) {
      // Toggle content visibility, but still show comment header
      comment.open = !comment.open;

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
  getItem,
  getItems,
  upvote,
  unvote,
  login,
  comment, 
  getUser,
  logout,
  getComments,
  toggleComments,
};