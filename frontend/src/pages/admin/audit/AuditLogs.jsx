import { useEffect, useState } from "react";
import { getAuditLogs } from "../../../api/admin.audit.api";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <h2>Audit Logs</h2>

      {logs.map(log => (
        <div key={log._id}>
          {log.action} – {log.entityType} – {log.createdAt}
        </div>
      ))}
    </div>
  );
};

export default AuditLogs;
