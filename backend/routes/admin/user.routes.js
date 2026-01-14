const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUser
} = require("../../controllers/admin/user.controller");

const isAuth = require("../../middleware/auth.middleware");
const isAdmin = require("../../middleware/admin.middleware");

// 🔐 Admin only
router.get("/", isAuth, isAdmin, getAllUsers);
router.put("/:id", isAuth, isAdmin, updateUser);

module.exports = router;
