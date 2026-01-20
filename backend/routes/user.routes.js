const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/auth.middleware");
const {
    getProfile,
    updateProfile,
    completeProfile,
    togglePhonePrivacy,
    getPhonePrivacy,
    requestAccountDeletion,
    cancelDeletionRequest,
    getDeletionStatus
} = require("../controllers/user.controller");

// ✅ User Profile - REST APIs
router.get("/profile", isAuth, getProfile);
router.patch("/profile", isAuth, updateProfile);
router.post("/complete-profile", isAuth, completeProfile);  // New user profile completion

// ✅ Phone Privacy APIs
router.get("/phone-privacy", isAuth, getPhonePrivacy);
router.patch("/phone-privacy", isAuth, togglePhonePrivacy);

// ✅ Account Deletion APIs
router.get("/deletion-status", isAuth, getDeletionStatus);
router.post("/request-deletion", isAuth, requestAccountDeletion);
router.delete("/cancel-deletion", isAuth, cancelDeletionRequest);

module.exports = router;
