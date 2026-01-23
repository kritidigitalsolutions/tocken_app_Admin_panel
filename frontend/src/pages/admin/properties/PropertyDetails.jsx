import { useEffect, useState } from "react";
import { getAllLeads, updateLeadStatus } from "../../../api/admin.lead.api";
import { useTheme } from "../../../context/ThemeContext";

const Leads = () => {
  const { isDark } = useTheme();
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllLeads();
    setLeads(res.data);
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Leads</h2>

      <div className="space-y-3">
        {leads.map(l => (
          <div 
            key={l._id} 
            className={`p-4 rounded-lg border flex items-center justify-between ${
              isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'
            }`}
          >
            <div>
              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{l.buyerName}</p>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{l.phone}</p>
            </div>
            <select
              value={l.status}
              onChange={e => updateLeadStatus(l._id, e.target.value)}
              className={`border rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 ${
                isDark 
                  ? 'bg-slate-900 border-slate-700 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            >
              <option>NEW</option>
              <option>CONTACTED</option>
              <option>FOLLOW_UP</option>
              <option>CLOSED</option>
              <option>LOST</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leads;
