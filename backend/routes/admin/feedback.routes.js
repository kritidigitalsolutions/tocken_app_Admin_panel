const express = require("express");
const router = express.Router();

const {
  getAllFeedbacks,
  getFeedbackStats,
  updateFeedbackStatus,
  deleteFeedback
} = require("../../controllers/admin/feedback.controller");

// GET all feedbacks
router.get("/", getAllFeedbacks);

// GET feedback stats
router.get("/stats", getFeedbackStats);

// UPDATE feedback status
router.patch("/:id/status", updateFeedbackStatus);

// DELETE feedback
router.delete("/:id", deleteFeedback);

module.exports = router;
