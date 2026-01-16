const express = require("express");
const router = express.Router();
const { createFeedback, getUserFeedbacks } = require("../controllers/feedback.controller");
const isAuth = require("../middleware/auth.middleware");

// POST feedback (public - no auth required)
router.post("/", createFeedback);

// GET user's own feedbacks (authenticated)
router.get("/my", isAuth, getUserFeedbacks);

module.exports = router;
