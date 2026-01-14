const User = require("../models/user.model");

exports.saveUserDetails = async (req, res) => {
  try {
    const { role, firstName, lastName, email, phone } = req.body;

    // 🔴 validation
    if (!role || !firstName || !lastName || !phone) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled"
      });
    }

    // 🔍 check existing user
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    // ✅ create user
    const user = await User.create({
      role,
      firstName,
      lastName,
      email,
      phone
    });

    res.status(201).json({
      success: true,
      message: "User details saved successfully",
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
