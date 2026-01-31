const Property = require("../../models/property.model");
const Lead = require("../../models/lead.model");
const logAudit = require("../../utils/auditLogger");


exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const [properties, total] = await Promise.all([
      Property.find()
        .select("listingType propertyType propertyCategory pricing location status images listingScore createdAt userId isPremium premium description")
        .populate("userId", "name phone email")
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

    // Debug log
    console.log("Properties fetched:", properties.length);
    if (properties.length > 0) {
      console.log("First property images:", properties[0].images);
    }

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
  try {
    const property = await Property.findById(req.params.id)
      .populate("userId", "name phone email");

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Debug log
    console.log("Property ID:", req.params.id);
    console.log("Property Images:", property.images);

    // (future ready) Leads count
    const leadsCount = await Lead.countDocuments({
      listingId: property._id
    });

    res.json({
      success: true,
      property,
      leadsCount
    });
  } catch (error) {
    console.error("ERROR FETCHING PROPERTY:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch property details"
    });
  }
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

// 🔹 Admin: approve / reject / block / request changes
exports.updateStatus = async (req, res) => {
  try {
    const { status, reason } = req.body;
    const propertyId = req.params.id;

    // Validate status
    const validStatuses = ["DRAFT", "ACTIVE", "REJECTED", "BLOCKED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be: DRAFT, ACTIVE, REJECTED, or BLOCKED"
      });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    const oldStatus = property.status;
    property.status = status;

    // Log audit trail
    let action = "";
    let meta = { reason };

    if (status === "ACTIVE") {
      action = "PROPERTY_APPROVED";
      meta.approvedBy = req.admin?.id;
      meta.approvedAt = new Date();
    } else if (status === "REJECTED") {
      action = "PROPERTY_REJECTED";
      meta.rejectedBy = req.admin?.id;
      meta.rejectedAt = new Date();
    } else if (status === "BLOCKED") {
      action = "PROPERTY_BLOCKED";
      meta.blockedBy = req.admin?.id;
      meta.blockedAt = new Date();
    } else if (status === "DRAFT") {
      action = "PROPERTY_SENT_TO_DRAFT";
      meta.draftBy = req.admin?.id;
    }

    await property.save();

    // Log the action
    await logAudit({
      adminId: req.admin?.id,
      action,
      entityType: "PROPERTY",
      entityId: property._id,
      meta: { ...meta, oldStatus, newStatus: status }
    });

    res.json({
      success: true,
      message: `Property status updated to ${status}`,
      data: {
        propertyId: property._id,
        oldStatus,
        newStatus: status,
        reason
      }
    });
  } catch (error) {
    console.error("ERROR UPDATING PROPERTY STATUS:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update property status",
      error: error.message
    });
  }
};

