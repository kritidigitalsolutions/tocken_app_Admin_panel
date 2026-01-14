const User = require("../../models/user.model");

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
