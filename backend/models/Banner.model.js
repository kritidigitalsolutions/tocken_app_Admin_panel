const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    image: {
      type: String,
      required: true // Firebase Storage URL
    },

    fileName: {
      type: String,
      default: "" // Firebase Storage file path for deletion
    },

    redirectUrl: {
      type: String,
      default: "" // where banner will redirect user
    },

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);

