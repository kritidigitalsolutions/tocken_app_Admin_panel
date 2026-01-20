const express = require("express");
const router = express.Router();

const { getBanners } = require("../controllers/banner.controller");

// GET all active banners (public - for users)
router.get("/", getBanners);

module.exports = router;

