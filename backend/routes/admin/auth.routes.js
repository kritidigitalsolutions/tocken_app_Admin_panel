const express = require("express");
const router = express.Router();

const {
  adminLogin
} = require("../../controllers/auth/adminAuth.controller");

router.post("/login", adminLogin);

module.exports = router;
