const admin = require("../config/firebase");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * SEND OTP
 * NOTE: Actual OTP Firebase SDK (Flutter) se jayega
 */
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number required" });
    }

    return res.status(200).json({
      message: "OTP sent successfully",
      note: "OTP Firebase SDK (Flutter) se send hota hai"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * VERIFY OTP (Firebase Token Verify)
 */
exports.verifyOTP = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Token required" });
    }

    // 🔥 Verify Firebase Token
    if (!admin) {
      return res.status(503).json({
        message: "Firebase authentication not available. Please configure Firebase credentials.",
        note: "Add FIREBASE_SERVICE_ACCOUNT to .env or serviceAccountKey.json"
      });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    const phone = decoded.phone_number;

    let user = await User.findOne({ phone });
    let isNewUser = false;

    if (!user) {
      user = await User.create({ phone });
      isNewUser = true;
    }

    // Generate JWT token for the user
    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: "USER" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Check if user has completed profile (firstName exists)
    const isProfileComplete = user.firstName && user.firstName.trim() !== "";

    res.status(200).json({
      success: true,
      message: "Authentication successful",
      token,
      user,
      isNewUser,
      isProfileComplete
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

/**
 * DEV LOGIN - For testing purposes only
 * Login with phone number directly (no OTP verification)
 * ⚠️ REMOVE IN PRODUCTION
 */
exports.devLogin = async (req, res) => {
  try {
    const { phone, name, userType } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number required" });
    }

    // Find or create user
    let user = await User.findOne({ phone });

    if (!user) {
      // Create new user if not exists
      user = await User.create({
        phone,
        name: name || "Test User",
        userType: userType || "INDIVIDUAL"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: "USER" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Dev login successful",
      token,
      user
    });

  } catch (error) {
    console.error("Dev login error:", error);
    res.status(500).json({ message: error.message });
  }
};
