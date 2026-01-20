const Lead = require("../../models/lead.model");

// 🔹 All leads (Admin table)
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate("propertyId", "title listingType location pricing")
      .populate("ownerId", "firstName lastName phone email")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: leads
    });
  } catch (error) {
    console.error("ERROR FETCHING LEADS:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads"
    });
  }
};

// 🔹 Leads for a specific property
exports.getLeadsByProperty = async (req, res) => {
  const leads = await Lead.find({
    propertyId: req.params.propertyId
  }).sort({ createdAt: -1 });

  res.json(leads);
};

// 🔹 Update lead status
exports.updateLeadStatus = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(lead);
};

// 🔹 Mark spam
exports.markSpam = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(
    req.params.id,
    { isSpam: true },
    { new: true }
  );

  res.json(lead);
};
