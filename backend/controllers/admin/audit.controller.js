const AuditLog = require("../../models/auditLog.model");

exports.getAuditLogs = async (req, res) => {
  const logs = await AuditLog.find()
    .populate("adminId", "name email")
    .sort({ createdAt: -1 })
    .limit(100);

  res.json(logs);
};
