const express = require("express");
const router = express.Router();

const {
  getLegal,
  upsertLegal,
} = require("../controllers/legal.controller");

// GET privacy or terms
router.get("/:type", getLegal);

// CREATE / UPDATE privacy or terms
router.put("/:type", upsertLegal);

module.exports = router;
