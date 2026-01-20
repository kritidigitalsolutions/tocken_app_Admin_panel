const AuditLog = require("../models/auditLog.model");

const logAudit = async ({
  adminId,
  action,
  entityType,
  entityId,
  meta = {}
}) => {
  await AuditLog.create({
    adminId,
    action,
    entityType,
    entityId,
    meta
  });
};

module.exports = logAudit;
