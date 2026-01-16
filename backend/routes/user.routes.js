const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth.middleware");
const { getProfile, updateProfile } = require("../controllers/user.controller");

// ✅ User Profile - REST APIs
router.get("/profile", isAuth, getProfile);
router.patch("/profile", isAuth, updateProfile);

module.exports = router;
