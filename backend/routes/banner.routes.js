const express = require("express");
const router = express.Router();
const upload = require("../config/multer");

const {
  createBanner,
  getBanners,
  deleteBanner,
  updateBanner,
  toggleBannerStatus
} = require("../controllers/banner.controller");

// GET all banners (admin)
router.get("/", (req, res, next) => {
  console.log("📥 GET /api/admin/banners");
  next();
}, getBanners);

// CREATE banner (admin)
router.post("/", (req, res, next) => {
  console.log("📥 POST /api/admin/banners");
  next();
}, upload.single("image"), createBanner);

// UPDATE banner (with optional image)
router.put("/:id", (req, res, next) => {
  console.log("📥 PUT /api/admin/banners/:id -", req.params.id);
  next();
}, upload.single("image"), updateBanner);

// TOGGLE status
router.patch("/:id/toggle", (req, res, next) => {
  console.log("📥 PATCH /api/admin/banners/:id/toggle -", req.params.id);
  next();
}, toggleBannerStatus);

// DELETE banner
router.delete("/:id", (req, res, next) => {
  console.log("📥 DELETE /api/admin/banners/:id -", req.params.id);
  next();
}, deleteBanner);

module.exports = router;
