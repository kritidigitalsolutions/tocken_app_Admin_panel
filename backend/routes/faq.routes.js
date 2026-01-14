const express = require("express");
const router = express.Router();
const { getAllFAQs } = require("../controllers/faq.controller");

// 🌐 PUBLIC (NO AUTH)
router.get("/", getAllFAQs);

module.exports = router;

