const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/dashboard.controller");
const { isAdmin } = require("../../middleware/admin.middleware");
const isAuth = require("../../middleware/auth.middleware");

router.get(
  "/analytics",
  isAuth,
  isAdmin,
  controller.getAnalytics
);

module.exports = router;
