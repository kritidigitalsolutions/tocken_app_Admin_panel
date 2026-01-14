const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { saveUserDetails } = require("../controllers/user.controller");
const { uploadProfileImage } = require("../controllers/user/user.controller");

// ✅ Create new user (manual data entry)
router.post("/", saveUserDetails);

// Upload profile image
router.post(
  "/upload-profile",
  upload.single("image"),
  uploadProfileImage
);

module.exports = router;
