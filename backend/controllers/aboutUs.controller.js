const AboutUs = require("../models/aboutUs.model");

/**
 * GET About Us (Public)
 * GET /api/about-us
 */
exports.getAboutUs = async (req, res) => {
    try {
        // Get the first (and should be only) About Us document
        const aboutUs = await AboutUs.findOne({ status: "Active" });

        if (!aboutUs) {
            return res.status(404).json({
                success: false,
                message: "About Us content not found"
            });
        }

        res.status(200).json({
            success: true,
            aboutUs
        });
    } catch (error) {
        console.error("Get About Us error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * GET About Us for Admin (includes Draft)
 * GET /api/admin/about-us
 */
exports.getAboutUsAdmin = async (req, res) => {
    try {
        // Get the first About Us document (regardless of status)
        let aboutUs = await AboutUs.findOne();

        if (!aboutUs) {
            // Create default if not exists
            aboutUs = await AboutUs.create({
                title: "About Us",
                content: "Welcome to our real estate platform.",
                mission: "",
                vision: "",
                status: "Draft"
            });
        }

        res.status(200).json({
            success: true,
            aboutUs
        });
    } catch (error) {
        console.error("Get About Us Admin error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/**
 * CREATE or UPDATE About Us (Admin)
 * PUT /api/admin/about-us
 */
exports.upsertAboutUs = async (req, res) => {
    try {
        let { title, content, mission, vision, status } = req.body;

        if (!content) {
            return res.status(400).json({
                success: false,
                message: "Content is required"
            });
        }

        // Normalize status
        status = status?.toLowerCase() === "active" ? "Active" : "Draft";

        // Find existing or create new
        let aboutUs = await AboutUs.findOne();

        if (aboutUs) {
            // Update existing
            aboutUs.title = title || aboutUs.title;
            aboutUs.content = content;
            aboutUs.mission = mission || "";
            aboutUs.vision = vision || "";
            aboutUs.status = status;
            await aboutUs.save();
        } else {
            // Create new
            aboutUs = await AboutUs.create({
                title: title || "About Us",
                content,
                mission: mission || "",
                vision: vision || "",
                status
            });
        }

        res.status(200).json({
            success: true,
            message: "About Us updated successfully",
            aboutUs
        });
    } catch (error) {
        console.error("Upsert About Us error:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
