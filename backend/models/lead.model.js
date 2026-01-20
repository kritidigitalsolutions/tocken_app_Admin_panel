const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    // 🔗 Relations
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // 🔹 Lead info
    buyerName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    source: {
      type: String,
      enum: ["CALL", "WHATSAPP", "FORM"],
      default: "FORM"
    },

    // 🔹 Status tracking
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "FOLLOW_UP", "CLOSED", "LOST"],
      default: "NEW"
    },

    // 🔹 Admin flags
    isSpam: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);
leadSchema.index({ propertyId: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Lead", leadSchema);
