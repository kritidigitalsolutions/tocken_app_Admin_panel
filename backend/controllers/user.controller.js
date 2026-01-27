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



/**
 * COMPLETE USER PROFILE
 * POST /api/user/complete-profile
 */
exports.completeProfile = async (req, res) => {
  try {
    const { userType, firstName, lastName, email, profileImage } = req.body;

    // Validation
    if (!userType || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "userType, firstName, and lastName are required"
      });
    }

    // Validate userType
    const validUserTypes = ["INDIVIDUAL", "AGENT", "BUILDER"];
    if (!validUserTypes.includes(userType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid userType. Must be INDIVIDUAL, AGENT, or BUILDER"
      });
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        userType,
        firstName,
        lastName,
        email: email || "",
        profileImage: profileImage || "",
        name: `${firstName} ${lastName}` // Also update the name field
      },
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
      message: "Profile completed successfully",
      user
    });

  } catch (error) {
    console.error("Complete profile error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

// ✅ UPDATE user profile
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, gstNumber, profileImage } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, gstNumber, profileImage },
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





/**
 * TOGGLE PHONE PRIVACY
 * PATCH /api/user/phone-privacy
 * 
 * Toggle phone number visibility (public/private)
 */
exports.togglePhonePrivacy = async (req, res) => {
  try {
    const { isPhonePrivate } = req.body;

    if (typeof isPhonePrivate !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isPhonePrivate must be true or false"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { isPhonePrivate },
      { new: true }
    ).select("-__v");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: isPhonePrivate
        ? "Phone number is now private"
        : "Phone number is now public",
      isPhonePrivate: user.isPhonePrivate
    });

  } catch (error) {
    console.error("Toggle phone privacy error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * GET PHONE PRIVACY STATUS
 * GET /api/user/phone-privacy
 */
exports.getPhonePrivacy = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("isPhonePrivate");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      isPhonePrivate: user.isPhonePrivate || false
    });

  } catch (error) {
    console.error("Get phone privacy error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * REQUEST ACCOUNT DELETION
 * POST /api/user/request-deletion
 * 
 * User requests to delete their account
 */
exports.requestAccountDeletion = async (req, res) => {
  try {
    const { reason, feedback } = req.body;

    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Please select a reason for deletion"
      });
    }

    if (!feedback || feedback.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: "Please provide feedback (minimum 10 characters)"
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check if already requested
    if (user.deletionRequest?.status === "PENDING") {
      return res.status(400).json({
        success: false,
        message: "You already have a pending deletion request"
      });
    }

    user.deletionRequest = {
      status: "PENDING",
      reason,
      feedback: feedback.trim(),
      requestedAt: new Date()
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Account deletion request submitted. Our team will review it shortly.",
      deletionRequest: user.deletionRequest
    });

  } catch (error) {
    console.error("Request deletion error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * CANCEL DELETION REQUEST
 * DELETE /api/user/cancel-deletion
 * 
 * User cancels their deletion request
 */
exports.cancelDeletionRequest = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (user.deletionRequest?.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "No pending deletion request to cancel"
      });
    }

    user.deletionRequest = {
      status: "NONE",
      reason: null,
      feedback: null,
      requestedAt: null
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "Deletion request cancelled successfully"
    });

  } catch (error) {
    console.error("Cancel deletion error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

/**
 * GET DELETION REQUEST STATUS
 * GET /api/user/deletion-status
 */
exports.getDeletionStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("deletionRequest");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      deletionRequest: user.deletionRequest || { status: "NONE" }
    });

  } catch (error) {
    console.error("Get deletion status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
