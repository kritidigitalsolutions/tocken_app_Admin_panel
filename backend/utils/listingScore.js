const calculateListingScore = (property) => {
  let score = 0;

  // 1️⃣ Basic Info
  if (property.listingType && property.propertyCategory && property.propertyType) {
    score += 10;
  }

  // 2️⃣ Apartment Details
  if (
    property.apartmentDetails &&
    property.apartmentDetails.bhkType &&
    property.apartmentDetails.bathrooms
  ) {
    score += 20;
  }

  // 3️⃣ Pricing
  if (property.pricing && property.pricing.rentAmount) {
    score += 15;
  }

  // 4️⃣ Location
  if (
    property.location &&
    property.location.city &&
    property.location.locality
  ) {
    score += 10;
  }

  // 5️⃣ Amenities
  if (property.amenities && property.amenities.length >= 3) {
    score += 10;
  }

  // 6️⃣ Preferences
  if (property.preferences && property.preferences.length >= 1) {
    score += 5;
  }

  // 7️⃣ Photos
  if (property.photos && property.photos.length >= 3) {
    score += 20;
  }

  // 8️⃣ Description
  if (property.description && property.description.length >= 100) {
    score += 10;
  }

  return score;
};

const getListingGrade = (score) => {
  if (score >= 85) return "EXCELLENT";
  if (score >= 65) return "GOOD";
  if (score >= 40) return "AVERAGE";
  return "POOR";
};

module.exports = { calculateListingScore, getListingGrade };
