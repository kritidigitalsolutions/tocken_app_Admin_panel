module.exports = (requiredPermission) => {
  return (req, res, next) => {
    if (!req.admin.permissions.includes(requiredPermission)) {
      return res.status(403).json({
        message: "Access denied: insufficient permissions"
      });
    }
    next();
  };
};
