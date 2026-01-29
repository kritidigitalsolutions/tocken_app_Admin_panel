const Feedback = require("../models/feedback.model");

// POST feedback (User - public)
exports.createFeedback = async (req, res) => {
  try {
    const { feedbackType, description, name } = req.body;

    // Validation
    if (!feedbackType || !description || !name ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Get userId if authenticated
    const userId = req.user?.id || null;

    const feedback = await Feedback.create({
      userId,
      feedbackType,
      description,
      name,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback
    });
  } catch (error) {
    console.error("Create feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback"
    });
  }
};

// GET user's feedbacks (authenticated)
exports.getUserFeedbacks = async (req, res) => {
  try {
    const userId = req.user.id;

    const feedbacks = await Feedback.find({ userId })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error("Get user feedbacks error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedbacks"
    });
  }
};
