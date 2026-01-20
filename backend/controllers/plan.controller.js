const Plan = require("../models/plans.model");
const FAQ = require("../models/faq.model");
const User = require("../models/user.model");

exports.getPlansAndFAQs = async (req, res) => {
  const { userType } = req.query;

  const plans = await Plan.find({ userType, isActive: true });
  const faqs = await FAQ.find({ userType, isActive: true });

  res.json({
    success: true,
    plans,
    faqs
  });
};


// for buy plan

exports.buyPlan = async (req, res) => {
  try {
    // Check if user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "User is not authenticated"
      });
    }

    const userId = req.user.id;        // JWT se
    const { planId } = req.body;

    const plan = await Plan.findById(planId);
    if (!plan || !plan.isActive) {
      return res.status(404).json({
        success: false,
        message: "Plan not available"
      });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.validityDays);

    const user = await User.findByIdAndUpdate(
      userId,
      {
        activePlan: plan._id,
        planStartDate: startDate,
        planEndDate: endDate
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Plan purchased successfully",
      plan,
      subscription: {
        startDate,
        endDate
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

