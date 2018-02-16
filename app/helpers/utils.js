const capitalize = str => str[0].toUpperCase() + str.slice(1);

const truncate = (str, len) => {
  if (str.length < len) {
    return str;
  }
  const truncatedStr = str.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
  return `${truncatedStr.substring(0, len)}...`;
};

const addToUserAccount = (accounts, user, id, type) => {
  const userAccount = accounts[user.username];
  const newAccounts = {};

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

const removeFromUserAccount = (accounts, user, id, type) => {
  const userAccount = accounts[user.username];
  const newAccounts = {};

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
