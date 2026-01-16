const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  updateUser,
  blockUser,
  deleteUser
} = require("../../controllers/admin/user.controller");

// Routes - middleware applied at app.js level
router.get("/", getAllUsers);
router.put("/:id", updateUser);
router.patch("/:id/block", blockUser);
router.delete("/:id", deleteUser);

module.exports = router;
