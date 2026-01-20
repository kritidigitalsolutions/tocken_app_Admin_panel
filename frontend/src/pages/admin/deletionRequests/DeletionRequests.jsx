import { useEffect, useState } from "react";
import {
    fetchDeletionRequests,
    approveDeletionRequest,
    rejectDeletionRequest,
    permanentlyDeleteUser
} from "../../../api/deletionRequest.api";
import Loader from "../../../components/common/Loader";
import toast, { Toaster } from "react-hot-toast";
import {
    UserX,
    User,
    Phone,
    Clock,
    CheckCircle,
    XCircle,
    Trash2,
    AlertTriangle,
    MessageSquare,
    X
} from "lucide-react";

const DeletionRequests = () => {
    const [requests, setRequests] = useState([]);
    const [stats, setStats] = useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState("PENDING");
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);

    const loadRequests = async () => {
        try {
            setLoading(true);
            const res = await fetchDeletionRequests({ status: selectedStatus });
            setRequests(res.data.requests);
            setStats(res.data.stats);
        } catch (error) {
            toast.error("Failed to load deletion requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadRequests();
    }, [selectedStatus]);

    const handleApprove = async (userId) => {
        try {
            await approveDeletionRequest(userId);
            toast.success("Deletion request approved. Account deactivated.");
            loadRequests();
            setShowModal(false);
            setShowConfirmModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to approve");
        }
    };

    const handleReject = async (userId) => {
        try {
            await rejectDeletionRequest(userId);
            toast.success("Deletion request rejected");
            loadRequests();
            setShowModal(false);
            setShowConfirmModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reject");
        }
    };

    const handlePermanentDelete = async (userId) => {
        try {
            await permanentlyDeleteUser(userId);
            toast.success("User permanently deleted");
            loadRequests();
            setShowModal(false);
            setShowConfirmModal(false);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete");
        }
    };

    const openViewModal = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const openConfirmModal = (action) => {
        setConfirmAction(action);
        setShowConfirmModal(true);
    };

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
            <Toaster position="top-right" />

            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Account Deletion Requests</h2>
                    <p className="text-slate-400 text-sm mt-1">
                        Review and process user account deletion requests
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <Clock className="text-yellow-400" size={24} />
                        <div>
                            <p className="text-yellow-400 text-2xl font-bold">{stats.pending}</p>
                            <p className="text-yellow-300 text-sm">Pending</p>
                        </div>
                    </div>
                </div>
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle className="text-green-400" size={24} />
                        <div>
                            <p className="text-green-400 text-2xl font-bold">{stats.approved}</p>
                            <p className="text-green-300 text-sm">Approved</p>
                        </div>
                    </div>
                </div>
                <div className="bg-red-900/30 border border-red-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <XCircle className="text-red-400" size={24} />
                        <div>
                            <p className="text-red-400 text-2xl font-bold">{stats.rejected}</p>
                            <p className="text-red-300 text-sm">Rejected</p>
                        </div>
                    </div>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                        <UserX className="text-slate-400" size={24} />
                        <div>
                            <p className="text-white text-2xl font-bold">{stats.total}</p>
                            <p className="text-slate-400 text-sm">Total Requests</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
                {["PENDING", "APPROVED", "REJECTED", "ALL"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${selectedStatus === status
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                            }`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            {/* Requests List */}
            {loading ? (
                <Loader />
            ) : requests.length === 0 ? (
                <div className="text-center py-12 bg-slate-800 rounded-lg">
                    <UserX className="mx-auto text-slate-600 mb-4" size={48} />
                    <p className="text-slate-400">No {selectedStatus.toLowerCase()} deletion requests</p>
                </div>
            ) : (
                <div className="bg-slate-800 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-900">
                            <tr>
                                <th className="text-left p-4 text-slate-400 font-medium">User</th>
                                <th className="text-left p-4 text-slate-400 font-medium">Reason</th>
                                <th className="text-left p-4 text-slate-400 font-medium">Requested</th>
                                <th className="text-left p-4 text-slate-400 font-medium">Status</th>
                                <th className="text-right p-4 text-slate-400 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id} className="border-t border-slate-700 hover:bg-slate-700/50">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                                                {request.profileImage ? (
                                                    <img
                                                        src={request.profileImage}
                                                        alt={request.name}
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <User size={20} className="text-slate-400" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{request.name || "User"}</p>
                                                <p className="text-slate-400 text-sm">{request.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-slate-300 text-sm max-w-xs truncate">
                                            {request.deletionRequest?.reason || "N/A"}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-slate-400 text-sm">
                                            {request.deletionRequest?.requestedAt
                                                ? formatDate(request.deletionRequest.requestedAt)
                                                : "N/A"}
                                        </p>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${request.deletionRequest?.status === "PENDING"
                                                    ? "bg-yellow-900 text-yellow-300"
                                                    : request.deletionRequest?.status === "APPROVED"
                                                        ? "bg-green-900 text-green-300"
                                                        : "bg-red-900 text-red-300"
                                                }`}
                                        >
                                            {request.deletionRequest?.status || "N/A"}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => openViewModal(request)}
                                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
                                        >
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* View Details Modal */}
            {showModal && selectedRequest && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b border-slate-700">
                            <h3 className="text-xl font-bold text-white">Deletion Request Details</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-slate-700 rounded-lg"
                            >
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                            {/* User Info */}
                            <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-lg">
                                <div className="w-14 h-14 bg-slate-700 rounded-full flex items-center justify-center">
                                    {selectedRequest.profileImage ? (
                                        <img
                                            src={selectedRequest.profileImage}
                                            alt={selectedRequest.name}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User size={28} className="text-slate-400" />
                                    )}
                                </div>
                                <div>
                                    <p className="text-white text-lg font-medium">{selectedRequest.name || "User"}</p>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <Phone size={14} />
                                        <span>{selectedRequest.phone}</span>
                                    </div>
                                    <span className="text-xs bg-slate-700 px-2 py-0.5 rounded mt-1 inline-block">
                                        {selectedRequest.userType}
                                    </span>
                                </div>
                            </div>

                            {/* Reason */}
                            <div className="p-4 bg-slate-900 rounded-lg">
                                <div className="flex items-center gap-2 text-slate-400 mb-2">
                                    <AlertTriangle size={16} />
                                    <span className="text-sm font-medium">Reason for Deletion</span>
                                </div>
                                <p className="text-white">{selectedRequest.deletionRequest?.reason || "N/A"}</p>
                            </div>

                            {/* Feedback */}
                            <div className="p-4 bg-slate-900 rounded-lg">
                                <div className="flex items-center gap-2 text-slate-400 mb-2">
                                    <MessageSquare size={16} />
                                    <span className="text-sm font-medium">User Feedback</span>
                                </div>
                                <p className="text-slate-300">{selectedRequest.deletionRequest?.feedback || "No feedback provided"}</p>
                            </div>

                            {/* Timestamps */}
                            <div className="p-4 bg-slate-900 rounded-lg">
                                <div className="flex items-center gap-2 text-slate-400 mb-2">
                                    <Clock size={16} />
                                    <span className="text-sm font-medium">Request Time</span>
                                </div>
                                <p className="text-white">
                                    {selectedRequest.deletionRequest?.requestedAt
                                        ? formatDate(selectedRequest.deletionRequest.requestedAt)
                                        : "N/A"}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <div className="text-center">
                                <span
                                    className={`px-4 py-2 rounded-full font-medium ${selectedRequest.deletionRequest?.status === "PENDING"
                                            ? "bg-yellow-900 text-yellow-300"
                                            : selectedRequest.deletionRequest?.status === "APPROVED"
                                                ? "bg-green-900 text-green-300"
                                                : "bg-red-900 text-red-300"
                                        }`}
                                >
                                    {selectedRequest.deletionRequest?.status}
                                </span>
                            </div>
                        </div>

                        {/* Actions */}
                        {selectedRequest.deletionRequest?.status === "PENDING" && (
                            <div className="p-4 border-t border-slate-700 flex gap-3">
                                <button
                                    onClick={() => openConfirmModal("approve")}
                                    className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={18} />
                                    Approve
                                </button>
                                <button
                                    onClick={() => openConfirmModal("reject")}
                                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <XCircle size={18} />
                                    Reject
                                </button>
                            </div>
                        )}

                        {selectedRequest.deletionRequest?.status === "APPROVED" && (
                            <div className="p-4 border-t border-slate-700">
                                <button
                                    onClick={() => openConfirmModal("permanent")}
                                    className="w-full py-3 bg-red-800 hover:bg-red-900 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    <Trash2 size={18} />
                                    Permanently Delete User
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Confirm Action Modal */}
            {showConfirmModal && selectedRequest && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
                    <div className="bg-slate-800 rounded-xl w-full max-w-md p-6">
                        <div className="text-center mb-6">
                            <div
                                className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${confirmAction === "approve"
                                        ? "bg-green-900"
                                        : confirmAction === "reject"
                                            ? "bg-red-900"
                                            : "bg-red-950"
                                    }`}
                            >
                                {confirmAction === "approve" && <CheckCircle size={32} className="text-green-400" />}
                                {confirmAction === "reject" && <XCircle size={32} className="text-red-400" />}
                                {confirmAction === "permanent" && <Trash2 size={32} className="text-red-500" />}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                {confirmAction === "approve" && "Approve Deletion Request?"}
                                {confirmAction === "reject" && "Reject Deletion Request?"}
                                {confirmAction === "permanent" && "Permanently Delete User?"}
                            </h3>
                            <p className="text-slate-400">
                                {confirmAction === "approve" &&
                                    "This will deactivate the user's account. They won't be able to log in."}
                                {confirmAction === "reject" &&
                                    "The user will be notified that their deletion request was rejected."}
                                {confirmAction === "permanent" &&
                                    "This action cannot be undone. All user data will be permanently deleted."}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowConfirmModal(false)}
                                className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    if (confirmAction === "approve") handleApprove(selectedRequest._id);
                                    if (confirmAction === "reject") handleReject(selectedRequest._id);
                                    if (confirmAction === "permanent") handlePermanentDelete(selectedRequest._id);
                                }}
                                className={`flex-1 py-3 rounded-lg font-medium text-white ${confirmAction === "approve"
                                        ? "bg-green-600 hover:bg-green-700"
                                        : "bg-red-600 hover:bg-red-700"
                                    }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DeletionRequests;
