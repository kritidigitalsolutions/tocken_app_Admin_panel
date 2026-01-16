const express = require("express");
const router = express.Router();
const { getPlansAndFAQs, buyPlan } = require("../controllers/plan.controller");
const isAuth = require("../middleware/auth.middleware");

router.get("/", getPlansAndFAQs);
router.post("/buy", isAuth, buyPlan);

module.exports = router;
