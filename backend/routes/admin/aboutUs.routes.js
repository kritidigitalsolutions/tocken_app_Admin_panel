const express = require("express");
const router = express.Router();

const {
    getAboutUsAdmin,
    upsertAboutUs
} = require("../../controllers/aboutUs.controller");

// GET About Us for Admin (includes Draft)
router.get("/", getAboutUsAdmin);

// CREATE / UPDATE About Us
router.put("/", upsertAboutUs);

module.exports = router;
