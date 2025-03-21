const Fuse = require("fuse.js");

const findItem = (items, message, limit = 3) => {
  const options = {
    keys: ["name"],
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
    ignoreCase: true,
  };

  const fuse = new Fuse(items, options);
  const results = fuse.search(message);

  if (results.length > 0) {
    return results.slice(0, limit).map((result) => {
      return {
        item: result.item,
        score: result.score,
      };
    });
  } else {
    return null;
  }
};

const formatResults = (results, originalQuery) => {
  if (!results || results.length === 0) {
    return `I didn't find any object called *${originalQuery}*. Try again with new word.`;
  }

  if (results.length === 1) {
    return `Item: *${results[0].item.name}* founded on location: *${results[0].item.location}*`;
  }

  const formattedResults = results
    .map(
      (result) =>
        `Item: *${result.item.name}* location: *${result.item.location}*`
    )
    .join("\n");

  return `I founded ${results.length} similar items for *"${originalQuery}"*:\n${formattedResults}`;
};

module.exports = { findItem, formatResults };
