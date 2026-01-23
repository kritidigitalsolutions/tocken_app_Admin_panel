import { useEffect, useState } from "react";
import api from "../../../api/api";
import { useTheme } from "../../../context/ThemeContext";
import Loader from "../../../components/common/Loader";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/leads");
      console.log("ADMIN LEADS RESPONSE:", res.data);
      setLeads(res?.data?.data || res?.data?.leads || []);
    } catch (err) {
      console.error("ERROR FETCHING LEADS", err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const getSourceBadgeColor = (source) => {
    const sourceMap = {
      "CALL": isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-800",
      "WHATSAPP": isDark ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-800",
      "FORM": isDark ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-800"
    };
    return sourceMap[source] || (isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800");
  };

  const getStatusColor = (status) => {
    const statusMap = {
      "NEW": isDark ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-800",
      "CONTACTED": isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-800",
      "FOLLOW_UP": isDark ? "bg-yellow-900/50 text-yellow-300" : "bg-yellow-100 text-yellow-800",
      "CLOSED": isDark ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-800",
      "LOST": isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800"
    };
    return statusMap[status] || (isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-800");
  };

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Leads</h1>
        <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Manage all customer leads and inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Leads</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{leads.length}</p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>New</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
            {leads.filter(l => l.status === "NEW").length}
          </p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Contacted</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            {leads.filter(l => l.status === "CONTACTED").length}
          </p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Follow-up</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
            {leads.filter(l => l.status === "FOLLOW_UP").length}
          </p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Closed</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {leads.filter(l => l.status === "CLOSED").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className={`rounded-lg overflow-hidden border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
        {!leads || leads.length === 0 ? (
          <div className="p-12 text-center">
            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>No leads found</p>
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>New leads will appear here when customers inquire</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className={`border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
              <tr>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Property</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Owner</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Buyer Name</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Phone</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Source</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Status</th>
                <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l, index) => (
                <tr key={l._id} className={`border-b transition ${isDark ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{l.propertyId?.title || "N/A"}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{l.propertyId?.location?.city}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{l.ownerId?.firstName} {l.ownerId?.lastName}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{l.ownerId?.phone}</div>
                  </td>
                  <td className={`px-6 py-4 font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{l.buyerName}</td>
                  <td className="px-6 py-4">
                    <a href={`tel:${l.phone}`} className={`transition ${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
                      {l.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSourceBadgeColor(l.source)}`}>
                      {l.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(l.status)}`}>
                      {l.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    {new Date(l.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Leads;
