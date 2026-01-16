import { useEffect, useState } from "react";
import { getAllBookmarks, getBookmarkStats } from "../../../api/admin.bookmark.api";
import Loader from "../../../components/common/Loader";
import { Bookmark, Eye, X, User, Phone, Calendar, Home } from "lucide-react";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const categories = ["All", "RESIDENTIAL", "COMMERCIAL", "PG", "Co-Living", "Plot/Land"];

  useEffect(() => {
    loadData();
  }, [selectedCategory]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [bookmarksRes, statsRes] = await Promise.all([
        getAllBookmarks({ category: selectedCategory }),
        getBookmarkStats()
      ]);
      setBookmarks(bookmarksRes?.data?.bookmarks || []);
      setStats(statsRes?.data?.stats || null);
    } catch (err) {
      console.error("Error loading bookmarks:", err);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  const openPropertyModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProperty(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Bookmark className="text-indigo-500" size={32} />
          <h1 className="text-3xl font-bold text-white">All Bookmarked Properties</h1>
        </div>
        <p className="text-slate-400 mt-2">View all properties bookmarked by users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Total Bookmarks</p>
          <p className="text-3xl font-bold text-indigo-400 mt-2">{stats?.total || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Users with Bookmarks</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{stats?.usersWithBookmarks || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Residential</p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{stats?.byCategory?.RESIDENTIAL || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">Commercial</p>
          <p className="text-3xl font-bold text-orange-400 mt-2">{stats?.byCategory?.COMMERCIAL || 0}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <p className="text-slate-400 text-sm">PG/Co-Living</p>
          <p className="text-3xl font-bold text-purple-400 mt-2">
            {(stats?.byCategory?.PG || 0) + (stats?.byCategory?.["Co-Living"] || 0)}
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {bookmarks && bookmarks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Property Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Listing Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Bookmark Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookmarks.map((item) => (
                  <tr key={item._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                          <User size={14} className="text-white" />
                        </div>
                        <span className="text-white font-medium">{item.user?.name || "N/A"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone size={14} className="text-green-400" />
                        {item.user?.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-cyan-900 text-cyan-300 rounded-full text-sm font-medium">
                        {item.property?.propertyType || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        item.property?.listingType === "RENT"
                          ? "bg-blue-900 text-blue-300"
                          : item.property?.listingType === "SELL"
                          ? "bg-purple-900 text-purple-300"
                          : item.property?.listingType === "LEASE"
                          ? "bg-pink-900 text-pink-300"
                          : "bg-indigo-900 text-indigo-300"
                      }`}>
                        {item.property?.listingType || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        item.property?.propertyType === "RESIDENTIAL"
                          ? "bg-green-900 text-green-300"
                          : item.property?.propertyType === "COMMERCIAL"
                          ? "bg-orange-900 text-orange-300"
                          : item.property?.propertyType === "PG"
                          ? "bg-yellow-900 text-yellow-300"
                          : item.property?.propertyType === "Co-Living"
                          ? "bg-teal-900 text-teal-300"
                          : "bg-rose-900 text-rose-300"
                      }`}>
                        {item.property?.propertyType || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">
                      <div>{item.property?.location?.city || "N/A"}</div>
                      <div className="text-sm text-slate-400">{item.property?.location?.locality || ""}</div>
                    </td>
                    <td className="px-6 py-4 text-white font-semibold">
                      ₹{item.property?.pricing?.rentAmount?.toLocaleString() || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Calendar size={14} />
                        {item.property?.createdAt 
                          ? new Date(item.property.createdAt).toLocaleDateString()
                          : "N/A"
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => openPropertyModal(item.property)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <Bookmark size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No bookmarks found</p>
            <p className="text-slate-500 text-sm mt-2">Users haven't bookmarked any properties yet</p>
          </div>
        )}
      </div>

      {/* Property Detail Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <Home className="text-indigo-500" size={24} />
                <h2 className="text-xl font-bold text-white">Property Details</h2>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-700 rounded-lg transition"
              >
                <X className="text-slate-400" size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Property Images */}
              {selectedProperty.photos && selectedProperty.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {selectedProperty.photos.slice(0, 6).map((photo, idx) => (
                    <img
                      key={idx}
                      src={photo.url}
                      alt={`Property ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Basic Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Listing Type</p>
                  <p className="text-white font-semibold mt-1">{selectedProperty.listingType}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Property Type</p>
                  <p className="text-white font-semibold mt-1">{selectedProperty.propertyType}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Category</p>
                  <p className="text-white font-semibold mt-1">{selectedProperty.propertyCategory}</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium mt-1 ${
                    selectedProperty.status === "ACTIVE"
                      ? "bg-green-900 text-green-300"
                      : "bg-red-900 text-red-300"
                  }`}>
                    {selectedProperty.status}
                  </span>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Price</p>
                  <p className="text-white font-semibold mt-1">
                    ₹{selectedProperty.pricing?.rentAmount?.toLocaleString() || "N/A"}
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm">Deposit</p>
                  <p className="text-white font-semibold mt-1">
                    ₹{selectedProperty.pricing?.depositAmount?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">Location</p>
                <p className="text-white font-semibold">
                  {selectedProperty.location?.society && `${selectedProperty.location.society}, `}
                  {selectedProperty.location?.locality && `${selectedProperty.location.locality}, `}
                  {selectedProperty.location?.city || "N/A"}
                </p>
              </div>

              {/* Residential Property Details */}
              {selectedProperty.residentialDetails && (
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-3">Residential Details</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProperty.residentialDetails.bhkType && (
                      <div>
                        <p className="text-slate-500 text-xs">BHK Type</p>
                        <p className="text-white">{selectedProperty.residentialDetails.bhkType}</p>
                      </div>
                    )}
                    {selectedProperty.residentialDetails.bathrooms && (
                      <div>
                        <p className="text-slate-500 text-xs">Bathrooms</p>
                        <p className="text-white">{selectedProperty.residentialDetails.bathrooms}</p>
                      </div>
                    )}
                    {selectedProperty.residentialDetails.balconies && (
                      <div>
                        <p className="text-slate-500 text-xs">Balconies</p>
                        <p className="text-white">{selectedProperty.residentialDetails.balconies}</p>
                      </div>
                    )}
                    {selectedProperty.residentialDetails.furnishType && (
                      <div>
                        <p className="text-slate-500 text-xs">Furnishing</p>
                        <p className="text-white">{selectedProperty.residentialDetails.furnishType}</p>
                      </div>
                    )}
                    {selectedProperty.residentialDetails.totalFloors && (
                      <div>
                        <p className="text-slate-500 text-xs">Total Floors</p>
                        <p className="text-white">{selectedProperty.residentialDetails.totalFloors}</p>
                      </div>
                    )}
                    {selectedProperty.residentialDetails.yourFloor && (
                      <div>
                        <p className="text-slate-500 text-xs">Your Floor</p>
                        <p className="text-white">{selectedProperty.residentialDetails.yourFloor}</p>
                      </div>
                    )}
                    {selectedProperty.residentialDetails.area?.builtUp && (
                      <div>
                        <p className="text-slate-500 text-xs">Built Up Area</p>
                        <p className="text-white">{selectedProperty.residentialDetails.area.builtUp} sq.ft</p>
                      </div>
                    )}
                    {selectedProperty.residentialDetails.facing && (
                      <div>
                        <p className="text-slate-500 text-xs">Facing</p>
                        <p className="text-white">{selectedProperty.residentialDetails.facing}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Commercial Property Details */}
              {selectedProperty.commercialDetails && (
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-3">Commercial Details</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProperty.commercialDetails.constructionStatus && (
                      <div>
                        <p className="text-slate-500 text-xs">Construction Status</p>
                        <p className="text-white">{selectedProperty.commercialDetails.constructionStatus}</p>
                      </div>
                    )}
                    {selectedProperty.commercialDetails.washrooms && (
                      <div>
                        <p className="text-slate-500 text-xs">Washrooms</p>
                        <p className="text-white">{selectedProperty.commercialDetails.washrooms}</p>
                      </div>
                    )}
                    {selectedProperty.commercialDetails.ownership && (
                      <div>
                        <p className="text-slate-500 text-xs">Ownership</p>
                        <p className="text-white">{selectedProperty.commercialDetails.ownership}</p>
                      </div>
                    )}
                    {selectedProperty.commercialDetails.area?.builtUp && (
                      <div>
                        <p className="text-slate-500 text-xs">Built Up Area</p>
                        <p className="text-white">{selectedProperty.commercialDetails.area.builtUp} sq.ft</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PG Details */}
              {selectedProperty.pgDetails && (
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-3">PG Details</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProperty.pgDetails.pgName && (
                      <div>
                        <p className="text-slate-500 text-xs">PG Name</p>
                        <p className="text-white">{selectedProperty.pgDetails.pgName}</p>
                      </div>
                    )}
                    {selectedProperty.pgDetails.pgFor && (
                      <div>
                        <p className="text-slate-500 text-xs">PG For</p>
                        <p className="text-white">{selectedProperty.pgDetails.pgFor}</p>
                      </div>
                    )}
                    {selectedProperty.pgDetails.roomSharingType && (
                      <div>
                        <p className="text-slate-500 text-xs">Room Type</p>
                        <p className="text-white">{selectedProperty.pgDetails.roomSharingType}</p>
                      </div>
                    )}
                    {selectedProperty.pgDetails.furnishType && (
                      <div>
                        <p className="text-slate-500 text-xs">Furnishing</p>
                        <p className="text-white">{selectedProperty.pgDetails.furnishType}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Co-Living Details */}
              {selectedProperty.coLivingDetails && (
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-3">Co-Living Profile</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {selectedProperty.coLivingDetails.name && (
                      <div>
                        <p className="text-slate-500 text-xs">Name</p>
                        <p className="text-white">{selectedProperty.coLivingDetails.name}</p>
                      </div>
                    )}
                    {selectedProperty.coLivingDetails.gender && (
                      <div>
                        <p className="text-slate-500 text-xs">Gender</p>
                        <p className="text-white">{selectedProperty.coLivingDetails.gender}</p>
                      </div>
                    )}
                    {selectedProperty.coLivingDetails.occupation && (
                      <div>
                        <p className="text-slate-500 text-xs">Occupation</p>
                        <p className="text-white">{selectedProperty.coLivingDetails.occupation}</p>
                      </div>
                    )}
                    {selectedProperty.coLivingDetails.lookingFor && (
                      <div>
                        <p className="text-slate-500 text-xs">Looking For</p>
                        <p className="text-white">{selectedProperty.coLivingDetails.lookingFor}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Amenities */}
              {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-3">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProperty.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-900/50 text-indigo-300 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact */}
              {selectedProperty.contact && (
                <div className="bg-slate-900 p-4 rounded-lg">
                  <p className="text-slate-400 text-sm mb-2">Contact</p>
                  <p className="text-white font-semibold">
                    {selectedProperty.contact.phoneNumber || "N/A"}
                    {selectedProperty.contact.isPhonePrivate && (
                      <span className="text-xs text-slate-500 ml-2">(Private)</span>
                    )}
                  </p>
                </div>
              )}

              {/* Listing Score */}
              <div className="bg-slate-900 p-4 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">Listing Score</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all"
                      style={{ width: `${selectedProperty.listingScore || 0}%` }}
                    />
                  </div>
                  <span className="text-white font-bold">{selectedProperty.listingScore || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
