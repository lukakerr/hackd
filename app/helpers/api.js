import config from '../config/default';

/**
 * Get item from given ID
 * @param  {String} [itemId] The ID of the item to fetch
 * @return {Promise}         Returns a promise
 */
getItem = (itemId) => {
  return new Promise((resolve, reject) => {
    fetch(`${config.api}/item/${itemId}.json`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        resolve(responseJson);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  })
};

/**
 * Given a list of IDs, get each item for that ID
 * @param  {Array} [items] An array of item IDs
 * @return {Promise[]}     An array of Promises resolved
 *                         with Promise.all
 */
getItems = (page, limit, items) => {
  const beginning = 0;
  const end = 20 + 1;
  const slicedItems = items.slice(beginning, end);

  // Map each itemId to an Array of Promises
  let posts = slicedItems.map(item => {
    return getItem(item)
      .then(post => {
        return post;
      })
  });

  return posts;
};

export { 
  getItems 
};