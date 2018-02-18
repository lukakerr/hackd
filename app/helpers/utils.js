/**
 * Capitalize a string
 * @param  {String} str The string to capitalize
 * @return {String}     The capitalized string
 */
const capitalize = str => str[0].toUpperCase() + str.slice(1);

/**
 * Truncate a given string to a given length
 * @param  {String} str The string to truncate
 * @param  {Number} len The length to truncate to
 * @return {String}     The truncated string with an ellipsis
 */
const truncate = (str, len) => {
  if (str.length < len) {
    return str;
  }
  const truncatedStr = str.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
  return `${truncatedStr.substring(0, len)}...`;
};

/**
 * Add an ID to a users account
 * @param  {Object} accounts Current persisted accounts
 * @param  {Object} user     Current logged in user
 * @param  {Number} id       The ID to add
 * @param  {String} type     The collection to add to (i.e. upvoted)
 * @return {Object}          The new accounts object with the added ID
 */
const addToUserAccount = (accounts, user, id, type) => {
  // Deep copy to new object
  const newAccounts = JSON.parse(JSON.stringify(accounts));
  const userAccount = newAccounts[user.username];

  // User has an entry
  if (userAccount) {
    // If user account doesnt have type, add it first
    if (userAccount[type] === undefined) {
      userAccount[type] = [];
    }

    // If user doesnt have the id saved/upvoted
    if (userAccount[type].indexOf(id) === -1) {
      userAccount[type].unshift(id);
    } else if (type !== 'upvoted') {
      // User already has the id saved
      const index = userAccount[type].indexOf(id);
      userAccount[type].splice(index, 1);
    }
    newAccounts[user.username] = userAccount;
  } else {
    // User has no record, create one and add id
    newAccounts[user.username] = {
      [type]: [id],
    };
  }

  return newAccounts;
};

/**
 * Remove an ID from a users account
 * @param  {Object} accounts Current persisted accounts
 * @param  {Object} user     Current logged in user
 * @param  {Number} id       The ID to remove
 * @param  {String} type     The collection to remove from (i.e. saved)
 * @return {Object}          The new accounts object with the removed ID
 */
const removeFromUserAccount = (accounts, user, id, type) => {
  // Deep copy to new object
  const newAccounts = JSON.parse(JSON.stringify(accounts));
  const userAccount = newAccounts[user.username];

  // User has an entry
  if (userAccount) {
    // If user account doesnt have type, add it first
    if (userAccount[type] === undefined) {
      userAccount[type] = [];
    }

    // If user has the id already, remove it
    if (userAccount[type].indexOf(id) !== -1) {
      const index = userAccount[type].indexOf(id);
      userAccount[type].splice(index, 1);
    }
    newAccounts[user.username] = userAccount;
  } else {
    // User has no record, create one set to empty
    newAccounts[user.username] = {
      [type]: [],
    };
  }

  return newAccounts;
};

export {
  capitalize,
  truncate,
  addToUserAccount,
  removeFromUserAccount,
};
