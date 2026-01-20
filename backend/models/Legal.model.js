const mongoose = require("mongoose");

const legalSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["privacy", "terms"],
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Draft"],
      default: "Draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Legal", legalSchema);
