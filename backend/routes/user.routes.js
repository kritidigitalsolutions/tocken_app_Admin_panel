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
    getDeletionStatus,
    // addGstNumber
} = require("../controllers/user.controller");

// ✅ User Profile - REST APIs
router.get("/profile", isAuth, getProfile);

// fill user information first tiem
router.post("/profile-info", isAuth, completeProfile);  // New user profile completion

router.patch("/profile", isAuth, updateProfile);


// add GST Number 
// router.post("/gst", isAuth, addGstNumber);

// ✅ Phone Privacy APIs
router.get("/phone-privacy", isAuth, getPhonePrivacy);
router.patch("/phone-privacy", isAuth, togglePhonePrivacy);

// ✅ Account Deletion APIs
router.get("/deletion-status", isAuth, getDeletionStatus);
router.post("/request-deletion", isAuth, requestAccountDeletion);
router.delete("/cancel-deletion", isAuth, cancelDeletionRequest);

module.exports = router;
