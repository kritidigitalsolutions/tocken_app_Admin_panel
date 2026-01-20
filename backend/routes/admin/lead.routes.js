const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/lead.controller");
const adminAuth = require("../../middleware/admin.middleware");

// All leads
router.get("/", adminAuth, controller.getAllLeads);

// Leads by property
router.get("/property/:propertyId", adminAuth, controller.getLeadsByProperty);

// Update lead status
router.patch("/:id/status", adminAuth, controller.updateLeadStatus);

// Mark spam
router.patch("/:id/spam", adminAuth, controller.markSpam);

module.exports = router;
