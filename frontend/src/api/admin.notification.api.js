import api from "./api";

// Get all notifications (admin)
export const fetchNotifications = (params = {}) =>
    api.get("/admin/notifications", { params });

// Get notification stats (admin)
export const fetchNotificationStats = () =>
    api.get("/admin/notifications/stats");

// Get single notification (admin)
export const fetchNotificationById = (id) =>
    api.get(`/admin/notifications/${id}`);

// Create notification (admin)
export const createNotification = (data) =>
    api.post("/admin/notifications", data);

// Update notification (admin)
export const updateNotification = (id, data) =>
    api.put(`/admin/notifications/${id}`, data);

// Delete notification (admin)
export const deleteNotification = (id) =>
    api.delete(`/admin/notifications/${id}`);
