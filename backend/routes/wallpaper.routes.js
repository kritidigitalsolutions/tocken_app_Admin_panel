const express = require("express");
const router = express.Router();

const {
    getAllWallpapers,
    getWallpaperById
} = require("../controllers/wallpaper.controller");

// GET all wallpapers (Active only)
router.get("/", getAllWallpapers);

// GET single wallpaper
router.get("/:id", getWallpaperById);

module.exports = router;
