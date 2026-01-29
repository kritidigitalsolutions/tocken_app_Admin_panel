import { useEffect, useState } from "react";
import { getProperties } from "../../../api/admin.property.api";
import { useTheme } from "../../../context/ThemeContext";
import Loader from "../../../components/common/Loader";
import { Home } from "lucide-react";

const Properties = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");
  const { isDark } = useTheme();

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
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Home className="text-indigo-500" size={32} />
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>All Properties</h1>
        </div>
        <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Manage all property listings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Properties</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{data.length}</p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Active</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {data.filter(p => p.status === "ACTIVE").length}
          </p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Draft</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>
            {data.filter(p => p.status === "DRAFT").length}
          </p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>PG Listings</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
            {data.filter(p => p.listingType === "PG").length}
          </p>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Co-Living</p>
          <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
            {data.filter(p => p.listingType === "Co-Living").length}
          </p>
        </div>
      </div>

      {/* Listing Type Filter */}
      <div className="mb-4">
        <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Listing Type</p>
        <div className="flex gap-2 flex-wrap">
          {listingTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedListingType(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedListingType === type
                  ? "bg-indigo-600 text-white"
                  : isDark 
                    ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
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
          <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Property Type</p>
          <div className="flex gap-2 flex-wrap">
            {propertyTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedPropertyType(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedPropertyType === type
                    ? "bg-purple-600 text-white"
                    : isDark 
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
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
          <p className={`text-sm mb-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Property Category</p>
          <div className="flex gap-2 flex-wrap">
            {getPropertyCategories().map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedPropertyCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedPropertyCategory === cat
                    ? "bg-cyan-600 text-white"
                    : isDark 
                      ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                      : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Table */}
      <div className={`rounded-lg overflow-hidden border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
        {filteredData && filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Listing Type</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Property Type</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Category</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Location</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Price</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Score</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Status</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((p) => (
                <tr key={p._id} className={`border-b transition ${isDark ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      p.listingType === "RENT"
                        ? (isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800")
                        : p.listingType === "SELL"
                        ? (isDark ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-800")
                        : p.listingType === "Co-Living"
                        ? (isDark ? "bg-pink-900 text-pink-300" : "bg-pink-100 text-pink-800")
                        : p.listingType === "PG"
                        ? (isDark ? "bg-orange-900 text-orange-300" : "bg-orange-100 text-orange-800")
                        : (isDark ? "bg-indigo-900 text-indigo-300" : "bg-indigo-100 text-indigo-800")
                    }`}>
                      {p.listingType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {p.propertyType ? (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-cyan-900 text-cyan-300' : 'bg-cyan-100 text-cyan-800'}`}>
                        {p.propertyType}
                      </span>
                    ) : (
                      <span className={isDark ? 'text-slate-500' : 'text-gray-400'}>-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {p.propertyCategory ? (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${isDark ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                        {p.propertyCategory}
                      </span>
                    ) : (
                      <span className={isDark ? 'text-slate-500' : 'text-gray-400'}>-</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={isDark ? 'text-white' : 'text-gray-900'}>{p.location?.city || "-"}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{p.location?.locality || ""}</div>
                  </td>
                  <td className={`px-6 py-4 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    ₹{(p.pricing?.rent?.rentAmount || p.pricing?.salePrice)?.toLocaleString() || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-16 rounded-full h-2 ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
                          style={{width: `${p.listingScore || 0}%`}}
                        />
                      </div>
                      <span className={`ml-2 text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>{p.listingScore || 0}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      p.status === "ACTIVE" 
                        ? (isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800")
                        : (isDark ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800")
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Home size={48} className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} />
            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>No properties found</p>
            <p className={`text-sm mt-2 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
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
