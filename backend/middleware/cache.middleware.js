const redis = require("../config/redis");

const cache = (keyPrefix, ttl = 60) => {
  return async (req, res, next) => {
    const key = `${keyPrefix}:${JSON.stringify(req.query)}:${req.params.id || ""}`;

    const cachedData = await redis.get(key);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Override res.json to cache response
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      redis.setex(key, ttl, JSON.stringify(data));
      originalJson(data);
    };

    next();
  };
};

module.exports = cache;
