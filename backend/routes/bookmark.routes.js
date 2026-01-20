const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth.middleware");
const {
  getBookmarks,
  addBookmark,
  removeBookmark,
  checkBookmark
} = require("../controllers/bookmark.controller");

// All routes require authentication
router.use(isAuth);

// GET all bookmarks (with optional ?category=RESIDENTIAL filter)
router.get("/", getBookmarks);

// ADD bookmark
router.post("/:propertyId", addBookmark);

// REMOVE bookmark
router.delete("/:propertyId", removeBookmark);

// CHECK if property is bookmarked
router.get("/:propertyId/check", checkBookmark);

module.exports = router;
