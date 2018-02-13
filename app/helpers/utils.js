const capitalize = str => str[0].toUpperCase() + str.slice(1);

const truncate = (str, len) => {
  if (str.length < len) {
    return str;
  }
  const truncatedStr = str.replace(/(^\w+:|^)\/\//, '').replace('www.', '');
  return `${truncatedStr.substring(0, len)}...`;
};

const addToUserAccount = (accounts, user, post, type) => {
  const userAccount = accounts[user];
  const newAccounts = {};
  const otherType = type === 'upvoted' ? 'saved' : 'upvoted';

  // User has an entry
  if (userAccount) {
    // If user doesnt have the post saved/upvoted
    if (userAccount[type].indexOf(post) === -1) {
      userAccount[type].unshift(post);
    } else if (type !== 'upvoted') {
      // User already has the post saved
      const index = userAccount[type].indexOf(post);
      userAccount[type].splice(index, 1);
    }
    newAccounts[user] = userAccount;
  } else {
    // User has no record, create one and add post
    newAccounts[user] = {
      [type]: [post],
      [otherType]: [],
    };
  }

  return newAccounts;
};

export {
  capitalize,
  truncate,
  addToUserAccount,
};
