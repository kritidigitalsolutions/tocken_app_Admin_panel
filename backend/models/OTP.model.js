const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  firebaseUid: { type: String },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("OTP", otpSchema);
