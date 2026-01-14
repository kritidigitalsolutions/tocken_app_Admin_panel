// const Legal = require("../models/Legal.model");

// // GET Privacy Policy
// exports.getPrivacyPolicy = async (req, res) => {
//   const policy = await Legal.findOne({
//     type: "privacy",
//     isActive: true
//   });

//   if (!policy) {
//     return res.status(404).json({
//       success: false,
//       message: "Privacy Policy not found"
//     });
//   }

//   res.json({
//     success: true,
//     data: policy
//   });
// };

// // GET Terms & Conditions
// exports.getTermsConditions = async (req, res) => {
//   const terms = await Legal.findOne({
//     type: "terms",
//     isActive: true
//   });

//   if (!terms) {
//     return res.status(404).json({
//       success: false,
//       message: "Terms & Conditions not found"
//     });
//   }

//   res.json({
//     success: true,
//     data: terms
//   });
// };


const Legal = require("../models/Legal.model");

/**
 * GET LEGAL PAGE (privacy / terms)
 */
exports.getLegal = async (req, res) => {
  try {
    const { type } = req.params;

    const legal = await Legal.findOne({ type });

    if (!legal) {
      return res.status(404).json({
        message: "Legal page not found",
      });
    }

    res.status(200).json({
      success: true,
      legal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * CREATE or UPDATE LEGAL PAGE
 */
exports.upsertLegal = async (req, res) => {
  try {
    const { type } = req.params;
    let { content, status } = req.body;

    // Normalize status
    status =
      status?.toLowerCase() === "active" ? "Active" : "Draft";

    const legal = await Legal.findOneAndUpdate(
      { type },
      { content, status },
      {
        new: true,
        upsert: true, // 🔥 create if not exists
      }
    );

    res.status(200).json({
      success: true,
      legal,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
