const redis = require("../config/redis");

const invalidateByPattern = async (pattern) => {
  const keys = await redis.keys(pattern);
  if (keys.length) {
    await redis.del(keys);
  }
};

module.exports = invalidateByPattern;
