const express = require("express");
const router = express.Router();
const { sendOTP, verifyOTP, devLogin } = require("../controllers/auth.controller");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// ⚠️ DEV ONLY - For testing with Postman (Remove in production)
router.post("/dev-login", devLogin);

module.exports = router;
