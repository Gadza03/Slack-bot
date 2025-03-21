const Fuse = require("fuse.js");

const findItem = (items, message) => {
  const options = {
    keys: ["name"],
    threshold: 0.3,
  };

  const fuse = new Fuse(items, options);

  const result = fuse.search(message);

  if (result.length > 0) {
    return result[0].item;
  } else {
    return null;
  }
};
module.exports = { findItem };
