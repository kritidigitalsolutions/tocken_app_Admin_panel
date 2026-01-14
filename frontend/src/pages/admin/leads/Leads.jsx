import { useEffect, useState } from "react";
import api from "../../../api/api";
import Loader from "../../../components/common/Loader";

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

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
      "CALL": "bg-blue-100 text-blue-800",
      "WHATSAPP": "bg-green-100 text-green-800",
      "FORM": "bg-purple-100 text-purple-800"
    };
    return sourceMap[source] || "bg-gray-100 text-gray-800";
  };

  const getStatusColor = (status) => {
    const statusMap = {
      "NEW": "bg-red-100 text-red-800",
      "CONTACTED": "bg-blue-100 text-blue-800",
      "FOLLOW_UP": "bg-yellow-100 text-yellow-800",
      "CLOSED": "bg-green-100 text-green-800",
      "LOST": "bg-gray-100 text-gray-800"
    };
    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Leads</h1>
        <p className="text-slate-400 mt-2">Manage all customer leads and inquiries</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Total Leads</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{leads.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">New</p>
          <p className="text-3xl font-bold text-red-400 mt-2">
            {leads.filter(l => l.status === "NEW").length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Contacted</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">
            {leads.filter(l => l.status === "CONTACTED").length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Follow-up</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {leads.filter(l => l.status === "FOLLOW_UP").length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Closed</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {leads.filter(l => l.status === "CLOSED").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {!leads || leads.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-lg">No leads found</p>
            <p className="text-slate-500 text-sm mt-2">New leads will appear here when customers inquire</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Property</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Owner</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Buyer Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Source</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l, index) => (
                <tr key={l._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{l.propertyId?.title || "N/A"}</div>
                    <div className="text-sm text-slate-400">{l.propertyId?.location?.city}</div>
                  </td>
                  <td className="px-6 py-4 text-white">
                    <div className="font-medium">{l.ownerId?.firstName} {l.ownerId?.lastName}</div>
                    <div className="text-sm text-slate-400">{l.ownerId?.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-white font-medium">{l.buyerName}</td>
                  <td className="px-6 py-4">
                    <a href={`tel:${l.phone}`} className="text-blue-400 hover:text-blue-300 transition">
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
                  <td className="px-6 py-4 text-sm text-slate-400">
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
