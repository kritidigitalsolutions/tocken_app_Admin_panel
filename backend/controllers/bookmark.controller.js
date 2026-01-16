const User = require("../models/user.model");
const Property = require("../models/property.model");

// GET all bookmarked properties (with optional category filter)
exports.getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category } = req.query; // RESIDENTIAL, COMMERCIAL, PG, Co-Living, Plot/Land

    const user = await User.findById(userId).populate({
      path: "bookmarks",
      match: {
        isDeleted: false,
        ...(category && category !== "All" && { propertyCategory: category })
      },
      select: "-__v"
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Filter out null values (properties that didn't match the category filter)
    const bookmarks = user.bookmarks.filter(Boolean);

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      bookmarks
    });
  } catch (error) {
    console.error("Get bookmarks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookmarks"
    });
  }
};

// ADD property to bookmarks
exports.addBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property || property.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    // Check if already bookmarked
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    if (user.bookmarks && user.bookmarks.includes(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Property already bookmarked"
      });
    }

    // Add to bookmarks using $addToSet to avoid duplicates
    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { bookmarks: propertyId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Property bookmarked successfully"
    });
  } catch (error) {
    console.error("Add bookmark error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add bookmark"
    });
  }
};

// REMOVE property from bookmarks
exports.removeBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;

    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    if (!user.bookmarks || !user.bookmarks.some(id => id.toString() === propertyId)) {
      return res.status(404).json({
        success: false,
        message: "Property not in bookmarks"
      });
    }

    // Remove from bookmarks using $pull
    await User.findByIdAndUpdate(
      userId,
      { $pull: { bookmarks: propertyId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Bookmark removed successfully"
    });
  } catch (error) {
    console.error("Remove bookmark error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to remove bookmark"
    });
  }
};

// CHECK if property is bookmarked
exports.checkBookmark = async (req, res) => {
  try {
    const userId = req.user.id;
    const { propertyId } = req.params;

    const user = await User.findById(userId);
    const isBookmarked = user.bookmarks.includes(propertyId);

    res.status(200).json({
      success: true,
      isBookmarked
    });
  } catch (error) {
    console.error("Check bookmark error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check bookmark status"
    });
  }
};
