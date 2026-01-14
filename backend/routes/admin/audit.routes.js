const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/audit.controller");
const adminAuth = require("../../middleware/admin.middleware");

router.get("/", adminAuth, controller.getAuditLogs);
const permit = require("../../middleware/permission.middleware");
// get audit logs with permission check
router.get(
  "/",
  adminAuth,
  permit("VIEW_AUDIT_LOGS"),
  controller.getAuditLogs
);

module.exports = router;
