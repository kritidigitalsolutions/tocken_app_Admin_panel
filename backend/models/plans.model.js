const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: [
      "AGENT",
      "SELLER",
      "LANDLORD",
      "PG OWNER",
      "BUYER",
      "TENANT",
      "CO-LIVING",
      "PG SEEKER"
    ],
    required: true
  },

  planName: {
    type: String, // Pro, Pro Plus
    required: true
  },

  tag: {
    type: String // Most Popular, Best Value
  },

  price: Number,
  originalPrice: Number,

  gstIncluded: {
    type: Boolean,
    default: true
  },

  validityDays: Number,

  features: [String],


  offerEndsInDays: Number,

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);
