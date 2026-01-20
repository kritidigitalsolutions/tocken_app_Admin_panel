const Property = require("../models/property.model");

const expirePremiumListings = async () => {
  const now = new Date();

  await Property.updateMany(
    {
      isPremium: true,
      "premium.endDate": { $lt: now }
    },
    {
      isPremium: false,
      premium: {}
    }
  );
};

module.exports = expirePremiumListings;
