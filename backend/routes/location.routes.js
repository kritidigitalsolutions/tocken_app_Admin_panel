const express = require("express");
const isAuth = require("../middleware/auth.middleware");

const { getLocation, saveLocation } = require("../controllers/location.controller");

const router = express.Router();

router.get("/search", getLocation);
router.post("/save", isAuth, saveLocation);  // Protected route - requires authentication

module.exports = router;
