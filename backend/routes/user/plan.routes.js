const express = require("express");
const router = express.Router();
const { buyPlan } = require("../../controllers/user/plan.controller");
const { isAuth } = require("../../middleware/auth.middleware");
const {
  getPlansAndFAQs
} = require("../../controllers/user/plan.controller");

router.get("/plans", getPlansAndFAQs);
router.post("/buy", isAuth, buyPlan);

module.exports = router;
