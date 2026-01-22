const mongoose = require("mongoose");

const wallpaperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      required: true // Cloudinary URL
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wallpaper", wallpaperSchema);
