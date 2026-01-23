import { useEffect, useState } from "react";
import { getAuditLogs } from "../../../api/admin.audit.api";
import { useTheme } from "../../../context/ThemeContext";
import { FileText, Clock } from "lucide-react";

const AuditLogs = () => {
  const { isDark } = useTheme();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getAuditLogs().then(res => setLogs(res.data));
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Audit Logs</h2>
        <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          Track all system activities and changes
        </p>
      </div>

      {/* Logs List */}
      <div className={`rounded-lg border overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
        {logs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} size={48} />
            <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>No audit logs found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-slate-700">
            {logs.map(log => (
              <div 
                key={log._id} 
                className={`p-4 flex items-center gap-4 ${isDark ? 'hover:bg-slate-700/50' : 'hover:bg-gray-50'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  <FileText size={18} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{log.action}</p>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{log.entityType}</p>
                </div>
                <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                  <Clock size={14} />
                  <span>{formatDate(log.createdAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditLogs;
