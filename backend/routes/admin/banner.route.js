const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");

const {
  createBanner,
  getBanners,
  deleteBanner,
  updateBanner,
  toggleBannerStatus
} = require("../../controllers/admin/banner.controller");

// GET all banners (admin)
router.get("/", getBanners);

// CREATE banner (admin)
router.post("/", upload.single("image"), createBanner);

// UPDATE banner (with optional image)
router.put("/:id", upload.single("image"), updateBanner);

// TOGGLE status
router.patch("/:id/toggle", toggleBannerStatus);

// DELETE banner
router.delete("/:id", deleteBanner);

module.exports = router;
