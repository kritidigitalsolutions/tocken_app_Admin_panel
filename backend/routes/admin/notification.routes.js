const express = require("express");
const router = express.Router();
const {
    createNotification,
    getAllNotifications,
    getNotificationById,
    updateNotification,
    deleteNotification,
    getNotificationStats
} = require("../../controllers/admin/notification.controller");

// GET /api/admin/notifications/stats - Get notification statistics
router.get("/stats", getNotificationStats);

// POST /api/admin/notifications - Create new notification
router.post("/", createNotification);

// GET /api/admin/notifications - Get all notifications
router.get("/", getAllNotifications);

// GET /api/admin/notifications/:id - Get single notification
router.get("/:id", getNotificationById);

// PUT /api/admin/notifications/:id - Update notification
router.put("/:id", updateNotification);

// DELETE /api/admin/notifications/:id - Delete notification
router.delete("/:id", deleteNotification);

module.exports = router;
