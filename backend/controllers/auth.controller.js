const User = require("../models/user.model");
const OTP = require("../models/OTP.model");
const jwt = require("jsonwebtoken");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const client = require('twilio')(accountSid, authToken);

/**
 * SEND OTP
 * Generates and sends OTP via Twilio SMS
 */
exports.sendOTP = async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone number
    if (!phone || phone.trim() === "") {
      return res.status(400).json({ message: "Phone number required" });
    }

    // Format phone number (add country code if not present)
    let formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;

    // Check if user already exists
    // const existingUser = await User.findOne({ phone: formattedPhone });

    // if (existingUser) {
    //   return res.status(400).json({ message: "User with this phone number already exists! Please login." });
    // }

    // Generate 6-digit OTP
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP to database with expiry (10 minutes)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await OTP.create({
      phone: formattedPhone,
      otp: generatedOTP,
      expiresAt: otpExpiry
    });

    // Send OTP via Twilio
    try {
      await client.messages.create({
        body: `Your OTP verification code is: ${generatedOTP}. Valid for 10 minutes.`,
        from: twilioPhone,
        to: formattedPhone
      });
    } catch (twilioError) {
      console.error("Twilio error:", twilioError.message);
      console.error("Full error:", twilioError);
      // For development, return OTP in response (REMOVE IN PRODUCTION)
      console.log("DEBUG - OTP:", generatedOTP);
      return res.status(200).json({
        message: "OTP generated successfully but SMS sending failed",
        error: twilioError.message,
        debug: generatedOTP
      });
    }

    return res.status(200).json({
      message: "OTP sent successfully to " + formattedPhone,
      phone: formattedPhone
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * VERIFY OTP
 * Verifies OTP and creates/logs in user
 */
exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone number and OTP required" });
    }

    // Format phone number
    let formattedPhone = phone.startsWith('+') ? phone : '+91' + phone;

    // Find valid OTP
    const otpRecord = await OTP.findOne({
      phone: formattedPhone,
      otp: otp,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Delete used OTP
    await OTP.deleteOne({ _id: otpRecord._id });

    // Check if user exists
    let user = await User.findOne({ phone: formattedPhone });

    if (!user) {
      // Create new user
      user = await User.create({
        phone: formattedPhone,
        name: "User " + formattedPhone.slice(-4),
        userType: "INDIVIDUAL"
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.phone, role: "USER" },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: user.isNew ? "User created successfully" : "Login successful",
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        userType: user.userType
      }
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: error.message });
  }
};


