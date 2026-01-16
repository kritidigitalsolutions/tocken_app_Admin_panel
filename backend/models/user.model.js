const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "User"
    },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    profileImage: {
      type: String // Cloudinary URL
    },

    userType: {
      type: String,
      enum: [
        "AGENT",
        "SELLER",
        "LANDLORD",
        "PG_OWNER",
        "BUYER",
        "TENANT",
        "CO_LIVING",
        "PG_SEEKER"
      ],
      default: "BUYER"
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    gstNumber: {
      type: String,
      default: null
    },

    activePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      default: null
    },

    // Bookmarked/Favorite properties
    bookmarks: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
