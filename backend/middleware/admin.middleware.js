const isAdmin  = (req, res, next) => {
  console.log("👤 isAdmin middleware - User role:", req.user?.role);
  if (req.user?.role !== "ADMIN") {
    console.log("❌ isAdmin failed - User role is not ADMIN");
    return res.status(403).json({ message: "Admin access only" });
  }
  console.log("✅ isAdmin passed - Admin user");
  next();
};

module.exports = isAdmin;
module.exports.isAdmin = isAdmin;
