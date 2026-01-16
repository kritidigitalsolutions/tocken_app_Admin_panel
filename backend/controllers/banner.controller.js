const Banner = require("../models/Banner.model");

// GET all banners
exports.getBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json({
      success: true,
      banners
    });
  } catch (error) {
    console.error("Get banners error:", error);
    res.status(500).json({ message: error.message });
  }
};

// CREATE banner
exports.createBanner = async (req, res) => {
  try {
    const { title, link, isActive } = req.body;
    const image = req.file?.path || "";

    const banner = await Banner.create({
      title,
      link,
      image,
      isActive: isActive === "true" || isActive === true
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner
    });
  } catch (error) {
    console.error("Create banner error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE banner
exports.updateBanner = async (req, res) => {
  try {
    const { title, link, isActive } = req.body;
    const updateData = { title, link };
    
    if (req.file) {
      updateData.image = req.file.path;
    }
    if (isActive !== undefined) {
      updateData.isActive = isActive === "true" || isActive === true;
    }

    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    res.json({
      success: true,
      message: "Banner updated successfully",
      banner
    });
  } catch (error) {
    console.error("Update banner error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// TOGGLE banner status
exports.toggleBannerStatus = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    res.json({
      success: true,
      message: `Banner ${banner.isActive ? "activated" : "deactivated"} successfully`,
      banner
    });
  } catch (error) {
    console.error("Toggle banner error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    res.json({
      success: true,
      message: "Banner deleted successfully"
    });
  } catch (error) {
    console.error("Delete banner error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

