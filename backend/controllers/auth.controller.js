const admin = require("../config/firebase");
const User = require("../models/user.model");

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
    const decoded = await admin.auth().verifyIdToken(idToken);

    const phone = decoded.phone_number;

    let user = await User.findOne({ phone });

    if (!user) {
      user = await User.create({ phone });
    }

    res.status(200).json({
      message: "Authentication successful",
      user
    });

  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
