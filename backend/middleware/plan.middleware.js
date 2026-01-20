module.exports = (req, res, next) => {
  const user = req.user;

  if (!user.activePlan || new Date() > new Date(user.planEndDate)) {
    return res.status(403).json({
      success: false,
      message: "Premium plan required"
    });
  }

  next();
};
