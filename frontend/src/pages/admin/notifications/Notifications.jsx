import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DataTable from "../../../components/tables/DataTable";
import Modal from "../../../components/modals/Modal";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";

import {
    fetchNotifications,
    fetchNotificationStats,
    createNotification,
    updateNotification,
    deleteNotification
} from "../../../api/admin.notification.api";

import { fetchUsers } from "../../../api/user.api";

const NOTIFICATION_TYPES = [
    "GENERAL",
    "PROPERTY",
    "LEAD",
    "PLAN",
    "SYSTEM",
    "PROMOTIONAL"
];

const TARGET_USER_TYPES = [
    "ALL",
    "AGENT",
    "BUILDER",
    "INDIVIDUAL"
];

const initialForm = {
    title: "",
    message: "",
    type: "GENERAL",
    targetUserId: "",
    targetUserType: "ALL"
};

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const [openForm, setOpenForm] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [openView, setOpenView] = useState(false);

    const [selectedNotification, setSelectedNotification] = useState(null);
    const [formData, setFormData] = useState(initialForm);
    const [sendToSpecificUser, setSendToSpecificUser] = useState(false);

    const loadNotifications = async () => {
        try {
            const res = await fetchNotifications();
            setNotifications(res.data.notifications || []);
        } catch (error) {
            console.error("Error loading notifications:", error);
            if (error.code === "ERR_NETWORK" || !error.response) {
                toast.error("Network error: Backend server not running on port 5000");
            } else if (error.response?.status === 401) {
                toast.error("Unauthorized: Please login again");
            } else {
                toast.error("Failed to load notifications");
            }
            setNotifications([]);
        }
    };

    const loadStats = async () => {
        try {
            const res = await fetchNotificationStats();
            setStats(res.data.stats);
        } catch (error) {
            console.error("Error loading stats:", error);
        }
    };

    const loadUsers = async () => {
        try {
            const res = await fetchUsers();
            setUsers(res.data.users || []);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([loadNotifications(), loadStats(), loadUsers()])
            .finally(() => setLoading(false));
    }, []);

    /* ---------------- CREATE / UPDATE ---------------- */

    const handleSubmit = async () => {
        try {
            if (!formData.title.trim() || !formData.message.trim()) {
                toast.error("Title and message are required");
                return;
            }

            const payload = {
                title: formData.title,
                message: formData.message,
                type: formData.type
            };

            if (sendToSpecificUser && formData.targetUserId) {
                payload.targetUserId = formData.targetUserId;
            } else {
                payload.targetUserType = formData.targetUserType;
            }

            if (selectedNotification) {
                await updateNotification(selectedNotification._id, payload);
                toast.success("Notification updated successfully");
            } else {
                await createNotification(payload);
                toast.success("Notification sent successfully");
            }

            setOpenForm(false);
            setSelectedNotification(null);
            setFormData(initialForm);
            setSendToSpecificUser(false);
            loadNotifications();
            loadStats();
        } catch (err) {
            console.error("Submit error:", err);
            if (err.code === "ERR_NETWORK" || !err.response) {
                toast.error("Network error: Backend server not running");
            } else if (err.response?.status === 401) {
                toast.error("Unauthorized: Please login again");
            } else {
                toast.error(err.response?.data?.message || "Failed to save notification");
            }
        }
    };

    /* ---------------- DELETE ---------------- */

    const handleDelete = async () => {
        try {
            await deleteNotification(selectedNotification._id);
            toast.success("Notification deleted successfully");
            setOpenDelete(false);
            setSelectedNotification(null);
            loadNotifications();
            loadStats();
        } catch (error) {
            console.error("Delete error:", error);
            if (error.code === "ERR_NETWORK" || !error.response) {
                toast.error("Network error: Backend server not running");
            } else if (error.response?.status === 401) {
                toast.error("Unauthorized: Please login again");
            } else {
                toast.error(error.response?.data?.message || "Delete failed");
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getTypeColor = (type) => {
        const colors = {
            GENERAL: "bg-blue-600",
            PROPERTY: "bg-green-600",
            LEAD: "bg-yellow-600",
            PLAN: "bg-purple-600",
            SYSTEM: "bg-red-600",
            PROMOTIONAL: "bg-pink-600"
        };
        return colors[type] || "bg-gray-600";
    };

    return (
        <div>
            <Toaster position="top-right" />

            {/* Stats Cards */}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-slate-800 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Total Notifications</p>
                        <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Active</p>
                        <p className="text-2xl font-bold text-green-500">{stats.active}</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">This Week</p>
                        <p className="text-2xl font-bold text-blue-500">{stats.recentWeek}</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Inactive</p>
                        <p className="text-2xl font-bold text-gray-500">{stats.inactive}</p>
                    </div>
                </div>
            )}

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Notifications</h2>
                <Button onClick={() => {
                    setFormData(initialForm);
                    setSelectedNotification(null);
                    setSendToSpecificUser(false);
                    setOpenForm(true);
                }}>
                    + Send Notification
                </Button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <DataTable columns={["Title", "Type", "Target", "Created", "Actions"]}>
                    {notifications.map((notification) => (
                        <tr key={notification._id}>
                            <td className="p-4">
                                <div>
                                    <p className="font-medium">{notification.title}</p>
                                    <p className="text-gray-400 text-sm truncate max-w-xs">
                                        {notification.message}
                                    </p>
                                </div>
                            </td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded text-xs ${getTypeColor(notification.type)}`}>
                                    {notification.type}
                                </span>
                            </td>
                            <td className="p-4">
                                {notification.targetUser ? (
                                    <span className="text-blue-400">
                                        {notification.targetUser.name || notification.targetUser.phone}
                                    </span>
                                ) : (
                                    <span className="text-gray-400">
                                        {notification.targetUserType || "ALL"}
                                    </span>
                                )}
                            </td>
                            <td className="p-4 text-gray-400 text-sm">
                                {formatDate(notification.createdAt)}
                            </td>
                            <td className="p-4 flex gap-2">
                                <Button
                                    variant="secondary"
                                    onClick={() => {
                                        setSelectedNotification(notification);
                                        setOpenView(true);
                                    }}
                                >
                                    View
                                </Button>

                                <Button
                                    variant="warning"
                                    onClick={() => {
                                        setSelectedNotification(notification);
                                        setFormData({
                                            title: notification.title,
                                            message: notification.message,
                                            type: notification.type,
                                            targetUserId: notification.targetUser?._id || "",
                                            targetUserType: notification.targetUserType || "ALL"
                                        });
                                        setSendToSpecificUser(!!notification.targetUser);
                                        setOpenForm(true);
                                    }}
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setSelectedNotification(notification);
                                        setOpenDelete(true);
                                    }}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </DataTable>
            )}

            {/* CREATE / EDIT MODAL */}
            <Modal
                open={openForm}
                title={selectedNotification ? "Edit Notification" : "Send Notification"}
                onClose={() => setOpenForm(false)}
            >
                <div className="space-y-4">
                    <input
                        placeholder="Notification Title"
                        className="w-full p-2 rounded bg-slate-800"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    <textarea
                        placeholder="Notification Message"
                        className="w-full p-2 rounded bg-slate-800 min-h-[100px]"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />

                    <div>
                        <label className="text-sm text-gray-400 block mb-1">Type</label>
                        <select
                            className="w-full p-2 rounded bg-slate-800"
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        >
                            {NOTIFICATION_TYPES.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="specificUser"
                            checked={sendToSpecificUser}
                            onChange={(e) => setSendToSpecificUser(e.target.checked)}
                        />
                        <label htmlFor="specificUser" className="text-sm">
                            Send to specific user
                        </label>
                    </div>

                    {sendToSpecificUser ? (
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Select User</label>
                            <select
                                className="w-full p-2 rounded bg-slate-800"
                                value={formData.targetUserId}
                                onChange={(e) => setFormData({ ...formData, targetUserId: e.target.value })}
                            >
                                <option value="">-- Select User --</option>
                                {users.map((user) => (
                                    <option key={user._id} value={user._id}>
                                        {user.name} ({user.phone})
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div>
                            <label className="text-sm text-gray-400 block mb-1">Target User Type</label>
                            <select
                                className="w-full p-2 rounded bg-slate-800"
                                value={formData.targetUserType}
                                onChange={(e) => setFormData({ ...formData, targetUserType: e.target.value })}
                            >
                                {TARGET_USER_TYPES.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <Button onClick={handleSubmit} className="w-full">
                        {selectedNotification ? "Update" : "Send Notification"}
                    </Button>
                </div>
            </Modal>

            {/* VIEW MODAL */}
            <Modal
                open={openView}
                title="Notification Details"
                onClose={() => setOpenView(false)}
            >
                {selectedNotification && (
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-400 text-sm">Title</p>
                            <p className="font-medium">{selectedNotification.title}</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Message</p>
                            <p>{selectedNotification.message}</p>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <p className="text-gray-400 text-sm">Type</p>
                                <span className={`px-2 py-1 rounded text-xs ${getTypeColor(selectedNotification.type)}`}>
                                    {selectedNotification.type}
                                </span>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Target</p>
                                <p>
                                    {selectedNotification.targetUser
                                        ? selectedNotification.targetUser.name || selectedNotification.targetUser.phone
                                        : selectedNotification.targetUserType || "ALL"}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Created At</p>
                            <p>{formatDate(selectedNotification.createdAt)}</p>
                        </div>
                        {selectedNotification.createdBy && (
                            <div>
                                <p className="text-gray-400 text-sm">Created By</p>
                                <p>{selectedNotification.createdBy.name || selectedNotification.createdBy.email}</p>
                            </div>
                        )}
                    </div>
                )}
            </Modal>

            {/* DELETE MODAL */}
            <Modal
                open={openDelete}
                title="Delete Notification"
                onClose={() => setOpenDelete(false)}
            >
                <p className="mb-4 text-sm">
                    Are you sure you want to delete this notification?
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={() => setOpenDelete(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Notifications;
