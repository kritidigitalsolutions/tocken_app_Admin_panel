import { useEffect, useState } from "react";
import { fetchUsers, updateUser, deleteUser, togglePhonePrivacy } from "../../../api/user.api";
import { useTheme } from "../../../context/ThemeContext";
import Loader from "../../../components/common/Loader";
import toast, { Toaster } from "react-hot-toast";
import {
  Users as UsersIcon,
  User,
  Phone,
  PhoneOff,
  Shield,
  ShieldOff,
  Trash2,
  Crown,
  Building2,
  UserCheck,
  UserX,
  Eye,
  X
} from "lucide-react";
const defaultAvatar = "https://www.pngall.com/wp-content/uploads/15/User-PNG-Images-HD.png";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUserType, setSelectedUserType] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { isDark } = useTheme();

  const userTypes = [
    "All",
    "AGENT",
    "BUILDER",
    "INDIVIDUAL"
  ];

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchUsers({ userType: selectedUserType });
      setUsers(res?.data?.users || []);
      setStats(res?.data?.stats || null);
    } catch (err) {
      console.error("Error loading users:", err);
      toast.error("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUserType]);

  // 🔒 Block / Unblock
  const toggleBlock = async (user) => {
    try {
      await updateUser(user._id, {
        isBlocked: !user.isBlocked,
      });
      toast.success(user.isBlocked ? "User unblocked" : "User blocked");
      loadData();
    } catch (error) {
      toast.error("Update failed");
    }
  };

  // 🗑️ Delete user
  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
      loadData();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // View user details modal
  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  // Get user type badge color
  const getUserTypeBadge = (type) => {
    const colors = {
      AGENT: isDark ? "bg-purple-900 text-purple-300" : "bg-purple-100 text-purple-800",
      BUILDER: isDark ? "bg-blue-900 text-blue-300" : "bg-blue-100 text-blue-800",
      INDIVIDUAL: isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
    };
    return colors[type] || (isDark ? "bg-slate-700 text-slate-300" : "bg-gray-100 text-gray-700");
  };

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <UsersIcon className="text-indigo-500" size={32} />
          <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>All Users</h1>
        </div>
        <p className={`mt-2 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Manage all registered users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
              <UsersIcon className={isDark ? 'text-indigo-400' : 'text-indigo-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Total Users</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>{stats?.total || 0}</p>
            </div>
          </div>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-green-900/50' : 'bg-green-100'}`}>
              <UserCheck className={isDark ? 'text-green-400' : 'text-green-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Active Users</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-green-400' : 'text-green-600'}`}>{stats?.active || 0}</p>
            </div>
          </div>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-red-900/50' : 'bg-red-100'}`}>
              <UserX className={isDark ? 'text-red-400' : 'text-red-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Blocked Users</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-red-400' : 'text-red-600'}`}>{stats?.blocked || 0}</p>
            </div>
          </div>
        </div>
        <div className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-yellow-900/50' : 'bg-yellow-100'}`}>
              <Crown className={isDark ? 'text-yellow-400' : 'text-yellow-600'} size={24} />
            </div>
            <div>
              <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>With Active Plan</p>
              <p className={`text-2xl font-bold ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`}>{stats?.withPlan || 0}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Type Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {userTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedUserType(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedUserType === type
              ? "bg-indigo-600 text-white"
              : isDark 
                ? "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
                : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"
              }`}
          >
            {type.replace(/_/g, " ")}
            {stats?.byUserType?.[type] !== undefined && (
              <span className="ml-2 text-xs opacity-70">({stats.byUserType[type]})</span>
            )}
          </button>
        ))}
      </div>

      {/* Users Table */}
      <div className={`rounded-lg overflow-hidden border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
        {users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`border-b ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-gray-50 border-gray-200'}`}>
                <tr>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>User</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Phone</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>User Type</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>GST Number</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Active Plan</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Status</th>
                  <th className={`px-6 py-4 text-left text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className={`border-b transition ${isDark ? 'border-slate-700 hover:bg-slate-700/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    {/* User with Profile Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage || defaultAvatar}
                            alt={user.name || "User"}
                            onError={(e)=>{
                              e.target.onerror = null;
                              e.target.src = defaultAvatar;
                            }}
                            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                            <User size={18} className="text-white" />
                          </div>
                        )}
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.name || "N/A"}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-2 ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                        <Phone size={14} className="text-green-500" />
                        {user.phone || "N/A"}
                      </div>
                    </td>

                    {/* User Type */}
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getUserTypeBadge(user.userType)}`}>
                        {user.userType?.replace(/_/g, " ") || "N/A"}
                      </span>
                    </td>

                    {/* GST Number */}
                    <td className="px-6 py-4">
                      {user.gstNumber ? (
                        <div className="flex items-center gap-2">
                          <Building2 size={14} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
                          <span className={`font-mono text-sm ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{user.gstNumber}</span>
                        </div>
                      ) : (
                        <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Not provided</span>
                      )}
                    </td>

                    {/* Active Plan */}
                    <td className="px-6 py-4">
                      {user.activePlan ? (
                        <div className="flex items-center gap-2">
                          <Crown size={14} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                          <div>
                            <span className={`font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>{user.activePlan.name}</span>
                            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>₹{user.activePlan.price}</p>
                          </div>
                        </div>
                      ) : (
                        <span className={`text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>No Plan</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${user.isBlocked
                        ? (isDark ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800")
                        : (isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800")
                        }`}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {/* View Details */}
                        <button
                          onClick={() => openUserModal(user)}
                          className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                          title="View Details"
                        >
                          <Eye size={16} className="text-white" />
                        </button>

                        {/* Block/Unblock */}
                        <button
                          onClick={() => toggleBlock(user)}
                          className={`p-2 rounded-lg transition ${user.isBlocked
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-orange-600 hover:bg-orange-700"
                            }`}
                          title={user.isBlocked ? "Unblock User" : "Block User"}
                        >
                          {user.isBlocked ? (
                            <Shield size={16} className="text-white" />
                          ) : (
                            <ShieldOff size={16} className="text-white" />
                          )}
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                          title="Delete User"
                        >
                          <Trash2 size={16} className="text-white" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <UsersIcon className={`mx-auto mb-4 ${isDark ? 'text-slate-600' : 'text-gray-400'}`} size={48} />
            <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>No users found</p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className={`rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>User Details</h2>
              <button
                onClick={closeModal}
                className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
              >
                <X size={20} className={isDark ? 'text-slate-400' : 'text-gray-500'} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Profile Section */}
              <div className="flex items-center gap-4 mb-6">
                {selectedUser.profileImage ? (
                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-indigo-500"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center">
                    <User size={32} className="text-white" />
                  </div>
                )}
                <div>
                  <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedUser.name || "N/A"}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getUserTypeBadge(selectedUser.userType)}`}>
                    {selectedUser.userType?.replace(/_/g, " ") || "N/A"}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                {/* Phone with Privacy Toggle */}
                <div className={`flex items-center justify-between p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    {selectedUser.isPhonePrivate ? (
                      <PhoneOff size={18} className="text-orange-500" />
                    ) : (
                      <Phone size={18} className="text-green-500" />
                    )}
                    <div>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Phone Number</p>
                      <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{selectedUser.phone || "N/A"}</p>
                    </div>
                  </div>
                  {/* Privacy Toggle */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${selectedUser.isPhonePrivate ? "text-orange-500" : "text-green-500"}`}>
                      {selectedUser.isPhonePrivate ? "Private" : "Public"}
                    </span>
                    <button
                      onClick={async () => {
                        try {
                          await togglePhonePrivacy(selectedUser._id, !selectedUser.isPhonePrivate);
                          setSelectedUser({ ...selectedUser, isPhonePrivate: !selectedUser.isPhonePrivate });
                          setUsers(users.map(u =>
                            u._id === selectedUser._id
                              ? { ...u, isPhonePrivate: !selectedUser.isPhonePrivate }
                              : u
                          ));
                          toast.success(
                            !selectedUser.isPhonePrivate
                              ? "Phone number set to private"
                              : "Phone number set to public"
                          );
                        } catch (error) {
                          toast.error("Failed to update phone privacy");
                        }
                      }}
                      className={`relative w-12 h-6 rounded-full transition-colors ${selectedUser.isPhonePrivate ? "bg-orange-500" : "bg-green-500"
                        }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${selectedUser.isPhonePrivate ? "left-7" : "left-1"
                          }`}
                      />
                    </button>
                  </div>
                </div>

                {/* GST Number */}
                {selectedUser.gstNumber && (
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
                    <Building2 size={18} className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
                    <div>
                      <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>GST Number</p>
                      <p className={`font-mono ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{selectedUser.gstNumber}</p>
                    </div>
                  </div>
                )}

                {/* Active Plan */}
                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
                  <Crown size={18} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Active Plan</p>
                    {selectedUser.activePlan ? (
                      <div>
                        <p className={`font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-700'}`}>{selectedUser.activePlan.name}</p>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>₹{selectedUser.activePlan.price} • {selectedUser.activePlan.duration} days</p>
                      </div>
                    ) : (
                      <p className={isDark ? 'text-slate-500' : 'text-gray-400'}>No active plan</p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
                  {selectedUser.isBlocked ? (
                    <ShieldOff size={18} className="text-red-500" />
                  ) : (
                    <Shield size={18} className="text-green-500" />
                  )}
                  <div>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedUser.isBlocked
                      ? (isDark ? "bg-red-900 text-red-300" : "bg-red-100 text-red-800")
                      : (isDark ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800")
                      }`}>
                      {selectedUser.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>

                {/* Created At */}
                <div className={`flex items-center gap-3 p-3 rounded-lg ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
                  <UsersIcon size={18} className="text-indigo-500" />
                  <div>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Joined</p>
                    <p className={isDark ? 'text-white' : 'text-gray-900'}>{new Date(selectedUser.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    toggleBlock(selectedUser);
                    closeModal();
                  }}
                  className={`flex-1 py-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${selectedUser.isBlocked
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-orange-600 hover:bg-orange-700 text-white"
                    }`}
                >
                  {selectedUser.isBlocked ? (
                    <>
                      <Shield size={18} />
                      Unblock User
                    </>
                  ) : (
                    <>
                      <ShieldOff size={18} />
                      Block User
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedUser._id);
                    closeModal();
                  }}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} />
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
