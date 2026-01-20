const Property = require("../models/property.model");
const { calculateListingScore, getListingGrade } = require("../utils/listingScore");
const cloudinary = require("../config/cloudinary");

// 1️⃣ Create draft
exports.createDraft = async (req, res) => {
  const property = await Property.create({
    userId: req.user?.id || req.body.userId,
    listingType: req.body.listingType,
    propertyCategory: req.body.propertyCategory,
    propertyType: req.body.propertyType
  });

  res.status(201).json(property);
};

// 2️⃣ Update any step (Apartment / Pricing / Location / etc)
exports.updateProperty = async (req, res) => {
  let property = await Property.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // 🔁 Recalculate score
  const score = calculateListingScore(property);
  const grade = getListingGrade(score);

  property.listingScore = score;
  property.listingGrade = grade;

  await property.save();

  res.json(property);
};


// 3️⃣ Final submit
exports.submitProperty = async (req, res) => {
  let property = await Property.findById(req.params.id);

  const score = calculateListingScore(property);
  const grade = getListingGrade(score);

  property.listingScore = score;
  property.listingGrade = grade;
  property.status = "ACTIVE";

  await property.save();

  res.json({
    message: "Listing submitted successfully",
    listingScore: score,
    listingGrade: grade
  });
};


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


