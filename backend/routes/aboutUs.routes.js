const express = require("express");
const router = express.Router();

const { getAboutUs } = require("../controllers/aboutUs.controller");

// GET About Us (Public - only active)
router.get("/", getAboutUs);

module.exports = router;
