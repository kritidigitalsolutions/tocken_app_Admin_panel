const express = require("express");
const router = express.Router();
const upload = require("../../config/multer");

const {
    getAllWallpapersAdmin,
    createWallpaper,
    updateWallpaper,
    deleteWallpaper
} = require("../../controllers/wallpaper.controller");

// GET all wallpapers (Admin)
router.get("/", getAllWallpapersAdmin);

// CREATE wallpaper (with image upload)
router.post("/", upload.single("image"), createWallpaper);

// UPDATE wallpaper (with optional image)
router.put("/:id", upload.single("image"), updateWallpaper);

// DELETE wallpaper
router.delete("/:id", deleteWallpaper);

module.exports = router;
