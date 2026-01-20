// // const User = require("../../models/user.model");
// // const Admin = require("../../models/admin.model");
// // const Plan = require("../../models/plans.model");

// // exports.getDashboardData = async (req, res) => {
// //   try {
// //     const totalUsers = await User.countDocuments();
// //     const premiumUsers = await User.countDocuments({ isPremium: true });
// //     const blockedUsers = await User.countDocuments({ isBlocked: true });
// //     const totalAdmins = await Admin.countDocuments();
// //     const activeUsers = totalUsers - blockedUsers;

// //     const totalPlans = await Plan.countDocuments();
// //     const activePlans = await Plan.countDocuments({ isActive: true });

// //     res.status(200).json({
// //       success: true,
// //       data: {
// //         totalUsers,
// //         activePlans,
// //         blockedUsers,
// //         totalPlans,
// //         totalAdmins,
// //         premiumUsers,
// //         activeUsers,
// //       }
// //     });
// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: "Dashboard data error",
// //       error: error.message
// //     });
// //   }
// // };


// const User = require("../../models/user.model");
// const Admin = require("../../models/admin.model");
// const Plan = require("../../models/plans.model");
// const Property = require("../../models/property.model");
// const Lead = require("../../models/lead.model");

// exports.getDashboardData = async (req, res) => {
//   try {
//     // USERS
//     const totalUsers = await User.countDocuments();
//     const blockedUsers = await User.countDocuments({ isBlocked: true });
//     const premiumUsers = await User.countDocuments({ isPremium: true });
//     const activeUsers = totalUsers - blockedUsers;

//     // ADMINS
//     const totalAdmins = await Admin.countDocuments();

//     // PLANS
//     const totalPlans = await Plan.countDocuments();
//     const activePlans = await Plan.countDocuments({ isActive: true });

//     // PROPERTIES
//     const totalProperties = await Property.countDocuments();
//     const activeProperties = await Property.countDocuments({ status: "active" });

//     // LEADS
//     const totalLeads = await Lead.countDocuments();

//     res.status(200).json({
//       success: true,
//       stats: {
//         totalUsers,
//         activeUsers,
//         blockedUsers,
//         premiumUsers,
//         totalAdmins,
//         totalPlans,
//         activePlans,
//         totalProperties,
//         activeProperties,
//         totalLeads
//       }
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Dashboard data error",
//       error: error.message
//     });
//   }
// };


const Property = require("../../models/property.model");
const Lead = require("../../models/lead.model");

exports.getAnalytics = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ===============================
  // 1️⃣ BASIC COUNTS
  // ===============================
  const [
    totalListings,
    activeListings,
    totalLeads,
    todayLeads,
    closedLeads
  ] = await Promise.all([
    Property.countDocuments(),
    Property.countDocuments({ status: "ACTIVE" }),
    Lead.countDocuments(),
    Lead.countDocuments({ createdAt: { $gte: today } }),
    Lead.countDocuments({ status: "CLOSED" })
  ]);

  const conversionRate =
    totalLeads === 0
      ? 0
      : Math.round((closedLeads / totalLeads) * 100);

  // ===============================
  // 2️⃣ LISTINGS BY STATUS
  // ===============================
  const listingsByStatus = await Property.aggregate([
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  // ===============================
  // 3️⃣ LEADS TREND (Last 7 days)
  // ===============================
  const leadsTrend = await Lead.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  // ===============================
  // 4️⃣ TOP CITIES BY LISTINGS
  // ===============================
  const topCitiesByListings = await Property.aggregate([
    { $match: { "location.city": { $ne: null } } },
    {
      $group: {
        _id: "$location.city",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  // ===============================
  // 5️⃣ TOP CITIES BY LEADS
  // ===============================
  const topCitiesByLeads = await Lead.aggregate([
    {
      $lookup: {
        from: "properties",
        localField: "propertyId",
        foreignField: "_id",
        as: "property"
      }
    },
    { $unwind: "$property" },
    {
      $group: {
        _id: "$property.location.city",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);

  // ===============================
  // 6️⃣ HIGH QUALITY LISTINGS
  // ===============================
  const highQualityListings = await Property.find({
    listingScore: { $gte: 80 }
  })
    .select("propertyType listingScore location pricing")
    .limit(5);

  res.json({
    kpis: {
      totalListings,
      activeListings,
      totalLeads,
      todayLeads,
      conversionRate
    },
    charts: {
      listingsByStatus,
      leadsTrend
    },
    insights: {
      topCitiesByListings,
      topCitiesByLeads,
      highQualityListings
    }
  });
};
