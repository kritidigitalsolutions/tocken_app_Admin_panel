const Banner = require("../models/Banner.model");

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

exports.createBanner = async (req, res) => {
  try {
    let { title, status, redirectUrl } = req.body;

    status =
      status?.toLowerCase() === "active" ? "Active" : "Inactive";

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // For Cloudinary storage, use req.file.path or req.file.secure_url
    const imageUrl = req.file.path || req.file.secure_url;

    const banner = await Banner.create({
      title,
      status,
      redirectUrl,
      image: imageUrl
    });

    res.status(201).json({
      success: true,
      banner
    });
  } catch (error) {
    console.error("Create banner error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { title, status, redirectUrl } = req.body;

    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    if (title) banner.title = title;
    if (redirectUrl !== undefined) banner.redirectUrl = redirectUrl;
    if (status) banner.status = status;
    
    // Update image only if a new one is provided
    if (req.file) {
      const imageUrl = req.file.path || req.file.secure_url;
      banner.image = imageUrl;
    }

    await banner.save();

    res.json({
      success: true,
      banner
    });
  } catch (error) {
    console.error("Update banner error:", error);
    res.status(500).json({ message: error.message });
  }
};


exports.toggleBannerStatus = async (req, res) => {
  try {
    console.log("🔄 Toggle banner request for ID:", req.params.id);
    
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      console.log("❌ Banner not found:", req.params.id);
      return res.status(404).json({ 
        success: false,
        message: "Banner not found" 
      });
    }

    const oldStatus = banner.status;
    banner.status = banner.status === "Active" ? "Inactive" : "Active";
    await banner.save();

    console.log(`✅ Banner toggled: ${oldStatus} → ${banner.status}`);

    res.json({
      success: true,
      message: `Banner status changed to ${banner.status}`,
      status: banner.status,
      banner
    });
  } catch (error) {
    console.error("❌ Toggle banner status error:", error);
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.json({
      success: true,
      message: "Banner deleted successfully"
    });
  } catch (error) {
    console.error("Delete banner error:", error);
    res.status(500).json({ message: error.message });
  }
};

