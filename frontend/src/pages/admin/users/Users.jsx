import { useEffect, useState } from "react";
import { fetchUsers, updateUser, deleteUser, togglePhonePrivacy } from "../../../api/user.api";
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

const Users = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUserType, setSelectedUserType] = useState("All");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const userTypes = [
    "All",
    "AGENT",
    "BUILDER",
    "INDIVIDUAL"
  ];

  useEffect(() => {
    loadData();
  }, [selectedUserType]);

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
      AGENT: "bg-purple-900 text-purple-300",
      BUILDER: "bg-blue-900 text-blue-300",
      INDIVIDUAL: "bg-green-900 text-green-300"
    };
    return colors[type] || "bg-slate-700 text-slate-300";
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-900">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <UsersIcon className="text-indigo-500" size={32} />
          <h1 className="text-3xl font-bold text-white">All Users</h1>
        </div>
        <p className="text-slate-400 mt-2">Manage all registered users</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-900/50 rounded-lg">
              <UsersIcon className="text-indigo-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <p className="text-2xl font-bold text-indigo-400">{stats?.total || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-900/50 rounded-lg">
              <UserCheck className="text-green-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Active Users</p>
              <p className="text-2xl font-bold text-green-400">{stats?.active || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-900/50 rounded-lg">
              <UserX className="text-red-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Blocked Users</p>
              <p className="text-2xl font-bold text-red-400">{stats?.blocked || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-900/50 rounded-lg">
              <Crown className="text-yellow-400" size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-sm">With Active Plan</p>
              <p className="text-2xl font-bold text-yellow-400">{stats?.withPlan || 0}</p>
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
              : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700"
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
      <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
        {users && users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 border-b border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Phone</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">GST Number</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Active Plan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    {/* User with Profile Image */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.name}
                            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
                            <User size={18} className="text-white" />
                          </div>
                        )}
                        <span className="text-white font-medium">{user.name || "N/A"}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone size={14} className="text-green-400" />
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
                          <Building2 size={14} className="text-cyan-400" />
                          <span className="text-cyan-300 font-mono text-sm">{user.gstNumber}</span>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-sm">Not provided</span>
                      )}
                    </td>

                    {/* Active Plan */}
                    <td className="px-6 py-4">
                      {user.activePlan ? (
                        <div className="flex items-center gap-2">
                          <Crown size={14} className="text-yellow-400" />
                          <div>
                            <span className="text-yellow-300 font-medium">{user.activePlan.name}</span>
                            <p className="text-xs text-slate-400">₹{user.activePlan.price}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-500 text-sm">No Plan</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${user.isBlocked
                        ? "bg-red-900 text-red-300"
                        : "bg-green-900 text-green-300"
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
            <UsersIcon className="mx-auto text-slate-600 mb-4" size={48} />
            <p className="text-slate-400">No users found</p>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-700">
              <h2 className="text-xl font-bold text-white">User Details</h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-slate-700 rounded-lg transition"
              >
                <X size={20} className="text-slate-400" />
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
                  <h3 className="text-xl font-bold text-white">{selectedUser.name || "N/A"}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${getUserTypeBadge(selectedUser.userType)}`}>
                    {selectedUser.userType?.replace(/_/g, " ") || "N/A"}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-4">
                {/* Phone with Privacy Toggle */}
                <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg">
                  <div className="flex items-center gap-3">
                    {selectedUser.isPhonePrivate ? (
                      <PhoneOff size={18} className="text-orange-400" />
                    ) : (
                      <Phone size={18} className="text-green-400" />
                    )}
                    <div>
                      <p className="text-slate-400 text-sm">Phone Number</p>
                      <p className="text-white font-medium">{selectedUser.phone || "N/A"}</p>
                    </div>
                  </div>
                  {/* Privacy Toggle */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${selectedUser.isPhonePrivate ? "text-orange-400" : "text-green-400"}`}>
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
                  <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                    <Building2 size={18} className="text-cyan-400" />
                    <div>
                      <p className="text-slate-400 text-sm">GST Number</p>
                      <p className="text-cyan-300 font-mono">{selectedUser.gstNumber}</p>
                    </div>
                  </div>
                )}

                {/* Active Plan */}
                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                  <Crown size={18} className="text-yellow-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Active Plan</p>
                    {selectedUser.activePlan ? (
                      <div>
                        <p className="text-yellow-300 font-medium">{selectedUser.activePlan.name}</p>
                        <p className="text-slate-400 text-sm">₹{selectedUser.activePlan.price} • {selectedUser.activePlan.duration} days</p>
                      </div>
                    ) : (
                      <p className="text-slate-500">No active plan</p>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                  {selectedUser.isBlocked ? (
                    <ShieldOff size={18} className="text-red-400" />
                  ) : (
                    <Shield size={18} className="text-green-400" />
                  )}
                  <div>
                    <p className="text-slate-400 text-sm">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${selectedUser.isBlocked
                      ? "bg-red-900 text-red-300"
                      : "bg-green-900 text-green-300"
                      }`}>
                      {selectedUser.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>
                </div>

                {/* Created At */}
                <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                  <UsersIcon size={18} className="text-indigo-400" />
                  <div>
                    <p className="text-slate-400 text-sm">Joined</p>
                    <p className="text-white">{new Date(selectedUser.createdAt).toLocaleDateString("en-IN", {
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
