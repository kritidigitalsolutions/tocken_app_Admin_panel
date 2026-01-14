
const Property = require("../models/property.model");
const Lead = require("../models/lead.model");

exports.createLead = async (req, res) => {
  const { propertyId, buyerName, phone, source } = req.body;

  // 1️⃣ Property fetch karo
  const property = await Property.findById(propertyId);
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  // 2️⃣ OwnerId property se lo
  const ownerId = property.userId;

  // 3️⃣ Duplicate check (same phone + same property)
  const exists = await Lead.findOne({ propertyId, phone });
  if (exists) {
    return res.status(409).json({ message: "Lead already exists" });
  }

  // 4️⃣ Create lead (NOW ownerId present)
  const lead = await Lead.create({
    propertyId,
    ownerId,
    buyerName,
    phone,
    source
  });

  res.status(201).json({
    success: true,
    lead
  });
};

