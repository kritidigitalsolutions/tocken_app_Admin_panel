const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    feedbackType: {
      type: String,
      enum: ["Report a problem", "Raise a question", "Suggestion/Improvement", "Compliment", "Others"],
      required: true
    },

    description: {
      type: String,
      required: true,
      maxlength: 500
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "RESOLVED", "CLOSED"],
      default: "PENDING"
    },

    adminNotes: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

feedbackSchema.index({ status: 1 });
feedbackSchema.index({ feedbackType: 1 });
feedbackSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Feedback", feedbackSchema);
