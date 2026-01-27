const Property = require("../models/property.model");
const { calculateListingScore, getListingGrade } = require("../utils/listingScore");
const cloudinary = require("../config/cloudinary");

// 1️⃣ Create property with full details (as DRAFT)
exports.createDraft = async (req, res) => {
  try {
    // Prepare property data from request
    const propertyData = {
      userId: req.user?.id || req.body.userId,
      listingType: req.body.listingType,
      propertyType: req.body.propertyType,
      propertyCategory: req.body.propertyCategory,
      status: "DRAFT", // Always create as DRAFT
      
      // Details based on property type
      ...(req.body.residentialDetails && { residentialDetails: req.body.residentialDetails }),
      ...(req.body.commercialDetails && { commercialDetails: req.body.commercialDetails }),
      ...(req.body.pgDetails && { pgDetails: req.body.pgDetails }),
      ...(req.body.coLivingDetails && { coLivingDetails: req.body.coLivingDetails }),
      
      // Pricing
      ...(req.body.pricing && { pricing: req.body.pricing }),
      
      // Location & Contact
      ...(req.body.location && { location: req.body.location }),
      ...(req.body.contact && { contact: req.body.contact }),
      
      // Media
      ...(req.body.images && { images: req.body.images }),
      ...(req.body.description && { description: req.body.description })
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
      success: true,
      message: "Property created as draft",
      data: property
    });
  } catch (error) {
    console.error("ERROR CREATING PROPERTY:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create property",
      error: error.message
    });
  }
};

// 2️⃣ Update property (while in DRAFT status)
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    // Only allow updating DRAFT properties
    if (property.status !== "DRAFT") {
      return res.status(400).json({
        success: false,
        message: "Can only edit DRAFT properties. Contact admin to approve changes."
      });
    }

    // Update all fields
    if (req.body.residentialDetails) property.residentialDetails = req.body.residentialDetails;
    if (req.body.commercialDetails) property.commercialDetails = req.body.commercialDetails;
    if (req.body.pgDetails) property.pgDetails = req.body.pgDetails;
    if (req.body.coLivingDetails) property.coLivingDetails = req.body.coLivingDetails;
    if (req.body.pricing) property.pricing = req.body.pricing;
    if (req.body.location) property.location = req.body.location;
    if (req.body.contact) property.contact = req.body.contact;
    if (req.body.images) property.images = req.body.images;
    if (req.body.description) property.description = req.body.description;

    await property.save();

    res.json({
      success: true,
      message: "Property updated successfully",
      data: property
    });
  } catch (error) {
    console.error("ERROR UPDATING PROPERTY:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update property",
      error: error.message
    });
  }
};


// 3️⃣ Submit property for admin review (DRAFT → SUBMITTED)
exports.submitProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    if (property.status !== "DRAFT") {
      return res.status(400).json({
        success: false,
        message: "Only DRAFT properties can be submitted"
      });
    }

    // Validate required fields before submission
    const isValid = validatePropertyData(property);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields before submitting"
      });
    }

    // Calculate listing score
    const score = calculateListingScore(property);
    const grade = getListingGrade(score);

    // Update status to SUBMITTED (waiting for admin approval)
    property.status = "SUBMITTED";
    property.listingScore = score;
    property.listingGrade = grade;

    await property.save();

    res.json({
      success: true,
      message: "Property submitted for admin review. You will be notified once it's approved.",
      data: {
        propertyId: property._id,
        status: property.status,
        listingScore: score,
        listingGrade: grade
      }
    });
  } catch (error) {
    console.error("ERROR SUBMITTING PROPERTY:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit property",
      error: error.message
    });
  }
};

// Helper function to validate property data
function validatePropertyData(property) {
  // Basic required fields
  if (!property.listingType || !property.propertyType || !property.propertyCategory) {
    return false;
  }

  // Location required
  if (!property.location || !property.location.city || !property.location.locality) {
    return false;
  }

  // Contact required
  if (!property.contact || !property.contact.phone) {
    return false;
  }

  // At least one image required
  if (!property.images || property.images.length === 0) {
    return false;
  }

  // Type-specific validations
  if (property.listingType === "RENT" || property.listingType === "SELL") {
    if (property.propertyType === "RESIDENTIAL" && !property.residentialDetails) {
      return false;
    }
    if (property.propertyType === "COMMERCIAL" && !property.commercialDetails) {
      return false;
    }
    if (!property.pricing || !property.pricing.rent) {
      return false;
    }
  }

  if (property.listingType === "PG" && !property.pgDetails) {
    return false;
  }

  if (property.listingType === "CO_LIVING" && !property.coLivingDetails) {
    return false;
  }

  return true;
}


exports.uploadPhotos = async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  const uploadedPhotos = [];

  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "real-estate/properties"
    });

    uploadedPhotos.push({
      url: result.secure_url,
      publicId: result.public_id
    });
  }

  property.photos.push(...uploadedPhotos);

  // 🔁 Recalculate listing score
  const score = calculateListingScore(property);
  property.listingScore = score;
  property.listingGrade = getListingGrade(score);

  await property.save();

  res.json({
    message: "Photos uploaded successfully",
    photos: property.photos,
    listingScore: property.listingScore
  });
};

exports.deletePhoto = async (req, res) => {
  const { id, publicId } = req.params;

  const property = await Property.findById(id);
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  // Delete from cloudinary
  await cloudinary.uploader.destroy(publicId);

  // Remove from DB
  property.photos = property.photos.filter(
    (photo) => photo.publicId !== publicId
  );

  // 🔁 Recalculate score
  const score = calculateListingScore(property);
  property.listingScore = score;
  property.listingGrade = getListingGrade(score);

  await property.save();

  res.json({
    message: "Photo deleted",
    photos: property.photos,
    listingScore: property.listingScore
  });
};


// console.log("BODY:", req.body);
// console.log("USER:", req.user);


