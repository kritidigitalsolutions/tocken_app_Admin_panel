const express = require("express");
const cors = require("cors");

const bannerRoutes = require("./routes/banner.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes.js");
const legalRoutes = require("./routes/legal.routes");
// const planRoutes = require("./routes/plans.routes.js");
const faqRoutes = require("./routes/faq.routes");
const faqAdminRoutes = require("./routes/admin/faq.routes");
//for Authadmin route
const adminAuthRoutes = require("./routes/auth/adminAuth.routes");

// admin routes
const adminRoutes = require("./routes/admin/user.routes");
const { isAuth } = require("./middleware/auth.middleware");
const { isAdmin } = require("./middleware/admin.middleware");

// plans for user
const userPlanRoutes = require("./routes/user/plan.routes");

// for admin panel plans
const adminPlanRoutes = require("./routes/admin/plan.routes");

// dashboard routes 
const dashboardRoutes = require("./routes/admin/dashboard.routes")

// property routes
const propertyRoutes = require("./routes/property.routes");

// for Admin PropertyRoutes.
const adminPropertyRoutes = require("./routes/admin/property.routes");

// lead routes
const leadRoutes = require("./routes/lead.routes");

// for admin Leads Route
const adminLeadRoutes = require("./routes/admin/lead.routes");

// cron job
const cron = require("node-cron");

const expirePremiumListings = require("./utils/premiumExpiry");

const app = express();

app.use(express.urlencoded({extended: false}))

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json()); //  MUST BE BEFORE ROUTES
app.post("/test", (req, res) => {
  console.log("BODY:", req.body);
  res.json(req.body);
});


// this is for first time add new admin data
const bcrypt = require("bcryptjs");
const Admin = require("./models/admin.model");
const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await Admin.create({
    name: "Super Admin",
    email: "admin@realestate.com",
    password: hashedPassword
  });

  console.log("Admin created");
};
createAdmin().catch(err => console.log("Admin already exists or error:", err.message));


// app.use("/api/banners", bannerRoutes);
console.log("✅ Registering banner routes with auth middleware at /api/admin/banners");
app.use("/api/admin/banners", isAuth, isAdmin, bannerRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/legal", legalRoutes);

// PUBLIC FAQs
app.use("/api/faqs", faqRoutes);

// ADMIN FAQs
app.use("/api/admin/faqs", isAuth, isAdmin, faqAdminRoutes);

// for admin routes and middleware, 
app.use("/api/admin/auth", adminAuthRoutes);

// admin routes / for all admin protected routes like is auth and is admin
app.use("/api/admin/users", isAuth, isAdmin, adminRoutes);

// user plan routes
app.use("/api/plans", userPlanRoutes);

// admin plan routes (protected)
app.use("/api/admin/plans", isAuth, isAdmin, adminPlanRoutes);

// admin dashboard (protected)
app.use("/api/admin/dashboard", isAuth, isAdmin, dashboardRoutes);


// public + user
app.use("/api/properties", propertyRoutes);

// admin
app.use(
  "/api/admin/properties",
  isAuth,
  isAdmin,
  adminPropertyRoutes
);

// user leads
app.use("/api/leads", isAuth, leadRoutes);

// admin leads
app.use("/api/admin/leads", isAuth, isAdmin, adminLeadRoutes);


// Scheduled Tasks
cron.schedule("0 * * * *", expirePremiumListings); // every hour

module.exports = app;
