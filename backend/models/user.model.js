const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
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
      required: true
    },

    isBlocked: {
      type: Boolean,
      default: false
    },

    activePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
