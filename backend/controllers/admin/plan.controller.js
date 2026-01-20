const Plan = require("../../models/plans.model");

// CREATE plan
exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json({ success: true, plan });
  } catch (err) {
    res.status(500).json({ success: false, message: "Plan create failed" });
  }
};

// GET all plans (admin)
exports.getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();

    res.status(200).json({
      success: true,
      plans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch plans"
    });
  }
};

// UPDATE plan
exports.updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Plan updated",
      plan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Plan update failed"
    });
  }
};

// DELETE plan
exports.deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Plan deleted"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Plan delete failed"
    });
  }
};
