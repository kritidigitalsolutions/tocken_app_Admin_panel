import { useEffect, useState } from "react";
import { getProperties } from "../../../api/admin.property.api";
import Loader from "../../../components/common/Loader";

const Properties = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getProperties({ page: 1, limit: 20 });
      setData(res?.data?.data || res?.data?.properties || []);
    } catch (err) {
      console.error("ERROR LOADING PROPERTIES:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Properties</h1>
        <p className="text-slate-400 mt-2">Manage all property listings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Total Properties</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{data.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Active</p>
          <p className="text-3xl font-bold text-green-400 mt-2">
            {data.filter(p => p.status === "ACTIVE").length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Inactive</p>
          <p className="text-3xl font-bold text-gray-400 mt-2">
            {data.filter(p => p.status === "INACTIVE").length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Average Score</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            {Math.round(data.reduce((sum, p) => sum + (p.listingScore || 0), 0) / data.length) || 0}%
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {data && data.length > 0 ? (
          <table className="w-full">
            <thead className="bg-slate-900 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Listing Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Property Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, index) => (
                <tr key={p._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      p.listingType === "RENT"
                        ? "bg-blue-900 text-blue-300"
                        : p.listingType === "SELL"
                        ? "bg-purple-900 text-purple-300"
                        : p.listingType === "LEASE"
                        ? "bg-pink-900 text-pink-300"
                        : "bg-indigo-900 text-indigo-300"
                    }`}>
                      {p.listingType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-cyan-900 text-cyan-300 rounded-full text-sm font-medium">
                      {p.propertyType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      p.propertyCategory === "RESIDENTIAL"
                        ? "bg-green-900 text-green-300"
                        : "bg-orange-900 text-orange-300"
                    }`}>
                      {p.propertyCategory}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    <div>{p.location?.city}</div>
                    <div className="text-sm text-slate-400">{p.location?.locality}</div>
                  </td>
                  <td className="px-6 py-4 text-white font-semibold">
                    ₹{p.pricing?.rentAmount?.toLocaleString() || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-16 bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{width: `${p.listingScore || 0}%`}}
                        />
                      </div>
                      <span className="ml-2 text-sm font-semibold text-slate-300">{p.listingScore || 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      p.status === "ACTIVE" 
                        ? "bg-green-900 text-green-300" 
                        : "bg-red-900 text-red-300"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <p className="text-slate-400 text-lg">No properties found</p>
            <p className="text-slate-500 text-sm mt-2">Create your first property to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
