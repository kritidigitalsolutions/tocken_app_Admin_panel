import { useEffect, useState } from "react";
import { getProperties } from "../../../api/admin.property.api";
import Loader from "../../../components/common/Loader";
import { Home } from "lucide-react";

const Properties = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");

  // Updated to match actual model values
  const listingTypes = ["All", "RENT", "SELL", "Co-Living", "PG"];
  const propertyTypes = ["All", "RESIDENTIAL", "COMMERCIAL"];
  const residentialCategories = ["All", "Apartment", "Builder Floor", "Independent House", "Villa", "1RK/Studio", "Others"];
  const commercialCategories = ["All", "Retail Shop", "Showroom", "Warehouse", "Office", "Plot/Land"];

  useEffect(() => {
    load();
  }, []);

  const [selectedListingType, setSelectedListingType] = useState("All");
  const [selectedPropertyCategory, setSelectedPropertyCategory] = useState("All");

  // Get property categories based on selected property type
  const getPropertyCategories = () => {
    if (selectedPropertyType === "RESIDENTIAL") return residentialCategories;
    if (selectedPropertyType === "COMMERCIAL") return commercialCategories;
    return ["All"];
  };

  useEffect(() => {
    let filtered = data;
    
    // Filter by listingType
    if (selectedListingType !== "All") {
      filtered = filtered.filter(p => p.listingType === selectedListingType);
    }
    
    // Filter by propertyType
    if (selectedPropertyType !== "All") {
      filtered = filtered.filter(p => p.propertyType === selectedPropertyType);
    }
    
    // Filter by propertyCategory
    if (selectedPropertyCategory !== "All") {
      filtered = filtered.filter(p => p.propertyCategory === selectedPropertyCategory);
    }
    
    setFilteredData(filtered);
  }, [selectedListingType, selectedPropertyType, selectedPropertyCategory, data]);

  // Reset propertyCategory when propertyType changes
  useEffect(() => {
    setSelectedPropertyCategory("All");
  }, [selectedPropertyType]);

  const load = async () => {
    try {
      setLoading(true);
      const res = await getProperties({ page: 1, limit: 100 });
      const properties = res?.data?.data || res?.data?.properties || [];
      setData(properties);
      setFilteredData(properties);
    } catch (err) {
      console.error("ERROR LOADING PROPERTIES:", err);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Home className="text-indigo-500" size={32} />
          <h1 className="text-3xl font-bold text-white">All Properties</h1>
        </div>
        <p className="text-slate-400 mt-2">Manage all property listings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
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
          <p className="text-slate-400 text-sm">Draft</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">
            {data.filter(p => p.status === "DRAFT").length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">PG Listings</p>
          <p className="text-3xl font-bold text-orange-400 mt-2">
            {data.filter(p => p.listingType === "PG").length}
          </p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Co-Living</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            {data.filter(p => p.listingType === "Co-Living").length}
          </p>
        </div>
      </div>

      {/* Listing Type Filter */}
      <div className="mb-4">
        <p className="text-slate-400 text-sm mb-2">Listing Type</p>
        <div className="flex gap-2 flex-wrap">
          {listingTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedListingType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedListingType === type
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Property Type Filter (only for RENT/SELL) */}
      {(selectedListingType === "All" || selectedListingType === "RENT" || selectedListingType === "SELL") && (
        <div className="mb-4">
          <p className="text-slate-400 text-sm mb-2">Property Type</p>
          <div className="flex gap-2 flex-wrap">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPropertyType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedPropertyType === type
                    ? "bg-purple-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Property Category Filter (based on Property Type) */}
      {selectedPropertyType !== "All" && (
        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-2">Property Category</p>
          <div className="flex gap-2 flex-wrap">
            {getPropertyCategories().map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedPropertyCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedPropertyCategory === cat
                    ? "bg-cyan-600 text-white"
                    : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {filteredData && filteredData.length > 0 ? (
          <div className="overflow-x-auto">
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
                {filteredData.map((p) => (
                <tr key={p._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      p.listingType === "RENT"
                        ? "bg-blue-900 text-blue-300"
                        : p.listingType === "SELL"
                        ? "bg-purple-900 text-purple-300"
                        : p.listingType === "Co-Living"
                        ? "bg-pink-900 text-pink-300"
                        : p.listingType === "PG"
                        ? "bg-orange-900 text-orange-300"
                        : "bg-indigo-900 text-indigo-300"
                    }`}>
                      {p.listingType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.propertyType ? (
                      <span className="inline-block px-3 py-1 bg-cyan-900 text-cyan-300 rounded-full text-sm font-medium">
                        {p.propertyType}
                      </span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {p.propertyCategory ? (
                      <span className="inline-block px-3 py-1 bg-green-900 text-green-300 rounded-full text-sm font-medium">
                        {p.propertyCategory}
                      </span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-white">
                    <div>{p.location?.city || "-"}</div>
                    <div className="text-sm text-slate-400">{p.location?.locality || ""}</div>
                  </td>
                  <td className="px-6 py-4 text-white font-semibold">
                    ₹{(p.pricing?.rentAmount || p.pricing?.salePrice)?.toLocaleString() || "N/A"}
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
          </div>
        ) : (
          <div className="p-12 text-center">
            <Home size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No properties found</p>
            <p className="text-slate-500 text-sm mt-2">
              {selectedListingType !== "All" 
                ? `No ${selectedListingType} properties available`
                : "Create your first property to get started"
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
