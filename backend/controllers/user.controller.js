const User = require("../models/user.model");

// ✅ GET user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-__v");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
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

// ✅ UPDATE user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, email, profileImage } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, email, profileImage },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
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



exports.uploadProfileImage = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { profileImage: req.file.path },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile image uploaded",
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed"
    });
  }
};
