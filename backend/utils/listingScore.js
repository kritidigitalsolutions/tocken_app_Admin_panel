const calculateListingScore = (property) => {
  let score = 0;

  // 1️⃣ Basic Info (10 points)
  if (property.listingType) {
    score += 5;
  }
  if (property.propertyType || property.listingType === "PG" || property.listingType === "Co-Living") {
    score += 5;
  }

  // 2️⃣ Property Details based on listing type (20 points)
  if (property.listingType === "PG" && property.pgDetails) {
    if (property.pgDetails.pgName && property.pgDetails.pgFor && property.pgDetails.roomSharingType) {
      score += 20;
    }
  } else if (property.listingType === "Co-Living" && property.coLivingDetails) {
    if (property.coLivingDetails.name && property.coLivingDetails.gender && property.coLivingDetails.occupation) {
      score += 20;
    }
  } else if (property.propertyType === "RESIDENTIAL" && property.residentialDetails) {
    if (property.residentialDetails.bhkType && property.residentialDetails.bathrooms) {
      score += 20;
    }
  } else if (property.propertyType === "COMMERCIAL") {
    if (property.commercialDetails && property.commercialDetails.constructionStatus) {
      score += 15;
    }
    if (property.plotDetails && property.plotDetails.plotArea) {
      score += 15;
    }
  }

  // 3️⃣ Pricing (15 points)
  if (property.pricing && (property.pricing.rentAmount || property.pricing.salePrice)) {
    score += 15;
  }

  // 4️⃣ Location (10 points)
  if (property.location && property.location.city && property.location.locality) {
    score += 10;
  }

  // 5️⃣ Amenities (10 points)
  if (property.amenities && property.amenities.length >= 3) {
    score += 10;
  }

  // 6️⃣ Preferences (5 points)
  if (property.preferences && property.preferences.length >= 1) {
    score += 5;
  }

  // 7️⃣ Photos (20 points)
  if (property.photos && property.photos.length >= 3) {
    score += 20;
  } else if (property.photos && property.photos.length >= 1) {
    score += 10;
  }

  // 8️⃣ Contact Info (10 points)
  if (property.contact && property.contact.phoneNumber) {
    score += 10;
  }

  // Cap at 100
  return Math.min(score, 100);
};

const getListingGrade = (score) => {
  if (score >= 85) return "EXCELLENT";
  if (score >= 65) return "GOOD";
  if (score >= 40) return "AVERAGE";
  return "POOR";
};

module.exports = { calculateListingScore, getListingGrade };
