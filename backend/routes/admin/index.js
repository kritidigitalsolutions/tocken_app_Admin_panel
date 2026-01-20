const express = require("express");
const router = express.Router();

const dashboardRoutes = require("./dashboard.routes");
const userRoutes = require("./user.routes");
const planRoutes = require("./plan.routes");

// router.use("/", dashboardRoutes);
router.use("/", userRoutes);

router.use("/dashboard",dashboardRoutes);

// for paln routes
router.use("/", planRoutes);

module.exports = router;
