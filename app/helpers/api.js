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
        console.error(error);
        reject(error);
      });
  });
};

/**
 * Given a list of IDs, get each item for that ID
 * @param  {Array} itemIds An array of item IDs
 * @return {Promise[]}     An array of Promises resolved
 *                         with Promise.all
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
      .then(post => {
        return post;
      });
  });

  return posts;
};

getUser = (username) => {
  return fetch(`${config.api}/user/${username}.json`)
    .then(response => response.json())
    .then(responseJson => {
      return responseJson;
    }).catch(error => {
      console.error(error);
    });
};

/**
 * Get the URL needed to upvote
 * @param  {String} itemId The item ID to upvote
 * @return {Promise}       Returns a promise that
 *                         resolves with the upvote URL
 */
getUpvoteUrl = (itemId) => {
  return fetch(`${config.base}/item?id=${itemId}`, {
    mode: "no-cors",
    credentials: "include",
  }).then(response => response.text())
    .then(responseText => {
      const document = cheerio.load(responseText);
      return document(`#up_${itemId}`).attr("href");
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
      mode: "no-cors",
      credentials: "include",
    })).then(response => response.text())
      .then(responseText => {
        return true;
      })
      .catch(error => {
        console.error(error);
        return false;
      });
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
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  });

  return fetch(`${config.base}/login`, {
    method: "POST",
    headers,
    body: `acct=${username}&pw=${password}&goto=news`,
    mode: "no-cors",
    credentials: "include",
  }).then(response => response.text())
    .then(responseText => {
      if (responseText.match(/Bad Login/i)) {
        return false;
      }
      return true;
    });
};

getLogoutUrl = () => {
  return fetch(`${config.base}/news`, {
    mode: "no-cors",
    credentials: "include",
  }).then(response => response.text())
    .then(responseText => {
      const document = cheerio.load(responseText);
      return document('#logout').attr("href");
    });
};

logout = (user) => {
  return this.getLogoutUrl()
    .then(logoutUrl => fetch(`${config.base}/${logoutUrl}`, {
      mode: "no-cors",
      credentials: "include",
    })).then(response => response.text())
      .then(responseText => {
        return true;
      })
      .catch(error => {
        console.error(error);
        return false;
      });
};

/**
 * Get the URL needed to comment
 * @param  {String} itemId The item ID to comment on
 * @return {Promise}       Returns a promise that
 *                         resolves with the comment URL
 */
getCommentUrl = (itemId) => {
  return fetch(`${config.base}/item?id=${itemId}`, {
    mode: "no-cors",
    credentials: "include",
  }).then(response => response.text())
    .then(responseText => {
      const document = cheerio.load(responseText);
      return document("input[name=hmac]").attr("value");
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
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    });

    return fetch(`${config.base}/comment`, {
      method: "POST",
      headers,
      body: `parent=${itemId}&goto=item?id=${itemId}&hmac=${commentUrl}&text=${reply}`,
      mode: 'no-cors',
      credentials: 'include',
    });
  }).then(response => response.text())
    .then(responseText => {
      return true;
    })
    .catch(error => {
      console.error(error);
      return false;
    });
};

export { 
  getItem,
  getItems,
  upvote,
  login,
  comment, 
  getUser,
  logout
};