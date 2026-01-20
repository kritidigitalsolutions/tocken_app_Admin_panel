const Property = require("../../models/property.model");
const Lead = require("../../models/lead.model");
const logAudit = require("../../utils/auditLogger");


exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find()
        .select("listingType propertyType propertyCategory pricing location status photos listingScore createdAt")
        .sort({
          isPremium: -1,
          "premium.boostRank": -1,
          listingScore: -1,
          createdAt: -1
        })
        .skip(skip)
        .limit(Number(limit)),

      Property.countDocuments()
    ]);

    res.json({
      success: true,
      data: properties,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("ERROR FETCHING PROPERTIES:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch properties"
    });
  }
};

// 🔹 Admin: single property (details page)
exports.getOne = async (req, res) => {
  const property = await Property.findById(req.params.id)
    .populate("userId", "name phone email");

  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }

  // (future ready) Leads count
  const leadsCount = await Lead.countDocuments({
    listingId: property._id
  });

  res.json({
    property,
    leadsCount
  });
};

// 🔹 Admin: approve / reject / block
exports.updateStatus = async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(property);
};

// 🔹 Admin: soft delete
exports.softDeleteProperty = async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: req.admin.id
    },
    { new: true }
  );

  await logAudit({
    adminId: req.admin.id,
    action: "PROPERTY_DELETED",
    entityType: "PROPERTY",
    entityId: property._id
  });

  res.json({ message: "Property soft deleted", property });
};

// 🔹 Admin: restore soft deleted property
exports.restoreProperty = async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: false,
      deletedAt: null,
      deletedBy: null
    },
    { new: true }
  );

  await logAudit({
    adminId: req.admin.id,
    action: "PROPERTY_RESTORED",
    entityType: "PROPERTY",
    entityId: property._id
  });

  res.json({ message: "Property restored", property });
};

// 🔹 Admin: mark property as premium
exports.makePremium = async (req, res) => {
  const { planName, durationInDays, boostRank } = req.body;

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + durationInDays);

  const property = await Property.findByIdAndUpdate(
    req.params.id,
    {
      isPremium: true,
      premium: {
        startDate,
        endDate,
        planName,
        boostRank
      }
    },
    { new: true }
  );

  await logAudit({
    adminId: req.admin.id,
    action: "PROPERTY_APPROVED",
    entityType: "PROPERTY",
    entityId: property._id,
    meta: { planName }
  });

  res.json({
    message: "Property marked as premium",
    property
  });
};


// 🔹 Admin: remove premium status
exports.removePremium = async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    {
      isPremium: false,
      premium: {}
    },
    { new: true }
  );

  await logAudit({
    adminId: req.admin.id,
    action: "PROPERTY_BLOCKED",
    entityType: "PROPERTY",
    entityId: property._id,
    meta: { reason: "Premium removed" }
  });

  res.json({
    message: "Premium removed",
    property
  });
};

// 🔹 Admin: approve / reject / block
exports.updateStatus = async (req, res) => {
  const property = await Property.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(property);
};

