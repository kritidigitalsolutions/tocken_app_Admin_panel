const express = require("express");
const router = express.Router();

const {
  getAllBookmarks,
  getBookmarkStats
} = require("../../controllers/admin/bookmark.controller");

// GET all bookmarks (with optional ?category filter)
router.get("/", getAllBookmarks);

// GET bookmark stats
router.get("/stats", getBookmarkStats);

module.exports = router;
