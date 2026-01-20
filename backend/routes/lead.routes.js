const express = require("express");
const router = express.Router();
const controller = require("../controllers/lead.controller");

// Create lead
router.post("/", controller.createLead);

module.exports = router;
